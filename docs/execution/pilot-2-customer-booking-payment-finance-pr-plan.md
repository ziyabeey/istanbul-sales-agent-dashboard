# Pilot-2 — Customer + Booking + Payment + Finance Golden Flow PR Plan

> **Tarih:** 2026-09-16  
> **Durum:** IMPLEMENTATION-READY PLAN — kod implementasyonu başlamadı  
> **Kaynak:** `w05-customer-messaging-support-foundation.md`, `w06-booking-payment-finance.md`, Pilot-0/1 plans, `pilot-cutover-packaging.md`  
> **Amaç:** İlk gerçek end-to-end money-bearing flow'u tek canary tenant üzerinde canonical authority'lerden geçirmek.  
> **Scope discipline:** İlk golden path yalnız `Customer -> Booking -> Payment -> FinancialEvent` zinciridir. Public site binding, Commerce, Restaurant ve Subscription checkout bu pilotun dışında kalır.

---

# 1. Pilot-2 golden path

```text
Verified Canary Tenant / RequestContext
        ↓
Customer / IdentityAlias
        ↓
Booking command
        ↓
Service + Price + Policy snapshot
        ↓
PaymentRequirement
        ↓
PaymentIntent
        ↓
PaymentAttempt / Iyzico
        ↓
VerifiedPaymentResult
        ↓
PaymentAllocation -> Booking payment projection
        ↓
FinancialEvent / Ledger
        ↓
CustomerActivity + finance/booking read projections
```

Initial scope:

```text
1 tenant
1 customer identity
1 service booking
1 explicit timezone (Europe/Istanbul for canary unless tenant config says otherwise)
TRY only
integer kuruş only
1 provider connection / Iyzico adapter
1 deposit/full-pay subset chosen explicitly
```

Not in Pilot-2:

- public hostname/action binding,
- multi-service/group booking,
- Commerce checkout,
- Restaurant split/pay-first,
- Marketplace escrow,
- subscription/package checkout migration,
- broad CRM UI migration.

---

# 2. Exit invariants

1. Customer primary ID phone/email değildir.
2. Booking historical service/price/policy snapshot sonradan değişmez.
3. Booking actual payment/refund truth sahibi değildir.
4. PaymentIntent amount server-side snapshot'tan gelir.
5. Bütün authoritative money integer kuruştur.
6. Provider success yalnız verified provider result/reconciliation ile oluşur.
7. Duplicate callback/result ikinci logical payment veya ledger effect üretmez.
8. Booking paid/deposit projection yalnız PaymentAllocation/verified result'tan türetilir.
9. Finance immutable FinancialEvent/Ledger authority'sidir.
10. Booking varlığı veya booking price revenue değildir.
11. RefundRequest actual refund değildir.
12. Software rollback historical financial event silmez/değiştirmez.
13. CustomerActivity committed domain event'ten üretilir.
14. Canonical golden path model/provider fake success kabul etmez.

---

# 3. Branch / PR graph

```text
p2/00-golden-flow-baseline
          ├──────────────┬───────────────────────┐
          ↓              ↓                       ↓
p2/01-customer-core  p2/02-booking-core   p2/03-payment-core
          │              │                       ├──────────────┐
          │              │                       ↓              ↓
          │              │                p2/04-iyzico     p2/05-finance-ledger
          └──────────────┴───────────────┬───────┴──────────────┘
                                          ↓
                                  p2/06-golden-orchestration
                                          ↓
                                  p2/07-refund-reconciliation
                                          ↓
                                  p2/08-shadow-projections
                                          ↓
                                  p2/09-canary-cutover
```

Parallelization:

- P2-01, P2-02 and P2-03 can develop after P2-00 with stable cross-contract refs.
- P2-04 depends on PaymentAttempt/VerifiedResult contract from P2-03 and Pilot-0 CredentialRef.
- P2-05 can develop once Payment/Financial event boundary is frozen.
- P2-06 is first true end-to-end integration PR.
- P2-09 merges only after refund/reconciliation and shadow parity evidence.

---

# 4. PR-00 — Golden Flow Baseline / Data Inventory / Test Fixtures

**Branch:** `p2/00-golden-flow-baseline`  
**Depends on:** Pilot-0 + Pilot-1 accepted  
**Risk:** low/additive  
**Amaç:** İlk financial canary'den önce exact source records, units, identities and expected outcomes sabitlemek.

## Current sources to inventory

