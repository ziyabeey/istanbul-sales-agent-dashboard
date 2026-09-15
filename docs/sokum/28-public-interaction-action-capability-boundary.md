# SÖKÜM 28 - Public Interaction Runtime / Forms / Lead Capture / Action Capability Boundary

> **Tarih:** 2026-09-15  
> **Durum:** KAPALI  
> **Verdict:** **KEEP the existing public form/booking/order UX, booking validation primitives, transactional commerce services, storefront slug resolution and provider-verified payment callback; BUILD a revision-bound Public Action Gateway and typed capability manifest; CONNECT public UI to CRM/Booking/Commerce commands only through that boundary; REWRITE booking/checkout trust, abuse control, idempotency, consent and side-effects; DROP fake client-side success, caller-controlled tenant/source/price authority and duplicate public mutation paths after migration.**

## 1. Neyi doğruladık?

SÖKÜM 25 public site read/runtime tarafını, SÖKÜM 26 authoring/publish/domain write tarafını, SÖKÜM 27 asset bytes authority'yi kapattı.

Bu tur public bir site ziyaretçisinin düğmeye bastığında ne olduğunu inceledi:

- iletişim formu,
- lead capture,
- randevu talebi,
- sipariş,
- checkout,
- CTA / WhatsApp / telefon / navigation,
- consent,
- rate limit,
- notification side-effect'leri,
- public caller'ın tenant ve business identity'yi nasıl seçtiği.

Başlıca doğrulanan parçalar:

- `apps/sites/src/app/[domain]/client.tsx`
- `packages/templates/src/renderer/ThemeRenderer.tsx`
- `packages/templates/src/types/section-types.ts`
- `packages/templates/src/types/section-content.ts`
- `packages/templates/src/sections/common/CommonSections.tsx`
- `packages/templates/src/modules/BookingModule.tsx`
- `packages/templates/src/modules/ContactInbox.tsx`
- `packages/templates/src/modules/OrderModule.tsx`
- `packages/templates/src/modules/ReviewWidget.tsx`
- `apps/web/src/app/api/iletisim/route.ts`
- `apps/web/src/app/api/lead/demo-form/route.ts`
- `apps/web/src/app/api/randevu/route.ts`
- `apps/web/src/app/api/storefront/[shopSlug]/route.ts`
- `apps/web/src/app/api/shop/orders/route.ts`
- `apps/web/src/app/api/checkout/initialize/route.ts`
- `apps/web/src/app/api/checkout/callback/route.ts`
- `apps/web/src/lib/iyzicoClient.ts`
- `apps/web/src/lib/rateLimiter.ts`

Ana sonuç:

> Repoda CRM, Booking ve Commerce için parçalı gerçek motorlar var; fakat public site ile bu motorlar arasında tek bir **Public Action Authority** yok.

Daha kötüsü, bazı live public component'ler hiçbir server command'i çalıştırmadan başarı ekranı gösteriyor.

Bu turdaki en kritik invariant:

> **Public UI success == authoritative domain command committed.**

Bugünkü sistem bu invariant'ı sağlamıyor.

---

## 2. Public runtime action context taşımıyor

`apps/sites/src/app/[domain]/client.tsx` live site'ı:

```text
siteData
  ↓
ThemeRenderer
  ↓
Section component
```

şeklinde render ediyor.

`ThemeRenderer` section'a yalnız kabaca şunları veriyor:

```text
content
business
settings
isEditing?
onContentChange?
```

Public command çalıştırmak için gereken şu context yok:

```text
publishedRevisionId
siteId
public action capability set
actionId
idempotency context
correlation/request context
command transport
```

Bu nedenle section component'leri public action sözleşmesi olmadan kendi içinde davranış üretmek zorunda kalıyor.

### Karar

Renderer domain API endpoint'lerini bilmemelidir.

Fakat public modda typed bir action runtime tüketmelidir:

```text
ThemeRenderer
   ↓
PublicActionRuntime
   ↓
execute(actionId, input)
```

`actionId`, yayınlanmış revision'da izin verilen capability'ye bağlı olmalıdır.

---

## 3. Section type sistemi command ve navigation'ı ayırmıyor

Template type sistemi çok sayıda interaction intent'i içeriyor:

```text
contact
cta
whatsapp_cta
newsletter
booking
reservation
free_quote
free_valuation
...
```

Fakat CTA/header/hero/pricing içerikleri çoğunlukla yalnız:

```text
href: string
```

taşıyor.

