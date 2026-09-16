import { CORE_FIREBASE_IDENTITY_PROVIDER, CORE_LEGACY_PHONE_PROVIDER, coreIdempotencyKey, type CorePlatformClient } from './coreClient'
import { CorePlatformError } from './errors'

/**
 * KC-02: legacy -> Supabase identity adapter, applied at the session
 * production point only.
 *
 * Hosted facts (Issue #10 receipt, product-owner run 2026-09-16T20:02:47Z,
 * accepted by DANIŞMA 3): esnaflar = 7, telefonTemiz on 5, Firebase Auth = 1
 * password user, sites custom claim = 0, auth_sessions = 0. Migration mode is
 * additive / adapter-first:
 *
 * - `legacy-kepenk-phone:<digits-only phone> -> user_id` stays a provisional
 *   compatibility alias written after a verified Supabase phone OTP login.
 *   It is NOT the canonical migration identity.
 * - `firebase:<uid> -> user_id` is written only through
 *   `linkFirebaseIdentity`, i.e. when the same browser request holds a
 *   standard Core session and a firebase-admin-verified fresh ID token.
 *   No UID/user mapping is guessed from e-mail, phone or documents.
 *
 * The adapter grants nothing, blocks no login, and writes nothing to legacy
 * tenant documents (KC-03 owns that).
 */
export type LegacyIdentityLinkResult = 'linked' | 'already_linked' | 'conflict' | 'skipped' | 'failed'

export function legacyPhoneSubject(phoneE164: string): string {
  return phoneE164.replace(/\D/g, '')
}

async function linkIdentityAlias(
  client: CorePlatformClient,
  provider: string,
  externalSubject: string,
  userId: string
): Promise<LegacyIdentityLinkResult> {
  try {
    const result = await client.applyCommand({
      idempotencyKey: coreIdempotencyKey('kc02-identity', provider, externalSubject, userId),
      command: 'LinkIdentityAlias',
      payload: {
        provider,
        external_subject: externalSubject,
        user_id: userId,
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

export async function linkLegacyPhoneIdentity(
  client: CorePlatformClient,
  input: { phoneE164: string; userId: string }
): Promise<LegacyIdentityLinkResult> {
  const subject = legacyPhoneSubject(input.phoneE164)
  if (!subject) return 'skipped'
  return linkIdentityAlias(client, CORE_LEGACY_PHONE_PROVIDER, subject, input.userId)
}

/**
 * Verified Firebase uid -> Core user alias. Callers must have already verified
 * the ID token server-side and assessed linkability (`firebaseIdentity.ts`);
 * this function only issues the idempotent command.
 */
export async function linkFirebaseIdentity(
  client: CorePlatformClient,
  input: { uid: string; userId: string }
): Promise<LegacyIdentityLinkResult> {
  const subject = input.uid.trim()
  if (!subject) return 'skipped'
  return linkIdentityAlias(client, CORE_FIREBASE_IDENTITY_PROVIDER, subject, input.userId)
}
