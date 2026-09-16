# W10 — Admin + Privacy + Offboarding + Final Cleanup Exact Execution Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLAN KAPALI — implementation başlamadı  
> **Kaynak:** SÖKÜM 29–35, 41 + SENTEZ 01–05 + W1–W9 execution manifests + current `main` doğrulaması  
> **Amaç:** Platform control plane, privacy/data lifecycle, tenant offboarding ve bütün legacy authority retirement gate'lerini tek kapanış planında birleştirmek.

---

# 1. W10 exit contract

W10 sonunda canonical control/lifecycle authority seti:

```text
AdminPrincipal
AdminRole / AdminCapability
AdminSession
AdminCommandRequest
AdminActionEvent
ImpersonationSession
StepUpChallenge
ApprovalRecord
BreakGlassSession
OperationalPolicy / KillSwitch

DataClassPolicy
ConsentRecord / ConsentEvent
RetentionPolicy
LegalHold
ExportRequest
ErasureRequest
LifecycleTask
PurgeProof

BusinessTenant lifecycle
OffboardingRun
TenantTombstone
```

Ana invariant'lar:

1. **Admin başka domain'lerin business truth'unu doğrudan yazmaz.**
2. Admin yalnız doğrulanmış principal + least privilege + explicit capability + reason/case + gerekiyorsa approval/step-up ile canonical domain command çağırır.
3. Root tenant `DELETE` offboarding değildir.
4. Privacy purge yalnız bütün required lifecycle task'ları kanıtlanabilir biçimde tamamlanınca `PURGED/COMPLETED` olur.
5. Simulated deletion/provider success production success değildir.
6. Data lifecycle yeni collection/index/vector/provider sink eklenmeden önce Data Inventory kaydı ister.
7. Audit yüksek riskli command'larda best-effort değildir.
8. Feature flag, entitlement ve incident kill switch üç farklı authority'dir.
9. Impersonation admin kimliğini kaybettirmez ve hassas aksiyonları default deny yapar.
10. Legacy authority silme kararı yalnız retirement gate tamamlanınca verilir.
11. Protected UX/frontend/core primitive'leri sırf cleanup uğruna silinmez.

---

# 2. Current-main critical findings

## 2.1 Admin auth üç ayrı dünya

### `apps/web/src/app/api/admin/login/route.ts`

- raw `ADMIN_SECRET_TOKEN` parola gibi kullanılıyor,
- HMAC session token üretiyor,
- `admin_token` HttpOnly cookie set ediyor,
- session process-local global `ADMIN_SESSIONS` Map'e yazılıyor,
- max age 7 gün.

### `apps/web/src/proxy.ts`

`/admin/*` için:

```text
admin_token cookie == ADMIN_SECRET_TOKEN
```

bekliyor.

Login'in ürettiği HMAC token ile bu raw-secret beklentisi aynı contract değildir.

### `apps/web/src/lib/apiGuard.ts`

Admin API için:

```text
x-admin-token == ADMIN_SECRET_TOKEN
```

bekliyor.

Aynı helper ayrıca `CRON_SECRET` ve `ADK_BEARER_TOKEN` shared bearer modellerini taşıyor.

**Disposition:** `HARD-CUT SHARED-SECRET ADMIN AUTH + REWRITE TO W1/W3 PRINCIPALS`

---

## 2.2 Admin tenant route gerçek universal writer

`apps/web/src/app/api/admin/esnaf/[id]/route.ts` PATCH doğrudan şu root alanları yazabiliyor:

```text
durum
paket
aktifModuller
aktifWebModulleri
ayarlar
twilioNumarasi
notlar
```

Bunlar aynı domain'e ait değildir.

DELETE ise yalnız:

```text
await docRef.delete()
```

ile root `esnaflar/{id}` document'ını kaldırıyor.

**Disposition:**
- PATCH -> canonical command gateway'e `REWRITE`
- DELETE -> replacement hazır olur olmaz `HARD-CUT`

---

## 2.3 `/api/admin/kota` bounded-context bypass

Current endpoint tek switch altında:

