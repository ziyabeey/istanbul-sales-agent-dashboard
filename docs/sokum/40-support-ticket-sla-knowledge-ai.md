# SÖKÜM 40 - Support OS / Ticket / SLA / Knowledge Base / AI Assistance

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Kapsam:** `packages/support`, `apps/web/src/app/api/destek`, `dashboard/manage/destek`, support configuration, ticket lifecycle, SLA, knowledge base / RAG ve AI-assisted support.  
> **Core baseline:** `docs/sokum/36-canonical-architecture-synthesis.md`

## Executive verdict

Support mevcut repoda yalnız bir mock fikir değildir. Üç farklı olgunluk katmanı vardır:

1. `@kepenk/support` içinde iyi bir ticket/SLA/KB domain sözleşmesi,
2. `dashboard/manage/destek` içinde ciddi fakat demo/local-state operator UX'i,
3. `/api/destek/talep` içinde gerçek Firestore ticket create/list runtime'ı.

Fakat production Support OS tamamlanmamıştır. Gerçek writer yalnız ticket yaratma/listeme seviyesinde doğrulandı; assignment, response, escalation, reopen, resolve/close ve durable SLA authority'si görünmüyor. Mevcut route ayrıca session cookie payload'ını imza doğrulamadan decode edip `esnafId` olarak kabul ediyor ve GET tarafında yalnız verilen e-posta adresiyle ticket metadata'sı listeliyor.

Bu nedenle karar:

> **KEEP** Support'u first-class capability olarak; ticket state dili, P1-P4/SLA intent'i, kategori/priority tohumları, operator UX'i, KB/RAG contract'ları ve gerçek create-ticket akışını.  
> **REWRITE** identity/trust, ticket repository/commands, assignment/status transitions, message binding, SLA semantics ve AI authority sınırlarını.  
> **BUILD** canonical `SupportCase` authority, append-only case events, durable SLA/escalation, operator queue/read models, Messaging/RAG bridges ve verified AI policy.  
> **DROP AFTER CUTOVER** unsigned JWT payload trust'ı, arbitrary email query authorization'ı, demo state'i business truth saymayı ve confidence-only AI resolution/autosend authority'sini.

Ana invariant:

> **Support case state'ini Support OS sahiplenir; identity, transport, retrieval ve finansal/destructive action authority'lerini sahiplenmez. AI yardım eder, confidence tek başına business action veya ticket closure yetkisi vermez.**

---

## 1. Current-main kanıtı

### 1.1 Ticket domain contract'ı boş değil

`packages/support/src/types/ticket.ts` şunları tanımlar:

- status: `open`, `assigned`, `in_progress`, `waiting_customer`, `resolved`, `closed`,
- priority: P1-P4,
- category,
- assignment,
- customer/agent/AI messages,
- AI response/confidence/source metadata,
- `aiResolved`,
- SLA deadline/breach,
- resolved/closed timestamps,
- first-response ve resolution hedefleri.

Bu vocabulary **KEEP** değerindedir.

### 1.2 SLA helper'ları yalnız başlangıç seed'idir

Mevcut `isSLABreached()` / `getSLARemaining()` yalnız `createdAt + firstResponseMinutes` hesabı yapar.

Bunlar production SLA authority değildir çünkü:

- gerçek first response event'ini bilmez,
- resolution clock'u ayrı işlemez,
- waiting-customer pause/resume yoktur,
- business hours/calendar yoktur,
- escalation job yoktur,
- durable timer yoktur,
- policy version/snapshot yoktur.

### 1.3 KB/RAG taslağı değerlidir

`packages/support/src/types/knowledgeBase.ts`:

- MDX article,
- draft/published state,
- category/tag,
- article metrics,
- chunk,
- embedding,
- RAG search result,
- AI response source attribution

taşır.

Dosya ayrıca tarihsel olarak 500-token chunk / overlap / Vertex embedding / vector search yönünü belgelemiştir. Bu niyet KEEP'tir; embedding/index authority'si merkezi RAG/knowledge architecture ile konsolide edilmelidir.

### 1.4 AI contract'ında riskli authority karışımı var

`AIResponseResult` içinde `autoSent`, Ticket içinde `aiResolved` bulunur; confidence threshold `AUTO_SEND: 0.85` olarak tanımlıdır.

Confidence faydalı bir sinyaldir fakat authorization değildir.

Özellikle billing/account/security/data-loss gibi support kategorilerinde yalnız confidence nedeniyle:

- para iadesi,
- abonelik değişikliği,
- hesap kapatma/açma,
- credential/security mutation,
- veri silme,
- ticket closure

