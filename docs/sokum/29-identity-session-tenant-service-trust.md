# SÖKÜM 29 - Identity / Session / Tenant Context / API Guard / Service Trust Boundary

> **Tarih:** 2026-09-15  
> **Durum:** KAPALI  
> **Verdict:** **KEEP the fail-closed session-secret intent, OTP persistence/rate-limit intent, Firestore RBAC model, GCP OIDC verifier seed, timing-safe comparisons and AES-GCM credential encryption; REWRITE identity around explicit User + Membership + Session + RequestContext authorities, unify admin and impersonation into the same trust graph, make service and webhook identity audience/provider bound and fail closed; DROP production dev-login, fixed OTP fallback, cookie-presence authorization, raw global admin/cron bearer authority, unauthenticated privileged workers and unverified payment webhooks.**

## 1. Neyi doğruladık?

SÖKÜM 28 public visitor tarafındaki mutation capability sınırını kapattı. Bu turda sistemin iç tarafında bir request'in kim adına, hangi tenant içinde ve hangi yetkiyle çalıştığını gerçek route ve helper akışları üzerinden doğruladık.

Başlıca incelenen parçalar:

- `apps/web/src/lib/sessionManager.ts`
- `apps/web/src/lib/esnafOwnership.ts`
- `apps/web/src/lib/apiGuard.ts`
- `apps/web/src/proxy.ts`
- `apps/web/src/auth.ts`
- `apps/web/src/app/api/auth/giris-kodu-gonder/route.ts`
- `apps/web/src/app/api/auth/giris-kodu-dogrula/route.ts`
- `apps/web/src/app/api/auth/me/route.ts`
- `apps/web/src/app/api/auth/google/route.ts`
- `apps/web/src/app/api/auth/dev-login/route.ts`
- `apps/web/src/app/api/auth/demo-login/route.ts`
- `apps/web/src/app/api/auth/onboarding-otp-gonder/route.ts`
- `apps/web/src/app/api/auth/onboarding-otp-dogrula/route.ts`
- `apps/web/src/app/api/onboarding/complete/route.ts`
- `apps/web/src/app/api/admin/login/route.ts`
- `apps/web/src/app/api/admin/impersonate/route.ts`
- `apps/web/src/lib/impersonation.ts`
- `apps/web/src/lib/gcpAuthGuard.ts`
- `apps/web/src/lib/cloudTasksClient.ts`
- `apps/web/src/app/api/cron/data-purge/route.ts`
- `apps/web/src/app/api/cron/kuyruk-isleyici/route.ts`
- `apps/web/src/app/api/workers/site-ureticisi/route.ts`
- `apps/web/src/app/api/webhooks/food-delivery/route.ts`
- `apps/web/src/app/api/webhooks/iyzico-kapora/route.ts`
- `apps/web/src/app/api/domain/sec/route.ts`
- `apps/web/src/app/api/site/versiyonlar/route.ts`
- `apps/web/src/app/api/esnaf/sync-moduller/route.ts`
- `firestore.rules`
- `apps/web/src/lib/envReadiness.ts`
- `apps/web/src/lib/tokenSifreleme.ts`

Ana sonuç:

> Kepenk'te bugün tek bir trust graph yoktur. Merchant custom JWT, NextAuth admin, raw admin secret, impersonation JWT, cron secret, Cloud Task secret, GCP OIDC ve provider webhook trust modelleri yan yana yaşamaktadır. Bazı parçalar güvenli niyet taşırken aralarındaki sözleşme kopuktur ve birkaç kritik route fail-open davranmaktadır.

En ciddi sonuçlar:

1. Onboarding OTP doğrulaması ile tenant/session yaratma arasında bağ yoktur. `/api/onboarding/complete` doğrudan yeni tenant ve session oluşturabilir.
2. Onboarding SMS başarısızlığında sabit `123456` OTP devreye girer ve bu environment ile sınırlandırılmamıştır.
3. `/api/cron/kuyruk-isleyici` auth olmadan AI çalıştırabilir, WhatsApp gönderebilir ve queue state değiştirebilir.
4. `/api/webhooks/iyzico-kapora` provider doğrulaması olmadan request body'deki ödeme başarısını gerçek kabul edip randevu onaylayabilir.
5. `food-delivery` webhook imza kontrolü secret veya signature eksikse tamamen atlanır.
6. Dashboard proxy custom session cookie'yi doğrulamak yerine yalnız varlığını kontrol eder.
7. Admin login'in ürettiği cookie ile proxy'nin doğruladığı admin cookie contract'ı aynı değildir.
8. `domain/sec` ve `site/versiyonlar` gibi bazı tenant mutation route'ları hâlâ request body/query içindeki `esnafId`yi authority olarak kabul eder.

Bu yüzden bu turdaki temel karar şudur:

> **Tenant identity bir request parametresi değildir. Authorization bir route içi if değildir. Her privileged request önce canonical bir RequestContext'e çözülmelidir.**

---

## 2. Bugün kaç ayrı identity dünyası var?

Doğrulanan kodda en az şu trust dünyaları bulunuyor:

```text
A. Merchant custom session
   kepenk_session
   HS256 JWT
   payload ~= esnafId

B. Admin NextAuth session
   auth.ts
   JWT strategy
   admin_users

C. Legacy/raw admin authority
   x-admin-token
   ADMIN_SECRET_TOKEN

D. Admin cookie session
   admin_token
   process-local ADMIN_SESSIONS

E. Impersonation session
   kepenk_impersonate
   ayrı HS256 JWT

F. Cron / worker shared secret
   CRON_SECRET
   x-cron-secret / x-cloud-task-secret / Bearer

G. ADK service token
   ADK_SERVICE_TOKEN

H. GCP OIDC service identity
   Google ID token
   service account email

I. Provider webhook secrets
   Yemeksepeti / Trendyol HMAC
   Iyzico callback/webhook

J. Firestore client RBAC intent
   Firebase Auth custom claims
   request.auth.token.sites[siteId]
```

