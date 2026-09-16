# W2 — Tenant + Business + Commercial Spine Exact File / Task Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLAN KAPALI — implementation başlamadı  
> **Kaynak:** SÖKÜM 01, 12, 29, 32, 34, 35, 41 + SENTEZ 1–5 + W1  
> **Amaç:** `esnaflar/{id}` içinde birbirine karışmış tenant lifecycle, business profile, subscription, entitlement, preference, quota ve release-state gerçeklerini exact file-level migration task'larına ayırmak.  
> **Kural:** Client-selected plan/module veya root field business/commercial authority yaratamaz.

---

# 1. W2 exit contract

W2 sonunda canonical authority'ler:

```text
BusinessTenant
BusinessProfile
Subscription / Contract
PlanCatalog
EntitlementGrant
CapabilityPreference
EffectiveCapabilitySet
QuotaPolicy / UsageCredit
IncidentPolicy
```

Minimum invariants:

1. `BusinessTenant.lifecycleStatus` raw `durum` string mutation ile değişmez.
2. Business profile facts tenant lifecycle record'ına gömülü authority değildir.
3. Client plan label entitlement yaratamaz.
4. Plan catalog commercial metadata'dır; runtime authorization değildir.
5. Module catalog UI/site composition metadata'dır; capability truth değildir.
6. `aktifModuller`, `aktifWebModulleri`, `ayarlar.*` compatibility projection/preference seviyesine iner.
7. Release flag commercial entitlement değildir.
8. Quota exhaustion entitlement loss değildir.
9. Admin direct document patch yerine canonical command çağırır.
10. Activation payment success ile eşit değildir; minimum-ready policy gerekir.
11. Existing marketing/pricing frontend UX korunur, commercial data source rewire edilir.

---

# 2. Canonical split of `esnaflar/{id}`

Legacy root document bugün aynı anda taşıyor:

```text
identity/profile facts
lifecycle status
package/subscription hint
module/capability projections
settings booleans
consent flags
site state
domain/provider resource fields
operational scores/notes
```

W2 migration mapping:

| Legacy field family | Canonical owner | W2 disposition |
|---|---|---|
| `durum`, lifecycle timestamps | BusinessTenant | REWRITE |
| ad/isletme/sektor/contact/location | BusinessProfile | REWIRE |
| `paket`, renewal/payment-plan hints | Subscription/Contract | PROJECTION after migration |
| `aktifModuller` | EffectiveCapability/UI projection | PROJECTION |
| `aktifWebModulleri` | CapabilityPreference / Site projection | REWIRE |
| `ayarlar.*` capability booleans | Preference/projection, dependency elsewhere | PROJECTION |
| monthly credits | Quota/Usage Credit authority | REWIRE |
| `kvkkOnay`, `smsRizasi` | Consent/Data Lifecycle | W10 authority, W2 no hard-coded truth |
| site/domain/provider fields | W3/W4 owners | do not expand in W2 |

Legacy `esnaflar` record migration boyunca compatibility read model olabilir; yeni canonical writes burada authoritative kabul edilmez.

---

# 3. Onboarding exact tasks

## W2-ONB-001 — Onboarding preview/generation

**Path**

- `apps/web/src/app/api/onboarding/submit/route.ts`

**Current role**

- sector + answers alır,
- Agent 7 ile preview content üretir,
- tenant persistence yapmadan success döner.

**Disposition:** `PRESERVE CAPABILITY + REWIRE SEMANTICS`

**Canonical role**

```text
GenerateOnboardingPreview
```

Bu endpoint tenant created/completed anlamına gelmez.

**Action**

- response semantics preview/proposal olarak açıklaştırılır,
- varsa onboarding draft ID ile bağlanır,
- Agent output BusinessProfile truth olmaz; kullanıcı/onboarding command ile kabul edilmelidir.

**Dependencies:** W8 Agent Runtime final rewire daha sonra.

---

## W2-ONB-002 — Onboarding completion / tenant creation

**Path**

- `apps/web/src/app/api/onboarding/complete/route.ts`

**Current issue**

