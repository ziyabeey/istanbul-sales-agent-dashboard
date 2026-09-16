# W7 — Commerce + Inventory + Analytics + Marketing Exact File / Task Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLAN KAPALI — implementation başlamadı  
> **Kaynak:** SÖKÜM 13, 15, 16, 17, 20, 21, 24 + SENTEZ 1–5 + W1–W6  
> **Amaç:** Product/Variant/Cart/Inventory/Order, analytics/conversion spine ve Campaign/Ads authority'lerini exact current-main dosyaları üzerinden canonical sınırlarına taşımak.  
> **Kural:** Commerce ürün ve sipariş yaşam döngüsünü sahiplenir; Payment/Finance para gerçeğini, Marketing provider adapter'ları dış platform state'ini, Analytics ise doğrulanmış event/projection'ları tüketir.

---

# 1. W7 exit contract

W7 sonunda canonical authority'ler:

```text
Product
Variant
Catalog / Category
InventoryItem
InventoryReservation
InventoryAdjustment
Cart / PurchaseFlow
Promotion / Coupon
Order
OrderLineSnapshot
Shipping/Fulfillment snapshot

AnalyticsEvent
ConversionEvent
AttributionTouch
RevenueAttribution
MetricProjection

Campaign
Journey
AudienceDefinition
CampaignBudgetPolicy
CampaignApproval
CampaignActivation
ProviderCampaignBinding
```

Minimum invariants:

1. Product/Variant price authoritative olarak integer minor-unit/kuruş olur.
2. Client cart/order total authoritative değildir; server catalog/promotion/shipping/tax policy'den hesaplanır.
3. Order immutable line/price/promotion/shipping/tax snapshot taşır.
4. Payment fields Order'da yalnız W6 projection'dır.
5. Stock quantity ile available stock aynı şey değildir; reservation explicit modellenir.
6. Order create doğrudan irreversible stock decrement yapmak yerine reserve/commit/release lifecycle kullanır.
7. Inventory adjustment actor/reason/idempotency/audit taşır.
8. Public storefront raw internal `shopId` authority'sine dayanmaz; canonical public shop/site binding kullanır.
9. Analytics event idempotent, typed, source/provenance/correlation bağlıdır.
10. Revenue metric/ROAS W6 Finance truth'tan gelir; booked/order/requested amount sentetik revenue olamaz.
11. Survey/self-reported score analytics signal olabilir; financial truth değildir.
12. Campaign draft/generated creative provider campaign activation ile eşit değildir.
13. Campaign status `active` ancak canonical campaign lifecycle + verified provider activation state ile anlamlıdır.
14. AI marketing output proposal/draft'tır; bütçe harcama veya provider activation authority'si değildir.
15. Meta/Google dispatch yapılmadan `dispatched=true` production success dönülemez.
16. Campaign provider side effect W3 DurableJob + IntegrationConnection üzerinden gider.
17. Customer targeting W5 Customer/Segment + consent/policy projection kullanır.
18. Analytics/Marketing business facts veya Finance truth'u tekrar üretmez.

---

# 2. Commerce schema seeds

## W7-COM-001 — Product / Variant schema

**Path**

- `packages/ecom-schema/src/product.ts`

**Current strengths**

- Product/Variant separation,
- option/modifier vocabulary,
- SKU/barcode,
- inventory settings,
- physical/digital/service product types,
- tax/SEO/media/AI metadata,
- revision,
- low-stock/backorder semantics.

**Current limits**

- `esnafId` legacy owner ID,
- `price`, `compareAtPrice`, `costPrice` are generic JS numbers documented as TRY rather than explicit kuruş,
- inventory quantity is embedded close to product/variant definition.

**Disposition:** `PRESERVE PRODUCT MODEL + NORMALIZE MONEY/INVENTORY BOUNDARY`

Canonical mapping:

```text
Product / Variant
  commercial/display definition

InventoryItem
  stock authority keyed to product/variant/location

Money fields
  priceKurus / compareAtPriceKurus / costKurus
```

Product revision and Inventory revision may evolve independently.

---

## W7-COM-002 — Cart / purchase-flow contract

**Path**

- `packages/ecom-schema/src/cart.ts`

**Current strengths**

- `purchaseFlowId` correlation,
- revision,
- buyer visitor/member distinction,
- line snapshot pattern,
- promotion/coupon snapshot vocabulary,
- max line/quantity bounds,
- cart abandonment marker.

