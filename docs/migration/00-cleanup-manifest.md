# Kepenk Migration - Cleanup Manifest v1.2

> **Tarih:** 2026-09-16  
> **Kaynak:** SÖKÜM 25-37 + `docs/sokum/36-canonical-architecture-synthesis.md`  
> **Durum:** AKTİF ENVANTER  
> **Kural:** Bu belge delete emri değildir. Önce replacement/cutover, sonra caller telemetry, en son archive/delete.

## 0. Disposition etiketleri

- **KEEP**: mevcut parça hedef mimaride doğrudan değerlidir.
- **KEEP_ADAPTER**: provider/compatibility adapter olarak tutulur, business authority olamaz.
- **REWRITE_IN_PLACE**: route/library adı kalabilir fakat authority contract'ı değişir.
- **COMPAT_SHELL**: legacy caller'ları geçici olarak canonical authority'ye taşır.
- **DEPRECATE**: canonical replacement sonrası write kapatılır.
- **ARCHIVE_WHEN_ZERO_CALLERS**: telemetry ile caller sıfırlandıktan sonra arşivlenir.
- **DROP_AFTER_CUTOVER**: canonical replacement + rollback gate sonrası silinebilir.
- **DEV_ONLY**: production trust graph'ından çıkarılır.
- **PROTECTED_VERTICAL**: bağımsız ürün/domain değeri taşıyan yüzey; dedicated triage tamamlanmadan archive/delete yasaktır.

---

# 1. Korunacak omurga

| Path / alan | Disposition | Not |
|---|---|---|
| `apps/sites` | KEEP | Public shell; hedef data source DomainBinding -> active publish -> artifact. |
| `apps/web` | KEEP | Product/dashboard/editor shell; rewrite route/domain boundary seviyesinde. |
| `packages/site-schema` | KEEP | Canonical site contract seed'i. |
| `packages/renderer` | KEEP | Typed registry/render primitive. |
| `packages/publish-engine` | KEEP | PublishCommand altında harden edilecek artifact generator. |
| `packages/templates` | KEEP | Theme/template renderer. |
| `packages/cloudflare` | KEEP_ADAPTER | Domain authority değil, provider adapter. |
| `packages/booking-schema` | KEEP | Booking policy semantics; embedded payment state projection'a iner. |
| `packages/ecom-schema` | KEEP | Commerce model yönü; payment truth dışarı alınır. |
| `packages/accounting` | KEEP + REWRITE AUTHORITY | Minor-unit/source links korunur; immutable Finance Ledger canonical olur. |
| CRM v2 service/repository/identity/activity/RFM/Segment DSL | KEEP | Customer Core seed'i. |
| AES-GCM token encryption primitive | KEEP | Credential Authority altında. |
| Cloud Tasks/retry/DLQ primitives | KEEP | Durable Execution altında. |
| Sentry/readiness primitives | KEEP | Telemetry altında. |

---

# 2. P0 - Trust / Tenant / Capability

| Path / alan | Disposition | Replacement / kural |
|---|---|---|
| `api/auth/dev-login` | DEV_ONLY | Production path kapatılır. |
| `api/auth/demo-login` | DEV_ONLY | Isolated demo context dışında tenant/session authority yaratamaz. |
| `lib/sessionManager.ts` | KEEP + REWRITE_IN_PLACE | User/Membership/Tenant/SessionEpoch/lifecycle checks. |
| `api/onboarding/complete` | REWRITE_IN_PLACE / COMPAT_SHELL | CreateBusinessCommand -> BusinessTenant -> OnboardingRun -> ProvisioningRun. |
| `api/onboarding/submit` | REWRITE_IN_PLACE | AI preview success tenant/provisioning success değildir. |
| `api/esnaf/setup-progress` | DROP_AFTER_CUTOVER | Persisted OnboardingRun read model. |
| `api/admin/esnaf/[id]` | REWRITE_IN_PLACE / COMPAT_SHELL | Raw durum/paket/module/provider/delete mutation canonical commands'a ayrılır. |
| `api/esnaf/sync-moduller` | REWRITE_IN_PLACE | Client preference != entitlement. |
| `lib/mvpFeatureFlags.ts` | KEEP | Release/environment flags, commercial entitlement değil. |

---

# 3. P0 - Site / Publish / Domain

