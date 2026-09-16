export { AUTH_COLLECTIONS } from './firestore'

export {
  FirestoreUserRepository,
  type UserRepository,
} from './userRepository'

export {
  FirestoreAuthIdentityRepository,
  identityIdFor,
  type AuthIdentityRepository,
} from './identityRepository'

export {
  FirestoreMembershipRepository,
  type MembershipRepository,
} from './membershipRepository'

export {
  FirestoreSessionRepository,
  type SessionRepository,
} from './sessionRepository'

export {
  SessionVerifier,
  type SessionVerificationFailureReason,
  type SessionVerificationResult,
} from './sessionVerifier'

export {
  MembershipResolver,
  type MembershipResolutionFailureReason,
  type MembershipResolutionResult,
} from './membershipResolver'

export {
  RequestContextBuilder,
  type RequestContextFailureReason,
  type RequestContextResult,
} from './requestContextBuilder'

export {
  issueCanonicalHumanSession,
  type HumanAuthRepositories,
  type IssueHumanSessionInput,
  type IssuedHumanSession,
} from './humanAuthService'

export {
  isCanonicalSessionTokenCandidate,
  issueCanonicalSessionToken,
  verifyCanonicalSessionToken,
  type CanonicalSessionTokenClaims,
} from './sessionToken'

export {
  BUSINESS_SESSION_COOKIE,
  readBusinessSessionToken,
  resolveCanonicalBusinessContext,
  resolveCanonicalBusinessContextFromRequest,
} from './businessSession'
