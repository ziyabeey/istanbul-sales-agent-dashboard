# Pilot-4 — Commerce + Analytics + Agent Safe Loop PR Plan

> **Tarih:** 2026-09-16  
> **Durum:** IMPLEMENTATION-READY PLAN — kod implementasyonu başlamadı  
> **Kaynak:** W7 Commerce/Analytics/Marketing, W8 Agent Runtime/Knowledge, Pilot-0/1/2/3 plans  
> **Amaç:** İlk canonical commerce transaction'ı, doğrulanmış analytics/revenue attribution'ı ve business truth'a doğrudan yazamayan bir Agent safe loop'u birlikte kanıtlamak.  
> **Scope discipline:** İlk agent yalnız read/analysis/proposal + düşük riskli canonical capability çağrısı yapar. Money movement, destructive admin/privacy, provider campaign activation ve direct domain write yasaktır.

---

# 1. Pilot-4 golden path

```text
Product / Variant
 -> Cart/PurchaseFlow
 -> server price snapshot
 -> Inventory Reservation
 -> Order
 -> P2 PaymentIntent / VerifiedPaymentResult
 -> reservation commit/release
 -> FinancialEvent
 -> AnalyticsEvent / ConversionEvent
 -> RevenueAttribution
 -> AgentRun reads canonical projections/evidence
 -> proposal / low-risk capability call
 -> OutcomeVerification
```

Initial scope:

```text
1 Canary Tenant
small product catalog
TRY / kuruş
single inventory location
one order flow
Pilot-2 payment reuse
Pilot-3 public catalog/action binding optional after management flow proven
one AgentDefinition
one ModelPolicy
one low-risk capability, preferably CampaignDraft or equivalent proposal-only action
one optional tenant-private KnowledgeSource/RetrievalEvidence path
```

Not in first Pilot-4 cut:

- autonomous campaign activation/spend,
- cross-tenant collective-learning production ingestion,
- Marketplace/Procurement/Restaurant inventory variants,
- advanced shipping/provider reconciliation beyond selected canary flow,
- broad agent fleet migration.

---

# 2. Exit invariants

1. Product/Variant prices authoritative integer kuruştur.
2. Client cart/order total cannot set charged amount.
3. Order immutable line/price/promotion/tax/shipping snapshot carries historical truth.
4. Inventory uses reservation/commit/release, not blind immediate decrement.
5. Payment truth comes only from Pilot-2 W6 authority.
6. Revenue/ROAS comes from FinancialEvent attribution, not Order created total.
7. Analytics event is typed/idempotent/provenance-linked.
8. Agent model output is not domain success.
9. Agent direct Firestore/provider write is prohibited.
10. Capability permission = identity/membership ∩ entitlement ∩ agent allowlist ∩ command policy.
11. Model unavailable/fallback cannot report canonical success.
12. AgentRun/RunStep is durable; process memory is optimization only.
13. OutcomeVerification beats `agent_logs.basari`.
14. Retrieval evidence, when used, references source/revision/embedding lineage.
15. Main Kepenk frontend and existing commerce/admin UX are preserved unless data/error wiring requires change.

---

# 3. Branch / PR graph

```text
p4/00-commerce-agent-baseline
        ├───────────────┬───────────────────┐
        ↓               ↓                   ↓
p4/01-catalog      p4/02-inventory    p4/06-analytics-spine
        └───────┬───────┘                   │
                ↓                           │
        p4/03-order-pricing                 │
                ↓                           │
        p4/04-commerce-api                  │
                ↓                           │
        p4/05-payment-integration───────────┘
                ↓
        p4/07-agent-runtime-min
                ├───────────────┐
                ↓               ↓
        p4/08-knowledge-min  p4/09-safe-capability
                └───────┬───────┘
                        ↓
                 p4/10-canary-cutover
```

P4-06 Analytics foundation may develop in parallel once event identities are agreed.

---

# 4. PR-00 — Commerce / Agent Baseline + Data Inventory

**Branch:** `p4/00-commerce-agent-baseline`  
**Depends on:** Pilot-0–3 accepted  
**Risk:** low/additive  
**Amaç:** Current commerce writer, inventory semantics, analytics fake/synthetic paths and agent direct writers için exact fixture/evidence baseline.

## Existing surfaces