Bu çeşitlilik tek başına hata değildir. Browser user, platform admin, service account ve external provider doğal olarak farklı credential kullanabilir.

Sorun şudur:

> Hepsi sonunda ortak bir principal, tenant context ve capability modeline çözülmüyor.

---

## 3. Merchant session iyi bir başlangıç ama tenant üyeliği değildir

`sessionManager.ts` içindeki merchant oturumu:

```text
kepenk_session
  -> signed JWT
  -> esnafId
  -> 7 gün TTL
```

HttpOnly ve SameSite Strict cookie kullanımı doğru yöndedir. Production ortamında default `SESSION_SECRET` kullanımını reddetmesi de değerlidir.

Fakat token'ın semantic authority'si fazla büyüktür.

Session şunları taşımıyor veya doğrulama sırasında resolve etmiyor:

- user identity
- membership identity
- role
- membership status
- tenant status
- permission/capability version
- session id
- revocation state
- authentication method/strength
- tenant switch context

Token geçerli imzalı olduğu sürece `esnafId` kimliği 7 gün boyunca statik kalır.

Örneğin işletme üyeliği kapatılırsa veya kullanıcı tenant'tan çıkarılırsa mevcut session'ın bunu anında fark edeceği bir authoritative membership lookup yoktur.

### Verdict

JWT/cookie transport fikri **KEEP**.

`JWT esnafId == authorization` modeli **REWRITE**.

---

## 4. `requireSessionEsnaf` membership çözmüyor

`esnafOwnership.ts` route'lara önemli bir koruma ekliyor:

```text
sessionEsnafId == requestedEsnafId
```

Bu özellikle request body'deki arbitrary tenant seçimine göre çok daha iyi bir davranıştır.

Fakat gerçek multi-tenant authorization değildir.

Bugün model:

```text
session -> tek esnafId
```

olduğu için şu kavramları ifade edemez:

- bir kullanıcının birden fazla işletmeye üyeliği,
- owner/admin/editor/viewer ayrımı,
- granular capability,
- tenant switch,
- inactive/suspended membership,
- invitation lifecycle,
- role change sonrası session invalidation.

Ayrıca helper optional admin override olarak raw `ADMIN_SECRET_TOKEN` kabul edebiliyor.

### Canonical model

```text
User
  ↓
Membership[]
  ↓
Tenant / Business
```

Session user kimliğini taşır; active tenant context membership üzerinden resolve edilir.

---

## 5. Dashboard perimeter cookie varlığını session doğrulaması sanıyor

`proxy.ts` dashboard erişimi için yaklaşık şu mantığı kullanıyor:

```text
isLoggedIn = !!req.auth || !!kepenk_session_cookie_value
```

Burada custom merchant token:

- signature verification'dan geçmiyor,
- expiry kontrol edilmiyor,
- issuer/audience kontrol edilmiyor,
- membership kontrol edilmiyor.

Cookie'nin yalnız varlığı yeterli görülüyor.

Bu nedenle bozuk, expired veya tamamen uydurma bir `kepenk_session` cookie değeri route-level dashboard redirect guard'ını geçebilir.

API route'lar ayrıca auth yapıyorsa gerçek veri yine korunabilir, fakat güvenlik modeli şu hale gelir:

```text
page perimeter: cookie presence
API perimeter: route'a göre değişen guard
```

Bu kabul edilmemelidir.

### Invariant

```text
Protected page visibility
  and
Protected API authority
```

aynı canonical session verifier'dan türemelidir.

---

## 6. Admin proxy'de `undefined === undefined` fail-open riski

`proxy.ts` admin bölümü için:

```text
cookie admin_token
!=
process.env.ADMIN_SECRET_TOKEN
```

karşılaştırması yapıyor.

Environment secret tanımlı değilken cookie de yoksa iki değer de `undefined` olabilir.

Bu durumda guard'ın redirect koşulu false olur.

Yani config eksikliği burada:

> deny değil, potansiyel allow davranışına dönüşebilir.

Canonical security config için temel kural:

```text
missing trust configuration => service not ready / capability disabled
```

olmalıdır.

---

## 7. Admin login ve admin proxy aynı session sözleşmesini kullanmıyor

`/api/admin/login` görece iyi niyetli bir login akışına sahip:

- `ADMIN_SECRET_TOKEN` yoksa 500 ile kapanıyor,
- timing-safe comparison yapıyor,
- raw secret'ı cookie'ye koymuyor,
- HMAC türevi session token üretiyor,
- HttpOnly / SameSite Strict cookie yazıyor.

Fakat üretilen cookie:

```text
admin_token = HMAC-derived random session token
```

iken proxy şunu bekliyor:

```text
admin_token == raw ADMIN_SECRET_TOKEN
```

Bu iki contract birbirinden farklıdır.

Ayrıca login route session token'ı:

```text
global.ADMIN_SESSIONS = new Map()
```

içinde saklıyor.

Bu serverless/multi-instance deployment'ta authoritative session store olamaz.

### Verdict

Timing-safe comparison, HttpOnly cookie ve raw secret'ı cookie'ye koymama intent'i **KEEP**.

Admin session authority **REWRITE**.

---

