# SÖKÜM 39 - Supply / Procurement / Supplier / Purchase Order / Reorder / B2B Supplier Marketplace

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Kapsam:** `packages/supply`, `dashboard/manage/tedarik`, `dashboard/manage/b2b-pazar`, supplier identity, supplier catalog, purchase order, reorder, goods receipt, supplier scoring, payment terms ve B2B supplier marketplace.  
> **Core baseline:** `docs/sokum/36-canonical-architecture-synthesis.md`

## Executive verdict

Supply tarafında iki ayrı ürün fikri aynı package altında buluşuyor:

1. **Tenant-private Procurement Core**: işletmenin tedarikçileri, tedarikçi ürünleri, satın alma siparişleri, yeniden sipariş politikası ve supplier performance.
2. **Platform B2B Supplier Marketplace**: doğrulanmış/premium tedarikçilerin ürün listeleyip tenant'lara satış yaptığı cross-tenant pazar.

Current main bu iki ürün için değerli domain contract'ları ve ciddi UX prototipleri taşıyor. Fakat gerçek persistence/repository/service/API/write authority doğrulanmadı. `@kepenk/supply`, `PurchaseOrder`, `SupplierOrder`, `calculateReorderPoint` ve `reorderPoint` için package dışı gerçek runtime caller yüzeyi bulunmadı; `tedarik` ve `b2b-pazar` ekranları local hard-coded state ile çalışıyor.

Bu yüzden karar:

> **KEEP** Procurement ürün fikrini, supplier/PO/reorder primitive'lerini, minor-unit para yaklaşımını, supplier scoring tohumlarını ve mevcut UX emeğini.  
> **REWRITE** supplier identity, PO lifecycle, mal kabulü, scoring provenance, payment-term ve inventory/finance sınırlarını canonical authority'lere göre.  
> **BUILD** gerçek Procurement Core runtime'ını, GoodsReceipt akışını, durable reorder/approval orchestration'ını ve audit/projection katmanını.  
> **DEFER / BUILD** B2B Supplier Marketplace'i ayrı extension olarak; bugünkü demo UI ve type contract'ları authority değildir.  
> **DROP** client local state'in, raw UI fiyatlarının veya marketplace commission boolean/status'larının business truth sayılmasını.

Ana invariant:

> **Procurement satın alma niyetini ve supplier workflow'unu sahiplenir; stok gerçeği Inventory'nin, ödeme/borç gerçeği Payment/Finance'ın, tenant identity'si canonical Identity/Tenant authority'nin kalır.**

---

## 1. Current-main kanıtı

### 1.1 `packages/supply/src/types/supply.ts`

Paket aşağıdaki primitive'leri tanımlıyor:

- `Supplier`
- `SupplyProduct`
- `PurchaseOrder`
- PO item/status
- `ReorderSuggestion`
- payment terms: cash / net7 / net15 / net30 / net60
- supplier integration method: email / WhatsApp / portal / API
- reorder point helper
- weighted supplier scoring helper

Parasal alanların `unitPriceKurus`, toplamların kuruş semantiğiyle modellenmiş olması **KEEP** değerindedir ve SÖKÜM 21/36 minor-unit yönüyle uyumludur.

Mevcut reorder helper'ı:

```text
reorder point = ceil(daily demand average * lead time days + safety stock)
```

şeklinde doğru bir başlangıç formülü taşır. Fakat gerçek demand history, available stock, committed stock, inbound PO ve seasonality authority'sine bağlı değildir.

### 1.2 `packages/supply/src/types/marketplace.ts`

Ayrı olarak:

- `PremiumSupplier`
- B2B listing/catalog
- minimum order
- available stock
- lead time
- volume discount
- `SupplierOrder`
- `MarketplaceCommission`
- supplier subscription/listing tier

tanımlanmıştır.

Bu, private vendor management'tan farklı olarak platform düzeyinde cross-tenant seller/buyer ürününü işaret eder.

### 1.3 Procurement UI ürün fikrini iyi anlatıyor ama authority değil

`apps/web/src/app/dashboard/manage/tedarik/page.tsx` şunları gösteriyor:

- supplier listesi ve score,
- stok/reorder uyarısı,
- ürün/tedarikçi ilişkisi,
- PO takibi,
- yeni sipariş oluşturma,
- beklenen teslim,
- toplam tutar.

