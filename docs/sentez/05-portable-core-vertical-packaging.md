# SENTEZ 5 — Kepenk v2 Portable Core / Vertical Packaging

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Kaynak:** SÖKÜM 01–41 + final inventory sweep + SENTEZ 1–4 + frontend preservation contract  
> **Amaç:** Kepenk v2'nin taşınabilir minimum çekirdeğini, launch-essential capability'lerini, opsiyonel vertical product pack'lerini ve extension/adapter seed'lerini kesin biçimde ayırmak.  
> **Kural:** Core bir feature listesi değildir. Bir business gerçeğinin canonical authority'sini ve bütün vertical'ların tekrar kullanacağı güvenli omurgayı tanımlar.

---

# 1. Final ürün modeli

Kepenk v2 üç seviyede paketlenir:

```text
LEVEL 1 — PORTABLE PLATFORM CORE
LEVEL 2 — STANDARD BUSINESS CAPABILITIES
LEVEL 3 — VERTICAL / EXTENSION PACKS
```

Bunların üstünde ayrı bir kullanıcı yüzeyi olarak:

```text
Platform Admin / Operations Control Plane
```

bulunur.

Public Kepenk/KPNK marketing frontend'i ise ürünün **korunan launch/acquisition surface**'idir; core package değildir fakat v2 launch'ının birinci sınıf varlığıdır.

---

# 2. LEVEL 1 — Portable Platform Core

Bu katman olmadan güvenli multi-tenant Kepenk çalışmaz.

## 2.1 Identity / Trust Core

Canonical authority:

```text
User
Membership
Session
RequestContext
ServicePrincipal
AdminPrincipal
```

Zorunlu primitive'ler:

- verified authentication,
- tenant membership resolution,
- role/capability evaluation,
- session revoke,
- service-to-service identity,
- admin step-up / least privilege,
- impersonation dual identity.

Bu katman hiçbir vertical'a özel değildir.

---

## 2.2 Tenant / Commercial / Capability Core

Canonical authority:

```text
BusinessTenant
BusinessProfile
Subscription / Contract
EntitlementGrant
EffectiveCapabilitySet
Quota / dependency state
Incident / Kill-Switch Policy
```

Bu ayrım korunur:

- tenant lifecycle = commercial plan değildir,
- subscription = entitlement değildir,
- entitlement = release flag değildir,
- quota exhaustion = entitlement loss değildir,
- dependency health = commercial right değildir.

Legacy `paket/modul/ayarlar` alanları authority değildir.

---

## 2.3 Durable Execution Core

Canonical primitive'ler:

```text
CommandEnvelope
EventEnvelope
DurableJob
Outbox
ProviderEventInbox
IdempotencyKey
Retry / Backoff
DLQ
Replay
Reconciliation
```

Bu backbone olmadan provider, payment, campaign, publish, SLA, sync veya agent execution production-ready sayılmaz.

---

## 2.4 Integration / Credential Core

Canonical authority:

```text
CredentialRef
IntegrationConnection
ProviderResourceBinding
WebhookSubscription
SyncCursor
ConnectionHealth
```

Provider adapter business truth sahibi değildir.

Kural:

```text
Domain intent
 -> Durable Execution
 -> IntegrationConnection
 -> CredentialRef
 -> Provider Adapter
 -> verified outcome
```

---

## 2.5 Audit / Telemetry / Data Lifecycle Core

Zorunlu yataylar:

```text
Audit Ledger
Telemetry Context
Metrics / Logs / Traces
Data Inventory
Consent
Retention
Export
Erasure
Legal Hold
Offboarding proof
```

Log audit değildir. Root delete erasure değildir. Telegram notification operational proof değildir.

---

# 3. LEVEL 2 — Standard Business Capabilities

Bunlar yalnız bazı sektörlere ait değildir. Kepenk'in esnaf/business OS karakterinin temel ürün yetenekleridir.

## 3.1 Customer Core

Sahip olur:

- Customer,
- aliases / merge,
- customer activity timeline,
- labels/custom fields,
- segment/RFM,
- consent references.

Bu core Restaurant, Support, Marketplace ve future vertical'lar tarafından tekrar kullanılabilir.

