import { beforeAll, describe, expect, it, vi } from 'vitest'
import type { Firestore } from 'firebase-admin/firestore'
import { InMemoryCoreBffSessionRepository, issueCoreBffSession } from '@/lib/core/bffSession'
import { CORE_BFF_CSRF_COOKIE, CORE_BFF_SESSION_COOKIE } from '@/lib/core/config'
import type { CorePlatformClient } from '@/lib/core/coreClient'
import { CorePlatformError } from '@/lib/core/errors'
import type { SupabaseClaims, SupabaseJwtVerifier } from '@/lib/core/jwtVerifier'
import { coreTrialDays, provisionCoreForNewTenant } from '@/lib/core/onboardingCore'
import type { SupabaseAuthClient } from '@/lib/core/supabaseAuth'

const USER = '11000000-0000-4000-8000-000000000001'
const BIZ = '5b000000-0000-4000-8000-000000000001'
const NOW = () => new Date('2026-09-16T12:00:00Z')
const ENV = { CORE_ONBOARDING_ENABLED: 'true' }

function claims(overrides: Partial<SupabaseClaims> = {}): SupabaseClaims {
  return { sub: USER, aud: 'authenticated', iss: 'https://core.example.test/auth/v1', exp: 9999999999, amr: [{ method: 'otp' }], ...overrides }
}

function makeDeps(overrides: { applyCommand?: ReturnType<typeof vi.fn>; verify?: () => Promise<SupabaseClaims> } = {}) {
  const sessions = new InMemoryCoreBffSessionRepository()
  const applyCommand = overrides.applyCommand ?? vi.fn(async (input: { command: string; payload: Record<string, unknown> }) =>
    input.command === 'ProvisionBusiness'
      ? { business_id: BIZ, slug: input.payload.slug, membership_id: '6b000000-0000-4000-8000-000000000001', created: true, tenant_alias_linked: true }
      : { business_id: BIZ, plan_key: 'kepenk_standard', status: 'trial', version: 1, event_id: 3, policy_version: 1 }
  )
  const deps = {
    sessions,
    auth: { refreshSession: vi.fn() } as unknown as SupabaseAuthClient,
    verifier: { verify: vi.fn(overrides.verify ?? (async () => claims())) } as unknown as SupabaseJwtVerifier,
    client: {
      applyCommand,
      listMemberships: vi.fn(async () => []),
      getBusinessPlatformSnapshot: vi.fn(async () => ({ business_id: BIZ, subscription: null, entitlements: [] })),
    } as unknown as CorePlatformClient,
    now: NOW,
  }
  return { deps, sessions, applyCommand }
}

async function requestWithSession(sessions: InMemoryCoreBffSessionRepository) {
  const issued = await issueCoreBffSession(sessions, { access_token: 'access.token.0123456789', refresh_token: 'r', expires_in: 3600, user: { id: USER } }, NOW())
  return new Request('https://app.kepenk.ai/api/onboarding/complete', { method: 'POST', headers: { cookie: `${CORE_BFF_SESSION_COOKIE}=${issued.token}; ${CORE_BFF_CSRF_COOKIE}=${issued.csrfToken}` } })
}

function fakeDb() {
  const update = vi.fn(async () => undefined)
  return { db: { collection: vi.fn(() => ({ doc: vi.fn(() => ({ update })) })) } as unknown as Firestore, update }
}

beforeAll(() => {
  process.env.SESSION_SECRET = 'kc05-test-session-secret-0123456789abcdef'
})

