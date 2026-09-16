# SÖKÜM 35 - Entitlement / Capability / Module / Feature Flag Runtime Authority

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Verdict:** **KEEP package catalog/module metadata, quota intent and release feature flags as separate inputs; REWRITE runtime authorization behind one server-side `EffectiveCapabilitySet`; BUILD explicit entitlement policy, quota/dependency evaluation and provision/deprovision transitions; CONNECT dashboard, public site, workers, provider adapters and domain commands to the same capability resolver; DROP package-string authorization, client-writable module truth and stale `ayarlar.*` booleans as canonical capability authority after migration.**

## 1. Neyi doğruladık?

SÖKÜM 12 billing/package tarafındaki ticari modeli, SÖKÜM 29 identity/trust boundary'yi, SÖKÜM 33 integration lifecycle'ını ve SÖKÜM 34 tenant lifecycle'ını zaten kapattı.

Bu tur yalnız şu soruya baktı:

> Bir tenant belirli bir özelliği **şu anda gerçekten kullanabilir mi** sorusunun tek authoritative cevabı var mı?

Temsilci gerçek yollar:

- `apps/web/src/data/paketler.ts`
- `apps/web/src/data/moduller.ts`
- `apps/web/src/utils/paketSenaryosu.ts`
- `apps/web/src/app/api/esnaf/sync-moduller/route.ts`
- `apps/web/src/lib/mvpFeatureFlags.ts`
- `apps/web/src/agents/agentRunner.ts`
- `apps/web/src/app/api/domain/sec/route.ts`
- `apps/web/src/lib/firebaseAdmin.ts`

Ana sonuç:

> Repoda capability gerçeği tek yerde yaşamıyor. Package adı, module projection'ları, `ayarlar.*` boolean'ları, global feature flags, quota kayıtları, provider connection varlığı ve bazı route-level hard-coded package kontrolleri paralel authorization sinyalleri olarak kullanılıyor.

Bu nedenle bugün aynı tenant için farklı runtime yüzeyleri farklı cevap verebilir.

---

## 2. Package catalog değerlidir ama runtime authorization değildir

`apps/web/src/data/paketler.ts` merkezi fiyat/paket metadata'sı taşıyor:

```text
Paket {
  id
  name
  aylikFiyat
  yillikFiyatAylik
  aiKredi
  ozellikler[]
}
```

Ayrıca:

```text
PAKET_KOTALARI {
  TEMEL: 100
  STANDART: 250
  BUYUME: 750
  PREMIUM: 2000
  PREMIUMPLUS: 5000
}
```

bulunuyor.

Bu iyi bir **commercial catalog input**'udur.

Fakat `ozellikler[]` insan-okunur label'lardır. Bunlar canonical machine capability kimliği değildir.

### KEEP

- plan catalog fikri,
- fiyat/kota metadata'sının merkezi tutulması,
- backward compatibility projection'ları migration boyunca.

### REWRITE

Package adı doğrudan authorization cevabı vermemeli.

Doğru ilişki:

```text
Subscription / Contract
        ↓
Plan Catalog
        ↓
Entitlement Policy
        ↓
Effective Capability Set
```

olmalıdır.

---

## 3. Module catalog ikinci bir capability policy dünyası kuruyor

`apps/web/src/data/moduller.ts` her modül için:

```text
Modul {
  id
  minPaket
  ...
}
```

saklıyor.

`modulKullanilabilir()` ise package sırasını karşılaştırıyor:

```text
TEMEL < STANDART < BUYUME < PREMIUM < PREMIUMPLUS
```

ve `esnafModulleri(sektor, paket)` buradan allowed module listesi üretiyor.

Bu iyi bir başlangıç policy primitive'idir.

Ancak bugün module policy:

- commercial plan policy,
- sector availability,
- public site composition,
- backend capability authorization

rollerinin bir bölümünü aynı anda taşımaya çalışıyor.

