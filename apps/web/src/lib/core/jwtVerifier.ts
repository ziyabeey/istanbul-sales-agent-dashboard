import { createHmac, createPublicKey, timingSafeEqual, verify as cryptoVerify, type KeyObject } from 'node:crypto'
import { z } from 'zod'
import { CoreAuthError } from './errors'

/**
 * KC-02: Supabase access JWT verification on the Kepenk server.
 *
 * Preferred path is the project's asymmetric signing key via JWKS; HS256 is
 * accepted only when the confidential JWT secret is provided through the
 * credential resolver. The database never trusts a Firebase JWT (K04 §5) and
 * Kepenk never trusts an unverified Supabase JWT either.
 */
export const SupabaseClaimsSchema = z.object({
  sub: z.string().uuid(),
  aud: z.union([z.string(), z.array(z.string())]),
  iss: z.string(),
  exp: z.number(),
  iat: z.number().optional(),
  nbf: z.number().optional(),
  role: z.string().optional(),
  session_id: z.string().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  amr: z
    .array(z.union([z.string(), z.object({ method: z.string(), timestamp: z.number().optional() })]))
    .optional(),
})
export type SupabaseClaims = z.infer<typeof SupabaseClaimsSchema>

export interface JwtVerifierOptions {
  issuer: string
  jwksUrl: string
  /** Confidential HS256 secret; only consulted for HS256 tokens. */
  hs256Secret?: () => Promise<string | null>
  fetch?: typeof fetch
  now?: () => number
  jwksTtlMs?: number
  leewaySeconds?: number
}

type Jwk = { kid?: string; kty: string; alg?: string; use?: string } & Record<string, unknown>

function base64urlDecode(segment: string): Buffer {
  return Buffer.from(segment.replace(/-/g, '+').replace(/_/g, '/'), 'base64')
}

export function amrMethods(claims: SupabaseClaims): string[] {
  return (claims.amr ?? []).map((entry) => (typeof entry === 'string' ? entry : entry.method)).map((m) => m.toLowerCase())
}

/**
 * Session class at every Kepenk authority boundary (R1 KC-02 pre-review):
 * a JWT with missing, empty or unusable `amr` is never a feature session and
 * fails closed as `unverified` (mirrors Core AUTH_SESSION_CLASS_UNVERIFIED);
 * `recovery` stays recovery-only; only a known interactive method yields
 * `standard`.
 */
export type CoreSessionClass = 'standard' | 'recovery' | 'unverified'

/** AMR methods that prove an interactive login for a standard feature session. */
export const STANDARD_AMR_METHODS: ReadonlySet<string> = new Set([
  'password',
  'otp',
  'oauth',
  'sso/saml',
  'magiclink',
  'totp',
  'mfa/totp',
  'mfa/phone',
  'webauthn',
  'invite',
])

export function classifySession(claims: SupabaseClaims): CoreSessionClass {
  const methods = amrMethods(claims).map((m) => m.trim()).filter((m) => m.length > 0)
  if (methods.length === 0) return 'unverified'
  if (methods.includes('recovery')) return 'recovery'
  return methods.some((m) => STANDARD_AMR_METHODS.has(m)) ? 'standard' : 'unverified'
}

export function isRecoverySession(claims: SupabaseClaims): boolean {
  return classifySession(claims) === 'recovery'
}

export class SupabaseJwtVerifier {
  private readonly fetchImpl: typeof fetch
  private readonly now: () => number
  private readonly jwksTtlMs: number
  private readonly leewaySeconds: number
  private jwksCache: { keys: Jwk[]; fetchedAt: number } | null = null

  constructor(private readonly options: JwtVerifierOptions) {
    this.fetchImpl = options.fetch ?? fetch
    this.now = options.now ?? (() => Date.now())
    this.jwksTtlMs = options.jwksTtlMs ?? 10 * 60 * 1000
    this.leewaySeconds = options.leewaySeconds ?? 30
  }

