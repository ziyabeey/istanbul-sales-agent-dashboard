# W1 — Trust Spine Exact File / Task Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLAN KAPALI — implementation başlamadı  
> **Kaynak:** SÖKÜM 29, 30, 31, 34, 35, 40, 41 + SENTEZ 1–5  
> **Amaç:** User/Membership/Session/RequestContext/Admin Principal/Service Principal trust spine'ını kurmak için current-main dosyalarını exact disposition ve cutover task'larına ayırmak.  
> **Frontend kuralı:** `/giris` UX'i korunur; trust backend rewire edilir.

---

# 1. W1 exit contract

W1 tamamlanmış sayılmak için:

```text
User
Membership
Session
RequestContext
AdminPrincipal
ServicePrincipal
```

tek trust graph içinde doğrulanabilmelidir.

Minimum invariants:

1. Tenant/user identity request body, arbitrary email, raw cookie existence veya shared secret'tan gelmez.
2. Session yalnız imzalı olmakla kalmaz; subject + membership + lifecycle/revocation ile doğrulanır.
3. Dashboard proxy yalnız cookie varlığına bakmaz; verified session/request context kullanır.
4. Admin human auth raw shared `ADMIN_SECRET_TOKEN` değildir.
5. Service/cron/ADK auth human admin auth ile aynı token modelini paylaşmaz.
6. Impersonation dual identity, reason, expiry ve blocked-action policy taşır.
7. Production dev/fixed OTP bypass kalmaz.
8. Logout yalnız cookie delete değil session revoke semantics'i taşır.
9. Auth/security mutation'ları append-only audit correlation üretir.
10. Existing `/giris` frontend flow görsel olarak korunur.

---

# 2. Strong seeds — PRESERVE / ADAPT

## W1-AUTH-001 — Role/permission vocabulary

**Paths**

- `packages/auth/src/types/roles.ts`
- `packages/auth/src/abilities.ts`
- `packages/auth/src/hooks/useAbility.tsx`
- `packages/auth/src/index.ts`

**Current role**

- OWNER / ADMIN / EDITOR / VIEWER vocabulary,
- domain-oriented permissions,
- role -> permission mapping,
- ability rule builder,
- client UI ability consumer.

**Disposition:** `PRESERVE + REWIRE`

**Canonical destination**

```text
Membership.role
Membership permissions / capabilities
RequestContext authorization
```

**Action**

- mevcut permission vocabulary seed olarak korunur,
- `SiteRole` ismi gerekiyorsa tenant/business membership semantiğine genişletilir,
- server-side authorization source canonical Membership olur,
- `useAbility` yalnız UI projection/gating yapar; security boundary olmaz.

**Gate**

- aynı permission hem server command guard hem UI projection tarafından aynı canonical policy'den türetiliyor,
- UI hide/show tek authorization katmanı değil.

---

## W1-SEC-001 — Security primitives

**Paths**

- `packages/security/src/headers.ts`
- `packages/security/src/rateLimit.ts`
- `packages/security/src/tokenTracker.ts`
- `packages/security/src/index.ts`

**Disposition:** `PRESERVE / HARDEN`

**Action**

- security header/rate-limit/token tracking primitive'leri korunur,
- process-local veya best-effort state production authority yapılmaz,
- auth/session rate limits canonical shared store/identity key ile bağlanır.

`promptGuard.ts` ve AI-specific security W8'e aittir; W1 trust authority değildir.

---

# 3. Session authority

## W1-SES-001 — `sessionManager.ts`

**Path**

- `apps/web/src/lib/sessionManager.ts`

**Current strengths**

- signed JWT,
- issuer verification,
- HttpOnly cookie,
- SameSite strict,
- production `SESSION_SECRET` requirement,
- OTP TTL/delete semantics.

**Current limit**

JWT payload yalnız `esnafId` taşır; User, Membership, Session ID, revoke lifecycle veya credential/session inventory yoktur.

