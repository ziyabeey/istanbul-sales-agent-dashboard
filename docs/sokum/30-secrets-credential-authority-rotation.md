# SÖKÜM 30 - Secrets / Credential Authority / Env Fallback / Rotation

> **Tarih:** 2026-09-15  
> **Durum:** KAPALI  
> **Verdict:** **KEEP the existing provider adapters, AES-256-GCM token encryption primitive, production SESSION_SECRET fail-closed behavior and environment-readiness idea; REWRITE secret discovery as a capability-scoped Credential Authority with explicit ownership, key IDs, versioned encryption/signing keyrings, machine-readable readiness and rotation; MOVE tenant OAuth grants out of generic business documents; REPLACE static universal service/admin bearer secrets with short-lived signed service identity; DROP production mock/default/empty-secret fallbacks, public-prefixed confidential credentials and fail-open webhook verification.**

## 1. Neyi doğruladık?

SÖKÜM 29 kimlik, tenant üyeliği, role/permission ve service trust sınırını kapattı. Bu tur o trust graph'ın kullandığı anahtarların gerçekten nerede yaşadığını, neye yetki verdiğini, nasıl doğrulandığını ve nasıl döndürülebileceğini inceledi.

Başlıca doğrulanan parçalar:

- `apps/web/src/lib/envReadiness.ts`
- `apps/web/CONTROLLED_LAUNCH_CHECKLIST.md`
- `apps/web/src/lib/sessionManager.ts`
- `apps/web/src/lib/tokenSifreleme.ts`
- `apps/web/src/lib/apiGuard.ts`
- `apps/web/src/lib/cloudTasksClient.ts`
- `apps/web/src/lib/twilioClient.ts`
- `apps/web/src/lib/telegram.ts`
- `apps/web/src/lib/iyzicoClient.ts`
- `apps/web/src/lib/unsplashService.ts`
- `apps/web/src/app/api/iletisim/route.ts`
- Google OAuth init/callback akışları
- cron / worker / webhook trust akışları
- SÖKÜM 29'da doğrulanan `ADMIN_SECRET_TOKEN`, `CRON_SECRET`, webhook ve impersonation yüzeyleri

Ana sonuç:

> Repoda bugün credential'lar tek bir authority tarafından yönetilmiyor. Aynı sistemde production signing key, provider API key, static admin bearer, worker secret, webhook secret ve tenant OAuth refresh token birbirinden bağımsız env/document sözleşmeleriyle yaşıyor.

Bu yalnız secret storage problemi değildir.

Asıl eksik:

```text
hangi capability
hangi credential türüne
hangi owner adına
hangi scope ile
hangi aktif version üzerinden
hangi caller tarafından
erişebilir?
```

sorusunun canonical cevabı yoktur.

---

## 2. Önce credential türlerini ayırmak zorundayız

Bugünkü kod çoğu credential'ı `process.env.*` veya business document alanı olarak görür. Yeni mimaride en az dört ayrı kategori olmalıdır.

### A. Platform credential

Kepenk altyapısının sağlayıcıya erişim anahtarıdır.

Örnek:

- Resend API key
- Twilio Account SID/Auth Token
- Telegram bot token
- Cloudflare API token
- Gemini / Google provider key
- Iyzico platform merchant credential

Owner:

```text
platform
```

### B. Tenant OAuth grant

Bir işletmenin üçüncü taraf hesabına verdiği delegasyondur.

Örnek:

- Google Business Profile grant
- Meta/Instagram grant
- ileride Paraşüt vb. OAuth grant

Owner:

```text
tenant/business connection
```

Bu platform secret değildir.

### C. Signing / encryption key

Kepenk'in kendi güven sınırını kurar.

Örnek:

- session signing key
- token encryption key
- webhook signing key, Kepenk outbound webhook üretirse
- capability token signing key

### D. Service identity credential

Bir worker/scheduler/service'in başka bir service'e kendini kanıtlamasıdır.

Örnek:

- Cloud Tasks -> worker
- scheduler -> cron
- internal command dispatcher -> worker

Bunlar admin master token ile aynı şey değildir.

---

## 3. `envReadiness` doğru fikir, yanlış kapsam

`envReadiness.ts` controlled launch için temel bir readiness modeli kuruyor.

Doğrulanan temel gereksinimler:

```text
SESSION_SECRET
FIREBASE_PROJECT_ID
Firebase credential aliases
```

`ADMIN_SECRET_TOKEN` recommended olarak tutuluyor.

Site feature tarafında ayrıca:

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
GEMINI_API_KEY
```

kontrol ediliyor.

Bu yaklaşımın fikri değerlidir:

> Capability açılmadan önce dependency hazır mı?

### Sorun

Readiness graph bütün credential ailelerini kapsamıyor.

Örneğin doğrulanan akışlarda ayrıca:

- Resend
- Twilio
- Telegram
- Iyzico
- Google OAuth client secret
- `TOKEN_ENCRYPTION_KEY`
- webhook signing secrets
- ADK bearer
- cron/worker identity

kullanılıyor.

Bunların readiness'i aynı canonical registry'den türemiyor.

### KEEP

`envReadiness` fikri.

### REWRITE

Env isimlerini tek tek route seviyesinde kontrol etmek yerine:

```text
CapabilityDefinition
  requiresCredentials[]
```

sözleşmesi kullanılmalı.

---

## 4. Controlled launch checklist credential authority değildir

`CONTROLLED_LAUNCH_CHECKLIST.md` bazı feature'lar açılırken hangi env değerlerinin gerektiğini insan tarafından okunur biçimde listeliyor.

Bu operasyonel olarak faydalı.

Fakat canonical güvenlik policy'si olamaz.

Bugün bilgi iki yere bölünüyor:

```text
runtime code
+
launch checklist prose
```

Bunun sonucu:

- yeni provider eklenince readiness unutulabilir,
- bir secret rotate edilince dependency graph güncellenmeyebilir,
- health endpoint gerçek capability durumunu yanlış gösterebilir,
- production'da feature açık ama credential eksik olabilir.

### Karar

Checklist generated/derived olabilir.

Authority:

```text
machine-readable Capability Credential Registry
```

olmalıdır.

---

## 5. Production fallback secret / mock credential yasaklanmalı

Repoda birkaç farklı fallback davranışı var.

Bunların hepsi aynı risk sınıfında değildir fakat production policy tek olmalıdır.

### Session

`sessionManager.ts` development fallback secret tanımlıyor ancak production ortamında default secret kalırsa explicit exception atıyor.

Bu iyi bir fail-closed seed'dir.

**KEEP intent.**

### Resend

İletişim route'unda:

```text
RESEND_API_KEY || re_mock_key_for_build
```

benzeri build fallback'i bulunuyor.

Bu production runtime'a taşınmamalıdır.

Build kolaylığı ile production credential authority aynı contract'ta olmamalıdır.

### Iyzico

Iyzico client:

```text
IYZICO_API_KEY || ''
IYZICO_SECRET_KEY || ''
IYZICO_BASE_URL || sandbox URL
```

yaklaşımını kullanıyor.

Bu iki risk doğurur:

1. eksik secret empty string'e düşebilir,
2. environment explicit seçilmezse sandbox default'u sessizce kullanılabilir.

Ödeme gibi finansal capability'de bu kabul edilmemelidir.

### Telegram

Credential yoksa helper development/log fallback davranışına düşebiliyor.

Local development için yararlı olabilir.

Production notification capability için sessiz fallback olmamalıdır.

### Canonical invariant

```text
production + capability enabled + required credential missing
                           ↓
                    capability CLOSED
