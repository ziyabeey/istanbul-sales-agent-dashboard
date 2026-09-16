# SÖKÜM 33 - External Integration Connection Lifecycle / OAuth Grants / Webhooks / Sync / Reconciliation

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Verdict:** **KEEP provider-specific adapters, encrypted token handling, dedicated resource provisioning intent and useful idempotency/retry seeds; REWRITE them behind one canonical `IntegrationConnection` lifecycle authority; CONNECT credentials, provider resource bindings, webhook subscriptions, sync cursors, health/reconciliation, observability and offboarding to that connection; DROP direct tenant-root token/resource fields, duplicate webhook authorities, global tenant-facing access tokens and boolean-only connection truth after migration.**

## 1. Neyi doğruladık?

Bu tur credential'ın kendisini değil, bir tenant ile harici provider arasındaki ilişkinin bütün yaşam döngüsünü izledi.

Temsilci olarak gerçek çağrı yollarında şu yüzeyler doğrulandı:

- `apps/web/src/app/api/auth/google/init/route.ts`
- `apps/web/src/app/api/auth/google/callback/route.ts`
- `apps/web/src/lib/googleBusinessClient.ts`
- `apps/web/src/lib/gmbClient.ts`
- `apps/web/src/app/api/instagram/webhook/route.ts`
- `apps/web/src/app/api/instagram/dm-webhook/route.ts`
- `apps/web/src/lib/metaGraphClient.ts`
- `apps/web/src/app/api/whatsapp/route.ts`
- `apps/web/src/app/api/wa/musteri-mesaji/route.ts`
- `apps/web/src/lib/twilioProvisioning.ts`

SÖKÜM 30'daki secret/credential sonucu bu turun alt sınırıdır: gerçek secret değeri connection record'a business truth olarak gömülmemeli, connection yalnız `CredentialRef` benzeri güvenli referansla credential authority'ye bağlanmalıdır.

Ana sonuç:

> Repoda provider entegrasyonları var, fakat provider bağlantısının kendisi için tek bir canonical authority yok.

Bugünkü sistemde "bağlı" olmak provider'a göre farklı şeyler ifade ediyor:

- bir Firestore integration dokümanında `baglanti: true`,
- tenant root'unda bir access token bulunması,
- tenant root'unda provider account id bulunması,
- tenant root'unda atanmış Twilio numarası bulunması,
- global env tokenının mevcut olması.

Bunların hiçbiri tek başına gerçek connection health kanıtı değildir.

---

## 2. Google OAuth doğru bir seed, fakat connection aggregate değil

Google OAuth init yolu kullanıcı session'ını doğruluyor, `business.manage` scope'u istiyor ve offline access için refresh token talep ediyor.

Callback:

```text
code + signed state
      ↓
Google token exchange
      ↓
encrypt access/refresh token
      ↓
esnaflar/{esnafId}/integrations/google_gmb
```

record'una şu tür state yazıyor:

```text
refreshToken
accessToken
scope
baglanti: true
baglantiTarihi
accessTokenSonlanma
```

Bu değerlidir ve korunacak bir seed'dir.

Fakat eksikler:

- stable `connectionId` yok,
- provider principal/account identity canonical değil,
- location/resource bindings aynı aggregate'e bağlı değil,
- token refresh sonucu connection state'e dönmüyor,
- reconnect/revoke/disconnect state machine'i yok,
- health ve reconciliation evidence yok,
- aynı tenant/provider için birden fazla bağlantı modellemiyor.

OAuth `state` de pending connection identity yerine doğrudan `esnafId` taşıyor. Yeni modelde callback bir `PendingIntegrationConnection` veya opaque one-time authorization attempt'e bağlanmalıdır.

---

## 3. Google write/read contract'ı kendi içinde drift etmiş

OAuth callback tokenları:

```text
esnaflar/{id}/integrations/google_gmb
```

altına yazıyor.

Buna karşılık `googleBusinessClient.ts` runtime'da tenant root'undan:

```text
googleAccessToken
googleAccountId
googleLocationId
```

okuyor.

Ayrıca bu client expired access token için canonical refresh/retry/reconnect state transition göstermiyor.

`gmbClient.ts` içindeki review reply ise gerçek provider POST'u yerine açıkça MOCK notu taşıyor.

Dolayısıyla:

```text
OAuth completed
!=
runtime uses same grant
!=
provider resource verified
!=
connection healthy
```

### Karar

