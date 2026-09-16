# W5 — Customer + Messaging + Support Foundation Exact File / Task Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLAN KAPALI — implementation başlamadı  
> **Kaynak:** SÖKÜM 09, 10, 14, 15, 20, 28, 32, 40 + SENTEZ 1–5 + W1–W4  
> **Amaç:** Current-main CRM contract/helper adalarını tek Customer Core authority'sine, provider-independent messaging'i tek Conversation/Message authority'sine ve mevcut support ticket writer'ını verified SupportCase foundation'a bağlamak.  
> **Current-main drift notu:** Tarihsel plandaki `/api/customers` ve `/api/musteriler` route'ları current main'de aynı path'lerde doğrulanmadı. Bu manifest eski route isimlerini varmış gibi kabul etmez; mevcut schema/helper'ları canonical runtime seed'i olarak kullanır.

---

# 1. W5 exit contract

W5 sonunda canonical authority'ler:

```text
Customer
CustomerIdentityAlias
CustomerActivity
CustomerMerge / Revision
Label / ExtendedField / Segment
Customer Read Models

Conversation
ConversationParticipant
Message
MessageIntent
Delivery/Reply Projection
Consent / Messaging Policy Gate

SupportCase
SupportCaseEvent
SupportRequester / Customer linkage
Support message bridge
Support operator read model foundation
```

Minimum invariants:

1. Phone/email/document path primary Customer ID değildir.
2. Aynı customer identity tenant sınırı dışında merge edilmez.
3. Customer profile/activity tek write authority'den gelir.
4. Derived RFM/churn/visit predictions source truth değildir; versioned projections/advisory metadata'dır.
5. Messaging provider ID/phone conversation ID değildir.
6. Inbound provider event W3 verified inbox'tan geldikten sonra Message'a dönüşür.
7. Campaign/agent/support raw provider send yapmaz; `MessageIntent` üretir.
8. Consent/policy gate outbound provider attempt'tan önce çalışır.
9. Delivery outcome provider projection'dır; intent/send request ile delivered eşit değildir.
10. Support requester identity imzasız cookie payload veya arbitrary e-posta ile authorize edilmez.
11. Support case state Support OS'un, transport Messaging'in, identity W1'in authority'sidir.
12. AI confidence response/closure authorization değildir.
13. Existing CRM/support/dashboard UX mümkün olduğu kadar korunur ve canonical read models'e bağlanır.

---

# 2. Customer Core strong seeds

## W5-CUST-001 — `@kepenk/crm-schema` Contact contract

**Path**

- `packages/crm-schema/src/contact.ts`

**Current strengths**

- revision field,
- visitor/contact/customer tier,
- multiple phones/emails/addresses,
- verified channel metadata,
- labels/custom fields,
- source attribution,
- billing profile,
- consent vocabulary,
- activity summary,
- AI metadata,
- Zod create/update schemas.

**Disposition:** `PRESERVE + PROMOTE TO CUSTOMER CONTRACT SEED`

**Canonical changes**

- `esnafId` -> stable `tenantId/businessId` mapping,
- channel value normalization/canonical identity aliases,
- consent field becomes reference/projection to Data Lifecycle consent authority where legally required,
- `activitySummary` and `aiMeta` explicitly derived projections, not authoritative event history,
- sensitive billing identity fields protected by field-level access/data classification.

**Gate:** Update requires revision/CAS; tenant-scoped uniqueness/merge rules explicit.

---

## W5-CUST-002 — Labels, activities, segments

**Path**

- `packages/crm-schema/src/crm-entities.ts`

**Current strengths**

- Label vocabulary,
- ExtendedField definitions,
- rich `ContactActivity` event taxonomy,
- recursive FilterExpression DSL,
- static/dynamic/AI-suggested Segment contract,
- reach/campaign/automation metadata.

**Disposition:** `PRESERVE CORE SEED + HARDEN OWNERSHIP`

**Canonical split**

```text
CustomerActivity = append-style customer timeline event
Segment definition = Customer Core
segment membership = derived read model
campaign usage = Marketing projection/reference
consent reachability = Messaging/Data Lifecycle projection
```

Activity `data:any` gets typed/versioned payload policy for sensitive/high-value event classes over time.

---

## W5-CUST-003 — Filter engine

**Path**

- `apps/web/src/lib/crm/filterEngine.ts`