### Karar

`minPaket` metadata'sı policy input olarak kalabilir.

Fakat canonical output module listesi değil, typed capability set olmalıdır.

Örnek:

```text
site.contact_form.render
booking.public.create
commerce.checkout.create
ads.manage
domain.gift.claim
ai.agent.run
messaging.whatsapp.send
```

Module bir UI/site projection olabilir. Capability ise server authorization gerçeğidir.

---

## 4. Ödeme sonrası package activation birden fazla projection yazıyor

`paketSenaryosuCalistir()` package aktivasyonunda aynı tenant için farklı truth alanları üretiyor:

```text
paket
aktifModuller[]
ayarlar.googleYorumTakip
ayarlar.sabahMesaji
ayarlar.reklamYonetimi
ayarlar.randevuSistemi
ayarlar.leadMadencisi
ayarlar.customDomain
ayarlar.vipDestek
vapiAktif
```

Aynı fonksiyon ayrıca provisioning side effect'leri başlatıyor:

- VAPI agent,
- site generation,
- content generation,
- domain gift flow,
- WhatsApp/email/Telegram mesajları.

Yani package change bugün yalnız entitlement update değildir.

```text
package selection
   ↓
root fields + settings flags + module projections + provider provisioning
```

şeklinde fan-out olur.

### Sorun

Bir projection başarısız olursa hangi alan authoritative kalacak belli değildir.

Örneğin:

```text
paket = PREMIUM
ayarlar.customDomain = true
aktifModuller = ...
vapiAktif = false / missing
```

kombinasyonu mümkün olabilir.

Canonical capability resolver bu parçalı state'i truth kabul etmemelidir.

---

## 5. Downgrade için simetrik deprovision görünmüyor

`paketSenaryosuCalistir()` üst paketlerde birçok boolean'ı `true` yapıyor.

Ancak daha düşük pakete geçişte önceki üst-plan alanlarını sistematik olarak `false` yapan, provider resource'u kapatan veya scheduled capability'yi durduran simetrik bir deprovision planı görünmüyor.

Örnek stale state riski:

```text
PREMIUM
  ↓
ayarlar.customDomain = true
ayarlar.leadMadencisi = true
vapiAktif = true

sonra TEMEL
  ↓
paket = TEMEL
aktifModuller yeniden hesaplanabilir
ama eski flags/provider resources kalabilir
```

### Invariant

> Upgrade ve downgrade aynı policy diff mekanizmasının iki yönü olmalıdır.

```text
old EffectiveCapabilitySet
          ↓ diff
new EffectiveCapabilitySet
          ↓
ProvisionTask[] + DeprovisionTask[]
```

---

## 6. `aktifModuller` ve `aktifWebModulleri` aynı truth değil

`paketSenaryosuCalistir()` package/sector üzerinden:

```text
aktifModuller
```

hesaplıyor.

Buna karşılık `/api/esnaf/sync-moduller` authenticated session sonrası request body'deki:

```text
moduller[]
```

listesini doğrudan:

```text
aktifWebModulleri
siteJson.moduller
```

alanlarına yazıyor.

Bu endpoint içinde:

- effective package entitlement recompute,
- `minPaket` validation,
- dependency validation,
- server-side allowed-set intersection

görünmüyor.

### Kritik ayrım

```text
Allowed capability != Enabled preference
```

Tenant bir capability'ye **entitled** olabilir fakat kullanıcı onu kapatabilir.

Doğru model:

```text
EntitledCapabilitySet
        ∩
TenantFeaturePreferences
        ↓
EffectiveCapabilitySet
```

Client yalnız preference değiştirebilir. Entitlement yaratamaz.

---

## 7. `ayarlar.*` boolean'ları capability authority olamaz

Bugün feature availability çeşitli root/nested boolean'larla temsil ediliyor.

Bunlar üç farklı şeyi karıştırıyor:

