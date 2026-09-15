# SÖKÜM 31 - Observability / Audit / Logging / Metrics / Tracing / Operational Truth

> **Tarih:** 2026-09-15  
> **Durum:** KAPALI  
> **Verdict:** **KEEP the Sentry error/tracing seed, liveness/readiness separation, existing provider/agent operational logging intent, Cloud Tasks retry semantics and DLQ concept; REWRITE telemetry around a structured and propagated TelemetryContext that connects request -> command -> event -> job -> attempt -> provider call; SEPARATE application logs, user notifications, metrics, traces and immutable audit into distinct authorities; BUILD a non-sampled append-only Audit Ledger, operational metrics/SLI/SLO/alerting, centralized recursive redaction and incident-query surfaces; DROP ad-hoc console islands, schema-drifting `agent_logs` as operational truth, raw payload/output logging, unmasked replay defaults for sensitive surfaces and any security audit path that depends on sampled/debug logs.**

## 1. Neyi doğruladık?

SÖKÜM 24 durable execution sınırını, SÖKÜM 28 public action boundary'yi, SÖKÜM 29 trust graph'ı ve SÖKÜM 30 credential authority'yi tarif etti.

Bu tur şu soruyu sordu:

> Bu invariant'lar production'da gerçekten korunuyor mu, bozulursa hangi request'in hangi command/job/provider zincirinde kırıldığını kanıtlayabiliyor muyuz?

Başlıca doğrulanan parçalar:

- `apps/web/src/utils/logger.ts`
- `apps/web/instrumentation-client.ts`
- `apps/web/sentry.server.config.ts`
- `apps/web/next.config.ts`
- `apps/web/src/app/api/admin/ajan-loglar/route.ts`
- `apps/web/src/app/api/admin/impersonate/route.ts`
- `apps/web/src/lib/impersonation.ts`
- `apps/web/src/lib/islemKuyrugu.ts`
- `apps/web/src/app/api/cron/kuyruk-isleyici/route.ts`
- `apps/web/src/lib/cloudTasksClient.ts`
- `apps/web/src/app/api/worker/ai-task/route.ts`
- `apps/web/src/lib/alertLogger.ts`
- `apps/web/src/lib/twilioClient.ts`
- `apps/web/src/app/api/cron/data-purge/route.ts`
- `apps/web/src/app/api/health/route.ts`
- `apps/web/src/app/api/health/readiness/route.ts`
- `apps/web/package.json`
- `Dockerfile`
- `firestore.rules`

Ana sonuç:

> Kepenk'te bugün observability parçaları vardır, fakat tek bir **Operational Truth Authority** yoktur. Console log, `agent_logs`, `esnafBildirimleri`, Sentry, Firestore queue state, DLQ helper ve Telegram alarmları birbirinden bağımsız adalar halinde yaşamaktadır.

Bunun sonucu olarak:

- request'in hangi command'e dönüştüğü,
- command'in hangi domain event'i ürettiği,
- event'in hangi job/task'a dönüştüğü,
- worker'ın kaçıncı denemede çalıştığı,
- hangi provider çağrısının başarılı/başarısız olduğu,
- provider cevabının hangi tenant/customer aksiyonuna ait olduğu

tek zincir halinde sorgulanamamaktadır.

Bu turdaki ana karar:

> **Log yazmak observability değildir. Operational truth, causal identity + structured telemetry + immutable audit + aggregate metrics birlikte kurulduğunda oluşur.**

---

## 2. Mevcut logger structured telemetry değildir

`apps/web/src/utils/logger.ts` içindeki `logYaz` şu mantığı kullanıyor:

```text
[level] Esnaf:<esnafId> | <baslik>: <detay>
```

ve bunu `console.log` / `console.error` ile yazıyor.

Error ve critical seviyelerinde ayrıca:

```text
esnafBildirimleri
```

koleksiyonuna kayıt ekleniyor.

Bu iki ayrı kavramı birbirine karıştırıyor:

```text
application error
!=
merchant-facing notification
```

Bir internal exception'ın dashboard bildirimi olması gerekmeyebilir.

Bir merchant'a gösterilecek bildirim de bir debug log değildir.

### KEEP

- severity fikri,
- tenant context'i log'a ekleme niyeti,
- kritik durumların görünür olması niyeti.

### REWRITE

Application logger yalnız telemetry üretmelidir.

User notification ayrı domain capability olmalıdır.

---

## 3. `logAgentAction` adı var, kalıcı log yok

Aynı dosyadaki legacy `logAgentAction` yalnız:

```text
console.log(...)
```

çağırıyor.

Yani onu kullanan kodlar isim olarak "agent action log" ürettiklerini düşünürken merkezi bir event store'a yazmıyor.

`data-purge` route'u bunun net örneğidir.

Route yorumunda büyük bir hard-delete olayının loglandığı söyleniyor.

Fakat kullanılan `logAgentAction` kalıcı audit değildir.

Üstelik başarılı purge olayı:

```text
actionType = SYSTEM_ERROR
```

ile etiketleniyor.

Bu, ortak event taxonomy olmadığını gösterir.

### Invariant

Bir security/compliance action'ın audit kaydı:

- helper implementasyon detayına,
- console availability'ye,
- Sentry sampling'e,
- process lifetime'a

bağlı olamaz.

---

## 4. `agent_logs` faydalı seed, canonical schema değil

Repoda bazı provider/worker yolları `agent_logs` koleksiyonuna kayıt yazıyor.

Örneğin Twilio WhatsApp akışı şu tür alanlar yazıyor:

```text
ajan
esnafId
tip
input
output
basari
hata
zaman
kanal
```

Cloud Tasks worker da benzer bir format kullanıyor.

Bu operasyonel görünürlük açısından değerlidir.

Ancak `/api/admin/ajan-loglar` route'u eski kayıtları gösterebilmek için şu tür fallback'ler uyguluyor:

```text
ajan || agentName

tip || action || actionType

hata || error
```

Bu doğrudan schema drift kanıtıdır.

### Problem

`agent_logs` bugün:

- canonical schema değildir,
- audit değildir,
- distributed trace değildir,
- metrics backend değildir,
- job attempt ledger değildir.

### KEEP

Provider/agent operasyon event'i kaydetme intent'i.

### REWRITE

Tek versioned telemetry event schema.

---

## 5. Request / correlation kimliği yok

Doğrulanan application-level kodda canonical:

- `requestId`
- `traceId`
- `correlationId`

sözleşmesi bulunmadı.

Repo aramalarında da bu alanlar için uygulama seviyesinde bir kullanım bulunmadı.

Bu yüzden bugün aşağıdaki zincir kopuktur:

```text
Public form submit
      ↓
HTTP request
      ↓
Booking / CRM command
      ↓
Domain event
      ↓
Outbox / queue
      ↓
Cloud Task
      ↓
Worker
      ↓
Twilio / Iyzico / Cloudflare
```

Her katmanın lokal ID'si olabilir.

Fakat aynı business causality'yi paylaşan bir correlation ID yoktur.

### Critical invariant

```text
same business action
    =>
same correlationId
```

Process, queue veya provider değişse bile korunmalıdır.

---

## 6. ID türlerini birbirine karıştırmamalıyız

Canonical modelde tek bir "trace id" her şeyi çözmez.

Farklı amaçlar için ayrı kimlikler gerekir.

```text
requestId
  = tek inbound HTTP request

traceId / spanId
  = distributed execution trace

correlationId
  = business causal chain

commandId
  = tek domain command invocation

eventId
  = tek immutable domain event

jobId
  = durable async job

attemptId
  = job'ın tek çalışma denemesi

providerCallId
  = tek external provider çağrısı

providerRequestId
  = provider döndürüyorsa external request/message/payment id
```

### Neden?

Bir command birden fazla event üretilebilir.

Bir event birden fazla job üretebilir.

Bir job birkaç kez retry olabilir.

Her attempt birden fazla provider call yapabilir.

Bu nedenle:

```text
one id for everything
```

yetersizdir.

---

## 7. Canonical `TelemetryContext`

SÖKÜM 29'daki `RequestContext` observability metadata'sı ile genişletilmelidir.

Önerilen minimum:

```text
TelemetryContext {
  requestId
  traceId
  spanId?
  correlationId

  actorId?
  actorType?
  tenantId?
  businessId?
  membershipId?
  impersonationId?

  commandId?
  eventId?
  jobId?
  attemptId?

  service
  environment
}
```

### Propagation

Bu context:

```text
HTTP headers / server context
        ↓
CommandEnvelope
        ↓
DomainEvent
        ↓
Outbox record
        ↓
Task payload/headers
        ↓
WorkerAttempt
        ↓
ProviderCall
```

boyunca taşınmalıdır.

Browser veya dış caller authoritative actor/tenant/correlation alanlarını seçmemelidir.

Server gerektiğinde yeni ID üretir veya trusted upstream context'ten doğrulanmış değer devralır.

---

## 8. Sentry iyi bir seed, bütün operational truth değil

Browser tarafında Sentry kurulumu bulunuyor.

Olumlu parçalar:

- environment ayrımı,
- trace sampling,
- error replay,
- `beforeSend` redaction intent'i.

Server tarafında da ayrı Sentry config var.

### KEEP

- error monitoring,
- trace backend olarak Sentry kullanabilme,
- environment tagging,
- selective sampling fikri.

### Fakat

Sentry:

- audit ledger değildir,
- domain command history değildir,
- payment/booking/business truth değildir,
- bütün event'leri sonsuza kadar saklama authority'si değildir.

Security audit sampling'e tabi olamaz.

---

## 9. Browser redaction yetersiz ve replay default'u riskli

Client Sentry config yalnız `event.request.data` içindeki bazı top-level field isimlerini maskeliyor.

Liste yaklaşık:

```text
identityNumber
iban
cardNumber
cvv
tcKimlik
password
token
secret
creditCard
```

Bu iyi bir başlangıçtır.

Fakat şu yüzeyleri merkezi olarak kapsamıyor:

- nested object alanları,
- headers,
- cookies,
- URL query params,
- breadcrumbs,
- span attributes,
- arbitrary exception metadata,
- customer messages,
- phone/email/address,
- provider response payloads.

Replay tarafında ayrıca:

```text
maskAllText: false
blockAllMedia: false
```

kullanılıyor.

Authenticated/admin/CRM/booking/commerce ekranlarında bu güvenli default değildir.

### REWRITE

Sensitive surfaces için replay default:

```text
mask text by default
block sensitive media by default
explicit safe-region allowlist
```

olmalıdır.

---

## 10. Server Sentry redaction authority içermiyor

Server Sentry config'te `beforeSend` bulunuyor.

Fakat mevcut fonksiyon payment tag'i kontrol ettikten sonra her durumda event'i olduğu gibi döndürüyor.

Yani burada merkezi:

- token redaction,
- PII scrub,
- headers/cookies filtering,
- provider payload filtering

kanıtı yoktur.

Ayrıca yorumda payment errors için özel capture intent'i bulunmasına rağmen kodda bağımsız bir non-sampled payment/audit pipeline yoktur.

### Karar

Sentry sanitization tek tek config dosyalarına dağıtılmamalı.

Ortak bir redaction/classification policy kullanılmalıdır.

---

## 11. Central Redaction Pipeline

Tüm sink'ler aynı sanitization policy'den geçmelidir.

```text
Application Event
      ↓
Data Classification
      ↓
Recursive Redactor
      ↓
+------------------------+
| logs                   |
| traces                 |
| metrics labels         |
| Sentry                 |
| DLQ metadata           |
| operational alerts     |
+------------------------+
```

### Redaction sınıfları

Minimum:

```text
SECRET
AUTH_TOKEN
PAYMENT_DATA
DIRECT_IDENTIFIER
CUSTOMER_CONTENT
INTERNAL_ONLY
PUBLIC_SAFE
```

### Kurallar

- secret asla telemetry sink'e girmez,
- raw authorization/cookie asla loglanmaz,
- full phone/email default log field'i değildir,
- message/prompt/body yalnız explicit diagnostic policy ile saklanabilir,
- metric label'larında high-cardinality PII yasaktır,
- provider error response raw biçimde otomatik loglanmaz.

---

## 12. Twilio logging operasyonel ama PII-safe değil

`twilioClient.ts` success kaydında:

```text
input.telefon
input.mesajUzunluk
output.messageSid
output.status
```

yazıyor.

Hata kaydında raw error message saklanıyor.

Ayrıca Telegram alarmına:

- `esnafId || telefon`
- raw error message

gidebiliyor.

### KEEP

- provider message ID,
- provider status,
- success/failure event'i,
- tenant link'i.

### REWRITE

- telefon masked/hash-safe representation,
- normalized provider error code,
- latency,
- retryability,
- rate-limit metadata,
- credential version ref,
- correlation/job/attempt IDs.

---

## 13. Cloud Tasks creation domain chain'e bağlanmıyor

`cloudTasksClient.ts` task yaratınca provider'ın `response.name` değerini console'a yazıyor.

Ancak bu task name:

- command record'a,
- outbox event'e,
- business correlation ID'ye,
- tenant operational record'a

bağlanmıyor.

Fallback mode'da ise local `fetch` başlatılıyor ve durable task identity tamamen kayboluyor.

### Canonical task envelope

```text
TaskEnvelope {
  jobId
  correlationId
  commandId?
  eventId?
  tenantId?
  capability
  payloadRef
  createdAt
}
```

Provider task name yalnız transport metadata'sıdır.

Canonical job identity değildir.

---

## 14. Firestore legacy queue attempt history tutmuyor

`islemKuyrugu.ts` içinde iyi bir başlangıç vardır:

```text
durum
olusturma
islemBaslangic
islemBitis
denemeSayisi
sonuc
hata
```

ve `islemBaslat` transaction ile:

```text
bekliyor -> isleniyor
```

geçişini koruyor.

Bu race control intent'i değerlidir.

Fakat hata akışı:

```text
isleniyor -> hata
```

olarak terminal kalıyor.

Şunlar yok:

- attempt subrecord,
- nextRetryAt,
- retry classification,
- maxAttempts,
- backoff policy ref,
- lease timeout/recovery,
- dead-letter transition,
- previous error history.

`denemeSayisi` tek başına attempt ledger değildir.

---

## 15. Cloud Tasks retry var, attempt telemetry yok

`api/worker/ai-task` 500 döndürerek Cloud Tasks'ın exponential backoff retry davranışından yararlanıyor.

Bu doğru bir platform özelliğidir.

### KEEP

- provider-managed retry,
- success -> 200,
- transient failure -> retryable status intent,
- worker duration ölçümü.

### Eksik

Worker inspected path'te:

- Cloud Tasks task name alınmıyor,
- retry count header kaydedilmiyor,
- execution count kaydedilmiyor,
- attempt ID üretilmiyor,
- previous attempt lineage yok,
- terminal retry exhaustion transition görünmüyor.

Bu yüzden provider retry yapıyor olabilir ama application operational truth bunu açıklayamıyor.

---

## 16. Worker raw input/output logluyor

Cloud Tasks worker başarı logunda:

```text
input: data
output: sonuc'un ilk 2000 karakteri
```

saklıyor.

Hata logunda da body `data` yeniden loglanıyor.

