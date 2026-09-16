import { describe, expect, it } from 'vitest'
import {
  SessionSchema,
  legacyUserIdFromTenantId,
  membershipIdFor,
  type Membership,
  type Session,
  type User,
} from '../../../../packages/auth/src/types/canonical'
import { Permission, SiteRole } from '../../../../packages/auth/src/types/roles'
import { identityIdFor } from '../../src/lib/auth/identityRepository'
import { MembershipResolver } from '../../src/lib/auth/membershipResolver'
import type { MembershipRepository } from '../../src/lib/auth/membershipRepository'
import { RequestContextBuilder } from '../../src/lib/auth/requestContextBuilder'
import type { SessionRepository } from '../../src/lib/auth/sessionRepository'
import { SessionVerifier } from '../../src/lib/auth/sessionVerifier'
import type { UserRepository } from '../../src/lib/auth/userRepository'

const NOW = new Date('2026-09-16T06:00:00.000Z')

function canonicalUser(overrides: Partial<User> = {}): User {
  return {
    userId: 'usr_legacy_esnaf-1',
    status: 'active',
    sessionEpoch: 3,
    revision: 1,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
    ...overrides,
  }
}

function canonicalMembership(overrides: Partial<Membership> = {}): Membership {
  return {
    membershipId: 'mem-1',
    userId: 'usr_legacy_esnaf-1',
    tenantId: 'tenant-real',
    role: SiteRole.OWNER,
    status: 'active',
    revision: 4,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
    ...overrides,
  }
}

function canonicalSession(overrides: Partial<Session> = {}): Session {
  return {
    sessionId: 'ses-1',
    userId: 'usr_legacy_esnaf-1',
    issuedAt: '2026-09-16T05:00:00.000Z',
    expiresAt: '2026-09-17T05:00:00.000Z',
    revokedAt: null,
    authMethod: 'legacy',
    sessionEpoch: 3,
    activeMembershipId: 'mem-1',
    ...overrides,
  }
}

class MemorySessionRepository implements SessionRepository {
  constructor(private readonly session: Session | null) {}

  async getById(): Promise<Session | null> {
    return this.session
  }

  async create(): Promise<void> {}

  async revoke(): Promise<boolean> {
    return this.session !== null
  }
}

class MemoryUserRepository implements UserRepository {
  constructor(private readonly user: User | null) {}

  async getById(): Promise<User | null> {
    return this.user
  }

  async create(): Promise<void> {}

  async updateSessionEpoch(): Promise<void> {}
}

class MemoryMembershipRepository implements MembershipRepository {
  constructor(private readonly memberships: Membership[]) {}

  async getById(membershipId: string): Promise<Membership | null> {
    return this.memberships.find((membership) => membership.membershipId === membershipId) ?? null
  }

  async listByUserId(userId: string): Promise<Membership[]> {
    return this.memberships.filter((membership) => membership.userId === userId)
  }

  async create(): Promise<void> {}
}

function buildContextHarness(
  session: Session | null = canonicalSession(),
  user: User | null = canonicalUser(),
  memberships: Membership[] = [canonicalMembership()]
): RequestContextBuilder {
  const verifier = new SessionVerifier(
    new MemorySessionRepository(session),
    new MemoryUserRepository(user)
  )
  const resolver = new MembershipResolver(new MemoryMembershipRepository(memberships))
  return new RequestContextBuilder(verifier, resolver)
}

