import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SERVICE_AUDIENCES, SERVICE_SCOPES, issueServiceToken } from '@/lib/serviceAuth'
import { getCoreRuntime } from '@/lib/core/deps'
import { runTenantBackfill, runTenantParityCheck } from '@/lib/core/backfill'
import { validateAdminSessionToken } from '@/lib/auth/adminSession'
import { POST as coreBackfill } from '@/app/api/cron/core-backfill/route'
import { GET as parityGet, POST as parityPost } from '@/app/api/admin/core/parity/route'

vi.mock('@/lib/core/deps', () => ({ getCoreRuntime: vi.fn() }))
vi.mock('@/lib/core/backfill', () => ({
  runTenantBackfill: vi.fn(async () => ({ kind: 'backfill', scanned: 1, provisioned: 1 })),
  runTenantParityCheck: vi.fn(async () => ({ kind: 'parity', zeroDrift: true })),
}))
vi.mock('@/lib/core/backfillSource', () => ({
  CORE_MIGRATION_REPORTS_COLLECTION: 'core_migration_reports',
  FirestoreLegacyTenantSource: class {},
}))
vi.mock('@/lib/auth/adminSession', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/auth/adminSession')>()
  return { ...actual, validateAdminSessionToken: vi.fn(async () => null) }
})

const issuedAt = new Date('2026-09-16T07:00:00.000Z')

function serviceToken(audience: string, scopes: string[], subject = 'cloud-scheduler') {
  return issueServiceToken({ subject, audience, scopes, now: issuedAt, invocationId: 'inv-kc03-1' })
}

function post(url: string, headers: Record<string, string>, body: unknown = {}) {
  return new Request(url, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-09-16T07:00:30.000Z'))
  process.env.SERVICE_AUTH_SECRET = 'kc03-service-auth-secret-0123456789abcdef0123456789abcdef'
  process.env.CORE_BACKFILL_ENABLED = 'true'
  vi.mocked(getCoreRuntime).mockReturnValue({ client: {} } as never)
})

afterEach(() => {
  vi.useRealTimers()
  delete process.env.CORE_BACKFILL_ENABLED
  vi.mocked(runTenantBackfill).mockClear()
  vi.mocked(runTenantParityCheck).mockClear()
})

describe('POST /api/cron/core-backfill', () => {
  it('requires a signed ServicePrincipal scoped to the backfill audience', async () => {
    const url = 'https://app.kepenk.ai/api/cron/core-backfill'
    expect((await coreBackfill(post(url, {}))).status).toBe(401)
    expect((await coreBackfill(post(url, { 'x-cron-secret': 'legacy' }))).status).toBe(401)

    const wrongAudience = serviceToken(SERVICE_AUDIENCES.queueProcessor, [SERVICE_SCOPES.queueProcess])
    expect((await coreBackfill(post(url, { authorization: `Bearer ${wrongAudience}` }))).status).toBe(401)

    const wrongScope = serviceToken(SERVICE_AUDIENCES.coreBackfill, [SERVICE_SCOPES.coreProjection])
    expect((await coreBackfill(post(url, { authorization: `Bearer ${wrongScope}` }))).status).toBe(401)

    const wrongSubject = serviceToken(SERVICE_AUDIENCES.coreBackfill, [SERVICE_SCOPES.coreBackfill], 'stranger')
    expect((await coreBackfill(post(url, { authorization: `Bearer ${wrongSubject}` }))).status).toBe(401)
    expect(runTenantBackfill).not.toHaveBeenCalled()
  })

  it('is gated by CORE_BACKFILL_ENABLED and the Core connection, then runs backfill (and parity on request)', async () => {
    const url = 'https://app.kepenk.ai/api/cron/core-backfill'
    const token = serviceToken(SERVICE_AUDIENCES.coreBackfill, [SERVICE_SCOPES.coreBackfill])
    const auth = { authorization: `Bearer ${token}` }

    delete process.env.CORE_BACKFILL_ENABLED
    expect((await coreBackfill(post(url, auth))).status).toBe(404)
    process.env.CORE_BACKFILL_ENABLED = 'true'

    vi.mocked(getCoreRuntime).mockReturnValueOnce(null)
    expect((await coreBackfill(post(url, auth))).status).toBe(503)

    const response = await coreBackfill(post(url, auth, { batchSize: 10, startAfter: 'esnaf-5', dryRun: true, parity: true }))
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ ok: true, backfill: { provisioned: 1 }, parity: { zeroDrift: true } })
    expect(runTenantBackfill).toHaveBeenCalledWith(expect.objectContaining({ batchSize: 10, startAfter: 'esnaf-5', dryRun: true }))
    expect(runTenantParityCheck).toHaveBeenCalledTimes(1)
  })
})

describe('/api/admin/core/parity', () => {
  it('requires a durable AdminSession for both reading and recomputing parity', async () => {
    const get = new Request('https://app.kepenk.ai/api/admin/core/parity', { headers: { cookie: 'admin_session=' + 'a'.repeat(43) } })
    expect((await parityGet(get)).status).toBe(401)

    const raw = post('https://app.kepenk.ai/api/admin/core/parity', { origin: 'https://app.kepenk.ai', 'x-admin-token': 'kepenk-admin-2026' })
    expect((await parityPost(raw)).status).toBe(401)
    expect(runTenantParityCheck).not.toHaveBeenCalled()

    vi.mocked(validateAdminSessionToken).mockResolvedValueOnce({ principalId: 'admin-1' } as never)
    const ok = post('https://app.kepenk.ai/api/admin/core/parity', { origin: 'https://app.kepenk.ai', cookie: 'admin_session=' + 'a'.repeat(43) })
    expect((await parityPost(ok)).status).toBe(200)
    expect(runTenantParityCheck).toHaveBeenCalledTimes(1)
  })
})