```

Asla:

```text
missing credential -> fake success / mock / silent log
```

olmamalıdır.

---

## 6. Confidential secret `NEXT_PUBLIC_*` altında olamaz

Unsplash service provider key için hem server-side:

```text
UNSPLASH_ACCESS_KEY
```

hem de fallback olarak:

```text
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
```

okuyabiliyor.

Next.js dünyasında `NEXT_PUBLIC_*` client-visible config namespace'idir.

Bir confidential provider access key'in burada bulunması canonical modelde yasak olmalıdır.

### DROP

```text
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
```

confidential credential fallback'i.

Public browser'a gereken bilgi varsa ayrı public configuration olarak modellenmelidir.

---

## 7. Provider adapter'ları korunmalı, secret çözümleme onlardan ayrılmalı

`twilioClient.ts`, `iyzicoClient.ts`, Unsplash service, Cloudflare adapter'ları ve benzeri provider client'ları değerli bir sınırdır.

Provider-specific:

- request formatı,
- response parsing,
- retry semantics,
- provider error mapping,
- idempotency support,
- external API details

burada kalabilir.

Fakat adapter'ın kendisi:

```text
process.env.PROVIDER_SECRET
```

ile doğrudan authority çözmemelidir.

Yeni sınır:

```text
Domain / Worker
      ↓
Credential Resolver
      ↓
ProviderCredentialHandle
      ↓
Provider Adapter
```

olmalıdır.

Provider adapter raw secret'in nerede yaşadığını bilmemelidir.

---

## 8. Platform credential ile tenant OAuth grant aynı veri modeli değildir

Google OAuth akışında iyi bir niyet vardır:

- client secret server-side,
- state HMAC,
- access/refresh token encryption,
- business document ile ilişkilendirme.

Fakat tenant'ın OAuth grant'i genel `esnaflar` dokümanına gömülmüş durumdadır.

Bu uzun vadede yanlış storage authority'dir.

Neden?

Bir OAuth connection'ın kendine ait lifecycle'ı vardır:

```text
connected
refreshing
scope_changed
reauth_required
revoked
expired
error
```

Ayrıca ayrı audit ve rotation ihtiyacı vardır.

### Canonical model

```text
OAuthGrant {
  connectionId
  tenantId
  businessId?
  provider
  providerSubject
  scopes[]
  accessTokenEnvelope
  refreshTokenEnvelope
  tokenExpiry
  encryptionKeyId
  status
  lastRefreshAt
  createdAt
  updatedAt
  revokedAt?
}
```

Bu record business profile değildir.

### Invariant

Bir tenant grant'in revoke edilmesi yalnız o connection'ı etkiler.

Platform provider credential veya başka tenant grant'i etkilenmez.

---

## 9. AES-256-GCM primitive doğru, envelope eksik

`tokenSifreleme.ts` güçlü bir seed taşıyor:

- AES-256-GCM,
- random IV,
- auth tag,
- 32-byte base64 encryption key şartı,
- key eksik/geçersizse explicit failure.

Bunlar **KEEP**.

Fakat ciphertext envelope hangi key ile üretildiğini taşımıyor.

Bugünkü mantık kabaca:

```text
TOKEN_ENCRYPTION_KEY
        ↓
AES-GCM encrypt/decrypt
```

Tek key assumption'ı vardır.

### Problem

Key rotate edilince eski ciphertext nasıl decrypt edilecek?

Eğer env bir anda değiştirilirse eski tenant OAuth tokenları okunamaz.

### REWRITE

Envelope:

```text
EncryptionEnvelope {
  kid
  alg
  iv
  tag
  ciphertext
}
```

olmalıdır.

Key resolver:

```text
kid -> KMS/Secret Manager key/version
```

çözmelidir.

---

## 10. Encryption keyring ve lazy re-encryption

Canonical rotation:

```text
K1 ACTIVE
   ↓
K2 PREPARED
   ↓
K2 ACTIVE / K1 DECRYPT_ONLY
   ↓
old record read with K1
   ↓
write back encrypted with K2
   ↓