- `kredi_hediye`
- `paket_degistir`
- `askiya_al`
- `aktif_et`
- `kill_switch`

çalıştırıyor.

Canonical mapping:

```text
GrantUsageCredit           -> W2 Usage/Billing
ChangeSubscriptionPlan     -> W2 Commercial/Subscription
SuspendTenant              -> W2 Tenant Lifecycle
ReactivateTenant           -> W2 Tenant Lifecycle
SetOperationalPolicy       -> W10 Platform Operations
```

`global_settings/status` tek başına real kill switch değildir.

---

## 2.4 Current privacy has two fake-success crons

### `apps/web/src/app/api/cron/data-purge/route.ts`

Gerçek purge yerine sabit:

```text
simulatedDeletedAccountsCount = 4
```

yazıp "Permanently purged" logu ve success response üretiyor.

### `apps/web/src/app/api/cron/kvkk/route.ts`

Sabit:

```text
anonymizedCount = 14
deletedCount = 3
```

ile compliance success dönüyor.

**Disposition:** `HARD-CUT PRODUCTION FAKE PRIVACY SUCCESS`

Bu endpoint'ler explicit fixture/demo dışında completion state üretemez.

---

## 2.5 `kvkk-purge` real lifecycle seed but incomplete

`apps/web/src/app/api/cron/kvkk-purge/route.ts`:

- pasif tenant tarıyor,
- 7. gün warning,
- 14. gün subdomain kapatma,
- 44. gün root PII anonymize,
- yalnız birkaç collection silme
  - `icerikler`
  - `yorumlar`
  - `ciro_anket`
  - `kota_kullanim`
- Telegram summary

yapıyor.

Bu gerçek bir lifecycle intent'idir, fakat bütün W1–W9 data sinks'i kapsamaz.

**Disposition:** `PRESERVE TIMING/WORKFLOW INTENT + REWRITE BEHIND DATA INVENTORY`

---

## 2.6 `auditLogger.ts` useful vocabulary, not tamper-proof authority

`apps/web/src/lib/security/auditLogger.ts`:

- iyi event vocabulary taşır,
- PII mask intent'i vardır,
- per-tenant/global audit collections yazar,
- fakat hata olursa catch edip operation'ın devam etmesine izin verir,
- IP için basit 32-bit hash kullanır; comment bile production SHA-256 gerektiğini söylüyor.

Dolayısıyla dosya adı/yorumu "tamper-proof" olsa da guarantee bu değildir.

**Disposition:** `PRESERVE VOCABULARY + REWRITE DURABILITY/INTEGRITY`

High-risk admin/privacy/financial command için:

```text
AdminActionRequested durable commit
        ↓
canonical domain command
        ↓
AdminActionOutcome durable commit
```

causality zinciri zorunludur.

Audit request event'i kalıcı kaydedilemiyorsa high-risk command fail-closed olmalıdır.

---

## 2.7 Impersonation live runtime vs better package contract

### Live

`apps/web/src/lib/impersonation.ts`:

- dual identity claims var,
- issuer kontrolü var,
- 2 saat TTL,
- reason/case yok,
- `SESSION_SECRET` için development fallback var,
- sensitive blocked-action enforcement bu dosyada yok.

### Better seed

`packages/admin/src/types/impersonation.ts`:

- mandatory `reason`,
- max 1 saat,
- admin + target dual identity,
- explicit blocked actions:
  - password change,
  - account deletion,
  - payment method,
  - ownership transfer,
  - admin creation,
  - billing modification.

**Disposition:** `PACKAGE CONTRACT PRESERVE/PROMOTE, LIVE RUNTIME REWRITE`

---

## 2.8 Admin audit contract reusable

`packages/admin/src/types/auditLog.ts`:

- actor/admin,
- category,
- target,
- before/after,
- severity,
- IP/user-agent,
- timestamp

vocabulary'si taşıyor.

Canonical `AdminActionEvent` bunun genişletilmiş hali olacaktır.

---

## 2.9 Feature flag contract useful but not entitlement/incident authority

`packages/admin/src/types/featureFlags.ts`:

- global enabled,
- user ids,
- plan,
- deterministic percentage,
- country,
- sector

