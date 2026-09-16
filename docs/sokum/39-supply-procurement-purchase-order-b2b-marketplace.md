# SÖKÜM 39 - Supply / Procurement / Supplier / Purchase Order / Reorder / B2B Marketplace

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Kapsam:** `packages/supply`, `dashboard/manage/tedarik`, `dashboard/manage/b2b-pazar`, supplier/vendor modeli, SupplierProduct mapping, reorder point, Purchase Order lifecycle, mal kabul, AP/Finance sınırı ve premium B2B supplier marketplace.  
> **Core baseline:** `docs/sokum/36-canonical-architecture-synthesis.md`

## Executive verdict

Supply korunmalı, fakat current main'deki hali çalışan bir procurement motoru değil. `packages/supply` type/helper contract adası, `tedarik` ve `b2b-pazar` ise hard-coded demo ürün yüzeyleri.

Buna rağmen domain fikri Marketplace 38'den farklı bir kritik business spine taşıyor:

```text
Stock / Demand Signal
 -> Reorder Policy
 -> Purchase Requisition
 -> Approval
 -> Purchase Order
 -> Supplier acknowledgement
 -> Shipment
 -> Goods Receipt
 -> Inventory Movement
 -> Supplier Invoice / Accounts Payable
 -> Payment / Finance
```

Aynı package ayrıca platform seviyesinde ayrı bir **B2B Supplier Marketplace** fikri taşıyor. Tenant'ın kendi private vendor ilişkisi ile platformdaki marketplace seller aynı authority değildir.

Karar:

> **KEEP** Procurement/Supply'ı first-class business capability olarak ve mevcut supplier/PO/ROP/B2B marketplace ürün emeğini koru.  
> **REWRITE** supplier identity, SupplierProduct mapping, PO lifecycle, receiving, money/UoM, scoring ve auto-reorder orchestration sınırlarını.  
> **DROP** Supply içinde paralel inventory, finance, subscription, integration ve business identity truth'u kurma yaklaşımını.  
> **BUILD** Procurement Core + Goods Receipt + approval/requisition + AP bridge ve bunun üzerinde ayrı Supplier Marketplace extension'ı.

---

## 1. Current-main kanıtı

### 1.1 `packages/supply` implementation değil

Current footprint:

```text
packages/supply/
  package.json
  src/
    index.ts
    types/
      supply.ts
      marketplace.ts
```

`index.ts` yalnız type/constant/helper export ediyor.

Paketin dependency listesinde `zod` var, fakat current `src` footprint'inde Zod schema/parse boundary'si yok. Repository, service, command handler, API adapter, persistence veya durable worker da yok.

Current code search'te `PurchaseOrder` veya `@kepenk/supply` için gerçek caller yüzeyi ortaya çıkmadı. GitHub code search sonucu eksik olabileceğinden bu mutlak yokluk kanıtı sayılmaz; fakat package footprint'i ve UI yapısı birlikte değerlendirildiğinde runtime authority'nin current package içinde bulunmadığı açık.

Ayrıca `apps/web/src/app/api/tedarik` ve `apps/web/src/app/api/supply` current main'de mevcut değil.

### 1.2 `dashboard/manage/tedarik` demo product surface

Dosya açıkça `Demo Data` ile çalışıyor.

Korunmaya değer UX/domain dili:

- tedarikçi listesi,
- rating / on-time / quality metrikleri,
- payment terms,
- stok uyarıları,
- reorder point,
- Purchase Order listesi,
- draft/sent/confirmed/shipped/delivered dili,
- automatic order niyeti,
- supplier integration method niyeti.

PO toplamları bu UI'da kuruş kabul edilip `/100` ile gösteriliyor.

### 1.3 `dashboard/manage/b2b-pazar` ayrı B2B discovery surface

Bu ekran da local demo supplier/product verisi kullanıyor.

Korunmaya değer UX:

- B2B ürün keşfi,
- supplier discovery,
- verified seller işareti,
- minimum order quantity,
- order modal,
- supplier rating,
- kategori/konum/minimum sipariş bilgisi.

Fakat Sipariş Ver butonu gerçek PO/order command authority'sine bağlı değil.

---

## 2. Procurement ile Supplier Marketplace aynı aggregate olmamalı

