# Pilot-3 — Public Site + Public Action + Messaging PR Plan

> **Tarih:** 2026-09-16  
> **Durum:** IMPLEMENTATION-READY PLAN — kod implementasyonu başlamadı  
> **Kaynak:** W3, W4, W5, Pilot-0/1/2 plans, frontend preservation contract  
> **Amaç:** Canary işletme sitesini draft -> immutable publish -> domain -> public action -> Customer/Booking -> MessageIntent -> provider outcome zincirine geçirmek.  
> **Koruma kuralı:** Kepenk/KPNK ana marketing landing ve mevcut business-site editor/theme/renderer UX yeniden tasarlanmaz.

---

# 1. Pilot-3 golden path

```text
Editor State
 -> Canonical SiteDraft
 -> immutable Page/Master/Asset refs
 -> PublishCommand
 -> PublishedSiteRevision
 -> atomic activePublishId
 -> DomainBinding
 -> apps/sites Public Runtime
 -> PublicActionManifest
 -> BOOKING_REQUEST / INQUIRY_CREATE
 -> P2 Customer / Booking
 -> MessageIntent
 -> W3 provider transport
 -> Message delivery projection
```

Initial canary scope:

- one Canary Tenant from Pilot-1,
- one business site,
- one hostname/domain binding,
- one active published revision,
- Booking + Contact action subset,
- one messaging provider connection, preferably existing Twilio path first,
- existing `apps/sites` shell,
- current editor UX preserved.

Commerce Order/Checkout public action waits Pilot-4/W7 integration unless already purely read-only.

---

# 2. Exit invariants

1. Autosave/draft never changes active public revision.
2. Published revision is immutable and reproducible.
3. Publish failure never changes active pointer.
4. Rollback is pointer swap to previous READY revision.
5. Public runtime resolves `hostname -> DomainBinding -> activePublishId`.
6. Public caller body cannot choose tenant/business authority.
7. State-changing public action is bound to site/revision/actionId.
8. Live UI success only after authoritative command commit.
9. Duplicate submit produces one logical effect.
10. Provider webhook signature verification precedes Messaging/Customer/Booking effect.
11. Provider event durable inbox commit precedes ACK semantics where required.
12. MessageIntent != sent != delivered.
13. Messaging provider ID/phone is alias, not internal conversation/customer ID.
14. `apps/sites` public runtime has least privilege.
15. Main Kepenk marketing frontend remains visually preserved.

---

# 3. Branch / PR graph

```text
p3/00-public-baseline
       ├──────────────┬───────────────┐
       ↓              ↓               ↓
p3/01-draft-core p3/02-asset-core p3/07-messaging-core
       └───────┬──────┘               │
               ↓                      │
        p3/03-publish-core            │
               ↓                      │
        p3/04-domain-runtime          │
               ↓                      │
        p3/05-public-actions          │
               ├──────────────┐       │
               ↓              ↓       ↓
        p3/06-booking-lead   p3/08-provider-messaging
               └──────────────┬───────┘
                              ↓
                       p3/09-canary-cutover
```

P3-07 Messaging Core may develop in parallel with site draft/publish work after Pilot-0/1 contracts exist.

---

# 4. PR-00 — Protected Frontend / Public Runtime Baseline

**Branch:** `p3/00-public-baseline`  
**Depends on:** Pilot-0, Pilot-1, Pilot-2 accepted  
**Risk:** low/additive  
**Amaç:** Business-site output and Kepenk acquisition frontend için visual/runtime baseline freeze.

## Protected acquisition frontend

Explicitly baseline and protect:

- `apps/web/src/app/page.tsx`
- root layout / globals
- Navbar
- current marketing landing sections
- pricing/public/legal/SEO route shell
- `docs/sentez/frontend-preservation-contract.md`

## Business-site surfaces

- `apps/web/src/app/dashboard/sitem/editor/page.tsx`
- editor components/store/hooks
- `apps/web/src/app/editor-preview/page.tsx`
- `packages/site-schema/**`
- `packages/renderer/**`
- `packages/publish-engine/**`
- `packages/templates/**`
- `apps/sites/**`

## Deliverables

- screenshot/browser baseline for editor + one generated site,
- current published HTML/content hash baseline for canary,
- current hostname resolution trace,
- current live booking/contact module behavior trace,
- DataClassPolicy entries planned for draft/page/master/assets/published revisions/domain bindings/public action requests/conversations/messages.

## Merge gate

No authority writer moved yet. Baseline must make visual regressions and live-public mutation observable.

---

# 5. PR-01 — Canonical SiteDraft / Validated Save

