# SÖKÜM 34 - Tenant / Business Lifecycle / Onboarding / Provisioning / Suspension / Offboarding Authority

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Verdict:** **KEEP the current onboarding UX/data capture, session primitive, package activation intent, Cloud Tasks seed and operator visibility; REWRITE tenant creation and status mutation behind a canonical `BusinessTenant` lifecycle aggregate plus durable onboarding/provisioning/offboarding workflows; CONNECT billing entitlements, site/domain/media, external integrations, jobs and data lifecycle to explicit tenant states; DROP arbitrary root-field lifecycle mutation, implicit activation before provisioning completion, demo/in-memory setup truth and root-document deletion as tenant offboarding completion after migration.**

## 1. Neyi doğruladık?

Bu tur tenant'ın yalnız kimliğini değil, yaratıldığı andan kapanışına kadar state transition ve resource orchestration modelini izledi.

Temsilci gerçek yollar:

- `apps/web/src/app/api/onboarding/submit/route.ts`
- `apps/web/src/app/api/onboarding/complete/route.ts`
- `apps/web/src/app/api/esnaf/setup-progress/route.ts`
- `apps/web/src/app/api/esnaf/[id]/route.ts`
- `apps/web/src/app/api/admin/esnaf/[id]/route.ts`
- `apps/web/src/app/api/payment/callback/route.ts`
- `apps/web/src/utils/paketSenaryosu.ts`
- `apps/web/src/lib/sessionManager.ts`

SÖKÜM 29 identity/trust, SÖKÜM 32 data lifecycle ve SÖKÜM 33 provider connection lifecycle bu turun alt sınırlarıdır.

Ana sonuç:

> Repoda tenant yaratma, onboarding, ödeme sonrası aktivasyon, package provisioning, admin status mutation ve deletion mevcut; fakat bunları tek bir canonical tenant lifecycle state machine'i yönetmiyor.

Bugünkü `esnaflar/{id}` document'ı aynı anda profile, package, lifecycle, capability, integration resource, site ve operational state taşıyan bir mutable merkez gibi davranıyor.

---

## 2. İki onboarding endpoint'i iki farklı anlam taşıyor

`/api/onboarding/submit`:

- `sektor + answers` alıyor,
- Agent 7 ile site preview content üretiyor,
- gerçek business persistence kodu yorum satırında,
- tenant yaratmadan `success: true` dönebiliyor.

`/api/onboarding/complete` ise:

- gerçek `esnaflar` document'ı yaratıyor,
- profil/paket/tema/modül/consent-benzeri alanları aynı write'a koyuyor,
- local site data üretiyor,
- `durum: onboarding` yazıyor,
- hemen session oluşturuyor.

Dolayısıyla bugün:

```text
onboarding submit success
!=
tenant created
!=
onboarding completed
!=
tenant active
```

### Karar

Onboarding UI step'i ile tenant lifecycle transition birbirinden ayrılmalıdır.

Canonical command ailesi örneğin:

```text
CreateBusinessCommand
SaveOnboardingDraftCommand
CompleteOnboardingCommand
StartProvisioningCommand
ActivateBusinessCommand
```

şeklinde explicit olmalıdır.

---

## 3. Tenant creation tek büyük mutable snapshot write'ı

`/api/onboarding/complete` yeni Firestore id üretip doğrudan `esnaflar/{id}` yaratıyor.

Aynı record'a örnek olarak:

```text
business identity
telefon / email / whatsapp
sektor
paket
durum: onboarding
yenilenmeTarihi
bildirimAyarlari
social metadata
palette/theme
smsRizasi
kvkkOnay
aktifWebModulleri
siteData
localPreviewUrl
siteDurumu
```

yazılıyor.

Bu, tenant aggregate ile bağlı domain projection'ların birbirine karıştığını gösteriyor.

### Karar

Canonical tenant aggregate yalnız lifecycle ve stable ownership truth taşımalıdır.

Örnek:

```text
BusinessTenant {
  businessId
  lifecycleStatus
  lifecycleRevision
  createdAt
  activatedAt?
  suspendedAt?
  closingAt?
  closedAt?
  lifecycleReason?
}
```

Profile, billing, consent, site, integrations ve capability/entitlement kendi authority'lerinde kalır ve `businessId` ile bağlanır.

---

## 4. Onboarding request package authority olabiliyor

`/api/onboarding/complete` untrusted request içindeki:

```text
adim1.paket || 'TEMEL'
```

değerini tenant record'a yazıyor.

