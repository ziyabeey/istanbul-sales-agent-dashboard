# Kepenk v2 — Exact Execution Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLANLAMA AKTİF — implementation başlamadı  
> **Kaynak:** SÖKÜM 01–41 + SENTEZ 01–05  
> **Amaç:** Canonical mimariyi exact file/route/package task'larına dönüştürmek.  
> **Kural:** Bu klasör kod implementasyonu yapmaz; hangi dosyanın hangi wave'de ne olacağını ve hangi acceptance gate ile kapanacağını sabitler.

## Wave manifestleri

| Wave | Alan | Durum | Belge |
|---|---|---|---|
| W0 | Freeze / inventory / protected baselines | KAPALI / sentezde sabit | `docs/sentez/frontend-preservation-contract.md`, SENTEZ 2–4 |
| W1 | Trust Spine | AÇIK | `docs/execution/w01-trust-spine.md` |
| W2 | Tenant + Business + Commercial Spine | BEKLİYOR | — |
| W3 | Durable Execution + Credential + Integration | BEKLİYOR | — |
| W4 | Site / Asset / Publish / Public Experience | BEKLİYOR | — |
| W5 | Customer + Messaging + Support Foundation | BEKLİYOR | — |
| W6 | Booking + Payment + Finance | BEKLİYOR | — |
| W7 | Commerce + Inventory + Analytics + Marketing | BEKLİYOR | — |
| W8 | Agent Runtime + Knowledge | BEKLİYOR | — |
| W9 | Vertical Activation | BEKLİYOR | — |
| W10 | Admin / Privacy / Offboarding convergence + final cleanup | BEKLİYOR | — |

## Disposition etiketleri

- `PRESERVE`: çalışan ürün/UX/primitive korunur.
- `REWIRE`: data source / command / authority boundary değişir.
- `ADAPTER`: legacy caller geçici olarak canonical command'a yönelir.
- `PROJECTION`: eski read field canonical authority'den türetilir.
- `HARD-CUT`: güvensiz yol replacement hazır olur olmaz kapatılır.
- `GREENFIELD`: contract/demo seed üstünde yeni canonical runtime kurulur.
- `ARCHIVE`: caller=0 ve permission=0 sonrası runtime dışına alınır.
- `DELETE-AFTER-GATE`: bütün retirement gate'lerinden sonra silinebilir.

## Koruma kuralları

- Kepenk public frontend `PRESERVE WHOLE UX + CONTENT/API REWIRE`.
- `/giris` gibi çalışan auth/acquisition UX'leri sırf backend authority değişiyor diye yeniden çizilmez.
- `apps/sites` public shell korunur.
- Strong typed/domain primitives mümkünse korunup canonical authority altında yeniden bağlanır.
- `apps/randevu-server` kapsam dışıdır.
- Hiçbir `DROP` etiketi tek başına delete yetkisi değildir.

## Her task'ta zorunlu alanlar

```text
Task ID
Exact path(s)
Current role
Disposition
Canonical destination
Prerequisites
Migration action
Acceptance / cutover gate
Rollback note
Frontend/public dependency check
```

## Aktif frontier

**W1 — Trust Spine exact manifest.**
