# SÖKÜM 41 - Admin / Super Admin / Platform Control Plane

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Kapsam:** `packages/admin`, `apps/web/src/app/admin`, `apps/web/src/app/api/admin`, `apps/web/src/proxy.ts`, `apps/web/src/lib/apiGuard.ts`, `apps/web/src/lib/impersonation.ts` ve admin yüzeyinden tetiklenen platform operasyonları.  
> **Core baseline:** `docs/sokum/36-canonical-architecture-synthesis.md`

## Executive verdict

Admin yüzeyi current main'de yalnız dekoratif bir panel değildir. Gerçek tenant mutation'ları, paket/kota değişiklikleri, Twilio numara satın alma, impersonation, agent telemetrisi ve global bakım anahtarı gibi yüksek yetkili operasyonlar vardır.

Ancak bu runtime production-grade bir Admin OS değildir. Aynı anda üç farklı admin auth modeli yaşamaktadır:

1. `/api/admin/login` admin secret'ını doğrulayıp HMAC tabanlı process-local bir session token üretir ve `admin_token` cookie'sine koyar,
2. `proxy.ts` `/admin/*` erişiminde cookie değerinin doğrudan `ADMIN_SECRET_TOKEN` ile eşit olmasını bekler,
3. admin API route'larının çoğu `x-admin-token === ADMIN_SECRET_TOKEN` bekler; admin client sayfaları ise header'a hard-coded bir token gömer.

Bu modeller birbirini doğrulamaz. Normal login akışının ürettiği HMAC session token proxy'nin beklediği raw secret değildir. Dolayısıyla panelin kendi login akışı current main'de kendi korumasıyla uyumsuzdur. Ayrıca client bundle'a gömülen admin token yaklaşımı authorization boundary olamaz.

Buna karşılık `packages/admin` içinde doğru tasarım niyetleri vardır:

- immutable admin audit vocabulary,
- dual-identity impersonation,
- impersonation reason + expiry,
- impersonation sırasında bloke edilen hassas aksiyonlar,
- deterministic feature flag evaluation.

Fakat current runtime'da bu package contract'larının canlı admin akışlarına bağlandığı doğrulanmadı.

Bu nedenle karar:

> **KEEP** platform admin/control-plane ürün fikrini, mevcut operator UX'lerini, `packages/admin` audit/impersonation/flag vocabulary'sini, tenant operasyon ekranını, agent/infra/finance read-model yüzeylerini ve provider resource operasyonlarının operator akışını.  
> **REWRITE** admin identity/session/authorization, impersonation runtime'ı, tenant mutation komutları, feature/entitlement wiring, kill-switch semantiği ve provider provisioning authority'sini.  
> **BUILD** least-privilege Admin Principal + RBAC/capability modeli, append-only AdminActionEvent, reason/case binding, step-up/approval politikaları, durable impersonation session, break-glass mekanizması ve cross-domain admin command gateway.  
> **DROP AFTER CUTOVER** shared raw secret authorization'ı, browser bundle'da admin token tutmayı, process-local admin session map'ini, Telegram'ı audit yerine kullanmayı, root tenant doc hard-delete'i ve mock/read-model verisini operational truth saymayı.

Ana invariant:

> **Admin Control Plane başka domain'lerin business truth'unu sahiplenmez. Yetkili insan operatörün doğrulanmış, audit edilebilir ve policy-guarded komutlarını ilgili canonical domain authority'lerine iletir.**

---

## 1. Current-main kanıtı

### 1.1 Admin ayrı bir ürün yüzeyi

`apps/web/src/app/admin` altında:

- Genel Bakış,
- Esnaf Yönetimi,
- Marketing,
- Numara Merkezi,
- Ajan Monitörü,
- Finans & Büyüme,
- Altyapı

sayfaları vardır.

Bu yüzey platform operatörünün tenant dashboard'ından ayrı bir control plane ihtiyacını doğru şekilde yakalamıştır. **KEEP.**

### 1.2 Admin auth modeli birbiriyle çelişiyor

`/api/admin/login`:

- `ADMIN_SECRET_TOKEN` ile timing-safe karşılaştırma yapar,
- HMAC ile yeni bir session token üretir,
- token'ı `admin_token` HttpOnly cookie'sine koyar,
- session'ı process-local `ADMIN_SESSIONS` Map'ine ekler.

