import { beforeAll, describe, expect, it } from 'vitest'
import {
  InMemoryCoreBffSessionRepository,
  decryptSessionMaterial,
  decryptedTokens,
  encryptSessionMaterial,
  issueCoreBffSession,
  loadCoreBffSession,
  readCookie,
  revokeCoreBffSession,
  storeRefreshedTokens,
  verifyCoreCsrf,
} from '@/lib/core/bffSession'
import { CORE_BFF_CSRF_COOKIE, CORE_BFF_CSRF_HEADER, CORE_BFF_SESSION_COOKIE } from '@/lib/core/config'

const SESSION = {
  access_token: 'access.token.value-0123456789',
  refresh_token: 'refresh-token-value',
  expires_in: 3600,
  user: { id: '11000000-0000-4000-8000-000000000001' },
}

beforeAll(() => {
  process.env.SESSION_SECRET = 'kc02-test-session-secret-0123456789abcdef'
})

describe('session material encryption', () => {
  it('round-trips and rejects tampered envelopes', () => {
    const envelope = encryptSessionMaterial('hello')
    expect(envelope.startsWith('v1.')).toBe(true)
    expect(decryptSessionMaterial(envelope)).toBe('hello')
    const parts = envelope.split('.')
    parts[3] = Buffer.from('xx' + Buffer.from(parts[3], 'base64url').toString('hex').slice(2), 'hex').toString('base64url')
    expect(decryptSessionMaterial(parts.join('.'))).toBeNull()
    expect(decryptSessionMaterial('garbage')).toBeNull()
  })
})

describe('BFF session lifecycle', () => {
  it('issues an opaque locator, loads it, refreshes tokens and revokes durably', async () => {
    const repo = new InMemoryCoreBffSessionRepository()
    const now = new Date('2026-09-16T12:00:00Z')
    const issued = await issueCoreBffSession(repo, SESSION, now)

    expect(issued.token).toMatch(/^[A-Za-z0-9_-]{43}$/)
    expect(issued.csrfToken).toMatch(/^[A-Za-z0-9_-]{43}$/)
    expect(issued.record.accessTokenEnc).not.toContain(SESSION.access_token)
    expect(issued.record.refreshTokenEnc).not.toContain(SESSION.refresh_token)

    const loaded = await loadCoreBffSession(repo, issued.token, now)
    expect(loaded?.userId).toBe(SESSION.user.id)
    expect(decryptedTokens(loaded!)).toEqual({ accessToken: SESSION.access_token, refreshToken: SESSION.refresh_token })

    const refreshed = await storeRefreshedTokens(repo, loaded!, { ...SESSION, access_token: 'new.access.token-0123456789', refresh_token: 'new-refresh' }, now)
    expect(decryptedTokens(refreshed)?.accessToken).toBe('new.access.token-0123456789')
    expect(decryptedTokens((await repo.get(refreshed.sessionId))!)?.refreshToken).toBe('new-refresh')

    expect(await revokeCoreBffSession(repo, issued.token, now)).toBe(true)
    expect(await loadCoreBffSession(repo, issued.token, now)).toBeNull()
    expect(await revokeCoreBffSession(repo, issued.token, now)).toBe(false)
  })

  it('never loads expired, unknown or malformed locators', async () => {
    const repo = new InMemoryCoreBffSessionRepository()
    const issuedAt = new Date('2026-09-16T12:00:00Z')
    const issued = await issueCoreBffSession(repo, SESSION, issuedAt)

    expect(await loadCoreBffSession(repo, issued.token, new Date('2026-10-17T12:00:01Z'))).toBeNull()
    expect(await loadCoreBffSession(repo, 'A'.repeat(43), issuedAt)).toBeNull()
    expect(await loadCoreBffSession(repo, 'short', issuedAt)).toBeNull()
    expect(await loadCoreBffSession(repo, issued.token + 'x', issuedAt)).toBeNull()
  })
})

describe('CSRF double submit + Origin', () => {
  const csrf = 'c'.repeat(43)
  const cookieHeader = `${CORE_BFF_SESSION_COOKIE}=${'s'.repeat(43)}; ${CORE_BFF_CSRF_COOKIE}=${csrf}`

  it('lets safe methods through and requires matching header, cookie and origin for mutations', () => {
    expect(verifyCoreCsrf(new Request('https://app.kepenk.ai/api/core/auth/me', { method: 'GET', headers: { cookie: cookieHeader } }))).toBe(true)

    const good = new Request('https://app.kepenk.ai/api/core/auth/cikis', {
      method: 'POST',
      headers: { cookie: cookieHeader, origin: 'https://app.kepenk.ai', [CORE_BFF_CSRF_HEADER]: csrf },
    })
    expect(verifyCoreCsrf(good)).toBe(true)

    const noOrigin = new Request('https://app.kepenk.ai/api/core/auth/cikis', { method: 'POST', headers: { cookie: cookieHeader, [CORE_BFF_CSRF_HEADER]: csrf } })
    expect(verifyCoreCsrf(noOrigin)).toBe(false)

    const crossSite = new Request('https://app.kepenk.ai/api/core/auth/cikis', {
      method: 'POST',
      headers: { cookie: cookieHeader, origin: 'https://evil.example', [CORE_BFF_CSRF_HEADER]: csrf },
    })
    expect(verifyCoreCsrf(crossSite)).toBe(false)

    const wrongHeader = new Request('https://app.kepenk.ai/api/core/auth/cikis', {
      method: 'POST',
      headers: { cookie: cookieHeader, origin: 'https://app.kepenk.ai', [CORE_BFF_CSRF_HEADER]: 'd'.repeat(43) },
    })
    expect(verifyCoreCsrf(wrongHeader)).toBe(false)

    const missingHeader = new Request('https://app.kepenk.ai/api/core/auth/cikis', { method: 'POST', headers: { cookie: cookieHeader, origin: 'https://app.kepenk.ai' } })
    expect(verifyCoreCsrf(missingHeader)).toBe(false)
  })

  it('parses cookies by exact name', () => {
    const request = new Request('https://app.kepenk.ai/', { headers: { cookie: 'a=1; kepenk_core_session_x=nope; kepenk_core_session=yes ; b=2' } })
    expect(readCookie(request, CORE_BFF_SESSION_COOKIE)).toBe('yes')
    expect(readCookie(request, 'missing')).toBeNull()
  })
})