Ancak suppliers/products/orders hard-coded client data. Yeni sipariş `Date.now()` tabanlı id/ref üretip yalnız `setState()` ile local listeye ekleniyor. Canonical command/API/persistence yok.

### 1.4 B2B pazar UI'sı da prototip

`apps/web/src/app/dashboard/manage/b2b-pazar/page.tsx`:

- supplier discovery,
- rating,
- ürün fiyatı,
- minimum sipariş,
- teslim süresi,
- miktar indirimi,
- sepet/order modal

gibi doğru ürün yüzeyleri taşıyor.

Fakat ürünler ve sepet local/hard-coded. `packages/supply` contract'larına bağlı authoritative runtime değildir.

### 1.5 Package contract'ları runtime'a bağlı görünmüyor

Current-main code search'te:

- `@kepenk/supply`
- `PurchaseOrder`
- `SupplierOrder`
- `calculateReorderPoint`
- `reorderPoint`

için package contract'larını gerçek backend writer/service/repository olarak kullanan doğrulanmış caller bulunmadı.

Bu nedenle Supply bugün **domain-contract + UX prototype island** durumundadır.

---

## 2. Supplier tek entity değildir

Mevcut `Supplier`, tenant'a ait özel tedarikçi ilişkisini temsil eder gibi davranıyor. B2B marketplace'teki `PremiumSupplier` ise platform seller kimliğine yaklaşır.

Bunlar aynı şey değildir:

```text
Business / Legal Party
        |
        +-> SupplierMarketplaceProfile        // platform seller capability
        |
Tenant  +-> SupplierRelationship              // tenant-private vendor relation
```

`SupplierRelationship` şu tenant-local truth'ları taşıyabilir:

- internal supplier code/alias,
- tenant-specific contact preference,
- negotiated payment terms,
- negotiated lead-time expectations,
- preferred/blocked state,
- private notes,
- account/reference metadata.

Marketplace profile ise verification, public seller profile, listing capability ve platform reputation gibi platform truth'larını taşır.

### Invariant

> Bir tenant'ın private vendor kaydı ile platformdaki marketplace seller profili otomatik olarak aynı aggregate değildir; açık binding varsa bağlanırlar.

---

## 3. Product / Inventory boundary

`SupplyProduct` aynı struct içinde supplier SKU, unit price, lead time, reorder point ve `inventoryItemId` taşıyor. Bu iyi bir mapping tohumu ama stock authority olmamalı.

Hedef:

```text
InventoryItem / ProductVariant
        ^
        |
SupplierCatalogItem
- supplierId
- supplierSku
- purchaseUnit
- pack conversion
- unitCost snapshot/current offer
- leadTime
- minOrderQty
- validity
```

Procurement supplier'ın ne sattığını ve hangi ticari koşullarla sattığını bilir.

Inventory:

- on-hand,
- reserved,
- available,
- stock movement,
- lot/expiry gerekiyorsa bunları

sahiplenir.

### Invariant

> Purchase order oluşturmak stok artırmaz. Stok yalnız doğrulanmış goods receipt / inventory movement ile değişir.

---

## 4. Purchase Order lifecycle genişletilmeli

Mevcut PO status'leri iyi bir başlangıçtır ancak production procurement için mal kabulüyle sipariş yaşam döngüsünü ayırmak gerekir.

Önerilen yaklaşım:

```text
DRAFT
 -> APPROVED
 -> SENT
 -> ACKNOWLEDGED
 -> PARTIALLY_RECEIVED
 -> RECEIVED
 -> CLOSED

branches:
CANCELLED
REJECTED
```

PO item seviyesinde ayrıca:

- ordered quantity,
- acknowledged quantity,
- received quantity,
- rejected/damaged quantity,
- backordered quantity,
- cancelled quantity

ayrılmalıdır.

`PurchaseOrder` ticari commitment'tır; `GoodsReceipt` fiziksel gerçekleşmedir.

```text
PurchaseOrder
 -> supplier confirmation
 -> delivery
 -> GoodsReceipt
 -> InventoryMovement
 -> AP / Finance event or payable projection
```

### Invariant

> PO `received` boolean/status'u tek başına stok veya finansal gerçekleşme değildir.

---

## 5. GoodsReceipt missing authority

Current contract'larda ayrı bir canonical goods-receipt aggregate görünmüyor. Bu production procurement için temel BUILD alanıdır.

Önerilen primitive:

