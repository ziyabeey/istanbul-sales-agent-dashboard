# Pilot-0 — Trust Bootstrap Ticket / PR Plan

> **Tarih:** 2026-09-16  
> **Durum:** IMPLEMENTATION-READY PLAN — kod implementasyonu başlamadı  
> **Kaynak:** `w01-trust-spine.md`, `w03-durable-execution-credential-integration.md`, `w10-admin-privacy-offboarding-final-cleanup.md`, `pilot-cutover-packaging.md`  
> **Amaç:** Pilot-0 Trust Bootstrap'ı küçük, review edilebilir, geri alınabilir PR paketlerine bölmek.  
> **Kural:** Bu belge production kodu değildir. Her PR bir trust boundary değiştirir; business domain migration'ı Pilot-1 ve sonrasına aittir.

---

# 1. Pilot-0 exit gate

Pilot-0 yalnız aşağıdaki invariants kanıtlandığında kapanır:

```text
User
Membership
Session
RequestContext
AdminPrincipal / AdminSession
ServicePrincipal
CredentialRef / versioned encryption envelope
DurableJob minimum
AdminActionRequested / AdminActionOutcome minimum
```

Security invariants:

1. Random `kepenk_session` cookie dashboard'a erişim vermez.
2. Revoked Session replay edilemez.
3. Suspended/disabled Membership eski geçerli token ile yetki vermez.
4. Request body/query/header tenant authority seçemez.
5. Phone/Google login aynı User/Membership/Session graph'ına iner.
6. Admin raw shared secret normal human authorization değildir.
7. Proxy ve Admin API aynı AdminSession authority'sini doğrular.
8. Cron/worker caller human AdminPrincipal değildir; ServicePrincipal/scope ile doğrulanır.
9. Cloud Task production credential eksikliğinde unauthenticated/direct HTTP downgrade yapmaz.
10. Encryption envelope `kid/version` taşır; key rotation old ciphertext'i okunamaz hale getirmez.
11. High-risk admin command, durable audit request commit edilmeden başlayamaz.
12. Fixed OTP, production dev-login ve fake privacy success geri açılmayan hard-cut'lardır.
13. `/giris` ve Kepenk public frontend görsel UX'i korunur.

---

# 2. Branch / PR graph

Önerilen branch isimleri implementation başladığında kullanılır:

```text
p0/00-trust-baseline
        ↓
p0/01-identity-session-core
        ├───────────────┬─────────────────┐
        ↓               ↓                 ↓
p0/02-human-auth   p0/04-service-jobs  p0/05-credential-envelope
        ↓               │                 │
p0/03-request-gates     └────────┬────────┘
        └───────────────┬────────┘
                        ↓
                 p0/06-admin-session
                        ↓
                 p0/07-admin-audit-impersonation
                        ↓
                 p0/08-hardcuts-canary
```

Notes:

- `P0-04` ve `P0-05`, `P0-01` sonrası paralel geliştirilebilir.
- `P0-03`, `P0-02` session verifier API'si sabitlenmeden merge edilmez.
- `P0-06`, canonical session/principal primitives ve request-gate contract'ı oturmadan merge edilmez.
- `P0-08` bütün predecessor'ların exact-head acceptance'ı geçmeden açılmaz.

---

# 3. PR-00 — Trust Baseline / Evidence Harness

**Branch:** `p0/00-trust-baseline`  
**Risk:** düşük, additive  
**Amaç:** Migration başlamadan current behavior, protected UX ve negatif trust vakaları için tekrar üretilebilir kanıt tabanı oluşturmak.

## Scope

### Existing surfaces to inventory/test