1. tenant özelliğe sahip mi?
2. tenant özelliği etkinleştirdi mi?
3. dependency gerçekten hazır mı?

Örneğin reklam yönetimi için:

```text
entitled: ads.manage
preference: enabled
integration: CONNECTED
provider health: HEALTHY
quota: available
```

gerekebilir.

Tek bir:

```text
ayarlar.reklamYonetimi = true
```

bu gerçeklerin hiçbirini tek başına kanıtlamaz.

### Karar

Legacy `ayarlar.*` alanları migration sırasında read-model/projection olarak kalabilir.

Authorization kaynağı olamaz.

---

## 8. Global feature flag ile commercial entitlement ayrılmalı

`mvpFeatureFlags.ts` deploy/test-release seviyesinde global flag'ler içeriyor:

```text
siteEditor
siteGeneration
domainManagement
agents
payments
twilioMessaging
cloudflarePublish
adsMarketing
ecommerce
restaurantOs
finance
...
```

Bu primitive değerlidir.

Ancak bu flag'in semantiği:

> ürün bu environment/release'te genel olarak kullanılabilir mi?

Commercial entitlement'ın semantiği ise:

> bu tenant bu capability'ye sözleşme/policy gereği sahip mi?

Bunlar birleşmemelidir.

Canonical evaluation örneği:

```text
ReleaseFlag ON
   AND
Tenant Entitled
   AND
Tenant ACTIVE
   AND
Preference Enabled
   AND
Dependency Healthy
   AND
Quota Available
        ↓
Runtime Allowed
```

Her katman farklı reason code üretmelidir.

---

## 9. Backend agent runtime entitlement gate taşımıyor

`runAgent()` girişinde doğrulanan korumalar:

- max hop,
- model circuit breaker,
- provider/model execution.

Fakat doğrulanan akışta:

- tenant subscription,
- package capability,
- `agents.use` entitlement,
- monthly quota,
- dependency state

üzerinden merkezi capability authorization yapılmıyor.

`esnafId` çoğunlukla context/logging/sektörel data resolution için kullanılıyor.

### Risk

Bir upstream route/worker yanlış veya eksik authorize edilirse agent runtime ikinci bir fail-closed gate sağlamıyor.

### Karar

Domain/service entrypoint şu tip bir check yapmalıdır:

```text
requireCapability(ctx, 'ai.agent.run', {
  cost: 1,
  dependency: 'ai-provider'
})
```

Model runner policy'yi yeniden icat etmemeli; canonical capability service'ten karar almalıdır.

---

## 10. Route'lar hâlâ package string ile authorization yapıyor

`/api/domain/sec` doğrudan tenant record'daki:

```text
esnaf.paket
```

alanına bakıp yalnız:

```text
PREMIUM | PREMIUMPLUS
```

için domain hediyesi açıyor.

Bu ticari niyetle uyumlu olabilir fakat boundary yanlış seviyededir.

Sorulması gereken:

```text
hasCapability(ctx, 'domain.gift.claim') ?
```

olmalıdır.

### Neden?

Çünkü gelecekte capability:

- add-on,
- grandfathered contract,
- temporary promotion,
- admin exception,
- custom enterprise contract

ile package isminden bağımsız değişebilir.

Package string'e gömülü authorization bu esnekliği engeller.

---

## 11. Quota capability'den ayrı fakat aynı evaluator'ın parçası olmalı

Package catalog AI işlem kotaları tanımlıyor. Firestore helper'larında aylık kredi kullanım state'i de bulunuyor.

Quota iki farklı kavramı ayırmalıdır:

```text
entitled = özelliği kullanma hakkı var
quotaRemaining = bu dönem ne kadar kullanım kaldı
```

Quota bitince capability sözleşmeden silinmez.

Runtime result örneği:

```text
CapabilityDecision {
  capability: 'ai.agent.run'
  entitled: true
  allowed: false
  reason: 'QUOTA_EXHAUSTED'
  quotaRemaining: 0
}
```