Contact form ise fields ve success message taşıyor fakat submit target/action contract taşımıyor.

### Problem

Aynı UI dünyasında şu iki şey birbirine karışıyor:

```text
Passive navigation
- route'a git
- tel: aç
- mailto: aç
- wa.me aç

State-changing command
- lead oluştur
- randevu talebi oluştur
- sipariş oluştur
- ödeme başlat
- newsletter subscription oluştur
```

Bunlar aynı `href`/button semantiğiyle modellenemez.

### Canonical ayrım

```text
ExternalAction
  NAVIGATE
  PHONE_CALL
  EMAIL_OPEN
  WHATSAPP_OPEN

DomainAction
  INQUIRY_CREATE
  BOOKING_REQUEST
  ORDER_CREATE
  CHECKOUT_START
  NEWSLETTER_SUBSCRIBE
  REVIEW_SUBMIT
```

ExternalAction domain state oluşturmaz.

DomainAction mutlaka Public Action Gateway üzerinden authoritative command'e dönüşür.

---

## 4. `BookingModule` live modda sahte başarı üretiyor

`packages/templates/src/modules/BookingModule.tsx` yorumunda live booking davranışı vaat ediyor.

Gerçekte component:

- service/date/slot state'ini browser'da tutuyor,
- slot listesini hard-coded `DEMO_SLOTS` üzerinden gösteriyor,
- müşteri kimlik/contact alanlarını bile toplamıyor,
- live modda submit'e basılınca yalnız:

```text
setSubmitted(true)
```

çalıştırıyor.

Ardından:

```text
Randevu Talebiniz Alındı!
```

başarı ekranı gösteriliyor.

Network request yoktur.

### Critical bug

```text
UI says booking created
          !=
Booking Core received a command
```

Bu yalnız demo eksikliği değildir. Public product truth ihlalidir.

### DROP

Live mode için server acknowledgement olmadan local success transition yasaklanmalıdır.

Preview/editor modunda simülasyon kalabilir ama açıkça preview semantics taşımalıdır.

---

## 5. `ContactInbox` live modda mesaj göndermiyor

`packages/templates/src/modules/ContactInbox.tsx`:

```text
Site form submissions → dashboard inbox
```

iddiası taşıyor.

Gerçek submit:

```text
preventDefault()
setSent(true)
```

ile sınırlı.

Yani:

- tenant inbox kaydı yok,
- CRM lead/inquiry yok,
- contact event yok,
- consent kaydı yok,
- notification yok,
- server acknowledgement yok.

Fakat kullanıcıya:

```text
Mesajınız İletildi!
```

deniyor.

### Verdict

UI/visual component **KEEP**.

Live behavior **REWRITE + CONNECT**.

---

## 6. Common `ContactSimpleForm` da aynı sahte başarı deseninde

Universal common section içindeki `ContactSimpleForm` gerçek public ThemeRenderer tarafından render edilebilir.

Submit davranışı:

```text
preventDefault()
setSubmitted(true)
```

şeklindedir.

Formda zorunlu KVKK checkbox'ı görünür fakat checkbox'ın işaretlenmesi dışında persistent consent event yoktur.

Saklanmayan kritik bilgiler:

- hangi consent/policy version,
- hangi published site revision,
- hangi form/action id,
- hangi timestamp,
- hangi source/campaign,
- hangi purpose,
- hangi server-verified tenant.

### Karar

Checkbox UX tek başına consent authority değildir.

Domain command'in yanında versioned consent evidence üretilmelidir.

---

## 7. `OrderModule` gerçek Commerce Core'a bağlı değil

`packages/templates/src/modules/OrderModule.tsx` ürünleri local cart'a ekliyor.

Sipariş butonu:

```text
setSubmitted(true)
```

yapıyor.

Ardından kullanıcıya:

```text
Siparişiniz Alındı!
Siparişiniz hazırlanıyor.
```

deniyor.

Fakat:

- sipariş oluşturulmuyor,
- stok düşmüyor,
- fiyat snapshot'ı oluşmuyor,
- müşteri/adres bilgisi alınmıyor,
- ödeme intent'i oluşmuyor,
- WhatsApp bildirimi gönderilmiyor.

Bu sırada repo içinde gerçek transactional commerce motoru zaten vardır.

### Verdict

**UI KEEP, local success DROP, Commerce Command'e CONNECT.**

---

## 8. Gerçek Commerce Core var ama public bridge yok

`/api/shop/orders` POST:

- Zod validation yapıyor,
- rate limit kullanıyor,
- `siparisOlustur` çağırıyor,
- transaction ile stok düşürme davranışı taşıyor.

Bu değerli motordur.

Ancak endpoint:

```text
apiGuard(... requireAdminToken: true)
```

istiyor.

Bu yüzden normal public storefront bunun consumer'ı olamaz.

### Ana mimari sonuç

Problem yeni sipariş motoru yazmak değildir.

Problem:

> **Public visitor -> Commerce Core capability bridge yoktur.**

Public gateway authenticated admin API'yi proxy etmek için değil, ayrı ve dar bir public command contract üretmek için kullanılmalıdır.

---

## 9. Public storefront read tarafında iyi bir pattern var

`/api/storefront/[shopSlug]` public GET:

```text
shopSlug
  ↓
server resolves shopId
  ↓
storefront data
```

şeklinde çalışıyor.

Buradaki önemli fikir:

> Browser raw internal `shopId` authority seçmek zorunda değildir.

Bu pattern public mutation tarafında daha da güçlü uygulanmalıdır.

### KEEP intent

Host/slug/actionId gibi public locator server-side authoritative binding'e çözülmelidir.

Caller'ın body içine yazdığı tenant/business/shop kimliği authority olmamalıdır.

---

## 10. `/api/randevu` iyi primitive'ler içeriyor

Public booking endpoint'i bu turdaki en olgun public command adaylarından biridir.

Değerli parçalar:

- public booking feature flag,
- Zod validation,
- rate limit,
- business existence lookup,
- geçmiş tarih kontrolü,
- normalized phone,
- status ile appointment record oluşturma,
- output-boundary HTML escape,
- owner-side GET için `requireSessionEsnaf` ownership kontrolü.

Bunlar **KEEP** edilmelidir.

Fakat route bugünkü haliyle canonical Booking Command değildir.

---

## 11. Public booking caller'ın `esnafId` değerine güveniyor

POST body içinde caller:

```text
esnafId
musteriAd
musteriTel
musteriEmail
hizmet
tarih
saat
notlar
```

gönderiyor.

Route caller'ın verdiği `esnafId` ile doğrudan:

```text
esnaflar/{esnafId}
```

dokümanını okuyor ve randevuyu o tenant'a yazıyor.

Bu şu anlama gelir:

> Public caller target tenant'ı request body ile seçiyor.

Known/guessed business id başka business'a public write target seçmek için kullanılabilir.

### Canonical invariant

```text
Public request body must not choose authoritative tenant identity.
```

Tenant/site/business target şu zincirden türetilmelidir:

```text
request host / public site locator
       ↓
DomainBinding
       ↓
PublishedSiteRevision
       ↓
PublicCapabilityManifest[actionId]
       ↓
tenantId/businessId/domain command target
```

Browser yalnız `actionId + user input` gönderir.

---

## 12. Booking Core doğrulamaları endpoint'te tamamlanmıyor

Mevcut POST şunları server-side doğrulamıyor:

- service gerçekten bu business'a mı ait,
- service aktif mi,
- tenant plan/entitlement booking'e izin veriyor mu,
- çalışan/personel uygun mu,
- gerçek slot müsait mi,
- başka appointment ile çakışıyor mu,
- çalışma saatleri içinde mi,
- service duration slotu sığıyor mu,
- aynı request tekrar gönderildi mi.

Hard-coded UI `DEMO_SLOTS` ile backend'in gerçek availability modeli arasında da contract yoktur.

### Karar

Public gateway booking kaydını doğrudan CRUD ile oluşturmamalıdır.

Şunu çağırmalıdır:

```text
BookingCore.requestAppointment(...)
```

Booking Core:

- service revision,
- schedule,
- staff/resource,
- timezone,
- conflict/locking,
- entitlement

kontrollerinin authority'si olmalıdır.

---

## 13. Booking timezone explicit değil

Booking POST şu şekilde date oluşturuyor:

```text
new Date(`${tarih}T${saat}:00`)
```

Burada business timezone explicit değildir.

Runtime/container timezone ile tenant timezone aynı varsayılmamalıdır.

### Canonical rule

Public booking input:

```text
local date + local time + tenant timezone
```

olarak normalize edilmeli ve Booking Core içinde canonical instant'a çevrilmelidir.

Timezone client'ın serbest authority alanı olmamalı; business config'den türetilmelidir.

---

## 14. Public booking idempotent değil

Aynı POST iki kez giderse iki ayrı Firestore `randevular` kaydı oluşturulabilir.

