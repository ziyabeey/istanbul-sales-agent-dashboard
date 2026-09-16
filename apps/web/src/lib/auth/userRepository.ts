import type { Firestore } from 'firebase-admin/firestore'
import {
  UserSchema,
  type User,
} from '../../../../../packages/auth/src/types/canonical'
import { AUTH_COLLECTIONS, requireAuthDb } from './firestore'

export interface UserRepository {
  getById(userId: string): Promise<User | null>
  create(user: User): Promise<void>
  updateSessionEpoch(userId: string, nextEpoch: number, updatedAt: string): Promise<void>
}

export class FirestoreUserRepository implements UserRepository {
  private readonly db: Firestore

  constructor(db?: Firestore | null) {
    this.db = requireAuthDb(db)
  }

  async getById(userId: string): Promise<User | null> {
    const snapshot = await this.db.collection(AUTH_COLLECTIONS.users).doc(userId).get()
    if (!snapshot.exists) return null
    return UserSchema.parse(snapshot.data())
  }

  async create(user: User): Promise<void> {
    const parsed = UserSchema.parse(user)
    await this.db.collection(AUTH_COLLECTIONS.users).doc(parsed.userId).create(parsed)
  }

  async updateSessionEpoch(userId: string, nextEpoch: number, updatedAt: string): Promise<void> {
    if (!Number.isInteger(nextEpoch) || nextEpoch < 0) {
      throw new Error('Session epoch must be a non-negative integer')
    }

    await this.db.collection(AUTH_COLLECTIONS.users).doc(userId).update({
      sessionEpoch: nextEpoch,
      revision: nextEpoch,
      updatedAt,
    })
  }
}