Current package iki farklı problemi aynı package altında topluyor.

### A. Tenant-private Procurement

Bir işletmenin kendi tedarikçi ilişkisi:

```text
BusinessTenant
 -> SupplierRelationship
 -> negotiated terms
 -> SupplierOfferMapping
 -> ReorderPolicy
 -> Requisition
 -> PurchaseOrder
 -> Receipt
```

Bu veriler tenant'a özeldir. Aynı fiziksel tedarikçi iki farklı işletmeye farklı fiyat, vade, MOQ ve teslim süresi sunabilir.

### B. Platform Supplier Marketplace

Platformda satış yapan supplier:

```text
Canonical Seller Business
 -> SupplierMarketplaceProfile
 -> Verification
 -> MarketplaceListing[]
 -> Listing entitlement
 -> Buyer discovery/order
 -> commission / marketplace fee
```

Bu platform-level shared marketplace state'idir.

### Karar

```text
Supply / Procurement Core
  owns tenant-private vendor relationship + purchase lifecycle

Supplier Marketplace Extension
  owns seller marketplace profile + listing/discovery policy
```

İkisi canonical Business identity üzerinden bağlanabilir, fakat aynı entity değildir.

---

## 3. Supplier identity yeniden sınırlandırılmalı

Current `Supplier`:

- `businessId`
- name/contact/phone/email/WhatsApp/address
- integration method
- rating / lead time / on-time / quality
- payment terms

taşıyor.

Buradaki `businessId` semantik olarak belirsiz: buyer tenant mı, supplier business mı?

Canonical ayrım:

```text
VendorIdentity
  external supplier identity or canonical platform BusinessRef

SupplierRelationship
  buyerTenantId
  vendorId
  status
  negotiated payment terms
  preferred communication channel
  commercial metadata
```

Platformda hesabı olmayan vendor da procurement için kaydedilebilmelidir. Platform seller olan vendor ise canonical BusinessRef ile bağlanabilir.

### Invariant

> Tenant'ın supplier kaydı platformdaki BusinessTenant kaydının kopyası değildir; tenant'a özel ticari ilişkidir.

---

## 4. SupplierProduct generic productId ile yetinemez

Current model:

```text
SupplierProduct
 -> supplierId
 -> productId
 -> supplierSKU
 -> unitPrice
 -> MOQ
 -> leadTime
```

Commerce tarafında Product birden fazla variant taşıyabilir ve inventory variant seviyesindedir.

Bu nedenle procurement mapping'in yalnız `productId` tutması yetersizdir.

Hedef:

```text
SupplierOfferMapping
  supplierRelationshipId
  canonicalProductId
  canonicalVariantId / inventoryItemId
  supplierSKU
  purchaseUnit
  unitsPerPurchaseUnit
  MOQ
  price
  leadTime
  validity window
  preferred flag
```

Örnek:

```text
1 koli = 24 adet
supplier price = koli başına
inventory movement = 24 adet
```

Bu conversion açık contract olmadan PO teslimi inventory'yi doğru güncelleyemez.

---

## 5. Money contract repo genelinde yeniden normalize edilmeli

Supply package:

```text
SupplierProduct.unitPrice -> kuruş
PurchaseOrder.totalAmount -> kuruş
MarketplaceProduct.price  -> kuruş
```

`tedarik` UI PO toplamlarını gerçekten kuruş olarak formatlıyor.

Fakat `b2b-pazar` UI'da:

```text
fiyat: 450
UI: ₺450
```

gibi doğrudan TL-benzeri değerler kullanılıyor.

Commerce `ProductVariant.price` ise yorumda doğrudan `₺, KDV dahil` olarak tanımlanmış.

Bu yüzden Supply yalnız kendi içinde değil, Commerce boundary'sinde de amount unit ambiguity taşıyor.

### Karar

Canonical core money standardı:

```text
Money {
  currency: TRY
  minor: integer
}
```

Supply'ın:

- supplier price,
- PO line price,
- PO total,
- marketplace listing price,
- listing tier price,
- commission base/fee,
- invoice/payable

alanları aynı explicit unit contract'ını kullanmalı.

---

## 6. Purchase Order state machine receiving'i modellemiyor