Double click, browser retry, network retry veya client replay için command identity yoktur.

### Canonical rule

Her state-changing public action:

```text
Idempotency-Key
+ capability/action id
+ canonical tenant target
```

ile server-side dedupe edilmelidir.

Aynı accepted command tekrar geldiğinde yeni entity üretmek yerine önceki committed sonucu dönmelidir.

---

## 15. Notification side-effect'leri response sonrasına bırakılıyor

Booking route:

```text
void Promise.allSettled([
  whatsapp,
  email
])
```

ve ayrı Telegram fire-and-forget davranışı kullanıyor.

Serverless request tamamlandıktan sonra bu işler guaranteed durable değildir.

SÖKÜM 24'ün kararı burada uygulanmalıdır.

### Canonical flow

```text
Booking committed
      ↓
DomainEvent / Outbox
      ↓
Durable Execution
      ↓
WhatsApp / Email / Telegram adapters
```

Public request'in başarısı notification provider başarısına bağlı olmamalıdır.

Ama notification işi de kaybolmamalıdır.

---

## 16. Demo lead endpoint CRM authority değildir

`/api/lead/demo-form`:

- yalnız telefonun kaba formatını doğruluyor,
- `demo_leads` koleksiyonuna doğrudan yazıyor,
- `sektorId` ve `kaynakSite` değerlerini caller'dan alıyor,
- CORS `*` döndürüyor,
- captcha/bot proof yok,
- idempotency yok,
- rate limit yok,
- tenant binding yok.

Bu demo/marketing acquisition için faydalı olabilir.

Ancak production tenant lead authority olamaz.

### Özellikle source attribution

Şu değer:

```text
kaynakSite
```

caller tarafından gönderildiği için güvenilir attribution değildir.

Server source'u şunlardan türetmelidir:

```text
host
publishedRevisionId
actionId
UTM/campaign inputs
trusted ingress metadata
```

Client-provided campaign parametreleri evidence olarak saklanabilir ama canonical source identity değildir.

---

## 17. Platform iletişim endpoint'i tenant contact ile karıştırılmamalı

`/api/iletisim` kepenk.ai platform iletişim formudur.

Davranış:

- kullanıcı girdisini alır,
- Telegram gönderir,
- Resend ile sabit operator adresine email gönderir.

Tenant/business identity taşımıyor.

Bu nedenle:

```text
Platform Contact
```

ile:

```text
Business Inquiry / CRM Lead
```

iki ayrı domain'dir.

### Karar

Tenant `ContactInbox` formunu basitçe `/api/iletisim` endpoint'ine bağlamak yanlış olur.

Platform support/sales formu ayrı kalabilir.

Tenant site formu CRM/Inquiry Core command'ine gitmelidir.

---

## 18. `/api/iletisim` output escaping ve abuse policy açısından da zayıf

Endpoint:

- explicit rate limit kullanmıyor,
- captcha/bot proof kullanmıyor,
- idempotency taşımıyor,
- email HTML içinde kullanıcı girdilerini doğrudan interpolate ediyor,
- Telegram HTML mesajında da kullanıcı girdileri kullanılıyor.

Bu tur bu endpoint'i platform contact açısından yeniden tasarlamıyor.

Ancak public action platformunun ortak primitive'lerinden yararlanmalıdır:

- input validation,
- abuse protection,
- output escaping,
- request correlation,
- durable notification.

---

## 19. Rate limiter API'si iyi fikir, backend'i production authority değil

`apps/web/src/lib/rateLimiter.ts` token bucket API'si sunuyor.

Fakat state:

```text
const buckets = new Map(...)
```

ile process memory'de tutuluyor.

Serverless/distributed ortamda:

- her instance farklı bucket görür,
- restart bucket'ları sıfırlar,
- scale-out toplam limiti büyütür,
- cross-region ortak abuse state yoktur.

### Verdict

Rate-limit abstraction intent'i **KEEP**.

Backend **REWRITE**:

```text
shared durable/atomic limiter
```

olmalıdır.

Provider Redis/KV/edge primitive olabilir; provider canonical policy değildir.

---

## 20. Public abuse control yalnız rate limit değildir

Form ve mutation endpoint'leri için katmanlı policy gerekir.

Canonical pipeline:

```text
request
  ↓
body/size/content-type bounds
  ↓
origin/host/capability resolution
  ↓
distributed rate limit
  ↓
bot/honeypot/challenge policy when needed
  ↓
schema validation
  ↓
idempotency
  ↓
domain command
```