**Current limit:** price summary and adjustments are generic number/TRY rather than explicit minor unit.

**Disposition:** `PRESERVE + HARDEN SERVER PRICE AUTHORITY`

Target:

```text
client add request = productId/variantId/qty/modifiers
 -> server resolve Product/Variant revision
 -> server price/modifier/promotion calculation
 -> CartLineSnapshot priceKurus
 -> CartPriceSummaryKurus
```

Client never sends authoritative line price/total.

---

## W7-COM-003 — Order schema

**Path**

- `packages/ecom-schema/src/order.ts`

**Current strengths**

- explicit order lifecycle,
- fulfillment lifecycle,
- buyer/address/invoice/shipping data,
- line-item snapshots,
- activity/history vocabulary,
- discount and price summary snapshots.

**Current authority leak**

- `paymentStatus`,
- `payment.transactionId`,
- `paidAmount`,
- `refundedAmount`

are embedded as if Order owns payment truth.

**Disposition:** `PRESERVE ORDER/FULFILLMENT SEMANTICS + REWIRE PAYMENT PROJECTION`

Canonical Order owns:

```text
OrderLineSnapshot
OrderPriceSnapshot
PromotionSnapshot
ShippingSnapshot
TaxSnapshot
Order lifecycle
Fulfillment lifecycle
PaymentRequirementRef(s)
```

W6 projects payment/refund state into Order read models.

---

# 3. Current commerce writer

## W7-COM-004 — `magazaDB.ts`

**Path**

- `apps/web/src/lib/magazaDB.ts`

**Current strengths**

- real Firestore Product/Category/Order persistence,
- soft product archive,
- transactional order + stock handling,
- variant stock checks,
- storefront read helpers,
- useful existing product/order UX backing.

**Critical problems**

- current types diverge from `@kepenk/ecom-schema`,
- Product price/cost generic TL numbers,
- `siparisOlustur` accepts order-form item prices/totals rather than canonical server recompute,
- stock decremented immediately during order create,
- no explicit reservation expiry/commit/release,
- generic `siparisDurumGuncelle` can mutate state without state-machine policy,
- shopId document path is often caller-selected authority.

**Disposition:** `PRESERVE TRANSACTIONAL/CRUD KNOW-HOW + REWRITE AS COMMERCE REPOSITORY/COMMANDS`

Target commands:

```text
CreateProduct / UpdateProduct / ArchiveProduct
AdjustInventory
ReserveInventory / ReleaseReservation / CommitReservation
CreateCart / AddCartLine / ApplyPromotion
CreateOrder
ConfirmOrder / BeginFulfillment / ShipOrder / DeliverOrder / CancelOrder / ReturnOrder
```

**Gate:** order source price is recomputed from canonical catalog/policy; inventory never goes negative except explicit backorder policy.

---

# 4. Inventory authority

## W7-INV-001 — Inventory model

**Disposition:** `GREENFIELD AUTHORITY AROUND EXISTING STOCK SEMANTICS`

Minimum:

```text
InventoryItem {
  inventoryItemId
  tenantId
  productId
  variantId?
  locationId?
  onHand
  reserved
  available
  backorderPolicy
  lowStockThreshold
  revision
}

InventoryReservation {
  reservationId
  purchaseFlowId/orderId
  itemId
  quantity
  status HELD|COMMITTED|RELEASED|EXPIRED
  expiresAt?
}

InventoryAdjustment {
  adjustmentId
  itemId
  delta/setValue
  reason
  actor/source
  idempotencyKey
  createdAt
}
```

Invariant:

```text
available = onHand - reserved
```

subject to explicit backorder semantics.

---

## W7-INV-002 — Order stock transaction migration

**Current path**

- `apps/web/src/lib/magazaDB.ts` `siparisOlustur()`

**Current behavior:** checks stock and decrements product/variant quantity before/while creating order.

**Disposition:** `PRESERVE ATOMICITY INTENT + REWRITE RESERVATION LIFECYCLE`

Target:

```text
CreateOrder/PurchaseFlow
 -> reserve stock atomically
 -> payment/confirmation policy
 -> commit reservation when order obligation accepted
 -> release/expire on failure/cancel
```

Payment timing policy determines when reservation becomes committed, not raw callback mutation.

---

## W7-INV-003 — Bulk inventory update