Current PO status:

```text
draft -> sent -> confirmed -> shipped -> delivered
                     \-> cancelled
```

Bu temel product language KEEP, fakat gerçek procurement için `delivered` yeterli değildir.

Gerçek dünyada:

- kısmi teslim,
- eksik adet,
- fazla adet,
- hasarlı ürün,
- reddedilen satır,
- backorder,
- iade,
- birden fazla shipment/receipt

olabilir.

### Hedef boundary

`PurchaseOrder` sipariş sözleşmesini sahiplenir.

`GoodsReceipt` fiziksel kabulü sahiplenir.

```text
PurchaseOrder
 -> ShipmentRef[]
 -> GoodsReceipt[]
     -> receivedQty by line
     -> rejectedQty
     -> reason/evidence
```

PO projection receipt toplamlarından:

```text
OPEN
PARTIALLY_RECEIVED
RECEIVED
CLOSED
```

gibi business state türetebilir. Exact enum implementation sırasında kesinleştirilmelidir.

### Invariant

> `PO.status = delivered` inventory quantity artırmak için yeterli kanıt değildir.

---

## 7. Mal kabulü Inventory authority'sine event üretmeli

Commerce current schema'da inventory variant üzerinde quantity olarak bulunuyor. Supply bunun ikinci bir kopyasını oluşturmamalı.

Canonical flow:

```text
ReceiveGoods command
 -> validate PO + line + remaining quantity
 -> GoodsReceipt append
 -> InventoryMovement intent/event
 -> canonical Inventory authority
 -> projection update
```

Inventory hareketi şunları taşımalı:

- tenant/location,
- product/variant/inventory item,
- quantity delta,
- purchase unit conversion,
- PO id,
- receipt id,
- unit cost snapshot,
- idempotency key.

### Invariant

> Procurement stok artışının sebebini üretir; stok truth'unu kendi içinde tutmaz.

---

## 8. PO ile Accounts Payable aynı şey değildir

Current Accounting type'ında:

```text
Transaction.source = manual | order | booking | ocr | recurring
```

ve `sourcePurchaseOrderId` benzeri bir bağlantı yok.

Ayrıca SÖKÜM 21'in hedefi immutable Finance Event authority'sidir.

Procurement tarafında üç farklı kavram ayrılmalı:

```text
PurchaseOrder
= ne sipariş edildi

GoodsReceipt
= ne fiziksel olarak alındı

SupplierInvoice / Payable
= ne kadar borç doğdu ve ne zaman ödenecek
```

`net15/net30/net60/cod` bu nedenle basit supplier label'ı değil, AP due-date policy girdisidir.

Canonical flow:

```text
SupplierInvoiceMatched
 + PO
 + Receipt
 -> payable validation / 3-way match
 -> AccountsPayableIntent
 -> Finance Ledger
```

### 3-way match hedefi

```text
PO quantity/price
vs Goods Receipt
vs Supplier Invoice
```

Mismatch varsa otomatik ödeme yerine exception/approval üretir.

---

## 9. Reorder Point KEEP, fakat auto-order değildir

Current `calculateReorderPoint()` matematiksel primitive olarak faydalı:

```text
ROP = avgDailyDemand * leadTime + safetyStock
```

KEEP.

Fakat current helper:

- demand history provenance'ı bilmiyor,
- stock location bilmiyor,
- seasonality bilmiyor,
- open PO quantity bilmiyor,
- reserved inventory bilmiyor,
- supplier reliability distribution bilmiyor.

Canonical katmanlar:

```text
Inventory / Demand Events
 -> DemandProjection
 -> ReorderPolicy
 -> ReorderSuggestion
 -> PurchaseRequisition
 -> ApprovalPolicy
 -> PurchaseOrder
```

### Auto-order guard

Tam otomasyon ancak policy açıkça izin verirse:

- supplier approved,
- max spend threshold,
- budget available,
- price drift within tolerance,
- quantity cap,
- no duplicate/open equivalent PO,
- inventory signal fresh,
- integration healthy.

Aksi halde sistem recommendation/requisition üretir, doğrudan sipariş göndermez.

---

## 10. Supplier score source-backed projection olmalı

Current `scoreSupplier()` iyi bir product primitive, fakat production authority değil.

