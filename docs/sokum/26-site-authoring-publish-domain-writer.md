# SÖKÜM 26 - Site Authoring / Draft -> Publish Command / Artifact Storage / Domain Binding Writer

> **Tarih:** 2026-09-15  
> **Durum:** KAPALI  
> **Verdict:** **KEEP the current editor UX, Site Schema/renderer/publish primitives, durable generation trigger and provider adapters; REWRITE authoring serialization, draft authority, publish orchestration, version/rollback and domain writer; CONNECT the ThemeConfig AST editor to the canonical SiteManifest artifact model; DROP direct mutable public writes, duplicate publish/domain/version authorities and client-side entitlement authority after migration.**

## 1. Neyi doğruladık?

SÖKÜM 25 public/read tarafını kapattı. Bu tur write tarafını, yani bir sitenin nerede oluşturulduğunu, kaydedildiğini, yayınlandığını, versiyonlandığını ve domain'e bağlandığını gerçek çağrı yolları üzerinden izledi.

Başlıca doğrulanan parçalar:

- `apps/web/src/app/dashboard/sitem/editor/page.tsx`
- `apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx`
- `apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx`
- `apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx`
- `apps/web/src/app/dashboard/sitem/editor/components/SettingsModal.tsx`
- `apps/web/src/app/dashboard/sitem/editor/store/editor-store.ts`
- `apps/web/src/app/dashboard/sitem/editor/hooks/useAutosave.ts`
- `apps/web/src/app/editor-preview/page.tsx`
- `apps/web/src/utils/themeToSiteData.ts`
- `apps/web/src/app/api/site/editor-kaydet/route.ts`
- `apps/web/src/app/api/site/publish/route.ts`
- `apps/web/src/app/api/site/v2/save/route.ts`
- `apps/web/src/app/api/site/v2/publish/route.ts`
- `apps/web/src/app/api/site/uret/route.ts`
- `apps/web/src/app/api/site/provision/route.ts`
- `apps/web/src/app/api/site/guncelle/route.ts`
- `apps/web/src/app/api/workers/site-ureticisi/route.ts`
- `apps/web/src/utils/siteUreticisi.ts`
- `apps/web/src/app/api/site/versiyonlar/route.ts`
- `apps/web/src/lib/siteVersiyonlari.ts`
- `apps/web/src/app/dashboard/sitem/domain/page.tsx`
- `apps/web/src/app/api/domain/sec/route.ts`
- `apps/web/src/app/api/domain/register/route.ts`
- `apps/web/src/lib/cloudflareRegistrar.ts`
- `apps/web/src/lib/cloudflarePagesClient.ts`
- `packages/cloudflare/dns.ts`
- `packages/cloudflare/registrar.ts`
- `packages/site-schema/*`
- `packages/publish-engine/*`
- `apps/web/src/app/dashboard/sitem/moduller/page.tsx`
- `apps/web/src/app/api/esnaf/sync-moduller/route.ts`

Ana sonuç:

> Repoda yalnız iki değil, **birden fazla paralel authoring/publish/domain authority** aynı anda yaşıyor. Yeni `site-schema -> renderer -> publish-engine` omurgası doğru yöne yakın, fakat bugünkü editör, generator, version history, domain writer ve public runtime henüz bu omurgada birleşmiyor.

En kritik bug bugünün mimari problemini tek satırda özetliyor:

> **Autosave, yayınlanmış public sitenin okuduğu `esnaflar.siteData` alanını doğrudan değiştirebiliyor.**

Dolayısıyla bugünkü sistemde `draft != published` invariant'ı gerçek değildir.

---

## 2. Bugünkü gerçek authoring modeli

Primary görsel editör:

```text
/dashboard/sitem/editor
```

Eski:

```text
/dashboard/editor
```

yolu yalnız yeni editöre redirect ediyor.

Editörün gerçek state modeli `SiteManifest` değildir. `editor-store.ts` içinde aynı anda birkaç ayrı state adası vardır:

```text
pages: EditorPage[]
siteData: SiteData | null
siteSettings: SiteSettings
generatedHtml: string
activeSablonId
undo / redo
```

`SiteData` ise iki nesli aynı yapıda taşır:

```text
legacy flat fields
  sektorId
  heroBaslik
  hizmetler
  paket
  moduller
  ...

+

AST fields
  theme?: ThemeConfig
  business?: BusinessData
```

Bu model `@kepenk/site-schema` içindeki:

```text
SiteManifest
PageDocument
MasterPageDocument
PageRef/contentHash
```

modeli değildir.

### Karar

Editor internal state'in birebir `SiteManifest` olması zorunlu değildir. Görsel editör daha zengin transient state taşıyabilir.

Fakat **tek bir canonical serializer** zorunludur:

```text
EditorState
   ↓
validate + normalize + entitlement projection
   ↓
Canonical Site Draft
   ↓
SiteManifest + immutable page/master docs
```

Bugün bu sınır yoktur.

---

## 3. Editör state'inin bir bölümü hiç kaydedilmiyor

`siteSettings` içinde şunlar var:

- custom domain
- subdomain
- SEO title/description/keywords/OG
- business identity/contact
- social links
- privacy flags

Ayrıca editörün ayrı `pages` state'i bulunuyor.

Fakat autosave ve TopBar Kaydet/Yayınla akışları yalnız:

```text
siteData
siteHtml?
publish?
```

gönderiyor.

Yani editörde değiştirilebilen:

```text
siteSettings
pages
```

state'leri dirty işaretlenebilmesine rağmen mevcut ana save payload'ının parçası değildir.

Bu basit bir form bug'ı değildir.

> **Authoring state için tek serialization contract yoktur.**

### REWRITE

Kaydedilebilir bütün kullanıcı state'i ya canonical draft'ın parçası olmalı ya da açıkça başka authoritative domain'e bağlanmalı.

UI'da düzenlenebilen ama persist edilmeyen state yasaklanmalı.

---

## 4. Preview hangi motoru kullanıyor?

`Canvas.tsx`, `siteData.theme` varsa `/editor-preview` iframe'ini açıyor.

Iframe:

```text
ThemeConfig
+ BusinessData
   ↓
@kepenk/templates/ThemeRenderer
```

çalıştırıyor.

Yani mevcut görsel editörün "V2 AST" dediği dünya ile `@kepenk/site-schema` dünyası aynı şey değildir.

Repoda bugün iki ayrı "V2" anlamı vardır:

1. **ThemeConfig / AST editor V2**
2. **SiteManifest / PageDocument / MasterPageDocument publish V2**

Bunlar isim benzerliği nedeniyle tek mimariymiş gibi değerlendirilmemelidir.

### Karar

ThemeConfig editör modeli korunabilir, fakat public/publish authority olamaz.

Araya explicit adapter gerekir:

```text
ThemeConfig + BusinessData + Editor Pages + Site Settings
                     ↓
             Site Draft Adapter
                     ↓
 SiteManifest + PageDocuments + MasterPageDocument
```

---

## 5. Editor fallback adapter'ı eksik sözleşme üretiyor

`themeConfigToSiteData.ts`, ThemeConfig + BusinessData'dan legacy-compatible flat `SiteData` üretiyor.

Fakat dönen nesneye `theme` ve `business` alanlarını eklemiyor.

Buna karşılık Canvas preview:

```text
siteData?.theme
```

bekliyor.

Sonuç:

- daha önce AST siteData kaydı olan işletme editörde açılabilir,
- fakat fallback ile ilk kez oluşturulan SiteData yeni preview contract'ını tamamlamayabilir.

Bu adapter compatibility için değerlidir ama canonical authoring bridge değildir.

**Verdict: KEEP intent, REWRITE contract.**

---

## 6. Kaydet ve Yayınla bugün aynı mutable write'dır

`useAutosave.ts`:

```text
POST /api/site/editor-kaydet
{ siteJson: siteData }
```

`TopBar.handleSave`:

```text
POST /api/site/editor-kaydet
{
  siteJson: siteData,
  siteHtml
}
```

`TopBar.handlePublish`:

```text
POST /api/site/editor-kaydet
{
  siteJson: siteData,
  siteHtml,
  publish: true
}
```

Yani Kaydet ve Yayınla iki ayrı state transition değildir.

Aynı endpoint'e boolean farkıyla gider.

---

## 7. En kritik kırık: autosave public site'ı değiştirebilir

`/api/site/editor-kaydet` şu davranışa sahip:

```text
siteJson varsa
  → esnaflar/{id}.siteJson = siteJson

siteJson.theme varsa
  → esnaflar/{id}.siteData = siteJson
```

SÖKÜM 25'te doğrulanan public runtime ise:

```text
apps/sites
  ↓
esnaflar.siteData
  ↓
ThemeRenderer
```

okuyor.

Dolayısıyla:

```text
editor change
   ↓
3 saniye autosave
   ↓
siteData overwrite
   ↓
public runtime yeni mutable data'yı okuyabilir
```

Bu durumda kullanıcı **Yayınla'ya hiç basmadan** public site değişebilir.

### İhlal edilen invariant

```text
Draft change must never alter the active published revision.
```

### Karar

`editor-kaydet` yeni mimaride yalnız draft state'e yazabilir.

Public runtime'ın okuduğu hiçbir pointer/artifact/save field'ına dokunamaz.

---

## 8. `publish: true` gerçek publish değildir

`editor-kaydet` içinde publish true olduğunda ek olarak yalnız:

```text
sonYayinTarihi = now
yayinda = true
revalidateTag(...)
```

yazılıyor.

Artifact generation, hash verification, immutable storage veya atomic pointer swap yok.

Bu:

> mutable document update + publish label

modelidir.

Canonical publish değildir.

---

## 9. UI başarı göstergesi committed publish anlamına gelmiyor

Feature flags save/publish işlemini `503 SITE_FEATURE_DISABLED` ile kapatabiliyor.

Autosave `res.ok` kontrol ediyor.

Fakat `TopBar.handleSave` ve `TopBar.handlePublish` response status kontrol etmiyor.

