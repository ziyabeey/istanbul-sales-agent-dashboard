# Kepenk Migration - Cleanup Manifest v1

> **Tarih:** 2026-09-16  
> **Kaynak:** `docs/sokum/36-canonical-architecture-synthesis.md` + SÖKÜM 25-35 repo doğrulamaları  
> **Durum:** AKTİF ENVANTER  
> **Kural:** Bu belge **delete emri değildir**. Önce replacement/cutover, sonra caller telemetry, en son archive/delete.

## 0. Disposition etiketleri

- **KEEP**: mevcut parça hedef mimaride doğrudan değerlidir.
- **KEEP_ADAPTER**: provider/compatibility adapter olarak tutulur, business authority olamaz.
- **REWRITE_IN_PLACE**: route/library adı kalabilir fakat authority contract'ı değişir.
- **COMPAT_SHELL**: geçici olarak legacy caller'ları canonical authority'ye taşır.
- **DEPRECATE**: canonical replacement sonrası write kapatılacak.
- **ARCHIVE_WHEN_ZERO_CALLERS**: telemetry ile caller sıfırlandıktan sonra arşivlenir.
- **DROP_AFTER_CUTOVER**: canonical replacement + rollback gate sonrası silinebilir.
- **DEV_ONLY**: production trust graph'ından çıkarılır, gerekiyorsa yalnız local/test ortamında kalır.

---

# 1. Korunacak omurga - erken temizlenmeyecek

| Path / alan | Disposition | Not |
|---|---|---|
| `apps/sites` | KEEP | Public shell korunur; data source DomainBinding -> active publish -> artifact olur. |
| `apps/web` | KEEP | Product/dashboard/editor shell korunur; rewrite route/domain boundary seviyesinde yapılır. |
| `packages/site-schema` | KEEP | Canonical site contract için güçlü primitive. |
| `packages/renderer` | KEEP | Typed registry/render primitive. |
| `packages/publish-engine` | KEEP | PublishCommand altında harden edilecek artifact generator. |
| `packages/templates` | KEEP | Theme/template renderer değeri korunur. |
| `packages/cloudflare` | KEEP_ADAPTER | Domain authority değil; DomainBinding provisioning adapter'ı. |
| `packages/booking-schema` | KEEP | Booking policy semantics korunur; embedded payment authority projection'a iner. |
| `packages/ecom-schema` | KEEP | Commerce model yönü korunur; payment truth dışarı alınır. |
| `packages/accounting` | KEEP + REWRITE AUTHORITY | Minor-unit/source links korunur; immutable Finance Ledger canonical olur. |
| CRM v2 service/repository/identity/activity/RFM/Segment DSL | KEEP | Customer Core seed'i. |
| AES-GCM token encryption primitive | KEEP | Credential Authority altında. |
| Cloud Tasks/retry/DLQ primitive'leri | KEEP | Durable Execution altında. |
| Sentry/readiness primitive'leri | KEEP | Telemetry altında. |

Bu parçalar cleanup'ın ilk dalgasında silinmeyecek veya isim uğruna yeniden yazılmayacaktır.

---

# 2. P0 - Trust / Tenant / Capability authority temizliği

## `apps/web/src/app/api/auth/dev-login/route.ts`

**Disposition:** DEV_ONLY -> DROP production path.

Replacement gate:
- User/Membership/Session/RequestContext production auth graph,
- test/dev environment guard,
- production route unreachable.

## `apps/web/src/app/api/auth/demo-login/route.ts`

**Disposition:** DEV_ONLY / demo surface.

Demo identity production tenant/session authority yaratamaz. Demo gerekiyorsa explicit isolated demo tenant/context kullanır.

## `apps/web/src/lib/sessionManager.ts`

**Disposition:** KEEP primitive + REWRITE_IN_PLACE.

Korunacak:
- HttpOnly JWT intent,
- fail-closed production secret davranışı.

Eklenecek:
- userId/membershipId/tenantId,
- sessionEpoch/lifecycle checks,
- suspension/revocation propagation.

## `apps/web/src/app/api/onboarding/complete/route.ts`

**Disposition:** REWRITE_IN_PLACE / COMPAT_SHELL.

Bugünkü raw root creation yerine:

```text
CreateBusinessCommand
  -> BusinessTenant
  -> OnboardingRun
  -> ProvisioningRun
```

Session ancak canonical tenant/session authority üzerinden açılır.

## `apps/web/src/app/api/onboarding/submit/route.ts`

**Disposition:** REWRITE_IN_PLACE veya UI-preview-only olarak daralt.

AI preview success tenant creation/provisioning success anlamına gelmeyecek.

