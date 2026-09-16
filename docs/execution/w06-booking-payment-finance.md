# W6 — Booking + Payment + Finance Exact File / Task Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLAN KAPALI — implementation başlamadı  
> **Kaynak:** SÖKÜM 12, 21, 22, 23, 24, 37 + SENTEZ 1–5 + W1–W5  
> **Amaç:** Booking lifecycle/policy, subscription/commerce/restaurant checkout, provider payment outcomes, refund/settlement ve financial ledger gerçeklerini tek Payment Core + immutable Finance Core altında exact file-level migration task'larına ayırmak.  
> **Kural:** Booking, Order, Restaurant Adisyon veya Subscription kendi payment/ledger truth'unu sahiplenmez; bunlar Payment/Finance sonuçlarının projection'larını tutar.

---

# 1. W6 exit contract

W6 sonunda canonical authority'ler:

```text
Booking
BookingPolicySnapshot
BookingPriceSnapshot

PaymentIntent
PaymentAttempt
VerifiedPaymentResult
PaymentAllocation
RefundRequest / RefundAttempt / RefundResult
SettlementRecord
PaymentReconciliationRun

FinancialEvent
LedgerEntry / Posting
Receivable / Revenue / Balance projections
```

Minimum invariants:

1. Bütün para authoritative olarak integer minor-unit, TRY için kuruş tutulur.
2. Client-supplied price/total authoritative ödeme tutarı olamaz.
3. PaymentIntent source snapshot server-side Booking/Order/Subscription/Restaurant state'ten üretilir.
4. Provider success yalnız verified provider result/reconciliation ile oluşur.
5. Provider callback domain document'ını doğrudan `paid/odendi` mutate etmez.
6. Aynı provider result/replay ikinci logical Payment veya ikinci ledger event üretmez.
7. Booking payment alanları projection'dır; policy/price snapshot Booking'e aittir.
8. Order payment alanları projection'dır; commercial order lifecycle Commerce'a aittir.
9. Restaurant item/payment flags projection/allocation'dır; tender truth Payment'tadır.
10. Refund request actual refund değildir.
11. Cancellation policy refund entitlement/fee hesabını etkileyebilir ama provider refund sonucunu yaratmaz.
12. Finance history append-only event/ledger ile düzeltilir; geçmiş mali event mutate edilmez.
13. Revenue booked appointment/order toplamından değil, canonical financial events'ten türetilir.
14. Subscription cancellation, subscription state command'ıdır; payment refund/cancel ile eşit değildir.
15. Payment/Finance canonical cutover sonrası legacy money writers rollback amacıyla yeniden açılmaz.

---

# 2. Booking schema and policy seeds

## W6-BOOK-001 — Booking schema

**Path**

- `packages/booking-schema/src/index.ts`

**Current strengths**

- Service / Staff / Resource / Schedule,
- booking lifecycle + revision,
- customer/service/staff/resource snapshots,
- timezone-aware appointment data,
- cancellation/no-show semantics,
- service pricing,
- deposit amount/type,
- installment/full-pay intent,
- `paymentTiming` vocabulary,
- waitlist/policy models.

**Current authority leak**

Booking also embeds actual payment/refund truth such as:

```text
payment.status
payment.method
transactionId
orderId
depositPaidAt
refundStatus
refundAmount
```

**Disposition:** `PRESERVE BOOKING/POLICY SEMANTICS + SPLIT PAYMENT PROJECTION`

Canonical Booking owns:

```text
BookingPriceSnapshot
BookingPaymentPolicySnapshot
CancellationPolicySnapshot
NoShowPolicySnapshot
PaymentRequirementRef(s)
```

Canonical Payment owns actual attempts/results/refunds.

**Gate:** service price/policy later changes do not mutate historical booking snapshot.

---

## W6-BOOK-002 — Current public booking writer

**Path**

- `apps/web/src/app/api/randevu/route.ts`

**Current strengths**

- Zod validation,
- public feature flag,
- rate limit,
- customer phone normalization,
- past-date guard,
- authenticated owner GET,
- useful notification UX.

**Current limits**

- public body selects `esnafId`,
- service/staff/resource IDs and canonical availability are not required,
- no overlap/availability transaction,
- local `randevular` write does not use booking-schema lifecycle/policy snapshots,
- notification side effects fire-and-forget in request lifetime,
- no booking idempotency key.

