import { beforeAll, describe, expect, it, vi } from 'vitest'
import { InMemoryCoreBffSessionRepository, issueCoreBffSession } from '@/lib/core/bffSession'
import { CORE_BFF_CSRF_COOKIE, CORE_BFF_CSRF_HEADER, CORE_BFF_SESSION_COOKIE } from '@/lib/core/config'
import type { CoreMembership, CorePlatformClient } from '@/lib/core/coreClient'
import { CoreAuthError, CorePlatformError } from '@/lib/core/errors'
import type { SupabaseClaims, SupabaseJwtVerifier } from '@/lib/core/jwtVerifier'
import { hasContextEntitlement, requireCoreContext, resolveCoreRequestContext, type CoreContextDeps } from '@/lib/core/requestContext'
import type { SupabaseAuthClient, SupabaseSession } from '@/lib/core/supabaseAuth'

const USER = '11000000-0000-4000-8000-000000000001'
const BIZ_A = '5b000000-0000-4000-8000-000000000001'
const BIZ_B = '5b000000-0000-4000-8000-000000000002'
const NOW = new Date('2026-09-16T12:00:00Z')

function session(accessToken: string, expiresIn = 3600): SupabaseSession {
  return { access_token: accessToken, refresh_token: `refresh-for-${accessToken}`, expires_in: expiresIn, user: { id: USER } }
}

function claimsFor(token: string, overrides: Partial<SupabaseClaims> = {}): SupabaseClaims {
  return {
    sub: USER,
    aud: 'authenticated',
    iss: 'https://core.example.test/auth/v1',
    exp: Math.floor(NOW.getTime() / 1000) + 3600,
    amr: [{ method: 'otp' }],
    session_id: token,
    ...overrides,
  }
}

function membership(businessId: string, role: CoreMembership['role'] = 'owner'): CoreMembership {
  return { id: `6b000000-0000-4000-8000-00000000000${businessId.slice(-1)}`, business_id: businessId, role, active: true }
}

function snapshotFor(businessId: string) {
  return {
    business_id: businessId,
    subscription: { plan_key: 'kepenk_standard', status: 'active' as const, current_period_start: null, current_period_end: null, version: 1 },
    entitlements: [
      { entitlement_key: 'booking', granted: true, limit_value: null, valid_until: null },
      { entitlement_key: 'ai_booking_assistant', granted: true, limit_value: null, valid_until: '2026-09-16T11:00:00Z' },
      { entitlement_key: 'custom_domain', granted: false, limit_value: null, valid_until: null },
    ],
  }
}

function makeDeps(overrides: {
  memberships?: CoreMembership[] | Error
  snapshot?: Error
  verify?: (token: string) => Promise<SupabaseClaims>
  refresh?: (refreshToken: string) => Promise<SupabaseSession>
} = {}) {
  const sessions = new InMemoryCoreBffSessionRepository()
  const verify = vi.fn(overrides.verify ?? (async (token: string) => claimsFor(token)))
  const refreshSession = vi.fn(overrides.refresh ?? (async () => session('refreshed-access-token')))
  const listMemberships = vi.fn(async () => {
    if (overrides.memberships instanceof Error) throw overrides.memberships
    return overrides.memberships ?? [membership(BIZ_A)]
  })
  const getBusinessPlatformSnapshot = vi.fn(async (_token: string, businessId: string) => {
    if (overrides.snapshot) throw overrides.snapshot
    return snapshotFor(businessId)
  })
  const deps: CoreContextDeps = {
    sessions,
    auth: { refreshSession } as unknown as SupabaseAuthClient,
    verifier: { verify } as unknown as SupabaseJwtVerifier,
    client: { listMemberships, getBusinessPlatformSnapshot } as unknown as CorePlatformClient,
    now: () => NOW,
  }
  return { deps, sessions, verify, refreshSession, listMemberships, getBusinessPlatformSnapshot }
}

