import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCoreBffSessionRepository, issueCoreBffSession } from '@/lib/core/bffSession'
import { CORE_BFF_CSRF_COOKIE, CORE_BFF_CSRF_HEADER, CORE_BFF_SESSION_COOKIE } from '@/lib/core/config'
import { getCoreRuntime } from '@/lib/core/deps'
import { InMemoryOnboardingSagaStore } from '@/lib/core/onboardingCore'
import type { SupabaseClaims } from '@/lib/core/jwtVerifier'
import { POST as complete } from '@/app/api/onboarding/complete/route'

/**
 * R1 KC-05 blocker 2: a request that presents a Core BFF session must clear the
 * same Origin + CSRF + standard-session gate as every other Core mutation, and
 * the check runs before any tenant document exists. Cross-origin, origin-less
 * and bad-CSRF submissions must produce zero Core commands and zero tenants.
 */
const set = vi.fn(async () => undefined)
const update = vi.fn(async () => undefined)
const saga = new InMemoryOnboardingSagaStore()

vi.mock('@/lib/firebaseAdmin', () => ({
  adminDb: { collection: vi.fn(() => ({ doc: vi.fn(() => ({ id: 'esnaf-new', set, update })) })) },
  Timestamp: { now: () => ({ toDate: () => new Date() }), fromDate: (d: Date) => ({ toDate: () => d }) },
}))
vi.mock('@/lib/site/localSiteData', () => ({
  buildLocalPreviewPath: (id: string) => `/site/${id}`,
  buildLocalSiteDataFromEsnaf: () => ({}),
}))
vi.mock('@/lib/sessionManager', () => ({ oturumOlustur: vi.fn(async (_id: string, response: Response) => response) }))
vi.mock('@/lib/core/deps', () => ({ getCoreRuntime: vi.fn() }))
// Must be constructible with `new` and yield the shared in-memory saga store.
vi.mock('@/lib/core/onboardingSagaStore', () => ({ FirestoreOnboardingSagaStore: function () { return saga } }))

const USER = '11000000-0000-4000-8000-000000000001'
const BIZ = '5b000000-0000-4000-8000-000000000001'
const NOW = () => new Date('2026-09-16T12:00:00Z')

const applyCommand = vi.fn(async (input: { command: string; payload: Record<string, unknown> }) =>
  input.command === 'ProvisionBusiness'
    ? { business_id: BIZ, slug: input.payload.slug, membership_id: '6b000000-0000-4000-8000-000000000001', created: true, tenant_alias_linked: true }
    : { business_id: BIZ, plan_key: 'kepenk_standard', status: 'trial', version: 1, event_id: 3, policy_version: 1 }
)

let sessions: InMemoryCoreBffSessionRepository

function claims(): SupabaseClaims {
  return { sub: USER, aud: 'authenticated', iss: 'https://core.example.test/auth/v1', exp: 9999999999, amr: [{ method: 'otp' }] }
}

beforeEach(() => {
  vi.clearAllMocks()
  saga.records.clear()
  process.env.SESSION_SECRET = 'kc05-test-session-secret-0123456789abcdef'
  process.env.CORE_ONBOARDING_ENABLED = 'true'
  sessions = new InMemoryCoreBffSessionRepository()
  vi.mocked(getCoreRuntime).mockReturnValue({
    sessions,
    auth: { refreshSession: vi.fn() },
    verifier: { verify: vi.fn(async () => claims()) },
    client: { applyCommand, listMemberships: vi.fn(async () => []), getBusinessPlatformSnapshot: vi.fn(async () => ({ business_id: BIZ, subscription: null, entitlements: [] })) },
    now: NOW,
  } as never)
})

afterEach(() => {
  delete process.env.CORE_ONBOARDING_ENABLED
})

const body = { adim1: { isletmeAdi: 'Yeni Berber', sektor: 'kuafor' }, adim5: { telefon: '0555 000 00 00' } }

function post(headers: Record<string, string>) {
  return new Request('https://app.kepenk.ai/api/onboarding/complete', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

async function sessionCookies() {
  const issued = await issueCoreBffSession(sessions, { access_token: 'access.token.0123456789', refresh_token: 'r', expires_in: 3600, user: { id: USER } }, NOW())
  return { cookie: `${CORE_BFF_SESSION_COOKIE}=${issued.token}; ${CORE_BFF_CSRF_COOKIE}=${issued.csrfToken}`, csrf: issued.csrfToken }
}

describe('POST /api/onboarding/complete — Core mutation gate', () => {
  it('refuses a Core-session request that fails Origin or CSRF, before any tenant or command exists', async () => {
    const { cookie, csrf } = await sessionCookies()

    const refused: Array<Record<string, string>> = [
      { cookie },
      { cookie, origin: 'https://evil.example', [CORE_BFF_CSRF_HEADER]: csrf },
      { cookie, origin: 'https://app.kepenk.ai' },
      { cookie, origin: 'https://app.kepenk.ai', [CORE_BFF_CSRF_HEADER]: 'x'.repeat(csrf.length) },
    ]
    for (const headers of refused) {
      const response = await complete(post(headers))
      expect(response.status).toBe(403)
      expect(await response.json()).toMatchObject({ error: expect.stringMatching(/^(ORIGIN|CSRF)_REJECTED$/) })
    }

    expect(set).not.toHaveBeenCalled()
    expect(applyCommand).not.toHaveBeenCalled()
    expect(saga.records.size).toBe(0)
  })

  it('keeps the legacy path open for requests without a Core session and issues no Core command', async () => {
    const response = await complete(post({ origin: 'https://app.kepenk.ai' }))
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ esnafId: 'esnaf-new', core: 'no_core_session' })
    expect(set).toHaveBeenCalledTimes(1)
    expect(applyCommand).not.toHaveBeenCalled()
  })

  it('provisions Core through the durable saga when the gated session is complete', async () => {
    const { cookie, csrf } = await sessionCookies()
    const response = await complete(post({ cookie, origin: 'https://app.kepenk.ai', [CORE_BFF_CSRF_HEADER]: csrf }))

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ esnafId: 'esnaf-new', core: 'provisioned', businessId: BIZ })
    expect(applyCommand.mock.calls.map((call) => (call as unknown as [{ command: string }])[0].command)).toEqual(['ProvisionBusiness', 'ChangeSubscription'])
    expect(saga.records.get('esnaf-new')).toMatchObject({ status: 'completed', ownerUserId: USER, businessId: BIZ })
  })
})
