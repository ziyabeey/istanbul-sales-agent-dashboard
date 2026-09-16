# Kepenk v2 — Implementation Readiness / Pilot Cutover Packaging

> **Tarih:** 2026-09-16  
> **Durum:** PLAN KAPALI — production implementation başlamadı  
> **Kaynak:** `docs/execution/w01-*` → `w10-*`  
> **Amaç:** W1–W10 exact task'larını küçük, geri alınabilir ve kanıtlanabilir uygulama paketlerine bölmek.  
> **Kural:** Bu belge implementation değildir. Yeni mimari icat etmez; mevcut manifestleri cutover sırasına dizer.

---

# 1. Cutover strategy

Kepenk v2 big-bang rewrite yapılmayacaktır.

Her authority migration'ı aynı genel deseni izler:

```text
1. EXPAND
   canonical schema/runtime ekle

2. BACKFILL
   seçili legacy state'i canonical modele taşı

3. SHADOW READ
   legacy ve canonical projection'ı karşılaştır

4. CANONICAL WRITE
   canary için writer'ı canonical authority'ye çevir

5. LEGACY PROJECTION
   gerekiyorsa canonical -> legacy tek yönlü compatibility projection

6. CANARY READ
   canary reader'larını canonical projection'a geçir

7. OBSERVE
   parity / error / latency / reconciliation penceresi

8. BROADEN
   tenant cohort'larını kademeli genişlet

9. WRITE DENY
   legacy writer permission/path kapat

10. RETIRE
    W10 retirement gate sonrası archive/delete
```

### Kesin kural

```text
canonical write -> legacy projection
```

geçici olarak mümkündür.

```text
canonical write <-> legacy write
```

çift yönlü dual-authority yasaktır.

---

# 2. Pilot environment / tenant classes

Implementation başlamadan üç tenant sınıfı tanımlanmalıdır.

## A. Fixture Tenant

Amaç:
- deterministic test data,
- migration dry-run,
- destructive/replay/failure testleri.

Gerçek müşteri veya production provider resource kullanmaz.

## B. Canary Tenant

Amaç:
- gerçek uygulama flow'larını canonical authority'de sınırlı açmak,
- legacy projection parity ölçmek.

Özellik:
- explicit allowlist,
- rollback-ready,
- provider resource scope dar,
- telemetry yüksek.

## C. General Cohort

Canary acceptance geçmeden açılmaz.

Percentage rollout veya tenant allowlist W10 FeatureFlag/ReleasePolicy üzerinden yönetilir; entitlement yerine geçmez.

---

# 3. Pilot-0 — Trust Bootstrap

## Goal

Business behavior değiştirmeden canonical trust ve durable execution tabanını ayağa kaldırmak.

### Included manifests

- W1 Trust Spine
- W3 Durable Execution / Service Identity / Credential foundation
- W10 AdminPrincipal/Audit foundation

### Build slice

```text
User
Membership
Session
RequestContext
AdminPrincipal/AdminSession
ServicePrincipal
CredentialRef/Resolver minimal
DurableJob minimal
AdminActionRequested/Outcome minimal
```

### Exact migration focus

- `apps/web/src/lib/sessionManager.ts`
- `/api/auth/*` current login/logout/me adapters
- `apps/web/src/proxy.ts`
- `apps/web/src/lib/apiGuard.ts`
- `apps/web/src/app/api/admin/login/route.ts`
- worker/cron service-auth entrypoints
- `apps/web/src/lib/cloudTasksClient.ts`
- `apps/web/src/lib/tokenSifreleme.ts`

### Preserve

- `/giris` UX,
- existing auth visual flows,
- signed JWT/fail-closed secret primitives,
- security headers/rate-limit intent,
- Cloud Tasks provider knowledge,
- AES-GCM primitive.

### Pilot-0 cutover steps