**Branch:** `p3/01-draft-core`  
**Depends on:** P3-00  
**Risk:** high, authoring persistence  
**Amaç:** Editor state'i canonical draft'a serialize edip autosave'ın public state yazmasını bitirmek.

## Existing paths

- `packages/site-schema/src/manifest.ts`
- `validators.ts`, `page.ts`, `component.ts`
- editor page/components/store/useAutosave
- `apps/web/src/utils/themeToSiteData.ts`
- `apps/web/src/app/api/site/editor-kaydet/route.ts`
- `apps/web/src/app/api/site/v2/save/route.ts`

## Required semantics

```text
EditorState
 -> single SiteDraft serializer
 -> server validation
 -> recomputed content hashes
 -> optimistic draft revision
 -> immutable/stable Page/Master refs
```

`editor-kaydet` compatibility route may remain, but draft-only.

## Acceptance

- 1000 autosaves cannot change current active public output,
- stale draft revision conflicts,
- forged content hash rejected/recomputed,
- editor reload round-trip preserves all editable state,
- no duplicate save keyboard path produces authority divergence,
- preview remains functional.

## Rollback

Draft reader can temporarily use legacy editor projection; public active revision remains untouched.

---

# 6. PR-02 — Asset Core Minimum

**Branch:** `p3/02-asset-core`  
**Depends on:** P3-00  
**Risk:** medium-high  
**Amaç:** Raw mutable URL/blob media yerine owned Asset identity ve publishable READY asset contract kurmak.

## Existing seeds

- `packages/site-schema/src/component.ts` MediaRef consumers
- editor `MediaPanel.tsx`
- `ImageEditOverlay.tsx`
- editor media library state
- `apps/web/src/lib/unsplashService.ts`
- `apps/web/src/app/api/unsplash/route.ts`

## Canonical minimum

```text
AssetRecord
AssetBlob(contentHash, immutableObjectKey)
AssetVariant
AssetProvenance
UploadIntent
```

Lifecycle:

```text
PENDING -> PROCESSING -> READY | BLOCKED -> RETIRED
```

## Acceptance

- local `blob:` URL cannot persist as canonical media,
- actual MIME/decode/size/hash validated,
- cross-tenant asset reference denied,
- Unsplash import records provenance and stable asset identity,
- published candidate references READY assets only.

## Rollback

Editor can use legacy preview media for draft display, but canonical publish does not accept unowned/unready asset.

---

# 7. PR-03 — PublishedSiteRevision / Immutable Artifact / Rollback

**Branch:** `p3/03-publish-core`  
**Depends on:** P3-01 + P3-02  
**Risk:** critical, public content authority  
**Amaç:** Existing publish generator around immutable revision + artifact authority build.

## Existing paths

- `packages/publish-engine/src/generate.ts`
- `packages/publish-engine/src/index.ts`
- smoke tests
- `apps/web/src/app/api/site/v2/publish/route.ts`
- legacy publish/version helpers as adapters only.

## Canonical minimum

```text
PublishedSiteRevision
PublishedAssetSet
ArtifactSet
activePublishId
previousPublishId
```

Flow:

```text
PublishCommand(expectedDraftRevision)
 -> validate manifest/pages/master/hashes
 -> asset closure
 -> generate artifacts
 -> persist immutable artifacts
 -> readiness
 -> READY revision
 -> atomic active pointer swap
```

## Acceptance

- generation failure leaves active pointer unchanged,
- missing page/master/asset fails closed,
- successful publish produces immutable artifact hash,
- v12 -> v11 rollback restores exact historical HTML + asset bytes,
- replaying publish command is idempotent or explicitly new revision by policy.

## Rollback

Pointer to previous READY revision. Historical revisions never mutated.

---

# 8. PR-04 — DomainBinding + `apps/sites` Runtime

**Branch:** `p3/04-domain-runtime`  
**Depends on:** P3-03 + Pilot-0 service/credential foundation  
**Risk:** critical, public routing  
**Amaç:** Hostname truth'u tenant root/provider state'ten ayırıp public runtime'ı immutable publish authority'ye bağlamak.

## Existing paths

- `apps/sites/src/middleware.ts`
- `apps/sites/src/app/[domain]/page.tsx`
- `apps/sites/src/app/[domain]/client.tsx`
- `apps/sites/src/lib/firebaseAdmin.ts`
- `apps/web/src/app/api/domain/sec/route.ts`
- Cloudflare/domain provider adapters.

## Canonical minimum

```text
DomainBinding {
  hostname
  siteId
  businessId
  activePublishId
  status
  providerBindingRef?
  revision
}
```

## Public request

```text
hostname
 -> DomainBinding
 -> active PublishedSiteRevision
 -> immutable artifact
```

