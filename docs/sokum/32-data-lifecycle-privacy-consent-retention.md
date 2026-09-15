# SÖKÜM 32 - Data Lifecycle / Privacy / Consent / Retention / Export / Deletion Authority

> **Tarih:** 2026-09-15  
> **Durum:** KAPALI  
> **Verdict:** **KEEP existing KVKK intent, consent UI, audit/logging primitives and useful technical TTL patterns; REWRITE privacy lifecycle around a canonical Data Inventory + versioned Consent Core + durable Lifecycle Orchestrator; BUILD Retention, Export, Erasure and Legal Hold authorities plus sink/provider purge adapters and verifiable deletion outcomes; DROP simulated purge success, checkbox-only consent, root-document-only deletion, raw PII copies without lifecycle ownership and ad hoc partial cleanup paths after migration.**

## 1. Neyi doğruladık?

SÖKÜM 29 kimlik ve tenant trust sınırını, SÖKÜM 30 secret/credential authority'yi, SÖKÜM 31 ise audit ve operational truth katmanını kapattı.

Bu tur şu soruya odaklandı:

> Kepenk bir veriyi neden tutuyor, ne kadar tutuyor, kim export edebilir, kim silebilir, silme talebi geldiğinde verinin bütün kopyaları gerçekten yok oluyor mu ve hangi kayıtların hukuken/operasyonel olarak tutulmaya devam etmesi gerektiği açıkça modellenmiş mi?

Doğrulanan başlıca parçalar:

- `apps/web/src/app/api/cron/kvkk-purge/route.ts`
- `apps/web/src/app/api/cron/data-purge/route.ts`
- `apps/web/src/app/api/cron/kvkk/route.ts`
- `apps/web/src/app/api/admin/esnaf/[id]/route.ts`
- `apps/web/src/lib/firebaseAdmin.ts`
- `apps/web/src/lib/musteriCRM.ts`
- `apps/web/src/lib/esnafHafiza.ts`
- `apps/web/src/app/api/cron/konusma-ozeti/route.ts`
- `apps/web/src/utils/konusmaOzeti.ts`
- `apps/web/src/lib/alertLogger.ts`
- `apps/web/src/lib/security/auditLogger.ts`
- `apps/web/instrumentation-client.ts`
- public form/consent content from `@kepenk/templates`
- SÖKÜM 27 Asset Core retention/GC decision
- SÖKÜM 31 structured observability/redaction decision

Ana sonuç:

> Repoda privacy/KVKK niyeti vardır, fakat canonical bir Data Lifecycle Authority yoktur. Silme yolları birbirinden bağımsızdır, bazıları kısmi, bazıları simülasyondur, consent yalnız UI seviyesinde kalabilmektedir ve türetilmiş AI/CRM/log/provider kopyaları kaynak verinin yaşam döngüsüne bağlı değildir.

Bu nedenle bugünkü bir `deleted`, `purged` veya `consent accepted` state'i sistem genelinde aynı anlama gelmemektedir.

---

## 2. Bugünkü veri dünyasında en temel eksik: Data Inventory yok

Canonical privacy sistemi önce verinin nerede olduğunu bilmek zorundadır.

Bugünkü repo doğrulamasında müşteri veya tenant verisi birden fazla yerde yaşayabilir:

```text
esnaflar
randevular
musteriProfiller
musteriKonusmalar
yorumlar
odemeler / siparisler
agent_logs
dead_letter_queue
audit_logs
esnafHafizalari
site/publication history
assets
provider integrations
Sentry / Telegram / messaging providers
cache / task payloads
```

Fakat bunları tek bir lifecycle haritasında birleştiren authority bulunmadı.

### Problem

Bir sistem `esnaflar/{id}` dokümanını silip "tenant silindi" diyemez.

Bir sistem `musteriProfiller` kaydını silip "müşteri silindi" diyemez.

Çünkü aynı subject veya tenant başka collection, log, derived state veya external provider içinde yaşamaya devam edebilir.

### Canonical karar

Her production veri sınıfı kayıtlı olmalıdır:

```text
DataClassPolicy {
  dataClass
  authority
  ownerScope
  subjectScope
  purposes[]
  sensitivity
  retentionPolicyId
  exportPolicyId
  deletionPolicyId
  legalHoldPolicyId?
  sinks[]
  derivedDataClasses[]
}
```

Yeni bir collection, event, index, vector, log sink veya provider kopyası eklenmeden önce lifecycle kaydı bulunmalıdır.

---

## 3. `kvkk-purge` gerçek bir intent taşıyor ama kapsamı eksik

Doğrulanan purge yolu 44 günlük benzeri bir offboarding mantığı taşıyor ve bazı verileri anonimleştirip/siliyor.

Bu iyi bir başlangıç intent'idir.

Fakat doğrulanan cleanup listesi yalnız belirli alan ve collection'ları kapsıyor.

Görünmeyen veya kapsam dışı kalabilen başlıca sınıflar:

- booking/randevu kayıtları,
- müşteri profilleri,
- konuşma geçmişi,
- sipariş/ödeme kayıtları,
- messaging geçmişi,
- agent logs,
- dead-letter payload'ları,
- audit event'leri,
- OAuth/provider token kayıtları,
- AI türetilmiş hafıza,
- assets ve asset reference history,
- published revision/history,
- provider-side copies,
- analytics/telemetry copies,
- cache/task payload'ları.

### Verdict

Mevcut 44-gün offboarding fikri **KEEP intent**.

Hardcoded collection listesiyle purge **REWRITE**.

Lifecycle Orchestrator, Data Inventory üzerinden hedefleri üretmelidir.

---

## 4. `data-purge` privacy correctness açısından tehlikeli bir anti-pattern

Başka bir route kendisini hard-delete policy gibi tanımlıyor.

Fakat doğrulanan implementation'da gerçek silme kodu yorum/simülasyon seviyesinde ve sonuç tarafında sabit/simüle edilmiş silinen hesap sayısı üretilebiliyor.

Daha sonra sistem major deletion tamamlandı şeklinde audit/log mesajı yazabiliyor.

### Neden kritik?

Privacy sisteminde yanlış pozitif başarı normal feature bug'ından daha tehlikelidir.

```text
UI / cron says PURGED
        ↓
operator assumes data gone
        ↓
actual data still exists
```

### Critical invariant

> **Bir ErasureRequest, bütün required deletion task'ları başarılı olmadan COMPLETED olamaz.**

Simulated deletion production success state üretemez.

---

## 5. Admin tenant DELETE yalnız root document'i silmekle yetinebiliyor

`DELETE /api/admin/esnaf/[id]` doğrulanan akışta ana `esnaflar/{id}` dokümanını kaldırabiliyor.

Firestore subcollection'lar root document delete ile otomatik silinmez.

Ayrıca top-level parallel collection'lar da ayrı yaşamaya devam eder.

Örnek risk:

```text
DELETE esnaflar/{tenant}

ama kalabilir:
  randevular where esnafId=tenant
  musteriProfiller where esnafId=tenant
  musteriKonusmalar where esnafId=tenant
  agent_logs where esnafId=tenant
  dead letters
  audit records
  provider integration copies
  assets/history
```

### Karar

Tenant deletion bir CRUD DELETE değildir.

Şu state machine olmalıdır:

```text
ACTIVE
  ↓
OFFBOARDING_REQUESTED
  ↓
ACCESS_REVOKED
  ↓
RETENTION_WINDOW
  ↓
PURGE_PLANNED
  ↓
PURGING
  ↓
PURGED | PARTIAL_FAILURE | LEGAL_HOLD
```

Root document ancak lifecycle semantics bunu gerektiriyorsa final/near-final aşamada kaldırılır veya minimal tombstone'a dönüştürülür.

---

## 6. `silKoleksiyon` lifecycle authority değildir

`firebaseAdmin.ts` içinde generic collection cleanup helper'ı bulunuyor.

Bu yardımcı teknik olarak işe yarar fakat şu bilgileri taşımaz:

- data class,
- subject identity,
- tenant authority,
- reason/legal basis,
- retention policy,
- legal hold,
- dependent derived data,
- provider copies,
- idempotency,
- retry,
- audit actor,
- deletion proof.

### Verdict

