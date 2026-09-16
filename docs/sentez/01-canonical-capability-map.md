# SENTEZ 1 — Kepenk v2 Canonical Capability Map

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Kaynak:** SÖKÜM 01–41 + final inventory sweep  
> **Amaç:** Eski Kepenk içinde bulunan yetenekleri yeniden sökmeden, tek write-authority ilkesiyle Kepenk v2 için taşınabilir canonical capability haritasına dönüştürmek.  
> **Not:** Bu belge implementation planı değildir. Kod yazmaz; sahiplik, sınır ve bağımlılıkları sabitler.

---

# 1. Ana karar

Söküm sonucunda ortaya çıkan sistem 41 bağımsız ürün değildir.

Kepenk v2 hedefi aşağıdaki beş düzlemde toplanır:

```text
1. Platform Control Plane
2. Core Business Plane
3. Delivery / Public Experience Plane
4. Integration & Durable Execution Plane
5. Vertical Product Plane
```

Ana invariant değişmez:

> **Her business gerçeğinin tam olarak bir write authority'si vardır. Diğer bütün yüzeyler projection, adapter, read model veya command client'tır.**

Bu nedenle UI, provider adapter, AI agent, admin paneli, public site veya vertical product başka bir bounded context'in business truth'unu doğrudan mutate edemez.

---

# 2. Canonical Kepenk v2 haritası

## 2.1 Platform Control Plane

```text
Identity & Access
      ↓
BusinessTenant Lifecycle
      ↓
Subscription / Contract
      ↓
Entitlement Policy
      ↓
EffectiveCapabilitySet

Admin Control Plane
      ↓
Policy-guarded Domain Commands
```

Yatay authority'ler:

```text
Credential Authority
Audit Ledger
Telemetry / Observability
Data Lifecycle / Privacy
Platform Incident / Kill-Switch Policy
```

### Sahiplik

| Capability | Canonical authority | Sahip olduğu gerçek |
|---|---|---|
| Identity & Access | Identity Core | User, Membership, Session, RequestContext, role/capability |
| Tenant lifecycle | BusinessTenant | create/onboard/suspend/reactivate/offboard lifecycle |
| Commercial contract | Subscription / Billing | plan, commercial contract, recurring billing relationship |
| Runtime capability | Entitlement Core | grant, quota, effective capability decision |
| Secrets | Credential Authority | provider/API credentials, rotation, revocation, CredentialRef |
| Security/business proof | Audit Ledger | append-only mutation/security evidence |
| Runtime health | Telemetry | logs, metrics, traces, health projections |
| Privacy lifecycle | Data Lifecycle | consent, retention, export, erasure, legal hold |
| Platform operations | Admin Control Plane | verified operator command routing, approval/step-up, impersonation |
| Emergency policy | Incident Control | global/tenant/capability/provider scoped operational freeze |

### Admin sınırı

Admin universal writer değildir.

```text
Verified operator
 -> policy / least privilege / reason
 -> optional step-up or approval
 -> canonical domain command
 -> domain authority
 -> append-only AdminActionEvent
```

Admin tenant, billing, entitlement, integration veya privacy truth'unu kendi collection'ında yeniden yaratmaz.

---

## 2.2 Core Business Plane

```text
Business Profile
Customer Core
Booking Core
Commerce Core
Payment Core
Finance Core
Messaging Core
Marketing / Attribution
Agent Runtime / Knowledge
```

### Business Profile

Sahip olur:

- işletme kimliği ve public/business facts,
- marka,
- iletişim,
- lokasyon,
- çalışma saatleri,
- temel hizmet/catalog metadata'sı.

Sahip olmaz:

- site publish operational state,
- provider connection state,
- payment truth,
- entitlement truth.

### Customer Core

Sahip olur:

- Customer,
- identity aliases,
- merge/revision,
- activity/timeline,
- labels/custom fields,
- segment/RFM,
- consent referansları.

Legacy CRM yolları compatibility adapter olabilir; ikinci CRM authority olamaz.

### Booking Core

Sahip olur:

- appointment lifecycle,
- service/staff/time allocation,
- price snapshot,
- cancellation/no-show/deposit policy snapshot.

Booking payment sonucu sahiplenmez; Payment/Finance projection'ı okur.

### Commerce Core

Sahip olur:

- product,
- variant,
- sellable catalog,
- inventory policy/state,
- order lifecycle,
- promotion/coupon/shipping policy.

