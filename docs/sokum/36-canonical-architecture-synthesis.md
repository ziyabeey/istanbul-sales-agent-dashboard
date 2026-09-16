# SÖKÜM 36 - Canonical Architecture Synthesis / KEEP-REWRITE-DROP / Migration & Cleanup Sequence

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Kapsam:** SÖKÜM 01-35 doğrulanmış kararlarının tek uygulanabilir hedef mimaride birleştirilmesi  
> **Verdict:** **KEEP mevcut güçlü UI/UX, typed schema, renderer/publish primitive, domain algoritmaları ve provider adapter'larını; REWRITE bütün mutable/parallel authority sınırlarını canonical bounded context + command/event sözleşmeleri arkasında; BUILD eksik tenant, capability, asset, integration, payment/ledger, audit/privacy ve durable execution authority'lerini; MIGRATE strangler + one-way compatibility projection ile; DROP yalnız caller'ı sıfırlanmış ve canonical karşılığı cutover gate'lerini geçmiş legacy authority'leri. Big-bang rewrite yapılmayacak.**

---

## 1. Sökümün ulaştığı sonuç

01-35 arasında yeni Kepenk'in ana domain ve cross-cutting authority sınırları yeterli kapsama ulaştı.

Tekrarlayan temel problem teknoloji seçimi değildir. Ana problem aynı business gerçeğinin birden fazla yerde authoritative kabul edilmesidir:

- tenant lifecycle root field mutation'ları,
- package/module/settings tabanlı paralel capability truth,
- CRM dual store/identity yolları,
- booking/order içine gömülü payment truth,
- mutable accounting state,
- live Firestore public site + yeni artifact mimarisinin paralel yaşaması,
- tenant root içine gömülü provider token/resource state,
- duplicate webhook/provider routes,
- log/audit/metrics kavramlarının birbirine karışması,
- checkbox/root-delete seviyesinde privacy lifecycle,
- birden fazla agent/model runtime.

Canonical hedefin ana kuralı:

> **Bir business gerçeğinin tam olarak bir write authority'si vardır. Diğer bütün gösterimler projection, adapter veya read model'dir.**

Bu nedenle SÖKÜM 36 yeni bir üçüncü mimari icat etmez. Repoda zaten bulunan güçlü primitive'leri doğru sahiplik sınırlarına yerleştirir.

---

# 2. Canonical bounded-context haritası

Hedef mimari dört düzlemde toplanır.

## 2.1 Control Plane

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
```

Yatay servisler:

```text
Credential Authority
Audit Ledger
Telemetry / Observability
Data Lifecycle / Privacy
```

### Authority'ler

- **Identity Core** -> `User`, `Membership`, `Session`, `RequestContext`, role/permission.
- **BusinessTenant** -> tenant lifecycle ve resource ownership root'u.
- **Subscription/Billing** -> commercial contract/payment plan gerçeği.
- **Entitlement Core** -> tenant'ın hangi capability'lere hak sahibi olduğu.
- **Capability Resolver** -> lifecycle + release flag + entitlement + preference + quota + dependency health üzerinden runtime allow/deny kararı.
- **Credential Authority** -> secret/key/token material lifecycle; domain'ler yalnız `CredentialRef` kullanır.
- **Audit Ledger** -> non-sampled security/business mutation kanıtı.
- **Telemetry** -> metrics/logs/traces; audit yerine geçmez.
- **Data Lifecycle** -> consent, retention, export, erasure, legal hold, offboarding purge.

---

## 2.2 Business Domain Plane

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

### Ownership

**Business Profile**
- işletme facts/brand/contact/location/hours/service catalog metadata,
- site veya integration operational state'i burada authoritative değildir.

**Customer Core**
- `Customer`, identity aliases, merge/revision,
- `CustomerActivity`, timeline,
- segment/RFM/labels/custom fields,
- consent referansları.

**Booking Core**
- appointment lifecycle,
- service price + payment policy snapshot,
- cancellation/no-show policy snapshot,
- payment yalnız projection/summary olarak görülebilir.

**Commerce Core**
- product/variant/inventory/order,
- promotion/coupon/shipping policy,
- order payment alanları Payment Core projection'ıdır.

**Payment Core**
- checkout intent,
- provider attempt/result,
- payment/refund/settlement lifecycle,
- provider idempotency ve reconciliation.

**Finance Core**
- immutable financial event/ledger,
- receivable/revenue/balance projections,
- reversal/refund yeni event olarak yazılır; geçmiş mutate edilmez.

**Messaging Core**
- conversation/thread/message identity,
- message intent,
- consent/policy gate,
- durable outbound,
- provider delivery/reply outcome.

**Marketing / Attribution**
- campaign/journey kararları,
- spend/approval policy,
- canonical conversion/revenue event bağlantısı,
- synthetic KPI financial truth olamaz.

**Agent Runtime / Knowledge**
- tek runtime + Capability Bus,
- tek model/provider gateway,
- persisted run state ve verified outcome,
- provenance + tenant-safe RAG/knowledge.

---

## 2.3 Delivery Plane

```text
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
apps/sites Public Runtime
```

Yan authority'ler:

```text
Asset Core
Public Action Gateway
```

### Kurallar

- Draft değişikliği active published revision'ı değiştiremez.
- Publish server-side validated, idempotent ve atomic pointer switch ile tamamlanır.
- Rollback eski artifact'i mutate etmez; active pointer değiştirir.
- Domain registrar/DNS state'i `DomainBinding` değildir, provider projection'ıdır.
- Asset reference immutable/pinned bir `Asset` kimliğine gider; arbitrary mutable URL canonical asset değildir.
- Public site mutation'ları yalnız revision-bound `Public Action Gateway` üzerinden Booking/CRM/Commerce command'larına gider.

---

## 2.4 Integration & Execution Plane

```text
Domain Command / Event
       ↓