`fetch()` HTTP 4xx/5xx için exception atmadığı için:

```text
server: 503 publish disabled
UI: success modal
```

senaryosu mümkündür.

### Canonical invariant

```text
UI publish success
    ==
active publish pointer committed
```

UI, yalnız API'nin committed publish sonucu döndüğünde başarı göstermeli.

### Ek küçük yarış

Hem `useAutosave` hem `TopBar` Ctrl/Cmd+S listener'ı kuruyor. Tek klavye save'i iki request tetikleyebilir.

Bu publish authority problemi kadar kritik değildir fakat canonical save command'a geçerken temizlenmelidir.

---

## 10. Ayrı legacy `/api/site/publish` ikinci publish authority

Repoda ayrıca:

```text
/api/site/publish
```

var.

Bu endpoint:

- siteData / bloklar / temaId update ediyor,
- `sonYayinTarihi` basıyor,
- legacy versiyon kaydı oluşturuyor,
- cache tag temizlemeye çalışıyor.

Fakat versiyon snapshot'ı update'ten önce okunmuş `esnafData.siteJson` üzerinden oluşturuluyor.

Bu nedenle publish request'i yeni state taşısa bile versiyon snapshot'ı önceki state'i temsil edebilir.

Ayrıca `siteGuncelleSema.siteData` yapısal olarak yalnız:

```text
z.record(z.string(), z.any())
```

ile korunuyor.

Bu, canonical site schema validation değildir.

### Verdict

Bu endpoint primary publish authority yapılmamalıdır.

Yeni PublishCommand devreye girdikten sonra **DROP** adayıdır.

---

## 11. `site/v2/save` doğru isimde ama immutable draft store değil

`/api/site/v2/save` şu girdiyi alıyor:

```text
manifest
page
masterPage
```

ve doğrudan aynı `esnaflar/{id}` dokümanına:

```text
siteV2.manifest
siteV2.page
siteV2.masterPage
siteV2.version
```

overwrite ediyor.

Burada:

- schema validator çağrılmıyor,
- content hash doğrulanmıyor,
- page/master hash-addressed storage'a persist edilmiyor,
- revision compare-and-swap yok,
- version client'ın gönderdiği manifest.version'dan geliyor.

### Verdict

Endpoint adı ve hedef contract değerlidir.

**KEEP concept, REWRITE implementation.**

Bu route canonical Draft Save Command'a evrilebilir.

---

## 12. `site/v2/publish` bugünkü en iyi publish adayı ama orchestration tamamlanmamış

Bu endpoint değerli bir çekirdeğe sahip:

```text
SiteManifest
+ PageDocument
+ MasterPageDocument
        ↓
@kepenk/publish-engine
        ↓
static HTML + sitemap + robots
```

Ayrıca `publishedVersion` ve publish snapshot kavramlarını kullanıyor.

Fakat hâlâ kritik eksikler var:

- request payload Zod/schema validation'dan geçmiyor,
- supplied `contentHash` değerleri recompute edilip doğrulanmıyor,
- manifest PageRef hash'i ile PageDocument hash'i bağlanmıyor,
- master page hash'i doğrulanmıyor,
- artifact store yok,
- page/master inline mutable field olarak overwrite ediliyor,
- `publishedVersion` server monotonic authority değil, caller manifest.version'a bağlı,
- active publish pointer yok,
- publish transaction yok,
- domain binding atomik güncellenmiyor,
- failed deploy eski active revision'ı koruyan state machine yok,
- public runtime bu `siteV2` state'i zaten okumuyor.

### Verdict

`/api/site/v2/publish` atılmamalı.

> **Canonical PublishCommand için en iyi mevcut seed budur.**

Ama bugünkü haliyle production publish authority değildir.

---

## 13. Site Schema immutable modeli hazır, persistence yok

`@kepenk/site-schema` açıkça şunları tanımlıyor:

```text
SiteManifest
  manifestId
  siteId
  esnafId
  version
  publishedVersion
  pages[] -> contentHash
  masterPage -> contentHash
```

`PageDocument`:

```text
immutable + contentHash
```

`MasterPageDocument` da contentHash taşıyor.

`validators.ts` içinde:

- manifest validation,
- page validation,
- master validation,
- component validation,
- SHA-256 content hashing

hazır.

Eksik olan schema değildir.

Eksik olan:

> **Bu schema'nın vaat ettiği storage semantics.**

### BUILD / CONNECT

Page/master JSON'ları hash-addressed immutable object olarak persist edilmeli.

Canonical store fiziksel olarak Firestore, object storage veya başka bir backend olabilir. Önemli invariant fiziksel ürün değil:

```text
same hash -> same immutable content
```

ve:

```text
published manifest -> bütün referenced hashes mevcut
```

olmasıdır.

---

## 14. Site generator explicit publish command'ı bypass ediyor

Yeni site üretim yolu:

```text
POST /api/site/uret
   ↓
Cloud Tasks
   ↓
/api/workers/site-ureticisi
   ↓
esnafSiteUret(esnafId)
```

Durable trigger tarafı olumlu.

Worker secret kontrolü de mevcut.