Order içindeki payment alanı yalnız projection'dır.

### Payment Core

Sahip olur:

- checkout/payment intent,
- provider attempt,
- authorization/capture/result,
- refund,
- settlement lifecycle,
- provider idempotency ve reconciliation.

### Finance Core

Sahip olur:

- immutable financial events,
- ledger,
- receivable/revenue/balance projections,
- reversal/refund accounting effects.

Geçmiş financial event mutate edilmez; düzeltme yeni event ile yapılır.

### Messaging Core

Sahip olur:

- Conversation/Thread,
- Message identity,
- MessageIntent,
- consent/policy gate,
- durable outbound state,
- provider delivery/reply outcome.

WhatsApp/SMS/email provider'ları adapter'dır.

### Marketing / Attribution

Sahip olur:

- campaign/journey lifecycle,
- audience/activation intent,
- marketing approval/budget policy,
- conversion/revenue attribution graph.

Financial truth üretmez; Payment/Finance event'lerine bağlanır.

### Agent Runtime / Knowledge

Sahip olur:

- tek agent run lifecycle,
- Capability Bus,
- Model Gateway,
- persisted run state,
- verified outcome,
- tool/capability invocation envelope,
- provenance-aware tenant-safe knowledge/RAG.

Agent başka domain'in authority'si değildir; canonical command üretir.

---

## 2.3 Delivery / Public Experience Plane

Canonical akış:

```text
Business facts / content
        ↓
Site Authoring
        ↓
Canonical SiteDraft
        ↓
PublishCommand
        ↓
PublishedSiteRevision
        ↓
Immutable Artifact
        ↓
DomainBinding
        ↓
Public Runtime
```

Yan authority'ler:

```text
Asset Core
Public Action Gateway
```

### Capability sahipliği

| Capability | Authority |
|---|---|
| Draft/edit | Site Authoring |
| Version/publish/rollback | Publish authority |
| Media/assets | Asset Core |
| Hostname mapping | DomainBinding |
| Public render | Public Runtime, read-only projection |
| Public mutation | Public Action Gateway -> canonical domain commands |

### Değişmezler

- Draft değişikliği published revision'ı değiştiremez.
- Publish idempotent ve server-side validated olmalıdır.
- Rollback artifact mutate etmez; active revision pointer değişir.
- Public site doğrudan Firestore business collections writer'ı olamaz.
- Asset arbitrary mutable URL değil, immutable/pinned AssetRef ile bağlanır.

---

## 2.4 Integration & Durable Execution Plane

Outbound:

```text
Domain Command / Event
       ↓
Outbox / Durable Job
       ↓
IntegrationConnection
       ↓
CredentialRef
       ↓
Provider Adapter
       ↓
Provider
```

Inbound:

```text
Provider Webhook
       ↓
Signature Verification
       ↓
ProviderResourceBinding
       ↓
IntegrationConnection + Tenant Resolution
       ↓
Provider Event Dedupe
       ↓
Durable Event Inbox
       ↓
ACK
       ↓
Async Domain Processing
```

### Canonical authority'ler

- IntegrationConnection
- ProviderResourceBinding
- WebhookSubscription
- SyncCursor
- Durable Job
- Outbox
- Provider Event Inbox
- retry / replay / DLQ / reconciliation

Provider adapter business truth sahibi değildir.

---

# 3. Vertical Product Plane

SÖKÜM 36 sonrasında dört capability first-class vertical/bounded context olarak korunmuştur.

## 3.1 Restaurant Operations

Canonical sahiplik:

- table/dining session lifecycle,
- adisyon operational state,
- KDS/kitchen lifecycle,
- waiter task/assignment,
- restaurant-specific offline sync/conflict policy,
- restaurant operational KPI projections,
- split-bill allocation intent,
- RestaurantPaymentTimingPolicy.

Bağımlılıkları:

```text
Restaurant OS
 -> Commerce Catalog / Inventory
 -> Payment Core
 -> Finance Core
 -> Public Action Gateway
 -> Messaging / Notifications
 -> Durable Execution
```

Restaurant kendi ödeme veya muhasebe truth'unu üretmez.

## 3.2 Marketplace Core

Canonical sahiplik:

- Job,
- Bid,
- Award,
- Work lifecycle,
- provider marketplace profile/binding,
- marketplace-specific reputation projection,
- credit consumption intent/policy,
- dispute handoff.

