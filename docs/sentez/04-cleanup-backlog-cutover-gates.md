# SENTEZ 4 — Cleanup Backlog + Cutover Gates

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Kaynak:** SÖKÜM 01–41 + SENTEZ 1–3 + frontend preservation contract  
> **Amaç:** Legacy Kepenk parçalarının hangi sırada emekliye ayrılacağını, hangi kanıtlar gelmeden writer/route/file/field silinemeyeceğini ve hangi yüzeylerin özel koruma altında olduğunu sabitlemek.  
> **Kural:** `DROP` bir delete komutu değildir. Her legacy authority bir retirement contract ve cutover gate üzerinden kapanır.

---

# 1. Retirement state machine

Her legacy write surface aşağıdaki yaşam döngüsünden geçer:

```text
DISCOVERED
  -> CLASSIFIED
  -> DEPRECATED
  -> ADAPTER_ONLY
  -> LEGACY_WRITE_DISABLED
  -> PARITY_OBSERVED
  -> CALLER_ZERO
  -> PERMISSION_REVOKED
  -> ARCHIVED
  -> DELETED
```

Bir adımın atlanması ancak güvenlik nedeniyle **hard cut** gereken P0 trust yüzeylerinde mümkündür.

### Hard-cut istisnası

Aşağıdaki sınıflarda insecure compatibility korunmaz:

- browser-bundled admin secret,
- unsigned session trust,
- fail-open production auth,
- raw shared-secret human authorization.

Bunlar replacement verifier hazır olduğunda doğrudan kapatılır.

---

# 2. Evrensel cutover gate

Bir legacy writer/route/file yalnız aşağıdakilerin tamamı sağlanırsa silinebilir:

1. Canonical replacement production request alabiliyor.
2. Stable ID mapping tamamlanmış.
3. Legacy caller inventory gözlem penceresinde sıfır authoritative write gösteriyor.
4. Legacy route varsa canonical command adapter'a inmiş veya artık çağrılmıyor.
5. Shadow/read parity kabul aralığında.
6. Unauthorized/cross-tenant negative test fail-closed.
7. Idempotency/replay davranışı doğrulanmış.
8. Audit/telemetry correlation request -> command -> job -> provider/domain sonucu zincirini gösterebiliyor.
9. Rollback stratejisi test edilmiş.
10. Legacy secret/permission/write ACL kaldırılmış.
11. Data migration/backfill/reconciliation tamamlanmış.
12. Protected frontend/public route bağımlılığı olmadığı doğrulanmış.

### Kritik kural

> **Caller=0 tek başına yeterli değildir. Permission/secret halen açıksa legacy writer dormant bir backdoor olarak yaşamaya devam eder.**

---

# 3. Cleanup öncelik katmanları

## C0 — Protected surfaces / dokunma

Bunlar cleanup hedefi değildir:

- `apps/web` Kepenk/KPNK ana marketing landing,
- root layout ve global design tokens,
- Navbar + landing section component'leri,
- public acquisition route shell,
- SEO/PWA/legal launch yüzeyleri,
- `apps/sites` public runtime shell,
- strong typed primitives: site-schema, renderer, publish-engine, templates,
- CRM v2 güçlü primitive'leri,
- booking/ecom schema semantics,
- real provider adapter know-how,
- agent/RAG algoritmik seed'leri.

Frontend için authoritative sözleşme: `docs/sentez/frontend-preservation-contract.md`.

Bu parçalar ancak bug/fix veya explicit product redesign kararıyla değişir; legacy cleanup bunları silmek için gerekçe değildir.

---

## C1 — P0 Trust / destructive authority retirement

İlk kapatılacak sınıf:

- raw/shared admin token yolları,
- browser bundle admin token,
- parçalı admin session authority,
- unsigned support session decode,
- arbitrary e-mail authorization,
- fail-open auth/dev-login/fixed OTP production yolu,
- root tenant hard-delete,
- simulated/no-op privacy purge,
- tenant root raw provider credential fields.

### Gate

- verified principal/session aktif,
- least privilege enforced,
- canonical command path aktif,
- audit event üretiliyor,
- destructive action reason/approval/policy bağlı,
- legacy secret/write permission kaldırılmış.

### Kural

