# W8 — Agent Runtime + Knowledge Exact Execution Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLAN KAPALI — implementation başlamadı  
> **Kaynak:** SÖKÜM 10–11, 18–19 + SENTEZ 1–5 + W1–W7 + current `main` doğrulaması  
> **Amaç:** Çoklu agent/model/RAG dünyasını tek durable, capability-constrained ve provenance-aware runtime'a taşımak.

---

# 1. W8 exit contract

W8 sonunda canonical authority'ler:

```text
AgentDefinition
CapabilityDefinition / CapabilityRegistry
AgentRun
RunStep
ModelCall
ToolCall
ToolOutcome
AgentOutcome
OutcomeVerification
ModelPolicy / ModelGateway
KnowledgeSource
KnowledgeDocument
KnowledgeChunk
EmbeddingRevision
RetrievalEvidence
KnowledgeInsightProjection
FeedbackEvent
EvaluationResult
```

Ana invariant:

> **Agent business truth yazmaz. Agent yalnız policy ile izin verilmiş canonical capability/command çağırır; başarı ancak capability/provider/domain outcome doğrulandığında oluşur.**

Minimum kurallar:

1. Process-memory runner/session/run state authority değildir.
2. `agent_logs` observability'dir, AgentRun truth değildir.
3. Model output command sonucu değildir.
4. Agent permission = acting identity ∩ tenant membership ∩ entitlement ∩ agent capability allowlist ∩ command policy.
5. Agent doğrudan Firestore domain collection mutate etmez.
6. Agent doğrudan Twilio/Meta/Iyzico gibi provider credential çözmez veya provider state'i truth saymaz.
7. Model provider unavailable ise fake/fallback output production success sayılamaz.
8. Vector index source truth değildir; canonical knowledge source/chunk kayıtlarının search projection'ıdır.
9. Retrieval evidence source/provenance/revision/embedding-model metadata taşır.
10. Cross-tenant collective knowledge privacy, anonymization, retention ve W10 governance gate'lerinden geçer.
11. Generated platform insight evidence değildir; evidence üzerinden türetilen projection'dır.
12. W3 DurableJob, retry/idempotency/DLQ omurgası AgentRun async execution için yeniden kullanılacaktır.

---

# 2. Current-main runtime inventory

## Primary live surface

- `apps/web/src/agents/AgentBase.ts`
- `apps/web/src/agents/AgentBus.ts`
- `apps/web/src/agents/OrchestratorAgent.ts`
- `apps/web/src/agents/agentRunner.ts`
- `apps/web/src/agents/*Agent.ts`
- `apps/web/src/lib/agents/*`

## Parallel AI/model surface

- `apps/web/src/lib/ai/agentOrchestrator.ts`
- `apps/web/src/lib/ai/modelClient.ts`
- `apps/web/src/lib/ai/modelRouter.ts`
- `apps/web/src/lib/ai/promptTemplates.ts`
- `apps/web/src/lib/ai/stratejikSabitler.ts`

## HTTP entry surfaces

- `apps/web/src/app/api/ajan/[ajanAdi]/route.ts`
- `apps/web/src/app/api/ajan/tetikle/route.ts`
- `apps/web/src/app/api/agent/marketing/route.ts`
- `apps/web/src/app/api/a2a/route.ts`
- `apps/web/src/app/api/adk/rpc/route.ts`

## Knowledge/RAG surface

- `apps/web/src/lib/kolektifZeka.ts`
- `apps/web/src/utils/platformZekasiPrompt.ts`
- `apps/web/src/utils/anonimize.ts`
- `apps/web/src/types/kolektifZeka.ts`
- `platform_insights` projection read inside `agentRunner.ts`

## Historical package drift

`packages/agents` current main'de canonical runtime değildir. Yalnız sınırlı eski `Agent7.ts`, `Agent9.ts` ve küçük export yüzeyi taşır.

**Karar:** package adına bakıp yeni runtime bunun üstüne kurulmaz. Taşınacak primitive current live call graph'tan seçilir.

---

# 3. Runtime primitives to preserve

## W8-RUN-001 — `AgentBase`

**Path**
- `apps/web/src/agents/AgentBase.ts`

**KEEP**
- max-hop loop guard,
- circuit breaker intent,
- quota/cost gate intent,
- common error boundary,
- DLQ intent,
- centralized run wrapper idea.

