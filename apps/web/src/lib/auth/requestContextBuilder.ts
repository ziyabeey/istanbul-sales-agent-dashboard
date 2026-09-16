import {
  RequestContextSchema,
  permissionsForRole,
  type RequestContext,
} from '../../../../../packages/auth/src/types/canonical'
import type { MembershipResolutionFailureReason } from './membershipResolver'
import { MembershipResolver } from './membershipResolver'
import type { SessionVerificationFailureReason } from './sessionVerifier'
import { SessionVerifier } from './sessionVerifier'

export type RequestContextFailureReason =
  | SessionVerificationFailureReason
  | MembershipResolutionFailureReason

export type RequestContextResult =
  | { ok: true; context: RequestContext }
  | { ok: false; reason: RequestContextFailureReason }

export class RequestContextBuilder {
  constructor(
    private readonly sessionVerifier: SessionVerifier,
    private readonly membershipResolver: MembershipResolver
  ) {}

  async build(sessionId: string, now: Date = new Date()): Promise<RequestContextResult> {
    const verification = await this.sessionVerifier.verify(sessionId, now)
    if (!verification.ok) return verification

    const membership = await this.membershipResolver.resolve(verification.session)
    if (!membership.ok) return membership

    const context = RequestContextSchema.parse({
      sessionId: verification.session.sessionId,
      userId: verification.user.userId,
      membershipId: membership.membership.membershipId,
      tenantId: membership.membership.tenantId,
      role: membership.membership.role,
      permissions: permissionsForRole(membership.membership.role),
      authMethod: verification.session.authMethod,
      sessionEpoch: verification.session.sessionEpoch,
      membershipRevision: membership.membership.revision,
    })

    return { ok: true, context }
  }
}
