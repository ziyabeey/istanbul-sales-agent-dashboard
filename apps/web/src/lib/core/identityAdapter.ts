import type { Firestore } from 'firebase-admin/firestore'
import { findUniqueActiveTenantByPhone } from '../auth/legacyAccountResolver'
import { CORE_LEGACY_PHONE_PROVIDER, coreIdempotencyKey, type CorePlatformClient } from './coreClient'
import { CorePlatformError } from './errors'

/**
 * KC-02: Firebase/legacy -> Supabase identity adapter, applied at the session
 * production point. After a verified Supabase login the adapter (1) links the
 * legacy phone subject to the Supabase user through the KC-01 command RPC and
 * (2) records the Core user id on the legacy tenant document as a shadow field
 * so KC-03 can provision the business with a real owner. Neither step grants
 * authority; both are idempotent and best-effort for the login response.
 */
export interface LegacyIdentityLinkResult {
  identityAlias: 'linked' | 'already_linked' | 'conflict' | 'skipped' | 'failed'
  legacyEsnafId: string | null
  legacyTenantShadow: 'written' | 'unchanged' | 'not_found' | 'ambiguous' | 'skipped' | 'failed'
}

export function legacyPhoneSubject(phoneE164: string): string {
  return phoneE164.replace(/\D/g, '')
}

export async function linkLegacyPhoneIdentity(
  client: CorePlatformClient,
  input: { phoneE164: string; userId: string }
): Promise<LegacyIdentityLinkResult['identityAlias']> {
  const subject = legacyPhoneSubject(input.phoneE164)
  try {
    const result = await client.applyCommand({
      idempotencyKey: coreIdempotencyKey('kc02-identity', CORE_LEGACY_PHONE_PROVIDER, subject, input.userId),
      command: 'LinkIdentityAlias',
      payload: {
        provider: CORE_LEGACY_PHONE_PROVIDER,
        external_subject: subject,
        user_id: input.userId,
      },
    })
    return result.linked === true ? 'linked' : 'already_linked'
  } catch (error) {
    if (error instanceof CorePlatformError) {
      if (error.code === 'IDENTITY_ALIAS_CONFLICT' || error.code === 'IDENTITY_ALIAS_USER_TAKEN') return 'conflict'
    }
    return 'failed'
  }
}

export async function recordCoreUserOnLegacyTenant(
  db: Firestore,
  input: { phoneE164: string; userId: string; now?: Date }
): Promise<{ status: LegacyIdentityLinkResult['legacyTenantShadow']; esnafId: string | null }> {
  const account = await findUniqueActiveTenantByPhone(legacyPhoneSubject(input.phoneE164))
  if (account.kind === 'none') return { status: 'not_found', esnafId: null }
  if (account.kind !== 'unique') return { status: 'ambiguous', esnafId: null }

  const esnafId = account.account.tenantId
  const ref = db.collection('esnaflar').doc(esnafId)
  const snapshot = await ref.get()
  const existing = snapshot.exists ? (snapshot.data() ?? {}) : {}
  if (existing.coreUserId === input.userId) return { status: 'unchanged', esnafId }
  if (typeof existing.coreUserId === 'string' && existing.coreUserId && existing.coreUserId !== input.userId) {
    // A different Core user already claimed this tenant: never silently rebind.
    return { status: 'failed', esnafId }
  }
  await ref.update({ coreUserId: input.userId, coreUserLinkedAt: (input.now ?? new Date()).toISOString() })
  return { status: 'written', esnafId }
}

export async function adaptLegacyIdentity(
  deps: { client: CorePlatformClient; db: Firestore | null },
  input: { phoneE164: string; userId: string }
): Promise<LegacyIdentityLinkResult> {
  const identityAlias = await linkLegacyPhoneIdentity(deps.client, input)
  if (!deps.db) return { identityAlias, legacyEsnafId: null, legacyTenantShadow: 'skipped' }
  try {
    const shadow = await recordCoreUserOnLegacyTenant(deps.db, input)
    return { identityAlias, legacyEsnafId: shadow.esnafId, legacyTenantShadow: shadow.status }
  } catch {
    return { identityAlias, legacyEsnafId: null, legacyTenantShadow: 'failed' }
  }
}
