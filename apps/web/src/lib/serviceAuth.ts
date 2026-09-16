import { randomUUID, timingSafeEqual } from 'node:crypto'
import {
  SERVICE_AUDIENCES,
  SERVICE_SCOPES,
  ServicePrincipalSchema,
  TaskInvocationSchema,
  type ServicePrincipal,
} from '../../../../packages/security/src/servicePrincipal'
import { signHs256Jwt, verifyHs256Jwt } from './auth/jwtHmac'

const SERVICE_TOKEN_ISSUER = 'kepenk.ai/service'
const DEFAULT_TTL_SECONDS = 300
const MAX_TTL_SECONDS = 600

export interface ServiceTokenIssueOptions {
  subject: string
  audience: string
  scopes: string[]
  ttlSeconds?: number
  notBefore?: Date
  now?: Date
  invocationId?: string
}

export interface ServiceRequirement {
  audience: string
  scopes: string[]
  allowedSubjects?: string[]
  allowLegacyCronSecret?: boolean
  now?: Date
}

function getServiceSecret(): Uint8Array | null {
  const raw = process.env.SERVICE_AUTH_SECRET?.trim()
  if (!raw) return null
  if (process.env.NODE_ENV === 'production' && raw.length < 32) return null
  return new TextEncoder().encode(raw)
}

function safeEqualText(left: string, right: string): boolean {
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  return a.length === b.length && timingSafeEqual(a, b)
}

function bearerToken(request: Request): string | null {
  const header = request.headers.get('authorization')
  if (!header?.startsWith('Bearer ')) return null
  const token = header.slice('Bearer '.length).trim()
  return token || null
}

function hasAllScopes(actual: string[], required: string[]): boolean {
  const scopeSet = new Set(actual)
  return required.every((scope) => scopeSet.has(scope))
}

export function issueServiceToken(options: ServiceTokenIssueOptions): string {
  const secret = getServiceSecret()
  if (!secret) {
    throw new Error('SERVICE_AUTH_SECRET is required to issue service tokens')
  }

  const now = options.now ?? new Date()
  const notBefore = options.notBefore ?? now
  const ttlSeconds = options.ttlSeconds ?? DEFAULT_TTL_SECONDS

  if (!options.subject.trim()) throw new Error('Service subject is required')
  if (!options.audience.trim()) throw new Error('Service audience is required')
  if (options.scopes.length === 0) throw new Error('At least one service scope is required')
  if (!Number.isInteger(ttlSeconds) || ttlSeconds <= 0 || ttlSeconds > MAX_TTL_SECONDS) {
    throw new Error(`Service token TTL must be between 1 and ${MAX_TTL_SECONDS} seconds`)
  }

  const invocationId = options.invocationId ?? randomUUID()
  const issuedAtSeconds = Math.floor(now.getTime() / 1000)
  const notBeforeSeconds = Math.floor(notBefore.getTime() / 1000)
  const expiresAtSeconds = notBeforeSeconds + ttlSeconds
  const scopes = [...new Set(options.scopes)]

  TaskInvocationSchema.parse({
    invocationId,
    subject: options.subject,
    audience: options.audience,
    scopes,
    issuedAt: new Date(issuedAtSeconds * 1000).toISOString(),
    notBefore: new Date(notBeforeSeconds * 1000).toISOString(),
    expiresAt: new Date(expiresAtSeconds * 1000).toISOString(),
  })

  return signHs256Jwt({
    iss: SERVICE_TOKEN_ISSUER,
    aud: options.audience,
    sub: options.subject,
    scp: scopes,
    jti: invocationId,
    typ: 'service',
    iat: issuedAtSeconds,
    nbf: notBeforeSeconds,
    exp: expiresAtSeconds,
  }, secret)
}

export function verifyServiceToken(
  token: string,
  requirement: ServiceRequirement
): ServicePrincipal | null {
  const secret = getServiceSecret()
  if (!secret) return null

  const payload = verifyHs256Jwt(token, secret, {
    issuer: SERVICE_TOKEN_ISSUER,
    audience: requirement.audience,
    now: requirement.now,
    clockSkewSeconds: 30,
  })
  if (!payload || payload.typ !== 'service') return null

  const subject = typeof payload.sub === 'string' ? payload.sub : ''
  const invocationId = typeof payload.jti === 'string' ? payload.jti : ''
  const scopes = Array.isArray(payload.scp)
    ? payload.scp.filter((scope): scope is string => typeof scope === 'string')
    : []

  if (!subject || !invocationId) return null
  if (!hasAllScopes(scopes, requirement.scopes)) return null
  if (
    requirement.allowedSubjects?.length &&
    !requirement.allowedSubjects.includes(subject)
  ) {
    return null
  }

  if (typeof payload.iat !== 'number' || typeof payload.exp !== 'number') return null

  try {
    return ServicePrincipalSchema.parse({
      principalId: `svc:${subject}`,
      subject,
      scopes,
      authType: 'signed_service_token',
      issuedAt: new Date(payload.iat * 1000).toISOString(),
      expiresAt: new Date(payload.exp * 1000).toISOString(),
      invocationId,
    })
  } catch {
    return null
  }
}

export function verifyServiceRequest(
  request: Request,
  requirement: ServiceRequirement
): ServicePrincipal | null {
  const bearer = bearerToken(request)
  if (bearer) {
    const signed = verifyServiceToken(bearer, requirement)
    if (signed) return signed
  }

  if (!requirement.allowLegacyCronSecret) return null

  const legacySecret = process.env.CRON_SECRET?.trim()
  if (!legacySecret) return null

  const presented = request.headers.get('x-cron-secret')?.trim() || bearer
  if (!presented || !safeEqualText(presented, legacySecret)) return null

  const now = requirement.now ?? new Date()
  return ServicePrincipalSchema.parse({
    principalId: 'svc:legacy-cron-secret',
    subject: 'legacy-cron-secret',
    scopes: [...requirement.scopes],
    authType: 'legacy_cron_secret',
    issuedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 60_000).toISOString(),
    invocationId: `legacy:${requirement.audience}`,
  })
}

export { SERVICE_AUDIENCES, SERVICE_SCOPES }