**Disposition:** `REWRITE AS CANONICAL SEED`

**Canonical destination**

```text
Session(sessionId, userId, issuedAt, expiresAt, revokedAt, authMethod)
Membership(userId, tenantId, role/status)
RequestContext(userId, tenantId, membershipId, sessionId, capabilities)
```

**Action**

- cookie token subject session/user identity'ye taşınır,
- tenant Membership üzerinden resolve edilir,
- revocation/session inventory eklenir,
- OTP storage/session issuance ayrıştırılır,
- session verify merkezi tek fonksiyona iner.

**Gate**

- deleted/suspended membership eski tokenla erişemiyor,
- revoked session sonraki request'te fail-closed,
- tenant body/header spoof RequestContext'i değiştiremiyor.

---

## W1-SES-002 — Logout

**Path**

- `apps/web/src/app/api/auth/cikis/route.ts`

**Current role:** yalnız cookie'yi temizler.

**Disposition:** `REWIRE`

**Action**

```text
revoke Session
 -> append audit event
 -> clear cookie
```

**Gate:** aynı session token cookie yeniden enjekte edilse bile revoke sonrası kabul edilmez.

---

## W1-SES-003 — Current-user projection

**Path**

- `apps/web/src/app/api/auth/me/route.ts`

**Current issue**

- session -> `esnafId`,
- root `esnaflar` document -> ad/paket/sektor/durum,
- demo branch ayrı truth.

**Disposition:** `REWIRE / PROJECTION`

**Canonical destination**

```text
RequestContext
 + User read model
 + Membership
 + BusinessProfile
 + EffectiveCapabilitySet projection later W2
```

**Gate:** endpoint raw tenant root fields'i auth truth olarak yorumlamıyor.

---

# 4. Human login flows

## W1-LOGIN-001 — Public login UI

**Path**

- `apps/web/src/app/giris/page.tsx`

**Current role**

- phone OTP UX,
- Google Identity button,
- redirect to dashboard/onboarding.

**Disposition:** `PRESERVE UX + REWIRE API`

**Action**

- visual hierarchy/forms/mobile behavior korunur,
- backend responses User/Membership/Session semantics'e geçirilir,
- error/loading states korunur/harden edilir.

**Gate**

- phone + Google happy paths,
- invalid/expired OTP,
- suspended membership,
- onboarding-required identity,
- mobile 360/390 smoke.

---

## W1-LOGIN-002 — Login OTP send

**Path**

- `apps/web/src/app/api/auth/giris-kodu-gonder/route.ts`

**Current role**

- active `esnaflar` phone lookup,
- Firestore OTP rate state,
- NetGSM OTP send.

**Disposition:** `ADAPTER / REWIRE`

**Canonical destination**

```text
normalized phone identity alias
 -> User/AuthIdentity lookup
 -> eligible Membership
 -> OTP challenge
```

**Action**

- `esnaflar.telefonTemiz` primary identity olmaktan çıkar,
- OTP challenge durable/rate-limited auth primitive olur,
- response account enumeration riskine göre normalize edilir,
- provider SMS Integration/Credential spine'a W3'te taşınabilir; W1'de interface ayrılır.

---

## W1-LOGIN-003 — Login OTP verify

**Path**

- `apps/web/src/app/api/auth/giris-kodu-dogrula/route.ts`

**Current role**

- OTP verify,
- phone -> esnaf lookup,
- `esnafId` JWT creation.

**Disposition:** `ADAPTER / REWRITE`

**Canonical destination**

```text
OTP Challenge
 -> User/AuthIdentity
 -> Membership selection/resolution
 -> Session issue
```

**Gate:** duplicate/shared phone edge case explicit policy ile çözülüyor; phone internal primary ID değil.

---

## W1-LOGIN-004 — Google login

**Path**

- `apps/web/src/app/api/auth/google/route.ts`

**Current strengths**