Low-level delete primitive **KEEP** edilebilir.

Privacy semantics bunun içine gömülmemelidir.

Lifecycle Orchestrator bu tür adapter'ları hedef olarak çağırmalıdır.

---

## 7. Consent UI var, Consent Authority yok

Public template contact formunda KVKK checkbox'ı ve aydınlatma linki bulunuyor.

Bu UX intent'i değerlidir.

Fakat checkbox tek başına canonical consent proof değildir.

Doğrulanan public form akışlarında zaten SÖKÜM 28'de backend commit olmadan local success sorunu bulunmuştu.

Bugünkü content schema yaklaşık olarak şunu biliyor:

```text
consentText
consentLink
required checkbox
```

Ama şunları bilmiyor:

- consentId,
- subject/customer identity,
- tenant,
- purpose,
- policy/document version,
- capture channel,
- grantedAt,
- withdrawnAt,
- proof/capture context,
- source revision,
- legal basis,
- consent state history.

### Canonical ConsentRecord

```text
ConsentRecord {
  consentId
  tenantId
  subjectRef
  purpose
  policyVersion
  noticeRef
  channel
  sourceRevision?
  grantedAt
  withdrawnAt?
  state: granted | withdrawn | expired
  captureContext
  proofRef?
}
```

### Critical distinction

```text
marketing consent
!=
service/transaction processing
!=
AI personalization consent/purpose
!=
analytics purpose
```

Bir tane "KVKK kabul" boolean'ı bütün amaçları açamaz.

---

## 8. Consent withdrawal ile erasure aynı işlem değildir

Bu ayrım canonical modelde açık olmalıdır.

### Consent withdrawal

Belirli bir purpose için gelecek işlemeyi durdurur.

Örnek:

```text
marketing -> withdrawn
transactional booking -> may still be retained by policy
```

### Erasure request

Subject'in erasable kişisel verisinin policy ve legal-hold kurallarına göre silinmesini/anonymize edilmesini ister.

### Offboarding

Tenant seviyesinde daha geniş bir lifecycle başlatır.

Üçü aynı endpoint/state değildir.

---

## 9. Subject-level müşteri silme/export authority doğrulanmadı

Doğrulanan repo yüzeylerinde canonical bir müşteri data-subject erase/export authority bulunmadı.

Bu ifade şu anlama gelir:

> İncelenen default-branch API/lib yüzeylerinde tek bir müşteri için tüm canonical ve derived kayıtları keşfedip export/silme planı oluşturan merkezi bir workflow doğrulanmadı.

Bu kritik çünkü `musteriProfiller` doğrudan kişisel ve türetilmiş veri taşıyor.

---

## 10. `musteriProfiller` derived personal data authority örneği

`musteriCRM.ts` müşteri için şunları tutabiliyor:

- telefon,
- isim,
- ilk/son temas,
- son randevu,
- toplam randevu,
- tercih edilen hizmetler,
- harcama tahmini,
- memnuniyet skoru,
- VIP/sadık/kayıp gibi segmentler,
- özel günler,
- konuşma sayısı,
- AI/heuristic sonraki tahmini ziyaret.

Dosya yorumu id'yi "telefon numarası hash'i" diye tarif ediyor.

Gerçek üretim ise telefonun base64 temsilinden kesilmiş bir string kullanıyor.

Bu kriptografik hash değildir.

Üstelik `telefon` ayrıca plaintext saklanıyor.

### Privacy sonucu

Source data silme yetmez.

Aşağıdaki derived state de lifecycle graph'a bağlı olmalıdır:

```text
appointment
    ↓
customer profile
    ↓
segment
    ↓
prediction
```

Bir subject erase olduğunda policy izin veriyorsa bu zincirin türevleri de hedeflenmelidir.

---

## 11. AI uzun dönem hafıza ayrı bir derived data sınıfıdır

`esnafHafiza.ts` şu kaynaklardan türetim yapıyor:

```text
randevular
+
yorumlar
    ↓
patterns / feedback summary
    ↓
esnafHafizalari/{esnafId}
```

Hafıza:

- yoğun gün/saat,
- talep örüntüleri,
- müşterilerin sık övdüğü/eleştirdiği konular