yapılamaz.

### 1.5 Gerçek ticket writer var

`apps/web/src/app/api/destek/talep/route.ts` POST:

- input validation yapıyor,
- referans üretiyor,
- `oncelikBelirle()` ile priority seed'i çıkarıyor,
- `destek_talepler` Firestore collection'ına gerçek kayıt yazıyor,
- Telegram operator notification gönderiyor.

Bu migration source olarak **KEEP / ADAPT** edilmelidir.

### 1.6 Mevcut trust boundary güvenli değil

Aynı POST route `kepenk_session` cookie'sini `header.payload.signature` biçiminden ayırıp payload kısmını `atob` + JSON parse ile okuyor ve `esnafId/sub` alanını kabul ediyor.

Burada imza, issuer, expiry veya güncel tenant/membership lifecycle doğrulaması görünmüyor.

Bu SÖKÜM 29 Identity/Trust invariant'ını ihlal eder.

### 1.7 GET authorization da canonical değildir

GET yalnız query-string `eposta` alıp Firestore'da o e-posta ile eşleşen son 20 ticket'ı döndürüyor.

Route içinde doğrulanmış principal/tenant/requester ownership kontrolü görünmüyor.

Bu nedenle e-posta adresi authorization token'ı sayılamaz.

### 1.8 Lifecycle runtime eksik

Current main'de `/api/destek` altında yalnız `talep` route grubu doğrulandı. Repo aramalarında Support'a özgü assign/resolve/escalate/reopen writer bulunmadı.

Dolayısıyla production lifecycle'ın büyük bölümü contract seviyesinde kalmıştır.

### 1.9 Operator dashboard ciddi UX ama demo truth

`dashboard/manage/destek/page.tsx`:

- ticket list/detail,
- P1-P4,
- status filter,
- SLA badge,
- AI confidence,
- AI-resolved göstergesi,
- ticket messages,
- açık ticket / AI çözüm / ortalama çözüm / SLA ihlal KPI kartları

taşır.

Ancak `DemoTicket[]`, `DEMO` ve local React state ile çalışır. Bu ekran ürün tasarımı olarak KEEP, business truth olarak DROP/REWIRE'dır.

### 1.10 Priority classifier iyi seed, fakat policy authority olmalı

`destekTalepConfig.ts` gerçek `@kepenk/support` TicketCategory/TicketPriority tiplerini kullanır ve bazı kritik/yüksek öncelik keyword'leri tanımlar.

Bu iyi bir deterministic baseline'dır fakat priority:

- versioned policy,
- operator override reason,
- tenant/plan impact,
- incident correlation,
- security/payment severity

gibi sinyallerle geliştirilmeli; raw keyword listesi tek authority olmamalıdır.

---

## 2. Canonical SupportCase authority

Önerilen aggregate:

```text
SupportCase
- caseId
- tenantId?
- requesterPrincipalId / customerId?
- source
- subject
- category
- priority
- status
- assignedTeamId?
- assignedActorId?
- conversationThreadId?
- slaPolicySnapshot
- revision
- createdAt
- updatedAt
- resolvedAt?
- closedAt?
- resolutionCode?
```

`tenantId` her support vakasında zorunlu olmayabilir; pre-login/account-access support vakaları olabilir. Fakat owner/requester binding explicit olmalıdır.

### Case event stream

```text
SupportCaseEvent
- CASE_CREATED
- PRIORITY_CHANGED
- ASSIGNED
- RESPONSE_SENT
- REQUESTER_REPLIED
- WAITING_CUSTOMER_ENTERED
- WAITING_CUSTOMER_EXITED
- ESCALATED
- SLA_WARNING
- SLA_BREACHED
- RESOLVED
- REOPENED
- CLOSED
- AI_SUGGESTION_CREATED
- AI_SUGGESTION_ACCEPTED
- AI_SUGGESTION_REJECTED
- AUTOMATION_ACTION_EXECUTED
```

Events audit/metrics için attributable olmalıdır.

---

## 3. Identity / requester boundary

Support kendi auth sistemini kurmamalıdır.

```text
Verified Request Principal
        ↓
SupportCaseCommand
        ↓
owner / tenant / membership authorization
        ↓
SupportCase
```

Rules:

1. Signed/verified session olmadan `esnafId` trusted değildir.
2. Query string'deki email authorization değildir.
3. Authenticated tenant user yalnız kendi tenant'ına erişebilir.
4. Customer requester access opaque case token veya verified customer identity ile bağlanabilir.
5. Operator/admin erişimi canonical staff/admin authorization üzerinden gelmelidir.
6. Impersonation varsa SÖKÜM 29/31 audit invariant'ları geçerlidir.

