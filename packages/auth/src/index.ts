/**
 * @kepenk/auth — Barrel Export
 */

// Types
export { SiteRole, Permission, ROLE_PERMISSIONS, ROLE_CONFIG, canManageRole, hasPermission } from './types/roles'
export type { Invitation, TeamMember, OwnershipTransfer } from './types/invitation'
export {
  UserStatusSchema,
  AuthIdentityProviderSchema,
  AuthMethodSchema,
  MembershipStatusSchema,
  UserSchema,
  AuthIdentitySchema,
  MembershipSchema,
  SessionSchema,
  RequestContextSchema,
  legacyUserIdFromTenantId,
  membershipIdFor,
  permissionsForRole,
} from './types/canonical'
export type {
  UserStatus,
  AuthIdentityProvider,
  AuthMethod,
  MembershipStatus,
  User,
  AuthIdentity,
  Membership,
  Session,
  RequestContext,
} from './types/canonical'

// Abilities
export { buildAbilityRules, checkAbility } from './abilities'
export type { AbilityAction, AbilitySubject, AbilityRule } from './abilities'

// React Hooks & Components
export { AbilityProvider, useAbility, useCanDo, Can } from './hooks/useAbility'