Fakat `esnafSiteUret` sonucu:

```text
slug
subdomain
subdomainUrl
siteData
siteVersiyon
```

doğrudan `esnaflar` dokümanına yazıyor.

Kodun kendi yorumu da bunu:

```text
Cloudflare deployment iptal edildi, site anında yayında
```

olarak açıklıyor.

Yani generator fiilen publish command'dır, fakat publish state machine'i yoktur.

### Karar

Cloud Tasks orchestration **KEEP**.

Generator sonucu artık public field'a yazmamalı.

Hedef:

```text
Generate Site Draft
       ↓
Draft persisted
       ↓
(optional product policy)
PublishCommand
       ↓
normal canonical publish pipeline
```

Onboarding ürün politikası otomatik yayın istiyorsa bile ayrı bypass yazılmaz.

Aynı PublishCommand otomatik çağrılır.

---

## 15. `/api/site/provision` ikinci generator trigger

`/api/site/provision` ownership kontrolünden sonra `esnafSiteUret` fonksiyonunu doğrudan çağırıyor.

`/api/site/uret` ise Cloud Tasks kullanıyor.

Aynı ağır üretim fonksiyonunun:

- synchronous provision path,
- durable queued path

olmak üzere iki trigger'ı vardır.

### Karar

Business-side site generation tek durable command üzerinden yürümeli.

Senkron provision endpoint'i gerekirse yalnız command enqueue etmeli veya migration sonrası kaldırılmalı.

---

## 16. Palette ve modül değişiklikleri de ayrı authoring authority

Dashboard'da palette değişimi:

```text
PATCH /api/esnaf/{id}
   ↓
paletId / secilenPalet
   ↓
POST /api/site/guncelle
   ↓
legacy HTML regeneration/deploy
```

Modül değişimi ise:

```text
POST /api/esnaf/sync-moduller
   ↓
aktifWebModulleri
siteJson.moduller
```

alanlarını editörün dışında değiştiriyor.

Yani bugün site authoring authority yalnız editor değildir.

Business profile, modül ekranı, palette ekranı ve AI generator aynı site state'ini farklı yollardan mutate ediyor.

### Canonical karar

Bu ekranlar korunabilir, fakat hepsi aynı projection/draft contract'a bağlanmalıdır.

```text
Business Fact change
Palette change
Module change
Editor change
AI generation
        ↓
canonical draft/projection command
```

---

## 17. Paket / entitlement kontrolü client-side bypass edilebilir

Modül yönetim UI'si `minPaket` kontrolünü client'ta yapıyor.

Fakat `/api/esnaf/sync-moduller` yalnız session doğruluyor ve gönderilen modül ID listesini olduğu gibi kaydediyor.

Daha sonra legacy generator:

```text
aktifWebModulleri ?? allowedDefaults
```

kullanıyor.

`aktifWebModulleri` mevcutsa server yeniden `minPaket` filtresi uygulamıyor.

Sonuç:

> Authenticated kullanıcı UI'yı bypass edip kendi paketinde olmayan modül ID'lerini yazabilir ve generator bunları kullanabilir.

### SÖKÜM 12 ile bağ

Package bilgisi site JSON içinde authorization authority olamaz.

Canonical model:

```text
Billing / Entitlement Authority
        ↓
server-side capability check
        ↓
Draft Validation
        ↓
Publish Validation
```

Draft bir capability talep edebilir.

Aktivasyon/yayın yalnız canonical entitlement uygunsa geçer.

---

## 18. Version history iki ayrı evrende

Legacy publish history:

```text
esnaflar/{id}/site_versiyonlari
```

V2 publish history:

```text
esnaflar/{id}/versiyonlar
```

olarak farklı subcollection'lara yazılıyor.

Bu iki history aynı rollback sistemi tarafından okunmuyor.

### Legacy rollback daha da kritik biçimde eksik

`versiyonGeriYukle` snapshot içindeki `site_json`u geri yüklemiyor.

Yalnız:

```text
site_rollback metadata
aktifWebModulleri
paletId
```

yazıyor.

Dolayısıyla adı rollback olsa da public/site document revision'ını geri çevirmiyor.

### Security boundary

`/api/site/versiyonlar` GET/POST yollarında session/ownership kontrolü görünmüyor; query/body'den gelen `esnafId` kullanılıyor.

Bu endpoint tenant boundary açısından yeniden yazılmadan korunmamalıdır.

### Canonical rollback

Rollback yeni içerik üretmez ve draft'ı rewrite etmez:

```text
activePublishId
  publish-v12 -> publish-v11
```

Atomic pointer switch olur.

---

## 19. Domain ekranı ile API contract'ı bugün kırık

Dashboard domain ekranı gönderiyor:

```json
{
  "esnafId": "...",
  "domain": "example.com"
}
```

`/api/domain/sec` ise bekliyor:

```json
{
  "esnafId": "...",
  "secilenDomain": "example.com"
}
```

Dolayısıyla normal UI akışı aynı contract'ı konuşmuyor.

Bu ilk seviyedeki functional break'tir.

