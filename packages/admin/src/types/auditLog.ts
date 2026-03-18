/**
 * @kepenk/admin — Audit Log Types
 *
 * Every admin action creates an immutable log entry.
 * Firestore: admin_audit_logs/{logId}
 */

export type AuditSeverity = 'info' | 'warning' | 'critical'
export type AuditTargetType = 'user' | 'site' | 'subscription' | 'ticket' | 'feature_flag' | 'system'

export type AuditCategory =
  | 'user_management'
  | 'site_moderation'
  | 'billing'
  | 'impersonation'
  | 'feature_flags'
  | 'support'
  | 'system_config'

export interface AuditLogEntry {
  id: string
  adminId: string
  adminEmail: string
  action: string
  category: AuditCategory
  targetType: AuditTargetType
  targetId: string
  beforeState?: Record<string, unknown>
  afterState?: Record<string, unknown>
  severity: AuditSeverity
  ip: string
  userAgent?: string
  timestamp: string
}

export const SEVERITY_LABELS: Record<AuditSeverity, { label: string; color: string }> = {
  info: { label: 'Bilgi', color: '#3B82F6' },
  warning: { label: 'Uyarı', color: '#F59E0B' },
  critical: { label: 'Kritik', color: '#EF4444' },
}

export const CATEGORY_LABELS: Record<AuditCategory, string> = {
  user_management: 'Kullanıcı Yönetimi',
  site_moderation: 'Site Moderasyon',
  billing: 'Faturalama',
  impersonation: 'Kullanıcı Taklit',
  feature_flags: 'Feature Flags',
  support: 'Destek',
  system_config: 'Sistem Ayarları',
}