- `packages/crm-schema/src/contact.ts`
- `packages/crm-schema/src/crm-entities.ts`
- `apps/web/src/lib/musteriCRM.ts`
- `packages/booking-schema/src/index.ts`
- `apps/web/src/app/api/randevu/route.ts`
- `apps/web/src/lib/iyzicoClient.ts`
- `packages/accounting/src/types/transaction.ts`
- existing `randevular`, `odemeler`, `giderler/cari` and related projection collections used by current code.

## DataClassPolicy additions

Register before canary writes:

```text
Customer
CustomerIdentityAlias
CustomerActivity
Booking
BookingPriceSnapshot
BookingPolicySnapshot
PaymentIntent
PaymentAttempt
VerifiedPaymentResult
PaymentAllocation
RefundRequest/Attempt/Result
FinancialEvent
LedgerEntry/Posting
Payment/Booking/Finance read projections
ReconciliationRun
```

## Fixture set

- one Fixture Tenant from Pilot-1,
- one Canary Tenant,
- one deterministic customer,
- one service with explicit duration + priceKurus,
- one booking policy,
- one payment policy,
- provider sandbox/test fixture and explicit real-canary switch,
- expected ledger postings/projection examples.

## Merge gate

- current legacy money unit assumptions documented,
- no `TL number` ambiguity in canonical fixtures,
- expected duplicate/retry/refund cases enumerated,
- no writer cutover yet.

---

# 5. PR-01 — Customer Core Minimum

**Branch:** `p2/01-customer-core`  
**Depends on:** P2-00  
**Risk:** medium  
**Amaç:** Golden flow için stable tenant-scoped Customer + identity alias authority kurmak.

## Existing seeds

- `packages/crm-schema/src/contact.ts`
- `packages/crm-schema/src/crm-entities.ts`
- `apps/web/src/lib/musteriCRM.ts` as migration source only

## Canonical minimum

```text
Customer {
  customerId
  tenantId
  revision
  display/profile fields required by booking
  createdAt/updatedAt
}

CustomerIdentityAlias {
  aliasId
  tenantId
  customerId
  type phone|email|external
  normalizedValue / provider alias
  verifiedAt?
  source
  status
}

CustomerActivity {
  activityId
  tenantId
  customerId
  type
  sourceType/sourceId
  occurredAt
  typed payload/version
}
```

## Commands needed for Pilot-2

```text
CreateCustomer
AttachIdentityAlias
ResolveCustomerByAlias
RecordCustomerActivity
```

Full segment/RFM/merge UX can wait.

## Migration rule

Legacy phone-derived `musteriProfiller` ID may map to canonical Customer but phone-derived ID never remains primary authority.

## Acceptance

- same normalized phone within tenant resolves deterministically,
- same phone in different tenant does not cross-merge,
- alias retry idempotent,
- Customer revision works,
- legacy source can be backfilled without becoming second writer,
- sensitive identity values are classified per DataClassPolicy.

## Rollback

Additive before golden orchestration. Legacy CRM helper may remain for non-canary flows; canary golden flow uses canonical Customer.

---

# 6. PR-02 — Booking Core / Snapshot Authority

**Branch:** `p2/02-booking-core`  
**Depends on:** P2-00  
**Risk:** high, availability/lifecycle  
**Amaç:** Payment'tan bağımsız canonical Booking state ve immutable service/price/policy snapshots kurmak.

## Existing seeds

- `packages/booking-schema/src/index.ts`
- `apps/web/src/app/api/randevu/route.ts` validation/product behavior seed

## Canonical minimum

```text
Booking
BookingServiceSnapshot
BookingPriceSnapshot
BookingPaymentPolicySnapshot
CancellationPolicySnapshot
PaymentRequirementRef
```

Required command subset:

```text
CreateBooking
CancelBooking (policy result only, no refund success)
GetBooking
```

## Booking creation invariants

- canonical service/source revision resolved server-side,
- duration/timezone explicit,
- priceKurus server-derived,
- availability/overlap check transactional/idempotent,
- customerId from P2-01,
- payment requirement calculated by pure policy function.

## Public route boundary

Pilot-2 does **not** require public `/api/randevu` tenant binding cutover. Golden flow may be invoked through controlled server-side acceptance harness or authenticated canary command path. Public action binding waits Pilot-3.

No temporary unauthenticated pilot endpoint is introduced.

## Acceptance

- duplicate booking idempotency key -> one booking,
- concurrent same slot -> policy-consistent single/allowed outcome,
- past slot deny,
- service price change after create leaves snapshot unchanged,
- timezone explicit,
- Booking cannot self-write actual paid/refunded status.