K1 RETIRED
```

Bu yaklaşım bütün kayıtları tek maintenance window'da yeniden şifreleme zorunluluğunu kaldırır.

### Critical invariant

Yeni encrypt yalnız current active key ile yapılır.

Decrypt ise migration overlap boyunca:

```text
current + explicitly allowed previous keys
```

ile yapılabilir.

Süresiz previous-key desteği yasaktır.

---

## 11. Session signing key de versionlanmalıdır

SÖKÜM 29 custom session modelini zaten rewrite adayı yaptı.

Bu tur credential açısından ek karar getiriyor.

Bugün session JWT tek `SESSION_SECRET` ile HS256 sign/verify ediliyor.

Key ID yok.

### Canonical keyring

Token header:

```text
kid = session-signing-2026-09-v2
```

Server:

```text
sign -> active key only
verify -> active + temporary previous
```

Rotation tamamlandığında old key retire edilir.

### Önemli ayrım

Session revocation ve signing key rotation aynı şey değildir.

- tek user/session iptali `SessionRecord` / `authVersion` ile çözülür,
- bütün sistem signing compromise ise signing key rotate edilir.

Birini diğerinin yerine kullanmak blast radius'u gereksiz büyütür.

---

## 12. `ADMIN_SECRET_TOKEN` credential değil, bugün master key davranışı gösteriyor

SÖKÜM 29'da doğrulandı:

`ADMIN_SECRET_TOKEN` birden fazla yerde:

- cross-tenant ownership bypass,
- admin mutation authorization,
- impersonation başlangıcı,
- dev-login gate

gibi farklı trust amaçlarında kullanılıyor.

Bu tek secret'ın compromise edilmesi çok geniş blast radius üretir.

### Karar

Canonical sistemde:

```text
human admin identity
!=
service identity
!=
support delegation
!=
development bootstrap
```

olmalıdır.

Tek shared bearer bunların hiçbirinin ortak authority'si olamaz.

### DROP after migration

`ADMIN_SECRET_TOKEN`ın universal production authorization rolü.

Break-glass credential gerekiyorsa:

- ayrı,
- kısa ömürlü,
- audited,
- MFA/approval kontrollü,
- normal request path dışında

olmalıdır.

---

## 13. `CRON_SECRET` aynı anda çok fazla service'i temsil ediyor

`apiGuard` ve Cloud Tasks akışları ortak `CRON_SECRET` modelini kullanıyor.

Bu model:

```text
secret doğruysa caller trusted
```

diyor.

Ama şu soruları cevaplamıyor:

- hangi service çağırdı?
- hangi task queue?
- hangi environment?
- hangi audience?
- hangi capability?
- token ne zaman üretildi?
- replay mümkün mü?

### Canonical service auth

Cloud provider destekliyorsa tercih:

```text
short-lived OIDC / workload identity
subject
issuer
audience
expiry
```

Worker:

```text
verify signature
verify issuer
verify audience
verify allowed service principal
verify task/capability context
```

kontrolü yapmalıdır.

### Kural

Bir worker yalnız path'i bildiği için internal sayılmaz.

---

## 14. Direct HTTP fallback trust downgrade yapmamalı

Cloud Tasks client tarafında queue enqueue yanında direct HTTP fallback yaklaşımı bulunuyor.

Local development / degraded test için pratik olabilir.

Fakat production'da:

```text
provider identity unavailable
        ↓
unauthenticated/plain fallback
```

olmamalıdır.

Canonical policy:

- development adapter explicit olabilir,
- production task transport identity zorunludur,
- fallback auth seviyesi primary transport'tan düşük olamaz.

---

## 15. Webhook secret eksikliği endpoint'i fail-open yapamaz

SÖKÜM 29 iki kritik pattern doğruladı.

### Food delivery

HMAC verification desteği var fakat secret veya signature yoksa verification atlanabiliyor.

Bu fail-open trust'tır.

### Iyzico kapora webhook

Provider signature verification olmadan body state'i business mutation tetikleyebiliyor.

### Canonical webhook definition

```text
WebhookEndpointDefinition {
  provider
  credentialId
  verificationScheme
  allowedClockSkew
  replayWindow
  eventIdPath
  idempotencyPolicy
}
```

### Invariant

```text
required webhook credential unavailable
               ↓