Ancak daha büyük problemler aşağıdadır.

---

## 20. `/api/domain/sec` tenant authority ve durable execution açısından yanlış

Endpoint:

- session doğrulamıyor,
- body'den gelen `esnafId`yi authority kabul ediyor,
- paketi hedef esnaf dokümanından kontrol ediyor,
- domain satın alma/bağlama işini request döndükten sonra `Promise.resolve().then(...)` ile fire-and-forget başlatıyor.

Bu iki ayrı ciddi problemdir.

### 20.1 Tenant authority

Caller başka bir `esnafId` gönderebilir.

Canonical endpoint:

```text
session -> business/site identity
```

çözmeli, tenant ID'yi body authority olarak kabul etmemelidir.

### 20.2 Durable execution

Domain registration, DNS, SSL ve provider binding uzun ve retry gerektiren business işleridir.

SÖKÜM 24 kararı burada doğrudan uygulanmalıdır:

```text
DomainBindingRequested
       ↓
Durable Job / Outbox
       ↓
Registrar
       ↓
DNS
       ↓
Verification
       ↓
Binding activation
```

Serverless request sonrası fire-and-forget yasaklanmalıdır.

---

## 21. Domain writer public resolver'ın okuduğu alanı yazmıyor

`/api/domain/sec` başarılı olunca:

```text
domain.tescilliDomain
subdomainUrl = https://<selectedDomain>
```

yazıyor.

Fakat SÖKÜM 25'te doğrulanan `apps/sites` custom-domain resolver şunu sorguluyor:

```text
customDomain == hostname
```

Yani domain registration başarılı olsa bile write tarafının ürettiği state ile read tarafının tükettiği state aynı değildir.

Bu nedenle domain için gerçek bir shared contract yoktur.

---

## 22. İkinci domain API ayrı ve tamamlanmamış bir dünya

`/api/domain/register`:

- başka `CloudflareRegistrar` ve `CloudflareDNS` sınıflarını kullanıyor,
- session/ownership boundary kurmuyor,
- contact bilgisini hard-coded kullanıyor,
- `mock-zone-id` ile connect çağrısı yapabiliyor,
- merchant DB update'i yorum satırında bırakılmış.

Bu endpoint canonical domain authority değildir.

Yeni authority devreye girdiğinde kaldırılmalı veya yalnız internal adapter olarak yeniden yazılmalıdır.

---

## 23. Cloudflare tarafında üç provider modeli var

Repoda en az şu modeller birlikte yaşıyor:

### A. `apps/web/src/lib/cloudflareRegistrar.ts`

Registrar + per-Pages-project custom domain bağlama.

### B. `apps/web/src/lib/cloudflarePagesClient.ts`

Her esnaf için ayrı Cloudflare Pages project + HTML direct upload + subdomain.

### C. `packages/cloudflare/*`

Shared DNS / registrar adapter'ı, merkezi `sites` hedefi yaklaşımı.

Bunlar provider implementation olabilir, fakat üçü aynı anda canonical authority olamaz.

SÖKÜM 25 ile uyumlu ana karar:

> Public delivery shell `apps/sites` olacaksa per-esnaf Pages deployment modeli uzun vadeli primary authority olmamalıdır.

Provider adapter ile domain/site authority ayrılmalıdır.

---

## 24. Slug/domain collision transactionally kapanmıyor

Legacy site generator slug'ı işletme adından türetiyor.

Per-esnaf Pages client:

```text
project exists -> true
```

diyerek aynı slug project'i mevcutsa bunu başarı sayabiliyor.

DNS helper'da slug lookup fonksiyonu olsa da bu canonical platform-wide ownership transaction değildir.

Public resolver da slug sorgusunda `.limit(1)` kullanıyor.

İki tenant aynı slug'a sahipse sonuç deterministic ownership garantisi taşımaz.

### BUILD

Hostname için tek global unique authority gerekir:

```text
DomainBinding {
  hostname,
  businessId,
  siteId,
  status,
  activePublishId,
  providerRef,
  createdAt,
  verifiedAt?
}
```

`hostname` global unique olmalı.

Uniqueness:

- transactional create,
- database unique key,
- veya eşdeğer atomic reservation

ile kapanmalıdır.

DNS'te kaydın varlığı ownership authority değildir.

---

## 25. Canonical authoring hedefi

Hedef akış:

```text
Business Facts
+ Entitlements
+ Editor Input
+ AI Generated Input
       ↓
Authoring Adapter / Projection
       ↓
Validated Site Draft
       ↓
SiteManifest
+ PageDocuments
+ MasterPageDocument
       ↓
Content Hash Validation
       ↓
Draft Revision Persist
```

Önemli ayrım:

```text
SAVE DRAFT
```

ile:

```text
PUBLISH
```

iki farklı command'dır.

Draft save hiçbir zaman public pointer değiştirmez.

---

## 26. Canonical PublishCommand

Önerilen command contract kavramsal olarak:

```text
PublishSite {
  siteId
  expectedDraftRevision
  requestedBy
  idempotencyKey
}
```

olmalıdır.

Caller:

- publishedVersion belirlemez,
- artifactHash uydurmaz,
- tenant ID override etmez.

Server draft'ı authoritative store'dan alır.

### Pipeline

```text
PublishCommand
   ↓
Auth + site ownership
   ↓
Expected revision / optimistic concurrency
   ↓
Schema validation
   ↓
Content hash verification
   ↓
Entitlement validation
   ↓
Publish projection freeze
   ↓
Generate HTML/SEO/sitemap/robots
   ↓
Persist immutable artifacts
   ↓
PublishedSiteRevision(status=ready)
   ↓
Atomic active pointer swap
   ↓
cache/domain/provider side effects
   ↓
ACTIVE
```

### Failure rule

Herhangi bir hazırlık adımı başarısız olursa:

```text
old active publish remains active
```

olmalıdır.

Half-publish yasaktır.

---

## 27. Publish state machine

Minimum lifecycle:

```text
requested
  ↓
validating
  ↓
preparing
  ↓
ready
  ↓
activating
  ↓
active
```

Hata:

```text
requested/validating/preparing/activating
  → failed
```

Eski active revision yalnız yeni revision `active` olduktan sonra `superseded` olabilir.

### Published version authority

`publishedVersion` caller input'undan alınmamalıdır.

Server-side monotonic/transactional state ile belirlenmelidir.

---

## 28. Canonical DomainBinding writer

Domain işlemi publish artifact'ten ayrı bir aggregate olmalıdır.

Örnek:

```text
DomainBinding {
  bindingId
  hostname
  businessId
  siteId
  status: requested | provisioning | verifying | ready | active | failed
  provider
  providerRef?
  activePublishId?
  requestedAt
  verifiedAt?
  activatedAt?
}
```

### Domain activation rule

DNS kaydı oluşturulmuş olması `active` demek değildir.

En az:

- hostname reservation başarılı,
- provider provisioning başarılı,
- ownership/target verification başarılı,
- site'ın active publish revision'ı var

olmadan public active binding oluşmamalıdır.

### Public resolver contract

SÖKÜM 25 ile birleşen path:

```text
hostname
   ↓
DomainBinding
   ↓
siteId + activePublishId
   ↓
immutable artifact
```

Write ve read tarafı aynı record'u konuşmalıdır.

---

## 29. Version history ve rollback tek authority olacak

Tek publish history bütün yayın tiplerini kapsamalıdır.

Snapshot'ın amacı UI geçmişi değil, exact published revision identity olmalıdır.

```text
PublishedSiteRevision
  publishId
  version
  manifest hash/id
  artifact refs
  createdBy
  createdAt
  activatedAt
  previousPublishId
  status
```

Rollback:

```text
current active pointer
      ↓
previous ready publish
```

şeklinde atomik switch olmalıdır.

Eski publish artifact'i mutate edilmez.

---

## 30. Cache ve publish aynı revision identity'yi kullanmalı

Bugünkü web publish endpoint'leri `revalidateTag(site:<domain>)` çağırıyor.

Fakat ayrı `apps/sites` public route'unda aynı tag registration contract'ı görünmüyor; orada global TTL vardır.

Bu yüzden mevcut codebase'de cache purge ile public revision arasında kanıtlanmış ortak identity yoktur.

Canonical model:

```text
hostname + activePublishId + path
```

veya immutable artifact hash tabanlı cache identity olmalıdır.

Cache temizliği publish truth değildir.

---

## 31. KEEP

- `/dashboard/sitem/editor` görsel editor UX ve component/panel yaklaşımı.
- Undo/redo, inline edit, responsive preview gibi authoring UX fikirleri.
- Autosave davranış fikri, yalnız canonical draft endpoint'ine bağlanmak şartıyla.
- `@kepenk/templates` theme catalog/authoring assets.
- `@kepenk/site-schema`.
- content-hash schema modeli.
- `validators.ts` ve hash yardımcıları.
- `@kepenk/renderer`.
- `@kepenk/publish-engine` generation/SEO çekirdeği.
- `/api/site/v2/save` ve `/api/site/v2/publish` isim/contract intent'i, rewrite edilerek.
- Cloud Tasks üzerinden site generation tetikleme.
- worker secret boundary.
- site feature flags.
- Cloudflare registrar/DNS adapter fikri.
- version history ve rollback ürün UX fikri.

---

## 32. REWRITE / CONNECT

- EditorState -> canonical Site Draft serializer.
- `siteSettings`, `pages`, `siteData` state adalarını tek persisted contract'a bağla.
- ThemeConfig AST -> SiteManifest adapter.
- `themeConfigToSiteData` fallback contract'ını tamamla veya canonical adapter ile değiştir.
- `editor-kaydet` -> draft save only.
- publish boolean branch -> explicit PublishCommand.
- `/site/v2/save` -> schema validation + revision concurrency + content-addressed persistence.
- `/site/v2/publish` -> real orchestration + hash verification + atomic active pointer.
- AI site generator -> draft generation + canonical publish command.
- palette/module changes -> canonical authoring/projector flow.
- package/module checks -> server-side entitlement authority.
- version history -> tek PublishedSiteRevision history.
- rollback -> pointer switch.
- domain selection -> session-bound command.
- domain provisioning -> durable job/outbox.
- domain writer -> canonical DomainBinding.
- slug/domain collision -> atomic reservation.
- Cloudflare state -> provider projection.
- public resolver -> SÖKÜM 25 DomainBinding reader.
- UI publish success -> committed active revision sonucu.