- `apps/web/src/app/giris/page.tsx`
- `apps/web/src/proxy.ts`
- `apps/web/src/lib/sessionManager.ts`
- `apps/web/src/app/api/auth/giris-kodu-gonder/route.ts`
- `apps/web/src/app/api/auth/giris-kodu-dogrula/route.ts`
- `apps/web/src/app/api/auth/google/route.ts`
- `apps/web/src/app/api/auth/cikis/route.ts`
- `apps/web/src/app/api/auth/me/route.ts`
- `apps/web/src/app/api/auth/onboarding-otp-gonder/route.ts`
- `apps/web/src/app/api/auth/onboarding-otp-dogrula/route.ts`
- `apps/web/src/app/api/auth/dev-login/route.ts`
- `apps/web/src/app/api/auth/demo-login/route.ts`
- `apps/web/src/app/api/admin/login/route.ts`
- `apps/web/src/lib/apiGuard.ts`
- `apps/web/src/lib/impersonation.ts`
- `apps/web/src/lib/cloudTasksClient.ts`
- `apps/web/src/lib/islemKuyrugu.ts`
- `apps/web/src/app/api/cron/kuyruk-isleyici/route.ts`
- `apps/web/src/app/api/workers/site-ureticisi/route.ts`
- `apps/web/src/lib/tokenSifreleme.ts`
- `apps/web/src/app/api/cron/data-purge/route.ts`
- `apps/web/src/app/api/cron/kvkk/route.ts`

## Deliverables

- auth/admin/service negative-test inventory,
- protected public/frontend screenshot or browser-smoke baseline,
- current response-shape fixtures for `/api/auth/me`, login verify, logout,
- list of current shared-secret callers,
- list of current Session cookie names and principal sources,
- exact production/dev/demo behavior matrix.

## Forbidden scope

- no canonical writer yet,
- no business schema migration,
- no UI redesign,
- no deletion of legacy path.

## Merge gate

- baseline captures `random cookie`, `revoked/expired`, `dev-login`, fixed OTP, raw admin secret, cron/service auth cases,
- `/giris` desktop + 360/390 mobile baseline recorded,
- `edit/app/manage` routing baseline recorded.

## Rollback

Documentation/test-only or additive harness; safe revert.

---

# 4. PR-01 — Canonical Identity / Membership / Session Core

**Branch:** `p0/01-identity-session-core`  
**Depends on:** PR-00  
**Risk:** medium, additive authority foundation  
**Amaç:** User/Membership/Session/RequestContext contract + durable repository/verifier'ı eklemek, henüz public routing'i değiştirmemek.

## Existing seeds

- `packages/auth/src/types/roles.ts`
- `packages/auth/src/abilities.ts`
- `packages/security/**`
- `apps/web/src/lib/sessionManager.ts`

## Planned target modules

Exact names implementation başında repo conventions'a göre kesinleşebilir; responsibility sabittir:

```text
packages/auth
  canonical User / AuthIdentity / Membership / Session / RequestContext contracts
  role/capability policy seed

apps/web/src/lib/auth/*
  SessionRepository
  SessionVerifier
  MembershipResolver
  RequestContextBuilder
```

## Required semantics

```text
Session
- sessionId
- userId
- issuedAt
- expiresAt
- revokedAt?
- authMethod
- sessionEpoch/version

Membership
- membershipId
- userId
- tenantId
- role/status
- revision
```

RequestContext tenant/business identity yalnız verified Session -> Membership çözümünden gelir.

## Acceptance

- Session revoke sonrası token replay deny,
- expired Session deny,
- disabled Membership deny/restricted policy,
- request body'deki farklı tenant id RequestContext'i değiştiremez,
- permission vocabulary server policy kaynağına bağlanabilir,
- repository multi-instance/durable contract taşır.

## Merge gate

- existing login route'ları henüz bozulmaz,
- new verifier fixture tests geçer,
- User/Membership/Session ID mapping deterministic ve migration-friendly,
- no new business data duplicated into Session.

## Rollback

Additive canonical store/contracts revert edilebilir. Legacy auth hâlâ serving authority olduğu için customer traffic etkilenmemelidir.

---

# 5. PR-02 — Human Auth Adapters / Preserved Login UX

**Branch:** `p0/02-human-auth`  
**Depends on:** PR-01  
**Risk:** medium-high  
**Amaç:** Mevcut phone OTP + Google UX'i bozmadan canonical User/Membership/Session issuance'a geçirmek.

## Existing paths