**Disposition:** `PRESERVE UX/VALIDATION SEEDS + REWRITE TO BOOKING COMMAND`

Target:

```text
W4 PublicAction binding
 -> RequestBooking / CreateBooking
 -> canonical service/staff/resource/time resolve
 -> availability/overlap guard
 -> policy + price snapshots
 -> Booking commit
 -> W5 CustomerActivity
 -> W3 Outbox notifications
```

**Gate:** duplicate request/idempotency and concurrent slot booking do not create invalid overlaps.

---

## W6-BOOK-003 — Booking payment policy calculator

**Disposition:** `BUILD/PROMOTE PURE DOMAIN FUNCTION`

Input:

```text
service pricing
booking price snapshot
booking payment policy
customer/tenant eligibility
requested timing
```

Output examples:

```text
NO_PAYMENT_REQUIRED
DEPOSIT_REQUIRED(amountKurus, dueAt)
FULL_PREPAY_REQUIRED(amountKurus)
PAY_LATER_ALLOWED
INSTALLMENT_POLICY(...)
```

Pure calculator creates requirements/intents, not provider calls.

---

# 3. Payment Core canonical model

## W6-PAY-001 — PaymentIntent

**Disposition:** `GREENFIELD CANONICAL AUTHORITY`

Minimum:

```text
PaymentIntent {
  paymentIntentId
  tenantId
  payerCustomerId?
  sourceType subscription|booking|order|restaurant|marketplace|manual_receivable
  sourceId
  sourceRevision
  purpose
  currency TRY
  amountKurus
  allocationPlan?
  status CREATED|READY|PROCESSING|SUCCEEDED|PARTIALLY_REFUNDED|REFUNDED|FAILED|CANCELLED
  idempotencyKey
  createdAt/updatedAt
  revision
}
```

Source snapshot is server-derived and immutable for a given intent.

---

## W6-PAY-002 — PaymentAttempt / provider result

**Disposition:** `GREENFIELD`

```text
PaymentAttempt {
  attemptId
  paymentIntentId
  providerConnectionId
  provider
  providerTokenAlias?
  providerPaymentAlias?
  requestedAmountKurus
  status
  startedAt/completedAt?
  failureCode?
}
```

Verified result has unique provider event/result identity and may be generated by callback, retrieve or reconciliation.

---

## W6-PAY-003 — Allocation

Needed for:

- deposit + remainder,
- split restaurant bill,
- partial settlement,
- one payment covering several source lines where explicitly supported.

```text
PaymentAllocation {
  allocationId
  paymentId/resultId
  targetType booking_requirement|order|restaurant_item_set|receivable|subscription
  targetId
  amountKurus
}
```

Allocation does not replace domain lifecycle; it projects settled amount to source domain.

---

# 4. Iyzico provider adapter

## W6-IYZ-001 — `iyzicoClient.ts`

**Path**

- `apps/web/src/lib/iyzicoClient.ts`

**Current strengths**

- real checkout initialize/detail/refund API know-how,
- minor-unit -> provider string conversion,
- installments query,
- provider error mapping,
- PCI-friendly hosted checkout direction,
- refund provider primitive.

**Current authority problems**

- reads raw env credentials directly instead of W3 CredentialRef,
- checkout params can contain caller-provided source/cart/totals,
- writes mutable `odemeler/{token}` state itself,
- result verification both talks to provider and mutates Payment store,
- shop/order identity embedded as local lookup state.

**Disposition:** `PRESERVE PROVIDER PROTOCOL KNOW-HOW + REWRITE AS PURE ADAPTER`

Target provider adapter:

```text
initializeCheckout(PaymentAttemptContext)
retrieveResult(providerToken)
refund(RefundAttemptContext)
queryInstallments(amountKurus, bin)
```

It returns provider facts; Payment repository/command handlers own state.

W3 supplies CredentialRef/provider connection.

---

# 5. Subscription payment flow

## W6-SUB-001 — Legacy package payment create

**Path**

- `apps/web/src/app/api/payment/create/route.ts`

**Current issues**

- human flow guarded by raw admin token,
- body selects `esnafId`, `paket`, installment,
- price comes from `PAKET_FIYATLARI` rather than W2 versioned contract,
- provider SDK initialized directly from env,
- conversation/basket IDs encode tenant/plan assumptions,
- profile fallbacks fill buyer identity/address.

