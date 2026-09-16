# Vertical Activation — Restaurant / Support / Marketplace / Procurement PR Plan

> **Tarih:** 2026-09-16  
> **Durum:** IMPLEMENTATION-READY PLAN — kod implementasyonu başlamadı  
> **Kaynak:** W9 Vertical Activation + SÖKÜM 37–40 + Pilot-0…4 PR plans  
> **Amaç:** Core pilot'lar kanıtlandıktan sonra first-class vertical'ları ayrı branch/PR graph'larıyla aktive etmek.  
> **Kural:** Vertical yalnız kendine özgü operasyon state'ini sahiplenir; Identity/Tenant/Integration/Payment/Finance/Inventory/Agent gibi ortak core truth'ları tekrar kurmaz.

---

# 1. Activation prerequisites

## Restaurant

Minimum prerequisite:

```text
Pilot-0 Trust
Pilot-1 Tenant/Capability
Pilot-2 Payment/Finance
Pilot-3 Public Action where QR/public flow is enabled
Pilot-4 Catalog/Inventory/Analytics primitives where used
```

## Support

Can begin after:

```text
Pilot-0 Trust
Pilot-1 Tenant/Admin
W5/Pilot-3 Messaging foundation
```

KB/AI phases require Pilot-4/W8 runtime.

## Marketplace

Requires:

```text
Pilot-0 Trust
Pilot-1 Tenant/Entitlement
Pilot-2 Payment/Finance
Pilot-4 Durable Agent/Analytics where auto-bid/advisory used
```

## Procurement

Requires:

```text
Pilot-1 Tenant/Commercial
Pilot-4 Inventory/Catalog
Pilot-2 Finance
Pilot-0/3 Durable Integration/Messaging
```

---

# 2. Restaurant Track

Current status: **real runtime + contracts + operational UX**. Approach: `MIGRATE + ACTIVATE`.

## Branch graph

```text
rest/00-baseline
      ↓
rest/01-location-table-session
      ├─────────────┬────────────────┐
      ↓             ↓                ↓
rest/02-kds    rest/03-payment   rest/04-offline
      └─────────────┬────────────────┘
                    ↓
             rest/05-catalog-inventory
                    ↓
             rest/06-kpi-branches-integrations
                    ↓
             rest/07-canary-cutover
```

## REST-00 — Baseline / protected UX / data inventory

Preserve exact surfaces:

- `packages/restaurant/src/types/kds.ts`
- `kpi.ts`
- `offlineDb.ts`
- `qrPayment.ts`
- `syncEngine.ts`
- `apps/web/src/lib/restoran/MasaTypes.ts`
- current Restaurant APIs
- Garson / Mutfak / QR Sipariş UX.

Deliver:
- one-location fixture,
- table/session/order/payment states snapshot,
- role/workstation browser baseline,
- DataClassPolicy registration for Restaurant entities/events/offline conflicts.

No writer cutover.

## REST-01 — RestaurantLocation / Table / DiningSession / Check

Build canonical operations aggregate and explicit commands:

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

Rules:
- explicit revision/concurrency,
- no `iptal as any` transition escape,
- staff principal or Pilot-3 public QR capability,
- stable line IDs/check refs.

Acceptance:
- invalid transition deny,
- duplicate order command idempotent,
- dirty/cleaning table public order locked,
- two concurrent state changes produce deterministic conflict.

## REST-02 — KDS / WaiterTask / OperationalNotification

Promote KDS semantics to:

```text
KitchenTicket
KitchenItem
WaiterTask
OperationalNotification
```

Flow:

```text
OrderPlaced -> KitchenStarted -> KitchenReady
 -> WaiterTask assigned
 -> operational push
 -> ACK
 -> Delivered
```

Operational notifications may reuse W3/W5 transport adapter but are not marketing MessageIntent.

Acceptance:
- kitchen ready creates one waiter task,
- duplicate event no duplicate task,
- offline/failed push leaves task pending/retriable,
- ACK and delivery separate.

## REST-03 — Payment Timing / Split Allocation

Preserve product modes:

```text
ON_ORDER
ON_KITCHEN_START
POSTPAID
```

Rewire:
- `alman-odeme`
- `alman-odeme-callback`
- `split-odeme`

to Pilot-2 W6 PaymentIntent/Allocation.

Hard cut:
- no local `odendi=true` authority,
- no body `status=success` payment truth,
- no local successful payment log without W6 result.

Acceptance:
- split line stable IDs,
- two payers cannot double-settle same line,
- forged callback cannot create paid check,
- payment timing policy emits requirement at correct transition.

## REST-04 — Offline POS / Sync

