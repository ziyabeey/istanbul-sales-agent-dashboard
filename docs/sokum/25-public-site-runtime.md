# SÖKÜM 25 — Public Site Runtime / `apps/sites` / Publish Artifact Authority

> **Tarih:** 2026-09-15  
> **Durum:** KAPALI  
> **Verdict:** **KEEP the public shell and the new schema/renderer/publish primitives; REWRITE runtime authority; CONNECT the existing versioned artifact architecture; DROP the parallel live-Firestore/template authority after compatibility migration.**

## 1. Neyi doğruladık?

Bu turda yalnız dosya isimlerine bakılmadı. Public request'in hostname'den render'a kadar gerçek yolu ve repoda hazır duran yeni site mimarisi birlikte incelendi.

Başlıca doğrulanan parçalar:

- `apps/sites/src/middleware.ts`
- `apps/sites/src/app/[domain]/page.tsx`
- `apps/sites/src/app/[domain]/client.tsx`
- `apps/sites/src/lib/firebaseAdmin.ts`
- `apps/sites/package.json`
- `apps/sites/next.config.ts`
- `packages/templates/src/renderer/ThemeRenderer.tsx`
- `packages/site-schema/src/manifest.ts`
- `packages/site-schema/src/validators.ts`
- `packages/renderer/src/registry.ts`
- `packages/publish-engine/src/generate.ts`
- `packages/publish-engine/src/index.ts`
- `packages/publish-engine/src/__tests__/smoke.ts`
- `packages/cloudflare/dns.ts`
- `firestore.rules`

Ana bulgu şudur:

> Repoda **iki ayrı site mimarisi** aynı anda yaşıyor. Yeni ve daha doğru `site-schema → renderer → publish-engine` hattı mevcut, fakat canlı `apps/sites` public runtime'ı bu hattı tüketmiyor.

---

## 2. Bugünkü gerçek public request yolu

`apps/sites/src/middleware.ts` request hostname'ini path'e rewrite ediyor:

```text
Host header
   ↓
middleware
   ↓
/[domain]/...
   ↓
apps/sites/src/app/[domain]/page.tsx
```

Local geliştirmede `?site=` ile hostname simülasyonu da var.

Bu kabuk **KEEP** edilmeye değer. Hostname-first routing doğru temel fikir.

Ancak middleware:

- domain ownership doğrulamıyor,
- publish revision çözmüyor,
- tenant/site binding çözmüyor,
- artifact kimliği bilmiyor.

Bu işlemlerin middleware'de yapılması şart değil; fakat downstream tek bir canonical resolver'a gitmesi şart.

---

## 3. Public route bugün neyi authoritative kabul ediyor?

`apps/sites/src/app/[domain]/page.tsx` iki moda sahip.

### 3.1 Demo modu

Her hostname üzerinde:

```text
?theme=<themeId>
```

varsa route doğrudan demo moduna giriyor ve `@kepenk/templates/catalog` içinden temayı yüklüyor.

Bu davranış production public hostname ile demo/preview authority'sini birbirine karıştırıyor.

**Karar:** `?theme=` live public domain'de render authority olamaz. Demo/preview ayrı ve yetkili bir namespace/route olmalı.

### 3.2 "Published Site" modu

Kod yorumu bunu published site olarak adlandırıyor fakat gerçek davranış:

```text
hostname
   ↓
Firestore `esnaflar`
   ↓
customDomain == hostname
   ↓ yoksa
slug == <kepenk.ai subdomain prefix>
   ↓
data.siteData.theme + data.siteData.business
   ↓
SiteClient(mode="live")
```

Burada:

- `SiteManifest` okunmıyor,
- `publishedVersion` okunmuyor,
- immutable artifact okunmıyor,
- content hash doğrulanmıyor,
- explicit publish pointer okunmıyor,
- business/site/theme revision pin edilmiyor,
- hatta mevcut kod `published` benzeri bir bayrağı bile kontrol etmiyor.

Yani `siteData` mevcutsa mutable Firestore dokümanı fiilen public truth oluyor.

**Bu, publish değildir. Bu canlı mutable data render'ıdır.**

---

## 4. Unknown ve unpublished hostname davranışı

Site bulunamazsa veya gerekli `siteData` şekli yoksa route `notFound()` vermek yerine Kepenk landing sayfası gösteriyor.

Ayrıca Firestore erişimi hata verirse hata loglanıp aynı landing'e düşülüyor.

Bu üç farklı durumu tek görüntüye eritiyor:

1. gerçekten bilinmeyen hostname,
2. bilinen ama unpublished site,
3. altyapı/veritabanı arızası.