rules taşır.

**KEEP:** rollout/evaluation intent.

**Strict split:**

```text
Entitlement
= tenant/user capability'ye sahip mi?         -> W2

FeatureFlag
= capability'nin hangi rollout/variant'ı açık? -> Release Policy

OperationalPolicy / KillSwitch
= incident/risk nedeniyle execution kapalı mı? -> W10
```

Bu üçü aynı boolean/document olmaz.

---

# 3. Admin Control Plane canonical model

## W10-A01 — AdminPrincipal / AdminSession

Build on W1 identity/session authority.

```text
AdminPrincipal {
  principalId
  userId
  status
  assuranceLevel
}

AdminRole {
  roleId
  capabilities[]
}

AdminSession {
  sessionId
  principalId
  authMethods[]
  assuranceLevel
  issuedAt
  expiresAt
  revokedAt?
}
```

No shared `ADMIN_SECRET_TOKEN` normal authorization path.

Break-glass is separate and audited.

---

## W10-A02 — Admin capability policy

Minimum capability families:

```text
tenant.read
tenant.suspend
tenant.reactivate
tenant.offboard.request
subscription.change
usage.credit.grant
entitlement.override
integration.provision
integration.reconcile
payment.refund.request
campaign.pause
privacy.export.request
privacy.erase.request
support.impersonate
platform.incident.manage
feature_flag.manage
```

UI role is not permission source. Server command checks capability.

---

## W10-A03 — Cross-domain AdminCommand Gateway

Current direct routes become adapters:

```text
Admin UI
 -> AdminCommandRequest
 -> capability/reason/step-up/approval policy
 -> canonical W2/W3/W5/W6/W7/W9/W10 command
 -> domain outcome
 -> AdminActionEvent
```

Admin does not generic-PATCH Firestore.

---

## W10-A04 — AdminActionEvent

```text
AdminActionEvent {
  eventId
  actorAdminId
  adminSessionId
  actingAsPrincipalId?
  impersonationSessionId?
  action
  capability
  targetType
  targetId
  tenantId?
  reason
  caseId?
  approvalId?
  beforeRef?
  afterRef?
  requestId
  correlationId
  outcome
  severity
  ipHash
  userAgentHash?
  occurredAt
}
```

Append-only.

Sensitive values are referenced/redacted, not dumped blindly into audit.

---

## W10-A05 — Step-up and approval

Risk classes:

```text
LOW      -> normal admin session
MEDIUM   -> reason + recent auth
HIGH     -> step-up authentication
CRITICAL -> step-up + second approval / break-glass policy
```

Critical examples:

- tenant purge approval,
- ownership transfer,
- large financial refund/credit,
- credential/provider destructive revoke,
- global incident kill switch,
- legal hold override.

---

## W10-A06 — ImpersonationSession

Use `packages/admin` semantics.

```text
ImpersonationSession {
  sessionId
  adminPrincipalId
  targetPrincipalId
  tenantId
  reason
  caseId?
  issuedAt
  expiresAt <= 1h
  revokedAt?
}
```

Rules:
- dual identity preserved in every command,
- persistent UI banner,
- start/end/revoke events,
- blocked-action list default deny,
- explicit capability policy can be stricter,
- no production development secret fallback.

---

## W10-A07 — BreakGlassSession

Normal Admin auth'dan ayrı.

Requires:

- explicit incident/reason,
- short TTL,
- strongest available auth/approval,
- minimal scope,
- mandatory audit,
- post-use review.

Shared permanent bearer is not break-glass.

---

## W10-A08 — OperationalPolicy / KillSwitch

```text
OperationalPolicy {
  policyId
  scope: GLOBAL|TENANT|CAPABILITY|PROVIDER
  scopeRef?
  mode: ACTIVE|DEGRADED|PAUSED|BLOCKED
  reason
  incidentId?
  createdBy
  createdAt
  expiresAt?
  revision
}
```

Mandatory enforcement points include:

- W3 job dispatch/provider actions,
- W8 AgentRun capability execution,
- W7 campaign activation,
- W6 payment initiation where provider scoped,
- other explicitly registered capability gates.