---

## 3.2 Booking Core

Sahip olur:

- appointment lifecycle,
- service/staff/time allocation,
- pricing snapshot,
- cancellation/no-show/deposit policy snapshot.

Payment sonucu sahiplenmez.

Booking olmayan sektörler bu capability'yi entitlement ile kapatabilir; fakat ihtiyaç olduğunda yeni vertical kendi booking engine'ini yazamaz.

---

## 3.3 Commerce + Inventory Core

Sahip olur:

- Product,
- Variant,
- sellable catalog,
- InventoryItem / stock state,
- Order lifecycle,
- promotion/coupon/shipping policy.

Restaurant ve Procurement global inventory truth'u burada kullanır.

---

## 3.4 Payment Core

Sahip olur:

- PaymentIntent,
- provider attempt,
- authorization/capture/result,
- refund lifecycle,
- settlement/reconciliation.

Booking, Commerce, Restaurant, Marketplace veya Subscription ödeme truth'unu tekrar icat etmez.

---

## 3.5 Finance Core

Sahip olur:

- immutable financial events,
- ledger,
- revenue/receivable/balance projections,
- reversal/refund effects,
- source links.

Minor-unit/kuruş standardı korunur.

---

## 3.6 Messaging Core

Sahip olur:

- Conversation / Thread,
- Message,
- MessageIntent,
- consent/policy gate,
- durable outbound state,
- provider delivery/reply outcome.

WhatsApp, SMS, email provider adapter'dır.

---

## 3.7 Marketing / Attribution Core

Sahip olur:

- Campaign / Journey,
- audience activation intent,
- spend/approval policy,
- conversion/revenue attribution graph.

Meta/Google adapter'dır. Revenue Finance'tan gelir.

---

## 3.8 Site / Public Experience Core

Canonical set:

```text
SiteAuthoring
SiteDraft
Asset Core
PublishCommand
PublishedSiteRevision
Immutable Artifact
DomainBinding
apps/sites Public Runtime
Public Action Gateway
```

Korunacak güçlü mevcut primitive'ler:

- `site-schema`,
- `renderer`,
- `publish-engine`,
- `templates`,
- `apps/sites` shell,
- Cloudflare/domain adapter know-how.

Bu core Kepenk'in “işletmeden otomatik dijital varlık çıkarma” karakterinin ana parçalarındandır.

---

## 3.9 Agent Runtime / Knowledge Core

Canonical set:

```text
AgentRun
Capability Bus
Model Gateway
Tool/Command Envelope
Result Verifier
Tenant-safe RAG
Provenance
Feedback / outcome learning
```

Agent ayrı business authority değildir.

Rolü:

```text
observe
 -> reason / propose
 -> authorized command
 -> canonical domain
 -> verified outcome
```

---

# 4. LEVEL 3 — First-class Vertical Product Packs

Vertical pack core authority'leri import eder/kullanır; kopyalamaz.

## 4.1 Restaurant Operations Pack

First-class vertical'dır.

Kendi authority'si:

```text
Table
DiningSession
Adisyon / operational line-item workflow
KDS
Waiter / kitchen workflow
Restaurant offline operational sync
Restaurant KPI projections
RestaurantPaymentTimingPolicy
```

Core'dan kullanır:

- Identity/Tenant,
- Commerce Catalog + Inventory,
- Customer,
- Messaging,
- Payment,
- Finance,
- Durable Execution,
- Integration,
- Audit/Telemetry.

### Paketlenmeyecek şey

Restaurant Payment veya Restaurant Finance diye ikinci canonical motor kurulmaz.

---

## 4.2 Support OS Pack

First-class capability/vertical'dır.

Kendi authority'si:

```text
SupportCase
CaseEvent
Assignment
Support status lifecycle
SLA policy/clock
Escalation
Operator queue/read model
Knowledge support projection
```

Core'dan kullanır:

- Identity,
- Customer,
- Messaging,
- Durable Jobs/Timers,
- Agent/Knowledge,
- Audit/Telemetry.

AI confidence authorization değildir.

---

## 4.3 Marketplace Pack

