# Kepenk Söküm - Final Inventory Sweep

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Son numaralı söküm:** **SÖKÜM 41 - Admin / Super Admin / Platform Control Plane**  
> **Karar:** Yeni `SÖKÜM 42` açılmadı.

## Amaç

SÖKÜM 41 sonrasında eski koruma notlarında kalan beş package yeniden kontrol edildi:

- `packages/voice`
- `packages/studio`
- `packages/blog`
- `packages/seo`
- `packages/influencer`

Test şuydu:

> Bu package kendi durable business state'ini, writer'ını ve canlı workflow authority'sini taşıyan daha önce sökülmemiş bir domain mi; yoksa daha önce sökülmüş core'ların contract/adapter/extension seed'i mi?

## Ortak runtime bulgusu

Beş package da `0.1.0`, private package'dır. Manifestlerde business runtime tarafında yalnız Zod dependency'si bulunur; DB, provider SDK, queue, repository veya service dependency'si doğrulanmadı.

Kaynak yapıları da aynı sonucu destekler:

- Voice: `index.ts + types/`
- Studio: `index.ts + types/`
- Blog: `index.ts + types/`
- SEO: `index.ts + types/`
- Influencer: `index.ts + types/ + utils/`

Bu package'larda kendi başına canonical storage/repository/service/worker/route katmanı doğrulanmadı.

Repo-level doğrudan `@kepenk/voice`, `@kepenk/studio`, `@kepenk/blog`, `@kepenk/seo`, `@kepenk/influencer` caller aramalarında canlı wiring doğrulanmadı. GitHub code-search bazı sorgularda incomplete sonuç verebildiği için bu tek başına mutlak yokluk kanıtı sayılmadı; package ağacı + manifest + contract içeriği birlikte değerlendirildi.

---

## 1. Voice

### Bulgu

Voice contract'ı ciro, sipariş, fatura, randevu, stok gibi zaten sökülmüş business capabilities'e intent üretir.

Kendi business truth'u veya write authority'si yoktur.

### Sınıflandırma

**KEEP AS ADAPTER SEED**

Canonical karşılık:

```text
Voice / Speech Input
  -> intent extraction
  -> capability/command resolution
  -> existing canonical domain command
  -> domain result
  -> optional spoken response
```

Voice ayrı bounded context değildir; **multimodal command adapter**'dır.

Bağlandığı mevcut sökümler: Booking, Commerce, Finance, Inventory/Operations, Agent Runtime / Capability Bus.

**Yeni söküm açılmaz.**

---

## 2. Studio

### Bulgu

Studio iki fikir kümesi taşır:

1. design/template/editor sözleşmeleri,
2. agency/profile/portfolio benzeri marketplace'e yakın modeller.

Fakat package seviyesinde canlı writer/workflow authority doğrulanmadı.

### Sınıflandırma

**KEEP AS CONTRACT SEED, DO NOT CREATE NEW DOMAIN**

Mapping:

- design/editor/template -> SÖKÜM 03-08, 25-27 Site/Publish/Media hattı,
- campaign creative -> SÖKÜM 15-17 Marketing/CMO/Growth,
- agency directory/profile -> SÖKÜM 38 Marketplace extension.

Studio adı altında ikinci bir universal design/domain authority yaratılmamalıdır.

**Yeni söküm açılmaz.**

---

## 3. Blog

### Bulgu

Blog package'ı post, AI generation/autopilot ve SEO score gibi content contract'ları taşır.

Ancak package kendi repository/storage/publish worker'ına sahip canlı bir content authority olarak doğrulanmadı.

### Sınıflandırma

**KEEP AS CONTENT EXTENSION SEED**

Canonical mapping:

```text
Content authoring -> Site Authoring
Publish artifact -> Public Site Runtime
Media -> Media Authority
AI generation -> Agent/Automation as proposal/generation
Lifecycle distribution -> Campaign/CMO
SEO metadata -> SEO projection/policy
```