gibi derived bilgi tutabiliyor.

Yorum metinleri ayrıca AI provider'a analiz amacıyla gönderilebiliyor.

### Problem

Kaynak yorum/randevu silinirse hafıza otomatik olarak yeniden hesaplanmıyor veya erase edilmiyor.

### Karar

AI-derived state Data Inventory'de bir first-class data class olmalıdır.

Her derived data record için lineage gerekir:

```text
DerivedDataRecord {
  derivedId
  tenantId
  dataClass
  sourceDataClasses[]
  sourceRefs? / sourceSetHash?
  purpose
  generatedAt
  retentionPolicyId
  subjectRefs?   // gerekiyorsa
}
```

Subject-level türetimde subject linkage kaybolmamalıdır.

---

## 12. `musteriKonusmalar` ayrı privacy surface

Konuşma özeti akışı `musteriKonusmalar` collection'ını okuyor ve `musteriNumara` üzerinden benzersiz müşterileri hesaplıyor.

Ayrıca WhatsApp AI kaynaklı randevularla birleştirip esnafa özet gönderiyor.

Bu şu anlama gelir:

- raw conversation records,
- phone/identity linkage,
- generated summary,
- outbound WhatsApp copy

aynı subject verisinin farklı sink'leri olabilir.

### Canonical karar

Conversation retention, CRM retention'dan tesadüfen türememelidir.

Ayrı DataClassPolicy gerekir.

---

## 13. Log, DLQ ve telemetry de privacy lifecycle kapsamındadır

SÖKÜM 31'de doğrulandı:

- `agent_logs` input/output taşıyabiliyor,
- DLQ raw payload saklayabiliyor,
- audit data ayrı collection'da,
- Sentry/replay harici sink,
- Telegram operational alert sink'i.

Bunlar "sadece log" diye privacy modelinden çıkarılamaz.

### Karar

Central Redaction Policy + DataClassPolicy birlikte çalışmalıdır.

```text
Domain payload
    ↓
redaction / minimization
    ↓
OperationalTelemetry
```

### Audit exception

Audit verisi bazı durumlarda domain verisinden daha uzun tutulabilir.

Fakat çözüm raw PII'yi sonsuza kadar tutmak değildir.

Audit mümkün olduğunca:

- subject pseudonymous ref,
- actor ref,
- operation type,
- policy/reason,
- outcome,
- timestamp,
- immutable proof

taşır.

---

## 14. Legal Hold ayrı authority olmalı

Doğrulanan code surface'te canonical legal-hold modeli bulunmadı.

Legal hold yoksa iki tehlike çıkar:

1. Normal retention sweep hukuken tutulması gereken veriyi silebilir.
2. Güvenlik gerekçesiyle her şeyi sonsuz tutmak gibi ters bir anti-pattern oluşabilir.

### Canonical model

```text
LegalHold {
  holdId
  scope
  subjectRef? / tenantId? / dataClass?
  reason
  approvedBy
  createdAt
  expiresAt?
  releasedAt?
}
```

Hold explicit, scoped, auditable ve mümkünse time-bound olmalıdır.

---

## 15. Retention policy field bazlı magic number olmamalı

Bugünkü 44 gün gibi sabitler faydalı intent göstergeleridir fakat canonical policy değildir.

Yeni model:

```text
RetentionPolicy {
  policyId
  dataClass
  trigger
  duration
  purpose / legalBasis
  action: delete | anonymize | archive | retain
  holdOverride
  version
}
```

Örnek trigger'lar:

- `createdAt`
- `lastInteractionAt`
- `bookingCompletedAt`
- `tenantOffboardedAt`
- `consentWithdrawnAt`
- `paymentSettledAt`

Policy version'ı audit edilebilir olmalıdır.

---

## 16. Tenant offboarding durable job olmalı

SÖKÜM 24 durable execution ve SÖKÜM 31 ExecutionContext kararları burada yeniden kullanılmalıdır.

Canonical akış:

```text
TenantOffboardingRequest
        ↓
Access revoke / credential revoke
        ↓
Retention window
        ↓
DeletionPlan build from Data Inventory
        ↓
DeletionTask[]
        ↓
+--------------------------+
| domain DB                |
| subcollections           |
| top-level tenant refs    |
| CRM/customer profiles    |
| conversations            |
| AI-derived memory        |
| assets                   |
| search/vector/index      |
| cache                    |
| logs/DLQ by policy       |
| provider copies          |
+--------------------------+
        ↓
reconciliation
        ↓
PURGED / PARTIAL_FAILURE / LEGAL_HOLD
```

### Rule

Deletion process retry edilebilir ve idempotent olmalıdır.

Bir task tekrar çalışınca daha fazla zarar vermemeli veya false success üretmemelidir.

---

## 17. ErasureRequest ve DeletionPlan

Subject veya tenant erase request'i ayrı first-class record olmalıdır.

```text
ErasureRequest {
  requestId
  scopeType: subject | tenant
  tenantId
  subjectRef?
  requestedBy
  reason
  legalBasis?
  requestedAt
  status
  policyVersion
  correlationId
}
```

Plan:

```text
DeletionPlan {
  planId
  requestId
  generatedAt
  dataInventoryVersion
  tasks[]
}
```

Her task:

```text
DeletionTask {
  taskId
  sink
  dataClass
  targetRef
  action: delete | anonymize | revoke | retain
  policyReason
  status
  attempt
  nextAttemptAt?
  lastError?
  completedAt?
}
```

---

## 18. Provider copies erasure propagation ister

Kepenk veriyi dış sağlayıcılara gönderebilir:

- messaging providers,
- payment provider,
- Google/Meta integrations,
- AI providers,
- Telegram alerts,
- Sentry/observability.

Bu belgenin amacı her provider'ın hukuki retention politikasını yorumlamak değildir.

Mimari karar şudur:

> Bir external sink'e PII gönderiliyorsa Data Inventory o sink'i bilmeli ve provider'ın deletion/revoke/reconciliation capability'si açıkça modellenmelidir.

Provider silme API'si yoksa bu da policy'de explicit olmalıdır.

Sessizce "biz DB'den sildik, bitti" denemez.

---

## 19. Credential revoke, tenant deletion'ın ilk fazlarından biridir

SÖKÜM 30 ile bağlantı:

Tenant offboarding sırasında tenant-owned OAuth/provider credentials erişilebilir bırakılmamalıdır.

```text
OFFBOARDING_REQUESTED
   ↓
revoke tenant sessions
revoke provider grants
stop new jobs/actions
   ↓
retention/purge
```

Provider credential delete ile provider-side grant revoke aynı şey değildir.

İkisi ayrı task olabilir.

---

## 20. Assets ve privacy

SÖKÜM 27'de Asset Core için retire + reference-aware retention + GC kararı alınmıştı.

Privacy lifecycle bunu bozmaz, genişletir.

### Business-owned asset

Logo, salon fotoğrafı gibi işletme içeriği tenant lifecycle policy'sine bağlıdır.

### Subject-owned/sensitive asset

Bir müşteriye ait görsel veya belge varsa subject erasure graph'ına bağlanmalıdır.

### Rule

Asset ownership sadece tenantId ile sınırlı olmayabilir.

Gerekirse:

```text
subjectRefs[]
privacyClass
retentionPolicyId
```

metadata'sı gerekir.

---

## 21. Immutable publish ile privacy çakışmamalı

SÖKÜM 25-27 published revisions için immutable artifact kararı verdi.

Bu nedenle önemli invariant:

> **Erasable customer/lead/booking PII immutable public site artifact içine embed edilmemelidir.**

Business site content ve customer operational data authority'leri ayrı kalmalıdır.

Aksi halde:

```text
immutable revision history
vs
right-to-erasure
```

çatışması üretilir.

Bu veri mimarisiyle önceden engellenmelidir.

---

## 22. Export authority ad hoc CSV değildir

Doğrulanan yüzeylerde canonical subject/tenant export orchestrator bulunmadı.

Yeni export:

```text
ExportRequest
   ↓
authorize actor + scope
   ↓
resolve Data Inventory
   ↓
point-in-time reads from canonical authorities
   ↓
redact secrets/security internals
   ↓
DataExportSnapshot
   ↓
short-lived secure delivery
```