- `apps/web/src/app/giris/page.tsx` — **PRESERVE UX**
- `apps/web/src/app/api/auth/giris-kodu-gonder/route.ts`
- `apps/web/src/app/api/auth/giris-kodu-dogrula/route.ts`
- `apps/web/src/app/api/auth/google/route.ts`
- `apps/web/src/app/api/auth/cikis/route.ts`
- `apps/web/src/app/api/auth/me/route.ts`
- `apps/web/src/lib/sessionManager.ts`
- `apps/web/src/app/api/auth/demo-login/route.ts`
- `apps/web/src/lib/demoMode.ts`

## Changes by responsibility

```text
phone -> AuthIdentity alias -> User -> Membership -> Session
Google subject/email -> AuthIdentity alias -> User -> Membership -> Session
logout -> Session revoke -> cookie clear
/api/auth/me -> RequestContext + projections
```

Existing route URLs and frontend response compatibility may remain via adapters.

## Explicit exclusions

- `proxy.ts` routing switch belongs PR-03,
- fixed onboarding OTP hard-cut final switch belongs PR-08,
- production dev-login hard-cut final switch belongs PR-08,
- W2 tenant model is not built here.

## Acceptance

- valid phone OTP issues canonical Session,
- valid Google identity issues same Session model,
- account enumeration behavior bounded,
- duplicate/shared phone policy explicit,
- logout revokes server Session, not cookie-only,
- `/api/auth/me` derives tenant from RequestContext,
- demo principal cannot gain real mutation capabilities,
- `/giris` desktop/mobile layout unchanged except required error-state wiring.

## Rollback

Reader/issuer adapter can temporarily route verified legacy login to compatibility Session issuance. Rollback may not restore cookie-only trust or fixed-code bypass.

---

# 6. PR-03 — RequestContext / Proxy / API Gate Convergence

**Branch:** `p0/03-request-gates`  
**Depends on:** PR-02  
**Risk:** high, request authorization path  
**Amaç:** Dashboard ve authenticated API'lerin aynı verified RequestContext'i kullanmasını sağlamak.

## Existing paths

- `apps/web/src/proxy.ts`
- `apps/web/src/auth.ts`
- `apps/web/src/lib/apiGuard.ts` — human/user portion only
- authenticated routes that currently rely on cookie existence / direct tenant IDs, limited to trust adapter changes only.

## Preserve

- subdomain routing:
  - `edit.kepenk.ai`
  - `app.kepenk.ai`
  - `manage.kepenk.ai`
  - `destek.kepenk.ai`
- existing login redirects,
- MVP route gating behavior unless trust requires exact adjustment.

## Required behavior

```text
request
 -> verify Session
 -> resolve Membership
 -> build RequestContext
 -> route/API authorization
```

`!!req.cookies.get('kepenk_session')` never equals logged-in.

## Acceptance

- `kepenk_session=foo` -> dashboard deny,
- expired/revoked Session -> deny/redirect,
- suspended Membership -> deny/restricted path,
- proxy and API produce same principal/tenant identity,
- request body/query cannot tenant-switch,
- `edit/app/manage/destek` routing unchanged,
- existing landing/login navigation unchanged.

## Merge gate

PR cannot merge with an `OR` escape such as:

```text
canonicalVerified || cookieExists
```

Compatibility, gerekiyorsa, must be `canonicalVerified || legacyCryptographicallyVerified` with the same membership/lifecycle checks.

## Rollback

Routing may roll back to a **verified legacy session adapter**, never cookie-existence trust.

---

# 7. PR-04 — ServicePrincipal + DurableJob Trust Bootstrap

**Branch:** `p0/04-service-jobs`  
**Depends on:** PR-01  
**Can develop parallel with:** PR-02/03, PR-05  
**Risk:** high, background execution  
**Amaç:** Cron/worker/task caller'larını human/shared-secret trust'tan ayırmak ve minimal durable job envelope'ı kurmak.

## Existing paths

- `apps/web/src/lib/apiGuard.ts` — service/cron portion
- `apps/web/src/lib/cloudTasksClient.ts`
- `apps/web/src/lib/islemKuyrugu.ts`
- `apps/web/src/app/api/cron/kuyruk-isleyici/route.ts`
- `apps/web/src/app/api/workers/site-ureticisi/route.ts`
- representative `apps/web/src/app/api/cron/**`

