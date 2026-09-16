# Final Retirement — Admin / Privacy / Offboarding / Legacy Authority PR Plan

> **Tarih:** 2026-09-16  
> **Durum:** IMPLEMENTATION-READY PLAN — kod implementasyonu başlamadı  
> **Kaynak:** W10 + Pilot-0…4 + Vertical Activation PR plans  
> **Amaç:** Canonical replacements kanıtlandıktan sonra admin/privacy/offboarding convergence'ı tamamlamak ve legacy authority'leri ölçümlü biçimde emekliye ayırmak.  
> **Kural:** `DROP` veya `REWRITE` etiketi tek başına delete yetkisi değildir.

---

# 1. Universal retirement gate

Bir legacy writer/path ancak bütün koşullar sağlanırsa archive/delete adayı olur:

```text
replacement authority live
AND migration/backfill reconciled
AND caller count = 0
AND legacy write telemetry = 0
AND old feature/permission removed
AND rollback/recovery path proven
AND runbook/docs updated
AND independent acceptance passed
```

Additional gates:

### Financial
- provider/payment reconciliation clean,
- duplicate/replay probes pass,
- unexplained balance delta = 0 or explicitly resolved.

### Privacy
- export/erasure/legal-hold matrix passes,
- every required sink produces proof or explicit exemption,
- no fake completion path.

### Auth/Admin
- old credential/session/header path rejected,
- revoked credentials proven unusable.

### Provider
- provider-side reconciliation proves canonical binding owns/releases resource.

---

# 2. Branch / PR graph

```text
final/00-retirement-baseline
          ├───────────────┬────────────────────┐
          ↓               ↓                    ↓
final/01-admin-gateway final/03-privacy-core final/02-operational-policy
          │               │                    │
          │               ↓                    │
          │        final/04-export-erasure     │
          │               ↓                    │
          └───────────────┬────────────────────┘
                          ↓
                 final/05-offboarding
                          ↓
                 final/06-provider-purge-proof
                          ↓
                 final/07-p0-global-hardcuts
                          ↓
                 final/08-p1-p2-retirement
                          ↓
                 final/09-final-acceptance-freeze
```

---

# 3. PR-00 — Retirement Baseline / Telemetry / Protected Deny-List

**Branch:** `final/00-retirement-baseline`  
**Depends on:** core pilots + selected verticals accepted for the scope being retired  
**Risk:** low/additive  
**Amaç:** Final cleanup öncesi caller/write telemetry ve deletion deny-list'i exact-head'e kilitlemek.

## Deliverables

- legacy writer registry current-main refresh,
- route/function caller inventory,
- write telemetry by authority/path,
- compatibility projection consumer inventory,
- old credential/header/cookie use telemetry,
- provider resource ownership/reconciliation inventory,
- final protected deny-list.

## Protected frontend/core

Explicit review olmadan delete/archive yasak:

- Kepenk/KPNK main marketing landing,
- Navbar/major landing sections,
- global design tokens/themes,
- `/giris` UX,
- `apps/sites` shell,
- site editor/theme/template UX,
- canonical seed packages such as site-schema/renderer/booking/ecom/crm/accounting where still used,
- provider protocol know-how,
- Restaurant KDS/offline/KPI,
- Marketplace/Supply/Support contract seeds,
- Voice/Studio/Blog/SEO/Influencer extension seeds.

`apps/randevu-server` remains out of scope.

## Merge gate

No deletion yet. Every candidate has replacement owner, caller count and retirement condition.

---

# 4. PR-01 — AdminCommand Gateway Global Convergence

**Branch:** `final/01-admin-gateway`  
**Depends on:** Pilot-0 AdminPrincipal/Audit + all targeted domain commands live  
**Risk:** critical, privileged control plane  
**Amaç:** Admin UI/API'yi universal Firestore writer olmaktan tamamen çıkarmak.

## Existing adapters

- `apps/web/src/app/api/admin/esnaf/**`
- `apps/web/src/app/api/admin/kota/route.ts`
- integration/number/provider admin operations
- campaign/finance/admin operator actions.

## Canonical flow

```text
AdminPrincipal/AdminSession
 -> AdminCommandRequest
 -> capability + reason + step-up/approval
 -> canonical domain command
 -> AdminActionOutcome
```

## Required capability families

```text
tenant.read/suspend/reactivate/offboard.request
subscription.change
usage.credit.grant
entitlement.override
integration.provision/reconcile
payment.refund.request
campaign.pause
privacy.export.request/privacy.erase.request
support.impersonate
platform.incident.manage
feature_flag.manage
```

## Acceptance

- no generic arbitrary cross-domain root PATCH,
- unsupported domain action fails explicitly, never field-patches fallback,
- every high-risk action has durable request/outcome audit,
- root DELETE unavailable,
- browser bundle contains no normal admin secret.

## Rollback

Disable specific operator command/capability. Never restore universal raw writer.

---

