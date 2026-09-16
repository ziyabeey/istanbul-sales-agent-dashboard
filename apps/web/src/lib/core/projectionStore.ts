import type { Firestore } from 'firebase-admin/firestore'
import type { CoreFeedEvent } from './coreClient'
import type { CoreBusinessIndexEntry, CoreProjectionStore } from './projection'

export const CORE_PROJECTION_STATE_COLLECTION = 'core_projection_state'
export const CORE_BUSINESS_INDEX_COLLECTION = 'core_business_index'
export const CORE_PROJECTION_ORPHANS_COLLECTION = 'core_projection_orphans'
export const CORE_PROJECTION_CURSOR_DOC = 'feed'

/** KC-05: Firestore adapter for the projection job (read model + cursor, never authority). */
export class FirestoreCoreProjectionStore implements CoreProjectionStore {
  constructor(private readonly db: Firestore) {}

  async getCursor(): Promise<number> {
    const doc = await this.db.collection(CORE_PROJECTION_STATE_COLLECTION).doc(CORE_PROJECTION_CURSOR_DOC).get()
    const value = doc.exists ? doc.data()?.afterEventId : 0
    return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : 0
  }

  async setCursor(afterEventId: number, at: string): Promise<void> {
    await this.db.collection(CORE_PROJECTION_STATE_COLLECTION).doc(CORE_PROJECTION_CURSOR_DOC).set({ afterEventId, updatedAt: at }, { merge: true })
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

  async mergeTenantProjection(esnafId: string, patch: Record<string, unknown>): Promise<void> {
    await this.db.collection('esnaflar').doc(esnafId).set(patch, { merge: true })
  }

  async recordOrphan(event: CoreFeedEvent, reason: string): Promise<void> {
    await this.db.collection(CORE_PROJECTION_ORPHANS_COLLECTION).doc(String(event.event_id)).set({ ...event, reason, recordedAt: new Date().toISOString() }, { merge: true })
  }
}
