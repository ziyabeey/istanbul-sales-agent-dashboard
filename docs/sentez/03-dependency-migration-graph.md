# SENTEZ 3 — Dependency / Migration Graph

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Kaynak:** SÖKÜM 01–41 + final inventory sweep + SENTEZ 1–2 + frontend preservation contract  
> **Amaç:** Kepenk v2 için hangi authority'nin hangi sırada kurulacağını, hangi blokların paralel ilerleyebileceğini ve vertical'ların hangi gate'lerden sonra aktive edilebileceğini sabitlemek.  
> **Kural:** Big-bang rewrite yok. Canonical authority önden kurulur, legacy caller adapter'a alınır, projection parity doğrulanır, legacy writer en son kapanır.

---

# 1. Ana dependency ilkesi

Kepenk v2 migration sırası UI menüsüne göre değil authority bağımlılığına göre belirlenir.

```text
Trust
  ↓
Tenant + Commercial Spine
  ↓
Durable Execution + Integration
  ↓
Core Business Authorities
  ↓
Payment / Finance / Analytics
  ↓
Agent / Knowledge
  ↓
Vertical Products
  ↓
Full privacy/offboarding convergence + cleanup
```

Public Kepenk frontend'i bu zincirin sonunda yeniden yapılacak bir yüzey değildir.

```text
Protected Frontend Baseline
        ↓
canonical read/API contracts hazır oldukça
        ↓
data / CTA / copy rewire
        ↓
visual baseline korunarak launch
```

---

# 2. Cross-wave koruma hatları

Bazı capability'ler tek wave'e ait değildir.

## 2.1 Frontend Preservation Track — F0

Migration başlamadan önce aktiftir ve bütün wave'ler boyunca sürer.

Korunanlar:

- `apps/web` ana Kepenk landing,
- root layout / global design tokens,
- Navbar + landing section'ları,
- public marketing route ağı,
- SEO/PWA/legal acquisition surface.

Kural:

> **Backend authority migration public frontend'i yeniden tasarlama yetkisi vermez.**

Değiştirilebilir:

- data source,
- CTA destination,
- current product copy,
- pricing,
- capability claims,
- verified testimonial/proof.

Değiştirilmeyecek varsayılan baseline:

- visual hierarchy,
- section composition,
- responsive behavior,
- motion/interaction language,
- acquisition route shell.

## 2.2 Admin Control Track — A0

Admin tek seferde sonradan eklenmez.

- Wave 1: verified Admin Principal + session + least privilege.
- Wave 2+: her canonical domain doğdukça admin direct mutation o domain command'ına çevrilir.
- Final: raw secret, direct Firestore mutation ve universal-writer modeli tamamen kapanır.

## 2.3 Privacy / Audit / Telemetry Track — P0

- Wave 1: audit correlation, telemetry context, minimum consent/privacy inventory başlar.
- Her yeni canonical authority kendi audit/data-inventory kayıtlarını üretir.
- Final convergence wave'inde offboarding/erasure/legal-hold bütün graph'ı kapsar.

---

# 3. Migration wave'leri

## Wave 0 — Freeze, inventory, protected baselines

Amaç business davranışını değiştirmeden migration zemini hazırlamak.

Çıktılar:

- canonical stable ID sözleşmesi,
- legacy writer/caller inventory,
- collection/provider/resource inventory,
- write-path telemetry,
- migration revision/version metadata,
- protected Kepenk frontend baseline,
- public route inventory,
- visual screenshot/reference gate planı.

Bu wave'de hiçbir eski writer sadece “legacy” diye silinmez.

### Exit gate

- SENTEZ 2 registry'deki her P0/P1 writer'ın owner'ı belli,
- public frontend protected-surface listesinde,
- Randevu kapsam dışı sınırı tekrar doğrulanmış.

---

## Wave 1 — Trust Spine

Önce kurulacaklar:

```text
User
Membership
Session
RequestContext
Service Principal
Admin Principal / Admin Session
Audit correlation
Telemetry context
Stable internal IDs
Minimum Data Inventory / Consent hooks
```

Bu wave neden ilk?

Çünkü sonraki bütün command'ların tenant/user/service authority'si request body, raw cookie veya shared secret'tan değil verified context'ten gelmelidir.

### Hard-cut sınıfı

Bu wave tamamlandığında compatibility bahanesiyle aşağıdakiler açık tutulmaz:

- browser-bundled admin secret,
- unsigned session trust,
- fail-open production auth,
- shared raw-secret human authorization.

### Parallel yapılabilir

Frontend F0 görsel baseline korunurken Trust Spine backend tarafında bağımsız ilerleyebilir.

---

## Wave 2 — Tenant + Business + Commercial Spine

Kurulur:

```text
BusinessTenant Lifecycle
Business Profile
Subscription / Contract
EntitlementGrant
EffectiveCapabilitySet
Quota / dependency evaluator
Incident / Kill-Switch policy
```

Admin tarafında:

```text
Create/Suspend/Reactivate Tenant
Change Subscription
Grant Usage Credit
Change Entitlement
Set Incident Policy
```

artık direct field mutation değil canonical command olur.

Legacy:

- `paket`,
- `aktifModuller`,
- `aktifWebModulleri`,
- `ayarlar.*`,
- raw `durum`

alanları geçici compatibility projection/input seviyesine iner.

### Exit gate

- new commands tenant context'i body'den authority olarak almıyor,
- entitlement runtime mandatory resolver üzerinden karar veriyor,
- admin aynı gerçekleri raw document patch ile yazmıyor.

---

## Wave 3 — Durable Execution + Credential + Integration Spine

Kurulur:

```text
Durable Job
Outbox
Provider Event Inbox
DLQ / replay
Credential Authority
IntegrationConnection
ProviderResourceBinding
WebhookSubscription
SyncCursor
Provider health / re-auth state
```

Bu wave'den sonra provider call pattern'i:

```text
Domain Command / Event
 -> durable job
 -> IntegrationConnection
 -> CredentialRef
 -> Provider Adapter
 -> provider outcome
 -> verified event/reconciliation
```

olur.

### Öncelikli migration

- tenant-root raw credential'lar,
- provider account/page/number fields,
- duplicate WhatsApp/Instagram webhook ingress,
- raw cron/admin bearer mutation,
- Twilio number provisioning.

### Exit gate

- provider webhook signature + dedupe,
- deterministic provider resource -> tenant resolution,
- revoke/disconnect retry-safe,
- raw secret material business document'larında authority değil.

---

## Wave 4 — Delivery / Site / Asset / Public Experience

Bu wave mevcut en olgun primitive setini canonical authority'ye bağlar.

Sıra:

1. canonical Business Profile projection,
2. SiteDraft serializer,
3. Asset Core / immutable AssetRef,
4. PublishCommand,
5. immutable PublishedSiteRevision,
6. active publish pointer,
7. DomainBinding,
8. `apps/sites` shadow read,
9. public runtime cutover,
10. revision-bound Public Action Gateway.

### Protected Kepenk landing'in rolü

`apps/web` public marketing landing **yeniden yazılmaz**.

Bu wave'de yalnız ihtiyaç halinde:

- CTA -> canonical registration/onboarding,
- pricing copy -> current Subscription model,
- capability copy -> actual EffectiveCapabilitySet/product scope,
- public data -> canonical read models

bağlanır.

### Exit gate

- draft publish'i mutate etmiyor,
- immutable artifact + active pointer doğrulanıyor,
- domain aynı publish'e deterministik resolve oluyor,
- public action raw collection'a yazmıyor,
- root Kepenk landing visual baseline korunmuş.

---

## Wave 5 — Customer + Messaging + Support Foundation

Kurulur/canonicalize edilir:

```text
Customer Core
Customer identity aliases / merge
CustomerActivity / timeline
Conversation / Message
MessageIntent
Consent/policy gate
Durable outbound
Inbound provider binding
SupportCase basic authority
```

Legacy `/api/musteriler` compatibility shell olur.

Campaign sender provider'a doğrudan çıkmak yerine MessageIntent üretir.

Support tarafında minimum production foundation:

- verified requester/operator identity,
- case create/read ownership,
- case event history,
- message binding.

Full SLA/escalation/AI Support Wave 9 activation'ında tamamlanır.

### Exit gate

- Mongo/Firestore CRM dual write kapanmış,
- WhatsApp inbound/outbound tek identity + integration path kullanıyor,
- arbitrary e-mail authorization yok,
- SupportCase create verified context kullanıyor.

---

## Wave 6 — Booking + Payment + Finance

Sıra:

1. Booking lifecycle + price/policy snapshot,
2. deposit/no-show/cancellation policy,
3. canonical minor-unit money contract,
4. PaymentIntent / provider attempt,
5. verified payment result,
6. refund lifecycle,
7. settlement/reconciliation,
8. immutable Finance Ledger,
9. Booking/Order payment read projections,
10. legacy accounting/balance projections.

Kritik invariant:

> **Payment sonucu Booking/Order/Restaurant document mutation'ından doğmaz. Provider verification -> Payment Core -> Finance event -> domain projection sırasıyla akar.**

### Kesin yasak

- bidirectional financial dual-write,
- provider callback'ten doğrudan “paid=true”,
- mutable historical ledger rewrite.

### Exit gate

- provider replay duplicate ledger event üretmiyor,
- refund request actual refund'dan ayrı,
- ledger/projection reconciliation observable,
- minor-unit invariant korunuyor.

---

## Wave 7 — Commerce + Inventory + Analytics + Marketing

Canonicalize edilir:

```text
Product / Variant
Inventory
Order
Promotion / Coupon / Shipping policy
Canonical Business Event Spine
Conversion / Revenue Attribution
Campaign / Journey
Marketing budget/approval
Meta/Google provider adapters
```

Revenue Marketing tarafından üretilmez; Payment/Finance event'lerinden bağlanır.

Autonomous CMO ancak gerçek outcome ve approval/budget policy üzerinden aksiyon alır.

### Exit gate

- inventory/order tek writer,
- conversion/revenue canonical event bağlantılı,
- synthetic KPI financial truth değil,
- provider campaign actions durable execution üzerinden gidiyor.

---

## Wave 8 — Agent Runtime + Knowledge

Kurulur:

```text
Single Agent Runtime
Capability Bus
Model Gateway
Persisted AgentRun
Tool/Command Envelope
Result Verifier
Tenant-safe RAG
Provenance
Feedback / outcome learning
```

Agent'ın rolü:

```text
observe
 -> reason/propose
 -> authorized capability command
 -> canonical domain
 -> verified outcome
```

Agent raw Firestore/provider writer değildir.

Voice burada multimodal command adapter olarak bağlanabilir.

Blog/SEO/Studio AI fonksiyonları da burada proposal/generation capability olarak bağlanabilir, ayrı authority yaratmaz.

### Exit gate

- eski runner/model selector dünyaları tek lifecycle'a inmiş,
- capability scope enforced,
- “AI success” verified domain outcome olmadan başarı sayılmıyor.

---

## Wave 9 — Vertical Product Activation

Vertical'lar core authority'leri yeniden icat etmeden aktive edilir.

### 9A — Restaurant Operations

Bağımlılıklar:

```text
Identity/Tenant/Capability
Commerce Catalog + Inventory
Messaging
Payment + Finance
Durable Execution
Integration
Audit/Telemetry
```

Restaurant sahip olur:

- table/dining session,
- adisyon item workflow,
- KDS,
- waiter/kitchen state,
- offline operational sync,
- restaurant KPI projections.

Sahip olmaz:

- payment truth,
- finance ledger,
- global product/inventory identity,
- provider credentials.

### 9B — Support OS full activation

Bağımlılıklar:

```text
Identity
Customer
Messaging
Durable timers/jobs
Agent/Knowledge
Audit/Telemetry
```

Tamamlanır:

- assignment,
- response/reopen/resolve/close,
- SLA clocks,
- escalation,
- operator queues,
- AI assistance policy.

Confidence authorization değildir.

### 9C — Marketplace

Greenfield runtime'dır; demo data migrate edilmez.

Bağımlılıklar:

```text
Identity / Customer
Payment + Finance
Durable Execution
Messaging
Support / dispute workflow
Agent/analysis
Audit/Telemetry
```

Marketplace yalnız Job/Bid/Award/Work lifecycle'ını sahiplenir.

Escrow/payment/settlement Finance/Payment authority'dedir.

### 9D — Procurement / Supply

Greenfield runtime'dır; demo/local state migrate edilmez.

Bağımlılıklar:

```text
Tenant / Business Profile
Commerce / Inventory
Payment + Finance
Integration / Durable Execution
Audit/Telemetry
```

Procurement sahip olur:

- SupplierRelationship,
- SupplierCatalogItem mapping,
- PurchaseOrder,
- GoodsReceipt,
- reorder policy/workflow.

