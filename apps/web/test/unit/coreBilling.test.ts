import { describe, expect, it, vi } from 'vitest'
import {
  InMemoryBillingOutboxStore,
  applyVerifiedPayment,
  billingIdempotencyKey,
  planKeyForPaket,
  processBillingOutbox,
  retryBackoffMs,
  subscriptionPeriod,
  type VerifiedPaymentEvent,
} from '@/lib/core/billing'
import type { CorePlatformClient } from '@/lib/core/coreClient'
import { CorePlatformError } from '@/lib/core/errors'

const BIZ = '5b000000-0000-4000-8000-000000000001'
const NOW = () => new Date('2026-09-16T12:00:00Z')

function event(overrides: Partial<VerifiedPaymentEvent> = {}): VerifiedPaymentEvent {
  return {
    provider: 'iyzico',
    paymentId: 'pay-1001',
    conversationId: 'kepenk-esnaf-1-1758000000000',
    esnafId: 'esnaf-1',
    paket: 'BUYUME',
    paidAt: '2026-09-16T11:59:00.000Z',
    billingInterval: 'annual',
    ...overrides,
  }
}

function okResult(eventId = 41) {
  return { business_id: BIZ, plan_key: 'kepenk_standard', status: 'active', version: 1, event_id: eventId, policy_version: 1 }
}

function deps(overrides: { applyCommand?: unknown; businessId?: string | null; shadowBusinessId?: string | null } = {}) {
  const store = new InMemoryBillingOutboxStore()
  const applyCommand = (overrides.applyCommand as ReturnType<typeof vi.fn>) ?? vi.fn(async () => okResult())
  const client = { applyCommand } as unknown as CorePlatformClient
  const coreBusinessId = overrides.businessId === undefined ? BIZ : overrides.businessId
  const shadowBusinessId = overrides.shadowBusinessId === undefined ? coreBusinessId : overrides.shadowBusinessId
  const resolveBusinessRouting = vi.fn(async () => ({ coreBusinessId, shadowBusinessId }))
  return { store, client, applyCommand, resolveBusinessRouting, now: NOW }
}

describe('billing derivations', () => {
  it('derives a stable key from the provider event, maps every paket to the launch plan and computes periods', () => {
    expect(billingIdempotencyKey(event())).toBe(billingIdempotencyKey(event({ esnafId: 'other' })))
    expect(billingIdempotencyKey(event())).not.toBe(billingIdempotencyKey(event({ paymentId: 'pay-1002' })))
    expect(billingIdempotencyKey(event())).toMatch(/^kc04-iyzico-[0-9a-f]{48}$/)

    for (const paket of ['TEMEL', 'standart', 'BUYUME', 'premium', 'PREMIUMPLUS']) expect(planKeyForPaket(paket)).toBe('kepenk_standard')
    expect(planKeyForPaket('YOK')).toBeNull()

    expect(subscriptionPeriod('2026-01-31T10:00:00.000Z', 'monthly')).toEqual({ start: '2026-01-31T10:00:00.000Z', end: '2026-02-28T10:00:00.000Z' })
    expect(subscriptionPeriod('2026-09-16T11:59:00.000Z', 'annual')).toEqual({ start: '2026-09-16T11:59:00.000Z', end: '2027-09-16T11:59:00.000Z' })

    expect(retryBackoffMs(1)).toBe(30_000)
    expect(retryBackoffMs(2)).toBe(60_000)
    expect(retryBackoffMs(20)).toBe(60 * 60 * 1000)
  })
})