```text
GoodsReceipt
- receiptId
- purchaseOrderId
- supplierRelationshipId
- receivedAt
- receiverActorId
- line[]
  - poLineId
  - receivedQty
  - rejectedQty
  - reasonCode?
  - inventoryItemId
- revision
```

Commit sonrası:

```text
GoodsReceiptCommitted
 -> Inventory movement(s)
 -> PO projection update
 -> supplier delivery metrics
 -> Finance/AP projection if policy requires
 -> audit
```

Retry duplicate receipt üretmemeli; command idempotency key taşımalıdır.

---

## 6. Reorder policy advisory ile automatic purchase ayrılmalı

Mevcut `calculateReorderPoint()` saf hesap helper'ı olarak KEEP.

Ama production sistemde:

```text
Demand history
+ available inventory
+ inbound committed PO
+ lead-time history
+ safety-stock policy
+ seasonality / business calendar
        ↓
ReorderEvaluation
        ↓
ReorderSuggestion
```

olmalıdır.

Bir `ReorderSuggestion` **PurchaseOrder değildir**.

Auto-reorder ayrı opt-in policy gerektirir:

```text
ReorderPolicy
- enabled
- supplier preference
- maxOrderMinor
- maxDaily/weeklyBudgetMinor
- approvalThresholdMinor
- minConfidence
- allowedSku/category
```

ve çalışması:

```text
Durable evaluation job
 -> idempotent suggestion
 -> approval policy
 -> CreatePurchaseOrder command
```

şeklinde SÖKÜM 24 durable execution'a bağlanmalıdır.

### Invariant

> Low-stock sinyali doğrudan dış tedarikçiye sipariş veremez.

---

## 7. Supplier scoring derived read model olmalı

Current helper:

```text
price       30%
delivery    30%
quality     20%
reliability 20%
```

ürün tasarımı için iyi bir seed'dir. Fakat input provenance tanımlı değildir.

Canonical scoring kaynakları örneğin:

- quoted vs actual cost,
- promised vs actual delivery,
- fill rate,
- rejected/damaged receipt ratio,
- cancellation/backorder rate,
- return/quality incidents,
- response/acknowledgement latency.

Manual quality rating varsa:

- actor,
- timestamp,
- evidence/reference,
- reason

audit edilmelidir.

`SupplierScore` projection/read model olmalı; tek bir admin'in değiştirdiği business truth olmamalı.

---

## 8. Payment terms Procurement metadata'sıdır, ödeme truth'u değildir

`cash/net7/net15/net30/net60` KEEP.

Fakat:

```text
PO payment terms
 -> commercial snapshot

Invoice / payable / due date / paid status
 -> Finance / AP authority
```

olmalıdır.

PO `net30` taşıyabilir ama `paid`, payable balance, settlement veya bank movement authority'si olamaz.

---

## 9. Supplier integrations canonical connection lifecycle kullanmalı

Mevcut contract email / WhatsApp / portal / API integration method niyeti taşıyor.

Bunlar doğrudan PO aggregate içinde credential/token saklamamalı.

Hedef:

```text
SupplierRelationship
 -> DeliveryChannelBinding / IntegrationConnection reference
 -> Durable SendPurchaseOrder job
 -> provider delivery receipt / failure
 -> reconciliation
```

SÖKÜM 33 credential/resource binding ve SÖKÜM 24 retry/DLQ/outbox değişmezleri geçerlidir.

---

## 10. Procurement ile Supplier Marketplace ayrı bounded context sınırlarıdır

İki taraf birbirine bağlanabilir fakat aynı authority olmamalıdır:

```text
Tenant Procurement Core
  SupplierRelationship
  SupplierCatalogItem
  PurchaseOrder
  GoodsReceipt
  ReorderPolicy
       |
       | optional sourcing
       v
Supplier Marketplace
  SellerProfile
  Listing
  BuyerOrder / MarketplaceOrder
  PlatformCommissionPolicy
  Reputation
```

Marketplace order tenant tarafında canonical PO üretmeye veya ona bind edilmeye uygun olabilir, fakat iki lifecycle'ın kimliği ayrıdır.

### Commission

`MarketplaceCommission` financial ledger değildir.

- oran versioned/snapshot policy,
- hesap minor-unit standardıyla,
- gerçek charge/settlement/refund Payment + Finance authority'de,
- marketplace yalnız canonical financial refs/projection görür.

---

## 11. Hedef authority modeli