  private async jwks(force = false): Promise<Jwk[]> {
    const fresh = this.jwksCache && this.now() - this.jwksCache.fetchedAt < this.jwksTtlMs
    if (this.jwksCache && fresh && !force) return this.jwksCache.keys
    let response: Response
    try {
      response = await this.fetchImpl(this.options.jwksUrl, { signal: AbortSignal.timeout(5000) })
    } catch (cause) {
      if (this.jwksCache) return this.jwksCache.keys
      throw new CoreAuthError('AUTH_UNAVAILABLE', { cause })
    }
    if (!response || !response.ok) {
      if (this.jwksCache) return this.jwksCache.keys
      throw new CoreAuthError('AUTH_UNAVAILABLE', { status: response?.status ?? null })
    }
    const parsed = z.object({ keys: z.array(z.record(z.string(), z.unknown())) }).safeParse(await response.json().catch(() => null))
    if (!parsed.success) throw new CoreAuthError('AUTH_UNAVAILABLE')
    this.jwksCache = { keys: parsed.data.keys as Jwk[], fetchedAt: this.now() }
    return this.jwksCache.keys
  }

  private async publicKeyFor(header: { alg: string; kid?: string }): Promise<KeyObject | null> {
    const pick = (keys: Jwk[]) =>
      keys.find((k) => (header.kid ? k.kid === header.kid : true) && (!k.alg || k.alg === header.alg) && (!k.use || k.use === 'sig'))
    let jwk = pick(await this.jwks())
    if (!jwk && header.kid) jwk = pick(await this.jwks(true))
    if (!jwk) return null
    try {
      return createPublicKey({ key: jwk as never, format: 'jwk' })
    } catch {
      return null
    }
  }

  async verify(token: string): Promise<SupabaseClaims> {
    const parts = token.split('.')
    if (parts.length !== 3) throw new CoreAuthError('SESSION_EXPIRED')
    const [headerSegment, payloadSegment, signatureSegment] = parts
    let header: { alg?: string; kid?: string; typ?: string }
    let payloadRaw: unknown
    try {
      header = JSON.parse(base64urlDecode(headerSegment).toString('utf8'))
      payloadRaw = JSON.parse(base64urlDecode(payloadSegment).toString('utf8'))
    } catch {
      throw new CoreAuthError('SESSION_EXPIRED')
    }
    const signingInput = Buffer.from(`${headerSegment}.${payloadSegment}`, 'utf8')
    const signature = base64urlDecode(signatureSegment)

    let valid = false
    if (header.alg === 'ES256' || header.alg === 'RS256') {
      const key = await this.publicKeyFor({ alg: header.alg, kid: header.kid })
      if (!key) throw new CoreAuthError('SESSION_EXPIRED')
      valid = header.alg === 'ES256'
        ? cryptoVerify('sha256', signingInput, { key, dsaEncoding: 'ieee-p1363' }, signature)
        : cryptoVerify('sha256', signingInput, key, signature)
    } else if (header.alg === 'HS256') {
      const secret = this.options.hs256Secret ? await this.options.hs256Secret() : null
      if (!secret) throw new CoreAuthError('AUTH_UNAVAILABLE')
      const expected = createHmac('sha256', secret).update(signingInput).digest()
      valid = expected.length === signature.length && timingSafeEqual(expected, signature)
    } else {
      throw new CoreAuthError('SESSION_EXPIRED')
    }
    if (!valid) throw new CoreAuthError('SESSION_EXPIRED')

    const claims = SupabaseClaimsSchema.safeParse(payloadRaw)
    if (!claims.success) throw new CoreAuthError('SESSION_EXPIRED')
    const nowSeconds = Math.floor(this.now() / 1000)
    if (claims.data.exp + this.leewaySeconds <= nowSeconds) throw new CoreAuthError('SESSION_EXPIRED')
    if (claims.data.nbf !== undefined && claims.data.nbf - this.leewaySeconds > nowSeconds) throw new CoreAuthError('SESSION_EXPIRED')
    if (claims.data.iss !== this.options.issuer) throw new CoreAuthError('SESSION_EXPIRED')
    const audiences = Array.isArray(claims.data.aud) ? claims.data.aud : [claims.data.aud]
    if (!audiences.includes('authenticated')) throw new CoreAuthError('SESSION_EXPIRED')
    return claims.data
  }
}
