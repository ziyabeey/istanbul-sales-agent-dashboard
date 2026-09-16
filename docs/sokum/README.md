# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-16  
> **Durum:** **SÖKÜM 38 AÇIK - Marketplace / Job / Bid / Escrow vertical doğrulaması**  
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
| 36 | Canonical Architecture Synthesis / Migration & Cleanup Sequence | KAPALI / CORE BASELINE | `docs/sokum/36-canonical-architecture-synthesis.md` |
| 37 | Restaurant Operations / POS / Masa / Adisyon / KDS / Offline Sync | KAPALI | `docs/sokum/37-restaurant-operations-pos-kds-offline-sync.md` |
| 38 | Marketplace / Job / Bid / Provider / Escrow / Credit Economy | AÇIK | sıradaki vertical doğrulaması |

## Kanonik devam kuralı

- Yeni turda yalnız bu indeks + en son gerekli söküm belgesi + frontier kodu okunur.
- `36-canonical-architecture-synthesis.md` core baseline'dır; vertical'lar bunu bozmak yerine first-class bounded context veya explicit extension olarak bağlanır.
- Vertical/package triage tamamlanmadan hiçbir vertical package archive/delete adayı sayılmaz.
- `apps/randevu-server` Kepenk söküm/migration kapsamı dışındadır ve değiştirilmez.
- Production secret/token değerleri dokümana kopyalanmaz.

## Kapanan son karar: SÖKÜM 37

Restaurant'ın generic Commerce ekranı değil, ayrı bir **Restaurant Operations / Restaurant OS** bounded context'i olduğu doğrulandı.

### KEEP

- table / dining-session / adisyon,
- QR self-ordering ve masa provisioning,
- multiplayer table cart,
- KDS timer/urgency,
- garson teslim lifecycle'ı,
- offline-first POS + explicit conflict policy,
- personel `online/mola/offline`, workload ve vardiya intent'i,
- waiter/kitchen/revenue KPI contract'ı,
- split-bill / tip / KDV ürün semantiği,
- kuruş money direction,
- gerçek İyzico checkout adapter intent'i,
- Vision AI menu wizard,
- AI upsell,
- Paraşüt/accounting adapter intent'i,
- mevcut garson/mutfak/QR UX emeği.

### REWRITE / CONNECT

Restaurant payment, tenant, integration ve financial truth'u kendi içinde tekrar kurmayacak. Public QR/table/price trust, callback verification, split-bill truth, open-check concurrency, offline reconciliation ve direct Firestore mutation'ları canonical core authority'lere bağlanacak.

### BUILD

```text
RestaurantPaymentTimingPolicy
  = ON_ORDER | ON_KITCHEN_START | POSTPAID

KitchenReady
 -> WaiterTask
 -> workload-aware assignment
 -> FCM / operational push
 -> ACK
 -> Delivered
 -> KPI projection

RestaurantLocation[]
 -> Employee / Shift / Operations
 -> BranchHealthProjection
 -> Regional / Roaming Manager Cockpit
 -> exception-driven management
```

Ana invariant:

> **Restaurant OS ekran çoğaltmak için değil; order, kitchen, waiter, table, payment ve staff event'lerini tek operasyon döngüsüne bağlayıp rutin mikro-yönetimi otomasyona devretmek için vardır.**

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

`admin` büyük ölçüde Control Plane'e konsolide olacak bir primitive paketi olabilir. `voice`/`seo` gibi paketler mevcut core'a extension olabilir. Marketplace ve Supply gibi bağımsız state/economy taşıyan yüzeyler dedicated vertical teardown gerektirir.

## Aktif frontier

### SÖKÜM 38 - Marketplace / Job / Bid / Provider / Escrow / Credit Economy

İlk audit `packages/marketplace` ve `dashboard/manage/pazaryeri` tarafında yalnız UI kabuğu değil şu domain kavramlarını gösterdi:

- Job + location + status + urgency + complexity,
- AI job analysis,
- provider snapshot,
- bid lifecycle,
- auto-bid,
- credit economy ve credit packages,
- marketplace commission,
- escrow payment,
- müşteri / hizmet sağlayıcı iki taraflı marketplace UX'i.

Öncelikli sorular:

1. Job ve Bid'in canonical lifecycle authority'si var mı?
2. Provider identity BusinessTenant/User/Membership graph'ına nasıl bağlanıyor?
3. Credit economy ticari entitlement mı, ayrı marketplace wallet mı?
4. Escrow gerçekten provider/payment-backed mi, yoksa model/UI state'i mi?
5. Commission, cancellation, dispute, refund ve payout Finance Ledger'a nasıl bağlanmalı?
6. Auto-bid / AI analysis Agent Runtime capability olarak mı çalışmalı?
7. Marketplace reputation, review ve provider snapshot hangi authority'den türemeli?
8. Public job creation ve bidding trust boundary nasıl kurulmalı?
9. Marketplace'i KEEP bounded context yapan gerçek runtime/caller'lar hangileri?
10. Demo/fake state ile gerçek business logic nerede ayrılıyor?