endpoint UNAVAILABLE / REJECT
```

Asla verification skip edilmez.

---

## 16. Secret authority ile configuration authority ayrılmalı

Her environment variable secret değildir.

Örnek public/non-secret config:

- environment name
- feature flag
- public app origin
- provider base URL, explicit allowlisted environment'e bağlıysa

Secret:

- API key
- client secret
- signing key
- encryption key
- refresh token
- private service credential

Bu ayrım önemlidir çünkü:

```text
configuration can be visible to app
credential must be access-controlled
```

### Canonical yaklaşım

Env vars kullanılabilir ancak rolleri daraltılmalı:

```text
env = bootstrap / non-secret config / secret reference
```

Raw long-lived secret authority olmamalıdır.

Örnek:

```text
TOKEN_ENCRYPTION_KEY_SECRET_REF=projects/.../secrets/.../versions/...
```

uygulama secret değerini yetkili secret backend'den resolve eder.

---

## 17. Credential Authority veri modeli

Önerilen minimum control-plane modeli:

```text
CredentialDefinition {
  credentialId
  provider
  kind
  ownerType: platform | tenant | business | service
  ownerId?
  scopes[]
  status: active | rotating | disabled | revoked
  activeVersion
  rotationPolicy
  allowedCallers[]
  createdAt
  updatedAt
}
```

Secret value burada tutulmaz.

Version metadata:

```text
CredentialVersion {
  credentialId
  version
  secretRef
  status: prepared | active | verify_only | retired | revoked
  createdAt
  activatesAt
  expiresAt?
  revokedAt?
}
```

Secret bytes:

```text
Secret Manager / KMS / provider-native secure storage
```

içinde yaşar.

---

## 18. Capability Credential Manifest

SÖKÜM 28 PublicCapabilityManifest getirdi.

SÖKÜM 30 bunu genel sistem capability'sine genişletiyor.

Örnek:

```text
Capability: send_email
requires:
  - credential: resend-platform
  - service: outbound-email

Capability: google_business_sync
requires:
  - credential: google-oauth-client-platform
  - oauthGrant: tenant/google-business
  - encryptionKeyring: oauth-token-vault

Capability: publish_site
requires:
  - credential: cloudflare-platform

Capability: process_payment
requires:
  - credential: iyzico-merchant
  - webhookVerification: iyzico-callback
```

Runtime readiness buradan hesaplanmalıdır.

---

## 19. Readiness üç state'ten daha zengin olmalı

Tek `configured = true/false` yeterli değildir.

Öneri:

```text
DISABLED
MISSING_CREDENTIAL
MISCONFIGURED
READY
DEGRADED
ROTATING
PROVIDER_UNAVAILABLE
REVOKED
```

Health endpoint public/admin context'e göre bunların güvenli özetini gösterebilir.

### Güvenlik kuralı

Health/readiness:

- secret value göstermez,
- token prefix göstermez,
- ciphertext göstermez,
- secret manager path'ini gereksiz yere public etmez,
- yalnız operational state gösterir.

---

## 20. Rotation state machine

Credential rotate etmek bir env value değiştirmek değildir.

Canonical genel state machine:

```text
PREPARED
   ↓
DUAL_VALID / OVERLAP
   ↓
ACTIVE_NEW
   ↓
PREVIOUS_VERIFY_ONLY
   ↓
RETIRED
   ↓
