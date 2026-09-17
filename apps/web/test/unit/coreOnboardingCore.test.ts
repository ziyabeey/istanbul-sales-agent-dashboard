import { beforeAll, describe, expect, it, vi } from 'vitest'
import type { Firestore } from 'firebase-admin/firestore'
import { InMemoryCoreBffSessionRepository, issueCoreBffSession } from '@/lib/core/bffSession'
import { CORE_BFF_CSRF_COOKIE, CORE_BFF_CSRF_HEADER, CORE_BFF_SESSION_COOKIE } from '@/lib/core/config'
import type { CorePlatformClient } from '@/lib/core/coreClient'
import { CorePlatformError } from '@/lib/core/errors'
import type { SupabaseClaims, SupabaseJwtVerifier } from '@/lib/core/jwtVerifier'
import {
  InMemoryOnboardingSagaStore,
  coreTrialDays,
  provisionCoreForNewTenant,
  redriveOnboardingSagas,
  resolveOnboardingCoreGate,
} from '@/lib/core/onboardingCore'
import type { SupabaseAuthClient } from '@/lib/core/supabaseAuth'

const USER = '11000000-0000-4000-8000-000000000001'
const BIZ = '5b000000-0000-4000-8000-000000000001'
const NOW = () => new Date('2026-09-16T12:00:00Z')
const LATER = () => new Date('2026-09-16T12:05:00Z')
const TRIAL_END = '2026-12-15T12:00:00.000Z'
const ENV = { CORE_ONBOARDING_ENABLED: 'true' }

function claims(overrides: Partial<SupabaseClaims> = {}): SupabaseClaims {
  return { sub: USER, aud: 'authenticated', iss: 'https://core.example.test/auth/v1', exp: 9999999999, amr: [{ method: 'otp' }], ...overrides }
}

function makeDeps(overrides: { verify?: () => Promise<SupabaseClaims> } = {}) {
  const sessions = new InMemoryCoreBffSessionRepository()
  const deps = {
    sessions,
    auth: { refreshSession: vi.fn() } as unknown as SupabaseAuthClient,
    verifier: { verify: vi.fn(overrides.verify ?? (async () => claims())) } as unknown as SupabaseJwtVerifier,
    client: {
      applyCommand: vi.fn(),
      listMemberships: vi.fn(async () => []),
      getBusinessPlatformSnapshot: vi.fn(async () => ({ business_id: BIZ, subscription: null, entitlements: [] })),
    } as unknown as CorePlatformClient,
    now: NOW,
  }
  return { deps, sessions }
}

async function cookies(sessions: InMemoryCoreBffSessionRepository) {
  const issued = await issueCoreBffSession(sessions, { access_token: 'access.token.0123456789', refresh_token: 'r', expires_in: 3600, user: { id: USER } }, NOW())
  return issued
}

function request(headers: Record<string, string>) {
  return new Request('https://app.kepenk.ai/api/onboarding/complete', { method: 'POST', headers })
}

function provisionClient(overrides: { applyCommand?: ReturnType<typeof vi.fn> } = {}) {
  const applyCommand = overrides.applyCommand ?? vi.fn(async (input: { command: string; payload: Record<string, unknown> }) =>
    input.command === 'ProvisionBusiness'
      ? { business_id: BIZ, slug: input.payload.slug, membership_id: '6b000000-0000-4000-8000-000000000001', created: true, tenant_alias_linked: true }
      : { business_id: BIZ, plan_key: 'kepenk_standard', status: 'trial', version: 1, event_id: 3, policy_version: 1 }
  )
  return { client: { applyCommand } as unknown as Pick<CorePlatformClient, 'applyCommand'>, applyCommand }
}

function fakeDb() {
  const update = vi.fn(async () => undefined)
  return { db: { collection: vi.fn(() => ({ doc: vi.fn(() => ({ update })) })) } as unknown as Firestore, update }
}

function commandCalls(applyCommand: ReturnType<typeof vi.fn>) {
  return applyCommand.mock.calls as unknown as Array<[{ idempotencyKey: string; command: string; payload: Record<string, unknown> }]>
}

beforeAll(() => {
  process.env.SESSION_SECRET = 'kc05-test-session-secret-0123456789abcdef'
})

