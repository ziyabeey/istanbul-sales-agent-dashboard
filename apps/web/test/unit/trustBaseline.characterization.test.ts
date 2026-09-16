import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  CURRENT_AUTH_RESPONSE_SHAPES,
  CURRENT_CREDENTIAL_AUTHORITY,
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
  it('pins the current principal/cookie/credential vocabulary after P0-07', () => {
    const sharedSecretIds = CURRENT_SHARED_SECRET_SURFACES.map((surface) => String(surface.id))

    expect(TRUST_BASELINE_VERSION).toBe('p0-07@2026-09-16')
    expect(CURRENT_TRUST_COOKIES).toEqual({
      businessSession: 'kepenk_session',
      adminSession: 'admin_session',
      impersonation: 'kepenk_impersonate',
    })
    expect(CURRENT_PRINCIPAL_SOURCES.dashboard[0]).toContain('durable Session -> User -> Membership')
    expect(CURRENT_PRINCIPAL_SOURCES.businessApi[0]).toContain('apiGuard requireUserSession')
    expect(CURRENT_PRINCIPAL_SOURCES.adminApi[0]).toContain('durable Firestore AdminSession')
    expect(CURRENT_PRINCIPAL_SOURCES.impersonation[0]).toContain('durable Firestore ImpersonationSession')
    expect(CURRENT_PRINCIPAL_SOURCES.impersonation[0]).toContain('active bound AdminSession')
    expect(CURRENT_PRINCIPAL_SOURCES.service[0]).toContain('signed ServicePrincipal')
    expect(CURRENT_CREDENTIAL_AUTHORITY.encryptionWrite).toContain('active kid')
    expect(CURRENT_SHARED_SECRET_SURFACES.find((surface) => surface.id === 'admin-login')?.secret)
      .toBe('ADMIN_LOGIN_SECRET')
    expect(sharedSecretIds).not.toContain('admin-proxy')
    expect(sharedSecretIds).not.toContain('admin-api')
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

  it('P0-03/P0-04: API guard exposes canonical user and service principals without legacy user fallback', () => {
    const source = readSource('src/lib/apiGuard.ts')

    expect(source).toContain('requireUserSession?: boolean')
    expect(source).toContain('requireServicePrincipal?: ServiceRequirement')
    expect(source).toContain('resolveCanonicalBusinessContextFromRequest(request)')
    expect(source).toContain('verifyServiceRequest(request, options.requireServicePrincipal)')
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

  it('P0-04: Cloud Tasks fails closed and carries signed scoped service identity', () => {
    const source = readSource('src/lib/cloudTasksClient.ts')

    expect(source).not.toContain('Executing payload synchronously instead (Fallback mode).')
    expect(source).not.toContain('dev-secret-123')
    expect(source).not.toContain('x-cloud-task-secret')
    expect(source).toContain('insecure direct HTTP fallback is disabled')
    expect(source).toContain('issueServiceToken({')
    expect(source).toContain('Authorization: `Bearer ${serviceToken}`')
    expect(KNOWN_TRUST_RISKS).not.toContain('cloud_tasks_missing_credentials_downgrades_to_direct_http')
    expect(KNOWN_TRUST_RISKS).not.toContain('cloud_task_header_has_dev_secret_fallback')
  })

  it('P0-04: migrated workers require audience and scope before doing work', () => {
    const queue = readSource('src/app/api/cron/kuyruk-isleyici/route.ts')
    const site = readSource('src/app/api/workers/site-ureticisi/route.ts')

    expect(queue).toContain('requireServicePrincipal: {')
    expect(queue).toContain('SERVICE_AUDIENCES.queueProcessor')
    expect(queue).toContain('SERVICE_SCOPES.queueProcess')
    expect(queue).toContain('allowLegacyCronSecret: true')
    expect(site).toContain('requireServicePrincipal: {')
    expect(site).toContain('SERVICE_AUDIENCES.siteGenerator')
    expect(site).toContain('SERVICE_SCOPES.siteGenerate')
  })

  it('P0-04: durable queue uses leases, bounded retry and idempotency keys', () => {
    const source = readSource('src/lib/islemKuyrugu.ts')

    expect(source).toContain('idempotencyKey')
    expect(source).toContain('leaseToken')
    expect(source).toContain('leaseUntil')
    expect(source).toContain('nextRetryAt')
    expect(source).toContain('suresiDolanLeaseKurtar')
    expect(source).toContain('data.denemeSayisi >= data.maxDeneme')
  })

  it('P0-05: credential writes are versioned, kid-bound and never return the legacy format', () => {
    const encryption = readSource('src/lib/tokenSifreleme.ts')

    expect(encryption).toContain("const ENVELOPE_PREFIX = 'kcred.v1.'")
    expect(encryption).toContain('kid,')
    expect(encryption).toContain("alg: ENVELOPE_ALGORITHM")
    expect(encryption).toContain('cipher.setAAD(aadFor(kid))')
    expect(encryption).toContain('return encodeEnvelope({')
    expect(encryption).toContain('decryptLegacyCiphertext')
  })

  it('P0-05: confidential platform resolver never points at NEXT_PUBLIC env', () => {
    const resolver = readSource('src/lib/credentials/credentialResolver.ts')
    const unsplash = readSource('src/lib/unsplashService.ts')

    expect(resolver).toContain("envName.startsWith('NEXT_PUBLIC_')")
    expect(resolver).not.toContain("accessKey: 'NEXT_PUBLIC_UNSPLASH_ACCESS_KEY'")
    expect(unsplash).not.toContain('NEXT_PUBLIC_UNSPLASH_ACCESS_KEY')
    expect(unsplash).toContain('process.env.UNSPLASH_ACCESS_KEY')
  })

  it('P0-05: provider adapters expose credential handles without forcing storage authority', () => {
    const google = readSource('src/lib/googleBusinessClient.ts')
    const meta = readSource('src/lib/metaGraphClient.ts')
    const twilio = readSource('src/lib/twilioClient.ts')

    expect(google).toContain('credential?: ResolvedCredential')
    expect(meta).toContain('credential?: ResolvedCredential')
    expect(twilio).toContain('PLATFORM_CREDENTIAL_REFS.twilio')
    expect(twilio).not.toContain('process.env.TWILIO_AUTH_TOKEN')
  })

  it('KNOWN-RISK: tenant provider tokens remain on legacy tenant root until W3', () => {
    const google = readSource('src/lib/googleBusinessClient.ts')
    const meta = readSource('src/lib/metaGraphClient.ts')

    expect(google).toContain('esnaf?.googleAccessToken')
    expect(meta).toContain('esnaf?.instagramAccessToken')
    expect(KNOWN_TRUST_RISKS).toContain('legacy_tenant_provider_tokens_still_live_on_esnaflar_root_until_w3')
  })

  it('P0-06: admin login, logout, proxy and API converge on durable AdminSession authority', () => {
    const login = readSource('src/app/api/admin/login/route.ts')
    const logout = readSource('src/app/api/admin/logout/route.ts')
    const proxy = readSource('src/proxy.ts')
    const guard = readSource('src/lib/apiGuard.ts')

    expect(login).toContain('const secret = process.env.ADMIN_LOGIN_SECRET')
    expect(login).toContain('crypto.timingSafeEqual')
    expect(login).toContain('issueAdminSession()')
    expect(login).toContain('response.cookies.set(ADMIN_SESSION_COOKIE, token')
    expect(login).not.toContain('crypto.createHmac')
    expect(logout).toContain('await revokeAdminSessionToken(token)')
    expect(proxy).toContain('req.cookies.get(ADMIN_SESSION_COOKIE)?.value')
    expect(proxy).not.toContain('process.env.ADMIN_SECRET_TOKEN')
    expect(guard).toContain('readAdminSessionToken(request)')
    expect(guard).toContain('validateAdminSessionToken(token)')
    expect(guard).not.toContain("request.headers.get('x-admin-token')")
    expect(KNOWN_TRUST_RISKS).not.toContain('admin_login_proxy_api_use_incompatible_authorities')
  })

  it('P0-06: admin proxy fails closed on missing session cookie without shared-secret comparison', () => {
    const proxy = readSource('src/proxy.ts')

    expect(proxy).toContain("if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login'))")
    expect(proxy).toContain('if (!req.cookies.get(ADMIN_SESSION_COOKIE)?.value)')
    expect(proxy).toContain("return NextResponse.redirect(new URL('/admin/login', req.nextUrl))")
    expect(proxy).not.toContain("req.cookies.get('admin_token')")
    expect(proxy).not.toContain('token !== process.env.ADMIN_SECRET_TOKEN')
    expect(CURRENT_PRINCIPAL_SOURCES.adminProxy[0]).toContain('UX-only')
    expect(KNOWN_TRUST_RISKS).not.toContain(
      'admin_proxy_fails_open_when_secret_and_cookie_are_both_absent'
    )
  })

  it('P0-07: impersonation is durable, admin-bound, audited and permanently indicated', () => {
    const impersonation = readSource('src/lib/impersonation.ts')
    const route = readSource('src/app/api/admin/impersonate/route.ts')
    const audit = readSource('src/lib/security/auditLogger.ts')
    const banner = readSource('src/app/dashboard/components/ImpersonationBanner.tsx')

    expect(impersonation).toContain("const IMPERSONATION_COLLECTION = 'auth_impersonation_sessions'")
    expect(impersonation).toContain('export const IMPERSONATION_TTL_SECONDS = 60 * 60')
    expect(impersonation).toContain('getBoundActiveImpersonationFromRequest')
    expect(impersonation).toContain('validateAdminSessionToken(adminToken)')
    expect(impersonation).not.toContain('kepenk-fallback-secret-change-in-prod')
    expect(route).toContain("if (!reason) return NextResponse.json({ error: 'reason zorunlu' }")
    expect(route).toContain("action: 'IMPERSONATION_STARTED'")
    expect(route).toContain("action: 'IMPERSONATION_ENDED'")
    expect(audit).toContain('await strictWrite(requested, writer)')
    expect(audit).toContain('requestId: string')
    expect(banner).toContain('Admin impersonation aktif')
    expect(banner).toContain("fetch('/api/admin/impersonate'")
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

  it('KC-02: Core BFF keeps tokens server-side, cookies host-only and JWT verification mandatory', () => {
    const bff = readSource('src/lib/core/bffSession.ts')
    const context = readSource('src/lib/core/requestContext.ts')
    const otp = readSource('src/app/api/core/auth/otp-dogrula/route.ts')
    const config = readSource('src/lib/core/config.ts')

    expect(bff).toContain('httpOnly: true')
    expect(bff).not.toMatch(/\bdomain:/)
    expect(bff).toContain("sameSite: 'strict'")
    expect(bff).toContain("createCipheriv('aes-256-gcm'")
    expect(context).toContain('deps.verifier.verify(')
    expect(context).toContain('deps.client.listMemberships(')
    expect(context).toContain("if (fresh.claims.sub !== record.userId) return { ok: false, reason: 'SESSION_REVOKED' }")
    // R1 KC-02: explicit session class; missing/empty/unusable amr never becomes a feature session.
    expect(context).toContain('const sessionClass = classifySession(fresh.claims)')
    expect(context).toContain("if (sessionClass === 'unverified') return { ok: false, reason: 'SESSION_CLASS_UNVERIFIED' }")
    expect(context).not.toContain('isRecoverySession(')
    expect(otp).toContain("if (sessionClass === 'unverified')")
    expect(otp).toContain('AUTH_SESSION_CLASS_UNVERIFIED')
    expect(otp).toContain('runtime.verifier.verify(session.access_token)')
    expect(otp).not.toContain('access_token:')
    expect(otp).not.toContain('refresh_token:')
    // Issue #10 migration decision: firebase:<uid> alias only with dual proof of possession, never guessed.
    const firebaseLink = readSource('src/app/api/core/auth/firebase-bagla/route.ts')
    expect(firebaseLink).toContain('requireCoreContext(request, runtime)')
    expect(firebaseLink).toContain('runtime.firebaseIdentity.verifyIdToken(idToken)')
    expect(firebaseLink).toContain('assessFirebaseIdentityLinkability(identity, now)')
    expect(firebaseLink).toContain('linkFirebaseIdentity(runtime.client, { uid: identity.uid, userId: resolved.context.userId })')
    expect(firebaseLink).not.toContain('getUserByEmail')
    expect(firebaseLink).not.toContain('getUserByPhoneNumber')
    const identityAdapter = readSource('src/lib/core/identityAdapter.ts')
    expect(identityAdapter).not.toContain('.collection(')
    expect(identityAdapter).not.toContain('firebaseAdmin')
    expect(identityAdapter).toContain('No UID/user mapping is guessed')
    expect(config).not.toMatch(/env\.NEXT_PUBLIC_|process\.env\.NEXT_PUBLIC_/)
    expect(config).toContain("storageKind: 'env'")
    expect(CURRENT_PRINCIPAL_SOURCES.coreBff[0]).toContain('verified Supabase access JWT')
    expect(CURRENT_PRINCIPAL_SOURCES.coreBff[0]).toContain('browser never sees tokens')
  })

  it('KC-04: the payment callback awaits the durable Core billing outbox and routes by the Core tenant alias', () => {
    const callback = readSource('src/app/api/payment/callback/route.ts')
    const billing = readSource('src/lib/core/billing.ts')
    const hook = readSource('src/lib/core/billingHook.ts')
    expect(callback).toContain('const coreBilling = await recordVerifiedIyzicoPayment({')
    expect(callback).not.toContain('void recordVerifiedIyzicoPayment(')
    expect(callback).toContain("CORE_BILLING_OUTBOX_PERSIST_FAILED")
    expect(hook).toContain('await store.create(newOutboxRecord(event')
    expect(hook).toContain("status: 'persist_failed'")
    expect(billing).toContain('resolveBusinessRouting: (esnafId: string) => Promise<BusinessRouting>')
    expect(billing).toContain("lastError: 'BUSINESS_SHADOW_MISMATCH'")
    expect(billing).toContain("const created = await deps.store.create(fresh)")
  })

  it('KC-05: canary tenants receive commercial state only through the Core projection', () => {
    const scenario = readSource('src/utils/paketSenaryosu.ts')
    const adminPatch = readSource('src/app/api/admin/esnaf/[id]/route.ts')
    const projection = readSource('src/lib/core/projection.ts')
    const entitlementRoute = readSource('src/app/api/admin/core/entitlement/route.ts')

    expect(scenario).toContain('stripLegacyCommercialFields(esnafId, {')
    expect(scenario).not.toMatch(/docRef\.update\(\{\s*durum:/)
    expect(adminPatch).toContain('assertLegacyCommercialWriteAllowed(id, guncellemeler)')
    expect(projection).toContain("legacyDurumForSubscriptionStatus(payload.data.status)")
    expect(projection).not.toContain('has_entitlement')
    expect(entitlementRoute).toContain("command: action === 'grant' ? 'GrantEntitlement' : 'RevokeEntitlement'")
    expect(entitlementRoute).not.toContain('.update(')
  })

  it('KNOWN-RISK: unmigrated cron routes still rely on the shared CRON_SECRET path', () => {
    const source = readSource('src/lib/apiGuard.ts')
    expect(source).toContain('requireCronSecret?: boolean')
    expect(source).toContain("request.headers.get('x-cron-secret')")
    expect(KNOWN_TRUST_RISKS).toContain('unmigrated_cron_routes_still_use_shared_cron_secret')
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
      'esnafId', 'ad', 'paket', 'sektor', 'durum',
    ])
    expect(CURRENT_AUTH_RESPONSE_SHAPES.logoutSuccess.body).toEqual({ ok: true })
  })

  it('keeps only unresolved trust risks in the register', () => {
    expect(KNOWN_TRUST_RISKS).toContain('unmigrated_business_api_callers_can_still_use_legacy_esnafId_jwt_compatibility')
    expect(KNOWN_TRUST_RISKS).toContain('legacy_tenant_provider_tokens_still_live_on_esnaflar_root_until_w3')
    expect(KNOWN_TRUST_RISKS).not.toContain('admin_login_proxy_api_use_incompatible_authorities')
    expect(KNOWN_TRUST_RISKS).not.toContain('admin_proxy_fails_open_when_secret_and_cookie_are_both_absent')
    expect(KNOWN_TRUST_RISKS).toContain('unmigrated_cron_routes_still_use_shared_cron_secret')
    expect(KNOWN_TRUST_RISKS).toContain('privacy_crons_can_report_simulated_success')
    expect(KNOWN_TRUST_RISKS).not.toContain('dashboard_proxy_accepts_business_cookie_by_presence')
    expect(KNOWN_TRUST_RISKS).not.toContain('cloud_tasks_missing_credentials_downgrades_to_direct_http')
  })
})