Her formda CAPTCHA zorunlu olmak zorunda değildir.

Fakat abuse policy merkezi ve action türüne göre ayarlanabilir olmalıdır.

Örnek:

```text
CONTACT: low-cost limiter + honeypot
BOOKING: limiter + duplicate defense
ORDER/CHECKOUT: stricter limiter + risk signals
```

---

## 21. Checkout initialize client fiyatına güveniyor

`/api/checkout/initialize` public request'ten şunları alıyor:

```text
shopId
siparisId
sepetItems
item prices
toplamFiyatKurus
kargoUcretiKurus
musteriInfo
addresses
```

Route Zod validation yaptıktan sonra bunları `checkoutBaslat()` fonksiyonuna geçiriyor.

`checkoutBaslat()` da basket item fiyatlarını ve toplamı bu payload'dan kullanıp İyzico checkout request'i üretiyor.

Server-side catalog/order reprice bu path'te yoktur.

### Critical trust violation

```text
Client may propose cart
Client must never authorize price
```

Schema validation sayının number olduğunu doğrulayabilir; fiyatın doğru olduğunu doğrulayamaz.

---

## 22. Provider callback verification iyi ama başlangıç trust problemini çözmüyor

Checkout callback:

- Iyzico token'ını alıyor,
- provider'dan ödeme sonucunu retrieve ederek doğruluyor,
- başarılıysa sipariş durumunu güncelliyor.

Bu doğru bir provider-verification pattern'idir ve **KEEP** edilmelidir.

Fakat doğrulanan payment intent daha önce client-controlled fiyatlarla başlatılmışsa provider doğrulaması business price authority sağlamaz.

### Canonical checkout

```text
Public cart intent
      ↓
server resolves Published Product / Catalog
      ↓
server validates stock/coupon/shipping
      ↓
server computes authoritative PriceSnapshot
      ↓
Order/Checkout Intent committed
      ↓
Payment Provider initialize
      ↓
provider callback verify
      ↓
Payment Core transition
```

Browser provider'a ödenecek authoritative toplamı belirleyemez.

---

## 23. Public shop/order kimliği de body authority olmamalı

Checkout initialize `shopId` ve `siparisId` değerlerini request'ten alıyor.

Yeni public boundary'de:

- `shopId` host/capability'den resolve edilmeli,
- `siparisId` server-issued checkout/order intent'ten gelmeli,
- sipariş başka shop'a taşınamamalı,
- product IDs target shop/catalog revision içinde doğrulanmalı.

Bu kural Booking tarafındaki `esnafId` yasağının Commerce karşılığıdır.

---

## 24. Consent bir UI checkbox değil, domain evidence'dır

Current contact section required checkbox gösteriyor.

Yeni modelde submit edilen command en az şu consent evidence'i taşıyabilir:

```text
ConsentEvidence {
  purpose
  policyId
  policyVersion
  acceptedAt
  publishedRevisionId
  actionId
  locale?
}
```

IP/user-agent gibi metadata yalnız gerekli amaç, retention ve privacy policy çerçevesinde tutulmalıdır.

### Ayrım

- UI checkbox presentation'dır.
- Consent evidence authoritative server record'dur.

Client `acceptedAt` değerini authority olarak seçmez; server timestamp kullanılır.

---

## 25. Canonical `PublicCapabilityManifest`

SÖKÜM 26'daki `PublishedSiteRevision`, public sitede hangi state-changing action'ların aktif olduğunu da pinlemelidir.

Önerilen model:

```text
PublicCapabilityManifest {
  revisionId
  siteId
  tenantId
  actions: [
    {
      actionId
      type
      schemaVersion
      targetRef
      policyRef
      enabled
    }
  ]
}
```

Örnek:

```text
actionId: contact-main
 type: INQUIRY_CREATE
 targetRef: crm/inquiry

actionId: booking-main
 type: BOOKING_REQUEST
 targetRef: booking/public-request

actionId: shop-checkout
 type: CHECKOUT_START
 targetRef: commerce/checkout
```

### Neden revision-bound?

Çünkü draft'ta form eklemek production capability açmamalıdır.

Yeni action ancak publish validation'dan geçip active revision'a girdikten sonra public kullanılabilir olmalıdır.

---

## 26. Public Action Gateway

Canonical public ingress tek authority olmalıdır:

```text
POST /public/actions/{actionId}
```

veya eşdeğer bir versioned route.

Gateway görevi:

```text
1. request host/domain çöz
2. active PublishedSiteRevision çöz
3. actionId capability'sini bul
4. action enabled + entitlement doğrula
5. request bounds/rate/bot policy uygula
6. versioned input schema validate et
7. idempotency claim al
8. tenant/business target'ı capability'den türet
9. domain command'e dispatch et
10. committed result'i dön
11. event/outbox üretimini domain transaction'a bırak
```

Gateway business logic authority değildir.

Gateway yalnız public trust boundary'dir.

---

## 27. Public request body'den çıkarılacak authority alanları

Yeni public command API'lerinde aşağıdaki alanlar caller'ın authoritative seçimi olmamalıdır:

```text
esnafId
tenantId
businessId
shopId
plan/entitlement
source site identity
publishedRevisionId
server price total
shipping price
service ownership
```

Bunların hepsi server-side context'ten derive edilmelidir.

Caller şunları teklif edebilir:

```text
name
phone/email
selected service/product ref
quantity
date/time choice
message
address
coupon code
consent acceptance
```

Ama teklif edilen her reference authoritative domain state'e karşı yeniden doğrulanmalıdır.

---

## 28. Idempotency contract

Her state-changing public action için client bir opaque idempotency key üretebilir veya server action session'da sağlayabilir.

Server key'i şu context ile namespace etmelidir:

```text
tenantId
publishedRevisionId
actionId
idempotencyKey
```

Sonuç state:

```text
PENDING
COMMITTED(resultRef)
FAILED_RETRYABLE
FAILED_FINAL
```

### UI davranışı

- COMMITTED → başarı göster
- validation error → kullanıcıya field error göster
- conflict → güncel availability/inventory ile tekrar seçtir
- retryable transport error → aynı key ile retry
- timeout → aynı key ile status/retry, duplicate entity üretme

---

## 29. Public success contract

Universal rule:

```text
UI success
   ==
server returned committed domain result
```

Örnek sonuç:

```text
{
  ok: true,
  commandId,
  entityRef,
  status
}
```

Client local `setSubmitted(true)` ancak bu response sonrasında çalışabilir.

Preview mode:

```text
simulated: true
```

gibi açık bir semantic taşımalı ve production telemetry/domain state üretmemelidir.

---

## 30. CRM / Inquiry bağlantısı

Tenant contact formunun hedefi generic platform email olmamalıdır.

Canonical flow:

```text
Contact Form
   ↓
INQUIRY_CREATE
   ↓
CRM / Customer Core
   ↓
Customer match/create
   ↓
Inquiry / Conversation record
   ↓
Domain event
   ↓
notification / automation
```

Bu akış SÖKÜM 14 CRM/customer memory kararlarıyla birleşmelidir.

Public action gateway CRM'nin kendi modelini yeniden yaratmamalıdır.

---

## 31. Booking bağlantısı

Canonical flow:

```text
Booking UI
   ↓
read availability projection
   ↓
BOOKING_REQUEST
   ↓
Public Action Gateway
   ↓
Booking Core
   ↓
transaction / conflict control
   ↓
AppointmentRequest committed
   ↓
Outbox
```

Hard-coded `DEMO_SLOTS` yalnız preview/demo için kalabilir.

Live slotlar Booking Core projection'dan gelmelidir.

---

## 32. Commerce bağlantısı

Canonical flow:

```text
Storefront read projection
       ↓
cart intent
       ↓
ORDER_CREATE / CHECKOUT_START
       ↓
Public Action Gateway
       ↓
Commerce Core
       ↓
server product + stock + price + coupon + shipping validation
       ↓
immutable PriceSnapshot / OrderIntent
       ↓
Payment Core
```

`OrderModule` kendi kendine commerce state üretmemelidir.

`/api/shop/orders` içindeki transactional service seed olarak kullanılabilir.

---

## 33. Passive WhatsApp / phone actions

Bir public site CTA yalnız:

```text
wa.me
 tel:
 mailto:
 external URL
```

açıyorsa bu domain command değildir.

Bunlar typed `ExternalAction` olabilir.

Örnek:

```text
ExternalAction {
  type: WHATSAPP_OPEN
  phoneRef: business.primaryWhatsapp
  messageTemplateId?
}
```

### Neden typed?

- arbitrary href yerine validation sağlar,
- published business contact'tan numara derive eder,
- analytics attribution üretilebilir,
- editor'da güvenli action seçimi yapılır,
- ileride server-mediated conversation'a geçirilebilir.

Ancak `WHATSAPP_OPEN` çalışması lead created anlamına gelmez.