**Path**

- `apps/web/src/app/api/shop/inventory/bulk-update/route.ts`

**Current strengths**

- SKU-based bulk set/add/subtract UX,
- basic validation.

**Current problems**

- raw Admin token guard,
- caller-supplied shopId,
- generic set/add/subtract lacks actor/reason/idempotency/business cause.

**Disposition:** `PRESERVE BULK UX + ADAPT TO InventoryAdjustment COMMANDS`

Required request semantics:

```text
reasonCode
source/importId
expected revision where needed
idempotency key
```

W1 RequestContext + Commerce permission replaces raw admin secret.

---

# 5. Commerce API boundaries

## W7-API-001 — Products API

**Path**

- `apps/web/src/app/api/shop/products/route.ts`

**Current issues**

- POST raw Admin token,
- caller body `shopId`,
- GET public/read path accepts internal `shopId`,
- management/public concerns mixed.

**Disposition:** `SPLIT MANAGEMENT COMMAND + PUBLIC CATALOG READ`

Management:

```text
RequestContext
 -> tenant/business resolve
 -> product commands
```

Public:

```text
W4 DomainBinding/Public site/shop binding
 -> canonical published/public catalog projection
```

No raw internal shop ID as public authority.

---

## W7-API-002 — Orders API

**Path**

- `apps/web/src/app/api/shop/orders/route.ts`

**Current strengths**

- Zod create guard,
- rate limit,
- inventory shortage 409 behavior,
- list/update product UX backing.

**Current problems**

- raw Admin token for all methods,
- caller `shopId`,
- generic PUT arbitrary status,
- POST trusts legacy `SiparisForm` price snapshot.

**Disposition:** `REWIRE TO COMMERCE COMMAND/READ API`

No generic unrestricted status mutation. Explicit transition commands enforce state machine/revision.

Public order creation uses W4 PublicAction Gateway and server source snapshots.

---

## W7-API-003 — Storefront read

**Path**

- `apps/web/src/app/api/storefront/[shopSlug]/route.ts`

**Current strength:** clean public read shape by slug/product slug and useful storefront projection.

**Disposition:** `PRESERVE PUBLIC READ UX + REWIRE RESOLUTION/PROJECTION`

Target:

```text
public slug/domain/site/shop binding
 -> public catalog projection
```

Internal tenant/shop IDs never exposed as caller authority.

---

## W7-API-004 — Shop feature routes

**Current directories**

- `apps/web/src/app/api/shop/categories/`
- `coupons/`
- `feeds/`
- `inventory/`
- `orders/`
- `products/`
- `shipping/`
- `sms/`

**Disposition:** `INVENTORY EXACT CALLERS, THEN REWIRE PER DOMAIN`

Mapping:

```text
categories/products/coupons -> Commerce
inventory -> Inventory
shipping/fulfillment -> Commerce + W3 provider adapter if external
feeds -> Commerce catalog projection + W3 external channel adapter
sms -> W5 MessageIntent, not Commerce provider sender
```

No subroute gets to invent a second Customer, Payment or Messaging authority.

---

# 6. Promotion / pricing / shipping snapshots

## W7-COM-005 — Server price engine

**Disposition:** `BUILD AROUND EXISTING ECOM SCHEMAS`

Inputs:

```text
Product/Variant revision
quantity/modifier selections
Promotion/Coupon definitions
shipping policy/rate
Tax/KDV policy
customer/segment eligibility where allowed
```

Output:

```text
OrderPriceSnapshot {
  subtotalKurus
  discountKurus
  shippingKurus
  feeKurus
  taxKurus
  totalKurus
  appliedPromotion snapshots
  pricingPolicyVersion
}
```

W6 PaymentIntent consumes this exact server snapshot.

---

# 7. Analytics event spine

## W7-AN-001 — Canonical AnalyticsEvent

**Disposition:** `GREENFIELD AUTHORITY`

Minimum:

```text
AnalyticsEvent {
  analyticsEventId
  tenantId/businessId
  eventName
  occurredAt
  actor/customerId?
  session/purchaseFlowId?
  siteId/publishedRevisionId?
  sourceType/sourceId/sourceRevision?
  channel/campaign/touch refs?
  properties typed/versioned
  causationId/correlationId
  dedupeKey?
}
```

Canonical event families include:

```text
site_view
lead_created
booking_created/confirmed/completed
cart_created/updated/abandoned
checkout_started
order_created/confirmed/fulfilled
payment_succeeded/refunded
revenue_recognized
message_sent/delivered/replied
campaign_activated
ad_click/conversion
```

Financial events feed analytics projections; analytics never rewrites finance.

---

## W7-AN-002 — ConversionEvent / revenue attribution

**Disposition:** `BUILD`

```text
ConversionEvent
  conversion type
  canonical business source
  customer/purchaseFlow/session refs
  campaign/touch refs
  financialEvent/payment refs where monetary
  attributedRevenueKurus from W6 truth
```

Attribution models are projections/versioned algorithms, not event truth.

---

## W7-AN-003 — Meta CAPI event seed

**Path**

- `packages/marketing/src/types/marketing.ts`

**Current strengths**

- CAPI event names,
- `event_id` client/server dedupe direction,
- hashed customer field expectations,
- event source URL,
- custom data/order IDs.

**Disposition:** `PRESERVE PROVIDER PROJECTION CONTRACT`

Canonical flow:

```text
Analytics/ConversionEvent
 -> privacy/consent policy
 -> Meta CAPI projection
 -> W3 DurableJob + IntegrationConnection
 -> provider outcome
```

Meta CAPI event is not canonical analytics event.

---

## W7-AN-004 — Churn analytics endpoint

**Path**

- `apps/web/src/app/api/analytics/churn/route.ts`

**Current behavior**

- takes caller-provided `daysSinceLastActivity`, `reportOpenRate`, `supportTickets`,
- computes a deterministic risk score,
- explicitly describes metrics as simulated,
- logs high-risk operational alert.

**Disposition:** `PRESERVE SCORING SEED + DROP AS ANALYTICS TRUTH`

Target:

```text
Customer/Support/Engagement projections
 -> versioned churn model
 -> ChurnRiskProjection
 -> recommended action proposal
```

Caller cannot create canonical churn evidence by inventing metrics.

W8 can later provide ML/agent-enhanced recommendations.

---

## W7-AN-005 — Ciro survey

**Path**

- `apps/web/src/app/api/ciro-anket/route.ts`

**Current behavior:** unauthenticated-looking body supplies `esnafId`, `skor`, `hafta`, stored to `ciro_anket`.

**Disposition:** `PRESERVE SURVEY SIGNAL ONLY + REWIRE IDENTITY`

This is explicitly:

```text
SelfReportedBusinessMetric / SurveySignal
```

It can inform growth/engagement analysis but never revenue/Finance truth.

W1 RequestContext or scoped signed survey action determines tenant.

---

# 8. Marketing contracts

## W7-MKT-001 — `@kepenk/marketing`

**Path**

- `packages/marketing/src/types/marketing.ts`

**Current strengths**

- CustomAudience vocabulary,
- Meta/Google audience direction,
- AdBudget in kuruş,
- platform/campaign budget/spend vocabulary,
- commission concepts,
- campaign KPI fields,
- ROAS/CTR helpers.

**Disposition:** `PRESERVE CONTRACT/ALGORITHM SEED + SPLIT SOURCE AUTHORITY`

Rules:

- budget/spend are minor units,
- provider spend comes from provider projection/reconciliation,
- conversions from canonical ConversionEvent,
- revenue for ROAS from W6 Finance attribution projection,
- audience members from W5 Customer/Segment + consent policy,
- computed CTR/ROAS are metrics, never source facts.

---

# 9. Campaign Core

## W7-MKT-002 — Canonical Campaign

**Disposition:** `GREENFIELD RUNTIME USING EXISTING PRODUCT SEMANTICS`

Minimum:

```text
Campaign {
  campaignId
  tenantId
  objective
  channels/platforms
  audienceRef
  creativeRefs
  status DRAFT|READY_FOR_APPROVAL|APPROVED|ACTIVATING|ACTIVE|PAUSED|COMPLETED|FAILED
  budgetPolicyRef
  approvalPolicyRef
  start/end
  revision
}

CampaignActivation {
  activationId
  campaignId
  providerConnectionId
  providerCampaignBindingId?
  status
  requestedBudgetKurus
  providerBudgetProjection?
  failureCode?
}
```

Campaign lifecycle and provider campaign lifecycle are related but distinct.

---

## W7-MKT-003 — Current advertising campaign route

**Path**