```text
P0.1 create canonical identity/session records
P0.2 issue canonical session alongside legacy compatibility cookie if required
P0.3 shadow-verify both contexts on fixture/canary
P0.4 switch dashboard server authorization to RequestContext
P0.5 switch worker auth to ServicePrincipal/OIDC path
P0.6 switch admin login to AdminPrincipal/AdminSession
P0.7 add durable audit request/outcome for high-risk admin calls
P0.8 revoke old normal-use shared secret paths
```

### Immediate security correctness checkpoints

Replacement/deny behavior hazır olduğunda:

- fixed OTP `123456` disabled,
- production dev-login disabled,
- raw `ADMIN_SECRET_TOKEN` normal admin authorization disabled,
- dashboard cookie-existence trust disabled,
- literal A2A bearer disabled when W8 adapter later lands,
- fake privacy cron success endpoints at minimum return disabled/not-authoritative rather than false success.

### Acceptance

- phone/Google login works through preserved `/giris` UX,
- revoked session cannot be replayed,
- suspended Membership cannot use old valid token,
- request body cannot switch tenant,
- proxy and API resolve same RequestContext,
- AdminSession accepted consistently by proxy/API,
- old raw admin secret no longer grants normal access,
- service job identifies caller/audience,
- credential missing in production fails closed,
- high-risk admin request cannot execute without durable audit request record.

### Rollback

Rollback may restore reader routing to legacy auth adapter only if:
- canonical session issuance remains intact,
- no revoked/suspended principal is re-authorized,
- hard-cut dev/fixed bypass is NOT restored.

Security hard-cuts are one-way.

---

# 4. Pilot-1 — First Canonical Tenant

## Goal

Tek canary tenant için `esnaflar/{id}` monolit authority'sini parçalamak, mevcut UI'ları compatibility projection ile bozmamak.

### Included manifests

- W2 Tenant + Business + Commercial
- W10 Data Inventory registration foundation

### Canonical slice

```text
BusinessTenant
BusinessProfile
Subscription/Contract
PlanCatalog
EntitlementGrant
CapabilityPreference
EffectiveCapabilitySet
UsageCredit/QuotaPolicy
OnboardingRun/ProvisioningRun minimal
```

### Legacy source

- `esnaflar/{id}`
- onboarding complete
- esnaf self-service GET/PATCH
- admin tenant read views
- module/plan/package projections

### Pilot-1 cutover

```text
P1.1 create canonical records for Fixture Tenant
P1.2 deterministic backfill mapping report
P1.3 backfill Canary Tenant
P1.4 shadow compare legacy root vs canonical projections
P1.5 route canary profile writes to BusinessProfile
P1.6 route canary lifecycle writes to BusinessTenant commands
P1.7 route commercial plan/entitlement reads to canonical projection
P1.8 emit one-way legacy `esnaflar` projection for untouched readers
P1.9 convert admin status/plan actions to command gateway for canary
P1.10 observe parity before cohort expansion
```

### Data lifecycle requirement

Every new canonical store is registered in W10 DataClassPolicy before production canary write.

### Acceptance

- one business identity maps to one BusinessTenant,
- plan label cannot directly grant capability,
- active/suspended transition is revisioned command,
- profile update cannot mutate subscription/lifecycle,
- effective capabilities equal subscription + grants + preferences + operational policy,
- legacy dashboard still renders correctly from projection,
- canary root field manual mutation cannot become canonical truth,
- restart does not lose onboarding/provisioning progress.

### Rollback

Reader can fall back to legacy projection during pilot. Writer must not fall back to creating new dual-authority state once canonical writer is enabled for that entity class.

---

# 5. Pilot-2 — Customer + Booking + Payment + Finance Golden Flow

## Goal

İlk gerçek end-to-end business transaction'ı canonical authority'lerden geçirmek:

```text
Customer
 -> Booking
 -> Payment
 -> FinancialEvent
 -> customer/booking/payment projections
```

Public site zorunlu değildir; önce authenticated/internal controlled entry ile doğrulanabilir.

### Included manifests