**Disposition:** `REWRITE AS SUBSCRIPTION CHECKOUT ADAPTER`

Target:

```text
verified principal / allowed checkout actor
 -> W2 Subscription/CommercialOrder snapshot
 -> CreatePaymentIntent(server price)
 -> PaymentAttempt
 -> Iyzico adapter
 -> hosted checkout response
```

**Gate:** forged plan/price/esnafId cannot change charged amount or target subscription.

---

## W6-SUB-002 — Legacy package callback

**Path**

- `apps/web/src/app/api/payment/callback/route.ts`

**Current strengths**

- provider retrieve call before treating checkout as success,
- detects activation failure after collected payment,
- records `basarisizSenaryolar` and operator notification.

**Current problems**

- tenant parsed from provider conversationId string,
- plan reread from mutable tenant root,
- callback calls `paketSenaryosuCalistir()` inline,
- Payment result and subscription/provisioning saga are coupled,
- retry/idempotency/reconciliation authority is not explicit.

**Disposition:** `REWRITE TO PAYMENT RESULT + DURABLE DOWNSTREAM EVENT`

Target:

```text
provider callback/token
 -> resolve PaymentAttempt
 -> retrieve/verify provider result
 -> idempotent PaymentSucceeded/Failed
 -> Finance FinancialEvent(s)
 -> W3 outbox event
 -> W2 Subscription activation/change command
 -> ProvisioningRun
```

`basarisizSenaryolar` intent becomes durable failed downstream job/saga state, not ad hoc recovery collection.

Payment success page reflects successful payment, while provisioning status is separately observable.

---

## W6-SUB-003 — Subscription cancellation route

**Path**

- `apps/web/src/app/api/payment/iptal/route.ts`

**Current issue**

- body chooses `esnafId`,
- no verified RequestContext visible,
- mutates `esnaflar.iptalTalebi/iptalTarihi`,
- route name places commercial cancellation under Payment.

**Disposition:** `MOVE SEMANTICS TO W2 SUBSCRIPTION COMMAND`

Target:

```text
RequestContext
 -> RequestSubscriptionCancellation
 -> effective-end policy
 -> audit/outbox
```

Refund, provider mandate cancellation or settlement adjustment is a separate Payment operation only when policy requires it.

---

# 6. Commerce checkout payment boundary

## W6-COM-001 — Checkout initialize

**Path**

- `apps/web/src/app/api/checkout/initialize/route.ts`

**Current strengths**

- structural validation,
- IP rate limit,
- Iyzico hosted checkout.

**Critical authority issue**

Request body contains:

```text
shopId
siparisId
sepetItems with prices
toplamFiyatKurus
kargoUcretiKurus
```

These cannot be authoritative payment totals.

**Disposition:** `ADAPTER TO ORDER-SOURCED PAYMENTINTENT`

Target:

```text
W7 Order(orderId, revision)
 -> server-computed unpaid amount/order payment requirement
 -> PaymentIntent
 -> Iyzico attempt
```

Client may choose allowed installment/payment method, not money truth.

---

## W6-COM-002 — Checkout callback

**Path**

- `apps/web/src/app/api/checkout/callback/route.ts`

**Current behavior**

After `odemeDogrula(token)` success it directly calls:

```text
siparisDurumGuncelle(..., 'odeme_onaylandi', ...)
```

**Disposition:** `REWRITE`

Canonical flow:

```text
VerifiedPaymentResult
 -> PaymentSucceeded
 -> Finance event
 -> OrderPaymentProjectionUpdated / Commerce event adapter
```

Provider callback never directly owns Order lifecycle.

---

# 7. Restaurant payment boundary

## W6-REST-001 — `alman-odeme`

**Path**

- `apps/web/src/app/api/restoran/alman-odeme/route.ts`

**Current strengths**

- minor-unit item/total calculations,
- KDV calculation seed,
- real Iyzico checkout start,
- product UX for pay-first dining.

**Current risks**

- body-selected tenant/table/items/prices can become payment source without canonical Restaurant session/order snapshot,
- placeholder customer identity/address values,
- custom synthetic siparisId.

**Disposition:** `PRESERVE PRODUCT FLOW + REWIRE TO RESTAURANT SOURCE PAYMENTINTENT`

Final Restaurant source authority comes W9.

Target:

```text
Restaurant dining/adisyon source snapshot
 -> PaymentIntent
 -> allocations/item set
 -> provider attempt
```

---

## W6-REST-002 — `alman-odeme-callback`

**Path**

- `apps/web/src/app/api/restoran/alman-odeme-callback/route.ts`

**Critical current behavior**

- trusts callback body `status === 'success'`,
- parses body metadata for tenant/table/items/amount,
- creates paid kitchen adisyon directly,
- does not use canonical provider retrieve/verified PaymentResult in the shown flow.

**Disposition:** `HARD-CUT DIRECT PAYMENT AUTHORITY + ADAPT TO PAYMENT EVENT`

Target:

```text
Iyzico verified result
 -> Payment Core
 -> payment allocation
 -> Restaurant command/event projection
 -> KDS/dining state transition
```

**Gate:** forged callback POST cannot create paid adisyon.

---

## W6-REST-003 — `split-odeme`

**Path**

- `apps/web/src/app/api/restoran/split-odeme/route.ts`

**Critical current behavior**

- marks selected items `odendi: true`,
- records local `odemeler` entry `durum: basarili`,
- no provider payment result is required.

**Disposition:** `REWRITE AS PAYMENT ALLOCATION REQUEST`

Target:

```text
selected unpaid item refs
 -> server recompute amount
 -> PaymentIntent/AllocationPlan
 -> verified payment result
 -> allocation projection marks items settled
```

Restaurant item indices should migrate to stable line IDs before canonical allocation.

---

# 8. Refund lifecycle

## W6-REF-001 — Provider refund primitive

**Path**

- `apps/web/src/lib/iyzicoClient.ts` (`iadeYap`)

**Disposition:** `PRESERVE PROVIDER ADAPTER SEED`

Canonical flow:

```text
RefundRequest
 -> validate refundable amount/policy/source
 -> RefundAttempt
 -> provider adapter
 -> verified RefundResult
 -> Payment status projection
 -> Finance reversal/refund FinancialEvent
 -> source-domain projection
```

### Hard invariants

- refund request != provider success,
- partial refunds have cumulative bounds,
- duplicate refund idempotency,
- cancellation fee and refundable amount use booking/order policy snapshots,
- provider reconciliation can discover refund result after timeout.

---

# 9. Finance Core

## W6-FIN-001 — Accounting transaction types

**Path**

- `packages/accounting/src/types/transaction.ts`

**Strengths**

- TRY minor-unit `amount`,
- KDV amount/rate helpers,
- source links to order/booking,
- expense/revenue categories,
- OCR/recurring concepts.

**Authority issue**

Current `Transaction` is mutable (`updatedAt`) and mixes accounting UI record with canonical financial history.

**Disposition:** `PRESERVE MINOR-UNIT/CATEGORY/SOURCE CONCEPTS + BUILD IMMUTABLE LEDGER`

---

## W6-FIN-002 — Immutable FinancialEvent

**Disposition:** `GREENFIELD CANONICAL AUTHORITY`

Minimum:

```text
FinancialEvent {
  financialEventId
  tenantId
  eventType
  amountKurus
  currency TRY
  occurredAt
  sourceType/sourceId/sourceRevision
  paymentId/refundId?
  causationId/correlationId
  reversalOfEventId?
  metadata/classification version
  createdAt
}
```

Events append only. Corrections use reversal/adjustment event.

---

## W6-FIN-003 — Ledger postings

**Disposition:** `BUILD`

A FinancialEvent deterministically produces postings / ledger entries according to versioned accounting policy.

Required properties:

- balanced postings where double-entry model applies,
- immutable source linkage,
- idempotent financial event -> posting materialization,
- currency/minor-unit invariant,
- projection rebuildability.

Manual expense/receivable input becomes domain command that appends a financial event, not arbitrary mutable balance.

---

## W6-FIN-004 — Manual expense route

**Path**

- `apps/web/src/app/api/finans/gider-ekle/route.ts`

**Current issues**

- raw admin-token guard,
- body chooses tenant,
- stores `tutar` as TL-like number rather than explicit kuruş,
- direct mutable `giderler` collection truth,
- logger message acts as observability only.

**Disposition:** `ADAPTER TO RecordExpense FINANCE COMMAND`

Target:

```text
RequestContext/AdminPrincipal with finance permission
 -> validated amountKurus/category/date
 -> FinancialEvent(EXPENSE_RECORDED)
 -> ledger/projection
```

