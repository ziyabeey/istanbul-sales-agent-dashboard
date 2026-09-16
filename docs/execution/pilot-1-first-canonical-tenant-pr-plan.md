# Pilot-1 — First Canonical Tenant Ticket / PR Plan

> **Tarih:** 2026-09-16  
> **Durum:** IMPLEMENTATION-READY PLAN — kod implementasyonu başlamadı  
> **Kaynak:** `w02-tenant-business-commercial-spine.md`, `w10-admin-privacy-offboarding-final-cleanup.md`, `pilot-cutover-packaging.md`, Pilot-0 trust plan  
> **Amaç:** Tek bir Fixture + Canary Tenant üzerinde `esnaflar/{id}` monolit authority'sini BusinessTenant / BusinessProfile / Subscription / Entitlement / Preference / Quota authority'lerine ayırmak.  
> **Kural:** Legacy root document hemen silinmez. Canonical authority açıldıktan sonra yalnız **canonical -> legacy one-way projection** olarak compatibility görevi görebilir.

---

# 1. Pilot-1 exit gate

Pilot-1 kapanışında canary için:

```text
BusinessTenant
BusinessProfile
PlanCatalog / PlanVersion
Subscription / ContractVersion
EntitlementGrant
CapabilityPreference
EffectiveCapabilitySet
UsageCredit / QuotaAdjustment
OnboardingRun / ProvisioningRun minimum
LegacyEsnafProjection
DataClassPolicy registration
```

kanıtlanmış olmalıdır.

Invariants:

1. `esnaflar/{id}.durum` canonical lifecycle authority değildir.
2. Profile update lifecycle/subscription/entitlement değiştiremez.
3. Client-selected `paket` capability yaratamaz.
4. PlanCatalog marketing/commercial metadata; runtime authorization değildir.
5. `aktifModuller`, `aktifWebModulleri`, `ayarlar.*` effective capability truth değildir.
6. Release flag entitlement değildir.
7. Quota exhaustion entitlement kaybı değildir.
8. Tenant lifecycle revisioned state machine'dir; raw string patch değildir.
9. Admin canary lifecycle/plan/credit actions canonical commands'a iner.
10. Legacy root field'e manuel write canonical truth'u değiştiremez.
11. Canonical write sonrası compatibility gerekiyorsa yalnız tek yönlü legacy projection güncellenir.
12. New canonical stores W10 DataClassPolicy registry'ye canary write öncesi kaydedilir.
13. Landing/PricingCards/onboarding/dashboard UX korunur.

---

# 2. Branch / PR graph

```text
p1/00-tenant-baseline-data-inventory
                ↓
p1/01-tenant-profile-core
                ├────────────────────┐
                ↓                    ↓
p1/02-commercial-entitlement    p1/03-backfill-shadow
                └──────────┬─────────┘
                           ↓
                  p1/04-onboarding-run
                           ↓
                  p1/05-profile-projection
                           ├─────────────────┐
                           ↓                 ↓
                  p1/06-admin-commands  p1/07-capability-pricing
                           └──────────┬──────┘
                                      ↓
                             p1/08-canary-cutover
```

Parallelization:

- P1-02 and initial P1-03 tooling can proceed after P1-01 contract freeze.
- P1-06 and P1-07 may develop in parallel after profile/commercial contracts settle.
- P1-08 merges only after all prior PRs exact-head accepted.

---

# 3. PR-00 — Tenant Baseline + Data Inventory Registration

**Branch:** `p1/00-tenant-baseline-data-inventory`  
**Depends on:** Pilot-0 accepted  
**Risk:** low/additive  
**Amaç:** `esnaflar/{id}` field families, current readers/writers and future canonical data classes için deterministic migration baseline oluşturmak.

## Existing sources

- `esnaflar/{id}` root document and known subcollections
- `apps/web/src/app/api/onboarding/complete/route.ts`
- `apps/web/src/app/api/esnaf/[id]/route.ts`
- `apps/web/src/app/api/admin/esnaf/route.ts`
- `apps/web/src/app/api/admin/esnaf/[id]/route.ts`
- `apps/web/src/app/api/admin/kota/route.ts`
- `apps/web/src/utils/paketSenaryosu.ts`
- `apps/web/src/app/api/esnaf/sync-moduller/route.ts`

