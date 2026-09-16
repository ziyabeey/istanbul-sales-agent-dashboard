# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-16  
> **Durum:** **SÖKÜM 39 AÇIK - Supply / Procurement / Purchase Order / B2B Supplier Marketplace doğrulaması**  
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
| 38 | Marketplace / Job / Bid / Provider / Escrow / Credit Economy | KAPALI | `docs/sokum/38-marketplace-job-bid-provider-escrow-credit-economy.md` |
| 39 | Supply / Procurement / Supplier / Purchase Order / Reorder / B2B Marketplace | AÇIK | sıradaki vertical doğrulaması |

## Kanonik devam kuralı

- Yeni turda yalnız bu indeks + en son gerekli söküm belgesi + frontier kodu okunur.
- `36-canonical-architecture-synthesis.md` core baseline'dır; vertical'lar bunu bozmak yerine first-class bounded context veya explicit extension olarak bağlanır.
- Vertical/package triage tamamlanmadan hiçbir vertical package archive/delete adayı sayılmaz.
- `apps/randevu-server` Kepenk söküm/migration kapsamı dışındadır ve değiştirilmez.
- Production secret/token değerleri dokümana kopyalanmaz.
- Paralel ajan current frontier'ı kapatmışsa overwrite edilmez; current main yeniden okunup ilk açık frontier'a geçilir.

## Kapanan son karar: SÖKÜM 38

Marketplace'in first-class bounded context olarak korunması gerektiği, ancak current main'de gerçek runtime authority'nin henüz kurulmadığı doğrulandı.

### Current-main evidence

- `packages/marketplace/src` yalnız `index.ts` ve `types/job.ts` + `types/bid.ts` taşıyor.
- `dashboard/manage/pazaryeri` müşteri UX'i hard-coded `Demo Data` kullanıyor.
- `dashboard/manage/pazaryeri/usta` provider UX'i hard-coded lead/bid/credit/auto-bid state'i kullanıyor.
- package'taki ayırt edici Marketplace sembolleri için gerçek repository/service/API caller yüzeyi doğrulanmadı.
- `CREDIT_PRICE_TRY = 5` iken `10 kredi` paketinin `price: 5000` olması, UI'da aynı paketin `₺50` gösterilmesiyle birlikte explicit TL/kuruş contract eksikliğini doğruluyor.

### KEEP

- Marketplace bounded context,
- Job/Bid primitives,
- customer + provider UX,
- ProviderSnapshot,
- credit economy iş modeli,
- commission policy,
- auto-bid,
- AI job analysis,
- dispute/reputation gereksinimi.

### REWRITE / CONNECT

```text
Customer -> MarketplaceJob -> Bid[] -> Award -> WorkLifecycle
                                      |
                                      +-> PaymentIntent / EscrowIntent -> Payment Core
                                                                       -> Finance Ledger

Marketplace Credit
 -> CreditAccount
 -> immutable CreditLedger
 -> reservation / spend / release / refund

AutoBid
 -> Durable Jobs
 -> idempotent PlaceBid
```

Marketplace identity, payment transaction, earnings, settlement ve credential truth'larını kendi aggregate'ında tekrar kurmayacak.

Ana invariant:

> **Marketplace bugünkü haliyle çalışan bir pazar motoru değil, güçlü bir domain eskizidir. Eskiz korunacak; gerçek state/economy authority canonical core'a bağlı Marketplace Core olarak kurulacaktır.**

## Koruma altındaki henüz triage edilmemiş vertical/product paketleri

Dedicated caller/runtime triage tamamlanmadan aşağıdakiler archive/delete edilmeyecektir:

- `packages/supply`
- `packages/support`
- `packages/voice`
- `packages/studio`
- `packages/blog`
- `packages/seo`
- `packages/admin`
- `packages/influencer`

`admin` büyük ölçüde Control Plane'e konsolide olacak bir primitive paketi olabilir. `voice`/`seo` gibi paketler mevcut core'a extension olabilir. `supply` current-main ilk bakışında bağımsız procurement state/economy taşıdığı için sıradaki dedicated vertical frontier olarak açılmıştır.

## Aktif frontier

### SÖKÜM 39 - Supply / Procurement / Supplier / Purchase Order / Reorder / B2B Marketplace

İlk current-main doğrulaması üç ayrı ürün yüzeyinin birbirine temas ettiğini gösterdi:

1. `packages/supply/src/types/supply.ts`
   - Supplier,
   - SupplierProduct,
   - PurchaseOrder + PO item/status,
   - email / WhatsApp / portal / API integration method,
   - payment terms,
   - reorder point,
   - supplier scoring.

2. `packages/supply/src/types/marketplace.ts`
   - PremiumSupplier,
   - B2B MarketplaceProduct,
   - verification level,
   - supplier subscription/listing tier,
   - marketplace commission rates.

3. UI surfaces
   - `dashboard/manage/tedarik`: stok uyarısı, ROP, supplier score, PO tracking,
   - `dashboard/manage/b2b-pazar`: supplier/product discovery ve order modal,
   - ikisi de current main'de hard-coded demo data ile çalışıyor.

Öncelikli sorular:

1. Supplier canonical Business/Partner identity graph'ında ne olmalı, tenant'ın private vendor kaydı ile platform marketplace seller aynı entity mi?
2. SupplierProduct hangi Product/Variant/Inventory authority'sine map edilmeli?
3. PurchaseOrder lifecycle draft/sent/confirmed/shipped/delivered dışında partial receipt, backorder, rejection, return ve cancellation'ı nasıl taşımalı?
4. Mal kabulü Inventory hareketini, PO kapanışını ve Accounts Payable/Finance event'ini nasıl üretmeli?
5. Reorder Point hangi gerçek demand/stock history'sinden hesaplanmalı ve safety-stock policy kimin authority'si olmalı?
6. Otomatik sipariş hangi approval threshold'larından sonra durable command olabilir?
7. Email/WhatsApp/portal/API supplier integration'ları SÖKÜM 33 IntegrationConnection + SÖKÜM 24 Durable Jobs'a nasıl bağlanmalı?
8. `net15/net30/net60/cod` payment terms Finance/AP truth'una nasıl bağlanmalı?
9. Supplier scoring ve rating'in provenance'ı nedir, hard-coded projection olmaktan nasıl çıkar?
10. Procurement ile premium B2B supplier marketplace tek bounded context'in iki yüzeyi mi, yoksa Supply Core + Supplier Marketplace extension olarak mı ayrılmalı?
11. Listing tier entitlement ile marketplace seller monetization/commission sınırı nasıl kurulmalı?
12. Package minor-unit fiyatları ile B2B UI'daki TL-benzeri raw fiyatların money contract'ı tutarlı mı?
13. Gerçek repository/service/API/caller var mı, yoksa Marketplace 38 gibi package + demo UI contract adası mı?