Bu ayrım billing, UI, retry ve support davranışını sadeleştirir.

---

## 12. Dependency health capability kararının ayrı girdisidir

Bazı capability'ler yalnız package hakkı ile çalışamaz.

Örnek:

```text
ads.manage
  requires IntegrationConnection(meta/google) CONNECTED

messaging.whatsapp.send
  requires messaging resource binding READY

commerce.checkout.create
  requires payment connection HEALTHY

domain.gift.claim
  requires registrar provisioning capability
```

SÖKÜM 33'te canonical `IntegrationConnection` lifecycle'ı bu yüzden kurulmuştu.

### Karar

Entitlement policy provider health'i kendi içine kopyalamamalı.

Capability evaluator dependency authority'lerinden status okuyup final runtime decision üretmelidir.

---

## 13. Canonical model

Önerilen temel ayrım:

```text
EntitlementGrant {
  grantId
  tenantId
  capability
  sourceType: subscription | addon | promotion | admin_override | migration
  sourceId
  validFrom
  validUntil?
  status
  reason?
  revision
}
```

Tenant preference:

```text
CapabilityPreference {
  tenantId
  capability
  enabled
  updatedBy
  updatedAt
}
```

Runtime projection:

```text
EffectiveCapability {
  tenantId
  capability
  entitled
  preferenceEnabled
  releaseEnabled
  tenantLifecycleAllowed
  dependencyStatus
  quotaPolicy?
  allowed
  reasonCode
  policyRevision
}
```

Fast read model:

```text
EffectiveCapabilitySet {
  tenantId
  revision
  generatedAt
  capabilities: Record<CapabilityKey, CapabilityDecision>
}
```

---

## 14. Canonical evaluation sırası

Runtime karar sırası deterministic olmalıdır:

```text
1. RequestContext / tenant authority
2. Tenant lifecycle gate
3. Global release flag
4. Entitlement grant
5. Tenant preference
6. Capability dependency health
7. Quota / rate policy
8. Domain-specific preconditions
9. ALLOW / DENY + reason code
```

Örnek deny reason family:

```text
TENANT_SUSPENDED
RELEASE_DISABLED
NOT_ENTITLED
USER_DISABLED
DEPENDENCY_NOT_READY
REAUTH_REQUIRED
QUOTA_EXHAUSTED
POLICY_MISMATCH
```

Bu reason code UI, logs, audit ve support tarafından aynı anlamla kullanılmalıdır.

---

## 15. Admin override açık bir grant olmalı

Admin/operator bir capability açabiliyorsa bu raw field mutation olmamalıdır.

Örnek:

```text
GrantCapabilityOverrideCommand {
  tenantId
  capability
  reason
  expiresAt
  requestedBy
  idempotencyKey
  expectedRevision
}
```

Override:

- süreli olabilir,
- reason zorunlu olmalıdır,
- actor audit'e girmelidir,
- normal subscription grant'inden ayırt edilmelidir,
- revoke edilebilir olmalıdır.

Permanent gizli boolean istisnası bırakılmamalıdır.

---

## 16. Upgrade / downgrade state machine

Plan değişikliğinde yalnız `paket` string'i değiştirilmemelidir.

Canonical akış:

```text
SubscriptionChanged
       ↓
recompute EntitlementGrant set
       ↓
old effective set vs new effective set
       ↓
CapabilityDiff
  ├── added[]
  ├── removed[]
  └── changedQuota[]
       ↓
Provision / Deprovision tasks
       ↓
rebuild capability read model
       ↓
Audit + Outbox
```

Capability kaldırıldığında ilgili resource hemen fiziksel olarak silinmek zorunda değildir.

Fakat yeni kullanım fail-closed olmalı ve lifecycle policy şunlardan birini seçmelidir:

```text
DISABLED
READ_ONLY
GRACE_PERIOD
DEPROVISIONING
RETAINED_UNTIL
```

---

## 17. Public site modules capability projection'dır

Site draft/published manifest içinde görünür modüller authorization authority olmamalıdır.

Doğru sıra:

```text
EffectiveCapabilitySet
        ↓
Site capability projection
        ↓
Editor allowed modules
        ↓
SiteDraft
        ↓
Publish validation
```

Publish sırasında draft içindeki capability gerektiren component'ler yeniden doğrulanmalıdır.

Böylece client eski/premium module id'sini elle gönderse bile publish geçmez.

SÖKÜM 28 public action capability modeli de aynı authority'ye bağlanmalıdır.

---

## 18. Feature flag taxonomy

Tek `feature flag` kavramı altında dört farklı şeyi toplamayalım.

```text
ReleaseFlag
  platform rollout / kill switch

EntitlementGrant
  commercial/contractual right

CapabilityPreference
  tenant/user enable-disable preference

OperationalHealth
  dependency/provider/runtime availability
```

Bunların hiçbiri diğerinin yerine geçmez.

Örnek:

```text
adsMarketing release flag = true
ads.manage entitlement = true
preference = true
Meta connection = EXPIRED
```

sonuç:

```text
allowed = false
reason = REAUTH_REQUIRED
```

olmalıdır.

---

## 19. KEEP / REWRITE / BUILD / DROP

### KEEP

- package catalog metadata,
- module catalog ve `minPaket` intent'i,
- sector-module mapping fikri,
- quota metadata intent'i,
- MVP/release kill-switch fikri,
- package sonrası provisioning aksiyonlarının ürün niyeti.

### REWRITE

- package string doğrudan route authorization,
- `aktifModuller` / `aktifWebModulleri` / `ayarlar.*` parallel truth kullanımı,
- package activation sırasında ad hoc capability side effect'leri,
- module toggle API'sinin client listesini entitlement truth gibi yazması,
- agent/provider runtime'ın upstream authorization'a kör güvenmesi.

### BUILD

- canonical capability registry,
- EntitlementGrant authority,
- EffectiveCapabilitySet resolver/read model,
- quota decision contract,
- dependency-aware evaluator,
- capability diff engine,
- durable provision/deprovision workflow,
- audited expiring admin overrides,
- server-side module intersection/publish validation.

### DROP after migration

- raw package-name authorization,
- stale boolean capability authority,
- client-writable entitlement/module truth,
- silent premium capability retention after downgrade,
- release flag ile commercial entitlement'ın aynı anlamda kullanılması.

---

## 20. Migration sırası

### Aşama 1: Capability registry

Mevcut package/module/settings alanlarından machine capability envanteri çıkar.

Örnek:

```text
site.publish
site.custom_domain
booking.public.create
messaging.whatsapp.send
ads.manage
commerce.checkout.create
ai.agent.run
reports.weekly
support.vip
```

### Aşama 2: Policy projection

Mevcut paket catalog + module `minPaket` verisinden entitlement policy üret.

### Aşama 3: Shadow evaluator

Yeni evaluator mevcut davranışı değiştirmeden karar üretip legacy kararlarla karşılaştırılır.

Mismatch observability'ye yazılır.

### Aşama 4: Server runtime gates

Önce yüksek etkili mutation boundary'leri:

```text
payment
messaging
provider actions
domain provisioning
AI spend
public booking/commerce actions
```

canonical `requireCapability()` kullanır.

### Aşama 5: Module/editor projection

`sync-moduller` client listesi server-side entitled-set ile kesiştirilir. Publish de capability closure doğrular.

### Aşama 6: Upgrade/downgrade diff

Plan değişimleri durable provision/deprovision workflow'a taşınır.

### Aşama 7: Legacy fields projection olur

`aktifModuller`, `aktifWebModulleri`, `ayarlar.*` yalnız compatibility/read projection olarak güncellenir, authorization kaynağı olmaktan çıkar.

