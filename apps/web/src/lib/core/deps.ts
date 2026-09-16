import type { Firestore } from 'firebase-admin/firestore'
import { adminDb } from '../firebaseAdmin'
import { EnvCredentialResolver } from '../credentials/credentialResolver'
import type { CoreBffSessionRecord, CoreBffSessionRepository } from './bffSession'
import { CORE_CREDENTIAL_REFS, coreIssuer, coreJwksUrl, readCoreConnectionConfig, type CoreConnectionConfig } from './config'
import { CorePlatformClient } from './coreClient'
import { CorePlatformError } from './errors'
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

export interface CoreRuntime extends CoreContextDeps {
  config: CoreConnectionConfig
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
  }
  return cached
}

/** Test seam. */
export function resetCoreRuntimeForTests(): void {
  cached = null
}
