import { decodeJwt, jwtVerify, SignJWT } from 'jose'
import type { Session } from '../../../../../packages/auth/src/types/canonical'
import { getSessionSecret } from './sessionSecret'

const CANONICAL_SESSION_KIND = 'canonical-session'
const SESSION_ISSUER = 'kepenk.ai'
const SESSION_AUDIENCE = 'kepenk.ai:web'

export interface CanonicalSessionTokenClaims {
  sessionId: string
  userId: string
}

export function isCanonicalSessionTokenCandidate(token: string): boolean {
  try {
    return decodeJwt(token).kind === CANONICAL_SESSION_KIND
  } catch {
    return false
  }
}

export async function issueCanonicalSessionToken(session: Session): Promise<string> {
  return new SignJWT({
    kind: CANONICAL_SESSION_KIND,
    sid: session.sessionId,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(session.userId)
    .setIssuer(SESSION_ISSUER)
    .setAudience(SESSION_AUDIENCE)
    .setIssuedAt(Math.floor(Date.parse(session.issuedAt) / 1000))
    .setExpirationTime(Math.floor(Date.parse(session.expiresAt) / 1000))
    .sign(getSessionSecret())
}

export async function verifyCanonicalSessionToken(
  token: string
): Promise<CanonicalSessionTokenClaims | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), {
      issuer: SESSION_ISSUER,
      audience: SESSION_AUDIENCE,
    })

    if (
      payload.kind !== CANONICAL_SESSION_KIND ||
      typeof payload.sid !== 'string' ||
      typeof payload.sub !== 'string'
    ) {
      return null
    }

    return {
      sessionId: payload.sid,
      userId: payload.sub,
    }
  } catch {
    return null
  }
}
