import { createHash } from 'node:crypto'
import type { Firestore } from 'firebase-admin/firestore'
import {
  AuthIdentitySchema,
  type AuthIdentity,
  type AuthIdentityProvider,
} from '../../../../../packages/auth/src/types/canonical'
import { AUTH_COLLECTIONS, requireAuthDb } from './firestore'

export interface AuthIdentityRepository {
  getById(identityId: string): Promise<AuthIdentity | null>
  findByProviderSubject(provider: AuthIdentityProvider, subject: string): Promise<AuthIdentity | null>
  create(identity: AuthIdentity): Promise<void>
}

export function identityIdFor(provider: AuthIdentityProvider, subject: string): string {
  const opaqueSubject = subject.trim()
  if (!opaqueSubject) throw new Error('Auth identity subject cannot be empty')

  const digest = createHash('sha256')
    .update(provider)
    .update('\0')
    .update(opaqueSubject)
    .digest('hex')

  return `idn_${digest}`
}

export class FirestoreAuthIdentityRepository implements AuthIdentityRepository {
  private readonly db: Firestore

  constructor(db?: Firestore | null) {
    this.db = requireAuthDb(db)
  }

  async getById(identityId: string): Promise<AuthIdentity | null> {
    const snapshot = await this.db.collection(AUTH_COLLECTIONS.identities).doc(identityId).get()
    if (!snapshot.exists) return null
    return AuthIdentitySchema.parse(snapshot.data())
  }

  async findByProviderSubject(
    provider: AuthIdentityProvider,
    subject: string
  ): Promise<AuthIdentity | null> {
    return this.getById(identityIdFor(provider, subject))
  }

  async create(identity: AuthIdentity): Promise<void> {
    const parsed = AuthIdentitySchema.parse(identity)
    const expectedIdentityId = identityIdFor(parsed.provider, parsed.subject)

    if (parsed.identityId !== expectedIdentityId) {
      throw new Error('Auth identity id must match canonical provider/subject mapping')
    }

    await this.db.collection(AUTH_COLLECTIONS.identities).doc(parsed.identityId).create(parsed)
  }
}