## Canonical minimum

```text
ServicePrincipal
TaskInvocation
DurableJob {
  jobId
  type
  payloadRef/envelope
  idempotencyKey
  status
  attempt
  lease/nextAttempt
  causationId/correlationId
}
```

## Required behavior

- short-lived signed/OIDC identity where platform supports it,
- audience + subject + scope validation,
- no direct unauthenticated HTTP fallback,
- queue claim/retry semantics preserved and hardened,
- production missing transport credential -> fail/degraded, not trust downgrade.

## Acceptance

- random internet request cannot run queue worker,
- wrong audience service token deny,
- correct principal wrong scope deny,
- worker retry after crash recoverable,
- duplicate job idempotent where declared,
- Cloud Tasks credential absence does not invoke direct insecure fallback.

## Rollback

During migration only, old `CRON_SECRET` path may remain as an explicitly scoped compatibility verifier for selected jobs. It may never fall back to no-auth or human-admin auth. PR-08 removes normal legacy path.

---

# 8. PR-05 — Credential Envelope / Resolver Minimum

**Branch:** `p0/05-credential-envelope`  
**Depends on:** PR-01  
**Can develop parallel with:** PR-04  
**Risk:** high, secret handling  
**Amaç:** Existing AES-GCM primitive'i versioned CredentialRef/Resolver contract'ına taşımak without provider-domain migration.

## Existing paths

- `apps/web/src/lib/tokenSifreleme.ts`
- `apps/web/src/lib/envReadiness.ts`
- representative provider clients only for adapter seam:
  - `twilioClient.ts`
  - `iyzicoClient.ts`
  - `googleBusinessClient.ts`
  - `metaGraphClient.ts`
  - `telegram.ts`
- confidential public-env fallback surfaces such as `unsplashService.ts`

## Canonical minimum

```text
CredentialRef
CredentialDefinition metadata
CredentialVersion
EncryptionEnvelope { kid, alg, iv, tag, ciphertext }
CredentialResolver
```

Full IntegrationConnection lifecycle remains W3/Pilot-3+.

## Acceptance

- new encryption always writes active `kid`,
- old encrypted value decrypts during rotation window,
- previous key verify/decrypt-only works,
- revoked/retired key behavior explicit,
- provider adapter can accept credential handle without deciding storage authority,
- confidential secret never reads from `NEXT_PUBLIC_*`,
- missing required production credential fails closed.

## Rollback

Envelope reader must remain backward-compatible during migration. New values must never silently downgrade to legacy unversioned encryption after cutover begins.

---

# 9. PR-06 — AdminPrincipal / AdminSession Convergence

**Branch:** `p0/06-admin-session`  
**Depends on:** PR-01 + PR-03  
**Risk:** critical, platform operator access  
**Amaç:** Admin UI'ı koruyup raw shared-secret/process-local session dünyasını canonical AdminPrincipal/AdminSession'a geçirmek.

## Existing paths

- `apps/web/src/app/api/admin/login/route.ts`
- `apps/web/src/proxy.ts` admin branch
- `apps/web/src/lib/apiGuard.ts` admin branch
- `apps/web/src/app/admin/**`
- `apps/web/src/app/api/admin/**` auth adapters
- `packages/admin/src/types/auditLog.ts`
- `packages/admin/src/types/impersonation.ts`

## Canonical minimum

```text
AdminPrincipal
AdminRole / AdminCapability
AdminSession
step-up-ready session metadata
revocation
```

## Required behavior

- login-created AdminSession is exactly what proxy/API verify,
- no `x-admin-token == ADMIN_SECRET_TOKEN` normal path,
- process-local `ADMIN_SESSIONS` is not authority,
- admin session durable/revocable,
- capability check is server-side,
- admin UI layout/pages remain intact.

## Acceptance

- canonical admin login -> admin UI + API succeeds,
- old raw secret header does not authorize canary path,
- random/stale admin cookie deny,
- revoked AdminSession deny,
- insufficient AdminCapability deny,
- two server instances conceptually share same durable session authority.

## Rollback

