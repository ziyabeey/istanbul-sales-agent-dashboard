import type { RequestContext } from '../../../../../packages/auth/src/types/canonical'
import { FirestoreMembershipRepository } from './membershipRepository'
import { MembershipResolver } from './membershipResolver'
import { RequestContextBuilder } from './requestContextBuilder'
import { FirestoreSessionRepository } from './sessionRepository'
import { SessionVerifier } from './sessionVerifier'
import {
  isCanonicalSessionTokenCandidate,
  verifyCanonicalSessionToken,
} from './sessionToken'
import { FirestoreUserRepository } from './userRepository'

export const BUSINESS_SESSION_COOKIE = 'kepenk_session'

function canonicalContextBuilder(): RequestContextBuilder {
  const sessions = new FirestoreSessionRepository()
  const users = new FirestoreUserRepository()
  const memberships = new FirestoreMembershipRepository()

  return new RequestContextBuilder(
    new SessionVerifier(sessions, users),
    new MembershipResolver(memberships)
  )
}

/**
 * Canonical business-session authority.
 *
 * Important migration invariant: a token that is not canonical is not treated
 * as authenticated here. Legacy JWT compatibility belongs only to explicitly
 * scoped adapters until retirement and must never become an OR escape hatch.
 */
export async function resolveCanonicalBusinessContext(
  token: string | null | undefined
): Promise<RequestContext | null> {
  if (!token || !isCanonicalSessionTokenCandidate(token)) return null

  const claims = await verifyCanonicalSessionToken(token)
  if (!claims) return null

  const result = await canonicalContextBuilder().build(claims.sessionId)
  if (!result.ok) return null

  if (result.context.userId !== claims.userId) return null
  return result.context
}

export function readBusinessSessionToken(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return null

  for (const entry of cookieHeader.split(';')) {
    const separator = entry.indexOf('=')
    if (separator < 0) continue

    const name = entry.slice(0, separator).trim()
    if (name !== BUSINESS_SESSION_COOKIE) continue

    const rawValue = entry.slice(separator + 1).trim()
    if (!rawValue) return null

    try {
      return decodeURIComponent(rawValue)
    } catch {
      return rawValue
    }
  }

  return null
}

export async function resolveCanonicalBusinessContextFromRequest(
  request: Request
): Promise<RequestContext | null> {
  return resolveCanonicalBusinessContext(readBusinessSessionToken(request))
}
