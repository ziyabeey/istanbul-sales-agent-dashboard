# W4 — Site / Asset / Publish / Public Experience Exact File / Task Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLAN KAPALI — implementation başlamadı  
> **Kaynak:** SÖKÜM 01–08, 11, 25–28 + SENTEZ 1–5 + W1–W3  
> **Amaç:** İşletmelere üretilen Kepenk sitelerinin authoring, draft, media, publish, domain, public runtime ve public action sınırlarını exact file-level migration task'larına dönüştürmek.  
> **Önemli ayrım:** Bu wave Kepenk/KPNK ana marketing landing'ini yeniden yazmaz. `docs/sentez/frontend-preservation-contract.md` geçerlidir.

---

# 1. W4 exit contract

W4 sonunda canonical site zinciri:

```text
BusinessProfile / content inputs
        ↓
SiteAuthoring / EditorState
        ↓
Canonical SiteDraft serializer
        ↓
SiteManifest + immutable Page/Master docs
        ↓
Asset closure / pinned READY assets
        ↓
PublishCommand
        ↓
PublishedSiteRevision
        ↓
Immutable Artifact Set
        ↓
Atomic activePublishId
        ↓
DomainBinding
        ↓
apps/sites Public Runtime
        ↓
Public Action Gateway
        ↓
Customer / Booking / Commerce commands
```

Minimum invariants:

1. Draft/autosave active published revision'ı değiştiremez.
2. Published site live mutable `esnaflar.siteData` okumaz.
3. `SiteManifest`/Page/Master schema server-side validated ve content hashes doğrulanır.
4. Published page/master/artifact immutable olur.
5. Active pointer yalnız bütün publish closure hazır olduktan sonra atomik değişir.
6. Rollback eski artifact'i mutate etmez; pointer önceki ready revision'a döner.
7. Domain provider state canonical `DomainBinding` değildir.
8. Unknown/unpublished/infrastructure-error hostname durumları birbirinden ayrılır.
9. Asset identity raw mutable URL değildir.
10. Published revision exact asset bytes/variants pinler.
11. Public caller request body ile tenant/business authority seçemez.
12. Public UI success yalnız authoritative domain command commit'inden sonra gösterilir.
13. Public state-changing actions idempotent ve revision-bound olur.
14. `apps/sites` least-privilege public read/action boundary'ye iner.
15. Kepenk ana marketing frontend'i görsel/interaction olarak korunur.

---

# 2. Strong site primitives — PRESERVE

## W4-CORE-001 — Site schema

**Representative paths**

- `packages/site-schema/src/manifest.ts`
- `packages/site-schema/src/validators.ts`
- `packages/site-schema/src/page.ts`
- `packages/site-schema/src/component.ts`
- `packages/site-schema/src/index.ts`

**Current strengths**

- `SiteManifest`,
- page/master references,
- version/publishedVersion intent,
- Zod validation,
- content hashes,
- typed component tree.

**Disposition:** `PRESERVE + PROMOTE TO CANONICAL CONTRACT`

**Action**

- replace legacy `esnafId` authority references with stable tenant/business/site IDs while compatibility mapping remains,
- make validation/hash functions mandatory server boundary,
- media refs rewire to Asset Core identity.

---

## W4-CORE-002 — Component renderer

**Representative paths**

- `packages/renderer/src/registry.ts`
- `packages/renderer/src/components/*`
- `packages/renderer/src/layout-to-css.ts`

**Disposition:** `PRESERVE / HARDEN`

Renderer remains deterministic presentation layer. It does not fetch business truth, resolve credentials or execute raw domain mutations.

---

## W4-CORE-003 — Publish generator

**Representative paths**

- `packages/publish-engine/src/generate.ts`
- `packages/publish-engine/src/index.ts`
- `packages/publish-engine/src/__tests__/smoke.ts`

**Current strengths**

- static markup generation,
- sitemap/robots/SEO helpers,
- renderer integration,
- smoke generation seed.

**Disposition:** `PRESERVE GENERATOR + BUILD PUBLISH AUTHORITY AROUND IT`

Artifact generation is not itself publish commit.

---

## W4-CORE-004 — Theme/template system

**Representative paths**

- `packages/templates/src/renderer/ThemeRenderer.tsx`
- `packages/templates/src/catalog/*`
- template/section/module files.