async function requestWithSession(sessions: InMemoryCoreBffSessionRepository, accessToken = 'access-token-1', options: { expiresIn?: number; method?: string; csrf?: boolean; selected?: string } = {}) {
  const issued = await issueCoreBffSession(sessions, session(accessToken, options.expiresIn ?? 3600), NOW)
  if (options.selected) await sessions.update(issued.record.sessionId, { selectedBusinessId: options.selected })
  const headers: Record<string, string> = {
    cookie: `${CORE_BFF_SESSION_COOKIE}=${issued.token}; ${CORE_BFF_CSRF_COOKIE}=${issued.csrfToken}`,
  }
  if (options.csrf !== false && options.method && options.method !== 'GET') {
    headers.origin = 'https://app.kepenk.ai'
    headers[CORE_BFF_CSRF_HEADER] = issued.csrfToken
  }
  return { issued, request: new Request('https://app.kepenk.ai/api/core/auth/me', { method: options.method ?? 'GET', headers }) }
}

beforeAll(() => {
  process.env.SESSION_SECRET = 'kc02-test-session-secret-0123456789abcdef'
})

describe('resolveCoreRequestContext', () => {
  it('returns NO_SESSION without a locator and SESSION_REVOKED for unknown or revoked locators', async () => {
    const { deps, sessions } = makeDeps()
    expect(await resolveCoreRequestContext(new Request('https://app.kepenk.ai/'), deps)).toEqual({ ok: false, reason: 'NO_SESSION' })

    const unknown = new Request('https://app.kepenk.ai/', { headers: { cookie: `${CORE_BFF_SESSION_COOKIE}=${'z'.repeat(43)}` } })
    expect(await resolveCoreRequestContext(unknown, deps)).toEqual({ ok: false, reason: 'SESSION_REVOKED' })

    const { issued, request } = await requestWithSession(sessions)
    await sessions.update(issued.record.sessionId, { revokedAt: NOW.toISOString() })
    expect(await resolveCoreRequestContext(request, deps)).toEqual({ ok: false, reason: 'SESSION_REVOKED' })
  })

  it('derives user and business from the verified JWT and active memberships', async () => {
    const { deps, sessions, verify, refreshSession } = makeDeps()
    const { request } = await requestWithSession(sessions)
    const result = await resolveCoreRequestContext(request, deps)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.context.userId).toBe(USER)
    expect(result.context.businessId).toBe(BIZ_A)
    expect(result.context.role).toBe('owner')
    expect(result.context.recovery).toBe(false)
    // Entitlements: granted and unexpired only, from the KC-01 snapshot with the user's JWT.
    expect(result.context.entitlements).toEqual(['booking'])
    expect(result.context.subscription?.plan_key).toBe('kepenk_standard')
    expect(hasContextEntitlement(result.context, 'booking')).toBe(true)
    expect(hasContextEntitlement(result.context, 'custom_domain')).toBe(false)
    expect(hasContextEntitlement(result.context, 'ai_booking_assistant')).toBe(false)
    expect(verify).toHaveBeenCalledWith('access-token-1')
    expect(refreshSession).not.toHaveBeenCalled()
  })

  it('fails closed when the entitlement snapshot cannot be read', async () => {
    const down = makeDeps({ snapshot: new CorePlatformError('CORE_UNAVAILABLE') })
    const request = await requestWithSession(down.sessions)
    expect(await resolveCoreRequestContext(request.request, down.deps)).toEqual({ ok: false, reason: 'CORE_UNAVAILABLE' })

    const denied = makeDeps({ snapshot: new CorePlatformError('BUSINESS_ACCESS_DENIED') })
    const deniedRequest = await requestWithSession(denied.sessions)
    expect(await resolveCoreRequestContext(deniedRequest.request, denied.deps)).toEqual({ ok: false, reason: 'SESSION_EXPIRED' })

    const none = makeDeps({ memberships: [] })
    const noneRequest = await requestWithSession(none.sessions)
    const result = await resolveCoreRequestContext(noneRequest.request, none.deps)
    expect(result.ok && result.context.entitlements).toEqual([])
    expect(none.getBusinessPlatformSnapshot).not.toHaveBeenCalled()
  })

  it('only honours a stored business selection that is still an active membership', async () => {
    const { deps, sessions } = makeDeps({ memberships: [membership(BIZ_A), membership(BIZ_B, 'staff')] })

    const ambiguous = await requestWithSession(sessions)
    const noSelection = await resolveCoreRequestContext(ambiguous.request, deps)
    expect(noSelection.ok && noSelection.context.businessId).toBeNull()

    const selected = await requestWithSession(sessions, 'access-token-2', { selected: BIZ_B })
    const withSelection = await resolveCoreRequestContext(selected.request, deps)
    expect(withSelection.ok && withSelection.context.businessId).toBe(BIZ_B)
    expect(withSelection.ok && withSelection.context.role).toBe('staff')

    const stale = await requestWithSession(sessions, 'access-token-3', { selected: '5b000000-0000-4000-8000-0000000000ff' })
    const withStale = await resolveCoreRequestContext(stale.request, deps)
    expect(withStale.ok && withStale.context.businessId).toBeNull()
  })

  it('makes membership deactivation effective on the next request', async () => {
    const { deps, sessions } = makeDeps({ memberships: [] })
    const { request } = await requestWithSession(sessions)
    const result = await resolveCoreRequestContext(request, deps)
    expect(result.ok && result.context.businessId).toBeNull()
    expect(result.ok && result.context.memberships).toEqual([])
  })

  it('refreshes a near-expiry access token, stores the rotated tokens and verifies the new JWT', async () => {
    const { deps, sessions, verify, refreshSession } = makeDeps()
    const { issued, request } = await requestWithSession(sessions, 'access-token-old', { expiresIn: 30 })
    const result = await resolveCoreRequestContext(request, deps)
    expect(result.ok).toBe(true)
    expect(refreshSession).toHaveBeenCalledWith('refresh-for-access-token-old')
    expect(verify).toHaveBeenLastCalledWith('refreshed-access-token')
    expect(result.ok && result.context.accessToken).toBe('refreshed-access-token')
    const stored = await sessions.get(issued.record.sessionId)
    expect(stored?.accessTokenEnc).not.toBe(issued.record.accessTokenEnc)
  })

  it('falls back to refresh when the stored JWT is rejected as expired, and fails closed when refresh fails', async () => {
    const rejected = makeDeps({
      verify: async (token) => {
        if (token === 'access-token-stale') throw new CoreAuthError('SESSION_EXPIRED')
        return claimsFor(token)
      },
    })
    const staleRequest = await requestWithSession(rejected.sessions, 'access-token-stale')
    const recovered = await resolveCoreRequestContext(staleRequest.request, rejected.deps)
    expect(recovered.ok).toBe(true)
    expect(rejected.refreshSession).toHaveBeenCalledTimes(1)

    const failing = makeDeps({ refresh: async () => { throw new CoreAuthError('SESSION_EXPIRED') } })
    const nearExpiry = await requestWithSession(failing.sessions, 'access-token-x', { expiresIn: 10 })
    expect(await resolveCoreRequestContext(nearExpiry.request, failing.deps)).toEqual({ ok: false, reason: 'SESSION_EXPIRED' })
  })

  it('rejects a locator whose JWT subject no longer matches the session owner', async () => {
    const { deps, sessions } = makeDeps({ verify: async (token) => claimsFor(token, { sub: '22000000-0000-4000-8000-000000000002' }) })
    const { request } = await requestWithSession(sessions)
    expect(await resolveCoreRequestContext(request, deps)).toEqual({ ok: false, reason: 'SESSION_REVOKED' })
  })

  it('fails closed on a JWT with missing or empty amr before touching memberships or entitlements', async () => {
    for (const amr of [undefined, []] as Array<SupabaseClaims['amr']>) {
      const { deps, sessions, listMemberships, getBusinessPlatformSnapshot } = makeDeps({ verify: async (token) => claimsFor(token, { amr }) })
      const { request } = await requestWithSession(sessions)
      expect(await resolveCoreRequestContext(request, deps)).toEqual({ ok: false, reason: 'SESSION_CLASS_UNVERIFIED' })
      expect(listMemberships).not.toHaveBeenCalled()
      expect(getBusinessPlatformSnapshot).not.toHaveBeenCalled()
      const gated = await requireCoreContext(request, deps, { csrf: false })
      expect(gated.ok).toBe(false)
      if (!gated.ok) {
        expect(gated.response.status).toBe(401)
        expect(await gated.response.json()).toEqual({ error: 'SESSION_CLASS_UNVERIFIED' })
      }
    }
  })

  it('marks recovery sessions and skips membership resolution for them', async () => {
    const { deps, sessions, listMemberships } = makeDeps({ verify: async (token) => claimsFor(token, { amr: [{ method: 'recovery' }] }) })
    const { request } = await requestWithSession(sessions)
    const result = await resolveCoreRequestContext(request, deps)
    expect(result.ok && result.context.recovery).toBe(true)
    expect(result.ok && result.context.sessionClass).toBe('recovery')
    expect(result.ok && result.context.businessId).toBeNull()
    expect(listMemberships).not.toHaveBeenCalled()
  })

  it('reports CORE_UNAVAILABLE when Postgres cannot answer and SESSION_EXPIRED when it rejects the JWT', async () => {
    const down = makeDeps({ memberships: new CorePlatformError('CORE_UNAVAILABLE') })
    const downRequest = await requestWithSession(down.sessions)
    expect(await resolveCoreRequestContext(downRequest.request, down.deps)).toEqual({ ok: false, reason: 'CORE_UNAVAILABLE' })

    const rejected = makeDeps({ memberships: new CorePlatformError('AUTH_REQUIRED') })
    const rejectedRequest = await requestWithSession(rejected.sessions)
    expect(await resolveCoreRequestContext(rejectedRequest.request, rejected.deps)).toEqual({ ok: false, reason: 'SESSION_EXPIRED' })
  })
})