UI message "AI frozen" cannot exceed actual enforced scope.

---

## W10-A09 — Feature flag release policy

Promote `packages/admin/src/types/featureFlags.ts` evaluator intent.

Requirements:

- versioned flag definition,
- deterministic rollout,
- audit of mutations,
- evaluation telemetry,
- no entitlement bypass,
- no security/trust bypass,
- no financial policy bypass.

---

# 4. Data Inventory and Privacy Core

## W10-P01 — DataClassPolicy registry

Every production data class/sink registers:

```text
DataClassPolicy {
  dataClass
  authorityDomain
  ownerScope
  subjectScope
  purposes[]
  sensitivity
  retentionPolicyId
  exportPolicyId
  deletionPolicyId
  legalHoldPolicyId?
  sinks[]
  derivedDataClasses[]
}
```

Minimum W1–W9 coverage:

### Identity / tenant
- users
- memberships
- sessions
- admin sessions
- impersonation sessions
- tenant lifecycle/tombstone

### Customer / messaging / support
- Customer
- identity aliases
- consent
- activity
- conversations/messages
- support cases/messages/events

### Booking / finance
- booking records/snapshots
- payment attempts/results
- refund/reconciliation
- immutable finance events/ledger
- invoices/receivables/payables

### Commerce / inventory / verticals
- products/orders/carts
- inventory movements/reservations
- restaurant sessions/checks/KDS/tasks/offline conflicts
- marketplace jobs/bids/awards/credits/disputes
- procurement suppliers/PO/receipts/invoices

### Site / media
- drafts
- published revisions
- artifacts
- assets/variants
- domain bindings

### Integration / secrets
- IntegrationConnection
- OAuth grants
- ProviderResourceBinding
- webhook inbox/subscription/cursors
- Credential metadata/version refs

### Agent / knowledge
- AgentRun/RunStep
- model calls
- retrieval evidence
- KnowledgeSource/Chunk
- embedding/vector projections
- feedback/evaluation

### Analytics / operations
- BusinessEvent
- Touch/Conversion
- campaign/provider metrics
- audit/security logs
- durable jobs/outbox/inbox
- DLQ payloads
- observability sinks

### External sinks/providers
- Twilio/Meta/Google/Iyzico/Cloudflare/Paraşüt etc.
- email/SMS/push providers
- vector store
- error/telemetry systems
- caches/object storage/CDN where personal/tenant data exists

---

## W10-P02 — Consent Core

UI checkbox is input, not proof.

```text
ConsentRecord {
  subjectId
  purpose
  channel?
  policyVersion
  status
  source
  evidenceRef
  effectiveAt
}

ConsentEvent {
  GRANTED | WITHDRAWN | UPDATED | EXPIRED
  actor/source
  occurredAt
}
```

Rules:
- marketing consent checked at W5/W7 send execution time,
- transactional/service messages classified separately,
- consent history immutable,
- hard-coded `kvkkOnay:true` forbidden,
- policy/version text identifiable from evidence.

---

## W10-P03 — RetentionPolicy

```text
RetentionPolicy {
  policyId
  dataClass
  retainFor
  trigger
  disposition DELETE|ANONYMIZE|ARCHIVE
  exceptions
  version
}
```

No hidden hard-coded 44-day behavior as universal truth. 44-day offboarding may remain one explicit tenant lifecycle policy version.

---

## W10-P04 — LegalHold

```text
LegalHold {
  holdId
  scope
  reason
  authorityReference
  dataClasses[]
  createdAt
  releasedAt?
}
```

Erasure/offboarding planner must evaluate hold before destructive task creation.

No operator bypass without critical approval + audit.

---

## W10-P05 — ExportRequest

Build durable state:

```text
REQUESTED
AUTHORIZED
COLLECTING
READY
EXPIRED
FAILED
```

Requirements:
- verified requester authority,
- Data Inventory driven collection,
- bounded export artifact TTL,
- access logging,
- no secret credentials/private platform data leakage,
- manifest of included/omitted data classes.

---

## W10-P06 — ErasureRequest

