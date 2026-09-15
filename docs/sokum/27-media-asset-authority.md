# SÖKÜM 27 - Media / Asset Storage / Upload / CDN / Immutable Asset Reference Authority

> **Tarih:** 2026-09-15  
> **Durum:** KAPALI  
> **Verdict:** **KEEP the current editor image UX, Unsplash provider service, site-schema media intent and renderer hooks; REWRITE MediaRef as an asset reference instead of a URL envelope; BUILD a tenant-owned immutable Asset Core with upload/import, validation, derivatives, provenance, quota, retention and GC; CONNECT publish to pinned ready assets; DROP browser-blob uploads and arbitrary mutable production URLs as canonical media after migration.**

## 1. Neyi doğruladık?

SÖKÜM 25 public delivery authority'yi, SÖKÜM 26 draft/publish/domain write authority'yi kapattı. Bu tur bir published revision'ın görsellerinin gerçekten sabit kalıp kalmadığını inceledi.

Başlıca doğrulanan parçalar:

- `packages/site-schema/src/component.ts`
- `packages/site-schema/src/manifest.ts`
- `packages/site-schema/src/page.ts`
- `packages/site-schema/src/index.ts`
- `packages/renderer/src/components/Content.tsx`
- `packages/renderer/src/layout-to-css.ts`
- `packages/publish-engine/src/*`
- `apps/web/src/app/dashboard/sitem/editor/components/MediaPanel.tsx`
- `apps/web/src/app/dashboard/sitem/editor/components/ImageEditOverlay.tsx`
- `apps/web/src/app/dashboard/sitem/editor/store/editor-store.ts`
- `apps/web/src/lib/unsplashService.ts`
- `apps/web/src/app/api/unsplash/route.ts`
- `firebase.json`

Ana sonuç:

> Repoda bugün gerçek bir **Asset Authority** yoktur. Media state URL tabanlıdır. Kullanıcı dosyası kalıcı storage'a gitmez, Unsplash görseli provider URL'siyle doğrudan draft'a yazılır, arbitrary external URL kabul edilir ve renderer bu URL'leri doğrudan public output'a taşır.

Bu nedenle SÖKÜM 25-26'da kurduğumuz immutable publish modeli, media tarafı çözülmeden gerçekte immutable sayılamaz.

---

## 2. `MediaRef` bugün neyi temsil ediyor?

`@kepenk/site-schema` içindeki mevcut `MediaRefSchema`:

```text
MediaRef {
  url
  alt
  width
  height
  format
  blurhash?
}
```

Bu faydalı presentation metadata'sı içeriyor. Ancak asset identity için gerekli kritik alanlar yok:

- `assetId`
- tenant/business owner
- content hash
- immutable object/storage key
- source/provenance
- lifecycle status
- variant/derivative identity
- createdBy / createdAt
- byte size
- canonical MIME type

Dolayısıyla mevcut MediaRef:

> **asset reference değil, URL + presentation metadata zarfıdır.**

### KEEP

- `alt`
- dimensions
- format intent
- blurhash
- site schema içinde typed media referansı bulunması fikri

### REWRITE

MediaRef storage/provider URL'sini authority olarak taşımamalı.

---

## 3. Editor `MediaPanel` gerçek medya kütüphanesi değil

`MediaPanel.tsx` başlığı ve yorumları media library dili kullanıyor.

Gerçek davranış:

```text
search query
   ↓
/api/unsplash
   ↓
Unsplash photos[]
   ↓
photo.urls.regular
   ↓
updateSiteData({ unsplash: url })
```

Yani:

- upload edilmiş asset listesi yok,
- tenant asset repository yok,
- assetId yok,
- folder yalnız gerçek olmayan editor type dünyasında var,
- delete/retire yok,
- persist edilmiş library pagination yok,
- usage/reference bilgisi yok.

`editor-store.ts` içinde `MediaItem` ve `mediaLibrary` state'i tanımlı:

```text
MediaItem {
  id
  url
  alt
  folder
  fileName
  createdAt
}
```

ve store başlangıcında:

```text
mediaLibrary: []
```

bulunuyor. Fakat doğrulanan MediaPanel bu state'i authoritative library olarak kullanmıyor; kendi geçici `photos` state'ini kullanıyor.

### Verdict

Mevcut MediaPanel UX fikri **KEEP**.

"Media library" adı altında persistent authority varmış gibi davranılması **REWRITE**.

---

## 4. `Bilgisayardan Yükle` gerçek upload değildir

`ImageEditOverlay.tsx` içindeki file input:

```text
<input type="file" accept="image/*" />
```

kullanıyor.

Fakat dosya seçilince yapılan işlem:

```text
const url = URL.createObjectURL(file)
sendToIframe(url)
```

Bu `blob:` URL:

- browser process/session'a bağlıdır,
- server storage'a yüklenmez,
- başka cihazda çalışmaz,
- başka origin/public runtime'da güvenilir değildir,
- browser reload sonrası kalıcı asset identity değildir,
- published artifact içine koyulabilecek durable URL değildir.

Üstelik file size, gerçek MIME, image decode, dimensions, malware/abuse policy veya quota kontrolü de yapılmıyor.

### Karar

`URL.createObjectURL` yalnız **local preview** için kullanılabilir.

Save/publish edilebilir canonical media ref olamaz.

Gerçek akış:

```text
select file
   ↓
UploadIntent
   ↓
server-authorized upload
   ↓
validation / normalization
   ↓
AssetRecord READY
   ↓
MediaRef(assetId, variant)
```

olmalıdır.

---

## 5. Arbitrary external URL doğrudan state'e giriyor

Image editor ayrıca kullanıcıya:

```text
URL ile Değiştir
```

seçeneği veriyor.

Input değeri yalnız `.trim()` edilip doğrudan `sendToIframe()` ile uygulanıyor.

Doğrulanan akışta:

- scheme policy yok,
- provider allowlist yok,
- URL validation yok,
- content type doğrulaması yok,
- import/snapshot yok,
- immutable copy yok,
- provenance kaydı yok.

Bu yüzden draft/public site şunlara bağımlı olabilir:

- sonradan değişen remote dosya,
- silinen hotlink,
- erişim kontrollü URL,
- query-token süresi dolan URL,
- üçüncü taraf tracking origin'i,
- sahibinin değiştirebildiği içerik.

### Karar

External URL iki şekilde ele alınabilir:

1. **Import:** server asset'i indirir, doğrular, kendi immutable storage'ına alır ve normal AssetRecord üretir.
2. **Explicit external asset:** yalnız izin verilen özel durumlarda provider/provenance ile işaretlenir ve publish policy bunu açıkça kabul eder.

Sessiz arbitrary URL production truth olamaz.

---

## 6. Unsplash entegrasyonunda iyi bir motor var ama authority'ye bağlanmamış

`UnsplashService` değerlidir.

Mevcut güçlü parçalar:

- server-side API key kullanımı,
- typed photo metadata,
- dimensions,
- `blur_hash`,
- author/user bilgisi,
- `download_location`,
- `trackDownload()` helper'ı,
- query cache,
- rate limit takibi,
- circuit breaker,
- fallback modeli,
- `content_filter=high`.

Bu provider adapter intent'i **KEEP** edilmelidir.

Fakat editor seçim akışı yalnız:

```text
photo.urls.regular
```

değerini site state'e yazıyor.

Şunlar Asset Core'a taşınmıyor:

- Unsplash photo id
- photographer identity
- source page
- download_location
- source provider
- original dimensions
- blurhash
- attribution/provenance metadata

Ayrıca doğrulanan seçim yolunda `trackDownload()` çağrısı bulunmuyor.

Bu belge hukuki uygunluk kararı vermiyor. Mimari karar şudur:

> Provider'ın zorunlu/önemli provenance metadata'sı UI'da kaybolmamalı; Asset Import katmanının parçası olmalıdır.

---

## 7. Repo içinde canonical storage pipeline yok

Doğrulanan default branch'te media için:

- `firebase/storage` upload yolu bulunmadı,
- Admin Storage upload authority bulunmadı,
- storage-backed media API bulunmadı,
- root `storage.rules` bulunmadı,
- media object repository bulunmadı.

`firebase.json` Storage emulator portu tanımlıyor fakat Firestore için olduğu gibi bir Storage rules dosyası bağlamıyor.

Bu yüzden burada "mevcut storage adapter'ı bağlayalım" diyemeyiz.

### Verdict

**Asset Core BUILD gerekir.**

Storage provider seçimi ise ayrı adapter kararıdır. Firebase Storage, Cloudflare R2 veya başka object storage kullanılabilir. Provider canonical asset identity olmamalıdır.

---

## 8. Renderer URL'yi olduğu gibi public output'a geçiriyor

Yeni `@kepenk/renderer` içinde Image renderer:

```text
src={data.src}
alt={data.alt}
```

kullanıyor.

Background image converter da:

```text
backgroundImage = url(style.backgroundImage.url)
```

şeklinde `MediaRef.url` değerini doğrudan CSS'e koyuyor.

Renderer'ın storage bilmemesi aslında iyi bir prensiptir.

Yanlış olan:

> renderer'a gelen canonical media state'in hâlâ raw/mutable URL olmasıdır.

### Canonical sınır

Renderer şu tipte resolve edilmiş published ref tüketebilir:

```text
PublishedMediaRef {
  assetId
  revision/contentHash
  url
  width
  height
  format
  alt
  integrity?
}
```

Buradaki `url` artık authority değil, publish sırasında asset identity'den türetilmiş delivery locator olur.

---

## 9. Publish engine media'yı pinlemiyor

`@kepenk/publish-engine` bugün:

- page HTML,
- SEO,
- JSON-LD,
- sitemap,
- robots,
- redirects/deploy manifest helpers

üretiyor.

Asset discovery/pinning katmanı görünmüyor.

Yani publish sırasında şu sorular cevaplanmıyor:

```text
Bu page hangi asset'leri kullanıyor?
Hepsi READY mi?
Aynı tenant'a mı ait?
Content hash'leri doğrulanmış mı?
Published revision hangi exact derivative'i kullanıyor?
Bir asset sonradan silinirse rollback çalışır mı?
```

### Karar

PublishCommand, page/master validation'dan sonra **asset closure** çıkarmalıdır.

Örnek:

```text
SiteManifest + PageDocs + MasterPage
             ↓
collect MediaRefs
             ↓
resolve AssetRecords
             ↓
ownership + READY + hash + policy validation
             ↓
PublishedAssetSet
             ↓
generate/deploy
```

Bir asset eksikse active published pointer değişmemelidir.

---

## 10. Rollback media yüzünden bozulabilir

SÖKÜM 25-26'da rollback hedefi:

```text
active publish pointer v12 -> v11
```

olarak tanımlandı.

Fakat v11 içindeki görsel yalnız mutable bir URL ise:

- remote dosya değişmiş olabilir,
- remote dosya silinmiş olabilir,
- aynı storage key overwrite edilmiş olabilir,
- authorization token süresi dolmuş olabilir.

Bu durumda HTML/manifest geri dönse bile görsel tarihsel olarak geri dönmez.

### Critical invariant

> **Published revision rollback, asset bytes rollback'ını da garanti etmelidir.**

Bunun en sağlam yolu content-addressed / immutable object identity'dir.

---

## 11. Canonical Asset Core

Yeni authority en az şu kavramları ayırmalıdır.

```text
AssetRecord {
  assetId
  tenantId
  businessId
  sourceType: upload | external-import | unsplash | ai-generated | system
  sourceRef?
  originalContentHash
  mimeType
  byteSize
  width
  height
  storageKey
  status: pending | processing | ready | blocked | retired
  createdBy
  createdAt
  retiredAt?
  provenance?
}
```

Binary/object identity:

```text
AssetBlob {
  contentHash
  storageProvider
  immutableObjectKey
  byteSize
  mimeType
  integrity
}
```

Derivative:

```text
AssetVariant {
  variantId
  assetId
  sourceHash
  transformSpec
  contentHash
  width
  height
  format
  storageKey
  byteSize
  status
}
```

### Neden üç katman?

- AssetRecord kullanıcı/business ownership ve lifecycle taşır.
- AssetBlob byte kimliğini taşır.
- AssetVariant crop/resize/format türevlerini taşır.

Böylece aynı binary dedupe edilebilir ama tenant ownership birbirine sızmaz.

---

## 12. Yeni `MediaRef`

Site schema canonical media ref'i URL'ye değil asset identity'ye bağlamalı.

Önerilen minimum:

```text
MediaRef {
  assetId
  variant?: string
  contentHash?: string
  alt
  focalPoint?
  crop?
}
```

Draft'ta `contentHash` resolve edilmemiş olabilir.

Publish snapshot'ta ise exact immutable revision pinlenmelidir:

```text
PublishedMediaRef {
  assetId
  variantId
  contentHash
  deliveryUrl
  width
  height
  format
  alt
}
```

### Ayrım

`alt`, crop ve focal point site/presentation state'idir.

Asset binary identity'sini mutate etmemelidir.

---

## 13. Upload lifecycle

Canonical upload akışı:

```text
Authenticated editor
      ↓
CreateUploadIntent
      ↓
verify tenant/site authority
verify entitlement/quota
      ↓
short-lived upload authorization
      ↓
object staged
      ↓
server finalize
      ↓
byte-size + MIME sniff + decode + dimensions + hash
      ↓
policy/security checks
      ↓
derivatives
      ↓
AssetRecord READY
      ↓
editor receives assetId + preview ref
```

### Kurallar

- Client supplied MIME tek başına güvenilmez.
- Filename identity değildir.
- Public object path tenant authority değildir.
- Upload authorization kısa ömürlü ve scope'lu olmalıdır.
- Final AssetRecord server tarafından oluşturulmalıdır.
- Failed processing asset publish edilemez.

---

## 14. Storage key ve content hash

Published binary overwrite edilmemeli.

Örnek immutable key:

```text
assets/blobs/sha256/<hash>
```

veya provider'a uygun eşdeğer bir content-addressed yapı.

Tenant/editor-facing logical isim:

```text
logo.png
hero.jpg
```

byte identity değildir.

Kullanıcı "hero görselini değiştir" dediğinde:

```text
old asset/ref
   ≠ overwrite
new asset/ref
```

olmalıdır.

---

## 15. Dedupe tenant isolation'ı bozmamalı

Aynı binary hash iki tenant'ta bulunabilir.

Physical blob dedupe edilebilir.

Fakat authorization:

```text
Tenant A AssetRecord
Tenant B AssetRecord
```

olarak ayrı kalmalıdır.

Bir tenant yalnız hash'i tahmin ederek diğer tenant'ın private/draft asset'ini okuyamamalı veya kendi asset'i olarak bağlayamamalıdır.

Public delivery ancak published asset set üzerinden açılmalıdır.

---

## 16. Quota ve entitlement

Storage quota client UI kararı olamaz.

Server-side Asset Core şunları enforce etmelidir:

- allowed media types,
- max upload bytes,
- toplam storage quota,
- asset count,
- derivative budget,
- gerekiyorsa premium formats/features.

SÖKÜM 12'nin billing/entitlement authority'si burada dependency olmalıdır.

Asset payload içindeki `paket` veya client-provided tier authoritative olamaz.

---

## 17. CDN delivery authority değildir

CDN URL yalnız delivery projection'dır.

```text
Asset identity
     ↓
Storage adapter
     ↓
CDN delivery URL
```

Cloudflare/Firebase/provider URL'si canonical DB key yapılmamalıdır.

Provider migration:

```text
R2 -> başka object store
```

site manifestlerini yeniden yazmayı gerektirmemelidir.

---

## 18. Derivative / optimization policy

Aynı original image farklı kullanım için farklı türevler isteyebilir:

- hero wide,
- card,
- thumbnail,
- OG image,
- logo,
- favicon.

