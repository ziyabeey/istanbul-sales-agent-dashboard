import { createHmac, generateKeyPairSync, sign as cryptoSign, type KeyObject } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import { SupabaseJwtVerifier, classifySession, isRecoverySession } from '@/lib/core/jwtVerifier'

const ISSUER = 'https://core.example.test/auth/v1'
const JWKS_URL = `${ISSUER}/.well-known/jwks.json`
const USER = '11000000-0000-4000-8000-000000000001'

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64url')
}

function makeEs256(kid = 'key-1') {
  const { privateKey, publicKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' })
  const jwk = { ...(publicKey.export({ format: 'jwk' }) as Record<string, unknown>), kid, alg: 'ES256', use: 'sig' }
  return { privateKey, jwk }
}

function signEs256(privateKey: KeyObject, claims: Record<string, unknown>, kid = 'key-1'): string {
  const header = b64url(JSON.stringify({ alg: 'ES256', typ: 'JWT', kid }))
  const payload = b64url(JSON.stringify(claims))
  const signature = cryptoSign('sha256', Buffer.from(`${header}.${payload}`), { key: privateKey, dsaEncoding: 'ieee-p1363' })
  return `${header}.${payload}.${b64url(signature)}`
}

function signHs256(secret: string, claims: Record<string, unknown>): string {
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = b64url(JSON.stringify(claims))
  const signature = createHmac('sha256', secret).update(`${header}.${payload}`).digest()
  return `${header}.${payload}.${b64url(signature)}`
}

const NOW = Date.parse('2026-09-16T12:00:00Z')

function baseClaims(overrides: Record<string, unknown> = {}) {
  return {
    sub: USER,
    aud: 'authenticated',
    iss: ISSUER,
    exp: Math.floor(NOW / 1000) + 3600,
    iat: Math.floor(NOW / 1000),
    role: 'authenticated',
    session_id: 'sess-1',
    amr: [{ method: 'otp', timestamp: Math.floor(NOW / 1000) }],
    ...overrides,
  }
}

function jwksFetch(keys: unknown[]) {
  return vi.fn(async () => new Response(JSON.stringify({ keys }), { status: 200 }))
}

describe('SupabaseJwtVerifier', () => {
  it('verifies an ES256 token against the JWKS and caches the key set', async () => {
    const { privateKey, jwk } = makeEs256()
    const fetchImpl = jwksFetch([jwk])
    const verifier = new SupabaseJwtVerifier({ issuer: ISSUER, jwksUrl: JWKS_URL, fetch: fetchImpl as unknown as typeof fetch, now: () => NOW })

    const claims = await verifier.verify(signEs256(privateKey, baseClaims()))
    expect(claims.sub).toBe(USER)
    await verifier.verify(signEs256(privateKey, baseClaims()))
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('rejects expired, foreign-issuer, wrong-audience and tampered tokens', async () => {
    const { privateKey, jwk } = makeEs256()
    const verifier = new SupabaseJwtVerifier({ issuer: ISSUER, jwksUrl: JWKS_URL, fetch: jwksFetch([jwk]) as unknown as typeof fetch, now: () => NOW })

    await expect(verifier.verify(signEs256(privateKey, baseClaims({ exp: Math.floor(NOW / 1000) - 120 })))).rejects.toMatchObject({ code: 'SESSION_EXPIRED' })
    await expect(verifier.verify(signEs256(privateKey, baseClaims({ iss: 'https://other.example.test/auth/v1' })))).rejects.toMatchObject({ code: 'SESSION_EXPIRED' })
    await expect(verifier.verify(signEs256(privateKey, baseClaims({ aud: 'anon' })))).rejects.toMatchObject({ code: 'SESSION_EXPIRED' })

    const valid = signEs256(privateKey, baseClaims())
    const [h, p, s] = valid.split('.')
    const tamperedPayload = b64url(JSON.stringify(baseClaims({ sub: '22000000-0000-4000-8000-000000000002' })))
    await expect(verifier.verify(`${h}.${tamperedPayload}.${s}`)).rejects.toMatchObject({ code: 'SESSION_EXPIRED' })
    await expect(verifier.verify(`${h}.${p}.${b64url('garbage')}`)).rejects.toMatchObject({ code: 'SESSION_EXPIRED' })
    await expect(verifier.verify('not-a-jwt')).rejects.toMatchObject({ code: 'SESSION_EXPIRED' })
  })

  it('re-fetches the JWKS once for an unknown kid and rejects keys it still cannot find', async () => {
    const old = makeEs256('key-old')
    const fresh = makeEs256('key-new')
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ keys: [old.jwk] }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ keys: [old.jwk, fresh.jwk] }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ keys: [old.jwk, fresh.jwk] }), { status: 200 }))
    const verifier = new SupabaseJwtVerifier({ issuer: ISSUER, jwksUrl: JWKS_URL, fetch: fetchImpl as unknown as typeof fetch, now: () => NOW })

    await verifier.verify(signEs256(old.privateKey, baseClaims(), 'key-old'))
    await verifier.verify(signEs256(fresh.privateKey, baseClaims(), 'key-new'))
    expect(fetchImpl).toHaveBeenCalledTimes(2)

    const stranger = makeEs256('key-stranger')
    await expect(verifier.verify(signEs256(stranger.privateKey, baseClaims(), 'key-stranger'))).rejects.toMatchObject({ code: 'SESSION_EXPIRED' })
    expect(fetchImpl).toHaveBeenCalledTimes(3)
  })

  it('accepts HS256 only with the confidential secret from the resolver', async () => {
    const secret = 'super-secret-jwt-signing-key-0123456789'
    const token = signHs256(secret, baseClaims())
    const withSecret = new SupabaseJwtVerifier({ issuer: ISSUER, jwksUrl: JWKS_URL, fetch: jwksFetch([]) as unknown as typeof fetch, now: () => NOW, hs256Secret: async () => secret })
    const withoutSecret = new SupabaseJwtVerifier({ issuer: ISSUER, jwksUrl: JWKS_URL, fetch: jwksFetch([]) as unknown as typeof fetch, now: () => NOW })

    expect((await withSecret.verify(token)).sub).toBe(USER)
    await expect(withoutSecret.verify(token)).rejects.toMatchObject({ code: 'AUTH_UNAVAILABLE' })
    await expect(withSecret.verify(signHs256('wrong-secret-wrong-secret-wrong-secret', baseClaims()))).rejects.toMatchObject({ code: 'SESSION_EXPIRED' })
  })

  it('flags recovery sessions from amr in either claim shape', async () => {
    const { privateKey, jwk } = makeEs256()
    const verifier = new SupabaseJwtVerifier({ issuer: ISSUER, jwksUrl: JWKS_URL, fetch: jwksFetch([jwk]) as unknown as typeof fetch, now: () => NOW })

    const objectShape = await verifier.verify(signEs256(privateKey, baseClaims({ amr: [{ method: 'recovery' }] })))
    const stringShape = await verifier.verify(signEs256(privateKey, baseClaims({ amr: ['password', 'RECOVERY'] })))
    const normal = await verifier.verify(signEs256(privateKey, baseClaims()))
    expect(isRecoverySession(objectShape)).toBe(true)
    expect(isRecoverySession(stringShape)).toBe(true)
    expect(isRecoverySession(normal)).toBe(false)
  })

  it('classifies sessions explicitly and treats missing, empty or unusable amr as unverified', async () => {
    const { privateKey, jwk } = makeEs256()
    const verifier = new SupabaseJwtVerifier({ issuer: ISSUER, jwksUrl: JWKS_URL, fetch: jwksFetch([jwk]) as unknown as typeof fetch, now: () => NOW })
    const verify = (overrides: Record<string, unknown>) => verifier.verify(signEs256(privateKey, baseClaims(overrides as never)))

    expect(classifySession(await verify({}))).toBe('standard')
    expect(classifySession(await verify({ amr: ['password'] }))).toBe('standard')
    expect(classifySession(await verify({ amr: ['password', 'RECOVERY'] }))).toBe('recovery')
    expect(classifySession(await verify({ amr: [{ method: 'recovery' }] }))).toBe('recovery')
    expect(classifySession(await verify({ amr: undefined }))).toBe('unverified')
    expect(classifySession(await verify({ amr: [] }))).toBe('unverified')
    expect(classifySession(await verify({ amr: [{ method: '' }] }))).toBe('unverified')
    expect(classifySession(await verify({ amr: ['anonymous'] }))).toBe('unverified')
    expect(classifySession(await verify({ amr: ['made-up-method'] }))).toBe('unverified')
  })
})