## `apps/web/src/app/api/esnaf/setup-progress/route.ts`

**Disposition:** DROP_AFTER_CUTOVER.

Sebep:
- in-memory state,
- hard-coded `demo-esnaf`,
- production onboarding truth olamaz.

Replacement: persisted `OnboardingRun` read model.

## `apps/web/src/app/api/admin/esnaf/[id]/route.ts`

**Disposition:** REWRITE_IN_PLACE -> COMPAT_SHELL.

Raw:
- `durum`,
- `paket`,
- module/settings,
- provider resource,
- root DELETE

mutation'ları ayrı canonical commands'a ayrılır.

DELETE tenant offboarding completion sayılmaz.

## `apps/web/src/app/api/esnaf/sync-moduller/route.ts`

**Disposition:** REWRITE_IN_PLACE.

Client yalnız feature preference gönderebilir. Effective capability server-side entitlement intersection ile hesaplanır.

## `apps/web/src/lib/mvpFeatureFlags.ts`

**Disposition:** KEEP.

Ancak yalnız release/environment flag authority. Commercial entitlement değildir.

---

# 3. P0 - Site / publish / domain duplicate authority

## `apps/web/src/app/api/site/editor-kaydet/route.ts`

**Disposition:** DEPRECATE -> COMPAT_SHELL -> DROP_AFTER_CUTOVER.

Sebep: draft save ile published mutable state'in karışabilmesi.

Replacement: canonical Draft Save Command.

## `apps/web/src/app/api/site/publish/route.ts`

**Disposition:** DEPRECATE -> DROP_AFTER_CUTOVER.

Replacement: canonical PublishCommand.

## `apps/web/src/app/api/site/v2/save/route.ts`

**Disposition:** REWRITE_IN_PLACE.

En uygun canonical Draft Save seed'lerinden biri. Schema/hash/revision/server authority eklenecek.

## `apps/web/src/app/api/site/v2/publish/route.ts`

**Disposition:** REWRITE_IN_PLACE.

En uygun canonical PublishCommand seed'i. Artifact store, hash verification, transaction/active pointer/idempotency ile tamamlanır.

## `apps/web/src/app/api/site/versiyonlar/route.ts`
## `apps/web/src/lib/siteVersiyonlari.ts`

**Disposition:** COMPAT_SHELL / DEPRECATE.

Replacement: immutable `PublishedSiteRevision` history + pointer rollback.

## `apps/web/src/app/api/domain/sec/route.ts`

**Disposition:** REWRITE_IN_PLACE / COMPAT_SHELL.

Body tenant authority, package-string authorization ve fire-and-forget provisioning kalkar.

Replacement:
- RequestContext,
- `domain.gift.claim` capability decision,
- DomainBinding command,
- durable provisioning job.

## `apps/web/src/app/api/domain/register/route.ts`

**Disposition:** DEPRECATE -> DROP_AFTER_CUTOVER.

Sebep: ikinci domain writer authority.

## `apps/web/src/lib/cloudflareRegistrar.ts`
## `apps/web/src/lib/cloudflarePagesClient.ts`
## `packages/cloudflare/*`

**Disposition:** KEEP_ADAPTER, sonra konsolide provider contract.

Provider state DomainBinding truth değildir.

---

# 4. P0 - Integration / webhook duplicate authority

## Google OAuth

### `apps/web/src/app/api/auth/google/init/route.ts`
**Disposition:** KEEP flow + REWRITE connection context.

### `apps/web/src/app/api/auth/google/callback/route.ts`
**Disposition:** REWRITE_IN_PLACE.

Token material generic tenant root/business fields yerine Credential Authority + `IntegrationConnection` ile bağlanır.

### `apps/web/src/lib/googleBusinessClient.ts`
### `apps/web/src/lib/gmbClient.ts`
**Disposition:** KEEP_ADAPTER / CONSOLIDATE.

Runtime credential lookup doğrudan tenant root field'larından yapılmayacak.

## Instagram

### `apps/web/src/app/api/instagram/webhook/route.ts`
### `apps/web/src/app/api/instagram/dm-webhook/route.ts`

**Disposition:** CONSOLIDATE; biri canonical ingress olduktan sonra diğeri DROP_AFTER_CUTOVER.

Canonical ingress:

```text
signature verify
 -> resource binding
 -> IntegrationConnection
 -> provider event dedupe
 -> durable inbox
 -> ACK
```

### `apps/web/src/lib/metaGraphClient.ts`

**Disposition:** KEEP_ADAPTER + REWRITE credential resolution.

Tenant-root access token authority kalkar.

## WhatsApp / Twilio

### `apps/web/src/app/api/whatsapp/route.ts`
### `apps/web/src/app/api/wa/musteri-mesaji/route.ts`

