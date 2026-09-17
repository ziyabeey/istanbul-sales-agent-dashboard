import type { Firestore } from 'firebase-admin/firestore'
import { resolveCoreBusinessAlias, type BillingOutboxRecord, type BillingOutboxStore, type BusinessRouting } from './billing'
import type { CorePlatformClient } from './coreClient'

export const CORE_BILLING_OUTBOX_COLLECTION = 'core_billing_outbox'

/** KC-04: durable outbox for verified payment events (Firestore is a queue here, not commercial authority). */
export class FirestoreBillingOutboxStore implements BillingOutboxStore {
  constructor(private readonly db: Firestore) {}

  async get(key: string): Promise<BillingOutboxRecord | null> {
    const doc = await this.db.collection(CORE_BILLING_OUTBOX_COLLECTION).doc(key).get()
    return doc.exists ? (doc.data() as BillingOutboxRecord) : null
  }

  /** Firestore create() is atomic: a concurrent first callback for the same payment loses with ALREADY_EXISTS. */
  async create(record: BillingOutboxRecord): Promise<'created' | 'exists'> {
    try {
      await this.db.collection(CORE_BILLING_OUTBOX_COLLECTION).doc(record.key).create(record)
      return 'created'
    } catch (error) {
      const code = (error as { code?: unknown }).code
      if (code === 6 || code === 'already-exists' || code === 'ALREADY_EXISTS') return 'exists'
      throw error
    }
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

/** Canonical routing: Core tenant alias is the authority; the Firestore shadow is only cross-checked. */
export async function resolveBusinessRouting(db: Firestore, client: Pick<CorePlatformClient, 'resolveTenantAliases'>, esnafId: string): Promise<BusinessRouting> {
  const [coreBusinessId, shadowBusinessId] = await Promise.all([resolveCoreBusinessAlias(client, esnafId), resolveLinkedBusinessId(db, esnafId)])
  return { coreBusinessId, shadowBusinessId }
}

export const CORE_ROUTING_DRIFT_COLLECTION = 'core_routing_drift'

/** Operator signal when the Firestore shadow disagrees with the Core tenant alias (never auto-repaired). */
export async function recordBusinessRoutingDrift(
  db: Firestore,
  input: { esnafId: string; shadowBusinessId: string; coreBusinessId: string; source: string; actor?: string | null }
): Promise<void> {
  await db.collection(CORE_ROUTING_DRIFT_COLLECTION).add({ ...input, actor: input.actor ?? null, recordedAt: new Date().toISOString() })
}

/** KC-03 shadow hint only; never the routing authority. */
export async function resolveLinkedBusinessId(db: Firestore, esnafId: string): Promise<string | null> {
  const doc = await db.collection('esnaflar').doc(esnafId).get()
  const value = doc.exists ? doc.data()?.coreBusinessId : null
  return typeof value === 'string' && /^[0-9a-f-]{36}$/i.test(value) ? value : null
}
