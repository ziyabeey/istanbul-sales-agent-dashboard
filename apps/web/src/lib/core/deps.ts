import { getAuth } from 'firebase-admin/auth'
import type { Firestore } from 'firebase-admin/firestore'
import { adminDb } from '../firebaseAdmin'
import { EnvCredentialResolver } from '../credentials/credentialResolver'
import type { CoreAuthFlowConsumptionStore } from './authFlow'
import type { CoreBffSessionRecord, CoreBffSessionRepository } from './bffSession'
import { CORE_CREDENTIAL_REFS, coreIssuer, coreJwksUrl, readCoreConnectionConfig, type CoreConnectionConfig } from './config'
import { CorePlatformClient } from './coreClient'
import { CorePlatformError } from './errors'
import type { FirebaseIdentityVerifier, VerifiedFirebaseIdentity } from './firebaseIdentity'
import { SupabaseJwtVerifier } from './jwtVerifier'
import type { CoreContextDeps } from './requestContext'
import { SupabaseAuthClient } from './supabaseAuth'

export const CORE_BFF_SESSION_COLLECTION = 'core_bff_sessions'

/** Durable BFF session locator store. Firestore here is a session cache, never an authority. */
export class FirestoreCoreBffSessionRepository implements CoreBffSessionRepository {
  constructor(private readonly db: Firestore) {}

  async get(sessionId: string): Promise<CoreBffSessionRecord | null> {
    const doc = await this.db.collection(CORE_BFF_SESSION_COLLECTION).doc(sessionId).get()
    if (!doc.exists) return null
    return doc.data() as CoreBffSessionRecord
  }

  async create(record: CoreBffSessionRecord): Promise<void> {
    await this.db.collection(CORE_BFF_SESSION_COLLECTION).doc(record.sessionId).set(record)
  }

  async update(sessionId: string, patch: Partial<CoreBffSessionRecord>): Promise<void> {
    await this.db.collection(CORE_BFF_SESSION_COLLECTION).doc(sessionId).update(patch)
  }
}

export const CORE_AUTH_FLOW_CONSUMED_COLLECTION = 'core_auth_flows_consumed'

/** create() is atomic in Firestore: the second consumer of the same state fails. */
export class FirestoreCoreAuthFlowConsumptionStore implements CoreAuthFlowConsumptionStore {
  constructor(private readonly db: Firestore) {}

  async consume(stateHash: string, expiresAt: string): Promise<boolean> {
    try {
      await this.db.collection(CORE_AUTH_FLOW_CONSUMED_COLLECTION).doc(stateHash).create({ consumedAt: new Date().toISOString(), expiresAt })
      return true
    } catch (error) {
      const code = (error as { code?: unknown }).code
      if (code === 6 || code === 'already-exists' || code === 'ALREADY_EXISTS') return false
      throw error
    }
  }
}

/**
 * Server-side Firebase ID token verification for the verified `firebase:<uid>`
 * alias (Issue #10 migration decision). `checkRevoked=true` costs one Firebase
 * Auth read and refuses tokens of a revoked or disabled account.
 */
export class FirebaseAdminIdentityVerifier implements FirebaseIdentityVerifier {
  async verifyIdToken(idToken: string): Promise<VerifiedFirebaseIdentity> {
    const decoded = await getAuth().verifyIdToken(idToken, true)
    return {
      uid: decoded.uid,
      email: typeof decoded.email === 'string' ? decoded.email : null,
      emailVerified: decoded.email_verified === true,
      signInProvider: typeof decoded.firebase?.sign_in_provider === 'string' ? decoded.firebase.sign_in_provider : null,
      authTime: typeof decoded.auth_time === 'number' ? decoded.auth_time : null,
    }
  }
}

export interface CoreRuntime extends CoreContextDeps {
  config: CoreConnectionConfig
  flows: CoreAuthFlowConsumptionStore
  firebaseIdentity: FirebaseIdentityVerifier
}

let cached: CoreRuntime | null = null

async function resolveSecret(field: string, ref: (typeof CORE_CREDENTIAL_REFS)[keyof typeof CORE_CREDENTIAL_REFS]): Promise<string | null> {
  const resolved = await new EnvCredentialResolver().resolve(ref)
  return resolved?.values[field] ?? null
}

/**
 * Process-wide Core runtime. Returns null when the Supabase connection is not
 * configured so callers can fail closed (404/503) instead of half-working.
 */
export function getCoreRuntime(): CoreRuntime | null {
  if (cached) return cached
  const config = readCoreConnectionConfig()
  if (!config || !adminDb) return null

  const client = new CorePlatformClient({
    supabaseUrl: config.supabaseUrl,
    anonKey: config.anonKey,
    principalName: config.principalName,
    principalSecret: async () => {
      const secret = await resolveSecret('secret', CORE_CREDENTIAL_REFS.principal)
      if (!secret) throw new CorePlatformError('CORE_PRINCIPAL_UNAUTHORIZED', { rawMessage: 'principal secret not configured' })
      return secret
    },
  })

  cached = {
    config,
    client,
    auth: new SupabaseAuthClient({ supabaseUrl: config.supabaseUrl, anonKey: config.anonKey }),
    verifier: new SupabaseJwtVerifier({
      issuer: coreIssuer(config.supabaseUrl),
      jwksUrl: coreJwksUrl(config.supabaseUrl),
      hs256Secret: () => resolveSecret('jwtSecret', CORE_CREDENTIAL_REFS.jwt),
    }),
    sessions: new FirestoreCoreBffSessionRepository(adminDb),
    flows: new FirestoreCoreAuthFlowConsumptionStore(adminDb),
    firebaseIdentity: new FirebaseAdminIdentityVerifier(),
  }
  return cached
}

/** Test seam. */
export function resetCoreRuntimeForTests(): void {
  cached = null
}
