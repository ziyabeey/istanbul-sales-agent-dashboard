# Kepenk v2 — Söküm Sonrası Mimari Sentez İndeksi

> **Tarih:** 2026-09-16  
> **Domain sökümü:** KAPALI — SÖKÜM 01–41  
> **Aktif faz:** Söküm Sonrası Mimari Sentez / Kurtarma Planı  
> **Aktif frontier:** **SENTEZ 2 — Duplicate Authority & Legacy Writer Registry**

## Fazlar

| No | Alan | Durum | Belge |
|---|---|---|---|
| 1 | Canonical Capability Map | KAPALI | `docs/sentez/01-canonical-capability-map.md` |
| 2 | Duplicate Authority & Legacy Writer Registry | AÇIK | — |
| 3 | Dependency / Migration Graph | BEKLİYOR | — |
| 4 | Cleanup Backlog + Cutover Gates | BEKLİYOR | — |
| 5 | Kepenk v2 Portable Core / Vertical Packaging | BEKLİYOR | — |

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

## SENTEZ 2 kapsamı

SENTEZ 2 yalnız legacy write yollarını sınıflandırır:

```text
legacy writer
 -> sahip olduğunu sandığı business fact
 -> gerçek canonical authority
 -> risk
 -> compatibility ihtiyacı
 -> cutover gate
```

Kod değişikliği yapılmaz.

## Kapsam kuralı

- `docs/sokum/36-canonical-architecture-synthesis.md` core baseline'dır.
- `docs/sokum/37-41` son vertical/control-plane eklentileridir.
- `docs/sokum/final-inventory-sweep.md` domain söküm kapanışıdır.
- `apps/randevu-server` Kepenk kapsamı dışındadır ve değiştirilmez.
- Yeni domain avına dönülmez; yalnız somut kapsam boşluğu kanıtlanırsa ayrıca değerlendirilir.