- `packages/ecom-schema/src/product.ts`
- `cart.ts`, `order.ts`, `discount.ts`, `checkout.ts`
- `apps/web/src/lib/magazaDB.ts`
- `apps/web/src/lib/urunImportExport.ts`
- `apps/web/src/app/api/shop/**`
- `apps/web/src/app/api/storefront/[shopSlug]/route.ts`
- `apps/web/src/lib/analitiMotoru.ts`
- `apps/web/src/lib/marketing/utmBuilder.ts`
- `packages/marketing/src/types/marketing.ts`
- `apps/web/src/app/api/ads/route.ts`
- W8 live agent/model/runtime surfaces

## DataClassPolicy additions

```text
Product/Variant
Catalog/Category
InventoryItem/Reservation/Adjustment
Cart/PurchaseFlow
Order + immutable snapshots
AnalyticsEvent/ConversionEvent/AttributionTouch/RevenueAttribution
AgentDefinition/Run/RunStep/ModelCall/ToolCall/OutcomeVerification
KnowledgeSource/Chunk/EmbeddingRevision/RetrievalEvidence if enabled
CampaignDraft if selected as low-risk capability
```

## Deliverables

- small deterministic catalog fixture,
- expected inventory balances/reservations,
- expected order snapshot,
- expected Payment/FinancialEvent refs from Pilot-2,
- current synthetic/fake analytics/provider paths list,
- current direct agent writer/provider caller inventory.

---

# 5. PR-01 — Product / Variant / Catalog Core

**Branch:** `p4/01-catalog`  
**Depends on:** P4-00  
**Risk:** medium  
**Amaç:** Existing ecom schema semantics'i canonical money/revision boundaries ile promote etmek.

## Existing seeds

- `packages/ecom-schema/src/product.ts`
- `category.ts`
- Product management API/UX
- import/export product logic

## Canonical minimum

```text
Product
Variant
Category/Catalog
revision
priceKurus
compareAtPriceKurus?
costKurus?
TaxPolicyRef/snapshot fields as required
```

Inventory quantity is no longer Product authority.

## Acceptance

- product revision/CAS,
- price unit unambiguous integer kuruş,
- import 349.90 -> 34990 kuruş,
- Product historical revision resolvable for Order snapshot,
- media refs compatible with Pilot-3 Asset identity where applicable,
- management auth uses Pilot-0/1 RequestContext, not raw admin token.

## Rollback

Catalog reader can use compatibility projection before order writer cutover. New price writes must not create dual independent unit conventions.

---

# 6. PR-02 — Inventory Reservation / Adjustment Core

**Branch:** `p4/02-inventory`  
**Depends on:** P4-00  
**Risk:** high, concurrency  
**Amaç:** `stok.miktar` direct mutable truth yerine InventoryItem + reservation/movement semantics kurmak.

## Existing seeds

- `apps/web/src/lib/magazaDB.ts` stock transaction know-how
- `apps/web/src/app/api/shop/inventory/bulk-update/route.ts`
- `apps/web/src/lib/urunImportExport.ts`

## Canonical minimum

```text
InventoryItem
InventoryReservation
InventoryAdjustment / InventoryMovement
```

Invariant:

```text
available = onHand - reserved
```

subject to explicit backorder policy.

## Commands

```text
AdjustInventory
ReserveInventory
CommitReservation
ReleaseReservation
ExpireReservation
```

## Acceptance

- two buyers contend for last unit -> one valid reservation unless backorder policy,
- retry same reservation idempotent,
- failed/cancelled order release once,
- commit once,
- bulk adjustment requires reason/source/idempotency,
- silent negative/clamp-to-zero correction not treated as valid business movement,
- actor/source auditable.

## Rollback

Reader quantity may project to legacy stock fields; canonicalized reservations/movements never reconstructed from manual legacy quantity edits.

---

# 7. PR-03 — Server Pricing / Cart / Order Snapshot Core

**Branch:** `p4/03-order-pricing`  
**Depends on:** P4-01 + P4-02  
**Risk:** high  
**Amaç:** Client totals yerine server-derived pricing and immutable Order snapshots.

## Existing seeds

- `packages/ecom-schema/src/cart.ts`
- `packages/ecom-schema/src/order.ts`
- coupon/discount schemas and current coupon engine
- `magazaDB.ts` order transaction intent