Bu semantik olarak yanlış ve operasyonel olarak körleştiricidir.

### Canonical ayrım

```text
platform host
  → explicit platform landing

known tenant host + unpublished
  → explicit unpublished/maintenance policy

unknown host
  → fail closed / 404

infrastructure error
  → 5xx + observability
```

DB arızası "site henüz yayınlanmadı" diye gizlenmemeli.

---

## 5. `apps/sites` içindeki privilege boundary sorunu

`apps/sites/src/lib/firebaseAdmin.ts` yalnız public site read helper'ı değil.

Aynı public-site uygulamasının server-side admin modülünde şu sınıf kabiliyetler birlikte yaşıyor:

- user / merchant lookups,
- business lookup,
- order create/update,
- listing/user writes,
- quota mutation,
- blacklist işlemleri,
- finance transaction/stat mutations,
- credit mutations,
- çeşitli privileged Firestore helpers.

Firebase Admin SDK server-side olduğu için bu **client secret leak** olarak etiketlenmemelidir.

Doğru problem:

> Public site runtime'ın server process'i gereksiz ölçüde geniş admin kabiliyet setine sahip. Blast radius ve least-privilege sınırı yanlış.

### Karar

`apps/sites` yalnız şunlara erişmeli:

- canonical domain binding read,
- published artifact read,
- public asset read,
- gerekiyorsa dar kapsamlı public form/action capability endpoint'leri.

Finance, quota, order-admin ve credit mutation helper'ları public renderer uygulamasından çıkarılmalı.

---

## 6. Firestore Rules ne söylüyor?

Güncel `firestore.rules` esas tenant alanını `sites/{siteId}/...` altında RBAC ile koruyor ve default deny kullanıyor.

`esnaflar` için client-side açık bir rule bulunmuyor; dolayısıyla browser'ın bu collection'a doğrudan erişimi default deny'a düşüyor. Public runtime `firebase-admin` ile server-side okuyor.

Bu olumlu bir nokta, fakat Admin SDK rules'u bypass ettiği için public runtime'daki server boundary daha da önemli hale geliyor.

**Rule güvenliği, yanlış server authority tasarımını telafi etmez.**

---

## 7. `SiteClient`: iki render nesli aynı yerde

`apps/sites/src/app/[domain]/client.tsx` açıkça iki engine neslini destekliyor.

### Demo

```text
registerSectorSections
   ↓
loadThemeConfig(themeId)
   ↓
ThemeRenderer
```

### Live V2

`siteData.theme` varsa doğrudan full `ThemeConfig` ve business data render ediliyor.

### Live V1 legacy

Yalnız `themeId` varsa template config yüklenip demo business defaults ile Firestore business data merge ediliyor.

Bu legacy yolun önemli sorunu:

```text
result.business (demo defaults)
        +
siteData.business
        ↓
merged live business
```

Eksik production field'larının demo data ile sessizce tamamlanması mümkündür.

Published truth içinde demo fallback kabul edilmemeli.

### Ek risk

Dosyanın başında `// @ts-nocheck` bulunuyor.

Public-site boundary gibi kritik bir noktada bu kaldırılmalı. Legacy compatibility gerekirse explicit adapter/schema üzerinden yapılmalı.

---

## 8. `@kepenk/templates` renderer iyi ama production authority olmaya hazır değil

`packages/templates/src/renderer/ThemeRenderer.tsx` kullanılabilir ve olgun parçalar içeriyor:

- section registry,
- typed `ThemeConfig`, `PageConfig`, `BusinessData`,
- AST/block tree desteği,
- template variable resolution,
- global/page section ayrımı,
- theme design tokens.

Ancak public production için iki önemli sınır sorunu var.

### 8.1 Demo badge

`isEditing` false olduğunda renderer her zaman:

```text
Kepenk Demo • <plan> Paketi
```

rozeti basıyor.

Public production ve demo presentation aynı renderer mode semantiğini kullanıyor.

### 8.2 Parallel schema world

Bu renderer `ThemeConfig/PageConfig/BusinessData` dünyasına ait.

Repodaki yeni `@kepenk/site-schema` ise:

- `SiteManifest`,
- content-hash page docs,
- component tree,
- master page,
- `publishedVersion`

üzerinden başka, daha deterministik bir site modeli tanımlıyor.

Bu iki model aynı anda authoritative kalamaz.

---

## 9. Yeni Site Schema zaten var ve doğru yöne çok yakın

`packages/site-schema/src/manifest.ts` gerçek bir canonical manifest tanımlıyor.