Bu endpoint içinde package selection'ın billing/price/entitlement authority tarafından server-side doğrulandığı görünmüyor.

### Invariant

```text
Client-selected package label
must never create entitlement truth.
```

Onboarding yalnız requested plan/intent taşıyabilir. Effective entitlement SÖKÜM 12 billing/package authority sonucundan gelmelidir.

---

## 5. Consent lifecycle ile onboarding default'u karışmış

Onboarding body'den `smsRizasi` explicit okunuyor fakat aynı creation snapshot'ında:

```text
kvkkOnay: true
```

hard-coded yazılıyor.

SÖKÜM 32'de versioned purpose/evidence consent authority eksikliği zaten doğrulanmıştı.

### Karar

Tenant creation:

```text
consent accepted = true
```

varsayımı üretemez.

Consent ayrı canonical event/evidence authority'dir; onboarding yalnız ilgili consent command'larını çağırır.

---

## 6. Setup progress gerçek lifecycle state değil

`/api/esnaf/setup-progress`:

- process-memory `Map` kullanıyor,
- sabit `demo-esnaf` id'si kullanıyor,
- auth session ile tenant çözmüyor,
- restart sonrası state kayboluyor.

Bu UX prototype olarak kalabilir fakat production onboarding completion truth olamaz.

### Verdict

**KEEP as demo/prototype only; DROP as production authority.**

Gerçek onboarding progress durable workflow state'ten türemelidir.

---

## 7. `ACTIVE` state ödeme senaryosunun ilk satırlarında yazılıyor

Gerçek aktivasyon `paketSenaryosuCalistir()` içinde:

```text
durum: aktif
paket
odemeId
yenilenmeTarihi
```

write'ı ile başlıyor.

Fakat bundan sonra henüz şunlar çalışıyor:

- package module projection,
- VAPI provisioning,
- site generation Cloud Task,
- content generation,
- WhatsApp notifications,
- Google/review settings,
- ads/randevu settings,
- premium domain flow,
- email,
- operator notifications.

Yani bugün:

```text
ACTIVE
is written before
required provisioning is known to be complete.
```

### Kritik invariant

```text
ACTIVE must mean the minimum required capability set is committed and usable.
```

Payment success activation eligibility yaratabilir; tek başına provisioning completion değildir.

---

## 8. Provisioning tek durable workflow değil

`paketSenaryosuCalistir()` içinde farklı failure semantics birlikte yaşıyor:

- bazı Firestore update'leri awaited,
- site generation Cloud Tasks'e gönderiliyor,
- VAPI dynamic import zinciri fire-and-forget,
- content generation `.catch(console.error)` ile bırakılıyor,
- domain flow fire-and-forget,
- bazı provider/message hataları Telegram'a raporlanıp lifecycle'ı durdurmuyor.

Payment callback outer senaryo exception'ını `basarisizSenaryolar` collection'ına yazabiliyor. Bu iyi bir operational seed'dir.

Ancak child action'ların önemli bir kısmı hata yutup outer workflow'u başarılı bırakabilir.

Sonuç:

```text
payment success
  ↓
status ACTIVE
  ↓
provisioning fan-out
  ├─ success
  ├─ silent/telegram-only failure
  └─ durable task
```

tek reconciliation authority değildir.

### Karar

Provisioning explicit plan/task graph olmalıdır:

```text
ProvisioningRun
  ├── EntitlementProjectionTask
  ├── SiteProvisionTask
  ├── IntegrationProvisionTask
  ├── DomainProvisionTask?
  ├── MessagingSetupTask
  └── RequiredCapabilityCheck
```

Her task:

```text
PENDING | RUNNING | SUCCEEDED | FAILED | SKIPPED
```

state'i taşımalı ve idempotent olmalıdır.

---

## 9. Activation policy minimum-ready-set üzerinden kurulmalı

Bütün package side effect'lerin bitmesini beklemek her tenant için gerekli değildir.

Bu yüzden `ACTIVE` için explicit minimum-ready-set gerekir.

Örnek:

```text
Billing entitlement committed
+ tenant profile valid
+ auth access ready
+ mandatory core resources ready
= ACTIVE eligible
```

Optional capability'ler daha sonra provisioning yapabilir ve kendi health/state'lerini taşır.

Örneğin domain provisioning pending iken tenant dashboard aktif olabilir, fakat custom-domain capability `PROVISIONING` kalır.

### Karar

Tenant lifecycle ile capability lifecycle aynı şey değildir.