Bu `data` içinde:

- müşteri mesajı,
- telefon,
- prompt context,
- internal generated content,
- başka PII

bulunabilir.

### DROP

Raw arbitrary worker payload/output'un default telemetry olarak saklanması.

### Yerine

```text
payloadType
payloadDigest
safe metadata
payloadRef? (restricted diagnostic store)
outputType
outputDigest
size
```

gibi minimum operational metadata kullanılmalıdır.

---

## 17. DLQ fikri iyi, fakat execution path'e tam bağlanmamış

`alertLogger.ts` değerli bir DLQ seed'idir.

Modelde:

```text
islem
kaynak
payload
hata
hataSinifi
denemeSayisi
oncelik
zaman
cozuldu
cozumNotu
```

alanları vardır.

Ayrıca Telegram alarmı ve unresolved list helper'ı bulunur.

### KEEP

- explicit DLQ,
- priority,
- resolution state,
- operator alert fikri.

### Problem 1

İncelenen Cloud Tasks worker `deadLetterKaydet` import ediyor fakat execution path'te çağırmıyor.

Legacy Firestore queue da DLQ'ya geçmiyor.

Yani DLQ helper'ın varlığı sistem genelinde dead-letter guarantee anlamına gelmiyor.

### Problem 2

DLQ `payload`ı komple saklıyor.

Bu, operational recovery store'u ikinci bir PII/content store'a dönüştürebilir.

### REWRITE

DLQ:

```text
DeadJob {
  jobId
  correlationId
  tenantId
  capability
  lastAttemptId
  attemptCount
  failureClass
  safeErrorCode
  payloadRef
  payloadDigest
  deadAt
  priority
  resolutionStatus
}
```

şeklinde olmalıdır.

Sensitive payload ayrı access-controlled store'da tutulabilir veya domain state'ten yeniden resolve edilebilir.

---

## 18. Audit ile application log kesin ayrılmalı

Bugün admin action, provider failure, agent action ve business notification benzer log mekanizmalarına düşebiliyor.

Canonical dört ayrı telemetry ailesi gerekir.

### A. Application Log

Amaç:

- debug,
- error diagnosis,
- runtime context.

Sample/retention değişebilir.

### B. Trace

Amaç:

- request/job/provider causal path,
- latency breakdown.

Sample edilebilir, kritik path'lerde head/tail policy uygulanabilir.

### C. Metric

Amaç:

- aggregate health,
- SLI/SLO,
- alerting.

PII taşımaz.

### D. Audit Event

Amaç:

- kim,
- hangi tenant adına,
- hangi capability ile,
- hangi hassas resource'a,
- ne yaptı,
- sonuç ne oldu

sorusunun değiştirilemez cevabıdır.

Audit event **sample edilmez**.

---

## 19. Impersonation immutable audit üretmiyor

`/api/admin/impersonate`:

- hedef `esnafId` alıyor,
- impersonation cookie üretiyor,
- DELETE ile cookie'yi siliyor.

`impersonation.ts` de yalnız token oluşturma/doğrulama/silme yapıyor.

Doğrulanan akışta:

- impersonation started audit event,
- impersonation ended audit event,
- reason code,
- support ticket/ref,
- gerçek admin actor identity,
- downstream command'lerde impersonation linkage

bulunmuyor.

### Critical invariant

Her impersonated sensitive mutation şu ikisini birlikte taşımalıdır:

```text
actor = real platform admin

effectiveTenant = impersonated tenant
```

Audit'te yalnız effective merchant görünmemelidir.

---

## 20. Canonical Audit Ledger

Audit, `agent_logs` tablosunun yeni adı olmamalıdır.

Ayrı authority gerekir.

Önerilen event:

```text
AuditEvent {
  auditId
  occurredAt

  actorType
  actorId
  sessionId?
  membershipId?

  effectiveTenantId?
  businessId?
  impersonationId?

  capability
  action
  resourceType
  resourceId?

  outcome: allowed | denied | succeeded | failed
  reasonCode?

  requestId
  correlationId
  commandId?

  beforeDigest?
  afterDigest?

  metadataSafe
}
```

### Audit'e girmesi gereken minimum olaylar

- login/security state changes,
- role/membership changes,
- admin actions,
- impersonation start/end,
- tenant switch,
- credential create/rotate/revoke,
- OAuth connect/disconnect,
- domain purchase/bind,
- publish/rollback,
- payment/refund/correction,
- bulk export/delete,
- privacy/retention actions,
- manual DLQ replay/resolve,
- high-risk automation override.

---

## 21. Audit append-only olmalı

Audit kaydı normal CRUD entity değildir.

### Yasak

```text
UPDATE audit event
DELETE single audit event
client write audit event
```

### İzin

```text
append
retention-policy expiration
controlled export/archive
```

### Tamper resistance

Implementation vendor-neutral kalabilir.

Örnek seçenekler:

- append-only DB table + restricted writer,
- managed audit log sink,
- immutable/object-lock export,
- periodic signed/hash-chained segment export.

Hash chain zorunlu değildir.

Zorunlu olan:

> Normal application admin yetkisi geçmiş audit olayını sessizce değiştirememelidir.

---