Fakat `proxy.ts`:

```text
/admin/*
 -> cookie admin_token
 -> token === ADMIN_SECRET_TOKEN ? allow : /admin/login
```

bekler.

Yani login route'un ürettiği session token proxy tarafından kabul edilmez.

Ayrıca `apiGuard(requireAdminToken)` cookie/session doğrulamaz; `x-admin-token` header'ını raw env secret ile karşılaştırır.

Admin React sayfaları da bu header için hard-coded client token kullanır.

Sonuç:

- server-side session ile API auth aynı sistem değildir,
- browser bundle'daki değer secret sayılamaz,
- login/revocation/audit zinciri tek authority değildir,
- yatay privilege boundary güvenilir değildir.

Bu alan **REWRITE**.

### 1.3 Process-local session durable değildir

`ADMIN_SESSIONS` global process Map'i:

- çok instance Cloud Run ortamında paylaşılmaz,
- deploy/restart ile kaybolur,
- merkezi revoke listesi değildir,
- session inventory/audit sağlamaz.

Üstelik current proxy/API guard bu Map'i doğrulama için kullanmıyor.

### 1.4 Esnaf/Tenant yönetimi gerçek writer

`/api/admin/esnaf` ve `/api/admin/esnaf/[id]`:

- tenant/esnaf oluşturur,
- `durum`, `paket`, `ayarlar`, `twilioNumarasi`, `aktifWebModulleri`, `notlar` gibi alanları patch eder,
- root `esnaflar/{id}` document'ını DELETE ile fiziksel olarak silebilir.

Bu gerçek operational capability'dir; mock değildir.

Fakat authority yanlış katmandadır:

- tenant create/suspend/reactivate -> Tenant Lifecycle,
- paket değişimi -> Billing/Subscription + Entitlement,
- module/capability değişimi -> Entitlement Runtime,
- integration resource binding -> IntegrationConnection,
- deletion/offboarding -> Data Lifecycle + Tenant Lifecycle

komutlarına dönmelidir.

Admin route'un bu business truth'ları doğrudan Firestore field mutation ile sahiplenmesi **DROP/REWRITE**.

### 1.5 Hard delete canonical lifecycle'ı bypass ediyor

DELETE route yalnız root tenant document'ını siler.

Doğrulanan akışta:

- offboarding state machine,
- retention/legal hold,
- subcollection/resource cleanup,
- domain disconnect,
- integration revoke,
- subscription closure,
- async purge job,
- tombstone,
- recovery window

zorunlu değildir.

Bu SÖKÜM 32 Data Lifecycle ve SÖKÜM 34 Tenant Lifecycle invariant'larıyla uyumsuzdur.

Admin'de doğrudan `DeleteTenantRecord` olmamalı; en fazla `RequestTenantOffboarding` / `ApprovePurge` gibi policy-guarded commands olmalıdır.

### 1.6 Paket/kota değişimi entitlement authority'sini bypass ediyor

`/api/admin/kota` şunları yapar:

- kredi hediye,
- paket değiştir,
- hesabı askıya al,
- hesabı aktif et,
- global kill switch.

Capability güçlü ve değerlidir; fakat aynı endpoint birden fazla bounded context'i doğrudan mutate eder.

Canonical karşılık:

```text
GrantUsageCredit -> Usage/Billing authority
ChangeSubscriptionPlan -> Billing/Subscription authority
SuspendTenant / ReactivateTenant -> Tenant Lifecycle
ChangeEntitlements -> Entitlement authority
SetPlatformIncidentMode -> Platform Operations policy
```

### 1.7 Global kill switch intent'i doğru, semantiği eksik

Current route `global_settings/status` document'ına `active|maintenance` yazar ve UI bunu "tüm AI çıkışları donduruldu" olarak sunar.

Fakat bu söküm sırasında bütün AI execution yollarının bu state'i mandatory runtime guard olarak okuduğu doğrulanmadı.

Bu nedenle bir Firestore field'ı tek başına kill switch değildir.

Canonical kill switch:

- scope: global / tenant / capability / provider,
- reason,
- actor,
- incident/case id,
- createdAt / expiresAt,
- version/revision,
- acknowledgement,
- mandatory enforcement point,
- audit event

taşımalıdır.

