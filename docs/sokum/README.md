# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-15  
> **Amaç:** `KEPENK_SOKUM_PLANI.md` korunmuş geniş snapshot olarak kalırken, güncel doğrulama turlarının canlı frontier'ını burada tutmak.

## Güncel durum

| No | Alan | Durum | Belge |
|---|---|---|---|
| 01-24 | Önceki söküm kararları | KAPALI / arşivlenmiş | `KEPENK_SOKUM_PLANI.md` |
| 25 | Public Site Runtime / `apps/sites` / Publish Artifact Authority | KAPALI | `docs/sokum/25-public-site-runtime.md` |
| 26 | Site Authoring / Draft -> Publish Command / Artifact Storage / Domain Binding Writer | KAPALI | `docs/sokum/26-site-authoring-publish-domain-writer.md` |
| 27 | Media / Asset Storage / Upload / CDN / Immutable Asset Reference Authority | AÇIK | sıradaki doğrulama turu |

## Kanonik devam kuralı

- Eski kararları kaybetmemek için `KEPENK_SOKUM_PLANI.md` toplu snapshot olarak korunur.
- SÖKÜM 25 ve sonrası detaylı, repo ile doğrulanmış belgeler `docs/sokum/` altında ayrı tutulur.
- Yeni tur başlamadan önce bu indeks ve en son kapalı söküm belgesi okunur.
- Paralel ajan aynı frontier'ı kapatmışsa üzerine yazılmaz; güncel `main` yeniden okunup sonraki açık frontier'a geçilir.
- `apps/randevu-server` bu söküm serisi nedeniyle değiştirilmez.

## Aktif frontier

### SÖKÜM 27 - Media / Asset Storage / Upload / CDN / Immutable Asset Reference Authority

Öncelikli sorular:

- Upload tenant ownership'i nasıl kuruluyor?
- Asset URL/object key mutable mı?
- `MediaRef` gerçekten immutable bir asset revision'a mı işaret ediyor?
- Published site eski görsel revision'ını rollback sırasında yeniden okuyabiliyor mu?
- External/Unsplash asset'leri publish artifact'e nasıl pinleniyor?
- Asset silme veya overwrite published revision'ı bozabiliyor mu?
- Content hash, dedupe, transform/CDN, orphan GC ve provenance authority nerede?

SÖKÜM 27 için verdict henüz verilmemiştir.