## Canonical flow

```text
productId/variantId/qty/modifiers
 -> resolve Product/Variant revision
 -> promotions/coupon eligibility
 -> tax/shipping policy
 -> OrderPriceSnapshot
 -> reserve inventory
 -> CreateOrder
```

Order owns:

```text
OrderLineSnapshot
OrderPriceSnapshot
PromotionSnapshot
TaxSnapshot
ShippingSnapshot
fulfillment lifecycle
PaymentRequirementRef
```

Payment status/transaction fields are Pilot-2 projection only.

## Acceptance

- forged line/total rejected/ignored,
- product price later changes do not alter Order snapshot,
- generic arbitrary order state jump denied,
- invalid coupon cannot alter server snapshot,
- stock reservation and Order create atomic enough for chosen consistency model,
- same purchase idempotency -> one logical order.

---

# 8. PR-04 — Commerce Management / Storefront Read Adapters

**Branch:** `p4/04-commerce-api`  
**Depends on:** P4-03 + Pilot-3 public binding where storefront is public  
**Risk:** high, API boundary  
**Amaç:** Current shop APIs and storefront UX'i canonical command/read model'e bağlamak.

## Existing paths

- `apps/web/src/app/api/shop/products/**`
- `categories/**`
- `coupons/**`
- `inventory/**`
- `orders/**`
- `shipping/**`
- `feeds/**`
- `sms/**`
- `apps/web/src/app/api/storefront/[shopSlug]/route.ts`

## Mapping

```text
products/categories/coupons -> Commerce commands
inventory -> Inventory commands
shipping -> Commerce fulfillment + W3 adapter if external
feeds -> catalog projection + W3 external adapter
sms -> Pilot-3/W5 MessageIntent
storefront -> Pilot-3 DomainBinding/public catalog projection
```

## Acceptance

- management tenant from RequestContext,
- public catalog tenant from domain/site/shop binding, not raw `shopId`,
- generic order PUT cannot bypass state machine,
- raw admin-token commerce auth retired for canary,
- existing product/order/storefront UI still works via new projection.

---

# 9. PR-05 — Order Payment / Inventory Commit Integration

**Branch:** `p4/05-payment-integration`  
**Depends on:** P4-03 + Pilot-2 Payment/Finance  
**Risk:** critical, stock + money convergence  
**Amaç:** Order PaymentRequirement'ı Pilot-2 Payment Core'a bağlamak and reservation commit/release from verified money outcome.

## Flow

```text
Order snapshot
 -> PaymentIntent(amount from OrderPriceSnapshot)
 -> provider attempt/result via Pilot-2
 -> PaymentAllocation to Order
 -> FinancialEvent
 -> Order payment projection
 -> reservation commit/release by explicit policy
```

## Acceptance

- unpaid Order not revenue,
- payment failure releases reservation exactly once where policy says,
- payment success commits reservation exactly once,
- duplicate callback cannot double-decrement stock/revenue,
- refund creates financial reversal and order payment projection; inventory return requires explicit return/restock policy, not automatic assumption,
- amount/currency match exact Order source revision.

## Rollback

No mutation/deletion of committed payment/finance history. New order traffic can be paused; projections replayable.

---

# 10. PR-06 — Analytics / Conversion / Revenue Attribution Spine

**Branch:** `p4/06-analytics-spine`  
**Depends on:** P4-00, final integration after P4-05  
**Risk:** medium-high, metrics correctness  
**Amaç:** Synthetic order/booking/log metrics yerine typed canonical event/projection spine kurmak.

## Canonical minimum

```text
AnalyticsEvent
AttributionTouch
ConversionEvent
RevenueAttribution
MetricProjection
```

## Source rule

```text
OrderCreated != revenue
BookingCreated != revenue
Agent log success != conversion
Self-reported ciro != Finance revenue
```

Monetary ConversionEvent references Pilot-2 Payment/FinancialEvent.

## Existing seeds to preserve

- `apps/web/src/lib/marketing/utmBuilder.ts`
- `packages/marketing/src/types/marketing.ts` CAPI/dedupe/audience/budget types
- deterministic KPI/CTR/ROAS math only when sources are canonical.

## Hard-cut candidates for canary

