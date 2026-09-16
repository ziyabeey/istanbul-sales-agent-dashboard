# W9 — Vertical Activation Exact Execution Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLAN KAPALI — implementation başlamadı  
> **Kaynak:** SÖKÜM 37–40 + Final Inventory Sweep + W1–W8 canonical core contracts  
> **Amaç:** Restaurant, Marketplace, Procurement ve full Support ürünlerini core authority'leri çoğaltmadan aktive etmek.

---

# 1. Vertical activation kuralı

Vertical paket yeni bir platform monoliti kurmaz.

Her vertical yalnız kendine özgü iş akışını sahiplenir ve aşağıdaki core'ları tekrar kurmaz:

```text
W1 Identity / Membership / Session
W2 Tenant / Entitlement / Commercial policy
W3 Durable Execution / Credential / Integration
W4 Site / Asset / Public Action
W5 Customer / Messaging / Support foundation
W6 Booking / Payment / Finance
W7 Commerce / Inventory / Analytics / Marketing
W8 Agent Runtime / Knowledge / Capability Bus
```

Ana invariant:

> **Vertical, kendi operasyon state'inin authority'si olabilir; ortak platform truth'unun ikinci kopyası olamaz.**

---

# 2. Activation priority

Current-main olgunluğuna göre:

| Vertical | Bugünkü durum | W9 yaklaşımı |
|---|---|---|
| Restaurant | gerçek API/runtime + güçlü contract/UI | `MIGRATE + ACTIVATE` |
| Support | güçlü contract + gerçek create/list seed + demo operator UX | `COMPLETE + ACTIVATE` |
| Marketplace | contract/type island + demo customer/provider UX | `BUILD RUNTIME FROM SEEDS` |
| Procurement | contract/type island + demo procurement/B2B UX | `BUILD RUNTIME FROM SEEDS` |
| Voice/Studio/Blog/SEO/Influencer | extension contract seeds | `DEFER / ADAPTER-EXTENSION ONLY` |

---

# 3. Restaurant Operations activation

## 3.1 Preserve exact product surface

### Contracts

- `packages/restaurant/src/types/kds.ts`
- `packages/restaurant/src/types/kpi.ts`
- `packages/restaurant/src/types/offlineDb.ts`
- `packages/restaurant/src/types/qrPayment.ts`
- `packages/restaurant/src/types/syncEngine.ts`
- `apps/web/src/lib/restoran/MasaTypes.ts`

### Live APIs

- `apps/web/src/app/api/restoran/masa-olustur/*`
- `apps/web/src/app/api/restoran/masa-siparis/*`
- `apps/web/src/app/api/restoran/siparis-olustur/*`
- `apps/web/src/app/api/restoran/alman-odeme/*`
- `apps/web/src/app/api/restoran/alman-odeme-callback/*`
- `apps/web/src/app/api/restoran/split-odeme/*`
- `apps/web/src/app/api/restoran/menu-sihirbazi/*`
- `apps/web/src/app/api/restoran/upsell-onerisi/*`
- `apps/web/src/app/api/restoran/parasut-tetikle/*`

### UX

- `apps/web/src/app/dashboard/manage/restoran/garson/*`
- `apps/web/src/app/dashboard/manage/restoran/mutfak/*`
- `apps/web/src/app/dashboard/manage/restoran/qr-siparis/*`

**Disposition:** `PRESERVE PRODUCT SEMANTICS + REWIRE AUTHORITY`

---

## W9-R01 — RestaurantLocation + table/session authority

Promote the existing table lifecycle into:

```text
RestaurantLocation
Floor/Table
DiningSession
RestaurantCheck
```

`MasaTypes.ts` state machine intent stays, but invalid `iptal as any` style transitions are replaced by explicit commands/events.

Commands:

```text
OpenDiningSession
PlaceTableOrder
OpenService
StartKitchenPrep
MarkKitchenReady
MarkDelivered
MarkTableDirty
StartCleaning
CloseDiningSession
```

Gate:
- revision/optimistic concurrency,
- authenticated staff or W4 public QR capability,
- append-only operational event references.

---

## W9-R02 — KDS + waiter task bridge