## 8. NextAuth admin ayrı bir üçüncü authority

`auth.ts` ayrıca NextAuth Credentials provider kullanıyor.

Bu sistem:

- `admin_users` koleksiyonunu okuyor,
- password hash karşılaştırıyor,
- JWT session üretiyor,
- `id` ve `role` taşıyor.

Bu, raw `ADMIN_SECRET_TOKEN` ve `admin_token` mekanizmalarından ayrı bir authority'dir.

Dolayısıyla aynı admin alanında bugün üç farklı soru sorulabiliyor:

```text
NextAuth session var mı?
x-admin-token doğru mu?
admin_token cookie nedir?
```

Canonical modelde bunlardan yalnız biri browser admin authentication authority olmalıdır.

### Karar

Admin insan kullanıcısı raw shared secret header ile API çağırmamalıdır.

Admin de normal bir principal olmalı:

```text
Principal(type=platform-admin)
  + admin roles
  + session
  + audit identity
```

---

## 9. Impersonation actor ile effective tenant'ı ayırmıyor

`/api/admin/impersonate` hedef `esnafId` alıyor ve ayrı `kepenk_impersonate` JWT'si üretiyor.

Olumlu taraflar:

- kısa TTL, 2 saat,
- impersonation açık bir claim,
- target merchant bilgisi tutuluyor.

Fakat önemli problemler:

- route admin browser session yerine raw `x-admin-token` bekliyor,
- `adminId` gerçek actor'dan alınmıyor, `'super_admin'` sabit,
- impersonation cookie canonical merchant session verifier'a entegre değil,
- `requireSessionEsnaf` bu cookie'yi okumuyor,
- audit actor ile effective tenant her domain command'da taşınmıyor.

Canonical request context şunu ayırmalıdır:

```text
actorId          = gerçek admin
actorType        = platform_admin
effectiveTenant  = impersonated tenant
impersonationId  = delegated session
reason           = support/debug reason
```

İmpersonation, admin kimliğini esnaf kimliğine dönüştürmemelidir.

---

## 10. OTP login akışı kısmen doğru, session authority eksik

Normal giriş akışında `giris-kodu-gonder`:

- telefon normalize ediyor,
- işletmeyi buluyor,
- `durum === aktif` kontrol ediyor,
- rate limit uyguluyor,
- SMS OTP gönderiyor.

`giris-kodu-dogrula`:

- OTP'yi doğruluyor,
- esnaf kaydını buluyor,
- session oluşturuyor.

Bu akışın iskeleti değerlidir.

Fakat verify aşamasında account status tekrar doğrulanmıyor. Send ile verify arasında hesap kapatılmış olabilir.

Ayrıca OTP üretiminde `Math.random()` kullanımı authentication secret üretimi için doğru primitive değildir.

Canonical OTP:

```text
crypto.randomInt / CSPRNG
+ hashed challenge at rest
+ short TTL
+ attempt counter
+ phone/IP/device rate limit
+ one-time consume transaction
```

olmalıdır.

---

## 11. Onboarding OTP fallback production bypass'a dönüşebilir

`onboarding-otp-gonder` içinde SMS başarısız olduğunda:

```text
kod = '123456'
```

atanıyor ve Firestore'a kaydediliyor.

Bu fallback environment ile sınırlandırılmamıştır.

Dolayısıyla SMS provider problemi authentication güvenliğini düşürüyor.

### Critical invariant

```text
Provider unavailable
  !=
authentication weakened
```

SMS gönderilemezse registration challenge başarısız olmalı veya açıkça başka güvenli verification channel'a geçmelidir.

Fixed OTP fallback production'da bulunmamalıdır.

---

## 12. Onboarding OTP ile tenant creation arasında proof zinciri yok

`onboarding-otp-dogrula` başarılı olunca yalnız:

```json
{ "ok": true }
```

döndürüyor.

Sonraki `/api/onboarding/complete` çağrısına taşınan:

- challenge id,
- signed proof,
- verified phone claim,
- one-time registration token,
- server-side onboarding session

yoktur.

Bu yüzden OTP doğrulanmış olması ile tenant yaratılması arasında kriptografik veya transactional bağ bulunmuyor.

### Canonical akış

```text
Send OTP
   ↓
Verify OTP
   ↓
RegistrationChallenge VERIFIED
   ↓
short-lived one-time registration token
   ↓
CompleteRegistration
   ↓
User + Tenant + Owner Membership + Session
```

`CompleteRegistration` challenge'ı transaction içinde consume etmelidir.

---

## 13. En kritik bootstrap açığı: `/onboarding/complete`

`/api/onboarding/complete` bugün session veya OTP proof doğrulamadan doğrudan:

```text
new esnaflar document
+ siteData
+ session
```

oluşturabiliyor.

Üstelik client payload'ından:

```text
adim1.paket
adim4.aktifWebModulleri
```

kabul ediyor.

Yani kayıt yapan browser:

- hangi package ile oluşturulacağını,
- hangi web modüllerinin aktif olacağını

etkileyebilir.

Ayrıca:

```text
kvkkOnay: true
```

body'den kanıtlanmış consent evidence olmadan yazılıyor.

Bu endpoint mevcut haliyle canonical registration authority olamaz.

### DROP / REWRITE

Server belirlemelidir:

- initial plan,
- trial entitlement,
- module capabilities,
- verified phone,
- owner membership,
- consent evidence.

---

## 14. Google login config eksikliğinde tam fail-closed değil

Google login route Google tokeninfo endpoint'inden ID token payload'ını okuyor.

Audience kontrolü yalnız `GOOGLE_CLIENT_ID` tanımlıysa yapılıyor.