---

## 21. Critical invariants

1. Client package/module payload'ı entitlement yaratamaz.
2. Package adı runtime authorization authority değildir.
3. Her protected mutation canonical capability decision kullanır.
4. Tenant `SUSPENDED/CLOSING/CLOSED` ise entitlement olsa bile mutation fail-closed olur.
5. Release flag commercial entitlement yaratamaz.
6. Commercial entitlement release kill-switch'i aşamaz.
7. Tenant preference entitlement sınırını genişletemez.
8. Quota exhaustion grant'i silmez; runtime deny reason üretir.
9. Dependency `REAUTH_REQUIRED/DEGRADED` ise dependent capability policy'ye göre deny/read-only olur.
10. Upgrade/downgrade diff idempotent olmalıdır.
11. Removed capability yeni job/action oluşturamaz.
12. Deprovision failure capability'yi yeniden usable yapmaz.
13. Admin override explicit, audited, reasoned ve gerektiğinde expiring olmalıdır.
14. Public site component/module entitlement'ı publish sırasında server-side doğrulanmalıdır.
15. `aktifModuller`, `aktifWebModulleri`, `ayarlar.*` canonical truth değildir.
16. Agent/provider runners upstream route'un doğru authorize ettiğini varsayarak privileged bypass oluşturmamalıdır.
17. Effective set revisioned olmalıdır; stale cache invalidation mümkün olmalıdır.
18. Capability decision reason code deterministic ve observable olmalıdır.
19. Same policy inputs same effective set üretmelidir.
20. Tenant resource lifecycle SÖKÜM 33-34 authority'leriyle capability state arasında drift reconciliation bulunmalıdır.

---

## 22. Smoke probes

- TEMEL tenant premium module id gönderir -> server reject/intersection.
- PREMIUM -> TEMEL downgrade -> removed capabilities anında yeni kullanım için deny.
- downgrade sırasında provider deprovision fail -> capability yine deny, reconciliation açık kalır.
- release flag OFF + entitled tenant -> deny `RELEASE_DISABLED`.
- release flag ON + not-entitled tenant -> deny `NOT_ENTITLED`.
- entitlement + preference OFF -> deny `USER_DISABLED`.
- entitlement + provider expired -> deny `REAUTH_REQUIRED`.
- entitlement + quota 0 -> deny `QUOTA_EXHAUSTED`.
- admin override expires -> capability otomatik normal policy'ye döner.
- same plan-change event replay -> duplicate provisioning oluşturmaz.
- public draft eski premium module taşır -> publish fail/strip according to policy.
- direct backend agent call without `ai.agent.run` -> fail-closed.
- domain gift route custom entitled tenant için package adına bakmadan çalışır.
- suspended tenant active session ile mutation dener -> fail-closed.
- capability read cache eski revision -> refresh/invalidate.

---

## 23. Son karar

Kepenk'te package, module, settings, quota ve feature flag primitives'leri değerli, fakat bugün bunlar tek bir runtime authority oluşturmuyor.

Canonical hedef:

```text
Subscription / Contract
        ↓
Entitlement Policy
        ↓
EntitlementGrant[]
        ↓
+--------------------------------+
| Tenant lifecycle               |
| Release flags                  |
| Tenant preferences             |
| Quotas                         |
| Integration/resource health    |
+--------------------------------+
        ↓
EffectiveCapabilitySet
        ↓
+--------------------------------+
| Dashboard / APIs               |
| Public Action Gateway          |
| Site Editor / Publish          |
| Workers / Schedulers           |
| Provider Adapters              |
| AI / Messaging / Commerce      |
+--------------------------------+
        ↓
Audit + Outbox + Provisioning
```

En önemli cümle:

> **Bir capability'nin varlığı package string'i veya mutable boolean ile değil, server-side effective policy decision ile kanıtlanmalıdır.**