# 5. PR-02 — OperationalPolicy / FeatureFlag / Entitlement Split

**Branch:** `final/02-operational-policy`  
**Depends on:** Pilot-1 entitlement + Pilot-0 admin + registered enforcement points  
**Risk:** high  
**Amaç:** Three booleans that used to blur together become distinct authorities.

```text
Entitlement      -> may tenant use capability?
FeatureFlag      -> which rollout/variant?
OperationalPolicy -> is execution paused/degraded/blocked?
```

## OperationalPolicy minimum

```text
scope GLOBAL|TENANT|CAPABILITY|PROVIDER
mode ACTIVE|DEGRADED|PAUSED|BLOCKED
reason
incidentId?
createdBy/createdAt/expiresAt?
revision
```

## Mandatory enforcement registry

At least:
- W3 job/provider dispatch,
- W6 payment initiation/provider scope,
- W7 campaign activation,
- W8 Agent capability execution,
- selected vertical execution points.

## Acceptance

- entitlement cannot bypass pause,
- feature flag cannot grant entitlement,
- UI status equals real enforced scope,
- expired policy transitions correctly,
- global switch has audited actor/reason.

---

# 6. PR-03 — Data Inventory / Consent / Retention / Legal Hold Core

**Branch:** `final/03-privacy-core`  
**Depends on:** all live data classes from core/vertical scope registered  
**Risk:** critical, privacy governance  
**Amaç:** Hard-coded collection lists yerine machine-readable data lifecycle authority kurmak.

## Canonical minimum

```text
DataClassPolicy
ConsentRecord / ConsentEvent
RetentionPolicy
LegalHold
```

Data inventory covers:
- identity/session/admin,
- tenant/commercial,
- customer/messaging/support,
- booking/payment/finance,
- site/assets/domain,
- commerce/inventory/analytics/marketing,
- agent/knowledge/vector projections,
- vertical entities,
- jobs/outbox/inbox/DLQ/audit/observability,
- external provider/sink copies.

## Consent rules

- checkbox is input, not proof,
- versioned purpose/policy/evidence,
- marketing decision checked at send time,
- transactional/service purpose separate,
- hard-coded `kvkkOnay=true` forbidden.

## Retention/legal hold

No universal hidden 44-day policy. 44 days may be one explicit versioned offboarding policy.

Legal hold is evaluated before destructive task planning.

## Acceptance

- every production data class has authority/purpose/sink/retention/deletion policy,
- consent withdrawal affects future eligible sends,
- legal hold blocks covered destructive task,
- derived/vector data has source lineage.

---

# 7. PR-04 — ExportRequest / ErasureRequest / LifecycleTask

**Branch:** `final/04-export-erasure`  
**Depends on:** PR-03 + W3 DurableJob  
**Risk:** critical  
**Amaç:** Export/deletion'ı request + plan + task + proof state machine'ine taşımak.

## Export

```text
REQUESTED -> AUTHORIZED -> COLLECTING -> READY -> EXPIRED | FAILED
```

Requirements:
- verified requester,
- Data Inventory driven collection,
- bounded artifact TTL,
- included/omitted class manifest,
- access audit,
- no secrets/private platform metadata leakage.

## Erasure

```text
REQUESTED -> VERIFIED -> PLANNED
 -> BLOCKED_BY_HOLD? | EXECUTING
 -> PARTIAL_FAILURE | COMPLETED
```

## LifecycleTask / PurgeProof

Each sink gets idempotent task with adapter/target/outcome/verification proof.

`COMPLETED` impossible while required task failed/unverified.

## Acceptance

- one failed sink -> PARTIAL_FAILURE,
- retry safe,
- legal hold blocks task creation/execution,
- fake provider/local success cannot satisfy PurgeProof.

---

# 8. PR-05 — Tenant OffboardingRun

**Branch:** `final/05-offboarding`  
**Depends on:** PR-01, PR-03, PR-04 + Pilot-1 Tenant lifecycle  
**Risk:** critical, destructive lifecycle  
**Amaç:** Root DELETE yerine explicit access-revoke -> retention -> purge state machine.