Stok gerçeği Inventory'de, para Finance/Payment'ta kalır.

B2B Supplier Marketplace daha sonra platform seller extension olarak açılır.

---

## Wave 10 — Admin / Privacy / Offboarding Convergence + Cleanup

Bu wave başta kurulan yatayları bütün domain graph'ına tamamlar.

### Admin convergence

- tüm high-risk admin actions canonical commands,
- explicit reason/case binding,
- step-up/approval,
- audited impersonation,
- no direct business collection writer.

### Data lifecycle convergence

- Data Inventory bütün canonical authorities'i kapsar,
- retention/legal hold,
- export,
- tenant CLOSING/OFFBOARDING,
- provider revoke,
- asset/job/cache/data sink purge,
- proof/reconciliation,
- CLOSED transition.

### Legacy cleanup

Sıra:

```text
deprecate
 -> observe callers
 -> canonical adapter
 -> disable legacy write
 -> parity window
 -> remove permission/secret
 -> archive
 -> delete
```

Protected public frontend bu cleanup'ın hedefi değildir.

---

# 4. Parallel çalışma grafiği

Wave numaraları her işin tamamen seri olması gerektiği anlamına gelmez.

Trust/Tenant spine hazır olduktan sonra aşağıdaki hatlar kontrollü paralel gidebilir:

```text
               ┌─ Site / Asset / Publish ───────────────┐
Trust + Tenant ├─ Customer / Messaging ───────────────┐ │
+ Execution ───┼─ Booking / Payment / Finance ──────┐ │ │
               └─ Integration provider migrations ──┼─┼─┘
                                                   ↓ ↓
                                         Commerce/Analytics
                                                   ↓
                                           Agent/Knowledge
                                                   ↓
                                              Verticals
```

Ama aşağıdaki bağımlılıklar kırılmaz:

- Payment Core olmadan financial vertical cutover yok.
- Credential/Integration spine olmadan provider migration yok.
- Identity/RequestContext olmadan public/support/admin trust cutover yok.
- Durable execution olmadan reliable webhook/provider orchestration yok.
- Customer/Messaging olmadan Support full lifecycle yok.
- Commerce/Inventory olmadan Procurement veya Restaurant inventory integration tamamlanmış sayılmaz.

---

# 5. Frontend release strategy

Kepenk marketing frontend'i için ayrı migration prensibi:

## Stage F1 — Preserve

- existing components/routes/design tokens frozen as baseline,
- screenshot/reference inventory,
- no aesthetic rewrite.

## Stage F2 — Truth rewire

- old 5-plan pricing -> current Subscription projection,
- CTA -> current registration/onboarding path,
- capability copy -> actually shipped capabilities,
- testimonials/metrics -> verified proof only,
- metadata/JSON-LD -> current commercial offer.

## Stage F3 — Browser acceptance

- production build,
- `/` smoke,
- navbar route crawl,
- 360/390 mobile,
- desktop,
- keyboard/focus/reduced-motion,
- legal links,
- robots/sitemap/canonical,
- CTA conversion path.

Bu üç stage backend rewrite'tan bağımsız olarak UX değerini korur.

---

# 6. SÖKÜM 01–41 tam kapsama eşlemesi

Bu tablo sentezin baştan sona bütün sökümleri kapsadığını audit etmek içindir.