- W5 Customer Core minimum
- W6 Booking / Payment / Finance
- W3 provider connection/payment credential pieces

### Canonical slice

```text
Customer + IdentityAlias
CustomerActivity
BookingService snapshot
Booking
PaymentPolicySnapshot
PaymentIntent
PaymentAttempt
VerifiedPaymentResult
PaymentAllocation
FinancialEvent / Ledger
```

### Pilot-2 scope discipline

First golden path:

```text
single business
single TRY currency
single service booking
Europe/Istanbul
single payment provider adapter
single full/deposit policy subset
```

Multi-service/group/complex vertical behavior waits for later parity unless already needed by the selected path.

### Pilot-2 cutover

```text
P2.1 backfill one canary customer identity
P2.2 route new canary booking command to Booking Core
P2.3 snapshot service revision/price/policy/timezone
P2.4 create PaymentIntent from Booking policy
P2.5 execute provider attempt through W3 credential/integration path
P2.6 verify provider callback/result idempotently
P2.7 allocate payment to Booking
P2.8 append immutable FinancialEvent
P2.9 update read projections
P2.10 emit W5 CustomerActivity from committed domain events
```

### Hard-cut checkpoint after parity

For canary/cohort:
- Booking document cannot self-declare actual paid/refunded state,
- restaurant/order direct `odendi` patterns do not apply to this flow,
- provider fake/simulated success cannot satisfy PaymentIntent,
- finance revenue cannot be derived from booking existence/price alone.

### Acceptance

- duplicate booking request -> one booking effect,
- duplicate payment callback -> one payment/ledger effect,
- provider failure -> no paid projection,
- deposit amount minor-unit exact,
- refund request != refund succeeded,
- ledger append-only,
- customer activity links to canonical customer id,
- service price later changes do not alter historical booking snapshot,
- all times resolve with explicit tenant timezone.

### Financial rollback

Financial events are never deleted/rewritten to rollback software. Corrective reversal/refund events are used. Software rollback must preserve already verified payment/ledger truth.

---

# 6. Pilot-3 — Public Site + Public Action + Messaging

## Goal

Kepenk'in en görünür customer-facing zincirini canonicalize etmek while preserving current site/editor UX.

```text
Editor Draft
 -> Publish
 -> DomainBinding
 -> Public Site
 -> Contact/Booking Action
 -> Customer/Booking
 -> MessageIntent
 -> Provider outcome
```

### Included manifests

- W4 Site / Asset / Publish / Public Action
- W5 Messaging
- W3 IntegrationConnection for first messaging provider
- Pilot-2 Customer/Booking reuse

### Canonical slice

```text
SiteDraft
SiteManifest/Page/Master docs
AssetRecord minimal
PublishedSiteRevision
DomainBinding
PublicCapabilityManifest
PublicActionRequest
Conversation/Message/MessageIntent
IntegrationConnection + ProviderResourceBinding
```

### Pilot-3 cutover

```text
P3.1 migrate Canary Site draft without touching active legacy public pointer
P3.2 validate/hash page/master/assets
P3.3 generate immutable publish artifacts
P3.4 activate PublishedSiteRevision pointer atomically
P3.5 point one Canary DomainBinding to canonical revision
P3.6 serve canary hostname from canonical artifact in `apps/sites`
P3.7 bind contact/booking action IDs to published revision
P3.8 resolve tenant server-side from DomainBinding/action manifest
P3.9 create Customer/Booking command through W5/W6
P3.10 create confirmation MessageIntent
P3.11 deliver via one verified Twilio/other connection
P3.12 reconcile delivery outcome
```

### Hard-cut checkpoint after parity

- editor autosave cannot mutate active public site,
- live Booking/Contact/Order modules cannot show local-only fake success,
- request body cannot choose tenant,
- duplicate WhatsApp/Instagram webhook paths not used for canary connection,
- provider signature verification required,
- webhook event durable inbox before ACK semantics.

### Acceptance

