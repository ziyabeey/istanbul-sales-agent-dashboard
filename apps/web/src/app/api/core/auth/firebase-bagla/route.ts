import { NextResponse } from 'next/server'
import { assessFirebaseIdentityLinkability } from '@/lib/core/firebaseIdentity'
import { linkFirebaseIdentity } from '@/lib/core/identityAdapter'
import { requireCoreContext } from '@/lib/core/requestContext'
import { readJsonBody, requireCoreRuntime, requireSameOrigin } from '@/lib/core/routeHelpers'

/**
 * KC-02: bind a verified Firebase identity to the current Core user
 * (`firebase:<uid> -> user_id`), per the DANIŞMA 3 migration decision on
 * Issue #10. Dual proof of possession, nothing guessed:
 *
 * - standard (non-recovery) Core BFF session + CSRF + same origin, and
 * - a Firebase ID token verified server-side by firebase-admin (signature,
 *   audience, expiry, revocation) with a real sign-in provider and a fresh
 *   `auth_time`.
 *
 * The ID token never leaves this process; only the uid reaches Core as the
 * alias subject. The alias grants nothing (memberships stay the only
 * authority) and no legacy tenant document is written.
 */
const MIN_TOKEN_LENGTH = 20
const MAX_TOKEN_LENGTH = 4096

export async function POST(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response
  const origin = requireSameOrigin(request)
  if (origin) return origin
  const { runtime } = gate

  const resolved = await requireCoreContext(request, runtime)
  if (!resolved.ok) return resolved.response

  const body = await readJsonBody(request)
  const idToken = typeof body.idToken === 'string' ? body.idToken.trim() : ''
  if (idToken.length < MIN_TOKEN_LENGTH || idToken.length > MAX_TOKEN_LENGTH) {
    return NextResponse.json({ error: 'FIREBASE_TOKEN_REQUIRED' }, { status: 400 })
  }

  let identity
  try {
    identity = await runtime.firebaseIdentity.verifyIdToken(idToken)
  } catch {
    return NextResponse.json({ error: 'FIREBASE_TOKEN_INVALID' }, { status: 401 })
  }

  const now = (runtime.now ?? (() => new Date()))()
  const linkable = assessFirebaseIdentityLinkability(identity, now)
  if (!linkable.ok) {
    return NextResponse.json({ error: 'FIREBASE_IDENTITY_UNLINKABLE', reason: linkable.reason }, { status: 403 })
  }

  const identityAlias = await linkFirebaseIdentity(runtime.client, { uid: identity.uid, userId: resolved.context.userId })
  if (identityAlias === 'conflict') return NextResponse.json({ error: 'IDENTITY_ALIAS_CONFLICT' }, { status: 409 })
  if (identityAlias === 'failed') return NextResponse.json({ error: 'CORE_UNAVAILABLE' }, { status: 503 })

  return NextResponse.json({ provider: 'firebase', identityAlias, userId: resolved.context.userId })
}
