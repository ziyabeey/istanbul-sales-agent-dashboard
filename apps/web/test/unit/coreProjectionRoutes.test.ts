import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SERVICE_AUDIENCES, SERVICE_SCOPES, issueServiceToken } from '@/lib/serviceAuth'
import { getCoreRuntime } from '@/lib/core/deps'
import { runCoreProjection } from '@/lib/core/projection'
import { resolveLinkedBusinessId } from '@/lib/core/billingStore'
import { validateAdminSessionToken } from '@/lib/auth/adminSession'
import { runAuditedAdminMutation } from '@/lib/security/auditLogger'
import { POST as projection } from '@/app/api/cron/core-projection/route'
import { POST as entitlement } from '@/app/api/admin/core/entitlement/route'

vi.mock('@/lib/core/deps', () => ({ getCoreRuntime: vi.fn() }))
vi.mock('@/lib/core/projection', () => ({ runCoreProjection: vi.fn(async () => ({ fetched: 3, applied: 3, orphans: 0, cursorAfter: 3, hasMore: false, lagMs: 120 })) }))
vi.mock('@/lib/core/projectionStore', () => ({ FirestoreCoreProjectionStore: class {} }))
vi.mock('@/lib/core/billingStore', () => ({ resolveLinkedBusinessId: vi.fn(async () => '5b000000-0000-4000-8000-000000000001') }))
vi.mock('@/lib/impersonation', () => ({
  assertNoActiveImpersonationForRestrictedAction: vi.fn(async () => undefined),
  ImpersonationRestrictedActionError: class extends Error {},
}))
vi.mock('@/lib/security/auditLogger', () => ({
  AdminAuditPersistenceError: class extends Error {},
  runAuditedAdminMutation: vi.fn(async (_input: unknown, _request: unknown, mutation: () => Promise<unknown>) => mutation()),
}))
vi.mock('@/lib/auth/adminSession', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/auth/adminSession')>()
  return { ...actual, validateAdminSessionToken: vi.fn(async () => null) }
})

const issuedAt = new Date('2026-09-16T07:00:00.000Z')

function serviceToken(audience: string, scopes: string[]) {
  return issueServiceToken({ subject: 'cloud-scheduler', audience, scopes, now: issuedAt, invocationId: 'inv-kc05-1' })
}

function post(url: string, headers: Record<string, string>, body: unknown = {}) {
  return new Request(url, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) })
}

const applyCommand = vi.fn(async () => ({ business_id: '5b000000-0000-4000-8000-000000000001', entitlement_key: 'custom_domain', granted: true, event_id: 9 }))

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-09-16T07:00:30.000Z'))
  process.env.SERVICE_AUTH_SECRET = 'kc05-service-auth-secret-0123456789abcdef0123456789abcdef'
  process.env.CORE_PROJECTION_ENABLED = 'true'
  vi.mocked(getCoreRuntime).mockReturnValue({ client: { applyCommand } } as never)
  applyCommand.mockClear()
})

afterEach(() => {
  vi.useRealTimers()
  delete process.env.CORE_PROJECTION_ENABLED
  vi.mocked(runCoreProjection).mockClear()
})

describe('POST /api/cron/core-projection', () => {
  it('requires the projection ServicePrincipal and the feature flag', async () => {
    const url = 'https://app.kepenk.ai/api/cron/core-projection'
    expect((await projection(post(url, {}))).status).toBe(401)
    expect((await projection(post(url, { authorization: `Bearer ${serviceToken(SERVICE_AUDIENCES.coreBackfill, [SERVICE_SCOPES.coreBackfill])}` }))).status).toBe(401)
    const auth = { authorization: `Bearer ${serviceToken(SERVICE_AUDIENCES.coreProjection, [SERVICE_SCOPES.coreProjection])}` }
    delete process.env.CORE_PROJECTION_ENABLED
    expect((await projection(post(url, auth))).status).toBe(404)
    process.env.CORE_PROJECTION_ENABLED = 'true'
    const response = await projection(post(url, auth, { limit: 50 }))
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ ok: true, projection: { applied: 3, lagMs: 120 } })
    expect(runCoreProjection).toHaveBeenCalledWith(expect.objectContaining({ limit: 50 }))
  })
})

describe('POST /api/admin/core/entitlement', () => {
  const url = 'https://app.kepenk.ai/api/admin/core/entitlement'
  const adminHeaders = { origin: 'https://app.kepenk.ai', cookie: 'admin_session=' + 'a'.repeat(43) }

  it('needs a durable AdminSession and rejects the raw admin header', async () => {
    expect((await entitlement(post(url, { origin: 'https://app.kepenk.ai', 'x-admin-token': 'kepenk-admin-2026' }, { esnafId: 'e', action: 'grant', entitlementKey: 'custom_domain' }))).status).toBe(401)
    expect((await entitlement(post(url, adminHeaders, { esnafId: 'e', action: 'grant', entitlementKey: 'custom_domain' }))).status).toBe(401)
    expect(applyCommand).not.toHaveBeenCalled()
  })

  it('issues an audited Core command instead of patching Firestore', async () => {
    vi.mocked(validateAdminSessionToken).mockResolvedValue({ principalId: 'admin-1' } as never)
    const response = await entitlement(post(url, adminHeaders, { esnafId: 'esnaf-1', action: 'grant', entitlementKey: 'Custom_Domain', validUntil: '2027-01-01T00:00:00Z', idempotencyKey: 'ticket-42' }))
    expect(response.status).toBe(200)
    expect(runAuditedAdminMutation).toHaveBeenCalledWith(expect.objectContaining({ actorAdminId: 'admin-1', targetType: 'business', targetId: 'esnaf-1', action: 'ESNAF_UPDATED' }), expect.anything(), expect.any(Function))
    const [input] = applyCommand.mock.calls[0] as unknown as [{ idempotencyKey: string; command: string; payload: Record<string, unknown> }]
    expect(input.command).toBe('GrantEntitlement')
    expect(input.payload).toEqual({ business_id: '5b000000-0000-4000-8000-000000000001', entitlement_key: 'custom_domain', limit_value: null, valid_until: '2027-01-01T00:00:00Z' })
    const again = await entitlement(post(url, adminHeaders, { esnafId: 'esnaf-1', action: 'grant', entitlementKey: 'custom_domain', validUntil: '2027-01-01T00:00:00Z', idempotencyKey: 'ticket-42' }))
    expect(again.status).toBe(200)
    const [second] = applyCommand.mock.calls[1] as unknown as [{ idempotencyKey: string }]
    expect(second.idempotencyKey).toBe(input.idempotencyKey)
  })

  it('validates input and refuses unlinked tenants', async () => {
    vi.mocked(validateAdminSessionToken).mockResolvedValue({ principalId: 'admin-1' } as never)
    expect((await entitlement(post(url, adminHeaders, { esnafId: 'esnaf-1', action: 'drop', entitlementKey: 'x' }))).status).toBe(400)
    expect((await entitlement(post(url, adminHeaders, { esnafId: 'esnaf-1', action: 'grant', entitlementKey: 'Bad Key' }))).status).toBe(400)
    expect((await entitlement(post(url, adminHeaders, { esnafId: 'esnaf-1', action: 'grant', entitlementKey: 'booking', limitValue: -1 }))).status).toBe(400)
    vi.mocked(resolveLinkedBusinessId).mockResolvedValueOnce(null)
    const unlinked = await entitlement(post(url, adminHeaders, { esnafId: 'esnaf-2', action: 'revoke', entitlementKey: 'booking' }))
    expect(unlinked.status).toBe(409)
    expect(applyCommand).not.toHaveBeenCalled()
  })
})