Özellikle:

```ts
const availabilityScore = 80 // default
```

supplier seçim kararının bir kısmını sabit sayı ile dolduruyor.

Hedef:

```text
GoodsReceipt / Shipment events
 -> actual lead time
 -> on-time delivery
 -> fill rate
 -> rejection/quality rate
 -> price variance
 -> dispute/return metrics
 -> SupplierPerformanceProjection
```

Score:

- versioned formula,
- explainable weights,
- source window,
- sample size,
- provenance

taşımalı.

AI veya heuristic score supplier identity truth'u değildir.

---

## 11. Supplier communication channel PO lifecycle değildir

Current `IntegrationMethod`:

```text
email | whatsapp | portal | api
```

Bu çok iyi bir adapter intent'i. KEEP.

Ama `sentVia` ve `status=sent` provider delivery success ile karıştırılmamalı.

Canonical flow:

```text
SendPurchaseOrder
 -> Durable Outbox
 -> SupplierChannelAdapter
      email | whatsapp | portal | api
 -> delivery/provider receipt
 -> communication attempt audit
 -> optional supplier acknowledgement
```

API/portal bağlantısı SÖKÜM 33 `IntegrationConnection` üzerinden, credential'lar SÖKÜM 30 üzerinden yürür.

Email/WhatsApp send ise durable/idempotent SÖKÜM 24 execution path'ine bağlanır.

### Invariant

> Message delivered != Supplier confirmed the Purchase Order.

---

## 12. Supplier Marketplace listing tier entitlement ile bağlanmalı

Current marketplace types:

- free/growth/premium/enterprise tier,
- max product limit,
- listing price,
- verification level,
- new buyer/repeat/direct commission.

Ürün ihtiyacı değerli. Fakat paid listing tier ayrı bir subscription truth yaratmamalı.

Canonical split:

```text
Entitlement Core
 -> seller marketplace capability
 -> listing quota/features

Supplier Marketplace
 -> seller profile/listing/business policy

Finance/Billing
 -> subscription charge / commission / settlement
```

Commission rate Award/Order anında versioned commercial snapshot olmalı. Sonradan oran değişince geçmiş order yeniden hesaplanmamalı.

---

## 13. Verification ile procurement performance ayrılmalı

Current `PremiumSupplier.verificationLevel`:

```text
basic | verified | premium | elite
```

Burada iki kavram karışma riski var:

```text
Identity/business verification
!= Paid listing tier
!= Operational performance/reputation
```

Canonical model bunları ayrı tutmalı:

- Verification decision/evidence
- Subscription/entitlement tier
- SupplierPerformanceProjection
- Marketplace reputation/badges

Ücret ödeyen supplier'ın daha güvenilir kimlik doğrulanmış sayılması yasak bir coupling olmalı.

---

## 14. KEEP / REWRITE / DROP / BUILD

### KEEP

- Procurement/Supply first-class capability
- SupplierRelationship fikri
- SupplierProduct / supplier offer mapping fikri
- Purchase Order
- PO status vocabulary
- payment terms
- ROP calculation primitive
- supplier scoring product primitive
- email/WhatsApp/portal/API adapter intent'i
- B2B supplier/product discovery UX
- MOQ
- supplier marketplace profile/listing fikri
- listing tier / verification / commission business requirements
- mevcut `tedarik` ve `b2b-pazar` UX emeği

### REWRITE

- supplier identity semantics
- SupplierProduct -> variant/inventory mapping
- money contract
- purchase unit / UoM / pack conversion
- PO lifecycle
- partial receiving
- cancellation/return/rejection
- approval policy
- reorder orchestration
- supplier score provenance
- channel delivery/ack distinction
- payment terms -> AP mapping
- listing tier authority
- marketplace commission snapshot
- verification/reputation/tier separation

### DROP

Migration sonrası:

- hard-coded demo state'in business truth sayılması
- `availabilityScore = 80` gibi fake input'un supplier selection authority olması
- `delivered` status'ünden doğrudan stock truth üretme
- mutable inventory quantity'yi Supply içinde tekrar kurma
- PO'yu supplier invoice/payable yerine kullanma
- raw `number` ile TL/kuruş belirsizliği
- yalnız productId ile variant/UoM belirsiz supplier mapping
- seller subscription tier'ını Supply package içinde billing truth olarak tutma
- verification ile paid tier'ı aynı güven sinyali gibi kullanma
- `sentVia` sonucunu supplier acknowledgement sayma