Canonical transform spec deterministik olmalı.

Örnek:

```text
variant = hero-1600
format = webp/avif
fit = cover
width = 1600
quality = policy-v1
```

Variant aynı source hash + transform policy için tekrar üretilebilir veya cache/dedupe edilebilir.

Renderer rastgele provider query parametreleriyle görsel kalitesi belirlememelidir.

---

## 19. SVG policy

Mevcut `MediaRef` SVG formatına izin veriyor.

SVG raster image ile aynı güvenlik/policy sınıfı kabul edilmemelidir.

Asset finalize aşamasında explicit SVG policy gerekir:

- sanitize veya reject,
- external references policy,
- script/event handler policy,
- size/resource bounds.

Bu detay storage provider'a bırakılamaz.

---

## 20. External ve provider provenance

Imported/provider asset en az şunları taşımalıdır:

```text
provenance {
  provider
  providerAssetId
  sourceUrl
  creatorName?
  creatorUrl?
  licenseRef?
  importedAt
  providerMetadata?
}
```

Unsplash özelinde mevcut service zaten bu verinin önemli bölümünü alıyor.

Yapılacak iş provider object'ini raw URL'ye indirgemek değil, AssetImport command'a çevirmektir.

---

## 21. AI generated media

Gelecekte image generation veya AI creative üretimi ayrı asset authority kurmamalıdır.

Akış:

```text
AI generation result
   ↓
Asset Import / Finalize
   ↓
AssetRecord(sourceType=ai-generated)
   ↓
normal MediaRef
```

Provenance model/model-version/prompt-policy metadata gerekiyorsa AssetRecord'a eklenebilir.

Site renderer açısından AI görseli ile kullanıcının yüklediği görsel aynı canonical contract'ı kullanmalıdır.

---

## 22. Delete, retire ve GC

Hard delete kullanıcı butonuna doğrudan bağlanmamalıdır.

Bir asset:

- current draft,
- active published revision,
- historical published revision,
- rollback target,
- başka sayfa/site

tarafından referanslanıyor olabilir.

Canonical lifecycle:

```text
ACTIVE/READY
   ↓
RETIRE requested
   ↓
new drafts cannot select
   ↓
existing published revisions still resolve
   ↓
reference + retention check
   ↓
GC eligible
   ↓
physical delete
```

### GC koşulu

Physical blob ancak:

- hiçbir retained published revision referanslamıyor,
- hiçbir retained draft/history referanslamıyor,
- retention süresi dolmuş,
- legal/audit hold yok

ise silinebilir.

---

## 23. Publish contract

SÖKÜM 26 PublishCommand şu adımı kazanmalıdır:

```text
validate SiteDraft
      ↓
collect every MediaRef
      ↓
resolve through Asset Core
      ↓
assert tenant ownership
assert READY
assert allowed/publishable
assert pinned content hash/variant
      ↓
build PublishedAssetSet
      ↓
generate HTML/artifacts
      ↓
activate PublishedSiteRevision
```

Published revision en az asset set hash/ref taşımalıdır.

Örnek:

```text
PublishedSiteRevision {
  ...
  assetSetHash
  assetRefs[]
}
```

Bu sayede deploy başarı kriteri yalnız HTML generation değildir.

---

## 24. Public runtime contract

`apps/sites` storage admin API'siyle rastgele object aramamalıdır.

Public runtime:

```text
PublishedSiteRevision
   ↓
resolved PublishedMediaRef / static artifact
   ↓
CDN/object delivery
```

okumalıdır.

Public renderer'a:

- upload permission,
- delete permission,
- bucket listing,
- transform mutation,
- tenant-private asset lookup

gerekmez.

SÖKÜM 25 least-privilege kararı burada da korunur.

---

## 25. KEEP

- Editor içindeki image-click ve image-replace UX'i.
- MediaPanel arama deneyimi.
- Unsplash server proxy/service yapısı.
- Unsplash typed metadata, rate limiting, cache ve circuit breaker intent'i.
- `MediaRef` kavramı.
- alt/dimensions/format/blurhash metadata intent'i.
- `@kepenk/renderer`ın storage provider bilmemesi.
- Image ve background-image renderer hook'ları.
- Object URL'nin yalnız ephemeral local preview amacıyla kullanılması.