```text
REQUESTED
VERIFIED
PLANNED
BLOCKED_BY_HOLD?
EXECUTING
PARTIAL_FAILURE
COMPLETED
```

`COMPLETED` only when every required LifecycleTask is success or explicitly policy-exempt.

---

## W10-P07 — LifecycleTask / PurgeProof

```text
LifecycleTask {
  taskId
  requestId/offboardingRunId
  dataClass
  sink
  targetRef
  action
  status
  attempts
  idempotencyKey
  startedAt?
  completedAt?
  errorCode?
}

PurgeProof {
  taskId
  adapter
  targetRefHash
  outcome
  providerReceiptRef?
  verificationMethod
  verifiedAt
}
```

W3 DurableJob owns retry/lease/DLQ mechanics.

---

# 5. Tenant offboarding convergence

## W10-O01 — Canonical lifecycle

```text
ACTIVE
 -> OFFBOARDING_REQUESTED
 -> ACCESS_REVOKED
 -> RETENTION_WINDOW
 -> PURGE_PLANNED
 -> PURGING
 -> PURGED
```

Branches:

```text
SUSPENDED
LEGAL_HOLD
PARTIAL_FAILURE
OFFBOARDING_CANCELLED  // only within policy window
```

`PURGED` terminal means required data/resource cleanup reconciled, not root document missing.

---

## W10-O02 — OffboardingRun

```text
OffboardingRun {
  runId
  tenantId
  requestedBy
  reason
  policyVersion
  requestedAt
  retentionEndsAt
  legalHoldStatus
  status
  requiredTaskIds[]
  completedAt?
}
```

---

## W10-O03 — Access revocation first

At `ACCESS_REVOKED`:

- revoke/expire W1 sessions,
- prevent new privileged writes,
- suspend effective entitlements W2,
- stop new campaign/agent activation as policy dictates,
- preserve read/export access only if policy allows.

Data is not yet destroyed during retention window.

---

## W10-O04 — Cross-domain cleanup task map

### W2 Commercial
- close/cancel subscription according to contract,
- stop renewal,
- settle pending commercial changes.

### W3 Integrations
- revoke OAuth grants where required,
- disable webhook subscriptions,
- release/provisioned provider resources according to policy,
- reconcile provider proof.

### W4 Site/Asset
- unpublish public site,
- release domain binding,
- delete/retain published artifacts per policy,
- asset GC only after reference/retention check.

### W5 Customer/Messaging/Support
- subject/tenant data disposition by data class,
- messaging provider copies where supported,
- support retention policy may differ from CRM.

### W6 Finance
- financial/legal retention may override deletion,
- immutable financial events may require pseudonymization/reference minimization rather than erasure,
- pending refunds/settlements must resolve before final close if policy requires.

### W7 Commerce/Analytics/Marketing
- stop campaigns,
- revoke/close provider campaign bindings,
- dispose personal analytics identifiers according to policy,
- preserve lawful aggregated non-identifiable metrics only if policy supports it.

### W8 Agent/Knowledge
- cancel pending runs/jobs,
- remove/tombstone tenant-scoped knowledge sources,
- rebuild/remove vector projections,
- propagate source deletion lineage to derived insights.

### W9 Verticals
- Restaurant operational data disposition,
- Marketplace/provider/dispute/credit records according to financial/legal policy,
- Procurement supplier/PO/AP retention,
- Support case retention.

---

## W10-O05 — Provider/domain/resource proof

Offboarding cannot complete with only local metadata mutation.

Examples:

```text
OAuth grant -> provider revoke response / re-auth-invalid proof
Twilio number -> release/reassign provider state verified
Cloudflare domain -> binding/DNS provider reconciliation
Meta/Google campaigns -> paused/closed verified
vector index -> source vectors removed/rebuilt
```

Local `field = null` is not provider purge proof.

---

## W10-O06 — TenantTombstone

After purge, minimal non-sensitive tombstone may remain when required:

```text
TenantTombstone {
  tenantId
  finalStatus
  closedAt
  purgeCompletedAt
  policyVersion
  auditCorrelationId
}
```

No business profile/PII/credentials inside tombstone.