Provider client token veya account/location alanını tenant root'undan kendi başına çözmemeli.

Her provider call önce canonical connection + resource binding üzerinden çözülmelidir.

---

## 4. Instagram'da iki ayrı inbound webhook authority var

Repoda aynı capability için iki yol bulunuyor:

```text
/api/instagram/webhook
/api/instagram/dm-webhook
```

Birinci yol tenant'ı:

```text
instagramAccountId == recipient.id
```

ile buluyor.

İkinci yol ise:

```text
instagramUserId == entry.id
```

ile buluyor.

Bu yalnız naming farkı değildir. Provider resource -> tenant binding için iki ayrı business truth oluşmuştur.

Webhook doğrulama tokenı da iki ayrı env adıyla kullanılıyor:

```text
META_WEBHOOK_VERIFY_TOKEN
INSTAGRAM_WEBHOOK_TOKEN
```

### Karar

Webhook tenant resolution doğrudan `esnaflar` root field sorgusu yapmayacaktır.

Canonical yol:

```text
provider event resource id
        ↓
ProviderResourceBinding
        ↓
IntegrationConnection
        ↓
businessId
```

olmalıdır.

---

## 5. Instagram outbound credential ownership da parçalı

`metaGraphClient.ts` tenant root'undan:

```text
instagramAccessToken
instagramAccountId
```

okuyor.

Diğer DM webhook yolu outbound çağrıda global:

```text
INSTAGRAM_ACCESS_TOKEN
```

kullanıyor.

Sonuç olarak aynı capability'nin iki credential authority'si var:

```text
tenant-scoped root token
vs
global env token
```

### Karar

Tenant adına yapılan provider action mutlaka explicit `connectionId` veya ondan türetilmiş server-side connection context ile çalışmalıdır.

Shared platform credential gerekiyorsa onun scope'u ayrıca platform credential olarak tanımlanır; tenant grant gibi davranamaz.

---

## 6. Instagram webhook failure semantics durable değil

`/api/instagram/webhook` işleme sırasında exception oluştuğunda provider retry hell'i engellemek amacıyla yine HTTP 200 döndürüyor.

Bu ancak event önce durable inbox'a commit edilmişse güvenlidir.

Bugünkü akışta canonical durable webhook inbox doğrulanmadığı için:

```text
processing failure
      ↓
200 ACK
      ↓
provider retry yok
      ↓
event kaybolabilir
```

### Karar

SÖKÜM 24'teki durable inbox kararı provider ingress için zorunludur:

```text
verify signature
      ↓
resolve connection/resource binding
      ↓
dedupe providerEventId
      ↓
durable IntegrationEventInbox commit
      ↓
ACK provider
      ↓
async process / retry / DLQ
```

---

## 7. WhatsApp tarafında da iki paralel inbound authority var

İki ayrı route bulundu:

```text
/api/whatsapp
/api/wa/musteri-mesaji
```

İlk yol tenant lookup'ını inbound mesajın `From` telefonundan türetilmiş değer üzerinden `getEsnafByPhone()` ile yapıyor.

Bu sender müşteri numarası olduğundan provider resource ownership için güvenilir authority değildir.

İkinci yol daha doğru bir seed'e sahip:

```text
Twilio To number
      ↓
esnaflar.twilioNumarasi
      ↓
esnafId
```

Fakat o da canonical `ProviderResourceBinding` yerine tenant root field sorgusudur.

### Karar

WhatsApp inbound tenant resolution yalnız provider tarafından hedeflenen owned resource üzerinden yapılmalıdır:

```text
Twilio destination/resource SID
      ↓
ProviderResourceBinding
      ↓
IntegrationConnection
      ↓
businessId
```

Sender/customer identity hiçbir zaman tenant authority olamaz.

---

## 8. Webhook authenticity ortak ingress contract'ı değil

İncelenen Instagram POST ve Twilio POST yollarında provider request signature doğrulaması ortak, zorunlu bir ingress guard olarak görünmüyor.

Meta GET verify-token handshake, POST event authenticity ile aynı şey değildir.

Twilio inbound route'larında da canonical signature verification katmanı görünmüyor.

### Canonical invariant

```text
Unverified provider event
must never reach domain processing.
```

Provider adapter şu contract'ı sağlamalıdır:

```text
verifyWebhook(request)
parseProviderEvent(request)
resolveProviderResource(event)
extractProviderEventId(event)
```

Signature verification başarısızsa fail-closed davranılmalıdır.

