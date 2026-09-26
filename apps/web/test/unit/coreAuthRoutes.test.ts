import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCoreAuthFlowConsumptionStore } from '@/lib/core/authFlow'
import { InMemoryCoreBffSessionRepository, issueCoreBffSession } from '@/lib/core/bffSession'
import type { SupabaseSession } from '@/lib/core/supabaseAuth'
import { CORE_BFF_CSRF_COOKIE, CORE_BFF_CSRF_HEADER, CORE_BFF_SESSION_COOKIE } from '@/lib/core/config'
import { CoreAuthError, CorePlatformError } from '@/lib/core/errors'
import type { VerifiedFirebaseIdentity } from '@/lib/core/firebaseIdentity'
import { getCoreRuntime } from '@/lib/core/deps'
import type { CoreRuntime } from '@/lib/core/deps'
import type { SupabaseClaims } from '@/lib/core/jwtVerifier'
import { POST as otpGonder } from '@/app/api/core/auth/otp-gonder/route'
import { POST as otpDogrula } from '@/app/api/core/auth/otp-dogrula/route'
import { POST as cikis } from '@/app/api/core/auth/cikis/route'
import { GET as me } from '@/app/api/core/auth/me/route'
import { POST as isletmeSec } from '@/app/api/core/auth/isletme-sec/route'
import { POST as parolaKurtar } from '@/app/api/core/auth/parola-kurtar/route'
import { POST as parolaGiris } from '@/app/api/core/auth/parola-giris/route'
import { GET as kurtarma } from '@/app/api/core/auth/kurtarma/route'
import { POST as parolaGuncelle } from '@/app/api/core/auth/parola-guncelle/route'
import { POST as firebaseBagla } from '@/app/api/core/auth/firebase-bagla/route'

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
    static redirect(url: string | URL, status = 307) {
      return new MockNextResponse(null, { status, headers: { location: url.toString() } })
    }
  }
  return { NextResponse: MockNextResponse }
})

vi.mock('@/lib/core/deps', () => ({ getCoreRuntime: vi.fn() }))
vi.mock('@/lib/core/identityAdapter', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/core/identityAdapter')>()),
  linkLegacyPhoneIdentity: vi.fn(async () => 'linked'),
}))
vi.mock('@/lib/auth/legacyAccountResolver', () => ({
  normalizeLoginEmail: (value: string) => value.trim().toLowerCase(),
}))

const USER = '11000000-0000-4000-8000-000000000001'
const BIZ = '5b000000-0000-4000-8000-000000000001'
const ORIGIN = { origin: 'https://app.kepenk.ai' }

function claims(overrides: Partial<SupabaseClaims> = {}): SupabaseClaims {
  return { sub: USER, aud: 'authenticated', iss: 'https://core.example.test/auth/v1', exp: 9999999999, amr: [{ method: 'otp' }], ...overrides }
}

const NOW_SECONDS = Math.floor(Date.UTC(2026, 8, 16, 12, 0, 0) / 1000)

function firebaseIdentity(overrides: Partial<VerifiedFirebaseIdentity> = {}): VerifiedFirebaseIdentity {
  return { uid: 'fb-uid-0001', email: 'owner@example.test', emailVerified: true, signInProvider: 'password', authTime: NOW_SECONDS - 30, ...overrides }
}