- `apps/web/src/lib/analitiMotoru.ts` synthetic cost/revenue assumptions as truth,
- demo funnel as production metric,
- `/api/ads` fake dispatched success,
- caller-supplied churn evidence as canonical metric.

## Acceptance

- duplicate analytics event deduped,
- client+server same conversion correlation prevents double count,
- unpaid order no attributed revenue,
- refund/reversal changes attributed revenue via finance event,
- ROAS source revenue is attributed FinancialEvent projection,
- event provenance/correlation traceable.

---

# 11. PR-07 — AgentDefinition / CapabilityRegistry / Durable AgentRun Minimum

**Branch:** `p4/07-agent-runtime-min`  
**Depends on:** Pilot-0 durable trust/jobs + P4-06 canonical evidence contract  
**Risk:** high  
**Amaç:** Existing agent richness'i tek durable run/capability boundary altında minimal production-safe runtime'a taşımak.

## Existing seeds

- `apps/web/src/agents/AgentBase.ts`
- `AgentBus.ts`
- `OrchestratorAgent.ts`
- `agentRunner.ts`
- `apps/web/src/lib/ai/*`
- `apps/web/src/lib/security/aiSecurity.ts`

## Canonical minimum

```text
AgentDefinition
ModelPolicy
CapabilityDefinition
AgentRun
RunStep
ModelCall
CapabilityCall / ToolOutcome
```

Preserve:

- specialist prompt/persona content,
- max-hop,
- circuit breaker,
- quota/cost gate intent,
- PII/prompt-injection hooks,
- ADK/model adapter know-how.

Retire as authority:

- process-memory runner state,
- parallel agent/model/prompt registries,
- caller-controlled tenant,
- model fallback as success.

## Acceptance

- AgentRun survives/reconciles process restart,
- same trigger retry idempotent,
- model unavailable -> explicit failure/unavailable,
- prompt cannot grant capability,
- run tenant comes from RequestContext/trigger authority,
- quota/capability deny persisted with reason.

---

# 12. PR-08 — Tenant-Private Knowledge / RetrievalEvidence Minimum

**Branch:** `p4/08-knowledge-min`  
**Depends on:** P4-07  
**Risk:** medium-high, privacy/provenance  
**Amaç:** Agent safe loop için optional retrieval'i source-backed and lineage-aware hale getirmek without cross-tenant collective learning complexity.

## Existing seeds

- `apps/web/src/lib/kolektifZeka.ts`
- `apps/web/src/utils/platformZekasiPrompt.ts`
- `apps/web/src/utils/anonimize.ts`
- `apps/web/src/types/kolektifZeka.ts`
- Pinecone retrieval adapter know-how.

## Pilot-4 minimum

```text
KnowledgeSource
KnowledgeChunk
EmbeddingRevision
RetrievalEvidence
```

Use initially tenant-private or explicitly safe platform documentation source.

Vector index is projection.

## Acceptance

- source revision known,
- embedding model/version known,
- duplicate source/chunk identity stable,
- retrieval step persists evidence IDs/scores,
- source deletion/retirement can tombstone/rebuild vector projection,
- raw other-tenant identity cannot appear,
- monetary claims reference Finance/Analytics evidence rather than free-text `gelirEtkisi`.

Cross-tenant collective learning remains later W8/W10 governed rollout.

---

# 13. PR-09 — Agent Safe Capability + OutcomeVerification

**Branch:** `p4/09-safe-capability`  
**Depends on:** P4-05, P4-06, P4-07; P4-08 only if retrieval used  
**Risk:** high  
**Amaç:** Agent'in canonical commerce/finance/analytics evidence okuyup low-risk business action'ı yalnız CapabilityRegistry üzerinden yapmasını kanıtlamak.

## Recommended first capability

Prefer proposal-only capability such as:

```text
campaign.draft.create
```

or equivalent tenant-internal recommendation/draft command.

Explicitly **not** allowed in first safe loop:

```text
campaign.activate
payment/refund
inventory.adjust
order.force_status
credential access
admin/privacy destructive action
```

## Flow

```text
trigger / operator
 -> AgentRun
 -> canonical Commerce/Analytics reads
 -> optional RetrievalEvidence
 -> ModelCall
 -> structured proposal validation
 -> CapabilityCall
 -> W7 CampaignDraft/proposal authority
 -> ToolOutcome
 -> OutcomeVerification
```