**REWRITE**
- `kotaKontrol` W2 Usage/Entitlement projection'a bağlanır,
- logging `AgentRun/RunStep` state ile ayrılır,
- domain notification direct write yerine MessageIntent/Notification capability olur,
- run result persistent state taşır.

**Disposition:** `PRESERVE LIFECYCLE INTENT + REWRITE AUTHORITY`

---

## W8-RUN-002 — `AgentBus`

**Path**
- `apps/web/src/agents/AgentBus.ts`

Current:

```text
EventEmitter singleton
 -> runAgent()
 -> optional result event
 -> generic Firestore queue fallback
```

**KEEP**
- agent-to-agent delegation intent,
- causation/hop protection,
- async fallback idea.

**DROP AS AUTHORITY**
- process-local EventEmitter,
- RAM result listener as durable workflow truth.

Target:

```text
AgentRun/RunStep
 -> Capability/Delegation command
 -> W3 DurableJob
 -> child AgentRun
 -> persisted outcome
```

EventEmitter may remain local optimization only.

---

## W8-RUN-003 — ADK Orchestrator

**Path**
- `apps/web/src/agents/OrchestratorAgent.ts`

**KEEP**
- ADK adapter knowledge,
- intent routing idea,
- specialist agent registry intent,
- queue/idempotency/DLQ integration seeds.

**REWRITE**
- `InMemoryRunner` cannot own persistent session/run state,
- fixed `system_user` identity removed,
- routing config moves to AgentDefinition/RouterPolicy,
- queue consumer extracted from orchestration definition,
- tool/action execution uses Capability Registry.

**Disposition:** `PRESERVE ADK ADAPTER + REWRITE RUN STATE`

---

# 4. Duplicate agent/model authorities

## W8-MOD-001 — `agentRunner.ts`

**Path**
- `apps/web/src/agents/agentRunner.ts`

Current owns its own:

- agent -> model map,
- Gemini thinking map,
- prompt registry,
- sector/RAG injection,
- circuit breaker,
- direct provider calls,
- JSON output parsing,
- agent logging.

**Disposition:** `DECOMPOSE INTO AgentDefinition + ModelGateway + KnowledgeRetriever + RunStep`

Good agent prompts are content assets to migrate, not runtime authority.

---

## W8-MOD-002 — `lib/ai/agentOrchestrator.ts`

**Path**
- `apps/web/src/lib/ai/agentOrchestrator.ts`

This is a second 17-agent registry + keyword router + model-tier selector.

**Disposition:** `ADAPT USEFUL CONFIG / RETIRE PARALLEL REGISTRY`

Only one canonical agent identity/model policy registry may remain.

---

## W8-MOD-003 — `modelClient.ts`

**Path**
- `apps/web/src/lib/ai/modelClient.ts`

**KEEP**
- PII filtering integration idea,
- prompt injection check hook,
- usage/token/latency capture,
- central wrapper shape.

**HARD-CUT production semantics**
- missing key / provider failure -> template fallback returned as if normal model result.

Target:

```text
ModelCallOutcome = SUCCEEDED | FAILED | UNAVAILABLE | POLICY_BLOCKED
```

Fallback text may exist only as explicitly labeled UI/degraded UX, never canonical model success.

---

## W8-MOD-004 — `modelRouter.ts`

**Path**
- `apps/web/src/lib/ai/modelRouter.ts`

**KEEP**
- task-class -> model-policy intent,
- structured JSON helper intent.

**REWRITE**
- static historical model IDs are config, not architecture,
- direct Anthropic client moves behind ModelGateway,
- task routing becomes versioned `ModelPolicy`.

---

# 5. AI security policy

## W8-SEC-001 — `aiSecurity.ts`

**Path**
- `apps/web/src/lib/security/aiSecurity.ts`

**PRESERVE + HARDEN**

Current seeds:

- prompt-injection pattern checks,
- input length/sanitization,
- TC/IBAN/card/CVV/email/phone/password masking,
- output PII check,
- cost/rate-limit constants,
- system/user prompt separation intent.

Canonical placement:

```text
AgentRun
 -> Input/Data classification
 -> ModelGateway Policy
 -> provider
 -> output classification/validation
```