Önemli alanlar:

```text
manifestId
siteId
esnafId
version
publishedVersion
createdAt
updatedAt
pages[]          → content-hash refs
masterPage       → content-hash
siteConfig
seo
redirects
navigation
```

Dosyanın kendi açıklaması bile manifest'i:

> Atomic state pointer: the single source of truth for a site's current state.

olarak tanımlıyor.

Bu SÖKÜM 01–08'de teorik olarak kararlaştırılan mimariye şaşırtıcı derecede yakın.

### `validators.ts`

Ayrıca hazır:

- Zod manifest validation,
- page validation,
- component validation,
- master-page validation,
- SHA-256 tabanlı content hash,
- slug generation.

Yani versioned/content-addressed site modeli **BUILD FROM ZERO değildir**.

**Verdict: KEEP + COMPLETE + CONNECT.**

---

## 10. Yeni renderer da mevcut

`packages/renderer/src/registry.ts` central `ComponentType → React renderer` registry'sine sahip.

Mevcut component family'leri arasında:

- layout containers,
- header/footer,
- text/heading/image/button,
- hero,
- WhatsApp CTA,
- price table,
- contact form,
- working hours,
- Google map

bulunuyor.

Bu, SÖKÜM 11'de karar verilen **Component Registry + typed specs** yaklaşımının doğrudan karşılığıdır.

**Verdict: yeni component-registry renderer primary candidate'dır.**

`@kepenk/templates` içindeki legacy/theme renderer bir anda silinmez; theme catalog/adapter/input üretimi için compatibility ve authoring katmanı olabilir. Fakat public artifact render authority iki ayrı renderer olarak kalmamalıdır.

---

## 11. `publish-engine` gerçekten ne yapıyor?

`packages/publish-engine/src/generate.ts`:

```text
SiteManifest
+ PageDocument
+ PageRef
+ MasterPageDocument
       ↓
@kepenk/renderer
       ↓
React renderToStaticMarkup
       ↓
full static HTML
```

üretebiliyor.

Ayrıca:

- meta tags,
- JSON-LD,
- sitemap,
- robots,
- redirects/deploy manifest helpers

var.

`src/__tests__/smoke.ts` gerçek bir sample site için static HTML üretim probu içeriyor.

Bu çok değerli ve **KEEP**.

### Fakat isim ile kapsam arasında fark var

Güncel `publish-engine` henüz gerçek bir end-to-end publish authority değil.

`src/index.ts` yalnız generation/SEO/redirect helpers export ediyor.

Açıkça görünmeyen eksikler:

- immutable artifact persistence,
- artifact storage adapter,
- publish transaction,
- atomic current-published pointer swap,
- domain binding update,
- deployment invocation,
- rollback command,
- publish audit,
- cache purge orchestration,
- failed publish recovery.

Yani mevcut paket:

> **publish artifact generator çekirdeği**

olarak korunmalı ve gerçek publish orchestration ile tamamlanmalı.

---

## 12. Cloudflare tarafı

`packages/cloudflare/dns.ts` gerçek provider niyeti taşıyor:

- esnaf subdomain CNAME oluşturma,
- custom domain bağlama,
- DNS record listeleme,
- cache purge,
- slug collision kontrolü.

Bu provider adapter olarak değerlidir.

Ancak domain provider işlemi ile site authority aynı şey değildir.

DNS başarılı olması şu anlama gelmez:

```text
hostname → doğru business/site/publishedRevision
```

binding'i güvenli ve atomik kurulmuştur.

Domain Binding ayrı canonical record olmalı; Cloudflare onun provider projection'ı olmalı.

---

## 13. Canonical hedef

Public runtime için hedef artık teorik değil; mevcut paketler kullanılarak kurulabilir.

```text
Authoring / Business Facts
        ↓
Validated SiteManifest Draft
        ↓
Page + Master immutable content hashes
        ↓
Publish Validation Gate
        ↓
Publish Engine
        ↓
PublishedSiteArtifact / Artifact Set
        ↓
Atomic Published Revision Pointer
        ↓
DomainBinding
        ↓
Public Runtime / CDN
```

Request path:

```text
hostname
   ↓
DomainResolver
   ↓
DomainBinding {
  businessId,
  siteId,
  publishedManifestId,
  publishedVersion
}
   ↓
immutable published artifact
   ↓
serve/render
```

Public request business/editor state'i yeniden yorumlamaz.

---

## 14. `PublishedSiteArtifact` / publish record

Mevcut `SiteManifest` korunarak publish orchestration'a en az şu metadata eklenmeli veya ayrı publish record ile ilişkilendirilmeli:

```text
PublishedSiteRevision {
  publishId
  siteId
  businessId
  manifestId
  version
  artifactHash
  status: preparing | ready | active | superseded | failed
  createdBy
  createdAt
  activatedAt?
  previousPublishId?
  deployTarget?
  deployResultRef?
}
```

### Invariant

`active` pointer yalnız bütün gerekli artifacts başarıyla hazırlandıktan sonra değişir.

Half-published state yasak:

```text
manifest v12 aktif
ama page hash'lerinden biri yok
```

veya:

```text
DNS yeni siteye gidiyor
ama artifact henüz deploy edilmedi
```

olmamalı.

---

## 15. Rollback

Content-addressed model rollback için doğal avantaj sağlıyor.

Rollback yeni içerik üretmek zorunda değil:

```text
active publish pointer
  v12 → v11
```

şeklinde önceki hazır revision'a atomik dönebilir.

Rollback:

- audit event üretmeli,
- domain binding'i kaybetmemeli,
- cache purge/invalidation tetiklemeli,
- eski artifact'i mutate etmemeli.

---

## 16. Cache / ISR kararı

Mevcut public route global:

```text
revalidate = 60
```

kullanıyor.

Bu live Firestore modeli için kaba bir TTL'dir. Published artifact dünyasında cache key açıkça revision'a bağlı olmalıdır.

Örnek:

```text
hostname + publishedVersion + path
```

veya immutable artifact URL/hash.

Yeni publish olduğunda eski revision cache'i bozulmak zorunda değildir; binding/pointer yeni immutable revision'a geçer.

Cloudflare purge yalnız gerektiğinde orchestration'ın bir sonucu olabilir, publish truth değildir.

---

## 17. SEO authority

Yeni `publish-engine` SEO üretimi açısından public `SiteClient` yolundan daha doğru yerde duruyor.

Bugünkü public client structured JSON-LD üretiyor, fakat page-level Next metadata/published SEO snapshot mimarisi belirgin değil.

Canonical karar:

- title/description/canonical/robots/OG/JSON-LD publish snapshot'ının parçası olmalı,
- mutable business data runtime'da SEO'yu sessizce değiştirmemeli,
- sitemap/robots aynı published revision ile uyumlu olmalı.

---

## 18. KEEP

- `apps/sites` uygulaması, **public delivery shell** olarak.
- hostname-first middleware fikri.
- localhost `?site=` geliştirme simülasyonu, yalnız dev ortamıyla sınırlandırılarak.
- `packages/site-schema`.
- `SiteManifest` version/publishedVersion modeli.
- content-hash page/master refs.
- schema validators + hash helpers.
- `packages/renderer` component registry.
- `packages/publish-engine` static generation/SEO/redirect primitives.
- `packages/cloudflare` DNS/provider adapter intent'i.
- `@kepenk/templates` içindeki güçlü theme catalog ve authoring assets, compatibility/authoring girdisi olarak.

---

## 19. REWRITE / CONNECT

- `apps/sites` Firestore lookup → canonical DomainResolver.
- `esnaflar.siteData` live render → published artifact read/delivery.
- demo route → ayrı preview/demo surface.
- unknown/unpublished/error fallbacks → explicit ayrı durumlar.
- `firebaseAdmin.ts` → dar public-runtime repository/service.
- template V1/V2 merge → explicit migration adapter.
- public renderer → kanonik `site-schema + renderer` contract.
- publish-engine → gerçek publish orchestration ile tamamlanacak.
- Cloudflare DNS → DomainBinding state'in provider adapter'ı olacak.
- cache → revision-aware olacak.
- SEO → published snapshot'a bağlanacak.

---

## 20. DROP adayları

Yeni authority devreye girdikten sonra:

- `esnaflar.siteData`'nın public SSOT olması,
- live production'da demo defaults ile business data merge etmek,
- `// @ts-nocheck` ile public renderer boundary'sini susturmak,
- live hostname'de serbest `?theme=` demo authority,
- public production sayfasında koşulsuz demo badge,
- unknown tenant hostname'i platform landing'e çevirmek,
- database/runtime failure'ı unpublished site gibi göstermek,
- finance/order/quota/credit admin helper'larını `apps/sites` içinde tutmak,
- iki paralel renderer/schema dünyasını aynı anda authoritative kabul etmek,
- global `revalidate = 60` değerini publish consistency mekanizması saymak.

---

## 21. Migration sırası

Bu alan big-bang rewrite gerektirmiyor.