describe('canonical auth contracts', () => {
  it('keeps tenant and role facts out of Session', () => {
    expect(() => SessionSchema.parse({
      ...canonicalSession(),
      tenantId: 'tenant-shadow',
      role: SiteRole.ADMIN,
    })).toThrow()
  })

  it('maps legacy ids deterministically without copying business facts', () => {
    expect(legacyUserIdFromTenantId('esnaf/42')).toBe('usr_legacy_esnaf%2F42')
    expect(legacyUserIdFromTenantId('esnaf/42')).toBe(legacyUserIdFromTenantId('esnaf/42'))

    const membershipId = membershipIdFor('usr_legacy_esnaf%2F42', 'tenant/42')
    expect(membershipId).toBe('mem_usr_legacy_esnaf%252F42__tenant%2F42')
    expect(membershipId).not.toContain('/')
  })

  it('derives opaque deterministic AuthIdentity ids from provider + subject', () => {
    const first = identityIdFor('phone', '+905551112233')
    const second = identityIdFor('phone', '+905551112233')
    const google = identityIdFor('google', '+905551112233')

    expect(first).toBe(second)
    expect(first).not.toBe(google)
    expect(first).not.toContain('+905551112233')
  })
})

describe('SessionVerifier', () => {
  it('denies a revoked Session replay', async () => {
    const verifier = new SessionVerifier(
      new MemorySessionRepository(canonicalSession({ revokedAt: '2026-09-16T05:30:00.000Z' })),
      new MemoryUserRepository(canonicalUser())
    )

    await expect(verifier.verify('ses-1', NOW)).resolves.toEqual({
      ok: false,
      reason: 'session_revoked',
    })
  })

  it('denies an expired Session', async () => {
    const verifier = new SessionVerifier(
      new MemorySessionRepository(canonicalSession({ expiresAt: '2026-09-16T05:59:59.000Z' })),
      new MemoryUserRepository(canonicalUser())
    )

    await expect(verifier.verify('ses-1', NOW)).resolves.toEqual({
      ok: false,
      reason: 'session_expired',
    })
  })

  it('denies a disabled User even when the Session is otherwise valid', async () => {
    const verifier = new SessionVerifier(
      new MemorySessionRepository(canonicalSession()),
      new MemoryUserRepository(canonicalUser({ status: 'disabled' }))
    )

    await expect(verifier.verify('ses-1', NOW)).resolves.toEqual({
      ok: false,
      reason: 'user_disabled',
    })
  })

  it('denies stale Session epochs', async () => {
    const verifier = new SessionVerifier(
      new MemorySessionRepository(canonicalSession({ sessionEpoch: 2 })),
      new MemoryUserRepository(canonicalUser({ sessionEpoch: 3 }))
    )

    await expect(verifier.verify('ses-1', NOW)).resolves.toEqual({
      ok: false,
      reason: 'session_epoch_mismatch',
    })
  })
})

describe('MembershipResolver + RequestContextBuilder', () => {
  it('denies a suspended Membership', async () => {
    const builder = buildContextHarness(
      canonicalSession(),
      canonicalUser(),
      [canonicalMembership({ status: 'suspended' })]
    )

    await expect(builder.build('ses-1', NOW)).resolves.toEqual({
      ok: false,
      reason: 'membership_suspended',
    })
  })

  it('fails closed when a Session has multiple active memberships but no trusted selection', async () => {
    const session = canonicalSession({ activeMembershipId: null })
    const builder = buildContextHarness(
      session,
      canonicalUser(),
      [
        canonicalMembership({ membershipId: 'mem-1', tenantId: 'tenant-a' }),
        canonicalMembership({ membershipId: 'mem-2', tenantId: 'tenant-b' }),
      ]
    )

    await expect(builder.build('ses-1', NOW)).resolves.toEqual({
      ok: false,
      reason: 'ambiguous_membership',
    })
  })

  it('builds tenant authority from verified Membership, never caller payload', async () => {
    const attackerPayload = { tenantId: 'tenant-attacker' }
    const builder = buildContextHarness()
    const result = await builder.build('ses-1', NOW)

    expect(attackerPayload.tenantId).toBe('tenant-attacker')
    expect(result.ok).toBe(true)
    if (!result.ok) throw new Error(result.reason)

    expect(result.context.tenantId).toBe('tenant-real')
    expect(result.context.membershipId).toBe('mem-1')
    expect(result.context.permissions).toContain(Permission.FINANCE_MANAGE)
    expect(result.context).not.toHaveProperty('paket')
  })
})