## Deliverables

- field-to-canonical-owner mapping fixture,
- Fixture Tenant deterministic snapshot,
- Canary Tenant explicit allowlist definition,
- writer/caller inventory for `durum`, `paket`, module/settings and profile fields,
- DataClassPolicy entries planned for:
  - BusinessTenant
  - BusinessProfile
  - Subscription/ContractVersion
  - EntitlementGrant
  - CapabilityPreference
  - UsageCredit/QuotaAdjustment
  - OnboardingRun/ProvisioningRun
  - compatibility projection/tombstone metadata where applicable.

## Merge gate

- no writer moved yet,
- baseline records current value/unit/null/default semantics,
- protected frontend routes/components listed,
- every future canonical store has lifecycle owner/purpose/retention classification before canary write.

## Rollback

Additive inventory/fixtures only.

---

# 4. PR-01 — BusinessTenant + BusinessProfile Core

**Branch:** `p1/01-tenant-profile-core`  
**Depends on:** P1-00  
**Risk:** medium/additive authority foundation  
**Amaç:** Lifecycle truth ile profile facts'i ilk kez fiziksel/contract olarak ayırmak.

## Existing seed surfaces

- `apps/web/src/app/api/esnaf/[id]/route.ts`
- `apps/web/src/app/api/onboarding/complete/route.ts`
- current `esnaflar/{id}` profile/lifecycle fields
- Pilot-0 RequestContext / Membership contract

## Canonical minimum

```text
BusinessTenant {
  tenantId
  lifecycleStatus
  lifecycleRevision
  sessionEpoch
  reasonCode?
  createdAt
  activatedAt?
  suspendedAt?
  closingAt?
  closedAt?
}

BusinessProfile {
  businessId/tenantId
  revision
  legal/display name
  sector
  contact/location/brand facts
  updatedAt
}
```

Lifecycle baseline:

```text
CREATING
ONBOARDING
PROVISIONING
ACTIVE
SUSPENDED
CLOSING
OFFBOARDING
CLOSED
```

## Required commands

```text
CreateBusinessTenant
TransitionBusinessLifecycle
UpdateBusinessProfile
```

Transitions use revision/CAS or transaction semantics.

## Acceptance

- invalid lifecycle jump deny,
- stale lifecycle revision deny,
- profile write cannot mutate lifecycle,
- suspension can bump/invalidate `sessionEpoch` policy,
- BusinessTenant contains no package/site/provider/consent truth,
- BusinessProfile contains no lifecycle/subscription authority.

## Rollback

Additive canonical records can be ignored by readers before writer cutover. No destructive legacy mutation.

---

# 5. PR-02 — Commercial / Entitlement / Capability Core

**Branch:** `p1/02-commercial-entitlement`  
**Depends on:** P1-01  
**Risk:** medium-high  
**Amaç:** `paket` ve module booleans'ını commercial/capability authority'den ayırmak.

## Existing seeds

- `apps/web/src/data/paketler.ts`
- `apps/web/src/data/moduller.ts`
- `apps/web/src/lib/mvpFeatureFlags.ts`
- `esnaflar/{id}/monthly_credits/{YYYY-MM}`

## Canonical minimum

```text
PlanCatalog / PlanVersion
Subscription / ContractVersion
CapabilityKey
EntitlementGrant
CapabilityPreference
EffectiveCapabilitySet
QuotaPolicy
QuotaAdjustment / UsageCredit
```

## Effective capability order

```text
RequestContext
 -> Tenant lifecycle
 -> Release flag
 -> Entitlement grant
 -> Tenant preference
 -> Dependency readiness
 -> Quota
 -> Domain preconditions
 -> allow/deny + reasonCode
```

Reason family at minimum:

```text
TENANT_SUSPENDED
RELEASE_DISABLED
NOT_ENTITLED
PREFERENCE_DISABLED
DEPENDENCY_NOT_READY
REAUTH_REQUIRED
QUOTA_EXHAUSTED
POLICY_MISMATCH
```

## Acceptance

- arbitrary plan label cannot produce entitlement,
- plan version change does not rewrite past contract truth,
- module metadata does not authorize server command,
- quota=0 preserves entitlement but returns quota deny reason,
- release flag off + entitlement on -> `RELEASE_DISABLED`,
- preference cannot elevate entitlement,
- base allocation and admin credit adjustment are distinguishable ledger-like events/projection.