Snapshot manifest örneği:

```text
DataExportSnapshot {
  exportId
  scope
  tenantId
  subjectRef?
  generatedAt
  dataInventoryVersion
  sections[]
  contentHash
  expiresAt
}
```

### Export'a girmemesi gerekenler

- platform/provider secrets,
- password/session signing material,
- internal security controls,
- başka tenant/subject verisi.

---

## 23. Backup/restore deletion'ı geri getirmemeli

Repo-level backup authority bu turda canonical olarak doğrulanmadı.

Yine de privacy architecture için invariant şimdiden gerekli:

> Purged PII eski backup restore edildiğinde sessizce aktif sisteme geri dönmemelidir.

Bunun için en az bir strateji gerekir:

- backup retention expiry,
- erasure tombstone/reconciliation log,
- restore sonrası deletion replay,
- backup segregation/encryption destruction policy.

Backup'ın kendisi privacy lifecycle dışında tutulamaz.

---

## 24. Deletion Proof, silinen PII'nin kendisi değildir

Silme tamamlandıktan sonra sistemin şunu kanıtlayabilmesi gerekir:

```text
request X
policy version Y
N targets
all required targets completed
completed at Z
```

Ama proof amacıyla erased raw PII tekrar saklanmamalıdır.

Örnek:

```text
ErasureProof {
  requestId
  pseudonymousSubjectRef
  tenantId?
  policyVersion
  targetResultHashes[]
  completedAt
  outcome
}
```

Bu record audit retention policy'sine tabi olur.

---

## 25. Canonical Privacy / Data Lifecycle Architecture

```text
              Data Inventory
                    ↓
             DataClassPolicy
          ↙         ↓          ↘
   Consent Core  Retention   Legal Hold
          ↘         ↓          ↙
             Lifecycle Core
          ↙         ↓          ↘
   ExportRequest  Erasure   Offboarding
                      ↓
                DeletionPlan
                      ↓
                DeletionTask[]
                      ↓
     +----------------------------------+
     | Domain DB                        |
     | CRM / Booking / Commerce         |
     | Conversation / AI Derived Data   |
     | Assets                           |
     | Search / Vector / Analytics      |
     | Logs / Audit / DLQ               |
     | Cache / Jobs                     |
     | External Providers               |
     +----------------------------------+
                      ↓
                Reconciliation
                      ↓
             ErasureProof / Audit
```

Bu yeni bir dev monolith değildir.

Lifecycle Core domain authority'lerin verisini sahiplenmez.

Yalnız policy ve orchestration authority olur.

---

## 26. Domain owner / lifecycle owner ayrımı

Örnek:

```text
Booking Core
  owns booking truth

Privacy Lifecycle Core
  owns when/how that booking becomes erasable/anonymized/exportable
```

Silme işlemini doğrudan Lifecycle Core yapabilir veya Booking Core'a explicit privacy command gönderebilir.

Tercih:

> Domain semantics gereken yerde domain-owned delete/anonymize adapter.

Generic collection deletion son çare olmalıdır.

---

## 27. Data classification minimum sınıfları

Canonical inventory en az şu ayrımları taşımalıdır:

```text
PUBLIC_BUSINESS_CONTENT
TENANT_OPERATIONAL
CUSTOMER_IDENTIFIER
CUSTOMER_CONTACT
CUSTOMER_CONVERSATION
CUSTOMER_BOOKING
CUSTOMER_COMMERCE
PAYMENT_METADATA
CONSENT_EVIDENCE
AI_DERIVED_PERSONAL
BUSINESS_ANALYTIC_AGGREGATE
SECURITY_AUDIT
OPERATIONAL_LOG
PROVIDER_CREDENTIAL
ASSET_PUBLIC
ASSET_PERSONAL
```

Bu liste migration sırasında genişleyebilir.

Önemli olan her verinin lifecycle sınıfının explicit olmasıdır.

---

## 28. Critical invariants

