import type { Firestore } from 'firebase-admin/firestore'
import {
  MembershipSchema,
  type Membership,
} from '../../../../../packages/auth/src/types/canonical'
import { AUTH_COLLECTIONS, requireAuthDb } from './firestore'

export interface MembershipRepository {
  getById(membershipId: string): Promise<Membership | null>
  listByUserId(userId: string): Promise<Membership[]>
  create(membership: Membership): Promise<void>
}

export class FirestoreMembershipRepository implements MembershipRepository {
  private readonly db: Firestore

  constructor(db?: Firestore | null) {
    this.db = requireAuthDb(db)
  }

  async getById(membershipId: string): Promise<Membership | null> {
    const snapshot = await this.db.collection(AUTH_COLLECTIONS.memberships).doc(membershipId).get()
    if (!snapshot.exists) return null
    return MembershipSchema.parse(snapshot.data())
  }

  async listByUserId(userId: string): Promise<Membership[]> {
    const snapshot = await this.db
      .collection(AUTH_COLLECTIONS.memberships)
      .where('userId', '==', userId)
      .get()

    return snapshot.docs.map((document) => MembershipSchema.parse(document.data()))
  }

  async create(membership: Membership): Promise<void> {
    const parsed = MembershipSchema.parse(membership)
    await this.db.collection(AUTH_COLLECTIONS.memberships).doc(parsed.membershipId).create(parsed)
  }
}