### BUILD

```text
Procurement Core
  SupplierRelationship
  SupplierOfferMapping
  ReorderPolicy
  ReorderSuggestion
  PurchaseRequisition
  ApprovalPolicy
  PurchaseOrder
  PurchaseOrderLine snapshot
  GoodsReceipt
  SupplierReturn / rejection path

Bridges
  InventoryMovement -> Commerce/Inventory Core
  SupplierInvoice / AccountsPayableIntent -> Finance Core
  Supplier communications -> Durable Jobs + IntegrationConnection
  audit/reconciliation -> Observability

Supplier Marketplace Extension
  SupplierMarketplaceProfile
  MarketplaceListing
  VerificationRef
  Seller entitlement mapping
  commercial policy snapshot
  reputation projection
```

---

## 15. Hedef canonical flow

### Replenishment

```text
Inventory + demand history
 -> ReorderPolicy evaluation
 -> ReorderSuggestion
 -> PurchaseRequisition
 -> approval or auto-approval policy
 -> PurchaseOrder
 -> SendPurchaseOrder durable task
 -> Supplier acknowledgement
```

### Receiving

```text
Shipment arrives
 -> ReceiveGoods
 -> GoodsReceipt
 -> InventoryMovement
 -> Inventory projection
 -> SupplierPerformance event
```

### Finance/AP

```text
Supplier Invoice
 + PurchaseOrder
 + GoodsReceipt
 -> 3-way match
 -> AccountsPayableIntent
 -> Finance Ledger
 -> due-date / payment workflow
```

### B2B marketplace

```text
Seller Business
 -> SupplierMarketplaceProfile
 -> Listing[]
 -> Buyer discovery
 -> Procurement Requisition / PurchaseOrder
 -> marketplace commercial snapshot
 -> Finance fee/commission event
```

Bu son akışta Marketplace order, tenant procurement'a girebilir; fakat public listing catalog'u tenant-private negotiated SupplierRelationship değildir.

---

## 16. Temel invariant'lar

1. `SupplierRelationship != Platform Seller Business`.
2. `PurchaseOrder != GoodsReceipt`.
3. `GoodsReceipt != SupplierInvoice`.
4. `SupplierInvoice != Payment`.
5. `PO delivered != Inventory updated`.
6. Supply canonical Inventory truth'unu tekrar kurmaz.
7. Supply immutable financial truth'u tekrar kurmaz.
8. Tüm money alanları explicit minor-unit standardı taşır.
9. Supplier offer canonical variant/inventory item ve purchase UoM ile bağlanır.
10. Partial receipt first-class desteklenir.
11. Reorder suggestion otomatik PO değildir.
12. Auto-order budget/approval/idempotency guard'larından geçer.
13. Supplier channel delivery, supplier PO acknowledgement değildir.
14. Supplier performance metricleri source events ve zaman penceresi taşır.
15. Paid listing tier verification sonucu değildir.
16. Purchase/receive retries duplicate PO, duplicate receipt veya duplicate inventory movement üretmez.
17. PO line commercial fields order anında snapshot'lanır.
18. Marketplace commission/order policy geçmiş transaction'lar için versioned snapshot'tır.

---

## 17. Core baseline bağlantıları

### SÖKÜM 13 - Commerce Core

Product/Variant/Inventory canonical authority Supply tarafından tekrar kurulmaz. SupplierOfferMapping bu authority'ye referans verir.

### SÖKÜM 21 - Finance

Purchase cost, payable, tax, supplier payment ve marketplace fee immutable financial events olarak işlenir.

### SÖKÜM 24 - Durable Jobs

PO gönderme, retry, auto-reorder ve reconciliation durable/idempotent execution kullanır.

### SÖKÜM 29 - Identity/Tenant

Platform seller canonical business identity'ye bağlanır. Tenant-private external vendor ise açık external identity olarak modellenir.

### SÖKÜM 31 - Observability

