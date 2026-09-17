import type { Firestore } from 'firebase-admin/firestore'
import type { CoreFeedEvent } from './coreClient'
import type { CoreBusinessIndexEntry, CoreProjectionStore, CursorAdvance, LeaseAcquisition, TenantWrite } from './projection'

export const CORE_PROJECTION_STATE_COLLECTION = 'core_projection_state'
export const CORE_BUSINESS_INDEX_COLLECTION = 'core_business_index'
export const CORE_PROJECTION_ORPHANS_COLLECTION = 'core_projection_orphans'
export const CORE_PROJECTION_CURSOR_DOC = 'feed'

/**
 * KC-05: Firestore adapter for the projection job (read model + cursor, never
 * authority). The lease, the cursor and every tenant write run inside
 * transactions so two overlapping workers cannot interleave into a stale
 * projection with an advanced cursor (R1 blocker 5).
 */
export class FirestoreCoreProjectionStore implements CoreProjectionStore {
  constructor(private readonly db: Firestore) {}

  private get cursorRef() {
    return this.db.collection(CORE_PROJECTION_STATE_COLLECTION).doc(CORE_PROJECTION_CURSOR_DOC)
  }

  async acquireLease(input: { owner: string; now: Date; ttlMs: number }): Promise<LeaseAcquisition> {
    const ref = this.cursorRef
    return this.db.runTransaction(async (tx) => {
      const doc = await tx.get(ref)
      const data = (doc.exists ? doc.data() : null) ?? {}
      const heldBy = typeof data.leaseOwner === 'string' ? data.leaseOwner : null
      const expiresAt = typeof data.leaseExpiresAt === 'string' ? data.leaseExpiresAt : null
      const live = Boolean(heldBy && expiresAt && new Date(expiresAt).getTime() > input.now.getTime())
      if (live && heldBy !== input.owner) return { ok: false, heldBy, expiresAt } as LeaseAcquisition
      tx.set(ref, { leaseOwner: input.owner, leaseExpiresAt: new Date(input.now.getTime() + input.ttlMs).toISOString() }, { merge: true })
      return { ok: true } as LeaseAcquisition
    })
  }

  async releaseLease(owner: string): Promise<void> {
    const ref = this.cursorRef
    await this.db.runTransaction(async (tx) => {
      const doc = await tx.get(ref)
      if (!doc.exists || doc.data()?.leaseOwner !== owner) return
      tx.set(ref, { leaseOwner: null, leaseExpiresAt: null }, { merge: true })
    })
  }

  async getCursor(): Promise<number> {
    const doc = await this.cursorRef.get()
    const value = doc.exists ? doc.data()?.afterEventId : 0
    return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : 0
  }

  async advanceCursor(input: { owner: string; afterEventId: number; at: string }): Promise<CursorAdvance> {
    const ref = this.cursorRef
    return this.db.runTransaction(async (tx) => {
      const doc = await tx.get(ref)
      const data = (doc.exists ? doc.data() : null) ?? {}
      const expiresAt = typeof data.leaseExpiresAt === 'string' ? data.leaseExpiresAt : null
      const expired = !expiresAt || new Date(expiresAt).getTime() <= new Date(input.at).getTime()
      if (data.leaseOwner !== input.owner || expired) return 'lease_lost' as CursorAdvance
      const current = typeof data.afterEventId === 'number' ? data.afterEventId : 0
      if (input.afterEventId <= current) return 'stale' as CursorAdvance
      tx.set(ref, { afterEventId: input.afterEventId, updatedAt: input.at }, { merge: true })
      return 'advanced' as CursorAdvance
    })
  }

  async getBusinessIndex(businessId: string): Promise<CoreBusinessIndexEntry | null> {
    const doc = await this.db.collection(CORE_BUSINESS_INDEX_COLLECTION).doc(businessId).get()
    return doc.exists ? (doc.data() as CoreBusinessIndexEntry) : null
  }

  async setBusinessIndex(businessId: string, entry: CoreBusinessIndexEntry): Promise<void> {
    await this.db.collection(CORE_BUSINESS_INDEX_COLLECTION).doc(businessId).set(entry, { merge: true })
  }

  async findEsnafIdByBusinessId(businessId: string): Promise<string | null> {
    const snapshot = await this.db.collection('esnaflar').where('coreBusinessId', '==', businessId).limit(2).get()
    if (snapshot.size !== 1) return null
    return snapshot.docs[0].id
  }

  async mergeTenantProjection(esnafId: string, patch: Record<string, unknown>, input: { eventId: number }): Promise<TenantWrite> {
    const ref = this.db.collection('esnaflar').doc(esnafId)
    return this.db.runTransaction(async (tx) => {
      const doc = await tx.get(ref)
      const last = doc.exists ? (doc.data()?.core as Record<string, unknown> | undefined)?.lastEventId : null
      // Monotonic per tenant: an older worker never overwrites a newer projection.
      if (typeof last === 'number' && last >= input.eventId) return 'stale' as TenantWrite
      tx.set(ref, patch, { merge: true })
      return 'applied' as TenantWrite
    })
  }

  async recordOrphan(event: CoreFeedEvent, reason: string): Promise<void> {
    await this.db.collection(CORE_PROJECTION_ORPHANS_COLLECTION).doc(String(event.event_id)).set({ ...event, reason, recordedAt: new Date().toISOString() }, { merge: true })
  }
}
