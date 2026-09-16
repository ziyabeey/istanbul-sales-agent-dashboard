import type { Firestore } from 'firebase-admin/firestore'
import type { BillingOutboxRecord, BillingOutboxStore } from './billing'

export const CORE_BILLING_OUTBOX_COLLECTION = 'core_billing_outbox'

/** KC-04: durable outbox for verified payment events (Firestore is a queue here, not commercial authority). */
export class FirestoreBillingOutboxStore implements BillingOutboxStore {
  constructor(private readonly db: Firestore) {}

  async get(key: string): Promise<BillingOutboxRecord | null> {
    const doc = await this.db.collection(CORE_BILLING_OUTBOX_COLLECTION).doc(key).get()
    return doc.exists ? (doc.data() as BillingOutboxRecord) : null
  }

  async put(record: BillingOutboxRecord): Promise<void> {
    await this.db.collection(CORE_BILLING_OUTBOX_COLLECTION).doc(record.key).set(record)
  }

  async listDue(input: { now: Date; limit: number }): Promise<BillingOutboxRecord[]> {
    const snapshot = await this.db
      .collection(CORE_BILLING_OUTBOX_COLLECTION)
      .where('status', 'in', ['pending', 'deferred'])
      .limit(Math.max(input.limit * 4, 50))
      .get()
    return snapshot.docs
      .map((doc) => doc.data() as BillingOutboxRecord)
      .filter((record) => !record.nextAttemptAt || new Date(record.nextAttemptAt) <= input.now)
      .slice(0, input.limit)
  }
}

export async function resolveLinkedBusinessId(db: Firestore, esnafId: string): Promise<string | null> {
  const doc = await db.collection('esnaflar').doc(esnafId).get()
  const value = doc.exists ? doc.data()?.coreBusinessId : null
  return typeof value === 'string' && /^[0-9a-f-]{36}$/i.test(value) ? value : null
}
