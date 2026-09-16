import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  CURRENT_AUTH_RESPONSE_SHAPES,
  CURRENT_PRINCIPAL_SOURCES,
  CURRENT_SHARED_SECRET_SURFACES,
  CURRENT_TRUST_COOKIES,
  KNOWN_TRUST_RISKS,
  TRUST_BASELINE_VERSION,
} from '../fixtures/trust-baseline'

const here = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.resolve(here, '../..')

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(appRoot, relativePath), 'utf8')
}

describe('Pilot-0 trust baseline characterization', () => {
  it('pins the current principal/cookie vocabulary after P0-03', () => {
    expect(TRUST_BASELINE_VERSION).toBe('p0-03@2026-09-16')
    expect(CURRENT_TRUST_COOKIES).toEqual({
      businessSession: 'kepenk_session',
      adminSession: 'admin_token',
      impersonation: 'kepenk_impersonate',
    })
    expect(CURRENT_PRINCIPAL_SOURCES.dashboard[0]).toContain('durable Session -> User -> Membership')
    expect(CURRENT_PRINCIPAL_SOURCES.businessApi[0]).toContain('apiGuard requireUserSession')
    expect(CURRENT_SHARED_SECRET_SURFACES.length).toBeGreaterThanOrEqual(6)
  })

  it('P0-03: one canonical business-session resolver owns dashboard and API identity', () => {
    const authority = readSource('src/lib/auth/businessSession.ts')
    const proxy = readSource('src/proxy.ts')
    const guard = readSource('src/lib/apiGuard.ts')
    const session = readSource('src/lib/sessionManager.ts')

    expect(authority).toContain('new SessionVerifier(sessions, users)')
    expect(authority).toContain('new MembershipResolver(memberships)')
    expect(authority).toContain('resolveCanonicalBusinessContext')
    expect(proxy).toContain('resolveCanonicalBusinessContext')
    expect(guard).toContain('resolveCanonicalBusinessContextFromRequest')
    expect(session).toContain('resolveCanonicalBusinessContext')
  })

  it('P0-03: dashboard never treats cookie presence or NextAuth admin session as business login', () => {
    const source = readSource('src/proxy.ts')

    expect(source).not.toContain("!!req.cookies.get('kepenk_session')?.value")
    expect(source).not.toContain('!!req.auth')
    expect(source).not.toContain('import { auth } from')
    expect(source).toContain('if (dashboardTarget && !businessContext)')
    expect(KNOWN_TRUST_RISKS).not.toContain('dashboard_proxy_accepts_business_cookie_by_presence')
  })

  it('P0-03: business subdomain target is authorized before rewrite', () => {
    const source = readSource('src/proxy.ts')
    const guardIndex = source.indexOf('if (dashboardTarget && !businessContext)')
    const rewriteIndex = source.indexOf('return NextResponse.rewrite(url)')

    expect(guardIndex).toBeGreaterThan(-1)
    expect(rewriteIndex).toBeGreaterThan(-1)
    expect(guardIndex).toBeLessThan(rewriteIndex)
    expect(source).toContain("subdomain === 'edit'")
    expect(source).toContain("subdomain === 'app'")
    expect(source).toContain("subdomain === 'manage'")
    expect(source).toContain("subdomain === 'destek'")
  })

  it('P0-03: canonical API guard exposes RequestContext and has no legacy OR fallback', () => {
    const source = readSource('src/lib/apiGuard.ts')

    expect(source).toContain('requireUserSession?: boolean')
    expect(source).toContain('resolveCanonicalBusinessContextFromRequest(request)')
    expect(source).toContain('return context ? { ok: true, context } : { ok: true }')
    expect(source).not.toContain('jwtDogrula')
    expect(source).not.toContain('oturumDogrula')
  })

  it('P0-02 compatibility: canonical human session authority still resolves through durable Membership', () => {
    const source = readSource('src/lib/sessionManager.ts')
    expect(source).toContain('const COOKIE_ADI = BUSINESS_SESSION_COOKIE')
    expect(source).toContain('canonicalRequestContextDogrula')
    expect(source).toContain('resolveCanonicalBusinessContext(token)')
    expect(source).toContain('return context?.tenantId ?? null')
    expect(source).toContain('canonicalOturumOlustur')
  })

  it('KNOWN-RISK: unmigrated API callers may still use verified legacy esnafId JWT compatibility', () => {
    const source = readSource('src/lib/sessionManager.ts')
    expect(source).toContain('return signHs256Jwt({')
    expect(source).toContain('verifyHs256Jwt(token, getSessionSecret()')
    expect(source).toContain('return { esnafId: payload.esnafId }')
    expect(KNOWN_TRUST_RISKS).toContain(
      'unmigrated_business_api_callers_can_still_use_legacy_esnafId_jwt_compatibility'
    )
  })

  it('P0-02: phone login uses unique active-account resolution and canonical issuance', () => {
    const send = readSource('src/app/api/auth/giris-kodu-gonder/route.ts')
    const verify = readSource('src/app/api/auth/giris-kodu-dogrula/route.ts')
    const resolver = readSource('src/lib/auth/legacyAccountResolver.ts')

    expect(resolver).toContain('.limit(2)')
    expect(send).toContain("if (account.kind !== 'unique')")
    expect(send).toContain('return NextResponse.json(GENERIC_SUCCESS)')
    expect(verify).toContain('issueCanonicalHumanSession')
    expect(verify).toContain('canonicalOturumOlustur')
  })

  it('P0-02: Google identity is anchored to verified stable sub, not email identity truth', () => {
    const google = readSource('src/app/api/auth/google/route.ts')

    expect(google).toContain("payload.email_verified !== 'true'")
    expect(google).toContain('GOOGLE_ISSUERS')
    expect(google).toContain('payload.aud !== clientId')
    expect(google).toContain("const googleSubject = (payload.sub || '').trim()")
    expect(google).toContain("provider: 'google'")
    expect(google).toContain('subject: googleSubject')
  })

  it('P0-02: canonical logout performs durable Session revocation before cookie clear', () => {
    const logout = readSource('src/app/api/auth/cikis/route.ts')
    const session = readSource('src/lib/sessionManager.ts')

    expect(logout).toContain('verifyCanonicalSessionToken')
    expect(logout).toContain('new FirestoreSessionRepository().revoke')
    expect(logout).toContain('await oturumSil(response)')
    expect(session).toContain("response.cookies.set(COOKIE_ADI, '',")
    expect(KNOWN_TRUST_RISKS).not.toContain('logout_clears_cookie_without_server_session_revocation')
  })

  it('KNOWN-RISK: admin login, proxy and API still use incompatible trust authorities', () => {
    const login = readSource('src/app/api/admin/login/route.ts')
    const proxy = readSource('src/proxy.ts')
    const guard = readSource('src/lib/apiGuard.ts')

    expect(login).toContain('createHmac')
    expect(login).toContain("cookieStore.set('admin_token', sessionToken")
    expect(proxy).toContain("req.cookies.get('admin_token')?.value")
    expect(proxy).toContain('token !== process.env.ADMIN_SECRET_TOKEN')
    expect(guard).toContain("request.headers.get('x-admin-token')")
    expect(guard).toContain('token !== process.env.ADMIN_SECRET_TOKEN')
  })

  it('KNOWN-RISK: admin proxy fails open if both cookie token and ADMIN_SECRET_TOKEN are absent', () => {
    const proxy = readSource('src/proxy.ts')
    const cookieToken: string | undefined = undefined
    const configuredSecret: string | undefined = undefined

    expect(proxy).toContain("const token = req.cookies.get('admin_token')?.value")
    expect(proxy).toContain('if (token !== process.env.ADMIN_SECRET_TOKEN)')
    expect(cookieToken !== configuredSecret).toBe(false)
    expect(proxy).not.toContain('if (!process.env.ADMIN_SECRET_TOKEN)')
  })

  it('KNOWN-RISK: onboarding SMS failure still enables fixed 123456 verification code', () => {
    const source = readSource('src/app/api/auth/onboarding-otp-gonder/route.ts')
    expect(source).toContain("kod = '123456'")
    expect(source).toContain('if (!smsBasari)')
  })

  it('KNOWN-RISK: dev-login still has a hardcoded secret fallback and may create a real tenant', () => {
    const source = readSource('src/app/api/auth/dev-login/route.ts')
    expect(source).toContain("process.env.ADMIN_SECRET_TOKEN || 'kepenk-admin-2026'")
    expect(source).toContain("adminDb.collection('esnaflar').add")
    expect(source).toContain('await oturumOlustur(esnafId, response)')
  })

  it('KNOWN-RISK: Cloud Tasks still downgrades to direct HTTP and a development secret fallback', () => {
    const source = readSource('src/lib/cloudTasksClient.ts')
    expect(source).toContain('Executing payload synchronously instead (Fallback mode).')
    expect(source).toContain("process.env.CRON_SECRET || 'dev-secret-123'")
  })

  it('KNOWN-RISK: privacy cron endpoints still contain simulated completion counters', () => {
    const dataPurge = readSource('src/app/api/cron/data-purge/route.ts')
    const kvkk = readSource('src/app/api/cron/kvkk/route.ts')

    expect(dataPurge).toContain('const simulatedDeletedAccountsCount = 4')
    expect(dataPurge).toContain('Data Purge Execution Completed successfully.')
    expect(kvkk).toContain('const anonymizedCount = 14')
    expect(kvkk).toContain('const deletedCount = 3')
  })

  it('pins current auth response-shape fixtures for compatibility adapters', () => {
    expect(CURRENT_AUTH_RESPONSE_SHAPES.loginVerifySuccess).toEqual({
      status: 200,
      requiredKeys: ['esnafId'],
    })
    expect(CURRENT_AUTH_RESPONSE_SHAPES.authMeAuthenticated.requiredKeys).toEqual([
      'esnafId',
      'ad',
      'paket',
      'sektor',
      'durum',
    ])
    expect(CURRENT_AUTH_RESPONSE_SHAPES.logoutSuccess.body).toEqual({ ok: true })
  })

  it('keeps only unresolved trust risks in the register', () => {
    expect(KNOWN_TRUST_RISKS).toContain(
      'unmigrated_business_api_callers_can_still_use_legacy_esnafId_jwt_compatibility'
    )
    expect(KNOWN_TRUST_RISKS).toContain('admin_login_proxy_api_use_incompatible_authorities')
    expect(KNOWN_TRUST_RISKS).toContain('admin_proxy_fails_open_when_secret_and_cookie_are_both_absent')
    expect(KNOWN_TRUST_RISKS).toContain('privacy_crons_can_report_simulated_success')
    expect(KNOWN_TRUST_RISKS).not.toContain('dashboard_proxy_accepts_business_cookie_by_presence')
  })
})