Tek write içinde profile, plan, lifecycle, consent, modules ve site state oluşturur; request planını doğrudan `paket` yapar ve `kvkkOnay: true` hard-code eder.

**Disposition:** `REWRITE AS ORCHESTRATING ADAPTER`

**Canonical command sequence**

```text
verified onboarding/contact proof
 -> CreateBusinessTenant
 -> Create/UpdateBusinessProfile
 -> Record requested commercial intent
 -> explicit Consent commands
 -> StartOnboardingRun / ProvisioningRun
 -> issue/link Membership + Session
```

Site preview data W4 projection/authoring tarafına gider.

**Gate**

- client `paket` entitlement üretmiyor,
- `kvkkOnay=true` default yok,
- lifecycle revision mevcut,
- duplicate retry ikinci tenant üretmiyor,
- partial failure resumable workflow olarak görülebiliyor.

---

## W2-ONB-003 — Setup progress

**Path**

- `apps/web/src/app/api/esnaf/setup-progress/route.ts`

**Current role**

- process-local `Map`,
- hard-coded `demo-esnaf`,
- UI progress state.

**Disposition:** `DROP AS AUTHORITY / REWIRE TO PROJECTION`

Canonical source:

```text
OnboardingRun
ProvisioningRun
```

UI dismiss/preference state ayrı tutulabilir.

**Gate:** restart/multi-instance progress kaybetmiyor; authenticated tenant context kullanıyor.

---

# 4. Business Profile exact tasks

## W2-PROFILE-001 — Business self-service GET/PATCH

**Path**

- `apps/web/src/app/api/esnaf/[id]/route.ts`

**Current strengths**

- session ownership check,
- Zod validation,
- explicit allowed fields,
- some sensitive fields hidden on GET.

**Problems**

- raw admin token bypass,
- session tenant identity is old `esnafId`,
- reads/writes monolithic root doc.

**Disposition:** `PRESERVE API/VALIDATION SHAPE + REWIRE`

**Canonical destination**

```text
RequestContext tenant/business
 -> BusinessProfile read model
 -> UpdateBusinessProfileCommand
```

**Gate**

- no raw admin token bypass after W1,
- profile update cannot change lifecycle/subscription/entitlement/integration fields,
- optimistic profile revision if concurrent edit risk requires it.

---

## W2-PROFILE-002 — Legacy BusinessProfile projection

**Affected legacy source**

- `esnaflar/{id}` profile/contact/location/brand fields,
- existing site/profile readers.

**Disposition:** `BACKFILL + PROJECTION`

**Action**

- canonical BusinessProfile seed edilir,
- compatibility reader old fields'i geçici görür,
- new writes canonical profile authority'den legacy projection'a tek yönlü akar.

Bidirectional profile dual-write authority yasaktır.

---

# 5. Tenant lifecycle exact tasks

## W2-TENANT-001 — BusinessTenant aggregate

**Disposition:** `GREENFIELD CANONICAL AUTHORITY`

Required state:

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

Required fields:

```text
tenantId/businessId mapping
lifecycleStatus
lifecycleRevision
sessionEpoch
reason code
timestamps
```

**Gate:** transition matrix + compare-and-swap/transaction; raw string patch yok.

---

## W2-TENANT-002 — Admin create

**Path**

- `apps/web/src/app/api/admin/esnaf/route.ts`

**Current behavior**

Raw `esnaflar` document creates with plan/settings/module/provider placeholders.

**Disposition:** `ADAPTER`

Canonical flow:

```text
verified AdminPrincipal
 -> CreateBusinessTenant
 -> BusinessProfile command
 -> optional RequestedPlanIntent
 -> onboarding/provisioning state
```

**Gate:** admin create plan label entitlement değildir; provider fields yaratılmaz.

---

## W2-TENANT-003 — Admin patch/delete

**Path**

- `apps/web/src/app/api/admin/esnaf/[id]/route.ts`

**Current behavior**

PATCH allows lifecycle/package/modules/settings/provider field mutation; DELETE physically removes root doc.

