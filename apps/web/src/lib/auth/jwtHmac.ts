import { createHmac, timingSafeEqual } from 'node:crypto'

export type SessionJwtPayload = Record<string, unknown> & {
  iss?: string
  aud?: string
  iat?: number
  nbf?: number
  exp?: number
}

interface VerifyOptions {
  issuer: string
  audience?: string
  now?: Date
  clockSkewSeconds?: number
}

const MAX_TOKEN_LENGTH = 8192

function encodeJson(value: unknown): string {
  return Buffer.from(JSON.stringify(value), 'utf8').toString('base64url')
}

function decodeJson(segment: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(Buffer.from(segment, 'base64url').toString('utf8'))
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null
  } catch {
    return null
  }
}

function signatureFor(input: string, secret: Uint8Array): Buffer {
  return createHmac('sha256', secret).update(input).digest()
}

export function signHs256Jwt(payload: SessionJwtPayload, secret: Uint8Array): string {
  const header = encodeJson({ alg: 'HS256' })
  const body = encodeJson(payload)
  const signingInput = `${header}.${body}`
  const signature = signatureFor(signingInput, secret).toString('base64url')
  return `${signingInput}.${signature}`
}

/** Untrusted decode used only to choose canonical-vs-legacy verification path. */
export function decodeJwtPayloadUnsafe(token: string): SessionJwtPayload | null {
  if (!token || token.length > MAX_TOKEN_LENGTH) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  return decodeJson(parts[1]) as SessionJwtPayload | null
}

export function verifyHs256Jwt(
  token: string,
  secret: Uint8Array,
  options: VerifyOptions
): SessionJwtPayload | null {
  if (!token || token.length > MAX_TOKEN_LENGTH) return null

  const parts = token.split('.')
  if (parts.length !== 3) return null

  const [headerSegment, payloadSegment, signatureSegment] = parts
  const header = decodeJson(headerSegment)
  const payload = decodeJson(payloadSegment) as SessionJwtPayload | null
  if (!header || !payload) return null
  if (header.alg !== 'HS256') return null

  let providedSignature: Buffer
  try {
    providedSignature = Buffer.from(signatureSegment, 'base64url')
  } catch {
    return null
  }

  const expectedSignature = signatureFor(`${headerSegment}.${payloadSegment}`, secret)
  if (
    providedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(providedSignature, expectedSignature)
  ) {
    return null
  }

  if (payload.iss !== options.issuer) return null
  if (options.audience !== undefined && payload.aud !== options.audience) return null

  const nowSeconds = Math.floor((options.now ?? new Date()).getTime() / 1000)
  const skew = options.clockSkewSeconds ?? 30

  if (typeof payload.exp !== 'number' || payload.exp <= nowSeconds - skew) return null
  if (typeof payload.iat === 'number' && payload.iat > nowSeconds + skew) return null
  if (typeof payload.nbf === 'number' && payload.nbf > nowSeconds + skew) return null

  return payload
}