Durable Job / Outbox
       ↓
IntegrationConnection
       ↓
Provider Adapter
       ↓
Provider
```

Inbound:

```text
Provider webhook
      ↓
Signature verification
      ↓
ProviderResourceBinding resolve
      ↓
IntegrationConnection + tenant resolve
      ↓
Provider event dedupe
      ↓
Durable Event Inbox
      ↓
ACK
      ↓
Async domain processing
```

### Authority'ler

- **IntegrationConnection** -> tenant-provider connection lifecycle.
- **ProviderResourceBinding** -> provider-side account/page/number/location/resource mapping.
- **WebhookSubscription** -> provider webhook subscription lifecycle.
- **SyncCursor** -> incremental sync truth.
- **Durable Job / Outbox / Event Inbox** -> retry, idempotency, replay, DLQ ve reconciliation.
- Provider adapter business truth sahibi değildir.

---

# 3. Stable ID ve ownership graph

Legacy sistemde telefon, hostname, provider ID veya root document alanı zaman zaman kimlik gibi kullanılabiliyor. Yeni baseline bunu yasaklar.

```text
User(userId)
   ↓
Membership(membershipId, userId, tenantId)
   ↓
BusinessTenant(tenantId)
   ↓
BusinessProfile(businessId, tenantId)
```

İlk migration'da legacy `esnafId`, tenant ve business için 1:1 eşlenebilir; ancak `tenantId` ve `businessId` kavramsal olarak ayrı kalır.

Alt kimlikler:

```text
siteId
siteDraftId
publishId
assetId
domainBindingId
customerId
bookingId
orderId
paymentId
refundId
ledgerEventId
conversationId
messageId
connectionId
providerResourceBindingId
jobId
commandId
eventId
auditEventId
```

### Yasaklar

- telefon/email primary internal ID değildir,
- hostname primary site ID değildir,
- provider account/resource ID tenant ID değildir,
- payment provider transaction ID internal payment ID değildir,
- mutable document path business identity yerine geçmez.

External IDs yalnız typed alias/reference olarak tutulur ve tenant ownership ile bağlanır.

---

# 4. KEEP matrisi

Aşağıdaki parçalar yeniden icat edilmemeli. Authority olmayabilecekleri yerlerde primitive/adapter/UI olarak korunurlar.

| Mevcut alan | Karar | Korunacak değer |
|---|---|---|
| `apps/sites` | KEEP shell, REWIRE data source | hostname/public app shell, SSR/public delivery yaklaşımı |
| `apps/web` dashboard/editor UX | KEEP UX, REWRITE command boundaries | mevcut yönetim ve editor kullanıcı deneyimi |
| `packages/site-schema` | KEEP | typed manifest/page/master contract yönü |
| `packages/renderer` | KEEP | component registry / typed render primitive |
| `packages/publish-engine` | KEEP + HARDEN | deterministic artifact üretim çekirdeği |
| `packages/templates` | KEEP | hand-crafted template/theme renderer değeri |
| `packages/cloudflare` | KEEP AS ADAPTER | DNS/registrar provider primitive'leri |
| booking schema/policy semantics | KEEP | deposit, cancellation, no-show, pricing snapshot intent |
| e-commerce schema/domain semantics | KEEP | product/variant/inventory/order ayrımı |
| `packages/accounting` minor-unit/source links | KEEP CONCEPT | kuruş yönü, booking/order source linkage |
| CRM v2 service/repository/identity/activity/RFM/Segment DSL | KEEP CORE SEED | canonical Customer Core için en güçlü mevcut çekirdek |
| WhatsApp/provider abstractions | KEEP ADAPTER SEEDS | provider parse/send primitive'leri |
| real marketing provider adapters | KEEP ADAPTERS | Meta/Google provider entegrasyon bilgisi |
| agent kernel/config/factory/result verifier | KEEP CORE SEEDS | tek Agent Runtime'a taşınacak primitive'ler |
| RAG/retrieval/feedback/tactic intent | KEEP ALGORITHMS | provenance-safe knowledge loop'a taşınacak |
| Cloud Tasks / retry / DLQ fikirleri | KEEP | durable execution backbone seed'i |
| AES-GCM token encryption primitive | KEEP | Credential Authority altında kullanılacak |
| Sentry + health/readiness intent | KEEP | Telemetry platformuna bağlanacak |
| mevcut consent/KVKK UI | KEEP UX | Consent Core için capture surface |
| package catalog/module metadata | KEEP INPUT | entitlement policy girdisi; authorization truth değil |
| release/MVP flags | KEEP SEPARATE INPUT | deployment/release gate; commercial entitlement değil |

---

# 5. REWRITE matrisi

Aşağıdaki parçaların ürün fikri korunur, fakat write authority veya orchestration katmanı yeniden kurulmalıdır.

## 5.1 Tenant / identity

- onboarding completion -> `CreateBusinessCommand` + resumable `OnboardingRun`,
- raw `durum` mutation -> guarded `BusinessTenant` transitions,
- JWT yalnız `esnafId` -> User/Membership/Session/RequestContext,
- raw admin bearer/impersonation -> aynı trust graph içinde audited operator action.

## 5.2 Capability / billing

- `paket`, `aktifModuller`, `aktifWebModulleri`, `ayarlar.*` -> compatibility projections,
- runtime authorization -> `EffectiveCapabilitySet`,
- upgrade/downgrade -> capability diff + provision/deprovision task plan.

## 5.3 Site

- editor serialization -> tek canonical draft serializer,
- autosave -> draft-only write,
- `/site/v2/save` -> validated canonical Draft Save Command,
- `/site/v2/publish` -> idempotent PublishCommand seed,
- versioning/rollback -> immutable PublishedSiteRevision + active pointer,
- domain writer -> `DomainBinding` + durable provisioning.

## 5.4 Customer / messaging

- `/api/musteriler` -> temporary compatibility shell backed by Customer Core,
- Mongo/Firestore dual truth -> tek CRM authority,
- duplicate message send/webhook routes -> Messaging Core + IntegrationConnection,
- campaign one-off senders -> MessageIntent + consent + outbox.

## 5.5 Booking / payment / finance

- `Booking.payment` -> read projection,
- `Order.payment` -> read projection,
- provider callback -> Payment Core verified event,
- mutable transaction/balance mutation -> immutable Finance Ledger,
- refund -> async request/provider outcome/ledger event ayrımı.

## 5.6 Integrations

- tenant root token/resource fields -> `IntegrationConnection` + `CredentialRef`,
- duplicate webhook tenant lookup -> provider resource binding,
- boolean `connected` -> explicit lifecycle + health + reconciliation.

## 5.7 Platform truth

- `agent_logs`/console islands -> structured telemetry,
- security audit -> append-only Audit Ledger,
- root delete / simulated purge -> durable Data Lifecycle plan + proof,
- multiple agent runners/model selectors -> one Agent Runtime + Model Gateway.

---

# 6. BUILD listesi

Repo içinde niyeti/parçaları olsa da canonical authority olarak eksik kalan çekirdekler:

1. `BusinessTenant` lifecycle aggregate.
2. `User / Membership / Session / RequestContext` identity graph.
3. Subscription/Contract + EntitlementGrant + `EffectiveCapabilitySet` resolver.
4. `Asset Core` + immutable AssetRef/provenance/derivatives/GC.
5. `PublishedSiteRevision` artifact store + active publish pointer.
6. `DomainBinding` global hostname authority.
7. Revision-bound `Public Action Gateway`.
8. `IntegrationConnection` + resource/subscription/cursor/health model.
9. Canonical Durable Job / Outbox / Provider Event Inbox.
10. `Payment Core` + refund/settlement/reconciliation lifecycle.
11. Immutable `Finance Ledger`.
12. `Audit Ledger` + `TelemetryContext` propagation.
13. Data Inventory + Consent/Retention/Export/Erasure/Legal Hold lifecycle.
14. Single Agent Runtime / Capability Bus / Model Gateway.
15. Canonical analytics event + revenue/attribution spine.

Bunların tamamı yeni birer ürün değildir; mevcut parçaların tek authority altında birleşebilmesi için eksik omurgalardır.

---

# 7. DROP / DEPRECATE manifesti

**Bu bölüm hemen delete listesi değildir.** Her madde ancak replacement cutover gate'ini geçtikten ve caller sayısı sıfırlandıktan sonra kaldırılır.

## Yüksek öncelikli legacy authority adayları

- live mutable Firestore state'i public publish truth yapan yollar,
- autosave'in published state'i değiştiren write path'leri,
- duplicate site publish/version/domain authorities,
- client-controlled tenant/package/module/price/source authority,
- production dev-login/fixed OTP/fail-open secret fallback yolları,
- raw global admin/cron bearer authority,
- duplicate Instagram webhook authorities,
- duplicate WhatsApp inbound authorities,
- tenant root'taki provider access/refresh token ve provider resource fields,
- package-string runtime authorization,
- `ayarlar.*` boolean'larının entitlement truth sayılması,
- Mongo + Firestore CRM dual authority,
- fake/synthetic success provider/marketing/payment yolları,
- mutable booking/order document içine gömülü authoritative financial fields,
- mutable financial balance/transaction truth,
- simulated/no-op privacy purge success,
- root tenant document delete = offboarding completed varsayımı,
- duplicate/partial agent runners ve model selectors,
- unbounded/raw sensitive payload logging.

## Legacy route'lara yaklaşım

Örnek duplicate/legacy yollar doğrudan silinmez:

```text
observe callers
   ↓