---

## 9. Idempotency provider bazında ad hoc

`/api/wa/musteri-mesaji` MessageSid ile `musteriKonusmalar` collection'ında duplicate kontrolü yapıyor.

Bu iyi bir intent'tir fakat webhook idempotency'nin conversation domain'ine gömülmesidir.

Instagram örneğinde aynı seviyede durable provider-event dedupe doğrulanmadı.

### Karar

Idempotency connection ingress katmanına taşınmalı:

```text
(provider, connectionId, providerEventId)
```

platform çapında unique olmalıdır.

Domain consumer tekrar çalışsa bile provider event yalnız bir kez canonical inbox record'u üretmelidir.

---

## 10. Twilio provisioning değerli, fakat resource lifecycle yok

`twilioProvisioning.ts`:

- shared account credential ile provider'a bağlanıyor,
- boş numara seçiyor,
- provider webhook URL'ini ayarlıyor,
- friendly name ile tenant'ı işaretliyor,
- tenant root'a `twilioNumarasi` yazıyor.

Bu provisioning intent'i değerlidir.

Fakat provider resource lifecycle record'u yok:

```text
providerResourceSid
provisioning status
ownership revision
webhook subscription/config version
assignedAt
lastVerifiedAt
release/revoke state
```

ayrı authority olarak tutulmuyor.

Daha kritik olarak provider credentials yoksa fonksiyon mock telefon döndürebiliyor. Test/demo modu explicit değilse bu production'da sahte başarı üretmemelidir.

### Karar

Provider provisioning sonucu tenant root field write'ı değil `ProviderResourceBinding` transition'ı üretmelidir.

Simulated provisioning yalnız explicit test/demo environment'ta mümkündür.

---

## 11. Canonical model

### `IntegrationConnection`

```text
IntegrationConnection {
  connectionId
  businessId
  provider
  authMode
  credentialRef?
  providerPrincipalId?
  scopes[]
  status
  connectedAt?
  lastHealthyAt?
  lastErrorCode?
  lastErrorAt?
  revision
}
```

Önerilen state family:

```text
PENDING_AUTH
  ↓
CONNECTED
  ├─→ DEGRADED
  ├─→ EXPIRED / REAUTH_REQUIRED
  ├─→ REVOKING → REVOKED
  └─→ DISCONNECTING → DISCONNECTED
```

`CONNECTED` yalnız tokenın varlığı anlamına gelmez.

En azından required provider identity/resource verification tamamlanmış olmalıdır.

### `ProviderResourceBinding`

```text
ProviderResourceBinding {
  bindingId
  connectionId
  resourceType
  providerResourceId
  localCapability
  status
  metadataProjection
  lastVerifiedAt
}
```

Örnek resource'lar:

- Google account/location
- Instagram account/page
- Twilio phone number / messaging resource
- provider merchant/store ids

### `WebhookSubscription`

```text
WebhookSubscription {
  subscriptionId
  connectionId
  providerSubscriptionId?
  resourceBindingId?
  verificationSecretRef?
  eventTypes[]
  status
  expiresAt?
  lastVerifiedAt?
}
```

### `SyncCursor`

```text
SyncCursor {
  connectionId
  stream
  cursor
  lastProviderEventAt?
  lastLocalCommitAt?
  revision
}
```

### `IntegrationEventInbox`

SÖKÜM 24 durable inbox kararının provider-specialized görünümüdür:

```text
IntegrationEventInbox {
  provider
  connectionId
  providerEventId
  resourceBindingId?
  signatureVerifiedAt
  receivedAt
  status
  attempts
}
```

Raw sensitive payload default telemetry değildir. Gerekiyorsa data-classification ve retention policy ile ayrı payload reference tutulur.

---

## 12. Credential ile connection aynı şey değildir

SÖKÜM 30 ile sınır kesin:

```text
Credential Authority
  owns secret bytes / encryption / rotation

IntegrationConnection
  owns tenant-provider relationship / scopes / health / lifecycle
```

Connection record:

```text
credentialRef
```

taşır.

Raw refresh/access token business-domain truth değildir.

Credential rotate edildiğinde connection identity değişmemelidir. Rotation sonucu health check edilir; başarısızsa connection `DEGRADED` veya `REAUTH_REQUIRED` durumuna geçer.

---

## 13. Multi-connection semantics explicit olmalı

Bugünkü singleton yollar:

```text
integrations/google_gmb
instagramAccountId
instagramUserId
twilioNumarasi
```

aynı provider'dan ikinci account/resource bağlamayı doğal olarak zorlaştırıyor.

Canonical uniqueness provider semantiğine göre explicit olmalıdır.

Genel seed:

```text
unique(businessId, provider, providerPrincipalId)
```

Fakat provider adapter farklı cardinality gerektiriyorsa bu contract'ta açıkça tanımlanmalıdır.

`provider == google` tek bağlantı demek değildir; bir business birden fazla account/location bağlayabilir.

---

## 14. Outbound provider action connection-aware olmalı

Bugün bazı client'lar yalnız `esnafId` alıp credential alanlarını kendileri arıyor.

Yeni contract:

```text
Domain Command
      ↓
IntegrationCapabilityResolver
      ↓
healthy IntegrationConnection
      ↓
ProviderResourceBinding
      ↓
CredentialRef resolve
      ↓
Provider Adapter
      ↓
ProviderOutcome
```

Bu sayede:

- disconnected provider fail-closed olur,
- wrong tenant credential kullanımı engellenir,
- rate limit/backoff connection'a yazılabilir,
- outcome aynı causality chain'e bağlanabilir,
- audit hangi grant/resource ile action yapıldığını kanıtlayabilir.

---

## 15. Health, drift ve reconciliation

Canonical connection health yalnız son API call'un başarılı olması değildir.

Reconciliation en az şu drift'leri kontrol etmelidir:

- credential revoked/expired,
- provider account/resource silinmiş,
- webhook subscription kaybolmuş/değişmiş,
- local binding provider gerçeğiyle uyuşmuyor,
- required scope geri çekilmiş,
- webhook callback/config eski version'a bakıyor,
- sync cursor durmuş,
- sustained provider rate-limit/degradation.

Örnek:

```text
ConnectionReconcileRequested
      ↓
load IntegrationConnection
      ↓
provider introspection / resource list
      ↓
compare local bindings/subscriptions/scopes
      ↓
repair safe drift OR mark DEGRADED
      ↓
ConnectionReconciled event + audit
```

Reconciliation destructive repair'i sessizce yapmamalıdır.

---

## 16. Disconnect, revoke ve tenant offboarding ayrı kavramlar

```text
Local disconnect
!=
Credential delete
!=
Provider grant revoke
!=
Webhook unsubscribe
!=
Provider resource release
```

Tenant offboarding orchestration required resource'ları tek tek kapatmalıdır.

Örnek:

```text
TenantOffboarding
      ↓
freeze new provider actions
      ↓
disable webhook subscriptions
      ↓
revoke OAuth grants where supported
      ↓
release/transfer owned provider resources by policy
      ↓
retention-aware local cleanup
      ↓
reconciliation proof
```

SÖKÜM 32 Data Lifecycle Authority bu completion proof'u tüketir. Provider cleanup tamamlanmadan yalnız local credential silmek offboarding completion değildir.

---

## 17. Observability contract

SÖKÜM 31 causality kararı burada uygulanmalıdır.

Her provider operation en az:

```text
businessId
connectionId
resourceBindingId?
provider
operation
providerCallId / providerRequestId?
correlationId
attemptId
outcome
```

ile ilişkilendirilebilir olmalıdır.

Token, raw auth header, full provider payload veya müşteri PII default log değildir.

Connection dashboard health'i business kullanıcıya sade şekilde gösterilebilir:

```text
Connected
Needs attention
Reconnect required
Disconnected
```

ama internal state daha ayrıntılı kalmalıdır.

---

## 18. KEEP / REWRITE / BUILD / DROP

### KEEP

- Google OAuth offline-access intent'i.
- OAuth state HMAC doğrulama intent'i.
- Token encryption primitive'i.
- Provider-specific clients/adapters.
- Twilio dedicated resource provisioning intent'i.
- Twilio MessageSid duplicate önleme intent'i.
- Async queue / durable processing yönü.
- Provider outcome logging intent'i.

### REWRITE

- OAuth callback ownership.
- Token/resource lookup.
- Instagram tenant resolution.
- WhatsApp tenant resolution.
- Webhook authenticity guard.
- Webhook ACK/retry semantics.
- Provider resource provisioning state.
- Token refresh/reconnect lifecycle.
- Rate-limit/backoff ownership.
- Disconnect/revoke/offboarding orchestration.

### BUILD