## 22. Before/after full document audit'e gömülmemeli

Audit için bütün business document'i kopyalamak cazip fakat tehlikelidir.

Bu:

- PII çoğaltır,
- credential sızıntısı yaratır,
- retention yükünü büyütür,
- GDPR/KVKK deletion politikasını zorlaştırır.

Tercih:

```text
changedFields
beforeDigest
afterDigest
safe deltas
resource version
```

ve gerekirse restricted evidence reference.

Audit integrity ile data minimization birlikte korunmalıdır.

---

## 23. Operational metrics authority görünmüyor

Repo dependency ve code yüzeyinde ayrı bir Prometheus/OpenTelemetry metrics authority veya canonical metric registry doğrulanmadı.

`/api/analytics` adı altında bulunan yüzey business/churn analytics'tir.

Operational SLI katmanı değildir.

### BUILD

Minimum metric aileleri:

```text
http_requests_total
http_request_duration

command_commits_total
command_commit_duration
command_failures_total

outbox_lag_seconds
jobs_ready
jobs_inflight
job_attempts_total
job_failures_total
dlq_depth
oldest_ready_job_age

provider_calls_total
provider_call_duration
provider_errors_total
provider_rate_limits_total

public_action_commits_total
publish_activations_total
payment_callbacks_total
security_denials_total
```

Metric labels düşük-cardinality ve PII-free olmalıdır.

---

## 24. SLI ve SLO domain capability bazlı olmalı

Sadece HTTP 200 oranı yeterli değildir.

Örneğin booking için gerçek SLI:

```text
valid booking command
        ↓
authoritative booking committed
```

olmalıdır.

WhatsApp için:

```text
accepted notification job
        ↓
provider accepted / terminal failure
```

Publish için:

```text
PublishCommand accepted
        ↓
new revision ACTIVE
```

### Örnek SLI aileleri

- availability,
- success ratio,
- p50/p95/p99 latency,
- durable job lag,
- retry exhaustion,
- provider degradation,
- stale/revoked credential failures,
- cross-tenant denial correctness.

Bu tur numeric SLO hedefi belirlemiyor.

Mimari contract'ı belirliyor.

---

## 25. Alerting semantik error code üzerinden kurulmalı

Bugün birçok provider helper raw `error.message` logluyor.

Canonical failure:

```text
FailureClass {
  code
  category
  retryable
  provider
  providerCode?
  httpStatus?
  rateLimited?
  credentialState?
}
```

üretmelidir.

Alerting:

- tekil error string'ine,
- Türkçe exception mesajına,
- regex'e

bağımlı olmamalıdır.

### Alert adayları

- DLQ depth artışı,
- queue lag,
- provider error-rate spike,
- provider 429/rate-limit spike,
- payment callback verification failures,
- publish activation failures,
- credential expiry/re-auth required,
- repeated cross-tenant denied attempts,
- audit sink write failure,
- asset processing backlog,
- public action abuse rejection spike.

---

## 26. Provider degradation ayrı state olmalı

Bir provider tamamen down olmayabilir.

Örnek:

```text
READY
DEGRADED
RATE_LIMITED
AUTH_REQUIRED
UNAVAILABLE
```

Operational truth bu durumu capability readiness ile bağlamalıdır.

SÖKÜM 30 Credential Authority ile ilişki:

```text
Credential READY
+
Provider health READY/DEGRADED
+
Capability dependency state
        ↓
Effective Capability Readiness
```

Bu sayede "Twilio credential var ama provider 429 yağdırıyor" durumu yalnız log mesajı olmaktan çıkar.

---

## 27. Liveness ve readiness ayrımı doğru seed

`/api/health` basit liveness dönüyor:

```text
ok
service
time
```

`/api/health/readiness` ise environment, feature ve Firebase durumunu ayrıca hesaplıyor.

Bu ayrım doğru yöndedir.

### KEEP

```text
liveness != readiness
```

### Genişlet

Üç katman:

```text
Liveness
  process yaşıyor mu?

Core Readiness
  request kabul etmek güvenli mi?

Capability Readiness
  booking/publish/payment/whatsapp/... bağımlılıkları hazır mı?
```

Docker/container liveness probe ile capability readiness birbirine karıştırılmamalıdır.

---

## 28. Dependency health evidence üretmeli

Readiness yalnız env'in mevcut olup olmadığını kontrol etmekle sınırlı kalmamalıdır.

Her dependency için iki bilgi ayrılabilir:

```text
configurationReady
runtimeHealth
```

Örneğin:

```text
Twilio key configured = true
Twilio last 5m success rate = degraded
```

veya:

```text
KMS configured = true
KMS decrypt probe = healthy
```

Operational dashboard secret değerini değil yalnız safe status'u görür.

---

## 29. Incident sorgusu tasarlanmalı

Bir production incident sırasında operator şu sorguları yapabilmelidir:

```text
correlationId X ne oldu?

commandId Y hangi event'leri üretti?

jobId Z kaç kez denendi?

hangi tenant'lar Twilio 429'dan etkilendi?

payment provider failure hangi checkout'ları etkiledi?

publish revision activation neden olmadı?

hangi admin hangi tenant'a impersonate oldu?
```

