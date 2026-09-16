import type {
  Membership,
  Session,
} from '../../../../../packages/auth/src/types/canonical'
import type { MembershipRepository } from './membershipRepository'

export type MembershipResolutionFailureReason =
  | 'membership_not_found'
  | 'membership_user_mismatch'
  | 'membership_suspended'
  | 'membership_disabled'
  | 'no_active_membership'
  | 'ambiguous_membership'

export type MembershipResolutionResult =
  | { ok: true; membership: Membership }
  | { ok: false; reason: MembershipResolutionFailureReason }

export class MembershipResolver {
  constructor(private readonly memberships: MembershipRepository) {}

  async resolve(session: Session): Promise<MembershipResolutionResult> {
    if (session.activeMembershipId) {
      const membership = await this.memberships.getById(session.activeMembershipId)
      if (!membership) return { ok: false, reason: 'membership_not_found' }
      if (membership.userId !== session.userId) {
        return { ok: false, reason: 'membership_user_mismatch' }
      }
      if (membership.status === 'suspended') {
        return { ok: false, reason: 'membership_suspended' }
      }
      if (membership.status === 'disabled') {
        return { ok: false, reason: 'membership_disabled' }
      }
      return { ok: true, membership }
    }

    const memberships = await this.memberships.listByUserId(session.userId)
    const active = memberships.filter((membership) => membership.status === 'active')

    if (active.length === 0) return { ok: false, reason: 'no_active_membership' }
    if (active.length > 1) return { ok: false, reason: 'ambiguous_membership' }

    return { ok: true, membership: active[0] }
  }
}