---

## 10. Admin PATCH lifecycle command değil, raw field mutation

`/api/admin/esnaf/[id]` admin'e doğrudan şu alanları mutate etme imkanı veriyor:

```text
durum
paket
aktifModuller
aktifWebModulleri
ayarlar
twilioNumarasi
notlar
```

`durum` değişikliği için allowed transition matrisi yok.

`paket` değişikliği billing/entitlement workflow'una gitmiyor.

Module/resource field'ları da aynı endpoint'ten değiştirilebiliyor.

Telegram notification var, fakat notification state-machine invariant sağlamaz.

### Karar

Admin UI raw lifecycle mutation yerine command çağırmalıdır:

```text
SuspendBusinessCommand
ResumeBusinessCommand
ChangeSubscriptionCommand
BeginBusinessClosureCommand
CancelClosureCommand?
```

Her command:

- current revision,
- actor,
- reason,
- allowed transition,
- audit,
- downstream effects

ile çalışmalıdır.

---

## 11. Optimistic concurrency yok

Admin lifecycle PATCH read -> update yapıyor fakat lifecycle revision/CAS göstermiyor.

İki operator veya async billing event aynı anda state değiştirirse last-write-wins oluşabilir.

### BUILD

```text
lifecycleRevision
```

ve compare-and-swap/transaction zorunludur.

Örnek:

```text
Suspend(expectedRevision=12)
```

revision 13 olmuşsa stale command reject edilir.

---

## 12. Suspension merkezi fail-closed değil

`sessionManager.ts` JWT içinde yalnız:

```text
esnafId
```

taşıyor.

Session verification token signature/expiry kontrol edip `esnafId` döndürüyor; tenant lifecycle state'i okumuyor.

Dolayısıyla admin `durum = suspended/pasif/...` benzeri bir değer yazsa bile mevcut JWT kendi başına geçersiz hale gelmiyor.

Bazı feature'lar ayrı ayrı durum kontrol ediyor olabilir; fakat canonical central fail-closed authority doğrulanmadı.

### Karar

Authenticated request context iki ayrı kavram taşımalıdır:

```text
Identity authenticated?
Tenant allowed for this capability/action?
```

`SUSPENDED`, `CLOSING`, `DELETING`, `CLOSED` state'leri için policy açık olmalıdır.

Örneğin suspended tenant:

- read-only billing/support erişimi alabilir,
- yeni provider actions yapamaz,
- campaign/job üretmez,
- destructive admin olmayan writes yapamaz,
- public runtime policy'ye göre korunur veya maintenance state gösterir.

Bu policy tek capability gate tarafından uygulanmalıdır.

---

## 13. Package ve tenant lifecycle birbirine gömülmüş

Bugün `paketSenaryosuCalistir` aynı fonksiyonda:

- payment outcome,
- tenant ACTIVE transition,
- module entitlement projection,
- feature settings,
- site provisioning,
- domain flow,
- messaging,
- provider provisioning

başlatıyor.

Bu yüzden:

```text
subscription state
entitlement state
tenant lifecycle
provisioning state
```

birbirine karışıyor.

### Ayrım

```text
Billing/Subscription
      ↓
EntitlementChanged
      ↓
Capability Provisioning / Deprovisioning

BusinessTenant lifecycle
      ↓
can platform serve this tenant at all?
```

Package downgrade tenant'ı otomatik `SUSPENDED` yapmamalıdır. Hangi capability'nin kapanacağı entitlement policy tarafından belirlenmelidir.

---

## 14. Admin DELETE offboarding değildir

`DELETE /api/admin/esnaf/[id]`:

```text
esnaflar/{id}.delete()
```

yapıp başarı dönüyor.

SÖKÜM 32 bunun data graph'ını temizlemediğini, SÖKÜM 33 external provider grants/resources'ı revoke etmediğini zaten gösterdi.

Tenant lifecycle açısından da problem aynı:

```text
root document missing
!=
CLOSED
```

Çünkü jobs, public resources, sessions, integration resources ve child data yaşamaya devam edebilir.

### Karar

Hard delete public admin command olmayacaktır.

Kapanış:

```text
BeginClosure
  ↓
CLOSING
  ↓
freeze new business actions
  ↓
revoke/disable scheduled jobs
  ↓
provider offboarding
  ↓
domain/media/resource policy
  ↓
data retention / erasure workflow
  ↓
reconciliation proof
  ↓
CLOSED
```

olmalıdır.