Bağımlılıkları:

```text
Marketplace
 -> Identity / Tenant
 -> Customer
 -> Payment / Finance
 -> Messaging
 -> Agent Runtime
 -> Support / Dispute
 -> Durable Execution
```

Escrow ve earnings kendi finansal truth'u değildir; Payment/Finance authority kullanılır.

## 3.3 Procurement Core

Canonical sahiplik:

- tenant-private SupplierRelationship,
- SupplierCatalogItem,
- PurchaseOrder lifecycle,
- reorder policy/suggestion,
- GoodsReceipt workflow,
- supplier performance projection.

Bağımlılıkları:

```text
Procurement
 -> Commerce / Inventory
 -> Payment / Finance
 -> Messaging
 -> IntegrationConnection
 -> Durable Execution
```

B2B Supplier Marketplace ayrı cross-tenant extension'dır; private supplier relationship ile aynı aggregate değildir.

## 3.4 Support OS

Canonical sahiplik:

- SupportCase,
- ticket/case state machine,
- assignment,
- case events,
- SLA policy snapshot + timers,
- escalation,
- operator queues/projections,
- knowledge linkage.

Bağımlılıkları:

```text
Support
 -> Identity / Tenant
 -> Customer
 -> Messaging
 -> Agent / RAG
 -> Durable Timers
 -> Audit
```

AI confidence authorization değildir. AI cevap önerir; para, abonelik, credential, deletion veya ticket closure gibi aksiyonlar policy-guarded canonical command gerektirir.

---

# 4. Ayrı bounded context OLMAYAN korunan extension seed'leri

Final inventory sweep sonucuna göre aşağıdaki package'lar korunur ama yeni universal authority yaratmaz.

| Seed | Canonical rol | Bağlandığı authority |
|---|---|---|
| Voice | Multimodal command adapter | Agent Runtime + domain commands |
| Studio | Design/agency extension contracts | Site/Asset/Marketing + Marketplace |
| Blog | Content extension | Site Authoring/Publish + Marketing + Agent generation |
| SEO | Analysis/optimization extension | Business/Public projection + Integration + Analytics/Marketing |
| Influencer | Future vertical contract seed | Marketing + Marketplace + Payment/Finance + Support |

Bu parçalar sırf package olarak var diye ayrı database, writer veya business truth kuramaz.

---

# 5. Tek write-authority kuralları

Kepenk v2 için aşağıdaki çatışmalar tasarım seviyesinde yasaktır.

```text
Tenant lifecycle      -> yalnız BusinessTenant
Plan/contract         -> yalnız Subscription/Billing
Capability allow/deny -> yalnız Entitlement/Capability Resolver
Customer identity     -> yalnız Customer Core
Appointment state     -> yalnız Booking Core
Order state           -> yalnız Commerce Core
Payment state         -> yalnız Payment Core
Financial truth       -> yalnız Finance Ledger
Conversation/message  -> yalnız Messaging Core
Campaign lifecycle    -> yalnız Marketing Core
Site draft            -> yalnız Site Authoring
Published revision    -> yalnız Publish authority
Hostname binding      -> yalnız DomainBinding
Provider connection   -> yalnız IntegrationConnection
Secret material       -> yalnız Credential Authority
Support case state    -> yalnız Support OS
Restaurant ops state  -> yalnız Restaurant OS
Job/Bid/Work state    -> yalnız Marketplace Core
PO/GoodsReceipt state -> yalnız Procurement Core
Operator privilege    -> yalnız Identity/Admin policy graph
Audit proof           -> yalnız append-only Audit Ledger
```

Projection alanları bulunabilir; fakat projection writer, source authority yerine geçmez.

---

# 6. Kepenk v2 minimum taşınabilir capability seti

Bu liste bütün eski Kepenk'i aynı gün yeniden kurmak değildir. Önce omurgayı çalıştıracak minimum taşınabilir sistemdir.

## Foundation — zorunlu omurga

1. Identity / Membership / Session / RequestContext
2. BusinessTenant lifecycle
3. Business Profile
4. Subscription + Entitlement + EffectiveCapabilitySet
5. Credential Authority
6. Audit + Telemetry context
7. IntegrationConnection
8. Durable Job / Outbox / Event Inbox

Bunlar kurulmadan üst domainler yine birbirlerinin alanlarını mutate etmeye başlar.

## Core Product — ilk gerçek işletme ürünü

