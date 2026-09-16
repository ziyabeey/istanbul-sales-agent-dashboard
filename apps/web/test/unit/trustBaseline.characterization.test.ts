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

describe('P0-00 trust baseline characterization', () => {
  it('pins the baseline version and current principal/cookie vocabulary', () => {
    expect(TRUST_BASELINE_VERSION).toBe('p0-00@2026-09-16')
    expect(CURRENT_TRUST_COOKIES).toEqual({
      businessSession: 'kepenk_session',
      adminSession: 'admin_token',
      impersonation: 'kepenk_impersonate',
    })
    expect(CURRENT_PRINCIPAL_SOURCES.dashboard).toContain('kepenk_session cookie presence')
    expect(CURRENT_SHARED_SECRET_SURFACES.length).toBeGreaterThanOrEqual(6)
  })

  it('KNOWN-RISK: business session JWT currently carries esnafId as authority payload', () => {
    const source = readSource('src/lib/sessionManager.ts')
    expect(source).toContain("const COOKIE_ADI = 'kepenk_session'")
    expect(source).toContain('new SignJWT({ esnafId })')
    expect(source).toContain('return payload?.esnafId ?? null')
  })

  it('KNOWN-RISK: dashboard proxy currently treats kepenk_session cookie presence as logged in', () => {
    const source = readSource('src/proxy.ts')
    expect(source).toContain("!!req.cookies.get('kepenk_session')?.value")
    expect(source).toContain('if (pathname.startsWith("/dashboard"))')
  })

  it('records edit/app/manage/destek subdomain routing as a protected baseline', () => {
    const source = readSource('src/proxy.ts')
    expect(source).toContain("subdomain === 'edit'")
    expect(source).toContain("subdomain === 'app'")
    expect(source).toContain("subdomain === 'manage'")
    expect(source).toContain("subdomain === 'destek'")
  })

  it('KNOWN-RISK: admin login, proxy and API currently use incompatible trust authorities', () => {
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

  it('KNOWN-RISK: onboarding SMS failure currently enables fixed 123456 verification code', () => {
    const source = readSource('src/app/api/auth/onboarding-otp-gonder/route.ts')
    expect(source).toContain("kod = '123456'")
    expect(source).toContain('if (!smsBasari)')
  })

  it('KNOWN-RISK: dev-login currently has a hardcoded secret fallback and may create a real tenant', () => {
    const source = readSource('src/app/api/auth/dev-login/route.ts')
    expect(source).toContain("process.env.ADMIN_SECRET_TOKEN || 'kepenk-admin-2026'")
    expect(source).toContain("adminDb.collection('esnaflar').add")
    expect(source).toContain('await oturumOlustur(esnafId, response)')
  })

  it('KNOWN-RISK: Cloud Tasks currently downgrades to direct HTTP and a development secret fallback', () => {
    const source = readSource('src/lib/cloudTasksClient.ts')
    expect(source).toContain('Executing payload synchronously instead (Fallback mode).')
    expect(source).toContain("process.env.CRON_SECRET || 'dev-secret-123'")
  })

  it('KNOWN-RISK: privacy cron endpoints currently contain simulated completion counters', () => {
    const dataPurge = readSource('src/app/api/cron/data-purge/route.ts')
    const kvkk = readSource('src/app/api/cron/kvkk/route.ts')

    expect(dataPurge).toContain('const simulatedDeletedAccountsCount = 4')
    expect(dataPurge).toContain('Data Purge Execution Completed successfully.')
    expect(kvkk).toContain('const anonymizedCount = 14')
    expect(kvkk).toContain('const deletedCount = 3')
  })

  it('KNOWN-RISK: logout currently clears the cookie without a durable server-side revocation step', () => {
    const logout = readSource('src/app/api/auth/cikis/route.ts')
    const session = readSource('src/lib/sessionManager.ts')

    expect(logout).toContain('await oturumSil(response)')
    expect(session).toContain("response.cookies.set(COOKIE_ADI, '',")
    expect(session).not.toContain('revokedAt')
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

  it('keeps the known-risk register explicit rather than silently normalizing insecure behavior', () => {
    expect(KNOWN_TRUST_RISKS).toContain('dashboard_proxy_accepts_business_cookie_by_presence')
    expect(KNOWN_TRUST_RISKS).toContain('admin_login_proxy_api_use_incompatible_authorities')
    expect(KNOWN_TRUST_RISKS).toContain('admin_proxy_fails_open_when_secret_and_cookie_are_both_absent')
    expect(KNOWN_TRUST_RISKS).toContain('privacy_crons_can_report_simulated_success')
  })
})