REVOKED / DESTROYED
```

Her provider overlap desteklemeyebilir.

Bu durumda provider-specific adapter farklı transition uygulayabilir fakat control-plane audit aynı kalmalıdır.

### Rotation record

```text
CredentialRotation {
  rotationId
  credentialId
  fromVersion
  toVersion
  requestedBy
  reason
  startedAt
  activatedAt?
  completedAt?
  status
  verificationResults[]
}
```

---

## 21. Credential access auditable olmalı, secret okunması loglanmamalı

Audit ile application log farklıdır.

Audit kaydı:

```text
actor/service
credentialId
purpose/capability
version
operation: resolve | rotate | revoke
result
timestamp
correlationId
```

Raw secret asla audit payload'a konmaz.

### Redaction

Logger merkezi olarak en az şunları redact etmelidir:

- Authorization
- Cookie
- x-admin-token
- x-cron-secret
- API keys
- OAuth access/refresh tokens
- webhook signatures gerektiğinde hash/prefix dışında
- encrypted token envelope ciphertext gerektiğinde

---

## 22. Tenant credential isolation

Tenant OAuth grant veya tenant-owned integration secret için identity şu tuple üzerinden kurulmalıdır:

```text
(tenantId, connectionId, provider)
```

Caller'ın request body'de başka tenant ID göndermesi secret resolve etmemelidir.

Credential Resolver TrustContext'ten tenant'ı almalıdır.

### Invariant

```text
request body tenantId != credential owner authority
```

Bu SÖKÜM 28-29'un tenant authority kararlarının credential katmanındaki devamıdır.

---

## 23. Least-privilege provider scope

Credential varlığı tek başına authorization değildir.

Örnek:

```text
google grant scopes = [business.manage]
```

ile:

```text
send Gmail
```

yapılamamalıdır.

CredentialDefinition ve OAuthGrant explicit scopes taşımalıdır.

Provider adapter çağrısından önce:

```text
requested capability subset-of granted scopes
```

kontrolü yapılmalıdır.

---

## 24. Secret rotation ile incident revocation ayrılmalı

Normal rotation:

```text
planned
zero/low downtime
overlap
verification
retire old
```

Incident response:

```text
suspected compromise
immediate revoke
blast-radius discovery
session/grant invalidation
provider-side revoke
replacement
post-incident audit
```

Aynı endpoint olabilir fakat aynı semantik değildir.

### Gereken metadata

- reason
- actor
- incidentId?
- affected capabilities
- affected tenants
- provider revoke result

---

## 25. Secret Manager / KMS adapter

Provider seçimi burada hardcode edilmemelidir.

Canonical interface örneği:

```text
SecretStore {
  resolve(secretRef, version)
  health(secretRef)
}