Security hard-cut sonrası eski auth writer geri açılmaz.

---

## C2 — Tenant / commercial / entitlement duplicate truth

Emekliye ayrılacaklar:

- raw `durum` mutation,
- `paket`, `aktifModuller`, `aktifWebModulleri`, `ayarlar.*` authorization branches,
- admin `/esnaf` ve `/kota` direct field mutation davranışı,
- boolean capability/connection state'in business truth sayılması.

### Canonical replacement

```text
BusinessTenant
Subscription / Contract
EntitlementGrant
EffectiveCapabilitySet
Incident Policy
```

### Gate

- legacy fields yalnız projection/read compatibility,
- new writes canonical commands üzerinden,
- effective capability resolver bütün runtime gate'lerinde mandatory,
- admin direct patch caller=0.

Legacy field'ler ancak projection consumer'ları sıfırlandıktan sonra drop edilir.

---

## C3 — Site / publish / domain / asset duplicate writers

Emekliye ayrılacaklar:

- draft ile live/published state'i karıştıran autosave yolları,
- paralel site save/publish/version writers,
- provider domain state'i canonical domain truth sayan yollar,
- mutable URL'yi asset identity sayan eski alanlar,
- public forms/actions'ın core collection'a doğrudan yazdığı yollar.

### Canonical replacement

```text
SiteDraft
Asset Core
PublishCommand
PublishedSiteRevision
Active Publish Pointer
DomainBinding
Public Action Gateway
```

### Gate

- draft mutation active published revision'ı değiştirmiyor,
- artifact hash/immutability doğrulanıyor,
- domain deterministic aynı active publish'e resolve oluyor,
- rollback pointer switch ile çalışıyor,
- public action revision-bound canonical command üretiyor,
- `apps/sites` shadow-read parity başarılı.

### Frontend koruması

Kepenk ana marketing landing bu cleanup'ın parçası değildir. Yalnız CTA/data/copy rewire yapılabilir.

---

## C4 — CRM / messaging duplicate authorities

Emekliye ayrılacaklar:

- Mongo + Firestore dual CRM authority,
- legacy `/api/musteriler` direct CRUD writer,
- duplicate WhatsApp inbound/send yolları,
- duplicate Instagram webhook/tenant lookup,
- campaign provider direct-send yolları.

### Canonical replacement

```text
Customer Core
Customer identity aliases / merge
Conversation / Message
MessageIntent
Consent/Policy Gate
Durable Outbox
IntegrationConnection
Provider Event Inbox
```

### Gate

- customer identity mapping/backfill complete,
- legacy CRM store read-only,
- message send tek durable path,
- inbound provider event signature + dedupe,
- campaign yalnız MessageIntent üretir,
- old webhook/send callers=0.

---

## C5 — Integration / provider lifecycle cleanup

Emekliye ayrılacaklar:

- tenant doc'taki access/refresh token'lar,
- tenant doc'taki provider page/account/number/resource fields,
- boolean `connected` truth,
- route içinden unmanaged provider SDK side-effect,
- local field değiştiren sahte “sync” endpoint'leri,
- raw cron/admin bearer privileged provider mutations.

### Canonical replacement

```text
CredentialRef
IntegrationConnection
ProviderResourceBinding
WebhookSubscription
SyncCursor
Durable Job
Reconciliation
```

### Gate

- provider inventory reconcile edilmiş,
- resource -> connection -> tenant resolution deterministic,
- revoke/disconnect retry-safe,
- sync external provider state ile karşılaştırmalı,
- old raw secret fields purge edilmiş,
- duplicate provider ingress caller=0.

Provider resource satın alma capability korunur; authority Integration/Execution'a taşınır.

---

## C6 — Payment / Finance retirement

En yüksek veri bütünlüğü gate'ine sahip cleanup alanıdır.

Emekliye ayrılacaklar:

- Booking/Order/Restaurant içindeki authoritative payment status writer'ları,
- callback'ten direct `paid=true` mutation,
- Restaurant split-payment local success,
- mutable financial transaction/balance history,
- provider response object'ini financial truth sayan yollar.

### Canonical replacement

