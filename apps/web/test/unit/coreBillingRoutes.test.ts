import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SERVICE_AUDIENCES, SERVICE_SCOPES, issueServiceToken } from '@/lib/serviceAuth'
import { getCoreRuntime } from '@/lib/core/deps'
import { processBillingOutbox } from '@/lib/core/billing'
import { POST as outbox } from '@/app/api/cron/core-billing-outbox/route'

vi.mock('@/lib/core/deps', () => ({ getCoreRuntime: vi.fn() }))
vi.mock('@/lib/core/billing', () => ({
  processBillingOutbox: vi.fn(async () => ({ processed: 2, applied: 1, deferred: 1, pending: 0, conflict: 0, failed: 0 })),
}))
vi.mock('@/lib/core/billingStore', () => ({
  FirestoreBillingOutboxStore: class {},
  resolveLinkedBusinessId: vi.fn(async () => null),
}))

const issuedAt = new Date('2026-09-16T07:00:00.000Z')
const URL = 'https://app.kepenk.ai/api/cron/core-billing-outbox'

function token(audience: string, scopes: string[], subject = 'cloud-scheduler') {
  return issueServiceToken({ subject, audience, scopes, now: issuedAt, invocationId: 'inv-kc04-1' })
}

function post(headers: Record<string, string>, body: unknown = {}) {
  return new Request(URL, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-09-16T07:00:30.000Z'))
  process.env.SERVICE_AUTH_SECRET = 'kc04-service-auth-secret-0123456789abcdef0123456789abcdef'
  process.env.CORE_BILLING_ENABLED = 'true'
  vi.mocked(getCoreRuntime).mockReturnValue({ client: {} } as never)
})

afterEach(() => {
  vi.useRealTimers()
  delete process.env.CORE_BILLING_ENABLED
  vi.mocked(processBillingOutbox).mockClear()
})

describe('POST /api/cron/core-billing-outbox', () => {
  it('accepts only a signed ServicePrincipal for the billing outbox audience and scope', async () => {
    expect((await outbox(post({}))).status).toBe(401)
    expect((await outbox(post({ 'x-cron-secret': 'legacy' }))).status).toBe(401)
    expect((await outbox(post({ authorization: `Bearer ${token(SERVICE_AUDIENCES.coreBackfill, [SERVICE_SCOPES.coreBackfill])}` }))).status).toBe(401)
    expect((await outbox(post({ authorization: `Bearer ${token(SERVICE_AUDIENCES.coreBillingOutbox, [SERVICE_SCOPES.coreBackfill])}` }))).status).toBe(401)
    expect(processBillingOutbox).not.toHaveBeenCalled()
  })

  it('is gated by CORE_BILLING_ENABLED and the Core connection, then re-drives the outbox', async () => {
    const auth = { authorization: `Bearer ${token(SERVICE_AUDIENCES.coreBillingOutbox, [SERVICE_SCOPES.coreBilling])}` }
    delete process.env.CORE_BILLING_ENABLED
    expect((await outbox(post(auth))).status).toBe(404)
    process.env.CORE_BILLING_ENABLED = 'true'
    vi.mocked(getCoreRuntime).mockReturnValueOnce(null)
    expect((await outbox(post(auth))).status).toBe(503)

    const response = await outbox(post(auth, { limit: 5 }))
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ ok: true, outbox: { processed: 2, applied: 1 } })
    expect(processBillingOutbox).toHaveBeenCalledWith(expect.anything(), { limit: 5 })
  })
})
