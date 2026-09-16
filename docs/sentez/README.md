# Kepenk v2 — Söküm Sonrası Mimari Sentez İndeksi

> **Tarih:** 2026-09-16  
> **Domain sökümü:** KAPALI — SÖKÜM 01–41  
> **Mimari sentez:** KAPALI — SENTEZ 01–05  
> **Aktif frontier:** **Implementation öncesi Exact File / Task Manifest**  
> **Amaç:** Bundan sonra yeni mimari icat etmek değil; doğrulanmış sentezi exact dosya, route, package ve migration task'larına çevirmek.

## Sentez fazları

| No | Alan | Durum | Belge |
|---|---|---|---|
| 1 | Canonical Capability Map | KAPALI | `docs/sentez/01-canonical-capability-map.md` |
| 2 | Duplicate Authority & Legacy Writer Registry | KAPALI | `docs/sentez/02-duplicate-authority-legacy-writer-registry.md` |
| 3 | Dependency / Migration Graph | KAPALI | `docs/sentez/03-dependency-migration-graph.md` |
| 4 | Cleanup Backlog + Cutover Gates | KAPALI | `docs/sentez/04-cleanup-backlog-cutover-gates.md` |
| 5 | Kepenk v2 Portable Core / Vertical Packaging | KAPALI | `docs/sentez/05-portable-core-vertical-packaging.md` |

## Kaynak kapsamı

Sentez **baştan sona bütün sökümü** kapsar:

- `KEPENK_SOKUM_PLANI.md` içindeki SÖKÜM 01–24 tarihsel kararlar,
- `docs/sokum/25-41` repo-doğrulanmış turlar,
- `docs/sokum/36-canonical-architecture-synthesis.md` core baseline,
- Restaurant / Marketplace / Procurement / Support / Admin vertical-control-plane eklentileri,
- `docs/sokum/final-inventory-sweep.md`,
- `voice`, `studio`, `blog`, `seo`, `influencer` extension/adapter classification'ı.

`apps/randevu-server` Kepenk kapsamı dışındadır ve değiştirilmez.

## Final canonical ürün modeli

```text
LEVEL 1 — Portable Platform Core
  Identity / Trust
  Tenant / Business / Subscription / Entitlement
  Durable Execution
  Integration / Credentials
  Audit / Telemetry / Data Lifecycle

LEVEL 2 — Standard Business Capabilities
  Customer
  Booking
  Commerce / Inventory
  Payment
  Finance
  Messaging
  Marketing / Attribution
  Site / Asset / Publish / Domain / Public Action
  Agent Runtime / Knowledge

LEVEL 3 — Vertical Product Packs
  Restaurant Operations
  Support OS
  Marketplace
  Procurement

EXTENSIONS / ADAPTERS
  Voice
  Blog
  SEO
  Studio
  Influencer

CONTROL SURFACE
  Platform Admin / Operations
```

Ana invariant:

> **Her business gerçeğinin tek write authority'si vardır. UI, admin, AI, provider adapter, public site veya vertical başka authority'nin gerçeğini doğrudan mutate etmez.**

## Migration sırası

```text
W0  Freeze / inventory / protected baselines
W1  Trust Spine
W2  Tenant + Business + Commercial Spine
W3  Durable Execution + Credential + Integration
W4  Delivery / Site / Asset / Public Experience
W5  Customer + Messaging + Support Foundation
W6  Booking + Payment + Finance
W7  Commerce + Inventory + Analytics + Marketing
W8  Agent Runtime + Knowledge
W9  Vertical Product Activation
W10 Admin / Privacy / Offboarding convergence + cleanup
```

`docs/sentez/03-dependency-migration-graph.md` SÖKÜM 01–41'in tamamını bu wave'lere satır satır map eder.

## Cleanup kuralı

`DROP` doğrudan silme değildir.

```text
classify
 -> deprecate
 -> canonical adapter
 -> legacy write disable
 -> parity observation
 -> caller zero
 -> permission/secret revoke
 -> archive
 -> delete
```

Security hard-cut yüzeyleri hariç hiçbir legacy authority replacement çalışmadan silinmez.

Canonical cleanup gate: `docs/sentez/04-cleanup-backlog-cutover-gates.md`.

## Korunan Kepenk public frontend

Kepenk/KPNK public marketing frontend'i v2 launch surface olarak özel koruma altındadır:

- `apps/web/src/app/page.tsx`
- root layout / global design tokens,
- `Navbar`, landing section'ları,
- public acquisition/SEO route shell,
- PWA/legal/public assets.

Canonical sözleşme: `docs/sentez/frontend-preservation-contract.md`.

Karar:

> **PRESERVE WHOLE UX + CONTENT/API REWIRE.**

Backend migration frontend'i sıfırdan rewrite etmek için gerekçe değildir. Eski fiyat, capability listesi, CTA, claim/testimonial gibi içerikler güncel truth'a yeniden bağlanır; görsel/interaction baseline korunur.

## Sonraki faz: Exact File / Task Manifest

Artık hedef mimari yeterince sabittir. Sonraki iş read-only planlama ile exact implementation manifest üretmektir:

1. W0/W1'den başlayarak exact dosya/route/package inventory çıkar.
2. Her item'a `PRESERVE / REWIRE / ADAPTER / PROJECTION / HARD-CUT / GREENFIELD / ARCHIVE / DELETE-after-gate` etiketi ver.
3. Dependency ve owner belirt.
4. Acceptance/cutover gate ekle.
5. Frontend protected-surface check'i her cleanup task'ında zorunlu tut.
6. Implementation task'larını küçük, review edilebilir wave'lere böl.

Bu aşamada da implementation yapılmaz; önce exact execution manifest çıkarılır.