Regex detection is defense-in-depth only. Capability authorization does not depend on the model obeying prompts.

---

# 6. Current HTTP entrypoints and hard cuts

## W8-API-001 — Dynamic agent route

**Path**
- `apps/web/src/app/api/ajan/[ajanAdi]/route.ts`

Current:
- public allowlist,
- rate limit,
- caller body may provide `esnafId`,
- route reads that tenant's business document,
- no verified membership/capability authorization at this boundary.

**Disposition:** `HARD-CUT CALLER-CONTROLLED TENANT + REWIRE TO AgentRun Gateway`

Target input:

```text
agentId / taskId
input
optional idempotency key
```

Tenant/user comes from W1 RequestContext.

---

## W8-API-002 — Legacy trigger route

**Path**
- `apps/web/src/app/api/ajan/tetikle/route.ts`

Current:
- bespoke TheCreator execution,
- direct Gemini API,
- direct `icerikler` writer,
- credential/API failure fallback produces placeholder content,
- placeholder can be persisted as `durum: hazir`.

**Disposition:** `HARD-CUT SHADOW RUNTIME + FAKE CONTENT SUCCESS`

Replacement:

```text
CreateContentProposal AgentRun
 -> ModelGateway
 -> structured validation
 -> Content/Site/Campaign draft command
```

---

## W8-API-003 — Marketing agent demo API

**Path**
- `apps/web/src/app/api/agent/marketing/route.ts`

Mock is explicitly labeled `isMock:true`, which is better than silent simulation.

**Disposition:** `KEEP DEMO SEMANTICS ONLY / RETIRE AS PRODUCTION AGENT API`

Demo/mock output never flows into production campaign truth.

---

## W8-API-004 — A2A endpoint

**Path**
- `apps/web/src/app/api/a2a/route.ts`

Critical current auth:

```text
Authorization == "Bearer A2A_SECRET_TOKEN"
```

literal comparison.

**Disposition:** `HARD-CUT TRUST MODEL`

JSON-RPC shape may be preserved as an adapter if needed. Trust must use W3 service identity / audience-scoped token and capability policy.

---

## W8-API-005 — ADK RPC dispatcher

**Path**
- `apps/web/src/app/api/adk/rpc/route.ts`

Current dispatcher exposes provider/domain modules such as:

- Iyzico kapora,
- Trendyol,
- Yemeksepeti,
- Paraşüt,
- Armut,
- LSA,
- TikTok.

Targeted review found no auth/tenant/capability guard in the route itself.

**Disposition:** `HARD-CUT DIRECT MODULE DISPATCH`

Provider/domain adapter knowledge is harvested into W3/W6/W7/W9. Agent RPC may request canonical capabilities only.

---

# 7. Shadow business authority examples

## W8-CAP-001 — Tahsilat agent

**Path**
- `apps/web/src/lib/agents/tahsilatAjani.ts`

Current agent:

1. reads business + customer profile,
2. calls Claude,
3. sends Twilio directly,
4. writes conversation directly,
5. mutates `cariHesaplar.sonHatirlatma/hatirlatmaSayisi`.

**Disposition:** `DECOMPOSE`

Target:

```text
Finance receivable projection
 -> Agent proposes reminder text
 -> W5 MessageIntent
 -> W3 provider delivery
 -> verified Message outcome
 -> Finance/CRM activity event
```

Agent never marks financial/contact state itself.

---

## W8-CAP-002 — Marketing agent

**Path**
- `apps/web/src/lib/agents/marketingAgent.ts`

Critical current problems:

- derives "ciro" from `agent_logs`, including pricing deltas and tahsilat log outputs,
- treats that synthetic number as business trigger,
- Meta activation is mock,
- writes `kampanya_baslatildi` + `basari:true` to agent log.

**Disposition:** `HARD-CUT SYNTHETIC OUTCOME / PRESERVE DECISION-PROPOSAL IDEA`

Input metrics come from W6/W7 projections. Output is CampaignProposal. W7 Campaign Core owns activation.

---

## W8-CAP-003 — Reklam assistant

**Path**
- `apps/web/src/agents/ReklamAsistaniAgent.ts`

Good:
- sector/context-aware creative generation,
- structured JSON intent,
- local draft distinction.

Current helper writes campaign draft directly to Firestore.