---

## 26. REWRITE / CONNECT

- `MediaRef.url` authority -> `assetId + immutable revision/variant`.
- MediaPanel -> gerçek tenant asset library + provider imports.
- file input -> UploadIntent/finalize pipeline.
- external URL -> validated import/policy flow.
- Unsplash selection -> AssetImport + provenance + required provider hooks.
- renderer input -> publish-resolved immutable delivery ref.
- publish-engine -> asset closure + PublishedAssetSet.
- editor media state -> canonical draft MediaRef.
- storage quota -> billing/entitlement authority.
- delete -> retire + reference-safe GC.

---

## 27. BUILD

Yeni inşa edilmesi gereken çekirdekler:

- AssetRecord repository
- immutable blob/object adapter
- upload intent API
- finalize/validation worker/service
- MIME/size/dimension validation
- content hashing
- tenant ownership enforcement
- media quota enforcement
- derivative pipeline
- provenance model
- asset library query API
- publish asset collector/resolver
- PublishedAssetSet
- retire/reference/GC lifecycle
- provider adapters
- asset observability/audit

---

## 28. DROP adayları

Yeni authority devreye girdikten sonra:

- `blob:` URL'yi save/publish edilebilir görsel kabul etmek,
- arbitrary external URL'yi production MediaRef olarak direkt persist etmek,
- Unsplash `urls.regular` değerini tek başına canonical asset saymak,
- mutable provider URL'sini historical publish identity saymak,
- aynı storage key'i overwrite ederek görsel güncellemek,
- client filename'i asset identity kabul etmek,
- tenant ownership'i path/URL tahminine bırakmak,
- publish sırasında asset existence/readiness doğrulamamak,
- published revision tarafından kullanılan binary'yi anında hard-delete etmek,
- CDN/provider URL'sini business authority yapmak,
- in-memory Zustand `mediaLibrary` state'ini gerçek asset repository saymak.

---

## 29. Migration sırası

Big-bang gerekmez.

1. `AssetRecord`, `AssetVariant`, canonical MediaRef v2 contract'ını tanımla.
2. Storage provider adapter'ı ekle.
3. UploadIntent + finalize hattını kur.
4. Editor file upload'ı bu hatta bağla.
5. Asset library API/UI'ı bağla.
6. Unsplash selection'ı AssetImport'a çevir.
7. External URL import policy'sini ekle.
8. Legacy URL-only media için migration adapter yaz.
9. Ulaşılabilir legacy remote asset'leri kontrollü backfill/import et.
10. Draft serializer canonical MediaRef üretmeye başlasın.
11. PublishCommand asset closure + readiness validation eklesin.
12. PublishedAssetSet'i revision'a pinle.
13. Public runtime/CDN delivery'yi yeni ref'lerden besle.
14. Rollback smoke'larını geçir.
15. Legacy URL authority'yi telemetry altında kapat.
16. Retire/GC worker'ını en son aktive et.

---

## 30. Kritik invariants

1. Draft'a dosya eklemek public site'ı değiştirmez.
2. Published revision kullanılan exact asset bytes'ını pinler.
3. Published asset bytes in-place overwrite edilmez.
4. Rollback hem HTML/state hem asset bytes açısından tarihsel output'u geri getirir.
5. MediaRef canonical olarak raw mutable URL'ye dayanmaz.
6. Bir tenant başka tenant asset'ini assetId/hash tahminiyle bağlayamaz.
7. Upload finalize server-side doğrulanır.
8. Client MIME/filename authoritative değildir.
9. READY olmayan asset publish edilemez.
10. Retired asset mevcut retained published revision'ları bozmaz.
11. Physical delete reference-safe ve retention-aware olur.
12. CDN/storage provider asset identity değildir.
13. Unsplash/external/AI kaynakları provenance taşır.
14. Entitlement/quota server-side enforce edilir.
15. Renderer provider credentials veya storage mutation capability taşımaz.
16. Public runtime private/draft asset listesi okuyamaz.
17. Derivative identity source hash + transform policy ile deterministiktir.
18. SVG explicit güvenlik policy'sinden geçer.
19. Publish success, bütün required assets READY olmadan dönmez.
20. External asset kullanımı explicit policy ile yapılır, sessiz hotlink production truth değildir.

