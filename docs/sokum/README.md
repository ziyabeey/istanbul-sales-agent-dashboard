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
| 28 | Public Interaction Runtime / Forms / Lead Capture / Action Capability Boundary | KAPALI | `docs/sokum/28-public-interaction-action-capability-boundary.md` |
| 29 | Identity / Session / Tenant Context / API Guard / Service Trust Boundary | AÇIK | sıradaki doğrulama turu |

## Kanonik devam kuralı

- Eski kararları kaybetmemek için `KEPENK_SOKUM_PLANI.md` toplu snapshot olarak korunur.
- SÖKÜM 25 ve sonrası detaylı, repo ile doğrulanmış belgeler `docs/sokum/` altında ayrı tutulur.
- Yeni tur başlamadan önce bu indeks ve en son kapalı söküm belgesi okunur.
- Paralel ajan aynı frontier'ı kapatmışsa üzerine yazılmaz; güncel `main` yeniden okunup sonraki açık frontier'a geçilir.
- `apps/randevu-server` bu söküm serisi nedeniyle değiştirilmez.

## Kapanan son karar: SÖKÜM 28

Public UI ile CRM / Booking / Commerce motorları arasında tek bir action authority olmadığı doğrulandı.

En kritik invariant:

```text
UI success
   ==
authoritative domain command committed
```

Canonical yön:

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
```

Browser `esnafId`, `shopId`, source attribution veya authoritative fiyat seçmeyecektir. Live form/randevu/sipariş component'leri server commit olmadan başarı gösteremeyecektir.

## Aktif frontier

### SÖKÜM 29 - Identity / Session / Tenant Context / API Guard / Service Trust Boundary

Öncelikli sorular:

- Auth identity tenant/business membership'e nasıl bağlanıyor?
- Session authority nerede, stale/revoked session nasıl ele alınıyor?
- `requireSessionEsnaf` ve benzeri ownership guard'lar hangi route'larda uygulanıyor, nerelerde bypass var?
- `apiGuard` ve `requireAdminToken` gerçek trust modeli nedir?
- Body/query/path içinden gelen tenant/business ID'leri hangi route'larda authority kabul ediliyor?
- Role/permission ile package entitlement birbirinden ayrılmış mı?
- Admin/support/impersonation yolları nasıl sınırlandırılmış?
- Worker, cron, Cloud Tasks ve webhook çağrılarında service-to-service identity nasıl doğrulanıyor?
- Static/shared secret veya admin token blast radius nedir?
- Cross-tenant read/write fail-closed mu?
- Secret/config authority ve rotation yüzeyi nerede?

SÖKÜM 29'un hedefi:

> **Kimlik, tenant üyeliği, rol/izin ve service identity'yi tek bir fail-closed trust graph'a bağlamak.**