deprecation header / telemetry
   ↓
canonical command'a adapter
   ↓
legacy write disable
   ↓
shadow/read parity
   ↓
caller = 0
   ↓
archive
   ↓
delete
```

---

# 8. App / package disposition

## `apps/sites`

**KEEP.** Yeni bir public app yazılmayacak.

Değişecek tek temel şey runtime data authority:

```text
hostname
  ↓
DomainBinding
  ↓
activePublishId
  ↓
immutable artifact
  ↓
render/deliver
```

Live tenant document'tan site truth toplama migration sonunda kapanır.

## `apps/web`

**KEEP product shell and UX.** Büyük rewrite app seviyesinde değil, API/domain boundary seviyesinde yapılır.

Dashboard/editor sayfaları canonical command/read model API'lerine taşınır. Aynı business fact'i doğrudan Firestore field'larından değiştiren route'lar compatibility shell'e dönüşür.

## Strong core packages

Aşağıdakiler target architecture içinde birinci sınıf adaydır:

- `site-schema`
- `renderer`
- `publish-engine`
- `templates`
- `cloudflare` provider primitives
- `crm-schema` / CRM v2 primitives
- `booking-schema`
- `ecom-schema`
- `accounting` içindeki minor-unit/source-link primitives
- `agents` içindeki güçlü runtime primitives
- `auth` / `security` içindeki doğrulanmış güvenlik primitive'leri
- `marketing` içindeki gerçek provider/domain primitive'leri

## Thin / vertical packages

`restaurant`, `marketplace`, `supply`, `support`, `blog`, `admin`, `voice`, `influencer`, `studio` gibi paketler **şimdilik core authority yapılmayacak**.

Kural:

- yalnız type/catalog/UI kabuğuysa KEEP/DEFER,
- core domain'i duplicate ediyorsa canonical context'e bağla,
- gerçek caller yoksa cleanup aşamasında archive/drop adayı yap,
- vertical ihtiyaç core authority'yi tekrar icat edemez.

---

# 9. Target dependency graph

Bağımlılık yönü aşağı doğru akar; alt katman üst domain'i import ederek authority devralmaz.

```text
[Identity / RequestContext]
          ↓