- `IntegrationConnection` repository/service.
- `ProviderResourceBinding` authority.
- `WebhookSubscription` lifecycle.
- `SyncCursor` authority.
- provider-specialized durable `IntegrationEventInbox`.
- provider capability resolver.
- reconciliation worker.
- connection health/read model.
- connection lifecycle audit events.

### DROP after migration

- Tenant root'taki raw provider access token alanlarının business truth olması.
- `instagramAccountId` / `instagramUserId` gibi duplicate root binding authorities.
- tenant-facing actionlarda global `INSTAGRAM_ACCESS_TOKEN` authority'si.
- duplicate Instagram webhook authorities.
- duplicate WhatsApp inbound authorities.
- connection truth olarak yalnız `baglanti: true` kullanımı.
- implicit/mock provider success'in production success sayılması.

---

## 19. Migration sırası

1. Canonical `IntegrationConnection` contract'ını ekle.
2. Existing Google/Meta/Twilio records için read-only discovery/backfill yap.
3. `CredentialRef` ile SÖKÜM 30 credential authority bağlantısını kur.
4. Provider account/location/page/phone resource'larını `ProviderResourceBinding` olarak backfill et.
5. Outbound provider clients'a connection-aware resolver ekle.
6. Inbound webhook'lara provider signature guard ekle.
7. Webhook tenant resolution'ı resource binding üzerinden geçir.
8. Durable `IntegrationEventInbox` + provider event idempotency ekle.
9. Duplicate Instagram/WhatsApp webhook yollarını tek ingress contract'a indir.
10. Token refresh/reconnect transitions ekle.
11. Webhook subscription lifecycle'ını connection'a bağla.
12. Reconciliation + health worker ekle.
13. Offboarding/revoke/release workflow'unu SÖKÜM 32 Data Lifecycle'a bağla.
14. Legacy tenant-root provider fields için compatibility projection bırak.
15. Telemetry ile legacy read/write kullanımını sıfıra indir.
16. Legacy root token/resource authorities ve duplicate webhook yollarını kaldır.

Big-bang provider rewrite gerekmez.

---

## 20. Test matrisi

- OAuth callback yanlış/expired state -> reject.
- OAuth callback same authorization retry -> duplicate connection oluşturmaz.
- same business + same provider principal reconnect -> existing connection transition eder.
- two provider principals -> iki ayrı connection desteklenir.
- expired access token + valid refresh -> same connection healthy kalır.
- refresh revoked -> `REAUTH_REQUIRED`.
- provider account/location silinmiş -> reconciliation `DEGRADED`.
- webhook invalid signature -> domain processing yok.
- same provider event iki kez -> tek inbox/domain effect.
- unknown provider resource id -> tenant'a route edilmez.
- Instagram duplicate legacy account fields disagreement -> canonical binding kazanır.
- Twilio inbound sender başka tenant customer'ı -> tenant selection değişmez; destination binding kazanır.
- webhook processing fails after durable commit -> retry edilir, event kaybolmaz.
- provider 429 -> connection-aware backoff uygulanır.
- credential rotate -> connection identity korunur.
- disconnect -> new outbound actions fail-closed.
- revoke -> provider grant gerçekten revoke edilmeden completed sayılmaz.
- tenant offboarding -> required grants/subscriptions/resources reconciliation proof olmadan completed sayılmaz.
- production env missing provider credentials -> mock/simulated success üretilmez.

---

## 21. Final karar

Kepenk'in integration katmanında eksik olan şey yeni bir provider client değildir.

Eksik olan provider client'ların üzerinde duran tek yaşam döngüsü authority'sidir:

```text
Tenant
  ↓
IntegrationConnection
  ├── CredentialRef
  ├── ProviderResourceBinding[]
  ├── WebhookSubscription[]
  ├── SyncCursor[]
  └── Health / Reconciliation
           ↓
   Provider Adapters
```

Bu authority kurulmadan:

- token varlığı bağlantı sağlığı sanılabilir,
- webhook yanlış tenant'a route olabilir,
- provider event kaybolabilir,
- revoke/disconnect eksik tamamlanabilir,
- credential rotation ve provider drift sessiz kırılabilir,
- tenant offboarding external state'i geride bırakabilir.

> **Kanonik invariant: Bir provider action veya inbound event ancak verified, tenant-bound ve lifecycle-aware bir `IntegrationConnection` üzerinden domain'e girebilir.**

SÖKÜM 33 bu kararla kapanır.
