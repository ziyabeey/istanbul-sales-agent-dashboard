/**
 * @kepenk/admin — Barrel Export
 */

// Impersonation
export type {
  ImpersonationRequest, ImpersonationSession,
  ImpersonationJWTPayload, BlockedAction,
} from './types/impersonation'
export { BLOCKED_IMPERSONATION_ACTIONS, isBlockedAction } from './types/impersonation'

// Feature Flags
export type {
  FeatureFlag, FeatureFlagRule, FeatureFlagRuleType,
  FeatureFlagContext,
} from './types/featureFlags'
export { evaluateFlag, KNOWN_FLAGS } from './types/featureFlags'

// Audit Log
export type {
  AuditLogEntry, AuditSeverity, AuditTargetType, AuditCategory,
} from './types/auditLog'
export { SEVERITY_LABELS, CATEGORY_LABELS } from './types/auditLog'
