# Kepenk v2 — Söküm Sonrası Mimari Sentez İndeksi

> **Tarih:** 2026-09-16  
> **Domain sökümü:** KAPALI — SÖKÜM 01–41  
> **Aktif faz:** Söküm Sonrası Mimari Sentez / Kurtarma Planı  
> **Aktif frontier:** **SENTEZ 3 — Dependency / Migration Graph**

## Fazlar

| No | Alan | Durum | Belge |
|---|---|---|---|
| 1 | Canonical Capability Map | KAPALI | `docs/sentez/01-canonical-capability-map.md` |
| 2 | Duplicate Authority & Legacy Writer Registry | KAPALI | `docs/sentez/02-duplicate-authority-legacy-writer-registry.md` |
| 3 | Dependency / Migration Graph | AÇIK | — |
| 4 | Cleanup Backlog + Cutover Gates | BEKLİYOR | — |
| 5 | Kepenk v2 Portable Core / Vertical Packaging | BEKLİYOR | — |

## Korunan public frontend

Kepenk/KPNK public marketing frontend'i özel koruma altındadır:

- `apps/web/src/app/page.tsx`
- root layout / global design tokens,
- `Navbar`, ana landing section'ları ve public marketing route ağı,
- SEO/PWA/public acquisition surface.

Canonical sözleşme: `docs/sentez/frontend-preservation-contract.md`.

**Kural:** backend/domain migration frontend'i sıfırdan yeniden yazmak için gerekçe değildir. Görsel/interaction baseline KEEP WHOLE; eski fiyat, ürün vaadi, capability listesi ve doğrulanmamış claim/testimonial gibi içerikler CONTENT REWIRE edilir.

## SENTEZ 1 kararı

Kepenk v2 beş düzlemde organize edilir:

1. Platform Control Plane
2. Core Business Plane
3. Delivery / Public Experience Plane
4. Integration & Durable Execution Plane
5. Vertical Product Plane

First-class vertical'lar:

- Restaurant Operations
- Marketplace
- Procurement
- Support OS

`voice`, `studio`, `blog`, `seo`, `influencer` ayrı universal authority değildir; ilgili core/vertical'lara bağlanan adapter/extension seed'leridir.

Ana invariant:

> **Her business gerçeğinin tek write authority'si vardır. UI, provider adapter, AI agent, admin paneli, public site ve vertical product başka authority'nin gerçeğini doğrudan mutate etmez.**

## SENTEZ 2 kararı

Legacy authority'ler aşağıdaki migration kümelerine ayrıldı:

```text
A. Identity / Admin Trust
B. Tenant / Subscription / Entitlement
C. Site / Asset / Public Action
D. Customer / Messaging
E. Integration / Durable Execution / Credentials
F. Payment / Finance
G. Agent / Audit / Telemetry / Privacy
H. Vertical Products
```

Cutover tipleri:

- **Type A — Security hard cut**: insecure compatibility tutulmaz.
- **Type B — Strangler adapter**: legacy caller canonical command'a yönlendirilir.
- **Type C — Projection migration**: eski alan read projection olarak geçici yaşar.
- **Type D — Greenfield authority**: demo/contract seed'den gerçek runtime inşa edilir; demo state migrate edilmez.

En yüksek riskli writer sınıfları:

- raw/shared admin secret ve parçalı admin session,
- direct tenant/package/kota/hard-delete mutation,
- tenant-root credential/provider state,
- unsigned session/email authorization,
- provider callback'in domain state'ini payment success olarak mutate etmesi,
- mutable finance/balance state,
- Booking/Order/Restaurant içine gömülü payment authority,
- simulated/no-op privacy purge.

## SENTEZ 3 kapsamı

SENTEZ 3 sekiz migration kümesini gerçek dependency wave'lerine dönüştürür:

1. prerequisite authority'leri belirle,
2. parallel ilerleyebilecek blokları ayır,
3. compatibility/projection dönemlerini tanımla,
4. provider/payment/finance cutover sırasını kesinleştir,
5. vertical pack activation gate'lerini çıkar,
6. big-bang yerine strangler migration graph üret,
7. korunan public frontend'in hangi wave'de yalnız data/API rewire alacağını sabitle.

Kod değişikliği yapılmaz.

## Kapsam kuralı

- `KEPENK_SOKUM_PLANI.md` içindeki 01–24 tarihsel kararlar senteze dahildir.
- `docs/sokum/25-41` repo-doğrulanmış sonraki turlardır.
- `docs/sokum/36-canonical-architecture-synthesis.md` core baseline'dır.
- `docs/sokum/37-41` son vertical/control-plane eklentileridir.
- `docs/sokum/final-inventory-sweep.md` domain söküm kapanışıdır.
- `docs/sentez/frontend-preservation-contract.md` public Kepenk frontend'inin KEEP/PRESERVE kuralıdır.
- `apps/randevu-server` Kepenk kapsamı dışındadır ve değiştirilmez.
- Yeni domain avına dönülmez; yalnız somut kapsam boşluğu kanıtlanırsa ayrıca değerlendirilir.