```text
PaymentIntent
ProviderAttempt
VerifiedPaymentResult
Refund lifecycle
Settlement / Reconciliation
Immutable Finance Ledger
Domain payment projections
```

### Gate

- provider replay duplicate payment/ledger event üretmiyor,
- minor-unit invariant doğrulanmış,
- refund request != actual refund,
- settlement/reconciliation farkı observable,
- Booking/Order/Restaurant projections ledger/Payment ile tutarlı,
- old accounting balance yalnız read projection,
- shadow period boyunca zero unexplained financial delta.

### Mutlak kural

Financial authority canonical cutover sonrası eski writer rollback amacıyla bile yeniden açılmaz.

---

## C7 — Agent / telemetry / audit / privacy cleanup

Emekliye ayrılacaklar:

- birden fazla agent runner/model selector authority,
- raw tool/provider mutation yapan agent yolları,
- `agent_logs`/console/Telegram'ı audit sayan davranış,
- sensitive raw payload logging,
- checkbox/root-delete seviyesinde privacy completion.

### Canonical replacement

```text
Single Agent Runtime
Capability Bus
Model Gateway
Result Verifier
Audit Ledger
Telemetry
Data Inventory
Consent / Retention / Erasure / Legal Hold
```

### Gate

- agent command scope enforced,
- success verified domain outcome'a bağlı,
- append-only audit mandatory,
- telemetry redaction/retention aktif,
- erasure plan per-resource proof üretiyor,
- legal hold offboarding'i doğru biçimde bloklayabiliyor.

---

## C8 — Vertical cleanup / activation

### Restaurant

Gerçek legacy runtime writer vardır.

Retire/adapt:

- table/order writers -> Restaurant commands,
- payment karışmış routes -> Payment ayrımı,
- offline sync -> canonical conflict/reconciliation,
- KDS/waiter state -> Restaurant authority.

Gate:

- table/session/adisyon parity,
- verified payment projection,
- offline conflict tests,
- no lost/duplicate kitchen/order transition.

### Support

Gerçek ticket create writer vardır.

Retire/adapt:

- unsigned identity,
- arbitrary email reads,
- demo operator state truth,
- confidence-only close/autosend intent.

Gate:

- verified SupportCase authority,
- case event history,
- ownership authorization,
- durable SLA/timer if full activation enabled.

### Marketplace

Cleanup değil **greenfield activation** alanıdır.

- demo/local state business data olarak migrate edilmez,
- UX + Job/Bid vocabulary korunur,
- runtime core canonical dependencies üzerinde kurulur.

### Procurement

Cleanup değil **greenfield activation** alanıdır.

- demo/local state business data olarak migrate edilmez,
- supplier/PO/reorder semantics korunur,
- Inventory/Finance/Integration authority'leri tekrar icat edilmez.

---

# 4. File / route disposition sınıfları

Her exact file daha sonraki implementation backlog'unda aşağıdaki etiketlerden birini alır:

| Etiket | Anlam |
|---|---|
| `PRESERVE` | Ürün/UX/core primitive olduğu gibi korunur |
| `REWIRE` | Caller/data source/command boundary değişir |
| `ADAPTER` | Legacy route geçici olarak canonical command'a yönlendirir |
| `PROJECTION` | Eski field/read model canonical event'ten türetilir |
| `HARD-CUT` | Güvensiz trust yolu replacement hazır olur olmaz kapanır |
| `ARCHIVE` | Caller=0, runtime dışı; kısa süre tarihsel referans için tutulur |
| `DELETE` | Bütün cutover gate'leri geçmiş, archive/recovery ihtiyacı kalmamış |
| `GREENFIELD` | Demo/type seed; gerçek authority yeni canonical runtime olarak kurulur |

Frontend ana landing ve public marketing surface varsayılan olarak `PRESERVE + CONTENT REWIRE` sınıfındadır.

---

# 5. Cleanup backlog sırası

Önerilen execution sırası:

```text
B0  Baseline / caller telemetry / protected surfaces
B1  P0 auth + admin + destructive trust hard cuts
B2  Tenant / subscription / entitlement writer convergence
B3  Credential / integration / webhook writer convergence
B4  Site / publish / domain / asset writer convergence
B5  Customer / messaging writer convergence
B6  Payment / finance writer convergence
B7  Commerce / analytics / marketing projections
B8  Agent runtime / audit / telemetry / privacy convergence
B9  Restaurant + Support legacy writer retirement
B10 Marketplace + Procurement greenfield activation
B11 Zero-caller route/package/field archive
B12 Final delete + schema/permission/secret cleanup
```