- token validation,
- audience check,
- timeout,
- disabled tenant status check.

**Current issue**

Google email doğrudan `esnaflar.email` ile tenant identity gibi eşlenir.

**Disposition:** `PRESERVE PROVIDER VERIFY + REWIRE IDENTITY`

**Canonical destination**

```text
Google subject/email
 -> AuthIdentity alias
 -> User
 -> Membership(s)
 -> Session
```

**Gate:** provider identity tenant root lookup ile eşitlenmiyor; account linking/audit semantics var.

---

# 5. Onboarding proof flows

## W1-ONB-001 — Onboarding OTP send

**Path**

- `apps/web/src/app/api/auth/onboarding-otp-gonder/route.ts`

**Critical current behavior**

SMS başarısızsa sabit `123456` bypass kodu üretilir.

**Disposition:** `HARD-CUT`

**Action**

- production fixed-code fallback kaldırılır,
- provider failure verification success'e dönüşmez,
- local/test bypass yalnız production artifact dışında veya explicit test harness'ta olabilir,
- OTP challenge purpose=`onboarding_phone_verify` ile login challenge'dan ayrılır.

**Gate:** SMS/provider failure durumunda verification mümkün değildir; production fixed code testleri fail eder.

---

## W1-ONB-002 — Onboarding OTP verify

**Path**

- `apps/web/src/app/api/auth/onboarding-otp-dogrula/route.ts`

**Disposition:** `ADAPTER / REWIRE`

**Canonical destination**

```text
VerificationChallenge
 -> VerifiedContact proof
```

**Important:** başarılı onboarding OTP otomatik olarak full authenticated business Session olmak zorunda değildir. Verification proof ile authenticated User session kavramları ayrılır.

---

# 6. Demo / dev auth

## W1-DEV-001 — `dev-login`

**Path**

- `apps/web/src/app/api/auth/dev-login/route.ts`

**Critical current behavior**

- `ADMIN_SECRET_TOKEN || 'kepenk-admin-2026'`,
- telefonla tenant arar,
- yoksa gerçek `esnaflar` collection'a test tenant yazar,
- production surface üzerinden session üretir.

**Disposition:** `HARD-CUT PRODUCTION / DEV-ONLY REPLACEMENT`

**Action**

- production route artifact'ından çıkar veya fail-closed build/runtime gate,
- hard-coded fallback tamamen kaldırılır,
- dev fixture tenant creation production collection'a yazmaz,
- local/test login explicit development harness olur.

**Dependencies:** W2 tenant fixture strategy.

---

## W1-DEMO-001 — Demo mode

**Paths**

- `apps/web/src/app/api/auth/demo-login/route.ts`
- `apps/web/src/lib/demoMode.ts`

**Current strength**

- default production'da demo disabled,
- safe redirect validation,
- explicit demo identity.

**Disposition:** `PRESERVE PRODUCT DEMO CONCEPT + ISOLATE TRUST`

**Action**

- demo session canonical Session modelde explicit `mode=demo` / non-production-data principal olur,
- demo principal gerçek tenant/customer/payment/provider mutations yapamaz,
- demo fixture business truth production tenant gibi yorumlanmaz.

**Gate:** demo session write capabilities policy ile deny.

---

# 7. Proxy / request gate

## W1-PROXY-001 — Unified proxy

**Path**

- `apps/web/src/proxy.ts`

**PRESERVE**

- subdomain routing intent,
- `edit/app/manage/destek` routing,
- protected marketing/public route behavior.

**REWRITE**

Current dashboard login check:

```text
!!req.auth || !!kepenk_session cookie value
```

Cookie existence verified auth değildir.

Admin branch ayrıca raw `ADMIN_SECRET_TOKEN` equality kullanır.

**Disposition:** `PRESERVE ROUTING + REWRITE TRUST GATES`

**Canonical destination**

```text
verified RequestContext / Session verifier
verified AdminPrincipal
```