Bu iyi bir doğrulama niyetidir ancak config eksikliği auth kontrolünü kaldırmamalıdır.

Canonical Google auth minimum:

```text
issuer valid
signature/token endpoint verification
expected audience configured and equal
exp valid
email_verified == true where required
nonce/state where flow requires
account/membership active
```

Production'da expected audience yoksa login capability ready sayılmamalıdır.

---

## 15. `dev-login` production route olarak yaşayamaz

`/api/auth/dev-login` header secret kontrolü yapıyor fakat env eksikse hard-coded fallback kullanıyor.

Daha önemlisi route:

- caller'ın verdiği telefonu kabul ediyor,
- kullanıcı yoksa aktif esnaf oluşturabiliyor,
- ardından gerçek merchant session yazabiliyor.

Bu development convenience production trust surface'i olmamalıdır.

### Verdict

Production build/runtime'ta **DROP**.

Local development gerekiyorsa:

- yalnız local emulator,
- compile/deploy gate,
- non-production credentials,
- ayrı fixture bootstrap

ile çözülmelidir.

---

## 16. `apiGuard` yararlı bir wrapper intent'i taşıyor ama identity üretmiyor

`apiGuard.ts` route'lara standartlaştırılmış kontrol fikri getiriyor.

Bugünkü seçenekler:

```text
requireCronSecret
requireAdminToken
requireAdkToken
rate limit
```

Bu intent korunabilir.

Fakat başarılı sonuç:

```text
ok: true
```

seviyesinde kalıyor.

Yani guard şunları üretmiyor:

- principal id,
- principal type,
- authenticated method,
- tenant memberships,
- service audience,
- granted scopes,
- impersonation context,
- request id / audit context.

Ayrıca ADK token kontrolünde configured secret için explicit fail-closed check bulunmaması gibi config edge-case'leri var.

### REWRITE

`apiGuard` bir boolean gate değil, canonical context resolver olmalıdır.

---

## 17. Canonical `RequestContext`

Her protected command/query girişinde tek bir resolver çalışmalıdır.

Önerilen minimum:

```text
RequestContext {
  requestId
  principal: {
    type: user | platform_admin | service | provider | public_capability
    id
    authMethod
    sessionId?
  }

  tenant: {
    tenantId
    businessId?
    membershipId?
    role?
    membershipVersion?
  } | null

  capabilities: string[]

  delegation?: {
    impersonationId
    originalActorId
    effectiveTenantId
    reason
    expiresAt
  }

  service?: {
    audience
    issuer
    subject
  }

  provider?: {
    provider
    externalAccountId
    eventId
  }
}
```

Domain service `request.body.esnafId` ile auth kararı vermez.

---

## 18. User, Tenant ve Membership ayrılmalı

Bugünkü merchant session doğrudan `esnafId`ye bağlanıyor.

Yeni temel model:

```text
User {
  userId
  verifiedPhones[]
  verifiedEmails[]
  status
}

Tenant {
  tenantId
  status
}

Business {
  businessId
  tenantId
  ...
}

Membership {
  membershipId
  userId
  tenantId
  role
  status
  permissionVersion
  createdAt
  revokedAt?
}
```

Bu model:

- çok işletmeli kullanıcı,
- staff rolleri,
- tenant switch,
- membership revoke,
- platform admin ayrımı

gibi ihtiyaçları doğal biçimde çözer.

---

## 19. Session bir membership snapshot değildir

Canonical session:

```text
Session {
  sessionId
  userId
  authMethod
  authStrength
  createdAt
  expiresAt
  lastSeenAt
  revokedAt?
  rotatedFrom?
}
```

olmalıdır.

Active tenant seçimi session'a bağlanabilir fakat authorization sırasında active membership kontrol edilmelidir.

Performans için kısa cache kullanılabilir, ancak revoke için bounded staleness şarttır.

### Invariant

```text
revoked membership
  -> privileged request denied within defined maximum propagation window
```

---

## 20. Route tenant ID'leri locator olabilir, authority olamaz

SÖKÜM 26'da görülen `domain/sec` ve `site/versiyonlar` bu problemin canlı örnekleridir.

`domain/sec`:

```text
body.esnafId
  -> lookup
  -> package check
  -> domain register
```

ama caller ownership doğrulaması yoktur.

`site/versiyonlar`:

```text
query/body.esnafId
  -> list / rollback / delete
```

şeklinde çalışır ve session ownership guard yoktur.

Buna karşılık `sync-moduller` tenant'ı session'dan türetiyor. Bu doğru yöne daha yakındır.

### Kural

Request URL/body'deki tenant/resource id yalnız locator'dır.

Server mutlaka:

```text
RequestContext membership
        +
resource.tenantId
```

bağını doğrular.

---

## 21. Firestore rules iyi bir RBAC niyeti taşıyor ama web session ile birleşmemiş

Root `firestore.rules` şu rol modelini tanımlıyor:

```text
owner > admin > editor > viewer
```

ve Firebase Auth custom claims içindeki:

```text
request.auth.token.sites[siteId]
```

değerine göre erişim veriyor.

Bu iyi bir defense-in-depth modeli olabilir.

Fakat doğrulanan web merchant auth yolu Firebase Auth session değil, custom `kepenk_session` JWT'sidir.

Ayrıca server route'ları `firebaseAdmin` ile çalıştığı için Firestore rules server-side Admin SDK erişimini korumaz.

Dolayısıyla:

> Firestore rules güçlü olsa bile server authorization açıklarını kapatmaz.

### Karar