---

# 6. Current route migration manifest

## W10-R01 — Admin login/session

**Paths**
- `apps/web/src/app/api/admin/login/route.ts`
- `apps/web/src/proxy.ts`
- `apps/web/src/lib/apiGuard.ts`

**Disposition:** `REWRITE + HARD-CUT SHARED RAW SECRET`

**Gate**
- W1 admin identity/session live,
- proxy validates canonical session/assurance,
- APIs validate AdminPrincipal/capability,
- `ADMIN_SESSIONS` process Map unused,
- no browser/user request path requires raw admin secret.

---

## W10-R02 — Admin tenant mutation

**Paths**
- `apps/web/src/app/api/admin/esnaf/route.ts`
- `apps/web/src/app/api/admin/esnaf/[id]/route.ts`

**Disposition:** `ADAPTER TO COMMAND GATEWAY`

Raw PATCH body fields become explicit commands.

DELETE route is disabled once `RequestTenantOffboarding` is live.

---

## W10-R03 — Admin quota/commercial/kill switch

**Path**
- `apps/web/src/app/api/admin/kota/route.ts`

**Disposition:** `DECOMPOSE`

One endpoint may remain as UI adapter, but each operation dispatches a distinct capability/command and produces distinct audit.

---

## W10-R04 — Impersonation

**Paths**
- `apps/web/src/lib/impersonation.ts`
- `apps/web/src/app/api/admin/impersonate/route.ts`
- `packages/admin/src/types/impersonation.ts`

**Disposition:** `PRESERVE CONTRACT + REWRITE RUNTIME`

---

## W10-R05 — Admin audit

**Paths**
- `packages/admin/src/types/auditLog.ts`
- `apps/web/src/lib/security/auditLogger.ts`

**Disposition:** `PRESERVE VOCABULARY + BUILD APPEND-ONLY CONTROL AUDIT`

Existing tenant/security audit can remain a separate domain/security stream if useful, but high-risk admin audit is explicit and guaranteed.

---

## W10-R06 — Feature flags

**Path**
- `packages/admin/src/types/featureFlags.ts`

**Disposition:** `PRESERVE EVALUATOR INTENT + SEPARATE AUTHORITIES`

---

## W10-R07 — Privacy cron convergence

**Paths**
- `apps/web/src/app/api/cron/data-purge/route.ts`
- `apps/web/src/app/api/cron/kvkk/route.ts`
- `apps/web/src/app/api/cron/kvkk-purge/route.ts`

**Disposition:**
- first two -> `HARD-CUT FAKE SUCCESS`
- `kvkk-purge` -> `ADAPTER/SEED TO LIFECYCLE ORCHESTRATOR`

No cron directly owns privacy completion truth.

---

# 7. Final legacy retirement matrix

`DROP` is never immediate delete. This matrix defines risk order.

## P0 — Security / money / privacy correctness

Replacement ready olduğunda ilk kapanacak yollar:

| Legacy authority | Representative path/pattern | Replacement |
|---|---|---|
| fixed OTP `123456` | onboarding OTP path from W1 | verified OTP authority |
| production dev-login | auth dev route W1 | W1 session/login |
| shared raw Admin secret | admin login/proxy/apiGuard | AdminPrincipal/session |
| literal A2A bearer | `/api/a2a` | W3 service identity |
| guardless ADK RPC | `/api/adk/rpc` | W8 Capability Registry |
| fake payment/provider success | W6/W8 kapora/restaurant paths | W6 verified payment |
| fake Google/ads campaign success | W7 Google/ads paths | W7 provider binding |
| fake privacy purge success | `/cron/data-purge`, `/cron/kvkk` | W10 lifecycle proof |
| root tenant hard delete | admin esnaf DELETE | OffboardingRun |
| unsigned support identity | support route W5 | W1 verified principal |
| caller-controlled tenant agent execution | `/api/ajan/[ajanAdi]` | W8 AgentRun gateway |
| public caller tenant target | old public booking/order forms | W4 Public Action binding |
| autosave public-site mutation | `site/editor-kaydet` legacy live write | W4 draft/publish split |
| local paid/odendi mutations | restaurant/order/payment legacy writers | W6 Payment allocations |