---

## W6-FIN-005 — Cari/receivable route

**Path**

- `apps/web/src/app/api/finans/cari-hesap-ekle/route.ts`

**Current issues**

- raw admin guard,
- tenant and customer identity supplied directly,
- customer tied to phone string rather than W5 customerId,
- amount is generic number/TL,
- mutable `durum: bekliyor` document is receivable truth.

**Disposition:** `ADAPTER TO RECEIVABLE COMMAND`

Target:

```text
CustomerCore customerId
 + amountKurus + dueDate
 -> ReceivableCreated FinancialEvent/domain record
 -> settlement/payment allocations later clear balance
```

Phone can be display/alias, not receivable identity.

---

## W6-FIN-006 — Bilanco route

**Path**

- `apps/web/src/app/api/finans/bilanco/route.ts`

**Critical current issue**

Revenue is derived from all non-cancelled bookings and their service price/fallback profile price. A booking can therefore count as revenue even if no payment/revenue event occurred.

Expense and receivable totals also come from mutable side collections.

**Disposition:** `PRESERVE REPORT UX/SHAPE + REWIRE TO FINANCE PROJECTIONS`

Target read models:

```text
RevenueProjection
ExpenseProjection
ReceivableProjection
Cash/Settlement projection
Profit/Loss projection
```

**Hard rule:** Booking state or quoted price alone never books revenue.

---

# 10. Payment -> Finance event contract

Examples:

```text
PaymentSucceeded
 -> Cash/ProviderReceivable increase
 -> Receivable/Customer balance decrease or Revenue/DeferredRevenue policy effect

RefundSucceeded
 -> reverse/reclassify relevant revenue/cash/provider receivable effects

Charge/settlement fee
 -> Expense/fee event

ProviderSettlementReceived
 -> provider receivable -> bank/cash transfer event
```

Exact accounting chart/policy can evolve, but provider/payment IDs are source refs, not ledger IDs.

---

# 11. Subscription / Booking / Order / Restaurant projections

Canonical one-way flow:

```text
Payment/Finance truth
   ↓ events/projections
Subscription payment summary
Booking payment summary
Order payment summary
Restaurant item/adisyon settlement summary
```

Legacy fields may temporarily remain for UI compatibility with:

```text
sourceRevision
projectionVersion
projectedAt
```

No bidirectional dual-write.

---

# 12. Reconciliation

## W6-REC-001 — Payment reconciliation worker

**Disposition:** `GREENFIELD ON W3 DURABLE EXECUTION`

Reconcile:

- checkout attempts stuck PROCESSING,
- callback missed but provider paid,
- local success but provider mismatch,
- duplicate provider aliases,
- refunds stuck pending,
- settlement differences,
- amount/currency mismatch.

Reconciliation creates canonical results/events, never silently patches source domain as if original callback ran.

---

# 13. Pricing/source authority rules

### Subscription

Amount from W2 immutable/versioned commercial contract/order snapshot.

### Booking

Amount from BookingPriceSnapshot + payment policy.

### Commerce

Amount from W7 Order price/discount/shipping/tax snapshot.

### Restaurant

Amount from W9 DiningSession/Adisyon stable line snapshots.

### Marketplace later

Amount/escrow requirement from W9 Marketplace award/agreement snapshot.

Client can request a payment method/installment option where allowed, but never authoritative total.

---

# 14. W6 exact task order

```text
T1  Promote Booking schema: split policy/price snapshot from payment projection
T2  Define Booking command lifecycle + revision/availability/idempotency
T3  Rewire `/api/randevu` to Booking command + W3 outbox notifications
T4  Define PaymentIntent/Attempt/VerifiedResult/Allocation contracts
T5  Refactor Iyzico client into credential-aware pure provider adapter
T6  Build Payment repository/command handlers + provider alias/idempotency rules
T7  Rewire subscription payment create to W2 server-priced commercial source
T8  Rewire subscription callback to Payment result + W2 durable downstream event
T9  Move `/payment/iptal` semantics to W2 Subscription cancellation
T10 Rewire commerce checkout initialize to source Order snapshot contract
T11 Rewire commerce callback to Payment event, remove direct Order mutation
T12 Rewire Restaurant alman/split payment to PaymentIntent + Allocation plan
T13 Hard-cut unverified restaurant paid callback behavior
T14 Build Refund lifecycle around provider refund primitive
T15 Define immutable FinancialEvent + posting/ledger contract
T16 Adapt accounting category/minor-unit/source primitives
T17 Rewire manual expense/cari routes to Finance commands + W5 customer IDs
T18 Rewire bilanco/read models to ledger/finance projections
T19 Build payment/refund/settlement reconciliation workers
T20 Backfill legacy payment/accounting records with provenance and conflict reports
T21 Shadow financial projection parity and unexplained-delta monitoring
T22 Disable legacy money writers after zero-delta/caller gates
T23 Payment/finance replay, concurrency, refund and negative-security acceptance suite
```