KeyProvider {
  getSigningKey(kid)
  getEncryptionKey(kid)
  listAllowedVerificationKeys(keyringId)
}
```

Production adapter GCP Secret Manager/KMS, Cloud provider veya organizasyon standardına bağlanabilir.

Local adapter yalnız explicit development mode'da kullanılabilir.

### Kural

Production'ın local `.env` fallback'i ile sessizce çalışması yasaktır.

---

## 26. Migration sırası

### Aşama 1 - Inventory

Tüm credential kullanımlarını registry'ye al:

- env name
- provider
- owner
- capability
- current consumer
- rotation support
- risk tier

### Aşama 2 - Secret Resolver

Provider adapter'lardan doğrudan env read'i çıkar.

### Aşama 3 - Capability readiness

Feature flag + credential readiness'i tek graph'ta birleştir.

### Aşama 4 - OAuthGrant extraction

Tenant integration tokenlarını generic business doc'tan ayrı connection records'a taşı.

### Aşama 5 - Encryption envelope v2

`kid` taşıyan versioned envelope'a geç.

Mevcut ciphertext için migration reader:

```text
legacy envelope -> legacy key -> decrypt -> encrypt current kid
```

### Aşama 6 - Session signing keyring

Yeni tokenlara `kid`, geçici previous verify desteği.

### Aşama 7 - Service identity

Cloud Tasks / cron / internal workers static bearer'dan OIDC/workload identity'ye geçer.

### Aşama 8 - Webhook fail-closed

Tüm provider webhooks signature registry'ye bağlanır.

### Aşama 9 - Remove fallbacks

Mock/default/empty secret production yolları silinir.

### Aşama 10 - Rotation drills

Staging'de bütün credential sınıfları için rotation smoke yapılır.

---

## 27. KEEP / REWRITE / DROP

### KEEP

- AES-256-GCM + random IV + auth tag primitive'i
- `TOKEN_ENCRYPTION_KEY` için mevcut strict length/format intent'i
- production default `SESSION_SECRET` fail-closed kontrolü
- provider adapter katmanları
- `envReadiness` / capability readiness fikri
- Google OAuth tokenlarını plaintext tutmama intent'i
- Cloud Tasks abstraction
- webhook HMAC doğrulama helper intent'i

### REWRITE

- env readiness -> Capability Credential Registry
- provider env reads -> Credential Resolver
- OAuth token storage -> tenant-owned `OAuthGrant`
- encryption envelope -> `kid` + keyring
- session signing -> versioned signing keyring
- service auth -> short-lived workload/OIDC identity
- webhook auth -> mandatory provider verification + replay protection
- readiness/health -> safe capability state
- rotation -> explicit state machine + audit
- secret logging -> central redaction

### DROP

- production mock/default credential fallback'leri
- `re_mock_key_for_build` runtime fallback'i
- confidential `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY`
- Iyzico empty-string secret fallbacks
- production implicit sandbox fallback
- universal `ADMIN_SECRET_TOKEN` authorization authority
- universal `CRON_SECRET` service identity authority
- fail-open webhook signature behavior
- generic business document as OAuth credential vault
- production notification success semantics that degrade to console/log
- raw long-lived secrets spread directly across application env reads

---

## 28. Critical invariants

1. Production artifact literal/default secret ile authenticate olamaz.
2. Required credential eksikse ilgili capability fail-closed olur.
3. Confidential credential `NEXT_PUBLIC_*` altında bulunamaz.
4. Raw secret hiçbir API response'a girmez.
5. Raw secret structured log/audit payload'a girmez.
6. Credential owner explicit olmalıdır.
7. Tenant credential request body tenant ID'sinden resolve edilemez.
8. Credential scope requested capability'yi kapsamalıdır.
9. OAuth grant platform API key'den ayrı lifecycle taşır.
10. OAuth revoke yalnız ilgili connection'ın yetkisini keser.
11. Encrypted persistent envelope key ID taşır.
12. Yeni encryption yalnız active key ile yapılır.
13. Previous decrypt keys time-bounded olmalıdır.
14. Session signing tokenları key ID taşımalıdır.
15. Session revocation signing-key rotation'a bağlı olmamalıdır.
16. Service-to-service identity short-lived ve audience-bound olmalıdır.
17. Worker URL bilgisi authorization sayılmaz.
18. Production transport fallback trust seviyesini düşüremez.
19. Webhook secret/signature eksikliği verification bypass edemez.
20. Webhook replay/idempotency policy provider definition'ın parçasıdır.
21. Production provider environment explicit olmalıdır.
22. Sandbox/mock endpoint'e sessiz production fallback yasaktır.
23. Health endpoint yalnız readiness state gösterir, credential material göstermez.
24. Credential rotation actor/reason/version ile auditable olmalıdır.
25. Compromise revocation normal rotation'dan ayrı incident semantics taşır.
26. Provider adapter secret store implementation'ını bilmez.
27. Dev/test credential bootstrap production build/runtime authority olamaz.
28. Break-glass credential normal API authorization mekanizması olamaz.
29. CredentialDefinition secret value içermez, yalnız secure secretRef taşır.
30. Key/credential retired olduktan sonra yeni request'lerde kullanılamaz.

---

## 29. Smoke / acceptance plan

### Credential readiness

- Production'da Resend credential yok + email capability enabled -> READY olmamalı.
- Twilio credential yok + WhatsApp/SMS capability enabled -> capability CLOSED.
- Iyzico secret yok -> checkout initialize provider çağrısı yapmamalı.
- Production env'de implicit sandbox payment URL -> deployment/readiness reject.

### Public secret namespace

- `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` production config -> validation reject.
- Client bundle scan confidential credential pattern bulmamalı.

### Encryption rotation

- K1 ile encrypted OAuth grant okunur.
- K2 active edilir.
- Eski K1 envelope `kid=K1` ile decrypt edilir.
- Lazy rewrite sonrası aynı grant `kid=K2` olur.
- K1 retire sonrası K1 ile yeni encrypt yapılamaz.

### Session signing rotation

- Eski session overlap penceresinde doğrulanır.
- Yeni session K2 `kid` ile sign edilir.
- K1 retirement sonrası expired/forbidden old token fail-closed olur.

### Tenant isolation

- Tenant A OAuth grant ID'sini Tenant B request body'ye koymak secret resolve etmez.
- Tenant A revoke -> Tenant B integration etkilenmez.

### Webhook

- Required provider signing secret yok -> webhook 5xx/config unavailable veya controlled disabled response.
- Signature eksik -> 401/403.
- Invalid signature -> 401/403.
- Old rotated-out signing secret -> overlap sonrası reject.
- Aynı provider event ID tekrar -> duplicate domain mutation yok.

### Service identity

- Worker request valid audience OIDC olmadan reject.
- Başka service principal aynı URL'yi çağırsa reject.
- Expired token reject.
- Production Cloud Tasks identity unavailable -> unauthenticated HTTP downgrade yok.

### Redaction

- Provider 500 response loglarında API key/token yok.
- Auth failure loglarında Authorization/Cookie raw value yok.
- Credential rotation audit'inde yalnız credential ID/version var.

### Health

- readiness response `configured/ready/degraded/rotating` gibi state gösterebilir.
- Secret value, prefix, token, ciphertext veya private key hiçbir response'ta görünmez.

---

## 30. Son mimari

SÖKÜM 25-30 sonrası public ve private trust zinciri şu noktaya geldi:

```text
Actor / Service / Public Capability
               ↓
           TrustContext
               ↓
       Capability Definition
               ↓
     Credential Requirements
               ↓
       Credential Resolver
          ↙           ↘
