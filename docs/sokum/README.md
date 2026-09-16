# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-16  
> **Durum:** **SÖKÜM 37 AÇIK - Restaurant Operations vertical doğrulaması**  
> **Amaç:** `KEPENK_SOKUM_PLANI.md` 01-24 tarihsel snapshot olarak, 25+ repo-doğrulanmış turlar ise `docs/sokum/` altında korunur. Bu dosya yalnız canlı frontier ve kısa handoff taşır.

## Güncel durum

| No | Alan | Durum | Belge |
|---|---|---|---|
| 01-24 | Önceki söküm kararları | KAPALI / arşivlenmiş | `KEPENK_SOKUM_PLANI.md` |
| 25 | Public Site Runtime / Publish Artifact Authority | KAPALI | `docs/sokum/25-public-site-runtime.md` |
| 26 | Site Authoring / Publish / Domain Binding Writer | KAPALI | `docs/sokum/26-site-authoring-publish-domain-writer.md` |
| 27 | Media / Asset Authority | KAPALI | `docs/sokum/27-media-asset-authority.md` |
| 28 | Public Interaction / Forms / Lead Capture / Action Capability | KAPALI | `docs/sokum/28-public-interaction-action-capability-boundary.md` |
| 29 | Identity / Session / Tenant / Service Trust | KAPALI | `docs/sokum/29-identity-session-tenant-service-trust.md` |
| 30 | Secrets / Credentials / Rotation | KAPALI | `docs/sokum/30-secrets-credential-authority-rotation.md` |
| 31 | Observability / Audit / Operational Truth | KAPALI | `docs/sokum/31-observability-audit-operational-truth.md` |
| 32 | Data Lifecycle / Privacy / Consent / Retention | KAPALI | `docs/sokum/32-data-lifecycle-privacy-consent-retention.md` |
| 33 | External Integration Connection Lifecycle | KAPALI | `docs/sokum/33-integration-connection-lifecycle.md` |
| 34 | Tenant / Business Lifecycle / Onboarding / Provisioning / Offboarding | KAPALI | `docs/sokum/34-tenant-business-lifecycle.md` |
| 35 | Entitlement / Capability / Module / Feature Flag Runtime Authority | KAPALI | `docs/sokum/35-entitlement-capability-runtime-authority.md` |
| 36 | Canonical Architecture Synthesis / Migration & Cleanup Sequence | KAPALI / BASELINE | `docs/sokum/36-canonical-architecture-synthesis.md` |
| 37 | Restaurant Operations / POS / Masa / Adisyon / KDS / Offline Sync | AÇIK | `docs/sokum/37-restaurant-operations-pos-kds-offline-sync.md` |

## Kanonik devam kuralı

- Yeni turda yalnız bu indeks + en son gerekli söküm belgesi + frontier kodu okunur.
- `36-canonical-architecture-synthesis.md` ana core baseline'dır; yeni vertical'lar bunu bozmak yerine extension/bounded-context olarak bağlanır.
- Yeni bir söküm yalnız file-level audit mevcut authority map'e sığmayan gerçek bağımsız ürün/domain bulursa açılır.
- Vertical/package triage tamamlanmadan hiçbir vertical package archive/delete adayı sayılmaz.
- `apps/randevu-server` Kepenk söküm/migration kapsamı dışındadır ve değiştirilmez.
- Production secret/token değerleri dokümana kopyalanmaz.

## SÖKÜM 36 baseline

Ana invariant:

> **Bir business gerçeğinin tek write authority'si olacak; diğer gösterimler projection, adapter veya read model olacaktır. Big-bang rewrite yapılmayacaktır.**

Core map:

```text
CONTROL PLANE
Identity / RequestContext
BusinessTenant Lifecycle
Subscription / Entitlement / EffectiveCapabilitySet
Credential / Audit / Telemetry / Data Lifecycle

BUSINESS DOMAIN PLANE
Business Profile
Customer / Booking / Commerce
Payment / Finance
Messaging / Marketing
Agent Runtime / Knowledge

DELIVERY PLANE
SiteDraft / Asset
Publish / PublishedSiteRevision
DomainBinding / apps/sites
Public Action Gateway

INTEGRATION & EXECUTION PLANE
Durable Jobs / Outbox / Event Inbox
IntegrationConnection
Provider Adapters
```

Migration kuralı:

```text
canonical authority
      ↓
one-way compatibility projection
      ↓
shadow read / parity
      ↓
legacy write disable
      ↓
caller = 0
      ↓
archive
      ↓
delete
```

Financial, identity/security, tenant lifecycle, consent/privacy, entitlement, active publish ve provider credential lifecycle alanlarında bidirectional dual-write yasaktır.

## Neden SÖKÜM 37 yeniden açıldı?

SÖKÜM 36 sonrasında yapılan vertical/package audit, `packages/restaurant` klasörünün boyutuna bakmanın Restaurant ürününü temsil etmediğini gösterdi.

Doğrulanan yüzeyler:

```text
packages/restaurant
  offline DB / Dexie contracts
  sync conflict policy
  KDS
  QR + payment/cart
  KPI

apps/web/src/lib/restoran
  MasaTypes
  restaurant domain types
  B2B types
  tax/utilities

apps/web/src/app/api/restoran
  masa/adisyon
  QR/order
  split bill
  Iyzico flow
  Paraşüt
  menu/upsell

apps/web/src/app/dashboard/manage/restoran
  garson
  mutfak/KDS
  QR sipariş
```

Bu, Restaurant'ın yalnız generic Commerce ekranı olmadığını kanıtladı.

### İlk yön

```text
BusinessTenant
      ↓
Restaurant Operations
  ├── Table / Floor
  ├── DiningSession
  ├── Check / Adisyon
  ├── RestaurantOrder
  ├── KitchenTicket / KDS
  ├── WaiterTask
  └── OfflineReplica / Sync
          ↓
Commerce Catalog
Payment Core
Finance Ledger
Public Action Gateway
IntegrationConnection
Durable Execution
```

Restaurant kendi operasyon state'inin authority'si olabilir; Payment, Finance, Identity, Tenant ve Integration truth'larını tekrar kuramaz.

## Koruma altındaki diğer vertical/product paketleri

Dedicated caller/runtime triage tamamlanmadan aşağıdakiler archive/delete edilmeyecektir:

- `packages/marketplace`
- `packages/supply`
- `packages/support`
- `packages/voice`
- `packages/studio`
- `packages/blog`
- `packages/seo`
- `packages/admin`
- `packages/influencer`

İlk audit bunların bazılarının gerçek UI/runtime ve business contract taşıdığını gösterdi. Gerekirse Restaurant gibi ayrı teardown açılır; aksi durumda mevcut core bounded context'lere extension olarak bağlanırlar.

## Aktif frontier

### SÖKÜM 37 - Restaurant Operations / POS / Masa / Adisyon / KDS / Offline Sync

Öncelik:

1. paralel restaurant schema/authority'leri eşleştir,
2. table/dining-session/check/order/KDS ownership'ini ayır,
3. offline sync/revision/idempotency modelini doğrula,
4. public QR tenant/table/price trust boundary'sini kapat,
5. split-bill ve Iyzico akışını Payment Core + Finance Ledger'a bağla,
6. demo UI state'ini ürün UX'inden ayır,
7. Restaurant için KEEP / REWRITE / DROP / BUILD verdict'ini kapat.