### 1.8 Agent Monitor read model + emergency control surface

`/admin/ajanlar`:

- `agent_logs` son kayıtlarını okur,
- ajan bazında last-run/success türetir,
- 5 saniyede yeniler,
- bakım anahtarını tetikler.

Bu iyi operator UX seed'idir.

Ancak agent listesi UI'da hard-coded'dur; `agent_logs` operational/audit truth'un tamamı değildir. Canonical telemetry SÖKÜM 31 Observability sınırında kalmalıdır.

Admin burada **projection tüketir**, observability writer olmaz.

### 1.9 `packages/admin` audit contract'ı güçlü ama runtime'a bağlı değil

`packages/admin/src/types/auditLog.ts`:

- immutable admin log niyeti,
- adminId/adminEmail,
- action/category,
- target type/id,
- before/after state,
- severity,
- IP/user-agent,
- timestamp

tanımlar.

Bu vocabulary **KEEP / ADAPT**.

Current admin mutation route'larında ise doğrulanmış append-only `admin_audit_logs` write path görülmedi; durum/paket değişiklikleri Telegram bildirimi yapabiliyor ama Telegram audit ledger değildir.

Repo code-search'te `@kepenk/admin` runtime import'u ve `admin_audit_logs` writer'ı için hit dönmedi; search sonucu incomplete olarak işaretlendiği için mutlak yokluk iddiası yapılmıyor. Bu turda canlı wiring doğrulanamadı.

### 1.10 `packages/admin` impersonation contract'ı runtime'dan daha iyi

Package contract:

- `targetUserId`,
- zorunlu `reason`,
- admin + target dual identity,
- max 1 saat,
- active session,
- blocked actions:
  - password change,
  - account deletion,
  - payment method,
  - ownership transfer,
  - admin creation,
  - billing modification

niyetini taşır.

Live `apps/web/src/lib/impersonation.ts` ise:

- 2 saatlik JWT üretir,
- reason taşımaz,
- `adminId` route içinde `super_admin` sabitidir,
- blocked action enforcement'ı doğrulanmadı,
- fallback development secret içerir.

Bu nedenle **package contract KEEP, live runtime REWRITE**.

### 1.11 Impersonation ayrı audit ve policy ister

`/api/admin/impersonate` admin guard sonrası hedef esnafın varlığını kontrol edip impersonation cookie'si üretir.

Canonical modelde impersonation:

- admin'in kendi kimliğini asla kaybetmez,
- target principal'i ayrı claim olarak taşır,
- reason + support/incident case reference ister,
- kısa TTL kullanır,
- hassas capability'leri default deny yapar,
- her command'da `actingAs` context'i ile audit edilir,
- UI'da kalıcı ve belirgin banner gösterir,
- başlangıç/bitiş event'i üretir.

### 1.12 Feature flag package'ı reusable seed

`packages/admin/src/types/featureFlags.ts`:

- global enabled,
- user IDs,
- plan,
- deterministic percentage rollout,
- country,
- sector

kurallarını destekler.

Evaluator küçük ama değerlidir.

Fakat SÖKÜM 35 sonrası flag ile entitlement aynı authority değildir:

```text
Entitlement = kullanıcı/tenant bu capability'ye sahip mi?
Feature Flag = sahip olduğu capability'nin yeni/runtime varyantı açılıyor mu?
```

Admin flag authoring yapabilir; evaluation canonical Feature/Release Policy runtime'ında olmalıdır.

### 1.13 Numara Merkezi gerçek provider side-effect içeriyor

`/api/admin/numara-havuzu` POST:

- Twilio available number arar,
- numara satın alır,
- webhook config ile provider resource oluşturur,
- Firestore havuzuna kaydeder.

Bu gerçek external side-effect'tir ve değerli capability'dir.

Fakat provider resource lifecycle Admin domain'e ait değildir. SÖKÜM 33 IntegrationConnection / provider provisioning authority'sine gitmelidir.

Ayrıca `twilio-esitle` endpoint'i adına rağmen current code'da Twilio API'ye gitmeyip yalnız Firestore `twilioWebhook` field'ını değiştirir. Local metadata ile provider truth ayrıştırılmalıdır.

### 1.14 Finans ekranı financial truth değildir

`/admin/finans`:

- tenant paketlerinden ARR/MRR türetir,
- önceki aylar için mock trend kullanır.

Bu operator read model olabilir. Finance/Ledger authority olamaz.

MRR/ARR canonical billing/subscription events ve verified revenue modelinden projection olarak gelmelidir.

### 1.15 Altyapı ekranı observability truth değildir

`/admin/altyapi`:

- bazı servisleri mock `online` gösterir,
- Twilio public status endpoint'ini gerçek okur,
- build/deploy bilgilerini gösterir.

UI seed'i **KEEP**, mock operational truth **DROP**.

Health/metrics SÖKÜM 31 Observability projection'larından gelmelidir.

### 1.16 Marketing ekranı yeni admin business domain'i değildir

`/admin/marketing`:

- lead tarama,
- lead status,
- email campaign,
- Google Ads campaign

akışlarını tetikler.

Bunlar SÖKÜM 15-17 / CMO / Campaign / Analytics sınırlarında ele alınmış business capabilities'dir.

Admin yalnız platform operator surface olabilir; Campaign/Lead/Ads truth'unu yeniden sahiplenmez.

---

## 2. Canonical Platform Admin modeli

Admin'i business mega-domain yapmak yerine control plane olarak kur:

```text
Verified Admin Principal
        ↓
Admin Authorization / Step-up Policy
        ↓
Admin Command Gateway
        ↓
+ Tenant Lifecycle
+ Billing / Subscription
+ Entitlement / Feature Policy
+ Integration Provisioning
+ Support
+ Messaging / Campaign
+ Platform Incident Control
        ↓
Domain result
        ↓
Append-only AdminActionEvent
        ↓
Admin read models / audit search
```

### AdminPrincipal

```text
AdminPrincipal
- adminId
- identityProviderSubject
- email
- status
- roles[]
- capabilities[]
- mfaLevel
- sessionId
- sessionIssuedAt
- sessionExpiresAt
```

Shared password/raw secret principal değildir.

### Önerilen role/capability ayrımı

Örnek roller:

- `support_operator`
- `tenant_ops`
- `billing_ops`
- `integration_ops`
- `platform_ops`
- `security_admin`
- `platform_owner`

Role isimleri policy convenience'tır; gerçek enforcement explicit capabilities üzerinden yapılmalıdır.

Örnek capabilities:

```text
tenant.read
tenant.suspend
tenant.reactivate
tenant.offboard.request
entitlement.override
usage.credit.grant
billing.plan.change
integration.resource.provision
integration.resource.reconcile
support.impersonate
platform.incident.activate
platform.incident.resolve
feature_flag.write
admin.audit.read
```

---

## 3. Admin session ve security boundary

Canonical admin auth için invariants:

1. Browser'a hiçbir reusable platform secret gönderilmez.
2. Admin login tek verified identity/session authority'sine gider.
3. Session server-verifiable ve revoke edilebilir olur.
4. MFA/step-up yüksek riskli komutlarda desteklenir.
5. Cookie HttpOnly + Secure + SameSite; mutation route'ları Origin/CSRF guard kullanır.
6. Admin API shared header token ile insan authentication yapmaz.
7. Service-to-service admin automation ayrı service principal kullanır.
8. Session TTL ve idle timeout policy-controlled olur.
9. Credential rotation SÖKÜM 30 ile uyumludur.
10. Her request correlation/request id taşır.

---

## 4. AdminActionEvent append-only olmalı

`packages/admin` vocabulary'sini canonical event'e yükselt:

```text
AdminActionEvent
- eventId
- adminPrincipalId
- actingAsPrincipalId?
- sessionId
- action
- capability
- targetType
- targetId
- tenantId?
- reason
- caseId?
- beforeSnapshotRef?
- afterSnapshotRef?
- requestId
- outcome
- severity
- ip
- userAgent
- occurredAt
```

Kurallar:

- success kadar denied/failed attempt de loglanabilir,
- audit event mutation transaction'ıyla güvenilir şekilde bağlanır,
- Telegram/Slack notification secondary sink olabilir,
- audit kaydı sonradan update/delete edilmez,
- privacy/retention policy SÖKÜM 32'ye bağlanır.

---

## 5. High-risk command policy

Her admin aksiyonu aynı riskte değildir.

### Low risk

- read tenant profile,
- read logs,
- read metrics,
- read support case.