---

## 4. Ticket status state machine

Status string'i raw PATCH alanı olmamalıdır.

Önerilen temel transitions:

```text
OPEN
 -> ASSIGNED
 -> IN_PROGRESS
 -> WAITING_CUSTOMER
 -> IN_PROGRESS
 -> RESOLVED
 -> CLOSED

RESOLVED -> REOPENED/IN_PROGRESS
```

Özel komutlar:

- AssignCase
- StartWork
- RequestCustomerResponse
- AddSupportResponse
- EscalateCase
- ResolveCase
- ReopenCase
- CloseCase

her biri revision/idempotency/audit ile yürür.

`resolved` ve `closed` aynı anlam değildir. Resolved çözüm önerilmiş/uygulanmış durumu; closed ise closure policy tamamlanmış terminal operasyon durumu olabilir.

---

## 5. SLA durable olmalı

SLA yalnız ekranda kalan dakika hesaplamak değildir.

```text
CaseCreated
 -> resolve SLA policy snapshot
 -> schedule first-response watchdog
 -> schedule resolution watchdog

AgentResponse
 -> satisfy first-response target

WaitingCustomerEntered
 -> pause eligible clocks

RequesterReplied
 -> resume eligible clocks

Deadline
 -> SLA_WARNING / SLA_BREACHED
 -> escalation policy
```

SÖKÜM 24 Durable Jobs kullanılmalıdır.

SLA policy versionlanmalıdır:

```text
SLAPolicy
- policyId
- version
- priority
- firstResponseTarget
- resolutionTarget
- businessCalendarId?
- waitingCustomerPausePolicy
- warningThresholds
- escalationPolicyId
```

### Invariant

> SLA sonucu ekran saatinden veya request anındaki `Date.now()` helper'ından türetilen geçici state değil, verified case events + policy snapshot üzerinden hesaplanan operational truth'tur.

---

## 6. Messaging boundary

Ticket message ile delivery channel aynı şey değildir.

```text
SupportCase
   |
   +-> conversationThreadId
            ↓
       Messaging Core
       email / WhatsApp / in-app / etc.
```

Support bilir:

- bu mesaj hangi case'e aittir,
- sender rolü,
- response lifecycle etkisi,
- SLA etkisi.

Messaging bilir:

- channel,
- provider message id,
- delivery/retry status,
- inbound verification,
- outbound send result.

External email/WhatsApp/helpdesk ingress SÖKÜM 33 `IntegrationConnection` + verified ingress üzerinden tenant/case'e resolve edilmelidir.

---

## 7. Knowledge Base / RAG boundary

Support KB product ownership taşıyabilir fakat duplicate embedding runtime kurmamalıdır.

Önerilen ayrım:

```text
Support Content Authority
  KBArticle revision / draft / publish / locale / tags
        ↓
Knowledge/RAG Indexer
  chunks / embeddings / retrieval index
        ↓
Support AI Retrieval
```

`KBChunk.embedding` canonical business entity değildir; rebuild edilebilir index artifact'ıdır.

Article publish/version lifecycle Content/RAG stack ile ortak primitive kullanabilir.

---

## 8. AI assistance authority

AI support için üç güven seviyesi önerilir:

### Level 1 - Retrieval / Draft

Default.

- ilgili KB maddelerini getir,
- kaynak göster,
- cevap draft'ı oluştur,
- operator'a öner.

### Level 2 - Policy-approved low-risk auto-send

Yalnız explicit policy kapsamında:

- düşük riskli bilgi soruları,
- account mutation gerektirmeyen how-to,
- source coverage yeterli,
- blocked intent yok,
- tenant/platform policy izinli.

### Level 3 - Sensitive action

Financial/account/security/privacy/destructive actions ayrı capability/approval gerektirir.

Örnek:

```text
AI suggestion
 -> operator approval / explicit safe automation policy
 -> canonical domain command
 -> domain authority validation
 -> action
 -> SupportCaseEvent reference
```

### Invariant

> `confidence > 0.85` tek başına auto-send veya auto-resolve izni değildir.

`aiResolved` canonical state olmaktan çıkarılıp örneğin `suggestedResolution` / `automationOutcome` projection'ına dönüştürülmelidir.

---

## 9. KPI / operational truth

Dashboard'daki KPI intent'i KEEP.

KPI'lar demo constant yerine verified event'lerden türemeli:

- open backlog,
- backlog age,
- first response p50/p95,
- resolution p50/p95,
- SLA breach rate,
- reopen rate,
- escalation rate,
- waiting-customer duration,
- agent load,
- human handoff rate,
- AI suggestion acceptance/rejection,
- safe auto-send success,
- true deflection.

### True deflection

AI cevap verdi diye ticket “deflected” sayılmaz.

Örneğin belirli pencere içinde:

- reopen yok,
- human handoff yok,
- escalation yok,
- negatif feedback yok

ise deflection sayılabilir.

---

## 10. Priority / incident correlation

Keyword classifier KEEP seed.

Ama özellikle P1/P2 için ileride platform incident sinyaliyle korelasyon gerekir:

```text
10 tenant aynı ödeme hatasını bildiriyor
        ↓
Incident candidate
        ↓
related support cases
        ↓
shared incident status / broadcast
```

Support ticket tek başına Observability/Incident authority değildir; ikisi explicit references ile bağlanır.

---

## 11. KEEP / REWRITE / BUILD / DROP

### KEEP

- Support first-class product capability.
- Ticket status/priority/category vocabulary.
- P1-P4/SLA product intent.
- real create-ticket route as migration source.
- support category/priority config seed.
- operator dashboard UX.
- ticket conversation concept.
- KB article/chunk/RAG source-attribution concepts.
- Telegram notification intent as operator notification adapter.

### REWRITE / CONNECT

- cookie/session identity -> SÖKÜM 29 verified trust.
- requester/tenant ownership.
- Firestore raw writer -> canonical SupportCase repository/commands.
- ticket messages -> Messaging thread binding.
- SLA -> durable jobs + versioned policy.
- KB embeddings -> canonical RAG/indexing layer.
- AI response -> explicit automation policy and audit.
- external channels -> IntegrationConnection verified ingress.
- operator actions -> Admin/Staff authorization + Audit.

### BUILD

- SupportCase command authority.
- revision + idempotency.
- append-only SupportCaseEvent.
- assignment queues/teams.
- escalation lifecycle.
- reopen lifecycle.
- durable SLA timers.
- operator/admin runtime backed by canonical data.
- customer/requester secure case access.
- response/delivery bridge.
- AI suggestion/approval/autosend policy engine.
- verified KPI projectors.
- incident correlation hooks.

### DROP AFTER CUTOVER

- unsigned JWT/session payload decode as tenant trust.
- email query parameter as authorization.
- `DemoTicket[]` as business truth.
- raw client/local ticket mutations.
- confidence-only `autoSent` authority.
- `aiResolved` as canonical closure state.
- duplicate embedding/vector truth outside canonical RAG/index layer.

---

## 12. Migration order

1. Preserve current ticket records and UI as migration/reference fixtures.
2. Replace unsigned cookie extraction and email-only GET authorization immediately.
3. Introduce SupportCase identity + repository + revision/idempotent commands.
4. Map legacy `destek_talepler` records to SupportCase projection.
5. Build assignment/status/reopen/resolve commands.
6. Bind messages to canonical Messaging thread/delivery.
7. Introduce versioned SLA policy + Durable Jobs watchdog/escalation.
8. Connect KB publish/content to canonical RAG indexing.
9. Add AI suggestion policy; keep sensitive actions human/domain-authority gated.
10. Rewire dashboard from `DemoTicket[]` to Support read models.
11. Derive KPI from case events.
12. Remove legacy raw Firestore/email-query/demo truth only after caller count reaches zero.

---

## 13. Final invariant set

1. **Support owns case lifecycle, not authentication.**
2. **Email address is identity data, not authorization.**
3. **Ticket messages belong to a support case but delivery truth belongs to Messaging.**
4. **SLA is durable policy + event truth, not a browser countdown.**
5. **Resolved and closed are explicit transitions.**
6. **AI confidence is advisory, not capability authority.**
7. **Sensitive domain changes always pass through their canonical authority.**
8. **KB article state and retrieval index are different concerns.**
9. **Support KPI derives from verified events.**
10. **External ingress is verified, tenant-bound and idempotent.**

---

## Sonuç

SÖKÜM 40 kapanmıştır.

Support çöpe atılacak bir demo değildir. Current main gerçek ticket creation taşıyor ve güçlü bir Ticket/SLA/KB product contract'ı bırakmış. Ancak production Support OS'un assignment, escalation, resolution, SLA orchestration, secure requester access ve AI policy authority'si henüz tamamlanmamıştır.

Yeni Kepenk'te Support **first-class bounded capability** olarak korunmalı; mevcut gerçek writer migration source olmalı, güvenlik ve lifecycle sınırları canonical çekirdeğe bağlanarak yeniden kurulmalıdır.