9. Customer Core
10. Booking Core
11. Messaging Core
12. Payment Core
13. Finance Ledger
14. Site Authoring + Publish + Public Runtime + Public Action Gateway

Bu küme Kepenk'in hizmet işletmesi için kendi başına taşınabilir temelini oluşturur.

## Growth Layer

15. Marketing / Campaign / Attribution
16. Agent Runtime / Capability Bus / Model Gateway
17. Tenant-safe RAG / Business Knowledge
18. Commerce Core

## Vertical Packs

19. Restaurant Operations
20. Marketplace
21. Procurement
22. Support OS

Vertical'lar omurgayı kullanır; omurgayı fork etmez.

---

# 7. KEEP / ADAPT / REWRITE / DROP üst-seviye sınıflandırması

## KEEP

- dashboard/editor/operator UX emeği,
- typed domain vocabularies ve schema seed'leri,
- component registry/renderer/template primitive'leri,
- deterministic publish/artifact yaklaşımı,
- CRM v2 identity/activity/RFM/segment çekirdeği,
- booking/deposit/no-show policy semantiği,
- minor-unit money yaklaşımı,
- provider adapter bilgisi,
- Cloud Tasks/retry/DLQ fikirleri,
- AES-GCM credential primitive'i,
- agent kernel/RAG algorithms,
- Restaurant/Marketplace/Procurement/Support domain vocabulary ve UX'i,
- admin audit/impersonation vocabulary.

## ADAPT

- mevcut gerçek ticket create writer,
- provider send/parse primitive'leri,
- İyzico/payment provider entegrasyon bilgisi,
- Cloudflare/domain provider primitive'leri,
- current public/runtime shells,
- legacy routes as temporary compatibility adapters.

## REWRITE

- identity/session/admin auth,
- tenant lifecycle writers,
- billing/entitlement authority,
- site save/publish/version/domain writers,
- CRM dual store,
- payment/refund/settlement state,
- mutable finance/accounting state,
- integration lifecycle/token ownership,
- agent orchestration/model selection duplication,
- privacy/offboarding flows,
- Restaurant financial/offline reconciliation,
- Marketplace runtime,
- Procurement runtime,
- Support lifecycle/SLA runtime,
- Admin command routing.

## DROP AFTER CUTOVER

- parallel business truth stores,
- package-string/boolean authorization,
- raw/shared secret human admin auth,
- browser-bundled admin secret,
- client-local/demo state as business truth,
- unsigned JWT payload trust,
- arbitrary email as authorization,
- fake/synthetic provider/payment success,
- root tenant hard-delete,
- provider tokens on tenant root,
- duplicate webhook/send routes,
- mutable financial history,
- confidence-only AI business action authority,
- mock operational health/finance data presented as truth.

---

# 8. Dependency spine

Yeni sistemin doğal bağımlılık yönü:

```text
Identity
  ↓
Tenant
  ↓
Business Profile
  ↓
Subscription / Entitlement
  ↓
Credentials + Audit + Durable Execution
  ↓
Customer
  ↓
Booking / Commerce
  ↓
Messaging
  ↓
Payment
  ↓
Finance
  ↓
Site/Public Action + Marketing + Agent
  ↓
Vertical Products
```

Bu çizim birebir deployment sırası değildir; authority bağımlılık yönüdür.

Önemli istisnalar:

- Site Authoring, Customer ve Booking paralel geliştirilebilir ama public mutation yalnız canonical command'lara bağlanır.
- Messaging, Payment ve Integration durable execution omurgası olmadan production authority olamaz.
- Finance Payment'ın kopyası değildir; verified financial event'leri tüketir.
- Agent/AI foundation domainlerini bypass edemez.
- Vertical'lar Payment/Finance/Identity/Integration'ı yeniden yazamaz.

---

# 9. Sonraki sentez frontier'ı

**SENTEZ 2 — Duplicate Authority & Legacy Writer Registry**

Amaç:

1. current main'deki tüm legacy writer sınıflarını authority bazında grupla,
2. hangi canonical authority'ye taşınacağını göster,
3. risk seviyesini belirle,
4. compatibility adapter gerekip gerekmediğini işaretle,
5. cutover öncesi kaldırılmaması gereken caller'ları ayır,
6. migration graph için gerçek dependency girdisini üret.

SENTEZ 2 de implementation değildir. Önce hangi writer'ın hangi authority'ye teslim olacağını kesinleştirir.