Physical record deletion retention policy'nin ayrı bir terminal task'ıdır.

---

## 15. Session revocation lifecycle'a bağlanmalı

Bugünkü session 7 gün JWT olarak geçerli.

Tenant kapanışı veya suspension sırasında mevcut session'ları invalid kılacak tenant lifecycle/version binding session primitive içinde görünmüyor.

### Öneri

Request context server-side tenant state doğrular veya token:

```text
tenantLifecycleRevision/sessionEpoch
```

ile bağlanır.

Security-sensitive transitions:

- suspend,
- close,
- ownership transfer,
- credential compromise

session epoch bump üretebilir.

Bu karar SÖKÜM 29 trust boundary ile birlikte uygulanmalıdır.

---

## 16. Canonical lifecycle

Önerilen ana state family:

```text
CREATING
  ↓
ONBOARDING
  ↓
PROVISIONING
  ↓
ACTIVE
  ├─→ SUSPENDED → ACTIVE
  └─→ CLOSING
          ↓
      OFFBOARDING
          ↓
        CLOSED
```

Gerekirse terminal/exception states:

```text
CREATE_FAILED
PROVISIONING_FAILED
OFFBOARDING_BLOCKED
```

`DELETING/DELETED` data retention implementation detail'i olarak ayrı lifecycle sub-state olabilir; `CLOSED` business lifecycle terminal state'idir.

### Allowed transitions

Raw string yazmak yasaktır.

Her transition explicit command + policy ile olur.

---

## 17. Canonical aggregate ve workflow modelleri

### `BusinessTenant`

```text
BusinessTenant {
  businessId
  lifecycleStatus
  lifecycleRevision
  sessionEpoch
  createdAt
  activatedAt?
  suspendedAt?
  closingAt?
  closedAt?
  lifecycleReasonCode?
}
```

### `OnboardingRun`

```text
OnboardingRun {
  onboardingId
  businessId
  status
  completedSteps[]
  requiredSteps[]
  startedAt
  completedAt?
  revision
}
```

### `ProvisioningRun`

```text
ProvisioningRun {
  provisioningId
  businessId
  trigger
  status
  requiredTaskIds[]
  optionalTaskIds[]
  startedAt
  completedAt?
}
```

### `ProvisioningTask`

```text
ProvisioningTask {
  taskId
  provisioningId
  capability
  status
  idempotencyKey
  attempts
  lastErrorCode?
  resourceRef?
}
```

### `OffboardingRun`

```text
OffboardingRun {
  offboardingId
  businessId
  status
  requiredTaskIds[]
  retentionPolicyVersion
  startedAt
  completedAt?
}
```

---

## 18. SÖKÜM 24/31/32/33 ile birleşen orchestration

Tenant lifecycle yeni bir queue altyapısı icat etmemelidir.

SÖKÜM 24 durable job/outbox uygulanır:

```text
Lifecycle Command
   ↓
Tenant state commit
   ↓
Outbox events
   ↓
Provisioning/Offboarding tasks
```

SÖKÜM 31:

- actor,
- commandId,
- correlationId,
- task attempts,
- lifecycle transition audit

kanıtını sağlar.

SÖKÜM 32:

- retention,
- erasure,
- export,
- legal hold

kapanış task'larını sağlar.

SÖKÜM 33:

- integration revoke,
- webhook unsubscribe,
- provider resource release,
- reconciliation

kapanış task'larını sağlar.

---

## 19. KEEP / REWRITE / BUILD / DROP

### KEEP

- Mevcut onboarding UX ve veri toplama intent'i.
- Firestore-generated stable business id seed'i.
- Local preview oluşturma intent'i.
- HttpOnly JWT session primitive'i.
- Package activation/use-case intent'i.
- Cloud Tasks kullanımı.
- `basarisizSenaryolar` ile operator-visible failure seed'i.
- Telegram operational visibility intent'i.

### REWRITE

- Tenant creation command.
- Onboarding persistence/progress.
- Activation policy.
- Payment -> lifecycle orchestration.
- Package provisioning fan-out.
- Admin status/package actions.
- Suspension gating.
- Session lifecycle binding.
- Closure/offboarding.

### BUILD

- `BusinessTenant` lifecycle aggregate.
- lifecycle revision/CAS.
- `OnboardingRun`.
- `ProvisioningRun` + task graph.
- required capability readiness policy.
- central tenant capability gate.
- `OffboardingRun`.
- lifecycle audit events.
- reconciliation/completion proof.