## Rollback

Canonical Booking can be disabled for canary before financial cutover; committed canonical bookings remain immutable history and are not rewritten from legacy state.

---

# 7. PR-03 — Payment Core / Idempotency Foundation

**Branch:** `p2/03-payment-core`  
**Depends on:** P2-00  
**Risk:** critical, money truth  
**Amaç:** Provider-independent PaymentIntent/Attempt/VerifiedResult/Allocation authority kurmak.

## Canonical minimum

```text
PaymentIntent
PaymentAttempt
VerifiedPaymentResult
PaymentAllocation
ProviderAlias uniqueness
IdempotencyKey
```

PaymentIntent source:

```text
sourceType=booking
sourceId
sourceRevision
amountKurus
currency=TRY
purpose
idempotencyKey
```

## Required commands

```text
CreatePaymentIntentFromBookingRequirement
StartPaymentAttempt
RecordVerifiedPaymentResult
AllocatePayment
MarkAttemptFailed
```

## Hard invariants

- client amount ignored as authority,
- same intent idempotency key -> one logical intent,
- provider payment/result alias unique,
- result replay -> same outcome,
- `SUCCEEDED` impossible without verified result,
- allocation sum cannot exceed verified settled amount.

## Acceptance

Concurrency, replay and provider-alias tests must be repository/integration level, not only unit mocks.

## Rollback

Before provider cutover, additive. After canonical success is recorded, software rollback cannot delete/downgrade payment truth.

---

# 8. PR-04 — Iyzico Pure Adapter + CredentialRef

**Branch:** `p2/04-iyzico`  
**Depends on:** P2-03 + Pilot-0 CredentialRef/Resolver  
**Risk:** critical, external payment provider  
**Amaç:** `iyzicoClient.ts` protocol know-how'ı koruyup state/business authority'den ayırmak.

## Existing path

- `apps/web/src/lib/iyzicoClient.ts`

## Adapter responsibility only

```text
initializeCheckout(PaymentAttemptContext)
retrieveResult(providerToken/alias)
refund(RefundAttemptContext)
queryInstallments(...)
```

Adapter must not:

- choose tenant/source from caller body,
- write canonical Payment state itself,
- mutate Booking,
- own credential storage,
- interpret provider call success as business revenue.

## Required integration

- providerConnectionId / CredentialRef from Pilot-0/W3 seam,
- amount conversion from integer kuruş,
- provider request/response alias mapping,
- timeout/error taxonomy.

## Acceptance

- missing credential fail-closed,
- wrong environment/provider config explicit degraded failure,
- retrieve result verifies amount/currency/source correlation,
- provider 5xx/network failure does not create success,
- adapter retry does not duplicate Payment state.

## Rollback

Old provider code can remain behind non-canary compatibility adapter until P2-09. New canonical payment records cannot be rewritten by old adapter.

---

# 9. PR-05 — Immutable Finance Ledger Minimum

**Branch:** `p2/05-finance-ledger`  
**Depends on:** P2-03 event contract stable  
**Risk:** critical, financial history  
**Amaç:** Payment success/refund outcomes için immutable FinancialEvent + deterministic posting/projection spine kurmak.

## Existing seed

- `packages/accounting/src/types/transaction.ts`

Preserve:

- TRY minor-unit direction,
- category/KDV vocabulary,
- source links.

Do not preserve mutable transaction history as canonical ledger.

## Canonical minimum

```text
FinancialEvent {
  financialEventId
  tenantId
  eventType
  amountKurus
  currency
  sourceType/sourceId/sourceRevision
  paymentResultId?
  causationId/correlationId
  occurredAt
}

LedgerEntry / Posting
```

Pilot-2 event subset:

```text
PAYMENT_SUCCEEDED / CASH_RECEIVED or equivalent accounting policy
REFUND_SUCCEEDED / reversal
provider fee only if verified/source available in pilot
```

## Acceptance

- same Payment result -> one FinancialEvent,
- projector replay -> identical balance/read model,
- historical event immutable,
- correction/refund creates new event,
- Booking without financial event contributes zero recognized revenue,
- 100.50 TL canonicalized as 10050 kuruş.

## Rollback

Ledger truth is never rolled back by deletion/mutation. Software rollback preserves committed events; corrective event used for business correction.

---

# 10. PR-06 — Golden Orchestration: Booking -> Payment -> Finance