## Direct-writer retirement targets

Representative:

- `apps/web/src/lib/agents/marketingAgent.ts`
- `tahsilatAjani.ts`
- `apps/web/src/agents/ReklamAsistaniAgent.ts` direct persistence helper
- generic agent APIs that accept raw `esnafId`
- fake provider outcome paths.

Not all legacy agents must be migrated in this PR; selected canary agent must have zero direct domain/provider permission.

## Acceptance

- agent asks for forbidden capability -> deny,
- model prompt tries to override policy -> deny unchanged,
- proposal persists only through canonical command,
- capability failure -> Agent outcome not success,
- model-generated “campaign active” text cannot create active provider state,
- `agent_logs.basari=true` cannot override ToolOutcome,
- OutcomeVerification references actual command/domain result.

---

# 14. PR-10 — Pilot-4 Canary Cutover / Shadow Authority Hard Gates

**Branch:** `p4/10-canary-cutover`  
**Depends on:** P4-00 through P4-09 accepted  
**Risk:** critical  
**Amaç:** One canary commerce + analytics + agent flow'unda legacy writer/synthetic outcome authority'lerini kapatmak.

## Hard gates

### Commerce

- caller price totals no authority,
- immediate blind stock decrement no authority,
- generic order status mutation no authority,
- raw `shopId` tenant selection no authority.

### Analytics

- order/booking existence no revenue,
- synthetic/demo funnel no production KPI,
- `/api/ads` fake dispatch cannot return production success,
- self-reported ciro remains signal only.

### Agent

- direct Firestore domain write denied for selected agent,
- direct payment/provider credential access denied,
- caller-supplied `esnafId` cannot switch tenant,
- process-memory run/session not authority,
- fallback/mock model result cannot produce business success,
- `agent_logs` not outcome truth.

## Acceptance evidence

### Commerce

- concurrent last-unit reservation,
- client price forgery,
- payment failure release,
- payment success commit,
- refund/reversal handling.

### Analytics

- dedupe,
- financial attribution,
- refunded revenue correction,
- provenance/correlation.

### Agent

- durable restart/retry,
- capability deny,
- model unavailable,
- optional RAG evidence lineage,
- verified low-risk proposal outcome.

### UX

- product/order/storefront management surfaces preserve intended appearance,
- Pilot-3 public site unaffected,
- Kepenk acquisition landing unaffected.

## Rollback

- stop new canary commerce/agent traffic,
- replay projections/jobs,
- route read models to compatibility projections if necessary,
- preserve canonical Order/Payment/Finance/Inventory movement history,
- never restore direct agent writer/provider permissions or fake-success paths.

---

# 15. Review ownership

| PR | Primary review | Secondary review |
|---|---|---|
| P4-00 | Architecture/Data | Security |
| P4-01 | Commerce/DB | Money/unit review |
| P4-02 | Inventory/Concurrency | DB |
| P4-03 | Commerce/DB | Payment boundary |
| P4-04 | Security/API | Browser/storefront |
| P4-05 | Payment/Finance | Inventory/Commerce |
| P4-06 | Analytics/Data | Finance attribution |
| P4-07 | Agent/Security | Reliability |
| P4-08 | Knowledge/Privacy | Agent runtime |
| P4-09 | Security/Agent | Marketing/Domain |
| P4-10 | Independent Security/DB | Independent Browser/Integration |

---

# 16. Pilot-4 definition of done

Pilot-4 is complete when one canary order and one agent run can be independently proven:

```text
Product price source        -> Product revision
Stock promise               -> Inventory reservation
Order total                 -> server OrderPriceSnapshot
Money                       -> Pilot-2 Payment/FinancialEvent
Conversion/revenue          -> canonical Analytics attribution
Agent input                 -> canonical projections/evidence
Agent action                -> allowed CapabilityCall
Claimed success             -> OutcomeVerification
```

> **Pilot-4 başarı ölçütü “AI tavsiye verdi” değildir. AI ne söylerse söylesin stok, para, kampanya veya sipariş gerçeğini kendi başına değiştiremiyorsa; buna rağmen canonical veriyi okuyup izin verilen bir draft/proposal capability'sini başarıyla kullanabiliyorsa ajan sistemi ilk kez güvenli bir çalışan olur.**