First-class future vertical'dır, current repo'da greenfield runtime gerekir.

Kendi authority'si:

```text
Job
Bid
Award
Work lifecycle
Provider marketplace profile/eligibility projection
Marketplace reputation domain
```

Core'dan kullanır:

- Identity/Customer,
- Messaging,
- Payment/Finance,
- Durable Execution,
- Support/dispute bridge,
- Agent analysis,
- Audit/Telemetry.

Escrow/payment/settlement tekrar yazılmaz.

---

## 4.4 Procurement Pack

First-class future vertical'dır, current repo'da greenfield runtime gerekir.

Kendi authority'si:

```text
SupplierRelationship
SupplierCatalogItem mapping
PurchaseOrder
GoodsReceipt
Reorder policy/workflow
Supplier performance projection
```

Core'dan kullanır:

- Tenant/Business Profile,
- Commerce/Inventory,
- Payment/Finance,
- Integration/Durable Execution,
- Audit/Telemetry.

B2B Supplier Marketplace daha sonra Procurement üstü platform extension olarak açılır; tenant-private supplier truth ile aynı aggregate değildir.

---

# 5. Extension / Adapter Packs

Final inventory sweep'teki beş package ayrı universal authority değildir.

## Voice

```text
speech/input
 -> intent
 -> Capability Bus
 -> canonical command
 -> optional spoken response
```

**Rol:** multimodal adapter.

## Blog

**Rol:** Site Authoring + Agent generation + Marketing distribution content extension.

Kendi publish truth'u yoktur.

## SEO

**Rol:** analysis/reconciliation/optimization extension.

Business facts veya provider profile truth'unu sahiplenmez.

## Studio

**Rol:** design/editor/creative extension + gerekirse marketplace agency/profile surface.

İkinci site/design authority yaratmaz.

## Influencer

**Rol:** future campaign/marketplace extension.

- creator discovery -> Marketplace,
- campaign -> Marketing,
- payment/escrow -> Payment/Finance,
- dispute -> Support/Marketplace,
- pricing helper -> advisory calculation.

---

# 6. Platform Admin packaging

Admin bir vertical pack değildir.

```text
Verified Operator
 -> Admin Policy
 -> reason / case
 -> optional step-up / approval
 -> canonical domain command
 -> domain authority
 -> AdminActionEvent
```

Admin UI aşağıdaki read/control projections'ı bir araya getirebilir:

- tenant operations,
- entitlement/commercial operations,
- provider provisioning,
- agent telemetry,
- finance growth projections,
- infrastructure/incident controls,
- support operator actions.

Ama Admin kendi universal business repository'sine sahip olmaz.

---

# 7. Launch Core — İlk production Kepenk için minimum set

Kepenk v2'nin ilk gerçek production omurgasında aşağıdakiler bulunmalıdır:

```text
Identity / Membership / Session / RequestContext
BusinessTenant + BusinessProfile
Subscription + Entitlement + EffectiveCapabilitySet
Customer Core
Booking Core
Messaging Core
Site / Asset / Publish / Domain / Public Runtime
Public Action Gateway
Durable Jobs / Outbox / Event Inbox
IntegrationConnection + Credential Authority
Audit + Telemetry
Consent / minimum Data Lifecycle
Minimum safe Agent Runtime / Capability Bus
```

Eğer launch akışında para/kapora/checkout aktifse ayrıca zorunlu:

```text
Payment Core
Immutable Finance Ledger
```

Commerce, Marketing ve Analytics ürün kapsamına göre launch'ta açılabilir; canonical contract'ları baştan doğru kurulmalıdır.

### Launch blocker olmayanlar

İlk production core'u bekletmemesi gerekenler:

- Marketplace full runtime,
- Procurement full runtime,
- Restaurant full depth,
- advanced Support SLA/AI automation,
- Influencer,
- advanced Voice,
- Studio advanced functions,
- Blog autopilot,
- advanced autonomous CMO/collective intelligence.

Bunlar sonra açılır, ancak core authority'yi tekrar icat edemez.

---

# 8. Korunan Kepenk frontend'in package modeli

Public marketing frontend ayrı bir “legacy app” olarak atılmaz.