Use `packages/restaurant/src/types/kds.ts` as contract seed.

Build:

```text
KitchenTicket
KitchenItem
WaiterTask
OperationalNotification
```

Flow:

```text
OrderPlaced
 -> KitchenTicket
 -> KitchenStarted
 -> KitchenReady
 -> assigned WaiterTask
 -> push/device notification
 -> ACK
 -> Delivered
```

W3 owns durable transport. W5 messaging provider primitives may be reused, but operational notification is not a marketing MessageIntent.

---

## W9-R03 — Payment timing policy

Restaurant-specific policy:

```text
ON_ORDER
ON_KITCHEN_START
POSTPAID
```

Restaurant emits payment intent timing. W6 owns payment truth.

Hard rule:
- no Restaurant route may set `odendi`, paid items or paid check without W6 verified PaymentAllocation.

Existing split-bill/alman-usulü UX is preserved and rewired to W6 tender/allocation semantics.

---

## W9-R04 — Offline POS replication

Use:

- `packages/restaurant/src/types/offlineDb.ts`
- `packages/restaurant/src/types/syncEngine.ts`

Target:

```text
LocalPendingCommand
ServerRevision
CommandAck
ConflictRecord
LocalProjection
```

Rules:
- payment/provider state always server authority,
- offline client cannot mint paid truth,
- duplicate replay idempotent,
- rejected conflict visible to operator,
- recovery survives browser/device restart.

---

## W9-R05 — Restaurant catalog/inventory bridge

Menu/catalog uses W7 Commerce/Inventory primitives.

Restaurant owns:
- menu availability/presentation,
- recipe/operational mapping if needed,
- order preparation state.

It does not create a second stock authority.

`menu-sihirbazi` becomes:

```text
Vision/Agent proposal
 -> validated menu/catalog draft
 -> W7 catalog command
```

---

## W9-R06 — KPI and managerless operations projections

Use `packages/restaurant/src/types/kpi.ts` + W7 event/KPI projection patterns.

Build projections:

- kitchen prep SLA,
- waiter assignment/delivery SLA,
- table turn time,
- cleaning turnaround,
- backlog/overdue tasks,
- void/cancel anomalies,
- staff workload,
- revenue/tip/average check from W6 financial truth.

Never compute revenue from local adisyon flags.

---

## W9-R07 — Multi-branch cockpit

Build only after single-location event model is stable:

```text
BusinessTenant
 -> RestaurantLocation[]
 -> BranchHealthProjection
 -> ExceptionFeed
```

Cockpit shows exceptions rather than becoming a second operations writer.

---

## W9-R08 — Paraşüt/accounting bridge

`parasut-tetikle` provider knowledge is adapter seed.

Flow:

```text
W6 Financial/Invoice event
 -> W3 Outbox
 -> IntegrationConnection
 -> Paraşüt adapter
 -> provider outcome/reconciliation
```

Restaurant route never reports accounting success directly.

---

# 4. Marketplace activation

## 4.1 Current seed surface

### Contracts

- `packages/marketplace/src/types/job.ts`
- `packages/marketplace/src/types/bid.ts`

### UX

- `apps/web/src/app/dashboard/manage/pazaryeri/page.tsx`
- `apps/web/src/app/dashboard/manage/pazaryeri/usta/page.tsx`

Current state is contract + demo UI, not live persistence authority.

**Disposition:** `PRESERVE UX/DOMAIN LANGUAGE + BUILD CANONICAL RUNTIME`

---

## W9-M01 — MarketplaceJob runtime

Promote Job contract into revisioned aggregate:

```text
DRAFT
OPEN
AWARDED
ACTIVE
COMPLETION_REQUESTED
COMPLETED
CANCELLED
DISPUTED
```

Exact enum may be finalized during implementation, but Bid acceptance and work completion remain separate transitions.

---

## W9-M02 — Bid + Award boundary

Keep Bid semantics, build explicit `Award` snapshot:

```text
Award {
  jobId
  acceptedBidId
  providerId
  amountMinor
  commercialPolicySnapshot
  acceptedAt
}
```

`Bid.accepted` alone never moves money or starts settlement.

---