Use current offline/sync contracts as seed.

Build:

```text
LocalPendingCommand
ServerRevision
CommandAck
ConflictRecord
LocalProjection
```

Rules:
- payment always server authority,
- duplicate replay idempotent,
- explicit conflict instead of silent overwrite,
- restart recovery.

Acceptance:
- device offline order queues and later syncs once,
- stale command rejected/merged by policy,
- offline client cannot mint paid/provider success.

## REST-05 — Catalog / Inventory / Menu Wizard

Menu/order source uses Pilot-4 W7 catalog/inventory.

`menu-sihirbazi` becomes proposal/draft importer:

```text
Vision/Agent proposal
 -> human/validation
 -> canonical Catalog commands
```

No second stock quantity authority.

Acceptance:
- recipe/menu availability vs inventory source explicit,
- import money in kuruş,
- low-stock projection source W7 movements.

## REST-06 — KPI / Multi-branch / Paraşüt bridge

Build KPI projections from operational events + W6 finance:

- kitchen SLA,
- waiter SLA,
- table turn,
- cleaning turnaround,
- backlog,
- workload,
- revenue/tip/check from Finance.

Then optional:

```text
RestaurantLocation[] -> BranchHealthProjection -> ExceptionFeed
```

Paraşüt:

```text
W6 invoice/finance event -> W3 Outbox -> IntegrationConnection -> adapter
```

No Restaurant route claims accounting success directly.

## REST-07 — Canary cutover

Hard gates:
- Restaurant operation state canonical,
- payment local writers zero intended traffic,
- KDS/waiter task event-driven,
- offline conflict telemetry available,
- Garson/Mutfak/QR UX preserved.

Independent browser + security/payment review mandatory.

Rollback:
- stop new canary sessions,
- preserve existing canonical sessions/checks/payments,
- replay projections/tasks,
- never reopen fake payment authority.

---

# 3. Support Track

Current status: **strong contracts + real create/list seed + demo operator UX**. Approach: `COMPLETE + ACTIVATE`.

## Branch graph

```text
support/00-baseline
        ↓
support/01-case-lifecycle
        ↓
support/02-sla-queues
        ├───────────────┐
        ↓               ↓
support/03-messaging support/04-kb-ai
        └───────────────┬─────────────┐
                        ↓             ↓
                 support/05-dashboard support/06-incident
                        └───────┬─────┘
                                ↓
                         support/07-canary
```

## SUP-00 — Baseline / requester trust inventory

Inventory:
- `packages/support/src/types/ticket.ts`
- `knowledgeBase.ts`
- `/api/destek/talep`
- `dashboard/manage/destek/page.tsx`
- priority config.

Capture current unsigned-cookie/email-query risks and dashboard visual baseline.

## SUP-01 — SupportCase state machine

Build revisioned commands:

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

POST/GET `/api/destek/talep` rewire to verified requester/tenant/operator policies.

Hard cut:
- unsigned cookie decode authority,
- arbitrary email query authorization.

Acceptance:
- requester can see own case only,
- tenant operator scoped correctly,
- invalid status jump deny,
- events append with actor/source.

## SUP-02 — Durable SLA / Queue / Assignment

Build:

```text
SLAPolicy snapshot
first response timer
resolution timer
waiting-customer pause/resume
warning/breach/escalation
assignment/team queues
```

Uses W3 DurableJob.

Acceptance:
- restart does not lose SLA timer,
- waiting customer pause policy deterministic,
- response satisfies first-response once,
- breach event idempotent.

## SUP-03 — Messaging bridge

Bind SupportCase conversation to Pilot-3 Messaging.

Rules:
- Support owns case semantics/SLA effect,
- Messaging owns delivery/provider status,
- provider webhook cannot mutate case state directly.

Acceptance:
- requester reply exits waiting state via verified Message event,
- failed outbound does not count as delivered response,
- duplicate message safe.

## SUP-04 — KB / AI assistance policy

Support owns article lifecycle; W8 owns chunk/index/retrieval evidence.

AI levels:

```text
L1 draft/retrieval
L2 policy-approved low-risk auto-send
L3 sensitive action capability + approval
```

Confidence alone is never authorization.

Acceptance:
- citations/evidence captured,
- low coverage -> no auto-send,
- billing/security/privacy intents cannot auto-mutate,
- AI suggestion accepted/rejected event recorded.

## SUP-05 — Operator dashboard rewire

Preserve existing UX. Replace demo/local state with:

- queue projection,
- case detail,
- SLA status,
- verified conversation,
- AI suggestion/evidence,
- event timeline.

No aesthetic rewrite required.

## SUP-06 — Incident correlation