Lead ancak CRM command committed olduğunda vardır.

---

## 34. Action analytics domain success'ten ayrılmalı

Örnek event'ler:

```text
PublicActionViewed
PublicActionStarted
PublicActionValidationFailed
PublicActionCommitted
PublicActionExternalOpened
```

Analytics failure domain command'i bozmaz.

Domain command success de analytics event delivery'ye bağlı değildir.

Fakat correlation id ile ilişkilendirilebilir.

Bu SÖKÜM 30/31 civarındaki observability çalışmasına bağlanabilir.

---

## 35. Güvenlik sınırı

Public endpoint demek "her body field güvenilir" demek değildir.

Public Action Gateway aşağıdaki temel sınırı uygular:

```text
Untrusted internet input
      ↓
strict public ingress
      ↓
authoritative context resolution
      ↓
domain command
```

Özellikle:

- internal IDs authority değildir,
- entitlement server-side,
- price server-side,
- availability server-side,
- source attribution server-side,
- timestamps server-side,
- notification target server-side,
- output escaping sink'e göre yapılır.

---

## 36. KEEP / REWRITE / BUILD / DROP

### KEEP

- public form/booking/order visual UX,
- Zod validation yaklaşımı,
- booking feature flag intent'i,
- rate-limit abstraction intent'i,
- booking output escaping helpers,
- storefront slug → shop server resolution pattern'i,
- `siparisOlustur` transactional inventory/order motoru,
- payment provider callback verification,
- templates'in sector-aware action presentation kabiliyeti.

### REWRITE

- public booking tenant binding,
- booking availability/service/timezone validation,
- rate-limit backend,
- consent evidence,
- source attribution,
- checkout initialize pricing trust,
- section action typing,
- public action result/error state UX,
- notification dispatch.

### BUILD

- `PublicCapabilityManifest`,
- `PublicActionGateway`,
- revision-bound `actionId`,
- shared distributed abuse policy,
- idempotency store/claim,
- typed public action client/runtime,
- CRM/Booking/Commerce command adapters,
- action correlation/audit envelope.

### DROP after migration

- live forms that only `setSubmitted(true)`,
- live booking/order fake success,
- caller-controlled `esnafId/shopId` as authority,
- caller-controlled source attribution,
- caller-controlled checkout totals/prices,
- demo lead endpoint as generic production lead authority,
- fire-and-forget critical notification delivery,
- command-like behavior encoded only as arbitrary raw href.

---

## 37. Canonical architecture

```text
PublishedSiteRevision
        ↓
PublicCapabilityManifest
        ↓
ThemeRenderer / Public Components
        ↓
  actionId + user input
        ↓
   Public Action Gateway
        ↓
+----------------------------+
| resolve host/revision      |
| resolve tenant/action      |
| entitlement               |
| abuse control             |
| schema validation         |
| idempotency               |
| correlation               |
+----------------------------+
        ↓
Domain Command Router
   ↓          ↓          ↓
 CRM       Booking    Commerce
   ↓          ↓          ↓
committed authoritative state
        ↓
Domain Event / Outbox
        ↓
Durable Execution
        ↓
Email / WhatsApp / Telegram / automation
```

Payment is not bypassed:

```text
Commerce OrderIntent
       ↓
server PriceSnapshot
       ↓
Payment Core
       ↓
provider initialize/callback
```

---

## 38. Public capability publish validation

SÖKÜM 26 PublishCommand bir revision'ı active etmeden önce public actions'ı da doğrulamalıdır.

Örnek checks:

```text
booking action enabled
→ Booking entitlement active?
→ target service/catalog refs valid?

checkout action enabled
→ Commerce entitlement active?
→ payment provider config ready?

contact action enabled
→ CRM/inquiry capability active?
→ consent policy reference valid?
```

Invalid capability bulunan revision publish edilemez veya action explicit disabled olur.

Draft değişikliği active public capability'yi sessizce değiştiremez.

---

## 39. Acceptance invariants

SÖKÜM 28 sonrası implementation şu testleri geçmeden tamamlanmış sayılmamalıdır:

1. Live Contact form network/domain write olmadan success gösteremez.
2. Live BookingModule domain command committed olmadan success gösteremez.
3. Live OrderModule committed order olmadan success gösteremez.
4. Preview/editor simulation production state oluşturmaz.
5. Caller başka `esnafId/shopId/tenantId` yazarak target tenant değiştiremez.
6. Unknown/disabled actionId fail-closed olur.
7. Draft'taki yeni action publish edilmeden callable olmaz.
8. Duplicate submit aynı idempotency key ile tek entity üretir.
9. Booking service target business'a ait değilse reject edilir.
10. Booking unavailable/conflicting slotta 409/uygun conflict sonucu üretir.
11. Booking tenant timezone ile doğrulanır.
12. Checkout price client tarafından azaltıldığında server authoritative fiyatı kullanır veya reject eder.
13. Product başka shop'a aitse checkout/order reject edilir.
14. Coupon/shipping server-side policy'den hesaplanır.
15. Distributed rate limit birden fazla instance'ta ortak davranır.
16. Lead source host/revision/action'dan derive edilir.
17. Consent record policy/version/server timestamp taşır.
18. Domain commit sonrası notification outbox'a durable yazılır.
19. Notification provider failure committed booking/order/lead'i kaybettirmez.
20. `WHATSAPP_OPEN` yalnız external action olarak kaydedilir; lead yaratmış sayılmaz.

---

## 40. Migration sırası

### Faz A - Contract

- `PublicActionType`
- `PublicCapabilityManifest`
- `PublicActionInput/Result`
- idempotency contract
- consent evidence

### Faz B - Gateway

- domain/revision resolver
- distributed rate limit
- abuse policy
- action resolver
- idempotency claim
- command router

### Faz C - İlk gerçek vertical

İlk olarak contact/inquiry bağlanmalı:

```text
ContactSimpleForm / ContactInbox
→ INQUIRY_CREATE
→ CRM Core
```

Bu en düşük transactional risk ile gateway'i kanıtlar.

### Faz D - Booking

```text
BookingModule
→ availability projection
→ BOOKING_REQUEST
→ Booking Core
```

### Faz E - Commerce

```text
OrderModule
→ ORDER_CREATE
→ server price snapshot
→ CHECKOUT_START
→ Payment Core
```

### Faz F - Legacy cleanup

- fake success kaldır,
- duplicate public endpoints adapter/deprecated yap,
- caller-owned tenant IDs kaldır,
- in-memory limiter'ı production ingress'ten kaldır,
- fire-and-forget notification paths kaldır.

---

## 41. Bu turda neyi özellikle yapmadık?

Bu söküm implementation yapmadı.

Ayrıca şunları tam olarak çözmedi:

- authentication/session architecture,
- tenant membership authority,
- staff/admin roles,
- static/shared admin token davranışı,
- worker/service-to-service secrets,
- support impersonation,
- secret rotation,
- all API guards consistency.

Bunlar Public Action Gateway'in arkasındaki trust graph'ı belirleyecek bir sonraki frontier'dır.

---

# SÖKÜM 28 SONUÇ

Kepenk'in public interaction yüzeyi için hüküm:

> **Vitrini koruyoruz, sahte kasayı söküyoruz.**

Repo içinde gerçek Booking/Commerce/Payment motorlarından işe yarar parçalar vardır. Ancak public site component'leri bugün bu motorlara authoritative bir capability sınırı üzerinden bağlı değildir.

Yeni sistemde:

```text
public UI
   != authority

request body tenant id
   != authority

client price
   != authority

checkbox
   != consent record

local success state
   != committed command
```

Authority şurada olacaktır:

```text
PublishedSiteRevision
  → PublicCapabilityManifest
  → PublicActionGateway
  → domain command
  → committed domain state
```

Böylece site yalnız güzel görünen bir vitrin değil, CRM/Booking/Commerce motorlarına güvenli biçimde bağlanan gerçek bir **public transaction surface** olur.

---

## Sıradaki frontier

### SÖKÜM 29 - Identity / Session / Tenant Context / API Guard / Service Trust Boundary

Sıradaki turda özellikle şunlar doğrulanacak:

- auth identity'nin tenant/business membership'e nasıl bağlandığı,
- session authority ve stale session davranışı,
- `requireSessionEsnaf` ve diğer ownership guard'ların tutarlılığı,
- `apiGuard` ve `requireAdminToken` gerçek trust modeli,
- caller body/query'den tenant context seçilen bypass'lar,
- role/permission ile package entitlement ayrımı,
- worker secret / cron / Cloud Tasks / webhook service-to-service trust,
- admin/support/impersonation yolları,
- cross-tenant read/write sınırı,
- secret/config authority ve rotation yüzeyi.

SÖKÜM 29'un hedefi:

> **“Kim olduğun” ile “hangi tenant adına ne yapabileceğin” kavramlarını tek bir fail-closed trust graph'a bağlamak.**