**Gate**

- random `kepenk_session=foo` dashboard access vermez,
- expired/revoked session redirect edilir,
- admin session raw secret değil,
- subdomain routing regress etmez.

---

# 8. Parallel auth world consolidation

## W1-NEXTAUTH-001 — `auth.ts`

**Path**

- `apps/web/src/auth.ts`

**Current role**

- NextAuth JWT world,
- Credentials provider,
- `admin_users` Firestore collection,
- role stored in token/session.

**Problem**

Bu dünya custom `kepenk_session` business login ve separate Admin login ile paralel yaşıyor.

**Disposition:** `CONSOLIDATE / REWRITE`

**Decision gate**

Implementation başında teknoloji seçimi tekleştirilir:

```text
one canonical session verifier
one User/Membership graph
separate AdminPrincipal policy
```

NextAuth primitive olarak kalabilir veya custom Session authority altında adapter olabilir; fakat iki session authority eşit yetkide yaşayamaz.

**Hard invariant:** `req.auth OR cookie exists` modeli kapanır.

---

# 9. Admin trust

## W1-ADMIN-001 — Admin login route

**Path**

- `apps/web/src/app/api/admin/login/route.ts`

**Current behavior**

- raw shared admin secret human password,
- process-local rate-limit Map,
- process-local `ADMIN_SESSIONS`,
- HMAC session cookie.

**Disposition:** `HARD-CUT / REWRITE`

**Canonical destination**

```text
AdminPrincipal
AdminSession
MFA / step-up policy
revocation
least privilege
```

**Gate:** no shared raw admin secret human auth; session durable/revocable.

---

## W1-ADMIN-002 — `apiGuard.ts`

**Path**

- `apps/web/src/lib/apiGuard.ts`

**Current role**

- cron shared secret,
- admin header secret,
- ADK bearer token.

**Disposition:** `REWRITE INTO PRINCIPAL-SPECIFIC GUARDS`

Canonical split:

```text
requireAdminPrincipal(capability)
requireServicePrincipal(scope)
requireCronInvocation(scope)
```

Human admin, cron ve ADK aynı generic shared-secret guard altında conceptual olarak birleştirilmez.

---

## W1-ADMIN-003 — Admin client/API auth compatibility

**Affected surface**

- `apps/web/src/app/admin/**`
- `apps/web/src/app/api/admin/**`
- `apps/web/src/proxy.ts`

**Disposition:** `REWIRE`

Admin UI korunur; auth header/raw secret wiring replacement AdminSession'a geçirilir.

W2+ domain mutations ayrıca canonical commands'a taşınacaktır; W1 yalnız verified operator boundary kurar.

---

# 10. Impersonation

## W1-IMP-001 — Runtime impersonation helper

**Path**

- `apps/web/src/lib/impersonation.ts`

**Current strengths**

- signed token,
- dual `adminId + esnafId`,
- explicit impersonating claim,
- expiry.

**Current limits**

- 2 saat,
- reason yok,
- admin authorization helper'ın kendi içinde kanıtlanmıyor,
- blocked-action enforcement contract'a bağlı değil.

**Disposition:** `REWRITE USING ADMIN CONTRACT`

---

## W1-IMP-002 — Impersonation API

**Path**

- `apps/web/src/app/api/admin/impersonate/route.ts`

**Critical current limits**

- raw admin token guard,
- `adminId = 'super_admin'` hard-coded,
- reason yok.

**Disposition:** `HARD-CUT OLD AUTH + REWRITE FLOW`

**Canonical flow**

```text
verified AdminPrincipal
 -> target Membership/User resolve
 -> reason required
 -> policy / optional step-up
 -> <= 1h impersonation session
 -> blocked action policy
 -> append-only AdminActionEvent
```

---

## W1-IMP-003 — Strong contract seed

**Paths**

- `packages/admin/src/types/impersonation.ts`
- `packages/admin/src/types/auditLog.ts`