- autosave changes preview/draft only,
- publish failure leaves old active revision intact,
- rollback restores exact page + asset bytes,
- unknown host does not silently become another tenant/landing truth,
- same public submit retry creates one domain effect,
- public tenant target derived from domain/revision/action,
- invalid provider signature creates no message/domain effect,
- provider retry dedupes,
- UI success only after authoritative command commit.

### Rollback

DomainBinding active pointer can revert to previous proven published revision. Messaging provider connection rollback must not re-enable unverified ingress.

---

# 7. Pilot-4 — Commerce + Analytics + Agent Safe Loop

## Goal

İlk commerce transaction, verified analytics ve **non-shadow-authority AI** loop'unu birlikte doğrulamak.

```text
Product
 -> Order
 -> Inventory Reservation
 -> Payment
 -> Finance
 -> Analytics Conversion
 -> Agent reads evidence
 -> proposal/capability
```

### Included manifests

- W7 Commerce/Inventory/Analytics
- W8 Agent Runtime/Knowledge minimum
- W6 Payment/Finance reuse
- W5 Customer reuse

### Canonical slice

```text
Product/Variant revision
OrderLineSnapshot
InventoryMovement/Reservation
Order
BusinessEvent
Touch/Conversion
AgentDefinition
AgentRun/RunStep
ModelGateway
CapabilityRegistry
OutcomeVerification
```

### Pilot-4 scope discipline

Agent begins with:
- read/analysis,
- draft/proposal,
- low-risk capability calls only.

No autonomous money movement, campaign activation, destructive admin/privacy action or direct provider credential access.

### Pilot-4 cutover

```text
P4.1 migrate small canary catalog
P4.2 server-side price/discount snapshot
P4.3 reserve inventory
P4.4 create Order
P4.5 W6 payment outcome commits/release reservation
P4.6 FinancialEvent drives recognized revenue
P4.7 BusinessEvent + Conversion references verified financial event
P4.8 run one AgentDefinition against canonical projections
P4.9 retrieval/model call recorded as RunStep
P4.10 proposal persists through canonical low-risk capability
P4.11 OutcomeVerification references actual domain outcome
```

### Hard-cut checkpoint after parity

- caller price totals no authority,
- direct quantity writers disabled for canary path,
- unpaid order not counted as paid revenue,
- synthetic funnel/revenue cannot appear as canary production KPI,
- agent cannot direct-write Firestore domain collections,
- model fallback cannot report business success,
- fake `/api/ads` or mock Google activation not used as provider success.

### Acceptance

- concurrent carts cannot oversell beyond policy,
- payment failure releases reservation once,
- refund reverses revenue once,
- duplicate analytics event does not double conversion,
- AgentRun survives process restart via W3 durable execution,
- capability deny remains deny even if model asks otherwise,
- agent-reported success loses to observed domain outcome,
- retrieval evidence includes source/revision/model lineage.

---

# 8. Vertical activation after core pilots

W9 activation starts only after the core dependencies it consumes are proven.

## Restaurant Track

Earliest after Pilot-2 + relevant Pilot-4 inventory/payment primitives.

Order:

```text
Restaurant table/session
 -> KDS/waiter tasks
 -> payment allocation
 -> offline sync
 -> inventory/catalog
 -> KPI
 -> multi-branch
```

## Support Track

Can start after Pilot-0 + W5 foundation, with W8 KB later.

```text
SupportCase state machine
 -> SLA timers
 -> assignment/escalation
 -> Messaging
 -> KB/RAG
 -> AI policy
```

## Marketplace Track

Requires Pilot-0, Pilot-1, Pilot-2/W6, Pilot-4/W8 durable execution.

## Procurement Track

Requires Pilot-1 + W7 Inventory + W6 Finance.

No vertical is allowed to shortcut missing core authority by creating local payment, identity, inventory or integration truth.

---

# 9. Cross-pilot hard-cut checkpoints

## HC-0 — Trust correctness

