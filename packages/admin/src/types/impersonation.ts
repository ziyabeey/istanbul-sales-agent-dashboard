/**
 * @kepenk/admin — Impersonation Types
 *
 * Dual-identity JWT: admin keeps own identity + impersonates target user.
 * Max duration: 1 hour.
 * Blocked actions: password change, account deletion, payment info modification.
 */

export interface ImpersonationRequest {
  targetUserId: string
  reason: string                // min 10 chars required
}

export interface ImpersonationSession {
  token: string
  adminId: string
  targetUserId: string
  reason: string
  issuedAt: string
  expiresAt: string              // max 1 hour
  active: boolean
}

export interface ImpersonationJWTPayload {
  sub: string                    // targetUserId
  adminId: string
  isImpersonation: true
  reason: string
  iat: number
  exp: number
}

/**
 * Actions that are BLOCKED during impersonation.
 */
export const BLOCKED_IMPERSONATION_ACTIONS = [
  'change_password',
  'delete_account',
  'update_payment_method',
  'transfer_ownership',
  'create_admin',
  'modify_billing',
] as const

export type BlockedAction = typeof BLOCKED_IMPERSONATION_ACTIONS[number]

/**
 * Check if an action is blocked during impersonation.
 */
export function isBlockedAction(action: string): boolean {
  return (BLOCKED_IMPERSONATION_ACTIONS as readonly string[]).includes(action)
}