- client Data API kullanılıyorsa rules **KEEP + align**,
- server Admin SDK her zaman canonical RequestContext + authorization policy arkasında çalışmalı,
- Firebase claims ile application membership modeli tek lifecycle'dan beslenmeli veya client direct access tamamen daraltılmalıdır.

---

## 22. Service trust bugün static shared secret ağırlıklı

Cron, worker ve bazı internal route'larda:

```text
CRON_SECRET
x-cron-secret
x-cloud-task-secret
```

kullanılıyor.

Static secret basit ve anlaşılırdır ama:

- service identity söylemez,
- audience söylemez,
- route-specific scope söylemez,
- rotate edildiğinde tüm consumer'ları etkiler,
- leak olursa çok geniş blast radius yaratır.

Ayrıca `cloudTasksClient.ts` env yoksa `dev-secret-123` fallback'i içerir ve credentials eksikliğinde unauthenticated HTTP fallback yapar.

Production internal task execution için bu model authority olmamalıdır.

---

## 23. `gcpAuthGuard` korunacak en iyi service-trust seed'idir

`gcpAuthGuard.ts`:

- Google OIDC ID token kontrol ediyor,
- audience kontrolü yapabiliyor,
- allowed service accounts listesi destekliyor,
- expiry kontrol ediyor,
- production'da OIDC'yi önce deniyor.

Bu repo içindeki doğru service identity yönüne en yakın parçadır.

### KEEP

- OIDC service identity fikri,
- audience binding,
- service-account allowlist,
- token expiry kontrolü.

### REWRITE

Production'da:

- audience config zorunlu olmalı,
- allowed principals config zorunlu olmalı,
- missing config fail closed olmalı,
- global CRON_SECRET fallback migration sonrası kaldırılmalı,
- her worker route ayrı audience/scope alabilmeli,
- mümkünse local JWT verification/JWKS cache tercih edilip external tokeninfo dependency azaltılmalı.

---

## 24. En kritik worker açığı: `/cron/kuyruk-isleyici`

Bu route GET ile auth olmadan çağrılabiliyor.

Çağrıldığında:

- kuyruktan job alıyor,
- processing state yazıyor,
- tenant verisi okuyabiliyor,
- remote media okuyabiliyor,
- AI vision çalıştırabiliyor,
- orchestrator çalıştırabiliyor,
- WhatsApp gönderebiliyor,
- job complete/error yazabiliyor,
- agent log oluşturabiliyor.

Bu, dış network'ten tetiklenebilen privileged execution surface'idir.

### Verdict

Current route trust modeli **DROP**.

Yeni worker:

```text
Cloud Scheduler / Tasks
        ↓
OIDC service principal
        ↓
audience = queue-worker
        ↓
Worker RequestContext
        ↓
bounded queue claim
```

olmalıdır.

GET yerine side-effectful execution için POST tercih edilmelidir.

---

## 25. Bazı cron route'lar iyi fail-closed örneği veriyor

`cron/data-purge`:

```text
CRON_SECRET yok => unauthorized
header mismatch => unauthorized
```

şeklinde davranıyor.

`workers/site-ureticisi` de expected secret eksikse işlem yapmıyor.

Bu parçaların önemli dersi:

> missing security configuration allow'a dönüşmemelidir.

Fakat static secret yerine service identity'e geçilmelidir.

---

## 26. Cloud Tasks client ile worker auth sözleşmesi tam değil

`cloudTasksClient.ts` normal durumda worker'a:

```text
x-cloud-task-secret = CRON_SECRET || dev-secret-123
```

koyuyor.

Credentials eksikse ise doğrudan `fetch()` fallback yapıyor ve bu fallback aynı auth header'ını bile göndermiyor.

Sonuç olarak:

- fallback ile worker verifier farklı davranabilir,
- production config problemi sessiz degradeye dönüşebilir,
- durable execution SÖKÜM 24 invariant'larına ters düşebilir.

### Karar

Production'da Cloud Tasks yoksa:

```text
queue unavailable
```

olarak fail edilmeli.

Synchronous/fire-and-forget HTTP fallback production semantics olmamalıdır.

---

## 27. Provider webhook trust fail-closed olmalı

`food-delivery` webhook iyi parçalara sahip:

- raw body HMAC helper,
- platform adapter,
- Zod validation,
- external merchant id -> tenant mapping,
- idempotency key.

Fakat HMAC şu koşulla çalışıyor:

```text
if (secret && signature) verify
```

Secret veya signature yoksa request devam ediyor.

Bu fail-open'dır.

### Canonical webhook entry

```text
raw request
  ↓
provider identified by route/config
  ↓
required secret/key exists
  ↓
signature present
  ↓
cryptographic verification
  ↓
timestamp/replay window if supported
  ↓
idempotency
  ↓
external account -> tenant binding
  ↓
schema normalization
  ↓
domain command
```

Her doğrulama adımı fail-closed olmalıdır.

---

## 28. Iyzico kapora webhook current formuyla trust authority olamaz

`webhooks/iyzico-kapora` request JSON içindeki:

```text
status
conversationId
paymentId/token
```

değerlerini okuyup `status == success` ise randevuyu onaylıyor.

`conversationId` içinden:

```text
esnafId__randevuId
```

parse ediyor.

Doğrulanan route'ta provider signature verification veya authoritative payment retrieve bulunmuyor.

Bu nedenle request body:

- payment truth,
- tenant identity,
- appointment identity

haline geliyor.

### Critical invariant

```text
payment success
  ==
provider-authenticated + server-verified payment state
```

Body'deki `status` hiçbir zaman tek başına ödeme authority'si olamaz.