## Acceptance

- concurrent same-host claim has one winner,
- unknown host -> fail closed/404,
- known unpublished -> explicit policy,
- infrastructure failure -> 5xx + telemetry, not fake unpublished,
- `?theme=` cannot override production authority,
- provider failure cannot set DomainBinding ACTIVE,
- `apps/sites` no finance/quota/admin mutation capability.

## Rollback

Domain activePublishId/pointer can return previous revision. Provider resource rollback never changes canonical ownership without command/audit.

---

# 9. PR-05 — PublicActionManifest / Runtime

**Branch:** `p3/05-public-actions`  
**Depends on:** P3-04 + Pilot-1 EffectiveCapabilitySet  
**Risk:** critical, anonymous state-changing actions  
**Amaç:** Public UI actions'ı tenant/body spoofing'den ayıran canonical gateway kurmak.

## Canonical minimum

Published revision actions:

```text
INQUIRY_CREATE
BOOKING_REQUEST
```

Each state-changing action pins:

```text
actionId
siteId
publishedRevisionId
business target
capability/domain
input schema version
consent purpose/policy ref
idempotency/abuse policy
```

Runtime:

```text
execute(actionId, input, idempotencyKey)
```

Server derives tenant/business target from binding/revision/action.

## Acceptance

- body `esnafId` spoof ignored/rejected,
- old/unknown actionId fail closed/compat policy,
- double-click -> one logical effect,
- rate/abuse policy enforced,
- capability disabled -> no domain command,
- live UI cannot declare local success before committed result.

## Rollback

Disable action manifest/cohort while public site remains readable. No fallback to caller-selected tenant.

---

# 10. PR-06 — Booking + Inquiry Bridges

**Branch:** `p3/06-booking-lead`  
**Depends on:** P3-05 + Pilot-2 Customer/Booking  
**Risk:** high, customer-facing mutation  
**Amaç:** Booking/contact modules'ı PublicAction Gateway üzerinden canonical Customer/Booking/Inquiry commands'a bağlamak.

## Existing paths

- `apps/web/src/app/api/randevu/route.ts`
- `apps/web/src/app/api/iletisim/route.ts`
- `apps/web/src/app/api/lead/demo-form/route.ts`
- template Booking/Contact modules.

## Booking flow

```text
PublicAction BOOKING_REQUEST
 -> validate action schema
 -> derive business/site/revision
 -> resolve/create Customer alias
 -> Pilot-2 Booking command
 -> committed result
 -> side-effect MessageIntent later P3-07/08
```

## Inquiry flow

```text
INQUIRY_CREATE
 -> Customer resolution
 -> Inquiry/Lead command
 -> consent evidence/ref
 -> committed result
```

Exact Lead/Inquiry canonical owner may reuse W5 Customer activity/lead semantics; no duplicate CRM profile writer.

## Acceptance

- same submit retry -> one booking/inquiry,
- caller cannot choose another tenant,
- invalid/past booking stays domain error,
- UI error/success reflects committed outcome,
- booking source links publishedRevision/actionId for provenance.

## Rollback

Action can be disabled. Existing published site remains readable. Never fall back to local-only fake success.

---

# 11. PR-07 — Conversation / Message / MessageIntent Core

**Branch:** `p3/07-messaging-core`  
**Depends on:** Pilot-0/1 + W5 contracts, can parallel before P3-05  
**Risk:** high  
**Amaç:** Provider-independent messaging authority build.

## Canonical minimum

```text
Conversation
ConversationParticipant
Message
MessageIntent
DeliveryProjection
```

Outbound:

```text
source event/operator/booking
 -> MessageIntent
 -> consent/policy gate
 -> durable provider attempt
 -> delivery outcome projection
```

Inbound:

```text
verified W3 provider event
 -> resolve Customer alias
 -> Conversation
 -> Message
```

## Acceptance

- provider thread/message ID only alias,
- intent/send/delivered separated,
- same intent idempotency key not double-send,
- customer/tenant isolation,
- marketing opt-out blocks marketing intent,
- transactional purpose evaluated separately,
- Conversation write authority not Twilio webhook route.

## Rollback

Outbound intents can be paused. Canonical messages already accepted remain history; no rewrite from provider logs.

---

# 12. PR-08 — Twilio/Provider Messaging Bridge

**Branch:** `p3/08-provider-messaging`  
**Depends on:** P3-07 + Pilot-0 service/credential + W3 integration seams  
**Risk:** critical, external messaging  
**Amaç:** Existing Twilio know-how'ı IntegrationConnection/ProviderResourceBinding + verified ingress/durable delivery altında kullanmak.