**Disposition:** `SPLIT INTO COMMAND ADAPTERS`

Mapping:

```text
durum -> Suspend/Resume/BeginClosure commands
paket -> ChangeSubscription intent
module fields -> Entitlement/Preference commands
Twilio/provider -> W3 Integration command
notlar -> Admin/CRM/operator note projection if retained
DELETE -> BeginBusinessClosure, never hard delete
```

**Hard rule:** physical root delete public admin operation olmaktan çıkar.

---

## W2-TENANT-004 — Suspension enforcement

**Dependencies:** W1 RequestContext/Session.

**Action**

- RequestContext final capability gate tenant lifecycle okur,
- SUSPENDED/CLOSING/CLOSED state policy reason code üretir,
- security-sensitive transition `sessionEpoch` invalidate edebilir.

**Gate:** pre-existing valid session suspension sonrası normal business mutation yapamıyor.

---

# 6. Commercial catalog / subscription exact tasks

## W2-COM-001 — Plan catalog seed

**Path**

- `apps/web/src/data/paketler.ts`

**Strengths**

- centralized plan ids/names,
- monthly/yearly commercial metadata,
- quota metadata,
- backward-compatible mappings.

**Disposition:** `PRESERVE AS CATALOG SEED + REWIRE`

**Canonical destination**

```text
PlanCatalog
PlanVersion
Subscription/Contract references plan version
```

`ozellikler[]` human-readable marketing copy; authorization capability keys değildir.

**Gate:** historical subscription old plan version'ını referanslayabiliyor; mutable catalog change past contract truth'u değiştirmiyor.

---

## W2-COM-002 — Public pricing cards

**Path**

- `apps/web/src/components/sections/PricingCards.tsx`

**Observed drift**

Component kendi hard-coded plan/fiyat listesini taşır. `apps/web/src/data/paketler.ts` ile özellikle yıllık fiyat metadata'sı birebir aynı değildir.

**Disposition:** `PRESERVE WHOLE UX + CONTENT/DATA REWIRE`

**Action**

- kart visual/motion/layout korunur,
- plan names/prices/features canonical commercial projection'dan gelir,
- launch anındaki actual product strategy ayrıca source-of-truth review'dan geçer.

**Gate:** landing price != checkout/subscription catalog drift yok.

---

## W2-COM-003 — Subscription authority

**Disposition:** `GREENFIELD CANONICAL AUTHORITY`

Minimum model:

```text
Subscription
ContractVersion
PlanRef
status
period
validFrom / validUntil
billing linkage
change reason/source
revision
```

Payment Core W6 actual payment truth'u sağlar; W2 commercial contract state'i tanımlar.

---

# 7. Entitlement / module exact tasks

## W2-ENT-001 — Module catalog

**Path**

- `apps/web/src/data/moduller.ts`

**Strengths**

- rich module vocabulary,
- sector mapping,
- category metadata,
- minimum-plan policy seed,
- site-generation metadata/templates.

**Disposition:** `PRESERVE METADATA + SPLIT AUTHORITY`

Keep:

- module id/name/category,
- sector/site composition metadata,
- human-facing min-plan policy input if useful.

Rewrite:

- `modulKullanilabilir()` package-name comparison cannot be server authorization.

Canonical mapping:

```text
Module metadata
 -> Capability mapping
 -> Entitlement policy
 -> EffectiveCapabilitySet
```

---

## W2-ENT-002 — Client module sync

**Path**

- `apps/web/src/app/api/esnaf/sync-moduller/route.ts`

**Current issue**

Authenticated client-supplied `moduller[]` directly writes `aktifWebModulleri` + `siteJson.moduller` without entitlement intersection.

**Disposition:** `REWRITE AS PREFERENCE COMMAND`

Canonical flow:

```text
requested module preferences
 -> map to capabilities/modules
 -> intersect entitlement/effective policy
 -> persist CapabilityPreference / SitePreference
 -> project site composition
```

**Gate:** client cannot enable non-entitled module by request body.

---

## W2-ENT-003 — EffectiveCapabilitySet