**Current strengths**

- recursive `$and/$or/$not`,
- comparison/collection/date operators,
- reusable segment/automation query evaluator.

**Disposition:** `PRESERVE ALGORITHM + BIND TO VALIDATED DSL`

**Action**

- consume `FilterExpressionSchema` from crm-schema rather than independent loose `any` types,
- allowlisted/queryable field registry,
- resource bounds for nested expressions and large arrays,
- same semantics for preview and server membership materialization.

---

# 3. Legacy customer writer/helper

## W5-CUST-004 — `musteriCRM.ts`

**Path**

- `apps/web/src/lib/musteriCRM.ts`

**Current behavior**

- customer ID derived from `esnafId + base64(phone)` slice,
- writes `musteriProfiller`,
- profile and derived behavior tags mixed,
- visit/churn-like estimates mutate same profile,
- phone is practical identity authority.

**Disposition:** `MIGRATION SOURCE + COMPATIBILITY ADAPTER, THEN ARCHIVE`

**Preserve concepts**

- last/first contact,
- booking count,
- preferred services,
- loyalty/VIP/lost/sleep labels,
- visit prediction seed.

**Rewrite**

```text
normalized phone
 -> CustomerIdentityAlias
 -> stable customerId

business event
 -> CustomerActivity
 -> summary/projection worker
```

`musteriProfiller` stops being second profile truth.

**Gate:** old phone-derived IDs map deterministically to canonical customer IDs; no cross-tenant merge; source records are read-only after cutover.

---

# 4. Canonical Customer runtime

## W5-CUST-005 — Customer repository/service/commands

**Disposition:** `GREENFIELD RUNTIME AROUND EXISTING SCHEMA`

Required commands:

```text
CreateCustomer
UpdateCustomer(expectedRevision)
AttachIdentityAlias
VerifyIdentityAlias
MergeCustomers
Add/RemoveLabel
RecordCustomerActivity
Define/UpdateSegment
```

Required reads:

```text
GetCustomer
SearchCustomers
CustomerTimeline
SegmentPreview / SegmentMembership
CustomerSummary
```

**Identity aliases**

```text
phone:e164
email:normalized
provider:whatsapp:<id?>
provider:instagram:<id?>
external/import source IDs
```

Alias uniqueness is tenant-scoped unless explicit platform identity policy says otherwise.

---

## W5-CUST-006 — Historical API drift / compatibility

**Observed**

Tarihsel teardown `/api/customers` and `/api/musteriler` paths referenced richer CRM runtimes, but current main returns no such route at those exact paths.

**Disposition:** `DO NOT RECREATE LEGACY API AS AUTHORITY`

If current UI/callers need compatibility:

```text
new canonical Customer API
 <- optional compatibility alias/adapter route
```

No reason to rebuild an obsolete Mongo/Firestore dual-store just to preserve an old URL.

**Gate:** current callers are inventoried before route creation; zero caller means no compatibility route is added.

---

# 5. Messaging Core foundation

## W5-MSG-001 — Conversation authority

**Disposition:** `GREENFIELD CANONICAL AUTHORITY`

Minimum model:

```text
Conversation {
  conversationId
  tenantId
  customerId?
  channel
  providerConnectionId
  providerThreadAlias?
  status
  assignedActorId?
  createdAt/updatedAt
  revision
}

ConversationParticipant {
  conversationId
  participantType customer|staff|agent|system
  customerId/userId/agentId?
  channelAlias?
}
```

Provider thread ID is alias, not internal primary key.

---

## W5-MSG-002 — Message authority

**Disposition:** `GREENFIELD`

```text
Message {
  messageId
  conversationId
  direction inbound|outbound
  author/participant
  content typed payload
  source event/intent id
  providerMessageAlias?
  createdAt
}
```

Inbound:

```text
W3 IntegrationEventInbox VERIFIED
 -> resolve/create Customer alias
 -> resolve/create Conversation
 -> append Message
 -> emit MessageReceived
```

No provider webhook directly owns CRM/conversation state beyond the adapter command/event.

---

## W5-MSG-003 — MessageIntent / outbound state

**Disposition:** `GREENFIELD CORE`

```text
MessageIntent {
  intentId
  tenantId
  customerId/conversationId
  channel preference
  content/template
  sourceType/sourceId
  consentPurpose
  idempotencyKey
  status
}
```