Bugünkü admin agent-log listesi son 50 kaydı gösterdiği için bu investigation yüzeyi değildir.

### BUILD

Tenant/capability/time/status/correlation/job/provider filtreli operational search surface.

Bu surface raw secret/customer content döndürmemelidir.

---

## 30. Retention policy telemetry türüne göre ayrılmalı

Tek retention süresi bütün telemetry türleri için doğru değildir.

Örneğin:

```text
high-volume debug logs
  kısa retention

metrics
  downsample + daha uzun aggregate retention

traces
  sampled retention

security/financial audit
  policy/legal ihtiyaca göre daha uzun immutable retention

DLQ payload evidence
  minimum gerekli süre
```

Bu tur hukuki süre sayısı belirlemiyor.

Kural:

> Retention, veri sınıfı ve authority türü ile tanımlanmalıdır.

---

## 31. Audit export ve archive

Audit yalnız ana operational DB'de kalırsa aynı blast radius'a bağlı olur.

Canonical sistem desteklemelidir:

```text
Audit Ledger
     ↓
periodic/export stream
     ↓
separate restricted archive
```

Amaç:

- incident recovery,
- compliance evidence,
- tamper resistance,
- production DB compromise blast radius'ını düşürmek.

Export'ta da data minimization korunmalıdır.

---

## 32. User notification telemetry değildir

`esnafBildirimleri` business/product notification authority olarak kalabilir.

Ama logger error'ı otomatik olarak notification'a dönüştürmemelidir.

Canonical ayrım:

```text
Operational Failure
      ↓
Telemetry + Alert Policy

Business Notification Event
      ↓
Notification Core
      ↓
Merchant UI / Email / WhatsApp / Push
```

Operator alarmı ve merchant notification da aynı şey değildir.

---

## 33. Yeni Operational Truth katmanı

Kanonik zincir:

```text
Inbound Request
      ↓
RequestContext + TelemetryContext
      ↓
CommandEnvelope
      ↓
Domain Commit
      ↓
DomainEvent
      ↓
OutboxJob
      ↓
WorkerAttempt
      ↓
ProviderCall
      ↓
Provider Outcome
```

Her aşama aynı `correlationId`yi korur.

Yan akışlar:

```text
             ┌──────── Structured Logs
             ├──────── Distributed Traces
Execution ───┼──────── Metrics
             ├──────── Alerts
             └──────── Immutable Audit (yalnız audit-worthy events)
```

---

## 34. Structured application event

Minimum event:

```text
OperationalEvent {
  timestamp
  level
  service
  environment
  eventName
  eventVersion

  requestId?
  traceId?
  correlationId?
  commandId?
  eventId?
  jobId?
  attemptId?

  tenantId?
  actorType?
  actorId?

  capability?
  provider?
  outcome?
  errorCode?

  durationMs?
  metadataSafe
}
```

### Yasak

- arbitrary spread of request body,
- arbitrary provider response,
- secret value,
- raw auth headers,
- cookies,
- unbounded AI prompt/output.

---

## 35. Job / attempt observability model

SÖKÜM 24 durable execution modeline şu metadata eklenmelidir.

```text
JobRecord {
  jobId
  tenantId
  capability
  correlationId
  commandId?
  eventId?

  status
  attemptCount
  maxAttempts
  nextAttemptAt?
  createdAt
  updatedAt
  completedAt?
  deadAt?
}
```

Her deneme:

```text
JobAttempt {
  attemptId
  jobId
  attemptNo
  workerIdentity
  startedAt
  finishedAt
  outcome
  durationMs
  failureClass?
  providerCallIds[]
}
```

Bu sayede geçmiş attempt overwrite edilmez.

---

## 36. Provider call observability modeli

```text
ProviderCall {
  providerCallId
  jobId?
  attemptId?
  correlationId
  tenantId?

  provider
  operation
  credentialRefVersion?

  startedAt
  durationMs
  outcome
  httpStatus?
  providerCode?
  providerRequestId?
  retryable?
  rateLimited?
}
```

### Not

Credential **değeri** loglanmaz.

Yalnız safe credential version/reference metadata gerekirse kaydedilir.

---

## 37. Audit sink failure normal log failure değildir

Audit-worthy bir mutation başarılı olup audit append başarısız olursa policy açık olmalıdır.

High-risk işlemler için tercih:

```text
cannot create required audit evidence
        ↓
fail closed
```

Örnek:

- impersonation,
- credential rotation,
- role change,
- data export/delete,
- financial correction/refund,
- domain purchase.

Daha düşük riskli read operasyonlarında audit sink degrade policy farklı olabilir.

Bu karar capability policy'de explicit olmalıdır.

---

## 38. Sentry ve trace sampling audit'i etkilemez

Tracing maliyet nedeniyle sample edilebilir.

Örneğin normal successful request'lerin küçük yüzdesi trace backend'e gidebilir.

Fakat:

```text
AuditEvent
```

sampling'e tabi değildir.

Benzer biçimde domain event ve financial ledger da trace sampling'den bağımsızdır.

### Invariant

```text
trace missing
!=
audit missing
```

---

## 39. KEEP / REWRITE / BUILD / DROP