Before PR-08 hard-cut, operator routing can temporarily return to a server-side legacy compatibility verifier. Browser/client raw secret distribution is never an acceptable rollback mechanism.

---

# 10. PR-07 — Admin Audit + Impersonation Safety

**Branch:** `p0/07-admin-audit-impersonation`  
**Depends on:** PR-06  
**Risk:** critical, privileged actions  
**Amaç:** High-risk operator commands için durable audit request/outcome ve safe impersonation runtime'ını kurmak.

## Existing paths

- `packages/admin/src/types/auditLog.ts`
- `packages/admin/src/types/impersonation.ts`
- `apps/web/src/lib/security/auditLogger.ts`
- `apps/web/src/lib/impersonation.ts`
- `apps/web/src/app/api/admin/impersonate/route.ts`
- representative high-risk admin routes for audit wrapper only, not W2 business rewrite.

## Canonical minimum

```text
AdminActionRequested
AdminActionOutcome
ImpersonationSession
reason
caseId?
actingAdminId
actingAsTargetId?
requestId / correlationId
```

Impersonation:
- reason required,
- max <= 1 hour,
- dual identity preserved,
- permanent UI indicator,
- start/end audit,
- blocked actions default deny.

Blocked minimum:

```text
change_password
delete_account
update_payment_method
transfer_ownership
create_admin
modify_billing
```

## Acceptance

- high-risk action without durable requested-event -> fail closed,
- audit failure cannot silently allow high-risk action,
- impersonation without reason -> deny,
- >1h requested TTL -> deny/clamp by policy,
- blocked action under impersonation -> deny + audit outcome,
- admin identity remains visible in every acting-as request,
- operator exits impersonation and target authority immediately disappears.

## Rollback

Impersonation UI can be disabled as rollback. Once high-risk audit fail-closed is enabled, rollback must not restore unaudited privileged mutation.

---

# 11. PR-08 — Security Hard-Cuts + Canary Acceptance

**Branch:** `p0/08-hardcuts-canary`  
**Depends on:** PR-02, PR-03, PR-04, PR-05, PR-06, PR-07 all merged and accepted  
**Risk:** critical, intentional one-way cut  
**Amaç:** Replacement paths kanıtlandıktan sonra güvenlik açısından geri dönmemesi gereken legacy/bypass yolları kapatmak ve Pilot-0 canary acceptance evidence pack üretmek.

## Exact hard-cut paths

### Fixed onboarding OTP

- `apps/web/src/app/api/auth/onboarding-otp-gonder/route.ts`

Production SMS/provider failure cannot produce fixed `123456` verification path.

### Production dev-login

- `apps/web/src/app/api/auth/dev-login/route.ts`

Production unavailable/fail-closed. Hard-coded fallback secret and production collection fixture creation gone.

### Cookie-existence trust

- `apps/web/src/proxy.ts`

Random `kepenk_session` value is never logged-in.

### Raw admin shared-secret auth

- `apps/web/src/app/api/admin/login/route.ts`
- `apps/web/src/proxy.ts`
- `apps/web/src/lib/apiGuard.ts`
- admin client/API compatibility surfaces

Normal operator path no raw `ADMIN_SECRET_TOKEN`.

### Process-local admin session authority

- process/global `ADMIN_SESSIONS` no longer authorization source.

### Insecure job fallback

- `apps/web/src/lib/cloudTasksClient.ts`
- worker/cron compatibility guards

No `dev-secret-123`, no unauthenticated direct HTTP production fallback.

### Fake privacy completion

- `apps/web/src/app/api/cron/data-purge/route.ts`
- `apps/web/src/app/api/cron/kvkk/route.ts`

Until W10 lifecycle implementation arrives, these routes must be disabled/non-authoritative in production rather than return fake compliance success.

### Confidential public-env fallback

- relevant provider adapters such as `unsplashService.ts`

No confidential `NEXT_PUBLIC_*` secret fallback.

## Canary cohort

Pilot-0 canary should initially contain:

```text
Fixture Tenant
+ one explicit Canary Tenant/User
+ one explicit AdminPrincipal
+ one scoped ServicePrincipal per selected job class
```

No percentage rollout before deterministic allowlist passes.