function makeRuntime() {
  const sessions = new InMemoryCoreBffSessionRepository()
  const runtime = {
    config: { supabaseUrl: 'https://core.example.test', anonKey: 'anon', principalName: 'kepenk-web' },
    sessions,
    flows: new InMemoryCoreAuthFlowConsumptionStore(),
    auth: {
      sendPhoneOtp: vi.fn(async () => undefined),
      verifyPhoneOtp: vi.fn(async (): Promise<SupabaseSession> => ({ access_token: 'access.token.0123456789', refresh_token: 'refresh-token', expires_in: 3600, user: { id: USER, phone: '+905551234567' } })),
      verifyRecoveryTokenHash: vi.fn(async (): Promise<SupabaseSession> => ({ access_token: 'recovery.token.0123456789', refresh_token: 'recovery-refresh', expires_in: 3600, user: { id: USER } })),
      signInWithPassword: vi.fn(async (): Promise<SupabaseSession> => ({ access_token: 'pw.token.0123456789', refresh_token: 'pw-refresh', expires_in: 3600, user: { id: USER } })),
      updatePassword: vi.fn(async () => undefined),
      refreshSession: vi.fn(),
      signOut: vi.fn(async () => true),
      requestPasswordRecovery: vi.fn(async () => undefined),
    },
    verifier: { verify: vi.fn(async () => claims()) },
    firebaseIdentity: { verifyIdToken: vi.fn(async () => firebaseIdentity()) },
    client: {
      applyCommand: vi.fn(async () => ({ linked: true })),
      listMemberships: vi.fn(async () => [{ id: '6b000000-0000-4000-8000-000000000001', business_id: BIZ, role: 'owner', active: true }]),
      getBusinessPlatformSnapshot: vi.fn(async () => ({
        business_id: BIZ,
        subscription: { plan_key: 'kepenk_standard', status: 'active', current_period_start: null, current_period_end: null, version: 1 },
        entitlements: [
          { entitlement_key: 'booking', granted: true, limit_value: null, valid_until: null },
          { entitlement_key: 'custom_domain', granted: false, limit_value: null, valid_until: null },
        ],
      })),
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
  process.env.NEXT_PUBLIC_APP_URL = 'https://app.kepenk.ai'
  runtime = makeRuntime()
  vi.mocked(getCoreRuntime).mockReturnValue(runtime)
})

afterEach(() => {
  delete process.env.CORE_BFF_ENABLED
})

describe('feature gate', () => {
  it('is 404 until CORE_BFF_ENABLED=true and 503 without a Supabase connection', async () => {
    delete process.env.CORE_BFF_ENABLED
    expect((await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '05551234567' }, ORIGIN))).status).toBe(404)
    process.env.CORE_BFF_ENABLED = 'true'
    vi.mocked(getCoreRuntime).mockReturnValue(null)
    expect((await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '05551234567' }, ORIGIN))).status).toBe(503)
  })
})

describe('Origin gate on unauthenticated auth POSTs', () => {
  it('rejects cross-site and origin-less POSTs before touching Supabase', async () => {
    const cases: Array<[string, (req: Request) => Promise<Response>, unknown]> = [
      ['otp-gonder', otpGonder, { telefon: '05551234567' }],
      ['otp-dogrula', otpDogrula, { telefon: '05551234567', kod: '123456' }],
      ['parola-giris', parolaGiris, { email: 'a@b.co', parola: 'password-123' }],
      ['parola-kurtar', parolaKurtar, { email: 'a@b.co' }],
    ]
    for (const [name, handler, body] of cases) {
      const url = `https://app.kepenk.ai/api/core/auth/${name}`
      expect((await handler(json(url, body))).status, `${name} without origin`).toBe(403)
      expect((await handler(json(url, body, { origin: 'https://evil.example' }))).status, `${name} cross-site`).toBe(403)
    }
    expect(runtime.auth.sendPhoneOtp).not.toHaveBeenCalled()
    expect(runtime.auth.verifyPhoneOtp).not.toHaveBeenCalled()
    expect(runtime.auth.signInWithPassword).not.toHaveBeenCalled()
    expect(runtime.auth.requestPasswordRecovery).not.toHaveBeenCalled()
    expect(runtime.sessions.records.size).toBe(0)
  })
})

describe('otp-gonder', () => {
  it('normalises Turkish numbers to E.164 and rejects non-mobile input', async () => {
    const ok = await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '0555 123 45 67' }, ORIGIN))
    expect(ok.status).toBe(200)
    expect(runtime.auth.sendPhoneOtp).toHaveBeenCalledWith('+905551234567')

    const bad = await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '0212 123 45 67' }, ORIGIN))
    expect(bad.status).toBe(400)
    expect(runtime.auth.sendPhoneOtp).toHaveBeenCalledTimes(1)
  })

  it('maps provider rate limits and outages to 429/503 without inventing a bypass code', async () => {
    runtime.auth.sendPhoneOtp.mockRejectedValueOnce(new CoreAuthError('RATE_LIMITED', { status: 429 }))
    expect((await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '05551234567' }, ORIGIN))).status).toBe(429)
    runtime.auth.sendPhoneOtp.mockRejectedValueOnce(new CoreAuthError('AUTH_UNAVAILABLE', { status: 503 }))
    expect((await otpGonder(json('https://app.kepenk.ai/api/core/auth/otp-gonder', { telefon: '05551234567' }, ORIGIN))).status).toBe(503)
  })
})

