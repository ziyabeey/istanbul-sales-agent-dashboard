export const TRUST_BASELINE_VERSION = 'p0-00@2026-09-16'

export const CURRENT_TRUST_COOKIES = {
  businessSession: 'kepenk_session',
  adminSession: 'admin_token',
  impersonation: 'kepenk_impersonate',
} as const

export const CURRENT_AUTH_RESPONSE_SHAPES = {
  loginVerifySuccess: {
    status: 200,
    requiredKeys: ['esnafId'],
  },
  loginVerifyInvalidCode: {
    status: 400,
    requiredKeys: ['error'],
  },
  authMeAuthenticated: {
    status: 200,
    requiredKeys: ['esnafId', 'ad', 'paket', 'sektor', 'durum'],
  },
  authMeDemo: {
    status: 200,
    requiredKeys: ['esnafId', 'isDemo', 'user', 'ad', 'paket', 'sektor', 'durum'],
  },
  authMeUnauthenticated: {
    status: 401,
    requiredKeys: ['error'],
  },
  logoutSuccess: {
    status: 200,
    body: { ok: true },
  },
} as const

export const CURRENT_PRINCIPAL_SOURCES = {
  dashboard: ['NextAuth req.auth', 'kepenk_session cookie presence'],
  businessApi: ['kepenk_session JWT -> esnafId'],
  adminProxy: ['admin_token cookie == ADMIN_SECRET_TOKEN', 'fails open if both cookie and secret are absent'],
  adminApi: ['x-admin-token == ADMIN_SECRET_TOKEN'],
  cron: ['x-cron-secret or Authorization bearer == CRON_SECRET'],
  adk: ['Authorization bearer == ADK_BEARER_TOKEN'],
  impersonation: ['kepenk_impersonate JWT -> adminId + esnafId'],
} as const

export const CURRENT_SHARED_SECRET_SURFACES = [
  {
    id: 'admin-login',
    path: 'src/app/api/admin/login/route.ts',
    secret: 'ADMIN_SECRET_TOKEN',
    purpose: 'human admin password',
  },
  {
    id: 'admin-proxy',
    path: 'src/proxy.ts',
    secret: 'ADMIN_SECRET_TOKEN',
    purpose: 'admin page authorization',
  },
  {
    id: 'admin-api',
    path: 'src/lib/apiGuard.ts',
    secret: 'ADMIN_SECRET_TOKEN',
    purpose: 'admin API authorization',
  },
  {
    id: 'cron-api',
    path: 'src/lib/apiGuard.ts',
    secret: 'CRON_SECRET',
    purpose: 'cron/service authorization',
  },
  {
    id: 'adk-api',
    path: 'src/lib/apiGuard.ts',
    secret: 'ADK_BEARER_TOKEN',
    purpose: 'ADK service authorization',
  },
  {
    id: 'cloud-task',
    path: 'src/lib/cloudTasksClient.ts',
    secret: 'CRON_SECRET || dev-secret-123',
    purpose: 'task-to-worker authorization',
  },
] as const

/**
 * These are characterization facts, not approved security behavior.
 * Later Pilot-0 PRs intentionally flip/remove these entries as hard-cuts land.
 */
export const KNOWN_TRUST_RISKS = [
  'dashboard_proxy_accepts_business_cookie_by_presence',
  'admin_login_proxy_api_use_incompatible_authorities',
  'admin_proxy_fails_open_when_secret_and_cookie_are_both_absent',
  'onboarding_sms_failure_enables_fixed_123456_code',
  'dev_login_has_hardcoded_admin_secret_fallback',
  'cloud_tasks_missing_credentials_downgrades_to_direct_http',
  'cloud_task_header_has_dev_secret_fallback',
  'privacy_crons_can_report_simulated_success',
  'logout_clears_cookie_without_server_session_revocation',
] as const
