export type AuditAction =
    | 'COMPLAINT_STATUS_CHANGED'
    | 'ESNAF_FLAGGED'
    | 'ESNAF_STATUS_CHANGED'
    | 'ESNAF_UPDATED'
    | 'ESNAF_DELETED'
    | 'ADMIN_KOTA_MUTATION'
    | 'IMPERSONATION_STARTED'
    | 'IMPERSONATION_ENDED'
    | 'MANUAL_PACKAGE_ADJUSTMENT';

export type AuditTargetType =
    | 'complaint'
    | 'business'
    | 'user'
    | 'package'
    | 'impersonation'
    | 'system';

export type AdminAuditOutcome = 'REQUESTED' | 'SUCCEEDED' | 'FAILED';

interface AdminActionBase {
    eventId: string;
    caseId: string;
    actorAdminId: string;
    actingAsTargetId?: string;
    targetType: AuditTargetType;
    targetId: string;
    action: AuditAction;
    timestamp: string;
    ip?: string;
    userAgent?: string;
    requestId: string;
    metadata?: Record<string, unknown>;
}

export interface AdminActionRequested extends AdminActionBase {
    eventType: 'AdminActionRequested';
    outcome: 'REQUESTED';
}

export interface AdminActionOutcome extends AdminActionBase {
    eventType: 'AdminActionOutcome';
    outcome: 'SUCCEEDED' | 'FAILED';
    errorCode?: string;
}

export type AdminAuditRecord = AdminActionRequested | AdminActionOutcome;

// Legacy compatibility shape. New privileged mutations should use the
// AdminActionRequested/AdminActionOutcome pair above.
export interface AuditLogInput {
    adminId: string;
    action: AuditAction;
    targetType: AuditTargetType;
    targetId: string;
    metadata?: Record<string, unknown>;
}

export interface AuditLog extends AuditLogInput {
    id: string;
    createdAt: string;
    ip?: string;
    userAgent?: string;
}