describe('otp-dogrula', () => {
  it('establishes a host-only BFF session and never returns tokens to the browser', async () => {
    const response = await otpDogrula(json('https://app.kepenk.ai/api/core/auth/otp-dogrula', { telefon: '05551234567', kod: '123456' }, ORIGIN))
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toMatchObject({ userId: USER, businessId: BIZ, membershipCount: 1, identityAlias: 'linked', recovery: false })
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
    const invalid = await otpDogrula(json('https://app.kepenk.ai/api/core/auth/otp-dogrula', { telefon: '05551234567', kod: '000000' }, ORIGIN))
    expect(invalid.status).toBe(400)
    expect(runtime.sessions.records.size).toBe(0)

    runtime.verifier.verify.mockResolvedValueOnce(claims({ sub: '22000000-0000-4000-8000-000000000002' }))
    const mismatch = await otpDogrula(json('https://app.kepenk.ai/api/core/auth/otp-dogrula', { telefon: '05551234567', kod: '123456' }, ORIGIN))
    expect(mismatch.status).toBe(401)
    expect(runtime.sessions.records.size).toBe(0)

    const malformed = await otpDogrula(json('https://app.kepenk.ai/api/core/auth/otp-dogrula', { telefon: '05551234567', kod: 'abc' }, ORIGIN))
    expect(malformed.status).toBe(400)
    expect(runtime.auth.verifyPhoneOtp).toHaveBeenCalledTimes(2)
  })
})

async function loggedIn(accessToken = 'access.token.0123456789') {
  const issued = await issueCoreBffSession(runtime.sessions, { access_token: accessToken, refresh_token: 'refresh-token', expires_in: 3600, user: { id: USER } }, new Date('2026-09-16T12:00:00Z'))
  return {
    issued,
    cookie: `${CORE_BFF_SESSION_COOKIE}=${issued.token}; ${CORE_BFF_CSRF_COOKIE}=${issued.csrfToken}`,
    csrf: { ...ORIGIN, [CORE_BFF_CSRF_HEADER]: issued.csrfToken },
  }
}

describe('session class fail-closed on login', () => {
  it('refuses to issue a BFF session for a JWT with missing or empty amr on otp-dogrula and parola-giris', async () => {
    for (const amr of [undefined, []] as Array<SupabaseClaims['amr']>) {
      runtime = makeRuntime()
      vi.mocked(getCoreRuntime).mockReturnValue(runtime)
      runtime.verifier.verify.mockResolvedValue(claims({ amr }))

      const otp = await otpDogrula(json('https://app.kepenk.ai/api/core/auth/otp-dogrula', { telefon: '05551234567', kod: '123456' }, ORIGIN))
      expect(otp.status).toBe(401)
      expect(await otp.json()).toEqual({ error: 'AUTH_SESSION_CLASS_UNVERIFIED' })
      expect(setCookies(otp).some((c) => c.startsWith(`${CORE_BFF_SESSION_COOKIE}=`))).toBe(false)

      const password = await parolaGiris(json('https://app.kepenk.ai/api/core/auth/parola-giris', { email: 'owner@example.test', parola: 'correct-horse-battery' }, ORIGIN))
      expect(password.status).toBe(401)
      expect(await password.json()).toEqual({ error: 'AUTH_SESSION_CLASS_UNVERIFIED' })

      expect(runtime.sessions.records.size).toBe(0)
      expect(runtime.client.listMemberships).not.toHaveBeenCalled()
    }
  })
})