---

## 33. DROP adayları

Canonical authority devreye girdikten sonra:

- `editor-kaydet` içindeki `publish: true` semantiği.
- autosave'in `esnaflar.siteData` yazması.
- `esnaflar.siteData` / `siteHtml` alanlarının public publish SSOT olması.
- legacy `/api/site/publish` primary yolu.
- aynı site state'i için `siteJson`, `siteData`, `siteV2`, generated HTML ve business fields'ın paralel authority sayılması.
- caller-supplied published version authority.
- inline mutable `siteV2.page/masterPage`ın immutable artifact sayılması.
- legacy `site_versiyonlari` ve V2 `versiyonlar` çiftliği.
- metadata-only fake rollback.
- session doğrulamasız `/api/site/versiyonlar` davranışı.
- client-only module/package authorization.
- fire-and-forget `/api/domain/sec` background work.
- body `esnafId` authority kullanan domain flow.
- incomplete/mock `/api/domain/register` primary yolu.
- `subdomainUrl` ile custom-domain binding'i temsil etmeye çalışma.
- per-esnaf Cloudflare Pages deployment modeli, merkezi `apps/sites` public shell kesinleştikten sonra.
- provider DNS state'ini canonical ownership sanmak.
- birden fazla Ctrl/Cmd+S save listener'ı.
- inactive/demo editor yüzeylerinin primary editor izlenimi vermesi.

---

## 34. Migration sırası

Big-bang rewrite gerekmez.

1. Canonical `SiteDraft` + `PublishedSiteRevision` + `DomainBinding` contract'larını ilan et.
2. Current editor state için serializer/adapter yaz.
3. Legacy ThemeConfig/flat siteData -> SiteManifest migration adapter'ı yaz.
4. Draft save endpoint'ini oluştur veya `/site/v2/save`i canonical hale getir.
5. Autosave'i yalnız draft store'a geçir.
6. Content-hash page/master persistence ekle.
7. Publish validation gate ekle.
8. `/site/v2/publish`i idempotent PublishCommand orchestration'a evrilt.
9. Tek publish history ve active pointer ekle.
10. Public runtime'ı SÖKÜM 25 planına göre active pointer/artifact okumaya geçir.
11. AI generation, palette ve module flows'u canonical draft/publish command'a geçir.
12. Server-side entitlement validation ekle.
13. DomainBinding + global hostname reservation ekle.
14. Domain provisioning'i durable jobs/outbox'a taşı.
15. Cloudflare adapter'larını tek provider contract altında konsolide et.
16. Mevcut slug/custom domain kayıtlarını DomainBinding'e backfill et.
17. Version/rollback history'yi migrate et.
18. Telemetry ile legacy write path kullanımını sıfıra indir.
19. Legacy mutable public writes'ı kapat.
20. Legacy publish/domain/version yollarını kaldır.

---

## 35. Kritik invariants

1. Draft autosave public output'u değiştiremez.
2. Public runtime draft collection/fields okuyamaz.
3. Editor'da kullanıcı tarafından değiştirilebilen persisted state tek canonical serialization contract'a sahiptir.
4. `pages`, SEO/domain settings ve theme/business state sessizce kaybolamaz.
5. Published version server authority'dir.
6. Stale draft yeni revision'ı overwrite edemez.
7. Publish command idempotent'tir.
8. Aynı idempotency key ikinci artifact/publish yaratmaz.
9. Manifest page/master hash'leri server tarafından doğrulanır.
10. Eksik artifact set active olamaz.
11. Active pointer yalnız complete ready revision'a geçer.
12. Publish fail olursa önceki active revision yayında kalır.
13. UI "yayınlandı" mesajı active pointer commit edilmeden gösterilemez.
14. Generator implicit public write yapamaz.
15. Otomatik onboarding publish'i bile aynı PublishCommand'dan geçer.
16. Entitlement yalnız server-side billing/package authority'den doğrulanır.
17. Site draft içindeki `paket` alanı authorization veremez.
18. Domain command tenant identity'yi session/auth context'ten alır.
19. Hostname platform çapında unique'tir.
20. Provider registration success tek başına binding activation değildir.
21. DomainBinding ile public DomainResolver aynı canonical record'u konuşur.
22. Cloudflare/DNS state canonical ownership değildir.
23. Version history exact published revision'ı temsil eder.
24. Rollback eski artifact'i mutate etmez.
25. Rollback active pointer switch'tir.
26. Cache, SEO, sitemap ve public content aynı publish identity'ye bağlıdır.
27. Legacy/demo default'ları published artifact'i sessizce tamamlayamaz.
28. Public site capability set'i publish zamanında entitlement ile doğrulanır.
29. Domain/provider uzun işleri durable execution üzerinden yürür.
30. Cross-tenant `esnafId/siteId/domain` caller input'u authority olamaz.

