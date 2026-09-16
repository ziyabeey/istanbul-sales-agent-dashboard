import { describe, expect, it } from 'vitest'
import { signHs256Jwt, verifyHs256Jwt } from '../../src/lib/auth/jwtHmac'

const secret = new TextEncoder().encode('test-secret-that-is-long-enough-for-hmac')
const now = new Date('2026-09-16T07:00:00.000Z')
const nowSeconds = Math.floor(now.getTime() / 1000)

function payloadSegment(value: Record<string, unknown>): string {
  return Buffer.from(JSON.stringify(value), 'utf8').toString('base64url')
}

describe('pinned HS256 session primitive', () => {
  it('accepts a correctly signed issuer/audience token', () => {
    const token = signHs256Jwt({
      sub: 'usr-1',
      iss: 'kepenk.ai',
      aud: 'kepenk.ai:web',
      iat: nowSeconds,
      exp: nowSeconds + 60,
    }, secret)

    expect(verifyHs256Jwt(token, secret, {
      issuer: 'kepenk.ai',
      audience: 'kepenk.ai:web',
      now,
    })?.sub).toBe('usr-1')
  })

  it('rejects payload tampering even when the original signature is reused', () => {
    const token = signHs256Jwt({
      sub: 'usr-1',
      iss: 'kepenk.ai',
      exp: nowSeconds + 60,
    }, secret)
    const [header, , signature] = token.split('.')
    const tampered = `${header}.${payloadSegment({
      sub: 'usr-attacker',
      iss: 'kepenk.ai',
      exp: nowSeconds + 60,
    })}.${signature}`

    expect(verifyHs256Jwt(tampered, secret, {
      issuer: 'kepenk.ai',
      now,
    })).toBeNull()
  })

  it('rejects algorithm substitution', () => {
    const token = signHs256Jwt({
      sub: 'usr-1',
      iss: 'kepenk.ai',
      exp: nowSeconds + 60,
    }, secret)
    const [, body, signature] = token.split('.')
    const noneHeader = payloadSegment({ alg: 'none' })

    expect(verifyHs256Jwt(`${noneHeader}.${body}.${signature}`, secret, {
      issuer: 'kepenk.ai',
      now,
    })).toBeNull()
  })

  it('rejects expired tokens with no implicit grace period', () => {
    const token = signHs256Jwt({
      sub: 'usr-1',
      iss: 'kepenk.ai',
      iat: nowSeconds - 60,
      exp: nowSeconds,
    }, secret)

    expect(verifyHs256Jwt(token, secret, {
      issuer: 'kepenk.ai',
      now,
    })).toBeNull()
  })

  it('rejects audience mismatch', () => {
    const token = signHs256Jwt({
      sub: 'usr-1',
      iss: 'kepenk.ai',
      aud: 'kepenk.ai:web',
      exp: nowSeconds + 60,
    }, secret)

    expect(verifyHs256Jwt(token, secret, {
      issuer: 'kepenk.ai',
      audience: 'kepenk.ai:admin',
      now,
    })).toBeNull()
  })
})