describe('resolveOnboardingCoreGate', () => {
  it('lets the intentional legacy path through and refuses every Core-session request that misses the mutation gate', async () => {
    const { deps, sessions } = makeDeps()
    const issued = await cookies(sessions)
    const cookie = `${CORE_BFF_SESSION_COOKIE}=${issued.token}; ${CORE_BFF_CSRF_COOKIE}=${issued.csrfToken}`

    // Feature flag off, and no Core session at all: no gate, no Core write.
    expect(await resolveOnboardingCoreGate(request({ cookie }), deps, {})).toEqual({ mode: 'disabled' })
    expect(await resolveOnboardingCoreGate(request({ origin: 'https://app.kepenk.ai' }), deps, ENV)).toEqual({ mode: 'legacy' })

    // Origin-less and cross-origin requests that DO carry a Core session are refused.
    expect(await resolveOnboardingCoreGate(request({ cookie }), deps, ENV)).toMatchObject({ mode: 'rejected', reason: 'ORIGIN_REJECTED', status: 403 })
    expect(await resolveOnboardingCoreGate(request({ cookie, origin: 'https://evil.example' }), deps, ENV)).toMatchObject({ mode: 'rejected', reason: 'ORIGIN_REJECTED' })

    // Missing and forged double-submit CSRF.
    expect(await resolveOnboardingCoreGate(request({ cookie, origin: 'https://app.kepenk.ai' }), deps, ENV)).toMatchObject({ mode: 'rejected', reason: 'CSRF_REJECTED', status: 403 })
    expect(await resolveOnboardingCoreGate(request({ cookie, origin: 'https://app.kepenk.ai', [CORE_BFF_CSRF_HEADER]: 'x'.repeat(issued.csrfToken.length) }), deps, ENV)).toMatchObject({ mode: 'rejected', reason: 'CSRF_REJECTED' })

    // A complete, standard-class request passes and carries the session user.
    expect(await resolveOnboardingCoreGate(request({ cookie, origin: 'https://app.kepenk.ai', [CORE_BFF_CSRF_HEADER]: issued.csrfToken }), deps, ENV)).toEqual({ mode: 'core', userId: USER })
  })

  it('refuses recovery and unverified session classes even with a valid Origin and CSRF pair', async () => {
    const cases: Array<{ amr: SupabaseClaims['amr']; reason: string }> = [
      { amr: [{ method: 'recovery' }], reason: 'RECOVERY_REQUIRED' },
      { amr: [], reason: 'SESSION_CLASS_UNVERIFIED' },
    ]
    for (const { amr, reason } of cases) {
      const { deps, sessions } = makeDeps({ verify: async () => claims({ amr }) })
      const issued = await cookies(sessions)
      const headers = { cookie: `${CORE_BFF_SESSION_COOKIE}=${issued.token}; ${CORE_BFF_CSRF_COOKIE}=${issued.csrfToken}`, origin: 'https://app.kepenk.ai', [CORE_BFF_CSRF_HEADER]: issued.csrfToken }
      expect(await resolveOnboardingCoreGate(request(headers), deps, ENV)).toMatchObject({ mode: 'rejected', reason })
    }
  })
})