**Disposition:** `PRESERVE AUTHORING/THEME VALUE + ADAPT TO CANONICAL DRAFT`

ThemeConfig/AST may remain rich editor model, but cannot be a second public publish authority.

---

# 3. Editor / authoring exact tasks

## W4-EDIT-001 — Main editor UX

**Paths**

- `apps/web/src/app/dashboard/sitem/editor/page.tsx`
- `apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx`
- `TopBar.tsx`
- `Canvas.tsx`
- `SettingsModal.tsx`
- `apps/web/src/app/dashboard/sitem/editor/store/editor-store.ts`
- `apps/web/src/app/dashboard/sitem/editor/hooks/useAutosave.ts`
- `apps/web/src/app/editor-preview/page.tsx`

**Disposition:** `PRESERVE UX + REWIRE SERIALIZATION/COMMANDS`

**Action**

- preserve visual editor, preview, undo/redo, theme and settings UX,
- create one `EditorState -> Canonical SiteDraft` serializer,
- every persistable editor field must be part of draft or explicit external domain reference,
- save/publish buttons consume committed command results,
- remove duplicate keyboard save invocation.

**Gate:** editor reload round-trip preserves pages/settings/theme/business authoring state; no UI editable field silently disappears.

---

## W4-EDIT-002 — Legacy ThemeConfig adapter

**Representative path**

- `apps/web/src/utils/themeToSiteData.ts` and related ThemeConfig/SiteData adapters.

**Disposition:** `PRESERVE COMPATIBILITY INTENT + REWRITE CONTRACT`

Target:

```text
ThemeConfig + BusinessData + Editor pages/settings
 -> SiteDraftAdapter
 -> SiteManifest + PageDocuments + MasterPageDocument
```

Legacy flat SiteData may remain a read/projection adapter during migration only.

---

# 4. Draft save authority

## W4-DRAFT-001 — `editor-kaydet`

**Path**

- `apps/web/src/app/api/site/editor-kaydet/route.ts`

**Critical current behavior**

On any save/autosave, if `siteJson.theme` exists it writes both:

```text
siteJson
siteData
```

`apps/sites` public runtime reads `siteData`, so autosave can mutate live public output before Publish.

**Disposition:** `HARD-CUT PUBLIC WRITE / ADAPTER TO DRAFT ONLY`

**Action**

- legacy route URL may remain temporarily for editor caller compatibility,
- route writes canonical draft only,
- `publish:true` behavior removed from this save route,
- route cannot modify active publish pointer or public artifact.

**Gate:** autosave 1000 times while active publish stays bit-for-bit same.

---

## W4-DRAFT-002 — V2 save seed

**Path**

- `apps/web/src/app/api/site/v2/save/route.ts`

**Current strength:** manifest/page/master payload shape matches target direction.

**Current issues**

- no mandatory schema validation,
- no content-hash verification,
- overwrites inline `esnaflar.siteV2.*`,
- version caller-controlled,
- no optimistic revision.

**Disposition:** `PROMOTE TO CANONICAL DRAFT SAVE COMMAND`

Target:

```text
verified RequestContext
 -> validate Editor/Draft input
 -> recompute hashes
 -> immutable Page/Master object writes
 -> compare-and-swap draft revision
 -> SiteDraft/Manifest pointer update
```

---

# 5. Publish authority

## W4-PUB-001 — V2 publish seed

**Path**

- `apps/web/src/app/api/site/v2/publish/route.ts`

**Current strengths**

- typed manifest/page/master intent,
- `@kepenk/publish-engine`,
- HTML/sitemap/robots generation,
- publish version vocabulary.

**Current issues**

- cast instead of mandatory Zod parse,
- content hashes not recomputed/verified,
- inline mutable Firestore persistence,
- caller version becomes published version,
- version snapshot best-effort,
- no immutable artifact store,
- no atomic active pointer,
- public runtime does not consume this state.

**Disposition:** `PRIMARY PUBLISHCOMMAND SEED / REWRITE ORCHESTRATION`

Canonical flow:

```text
PublishCommand(siteId, expectedDraftRevision)
 -> validate manifest/page/master
 -> verify content hashes
 -> resolve/pin AssetSet
 -> generate ArtifactSet
 -> persist immutable artifacts
 -> readiness checks
 -> create PublishedSiteRevision READY
 -> atomic activePublishId swap
 -> domain/cache projection
 -> PublishCommitted event
```

**Gate:** failed generation/deploy never changes active pointer.

---

## W4-PUB-002 — Legacy publish paths

**Representative paths**

- `apps/web/src/app/api/site/publish/route.ts`
- publish behavior inside `editor-kaydet`
- version helpers/routes under `apps/web/src/app/api/site/versiyonlar/` and `apps/web/src/lib/siteVersiyonlari.ts`
- generator/provision/guncelle legacy routes under `apps/web/src/app/api/site/*`.

**Disposition:** `ADAPTER THEN RETIRE DUPLICATE AUTHORITIES`

Each route is classified into:

```text
Draft command adapter
Publish command adapter
Provisioning job adapter
Read-only compatibility version projection
or zero-caller archive candidate
```

No second writer may persist published truth after canonical cutover.

---

## W4-PUB-003 — PublishedSiteRevision / Artifact Store

**Disposition:** `GREENFIELD AUTHORITY AROUND EXISTING GENERATOR`

Minimum record:

```text
PublishedSiteRevision {
  publishId
  siteId
  businessId
  manifestId
  manifestVersion
  artifactHash
  assetSetHash
  status PREPARING|READY|ACTIVE|SUPERSEDED|FAILED
  previousPublishId?
  createdBy
  createdAt
  activatedAt?
  deployTarget?
  deployResultRef?
}
```

Immutable artifact/object storage must pin HTML/page/master/SEO/deploy metadata needed to reproduce/rollback revision.

---

## W4-PUB-004 — Rollback

**Disposition:** `BUILD`

Rollback flow:

```text
verify target PublishedSiteRevision READY
 -> verify assets/artifacts available
 -> atomic activePublishId swap
 -> cache/CDN projection
 -> audit/event
```

No mutable historical snapshot rewriting.

---

# 6. Public runtime

## W4-RUN-001 — `apps/sites` hostname shell

**Paths**

- `apps/sites/src/middleware.ts`
- `apps/sites/src/app/[domain]/page.tsx`
- `apps/sites/src/app/[domain]/client.tsx`
- `apps/sites/package.json`
- `apps/sites/next.config.ts`

**Disposition:** `PRESERVE SHELL + REWIRE DATA AUTHORITY`

Current runtime resolves hostname by querying mutable `esnaflar.customDomain/slug`, then renders `siteData`.

Canonical request:

```text
hostname
 -> DomainBinding
 -> activePublishId
 -> immutable artifact/revision
 -> render/serve
```

**Gate:** public request never reconstructs truth from current BusinessProfile/editor state.

---

## W4-RUN-002 — Demo/preview isolation

Current `apps/sites/[domain]` accepts `?theme=` on any hostname to enter demo mode.

**Disposition:** `REWIRE / ISOLATE`

Demo/preview uses explicit preview namespace/token/route; public production hostname cannot switch render authority via arbitrary query string.

---

## W4-RUN-003 — Hostname/error semantics

Current page collapses unknown hostname, unpublished site and Firestore error into Kepenk-style unpublished landing.

**Disposition:** `REWRITE`

Target:

```text
platform host -> platform landing
unknown host -> 404/fail closed
known + unpublished -> explicit unpublished policy
known + maintenance -> explicit maintenance policy
infra failure -> 5xx + telemetry
```

---

## W4-RUN-004 — Public app least privilege

**Path**

- `apps/sites/src/lib/firebaseAdmin.ts`

**Current issue:** public runtime server helper contains broad privileged mutation helpers beyond public read needs.

**Disposition:** `SPLIT / LEAST-PRIVILEGE`

`apps/sites` gets only:

- DomainBinding read,
- active PublishedSiteRevision/artifact read,
- public asset delivery refs,
- Public Action Gateway transport.

Finance/quota/credit/admin/order mutation helpers move out.

---

# 7. DomainBinding exact tasks

## W4-DOM-001 — Canonical DomainBinding

**Disposition:** `GREENFIELD GLOBAL HOSTNAME AUTHORITY`

Minimum:

```text
DomainBinding {
  domainBindingId
  hostname
  siteId
  businessId
  status PENDING|VERIFYING|READY|ACTIVE|ERROR|RELEASING|RELEASED
  activePublishId
  providerBindingRef?
  verification/provisioning metadata
  revision
}
```

Global hostname uniqueness enforced server-side.

---

## W4-DOM-002 — Domain selection/registration route

**Path**

- `apps/web/src/app/api/domain/sec/route.ts`

**Critical current issues**

- body supplies authoritative `esnafId`,
- package entitlement from mutable `esnaf.paket`,
- domain state written into tenant root,
- registration/Page binding performed fire-and-forget after HTTP response,
- provider and canonical binding state are one mutable flow.

**Disposition:** `REWRITE AS COMMAND + DURABLE JOB`

Target:

```text
RequestContext business
 + EffectiveCapabilitySet
 -> RequestDomainRegistration/Binding
 -> reserve hostname transaction
 -> W3 DurableJob
 -> registrar/DNS adapter
 -> DomainBinding transitions
 -> notification event
```

**Gate:** double registration/concurrent domain claim cannot bind same hostname to two sites.

---

## W4-DOM-003 — Cloudflare/provider adapters

**Representative paths**

- `packages/cloudflare/dns.ts`
- `packages/cloudflare/registrar.ts`
- `apps/web/src/lib/cloudflareRegistrar.ts`
- `apps/web/src/lib/cloudflarePagesClient.ts`

**Disposition:** `PRESERVE PROVIDER KNOW-HOW + W3 CREDENTIAL/INTEGRATION REWIRE`

Provider success projects into DomainBinding; provider record is not binding authority.

---

# 8. Asset Core exact tasks

## W4-ASSET-001 — Existing media schema

**Paths**

- `packages/site-schema/src/component.ts`
- renderer image/background consumers.

**Current state:** MediaRef is URL + presentation metadata.

**Disposition:** `REWRITE MEDIAREF TO ASSET IDENTITY`

Draft ref:

```text
MediaRef {
  assetId
  variant?
  alt
  focalPoint?
  crop?
}
```

Published ref pins exact contentHash/variant/delivery locator.

---

## W4-ASSET-002 — Asset Core

**Disposition:** `GREENFIELD`

Minimum:

```text
AssetRecord
AssetBlob(contentHash, immutableObjectKey)
AssetVariant
AssetProvenance
UploadIntent
```

Required lifecycle:

```text
PENDING -> PROCESSING -> READY | BLOCKED -> RETIRED
```

Validation:

- actual MIME sniff/decode,
- byte size,
- dimensions,
- hash,
- tenant/site ownership,
- quota/policy,
- derivative generation.

---

## W4-ASSET-003 — Editor media UX

**Paths**

- `apps/web/src/app/dashboard/sitem/editor/components/MediaPanel.tsx`
- `ImageEditOverlay.tsx`
- editor `mediaLibrary` state.

**Disposition:** `PRESERVE UX + REWIRE TO ASSET CORE`

- `URL.createObjectURL(file)` remains preview only,
- selected local file must become UploadIntent/AssetRecord before save/publish,
- arbitrary external URL becomes explicit import or restricted external asset,
- persistent media library reads Asset Core.

---

## W4-ASSET-004 — Unsplash import

**Paths**

- `apps/web/src/lib/unsplashService.ts`
- `apps/web/src/app/api/unsplash/route.ts`

**Disposition:** `PRESERVE PROVIDER ADAPTER + IMPORT INTO ASSET CORE`

Preserve photo/source/provenance/download metadata; do not persist only mutable `photo.urls.regular` as canonical site media.

W3 credential rules apply.

---

## W4-ASSET-005 — Publish asset closure

**Disposition:** `BUILD INTO PublishCommand`

```text
collect all MediaRefs
 -> resolve owned AssetRecords
 -> READY/status/policy/hash validation
 -> pin exact variants/content hashes
 -> PublishedAssetSet
```

Missing/blocked/unready asset prevents active pointer switch.

Rollback retains historical asset bytes.

---

# 9. Public Action Gateway

## W4-ACT-001 — PublicActionManifest

**Disposition:** `GREENFIELD CANONICAL BOUNDARY`

Published revision carries typed actions such as:

```text
INQUIRY_CREATE
BOOKING_REQUEST
ORDER_CREATE
CHECKOUT_START
NEWSLETTER_SUBSCRIBE
REVIEW_SUBMIT
```

Passive links remain distinct:

```text
NAVIGATE
PHONE_CALL
EMAIL_OPEN
WHATSAPP_OPEN
```

Each state-changing action pins:

- actionId,
- publishedRevisionId/siteId,
- target capability/domain,
- input schema/policy version,
- consent purpose/policy ref,
- abuse/idempotency policy.

---

## W4-ACT-002 — Renderer action runtime

**Representative paths**

- `packages/templates/src/renderer/ThemeRenderer.tsx`
- `packages/templates/src/modules/BookingModule.tsx`
- `ContactInbox.tsx`
- `OrderModule.tsx`
- common contact/form sections.

**Disposition:** `PRESERVE UI + REWRITE LIVE BEHAVIOR`

Public render receives:

```text
PublicActionRuntime.execute(actionId, input, idempotencyKey)
```

Preview/editor may simulate success only with explicit preview semantics.

Live mode cannot call local `setSubmitted(true)` before server committed outcome.

---

## W4-ACT-003 — Booking bridge

**Path**

- `apps/web/src/app/api/randevu/route.ts`

**Current strengths**

- feature flag,
- Zod validation,
- rate limit,
- normalized phone,
- past-date guard,
- owner GET auth,
- useful notification UX.

**Critical current issues**

- caller body chooses `esnafId`,
- no site/revision/action binding,
- service/staff/availability/timezone/conflict authority incomplete,
- no idempotency key,
- notification side effects are request-lifetime fire-and-forget.

**Disposition:** `PRESERVE VALIDATION/UX SEEDS + ADAPTER TO PUBLIC ACTION -> BOOKING COMMAND`

Booking lifecycle/availability authority completes W6.

---

## W4-ACT-004 — Contact/lead bridge

**Representative paths**

- `apps/web/src/app/api/iletisim/route.ts`
- `apps/web/src/app/api/lead/demo-form/route.ts`
- template contact components.

**Disposition:** `REWIRE TO INQUIRY/LEAD COMMAND`

Target tenant derived from DomainBinding + PublishedSiteRevision + actionId, not body-supplied internal ID.

Consent evidence is versioned/persisted, not checkbox-only.

Customer/CRM ownership completes W5.

---

## W4-ACT-005 — Commerce/order/checkout bridge

**Representative paths**

- `apps/web/src/app/api/storefront/[shopSlug]/route.ts`
- `apps/web/src/app/api/shop/orders/route.ts`
- `apps/web/src/app/api/checkout/initialize/route.ts`
- `apps/web/src/app/api/checkout/callback/route.ts`
- template `OrderModule.tsx`.

**Disposition:** `PRESERVE REAL DOMAIN PRIMITIVES + BUILD PUBLIC GATEWAY BRIDGE`

Public UI cannot send authoritative tenant/shop/price truth. Order/Payment authority completes W6/W7.

---

# 10. Public action abuse/idempotency contract

Every state-changing action requires:

```text
site/revision/action resolve
input validation
server-derived tenant/business target
EffectiveCapabilitySet gate
rate/abuse policy
Idempotency-Key
consent evidence where required
canonical domain command
committed result
outbox side-effects
```

Unknown/old actionId fails closed or follows explicit revision compatibility policy.

---

# 11. W4 exact task order

```text
T1  Freeze protected Kepenk marketing frontend baseline
T2  Promote SiteManifest/Page/Master validators + hash contract
T3  Define SiteDraft/manifest/page/master persistence + stable IDs/revisions
T4  Implement one EditorState -> SiteDraft serializer
T5  Rewire editor autosave/save to draft-only command
T6  Promote `/site/v2/save` to validated optimistic Draft Save adapter
T7  Build Asset Core + upload/import/finalize contract
T8  Rewire MediaPanel/ImageEditOverlay/Unsplash to Asset Core
T9  Define PublishedSiteRevision + immutable artifact store
T10 Promote `/site/v2/publish` to PublishCommand orchestration
T11 Add asset closure/readiness pinning
T12 Add atomic activePublishId and rollback
T13 Define global DomainBinding + hostname reservation
T14 Rewire domain routes to W3 durable provider jobs
T15 Rewire `apps/sites` to DomainBinding -> active publish -> immutable artifact
T16 Isolate demo/preview from production hostname authority
T17 Narrow `apps/sites` server privileges
T18 Define PublicActionManifest / PublicActionRuntime
T19 Rewire contact/booking/order live modules to gateway adapters
T20 Move public action side-effects to W3 Outbox/DurableJob
T21 Shadow read/parity old vs canonical public output
T22 Disable legacy published writes (`siteData`, duplicate publish paths)
T23 Observe caller=0 then archive duplicate site/version/domain writers
T24 Browser/build/public acceptance suite
```