---

## P1 — Duplicate runtime authority / state drift

- process-local admin/session/setup Maps,
- process-local AgentBus/EventEmitter authority,
- ADK `InMemoryRunner` authority,
- duplicate WhatsApp/Instagram ingress,
- tenant-root provider token/resource fields,
- direct admin cross-domain Firestore writers,
- direct agent domain/provider writers,
- mutable Firestore public-site truth,
- duplicate publish/version/domain authorities,
- raw package string/module authorization,
- synthetic revenue/funnel/ROAS,
- duplicate model/prompt/agent registries,
- direct inventory quantity writers outside Inventory Core,
- order/booking/restaurant embedded payment truth,
- process-local/demo vertical truth in production.

---

## P2 — Compatibility/projection/docs cleanup

Only after telemetry/caller=0:

- legacy field aliases on `esnaflar`,
- compatibility projections no longer consumed,
- old status names/read adapters,
- deprecated provider metadata fields,
- obsolete demo production branches,
- historical duplicate SÖKÜM 39 doc,
- dead wrappers/packages proven caller=0.

P2 cleanup must not delete protected extension seed packages solely because current runtime wiring is low.

---

# 8. Universal retirement gate

A legacy writer/path becomes archive/delete candidate only when all are true:

```text
replacement authority live
AND migration/backfill reconciled
AND caller count = 0
AND legacy write telemetry = 0
AND feature/permission removed
AND rollback/recovery path proven
AND runbook/docs updated
AND owner sign-off / automated acceptance passed
```

Extra gates:

### Financial
- reconciliation balances clean,
- duplicate/replay probes pass,
- no unreconciled provider event.

### Privacy
- purge/export proof matrix passes,
- legal-hold semantics tested,
- no fake completion path.

### Auth/Admin
- old credential revoked,
- old header/cookie path rejected,
- session revocation tested.

### Provider integration
- provider-side state reconciliation proves new binding owns resource.

---

# 9. Protected deletion deny-list

Explicit review olmadan archive/delete YASAK:

## Public product/frontend

- Kepenk/KPNK main marketing landing,
- Navbar / major landing sections,
- global design tokens/themes,
- `/giris` UX,
- `apps/sites` public shell,
- site editor UX,
- template catalog/render UX.

## Strong core primitives

- `packages/site-schema`
- `packages/renderer`
- publish-engine generation primitives
- booking/ecom/crm/accounting typed contracts where still canonical seeds
- provider protocol adapters/know-how
- queue/idempotency/circuit/security primitives that W1–W8 promote
- restaurant KDS/offline/KPI contracts
- marketplace/supply/support contract seeds

## Extension seeds

Do not delete only because live callers are low:

- `packages/voice`
- `packages/studio`
- `packages/blog`
- `packages/seo`
- `packages/influencer`

They may be archived/versioned later only through explicit product decision.

## Out of scope

- `apps/randevu-server`

W10 must not mutate/delete it.

---

# 10. Final W10 execution order

```text
T01 Freeze admin/privacy legacy writer inventory + telemetry
T02 Promote AdminPrincipal/AdminSession from W1
T03 Build AdminCapability policy
T04 Build durable AdminActionRequested/Outcome audit
T05 Build AdminCommand Gateway
T06 Adapt tenant/commercial/entitlement/integration/finance/marketing admin actions
T07 Build StepUpChallenge + ApprovalRecord
T08 Rewrite impersonation with reason/case/<=1h/blocked actions
T09 Build BreakGlassSession
T10 Build OperationalPolicy/KillSwitch enforcement registry
T11 Separate FeatureFlag runtime from Entitlement and OperationalPolicy

T12 Build DataClassPolicy inventory covering W1-W9 + external sinks
T13 Build Consent Core + migrate existing consent evidence where valid
T14 Build RetentionPolicy + LegalHold
T15 Build ExportRequest
T16 Build ErasureRequest + LifecycleTask + PurgeProof
T17 Adapt real `kvkk-purge` timings into lifecycle policy/orchestrator
T18 Hard-disable fake `data-purge` and `/cron/kvkk` production success paths

T19 Build canonical OffboardingRun on W2 tenant lifecycle
T20 Access/session/entitlement revocation phase
T21 Generate cross-domain purge/revoke/release tasks from Data Inventory
T22 Reconcile external providers, domain, assets, vectors and jobs
T23 Handle partial failure/retry/legal hold
T24 Commit minimal TenantTombstone + PURGED only after proof completeness

T25 Execute P0 hard-cut retirement
T26 Execute P1 duplicate-authority retirement after telemetry=0
T27 Execute P2 compatibility/doc cleanup after all consumers migrated
T28 Re-run protected deletion deny-list review
T29 Run full W1-W10 acceptance matrix + clean-install/migration smoke
T30 Close execution planning and freeze manifest version for implementation
```

