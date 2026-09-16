import { CORE_LEGACY_PHONE_PROVIDER, coreIdempotencyKey, type CorePlatformClient } from './coreClient'
import { CorePlatformError } from './errors'

/**
 * KC-02: legacy -> Supabase identity adapter, applied at the session
 * production point only.
 *
 * Provisional compatibility alias: the KC-00 static inventory found no
 * Firebase client dependency and models Pilot-0 identities in Firestore
 * `auth_identities` keyed by provider `phone` + normalized phone subject
 * (docs/execution/kc-00-kepenk-authority-inventory.md). The hosted Firebase
 * Auth population is still UNKNOWN until Issue #10 supplies the receipt, so
 * this alias uses provider `legacy-kepenk-phone` with the digits-only phone as
 * `external_subject` and must not be read as the canonical migration mode. If
 * the receipt shows a real Firebase Auth population, a `firebase` uid alias
 * is added with the same command. The adapter grants nothing, blocks no
 * login, and writes nothing to legacy tenant documents (KC-03 owns that).
 */
export type LegacyIdentityLinkResult = 'linked' | 'already_linked' | 'conflict' | 'skipped' | 'failed'

export function legacyPhoneSubject(phoneE164: string): string {
  return phoneE164.replace(/\D/g, '')
}

export async function linkLegacyPhoneIdentity(
  client: CorePlatformClient,
  input: { phoneE164: string; userId: string }
): Promise<LegacyIdentityLinkResult> {
  const subject = legacyPhoneSubject(input.phoneE164)
  if (!subject) return 'skipped'
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