Dependencies:

- W1 RequestContext for authoring/admin.
- W2 BusinessProfile + capability resolver.
- W3 DurableJob/Credential/Integration for domain/CDN/provider and action side effects.
- Booking/CRM/Commerce command internals continue W5–W7, but gateway contract is fixed in W4.

---

# 12. W4 acceptance matrix

| Senaryo | Beklenen |
|---|---|
| Editor autosave after live publish | public artifact unchanged |
| Save same draft with stale revision | conflict, no silent overwrite |
| Client sends forged contentHash | reject/recompute mismatch |
| Publish missing page/master hash | fail, active pointer unchanged |
| Publish has unready/foreign asset | fail |
| Publish generation/deploy failure | previous active revision remains served |
| Successful publish | pointer atomically switches after READY |
| Rollback v12 -> v11 | exact historical HTML + asset bytes return |
| Unknown hostname | 404/fail closed |
| Known unpublished hostname | explicit unpublished policy |
| DB/artifact infrastructure failure | 5xx/telemetry, not fake unpublished |
| `?theme=` on production hostname | cannot override authority |
| Same hostname concurrent claim | one binding wins atomically |
| Domain provider failure | DomainBinding not ACTIVE |
| Local image blob URL | cannot persist/publish before Asset READY |
| External URL import | provenance + immutable copy/ref |
| Public booking body sends other `esnafId` | ignored/rejected; target from action binding |
| Double-click public booking/order | one logical command/effect |
| Live BookingModule local-only success | prohibited |
| Live Contact/Order local-only success | prohibited |
| Public action from old/unknown revision | explicit fail/compat policy |
| Kepenk marketing `/` visual baseline | unchanged by W4 |
| `apps/sites` least-privilege process | no finance/quota/admin mutation capability |

---

# 13. Frontend preservation split

## Protected Kepenk/KPNK acquisition frontend

**Not a cleanup target:**

- `apps/web/src/app/page.tsx`
- root layout/globals,
- Navbar,
- marketing landing sections,
- public marketing/legal/SEO route shell.

Only content/API truth rewire as already documented.

## Business site product UX

**Also preserve where valuable:**

- visual site editor,
- theme/template library,
- preview,
- media panel UX,
- booking/contact/order module presentation.

Backend/persistence/action semantics are rewired without gratuitous visual rewrite.

---

# 14. W4 cleanup candidates after gate

### Retire as authority

- `esnaflar.siteData` public truth,
- `esnaflar.siteHtml` published truth,
- inline mutable `siteV2.manifest/page/masterPage` published authority,
- autosave writes to public/live fields,
- `publish:true` on general save route,
- duplicate legacy publish/version writers,
- root customDomain/slug fields as global binding authority,
- browser `blob:` URLs as saved media,
- arbitrary mutable URL media as default production authority,
- live template modules that report local fake success.

### Preserve

- `apps/sites` routing shell,
- site-schema,
- renderer,
- publish-engine generator,
- templates/themes,
- editor UX,
- media/Unsplash UX and provider adapter,
- real booking/commerce validation/service primitives,
- Cloudflare/domain provider know-how.

---

# 15. W4 final verdict

> **Kepenk'in site tarafı yeniden yapılacak bir frontend değildir. Güçlü editor, theme, renderer, schema, generator ve public shell zaten vardır. W4'ün işi bunları tek Draft -> immutable Publish -> DomainBinding -> Public Runtime zincirine bağlamak, media ve public actions için eksik authority'leri eklemek ve mutable/fake-success legacy yollarını emekliye ayırmaktır.**
