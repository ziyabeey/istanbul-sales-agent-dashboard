/**
 * KC-02: verified Firebase identity -> Core alias input.
 *
 * DANIŞMA 3 migration decision (Kepenk Issue #10, 2026-09-16): the hosted
 * Firebase Auth population is not zero (receipt: 1 password user), so a
 * `firebase:<uid> -> user_id` alias must be added "when the identity can be
 * safely matched; no guessed UID/user mapping". Safe match here means dual
 * proof of possession in one browser request: an active standard Core BFF
 * session (Supabase JWT verified server-side) plus a Firebase ID token that
 * firebase-admin verifies server-side (signature, audience, expiry,
 * revocation). Nothing is matched by e-mail, phone or document lookup.
 */
export interface VerifiedFirebaseIdentity {
  uid: string
  email: string | null
  emailVerified: boolean
  /** `firebase.sign_in_provider` claim: password, phone, google.com, anonymous, custom, ... */
  signInProvider: string | null
  /** `auth_time` claim in seconds since the epoch (last interactive Firebase login). */
  authTime: number | null
}

export interface FirebaseIdentityVerifier {
  /** Verifies signature, audience, expiry and revocation server-side; throws on any failure. */
  verifyIdToken(idToken: string): Promise<VerifiedFirebaseIdentity>
}

/** A Firebase login older than this cannot be used to bind an alias (fresh proof only). */
export const FIREBASE_LINK_MAX_AUTH_AGE_SECONDS = 600
const FUTURE_SKEW_SECONDS = 60
const FIREBASE_UID_RE = /^[A-Za-z0-9._:-]{1,128}$/
const UNLINKABLE_PROVIDERS = new Set(['anonymous', 'custom'])

export type FirebaseLinkRejection = 'MISSING_UID' | 'UNVERIFIED_SIGN_IN_PROVIDER' | 'STALE_FIREBASE_LOGIN'

export type FirebaseLinkAssessment = { ok: true } | { ok: false; reason: FirebaseLinkRejection }

export function assessFirebaseIdentityLinkability(
  identity: VerifiedFirebaseIdentity,
  now: Date,
  maxAuthAgeSeconds: number = FIREBASE_LINK_MAX_AUTH_AGE_SECONDS
): FirebaseLinkAssessment {
  if (typeof identity.uid !== 'string' || !FIREBASE_UID_RE.test(identity.uid)) return { ok: false, reason: 'MISSING_UID' }
  if (!identity.signInProvider || UNLINKABLE_PROVIDERS.has(identity.signInProvider)) {
    return { ok: false, reason: 'UNVERIFIED_SIGN_IN_PROVIDER' }
  }
  const nowSeconds = Math.floor(now.getTime() / 1000)
  if (
    typeof identity.authTime !== 'number' ||
    !Number.isFinite(identity.authTime) ||
    identity.authTime > nowSeconds + FUTURE_SKEW_SECONDS ||
    nowSeconds - identity.authTime > maxAuthAgeSeconds
  ) {
    return { ok: false, reason: 'STALE_FIREBASE_LOGIN' }
  }
  return { ok: true }
}
