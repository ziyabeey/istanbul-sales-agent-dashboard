import crypto from 'crypto'
import type { DocumentData, Query } from 'firebase-admin/firestore'
import type {
  AdminActionOutcome,
  AdminActionRequested,
  AdminAuditRecord,
  AuditAction,
  AuditTargetType,
} from '../../../../../packages/admin/src/types/auditLog'
import { adminDb } from '@/lib/firebaseAdmin'

export type AuditEventType =
  | 'auth.login_success' | 'auth.login_failure' | 'auth.logout'
  | 'auth.password_change' | 'auth.2fa_enable' | 'auth.2fa_disable'
  | 'auth.biometric_register'
  | 'data.customer_export' | 'data.bulk_delete' | 'data.gdpr_erase_request'
  | 'admin.staff_invite' | 'admin.staff_remove' | 'admin.role_change'
  | 'admin.api_key_create' | 'admin.api_key_revoke'
  | 'admin.payment_settings_change' | 'admin.site_publish'
  | 'payment.charge' | 'payment.refund' | 'payment.dispute'
  | 'security.rate_limit_hit' | 'security.suspicious_activity'
  | 'security.waf_block' | 'security.csrf_failure' | 'security.invalid_token'
  | 'resource.create' | 'resource.update' | 'resource.delete' | 'resource.read'

export type ActorType = 'esnaf' | 'staff' | 'customer' | 'api_key' | 'system'

interface AuditEntry {
  timestamp: string
  eventType: AuditEventType
  actorId: string
  actorType: ActorType
  esnafId: string
  resourceType?: string
  resourceId?: string
  action?: string
  ipAddress?: string
  userAgent?: string
  result: 'success' | 'failure'
  details?: Record<string, unknown>
}

export class AdminAuditPersistenceError extends Error {
  constructor(message = 'Privileged action audit persistence failed') {
    super(message)
    this.name = 'AdminAuditPersistenceError'
  }
}

export type AdminAuditWriter = (record: AdminAuditRecord) => Promise<void>

export interface AuditedAdminMutationInput {
  actorAdminId: string
  actingAsTargetId?: string
  targetType: AuditTargetType
  targetId: string
  action: AuditAction
  caseId?: string
  metadata?: Record<string, unknown>
}

function requestFields(request?: Request): { ip?: string; userAgent?: string; requestId?: string } {
  if (!request) return {}
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim() || undefined
  const userAgent = request.headers.get('user-agent') || undefined
  const requestId = request.headers.get('x-request-id') ||
    request.headers.get('x-correlation-id') || undefined
  return {
    ...(ip ? { ip } : {}),
    ...(userAgent ? { userAgent } : {}),
    ...(requestId ? { requestId } : {}),
  }
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code?: unknown }).code
    if (typeof code === 'string' && code) return code
  }
  if (error instanceof Error && error.name) return error.name
  return 'UNKNOWN_ERROR'
}

export async function persistAdminAuditRecord(record: AdminAuditRecord): Promise<void> {
  if (!adminDb) throw new Error('Admin audit requires Firestore')
  await adminDb.collection('admin_audit_log').doc(record.eventId).create(record)
}

async function strictWrite(record: AdminAuditRecord, writer: AdminAuditWriter): Promise<void> {
  try {
    await writer(record)
  } catch {
    throw new AdminAuditPersistenceError()
  }
}

export async function runAuditedAdminMutation<T>(
  input: AuditedAdminMutationInput,
  request: Request | undefined,
  mutation: () => Promise<T>,
  writer: AdminAuditWriter = persistAdminAuditRecord
): Promise<T> {
  const caseId = input.caseId || crypto.randomUUID()
  const common = {
    caseId,
    actorAdminId: input.actorAdminId,
    ...(input.actingAsTargetId ? { actingAsTargetId: input.actingAsTargetId } : {}),
    targetType: input.targetType,
    targetId: input.targetId,
    action: input.action,
    ...requestFields(request),
    ...(input.metadata ? { metadata: maskPIIInDetails(input.metadata) } : {}),
  }

  const requested: AdminActionRequested = {
    ...common,
    eventId: crypto.randomUUID(),
    eventType: 'AdminActionRequested',
    outcome: 'REQUESTED',
    timestamp: new Date().toISOString(),
  }
  await strictWrite(requested, writer)

  let result: T
  try {
    result = await mutation()
  } catch (error) {
    const failed: AdminActionOutcome = {
      ...common,
      eventId: crypto.randomUUID(),
      eventType: 'AdminActionOutcome',
      outcome: 'FAILED',
      errorCode: errorCode(error),
      timestamp: new Date().toISOString(),
    }
    await strictWrite(failed, writer)
    throw error
  }

  const succeeded: AdminActionOutcome = {
    ...common,
    eventId: crypto.randomUUID(),
    eventType: 'AdminActionOutcome',
    outcome: 'SUCCEEDED',
    timestamp: new Date().toISOString(),
  }
  await strictWrite(succeeded, writer)
  return result
}

export async function logAuditEvent(entry: Omit<AuditEntry, 'timestamp'>): Promise<void> {
  try {
    const auditEntry: AuditEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
      ipAddress: entry.ipAddress ? hashForPrivacy(entry.ipAddress) : undefined,
    }

    if (auditEntry.details) auditEntry.details = maskPIIInDetails(auditEntry.details)

    await adminDb.collection('esnaflar').doc(entry.esnafId)
      .collection('audit_logs').add(auditEntry)

    if (isSecurityEvent(entry.eventType)) {
      await adminDb.collection('global_audit_logs').add(auditEntry)
    }
  } catch (error) {
    console.error('[AUDIT] Failed to log:', error)
  }
}

export async function queryAuditLogs(
  esnafId: string,
  filters: { eventType?: string; actorId?: string; from?: string; to?: string; limit?: number }
): Promise<AuditEntry[]> {
  let query: Query<DocumentData> = adminDb.collection('esnaflar').doc(esnafId).collection('audit_logs')

  if (filters.eventType) query = query.where('eventType', '==', filters.eventType)
  if (filters.actorId) query = query.where('actorId', '==', filters.actorId)
  if (filters.from) query = query.where('timestamp', '>=', filters.from)
  if (filters.to) query = query.where('timestamp', '<=', filters.to)

  const snap = await query.orderBy('timestamp', 'desc').limit(filters.limit || 100).get()
  return snap.docs.map((doc) => doc.data() as AuditEntry)
}

function hashForPrivacy(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return 'h_' + Math.abs(hash).toString(16)
}

function maskPIIInDetails(details: Record<string, unknown>): Record<string, unknown> {
  const PII_KEYS = ['tcKimlik', 'iban', 'cardNumber', 'cvv', 'password', 'sifre', 'token']
  const masked = { ...details }

  for (const key of Object.keys(masked)) {
    if (PII_KEYS.some(pii => key.toLowerCase().includes(pii.toLowerCase()))) {
      masked[key] = '***MASKED***'
    }
  }
  return masked
}

function isSecurityEvent(eventType: AuditEventType): boolean {
  return eventType.startsWith('security.') ||
    eventType === 'auth.login_failure' ||
    eventType === 'data.gdpr_erase_request'
}