### KEEP

- Sentry dependency ve error monitoring intent'i,
- browser/server tracing seed'i,
- liveness/readiness ayrımı,
- `agent_logs` üzerinden provider outcome görünürlüğü fikri,
- queue transaction/race control intent'i,
- Cloud Tasks managed retry semantics,
- worker duration ölçümü,
- DLQ + operator alert fikri,
- provider request/message ID saklama intent'i.

### REWRITE

- logger -> structured OperationalEvent,
- request context -> propagated TelemetryContext,
- `agent_logs` -> versioned schema / operational event sink,
- worker logging -> safe metadata + attempt model,
- DLQ -> job-linked, redacted payload-ref modeli,
- provider logs -> normalized outcome/latency/error/rate-limit,
- Sentry redaction -> centralized recursive policy,
- replay -> sensitive-default masking,
- readiness -> capability + dependency runtime health.

### BUILD

- correlation graph,
- immutable Audit Ledger,
- AuditEvent schema,
- append-only audit writer,
- audit export/archive,
- JobAttempt ledger,
- ProviderCall telemetry,
- operational metric registry,
- SLI/SLO definitions,
- alert policies,
- incident query surface,
- central data classification/redaction library,
- telemetry retention policies.

### DROP

- arbitrary `console.*` as canonical evidence,
- `logAgentAction` console-only semantics,
- error log -> merchant notification coupling,
- raw request/job payload logging,
- raw AI output logging by default,
- raw phone/email/customer message as normal log fields,
- schema-drifting `agent_logs` as authority,
- security/compliance audit through sampled logs,
- sensitive session replay with unmasked text as default,
- DLQ full payload duplication without data classification,
- "last 50 logs" UI as incident investigation strategy.

---

## 40. Critical invariants

1. Her inbound privileged request canonical `requestId` alır.
2. Aynı business causality bütün async sınırlar boyunca aynı `correlationId`yi korur.
3. Her domain command unique `commandId` taşır.
4. Her domain event unique `eventId` ve causation/correlation bilgisi taşır.
5. Her durable job unique `jobId` taşır.
6. Her retry ayrı immutable `attemptId` üretir.
7. Provider çağrısı provider operation ve outcome ile izlenebilir.
8. Secret/auth token/cookie raw telemetry'ye giremez.
9. Customer content default telemetry değildir.
10. PII redaction sink'e göre değil merkezi policy ile yapılır.
11. Audit event sample edilmez.
12. Audit normal application log'undan ayrı authority'dir.
13. Audit geçmişi normal admin CRUD ile değiştirilemez.
14. Impersonation audit actor + effective tenant ikisini de taşır.
15. Credential rotate/revoke audit-worthy event'tir.
16. Role/membership mutation audit-worthy event'tir.
17. Financial correction/refund audit-worthy event'tir.
18. Data export/delete audit-worthy event'tir.
19. DLQ transition job lineage'i korur.
20. DLQ raw payload duplication yapmaz.
21. Queue lag ve retry exhaustion ölçülebilir.
22. Provider rate-limit/degradation ölçülebilir.
23. Liveness ile readiness ayrıdır.
24. Capability readiness provider/runtime dependency health'i ifade eder.
25. Audit sink required bir high-risk mutation'da unavailable ise işlem fail-closed olabilir.
26. User-facing notification operational log değildir.
27. Trace sampling audit/domain truth'u etkilemez.
28. Incident sırasında tenant -> command -> event -> job -> provider zinciri sorgulanabilir.
29. Telemetry retention veri sınıfına göre explicit policy taşır.
30. Production mock success telemetry'de gerçek success olarak sayılamaz.

---

## 41. Smoke / acceptance probes

### Correlation

- public form request oluştur,
- requestId üretildiğini doğrula,
- command commit'te commandId + aynı correlationId,
- event'te eventId + aynı correlationId,
- job'da jobId + aynı correlationId,
- worker attempt'te attemptId,
- provider call'da providerCallId,
- tek correlation sorgusunda zincirin tamamını gör.

### Retry

- provider transient 500 simüle et,
- attempt 1 failed,
- job retry scheduled,
- attempt 2 unique ID,
- previous attempt history korunuyor,
- success sonrası job completed.

### DLQ

- max attempt exhaustion simüle et,
- job DEAD/DLQ state,
- safe failure metadata,
- full customer payload loglanmıyor,
- operator alarmı oluşuyor,
- replay/resolve audit event üretiyor.

### Redaction

- Authorization header loglanmıyor,
- session cookie loglanmıyor,
- OAuth token loglanmıyor,
- phone/email masked,
- nested `token` redacted,
- provider nested error response scrubbed,
- AI prompt/customer message default logda yok.

### Sentry replay

- authenticated CRM ekranındaki müşteri text'i replay'de masked,
- ödeme/admin hassas yüzeyleri masked/block,
- safe public page gerektiğinde selective unmask policy.

### Audit

- admin impersonation start -> audit append,
- impersonated mutation -> actor admin + effective tenant,
- impersonation end -> audit append,
- role update -> audit append,
- credential rotate -> audit append,
- financial refund -> audit append,
- audit event normal update/delete endpoint'iyle değiştirilemiyor.