PO send attempt, acknowledgement, receipt, mismatch, retry ve integration failure correlation/audit taşır.

### SÖKÜM 33 - IntegrationConnection

Supplier API/portal bağlantıları provider connection lifecycle'ına bağlanır.

### SÖKÜM 35 - Entitlement

Supplier marketplace paid tier ve listing quota product entitlement authority'sinden türetilir.

### SÖKÜM 36 - Canonical Core

Supply bounded context canonical core üzerinde procurement state machine'i olarak oturur, yeni bir paralel platform çekirdeği yaratmaz.

---

## 18. Migration sırası

### Faz 1 - Contract normalization

1. Supply money alanlarını canonical minor-unit Money contract'ına geçir.
2. SupplierRelationship ile platform seller identity'yi ayır.
3. SupplierOfferMapping'i ProductVariant/Inventory item + UoM ile bağla.
4. PO line snapshot contract'ını tamamla.

### Faz 2 - Procurement runtime

5. PurchaseRequisition + approval policy kur.
6. PurchaseOrder repository/service/state machine kur.
7. revision + idempotency ekle.
8. supplier send adapter'larını Durable Jobs üzerinden bağla.

### Faz 3 - Receiving and finance

9. GoodsReceipt ve partial receipt kur.
10. receipt -> InventoryMovement bridge kur.
11. SupplierInvoice / AP intent ve 3-way match kur.
12. payment terms'i due-date policy'ye bağla.

### Faz 4 - Automation and marketplace

13. ROP'u gerçek demand/inventory projection'ına bağla.
14. auto-order approval/budget guard'larını ekle.
15. supplier performance projection kur.
16. Supplier Marketplace'i ayrı extension olarak canonical seller, entitlement ve finance authority'lerine bağla.
17. demo UI'ları gerçek query/command yüzeyine geçir.

---

## 19. Acceptance criteria

- [ ] SupplierRelationship buyer tenant'a açıkça bağlı.
- [ ] External vendor ile platform seller ayrımı var.
- [ ] SupplierOfferMapping variant/inventory item ve UoM conversion taşıyor.
- [ ] Supply money alanlarının tamamı tek explicit unit standardında.
- [ ] PO create/update/send server-side authority'den geçiyor.
- [ ] PO retry duplicate order üretmiyor.
- [ ] Partial GoodsReceipt destekleniyor.
- [ ] Receipt retry duplicate inventory movement üretmiyor.
- [ ] Inventory movement canonical Inventory authority'sine gidiyor.
- [ ] Supplier invoice / payable PO'dan ayrı modelleniyor.
- [ ] PO + receipt + invoice mismatch exception üretebiliyor.
- [ ] net15/net30/net60 due date policy'ye yansıyor.
- [ ] Reorder calculation gerçek demand/stock provenance taşıyor.
- [ ] Auto-order approval/budget/price-drift guard'larından geçiyor.
- [ ] Supplier score fake constant yerine realized event projection'ından geliyor.
- [ ] Email/WhatsApp/portal/API delivery ile supplier acknowledgement ayrılmış.
- [ ] Paid marketplace listing tier SÖKÜM 35 entitlement authority'sine bağlı.
- [ ] Marketplace commission Finance events ile izleniyor.
- [ ] `tedarik` ve `b2b-pazar` demo UI'ları gerçek runtime'a bağlanırken ürün UX'i korunuyor.

---

## 20. Kapanış

SÖKÜM 39'un ana sonucu:

> **Supply korunacak. Procurement, Commerce'in basit stok ekranı değildir; supplier relationship, satın alma talebi, approval, Purchase Order, mal kabul ve AP arasında bağımsız bir business lifecycle taşır. Fakat Inventory, Finance, Integration, Identity ve Entitlement truth'larını yeniden kurmamalıdır. Premium B2B Supplier Marketplace ise Procurement Core'un kendisi değil, canonical seller identity üzerinde çalışan ayrı bir extension olmalıdır.**

Current main'deki `packages/supply` ve iki dashboard yüzeyi bu ürün fikrini güçlü biçimde tarif ediyor, fakat henüz runtime authority değildir. Migration'ın görevi bu domain eskizini çöpe atmak değil, gerçek procure-to-pay omurgasına dönüştürmektir.