```text
BusinessTenant
  |
  +-> Procurement Core
      |
      +-> SupplierRelationship
      +-> SupplierCatalogItem
      +-> PurchaseOrder
      +-> GoodsReceipt
      +-> ReorderPolicy
      +-> SupplierPerformance projection
      |
      +----> Inventory Core      // stock truth
      +----> Finance / AP        // payable/payment truth
      +----> Durable Jobs        // reorder/send/retry
      +----> IntegrationConnection

Platform
  |
  +-> Supplier Marketplace      // optional extension
      +-> SellerProfile
      +-> Listing
      +-> MarketplaceOrder
      +-> CommissionPolicy
```

---

## 12. KEEP / REWRITE / BUILD / DROP

### KEEP

- Procurement first-class product capability.
- Supplier, supplier-product mapping and PO domain language.
- Minor-unit price fields.
- Reorder point calculation seed.
- Supplier score policy seed.
- payment-term vocabulary.
- existing procurement and B2B marketplace UX/product intent.
- B2B marketplace seller/listing/volume-discount concepts.

### REWRITE / CONNECT

- Supplier → canonical party/tenant relationship.
- SupplyProduct → Product/Variant/Inventory reference boundary.
- PO lifecycle → approval + acknowledgment + receipt semantics.
- receipt → Inventory movement.
- payment terms → Finance/AP projection.
- supplier channels → IntegrationConnection + Durable Jobs.
- supplier score → evidence-derived projection.
- marketplace commission → Payment/Finance-backed settlement.

### BUILD

- Procurement repository/service/API/write authority.
- command revision/idempotency.
- GoodsReceipt.
- PO approval policy.
- partial receipt/backorder/rejection flow.
- canonical inventory bridge.
- supplier performance projector.
- durable reorder evaluator.
- auto-reorder approval/budget guardrails.
- operational audit/read models.

### DEFER / BUILD

- cross-tenant B2B Supplier Marketplace runtime.
- seller onboarding/verification.
- listing authority.
- buyer order lifecycle.
- marketplace settlement/commission integration.

### DROP AFTER CUTOVER

- hard-coded supplier/product/order arrays as business truth.
- local `setState` PO creation as operational write.
- raw UI values as money authority.
- boolean/status-based commission/payment truth.
- duplicate stock balance inside Procurement.

---

## 13. Migration order

1. Preserve existing UX and package contracts as reference fixtures.
2. Establish canonical SupplierRelationship identity/binding.
3. Establish SupplierCatalogItem ↔ Product/Inventory references.
4. Build PurchaseOrder command/repository with revision + idempotency.
5. Build GoodsReceipt and Inventory event bridge.
6. Bind payment terms to Finance/AP projection.
7. Rebuild supplier performance from verified operational events.
8. Add reorder evaluation as advisory projection.
9. Add opt-in durable auto-reorder with approval/budget guardrails.
10. Move `tedarik` UI from demo arrays to canonical read models/commands.
11. Only then implement Supplier Marketplace seller/listing/order runtime.
12. Move `b2b-pazar` UI to that runtime and remove demo truth.

No production cutover should create a period where Procurement and UI local state can both author the same PO or stock fact.

---

## 14. Final invariant set

1. **Procurement owns purchasing workflow, not stock truth.**
2. **A PO is not a GoodsReceipt.**
3. **A GoodsReceipt is the bridge to Inventory movement.**
4. **Payment terms are commercial policy, not payment status.**
5. **Supplier score is derived from attributable evidence.**
6. **Reorder suggestion is advisory until an approval/auto-order policy creates a command.**
7. **Automatic purchasing is durable, idempotent and budget-constrained.**
8. **Private supplier relationship and public marketplace seller profile are distinct identities.**
9. **Marketplace commission is not a financial ledger.**
10. **Demo UI/local state is never canonical business truth.**

---

## Sonuç

SÖKÜM 39 kapanmıştır.

`packages/supply` silinecek bir thin package değildir; işletmenin tedarik operasyonu için iyi domain dili ve UX emeği taşır. Ancak current main'de bu tasarımın gerçek runtime authority'si kurulmamıştır.

Yeni Kepenk'te **Procurement Core first-class capability olarak korunmalı**. B2B Supplier Marketplace ise aynı package'ın tesadüfi devamı değil, Procurement'a bağlanabilen ayrı platform extension'ı olarak kurulmalıdır.