platform credential   tenant OAuthGrant
          ↓             ↓
   CredentialVersion  encrypted envelope(kid)
          ↘             ↙
        Secret Store / KMS
               ↓
         Provider Adapter
               ↓
       External Provider
```

Buradaki en önemli değişiklik:

> **Secret'in değeri artık authority değildir. Credential owner + scope + caller + active version + capability policy birlikte authority oluşturur.**

---

## 31. Sıradaki frontier

### SÖKÜM 31 - Observability / Audit / Logging / Metrics / Tracing / Operational Truth

Artık sistemin core domain, durable execution, public action, identity ve credential sınırları belli.

Sıradaki soru:

> Bir şey bozulduğunda, kötüye kullanıldığında veya admin tarafından değiştirildiğinde bunu gerçekten görebiliyor muyuz?

Öncelikli doğrulamalar:

- structured logging var mı yoksa `console.*` adaları mı?
- request/correlation/command/event ID zinciri var mı?
- admin, impersonation, credential rotation ve tenant-sensitive mutasyonlar immutable audit'e düşüyor mu?
- outbox/worker attempt, retry, DLQ ve dead-job görünürlüğü var mı?
- metrics/SLO/error budget kavramları var mı?
- PII ve credential redaction merkezi mi?
- public action -> domain command -> outbox -> provider trace edilebiliyor mu?
- readiness ile liveness ayrımı doğru mu?
- provider degradation alarm üretiyor mu?
- audit log ile debug/application log birbirinden ayrılmış mı?

SÖKÜM 31'in hedefi:

```text
request / actor / tenant / command / event / worker / provider
                         ↓
                 tek correlation graph
                         ↓
        logs + metrics + traces + immutable audit
```

Bu katman kurulmadan önceki sökümlerde tanımlanan invariant'ların production'da gerçekten korunup korunmadığını kanıtlamak mümkün değildir.
