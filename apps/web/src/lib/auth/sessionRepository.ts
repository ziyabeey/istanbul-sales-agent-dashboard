import type { Firestore } from 'firebase-admin/firestore'
import {
  SessionSchema,
  type Session,
} from '../../../../../packages/auth/src/types/canonical'
import { AUTH_COLLECTIONS, requireAuthDb } from './firestore'

export interface SessionRepository {
  getById(sessionId: string): Promise<Session | null>
  create(session: Session): Promise<void>
  revoke(sessionId: string, revokedAt: string): Promise<boolean>
}

export class FirestoreSessionRepository implements SessionRepository {
  private readonly db: Firestore

  constructor(db?: Firestore | null) {
    this.db = requireAuthDb(db)
  }

  async getById(sessionId: string): Promise<Session | null> {
    const snapshot = await this.db.collection(AUTH_COLLECTIONS.sessions).doc(sessionId).get()
    if (!snapshot.exists) return null
    return SessionSchema.parse(snapshot.data())
  }

  async create(session: Session): Promise<void> {
    const parsed = SessionSchema.parse(session)
    await this.db.collection(AUTH_COLLECTIONS.sessions).doc(parsed.sessionId).create(parsed)
  }

  async revoke(sessionId: string, revokedAt: string): Promise<boolean> {
    const parsedRevokedAt = new Date(revokedAt)
    if (Number.isNaN(parsedRevokedAt.getTime())) {
      throw new Error('revokedAt must be a valid date-time')
    }

    const ref = this.db.collection(AUTH_COLLECTIONS.sessions).doc(sessionId)

    return this.db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(ref)
      if (!snapshot.exists) return false

      const session = SessionSchema.parse(snapshot.data())
      if (session.revokedAt) return true

      transaction.update(ref, { revokedAt: parsedRevokedAt.toISOString() })
      return true
    })
  }
}