Flow:

```text
Campaign / Support / Agent / operator
 -> MessageIntent
 -> policy + consent
 -> W3 Durable Outbox/Job
 -> provider adapter
 -> delivery outcome
 -> Messaging projection
```

`queued/sent/delivered/read/failed` semantics separated.

---

## W5-MSG-004 — Consent/policy gate

**Dependencies:** W2 capability, W10 final privacy authority.

W5 minimum gate consumes:

- channel opt-in/prohibition evidence,
- transactional vs marketing purpose,
- tenant capability,
- quiet hours/contact preference where policy applies,
- stop/opt-out state.

Consent capture truth is eventually Data Lifecycle/Consent Core; Messaging stores refs/effective decision evidence.

**Hard rule:** existing `whatsappOptIn`/IYS fields may seed projection but are not forever the sole legal evidence store.

---

# 6. Provider messaging bridge

## W5-MSG-005 — W3 webhook outputs

**Affected current routes already handled in W3**

- `apps/web/src/app/api/whatsapp/route.ts`
- `apps/web/src/app/api/wa/musteri-mesaji/route.ts`
- Instagram webhook variants.

**W5 role:** consume only normalized/verified inbound provider events after W3.

No signature/resource binding logic duplicated here.

---

## W5-MSG-006 — Twilio/Meta provider senders

**Representative paths**

- `apps/web/src/lib/twilioClient.ts`
- `apps/web/src/lib/metaGraphClient.ts`

**Disposition:** `W3 PROVIDER ADAPTER; W5 MESSAGE OUTCOME CONSUMER`

Messaging owns intent/delivery state; adapter owns protocol call only.

---

## W5-MSG-007 — WhatsApp sales bot helper

**Path**

- `apps/web/src/lib/whatsapp/salesBot.ts`

**Current strengths**

- lightweight intent detection,
- product/order/catalog response formatting,
- useful conversational commerce product behavior.

**Current problem**

- takes raw `esnafId`,
- reads Commerce collections directly,
- not Conversation/Customer identity aware,
- can become a second commerce/read-policy layer.

**Disposition:** `PRESERVE INTENT/RESPONSE SEED + REWIRE VIA CAPABILITY BUS/DOMAIN READS`

Target:

```text
MessageReceived
 -> intent/router/agent
 -> authorized Commerce read/query command
 -> response proposal
 -> MessageIntent
```

Full agent orchestration belongs W8; Commerce query authority W7.

---

# 7. Campaign / lifecycle messaging boundary

**Historical/current rule from SÖKÜM 15:** Campaign is not provider sender authority.

W5 defines only common messaging contract:

```text
Campaign (W7)
 -> MessageIntent
 -> Messaging policy/consent
 -> W3 durable delivery
```

Campaign scheduling/journey/attribution stays W7.

Any existing direct WhatsApp/SMS/email campaign sender is `ADAPTER/RETIRE` once MessageIntent path is active.

---

# 8. Support Case foundation

## W5-SUP-001 — Support type contracts

**Paths**

- `packages/support/src/types/ticket.ts`
- `packages/support/src/types/knowledgeBase.ts`
- `packages/support/src/index.ts`

**Current strengths**

- ticket states,
- P1–P4 priority,
- category/assignment,
- customer/agent/AI messages,
- AI source/confidence metadata,
- SLA target/deadline vocabulary,
- KB article/chunk/RAG/source attribution vocabulary.

**Disposition:** `PRESERVE CONTRACT SEED + SPLIT AUTHORITY`

W5 promotes SupportCase core identity/state/event foundation.

Full durable SLA clock/escalation and advanced KB/AI activation can close in W9/W8 respectively.

---

## W5-SUP-002 — Support ticket route

**Path**

- `apps/web/src/app/api/destek/talep/route.ts`

**Current strengths**

- real Firestore ticket writer,
- basic input validation,
- reference generation,
- deterministic priority seed,
- Telegram notification does not block create.

**Critical trust issues**

- POST decodes `kepenk_session` payload without signature verification,
- accepts `esnafId/sub` from that decoded payload,
- GET lists ticket metadata by arbitrary query-string email,
- email acts like authorization token.

**Disposition:** `PRESERVE ENDPOINT/UX SHAPE + HARD REWIRE IDENTITY/REPOSITORY`