### DROP after migration

- Raw `durum` string mutation as lifecycle authority.
- Onboarding request body package label as entitlement truth.
- hard-coded consent acceptance.
- in-memory `demo-esnaf` setup-progress as production path.
- `ACTIVE` write before required readiness.
- fire-and-forget required provisioning.
- admin raw `paket/aktifModuller/ayarlar/twilioNumarasi` mutation as orchestration.
- root tenant document deletion as offboarding completion.

---

## 20. Migration sırası

1. Existing `esnaflar.durum` values inventory çıkar.
2. Canonical `BusinessTenant.lifecycleStatus + revision` contract'ını ekle.
3. Legacy status values için compatibility projection tanımla.
4. New tenant creation'ı `CreateBusinessCommand` arkasına al.
5. Onboarding progress'i durable `OnboardingRun` yap.
6. Client package input'unu requested-plan seviyesine indir; effective entitlement'ı billing authority'den çöz.
7. Payment callback'in doğrudan ACTIVE yazmasını kaldır; `SubscriptionActivated/EntitlementChanged` event üret.
8. `ProvisioningRun` ve required/optional task ayrımını kur.
9. Existing site/VAPI/domain/message provisioning'i durable task'lara taşı.
10. Required-ready policy sonrası `ActivateBusinessCommand` uygula.
11. Session/request context'e tenant lifecycle gate ekle.
12. Admin status actions'ı explicit commands'a geçir.
13. Package/module raw admin writes'ı entitlement/capability authority'ye taşı.
14. Closure flow'u SÖKÜM 32 + 33 task graph'larına bağla.
15. Root DELETE endpoint'ini `BeginClosure` compatibility shell'e çevir.
16. Reconciliation proof olmadan `CLOSED` transition'ı engelle.
17. Legacy raw lifecycle writes telemetry ile sıfıra indir.
18. Son olarak direct lifecycle field mutation yollarını kapat.

---

## 21. Test matrisi

- onboarding submit success -> tenant yaratılmış varsayılmaz.
- duplicate CreateBusinessCommand -> tek tenant.
- onboarding complete retry -> duplicate tenant oluşmaz.
- client `paket=PREMIUMPLUS` gönderir -> entitlement kazanmaz.
- consent payload yok -> consent accepted event üretilmez.
- payment success -> provisioning başlar, required-ready olmadan ACTIVE olmaz.
- optional domain failure -> policy izin veriyorsa tenant ACTIVE, domain capability degraded/pending kalır.
- required provisioning failure -> `PROVISIONING_FAILED`, ACTIVE olmaz.
- provisioning job retry -> duplicate site/provider resource oluşturmaz.
- stale lifecycle revision -> command reject.
- invalid transition CLOSED -> ACTIVE -> reject unless explicit restore policy exists.
- SUSPENDED tenant mevcut JWT ile write/provider action dener -> fail-closed.
- suspension billing/support read access policy'si ayrı uygulanır.
- package downgrade -> tenant silinmez; entitlement diff uygulanır.
- admin package change -> billing/entitlement command olmadan effective capability değişmez.
- BeginClosure -> new campaigns/jobs/provider actions freeze edilir.
- closure sırasında integration revoke failure -> CLOSED olmaz.
- closure sırasında legal hold -> erasure task policy'ye göre blocked/retained olur.
- root document accidental delete -> offboarding success kabul edilmez.

---

## 22. Final karar

Kepenk'te bugün tenant lifecycle fiilen şu alanlara dağılmış durumda:

```text
esnaflar.durum
esnaflar.paket
aktifModuller
aktifWebModulleri
ayarlar.*
siteDurumu
provider resource fields
payment/package scenario side effects
admin mutations
```

Bunun yerine tek üst seviye model kurulmalıdır:

```text
BusinessTenant Lifecycle
      ↓
OnboardingRun
      ↓
ProvisioningRun
      ↓
ACTIVE / SUSPENDED / CLOSING
      ↓
OffboardingRun
      ↓
CLOSED
```

Alt domainler tenant state'i kendi field'larıyla yeniden icat etmemeli; canonical lifecycle event/policy tüketmelidir.

> **Kanonik invariant: Tenant `ACTIVE` ancak tanımlı minimum-ready-set gerçekten kullanılabilir olduğunda aktif olur; tenant `CLOSED` ancak required internal ve external offboarding task'ları reconciliation proof ile tamamlandığında kapanmış sayılır.**

SÖKÜM 34 bu kararla kapanır.