**Disposition:** `GREENFIELD CANONICAL RESOLVER`

Deterministic order:

```text
RequestContext
Tenant lifecycle
Release flag
Entitlement grant
Tenant preference
Dependency health
Quota
Domain preconditions
 -> allow/deny + reasonCode
```

Minimum reason family:

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

---

## W2-ENT-004 — Release flags

**Path**

- `apps/web/src/lib/mvpFeatureFlags.ts`

**Disposition:** `PRESERVE AS RELEASE INPUT`

**Hard invariant:** MVP/release flag entitlement veya subscription değildir.

`proxy.ts` ve UI route gating release flag tüketebilir; domain command ayrıca EffectiveCapabilitySet kullanır.

---

# 8. Quota / admin control exact tasks

## W2-QUOTA-001 — Admin kota multiplexer

**Path**

- `apps/web/src/app/api/admin/kota/route.ts`

**Current issue**

Tek switch içinde:

- usage credit grant,
- plan change,
- suspension/reactivation,
- global kill switch

farklı authority'ler doğrudan mutate edilir.

**Disposition:** `SPLIT INTO CANONICAL COMMAND ADAPTERS`

Mapping:

```text
kredi_hediye -> GrantUsageCredit
paket_degistir -> ChangeSubscription
askiya_al -> SuspendBusiness
aktif_et -> ResumeBusiness
kill_switch -> SetIncidentPolicy
```

**Gate:** every operation actor/reason/audit/revision carries; no raw field mutation.

---

## W2-QUOTA-002 — Usage credits

Legacy source:

```text
esnaflar/{id}/monthly_credits/{YYYY-MM}
```

**Disposition:** `MIGRATE / REWIRE`

Canonical semantics:

```text
entitlement != quota
usage period
base allocation
adjustment/grant entries
consumed
remaining projection
```

Admin gift should be an adjustment event, not silent mutable total truth.

---

## W2-INC-001 — Incident / kill switch

Legacy source:

- `global_settings/status`
- admin kota `kill_switch` operation.

**Disposition:** `REWRITE POLICY`

Canonical fields:

```text
scope global|tenant|capability|provider
reason
actor
incident/case id
createdAt
expiresAt?
revision
enforcement state
```

**Gate:** target execution points actually enforce the incident policy; UI text alone is not a kill switch.

---

# 9. Package activation monolith

## W2-PROV-001 — `paketSenaryosuCalistir`

**Path**

- `apps/web/src/utils/paketSenaryosu.ts`

**Current behavior**

One function currently:

- sets tenant active,
- writes plan/payment id/renewal,
- computes modules,
- provisions VAPI,
- queues site generation,
- generates content,
- sends WhatsApp/email/Telegram,
- flips settings booleans,
- triggers domain gift.

**Disposition:** `DECOMPOSE / ADAPTER THEN ARCHIVE`

Canonical split:

```text
Subscription change -> W2
Entitlement diff -> W2
Tenant activation eligibility -> W2
ProvisioningRun -> W2/W3 backbone
Provider provisioning -> W3
Site generation/publish -> W4
Messaging notifications -> W5
Payment truth -> W6
Marketing/content -> W7/W8
Domain provisioning -> W3/W4
```

**Action**

Legacy function may temporarily orchestrate adapters, but stops being write authority step by step.

**Gate for archive:** all side-effect callers routed to canonical commands/jobs; caller=0; no authoritative writes remain.

---

# 10. Payment callback boundary

## W2-BOUNDARY-001 — Payment -> commercial activation bridge

**Path**

- `apps/web/src/app/api/payment/callback/route.ts`

**Current role**

Verified-looking provider retrieve result is used to parse tenant ID and call `paketSenaryosuCalistir(esnafId, esnaf.paket, paymentId)`.

**W2 disposition:** `DECLARE ADAPTER TARGET; FULL REWRITE W6`

Target event contract:

```text
Payment Core verified success
 -> commercial order/subscription activation event
 -> Subscription authority
 -> EntitlementChanged
 -> ProvisioningRun
 -> BusinessTenant activation eligibility
```

