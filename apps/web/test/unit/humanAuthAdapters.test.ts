import { describe, expect, it } from 'vitest'
import type {
  AuthIdentity,
  Membership,
  Session,
  User,
} from '../../../../packages/auth/src/types/canonical'
import { SiteRole } from '../../../../packages/auth/src/types/roles'
import {
  issueCanonicalHumanSession,
  type HumanAuthRepositories,
} from '../../src/lib/auth/humanAuthService'
import { identityIdFor } from '../../src/lib/auth/identityRepository'
import {
  isCanonicalSessionTokenCandidate,
  issueCanonicalSessionToken,
  verifyCanonicalSessionToken,
} from '../../src/lib/auth/sessionToken'

class MemoryHumanAuthRepositories implements HumanAuthRepositories {
  readonly userStore = new Map<string, User>()
  readonly identityStore = new Map<string, AuthIdentity>()
  readonly membershipStore = new Map<string, Membership>()
  readonly sessionStore = new Map<string, Session>()

  users: HumanAuthRepositories['users']
  identities: HumanAuthRepositories['identities']
  memberships: HumanAuthRepositories['memberships']
  sessions: HumanAuthRepositories['sessions']

  constructor() {
    this.users = {
      getById: async (userId: string) => this.userStore.get(userId) ?? null,
      create: async (user: User) => {
        if (this.userStore.has(user.userId)) throw new Error('already exists')
        this.userStore.set(user.userId, user)
      },
      updateSessionEpoch: async (userId: string, nextEpoch: number, updatedAt: string) => {
        const user = this.userStore.get(userId)
        if (!user) throw new Error('not found')
        this.userStore.set(userId, {
          ...user,
          sessionEpoch: nextEpoch,
          revision: user.revision + 1,
          updatedAt,
        })
      },
    }

    this.identities = {
      getById: async (identityId: string) => this.identityStore.get(identityId) ?? null,
      findByProviderSubject: async (provider, subject) => (
        this.identityStore.get(identityIdFor(provider, subject)) ?? null
      ),
      create: async (identity: AuthIdentity) => {
        if (this.identityStore.has(identity.identityId)) throw new Error('already exists')
        this.identityStore.set(identity.identityId, identity)
      },
    }

    this.memberships = {
      getById: async (membershipId: string) => this.membershipStore.get(membershipId) ?? null,
      listByUserId: async (userId: string) => (
        [...this.membershipStore.values()].filter((membership) => membership.userId === userId)
      ),
      create: async (membership: Membership) => {
        if (this.membershipStore.has(membership.membershipId)) throw new Error('already exists')
        this.membershipStore.set(membership.membershipId, membership)
      },
    }

    this.sessions = {
      getById: async (sessionId: string) => this.sessionStore.get(sessionId) ?? null,
      create: async (session: Session) => {
        if (this.sessionStore.has(session.sessionId)) throw new Error('already exists')
        this.sessionStore.set(session.sessionId, session)
      },
      revoke: async (sessionId: string, revokedAt: string) => {
        const session = this.sessionStore.get(sessionId)
        if (!session) return false
        this.sessionStore.set(sessionId, { ...session, revokedAt })
        return true
      },
    }
  }
}

function decodeSegment(token: string, index: number): Record<string, unknown> {
  const segment = token.split('.')[index]
  return JSON.parse(Buffer.from(segment, 'base64url').toString('utf8')) as Record<string, unknown>
}

const NOW = new Date('2026-09-16T09:00:00.000Z')

