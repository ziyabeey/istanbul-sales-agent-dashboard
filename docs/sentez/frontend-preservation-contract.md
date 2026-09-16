# Kepenk Frontend Preservation Contract

> **Tarih:** 2026-09-16  
> **Durum:** AKTİF KORUMA KURALI  
> **Kapsam:** Kepenk/KPNK public marketing frontend, ana landing, marketing route ağı, tasarım sistemi ve public launch surface.  
> **Karar:** **KEEP WHOLE UX / VISUAL BASELINE. Backend/mimari cleanup sırasında bu frontend yeniden yazılmayacak, parçalanmayacak veya legacy diye silinmeyecek.**

## 1. Neden koruma altında?

Current main üzerinde yapılan kaynak kontrolü, Kepenk'in ana public marketing sitesinin kaybolmadığını doğruladı.

Ana `/` route hâlâ şu zinciri çalıştırıyor:

```text
Navbar
HeroSection
PartnersSection
ProblemSolutionSection
FeaturesSection
SectorCarousel
TestimonialsSection
PowerFeaturesSection
TedarikSection
PricingCards
SSSSection
FinalCTA
FooterTrustSection
```

Bu yapı placeholder değildir; ayrı section component'leri, responsive davranış, motion/interaction ve ürün anlatımı taşır.

## 2. Korunacak yüzey

### Ana launch shell

- `apps/web/src/app/page.tsx`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/globals.css`
- `apps/web/src/components/layout/Navbar.tsx`
- `apps/web/src/components/sections/*`
- ana landing'in kullandığı `components/ui/*`
- `apps/web/public/*` içindeki Kepenk public asset/PWA dosyaları
- landing'in kullandığı `apps/web/src/data/*` kaynakları

### Marketing / acquisition route ağı

Current App Router ağacında bulunan public acquisition yüzeyleri de koruma altındadır. Özellikle:

- `/`
- `/fiyatlar`
- `/nasil-calisir`
- `/ozellikler` ve alt özellik sayfaları
- `/sektorler` ve SEO sector route'ları
- `/demolar`
- `/hakkimizda`
- `/iletisim`
- `/kariyer`
- `/blog`
- `/giris`
- `/kayit`
- `/onboarding`
- KVKK/gizlilik/kullanım/iade/satış sözleşmesi gibi legal/acquisition destek sayfaları

Bu liste canonical business authority anlamına gelmez. Bunlar korunacak **public product/marketing surfaces**'tir.

## 3. Doğrulanan launch primitive'leri

Current source içinde şu launch primitive'leri korunmuştur:

- Next.js App Router ana landing,
- responsive/mobile navbar ve dropdown'lar,
- Framer Motion tabanlı interaction/animation,
- Lucide iconography,
- semantic Tailwind v4 brand/design tokens,
- reduced-motion accessibility rule,
- SEO metadata,
- `https://kepenk.ai` metadata base,
- OpenGraph/Twitter metadata,
- SoftwareApplication JSON-LD,
- robots/sitemap yüzeyleri,
- manifest/PWA asset'leri,
- cookie banner,
- analytics shell,
- error/not-found surfaces.

Bu nedenle frontend migration'da başlangıç noktası yeni sıfırdan bir landing değildir.

## 4. KEEP / REWIRE ayrımı

### KEEP WHOLE

Aşağıdakiler varsayılan olarak yeniden tasarlanmayacaktır:

- sayfa kompozisyonu,
- görsel hiyerarşi,
- section component'leri,
- responsive davranış,
- motion/interaction dili,
- navbar / CTA yerleşimi,
- design token yaklaşımı,
- public SEO route mimarisi,
- legal/public shell.

### CONTENT REWIRE

Mevcut frontend içeriği ürünün eski dönemini yansıtabilir. Bu nedenle aşağıdakiler tasarım kaybı olmadan güncellenebilir:

- paket ve fiyat metinleri,
- modül/capability listeleri,
- CTA hedefleri,
- onboarding/checkout bağları,
- ürün vaatleri,
- sektör sayıları,
- provider/integration isimleri,
- eski plan isimleri,
- testimonial/customer proof,
- eski ürün stratejisine ait claims.

Örnek: current `PricingCards` beş paketli eski ticari modeli taşır. Kart tasarımı ve interaction KEEP'tir; yeni Kepenk ticari modeli daha sonra aynı UX üzerinde yeniden bağlanır.

## 5. Claim / proof güvenlik kuralı

Kaynakta hard-coded testimonial, büyüme metriği veya liderlik iddiası bulunması onun production proof olduğu anlamına gelmez.

Launch öncesi:

```text
visual implementation KEEP
copy / metric / testimonial -> source-of-truth review
```

Doğrulanamayan proof kaldırılır veya gerçek kanıtla değiştirilir. Bu işlem frontend'i yeniden tasarlamak için gerekçe değildir.

## 6. Mimari migration sırasında yasaklar

Backend authority cleanup sırasında:

- ana landing legacy diye topluca silinmez,
- `apps/web` marketing shell sıfırdan rewrite edilmez,
- section'lar sırf backend capability değişti diye yok edilmez,
- public route'lar inventory/caller kontrolü olmadan kaldırılmaz,
- design token'lar başka bir dashboard temasıyla ezilmez,
- Kepenk landing'i Randevu UI'sı ile karıştırılmaz,
- marketing frontend doğrudan canonical DB writer yapılmaz.

Frontend yalnız canonical command/read-model/API boundary'lerine yeniden bağlanır.

## 7. Cutover / launch gate

Kepenk v2 public launch'ta bu korunmuş frontend için minimum gate:

1. `@kepenk/web` production build başarılı,
2. root `/` browser smoke başarılı,
3. navbar public link crawl'da kritik 404 yok,
4. 360/390 mobil ve desktop responsive smoke,
5. hero -> CTA -> kayıt/onboarding akışı doğrulanmış,
6. fiyat/ürün copy'si güncel commercial modelle uyumlu,
7. testimonial/claim/proof review tamamlanmış,
8. robots/sitemap/metadata canonical domainle uyumlu,
9. legal links erişilebilir,
10. visual baseline için screenshot/reference korunmuş.

Bu gate tamamlanana kadar source'un bugün production build geçip geçmediği ayrıca doğrulanmalıdır; current main'de bu kontrolü kanıtlayan CI workflow run bulunmaması frontend'in kayıp olduğu anlamına gelmez.

## 8. Canonical karar

> **Kepenk'in mevcut public frontend'i bir legacy discard adayı değil, v2'nin korunacak launch surface'idir. Mimari söküm backend authority'leri değiştirir; kullanıcının emek verdiği landing/marketing UX'i mümkün olan en yüksek sadakatle taşır.**