| Path / alan | Disposition | Replacement / kural |
|---|---|---|
| `api/site/editor-kaydet` | DEPRECATE -> COMPAT_SHELL -> DROP_AFTER_CUTOVER | Canonical Draft Save. |
| `api/site/publish` | DEPRECATE -> DROP_AFTER_CUTOVER | Canonical PublishCommand. |
| `api/site/v2/save` | REWRITE_IN_PLACE | Schema/hash/revision/server authority. |
| `api/site/v2/publish` | REWRITE_IN_PLACE | Artifact store, hash verify, transaction, active pointer, idempotency. |
| `api/site/versiyonlar` + `lib/siteVersiyonlari.ts` | COMPAT_SHELL / DEPRECATE | Immutable PublishedSiteRevision. |
| `api/domain/sec` | REWRITE_IN_PLACE / COMPAT_SHELL | RequestContext + capability + DomainBinding + durable job. |
| `api/domain/register` | DEPRECATE -> DROP_AFTER_CUTOVER | Duplicate domain writer. |
| Cloudflare registrar/pages/DNS clients | KEEP_ADAPTER | DomainBinding provider adapters. |

---

# 4. P0 - Integration / Webhook

- Google OAuth flow: **KEEP flow + REWRITE connection context**.
- Google provider clients: **KEEP_ADAPTER / CONSOLIDATE**, tenant-root credential lookup kalkar.
- Instagram duplicate webhook routes: **CONSOLIDATE**, canonical verified ingress sonrası duplicate route drop.
- Meta client: **KEEP_ADAPTER**, credential resolution IntegrationConnection üzerinden.
- WhatsApp/Twilio duplicate inbound routes: **CONSOLIDATE**, signature verification + provider-resource-bound tenant resolve + durable inbox.
- Twilio provisioning: **KEEP_ADAPTER + REWRITE resource lifecycle**.

Canonical provider ingress:

```text
verify signature
 -> ProviderResourceBinding
 -> IntegrationConnection + tenant
 -> provider event dedupe
 -> durable Event Inbox
 -> ACK
 -> async process / retry / DLQ
```

---

# 5. P0 - Privacy / Data Lifecycle

`kvkk-purge`, `data-purge`, `kvkk` cron/orchestration yolları canonical Data Lifecycle Orchestrator arkasına alınır. Duplicate orchestration paths deprecate edilir.

Production success yalnız required deletion targets tamamlandığında üretilebilir. Root-document-only ve simulated/no-op purge completion yasaktır.

---

# 6. P1 - CRM / Customer

- `/api/musteriler` legacy family: **COMPAT_SHELL -> ARCHIVE_WHEN_ZERO_CALLERS**.
- `/api/customers` + CRM v2: **KEEP / HARDEN**.
- Mongo + Firestore dual customer authority: **DROP_AFTER_CUTOVER**.

Migration yönü canonical Customer write -> temporary one-way legacy projection. Bidirectional equal authority yok.

---

# 7. P1 - Payment / Finance

- Booking payment fields: **REWRITE AS PROJECTION**.
- Order payment fields: **REWRITE AS PROJECTION**.
- `packages/accounting`: **KEEP semantics + REWRITE authority**.

Authoritative source Payment Core + immutable Finance Ledger olur. Financial migration'da bidirectional dual-write yasaktır.

---

# 8. P1 - Agent / AI

Kernel/config/factory/result-verifier primitive'leri korunur. Duplicate partial runners/model selectors import/caller graph doğrulandıktan sonra deprecate edilir.

```text
Agent Request
 -> Capability Policy
 -> Capability Bus
 -> Model Gateway / Tool
 -> Durable Run
 -> Verified Outcome
 -> Audit
```

---

# 9. P2 - Protected product verticals

Package klasör boyutu ürünün gerçek runtime kapsamını temsil etmeyebilir. Dedicated triage tamamlanmadan hiçbir korunan vertical archive/drop edilmeyecektir.

