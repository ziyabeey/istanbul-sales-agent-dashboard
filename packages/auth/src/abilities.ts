/**
 * @kepenk/auth — CASL Ability Builder
 * Converts SiteRole into CASL abilities for fine-grained access control.
 */

import { SiteRole, ROLE_PERMISSIONS } from './types/roles'

/**
 * CASL-compatible action types derived from Permission enum.
 */
export type AbilityAction =
  | 'view' | 'create' | 'edit' | 'delete'
  | 'manage' | 'publish' | 'transfer'
  | 'invite' | 'remove' | 'change_role'
  | 'export' | 'spend' | 'refund' | 'kds'
  | 'settings'

export type AbilitySubject =
  | 'Site' | 'Product' | 'Order' | 'Customer'
  | 'Booking' | 'Blog' | 'Marketing' | 'Finance'
  | 'Team' | 'Billing' | 'Restaurant' | 'Stock'

export interface AbilityRule {
  action: AbilityAction
  subject: AbilitySubject
}

const SUBJECT_MAP: Record<string, AbilitySubject> = {
  site: 'Site',
  product: 'Product',
  order: 'Order',
  customer: 'Customer',
  booking: 'Booking',
  blog: 'Blog',
  marketing: 'Marketing',
  finance: 'Finance',
  team: 'Team',
  billing: 'Billing',
  restaurant: 'Restaurant',
  stock: 'Stock',
}

/**
 * Build ability rules for a given role.
 * Returns an array of { action, subject } that the role is allowed.
 */
export function buildAbilityRules(role: SiteRole): AbilityRule[] {
  const permissions = ROLE_PERMISSIONS[role]
  const rules: AbilityRule[] = []

  for (const permission of permissions) {
    const [subjectKey, action] = permission.split(':')
    const subject = SUBJECT_MAP[subjectKey]
    if (subject && action) {
      rules.push({ action: action as AbilityAction, subject })
    }
  }

  return rules
}

/**
 * Check if a set of ability rules allows a specific action on a subject.
 * Lightweight alternative to full CASL when only simple checks are needed.
 */
export function checkAbility(
  rules: AbilityRule[],
  action: AbilityAction,
  subject: AbilitySubject
): boolean {
  return rules.some((r) => r.action === action && r.subject === subject)
}