describe('canonical human auth issuance', () => {
  it('maps phone and Google identities for one legacy tenant to the same User and Membership', async () => {
    const repositories = new MemoryHumanAuthRepositories()

    const phone = await issueCanonicalHumanSession({
      tenantId: 'esnaf-42',
      provider: 'phone',
      subject: '905551112233',
      authMethod: 'phone_otp',
      now: NOW,
    }, repositories)

    const google = await issueCanonicalHumanSession({
      tenantId: 'esnaf-42',
      provider: 'google',
      subject: 'google-sub-42',
      authMethod: 'google_oidc',
      now: new Date(NOW.getTime() + 1000),
    }, repositories)

    expect(phone.user.userId).toBe(google.user.userId)
    expect(phone.membership.membershipId).toBe(google.membership.membershipId)
    expect(phone.identity.identityId).not.toBe(google.identity.identityId)
    expect(phone.session.sessionId).not.toBe(google.session.sessionId)
    expect(phone.session.activeMembershipId).toBe(phone.membership.membershipId)
    expect(phone.session).not.toHaveProperty('tenantId')
    expect(phone.session).not.toHaveProperty('role')
    expect(repositories.userStore.size).toBe(1)
    expect(repositories.membershipStore.size).toBe(1)
    expect(repositories.identityStore.size).toBe(2)
    expect(repositories.sessionStore.size).toBe(2)
  })

  it('fails before issuing a Session when an AuthIdentity belongs to another User', async () => {
    const repositories = new MemoryHumanAuthRepositories()
    const identityId = identityIdFor('phone', '905551112233')

    repositories.identityStore.set(identityId, {
      identityId,
      userId: 'usr_someone_else',
      provider: 'phone',
      subject: '905551112233',
      verifiedAt: NOW.toISOString(),
      createdAt: NOW.toISOString(),
    })

    await expect(issueCanonicalHumanSession({
      tenantId: 'esnaf-42',
      provider: 'phone',
      subject: '905551112233',
      authMethod: 'phone_otp',
      now: NOW,
    }, repositories)).rejects.toThrow('different canonical user')

    expect(repositories.sessionStore.size).toBe(0)
  })

  it('does not issue a Session through a suspended Membership', async () => {
    const repositories = new MemoryHumanAuthRepositories()
    const userId = 'usr_legacy_esnaf-42'
    const membershipId = 'mem_usr_legacy_esnaf-42__esnaf-42'

    repositories.userStore.set(userId, {
      userId,
      status: 'active',
      sessionEpoch: 0,
      revision: 0,
      createdAt: NOW.toISOString(),
      updatedAt: NOW.toISOString(),
    })
    repositories.membershipStore.set(membershipId, {
      membershipId,
      userId,
      tenantId: 'esnaf-42',
      role: SiteRole.OWNER,
      status: 'suspended',
      revision: 1,
      createdAt: NOW.toISOString(),
      updatedAt: NOW.toISOString(),
    })

    await expect(issueCanonicalHumanSession({
      tenantId: 'esnaf-42',
      provider: 'phone',
      subject: '905551112233',
      authMethod: 'phone_otp',
      now: NOW,
    }, repositories)).rejects.toThrow('Canonical membership is suspended')

    expect(repositories.sessionStore.size).toBe(0)
  })
})

describe('canonical signed session locator', () => {
  it('pins HS256 and carries only durable Session locator identity', async () => {
    const tokenNow = new Date()
    const session: Session = {
      sessionId: 'ses_test',
      userId: 'usr_test',
      issuedAt: tokenNow.toISOString(),
      expiresAt: new Date(tokenNow.getTime() + 60_000).toISOString(),
      revokedAt: null,
      authMethod: 'phone_otp',
      sessionEpoch: 0,
      activeMembershipId: 'mem_test',
    }

    const token = await issueCanonicalSessionToken(session)
    const header = decodeSegment(token, 0)
    const decoded = decodeSegment(token, 1)

    expect(header.alg).toBe('HS256')
    expect(isCanonicalSessionTokenCandidate(token)).toBe(true)
    expect(decoded.sub).toBe('usr_test')
    expect(decoded.sid).toBe('ses_test')
    expect(decoded.kind).toBe('canonical-session')
    expect(decoded).not.toHaveProperty('tenantId')
    expect(decoded).not.toHaveProperty('role')
    await expect(verifyCanonicalSessionToken(token)).resolves.toEqual({
      sessionId: 'ses_test',
      userId: 'usr_test',
    })
  })
})