---

# 11. Acceptance matrix

## Admin / trust

- normal admin login produces a session accepted by both UI proxy and API authorization,
- raw old `ADMIN_SECRET_TOKEN` header/cookie no longer grants normal admin access,
- revoked AdminSession stops immediately,
- capability-limited admin cannot call unrelated command,
- high-risk command without reason/step-up/approval rejects,
- impersonating admin cannot run blocked actions,
- every impersonated command retains admin + target identity,
- break-glass expires and requires post-use audit/review.

## Kill switch / release policy

- feature flag off does not change entitlement ownership,
- entitlement grant does not bypass operational pause,
- global/tenant/provider/capability operational policy enforced at registered execution points,
- expired kill switch no longer blocks after policy transition,
- UI status matches actual enforced scope.

## Privacy / lifecycle

- fake purge endpoints cannot report production deletion success,
- ErasureRequest with one failed required sink remains `PARTIAL_FAILURE`,
- legal hold blocks destructive task for covered data,
- export includes a manifest of data classes,
- consent withdrawal prevents future marketing send according to policy,
- source knowledge deletion removes/rebuilds related vector projection,
- external provider revoke must have proof/reconciliation,
- root tenant document missing alone cannot produce `PURGED`,
- financial/audit records follow their distinct lawful retention/pseudonymization policy.

## Offboarding

- new sessions/writes blocked after access revocation policy,
- required integrations disabled/revoked,
- site/domain public delivery disabled,
- campaigns/agents/jobs stopped per policy,
- retention window respected,
- all purge tasks idempotent/retryable,
- final tombstone contains no prohibited PII/secrets,
- offboarding completion can be reconstructed from task/proof/audit lineage.

## Cleanup

- P0 old path returns deny/disabled after cutover,
- P1 writer telemetry remains zero through observation window,
- compatibility read projection removal does not break protected UX,
- no protected frontend/core/extension seed deleted without explicit review,
- `apps/randevu-server` untouched.

---

# 12. Final cutover evidence pack

Before declaring Kepenk v2 migration-ready, produce and retain:

```text
1. canonical authority map version
2. schema/contract versions
3. migration/backfill reports
4. reconciliation reports
5. legacy caller/write telemetry report
6. security hard-cut probe results
7. financial reconciliation results
8. privacy export/erasure/legal-hold probe results
9. provider reconciliation results
10. rollback/recovery runbook results
11. protected UX regression results
12. final legacy retirement list with proof per item
```

No single green dashboard substitutes for these artifacts.

---

# 13. W10 final verdict

The final architecture is not completed by deleting old files. It is completed when old authority can no longer create contradictory truth.

Canonical end-state:

```text
Verified Human/Service/Public Principal
              ↓
Policy + Entitlement + Operational Gate
              ↓
Canonical Domain Command
              ↓
Single Write Authority
              ↓
Durable Event / Projection / Provider Outcome
              ↓
Audit + Observability + Lifecycle Governance
```

Admin sits above this graph as a guarded control plane, not beside it as a universal writer. Privacy/offboarding traverses the graph through Data Inventory, not through hand-maintained collection lists.

> **W10 invariant: legacy code is retired only after authority, callers, permissions and lifecycle obligations have moved. File deletion is the last step, never the migration strategy.**
