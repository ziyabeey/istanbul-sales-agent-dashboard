import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryBillingOutboxStore } from '@/lib/core/billing'
import { recordVerifiedIyzicoPayment } from '@/lib/core/billingHook'
import { getCoreRuntime } from '@/lib/core/deps'
import { FirestoreBillingOutboxStore, resolveBusinessRouting } from '@/lib/core/billingStore'

const BIZ = '5b000000-0000-4000-8000-000000000001'
const memory = new InMemoryBillingOutboxStore()

vi.mock('@/lib/core/deps', () => ({ getCoreRuntime: vi.fn() }))
vi.mock('@/lib/core/billingStore', () => ({
  FirestoreBillingOutboxStore: vi.fn(),
  resolveBusinessRouting: vi.fn(async () => ({ coreBusinessId: '5b000000-0000-4000-8000-000000000001', shadowBusinessId: '5b000000-0000-4000-8000-000000000001' })),
}))

beforeEach(() => {
  process.env.CORE_BILLING_ENABLED = 'true'
  memory.records.clear()
  // `new FirestoreBillingOutboxStore(db)` must yield the shared in-memory store: a constructible function returning an object.
  vi.mocked(FirestoreBillingOutboxStore).mockImplementation(function () { return memory } as never)
})

afterEach(() => {
  delete process.env.CORE_BILLING_ENABLED
  vi.restoreAllMocks()
})

const payment = { paymentId: 'pay-77', conversationId: 'kepenk-esnaf-7-1758000000000', esnafId: 'esnaf-7', paket: 'PREMIUM', paidAt: new Date('2026-09-16T12:00:00Z') }

describe('recordVerifiedIyzicoPayment', () => {
  it('is a no-op until CORE_BILLING_ENABLED=true', async () => {
    delete process.env.CORE_BILLING_ENABLED
    expect(await recordVerifiedIyzicoPayment(payment)).toBeNull()
    expect(memory.records.size).toBe(0)
  })

  it('keeps the event durable when the Core runtime is not configured, without inventing a business', async () => {
    vi.mocked(getCoreRuntime).mockReturnValue(null)
    const first = await recordVerifiedIyzicoPayment(payment)
    expect(first).toMatchObject({ durable: true, status: 'pending' })
    const record = memory.records.get(first!.key)
    expect(record).toMatchObject({ status: 'pending', businessId: null, lastError: 'CORE_RUNTIME_NOT_CONFIGURED', event: { billingInterval: 'annual', paket: 'PREMIUM' } })

    const again = await recordVerifiedIyzicoPayment(payment)
    expect(again?.key).toBe(first!.key)
    expect(memory.records.size).toBe(1)
  })

  it('applies immediately through the outbox path when the runtime exists, routing by the Core tenant alias', async () => {
    const applyCommand = vi.fn(async () => ({ business_id: BIZ, plan_key: 'kepenk_standard', status: 'active', version: 1, event_id: 9, policy_version: 1 }))
    vi.mocked(getCoreRuntime).mockReturnValue({ client: { applyCommand } } as never)
    const outcome = await recordVerifiedIyzicoPayment(payment)
    expect(outcome).toMatchObject({ durable: true, status: 'applied' })
    expect(applyCommand).toHaveBeenCalledTimes(1)
    expect(resolveBusinessRouting).toHaveBeenCalledWith(expect.anything(), expect.anything(), 'esnaf-7')
    expect(memory.records.get(outcome!.key)).toMatchObject({ status: 'applied', businessId: BIZ })
  })

  it('persists the durable record before any Core call and keeps it when the apply attempt throws', async () => {
    const applyCommand = vi.fn(async () => { throw new Error('network down') })
    vi.mocked(getCoreRuntime).mockReturnValue({ client: { applyCommand } } as never)
    const outcome = await recordVerifiedIyzicoPayment(payment)
    expect(outcome).toMatchObject({ durable: true })
    expect(memory.records.get(outcome!.key)).toMatchObject({ status: 'pending', event: { paymentId: 'pay-77' } })
    expect(memory.records.size).toBe(1)
  })

  it('reports a failed outbox persist as non-durable instead of pretending the payment was queued', async () => {
    vi.mocked(getCoreRuntime).mockReturnValue({ client: { applyCommand: vi.fn() } } as never)
    const create = vi.spyOn(memory, 'create').mockRejectedValueOnce(new Error('firestore unavailable'))
    const outcome = await recordVerifiedIyzicoPayment(payment)
    expect(outcome).toMatchObject({ durable: false, status: 'persist_failed', error: 'firestore unavailable' })
    expect(outcome && outcome.key).toMatch(/^kc04-iyzico-/)
    expect(memory.records.size).toBe(0)
    expect(create).toHaveBeenCalledTimes(1)
  })

  it('never throws into the payment redirect even when the runtime lookup explodes', async () => {
    vi.mocked(getCoreRuntime).mockImplementation(() => { throw new Error('boom') })
    const outcome = await recordVerifiedIyzicoPayment(payment)
    expect(outcome).toMatchObject({ durable: true, status: 'pending' })
    expect(memory.records.size).toBe(1)
  })
})
