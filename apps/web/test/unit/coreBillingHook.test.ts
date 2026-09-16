import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryBillingOutboxStore } from '@/lib/core/billing'
import { recordVerifiedIyzicoPayment } from '@/lib/core/billingHook'
import { getCoreRuntime } from '@/lib/core/deps'
import { FirestoreBillingOutboxStore, resolveLinkedBusinessId } from '@/lib/core/billingStore'

const memory = new InMemoryBillingOutboxStore()

vi.mock('@/lib/core/deps', () => ({ getCoreRuntime: vi.fn() }))
vi.mock('@/lib/core/billingStore', () => ({
  FirestoreBillingOutboxStore: vi.fn(),
  resolveLinkedBusinessId: vi.fn(async () => '5b000000-0000-4000-8000-000000000001'),
}))

beforeEach(() => {
  process.env.CORE_BILLING_ENABLED = 'true'
  memory.records.clear()
  // `new FirestoreBillingOutboxStore(db)` must yield the shared in-memory store: a constructible function returning an object.
  vi.mocked(FirestoreBillingOutboxStore).mockImplementation(function () { return memory } as never)
})

afterEach(() => {
  delete process.env.CORE_BILLING_ENABLED
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
    expect(first).toMatchObject({ status: 'pending' })
    const record = memory.records.get(first!.key)
    expect(record).toMatchObject({ status: 'pending', businessId: null, lastError: 'CORE_RUNTIME_NOT_CONFIGURED', event: { billingInterval: 'annual', paket: 'PREMIUM' } })

    const again = await recordVerifiedIyzicoPayment(payment)
    expect(again?.key).toBe(first!.key)
    expect(memory.records.size).toBe(1)
  })

  it('applies immediately through the outbox path when the runtime exists', async () => {
    const applyCommand = vi.fn(async () => ({ business_id: '5b000000-0000-4000-8000-000000000001', plan_key: 'kepenk_standard', status: 'active', version: 1, event_id: 9, policy_version: 1 }))
    vi.mocked(getCoreRuntime).mockReturnValue({ client: { applyCommand } } as never)
    const outcome = await recordVerifiedIyzicoPayment(payment)
    expect(outcome).toMatchObject({ status: 'applied' })
    expect(applyCommand).toHaveBeenCalledTimes(1)
    expect(resolveLinkedBusinessId).toHaveBeenCalledWith(expect.anything(), 'esnaf-7')
    expect(memory.records.get(outcome!.key)).toMatchObject({ status: 'applied', businessId: '5b000000-0000-4000-8000-000000000001' })
  })

  it('never throws into the payment redirect', async () => {
    vi.mocked(getCoreRuntime).mockImplementation(() => { throw new Error('boom') })
    expect(await recordVerifiedIyzicoPayment(payment)).toBeNull()
  })
})