## Full acceptance evidence

### Human auth

- phone happy path,
- Google happy path,
- invalid OTP,
- expired OTP,
- provider SMS failure,
- revoked session replay,
- expired session,
- suspended Membership,
- tenant spoof attempt,
- logout replay.

### Frontend preservation

- `/giris` desktop,
- 390px,
- 360px,
- keyboard/basic accessibility,
- public landing login CTA,
- no visual redesign regression.

### Proxy/subdomain

- `edit.kepenk.ai`,
- `app.kepenk.ai`,
- `manage.kepenk.ai`,
- `destek.kepenk.ai`,
- unauthorized dashboard redirect,
- random cookie negative case.

### Admin

- login,
- revoke,
- insufficient capability,
- raw secret negative case,
- impersonation reason requirement,
- blocked action,
- audit requested/outcome pairing.

### Service / jobs

- valid service principal,
- wrong issuer,
- wrong audience,
- wrong scope,
- replay/idempotency,
- worker crash/retry,
- missing credential fail-closed.

### Credentials

- active key encrypt,
- previous key decrypt during rotation,
- revoked/retired key behavior,
- no secret in public env/build path.

## Merge gate

PR-08 merge requires:

```text
1. all predecessor exact-head tests green
2. canary browser smoke green
3. negative security matrix green
4. no protected frontend redesign
5. no W2+ business authority accidentally introduced
6. rollback routing documented and exercised where reversible
7. every one-way security hard-cut explicitly acknowledged
8. write/authorization telemetry proves legacy path receives zero intended traffic before deletion/archive
```

## Rollback rule

Security hard-cuts are one-way:

- fixed OTP is not restored,
- production dev-login is not restored,
- raw admin shared-secret normal auth is not restored,
- cookie-existence trust is not restored,
- fake privacy success is not restored,
- unauthenticated/direct task fallback is not restored.

Rollback means disable canonical feature/cohort and route to a **verified compatibility adapter**, never revive an insecure bypass.

---

# 12. PR size / reviewer ownership

Suggested review split:

| PR | Primary review | Secondary review |
|---|---|---|
| P0-00 | Browser/Regression | Security |
| P0-01 | Security/DB | Architecture |
| P0-02 | Security + Browser | Auth UX |
| P0-03 | Security + Browser | Routing/Regression |
| P0-04 | Security + Reliability | Operations |
| P0-05 | Security/Credential | Integration |
| P0-06 | Security | Admin UX |
| P0-07 | Security/Audit | Admin/Support |
| P0-08 | Independent Security acceptance | Independent Browser/Regression acceptance |

No implementer self-approval for P0-08.

---

# 13. Merge discipline

Every implementation PR should include:

```text
Base SHA
Head SHA
Pilot task IDs covered
Changed authority boundary
Migration/backfill impact
Feature/cohort gate
Negative tests added
Rollback instruction
Hard-cut status
Protected frontend impact = NONE / exact rationale
```

PR must not claim completion based only on unit tests if it changes browser/session/proxy/admin flow.

Required sequence per PR:

```text
static/type/unit
 -> repository/integration
 -> negative security
 -> browser/server smoke where applicable
 -> exact-head independent review
```

---

# 14. Pilot-0 definition of done

Pilot-0 is done only when:

```text
human business auth
admin auth
service auth
session revocation
request tenant authority
minimal job identity
credential envelope
high-risk audit
impersonation safety
```

all use canonical trust semantics for the canary, and the legacy insecure bypasses in PR-08 cannot be reached.

Pilot-0 does **not** mean:

- `esnaflar/{id}` has been decomposed,
- booking/payment/CRM migrated,
- admin business mutations canonicalized,
- all provider integrations migrated,
- privacy purge fully implemented.

Those remain Pilot-1+ work.

> **Pilot-0 başarı ölçütü yeni özellik değil, güvenilir kimliktir: aynı request için kim kullanıcı, hangi tenant'a hangi membership ile bağlı, hangi session'dan geldi, hangi capability'ye sahip ve insan mı servis mi olduğu tek doğrulanmış graph'tan cevaplanabiliyorsa bootstrap tamamdır.**