---

## 36. Smoke / probe seti

Minimum acceptance:

- published v1 açıkken editor text değiştir + autosave -> public hâlâ v1
- draft v2 save -> public hâlâ v1
- publish v2 -> public atomik v2
- publish feature disabled -> UI success göstermez
- stale expectedDraftRevision -> publish reject
- aynı PublishCommand idempotency key iki kez -> tek publish revision
- yanlış page contentHash -> publish reject
- manifest'te referanslı page artifact eksik -> active pointer değişmez
- master hash mismatch -> publish reject
- artifact generation failure -> v1 aktif kalır
- publish v2 success -> history exact v2 snapshot
- rollback v2 -> v1 -> public exact v1
- rollback history artifact'ini mutate etmez
- editor SEO değiştir + save/reload -> değer korunur
- editor page ekle + save/reload -> sayfa korunur
- editor domain field'i yalnız local UI state olarak kaybolmaz
- AI generator output -> önce draft, sonra aynı canonical publish pipeline
- palette change -> unauthorized implicit publish yaratmaz
- paket dışı modül ID API ile gönder -> server reject
- paket downgrade -> yeni publish disallowed capability ile reject/normalize policy
- domain UI seçimi -> API contract aynı field'i kullanır
- domain endpoint başka tenant ID ile çağrılır -> reject
- duplicate hostname iki tenant tarafından reserve edilir -> yalnız biri kazanır
- registrar başarısız -> DomainBinding failed, active olmaz
- DNS pending -> binding active olmaz
- provider tamam + verify + active publish var -> binding active
- custom domain -> public resolver exact site/publish'e gider
- subdomain -> aynı DomainBinding authority
- domain provisioning worker retry -> duplicate purchase/binding oluşturmaz
- public runtime database/artifact error -> explicit 5xx/observable
- old legacy site migration adapter sonrası visual parity kabul aralığında

---

# SÖKÜM 26 Son Kararı

Bugünkü sistemde güçlü parçalar var fakat bunlar aynı omurgaya bağlanmamış.

Özellikle şu dört şey korunmalıdır:

```text
Görsel Editor UX
@kepenk/site-schema
@kepenk/renderer + @kepenk/publish-engine
Cloud Tasks + Cloudflare provider primitives
```

Fakat authority yeniden kurulmalıdır.

Bugünkü en tehlikeli anti-pattern:

```text
SAVE DRAFT
   ==
WRITE PUBLIC MUTABLE STATE
```

olmasıdır.

Bunu kırmadan SÖKÜM 25'teki immutable public runtime kurulamaz.

Canonical yön:

```text
Editor / AI / Business Facts
          ↓
      Site Draft
          ↓
 content-addressed documents
          ↓
   PublishCommand
          ↓
 PublishedSiteRevision
          ↓
 atomic active pointer
          ↓
   DomainBinding
          ↓
     apps/sites
```

Yeni bir üçüncü site editor/publish motoru tasarlanmayacak.

> **Mevcut ThemeConfig editor'ü canonical SiteManifest modeline adapte edilecek; mevcut V2 publish endpoint'i gerçek orchestration'a dönüştürülecek; domain ve version authority aynı published revision kimliğine bağlanacaktır.**

---

# SÖKÜM 27 - AÇIK FRONTIER

## Media / Asset Storage / Upload / CDN / Immutable Asset Reference Authority

SÖKÜM 25 ve 26 immutable site artifact modelini netleştirdi. Sıradaki zorunlu soru asset authority'dir.

Çünkü immutable page JSON tek başına yeterli değildir. Bir page hash'i:

```text
image URL -> mutable/deleted/cross-tenant object
```

gösteriyorsa published revision gerçekte immutable değildir.

SÖKÜM 27'de özellikle şunlar doğrulanmalıdır:

- `/api/media/upload` gerçek tenant ownership'i nasıl kuruyor?
- asset path/object key caller-controlled mı?
- public/private asset ayrımı var mı?
- upload edilen dosyanın MIME/content validation'ı nerede?
- overwrite mümkün mü?
- aynı URL'nin içeriği sonradan değişebiliyor mu?
- asset content hash var mı?
- `MediaRef` hangi kimliği authoritative kabul ediyor?
- SiteManifest publish sırasında referenced media'yı pinliyor mu?
- Unsplash/external URL'ler immutable artifact'e nasıl dahil oluyor?
- image proxy/transform/CDN authority var mı?
- asset silme published revision'ı kırabilir mi?
- rollback eski görselleri geri getirebilir mi?
- orphan asset garbage collection nasıl olacak?
- tenant A, tenant B'nin media ID/URL'sini siteye bağlayabilir mi?
- AI-generated media için provenance/provider metadata var mı?
- alt text / accessibility metadata asset'e mi page instance'a mı ait?
- asset lifecycle ile KVKK/delete policy nasıl ayrılacak?

**SÖKÜM 27 için henüz verdict yazılmamalıdır.**
