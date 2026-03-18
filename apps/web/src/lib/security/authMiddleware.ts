/**
 * Auth Middleware — RBAC + Tenant Isolation + 2FA Enforcement
 * ────────────────────────────────────────────────────────────
 * Cross-cutting: used by ALL API endpoints
 */

/* ═══════ RBAC Role Definitions ═══════ */

export type UserRole = 'owner' | 'manager' | 'staff'

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  owner: ['*'], // Wildcard — full access
  manager: [
    'orders.*', 'products.*', 'bookings.*',
    'contacts.read', 'inbox.*', 'analytics.read',
    'pos.*', 'loyalty.earn', 'blog.*',
    'campaigns.read', 'campaigns.create',
  ],
  staff: [
    'orders.read', 'orders.update_status',
    'bookings.read', 'bookings.checkin',
    'inbox.read', 'inbox.reply',
    'pos.basic', 'loyalty.earn',
  ],
}

// Operations requiring 2FA regardless of user setting
const SENSITIVE_OPERATIONS = [
  'change_password', 'change_email', 'change_phone',
  'api_key_create', 'staff_invite', 'payment_settings_change',
  'bulk_data_export', 'site_delete',
]

/* ═══════ Permission Checker ═══════ */

export function hasPermission(role: UserRole, requiredPermission: string): boolean {
  const perms = ROLE_PERMISSIONS[role]
  if (!perms) return false
  if (perms.includes('*')) return true

  // Check exact match
  if (perms.includes(requiredPermission)) return true

  // Check wildcard (e.g. 'orders.*' matches 'orders.read')
  const [resource] = requiredPermission.split('.')
  if (perms.includes(`${resource}.*`)) return true

  return false
}

/* ═══════ Tenant Isolation ═══════ */

export function validateTenantAccess(requestEsnafId: string, resourceEsnafId: string): boolean {
  // CRITICAL: Esnaf A can NEVER access Esnaf B's data
  return requestEsnafId === resourceEsnafId
}

/* ═══════ 2FA Check ═══════ */

export function requiresTwoFactor(operation: string): boolean {
  return SENSITIVE_OPERATIONS.includes(operation)
}

/* ═══════ API Key Scope Validation ═══════ */

const API_KEY_SCOPES = [
  'products.read', 'products.write',
  'orders.read', 'orders.write',
  'contacts.read', 'contacts.write',
  'bookings.read', 'bookings.write',
  'campaigns.read', 'campaigns.write',
  'analytics.read',
  'loyalty.read', 'loyalty.write',
  'webhooks.manage',
] as const

export type ApiKeyScope = typeof API_KEY_SCOPES[number]

export function validateApiKeyScope(keyScopes: string[], requiredScope: string): boolean {
  return keyScopes.includes(requiredScope)
}

/* ═══════ Session Validation ═══════ */

export interface SessionConfig {
  maxDuration: number        // ms
  idleTimeout: number        // ms
  maxConcurrent: number
}

export const ESNAF_SESSION: SessionConfig = {
  maxDuration: 12 * 60 * 60 * 1000,  // 12 hours
  idleTimeout: 30 * 60 * 1000,       // 30 minutes
  maxConcurrent: 3,
}

export const CUSTOMER_SESSION: SessionConfig = {
  maxDuration: 30 * 24 * 60 * 60 * 1000,  // 30 days
  idleTimeout: 7 * 24 * 60 * 60 * 1000,   // 7 days
  maxConcurrent: 5,
}

export function isSessionExpired(createdAt: string, lastActivity: string, config: SessionConfig): boolean {
  const now = Date.now()
  const created = new Date(createdAt).getTime()
  const lastActive = new Date(lastActivity).getTime()

  if (now - created > config.maxDuration) return true
  if (now - lastActive > config.idleTimeout) return true
  return false
}

/* ═══════ Password Policy ═══════ */

const COMMON_PASSWORDS = [
  '123456', 'password', '12345678', 'qwerty', 'abc123', 'monkey', 'letmein',
  '111111', 'admin', 'iloveyou', '1234567890', 'sifre123', 'turkiye',
]

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 10) errors.push('Şifre en az 10 karakter olmalı')
  if (password.length > 128) errors.push('Şifre en fazla 128 karakter olabilir')
  if (!/[A-Z]/.test(password)) errors.push('En az 1 büyük harf gerekli')
  if (!/[a-z]/.test(password)) errors.push('En az 1 küçük harf gerekli')
  if (!/\d/.test(password)) errors.push('En az 1 rakam gerekli')
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) errors.push('Bu şifre çok yaygın, farklı bir şifre seçin')

  return { valid: errors.length === 0, errors }
}

/* ═══════ Progressive Lockout ═══════ */

export function getLockoutDuration(failedAttempts: number): number {
  if (failedAttempts >= 15) return 24 * 60 * 60 * 1000  // 24 hours
  if (failedAttempts >= 10) return 60 * 60 * 1000        // 1 hour
  if (failedAttempts >= 5) return 15 * 60 * 1000         // 15 minutes
  return 0
}