**Branch:** `p2/06-golden-orchestration`  
**Depends on:** P2-01, P2-02, P2-03, P2-04, P2-05  
**Risk:** critical, first end-to-end money flow  
**Amaç:** Controlled canary invocation ile ilk canonical business transaction'ı tamamlamak.

## Flow

```text
resolve/create Customer
 -> CreateBooking
 -> Booking payment requirement
 -> CreatePaymentIntent
 -> StartPaymentAttempt(Iyzico)
 -> hosted/provider flow
 -> callback/retrieve enters Payment boundary
 -> RecordVerifiedPaymentResult
 -> PaymentAllocation to Booking requirement
 -> append FinancialEvent
 -> update Booking payment projection
 -> RecordCustomerActivity
```

## Durable/outbox rule

Provider callback request thread should not inline every downstream side effect. Payment truth commits once, then W3 durable event/outbox drives allocation/finance/projection where transaction boundary requires separation.

## Acceptance

- provider success + downstream projector temporary failure: Payment remains success and job retries,
- duplicate callback: one PaymentResult/FinancialEvent,
- provider failure: no paid/revenue projection,
- payment amount exactly equals BookingRequirement amountKurus,
- customer timeline references canonical customer/booking/payment sources,
- operator can distinguish payment success from projection lag/failure.

## Rollback

Traffic/cohort routing can stop new canonical attempts. Already verified payment/ledger truth is preserved and downstream can be replayed.

---

# 11. PR-07 — Refund + Reconciliation Safety

**Branch:** `p2/07-refund-reconciliation`  
**Depends on:** P2-06  
**Risk:** critical  
**Amaç:** Timeout/callback loss/refund gibi gerçek para edge-case'lerini çözmeden canary authority'yi genişletmemek.

## Canonical minimum

```text
RefundRequest
RefundAttempt
RefundResult
PaymentReconciliationRun
```

## Refund flow

```text
Booking cancellation policy snapshot
 -> calculate refundable amount
 -> RefundRequest
 -> RefundAttempt
 -> Iyzico adapter
 -> verified RefundResult
 -> Payment projection
 -> FinancialEvent reversal/refund
 -> Booking payment projection
```

Cancellation itself does not mean refunded.

## Reconciliation minimum

Detect:

- PROCESSING attempt stuck,
- callback missed but provider paid,
- provider/local amount mismatch,
- duplicate provider alias,
- refund pending/timeout,
- local success vs provider mismatch.

## Acceptance

- callback loss discovered by reconciliation,
- partial refund cumulative amount cannot exceed settled amount,
- duplicate refund idempotent,
- timeout then provider success -> one RefundResult,
- reconciliation never silently patches Booking as source truth,
- refund creates new finance event; old event unchanged.

## Rollback

Reconciliation may be paused, but existing Payment/Finance truth remains. Manual correction uses explicit canonical command/event, not direct document mutation.

---

# 12. PR-08 — Legacy Backfill / Projections / Shadow Parity

**Branch:** `p2/08-shadow-projections`  
**Depends on:** P2-06 + P2-07  
**Risk:** high, migration/reconciliation  
**Amaç:** Canonical canary results ile current Booking/payment/finance UI expectations arasında one-way projection/parity kurmak.

## Legacy/projection targets

- current booking payment summary fields used by UI,
- legacy `randevular` read shape where canary compatibility requires,
- legacy payment/read-model collections where display callers remain,
- finance/balance/report projections used by existing dashboard.

## Strict rule

```text
Payment/Finance canonical -> legacy/read projection
```

Never:

```text
legacy paid field -> canonical Payment success
legacy balance -> canonical ledger mutation
```

## Backfill rules

Historical legacy records receive provenance/conflict classification. Ambiguous paid/revenue state is not guessed into immutable canonical truth.

## Shadow metrics

```text
booking count parity
payment settled amount parity
recognized revenue parity
projection lag
unexplained delta
idempotency/replay delta
```

## Acceptance

- canonical projector rebuild deterministic,
- unexplained financial delta zero or explicitly approved/migration-explained before cutover,
- existing canary finance/booking UX renders from projection,
- manual mutation of legacy paid field cannot create financial event.

## Rollback

Reader can fall back to legacy projection display, but canonical money writer remains authoritative for canonicalized canary transactions.

---

# 13. PR-09 — Canary Cutover + Financial Hard Gates

**Branch:** `p2/09-canary-cutover`  
**Depends on:** P2-00 through P2-08 exact-head accepted  
**Risk:** critical, one-way money authority cut  
**Amaç:** Canary golden-flow için legacy money writers'ı authority olmaktan çıkarmak ve acceptance evidence pack'i kilitlemek.