## Rollback

Additive commercial/capability read models can be disabled before writer cutover. No return to package-string authorization after P1-08 hard gate.

---

# 6. PR-03 — Backfill + Shadow Parity Engine

**Branch:** `p1/03-backfill-shadow`  
**Depends on:** P1-01 contract freeze, P1-02 schemas available for full mapping  
**Risk:** medium, data migration tooling  
**Amaç:** Fixture then Canary `esnaflar/{id}` state'ini canonical records'a deterministic/idempotent backfill etmek ve parity raporu üretmek.

## Migration mapping

```text
legacy durum/timestamps -> BusinessTenant seed
profile/contact/location/brand -> BusinessProfile
paket/commercial hints -> requested/mapped Subscription seed, never inferred paid truth
module/settings -> preference/projection seed
monthly_credits -> usage/quota migration source
consent/site/integration -> NOT OWNED BY P1, explicit external-owner references only
```

## Strict rules

- backfill may read legacy, never make legacy canonical by bidirectional sync,
- ambiguous value -> migration exception, not guessed truth,
- payment/provider/consent status not inferred beyond proven source semantics,
- every run idempotent and produces mapping/report version.

## Acceptance

- rerun produces no duplicate canonical entities,
- Fixture exact parity report deterministic,
- Canary discrepancies explicitly classified,
- unknown/ambiguous fields reported,
- no production-general cohort scan/write before canary approval.

## Rollback

Backfill records can be quarantined/recreated before writer cutover. Legacy remains serving authority until P1-08.

---

# 7. PR-04 — OnboardingRun / ProvisioningRun Adapter

**Branch:** `p1/04-onboarding-run`  
**Depends on:** P1-01 + P1-02 + Pilot-0 durable trust  
**Risk:** high, tenant creation path  
**Amaç:** Onboarding UX'i koruyarak tenant creation'ı monolithic root write'tan canonical command orchestration'a taşımak.

## Existing paths

- `apps/web/src/app/api/onboarding/submit/route.ts`
- `apps/web/src/app/api/onboarding/complete/route.ts`
- `apps/web/src/app/api/esnaf/setup-progress/route.ts`

## Semantics

`submit`:

```text
GenerateOnboardingPreview / save draft
!= tenant created
!= onboarding complete
```

`complete`:

```text
Verified contact/onboarding proof
 -> CreateBusinessTenant
 -> Create/UpdateBusinessProfile
 -> record requested commercial intent
 -> explicit consent commands later W10 boundary
 -> Start OnboardingRun / ProvisioningRun
 -> Membership/session linkage
```

`setup-progress`:

```text
process Map/demo state -> durable OnboardingRun/ProvisioningRun projection
```

## Acceptance

- retry does not create second tenant,
- request `paket` does not grant entitlement,
- no hard-coded `kvkkOnay=true`,
- partial provisioning visible/resumable,
- restart does not lose progress,
- onboarding preview success cannot masquerade as tenant activation,
- existing onboarding UI flow preserved.

## Rollback

For non-canary traffic legacy onboarding may remain until broader rollout. Canary writer, once canonical, must not create a second root-authoritative tenant.

---

# 8. PR-05 — BusinessProfile API + One-Way Legacy Projection

**Branch:** `p1/05-profile-projection`  
**Depends on:** P1-03 + P1-04  
**Risk:** high, first writer cutover  
**Amaç:** Canary self-service profile writes canonical BusinessProfile'a taşınırken untouched legacy readers'ı bozmamak.

## Existing path

- `apps/web/src/app/api/esnaf/[id]/route.ts`
- profile/site/dashboard readers of root `esnaflar` fields

## Canonical flow

```text
RequestContext
 -> UpdateBusinessProfileCommand
 -> BusinessProfile revision
 -> one-way LegacyEsnafProjection update
```

Forbidden:

```text
legacy root write -> canonical profile sync
```

as continuous authority.

## Acceptance

- canary profile update canonical first,
- stale revision conflict explicit,
- compatibility root projection updates expected legacy fields,
- manual root edit does not alter canonical profile,
- profile endpoint cannot touch package/status/module/provider authority,
- untouched dashboard/site readers continue rendering.