### Elevated

- suspend/reactivate tenant,
- grant credits,
- change entitlement,
- start impersonation,
- provision provider resource.

### Critical / destructive

- billing change,
- ownership transfer,
- purge/offboarding approval,
- platform-wide kill switch,
- security credential action,
- cross-tenant bulk mutation.

Critical actions için policy şu primitive'leri destekleyebilir:

- recent MFA / step-up,
- mandatory reason,
- case/ticket binding,
- four-eyes approval,
- cooldown,
- idempotency key,
- optimistic revision,
- dry-run/preview,
- reversible command preference.

---

## 6. Impersonation canonical contract

`packages/admin` iyi başlangıçtır.

Önerilen flow:

```text
Admin requests impersonation
  -> capability check
  -> reason + case required
  -> target membership/tenant validation
  -> short-lived dual-identity session
  -> IMPERSONATION_STARTED event
  -> UI persistent warning banner
  -> every command receives actingAs context
  -> sensitive action deny-list + capability policy
  -> explicit end / expiry
  -> IMPERSONATION_ENDED event
```

Impersonation target kullanıcının parolasını veya normal session'ını üretmez.

### Invariant

> Impersonation kullanıcı kimliğini çalmaz; admin kimliği korunur ve her action "admin X, user Y adına" olarak attributable kalır.

---

## 7. Tenant operations boundary

Admin UI şu komutların orchestration surface'i olabilir:

```text
CreateTenant
SuspendTenant
ReactivateTenant
RequestTenantOffboarding
CancelTenantOffboarding
ApproveTenantPurge
ChangeSubscriptionPlan
GrantUsageCredit
OverrideEntitlement
ProvisionIntegrationResource
RotateIntegrationResource
```

Ama Admin domain bunların storage truth'unu doğrudan yazmaz.

Özellikle:

- `paket` raw field edit edilmez,
- `aktifWebModulleri` raw array edit edilmez,
- tenant root doc hard-delete edilmez,
- billing state Firestore tenant doc'tan türetilmez.

---

## 8. Feature Flag vs Entitlement

Canonical ayrım:

```text
Subscription / Contract
      ↓
Entitlement Authority
      ↓
Capability available?
      ↓
Feature / Release Policy
      ↓
Which implementation / rollout variant?
```

Admin:

- flag definition/edit yapabilir,
- rollout yüzdesi değiştirebilir,
- tenant/user override isteyebilir.

Runtime evaluation:

- deterministic,
- versioned,
- cache-safe,
- audit edilebilir,
- entitlement'ı bypass etmeyen

bir service/policy katmanında olmalıdır.

---

## 9. Provider resource operations

Numara satın alma gibi akışlar:

```text
Admin command
 -> Integration Provisioning
 -> provider API
 -> provider result
 -> local IntegrationResource projection
 -> audit event
```

Reconciliation iki yönlü truth check yapmalıdır:

- local expected config,
- provider actual config.

`Twilio eşitle` gibi operation isimleri provider'a gerçekten mutation/reconciliation yapmıyorsa kullanılmamalıdır.

---

## 10. Admin UI compositional read model

Admin dashboard farklı bounded context'lerin projection'larını bir araya getirebilir:

- tenant health,
- subscription/ARR/MRR,
- churn/risk,
- support queue,
- integration health,
- agent/automation health,
- incident status,
- campaign/lead ops.

Bu compositional dashboard olması Admin'in bu domain'lere sahip olduğu anlamına gelmez.

### Invariant

> **Admin paneli control surface + read-model composition'dır; platformdaki her collection'ın universal writer'ı değildir.**

---

## 11. Migration / cleanup sequence

### A. Önce güven sınırını düzelt

1. shared admin secret browser flow'unu kaldır,
2. canonical Admin Principal/session kur,
3. proxy + API authorization'ı tek validator'a bağla,
4. hard-coded client admin token'larını kaldır,
5. session revoke/expiry/step-up ekle.

### B. Audit'i zorunlu hale getir

6. `packages/admin` audit contract'ını canonical AdminActionEvent'e adapte et,
7. mutation gateway'de mandatory reason/request id/outcome üret,
8. Telegram'ı notification sink olarak bırak, audit truth sayma.

### C. Cross-domain writers'ı sök

