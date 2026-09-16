import type { Firestore } from 'firebase-admin/firestore'
import { adminDb } from '../firebaseAdmin'

export const AUTH_COLLECTIONS = {
  users: 'auth_users',
  memberships: 'auth_memberships',
  sessions: 'auth_sessions',
} as const

export function requireAuthDb(db: Firestore | null | undefined = adminDb): Firestore {
  if (!db) {
    throw new Error('Canonical auth repository requires an initialized Firestore connection')
  }
  return db
}