describe('me', () => {
  it('requires a session and returns identity, business, entitlements and subscription from one context', async () => {
    expect((await me(new Request('https://app.kepenk.ai/api/core/auth/me'))).status).toBe(401)

    const { cookie } = await loggedIn()
    const response = await me(new Request('https://app.kepenk.ai/api/core/auth/me', { headers: { cookie } }))
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({
      userId: USER,
      businessId: BIZ,
      role: 'owner',
      entitlements: ['booking'],
      subscription: { plan_key: 'kepenk_standard', status: 'active' },
    })
    expect(runtime.client.getBusinessPlatformSnapshot).toHaveBeenCalledWith('access.token.0123456789', BIZ)
  })

  it('tells a recovery session only that it must update its password', async () => {
    runtime.verifier.verify.mockResolvedValue(claims({ amr: [{ method: 'recovery' }] }))
    const { cookie } = await loggedIn()
    const response = await me(new Request('https://app.kepenk.ai/api/core/auth/me', { headers: { cookie } }))
    expect(await response.json()).toEqual({ userId: USER, recovery: true, businessId: null, memberships: [], entitlements: [] })
    expect(runtime.client.listMemberships).not.toHaveBeenCalled()
    expect(runtime.client.getBusinessPlatformSnapshot).not.toHaveBeenCalled()
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
    const unknown = await parolaKurtar(json('https://app.kepenk.ai/api/core/auth/parola-kurtar', { email: 'nobody@example.test' }, ORIGIN))
    expect(unknown.status).toBe(200)
    const known = await parolaKurtar(json('https://app.kepenk.ai/api/core/auth/parola-kurtar', { email: 'Owner@Example.test ' }, ORIGIN))
    expect(known.status).toBe(200)
    expect(runtime.auth.requestPasswordRecovery).toHaveBeenLastCalledWith('owner@example.test', expect.stringMatching(/^https:\/\/app\.kepenk\.ai\/api\/core\/auth\/kurtarma\?state=/))
    expect((await parolaKurtar(json('https://app.kepenk.ai/api/core/auth/parola-kurtar', { email: 'not-an-email' }, ORIGIN))).status).toBe(400)
  })
})