Support references Observability incidents but does not own incident truth.

Flow:

```text
similar P1/P2 cases -> incident candidate/reference -> linked cases
```

## SUP-07 — Canary cutover

Hard gates:
- no unsigned requester auth,
- durable SLA live,
- dashboard no demo truth,
- AI cannot close/sensitive-mutate from confidence alone.

Rollback:
- pause automation/AI auto-send,
- case/event history preserved,
- never restore email-as-auth.

---

# 4. Marketplace Track

Current status: **contract/type island + demo UX**. Approach: `BUILD RUNTIME FROM SEEDS`.

## Branch graph

```text
market/00-baseline-money
       ↓
market/01-job-bid-award
       ├──────────────┐
       ↓              ↓
market/02-credit  market/03-provider-reputation
       └───────┬──────┘
               ↓
        market/04-escrow-work-dispute
               ↓
        market/05-auto-bid
               ↓
        market/06-ux-canary
```

## MKTPL-00 — Baseline / money normalization

Preserve:
- `packages/marketplace/src/types/job.ts`
- `bid.ts`
- customer/provider demo pages.

Normalize all prices/credits/package prices to explicit minor-unit semantics.

Data classes registered before runtime writes.

## MKTPL-01 — Job / Bid / Award runtime

Build revisioned:

```text
MarketplaceJob
Bid
Award
WorkOrder ref
```

Bid accepted != Award != payment != work started.

Acceptance:
- only OPEN job accepts valid bid,
- one award per job policy,
- stale job/bid revision denied,
- Award freezes accepted commercial snapshot.

## MKTPL-02 — Credit Ledger

Build:

```text
CreditAccount
CreditLedgerEntry
CreditReservation
CreditSpend/Release/Refund/Grant/Purchase
```

Credits != W2 entitlement.

PlaceBid reserves/commits credits idempotently.

Acceptance:
- retry no double spend,
- no negative silent balance,
- purchased credit only after W6 verified payment.

## MKTPL-03 — Provider profile / verification / reputation

Split current all-in-one provider struct:

- W1 identity,
- MarketplaceProviderProfile,
- verification evidence,
- W6 payout/payment account ref,
- reputation projection,
- auto-bid config.

Preserve ProviderSnapshot at Bid creation.

## MKTPL-04 — Escrow / Work / Dispute

Flow:

```text
Award -> W6 Escrow/PaymentIntent -> Work lifecycle
 -> CompletionRequest
 -> settlement eligibility
 -> dispute/hold/resolution
 -> W6 settlement/refund/finance events
```

Marketplace owns business dispute/work state, not financial ledger.

Commission policy versioned/snapshotted at Award.

## MKTPL-05 — Auto-bid

Requires W3 DurableJob + W8 advisory analysis + credit reservation.

Hard guards:
- category/radius/budget,
- daily/spend caps,
- credit balance,
- idempotency,
- no AI bypass of PlaceBid policy.

## MKTPL-06 — UX rewire / canary

Preserve current `pazaryeri` customer/provider UX, replace demo arrays/local mutations.

Acceptance:
- real job create/list/bid/award,
- credit spend ledger,
- payment/escrow projection,
- no provider identity/payment/earnings shadow truth.

Rollback:
- stop new marketplace actions,
- preserve Job/Bid/Award/Credit/Payment history.

---

# 5. Procurement Track

Current status: **contract/type island + demo Procurement/B2B UX**. Approach: `BUILD RUNTIME FROM SEEDS`.

## Branch graph

```text
proc/00-baseline-units
      ↓
proc/01-vendor-offers
      ↓
proc/02-requisition-po
      ├───────────────┐
      ↓               ↓
proc/03-receipt   proc/05-communication
      ↓               │
proc/04-ap-match      │
      └───────┬───────┘
              ↓
       proc/06-performance
              ↓
       proc/07-b2b-marketplace
              ↓
       proc/08-ux-canary
```

## PROC-00 — Baseline / money + UoM normalization

Preserve:
- `packages/supply/src/types/supply.ts`
- `marketplace.ts`
- tedarik + b2b-pazar UX.

Freeze explicit:
- minor-unit prices,
- purchase units,
- units-per-purchase-unit,
- inventory units,
- payment terms.

## PROC-01 — VendorIdentity / SupplierRelationship / OfferMapping

Build:

```text
VendorIdentity
SupplierRelationship
SupplierOfferMapping
```

Vendor can be external or canonical BusinessRef.

Offer maps supplier SKU/UoM/MOQ/price/lead time to W7 product/variant/inventory item.

## PROC-02 — Requisition / Approval / PurchaseOrder

Flow:

```text
Demand/Reorder signal
 -> ReorderSuggestion
 -> PurchaseRequisition
 -> Approval
 -> PurchaseOrder
 -> SupplierAcknowledgement
```

Auto-order only policy-approved under spend/price/integration/duplicate guards.

## PROC-03 — GoodsReceipt / Inventory movement

Build partial/over/under/rejected receipt semantics.

Receipt emits W7 InventoryMovement with explicit UoM conversion and idempotency.

`PO delivered` alone never increments stock.

## PROC-04 — SupplierInvoice / AP / 3-way match

Separate PO, Receipt, Invoice/Payable.

```text
PO vs Receipt vs SupplierInvoice
 -> match / exception
 -> W6 AP/Financial command
```

No Supply ledger/payment truth.

## PROC-05 — Supplier communication

Preserve `email|whatsapp|portal|api` adapter vocabulary.

```text
SendPurchaseOrder -> W3 Outbox -> adapter -> delivery receipt
```

Delivery != supplier acknowledgement.

## PROC-06 — Performance / Reorder projections

Source supplier score from verified shipment/receipt/quality/price events.

Projection stores formula version/window/sample size.

Preserve ROP helper as formula seed, add demand/inbound/reserved/seasonality inputs over time.

## PROC-07 — B2B Supplier Marketplace extension

Keep separate from private procurement:

```text
SupplierMarketplaceProfile
Listing
Seller verification
Buyer discovery
Marketplace order/PO handoff
Commission policy
```

W2 entitlement handles listing tier, W6 finance handles fees/settlement, W7 catalog maps items.

## PROC-08 — UX rewire / canary

Preserve `tedarik` and `b2b-pazar` visuals. Replace local hard-coded/demo state.

Acceptance:
- supplier relationship/offer real,
- PO lifecycle real,
- partial receipt affects W7 inventory once,
- invoice mismatch blocks auto-pay,
- B2B marketplace does not merge with private vendor authority.

Rollback:
- pause new PO/listing operations,
- preserve canonical PO/Receipt/AP history,
- no return to demo/local state as business truth.

---

# 6. Extension seeds after vertical core

These packages **do not** get standalone service/domain branches by default:

## Voice

```text
speech/intent -> W8 Capability Registry -> existing canonical command
```

Adapter PR only when product needs it.

## Studio

Design/template/editor seed -> W4 Site/Media; agency/provider ideas -> Marketplace extension.

## Blog

Authoring -> W4 Site/Content; generation -> W8; distribution -> W7 Campaign.

## SEO

Business facts/public site -> W2/W4; connection -> W3; recommendations -> W7/W8; measurement -> W7 Analytics.

## Influencer

Future vertical composition:

```text
Campaign W7
+ Marketplace provider/agreement
+ W6 payment/settlement
+ Support dispute
```

No runtime build until concrete product requirement.

---

# 7. Vertical activation ordering

Recommended after core pilots:

```text
1. Support foundation completion can start early after Pilot-3 Messaging
2. Restaurant single-location can start after Pilot-2/4 payment+inventory
3. Support KB/AI after Pilot-4 Agent/Knowledge
4. Marketplace runtime
5. Procurement runtime
6. Restaurant multi-branch/managerless expansion
7. Marketplace/Procurement cross-platform extensions
8. Optional Voice/Studio/Blog/SEO/Influencer adapters
```

This is dependency order, not commercial product priority.

---

# 8. Universal vertical merge gate

Every vertical cutover PR must prove:

```text
no duplicate User/Tenant authority
no duplicate Payment/Finance authority
no duplicate Inventory authority
no raw provider credential authority
no local fake-success provider/payment state
no caller-selected tenant authority
all money in explicit minor units
revision/idempotency where stateful
DataClassPolicy registered
projection/read-model rebuildable
rollback does not mutate canonical history
protected UX diff reviewed
```

Final canary requires independent security/database and browser/integration acceptance.

---

# 9. Vertical definition of done

A vertical is not done because its dashboard looks live.

It is done when:

- its unique workflow state has one canonical authority,
- shared platform truth is referenced rather than copied,
- provider/payment/finance outcomes are verifiable,
- old demo/direct writers receive zero intended traffic,
- existing valuable UX is preserved and backed by canonical read models,
- rollback pauses/reroutes future work without rewriting historical truth.

> **Vertical activationın ana fikri şu: yeni odalar yapıyoruz ama elektrik, su, kasa ve kimlik sistemini her odada yeniden kurmuyoruz. Restaurant masa/kitchen state'ini, Marketplace job/bid'i, Procurement PO/receipt'i, Support case/SLA'yı sahiplenir. Geri kalan omurga ortaktır.**
