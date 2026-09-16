import type {
  Session,
  User,
} from '../../../../../packages/auth/src/types/canonical'
import type { SessionRepository } from './sessionRepository'
import type { UserRepository } from './userRepository'

export type SessionVerificationFailureReason =
  | 'session_not_found'
  | 'session_revoked'
  | 'session_expired'
  | 'session_not_yet_valid'
  | 'user_not_found'
  | 'user_disabled'
  | 'session_epoch_mismatch'

export type SessionVerificationResult =
  | { ok: true; session: Session; user: User }
  | { ok: false; reason: SessionVerificationFailureReason }

export class SessionVerifier {
  constructor(
    private readonly sessions: SessionRepository,
    private readonly users: UserRepository,
    private readonly allowedClockSkewMs = 30_000
  ) {}

  async verify(sessionId: string, now: Date = new Date()): Promise<SessionVerificationResult> {
    const session = await this.sessions.getById(sessionId)
    if (!session) return { ok: false, reason: 'session_not_found' }
    if (session.revokedAt) return { ok: false, reason: 'session_revoked' }

    const nowMs = now.getTime()
    const issuedAtMs = Date.parse(session.issuedAt)
    const expiresAtMs = Date.parse(session.expiresAt)

    if (issuedAtMs > nowMs + this.allowedClockSkewMs) {
      return { ok: false, reason: 'session_not_yet_valid' }
    }

    if (expiresAtMs <= nowMs) {
      return { ok: false, reason: 'session_expired' }
    }

    const user = await this.users.getById(session.userId)
    if (!user) return { ok: false, reason: 'user_not_found' }
    if (user.status !== 'active') return { ok: false, reason: 'user_disabled' }

    if (session.sessionEpoch !== user.sessionEpoch) {
      return { ok: false, reason: 'session_epoch_mismatch' }
    }

    return { ok: true, session, user }
  }
}