## W9-M03 — Provider profile as marketplace projection

Do not reuse current all-in-one provider struct as authority.

Split:

- W1 identity/membership,
- MarketplaceProviderProfile,
- verification evidence/decision,
- W6 payout/payment account ref,
- reputation projection,
- credit ledger projection,
- auto-bid policy.

Bid-time `ProviderSnapshot` is preserved as historical presentation snapshot.

---

## W9-M04 — Marketplace Credit Ledger

Build:

```text
CreditAccount
CreditLedgerEntry
CreditReservation
CreditSpend
CreditRelease
CreditRefund
CreditGrant/Purchase
```

Credits are not W2 entitlement.

Rules:
- no mutable balance without ledger,
- PlaceBid retries do not double-spend,
- purchased credits granted only after W6 verified payment,
- all price fields explicit minor-unit TRY.

---

## W9-M05 — Escrow/payment bridge

Marketplace owns `EscrowIntent/Award` business reference, not payment truth.

Flow:

```text
Award
 -> W6 Payment/EscrowIntent
 -> verified provider outcome
 -> W6 Finance Ledger
 -> Marketplace settlement projection
```

Commission policy is versioned and snapshotted at Award.

---

## W9-M06 — Work/dispute lifecycle

Build:

```text
WorkOrder
CompletionRequest
DisputeCase
SettlementHold
Resolution
```

Support OS can provide case tooling, but Marketplace owns marketplace dispute business state. Financial reversal remains W6.

---

## W9-M07 — Auto-bid

Existing AutoBidConfig is policy seed.

Activation requires:

- W3 DurableJob,
- W8 agent/advisory capability only for analysis,
- credit reservation,
- price/radius/category guards,
- spend/daily caps,
- idempotency.

AI never bypasses PlaceBid policy.

---

## W9-M08 — Wire preserved marketplace UX

Customer/provider demo pages become read/write clients of Marketplace projections/commands.

No redesign requirement. Replace demo arrays/local mutation with API/command data source.

---

# 5. Procurement / Supply activation

## 5.1 Current seed surface

### Contracts

- `packages/supply/src/types/supply.ts`
- `packages/supply/src/types/marketplace.ts`

### UX

- `apps/web/src/app/dashboard/manage/tedarik/page.tsx`
- `apps/web/src/app/dashboard/manage/b2b-pazar/page.tsx`

Current state is type/helper contract + demo UX.

**Disposition:** `PRESERVE UX/CONTRACT SEED + BUILD RUNTIME`

Note: repo contains two SÖKÜM 39 documents. `39-supply-procurement-purchase-order-b2b-marketplace.md` is treated as the richer canonical planning source in W9; the other remains historical until W10 cleanup gate.

---

## W9-P01 — VendorIdentity + SupplierRelationship

Build:

```text
VendorIdentity
SupplierRelationship {
  buyerTenantId
  vendorId
  terms
  communication preference
  status
}
```

A vendor need not be a Kepenk tenant. If it is, use BusinessRef instead of copying its identity.

---

## W9-P02 — SupplierOfferMapping

Replace generic product-only mapping with:

```text
supplierRelationshipId
productId
variantId/inventoryItemId
supplierSKU
purchaseUnit
unitsPerPurchaseUnit
MOQ
unitPriceMinor
leadTime
validity window
```

This is required for correct goods receipt -> W7 Inventory movement conversion.

---

## W9-P03 — Requisition / approval / PurchaseOrder

Build lifecycle:

```text
Demand/Reorder signal
 -> ReorderSuggestion
 -> PurchaseRequisition
 -> Approval
 -> PurchaseOrder
 -> SupplierAcknowledgement
```

Auto-PO requires explicit W2/W9 policy, spend threshold, healthy integration and duplicate/open-PO checks.

---

## W9-P04 — GoodsReceipt

PO delivery is not stock truth.

Build:

```text
GoodsReceipt
  receivedQty
  rejectedQty
  reason/evidence
  PO line refs
```

Receipt emits W7 InventoryMovement. Partial/over/under/returned deliveries are explicit.

---

## W9-P05 — Accounts Payable bridge

Separate:

```text
PurchaseOrder
GoodsReceipt
SupplierInvoice/Payable
```

Build 3-way match:

```text
PO vs Receipt vs Invoice
 -> match / exception
 -> W6 AccountsPayable/Financial intent
```

Supply never owns ledger/payment truth.

---

## W9-P06 — Supplier performance projection

Preserve reorder/scoring helpers as formula seeds, but source score from:

- actual lead time,
- on-time rate,
- fill rate,
- rejection/quality,
- price variance,
- dispute/return outcomes.

Projection stores formula/version/window/sample size.

---

## W9-P07 — Supplier communication adapter

`email | whatsapp | portal | api` remains adapter vocabulary.

Flow:

```text
SendPurchaseOrder
 -> W3 Outbox
 -> channel/provider adapter
 -> delivery receipt
 -> SupplierAcknowledgement separately
```

Delivery != PO confirmation.

---

## W9-P08 — B2B Supplier Marketplace extension

Keep separate from private procurement:

```text
SupplierMarketplaceProfile
Listing
Seller verification
Buyer discovery
MarketplaceOrder/PO handoff
Commission policy
```

Seller subscription/listing tier uses W2 entitlement. Commission/payment uses W6. Product/catalog mapping uses W7.

Wire `b2b-pazar/page.tsx` only after Procurement seller/buyer references are stable.

---

# 6. Support full activation

W5 already built the SupportCase foundation. W9 completes operational product depth.

## Seed surface

- `packages/support/src/types/ticket.ts`
- `packages/support/src/types/knowledgeBase.ts`
- `apps/web/src/app/api/destek/talep/route.ts`
- `apps/web/src/app/dashboard/manage/destek/page.tsx`
- `apps/web/src/data/destekTalepConfig.ts`

---

## W9-S01 — Complete SupportCase state machine

Commands:

```text
AssignCase
StartWork
RequestCustomerResponse
AddSupportResponse
EscalateCase
ResolveCase
ReopenCase
CloseCase
```

Every transition revisioned, attributable and emits SupportCaseEvent.

---

## W9-S02 — Durable SLA

Build policy snapshot + W3 timers:

```text
first-response clock
resolution clock
waiting-customer pause/resume
warning thresholds
breach/escalation
business calendar optional
```

Current helper math remains UI/projection utility, not SLA truth.

---

## W9-S03 — Assignment/escalation queue

Build operator/team queues from SupportCase events.

Priority keyword classifier is deterministic seed, but final priority policy may include tenant impact, security/payment severity and incident correlation.

---

## W9-S04 — Messaging bridge

Case `conversationThreadId` binds to W5 Messaging.

Support owns case/message meaning and SLA effects. Messaging owns delivery/provider status.

---

## W9-S05 — Support KB on W8 Knowledge Core

Support owns KB article draft/publish metadata.

W8 owns:
- chunking/indexing,
- embedding revisions,
- retrieval evidence,
- privacy/provenance.

No second vector runtime inside Support.

---

## W9-S06 — AI assistance risk tiers

```text
L1 retrieval/draft
L2 explicit low-risk auto-send policy
L3 sensitive action requires capability + approval
```

Confidence alone never authorizes refund, billing change, account mutation, privacy action, destructive action or closure.

---

## W9-S07 — Operator dashboard rewire

Preserve `dashboard/manage/destek/page.tsx` UX.

Replace demo/local state with:
- queue projection,
- case detail,
- SLA projection,
- verified conversation,
- AI suggestion/evidence,
- case event timeline.

---

## W9-S08 — Incident correlation

Support does not become Observability authority.

Build references:

```text
many similar P1/P2 cases
 -> incident candidate/reference
 -> shared incident status
 -> affected case projection/broadcast
```

Platform incident ownership remains operational control/observability layer.

---

# 7. Extension seeds, not new bounded contexts

## Voice

`packages/voice`

Role:

```text
speech -> intent -> W8 Capability Registry -> canonical command -> spoken result
```

**Disposition:** `KEEP AS ADAPTER SEED`

---

## Studio

`packages/studio`

Maps to:
- W4 Site/Media authoring,
- W7 creative/campaign,
- W9 Marketplace agency/profile extension.