W2 does not own provider payment verification; W6 does.

---

# 11. W2 exact task order

```text
T1  Define BusinessTenant lifecycle + revision/sessionEpoch contract
T2  Define BusinessProfile canonical schema + legacy mapping
T3  Define PlanCatalog + Subscription/Contract contracts
T4  Define CapabilityKey + EntitlementGrant + CapabilityPreference
T5  Build EffectiveCapabilitySet resolver contract/reason codes
T6  Backfill tenant/profile mapping from `esnaflar`
T7  Rewire onboarding complete into canonical commands
T8  Replace setup-progress authority with OnboardingRun/Provisioning projection
T9  Rewire self-service esnaf GET/PATCH to BusinessProfile
T10 Rewire admin create/patch/delete to tenant/profile/subscription commands
T11 Rewire sync-moduller to preferences + entitlement intersection
T12 Split admin kota operations into canonical commands
T13 Introduce quota adjustment semantics
T14 Decompose `paketSenaryosuCalistir` into command/job bridge
T15 Preserve release flags as independent resolver input
T16 Rewire public PricingCards to commercial projection without visual rewrite
T17 Add lifecycle/capability/admin negative tests + projection parity
```

Parallelization:

- T1–T5 contract work can be split but must converge before writers move.
- T6 read/backfill tooling after stable schemas.
- T7/T9/T10/T11/T12 can migrate in parallel behind adapters.
- T14 depends on W3/W4/W5/W6 interfaces; decomposition can begin, final archive cannot.

---

# 12. W2 acceptance matrix

| Senaryo | Beklenen |
|---|---|
| Client onboarding selects expensive/invalid plan | no entitlement without server commercial authority |
| Onboarding retry | duplicate tenant yok |
| Tenant ACTIVE transition | allowed state + revision + minimum-ready policy |
| Stale lifecycle revision | reject |
| Suspended tenant old session | normal business mutation deny |
| Admin changes plan | Subscription command + audit, raw `paket` patch yok |
| Admin grants credit | adjustment event + quota projection |
| Client requests non-entitled module | deny / preference cannot elevate entitlement |
| Release flag off, entitlement on | effective deny `RELEASE_DISABLED` |
| Quota zero, entitlement on | effective deny `QUOTA_EXHAUSTED`, entitlement retained |
| Dependency unavailable | effective deny dependency reason |
| Pricing landing vs checkout/catalog | same canonical commercial projection |
| `setup-progress` process restart | progress durable projection'dan gelir |
| Admin DELETE tenant | closure workflow, physical root hard-delete yok |
| Package downgrade | stale high-tier booleans/resources authority değildir; deprovision diff planned |

---

# 13. Frontend protection

Protected and preserved:

- root Kepenk landing,
- `PricingCards` visual/motion/card composition,
- onboarding UX,
- dashboard/editor UI shells.

W2 changes only:

- pricing/commercial data source,
- capability visibility projection,
- onboarding command semantics,
- status/read-model wiring.

No aesthetic redesign is implied.

---

# 14. W2 cleanup candidates after gate

### Projection-only after cutover

- root `paket`,
- `aktifModuller`,
- `aktifWebModulleri`,
- capability-like `ayarlar.*`,
- mutable monthly credit totals,
- raw lifecycle `durum` field.

### Archive candidate later

- `paketSenaryosuCalistir` monolith after all side-effects extracted,
- in-memory `setup-progress` authority,
- direct admin tenant/package/module mutation branches.

### Preserve

- plan catalog concept,
- module metadata/templates,
- release flags,
- onboarding frontend/data capture UX,
- profile validation UX/API shape,
- pricing card design.

---

# 15. W2 final verdict

> **W2'nin amacı `esnaflar` document'ını başka bir dev tabloyla değiştirmek değildir. Tenant lifecycle, business profile, commercial contract, entitlement, preference, quota ve release state'i birbirinden ayırıp legacy root document'ı tek yönlü compatibility projection'a indirmektir. Kepenk'in onboarding ve pricing emeği korunur; authority sınırları yeniden kablolanır.**
