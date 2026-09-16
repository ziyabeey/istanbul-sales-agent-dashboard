import { z } from 'zod'
import { Permission, ROLE_PERMISSIONS, SiteRole } from './roles'

const isoDateTime = z.string().datetime()

export const UserStatusSchema = z.enum(['active', 'disabled'])
export type UserStatus = z.infer<typeof UserStatusSchema>

export const AuthIdentityProviderSchema = z.enum(['phone', 'google', 'legacy'])
export type AuthIdentityProvider = z.infer<typeof AuthIdentityProviderSchema>

export const AuthMethodSchema = z.enum(['phone_otp', 'google_oidc', 'legacy', 'demo'])
export type AuthMethod = z.infer<typeof AuthMethodSchema>

export const MembershipStatusSchema = z.enum(['active', 'suspended', 'disabled'])
export type MembershipStatus = z.infer<typeof MembershipStatusSchema>

export const UserSchema = z.object({
  userId: z.string().min(1),
  status: UserStatusSchema,
  sessionEpoch: z.number().int().nonnegative(),
  revision: z.number().int().nonnegative(),
  createdAt: isoDateTime,
  updatedAt: isoDateTime,
}).strict()

export type User = z.infer<typeof UserSchema>

export const AuthIdentitySchema = z.object({
  identityId: z.string().min(1),
  userId: z.string().min(1),
  provider: AuthIdentityProviderSchema,
  subject: z.string().min(1),
  verifiedAt: isoDateTime,
  createdAt: isoDateTime,
}).strict()

export type AuthIdentity = z.infer<typeof AuthIdentitySchema>

export const MembershipSchema = z.object({
  membershipId: z.string().min(1),
  userId: z.string().min(1),
  tenantId: z.string().min(1),
  role: z.nativeEnum(SiteRole),
  status: MembershipStatusSchema,
  revision: z.number().int().nonnegative(),
  createdAt: isoDateTime,
  updatedAt: isoDateTime,
}).strict()

export type Membership = z.infer<typeof MembershipSchema>

export const SessionSchema = z.object({
  sessionId: z.string().min(1),
  userId: z.string().min(1),
  issuedAt: isoDateTime,
  expiresAt: isoDateTime,
  revokedAt: isoDateTime.nullable(),
  authMethod: AuthMethodSchema,
  sessionEpoch: z.number().int().nonnegative(),
  activeMembershipId: z.string().min(1).nullable(),
}).strict()

export type Session = z.infer<typeof SessionSchema>

export const RequestContextSchema = z.object({
  sessionId: z.string().min(1),
  userId: z.string().min(1),
  membershipId: z.string().min(1),
  tenantId: z.string().min(1),
  role: z.nativeEnum(SiteRole),
  permissions: z.array(z.nativeEnum(Permission)),
  authMethod: AuthMethodSchema,
  sessionEpoch: z.number().int().nonnegative(),
  membershipRevision: z.number().int().nonnegative(),
}).strict()

export type RequestContext = z.infer<typeof RequestContextSchema>

function stableIdPart(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) throw new Error('Canonical id part cannot be empty')
  return encodeURIComponent(trimmed)
}

/**
 * Migration bridge only: a legacy esnaf/tenant id maps deterministically to a
 * canonical User without copying tenant/business facts into the User record.
 */
export function legacyUserIdFromTenantId(legacyTenantId: string): string {
  return `usr_legacy_${stableIdPart(legacyTenantId)}`
}

/** Stable membership id for migration/backfill and idempotent provisioning. */
export function membershipIdFor(userId: string, tenantId: string): string {
  return `mem_${stableIdPart(userId)}__${stableIdPart(tenantId)}`
}

/** Server policy source. Callers receive a copy so role policy cannot mutate. */
export function permissionsForRole(role: SiteRole): Permission[] {
  return [...ROLE_PERMISSIONS[role]]
}