### Metrics

- HTTP latency histogram,
- command commit latency,
- queue lag,
- worker attempts,
- DLQ depth,
- provider error-rate,
- provider 429 count,
- publish activation rate,
- booking commit rate

gözlemlenebilir.

### Health

- process live, Twilio down -> liveness true,
- whatsapp capability readiness DEGRADED/UNAVAILABLE,
- booking capability etkilenmiyorsa READY kalabilir,
- core DB unavailable -> core readiness false.

### Incident query

- provider request ID ile correlation bulunabilir,
- correlation ile tenant/command/job bulunabilir,
- tenant ile belirli zaman aralığındaki failed provider calls filtrelenebilir.

---

## 42. Migration sırası

### Faz 1 - Schema freeze

Yeni canonical alanları tanımla:

- TelemetryContext,
- OperationalEvent,
- AuditEvent,
- JobAttempt,
- ProviderCall,
- FailureClass.

### Faz 2 - Central redaction

Bütün yeni sink write'larından önce shared recursive redactor zorunlu hale gelir.

Sentry client/server aynı policy adapter'ını kullanır.

### Faz 3 - Request correlation

Inbound request'te requestId/trace/correlation seed edilir.

RequestContext'e bağlanır.

### Faz 4 - Domain propagation

Command/event/outbox/job envelope'larına IDs taşınır.

### Faz 5 - Worker attempt model

Cloud Tasks ve diğer durable executor'lar attempt metadata'yı canonical store'a yazar.

### Faz 6 - Provider instrumentation

Twilio, Iyzico, Cloudflare, Resend, Google/Meta gibi adapter'lar standard ProviderCall telemetry üretir.

### Faz 7 - Audit Ledger

Önce yüksek riskli mutation'lar bağlanır:

- admin,
- impersonation,
- credential,
- roles,
- finance,
- privacy/delete/export,
- publish/domain.

### Faz 8 - Metrics / SLO / alerts

Operational metrics ve alert policies etkinleştirilir.

### Faz 9 - Legacy sinks quarantine

- console-only action logs,
- raw payload agent logs,
- logger->notification coupling,
- eski dashboard listeleri

canonical pipeline'a taşınır veya kapatılır.

---

## 43. SÖKÜM 31 sonucu

Kepenk'in observability parçaları sıfırdan başlamıyor.

Repo içinde:

- Sentry,
- basic severity logger,
- agent/provider logs,
- liveness/readiness,
- queue state,
- Cloud Tasks retry,
- DLQ helper,
- Telegram alert

gibi değerli parçalar vardır.

Fakat bunlar bugün ortak bir operational truth grafiği oluşturmuyor.

Canonical sonuç:

```text
RequestContext
      ↓
TelemetryContext
      ↓
CommandEnvelope
      ↓
DomainEvent
      ↓
OutboxJob
      ↓
JobAttempt
      ↓
ProviderCall
      ↓
ProviderOutcome
```

ve bu zincirin yanındaki dört authority:

```text
Structured Logs
Distributed Traces
Operational Metrics
Immutable Audit Ledger
```

birbirinden ayrılacaktır.

En önemli sonuç:

> **Production'da doğruluk yalnız domain state ile değil, o state'e nasıl ulaşıldığını kanıtlayan causal operational evidence ile tamamlanır.**

---

## 44. Sonraki frontier

SÖKÜM 31'de retention, redaction, hard-delete ve audit export soruları doğal olarak daha geniş bir data-governance boşluğuna bağlandı.

Sıradaki en mantıklı frontier:

# SÖKÜM 32 - Data Lifecycle / Privacy / Consent / Retention / Export / Deletion Authority

Öncelikli sorular:

- kişisel veri hangi canonical owner/resource altında tutuluyor?
- consent bir checkbox mı, versioned legal event mi?
- KVKK/GDPR aydınlatma ve izin kanıtı hangi policy version'a bağlı?
- customer/lead/contact/booking/commerce verileri için retention sınıfları var mı?
- tenant kapanınca soft-delete, hard-delete ve legal hold nasıl çalışıyor?
- customer deletion request bütün kopyalara, logs, DLQ, assets, backups ve provider'lara nasıl yayılıyor?
- data export canonical snapshot mı, koleksiyon dump'ı mı?
- deletion idempotent ve resumable mı?
- anonymization ile deletion ayrılmış mı?
- audit integrity ile right-to-erasure nasıl birlikte korunuyor?
- backup retention primary DB deletion'dan nasıl ayrılıyor?
- AI prompt/log/embedding/vector store kopyaları lifecycle graph'a dahil mi?

SÖKÜM 32'nin hedefi:

```text
Data Classification
       ↓
Data Subject / Tenant Ownership
       ↓
Consent + Purpose
       ↓
Retention Policy
       ↓
Export / Restrict / Delete / Anonymize
       ↓
Propagation Graph
       ↓
Verifiable Completion
```

Böylece SÖKÜM 27 asset retention, SÖKÜM 28 public form consent, SÖKÜM 29 identity, SÖKÜM 30 credential lifecycle ve SÖKÜM 31 audit/telemetry retention tek data lifecycle authority altında birleşebilir.