**Disposition:** `PRESERVE / PROMOTE`

Korunan semantics:

- dual identity,
- reason,
- max 1h intent,
- blocked actions,
- immutable admin audit vocabulary.

Runtime bu contract'a bağlanır.

---

# 11. W1 exact task order

```text
T1  Canonical User/Membership/Session/RequestContext contracts
T2  Session repository + revoke/verify authority
T3  Existing signed-JWT sessionManager adapter
T4  Phone OTP login -> User/Membership adapter
T5  Google identity -> AuthIdentity/User/Membership adapter
T6  onboarding OTP fixed-code HARD-CUT + VerificationChallenge
T7  proxy verified-session gate
T8  logout revoke semantics + /auth/me projection
T9  demo principal isolation
T10 dev-login production hard cut
T11 AdminPrincipal/AdminSession
T12 apiGuard split into human/service/cron principals
T13 admin UI/API auth rewire
T14 impersonation reason/timebox/blocked-action/audit runtime
T15 negative/regression acceptance suite
```

Parallelization:

- T1/T2 prerequisite.
- T4/T5/T6 after auth identity contracts, birbirine paralel olabilir.
- T11–T14 business user login path ile kısmen paralel ilerleyebilir, ortak Session/Audit contract'ı kullanır.
- W2 tenant lifecycle başlamadan Membership-to-tenant contract sabitlenmiş olmalıdır.

---

# 12. W1 acceptance matrix

Minimum acceptance:

| Senaryo | Beklenen |
|---|---|
| Geçerli OTP + active membership | session + verified RequestContext |
| Yanlış/expired OTP | fail closed |
| SMS failure onboarding | fixed fallback yok; verification yok |
| Random `kepenk_session` cookie | dashboard deny |
| Expired JWT | deny |
| Revoked session | deny |
| Suspended membership/tenant | deny veya explicit restricted state |
| Google valid token + linked user | correct User/Membership session |
| Google email tenant root'a rastgele eşleşme | direct tenant auth yok |
| Production dev-login | unavailable/fail closed |
| Demo principal | protected real mutations deny |
| Admin raw shared token | accepted değil |
| Valid AdminSession insufficient capability | deny |
| Impersonation no reason | deny |
| Impersonation blocked billing/delete action | deny + audit |
| Logout ardından old token replay | deny |
| `/giris` mobile/desktop UX | preserved |
| `edit/app/manage` subdomain routing | regression yok |

---

# 13. W1 frontend/public dependency check

Protected:

- `apps/web/src/app/giris/page.tsx` visual UX,
- public landing -> `/giris` link,
- Navbar login CTA,
- onboarding entry UX,
- Kepenk marketing routes.

W1 backend değişiklikleri public landing tasarımına dokunmaz.

---

# 14. W1 cleanup candidates after gate

W1 acceptance tamamlanmadan silinmez.

Gate sonrası:

### HARD-CUT / archive candidates

- production `dev-login` behavior,
- onboarding fixed OTP fallback,
- raw admin-token human auth,
- process-local admin session Map,
- proxy raw admin secret equality,
- cookie-existence-only dashboard trust.

### Compatibility olarak geçici yaşayabilecekler

- `sessionManager.ts` eski function signatures,
- existing OTP route URLs,
- `/api/auth/me` response shape,
- `/giris` frontend callers.

Bunlar canonical trust'a adapter olduktan sonra caller migration boyunca tutulabilir.

---

# 15. W1 final verdict

> **Current Kepenk'te kullanılabilir auth primitive'leri ve iyi bir permission vocabulary var, fakat trust üç parçaya bölünmüş durumda: custom `kepenk_session`, NextAuth/admin_users ve raw-secret Admin. W1'in görevi UI'ları yeniden yapmak değil, bu üç dünyayı User/Membership/Session/AdminPrincipal/RequestContext graph'ında tek verified authority'ye indirmektir.**