---

## 31. Smoke / probe seti

Minimum acceptance:

- local file select -> upload intent -> READY asset -> draft preview
- refresh/new device -> aynı asset resolve olur
- failed upload -> draft reference publish edilemez
- spoofed MIME -> finalize reject
- oversized file -> quota/policy reject
- Tenant A assetId -> Tenant B draft'a eklenemez
- same bytes two tenants -> physical dedupe olsa bile ownership ayrı
- replace hero -> old published revision eski bytes'ı göstermeye devam eder
- publish v1 asset A -> draft asset B -> public hâlâ A
- publish v2 asset B -> public B
- rollback v2 -> v1 -> public tekrar A
- retired A -> retained v1 rollback hâlâ A
- GC before retention/reference clear -> engellenir
- GC after all refs clear -> physical delete eligible
- Unsplash import -> provider photo id + provenance korunur
- external URL import -> own immutable asset oluşur
- inaccessible external URL -> publishable ref oluşmaz
- browser `blob:` URL -> save/publish validation reject
- arbitrary unsupported scheme -> reject
- derivative hero/card -> farklı deterministic refs
- CDN host değişimi -> manifest/site draft rewrite gerekmez
- missing published asset during activation -> previous active revision kalır

---

# SÖKÜM 27 Son Kararı

Media tarafında kurtarılacak şey storage implementation değildir, çünkü canonical storage authority bugün yoktur.

Kurtarılacak parçalar:

```text
Editor image UX
+ Unsplash provider service
+ typed media metadata intent
+ renderer image hooks
```

Atılacak authority varsayımı:

```text
URL == asset
```

Yeni motor:

```text
Upload / Import / AI
        ↓
     Asset Core
        ↓
immutable blob + provenance
        ↓
AssetRecord / Variant
        ↓
canonical MediaRef
        ↓
SiteDraft
        ↓
Publish asset closure
        ↓
PublishedAssetSet
        ↓
PublishedSiteRevision
        ↓
CDN delivery
```

olmalıdır.

SÖKÜM 25, 26 ve 27 birlikte site platformunun read, write ve byte katmanlarını artık tek mimaride birleştiriyor.

---

# SÖKÜM 28 - AÇIK FRONTIER

## Public Interaction Runtime / Forms / Lead Capture / Action Capability Boundary

Site artık yalnız okunur HTML değildir. Contact form, WhatsApp CTA, booking, commerce ve diğer public aksiyonların hangi authority'ye yazdığı incelenmelidir.

Sıradaki sorular:

- `packages/renderer` içindeki contact/action component'leri gerçekten nereye POST ediyor?
- Public site hangi API'lere tenant/site/business kimliği geçiriyor?
- Hostname/domain binding ile action target aynı tenant'a kriptografik/authoritative bağlanıyor mu?
- Body'den gelen `esnafId/shopId/businessId` trust ediliyor mu?
- Contact form lead'i CRM Customer Core'a mı, ayrı koleksiyona mı yazıyor?
- Booking CTA gerçek Booking authority'ye mi gidiyor, legacy route'a mı?
- Public commerce action'ları Commerce Core'a mı bağlı?
- CSRF/CORS/origin, abuse/rate limit, bot/spam ve idempotency sınırı nasıl kuruluyor?
- Public renderer'ın admin mutation helper'larına ihtiyacı var mı?
- Bir published component hangi capability'yi çağırabileceğini nasıl beyan ediyor?
- Form/action schema publish revision ile pinli mi?
- Public action event'i analytics/attribution/customer timeline'a nasıl bağlanıyor?

**SÖKÜM 28 için henüz verdict yazılmamalıdır.**