describe('firebase-bagla (verified firebase:<uid> -> user_id alias, Issue #10 migration decision)', () => {
  const URL = 'https://app.kepenk.ai/api/core/auth/firebase-bagla'
  const idToken = 'firebase.id.token.0123456789abcdef'

  it('needs a standard session, CSRF and same origin, then links the server-verified uid without forwarding the token', async () => {
    const { cookie, csrf } = await loggedIn()
    const noSession = await firebaseBagla(json(URL, { idToken }, ORIGIN))
    expect(noSession.status).toBe(403)
    const crossSite = await firebaseBagla(json(URL, { idToken }, { cookie, ...csrf, origin: 'https://evil.example' }))
    expect(crossSite.status).toBe(403)
    expect(await crossSite.json()).toEqual({ error: 'ORIGIN_REJECTED' })
    const noCsrf = await firebaseBagla(json(URL, { idToken }, { cookie, ...ORIGIN }))
    expect(noCsrf.status).toBe(403)
    expect(await noCsrf.json()).toEqual({ error: 'CSRF_REJECTED' })
    expect(runtime.firebaseIdentity.verifyIdToken).not.toHaveBeenCalled()
    expect(runtime.client.applyCommand).not.toHaveBeenCalled()

    const ok = await firebaseBagla(json(URL, { idToken }, { cookie, ...csrf, ...ORIGIN }))
    expect(ok.status).toBe(200)
    expect(await ok.json()).toEqual({ provider: 'firebase', identityAlias: 'linked', userId: USER })
    expect(runtime.firebaseIdentity.verifyIdToken).toHaveBeenCalledWith(idToken)
    const [command] = runtime.client.applyCommand.mock.calls[0] as unknown as [{ idempotencyKey: string; command: string; payload: Record<string, unknown> }]
    expect(command.command).toBe('LinkIdentityAlias')
    expect(command.payload).toEqual({ provider: 'firebase', external_subject: 'fb-uid-0001', user_id: USER })
    expect(command.idempotencyKey).toMatch(/^kc02-identity-[0-9a-f]{48}$/)
    expect(JSON.stringify(command)).not.toContain(idToken)

    const replay = await firebaseBagla(json(URL, { idToken }, { cookie, ...csrf, ...ORIGIN }))
    expect(replay.status).toBe(200)
    const keys = (runtime.client.applyCommand.mock.calls as unknown as Array<[{ idempotencyKey: string }]>).map((c) => c[0].idempotencyKey)
    expect(keys[0]).toBe(keys[1])
  })

  it('refuses invalid/revoked tokens, anonymous or custom sign-ins, stale logins, recovery sessions and alias conflicts without guessing', async () => {
    const { cookie, csrf } = await loggedIn()
    const headers = { cookie, ...csrf, ...ORIGIN }

    const short = await firebaseBagla(json(URL, { idToken: 'x' }, headers))
    expect(short.status).toBe(400)
    runtime.firebaseIdentity.verifyIdToken.mockRejectedValueOnce(new Error('auth/id-token-revoked'))
    const revoked = await firebaseBagla(json(URL, { idToken }, headers))
    expect(revoked.status).toBe(401)
    expect(await revoked.json()).toEqual({ error: 'FIREBASE_TOKEN_INVALID' })
    runtime.firebaseIdentity.verifyIdToken.mockResolvedValueOnce(firebaseIdentity({ signInProvider: 'anonymous' }))
    const anonymous = await firebaseBagla(json(URL, { idToken }, headers))
    expect(anonymous.status).toBe(403)
    expect(await anonymous.json()).toEqual({ error: 'FIREBASE_IDENTITY_UNLINKABLE', reason: 'UNVERIFIED_SIGN_IN_PROVIDER' })
    runtime.firebaseIdentity.verifyIdToken.mockResolvedValueOnce(firebaseIdentity({ authTime: NOW_SECONDS - 3600 }))
    const stale = await firebaseBagla(json(URL, { idToken }, headers))
    expect(stale.status).toBe(403)
    expect(await stale.json()).toEqual({ error: 'FIREBASE_IDENTITY_UNLINKABLE', reason: 'STALE_FIREBASE_LOGIN' })
    expect(runtime.client.applyCommand).not.toHaveBeenCalled()

    runtime.client.applyCommand.mockRejectedValueOnce(new CorePlatformError('IDENTITY_ALIAS_CONFLICT'))
    const conflict = await firebaseBagla(json(URL, { idToken }, headers))
    expect(conflict.status).toBe(409)
    expect(await conflict.json()).toEqual({ error: 'IDENTITY_ALIAS_CONFLICT' })
    runtime.client.applyCommand.mockRejectedValueOnce(new CorePlatformError('CORE_UNAVAILABLE'))
    const outage = await firebaseBagla(json(URL, { idToken }, headers))
    expect(outage.status).toBe(503)

    runtime.verifier.verify.mockResolvedValue(claims({ amr: [{ method: 'recovery' }] }))
    const recovery = await loggedIn('recovery.token.0123456789')
    const blocked = await firebaseBagla(json(URL, { idToken }, { cookie: recovery.cookie, ...recovery.csrf, ...ORIGIN }))
    expect(blocked.status).toBe(403)
    expect(await blocked.json()).toEqual({ error: 'RECOVERY_REQUIRED' })
    expect(runtime.client.applyCommand).toHaveBeenCalledTimes(2)
  })
})