1. Consent checkbox tek başına consent proof değildir.
2. Consent server-side versioned purpose + policyVersion ile persist edilmelidir.
3. Marketing, AI/personalization, analytics ve transactional purposes birbirinden ayrılır.
4. Consent withdrawal future purpose processing'i durdurur; erasure ile aynı state değildir.
5. Tenant root document delete, tenant purge sayılmaz.
6. Subject root/profile delete, subject purge sayılmaz.
7. Her ErasureRequest Data Inventory üzerinden deletion plan üretir.
8. Required target başarısızsa request COMPLETED olamaz.
9. Deletion task idempotent ve retryable olmalıdır.
10. Simulated/no-op purge success üretemez.
11. AI-derived data source lifecycle'a bağlanmalıdır.
12. Logs/DLQ/telemetry central retention/redaction policy'ye tabidir.
13. Audit retention raw PII'yi sınırsız tutma gerekçesi değildir.
14. Legal hold explicit, scoped ve audited authority'dir.
15. Provider copies inventory'de görünür olmalıdır.
16. Provider credential delete ve provider grant revoke farklı lifecycle task'larıdır.
17. Immutable publish artifacts erasable customer PII embed etmez.
18. Asset deletion reference-aware ve privacy-aware çalışır.
19. Export canonical authorities'den point-in-time snapshot üretir.
20. Export secrets veya cross-tenant data içermez.
21. Backup restore purged PII'yi sessizce geri getiremez.
22. Erasure proof erased raw PII'yi yeniden saklamaz.
23. Destructive privacy commands actor + capability + reason + audit ister.
24. Her yeni production data class lifecycle policy kaydı olmadan ship edilmez.
25. "Deleted" kelimesi UI/API'de ancak canonical lifecycle state'i temsil eder.

---

## 29. KEEP / REWRITE / BUILD / DROP

### KEEP

- KVKK/retention intent'i.
- Offboarding sonrası gecikmeli purge fikri.
- Public formdaki consent UX fikri.
- Existing low-level Firestore deletion primitives.
- SÖKÜM 27 asset retire/GC yaklaşımı.
- SÖKÜM 31 audit/redaction/ExecutionContext yaklaşımı.
- Provider-specific adapter fikri.

### REWRITE

- hardcoded collection purge listeleri,
- admin root-document delete semantics,
- consent boolean/checkbox semantics,
- AI-derived data lifecycle,
- log/DLQ retention,
- external-provider lifecycle,
- export yaklaşımı,
- retention magic numbers.

### BUILD

- Data Inventory Registry,
- DataClassPolicy,
- Consent Core,
- Retention Policy Registry,
- Lifecycle Orchestrator,
- ErasureRequest,
- TenantOffboarding state machine,
- DeletionPlan / DeletionTask,
- provider purge/revoke adapters,
- Legal Hold authority,
- ExportRequest / DataExportSnapshot,
- ErasureProof,
- restore-time erasure reconciliation.

### DROP

- production simulated purge success,
- root document delete = full deletion varsayımı,
- checkbox = consent proof varsayımı,
- source delete = AI derived delete varsayımı,
- raw PII operational logs as indefinite storage,
- untracked external copies,
- partial purge sonrası `success=true`,
- privacy action'larında fire-and-forget deletion.

---

## 30. Migration sırası

### Faz A - Inventory

1. Collection/data-class inventory çıkar.
2. External sinks kaydedilir.
3. Her class için owner/purpose/sensitivity işaretlenir.
4. Derived-data lineage eklenir.

### Faz B - Consent

1. Existing consent UI canonical `ConsentRecord` üretir.
2. Published action capability purpose ile pinlenir.
3. Withdrawal command eklenir.

### Faz C - Lifecycle

1. Tenant offboarding root DELETE'ten ayrılır.
2. Subject erase workflow eklenir.
3. Hardcoded KVKK cron'ları Lifecycle Orchestrator'a yönlenir.
4. Simulated purge production'dan kaldırılır.

### Faz D - Sinks

1. CRM/Booking/Commerce adapters.
2. Conversation/AI derived adapters.
3. Asset adapters.
4. Logs/DLQ/audit policy adapters.
5. External provider purge/revoke adapters.

### Faz E - Export / Hold / Restore

1. Data export manifest.
2. Legal hold.
3. backup/restore erasure reconciliation.
4. privacy lifecycle monitoring/SLO.

---