**Disposition:** CONSOLIDATE; canonical destination/provider-resource-bound webhook seçilir, diğeri compatibility sonrası drop.

Zorunlu:
- Twilio signature verification,
- destination resource -> tenant resolve,
- provider MessageSid/event idempotency,
- durable inbox.

### `apps/web/src/lib/twilioProvisioning.ts`

**Disposition:** KEEP_ADAPTER + REWRITE resource lifecycle.

`twilioNumarasi` root-field truth yerine ProviderResourceBinding.

---

# 5. P0 - Privacy / lifecycle fake completion paths

## `apps/web/src/app/api/cron/kvkk-purge/route.ts`
## `apps/web/src/app/api/cron/data-purge/route.ts`
## `apps/web/src/app/api/cron/kvkk/route.ts`

**Disposition:** REWRITE behind Data Lifecycle Orchestrator; duplicate orchestration paths DEPRECATE.

Production success yalnız required targets tamamlandıktan sonra üretilebilir.

Root-document-only veya simulated/no-op purge completion yasak.

---

# 6. P1 - CRM / Customer compatibility

## `/api/musteriler` legacy family

**Disposition:** COMPAT_SHELL -> ARCHIVE_WHEN_ZERO_CALLERS.

Canonical backend CRM v2 Customer Core olur.

## `/api/customers` + CRM v2 services

**Disposition:** KEEP / HARDEN.

Gerekenler:
- tek identity resolver,
- merge revision correctness,
- one activity authority,
- consent linkage,
- tenant-safe validation.

## Legacy Mongo + Firestore dual authority

**Disposition:** DROP_AFTER_CUTOVER.

Migration kuralı: canonical Customer write -> temporary legacy projection. Bidirectional equal authority yok.

---

# 7. P1 - Payment / finance embedded truth

## Booking payment fields

**Disposition:** REWRITE AS PROJECTION.

Authoritative source Payment Core + Finance Ledger.

## Order payment fields

**Disposition:** REWRITE AS PROJECTION.

Authoritative source Payment Core + Finance Ledger.

## `packages/accounting`

**Disposition:** KEEP semantics, REWRITE authority.

- minor-unit direction korunur,
- booking/order source linkage korunur,
- mutable Transaction financial truth olmaktan çıkar,
- immutable ledger + read projections kurulur.

Financial migration'da bidirectional dual-write kesinlikle yapılmaz.

---

# 8. P1 - Agent / AI duplicate runtime cleanup

Verified historical/runtime cluster:

- kernel/config/factory/orchestrator,
- `agentRunner` family,
- parallel runtime/model selector/provider paths.

**Disposition:** KEEP strongest kernel/config/factory/result-verifier primitives; DEPRECATE duplicate partial runtimes after current import/caller graph is revalidated.

Bu grup için dosya silmeden önce ayrıca exact import graph çıkarılacaktır; eski isimler repo drift etmiş olabilir.

Canonical target:

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

# 9. P2 - Thin / vertical package triage

Şimdilik core authority yapılmayacak gruplar:

- `packages/restaurant`
- `packages/marketplace`
- `packages/supply`
- `packages/support`
- `packages/blog`
- `packages/admin`
- `packages/voice`
- `packages/influencer`
- `packages/studio`

**Disposition:** VERIFY_CALLERS -> KEEP/DEFER/ARCHIVE.

İlk incelemede bu paketlerin bir bölümü küçük index/types kabuklarıdır. Yalnız package adı nedeniyle ayrı core domain yaratılmayacak.

Kural:
- caller + gerçek business logic varsa canonical core'a bağla,
- yalnız type shell ise future vertical olarak defer,
- caller yoksa archive/drop adayı,
- Customer/Payment/Finance/Identity/Capability gibi core authority'leri vertical içinde tekrar tanımlamasına izin verme.

---

# 10. Cleanup uygulama sırası

Bu manifestte hiçbir file bugün silinmez.

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

## İlk gerçek implementation wave'i

Cleanup'a dosya silerek değil şu sözleşmelerle başlanmalıdır:

1. `RequestContext`
2. `BusinessTenant`
3. `EffectiveCapabilitySet`
4. `CommandId/EventId/Revision` ortak kuralları
5. `AuditContext/TelemetryContext`

Bunlar olmadan legacy route'ları güvenli biçimde compatibility shell'e indirmek mümkün değildir.

---

# 11. Bu manifestin sonraki işi

v2 manifestte her satıra şu metadata eklenecek:

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

İlk derin dosya/caller turu P0 grubundan başlayacak; `apps/randevu-server` kapsam dışı kalacaktır.