describe('recovery completion (parola-kurtar -> kurtarma -> parola-guncelle -> parola-giris)', () => {
  async function startRecovery(email = 'owner@example.test') {
    const response = await parolaKurtar(json('https://app.kepenk.ai/api/core/auth/parola-kurtar', { email }, ORIGIN))
    expect(response.status).toBe(200)
    const flowCookie = setCookies(response).find((c) => c.startsWith('kepenk_core_flows='))!
    expect(flowCookie).toMatch(/HttpOnly/)
    expect(flowCookie).toMatch(/SameSite=lax/)
    expect(flowCookie).toMatch(/Path=\/api\/core\/auth/)
    expect(flowCookie).not.toMatch(/Domain=/)
    const [, redirectTo] = runtime.auth.requestPasswordRecovery.mock.calls.at(-1) as unknown as [string, string]
    const state = new URL(redirectTo).searchParams.get('state')!
    expect(redirectTo.startsWith('https://app.kepenk.ai/api/core/auth/kurtarma?state=')).toBe(true)
    return { cookie: flowCookie.split(';')[0], state }
  }

  function recoveryLink(state: string, tokenHash = 'pkce_0123456789abcdef0123456789abcdef', cookie?: string) {
    return new Request(`https://app.kepenk.ai/api/core/auth/kurtarma?state=${encodeURIComponent(state)}&token_hash=${tokenHash}`, {
      headers: cookie ? { cookie } : {},
    })
  }

  it('binds the e-mail link to the browser that started the flow and consumes the flow on first use', async () => {
    runtime.verifier.verify.mockResolvedValue(claims({ amr: [{ method: 'recovery' }], email: 'owner@example.test' }))
    runtime.auth.verifyRecoveryTokenHash.mockResolvedValue({ access_token: 'recovery.token.0123456789', refresh_token: 'recovery-refresh', expires_in: 3600, user: { id: USER, email: 'owner@example.test' } })
    const { cookie, state } = await startRecovery()

    // Cross-browser: same link, no flow cookie -> rejected, no session.
    const foreign = await kurtarma(recoveryLink(state))
    expect(foreign.headers.get('location')).toBe('https://app.kepenk.ai/parola-yenile?durum=invalid')
    expect(runtime.sessions.records.size).toBe(0)
    expect(runtime.auth.verifyRecoveryTokenHash).not.toHaveBeenCalled()

    // Wrong state in the right browser -> rejected.
    const wrongState = await kurtarma(recoveryLink('A'.repeat(32), undefined, cookie))
    expect(wrongState.headers.get('location')).toBe('https://app.kepenk.ai/parola-yenile?durum=invalid')

    // Same browser, correct state -> recovery session, flow consumed, tokens stay server-side.
    const ok = await kurtarma(recoveryLink(state, undefined, cookie))
    expect(ok.status).toBe(303)
    expect(ok.headers.get('location')).toBe('https://app.kepenk.ai/parola-yenile')
    const cookies = setCookies(ok)
    expect(cookies.find((c) => c.startsWith(`${CORE_BFF_SESSION_COOKIE}=`))).toMatch(/HttpOnly/)
    expect(cookies.join('\n')).not.toContain('recovery.token')
    expect(cookies.find((c) => c.startsWith('kepenk_core_flows='))).toMatch(/kepenk_core_flows=;|Max-Age=0/)
    expect(runtime.sessions.records.size).toBe(1)

    // Replay with the stale original cookie value (the browser would already have dropped the flow):
    // the server-side one-time record rejects it before any token exchange, no second session.
    const replay = await kurtarma(recoveryLink(state, undefined, cookie))
    expect(replay.headers.get('location')).toBe('https://app.kepenk.ai/parola-yenile?durum=invalid')
    expect(runtime.sessions.records.size).toBe(1)
    expect(runtime.auth.verifyRecoveryTokenHash).toHaveBeenCalledTimes(1)
  })

  it('rejects a recovery session for a different account, a non-recovery session and an expired token', async () => {
    runtime.auth.verifyRecoveryTokenHash.mockResolvedValue({ access_token: 'recovery.token.0123456789', refresh_token: 'recovery-refresh', expires_in: 3600, user: { id: USER, email: 'someone-else@example.test' } })
    runtime.verifier.verify.mockResolvedValue(claims({ amr: [{ method: 'recovery' }], email: 'someone-else@example.test' }))
    const mismatch = await startRecovery('owner@example.test')
    expect((await kurtarma(recoveryLink(mismatch.state, undefined, mismatch.cookie))).headers.get('location')).toBe('https://app.kepenk.ai/parola-yenile?durum=invalid')
    expect(runtime.sessions.records.size).toBe(0)

    runtime.auth.verifyRecoveryTokenHash.mockResolvedValue({ access_token: 'access.token.0123456789', refresh_token: 'r', expires_in: 3600, user: { id: USER, email: 'owner@example.test' } })
    runtime.verifier.verify.mockResolvedValue(claims({ email: 'owner@example.test' }))
    const standard = await startRecovery('owner@example.test')
    expect((await kurtarma(recoveryLink(standard.state, undefined, standard.cookie))).headers.get('location')).toBe('https://app.kepenk.ai/parola-yenile?durum=invalid')
    expect(runtime.sessions.records.size).toBe(0)

    runtime.auth.verifyRecoveryTokenHash.mockRejectedValueOnce(new CoreAuthError('OTP_INVALID', { status: 403 }))
    const expired = await startRecovery('owner@example.test')
    expect((await kurtarma(recoveryLink(expired.state, undefined, expired.cookie))).headers.get('location')).toBe('https://app.kepenk.ai/parola-yenile?durum=invalid')
    expect(runtime.sessions.records.size).toBe(0)
  })

  it('does not leave a usable flow behind for an unknown address', async () => {
    runtime.auth.requestPasswordRecovery.mockRejectedValueOnce(new CoreAuthError('CREDENTIALS_INVALID', { status: 400 }))
    const response = await parolaKurtar(json('https://app.kepenk.ai/api/core/auth/parola-kurtar', { email: 'nobody@example.test' }, ORIGIN))
    expect(response.status).toBe(200)
    const flowCookie = setCookies(response).find((c) => c.startsWith('kepenk_core_flows='))
    expect(flowCookie).toMatch(/kepenk_core_flows=;|Max-Age=0/)
  })

  it('only a recovery session may update the password; it is revoked afterwards and replays fail', async () => {
    const standard = await loggedIn()
    const standardAttempt = await parolaGuncelle(json('https://app.kepenk.ai/api/core/auth/parola-guncelle', { parola: 'correct-horse-battery' }, { cookie: standard.cookie, ...standard.csrf }))
    expect(standardAttempt.status).toBe(403)
    expect(await standardAttempt.json()).toEqual({ error: 'RECOVERY_SESSION_REQUIRED' })
    expect(runtime.auth.updatePassword).not.toHaveBeenCalled()

    runtime.verifier.verify.mockResolvedValue(claims({ amr: [{ method: 'recovery' }] }))
    const { issued, cookie, csrf } = await loggedIn('recovery.token.0123456789')

    const blocked = await isletmeSec(json('https://app.kepenk.ai/api/core/auth/isletme-sec', { businessId: BIZ }, { cookie, ...csrf }))
    expect(blocked.status).toBe(403)

    const short = await parolaGuncelle(json('https://app.kepenk.ai/api/core/auth/parola-guncelle', { parola: 'short' }, { cookie, ...csrf }))
    expect(short.status).toBe(400)

    const noCsrf = await parolaGuncelle(json('https://app.kepenk.ai/api/core/auth/parola-guncelle', { parola: 'correct-horse-battery' }, { cookie }))
    expect(noCsrf.status).toBe(403)

    const ok = await parolaGuncelle(json('https://app.kepenk.ai/api/core/auth/parola-guncelle', { parola: 'correct-horse-battery' }, { cookie, ...csrf }))
    expect(ok.status).toBe(200)
    expect(runtime.auth.updatePassword).toHaveBeenCalledWith('recovery.token.0123456789', 'correct-horse-battery')
    expect((await runtime.sessions.get(issued.record.sessionId))?.revokedAt).not.toBeNull()
    expect(setCookies(ok).some((c) => c.startsWith(`${CORE_BFF_SESSION_COOKIE}=;`))).toBe(true)

    const replay = await parolaGuncelle(json('https://app.kepenk.ai/api/core/auth/parola-guncelle', { parola: 'correct-horse-battery' }, { cookie, ...csrf }))
    expect(replay.status).toBe(401)
  })

  it('completes the migration with a standard password login', async () => {
    runtime.verifier.verify.mockResolvedValue(claims({ amr: [{ method: 'password' }] }))
    const response = await parolaGiris(json('https://app.kepenk.ai/api/core/auth/parola-giris', { email: 'owner@example.test', parola: 'correct-horse-battery' }, ORIGIN))
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toMatchObject({ userId: USER, recovery: false, businessId: BIZ })
    expect(JSON.stringify(body)).not.toContain('pw.token')
  })
})