POST target:

```text
verified RequestContext or anonymous public-support policy
 -> requester/customer resolution
 -> CreateSupportCase
 -> SupportCaseEvent(CREATED)
 -> notification as outbox side effect
```

GET target:

```text
verified requester ownership
 OR verified tenant/operator capability
 -> SupportCase read model
```

**Hard-cut:** unsigned cookie decode and arbitrary email authorization.

---

## W5-SUP-003 — Canonical SupportCase

**Disposition:** `GREENFIELD RUNTIME AROUND PACKAGE CONTRACT`

Minimum:

```text
SupportCase {
  caseId
  reference
  tenantId?
  requesterPrincipalId?
  customerId?
  source
  subject/category/priority
  status
  assignedTeamId?/actorId?
  createdAt/updatedAt
  revision
}

SupportCaseEvent {
  eventId
  caseId
  type
  actor/requester
  payload
  createdAt
}
```

State transitions validated server-side.

---

## W5-SUP-004 — Support messages -> Messaging bridge

Support does not build a second message transport.

```text
support requester reply
 -> SupportCaseEvent
 -> Conversation/Message linkage

operator/AI reply proposal
 -> MessageIntent
 -> Messaging/W3 delivery
 -> delivery/result event
```

Support can own case thread semantics/reference, Messaging owns transport/message delivery identity.

---

## W5-SUP-005 — Priority classifier

**Representative path**

- `apps/web/src/data/destekTalepConfig.ts`

**Disposition:** `PRESERVE DETERMINISTIC SEED + VERSION POLICY`

Keyword classification can be baseline, but priority override must record reason/actor/policy version. Security/payment/account/data-loss impact can elevate priority from verified signals.

---

## W5-SUP-006 — SLA boundary

W5 stores policy snapshot/reference and event timestamps needed for SLA.

W9 full activation builds:

- first-response clock,
- resolution clock,
- waiting-customer pause/resume,
- business calendar,
- durable timers/escalation,
- breach workflow.

Simple `createdAt + firstResponseMinutes` helper is not production SLA authority.

---

## W5-SUP-007 — AI support authority

Package fields such as `confidence`, `autoSent`, `aiResolved` are advisory/projection seeds.

**Hard rule:** confidence alone cannot authorize:

- refund,
- subscription/entitlement changes,
- account closure/reactivation,
- credential/security mutation,
- privacy deletion,
- support case closure for protected categories.

W8 agent/runtime handles proposal + provenance; Support policy/domain command decides action.

---

# 9. Customer ↔ Messaging ↔ Support identity graph

Canonical graph:

```text
External channel alias (phone/email/provider user)
        ↓
CustomerIdentityAlias
        ↓
Customer(customerId)
        ↓
Conversation(conversationId)
        ↓
Message(s)

Support requester / customer
        ↓ optional binding
SupportCase(caseId)
        ↓
CaseEvent(s)
        ↓
Messaging conversation for transport if needed
```

A SupportCase can exist without Customer when anonymous support policy allows it, but requester proof/claim token is explicit and scoped. Email string alone is never read authorization.

---

# 10. Customer migration / backfill

Sources may include:

- `musteriProfiller`,
- historical/remaining CRM collections,
- bookings/orders/message threads,
- imported contacts,
- support requester identities.

Migration stages:

```text
inventory aliases
 -> normalize E.164/email
 -> tenant-scope candidate clusters
 -> deterministic/high-confidence matches
 -> conflict queue for ambiguous identities
 -> canonical Customer + alias mapping
 -> activity backfill with source/provenance
 -> projection parity
 -> old writer read-only
```

No automatic cross-tenant merge.

Phone collisions/shared business numbers are explicit conflict cases.

---

# 11. W5 exact task order