describe('requireCoreContext', () => {
  it('enforces CSRF for mutations, blocks recovery sessions by default and can require a business', async () => {
    const { deps, sessions } = makeDeps({ memberships: [] })

    const noCsrf = await requestWithSession(sessions, 'access-token-a', { method: 'POST', csrf: false })
    const rejected = await requireCoreContext(noCsrf.request, deps)
    expect(rejected.ok).toBe(false)
    expect(!rejected.ok && rejected.response.status).toBe(403)

    const withCsrf = await requestWithSession(sessions, 'access-token-b', { method: 'POST' })
    const accepted = await requireCoreContext(withCsrf.request, deps)
    expect(accepted.ok).toBe(true)

    const needsBusiness = await requestWithSession(sessions, 'access-token-c', { method: 'POST' })
    const missingBusiness = await requireCoreContext(needsBusiness.request, deps, { requireBusiness: true })
    expect(!missingBusiness.ok && missingBusiness.response.status).toBe(403)

    const entitled = makeDeps()
    const granted = await requestWithSession(entitled.sessions, 'access-token-e', { method: 'POST' })
    expect((await requireCoreContext(granted.request, entitled.deps, { requireEntitlement: 'booking' })).ok).toBe(true)
    const revoked = await requestWithSession(entitled.sessions, 'access-token-f', { method: 'POST' })
    const denied = await requireCoreContext(revoked.request, entitled.deps, { requireEntitlement: 'custom_domain' })
    expect(!denied.ok && denied.response.status).toBe(403)
    expect(!denied.ok && (await denied.response.json())).toMatchObject({ error: 'ENTITLEMENT_REQUIRED' })

    const recoveryDeps = makeDeps({ verify: async (token) => claimsFor(token, { amr: [{ method: 'recovery' }] }) })
    const recovery = await requestWithSession(recoveryDeps.sessions, 'access-token-r')
    const blocked = await requireCoreContext(recovery.request, recoveryDeps.deps, { csrf: false })
    expect(!blocked.ok && blocked.response.status).toBe(403)
    const allowed = await requireCoreContext(recovery.request, recoveryDeps.deps, { csrf: false, allowRecovery: true })
    expect(allowed.ok).toBe(true)
  })
})