## Rollback

Reader can temporarily read legacy projection. Writer must remain canonical for canary once cut over; rollback cannot re-enable bidirectional authority.

---

# 9. PR-06 — Admin Tenant / Commercial Command Adapters

**Branch:** `p1/06-admin-commands`  
**Depends on:** Pilot-0 AdminPrincipal/Audit + P1-01/P1-02/P1-05  
**Risk:** critical, privileged business mutation  
**Amaç:** Canary tenant için admin universal Firestore writer'ını command adapter'a dönüştürmek.

## Existing paths

- `apps/web/src/app/api/admin/esnaf/route.ts`
- `apps/web/src/app/api/admin/esnaf/[id]/route.ts`
- `apps/web/src/app/api/admin/kota/route.ts`

## Mapping

```text
create tenant -> CreateBusinessTenant + BusinessProfile + requested commercial intent
`durum` -> SuspendBusiness / ResumeBusiness / BeginClosure
`paket` -> ChangeSubscription
module fields -> Entitlement/Preference command
`kredi_hediye` -> GrantUsageCredit adjustment
Twilio/provider fields -> W3 command boundary, not direct write
DELETE -> BeginBusinessClosure, never root hard delete
kill_switch -> W10 OperationalPolicy, not W2 tenant field
```

## Pilot-1 scope

Only W2-owned commands need fully live behavior. W3/W10-owned actions may route to explicit not-ready/adapter outcomes, but admin cannot directly mutate foreign authority.

## Acceptance

- every privileged command carries AdminPrincipal/session/reason/request/correlation id,
- plan change creates Subscription change, not root `paket` truth,
- suspension invalidates normal mutation access according to policy,
- credit grant is adjustment event/projection,
- root DELETE unavailable for canary,
- unsupported provider mutation does not fallback to root field patch.

## Rollback

Canary admin writer may be feature/cohort disabled. Rollback cannot restore physical root delete or raw cross-domain patch for the canary.

---

# 10. PR-07 — Module Preferences + Pricing Projection

**Branch:** `p1/07-capability-pricing`  
**Depends on:** P1-02 + P1-05  
**Risk:** medium, UX/data-source change  
**Amaç:** Module selection and public pricing UI'ı canonical commercial/capability projection'a bağlamak without redesign.

## Existing paths

- `apps/web/src/app/api/esnaf/sync-moduller/route.ts`
- `apps/web/src/data/moduller.ts`
- `apps/web/src/data/paketler.ts`
- `apps/web/src/components/sections/PricingCards.tsx`
- `apps/web/src/lib/mvpFeatureFlags.ts`

## Module flow

```text
requested module preferences
 -> map module -> capability
 -> intersect EffectiveCapabilitySet
 -> persist CapabilityPreference / SitePreference
 -> project allowed site composition
```

## Pricing flow

```text
PlanCatalog/PlanVersion commercial projection
 -> PricingCards data
```

Visual card hierarchy, motion and layout remain preserved.

## Acceptance

- client cannot enable non-entitled module,
- release flag cannot grant entitlement,
- PricingCards and subscription/catalog source agree,
- old five-plan/stale pricing hard-code no longer independently authoritative,
- landing visual snapshot materially unchanged,
- 360/390 responsive pricing smoke green.

## Rollback

UI can temporarily consume cached/compatibility commercial projection, not reintroduce a second hard-coded pricing authority.

---

# 11. PR-08 — Canary Tenant Cutover + Root Write Deny

**Branch:** `p1/08-canary-cutover`  
**Depends on:** P1-03 through P1-07 accepted  
**Risk:** critical, authority cutover  
**Amaç:** One explicit Canary Tenant için lifecycle/profile/commercial/capability/quota writes canonicalize edip legacy root'u compatibility projection'a düşürmek.

## Affected bridge

- `apps/web/src/utils/paketSenaryosu.ts`
- `apps/web/src/app/api/payment/callback/route.ts` boundary declaration/adapter only
- any remaining canary writers found in P1-00 inventory

## `paketSenaryosuCalistir` canary behavior

Legacy function may remain an orchestrating adapter, but for W2 facts:

```text
subscription/lifecycle/entitlement
 -> canonical W2 commands first
```

