export const TRUST_BASELINE_VERSION = 'p0-06@2026-09-16'

export const CURRENT_TRUST_COOKIES = {
  businessSession: 'kepenk_session',
  adminSession: 'admin_session',
  impersonation: 'kepenk_impersonate',
} as const

export const CURRENT_AUTH_RESPONSE_SHAPES = {
  loginVerifySuccess: { status: 200, requiredKeys: ['esnafId'] },
  loginVerifyInvalidCode: { status: 400, requiredKeys: ['error'] },
  authMeAuthenticated: {
    status: 200,
    requiredKeys: ['esnafId', 'ad', 'paket', 'sektor', 'durum'],
  },
  authMeDemo: {
    status: 200,
    requiredKeys: ['esnafId', 'isDemo', 'user', 'ad', 'paket', 'sektor', 'durum'],
  },
  authMeUnauthenticated: { status: 401, requiredKeys: ['error'] },
  logoutSuccess: { status: 200, body: { ok: true } },
} as const

export const CURRENT_PRINCIPAL_SOURCES = {
  dashboard: [
    'canonical kepenk_session locator -> durable Session -> User -> Membership -> RequestContext',
  ],
  businessApi: [
    'apiGuard requireUserSession -> canonical Session -> User -> Membership -> RequestContext',
    'unmigrated legacy API callers may still use cryptographically verified esnafId JWT compatibility adapter',
  ],
  adminProxy: [
    'admin_session cookie presence is UX-only; admin API performs authoritative validation',
  ],
  adminApi: [
    'admin_session opaque token -> SHA-256 digest -> durable Firestore AdminSession -> expiry + revocation validation',
  ],
  service: [
    'signed ServicePrincipal bearer -> audience + subject + scope verification',
    'selected worker routes may explicitly accept CRON_SECRET compatibility until P0-08',
  ],
  cron: ['legacy requireCronSecret remains for unmigrated cron routes'],
  adk: ['Authorization bearer == ADK_BEARER_TOKEN'],
  impersonation: ['kepenk_impersonate JWT -> adminId + esnafId'],
} as const

export const CURRENT_CREDENTIAL_AUTHORITY = {
  platform: 'logical CredentialRef -> EnvCredentialResolver -> server-only env',
  tenantEncrypted: 'CredentialRef -> credential_definitions/{id}/versions/{n} -> versioned AES-256-GCM envelope',
  encryptionWrite: 'kcred.v1 envelope -> active kid only',
  legacyDecrypt: 'pre-P0-05 iv:tag:ciphertext -> TOKEN_ENCRYPTION_KEY migration-only',
  legacyTenantCompatibility: 'googleAccessToken / instagramAccessToken on esnaflar root until W3 migration',
} as const

export const CURRENT_SHARED_SECRET_SURFACES = [
  { id: 'admin-login', path: 'src/app/api/admin/login/route.ts', secret: 'ADMIN_LOGIN_SECRET', purpose: 'human admin login credential' },
  { id: 'dev-login', path: 'src/app/api/auth/dev-login/route.ts', secret: 'ADMIN_SECRET_TOKEN', purpose: 'legacy development login compatibility' },
  { id: 'cron-api', path: 'src/lib/apiGuard.ts', secret: 'CRON_SECRET', purpose: 'legacy cron compatibility for routes not yet migrated' },
  { id: 'adk-api', path: 'src/lib/apiGuard.ts', secret: 'ADK_BEARER_TOKEN', purpose: 'ADK service authorization' },
] as const

/** Risks intentionally still unresolved after P0-06. */
export const KNOWN_TRUST_RISKS = [
  'unmigrated_business_api_callers_can_still_use_legacy_esnafId_jwt_compatibility',
  'legacy_tenant_provider_tokens_still_live_on_esnaflar_root_until_w3',
  'onboarding_sms_failure_enables_fixed_123456_code',
  'dev_login_has_hardcoded_admin_secret_fallback',
  'unmigrated_cron_routes_still_use_shared_cron_secret',
  'privacy_crons_can_report_simulated_success',
] as const