[BusinessTenant]
          ↓
[Subscription / Entitlement / Capability]
          ↓
+---------------------------------------------------+
| BusinessProfile | Customer | Booking | Commerce   |
| Messaging       | Marketing | Agent Runtime       |
+---------------------------------------------------+
          ↓ domain events / commands
[Payment] --------------------→ [Finance Ledger]
          ↓
[Durable Jobs / Outbox / Event Inbox]
          ↓
[IntegrationConnection]
          ↓
[Provider Adapters]
```

Delivery tarafı:

```text
BusinessProfile + SiteDraft + Assets
              ↓
          PublishCommand
              ↓
       PublishedSiteRevision
              ↓
          DomainBinding
              ↓
           apps/sites
              ↓
      Public Action Gateway
              ↓
 CRM / Booking / Commerce commands
```

Cross-cutting ama authority sahibi yataylar:

```text
Credential Authority
Audit Ledger
Telemetry
Data Lifecycle
```

---

# 10. Migration stratejisi: strangler, big-bang değil

## Wave 0 - Baseline ve envanter

- canonical ID sözleşmelerini ilan et,
- current collections/routes/provider resources inventory çıkar,
- write-path telemetry ekle,
- her legacy authority için owner/caller listesi oluştur,
- migration revision/version alanlarını ekle.

Bu wave business davranışını değiştirmez.

## Wave 1 - Trust + tenant spine

Önce:

- RequestContext,
- User/Membership/Session,
- BusinessTenant lifecycle,
- Audit correlation,
- service identity

kurulur.

Bütün sonraki command'lar tenant identity'yi caller body'den değil bu context'ten alır.

## Wave 2 - Subscription + capability + durable execution

- Subscription/Contract authority,
- EntitlementGrant,
- EffectiveCapabilitySet,
- quota/dependency evaluator,
- Durable Job/Outbox/Event Inbox,
- Credential Authority / IntegrationConnection seed

kurulur.

Legacy `paket/modul/ayarlar` alanları bu aşamadan sonra yalnız compatibility projection olur.

## Wave 3 - Site delivery cutover

Sıra:

1. canonical SiteDraft serializer,
2. immutable Asset Core,
3. content-addressed page/master/artifact store,
4. PublishCommand,
5. PublishedSiteRevision + active pointer,
6. DomainBinding,
7. `apps/sites` shadow read,
8. public runtime cutover,
9. Public Action Gateway.

Site tarafı en iyi hazır primitive setine sahip olduğu için ilk büyük vertical cutover olabilir.

## Wave 4 - Customer + messaging

- CRM v2 canonical Customer Core olur,
- legacy `/api/musteriler` compatibility shell'e iner,
- identity merge/revision düzeltilir,
- Messaging Core conversation/message identity'yi devralır,
- provider send/inbound yalnız IntegrationConnection üzerinden akar,
- campaigns MessageIntent üretir.

## Wave 5 - Booking + Payment + Finance

- booking payment policy snapshot canonical hale gelir,
- authoritative money minor-unit standardına geçer,
- Payment Core provider truth'u devralır,
- Booking/Order payment field'ları projection'a dönüşür,
- Finance Core immutable ledger yazmaya başlar,
- old accounting/cari read models ledger'dan projekte edilir.

Bu wave'de bidirectional financial dual-write yasaktır.

## Wave 6 - Commerce + analytics + marketing

- Commerce lifecycle canonicalize edilir,
- inventory/order mutation tek service boundary'ye alınır,
- revenue Payment/Finance üzerinden gelir,
- canonical analytics/conversion spine kurulur,
- marketing Observe -> Decide -> Act gerçek outcome'lara bağlanır.

## Wave 7 - Agent runtime + knowledge

- tek Agent Runtime,
- capability-aware tool/action registry,
- model gateway,
- durable run state,
- result verifier,
- provenance-safe RAG,
- outcome-backed learning.

Agent hiçbir domain document'ını raw mutate etmez; capability/command kullanır.

## Wave 8 - Privacy/offboarding convergence

- Data Inventory bütün yeni canonical authority'leri kapsar,
- tenant CLOSING -> OFFBOARDING provider/resource freeze uygular,
- IntegrationConnection revoke/disconnect,
- assets/jobs/cache/data sinks purge,
- legal hold istisnaları,
- reconciliation proof,
- CLOSED transition.

## Wave 9 - Legacy cleanup

- zero-caller route'ları archive et,
- legacy write permission'larını kaldır,
- stale root fields/read models'i drop et,
- duplicate collections/schema/provider helpers'ı kaldır,
- dead vertical shells'i caller evidence ile temizle.

---

# 11. Compatibility ve dual-write kuralları

Migration sırasında en tehlikeli şey iki sistemin aynı business gerçeğini eşit authority ile yazmasıdır.

## İzin verilen

```text
Canonical Authority
      ↓ event/outbox
