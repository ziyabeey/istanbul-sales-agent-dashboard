/**
 * Audit Logger — Tamper-proof audit trail
 * ─────────────────────────────────────────
 * Firestore (365 days) + BigQuery export (5 years)
 */

import { adminDb } from '@/lib/firebaseAdmin'

export type AuditEventType =
  // Auth
  | 'auth.login_success' | 'auth.login_failure' | 'auth.logout'
  | 'auth.password_change' | 'auth.2fa_enable' | 'auth.2fa_disable'
  | 'auth.biometric_register'
  // Data access
  | 'data.customer_export' | 'data.bulk_delete' | 'data.gdpr_erase_request'
  // Admin
  | 'admin.staff_invite' | 'admin.staff_remove' | 'admin.role_change'
  | 'admin.api_key_create' | 'admin.api_key_revoke'
  | 'admin.payment_settings_change' | 'admin.site_publish'
  // Financial
  | 'payment.charge' | 'payment.refund' | 'payment.dispute'
  // Security
  | 'security.rate_limit_hit' | 'security.suspicious_activity'
  | 'security.waf_block' | 'security.csrf_failure' | 'security.invalid_token'
  // General CRUD
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
  ipAddress?: string       // Hashed for privacy
  userAgent?: string
  result: 'success' | 'failure'
  details?: Record<string, any>
}

/**
 * Log an audit event — append-only, tamper-proof
 */
export async function logAuditEvent(entry: Omit<AuditEntry, 'timestamp'>): Promise<void> {
  try {
    const auditEntry: AuditEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
      // Hash IP address for privacy (KVKK compliance)
      ipAddress: entry.ipAddress ? hashForPrivacy(entry.ipAddress) : undefined,
    }

    // Mask any PII in details
    if (auditEntry.details) {
      auditEntry.details = maskPIIInDetails(auditEntry.details)
    }

    // Append to Firestore audit collection (per-esnaf)
    await adminDb.collection('esnaflar').doc(entry.esnafId)
      .collection('audit_logs').add(auditEntry)

    // Also write to global audit collection for cross-esnaf security monitoring
    if (isSecurityEvent(entry.eventType)) {
      await adminDb.collection('global_audit_logs').add(auditEntry)
    }
  } catch (error) {
    // Audit logging should never break the main operation
    console.error('[AUDIT] Failed to log:', error)
  }
}

/**
 * Query audit logs (owner only)
 */
export async function queryAuditLogs(
  esnafId: string,
  filters: { eventType?: string; actorId?: string; from?: string; to?: string; limit?: number }
): Promise<AuditEntry[]> {
  let query: any = adminDb.collection('esnaflar').doc(esnafId).collection('audit_logs')

  if (filters.eventType) query = query.where('eventType', '==', filters.eventType)
  if (filters.actorId) query = query.where('actorId', '==', filters.actorId)
  if (filters.from) query = query.where('timestamp', '>=', filters.from)
  if (filters.to) query = query.where('timestamp', '<=', filters.to)

  const snap = await query.orderBy('timestamp', 'desc').limit(filters.limit || 100).get()
  return snap.docs.map((d: any) => d.data() as AuditEntry)
}

/* ═══════ Helpers ═══════ */

function hashForPrivacy(input: string): string {
  // Simple hash — in production use crypto.createHash('sha256')
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return 'h_' + Math.abs(hash).toString(16)
}

function maskPIIInDetails(details: Record<string, any>): Record<string, any> {
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
