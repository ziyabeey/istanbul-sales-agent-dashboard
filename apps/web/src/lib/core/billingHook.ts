import { adminDb } from '../firebaseAdmin'
import { KEPENK_DEFAULT_BILLING_INTERVAL, applyVerifiedPayment, billingIdempotencyKey, newOutboxRecord, type VerifiedPaymentEvent } from './billing'
import { FirestoreBillingOutboxStore, resolveBusinessRouting } from './billingStore'
import { getCoreRuntime } from './deps'

export function isCoreBillingEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.CORE_BILLING_ENABLED === 'true'
}

export interface IyzicoPaymentInput {
  paymentId: string
  conversationId: string
  esnafId: string
  paket: string
  paidAt?: Date
}

export type IyzicoBillingOutcome =
  /** The verified event is durably queued (and possibly already applied). */
  | { durable: true; key: string; status: string }
  /** The outbox write itself failed: the callback must raise an operator reconciliation signal. */
  | { durable: false; key: string; status: 'persist_failed'; error: string }

/**
 * KC-04: called by the İyzico callback after the server-side retrieve proved
 * paymentStatus=SUCCESS. The verified event is persisted durably (atomic
 * create-if-absent) BEFORE anything else and the callback awaits that
 * result (R1 blocker 1); applying to Core is attempted immediately when the
 * runtime is configured and otherwise left to the outbox job. Never throws
 * into the payment redirect; a persist failure is reported, not swallowed.
 */
export async function recordVerifiedIyzicoPayment(input: IyzicoPaymentInput): Promise<IyzicoBillingOutcome | null> {
  if (!isCoreBillingEnabled() || !adminDb) return null
  const event: VerifiedPaymentEvent = {
    provider: 'iyzico',
    paymentId: input.paymentId,
    conversationId: input.conversationId,
    esnafId: input.esnafId,
    paket: input.paket,
    paidAt: (input.paidAt ?? new Date()).toISOString(),
    billingInterval: KEPENK_DEFAULT_BILLING_INTERVAL,
  }
  const key = billingIdempotencyKey(event)
  const db = adminDb
  const store = new FirestoreBillingOutboxStore(db)

  // 1) Durable first. A concurrent first callback converges on the record that won the create.
  try {
    const existing = await store.get(key)
    if (!existing) await store.create(newOutboxRecord(event, new Date().toISOString()))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN'
    return { durable: false, key, status: 'persist_failed', error: message.slice(0, 200) }
  }

  // 2) Best-effort immediate apply; any failure leaves the durable record for the outbox job.
  try {
    const runtime = getCoreRuntime()
    if (!runtime) {
      const record = await store.get(key)
      if (record && record.status === 'pending' && record.attempts === 0 && record.lastError === null) {
        await store.put({ ...record, lastError: 'CORE_RUNTIME_NOT_CONFIGURED', nextAttemptAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
      }
      return { durable: true, key, status: record?.status ?? 'pending' }
    }
    const outcome = await applyVerifiedPayment(
      { store, client: runtime.client, resolveBusinessRouting: (esnafId) => resolveBusinessRouting(db, runtime.client, esnafId) },
      event
    )
    return { durable: true, key: outcome.key, status: outcome.status }
  } catch {
    return { durable: true, key, status: 'pending' }
  }
}
