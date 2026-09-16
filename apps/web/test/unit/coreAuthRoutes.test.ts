import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCoreBffSessionRepository, issueCoreBffSession } from '@/lib/core/bffSession'
import { CORE_BFF_CSRF_COOKIE, CORE_BFF_CSRF_HEADER, CORE_BFF_SESSION_COOKIE } from '@/lib/core/config'
import { CoreAuthError } from '@/lib/core/errors'
import { getCoreRuntime } from '@/lib/core/deps'
import type { CoreRuntime } from '@/lib/core/deps'
import type { SupabaseClaims } from '@/lib/core/jwtVerifier'
import { POST as otpGonder } from '@/app/api/core/auth/otp-gonder/route'
import { POST as otpDogrula } from '@/app/api/core/auth/otp-dogrula/route'
import { POST as cikis } from '@/app/api/core/auth/cikis/route'
import { GET as me } from '@/app/api/core/auth/me/route'
import { POST as isletmeSec } from '@/app/api/core/auth/isletme-sec/route'
import { POST as parolaKurtar } from '@/app/api/core/auth/parola-kurtar/route'

// Real Response objects so cookie headers can be asserted.
vi.mock('next/server', () => {
  class MockNextResponse extends Response {
    readonly cookies = {
      set: (name: string, value: string, options: Record<string, unknown> = {}) => {
        const parts = [`${name}=${value}`]
        if (options.path) parts.push(`Path=${options.path}`)
        if (options.httpOnly) parts.push('HttpOnly')
        if (options.secure) parts.push('Secure')
        if (options.sameSite) parts.push(`SameSite=${String(options.sameSite)}`)
        if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`)
        if (options.domain) parts.push(`Domain=${options.domain}`)
        this.headers.append('set-cookie', parts.join('; '))
      },
    }
    static json(body: unknown, init?: ResponseInit) {
      const headers = new Headers(init?.headers)
      headers.set('content-type', 'application/json')
      return new MockNextResponse(JSON.stringify(body), { ...init, status: init?.status ?? 200, headers })
    }
  }
  return { NextResponse: MockNextResponse }
})

vi.mock('@/lib/core/deps', () => ({ getCoreRuntime: vi.fn() }))
vi.mock('@/lib/core/identityAdapter', () => ({
  adaptLegacyIdentity: vi.fn(async () => ({ identityAlias: 'linked', legacyEsnafId: 'esnaf-1', legacyTenantShadow: 'written' })),
}))
vi.mock('@/lib/auth/legacyAccountResolver', () => ({
  normalizeLoginEmail: (value: string) => value.trim().toLowerCase(),
}))

const USER = '11000000-0000-4000-8000-000000000001'
const BIZ = '5b000000-0000-4000-8000-000000000001'

function claims(): SupabaseClaims {
  return { sub: USER, aud: 'authenticated', iss: 'https://core.example.test/auth/v1', exp: 9999999999, amr: [{ method: 'otp' }] }
}

function makeRuntime() {
  const sessions = new InMemoryCoreBffSessionRepository()
  const runtime = {
    config: { supabaseUrl: 'https://core.example.test', anonKey: 'anon', principalName: 'kepenk-web' },
    sessions,
    auth: {
      sendPhoneOtp: vi.fn(async () => undefined),
      verifyPhoneOtp: vi.fn(async () => ({ access_token: 'access.token.0123456789', refresh_token: 'refresh-token', expires_in: 3600, user: { id: USER, phone: '+905551234567' } })),
      refreshSession: vi.fn(),
      signOut: vi.fn(async () => true),
      requestPasswordRecovery: vi.fn(async () => undefined),
      signInWithPassword: vi.fn(),
    },
    verifier: { verify: vi.fn(async () => claims()) },
    client: {
      listMemberships: vi.fn(async () => [{ id: '6b000000-0000-4000-8000-000000000001', business_id: BIZ, role: 'owner', active: true }]),
      getBusinessPlatformSnapshot: vi.fn(async () => ({ business_id: BIZ, subscription: null, entitlements: [] })),
    },
    now: () => new Date('2026-09-16T12:00:00Z'),
  }
  return runtime as unknown as CoreRuntime & typeof runtime
}

function setCookies(response: Response): string[] {
  return response.headers.getSetCookie ? response.headers.getSetCookie() : [response.headers.get('set-cookie') ?? '']
}

function json(url: string, body: unknown, headers: Record<string, string> = {}, method = 'POST'): Request {
  return new Request(url, { method, headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) })
}

let runtime: ReturnType<typeof makeRuntime>

beforeAll(() => {
  process.env.SESSION_SECRET = 'kc02-test-session-secret-0123456789abcdef'
})

beforeEach(() => {
  process.env.CORE_BFF_ENABLED = 'true'
  runtime = makeRuntime()
  vi.mocked(getCoreRuntime).mockReturnValue(runtime)
})

afterEach(() => {
  delete process.env.CORE_BFF_ENABLED
})

describe('feature gate', () => {
  it('is 404 until CORE_BFF_ENABLED=true and 503 without a Supabase connection', async () => {
    delete process.env.CORE_BFF_ENABLED
    expect((await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '05551234567' }))).status).toBe(404)
    process.env.CORE_BFF_ENABLED = 'true'
    vi.mocked(getCoreRuntime).mockReturnValue(null)
    expect((await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '05551234567' }))).status).toBe(503)
  })
})

describe('otp-gonder', () => {
  it('normalises Turkish numbers to E.164 and rejects non-mobile input', async () => {
    const ok = await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '0555 123 45 67' }))
    expect(ok.status).toBe(200)
    expect(runtime.auth.sendPhoneOtp).toHaveBeenCalledWith('+905551234567')

    const bad = await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '0212 123 45 67' }))
    expect(bad.status).toBe(400)
    expect(runtime.auth.sendPhoneOtp).toHaveBeenCalledTimes(1)
  })

  it('maps provider rate limits and outages to 429/503 without inventing a bypass code', async () => {
    runtime.auth.sendPhoneOtp.mockRejectedValueOnce(new CoreAuthError('RATE_LIMITED', { status: 429 }))
    expect((await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '05551234567' }))).status).toBe(429)
    runtime.auth.sendPhoneOtp.mockRejectedValueOnce(new CoreAuthError('AUTH_UNAVAILABLE', { status: 503 }))
    expect((await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '05551234567' }))).status).toBe(503)
  })
})

describe('otp-dogrula', () => {
  it('establishes a host-only BFF session and never returns tokens to the browser', async () => {
    const response = await otpDogrula(json('https://app.kepenk.ai/api/core/auth/otp-dogrula', { telefon: '05551234567', kod: '123456' }))
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toMatchObject({ userId: USER, businessId: BIZ, membershipCount: 1, legacyEsnafId: 'esnaf-1', recovery: false })
    expect(JSON.stringify(body)).not.toContain('access.token')
    expect(JSON.stringify(body)).not.toContain('refresh-token')

    const cookies = setCookies(response)
    const session = cookies.find((c) => c.startsWith(`${CORE_BFF_SESSION_COOKIE}=`))
    const csrf = cookies.find((c) => c.startsWith(`${CORE_BFF_CSRF_COOKIE}=`))
    expect(session).toMatch(/HttpOnly/)
    expect(session).toMatch(/SameSite=strict/)
    expect(session).not.toMatch(/Domain=/)
    expect(csrf).not.toMatch(/HttpOnly/)
    expect(runtime.sessions.records.size).toBe(1)
  })

  it('rejects invalid codes and a JWT whose subject differs from the GoTrue user', async () => {
    runtime.auth.verifyPhoneOtp.mockRejectedValueOnce(new CoreAuthError('OTP_INVALID', { status: 403 }))
    const invalid = await otpDogrula(json('https://app.kepenk.ai/api/core/auth/otp-dogrula', { telefon: '05551234567', kod: '000000' }))
    expect(invalid.status).toBe(400)
    expect(runtime.sessions.records.size).toBe(0)

    runtime.verifier.verify.mockResolvedValueOnce({ ...claims(), sub: '22000000-0000-4000-8000-000000000002' })
    const mismatch = await otpDogrula(json('https://app.kepenk.ai/api/core/auth/otp-dogrula', { telefon: '05551234567', kod: '123456' }))
    expect(mismatch.status).toBe(401)
    expect(runtime.sessions.records.size).toBe(0)

    const malformed = await otpDogrula(json('https://app.kepenk.ai/api/core/auth/otp-dogrula', { telefon: '05551234567', kod: 'abc' }))
    expect(malformed.status).toBe(400)
    expect(runtime.auth.verifyPhoneOtp).toHaveBeenCalledTimes(2)
  })
})

async function loggedIn() {
  const issued = await issueCoreBffSession(runtime.sessions, { access_token: 'access.token.0123456789', refresh_token: 'refresh-token', expires_in: 3600, user: { id: USER } }, new Date('2026-09-16T12:00:00Z'))
  return {
    issued,
    cookie: `${CORE_BFF_SESSION_COOKIE}=${issued.token}; ${CORE_BFF_CSRF_COOKIE}=${issued.csrfToken}`,
    csrf: { origin: 'https://app.kepenk.ai', [CORE_BFF_CSRF_HEADER]: issued.csrfToken },
  }
}

describe('me', () => {
  it('requires a session and returns the Core identity, business and platform snapshot', async () => {
    expect((await me(new Request('https://app.kepenk.ai/api/core/auth/me'))).status).toBe(401)

    const { cookie } = await loggedIn()
    const response = await me(new Request('https://app.kepenk.ai/api/core/auth/me', { headers: { cookie } }))
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ userId: USER, businessId: BIZ, role: 'owner', platform: { business_id: BIZ } })
    expect(runtime.client.getBusinessPlatformSnapshot).toHaveBeenCalledWith('access.token.0123456789', BIZ)
  })

  it('tells a recovery session only that it must update its password', async () => {
    runtime.verifier.verify.mockResolvedValue({ ...claims(), amr: [{ method: 'recovery' }] })
    const { cookie } = await loggedIn()
    const response = await me(new Request('https://app.kepenk.ai/api/core/auth/me', { headers: { cookie } }))
    expect(await response.json()).toEqual({ userId: USER, recovery: true, businessId: null, memberships: [] })
    expect(runtime.client.listMemberships).not.toHaveBeenCalled()
  })
})

describe('cikis', () => {
  it('needs CSRF, revokes durably before the best-effort remote logout and rejects replays', async () => {
    const { issued, cookie, csrf } = await loggedIn()

    const noCsrf = await cikis(json('https://app.kepenk.ai/api/core/auth/cikis', {}, { cookie }))
    expect(noCsrf.status).toBe(403)

    const ok = await cikis(json('https://app.kepenk.ai/api/core/auth/cikis', {}, { cookie, ...csrf }))
    expect(ok.status).toBe(200)
    expect((await runtime.sessions.get(issued.record.sessionId))?.revokedAt).not.toBeNull()
    expect(runtime.auth.signOut).toHaveBeenCalledWith('access.token.0123456789')
    expect(setCookies(ok).some((c) => c.startsWith(`${CORE_BFF_SESSION_COOKIE}=;`) && /Max-Age=0/.test(c))).toBe(true)

    const replay = await cikis(json('https://app.kepenk.ai/api/core/auth/cikis', {}, { cookie, ...csrf }))
    expect(replay.status).toBe(401)
  })
})

describe('isletme-sec', () => {
  it('only accepts a business the user is an active member of', async () => {
    const { issued, cookie, csrf } = await loggedIn()
    const denied = await isletmeSec(json('https://app.kepenk.ai/api/core/auth/isletme-sec', { businessId: '5b000000-0000-4000-8000-0000000000ff' }, { cookie, ...csrf }))
    expect(denied.status).toBe(403)
    expect((await runtime.sessions.get(issued.record.sessionId))?.selectedBusinessId).toBeNull()

    const ok = await isletmeSec(json('https://app.kepenk.ai/api/core/auth/isletme-sec', { businessId: BIZ }, { cookie, ...csrf }))
    expect(ok.status).toBe(200)
    expect((await runtime.sessions.get(issued.record.sessionId))?.selectedBusinessId).toBe(BIZ)
  })
})

describe('parola-kurtar', () => {
  it('does not reveal whether an address exists', async () => {
    runtime.auth.requestPasswordRecovery.mockRejectedValueOnce(new CoreAuthError('CREDENTIALS_INVALID', { status: 400 }))
    const unknown = await parolaKurtar(json('https://app.kepenk.ai/api/core/auth/parola-kurtar', { email: 'nobody@example.test' }))
    expect(unknown.status).toBe(200)
    const known = await parolaKurtar(json('https://app.kepenk.ai/api/core/auth/parola-kurtar', { email: 'Owner@Example.test ' }))
    expect(known.status).toBe(200)
    expect(runtime.auth.requestPasswordRecovery).toHaveBeenLastCalledWith('owner@example.test')
    expect((await parolaKurtar(json('https://app.kepenk.ai/api/core/auth/parola-kurtar', { email: 'not-an-email' }))).status).toBe(400)
  })
})