Canonical rolü:

```text
Kepenk Public Marketing / Acquisition Surface
```

Korunanlar:

- landing visual hierarchy,
- Navbar,
- section composition,
- motion language,
- responsive behavior,
- SEO/public routes,
- legal acquisition shell.

Rewire edilenler:

- pricing projection,
- current capability catalog,
- CTA -> registration/onboarding,
- verified claims/testimonials,
- current provider/vertical copy.

Dolayısıyla frontend packaging kararı:

> **PRESERVE WHOLE UX + CONTENT/API REWIRE.**

---

# 9. Capability installation modeli

Kepenk v2 bir “her şeyi her tenant'a aç” monoliti olmamalıdır.

Runtime karar modeli:

```text
Tenant lifecycle
 + Subscription contract
 + Entitlement grants
 + Release flags
 + Tenant preferences
 + Quota state
 + Dependency/provider health
 = EffectiveCapabilitySet
```

UI yalnız bu sonucu tüketir.

Vertical activation örneği:

```text
Restaurant Pack entitlement
 + required core capabilities healthy
 + provider/payment dependencies ready
 -> Restaurant effective capabilities
```

Package klasörünün repoda bulunması tenant'ın o capability'ye sahip olduğu anlamına gelmez.

---

# 10. Dependency law

Bağımlılık yönü:

```text
Vertical / Extension
        ↓
Standard Business Capabilities
        ↓
Portable Platform Core
        ↓
Provider adapters / infrastructure
```

Yasak:

- Core'un Restaurant/Marketplace gibi vertical import etmesi,
- Payment'ın Booking/Restaurant entity'sine özel authority olması,
- Admin'in domain repository'sini bypass etmesi,
- provider adapter'ın tenant/business truth üretmesi,
- agent'ın raw DB writer olması.

Event/command sözleşmeleriyle bağlanılır.

---

# 11. Repository disposition sonucu

## KEEP / strengthen

- `apps/web` product/marketing shell,
- `apps/sites` public runtime shell,
- site-schema / renderer / publish-engine / templates,
- CRM v2 core seeds,
- booking/ecom schema semantics,
- accounting minor-unit/source-link primitives,
- strong auth/security primitives,
- real provider adapters,
- agent/RAG güçlü algorithms/primitives.

## REWIRE

- dashboard/editor API boundaries,
- public actions,
- provider routes,
- payment callbacks,
- admin operations,
- campaign senders,
- onboarding/lifecycle routes.

## GREENFIELD on canonical core

- Marketplace runtime,
- Procurement runtime,
- Support full lifecycle/SLA,
- missing Restaurant reconciliation/managerless control pieces,
- Admin Command Gateway.

## Preserve as extension seeds

- voice,
- studio,
- blog,
- seo,
- influencer.

## DROP only after SENTEZ 4 gates

- duplicate authorities,
- insecure trust routes,
- dead fake/synthetic success paths,
- obsolete raw fields/collections,
- zero-caller legacy writers.

---

# 12. SÖKÜM 01–41 synthesis closure

SÖKÜM 01–41'in tamamı artık üç sonuçtan birine map edilmiştir:

```text
PORTABLE CORE / STANDARD CAPABILITY
VERTICAL / EXTENSION PACK
LEGACY AUTHORITY TO RETIRE
```

SENTEZ 3 migration wave'i, SENTEZ 4 retirement gate'i ve bu belge packaging destination'ı verir.

Bu nedenle artık her eski parça için üç soru cevaplanabilir:

1. **Nereye ait?** -> SENTEZ 1 / SENTEZ 5
2. **Hangi sırada taşınır?** -> SENTEZ 3
3. **Eski karşılığı ne zaman kaldırılır?** -> SENTEZ 2 / SENTEZ 4

---

# 13. Final mimari invariant

> **Kepenk v2 bir özellikler torbası değil; ortak güvenli çekirdek üzerine takılan business capabilities ve vertical product pack'lerinden oluşan bir platformdur. Public Kepenk frontend'i korunur; backend authority'leri canonicalize edilir; vertical'lar ortak core'u yeniden icat etmez.**