Bu route Payment Core'daki verified provider event'e bağlanmalıdır.

---

## 29. Public, User, Admin, Service ve Provider principal'ları ayrılmalı

Canonical identity sisteminde bütün request'ler aynı authentication yöntemini kullanmak zorunda değildir.

Ama hepsi ortak principal modeline çözülmelidir:

```text
Principal
  public_capability
  user
  platform_admin
  service
  external_provider
```

Her principal'ın izin kaynağı farklıdır:

```text
public_capability -> PublishedCapabilityManifest
user              -> Membership + role/capability
platform_admin    -> PlatformRole
service           -> audience + service scopes
provider          -> verified integration binding
```

Bu ayrım auth mekanizmasını sadeleştirmekten daha önemlidir.

---

## 30. Authorization role yerine capability merkezli olmalı

Roller insan yönetimi için faydalıdır:

```text
owner
admin
editor
viewer
```

Fakat domain command kararları explicit capability ile verilmelidir.

Örnek:

```text
site.read
site.edit
site.publish
site.domain.manage
asset.upload
booking.read
booking.manage
crm.read
crm.write
commerce.manage
financial.read
financial.adjust
staff.manage
integration.manage
```

Role -> capabilities projection server-side authority olmalıdır.

### Neden?

`editor` gibi geniş bir rolün hangi yeni özelliğe otomatik erişeceği belirsiz kalmaz.

---

## 31. Entitlement ile authorization aynı şey değildir

SÖKÜM 26'da package/module bypass görüldü.

Burada ayrımı kilitliyoruz:

```text
Authorization:
Kullanıcı bu tenant'ta bu komutu çalıştırabilir mi?

Entitlement:
Tenant'ın satın aldığı plan bu özelliğe sahip mi?
```

Bir command iki kontrolü de geçebilir:

```text
require capability(site.publish)
require entitlement(site_publish)
```

Client'ın `paket`, `moduller` veya `plan` alanı göndermesi bu kontrollerin yerine geçmez.

---

## 32. Consent identity bootstrap'ın yan ürünü olmamalı

`onboarding/complete` bugün `kvkkOnay: true` yazıyor.

Consent canonical olarak ayrı evidence olmalıdır:

```text
ConsentRecord {
  consentId
  userId / subjectId
  tenantId?
  policyType
  policyVersion
  acceptedAt
  channel
  source
  evidenceHash?
  revokedAt?
}
```

Registration'ın başarılı olması otomatik olarak bütün privacy/marketing consent'lerin verilmiş olduğu anlamına gelmez.

SMS marketing consent de authentication OTP consent'i ile karıştırılmamalıdır.

---

## 33. Session revocation ve rotation zorunlu

Yeni session authority en az şu olaylarda revoke/rotate edebilmelidir:

- kullanıcı logout,
- şüpheli oturum,
- credential reset,
- role/membership revoke,
- tenant suspension,
- admin impersonation end,
- auth strength upgrade,
- security incident / signing key rotation.

7 günlük stateless JWT tek başına bu lifecycle'ı temsil etmez.

Hybrid model kullanılabilir:

```text
short-lived signed session token
+ server session record / version
```

veya benzeri revocable yaklaşım.

---

## 34. Browser mutation'larında Origin/CSRF policy merkezi olmalı

SameSite Strict cookie önemli bir korumadır fakat browser-authenticated mutation surface'inde merkezi policy yine gerekir.

Canonical browser command wrapper:

```text
verify session
verify allowed Origin
verify CSRF strategy where applicable
resolve active tenant
resolve membership
require capability
validate input
execute domain command
```

Public SÖKÜM 28 actions ise cookie user auth yerine published capability context ile çalışır.

İki model birbirine karıştırılmamalıdır.

---

## 35. Audit identity her privileged command'a taşınmalı

Bugünkü loglarda bazen:

```text
ajan
esnafId
```

var fakat canonical actor zinciri yoktur.

Her privileged command şu audit alanlarını alabilmelidir:

```text
requestId
actorType
actorId
sessionId?
tenantId
capability
impersonationId?
serviceSubject?
providerEventId?
idempotencyKey?
result
```

Bu özellikle:

- admin mutations,
- impersonation,
- financial actions,
- domain provisioning,
- publish,
- staff/permission changes

için zorunludur.

---

## 36. Environment readiness iyi intent, kapsamı genişletilmeli

`envReadiness.ts` kontrollü launch ve feature readiness fikri sunuyor.

Bu **KEEP** edilmelidir.

Fakat trust config production readiness'in first-class parçası olmalıdır.

Örnek zorunlu kontroller:

```text
SESSION signing keys
Admin auth provider config
Google OAuth audience/client id
GCP worker audience + allowed service principals
Webhook verification secrets/keys
Public app canonical origin
Credential encryption key
```

Bir feature enabled ise onun security dependency'si optional/recommended olamaz.

---

## 37. Token encryption motoru değerli, key lifecycle ayrı frontier

`tokenSifreleme.ts` AES-256-GCM ile authenticated encryption kullanıyor ve key yanlışsa fail ediyor.

Bu doğru bir primitive'tir ve **KEEP** edilmelidir.

Fakat bu turda çözmediğimiz sorular var:

- key versioning,
- key rotation,
- re-encryption,
- secret manager/KMS,
- environment secret sprawl,
- provider credential ownership,
- revocation,
- dual-key rotation window,
- audit.

Bunlar SÖKÜM 30'un ana alanıdır.

---

## 38. Canonical trust pipeline

Yeni hedef:

```text
Credential
   ↓
Authentication Adapter
   ↓
Principal
   ↓
RequestContext Resolver
   ↓
Tenant / Membership / Delegation resolution
   ↓
Capability Authorization
   ↓
Entitlement check
   ↓
Domain Command / Query
   ↓
Audit + Outbox
```

Credential türüne göre adapter değişebilir:

```text
Merchant browser -> user session
Admin browser    -> admin session
Cloud Task       -> GCP OIDC
Webhook          -> provider signature
Public site      -> published capability token/context
```

Ama domain code hepsinde aynı `RequestContext` dilini görür.

---

## 39. Canonical authentication adapters

### UserSessionAdapter

Çıktı:

```text
principal.type = user
principal.id = userId
sessionId
```

### AdminSessionAdapter

```text
principal.type = platform_admin
principal.id = adminUserId
platformRoles
```

### GcpOidcAdapter

```text
principal.type = service
subject = service-account-email
audience
serviceScopes
```

### WebhookAdapter

```text
principal.type = external_provider
provider
externalAccountId
eventId
```

### PublicCapabilityAdapter

SÖKÜM 28:

```text
principal.type = public_capability
publishedRevisionId
allowedAction
resolvedTenantId
```

---

## 40. KEEP / REWRITE / DROP

### KEEP

- HttpOnly session cookie yaklaşımı
- SameSite Strict default
- production default session secret reddi
- OTP persistence/rate intent
- timing-safe secret comparison helper intent
- Firestore RBAC role vocabulary
- default-deny Firestore rules intent
- GCP OIDC validation seed
- service account allowlist intent
- OIDC audience intent
- provider HMAC + raw-body verification intent
- webhook idempotency intent
- `envReadiness` concept
- AES-256-GCM token encryption primitive
- `requireSessionEsnaf` içindeki tenant'ı server session ile eşleştirme niyeti

### REWRITE

- custom merchant JWT semantic model
- `requireSessionEsnaf` -> RequestContext + Membership
- `apiGuard` -> Authentication/Authorization adapters
- admin login/session
- NextAuth + legacy admin auth convergence
- impersonation
- OTP challenge lifecycle
- Google login fail-closed config
- worker authentication
- Cloud Tasks identity
- webhook verification
- Firestore claims alignment
- production readiness security dependencies

### DROP

- production `/api/auth/dev-login`
- hard-coded admin-secret fallback
- fixed OTP `123456` fallback
- dashboard auth by cookie presence
- raw `ADMIN_SECRET_TOKEN` as browser API credential
- broad global `CRON_SECRET` authority after OIDC migration
- `dev-secret-123` task fallback in production path
- unauthenticated `/api/cron/kuyruk-isleyici`
- webhook verification that silently skips when secret/signature is missing
- unverified `iyzico-kapora` body as payment truth
- client-selected package/module entitlement during registration
- blanket `kvkkOnay: true`
- tenant mutation endpoints that trust body/query `esnafId` without RequestContext authorization

---

## 41. Migration sequence

### Aşama 1: Trust inventory

Bütün routes sınıflandırılır:

```text
public read
public mutation
user authenticated
admin authenticated
internal service
provider webhook
```

Her route owner capability alır.

### Aşama 2: Canonical identity records

```text
User
Tenant
Business
Membership
Session
```

modeli eklenir.

Legacy `esnafId` session migration adapter ile desteklenebilir.

### Aşama 3: `RequestContext` resolver

Tek auth wrapper domain route'lara context üretir.

Yeni route'larda request body tenant authority yasaklanır.

### Aşama 4: Merchant login migration

OTP / Google login:

```text
verified identity
-> User
-> active Membership(s)
-> Session
```

üretir.

### Aşama 5: Onboarding registration challenge

Fixed OTP kaldırılır.

OTP verify short-lived one-time registration proof üretir.

Complete endpoint proof olmadan tenant oluşturmaz.

Plan/entitlement server-side default olur.

### Aşama 6: Admin convergence

NextAuth veya seçilen tek admin identity authority üzerinden platform principal üretilir.

Raw admin token browser'dan kaldırılır.

### Aşama 7: Impersonation delegation

Gerçek admin actor + target tenant + reason + expiry + audit ile delegated context kurulur.

### Aşama 8: Worker OIDC

`gcpAuthGuard` seed'i fail-closed production service auth'a evrilir.

Cron secret yalnız migration/dev için tutulur, sonra kaldırılır.

Unauthenticated queue worker kapatılır.

### Aşama 9: Provider webhook hardening

Her provider route:

- required secret/key,
- signature,
- replay window,
- idempotency,
- external account binding

zorunlu hale getirir.

Iyzico kapora Payment Core verified event'e bağlanır.

### Aşama 10: Legacy bypass removal

`domain/sec`, `site/versiyonlar` ve benzeri route'lar canonical auth wrapper olmadan deploy edilemez.

### Aşama 11: Firestore alignment

Direct client access gerekiyorsa Firebase claims application membership state'inden üretilir.

Gerekmeyen client write path'leri kapatılır.

### Aşama 12: Security readiness gate

Production deploy health/readiness:

```text
required trust config complete
no dev auth mode
no default secrets
provider verification configured for enabled integrations
```

şartlarını kontrol eder.

---

## 42. Critical invariants