## Canary hard gates

For canonical canary Booking flow:

- Booking embedded actual `paid/refunded` fields are projection-only,
- provider callback cannot directly mutate Booking,
- `odemeler/{token}` or equivalent legacy state cannot be source truth,
- client/requested amount cannot override PaymentIntent,
- fake/simulated provider success cannot satisfy PaymentIntent,
- booked appointment price cannot increase revenue,
- finance correction cannot mutate historical event,
- refund request cannot mark refund succeeded.

## Public route boundary

Pilot-2 does not globally cut over public `/api/randevu` tenant targeting. Public source binding is Pilot-3.

If `/api/randevu` is used for canary acceptance, it must go through a secure controlled/canonical server binding, not caller-supplied tenant authority. No temporary insecure exception.

## Acceptance evidence pack

### Customer

- alias normalization,
- tenant isolation,
- duplicate attach/idempotency.

### Booking

- duplicate create,
- concurrent slot conflict,
- timezone,
- immutable snapshots.

### Payment

- forged amount,
- duplicate intent,
- duplicate callback,
- failed provider,
- missing callback/reconciliation success,
- amount/currency mismatch.

### Finance

- one payment -> one financial effect,
- replay deterministic,
- refund/reversal append-only,
- no booking-without-payment revenue.

### End-to-end

```text
Customer
 -> Booking
 -> Iyzico verified payment
 -> Allocation
 -> FinancialEvent
 -> Booking/Finance projection
 -> CustomerActivity
```

with correlation IDs visible end-to-end.

## Merge gate

1. all P2 predecessor exact-head tests green,
2. provider sandbox/test acceptance green,
3. explicit real-canary procedure documented before real charge,
4. duplicate/replay/refund/reconciliation matrix green,
5. financial shadow delta zero/approved migration exception only,
6. no public/frontend redesign,
7. rollback/replay tested,
8. independent security/database review,
9. independent browser/integration acceptance for affected current UX,
10. legacy financial writers have telemetry and zero intended traffic for canary path.

## Rollback

Money hard-cuts are one-way for canonicalized transactions.

Rollback may:

- stop new canary traffic,
- route future booking creation back to a verified compatibility path,
- replay projection/outbox,
- disable provider initiation.

Rollback may not:

- delete Payment/FinancialEvent truth,
- reconstruct payment success from legacy flags,
- reopen fake provider success,
- mutate historical ledger entries.

---

# 14. Review ownership

| PR | Primary review | Secondary review |
|---|---|---|
| P2-00 | DB/Data | Privacy/Architecture |
| P2-01 | DB/Security | Customer domain |
| P2-02 | Booking/DB | Concurrency/Timezone |
| P2-03 | Payment/Security | DB/Idempotency |
| P2-04 | Payment Integration/Security | Credential/Provider |
| P2-05 | Finance/DB | Accounting policy |
| P2-06 | Integration | Payment + Booking + Finance independent reviewer |
| P2-07 | Payment/Finance | Reliability/Reconciliation |
| P2-08 | Migration/DB | Finance reconciliation |
| P2-09 | Independent Security/DB acceptance | Independent Browser/Integration acceptance |

Implementer self-approval is insufficient for P2-09.

---

# 15. Frontend preservation

Pilot-2 does not redesign:

- current booking UX,
- payment hosted checkout/result UX,
- finance/dashboard presentation where useful,
- Kepenk public marketing landing,
- PricingCards.

The primary changes are source-of-truth, correlation, error states and authoritative success semantics.

---

# 16. Pilot-2 definition of done

Pilot-2 is complete when one canary transaction can be proven from source to ledger without consulting a mutable legacy success flag:

```text
Who is the customer?        -> Customer Core
What was booked?            -> Booking snapshot
What amount was required?   -> BookingPaymentRequirement
Was money actually paid?    -> VerifiedPaymentResult
What did the payment settle?-> PaymentAllocation
What financial effect exists? -> FinancialEvent/Ledger
What does UI show?          -> one-way projections
```

> **Pilot-2 başarı ölçütü “ödeme ekranı çalışıyor” değildir. Aynı provider callback on kere gelse bile bir ödeme, bir allocation ve bir mali etki oluşuyorsa; callback hiç gelmezse reconciliation gerçeği bulabiliyorsa; booking fiyatı tek başına ciro olamıyorsa para omurgası kurulmuştur.**