| Söküm | Capability | Sentez / migration wave |
|---|---|---|
| 01 | Business Facts / Site Data Foundation | W2 Business Profile, W4 projection |
| 02 | Business -> Public Site Projection | W4 |
| 03 | Local Site Preview / Draft Pipeline | W4 |
| 04 | Theme / Template Engine | W4 KEEP/HARDEN |
| 05 | Preview/Editor/Publish cluster | W4 |
| 06 | Preview/Editor/Publish cluster | W4 |
| 07 | Preview/Editor/Publish cluster | W4 |
| 08 | Domain Resolver + Multi-Site | W4 |
| 09 | CRM + Customer Identity + History | W5 |
| 10 | WhatsApp + Inbox + AI Customer Assistant | W5 Messaging, W8 Agent |
| 11 | Local Site Renderer | W4 |
| 12 | Payment + Package + Quota + İyzico | W2 commercial/capability, W6 payment |
| 13 | Commerce Core | W7 |
| 14 | CRM runtime verification | W5 |
| 15 | Campaign / Lifecycle Messaging | W5 Messaging, W7 Marketing |
| 16 | Marketing / Ads / Autonomous CMO | W7 Marketing, W8 Agent |
| 17 | Growth / Attribution / Analytics Spine | W7 |
| 18 | Agent Runtime + Capability Bus | W8 |
| 19 | RAG / Collective Intelligence / Business Memory | W8 |
| 20 | Customer Core / CRM Authority | W5 |
| 21 | Finance Core / Immutable Financial Event | W6 |
| 22 | Booking ↔ Finance Payment Policy | W6 |
| 23 | Kapora / Partial Payment / No-Show | W6 |
| 24 | Durable Jobs / Outbox / Webhook Inbox / Reconciliation | W3 |
| 25 | Public Site Runtime / Publish Artifact Authority | W4 |
| 26 | Site Authoring / Publish / Domain Binding Writer | W4 |
| 27 | Media / Asset Authority | W4 |
| 28 | Public Interaction / Action Capability Boundary | W4 gateway, targets W5/W6/W7 |
| 29 | Identity / Session / Tenant / Service Trust | W1 Trust, W2 Tenant |
| 30 | Secrets / Credential Authority / Rotation | W3 |
| 31 | Observability / Audit / Operational Truth | W1 seed, all waves |
| 32 | Data Lifecycle / Privacy / Consent / Retention | W1 seed, W10 convergence |
| 33 | Integration Connection Lifecycle | W3 |
| 34 | Tenant / Business Lifecycle | W2 |
| 35 | Entitlement / Capability Runtime Authority | W2 |
| 36 | Canonical Architecture Synthesis | Meta baseline for all waves |
| 37 | Restaurant Operations / POS / KDS / Offline | W9A after core gates |
| 38 | Marketplace / Job / Bid / Escrow | W9C greenfield runtime |
| 39 | Supply / Procurement / Supplier Marketplace | W9D greenfield runtime |
| 40 | Support OS / SLA / Knowledge / AI | W5 foundation, W9B full activation |
| 41 | Admin / Super Admin / Platform Control Plane | W1 admin trust; W2-W9 command adapters; W10 convergence |

### Final inventory extension mapping

| Package | Mapping |
|---|---|
| `voice` | W8 multimodal command adapter |
| `studio` | W4 design extension + W7 creative + optional W9 marketplace agency extension |
| `blog` | W4 content/publish + W7 distribution + W8 generation |
| `seo` | W4 public projection + W3 integrations + W7 analytics/growth |
| `influencer` | W9 future Marketplace/Marketing/Finance/Support extension |

Bu nedenle hiçbir korunmuş capability sentez dışında bırakılmamıştır.

---

# 7. Kritik path

Minimum güvenli Kepenk v2 için kritik path:

```text
W0 inventory/preserve
 -> W1 Trust
 -> W2 Tenant/Business/Subscription/Entitlement
 -> W3 Durable/Integration/Credential
 -> W4 Site/Public Delivery
 -> W5 Customer/Messaging
 -> W6 Booking/Payment/Finance
```

Bu noktadan sonra Kepenk'in temel esnaf SaaS çekirdeği canonical authority'lerle üretime alınabilir.

W7-W9 ürün derinliği ve platform genişlemesidir; W10 cleanup/convergence bunların ardından tamamlanır.

Agent'ın minimum güvenli capability-aware çekirdeği gerekiyorsa W8'in küçük bir subset'i W5/W6 ile paralel öne çekilebilir; fakat raw mutation yapan eski agent runtime authority olarak korunmaz.

---

# 8. SENTEZ 3 kapanış kararı

> **Kepenk v2 yeniden yazılacak tek parça bir uygulama değildir. Önce trust/tenant/execution omurgası kurulur; mevcut güçlü site/frontend/CRM/domain primitive'leri canonical authority'lere strangler ile bağlanır; para ve provider truth tekleştirilir; agent ve vertical'lar bu omurganın üstüne oturur. Public Kepenk landing'i korunur ve yalnız ürün gerçeğine yeniden bağlanır.**

Sıradaki faz:

**SENTEZ 4 — Cleanup Backlog + Cutover Gates**

Burada bu wave graph exact cleanup işlerine, risk sırasına ve “ne zaman gerçekten silebiliriz?” gate'lerine dönüşecektir.