**Disposition:** `KEEP CONTRACT SEED / NO NEW AUTHORITY`

---

## Blog

`packages/blog`

Maps to:
- W4 authoring/publish/assets,
- W8 AI content proposal,
- W7 distribution/measurement.

**Disposition:** `KEEP CONTENT EXTENSION SEED`

---

## SEO

`packages/seo`

Maps to:
- W2 Business facts,
- W3 Google/local provider connections,
- W4 public projection,
- W7 analytics/growth,
- W8 recommendation/analysis.

**Disposition:** `KEEP ANALYSIS/OPTIMIZATION EXTENSION`

---

## Influencer

`packages/influencer`

Maps to:
- W7 Campaign,
- W9 Marketplace creator/job/bid/agreement extension,
- W6 Payment/settlement,
- W9 Support/Marketplace dispute,
- W8 pricing/advisory proposal.

**Disposition:** `DEFER FUTURE VERTICAL SEED`

Pricing helper remains advisory, never financial authority.

---

# 8. W9 execution order

```text
A. Restaurant
  R01 table/session
  R02 KDS/waiter task
  R03 payment timing bridge
  R04 offline sync
  R05 catalog/inventory bridge
  R06 KPI projections
  R07 multi-branch cockpit
  R08 accounting integration

B. Support
  S01 state machine
  S02 SLA
  S03 queues/escalation
  S04 messaging
  S05 KB/RAG
  S06 AI policy
  S07 dashboard
  S08 incident correlation

C. Marketplace
  M01 job
  M02 bid/award
  M03 provider profile
  M04 credits
  M05 escrow bridge
  M06 work/dispute
  M07 auto-bid
  M08 UX

D. Procurement
  P01 vendor relationship
  P02 offer mapping
  P03 requisition/PO
  P04 goods receipt
  P05 AP bridge
  P06 performance
  P07 communication
  P08 supplier marketplace

E. Extension seeds
  activate only from concrete product need
```

Restaurant and Support are earlier because real runtime/UX value already exists. Marketplace and Supply remain build-from-contract activation tracks.

---

# 9. Cross-vertical acceptance matrix

## Restaurant

- concurrent QR orders do not lose items,
- invalid table transition rejected,
- kitchen-ready creates one waiter task,
- offline replay does not duplicate order/payment,
- client cannot mark payment successful offline,
- split bill allocations sum exactly and use W6 truth,
- KPI revenue equals Finance projection.

## Marketplace

- same bid retry consumes credits once,
- accepted bid creates one Award,
- Award does not equal payment success,
- dispute holds settlement,
- payout/refund follows W6 verified events,
- provider reputation derives from outcomes.

## Procurement

- PO delivery without receipt does not increase stock,
- partial receipt increases only accepted quantity,
- purchase-unit conversion deterministic,
- duplicate receipt retry does not double stock,
- invoice mismatch blocks auto payable,
- delivered message does not mean supplier accepted PO.

## Support

- unsigned cookie/email query cannot read case,
- waiting-customer pauses only policy-eligible clocks,
- reopen updates SLA/projections correctly,
- AI confidence cannot close sensitive case,
- support message delivery failure remains visible,
- KB answer retains retrieval evidence.

---

# 10. Vertical retirement gates

Legacy/demo path is removed only when:

```text
canonical vertical runtime live
AND UX parity verified
AND migration/backfill reconciled
AND legacy caller telemetry = 0
AND direct provider/domain permissions removed
AND rollback path proven
```

Demo arrays may remain explicit fixtures/storybook-like test data, but must never silently power production screens.

Duplicate SÖKÜM 39 documentation is not application runtime risk and is deferred to W10 documentation cleanup.

---

# 11. W9 final verdict

Kepenk v2 vertical model:

```text
Portable Core W1-W8
       ↓
+------------------------+
| Restaurant Operations  |
| Support OS             |
| Marketplace            |
| Procurement            |
+------------------------+
       ↓
Optional extension seeds
Voice / Studio / Blog / SEO / Influencer
```

The verticals share infrastructure and domain authorities, but keep their unique workflows.

> **W9 invariant: vertical richness is preserved without cloning platform truth.**