After Pilot-0:
- fixed OTP/dev-login gone,
- raw admin shared-secret normal authorization gone,
- cookie-existence tenant trust gone,
- fake privacy success disabled.

## HC-1 — Tenant authority

After Pilot-1:
- canary lifecycle cannot be raw root-field mutation,
- client plan/module selection cannot create entitlement,
- admin canary mutations route through commands.

## HC-2 — Financial authority

After Pilot-2:
- canary paid/refunded truth only W6,
- booked appointment != revenue,
- provider simulation != payment success.

## HC-3 — Public authority

After Pilot-3:
- autosave != publish,
- public request body cannot choose tenant,
- local fake form/booking success removed for canonical site,
- verified/durable webhook ingress mandatory.

## HC-4 — Commerce/AI authority

After Pilot-4:
- direct stock mutation denied on canonical path,
- synthetic production revenue/funnel denied,
- direct agent domain/provider writes denied,
- model fallback != business outcome.

## HC-FINAL — W10 retirement

Only after broad rollout + observation:
- P0/P1 legacy writers permissions removed,
- caller/write telemetry zero,
- reconciliation clean,
- protected surfaces regression green,
- deletion/archival allowed by retirement gate.

---

# 10. Rollback philosophy

Rollback is **routing rollback**, not truth rollback.

Allowed:
- read route to previous projection,
- feature flag/cohort disable,
- DomainBinding pointer rollback,
- stop new canonical writes before reattempt,
- provider connection pause,
- job/agent pause.

Not allowed:
- erase verified FinancialEvent,
- resurrect revoked compromised credential,
- re-enable fixed OTP/dev auth bypass,
- mark failed purge completed,
- overwrite published history,
- silently copy canonical state back into competing legacy writer.

---

# 11. Evidence required per pilot

Every pilot close produces:

```text
1. exact head/manifest version
2. migration/backfill report
3. canonical vs legacy shadow-read diff
4. writer telemetry report
5. authorization/security probe results
6. idempotency/replay probe results
7. provider reconciliation if applicable
8. latency/error baseline
9. rollback drill result
10. protected UX regression result
11. unresolved exceptions list
12. hard-cut decision record
```

Financial pilots additionally require ledger reconciliation.
Privacy/offboarding pilots require lifecycle/purge proof coverage.

---

# 12. Promotion criteria

Canary -> broader cohort only when:

```text
critical security blockers = 0
financial reconciliation mismatch = 0
cross-tenant leak/misroute = 0
unexplained write divergence = 0
fake-success paths in pilot scope = 0
rollback drill = PASS
protected UX regression = PASS
required observability = present
```

Non-critical performance/product issues may remain only with explicit bounded acceptance and no authority ambiguity.

---

# 13. Recommended first implementation package

When implementation is authorized, **do not start from the flashy agent/site/restaurant features**.

First package:

```text
Pilot-0A
  User/Membership/Session schema + repository
  RequestContext verifier
  session compatibility adapter
  revocation
  auth audit

Pilot-0B
  AdminPrincipal/AdminSession
  ServicePrincipal
  shared-secret retirement adapters

Pilot-0C
  DurableJob minimal
  CredentialRef minimal
  canary telemetry
```

Only after Pilot-0 acceptance should Tenant/Business migration begin.

This minimizes the chance of rebuilding every domain on another unstable identity boundary.

---

# 14. Final readiness verdict

SÖKÜM identified what exists. SENTEZ chose the canonical architecture. W1–W10 converted it into exact migration tasks. Pilot packaging now defines how to cross the river without throwing the working product into it.

Canonical implementation sequence:

```text
Trust
 -> Tenant
 -> Customer/Booking/Payment/Finance
 -> Public Site/Messaging
 -> Commerce/Analytics/Agent
 -> Verticals
 -> Final Legacy Retirement
```

> **Implementation should begin only by establishing trust and a single canary authority path. Feature breadth comes after authority correctness.**