describe('provisionCoreForNewTenant — durable saga', () => {
  it('persists the intent, provisions the business, starts the trial and writes the shadow fields', async () => {
    const store = new InMemoryOnboardingSagaStore()
    const { client, applyCommand } = provisionClient()
    const { db, update } = fakeDb()

    const outcome = await provisionCoreForNewTenant({ ownerUserId: USER, client, store, db, esnafId: 'esnaf-new', name: 'Yeni Berber', now: NOW, env: ENV })
    expect(outcome).toEqual({ status: 'provisioned', businessId: BIZ, slug: 'yeni-berber', trialUntil: TRIAL_END, created: true })

    const calls = commandCalls(applyCommand)
    expect(calls[0][0].command).toBe('ProvisionBusiness')
    expect(calls[0][0].idempotencyKey).toMatch(/^kc05-onboard-[0-9a-f]{48}$/)
    expect(calls[0][0].payload).toEqual({ owner_user_id: USER, name: 'Yeni Berber', slug: 'yeni-berber', timezone: 'Europe/Istanbul', tenant_alias: { provider: 'legacy-kepenk-firestore', external_id: 'esnaf-new' } })
    expect(calls[1][0].command).toBe('ChangeSubscription')
    expect(calls[1][0].idempotencyKey).toMatch(/^kc05-trial-[0-9a-f]{48}$/)
    expect(calls[1][0].payload).toMatchObject({ business_id: BIZ, plan_key: 'kepenk_standard', status: 'trial', current_period_start: '2026-09-16T12:00:00.000Z', current_period_end: TRIAL_END, source: { provider: 'kepenk-onboarding', event_id: 'esnaf-new' } })
    expect(update).toHaveBeenCalledWith(expect.objectContaining({ coreUserId: USER, coreBusinessId: BIZ, coreBusinessSlug: 'yeni-berber', coreOnboarding: expect.objectContaining({ status: 'provisioned' }) }))
    expect(store.records.get('esnaf-new')).toMatchObject({ status: 'completed', businessId: BIZ, trialStart: '2026-09-16T12:00:00.000Z', trialEnd: TRIAL_END })
  })

  it('re-drives a lost trial response with the original payload: one business, one trial event, the original period', async () => {
    const store = new InMemoryOnboardingSagaStore()
    // The trial command commits in Core but the client sees a timeout.
    const applyCommand = vi.fn()
      .mockResolvedValueOnce({ business_id: BIZ, slug: 'yeni-berber', membership_id: '6b000000-0000-4000-8000-000000000001', created: true, tenant_alias_linked: true })
      .mockRejectedValueOnce(new CorePlatformError('CORE_UNAVAILABLE'))
      .mockResolvedValue({ business_id: BIZ, plan_key: 'kepenk_standard', status: 'trial', version: 1, event_id: 3, policy_version: 1 })
    const { client } = provisionClient({ applyCommand })
    const { db, update } = fakeDb()

    const first = await provisionCoreForNewTenant({ ownerUserId: USER, client, store, db, esnafId: 'esnaf-new', name: 'Yeni Berber', now: NOW, env: ENV })
    expect(first).toMatchObject({ status: 'failed', step: 'trial', code: 'CORE_UNAVAILABLE', retryable: true })
    expect(store.records.get('esnaf-new')).toMatchObject({ status: 'provisioned', businessId: BIZ, attempts: 1 })
    expect(update).not.toHaveBeenCalled()

    // The redrive runs five minutes later: the clock moved, the intent did not.
    const report = await redriveOnboardingSagas({ store, client, db, now: LATER, limit: 10 })
    expect(report).toMatchObject({ processed: 1, completed: 1, failed: 0 })

    const calls = commandCalls(applyCommand)
    expect(calls.filter((call) => call[0].command === 'ProvisionBusiness')).toHaveLength(1)
    const trials = calls.filter((call) => call[0].command === 'ChangeSubscription')
    expect(trials).toHaveLength(2)
    expect(new Set(trials.map((call) => call[0].idempotencyKey)).size).toBe(1)
    expect(new Set(trials.map((call) => JSON.stringify(call[0].payload))).size).toBe(1)
    expect(trials[1][0].payload).toMatchObject({ current_period_start: '2026-09-16T12:00:00.000Z', current_period_end: TRIAL_END })
    expect(store.records.get('esnaf-new')).toMatchObject({ status: 'completed' })
  })

  it('converges a duplicate submission on the stored intent and never creates a second business', async () => {
    const store = new InMemoryOnboardingSagaStore()
    const { client, applyCommand } = provisionClient()
    const [a, b] = await Promise.all([
      provisionCoreForNewTenant({ ownerUserId: USER, client, store, db: null, esnafId: 'esnaf-new', name: 'Yeni Berber', now: NOW, env: ENV }),
      provisionCoreForNewTenant({ ownerUserId: USER, client, store, db: null, esnafId: 'esnaf-new', name: 'Yeni Berber', now: LATER, env: ENV }),
    ])
    expect(store.records.size).toBe(1)
    expect(a).toMatchObject({ businessId: BIZ, trialUntil: TRIAL_END })
    expect(b).toMatchObject({ businessId: BIZ, trialUntil: TRIAL_END })
    const keys = commandCalls(applyCommand).map((call) => call[0].idempotencyKey)
    expect(new Set(keys).size).toBe(2)
    const periods = commandCalls(applyCommand).filter((c) => c[0].command === 'ChangeSubscription').map((c) => c[0].payload.current_period_start)
    expect(new Set(periods)).toEqual(new Set(['2026-09-16T12:00:00.000Z']))
  })

  it('stops permanently on non-retryable Core errors and never binds a foreign business', async () => {
    const slugTaken = provisionClient({ applyCommand: vi.fn(async () => { throw new CorePlatformError('BUSINESS_SLUG_TAKEN') }) })
    const store = new InMemoryOnboardingSagaStore()
    expect(await provisionCoreForNewTenant({ ownerUserId: USER, client: slugTaken.client, store, db: null, esnafId: 'e1', name: 'Berber', now: NOW, env: ENV }))
      .toMatchObject({ status: 'failed', step: 'provision', code: 'BUSINESS_SLUG_TAKEN', retryable: false })
    expect(store.records.get('e1')).toMatchObject({ status: 'failed', nextAttemptAt: null })
    expect(await store.listDue({ now: LATER(), limit: 10 })).toEqual([])

    const foreign = provisionClient({ applyCommand: vi.fn(async () => ({ business_id: BIZ, slug: 'berber', membership_id: null, created: false, tenant_alias_linked: true })) })
    const store2 = new InMemoryOnboardingSagaStore()
    expect(await provisionCoreForNewTenant({ ownerUserId: USER, client: foreign.client, store: store2, db: null, esnafId: 'e2', name: 'Berber', now: NOW, env: ENV }))
      .toMatchObject({ status: 'failed', step: 'provision', code: 'OWNER_MISMATCH', retryable: false })
    expect(foreign.applyCommand).toHaveBeenCalledTimes(1)

    const reserved = provisionClient()
    expect(await provisionCoreForNewTenant({ ownerUserId: USER, client: reserved.client, store: new InMemoryOnboardingSagaStore(), db: null, esnafId: 'e3', name: 'Admin', now: NOW, env: ENV }))
      .toEqual({ status: 'invalid_slug', candidate: 'admin' })
    expect(reserved.applyCommand).not.toHaveBeenCalled()
  })

  it('reads the trial length from CORE_TRIAL_DAYS with a bounded default', () => {
    expect(coreTrialDays({})).toBe(90)
    expect(coreTrialDays({ CORE_TRIAL_DAYS: '30' })).toBe(30)
    expect(coreTrialDays({ CORE_TRIAL_DAYS: '0' })).toBe(90)
    expect(coreTrialDays({ CORE_TRIAL_DAYS: 'abc' })).toBe(90)
  })
})