Legacy Compatibility Projection
```

Projection metadata taşımalıdır:

- `sourceRevision`
- `projectionVersion`
- `projectedAt`

Legacy -> canonical backfill yalnız kontrollü import/replay olarak yapılabilir; normal runtime'da ikinci authority olamaz.

Shadow read izinlidir:

```text
canonical read
legacy read
   ↓
compare + metric
   ↓
response yalnız seçilmiş authority'den
```

## Kesin yasak

Aşağıdaki alanlarda bidirectional dual-write yapılmaz:

- money / payment / ledger,
- consent/privacy status,
- role/permission/session,
- tenant lifecycle,
- entitlement/capability,
- active published revision,
- provider credential/grant lifecycle.

---

# 12. Cutover gate'leri

Bir legacy authority ancak aşağıdaki koşullar sağlandığında kapatılır.

## Genel gate

- canonical write path production request alıyor,
- idempotent replay testleri geçiyor,
- shadow-read parity kabul aralığında,
- unauthorized/cross-tenant negative tests fail-closed,
- telemetry correlation request -> command -> job -> provider zincirini gösterebiliyor,
- legacy authoritative caller sayısı gözlem penceresinde sıfır,
- rollback yolu test edilmiş.

## Site gate

- draft publish'i değiştirmiyor,
- artifact hash doğrulanıyor,
- domain aynı active publish'e resolve oluyor,
- rollback pointer switch ile çalışıyor,
- asset refs immutable/ready.

## Payment/finance gate

- provider replay duplicate ledger event üretmiyor,
- refund request ile actual refund ayrışıyor,
- booking/order projection ile ledger tutarlı,
- minor-unit invariant korunuyor,
- reconciliation farkı observable.

## Integration gate

- webhook signature zorunlu,
- resource -> connection -> tenant resolve deterministic,
- providerEventId dedupe var,
- revoke/disconnect retry-safe,
- health/degraded/re-auth state'leri observable.

## Offboarding gate

- required deletion/revoke target başarısızsa CLOSED/COMPLETED olamıyor,
- legal hold uygulanıyor,
- external provider kopyaları reconciliation'a dahil,
- proof/audit kaydı oluşuyor.

---

# 13. Rollback stratejisi

Rollback veri gerçeğini eski authority'ye geri vermek değildir.

Tercih sırası:

1. feature/release flag ile yeni read surface kapat,
2. active pointer/read router'ı önceki canonical revision'a döndür,
3. provider job tüketimini pause et,
4. canonical event'leri kaybetmeden replay et,
5. legacy projection yalnız geçici read fallback olabilir.

Financial/security/privacy authority cutover olduktan sonra eski writer tekrar açılmaz.

---

# 14. Cleanup sırası

Dosya/route temizliği en son gelir.

```text
1. Mark deprecated
2. Observe callers
3. Route to canonical adapter
4. Disable legacy writes
5. Remove permissions/secrets
6. Archive
7. Delete
```

Önce kaldırılmaya aday sınıflar:

- demo/in-memory production truth,
- duplicate/fake provider paths,
- unused mock/synthetic success endpoints,
- legacy duplicate publish/domain/webhook/CRM writers,
- stale package/module/settings authorization branches,
- raw provider secret fields,
- dead partial agent runtimes.

En son kaldırılacaklar:

- compatibility read shells,
- migration projections,
- old collection readers,
- legacy public read fallback.

Böylece cleanup sırasında production davranışı kaybedilmez.

---

# 15. Minimum production-ready Kepenk core

Yeni baseline'ın ilk production çekirdeği aşağıdaki authority'leri içermelidir:

1. Identity + Membership + Session + RequestContext.
2. BusinessTenant lifecycle.
3. Business Profile / business facts.
4. Subscription + Entitlement + EffectiveCapabilitySet.
5. Customer Core.
6. Booking Core.
7. Messaging Core + en az bir verified provider connection.
8. SiteDraft + Asset + Publish + DomainBinding + Public Runtime.
9. Public Action Gateway.
10. Payment Core + immutable Finance Ledger gerekiyorsa ödeme/kapora kullanılan akışlarda.
11. Durable Jobs / Outbox / Event Inbox.
12. IntegrationConnection + Credential Authority.
13. Audit + Telemetry.
14. Consent/Data Lifecycle minimum compliance path.
15. Capability-aware Agent Runtime'ın minimum güvenli çekirdeği.

## Sonraki ürün fazlarına bırakılabilecekler

Core authority'leri tekrar icat etmemek şartıyla:

- advanced autonomous CMO,
- collective intelligence / advanced tactic marketplace,
- influencer flows,
- restaurant-specific OS derinliği,
- marketplace/supply vertical'ları,
- advanced voice automation,
- studio/blog/CMS'in ileri fonksiyonları,
- sektör-spesifik ekstra operational modules.

Thin package/type shell'lerin varlığı bunları launch blocker yapmaz.

---

# 16. Yeni Kepenk baseline'ının değişmezleri

1. Bir domain gerçeğinin bir write authority'si vardır.
2. Tenant ID request body'den authority olarak alınmaz.
3. Client package/module/price/payment truth yaratamaz.
4. Release flag entitlement değildir.
5. Entitlement dependency health değildir.
6. Quota exhaustion entitlement loss değildir.
7. Draft published revision değildir.
8. Domain provider state `DomainBinding` değildir.
9. URL asset identity değildir.
10. Booking/Order financial ledger değildir.
11. Payment success provider verification olmadan oluşmaz.
12. Refund request actual refund değildir.
13. Agent sonucu verified domain outcome olmadan success sayılmaz.
14. Log audit değildir.
15. Root document delete completed erasure/offboarding değildir.
16. Provider credential business document truth'u değildir.
17. Compatibility projection authority değildir.
18. Legacy ve canonical aynı gerçeği eşit yetkiyle yazamaz.
19. `apps/randevu-server` bu söküm/migration çalışmasının kapsamı dışındadır ve değiştirilmez.

---

# 17. Sökümün kapanış kriteri

Yeni bir doğrulama turunda bulunan önemli her parça artık aşağıdaki canonical authority'lerden birine map edilebiliyorsa yeni bir söküm domain'i açmaya gerek yoktur:

```text
Tenant / Identity / Capability
Business Profile
Customer / Booking / Commerce
Payment / Finance
Messaging / Marketing
Site / Asset / Domain / Public Action
Integration / Durable Execution
Agent / Knowledge
Credential / Audit / Telemetry / Privacy
```

01-35 sonrası repo incelemesi bu yakınsamayı göstermektedir.

> **Bu nedenle SÖKÜM 36 ile keşif/söküm fazı KAPALI kabul edilir.**

Bundan sonraki çalışma yeni SÖKÜM numarası açmak değil, bu baseline üzerinden:

1. exact file-level cleanup manifest,
2. canonical contract/spec dosyaları,
3. migration wave task breakdown,
4. implementation/review sırası

üretmektir.

Kod silme veya refactor bu belgeyi yazarken yapılmamıştır.