describe('provisionCoreForNewTenant', () => {
  it('provisions the business for the Core user, starts the trial and writes the shadow fields', async () => {
    const { deps, sessions, applyCommand } = makeDeps()
    const { db, update } = fakeDb()
    const outcome = await provisionCoreForNewTenant({ request: await requestWithSession(sessions), deps, db, esnafId: 'esnaf-new', name: 'Yeni Berber', now: NOW, env: ENV })
    expect(outcome).toEqual({ status: 'provisioned', businessId: BIZ, slug: 'yeni-berber', trialUntil: '2026-12-15T12:00:00.000Z', created: true })

    const calls = applyCommand.mock.calls as unknown as Array<[{ idempotencyKey: string; command: string; payload: Record<string, unknown> }]>
    expect(calls[0][0].command).toBe('ProvisionBusiness')
    expect(calls[0][0].idempotencyKey).toMatch(/^kc05-onboard-[0-9a-f]{48}$/)
    expect(calls[0][0].payload).toEqual({ owner_user_id: USER, name: 'Yeni Berber', slug: 'yeni-berber', timezone: 'Europe/Istanbul', tenant_alias: { provider: 'legacy-kepenk-firestore', external_id: 'esnaf-new' } })
    expect(calls[1][0].command).toBe('ChangeSubscription')
    expect(calls[1][0].idempotencyKey).toMatch(/^kc05-trial-[0-9a-f]{48}$/)
    expect(calls[1][0].payload).toMatchObject({ business_id: BIZ, plan_key: 'kepenk_standard', status: 'trial', current_period_start: '2026-09-16T12:00:00.000Z', current_period_end: '2026-12-15T12:00:00.000Z', source: { provider: 'kepenk-onboarding', event_id: 'esnaf-new' } })
    expect(update).toHaveBeenCalledWith(expect.objectContaining({ coreUserId: USER, coreBusinessId: BIZ, coreBusinessSlug: 'yeni-berber', coreOnboarding: expect.objectContaining({ status: 'provisioned' }) }))
  })

  it('is a no-op without the flag or without a Core session, and refuses recovery sessions', async () => {
    const { deps, sessions } = makeDeps()
    expect(await provisionCoreForNewTenant({ request: await requestWithSession(sessions), deps, db: null, esnafId: 'e', name: 'Berber', env: {} })).toEqual({ status: 'disabled' })
    expect(await provisionCoreForNewTenant({ request: new Request('https://app.kepenk.ai/'), deps, db: null, esnafId: 'e', name: 'Berber', env: ENV })).toEqual({ status: 'no_core_session' })

    const recovery = makeDeps({ verify: async () => claims({ amr: [{ method: 'recovery' }] }) })
    expect(await provisionCoreForNewTenant({ request: await requestWithSession(recovery.sessions), deps: recovery.deps, db: null, esnafId: 'e', name: 'Berber', env: ENV })).toEqual({ status: 'recovery_session' })
    expect(recovery.applyCommand).not.toHaveBeenCalled()
  })

  it('reports Core failures per step instead of half-provisioning, and never binds a foreign business', async () => {
    const slugTaken = makeDeps({ applyCommand: vi.fn(async () => { throw new CorePlatformError('BUSINESS_SLUG_TAKEN') }) })
    expect(await provisionCoreForNewTenant({ request: await requestWithSession(slugTaken.sessions), deps: slugTaken.deps, db: null, esnafId: 'e', name: 'Berber', env: ENV })).toEqual({ status: 'failed', step: 'provision', code: 'BUSINESS_SLUG_TAKEN' })

    const foreign = makeDeps({ applyCommand: vi.fn(async () => ({ business_id: BIZ, slug: 'berber', membership_id: null, created: false, tenant_alias_linked: true })) })
    expect(await provisionCoreForNewTenant({ request: await requestWithSession(foreign.sessions), deps: foreign.deps, db: null, esnafId: 'e', name: 'Berber', env: ENV })).toEqual({ status: 'failed', step: 'provision', code: 'OWNER_MISMATCH' })
    expect(foreign.applyCommand).toHaveBeenCalledTimes(1)

    const trialDown = makeDeps({
      applyCommand: vi.fn()
        .mockResolvedValueOnce({ business_id: BIZ, slug: 'berber', membership_id: '6b000000-0000-4000-8000-000000000001', created: true, tenant_alias_linked: true })
        .mockRejectedValueOnce(new CorePlatformError('CORE_UNAVAILABLE')),
    })
    const { db, update } = fakeDb()
    expect(await provisionCoreForNewTenant({ request: await requestWithSession(trialDown.sessions), deps: trialDown.deps, db, esnafId: 'e', name: 'Berber', env: ENV })).toEqual({ status: 'failed', step: 'trial', code: 'CORE_UNAVAILABLE' })
    expect(update).not.toHaveBeenCalled()

    const reserved = makeDeps()
    expect(await provisionCoreForNewTenant({ request: await requestWithSession(reserved.sessions), deps: reserved.deps, db: null, esnafId: 'e', name: 'Admin', env: ENV })).toEqual({ status: 'invalid_slug', candidate: 'admin' })
    expect(reserved.applyCommand).not.toHaveBeenCalled()
  })

  it('reads the trial length from CORE_TRIAL_DAYS with a bounded default', () => {
    expect(coreTrialDays({})).toBe(90)
    expect(coreTrialDays({ CORE_TRIAL_DAYS: '30' })).toBe(30)
    expect(coreTrialDays({ CORE_TRIAL_DAYS: '0' })).toBe(90)
    expect(coreTrialDays({ CORE_TRIAL_DAYS: 'abc' })).toBe(90)
  })
})