Blog ayrı publish truth'u yaratmamalıdır.

**Yeni söküm açılmaz.**

---

## 4. SEO

### Bulgu

SEO package'ı local SEO, profile/maps, citation ve NAP consistency benzeri contracts taşır.

Canlı ayrı writer/service authority doğrulanmadı.

### Sınıflandırma

**KEEP AS ANALYSIS / OPTIMIZATION EXTENSION SEED**

Canonical mapping:

- public business identity -> Business Facts / Public Site projection,
- Google/local profile connection -> IntegrationConnection,
- optimization suggestions -> CMO/Growth/Agent proposal,
- measurement -> Analytics/Attribution,
- NAP/citation consistency -> projection/reconciliation.

SEO öneri/analysis katmanı olabilir; tenant/business truth'unu ikinci kez sahiplenmemelidir.

**Yeni söküm açılmaz.**

---

## 5. Influencer

### Bulgu

Influencer types kağıt üzerinde daha zengin bir workflow tanımlar:

- campaign,
- creator/influencer tarafı,
- deliverable,
- escrow/payment,
- dispute.

Bu nedenle yeni domain adayı olarak özellikle kontrol edildi.

Fakat current package'da canlı persistence/service/provider/payment writer'ı doğrulanmadı. `utils/pricing.ts` yalnız stateless bir öneri hesabıdır:

- platform/content type CPM sabitleri,
- engagement multiplier,
- niche multiplier,
- Türkiye PPP multiplier,
- önerilen TRY fiyatı.

`calculateInfluencerPrice` için repo caller'ı da doğrulanmadı.

### Sınıflandırma

**KEEP AS FUTURE VERTICAL CONTRACT SEED**

Canonical mapping:

- campaign lifecycle -> Campaign/CMO,
- creator/provider discovery -> Marketplace,
- offer/contract -> Marketplace Job/Bid/Agreement extension,
- escrow/payment -> Finance Core / Payment Policy,
- dispute -> Marketplace/Support dispute workflow,
- pricing suggestion -> advisory calculation, never financial authority.

Bugünkü repo'da kendi canlı authority'si olmadığı için sırf types zengin diye yeni SÖKÜM açılmaz.

---

## Final classification

| Package | Final rol | Mevcut canonical karşılık | Yeni domain? |
|---|---|---|---|
| `voice` | Multimodal command adapter | Agent Bus + mevcut domain commands | Hayır |
| `studio` | Design/agency contract seed | Site/Media/CMO + Marketplace | Hayır |
| `blog` | Content extension seed | Site Authoring/Publish + CMO | Hayır |
| `seo` | Analysis/optimization extension | Public projection + Integration + Growth | Hayır |
| `influencer` | Future vertical contract seed | Campaign + Marketplace + Finance + Support | Hayır |

## Kapanış kararı

Final inventory sweep'te **daha önce ele alınmamış, current main'de canlı durable write authority taşıyan yeni bir domain bulunmadı.**

Bu nedenle:

> **Kepenk domain söküm fazı SÖKÜM 41 ile kapanır. SÖKÜM 42 açılmaz.**

Korunan contract package'lar silinme adayı ilan edilmez. Yeni mimaride ihtiyaç halinde ilgili canonical bounded context'in adapter/extension contract'ı olarak yeniden değerlendirilecektir.

## Sonraki faz

Yeni domain avı yerine bütün söküm kararlarının sentezine geçilir:

1. canonical bounded-context haritasını finalize et,
2. KEEP / ADAPT / REWRITE / DROP matrisini tek listede birleştir,
3. duplicate authority ve legacy writer'ları çıkar,
4. dependency/migration sırası oluştur,
5. cleanup backlog'u risk ve bağımlılığa göre sırala,
6. Kepenk v2 için minimum taşınabilir capability setini sabitle.

Bu faz implementation değildir; **Söküm Sonrası Mimari Sentez / Kurtarma Planı**dır.