describe('applyVerifiedPayment', () => {
  it('persists the event before calling Core and issues exactly one ChangeSubscription with the derived key', async () => {
    const d = deps()
    const outcome = await applyVerifiedPayment(d, event())
    expect(outcome).toEqual({ key: billingIdempotencyKey(event()), status: 'applied', businessId: BIZ })
    expect(d.applyCommand).toHaveBeenCalledTimes(1)
    const [input] = d.applyCommand.mock.calls[0] as unknown as [{ idempotencyKey: string; command: string; payload: Record<string, unknown> }]
    expect(input.command).toBe('ChangeSubscription')
    expect(input.idempotencyKey).toBe(billingIdempotencyKey(event()))
    expect(input.payload).toEqual({
      business_id: BIZ,
      plan_key: 'kepenk_standard',
      status: 'active',
      current_period_start: '2026-09-16T11:59:00.000Z',
      current_period_end: '2027-09-16T11:59:00.000Z',
      source: { provider: 'iyzico', event_id: 'pay-1001', conversation_id: 'kepenk-esnaf-1-1758000000000', paket: 'BUYUME', billing_interval: 'annual' },
    })
    const record = await d.store.get(outcome.key)
    expect(record).toMatchObject({ status: 'applied', attempts: 1, result: { eventId: 41, version: 1 } })
  })

  it('never issues a second command for a replayed payment event', async () => {
    const d = deps()
    await applyVerifiedPayment(d, event())
    const replay = await applyVerifiedPayment(d, event())
    expect(replay.status).toBe('applied')
    expect(d.applyCommand).toHaveBeenCalledTimes(1)
  })

  it('defers a payment whose tenant is not linked to Core yet and applies it once the link appears', async () => {
    const d = deps({ businessId: null })
    const deferred = await applyVerifiedPayment(d, event())
    expect(deferred.status).toBe('deferred')
    expect(d.applyCommand).not.toHaveBeenCalled()
    expect(await d.store.get(deferred.key)).toMatchObject({ status: 'deferred', businessId: null, lastError: 'BUSINESS_NOT_LINKED', attempts: 1 })

    d.resolveBusinessRouting.mockResolvedValue({ coreBusinessId: BIZ, shadowBusinessId: BIZ })
    const later = () => new Date('2026-09-16T13:00:00Z')
    const report = await processBillingOutbox({ ...d, now: later })
    expect(report).toMatchObject({ processed: 1, applied: 1 })
    expect(d.applyCommand).toHaveBeenCalledTimes(1)
    expect((await d.store.get(deferred.key))?.status).toBe('applied')
  })

  it('marks an idempotency conflict for operators instead of retrying, and retries transport failures with backoff', async () => {
    const conflict = deps({ applyCommand: vi.fn(async () => { throw new CorePlatformError('PLATFORM_IDEMPOTENCY_CONFLICT') }) })
    const c = await applyVerifiedPayment(conflict, event())
    expect(c.status).toBe('conflict')
    expect(await processBillingOutbox(conflict)).toMatchObject({ processed: 0 })
    expect(conflict.applyCommand).toHaveBeenCalledTimes(1)

    const flaky = deps({
      applyCommand: vi
        .fn()
        .mockRejectedValueOnce(new CorePlatformError('CORE_UNAVAILABLE'))
        .mockResolvedValueOnce(okResult(42)),
    })
    const first = await applyVerifiedPayment(flaky, event())
    expect(first.status).toBe('pending')
    const pending = await flaky.store.get(first.key)
    expect(pending).toMatchObject({ attempts: 1, lastError: 'CORE_UNAVAILABLE', nextAttemptAt: '2026-09-16T12:00:30.000Z' })

    expect(await processBillingOutbox(flaky)).toMatchObject({ processed: 0 })
    const report = await processBillingOutbox({ ...flaky, now: () => new Date('2026-09-16T12:01:00Z') })
    expect(report).toMatchObject({ processed: 1, applied: 1 })
    expect(flaky.applyCommand).toHaveBeenCalledTimes(2)
    const [, second] = flaky.applyCommand.mock.calls as unknown as Array<[{ idempotencyKey: string }]>
    expect(second[0].idempotencyKey).toBe(first.key)
  })

  it('routes money by the Core tenant alias only: a stale or foreign Firestore shadow fails closed with drift, a missing alias defers', async () => {
    const OTHER_BIZ = '5b000000-0000-4000-8000-000000000009'
    const foreign = deps({ businessId: BIZ, shadowBusinessId: OTHER_BIZ })
    const outcome = await applyVerifiedPayment(foreign, event())
    expect(outcome).toEqual({ key: billingIdempotencyKey(event()), status: 'failed', businessId: null })
    expect(foreign.applyCommand).not.toHaveBeenCalled()
    expect(await foreign.store.get(outcome.key)).toMatchObject({ status: 'failed', lastError: 'BUSINESS_SHADOW_MISMATCH', businessId: null, drift: { shadowBusinessId: OTHER_BIZ, coreBusinessId: BIZ } })
    expect(await processBillingOutbox(foreign)).toMatchObject({ processed: 0 })

    const shadowOnly = deps({ businessId: null, shadowBusinessId: BIZ })
    const deferred = await applyVerifiedPayment(shadowOnly, event())
    expect(deferred.status).toBe('deferred')
    expect(shadowOnly.applyCommand).not.toHaveBeenCalled()
    expect(await shadowOnly.store.get(deferred.key)).toMatchObject({ status: 'deferred', lastError: 'BUSINESS_NOT_LINKED', businessId: null })

    const aligned = deps({ businessId: BIZ, shadowBusinessId: null })
    expect((await applyVerifiedPayment(aligned, event())).status).toBe('applied')
    const [input] = aligned.applyCommand.mock.calls[0] as unknown as [{ payload: { business_id: string } }]
    expect(input.payload.business_id).toBe(BIZ)
  })

  it('converges two concurrent first callbacks for the same payment on one canonical stored event and payload', async () => {
    const store = new InMemoryBillingOutboxStore()
    const applyCommand = vi.fn(async () => okResult())
    const client = { applyCommand } as unknown as CorePlatformClient
    const resolveBusinessRouting = vi.fn(async () => ({ coreBusinessId: BIZ, shadowBusinessId: BIZ }))
    // Two workers observe different provider clocks for the same paymentId.
    const early = event({ paidAt: '2026-09-16T11:59:00.000Z' })
    const late = event({ paidAt: '2026-09-16T11:59:07.000Z' })
    const [a, b] = await Promise.all([
      applyVerifiedPayment({ store, client, resolveBusinessRouting, now: NOW }, early),
      applyVerifiedPayment({ store, client, resolveBusinessRouting, now: () => new Date('2026-09-16T12:00:07Z') }, late),
    ])
    expect(a.key).toBe(b.key)
    expect(store.records.size).toBe(1)
    const stored = await store.get(a.key)
    expect(stored?.event.paidAt).toBe('2026-09-16T11:59:00.000Z')
    const payloads = (applyCommand.mock.calls as unknown as Array<[{ idempotencyKey: string; payload: Record<string, unknown> }]>).map((c) => c[0])
    expect(payloads.length).toBeGreaterThanOrEqual(1)
    for (const p of payloads) {
      expect(p.idempotencyKey).toBe(a.key)
      expect(p.payload).toMatchObject({ current_period_start: '2026-09-16T11:59:00.000Z', current_period_end: '2027-09-16T11:59:00.000Z' })
    }
    expect(new Set(payloads.map((p) => JSON.stringify(p.payload))).size).toBe(1)
    expect(stored?.status).toBe('applied')
  })

  it('fails closed on unknown packages and non-retryable Core errors', async () => {
    const unknown = deps()
    expect((await applyVerifiedPayment(unknown, event({ paket: 'YOK' }))).status).toBe('failed')
    expect(unknown.applyCommand).not.toHaveBeenCalled()

    const rejected = deps({ applyCommand: vi.fn(async () => { throw new CorePlatformError('PLAN_NOT_FOUND') }) })
    const outcome = await applyVerifiedPayment(rejected, event())
    expect(outcome.status).toBe('failed')
    expect(await rejected.store.get(outcome.key)).toMatchObject({ status: 'failed', lastError: 'PLAN_NOT_FOUND' })
    expect(await processBillingOutbox(rejected)).toMatchObject({ processed: 0 })
  })
})