1. Request body içindeki tenant ID authorization authority değildir.
2. Every protected request resolves to exactly one authenticated principal.
3. Every tenant-scoped privileged request resolves an active membership or delegated/public/service capability.
4. Disabled/revoked membership privileged command çalıştıramaz.
5. Session token tek başına permanent membership proof değildir.
6. Protected page ve protected API aynı session truth'u kullanır.
7. Missing production auth configuration fail closed olur.
8. Dev auth fallback production'da bulunmaz.
9. OTP CSPRNG ile üretilir.
10. OTP one-time consume edilir.
11. OTP provider failure fixed/bypass code'a dönüşmez.
12. Tenant registration verified identity challenge olmadan tamamlanamaz.
13. Client initial paid plan/entitlement seçemez.
14. Consent explicit evidence olmadan true yazılamaz.
15. Google/OIDC audience production'da zorunludur.
16. Admin browser raw platform shared secret taşımaz.
17. Admin actor audit kimliği gerçek principal'dan türetilir.
18. Impersonation original actor identity'sini kaybetmez.
19. Impersonation target tenant'a explicit ve kısa süreli delegation'dır.
20. Worker endpoint network-public olsa bile service authentication olmadan iş çalıştıramaz.
21. Service credential audience-bound olmalıdır.
22. Global cron secret leak'i bütün internal service surface'ine sınırsız erişim vermemelidir.
23. Provider webhook secret/signature yoksa event reddedilir.
24. Provider event tenant'ı client-supplied internal ID'den değil verified integration binding'den resolve eder.
25. Payment success yalnız provider-verified Payment Core state'inden gelir.
26. Firestore Admin SDK kullanımı route authorization'ın yerine geçmez.
27. Firestore client rules ile application membership modeli çelişmez.
28. Capability authorization ve commercial entitlement iki ayrı kontrol olarak kalır.
29. Every privileged mutation actor, tenant, capability ve result ile audit edilebilir.
30. Security configuration degradation sessizce daha zayıf auth moduna düşmez.

---

## 43. Security / smoke test seti

### Merchant session

- forged `kepenk_session` dashboard'a authenticated erişim sağlamamalı
- expired JWT reddedilmeli
- revoked membership session TTL bitmesini beklemeden deny edilmeli
- tenant A session tenant B resource id ile command çalıştıramamalı
- multi-tenant user yalnız active membership'leri arasında switch edebilmeli

### OTP

- expired OTP reddedilmeli
- aynı OTP ikinci kez kullanılamamalı
- brute-force attempt limiti uygulanmalı
- SMS provider down iken fixed OTP oluşmamalı
- onboarding complete verified registration challenge olmadan 401/403 dönmeli
- request body package/module seçimi privilege yükseltmemeli

### Google/OAuth

- wrong audience reddedilmeli
- missing configured audience production readiness'i fail etmeli
- expired token reddedilmeli
- inactive membership login sonrası protected command çalıştıramamalı

### Admin

- valid admin login cookie proxy ve admin API tarafından aynı şekilde tanınmalı
- missing `ADMIN_SECRET_TOKEN` admin route'u açmamalı
- browser raw `x-admin-token` olmadan canonical admin session ile çalışmalı
- impersonation audit'te real admin id görünmeli
- impersonation expire/revoke sonrası tenant command deny edilmeli

### Workers

- anonymous `/cron/kuyruk-isleyici` çağrısı hiçbir job claim etmemeli
- wrong OIDC audience deny
- unapproved service account deny
- expired OIDC token deny
- credentials missing production'da unauthenticated fallback tetiklememeli

### Webhooks

- signature missing deny/no mutation
- secret config missing integration not-ready/no mutation
- invalid HMAC deny/no mutation
- duplicate valid event exactly-once domain effect üretmeli
- forged iyzico `status=success` appointment onaylamamalı
- valid payment provider verification sonrası exactly one appointment transition oluşmalı

### Tenant boundary

- tenant A user `domain/sec` ile tenant B domain başlatamamalı
- tenant A user tenant B site versions okuyamamalı/silememeli/rollback yapamamalı
- resource tenant mismatch 404/403 policy'sine göre fail etmeli

---

## 44. Son mimari karar

Kepenk'in identity katmanı şu cümleye indirgenmelidir:

> **Credential kim olduğunu kanıtlar; Membership nerede yetkili olduğunu kanıtlar; Capability ne yapabileceğini belirler; Entitlement tenant'ın özelliğe sahip olup olmadığını belirler; RequestContext bunların hepsini domain command'e tek ve denetlenebilir bir sözleşme olarak taşır.**

Bu ayrım kurulmadan CRM, Booking, Commerce, Site Publish, Finance veya Automation katmanlarından herhangi birinin multi-tenant güvenliği route bazlı kontrollere bağlı kalır.

---

## 45. SÖKÜM 30 frontier

Sıradaki doğrulama turu:

# SÖKÜM 30 - Secrets / Configuration / Provider Credentials / Encryption Key Rotation Authority

Öncelikli sorular:

- Environment secret'ları nerelerde fallback/default ile kullanılıyor?
- Hangi secret'lar global, hangileri tenant/provider credential?
- `TOKEN_ENCRYPTION_KEY` rotation nasıl yapılacak?
- OAuth refresh token'ları ve provider access token'ları nerede tutuluyor?
- Encryption key version metadata var mı?
- Dual-read / dual-write rotation mümkün mü?
- Secret Manager/KMS adapter var mı?
- Cloudflare, Google, Twilio, Netgsm, Meta, Iyzico credentials tenant/global olarak nasıl ayrılıyor?
- Production readiness hangi security/config dependency'lerini gerçekten zorunlu kılıyor?
- Secret leak/revoke sonrası blast radius ve recovery nasıl yönetiliyor?
- `.env` runtime configuration ile domain configuration nasıl ayrılacak?
- Provider credential audit ve last-used metadata var mı?

SÖKÜM 29 kapanmıştır.