- `apps/web/src/app/api/reklam/kampanya/route.ts`

**Current strengths**

- authenticated business flow,
- budget min/max intent,
- AI creative generation,
- pause/resume UX idea.

**Critical problems**

- `aylikButce` generic TL number whereas package contract uses kuruş,
- AI generated `sonuc` is stored as campaign and immediately `durum='aktif'`,
- no verified Meta/Google activation requirement,
- `harcanan=0`, `gelenMusteri=0` local fields can drift from provider/analytics,
- first active campaign query constrains lifecycle artificially.

**Disposition:** `PRESERVE UX/CREATIVE SEED + REWRITE CAMPAIGN/ACTION AUTHORITY`

Target:

```text
CreateCampaignDraft
 -> generate/propose creatives (W8)
 -> audience/budget validation
 -> approval policy
 -> CampaignActivation job(s)
 -> W3 provider adapters
 -> ProviderCampaignBinding
 -> status projection
```

`ACTIVE` only after required activation policy is satisfied.

---

## W7-MKT-004 — Fake ads dispatch

**Path**

- `apps/web/src/app/api/ads/route.ts`

**Current critical behavior**

- Meta dispatch mocked,
- Google dispatch mocked,
- returns success with `meta_dispatched:true` and `google_dispatched:true` anyway.

**Disposition:** `HARD-CUT PRODUCTION FAKE SUCCESS`

Potentially preserve:

- event mapping vocabulary,
- operational logging intent.

Real flow:

```text
canonical ConversionEvent
 -> provider-specific CAPI/offline conversion projection
 -> W3 DurableJob
 -> actual provider adapter
 -> verified outcome
```

---

# 10. Audience / lifecycle marketing

## W7-MKT-005 — Audience authority

Audience definition can reference:

```text
W5 Segment
customer properties/activity
purchase/booking recency
site/cart behavior
```

But membership is versioned/materialized projection.

Outbound lifecycle communication:

```text
Campaign/Journey decision
 -> W5 MessageIntent
 -> consent/policy gate
 -> W3 provider transport
```

Marketing never directly sends SMS/WhatsApp/email.

---

## W7-MKT-006 — Ad spend and approval policy

**Disposition:** `BUILD/PROMOTE`

Required:

```text
BudgetEnvelope
PlatformAllocation
SpendLimit
ApprovalThreshold
Pause/kill conditions
commission policy
```

Autonomous CMO/Agent proposals in W8 cannot exceed this deterministic envelope.

Actual provider spend is reconciled through W3 provider connection/resource state; budget intent alone is not spend.

---

# 11. Revenue/attribution rule

Canonical graph:

```text
Campaign / Touch
      ↓
Customer/PurchaseFlow/session correlation
      ↓
ConversionEvent
      ↓
W6 Payment + FinancialEvent
      ↓
AttributedRevenueProjection
      ↓
ROAS / CAC / LTV / channel metrics
```

Forbidden shortcuts:

- booking price = revenue,
- order created total = revenue,
- campaign local `gelenMusteri` = conversion truth,
- self-reported ciro = Finance revenue,
- provider dashboard metric = canonical customer/payment event without reconciliation.

---

# 12. W7 exact task order

```text
T1  Promote ecom Product/Variant/Cart/Order contracts; normalize money to minor units
T2  Define InventoryItem/Reservation/Adjustment authority
T3  Reconcile legacy `magazaDB` types/collections with ecom-schema IDs/revisions
T4  Build server pricing/promotion/shipping/tax snapshot engine
T5  Rewire product/category/coupon management APIs to W1 RequestContext commands
T6  Rewire bulk inventory update to reasoned/idempotent InventoryAdjustment
T7  Replace immediate stock decrement with reservation/commit/release lifecycle
T8  Rewire Order creation/transitions to explicit state-machine commands
T9  Rewire storefront/public catalog to W4 public binding/projection
T10 Connect Order payment requirements/projections to W6 Payment
T11 Connect fulfilled/cancelled/returned lifecycle to inventory/finance events where applicable
T12 Define canonical AnalyticsEvent/ConversionEvent envelopes
T13 Connect W4/W5/W6/W7 domain events to analytics spine
T14 Build attribution touch/session/purchaseFlow correlation
T15 Build revenue attribution projection from W6 FinancialEvents
T16 Preserve marketing types; normalize budget/spend/revenue units and sources
T17 Build Campaign/Audience/Budget/Approval runtime
T18 Rewire `reklam/kampanya` into draft -> approval -> provider activation lifecycle
T19 Hard-cut `/api/ads` fake dispatch; replace with real CAPI/offline conversion jobs
T20 Rewire churn analytics to canonical feature projections/model versioning
T21 Reclassify `ciro-anket` as verified self-reported signal, not revenue
T22 Connect lifecycle campaigns to W5 MessageIntent
T23 Build Meta/Google spend/conversion reconciliation projections through W3
T24 Shadow commerce/stock/analytics/marketing parity and acceptance suite
T25 Disable generic legacy status/stock/fake-success writers after gates
```