**Disposition:** `PRESERVE CREATIVE GENERATION + REWIRE PERSISTENCE`

Model returns proposal; `CreateCampaignDraft` capability persists through W7.

---

## W8-CAP-004 — Otonom Kapora ADK module

**Path**
- `apps/web/src/agents/adk_modules/OtonomKaporaAgent.ts`

Critical:
- caller-supplied tenant/booking IDs,
- direct Iyzico credential/provider call,
- payment simulation fallback creates fake token/link,
- writes simulated/real token/link directly into booking document,
- returns `basarili:true` even when provider call can fall back to simulation.

**Disposition:** `HARD-CUT FINANCIAL SHADOW AUTHORITY`

Provider/payment behavior moves to W6 Payment Core. Agent can invoke only:

```text
CreateDepositPaymentIntent(bookingId)
```

and receive verified capability outcome.

---

# 8. Capability Registry

## W8-CAP-005 — Canonical capability definition

Minimum:

```text
CapabilityDefinition {
  capabilityId
  version
  ownerDomain
  commandName
  requiredPermissions[]
  requiredEntitlements[]
  riskClass
  approvalPolicy?
  idempotencyPolicy
  inputSchemaRef
  outputSchemaRef
  allowedAgentIds[]
}
```

Examples:

```text
customer.message.send        -> W5 MessageIntent
booking.request.create       -> W6 Booking
payment.deposit.intent       -> W6 Payment
commerce.order.create        -> W7 Commerce
campaign.draft.create        -> W7 Marketing
campaign.activate            -> W7 + approval
site.draft.patch             -> W4 SiteAuthoring
support.case.comment         -> W5 Support
```

Agent prompt is never permission.

---

# 9. Durable AgentRun model

## W8-RUN-004 — AgentRun

```text
AgentRun {
  runId
  agentDefinitionId
  agentDefinitionVersion
  tenantId
  actingUserId?
  triggerType
  triggerRef?
  status QUEUED|RUNNING|WAITING_APPROVAL|SUCCEEDED|FAILED|CANCELLED
  startedAt?
  completedAt?
  correlationId
  parentRunId?
  hopCount
  inputRef
  outcomeRef?
  policySnapshotRef
}
```

## W8-RUN-005 — RunStep

```text
RunStep {
  stepId
  runId
  sequence
  type MODEL_CALL|RETRIEVAL|CAPABILITY_CALL|DELEGATION|VALIDATION|APPROVAL
  status
  startedAt
  completedAt?
  inputRef
  outputRef?
  errorCode?
}
```

W3 owns queue/lease/retry mechanics. W8 owns semantic run/step state.

---

# 10. ModelGateway

## W8-MOD-005 — One provider-neutral gateway

Target:

```text
ModelRequest
 -> ModelPolicy resolver
 -> AI security/data policy
 -> CredentialResolver (W3)
 -> Claude/Gemini/etc adapter
 -> usage/cost/latency capture
 -> structured-output validator
 -> ModelCallOutcome
```

`ModelPolicy` may include:

```text
preferred providers/models
fallback order
max input/output tokens
reasoning/thinking level
latency ceiling
cost ceiling
structured output schema
PII/data class allowance
```

Fallback provider is explicit. Fallback fake text is not success.

---

# 11. Knowledge canonical model

## W8-KNOW-001 — Existing collective intelligence

**Paths**
- `apps/web/src/lib/kolektifZeka.ts`
- `apps/web/src/utils/platformZekasiPrompt.ts`
- `apps/web/src/types/kolektifZeka.ts`
- `apps/web/src/utils/anonimize.ts`

**KEEP**
- anonymization intent,
- sector/district/type metadata filters,
- embedding search,
- similarity threshold,
- evidence list,
- confidence gating,
- RAG synthesis,
- low-evidence fallback.

**REWRITE**
- Pinecone + Firestore dual truth,
- raw free-text result/metric provenance,
- missing embedding/version lineage,
- dummy credential fallback,
- cross-tenant privacy governance.

---

## W8-KNOW-002 — Canonical source/chunk/embedding records

