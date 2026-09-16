import { randomUUID } from 'node:crypto'
import type {
  AuthIdentity,
  AuthIdentityProvider,
  AuthMethod,
  Membership,
  Session,
  User,
} from '../../../../../packages/auth/src/types/canonical'
import {
  legacyUserIdFromTenantId,
  membershipIdFor,
} from '../../../../../packages/auth/src/types/canonical'
import { SiteRole } from '../../../../../packages/auth/src/types/roles'
import {
  FirestoreAuthIdentityRepository,
  identityIdFor,
  type AuthIdentityRepository,
} from './identityRepository'
import {
  FirestoreMembershipRepository,
  type MembershipRepository,
} from './membershipRepository'
import {
  FirestoreSessionRepository,
  type SessionRepository,
} from './sessionRepository'
import {
  FirestoreUserRepository,
  type UserRepository,
} from './userRepository'

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000

export interface HumanAuthRepositories {
  users: UserRepository
  identities: AuthIdentityRepository
  memberships: MembershipRepository
  sessions: SessionRepository
}

export interface IssueHumanSessionInput {
  tenantId: string
  provider: Extract<AuthIdentityProvider, 'phone' | 'google'>
  subject: string
  authMethod: Extract<AuthMethod, 'phone_otp' | 'google_oidc'>
  now?: Date
}

export interface IssuedHumanSession {
  user: User
  identity: AuthIdentity
  membership: Membership
  session: Session
}

function defaultRepositories(): HumanAuthRepositories {
  return {
    users: new FirestoreUserRepository(),
    identities: new FirestoreAuthIdentityRepository(),
    memberships: new FirestoreMembershipRepository(),
    sessions: new FirestoreSessionRepository(),
  }
}

async function createOrRead<T>(
  read: () => Promise<T | null>,
  create: () => Promise<void>,
  label: string
): Promise<T> {
  const existing = await read()
  if (existing) return existing

  try {
    await create()
  } catch (error) {
    const raced = await read()
    if (raced) return raced
    throw error
  }

  const created = await read()
  if (!created) throw new Error(`${label} was not readable after creation`)
  return created
}

export async function issueCanonicalHumanSession(
  input: IssueHumanSessionInput,
  repositories: HumanAuthRepositories = defaultRepositories()
): Promise<IssuedHumanSession> {
  const tenantId = input.tenantId.trim()
  const subject = input.subject.trim()
  if (!tenantId) throw new Error('Canonical human auth requires tenantId')
  if (!subject) throw new Error('Canonical human auth requires identity subject')

  const now = input.now ?? new Date()
  const nowIso = now.toISOString()
  const userId = legacyUserIdFromTenantId(tenantId)
  const membershipId = membershipIdFor(userId, tenantId)
  const authIdentityId = identityIdFor(input.provider, subject)

  const preexistingIdentity = await repositories.identities.getById(authIdentityId)
  if (preexistingIdentity && preexistingIdentity.userId !== userId) {
    throw new Error('Auth identity is already linked to a different canonical user')
  }

  const expectedUser: User = {
    userId,
    status: 'active',
    sessionEpoch: 0,
    revision: 0,
    createdAt: nowIso,
    updatedAt: nowIso,
  }

  const user = await createOrRead(
    () => repositories.users.getById(userId),
    () => repositories.users.create(expectedUser),
    'Canonical User'
  )

  if (user.status !== 'active') {
    throw new Error('Canonical user is disabled')
  }

  const expectedMembership: Membership = {
    membershipId,
    userId,
    tenantId,
    role: SiteRole.OWNER,
    status: 'active',
    revision: 0,
    createdAt: nowIso,
    updatedAt: nowIso,
  }

  const membership = await createOrRead(
    () => repositories.memberships.getById(membershipId),
    () => repositories.memberships.create(expectedMembership),
    'Canonical Membership'
  )

  if (membership.userId !== userId || membership.tenantId !== tenantId) {
    throw new Error('Canonical membership does not match the resolved human identity')
  }
  if (membership.status !== 'active') {
    throw new Error(`Canonical membership is ${membership.status}`)
  }

  const expectedIdentity: AuthIdentity = {
    identityId: authIdentityId,
    userId,
    provider: input.provider,
    subject,
    verifiedAt: nowIso,
    createdAt: nowIso,
  }

  const identity = await createOrRead(
    () => repositories.identities.getById(authIdentityId),
    () => repositories.identities.create(expectedIdentity),
    'Canonical AuthIdentity'
  )

  if (identity.userId !== userId) {
    throw new Error('Auth identity is already linked to a different canonical user')
  }

  const session: Session = {
    sessionId: `ses_${randomUUID()}`,
    userId,
    issuedAt: nowIso,
    expiresAt: new Date(now.getTime() + SESSION_TTL_MS).toISOString(),
    revokedAt: null,
    authMethod: input.authMethod,
    sessionEpoch: user.sessionEpoch,
    activeMembershipId: membership.membershipId,
  }

  await repositories.sessions.create(session)

  return { user, identity, membership, session }
}