| Product / package | Status | Şimdiden doğrulanan değer |
|---|---|---|
| `packages/restaurant` + Restaurant web/lib/API | **KEEP FIRST-CLASS VERTICAL / SÖKÜM 37 KAPALI** | Restaurant OS: table/dining-session/adisyon, QR self-order, multiplayer cart, KDS, waiter lifecycle, offline-first POS, staff state/workload/shift, KPI, split-bill, tip/KDV, Menu Vision AI, upsell, İyzico/Paraşüt intent. |
| `packages/marketplace` | **PROTECTED_VERTICAL / SÖKÜM 38 AÇIK** | Job, AI analysis, bid, provider snapshot, credit economy, escrow, commission; `manage/pazaryeri` UI + usta flow. |
| `packages/supply` | **PROTECTED_VERTICAL / TRIAGE PENDING** | Supplier, product, PO, reorder point, supplier scoring, premium supplier marketplace; `manage/tedarik` UI. |
| `packages/support` | **PROTECTED_VERTICAL / TRIAGE PENDING** | Ticket/SLA + knowledge-base/RAG contracts; `manage/destek` UI. |
| `packages/blog` | **PROTECTED_VERTICAL / TRIAGE PENDING** | Blog generation, autopilot, token budget, SEO score; `manage/blog` ve `manage/blog-motoru` UIs. |
| `packages/studio` | **PROTECTED_VERTICAL / TRIAGE PENDING** | Design templates, canvas/export contracts, agency/portfolio; `manage/icerik-studyo` + editor. |
| `packages/voice` | **PROTECTED_VERTICAL / TRIAGE PENDING** | VoiceCommand/VoiceIntent, Deepgram config, sector keyterms; Agent/Messaging/Restaurant extension adayı. |
| `packages/seo` | **PROTECTED_VERTICAL / TRIAGE PENDING** | LocalBusiness JSON-LD, `llms.txt`, AI mention tracking; Publish/Marketing/Analytics extension adayı. |
| `packages/admin` | **KEEP / CONSOLIDATE CONTROL PLANE** | Impersonation, feature flags, audit contracts; SÖKÜM 29/31/35 authority'lerine bağlanır. |
| `packages/influencer` | **PROTECTED_VERTICAL / TRIAGE PENDING** | Dedicated caller/runtime audit tamamlanmadan cleanup yok. |

## Restaurant OS koruma kuralı

Restaurant generic Commerce içine eritilmez.

```text
Restaurant Operations
  RestaurantLocation / Branch
  Table / DiningSession
  Check / Adisyon
  RestaurantOrder
  KitchenTicket / KDS
  WaiterTask
  Employee / Shift
  OperationalNotification
  OfflineReplica / Sync
```

KEEP edilen ürün yönleri:

```text
QR self-order
ON_ORDER payment
split bill / tip / tax
KDS + waiter delivery
staff workload / shift / KPI
offline POS
menu digitization
AI upsell
accounting adapter
```

BUILD edilmesi gereken tamamlayıcı yönler:

```text
PaymentTimingPolicy = ON_ORDER | ON_KITCHEN_START | POSTPAID
KitchenReady -> WaiterTask -> FCM push -> ACK -> Delivered
workload-aware waiter assignment
RestaurantLocation + BranchHealthProjection
regional / roaming-manager exception cockpit
canonical operational KPI projection
```

Restaurant şu core authority'leri tekrar yaratamaz:

```text
Tenant / Identity      -> Control Plane
Menu price authority   -> canonical catalog/policy snapshot
Payment truth          -> Payment Core
Revenue/refund/tip/tax -> Finance Ledger
Public QR trust        -> Public Action Gateway
Provider integrations  -> IntegrationConnection
Async execution        -> Durable Execution
```

Demo UI data cleanup adayı olabilir; Restaurant UX, domain semantics ve operational model cleanup adayı değildir.

## Diğer vertical'lar için karar kuralı

```text
real independent state/lifecycle + runtime
    -> dedicated bounded-context teardown

existing core'a doğal extension
    -> KEEP extension + connect canonical authority

pure dead shell + zero callers
    -> ancak telemetry/caller proof sonrası archive candidate
```

---

# 10. Cleanup uygulama sırası

Her aday için zorunlu sıra:

```text
1. Replacement authority hazır
2. Legacy path telemetry altında
3. Compatibility adapter aktif
4. Legacy write disabled
5. Shadow/parity gate geçti
6. Caller count = 0
7. Secret/permission removed
8. Archive
9. Delete
```

Protected vertical'larda 8-9. adımlar dedicated teardown verdict'i olmadan uygulanmaz.

---

# 11. İlk implementation foundation

Cleanup dosya silerek değil şu sözleşmelerle başlar:

1. `RequestContext`
2. `BusinessTenant`
3. `EffectiveCapabilitySet`
4. `CommandId/EventId/Revision`
5. `AuditContext/TelemetryContext`

Restaurant ve diğer vertical'lar bu ortak omurgayı kullanır, kendilerine özel operasyon state'ini bounded context içinde korur.

---

# 12. Manifest v2 metadata

Her path için zamanla şu alanlar tamamlanacaktır:

```text
path
current callers
current reads/writes
canonical replacement
migration wave
deprecation state
cutover gate
rollback path
owner
```

`apps/randevu-server` kapsam dışıdır.