Then downstream legacy side effects may continue temporarily behind explicit adapters until W3/W4/W5/W6 cutover.

It must not:

- authoritatively set root `durum/paket` first,
- treat provider payment id as W2 payment truth,
- create entitlement from client/root plan label.

Full payment callback rewrite remains Pilot-2/W6.

## Root write deny for canary authority families

New direct authoritative writes denied/intercepted for:

```text
durum/lifecycle
profile-owned fields outside projection path
paket/subscription
entitlement/module effective truth
quota balance truth
```

Compatibility projection writer is the only allowed legacy root updater for these fields.

## Acceptance evidence

### Lifecycle

- ACTIVE/SUSPENDED transition revisioned,
- stale revision deny,
- suspended tenant old session loses normal business mutation,
- manual root `durum` edit ignored by canonical authority.

### Profile

- self-service update canonical first,
- legacy projection parity,
- manual root profile edit cannot become canonical.

### Commercial

- invalid/client-selected plan cannot grant entitlement,
- admin plan change command + audit,
- historical plan version stable.

### Capability

- non-entitled module request denied,
- quota exhaustion reason distinct from entitlement,
- release flag distinct from entitlement.

### Compatibility

- current dashboard/editor/site readers that still depend on root projection render,
- restart does not lose onboarding/provisioning progress,
- no bidirectional loop or projection oscillation.

## Rollback

- reader routing can return to legacy projection,
- canary cohort can be disabled,
- canonical records remain authoritative for writes already cut over,
- projection can be rebuilt from canonical state,
- no software rollback writes canonical state backwards from root document.

---

# 12. Pilot-1 protected frontend contract

Explicitly protected:

```text
apps/web root marketing landing
PricingCards visual composition/animation
onboarding UI
/dashboard shell
/editor shell
/giris flow
apps/sites public shell
```

Pilot-1 may change:

- data source,
- capability visibility,
- status projection,
- error/loading semantics required for canonical commands.

Pilot-1 may not gratuitously redesign these surfaces.

---

# 13. Review ownership

| PR | Primary review | Secondary review |
|---|---|---|
| P1-00 | Data/Architecture | Privacy lifecycle |
| P1-01 | Security/DB | Architecture |
| P1-02 | Security/Commercial | Product policy |
| P1-03 | DB/Migration | Independent reconciliation |
| P1-04 | Security/DB | Browser/Onboarding |
| P1-05 | DB/API | Browser regression |
| P1-06 | Security/Admin | Commercial/Tenant |
| P1-07 | Product/Commercial | Frontend regression |
| P1-08 | Independent Security/DB acceptance | Independent Browser/Regression acceptance |

Implementer self-approval is insufficient for P1-08.

---

# 14. Merge discipline

Every P1 implementation PR includes:

```text
base SHA / head SHA
pilot task IDs
canonical owner changed
data classes touched
backfill/projection effect
canary/cohort rule
idempotency/revision semantics
negative tests
rollback path
legacy writer status
protected frontend impact
```

Required chain:

```text
schema/contracts
 -> repository/transaction tests
 -> migration/parity
 -> negative authority tests
 -> browser smoke where UI affected
 -> exact-head independent review
```

---

# 15. Pilot-1 definition of done

Pilot-1 is done only when one real canary business can answer these questions without consulting mutable root-field truth:

```text
Bu tenant hangi lifecycle state'te?
İşletme profili nedir?
Hangi subscription/plan version geçerli?
Hangi capability'lere entitled?
Hangilerini tercih olarak açtı/kapattı?
Effective capability sonucu ne ve neden?
Kalan kullanım kredisi ne ve hangi adjustment'lardan oluştu?
Onboarding/provisioning hangi adımda?
```

Legacy `esnaflar/{id}` o noktada yalnız compatibility projection'dır.

Pilot-1 does **not** yet mean:

- provider integrations fully migrated,
- site publish canonicalized,
- customer/booking/payment/finance migrated,
- privacy purge complete,
- package provisioning monolith fully archived.

> **Pilot-1 başarı ölçütü yeni dashboard değil, tenant gerçeğinin tek sahibi olmasıdır. Root document hâlâ görünse bile kararları o vermiyorsa monolitin kalbi sökülmüş demektir.**