9. tenant create/suspend/reactivate/offboard -> Tenant Lifecycle,
10. package/credit -> Billing/Usage,
11. modules/capabilities -> Entitlement,
12. provider number lifecycle -> Integration Provisioning,
13. kill switch -> Platform Incident Control.

### D. Impersonation'ı güvenli taşı

14. package'daki reason/dual identity/blocked-action semantics'i kullan,
15. TTL'yi kısa ve policy-controlled yap,
16. every-action audit + explicit end/expiry ekle.

### E. Read models'ı gerçek kaynaklara bağla

17. finance mock trend -> billing projection,
18. infra mock status -> observability,
19. agent list/health -> registry + telemetry,
20. marketing/admin shortcuts -> canonical CMO/Campaign commands.

### F. Legacy cleanup

21. `apiGuard(requireAdminToken)` human admin auth kullanımını kaldır,
22. process-local `ADMIN_SESSIONS` kaldır,
23. raw tenant PATCH/DELETE route'larını cutover sonrası kaldır,
24. duplicate/unwired admin package pieces'i canonical package'a konsolide et.

---

## 12. KEEP / REWRITE / BUILD / DROP özeti

### KEEP

- ayrı Super Admin / Platform Ops ürünü,
- Esnaf Yönetimi operator UX'i,
- Ajan Radar UX'i,
- Numara Merkezi operator UX'i,
- Finans/Altyapı compositional dashboard fikri,
- `packages/admin` audit vocabulary,
- `packages/admin` impersonation vocabulary,
- deterministic feature rollout evaluator,
- global emergency-control intent'i.

### REWRITE

- admin login/session/proxy/API guard,
- impersonation runtime,
- tenant mutation APIs,
- package/kota mutation,
- kill switch enforcement,
- provider reconciliation,
- feature flag runtime wiring.

### BUILD

- Admin Principal + RBAC/capability,
- MFA/step-up,
- append-only AdminActionEvent,
- reason/case binding,
- approval/break-glass policy,
- durable/revocable admin sessions,
- cross-domain Admin Command Gateway,
- real operational projections.

### DROP AFTER CUTOVER

- shared raw secret human auth,
- client-bundle admin token,
- process-local session Map,
- direct root tenant hard delete,
- arbitrary raw package/module field mutation,
- Telegram-as-audit,
- mock infra/finance data as truth,
- provider metadata-only operation'ı gerçek reconciliation gibi göstermek.

---

## 13. SÖKÜM 41 kapanış kararı

Admin current repo'da **korunmaya değer güçlü bir operator ürün yüzeyi** ve **iyi fakat büyük ölçüde unwired domain contracts** taşıyor.

En önemli taşınabilir capability tek tek admin ekranları değil, şu platform primitive'idir:

```text
Verified operator
 + least privilege
 + explicit reason
 + optional approval / step-up
 + canonical domain command
 + append-only audit
 + safe impersonation
 + observable outcome
```

Bu primitive Kepenk v2'de tenant support, subscription ops, entitlement override, provider provisioning, incident response ve platform moderation gibi bütün yüksek yetkili işlemlerin ortak omurgası olmalıdır.

### Final invariant

> **Admin yetkisi "her şeyi doğrudan yazabilme" değildir. Admin yetkisi, doğrulanmış operatörün policy dahilinde canonical domain komutlarını çalıştırabilmesi ve bunun eksiksiz audit edilebilmesidir.**

---

## 14. Sonraki adım

SÖKÜM 41 ile Admin frontier'ı kapanmıştır.

Yeni bir `SÖKÜM 42` numarası henüz açılmamalıdır. Önce final inventory sweep yapılmalı:

1. `KEPENK_SOKUM_PLANI.md` 01-24 ile `docs/sokum/25-41` çapraz kontrol edilmeli,
2. `packages/voice`, `studio`, `blog`, `seo`, `influencer` gibi indeksin eski "koruma altında" notlarında kalan paketlerin daha önce gerçekten ele alınıp alınmadığı doğrulanmalı,
3. zaten sökülmüş capability'ler yeniden numaralandırılmamalı,
4. gerçek açık domain yoksa teardown fazı kapatılıp canonical architecture + migration + cleanup backlog sentezine geçilmelidir.

Bu sweep yeni domain sökümü değil, **kapsam bütünlüğü kontrolüdür**.