Parallelization:

- T1–T3 Booking lane can start with W4 public action and W5 customer contracts.
- T4–T6 Payment foundation prerequisite to subscription/commerce/restaurant cutovers.
- T15–T18 Finance lane can develop in parallel after Payment event contract is stable.
- W7 owns final Commerce order price lifecycle; W9 owns final Restaurant operational source snapshots. W6 fixes their money boundary now.

---

# 15. W6 acceptance matrix

| Senaryo | Beklenen |
|---|---|
| Client forges checkout total | ignored/rejected; server source snapshot wins |
| Same PaymentIntent idempotency key twice | one logical intent |
| Same provider callback/result twice | one Payment result + one finance effect |
| Callback lost, provider paid | reconciliation discovers success |
| Provider says failed, client says success | failed |
| Restaurant forged `status: success` callback | cannot create paid adisyon |
| Split bill client alters `toplamKurus` | server recompute from stable source lines |
| Two users pay same restaurant line set concurrently | allocation conflict prevents double-settlement |
| Deposit paid | Booking projection deposit-paid, ledger/payment truth canonical |
| Service price changes after booking | historical BookingPriceSnapshot unchanged |
| Booking cancelled refundable | RefundRequest created per snapshot policy, not instantly `refunded` |
| Refund provider timeout then success | reconciliation creates one RefundResult |
| Partial refunds sum exceeds paid amount | reject |
| Order callback success | no direct Order writer from provider route; projection/event only |
| Subscription payment succeeds, provisioning fails | money remains success; downstream saga retry/operational state visible |
| Subscription cancel request | does not imply refund |
| Manual expense `100.50 TL` | canonical 10050 kuruş event |
| Existing booking but no payment/revenue event | bilanço revenue does not increase |
| Reversal/correction | new event, historical event unchanged |
| Ledger/projector replay | same balances, no duplicate postings |
| Legacy vs canonical shadow projection | unexplained delta within zero/approved migration tolerance before cutover |

---

# 16. Frontend / UX preservation

W6 does not redesign:

- booking public form/module UX,
- payment hosted checkout/result UX,
- dashboard finance/balance/report presentation where useful,
- pricing/public marketing frontend,
- Restaurant split-bill/pay-first UX.

It changes source-of-truth and state transition semantics behind them.

---

# 17. W6 cleanup candidates after gate

### Retire as authority

- Booking embedded actual payment/refund fields as writers,
- mutable `odemeler/{token}` as canonical payment history,
- provider callback direct Order/Booking/Restaurant writes,
- Restaurant `split-odeme` local fake success,
- unverified restaurant payment callback,
- `giderler` / `cariHesaplar` mutable documents as sole financial history,
- booked appointment price as revenue truth,
- raw package price constants as subscription charge authority,
- payment route raw admin auth/body tenant targeting.

### Preserve

- Booking schema/service/staff/resource/policy/payment-requirement semantics,
- minor-unit/kuruş direction,
- accounting categories/KDV/source links,
- Iyzico checkout/installment/refund provider know-how,
- Restaurant split/pay-first product UX,
- operational detection of “payment succeeded but downstream provisioning failed”,
- finance dashboard/read-model UX.

---

# 18. W6 final verdict

> **Kepenk'te ödeme kodu gerçek provider entegrasyonu ve güçlü ürün davranışları içeriyor, fakat payment truth subscription, commerce, restaurant ve mutable accounting state içine dağılmış. W6 bu emeği atmaz. Booking policy/snapshot, Iyzico adapter, split-pay UX, accounting category/minor-unit primitive'lerini korur; actual money truth'u tek Payment Core ve immutable Finance Ledger'a taşır.**