Bu sıra SENTEZ 3 wave'lerini tersine kopyalamaz. Cleanup yalnız replacement authority ilgili wave'de production gate'i geçtiğinde ilerler.

---

# 6. Protected deletion deny-list

Aşağıdakiler explicit review olmadan archive/delete edilemez:

- `apps/web/src/app/page.tsx`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/globals.css`
- `apps/web/src/components/layout/Navbar.tsx`
- `apps/web/src/components/sections/*`
- public marketing/acquisition route shell
- `apps/sites` public runtime shell
- `packages/site-schema`
- `packages/renderer`
- `packages/publish-engine`
- `packages/templates`
- CRM v2 canonical seed files
- booking/ecom schema primitives
- verified provider adapter primitives
- frontend public assets used by launch surface

Bu deny-list “sonsuz dokunulmazlık” değildir; amacı cleanup ile ürün emeğinin yanlışlıkla birlikte atılmasını engellemektir.

---

# 7. Delete öncesi kanıt paketi

Her delete PR/task aşağıdaki evidence paketini taşımalıdır:

```text
legacyId / path
canonicalReplacement
caller evidence
last authoritative write timestamp
parity/reconciliation result
security negative-test result
rollback note
permission/secret removal proof
frontend/public dependency check
owner approval
```

Payment/privacy/security alanlarında ek proof zorunludur.

### Payment

- ledger reconciliation,
- provider replay/idempotency,
- refund/settlement consistency.

### Privacy

- erasure/export/legal-hold proof.

### Security/Admin

- alternate auth path olmadığı,
- secret rotation/revocation tamamlandığı.

---

# 8. Archive politikası

Archive, production authority değildir.

Archive edilen legacy kod:

- runtime import graph'ından çıkar,
- secret/permission taşımaz,
- deployment artifact'ına girmez,
- production data write yapamaz,
- yalnız tarihsel migration/debug referansı olarak kısa süre tutulabilir.

Thin contract package'lar (`voice`, `studio`, `blog`, `seo`, `influencer`) otomatik archive edilmez. İhtiyaç halinde extension seed olarak korunabilirler.

---

# 9. Frontend launch gate tekrar kilidi

Public Kepenk launch surface cleanup tamamlandı diye otomatik deploy-ready sayılmaz.

Launch öncesi minimum:

1. `@kepenk/web` production build başarılı.
2. Root `/` browser smoke başarılı.
3. Navbar/public link crawl kritik 404 üretmiyor.
4. 360/390 mobile + desktop smoke.
5. Hero -> CTA -> registration/onboarding akışı çalışıyor.
6. Pricing/capability copy current commercial truth ile uyumlu.
7. Claim/testimonial proof review tamam.
8. SEO metadata/robots/sitemap `kepenk.ai` ile uyumlu.
9. Legal routes erişilebilir.
10. Visual baseline screenshot/reference ile korunmuş.

Bu gate frontend'i silme değil **yayına çıkarma** gate'idir.

---

# 10. SÖKÜM 01–41 cleanup coverage kuralı

SENTEZ 3 her sökümü bir migration wave'e map etti. SENTEZ 4'te her sökümün sonucu aşağıdaki cleanup sınıflarından en az birine düşmek zorundadır:

```text
PRESERVE
REWIRE
ADAPTER
PROJECTION
HARD-CUT
GREENFIELD
ARCHIVE-after-gate
DELETE-after-gate
```

Dolayısıyla 01–41'in hiçbir çıktısı “sentezde unutulduğu için” ortadan kaldırılamaz.

---

# 11. Ana karar

> **Kepenk cleanup bir dosya temizliği değil, authority emeklilik sürecidir. Önce canonical replacement çalışır, sonra legacy writer sessizleştirilir, en son dosya silinir. Kullanıcı emeği taşıyan public frontend ve güçlü primitive'ler cleanup hedefi değil, v2'nin korunacak varlıklarıdır.**