## 31. Smoke / acceptance probes

### Consent

- Contact form consent grant -> versioned ConsentRecord oluşur.
- Aynı policy yeni version -> yeni proof üretilir.
- Marketing withdrawn -> yeni marketing send engellenir.
- Transactional booking permission bağımsız kalır.
- AI personalization purpose yoksa AI-derived profile üretimi engellenir/policy'ye göre sınırlandırılır.

### Subject erasure

- Customer X booking + CRM + conversation + derived prediction oluştur.
- ErasureRequest başlat.
- Bütün required sink task'ları görünür olsun.
- Bir adapter fail -> request PARTIAL_FAILURE/PENDING kalsın.
- Retry -> tamamlanınca proof üret.
- Aynı request tekrar -> duplicate destructive effect oluşmasın.

### Tenant offboarding

- Tenant offboard -> yeni user/action erişimi kapanır.
- Provider grants revoke task'ları oluşur.
- Retention window bitmeden purge başlamaz.
- Legal hold varsa ilgili class silinmez.
- Hold release sonrası purge devam eder.

### Derived data

- Source customer conversation sil -> customer-specific derived record da sil/anonymize/recompute edilir.
- Aggregate non-identifying business metric policy izin veriyorsa tutulabilir.

### Logs

- Domain record erase sonrası raw payload DLQ/log'da kalmamalı veya policy-defined anonymization uygulanmalı.
- Audit proof subject raw PII taşımadan kalır.

### Assets

- Personal asset subject erase -> reference-aware privacy task.
- Business logo normal tenant retention'a tabi.

### Export

- Subject export yalnız o subject + tenant scope içerir.
- Cross-tenant kayıt yok.
- Secret/provider credential yok.
- Consent history dahil.
- Manifest content hash doğrulanabilir.

### Restore

- Purged subject içeren eski backup restore simülasyonu.
- Erasure reconciliation subject'i tekrar aktif veri olarak bırakmaz.

---

## 32. Son karar

Kepenk'te privacy problemi "KVKK cron ekleyelim" problemi değildir.

Doğru soyutlama:

```text
Data truth
+
Purpose
+
Consent
+
Retention
+
Legal hold
+
Derived lineage
+
External copies
+
Durable deletion/export
```

Sistem ancak bunların hepsini tek lifecycle graph üzerinde takip ederse şu cümleyi güvenle söyleyebilir:

> "Bu verinin neden tutulduğunu, nerede bulunduğunu, ne zaman silineceğini ve silme talebinin bütün kopyalarda tamamlanıp tamamlanmadığını biliyoruz."

Bu nedenle SÖKÜM 32 kapanış kararı:

> **Kısmi KVKK cron'larını veya UI checkbox'larını privacy authority saymıyoruz. Data Inventory merkezli, purpose-aware, versioned consent ve durable erase/export orchestration kuruyoruz.**

---

## 33. Sıradaki frontier önerisi

SÖKÜM 30 credentials ve SÖKÜM 32 provider-side lifecycle birlikte yeni açık alanı gösterdi:

### SÖKÜM 33 - External Integration Connection Lifecycle / OAuth Grants / Webhook Subscription / Sync & Reconciliation Authority

Öncelikli sorular:

- Bir tenant provider bağlantısı nasıl CONNECTED olur?
- OAuth grant ile stored credential aynı state machine'e mi bağlı?
- Provider account/resource mapping canonical olarak nerede?
- Webhook subscription creation/rotation/deletion kim yönetiyor?
- Token refresh ve reconnect failure nasıl modelleniyor?
- Provider -> Kepenk ve Kepenk -> provider sync cursor/idempotency nasıl çalışıyor?
- Drift/reconciliation var mı?
- Tenant disconnect/offboarding provider tarafında neyi revoke/delete ediyor?
- Bir connection DEGRADED/EXPIRED/REVOKED olduğunda domain feature nasıl fail eder?
- Aynı tenant bir provider için birden fazla connection taşıyabilir mi?

Hedef:

> **Credential'dan daha üst seviye bir IntegrationConnection authority kurup provider bağlantısının tüm yaşam döngüsünü observable, reconnectable, revocable ve reconcilable hale getirmek.**