```text
KnowledgeSource {
  sourceId
  ownerScope PLATFORM|TENANT|BUSINESS
  ownerId?
  sourceType
  sourceEntityRef?
  sourceRevision?
  classification
  consentPolicyRef?
  retentionPolicyRef
  status
  createdAt
}

KnowledgeChunk {
  chunkId
  sourceId
  textRef
  contentHash
  metadata
  createdAt
}

EmbeddingRevision {
  embeddingId
  chunkId
  modelProvider
  modelId
  dimensions
  version
  vectorIndexRef
  createdAt
  retiredAt?
}
```

Vector bytes/index entry are projection. Source/chunk metadata is canonical.

---

## W8-KNOW-003 — Retrieval evidence

```text
RetrievalEvidence {
  evidenceId
  runId
  chunkId
  sourceId
  sourceRevision
  embeddingRevisionId
  similarityScore
  retrievalPolicyVersion
  selectedAt
}
```

This makes every RAG-influenced action explainable/replayable enough for audit/evaluation.

---

## W8-KNOW-004 — Platform insight projection

Current `platform_insights` and LLM-synthesized `anlayis` become derived projection:

```text
KnowledgeInsightProjection {
  insightId
  segment/scope
  evidenceIds[]
  synthesisModelCallId
  confidence
  generatedAt
  expiresAt?
}
```

Insight cannot recursively become source evidence without explicit promotion/review policy.

---

# 12. Cross-tenant learning and privacy

## W8-KNOW-005

`anonimizeBaglam()` is a useful seed but not sufficient as a privacy boundary.

Cross-tenant/platform knowledge requires:

- allowlisted source event classes,
- PII classification before ingestion,
- deterministic redaction/anonymization pipeline version,
- minimum cohort thresholds where appropriate,
- no raw tenant/customer identifiers in vector metadata,
- W10 retention/deletion lineage,
- source deletion -> vector projection tombstone/rebuild,
- no sensitive financial/customer raw text by default.

`OgrenmeAni.metrikler.gelirEtkisi` generic TL number is not financial truth. Monetary evidence references W6 FinancialEvent/Analytics conversion projection and uses minor units.

---

# 13. Outcome verification

## W8-VER-001 — Verified outcome contract

Target:

```text
AgentOutcome {
  runId
  proposedActions[]
  narrativeOutput?
}

OutcomeVerification {
  verificationId
  runId
  capabilityCallId?
  verifierType DOMAIN|PROVIDER|SCHEMA|POLICY|HUMAN
  expected
  observed
  status VERIFIED|REJECTED|PARTIAL|UNKNOWN
  evidenceRefs[]
  verifiedAt
}
```

Examples:

- "message sent" requires provider/message outcome, not generated text,
- "campaign active" requires provider binding/reconciliation,
- "payment succeeded" requires W6 verified provider result,
- "site updated" requires W4 committed draft/publish outcome,
- "order created" requires W7 Order command result.

No targeted current-main verifier authority was confirmed during this pass, so verification is an explicit build requirement rather than assumed existing functionality.

---

# 14. Feedback and evaluation loop

## W8-EVAL-001

```text
FeedbackEvent {
  feedbackId
  runId
  source USER|OPERATOR|DOMAIN_OUTCOME|PROVIDER_OUTCOME|AUTOMATED_EVAL
  rating/label
  evidenceRef?
  createdAt
}

EvaluationResult {
  evaluationId
  agentDefinitionVersion
  modelPolicyVersion
  dataset/version
  metricSet
  result
  createdAt
}
```

Tactic/strategy "success" is never inferred from agent self-report. It must reference canonical measured outcome from W5/W6/W7.

---

# 15. Exact task order