Dependencies:

- W1 identity/permissions,
- W2 Business/Capability,
- W3 provider connection/durable execution,
- W4 PublicAction/site/purchase surface,
- W5 Customer/Segment/Messaging,
- W6 Payment/Finance.

---

# 13. W7 acceptance matrix

| Senaryo | Beklenen |
|---|---|
| Client changes product/cart price in request | server catalog snapshot wins |
| Two buyers reserve last unit concurrently | one valid reservation or explicit backorder policy |
| Payment fails after reservation | reservation releases/expirs per policy |
| Order confirmed | reservation commits exactly once |
| Order cancelled before commit | stock restored/released without double increment |
| Bulk stock import repeated with same idempotency key | one logical adjustment |
| Staff without inventory permission | adjustment deny |
| Generic arbitrary order status jump | deny |
| Public raw `shopId` spoof | cannot select another tenant catalog/order |
| Order line product later changes | historical line snapshot unchanged |
| Payment succeeded | Order payment projection updates from W6 event only |
| Cart abandoned event duplicate | analytics dedupe |
| Same conversion client+server | canonical dedupe/event mapping prevents double count |
| Campaign generates creative but provider unavailable | DRAFT/FAILED activation, never ACTIVE |
| `/api/ads` without real provider call | cannot return dispatched success |
| Provider campaign active but local requested pause | durable pause command/reconciliation |
| Provider spend exceeds stale local projection | reconciliation updates spend/degraded alert |
| ROAS calculation | revenue source W6 attributed financial projection |
| Booking created but unpaid | no revenue attribution |
| `ciro-anket` score | analytics survey signal only |
| Churn caller sends fake days/open-rate | cannot directly become canonical churn projection |
| Marketing audience member opted out | outbound MessageIntent denied |
| Public/storefront UI | preserved while data source canonicalized |

---

# 14. Frontend / UX preservation

W7 does not gratuitously redesign:

- store/product/order management UI,
- public storefront/product presentation,
- campaign/marketing dashboard UX,
- ad budget controls,
- analytics dashboards,
- Kepenk public marketing landing.

The migration changes data source, units, state authority and provider truth.

---

# 15. W7 cleanup candidates after gate

### Retire as authority

- legacy `magazaDB` generic price/order/status writers after canonical commands take over,
- immediate stock decrement as universal order semantics,
- client-supplied order/cart/payment totals,
- Order embedded payment fields as writers,
- raw `shopId` public/management authority,
- raw Admin-token commerce management,
- campaign local `aktif` without provider activation,
- local `harcanan/gelenMusteri` as source truth,
- `/api/ads` fake provider success,
- simulated caller-supplied churn inputs as analytics truth,
- self-reported ciro as revenue truth.

### Preserve

- ecom Product/Variant/Cart/Order semantics,
- purchaseFlow correlation and snapshot pattern,
- Firestore transaction/atomicity know-how,
- storefront/shop UX,
- coupon/shipping/feed product ideas,
- marketing CAPI/audience/budget contracts,
- minor-unit ad-budget direction,
- CTR/ROAS helper algorithms,
- campaign creative generation UX,
- deterministic churn scoring as model seed.

---

# 16. W7 final verdict

> **Commerce current main'de gerçek writer ve değerli transactional logic taşır; Marketing ise güçlü contracts/UX ile bazı mock veya local-state activation yollarını birlikte taşır. W7 Commerce emeğini canonical Product/Inventory/Order authority'sine yükseltir, Analytics'i gerçek domain/financial event spine'a bağlar ve Marketing'i draft/proposal'dan verified provider activation ile ayırır. Revenue ve ROAS'ın zemini artık W6 Finance truth'udur.**
