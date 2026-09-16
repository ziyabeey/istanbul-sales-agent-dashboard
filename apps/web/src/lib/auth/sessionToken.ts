import type { Session } from '../../../../../packages/auth/src/types/canonical'
import { getSessionSecret } from './sessionSecret'
import {
  decodeJwtPayloadUnsafe,
  signHs256Jwt,
  verifyHs256Jwt,
} from './jwtHmac'

const CANONICAL_SESSION_KIND = 'canonical-session'
const SESSION_ISSUER = 'kepenk.ai'
const SESSION_AUDIENCE = 'kepenk.ai:web'

export interface CanonicalSessionTokenClaims {
  sessionId: string
  userId: string
}

export function isCanonicalSessionTokenCandidate(token: string): boolean {
  return decodeJwtPayloadUnsafe(token)?.kind === CANONICAL_SESSION_KIND
}

export async function issueCanonicalSessionToken(session: Session): Promise<string> {
  return signHs256Jwt({
    kind: CANONICAL_SESSION_KIND,
    sid: session.sessionId,
    sub: session.userId,
    iss: SESSION_ISSUER,
    aud: SESSION_AUDIENCE,
    iat: Math.floor(Date.parse(session.issuedAt) / 1000),
    exp: Math.floor(Date.parse(session.expiresAt) / 1000),
  }, getSessionSecret())
}

export async function verifyCanonicalSessionToken(
  token: string
): Promise<CanonicalSessionTokenClaims | null> {
  const payload = verifyHs256Jwt(token, getSessionSecret(), {
    issuer: SESSION_ISSUER,
    audience: SESSION_AUDIENCE,
  })

  if (
    !payload ||
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
}