```text
T1  Freeze current agent/model/prompt registries and build caller inventory
T2  Define AgentDefinition + versioned Prompt/ModelPolicy references
T3  Define CapabilityDefinition registry and domain-command mappings
T4  Build AgentRun/RunStep persistence on W3 durable execution
T5  Move max-hop/circuit/quota/cost guards into shared run policy
T6  Build single ModelGateway and migrate aiSecurity hooks
T7  Migrate Claude/Gemini provider adapters; explicit failure/fallback semantics
T8  Adapt ADK InMemoryRunner to canonical session/run IDs; remove it as authority
T9  Rewire AgentBus delegation to durable child AgentRun
T10 Rewire `/api/ajan/[ajanAdi]` to W1 RequestContext + AgentRun Gateway
T11 Retire `/api/ajan/tetikle` shadow runtime after content proposal parity
T12 Retire literal-secret `/api/a2a` trust; add W3 service identity if A2A retained
T13 Hard-cut unauthenticated `/api/adk/rpc`; map modules to canonical capabilities/domains
T14 Decompose direct-write agents (`tahsilat`, marketing, reklam, kapora, etc.)
T15 Build KnowledgeSource/Chunk/EmbeddingRevision canonical store
T16 Backfill current `ogrenmeAnlari` as source records where provenance is sufficient
T17 Rebuild Pinecone/vector projection from canonical chunks
T18 Add RetrievalEvidence to AgentRun steps
T19 Reclassify `platform_insights` as derived projection
T20 Add privacy/redaction policy versions and W10 deletion lineage hooks
T21 Build OutcomeVerification
T22 Build FeedbackEvent/EvaluationResult loop
T23 Shadow-run representative agents against legacy outputs
T24 Disable parallel model/prompt/router authorities after parity
T25 Remove legacy direct-domain/provider permissions and writer paths after telemetry=0
```

---

# 16. Acceptance matrix

| Senaryo | Beklenen |
|---|---|
| Caller posts another tenant `esnafId` to agent API | cannot switch tenant |
| Agent prompt says "ignore permissions" | no capability authority gained |
| Agent has campaign-draft but not activate capability | activation denied |
| Model unavailable | explicit FAILED/UNAVAILABLE, no fake success |
| ADK process restarts mid-run | AgentRun resumes/fails deterministically from durable state |
| Same trigger retried | idempotency prevents duplicate domain effect |
| Agent delegates recursively > max policy | blocked with persisted reason |
| Agent generates payment link text | no payment truth without W6 outcome |
| Agent generates campaign | DRAFT/proposal only until W7 provider activation |
| Agent sends reminder | W5 MessageIntent + provider outcome tracked |
| Retrieval returns another tenant raw identity | privacy gate failure |
| Source record deleted under W10 policy | related vector projection removed/rebuilt |
| Embedding model changes | old/new EmbeddingRevision identifiable |
| Same source indexed twice | source/chunk identity prevents duplicate truth |
| RAG synthesis claims unsupported outcome | evidence refs reveal mismatch; no canonical success |
| `platform_insights` exists | treated as derived projection, not source evidence |
| agent log says success but capability failed | AgentRun/verification wins |

---

# 17. Retirement candidates after gate

### Retire as authority

- process-local EventEmitter AgentBus state,
- ADK `InMemoryRunner` session/run authority,
- parallel `AJAN_MODEL_HARITASI`, `AI_AGENTS`, `AGENT_PROMPTS`, task-model maps as competing registries,
- production fallback template/model outputs reported as success,
- caller-controlled `esnafId` agent execution,
- literal `A2A_SECRET_TOKEN` trust,
- unguarded ADK module RPC,
- direct agent Firestore domain writes,
- direct agent provider calls where canonical domain/provider capability exists,
- Pinecone record as source truth,
- `platform_insights` as evidence truth,
- `agent_logs.basari` as business outcome truth.

### Preserve

- specialist agent prompts/personas as versioned content assets,
- max-hop guard,
- circuit breaker,
- quota/cost gating intent,
- ADK integration know-how,
- provider model adapters,
- structured-output parsing/validation intent,
- AI PII/prompt-injection guard seeds,
- anonymization intent,
- Pinecone retrieval adapter,
- evidence threshold/confidence behavior,
- sector/district retrieval filters,
- collective-learning product idea.

---

# 18. W8 final verdict

Current Kepenk has a surprisingly rich agent system, but it is not one runtime. It is several overlapping runtimes, model registries, prompt registries, HTTP gateways, process-memory buses and agent-owned business writers.

Canonical target:

```text
Trigger / User / Domain Event
       ↓
W1 Request/Service Identity
       ↓
AgentDefinition + Policy
       ↓
Durable AgentRun
       ├── RetrievalEvidence from Knowledge Core
       ├── ModelGateway
       ├── Capability Call -> W2/W4/W5/W6/W7/W9
       └── child AgentRun
       ↓
Verified Outcome
       ↓
Feedback / Evaluation / Analytics
```

> **W8 invariant: AI may decide, propose, summarize and orchestrate; only canonical capabilities may mutate business truth, and every claimed outcome must be tied to observable evidence.**