1. `SiteManifest` ve content-hash modelini canonical ilan et.
2. Legacy `siteData/theme/business` → `SiteManifest + PageDocument + MasterPageDocument` adapter'ı yaz.
3. Publish validation gate ekle.
4. Artifact persistence + `PublishedSiteRevision` ekle.
5. `DomainBinding` ekle.
6. `apps/sites` için yeni resolver/artifact read yolu ekle.
7. Legacy live-Firestore yolu yalnız migration fallback olarak telemetry ile kalsın.
8. Bütün mevcut siteleri artifact modeline backfill et.
9. Revision-aware cache/SEO/domain smoke'ları geçir.
10. Legacy public authority'yi kapat.
11. En son demo/template production fallback'lerini kaldır.

---

## 22. Kritik invariants

1. Draft değişikliği published site'ı değiştiremez.
2. Public runtime mutable editor/business state'i authoritative okuyamaz.
3. Bir hostname aynı anda yalnız bir active published revision'a resolve olur.
4. Domain binding explicit tenant/site kimliği taşır.
5. Unknown hostname fail closed olur.
6. Infrastructure failure unpublished site olarak maskelenmez.
7. Published page/master artifact'leri immutable/content-addressed'dir.
8. Publish pointer yalnız complete artifact set için aktive edilir.
9. Rollback geçmiş artifact'i rewrite etmez.
10. Demo/preview ile public production aynı authority değildir.
11. Public renderer business admin mutation capability taşımaz.
12. Public output'taki theme/config publish revision ile pinlidir.
13. SEO, sitemap ve robots aynı published revision'a aittir.
14. Cache identity revision/hash ile bağlanır.
15. Cloudflare/provider state canonical domain authority değildir.

---

## 23. Smoke / probe seti

Minimum acceptance:

- draft business/site değişikliği → public site değişmez
- publish v1 → hostname v1'i gösterir
- draft v2 → hostname hâlâ v1
- publish v2 → atomik v2 geçişi
- publish sırasında page artifact eksik → v1 aktif kalır
- failed deploy → active pointer değişmez
- rollback v2 → v1 → public eski siteyi gösterir
- unknown hostname → 404/fail-closed
- unpublished known hostname → explicit unpublished policy
- Firestore/artifact store arızası → 5xx + observable error
- custom domain → doğru tenant/site/revision
- subdomain → doğru tenant/site/revision
- domain collision → ikinci tenant binding alamaz
- `?theme=` live production output'u değiştiremez
- preview route tema değiştirebilir fakat published state değiştirmez
- legacy site backfill sonrası output parity
- public site finance/quota/admin mutation helper'larına sahip değildir
- cache key revision değişince yeni output verir
- SEO title/canonical/JSON-LD published revision ile tutarlı
- old immutable artifact rollback için okunabilir

---

# SÖKÜM 25 Son Kararı

`apps/sites` atılacak bir klasör değildir. **Public delivery shell olarak korunmalıdır.**

Fakat bugünkü public authority korunmamalıdır.

En değerli keşif şu oldu:

```text
@kepenk/site-schema
        +
@kepenk/renderer
        +
@kepenk/publish-engine
```

zaten repoda mevcut ve önceki sökümlerde tasarladığımız mimarinin büyük bölümünü somutlaştırıyor.

Dolayısıyla burada yeni bir üçüncü site motoru tasarlanmayacak.

Yapılacak iş:

> **Mevcut yeni artifact mimarisini kanonikleştir, eksik publish orchestration'ı tamamla ve `apps/sites` public runtime'ını ona bağla.**

---

# SÖKÜM 26 — AÇIK FRONTIER

## Site Authoring / Draft → Publish Command / Artifact Storage / Domain Binding Writer

SÖKÜM 25 read/public tarafını çözdü. Sıradaki soru write/publish tarafıdır:

- `SiteManifest` draft'ını bugün kim üretiyor?
- page/master content hash'leri nerede persist ediliyor veya hiç ediliyor mu?
- editor/studio hangi schema'yı authoritative kabul ediyor?
- `esnaflar.siteData`'yı kim yazıyor?
- publish butonu/command nerede?
- artifact storage var mı?
- manifest version nasıl artıyor?
- `publishedVersion` bugün herhangi bir runtime tarafından mutate ediliyor mu?
- custom domain/slug state'ini kim yazıyor?
- Cloudflare DNS çağrısını kim tetikliyor?
- domain ownership/collision nasıl kapanıyor?
- publish failure/rollback state machine var mı?
- legacy theme V1/V2 → site-schema adapter var mı?

**SÖKÜM 26 için henüz verdict yazılmamalıdır.**
