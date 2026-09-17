import type { Firestore } from 'firebase-admin/firestore'
import { ONBOARDING_SAGA_OPEN_STATUSES, type OnboardingSagaRecord, type OnboardingSagaStore } from './onboardingCore'

export const CORE_ONBOARDING_SAGA_COLLECTION = 'core_onboarding_saga'

/** KC-05: durable onboarding intent (Firestore is a queue here, never commercial authority). */
export class FirestoreOnboardingSagaStore implements OnboardingSagaStore {
  constructor(private readonly db: Firestore) {}

  async get(esnafId: string): Promise<OnboardingSagaRecord | null> {
    const doc = await this.db.collection(CORE_ONBOARDING_SAGA_COLLECTION).doc(esnafId).get()
    return doc.exists ? (doc.data() as OnboardingSagaRecord) : null
  }

  /** Firestore create() is atomic: a duplicate submission for the same tenant loses with ALREADY_EXISTS. */
  async create(record: OnboardingSagaRecord): Promise<'created' | 'exists'> {
    try {
      await this.db.collection(CORE_ONBOARDING_SAGA_COLLECTION).doc(record.esnafId).create(record)
      return 'created'
    } catch (error) {
      const code = (error as { code?: unknown }).code
      if (code === 6 || code === 'already-exists' || code === 'ALREADY_EXISTS') return 'exists'
      throw error
    }
  }

  async put(record: OnboardingSagaRecord): Promise<void> {
    await this.db.collection(CORE_ONBOARDING_SAGA_COLLECTION).doc(record.esnafId).set(record)
  }

  async listDue(input: { now: Date; limit: number }): Promise<OnboardingSagaRecord[]> {
    const snapshot = await this.db
      .collection(CORE_ONBOARDING_SAGA_COLLECTION)
      .where('status', 'in', [...ONBOARDING_SAGA_OPEN_STATUSES])
      .limit(Math.max(input.limit * 4, 50))
      .get()
    return snapshot.docs
      .map((doc) => doc.data() as OnboardingSagaRecord)
      .filter((record) => !record.nextAttemptAt || new Date(record.nextAttemptAt) <= input.now)
      .slice(0, input.limit)
  }
}