```text
T1  Promote CRM schemas to canonical Customer/Activity/Segment contracts
T2  Define stable customerId + CustomerIdentityAlias uniqueness rules
T3  Build Customer repository/service/commands with revision/CAS
T4  Bind filterEngine to validated Segment DSL + resource limits
T5  Inventory/backfill legacy `musteriProfiller` and any remaining customer stores
T6  Convert `musteriCRM.ts` to adapter/projection source, stop second writes
T7  Inventory actual current customer UI/API callers before adding compatibility routes
T8  Build Customer read/search/timeline/segment API boundary
T9  Define Conversation/Participant/Message contracts
T10 Build inbound normalized-event -> alias/customer/conversation/message handler
T11 Define MessageIntent + consent/policy decision record
T12 Connect outbound MessageIntent to W3 durable provider delivery
T13 Project provider delivery/reply outcomes back to Messaging
T14 Preserve/rewrite WhatsApp sales bot as domain-query/MessageIntent consumer
T15 Promote Support contract into SupportCase/CaseEvent repository
T16 Hard-rewire `/api/destek/talep` identity + read authorization
T17 Bind Support messages to Messaging conversation/intents
T18 Version priority policy; capture SLA policy refs/event timestamps
T19 Rewire support operator UX/read models without redesign
T20 Customer/Messaging/Support migration, abuse, identity and delivery tests
```

Parallelization:

- T1–T4 Customer foundation can parallel T9–T13 Messaging foundation after shared IDs/event envelopes are stable.
- T15–T19 Support depends on W1 identity and benefits from Messaging contracts, but case repository can start in parallel.
- W3 provider ingress/delivery must be available before final T10/T12 cutover.

---

# 12. W5 acceptance matrix

| Senaryo | Beklenen |
|---|---|
| Same phone + same tenant + verified alias | deterministic same Customer |
| Same phone + different tenant | distinct tenant-scoped customers |
| Two existing customers share conflicting alias | merge blocked/manual conflict path |
| Stale customer revision update | reject |
| Customer merge | aliases/activity preserve provenance; redirect/tombstone semantics |
| RFM/churn/prediction recompute | no mutation of historical activity truth |
| Invalid/overdeep Segment DSL | reject/resource-bound |
| W3 inbound Twilio event duplicate | one Message/customer activity effect |
| Inbound unknown phone | create/link according to explicit policy, stable alias |
| Outbound marketing with no consent | MessageIntent denied before provider call |
| Transactional message with allowed policy | deliver path proceeds |
| Provider accepted but delivery later fails | status `sent/accepted` != `delivered`; failure projected |
| Agent/campaign directly calls Twilio bypassing intent | prohibited after cutover |
| Support POST random fake `kepenk_session` | no tenant identity granted |
| Support GET arbitrary email | deny/no metadata leak |
| Authenticated requester own cases | allowed |
| Tenant operator with support capability | scoped tenant cases only |
| AI high confidence on refund/account-delete | cannot authorize protected action |
| Telegram support notification fails | case still committed; side effect retry/observable |
| Customer UI/support UI | canonical read model, visual UX preserved |

---

# 13. Frontend / UX preservation

W5 does not redesign:

- customer/CRM dashboard surfaces that remain in current product,
- WhatsApp/inbox interaction UX,
- support create form/operator dashboard,
- Kepenk public marketing frontend.

Work is data/command/identity wiring.

If a historical CRM UI/route no longer exists on current main, W5 does not resurrect it solely for nostalgia; canonical capability is exposed only where current product/launch requires it.

---

# 14. W5 cleanup candidates after gate

### Retire as authority

- phone-derived customer document IDs,
- `musteriProfiller` as parallel canonical profile truth,
- mutable derived tags/predictions mixed into source-of-truth activity,
- provider thread/message IDs as internal primary IDs,
- direct campaign/agent/provider sends bypassing MessageIntent,
- unsigned support session decode,
- email-only support read authorization,
- confidence-only support auto-resolution authority.

### Preserve

- crm-schema Contact/Label/Activity/Segment contracts,
- filter DSL/engine algorithm,
- customer profile/timeline/segmentation product semantics,
- provider-independent Conversation/Inbox UX ideas,
- WhatsApp intent/commerce response seed,
- Support ticket/P1-P4/category/KB product vocabulary,
- support operator/create UX,
- deterministic priority classifier seed.

---

# 15. W5 final verdict

> **Customer tarafında current main'de eski CRUD route'ları drift etmiş olsa da değerli CRM schema/segment/activity emeği duruyor. W5 bunu eski API'yi diriltmeden canonical Customer Core runtime'a yükseltir. Messaging provider webhook'tan ayrılarak Conversation/Message/MessageIntent authority'sine kavuşur. Support'un gerçek ticket writer'ı verified identity ve Messaging bridge ile güvenli foundation'a alınır; full SLA/AI vertical derinliği daha sonra açılır.**
