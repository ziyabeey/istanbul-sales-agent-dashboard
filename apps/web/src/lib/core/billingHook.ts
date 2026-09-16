import { adminDb } from '../firebaseAdmin'
import { KEPENK_DEFAULT_BILLING_INTERVAL, applyVerifiedPayment, billingIdempotencyKey, type VerifiedPaymentEvent } from './billing'
import { FirestoreBillingOutboxStore, resolveLinkedBusinessId } from './billingStore'
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

/**
 * KC-04: called by the İyzico callback after the server-side retrieve proved
 * paymentStatus=SUCCESS. Persists the event durably first; applying it to Core
 * is attempted immediately when the runtime is configured and otherwise left
 * to the outbox job. Never throws into the payment redirect.
 */
export async function recordVerifiedIyzicoPayment(input: IyzicoPaymentInput): Promise<{ key: string; status: string } | null> {
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
  try {
    const store = new FirestoreBillingOutboxStore(adminDb)
    const runtime = getCoreRuntime()
    if (!runtime) {
      // No Core connection: keep the event durable and let the outbox job apply it.
      const key = billingIdempotencyKey(event)
      const existing = await store.get(key)
      if (!existing) {
        const now = new Date().toISOString()
        await store.put({ key, event, businessId: null, status: 'pending', attempts: 0, lastError: 'CORE_RUNTIME_NOT_CONFIGURED', nextAttemptAt: now, createdAt: now, updatedAt: now, result: null })
      }
      return { key, status: existing?.status ?? 'pending' }
    }
    const db = adminDb
    const outcome = await applyVerifiedPayment(
      { store, client: runtime.client, resolveBusinessId: (esnafId) => resolveLinkedBusinessId(db, esnafId) },
      event
    )
    return { key: outcome.key, status: outcome.status }
  } catch {
    return null
  }
}
