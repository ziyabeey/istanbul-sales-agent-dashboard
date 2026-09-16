# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-16  
> **Durum:** **SÖKÜM 40 AÇIK - Support OS / Ticket / SLA / Knowledge Base / AI Assistance**  
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
| 39 | Supply / Procurement / Supplier / PO / Reorder / B2B Marketplace | KAPALI | `docs/sokum/39-supply-procurement-supplier-marketplace.md` |
| 40 | Support OS / Ticket / SLA / Knowledge Base / AI Assistance | AÇIK | aktif vertical doğrulaması |

## Kanonik devam kuralı

- Yeni turda yalnız bu indeks + en son gerekli söküm belgesi + frontier kodu okunur.
- `36-canonical-architecture-synthesis.md` core baseline'dır; vertical'lar bunu bozmak yerine bounded context veya explicit extension olarak bağlanır.
- Dedicated vertical triage tamamlanmadan hiçbir korunan vertical archive/delete adayı sayılmaz.
- Her business fact için tek write authority vardır; legacy UI/local state authority değildir.
- `apps/randevu-server` Kepenk kapsamı dışındadır ve değiştirilmez.
- Production secret/token değerleri dokümana kopyalanmaz.
- Paralel ajan frontier'ı kapatmışsa overwrite edilmez; main yeniden okunup ilk açık frontier'a geçilir.

## Kapanan son karar: SÖKÜM 39

Supply iki ayrı ürün sınırı içeriyor:

```text
Tenant-private Procurement Core
  SupplierRelationship
  SupplierCatalogItem
  PurchaseOrder
  GoodsReceipt
  ReorderPolicy
  SupplierPerformance projection

Platform Supplier Marketplace (extension)
  SellerProfile
  Listing
  MarketplaceOrder
  CommissionPolicy
```

Current main'de domain contract'ları ve ciddi UX prototipleri var; gerçek repository/service/API write authority doğrulanmadı. `tedarik` ve `b2b-pazar` ekranları local hard-coded state kullanıyor.

### KEEP

- Procurement first-class capability,
- supplier / PO / reorder domain dili,
- minor-unit fiyat yaklaşımı,
- supplier scoring ve payment-term tohumları,
- mevcut Procurement + B2B UX emeği.

### REWRITE / BUILD

- supplier identity canonical party/tenant graph'ına,
- PO lifecycle approval/ack/partial receipt/backorder/rejection semantiğine,
- ayrı `GoodsReceipt` -> InventoryMovement köprüsüne,
- payment terms -> Finance/AP projection'a,
- reorder -> durable advisory/approval policy'ye,
- supplier channels -> IntegrationConnection + Durable Jobs'a bağlanır.

Ana invariant:

> **Procurement purchasing workflow'u sahiplenir; stok truth'u Inventory'nin, ödeme/borç truth'u Payment/Finance'ın kalır. PO mal kabul değildir.**

## Koruma altındaki kalan vertical/product paketleri

- `packages/support`
- `packages/voice`
- `packages/studio`
- `packages/blog`
- `packages/seo`
- `packages/admin`
- `packages/influencer`

`restaurant`, `marketplace` ve `supply` dedicated teardown ile korunmuştur.

## Aktif frontier

### SÖKÜM 40 - Support OS / Ticket / SLA / Knowledge Base / AI Assistance

İlk current-main kanıtı:

- `packages/support/src/types/ticket.ts`: ticket lifecycle, P1-P4 priority, assignment, messages, SLA, AI response metadata.
- `packages/support/src/types/knowledgeBase.ts`: MDX article, chunk/embedding/RAG result, confidence thresholds.
- `dashboard/manage/destek`: 14KB civarı ciddi destek UX'i ancak `DemoTicket[]` + local state kullanıyor.
- `@kepenk/support` için gerçek runtime import/caller doğrulanmadı.

Öncelikli sorular:

1. Support hangi state'i sahiplenir; Customer/Messaging/RAG sınırı nerede?
2. SLA clock pause/resume, business hours, first-response ve resolution deadline nasıl durable olur?
3. Assignment/escalation/reopen lifecycle canonical command/event olarak nasıl kurulur?
4. Ticket message ile Messaging channel/thread arasındaki binding nedir?
5. KB article lifecycle/version/publish authority Support'ta mı Content/RAG'de mi?
6. AI suggestion, auto-send ve `aiResolved` hangi policy/approval sınırına tabi olmalı?
7. AI hiçbir koşulda finans, hesap, güvenlik veya destructive action'ı yalnız confidence ile yapabilir mi?
8. Real repository/service/API writer var mı, yoksa contract + demo UI adası mı?
9. Support KPIs first response, resolution, breach, reopen, deflection ve human handoff olarak hangi verified events'ten türetilmeli?
10. External helpdesk/email/WhatsApp girişleri IntegrationConnection + verified ingress üzerinden mi bağlanmalı?