## Canonical lifecycle

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
OFFBOARDING_CANCELLED within policy
```

## Access revocation first

- revoke/expire W1 sessions,
- prevent privileged writes,
- suspend effective capabilities,
- stop new campaigns/agents/jobs according to policy,
- keep lawful export/read access only if policy allows.

## OffboardingRun

Tracks policy version, reason, retention end, hold state, required task IDs, final proof completeness.

## Acceptance

- root doc missing alone cannot mean PURGED,
- old session cannot mutate after access revoke,
- retention window respected,
- cancellation only within policy,
- purge begins only after plan + hold checks.

---

# 9. PR-06 — External Sink / Provider / Domain / Vector Purge Proof

**Branch:** `final/06-provider-purge-proof`  
**Depends on:** PR-05 + W3/W4/W7/W8 provider/resource authorities  
**Risk:** critical, external state  
**Amaç:** `field=null` yerine gerçek external reconciliation/proof.

## Required sink families

Examples:

```text
OAuth grants
Twilio numbers/resources
Cloudflare/domain/DNS
Meta/Google campaigns
email/SMS/push provider data where supported
object storage/CDN assets
vector index/embeddings
pending DurableJobs/outbox/inbox
```

## Proof rule

Each external cleanup task needs provider receipt, reconciliation result or explicit verification method.

## Acceptance

- local metadata deletion without provider verification remains incomplete,
- vector source deletion removes/rebuilds projection,
- provider revoke retry idempotent,
- failed external sink blocks final PURGED unless policy explicitly exempts it.

---

# 10. PR-07 — Global P0 Hard-Cut Retirement

**Branch:** `final/07-p0-global-hardcuts`  
**Depends on:** replacement authorities live globally/cohort as intended  
**Risk:** critical, one-way security/correctness cut  
**Amaç:** Pilot canary'de kapatılan P0 anti-pattern'leri intended production scope'ta tamamen ulaşılamaz yapmak.

Retire globally after proof:

- fixed onboarding OTP fallback,
- production dev-login,
- shared raw Admin secret normal authorization,
- literal A2A bearer,
- guardless ADK RPC,
- fake payment/provider success,
- fake Google/ads provider success,
- fake privacy purge completion,
- root tenant hard delete,
- unsigned support identity/email-as-auth,
- caller-controlled agent tenant,
- caller-controlled public action tenant,
- autosave public-site mutation,
- local `paid/odendi` financial authority.

## Acceptance

Negative probes on every old path return deny/disabled/non-authoritative behavior.

## Rollback

One-way. Rollback routes future work to verified compatibility adapter, never resurrects insecure/fake path.

---

# 11. PR-08 — P1/P2 Duplicate Authority / Compatibility Retirement

**Branch:** `final/08-p1-p2-retirement`  
**Depends on:** P0 hardcuts + observation window  
**Risk:** high, cleanup/regression  
**Amaç:** Telemetry=0 olan duplicate runtimes/writers/projections'i archive etmek.

## P1 candidates

- process-local session/setup/admin Maps,
- process-memory AgentBus run authority,
- duplicate messaging ingress,
- tenant-root provider credentials/resources,
- direct admin/agent cross-domain writers,
- mutable public-site truth,
- duplicate publish/version/domain authorities,
- raw package/module authorization,
- direct inventory quantity writers,
- embedded payment truth,
- synthetic revenue/funnel/ROAS,
- parallel model/prompt/agent registries.

## P2 candidates

Only caller=0:

- obsolete root field aliases/projections,
- old status/read adapters,
- deprecated provider metadata,
- dead demo production branches,
- duplicate historical SÖKÜM 39 planning doc cleanup if desired,
- wrappers/packages proven dead.

## Hard protection

Extension seed packages are not deleted solely due low caller count.

## Acceptance

- clean build/tests,
- protected UX regression suite,
- no caller/write telemetry,
- migration replay still works without archived code path where required,
- rollback runbook references supported paths only.

---

# 12. PR-09 — Final Acceptance / Manifest Freeze

**Branch:** `final/09-final-acceptance-freeze`  
**Depends on:** PR-00…08  
**Risk:** release governance  
**Amaç:** Migration workstream'i “looks good” yerine evidence pack ile kapatmak.

## Required evidence pack

```text
1 canonical authority map version
2 schema/contract versions
3 migration/backfill reports
4 reconciliation reports
5 legacy caller/write telemetry
6 security hard-cut probes
7 financial reconciliation
8 privacy export/erasure/legal-hold probes
9 provider reconciliation
10 rollback/recovery runbook results
11 protected UX regression results
12 final retirement list + proof per item
```

## Full acceptance

- clean install/build/runtime smoke,
- auth/admin/service negative matrix,
- tenant lifecycle/capability matrix,
- payment/finance replay/refund/reconciliation,
- public publish/action/messaging,
- commerce/inventory/analytics/agent safe loop,
- activated vertical acceptance for included release scope,
- offboarding/privacy proof,
- protected frontend snapshots.

## Freeze result

Tag/freeze exact manifest version and current source head for implementation/release audit.

No new SÖKÜM/W11 wave is created because cleanup revealed no new canonical domain; unexpected live writer discovered during implementation becomes a blocker and is mapped to an existing owner before proceeding.

---

# 13. Final definition of done

Kepenk v2 migration is not complete when old files are deleted.

It is complete when:

```text
one business fact = one live write authority
legacy writers cannot create contradictory truth
all destructive/privacy/financial/provider outcomes are provable
rollback never rewrites historical truth
protected frontend/product work still exists
```

> **Final retirement’ın amacı enkazı görünmez yapmak değil, elektriğini kesmektir. Eski dosya dursa bile authority değilse tehlike değildir; authority hâlâ yazabiliyorsa dosyayı silmiş olsak bile problem çözülmemiştir.**
