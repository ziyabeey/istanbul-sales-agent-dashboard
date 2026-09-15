# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-15  
> **Amaç:** `KEPENK_SOKUM_PLANI.md` korunmuş geniş snapshot olarak kalırken, güncel doğrulama turlarının canlı frontier'ını burada tutmak.

## Güncel durum

| No | Alan | Durum | Belge |
|---|---|---|---|
| 01-24 | Önceki söküm kararları | KAPALI / arşivlenmiş | `KEPENK_SOKUM_PLANI.md` |
| 25 | Public Site Runtime / `apps/sites` / Publish Artifact Authority | KAPALI | `docs/sokum/25-public-site-runtime.md` |
| 26 | Site Authoring / Draft -> Publish Command / Artifact Storage / Domain Binding Writer | KAPALI | `docs/sokum/26-site-authoring-publish-domain-writer.md` |
| 27 | Media / Asset Storage / Upload / CDN / Immutable Asset Reference Authority | KAPALI | `docs/sokum/27-media-asset-authority.md` |
| 28 | Public Interaction Runtime / Forms / Lead Capture / Action Capability Boundary | AÇIK | sıradaki doğrulama turu |

## Kanonik devam kuralı

- Eski kararları kaybetmemek için `KEPENK_SOKUM_PLANI.md` toplu snapshot olarak korunur.
- SÖKÜM 25 ve sonrası detaylı, repo ile doğrulanmış belgeler `docs/sokum/` altında ayrı tutulur.
- Yeni tur başlamadan önce bu indeks ve en son kapalı söküm belgesi okunur.
- Paralel ajan aynı frontier'ı kapatmışsa üzerine yazılmaz; güncel `main` yeniden okunup sonraki açık frontier'a geçilir.
- `apps/randevu-server` bu söküm serisi nedeniyle değiştirilmez.

## Kapanan son karar: SÖKÜM 27

Media katmanında canonical storage authority olmadığı doğrulandı.

Kanonik yön:

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

`blob:` URL, arbitrary external URL ve raw provider URL production asset authority olmayacaktır.

## Aktif frontier

### SÖKÜM 28 - Public Interaction Runtime / Forms / Lead Capture / Action Capability Boundary

Öncelikli sorular:

- Public site contact/action component'leri hangi API'lere yazıyor?
- Tenant/site/business identity request body'den mi geliyor, canonical DomainBinding/published revision'dan mı?
- Lead/contact form Customer Core/CRM'e mi yazıyor, paralel koleksiyon mu oluşturuyor?
- Booking CTA Booking authority'ye mi bağlı?
- Commerce action'ları Commerce Core'a mı bağlı?
- Public action endpoint'lerinde origin/CORS, abuse/rate limit, bot/spam ve idempotency nasıl çalışıyor?
- Published component hangi capability'yi çağırabileceğini nasıl beyan ediyor?
- Form/action schema published revision ile pinli mi?
- Public action analytics/attribution/customer timeline'a nasıl bağlanıyor?
- Public renderer process'inin hangi mutation capability'lerine gerçekten ihtiyacı var?

SÖKÜM 28 için verdict henüz verilmemiştir.