## Existing surfaces

- `apps/web/src/lib/twilioClient.ts`
- Twilio provisioning/resource binding seeds
- `apps/web/src/app/api/whatsapp/route.ts`
- `apps/web/src/app/api/wa/musteri-mesaji/route.ts`
- any canary inbound status callback path.

## Outbound

```text
MessageIntent
 -> consent/policy
 -> DurableJob
 -> IntegrationConnection/CredentialRef
 -> Twilio adapter
 -> provider message alias
 -> delivery projection
```

## Inbound

```text
provider signature verify
 -> ProviderResourceBinding resolve tenant/connection
 -> durable inbox + dedupe
 -> 2xx ACK policy
 -> Message command
```

Customer `From` number never selects tenant. Provider-owned destination/resource binding does.

## Acceptance

- invalid signature -> zero Message/domain effect,
- duplicate MessageSid -> one logical Message,
- wrong destination binding -> deny/quarantine,
- provider retry safe,
- missing credential fail closed,
- outbound provider failure != delivered,
- worker retry does not double-send where provider/idempotency semantics allow control.

## Rollback

Provider connection can be paused. Do not restore unverified webhook ingress.

---

# 13. PR-09 — Canary Public Cutover / Legacy Publish Hard Gates

**Branch:** `p3/09-canary-cutover`  
**Depends on:** P3-00 through P3-08 accepted  
**Risk:** critical, visible customer flow  
**Amaç:** One canary hostname/site/action/messaging connection'ı canonical authority'ye geçirmek.

## Hard gates for canary

- editor autosave cannot write active public state,
- `esnaflar.siteData/siteHtml` not public truth,
- duplicate legacy publish writers cannot activate canary,
- public runtime no mutable BusinessProfile/editor reconstruction,
- request body cannot select tenant,
- live Booking/Contact local fake-success disabled,
- verified/durable webhook ingress mandatory,
- provider delivery projection only from provider outcome.

## Acceptance evidence

### Editor/publish

- autosave vs active artifact byte comparison,
- publish fail keeps previous revision,
- rollback exact bytes/assets,
- stale draft conflict.

### Domain/runtime

- correct hostname,
- unknown hostname,
- unpublished state,
- infra 5xx,
- no production `?theme=` override,
- least-privilege runtime.

### Public actions

- booking happy path,
- duplicate submit,
- tenant spoof attempt,
- invalid action/revision,
- canonical Customer/Booking provenance.

### Messaging

- confirmation MessageIntent,
- outbound provider success/failure,
- inbound valid/invalid signature,
- duplicate provider event.

### Visual

- business site desktop/mobile parity where intended,
- editor UX preserved,
- Kepenk root marketing landing visual baseline unchanged.

## Merge gate

1. independent browser/regression acceptance,
2. independent security/integration review,
3. canary hostname rollback exercised,
4. old publish/action writer telemetry zero for canary,
5. main marketing frontend protected diff review,
6. no local fake success remains in canary live mode.

## Rollback

- activePublishId -> previous READY revision,
- DomainBinding can return prior proven pointer/config,
- public state-changing actions can be paused,
- messaging provider connection can be paused,
- no fallback to mutable siteData, caller tenant ID or unverified webhook.

---

# 14. Review ownership

| PR | Primary review | Secondary review |
|---|---|---|
| P3-00 | Browser/Frontend | Architecture |
| P3-01 | Site/DB | Editor regression |
| P3-02 | Media/Security | Site/DB |
| P3-03 | Publish/DB | Browser/artifact verification |
| P3-04 | Security/Integration | Public runtime |
| P3-05 | Security/API | Abuse/idempotency |
| P3-06 | Booking/Customer | Browser/public UX |
| P3-07 | Messaging/DB | Privacy/consent |
| P3-08 | Security/Integration | Messaging/reliability |
| P3-09 | Independent Browser/Regression | Independent Security/Integration |

---

# 15. Pilot-3 definition of done

A canary customer can open the real business hostname and complete:

```text
immutable published site
 -> revision-bound booking/contact action
 -> canonical Customer/Booking/Inquiry effect
 -> MessageIntent
 -> verified provider delivery
```

without any mutable siteData authority, caller-selected tenant ID or fake UI success.

> **Pilot-3 başarı ölçütü yeni bir site tasarlamak değildir. Senin eski editor/theme/frontend emeğin aynen dururken, “Kaydet” ile “Yayınla” ilk kez gerçekten farklı şeyler oluyorsa ve public buton hangi işletmeye işlem yapacağını body'den değil yayın artifact'ından biliyorsa site motoru kurtarılmıştır.**
