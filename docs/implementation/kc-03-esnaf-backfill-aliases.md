# KC-03 — esnaf → business backfill, alias'lar ve shadow parity

**Görev / yüzey:** KC-03 (Kepenk repo + KC-01 komutları) · **Validation budget:** STRICT
**Bağımlılık:** KC-01 (`ProvisionBusiness`, `core_resolve_tenant_aliases`, `core_resolve_identity_aliases`), KC-02 (`coreUserId` gölge alanı)
**Durum:** kod + birim kanıtı hazır; gerçek esnaf popülasyonu ve Core bağlantısı hosted

## Eşleme

Her canlı `esnaflar/{esnafId}` için:

| Koşul | Karar |
| --- | --- |
| `durum = silindi` | atlanır |
| `coreBusinessId` var | zaten bağlı (0 komut) |
| `coreUserId` yok | **bekletilir** — sahipsiz business yaratılmaz |
| ad < 2 veya > 120 karakter | `invalid_name` raporlanır |
| slug türetilemez / rezerve | `slug_invalid` / `slug_reserved` raporlanır |
| hazır | `ProvisionBusiness` — idempotency key `kc03-provision-<sha256(esnafId)>`, payload `{owner_user_id, name, slug, timezone, tenant_alias{legacy-kepenk-firestore, esnafId}}` |

Slug: mevcut `subdomain`/`slug` canonical ise korunur, değilse Randevu `slugify` portu (`src/lib/core/slug.ts`) ile addan türetilir. Rezerve ad listesi DOMAIN-01 kesinleşene kadar geçici ve dardır. `BUSINESS_SLUG_TAKEN` → **fail-closed, rapor**, sessiz rename yok.

Sonuç `coreBusinessId`, `coreBusinessSlug`, `coreBusinessLinkedAt`, `coreBackfill{created, slugSource, idempotencyKey}` olarak legacy dokümana gölge yazılır. Firestore hâlâ authoritative'dir; bu alanlar yetki vermez.

Koruma: KC-01 `ProvisionBusiness` aynı alias için mevcut business'ı döndürür; sahip bu business'ın üyesi değilse (`membership_id = null`) legacy tenant **bağlanmaz** ve `ownerMismatch` raporlanır (foreign-alias hijack yok).

## Shadow parity

`runTenantParityCheck`: bağlı esnaflar için `core_resolve_tenant_aliases` (100'lük batch) ile `coreBusinessId` karşılaştırılır; `coreUserId` + telefon olanlar için `core_resolve_identity_aliases(legacy-kepenk-phone)` ile owner eşlemesi doğrulanır. Rapor: `aliasMatch / aliasMissing / aliasMismatch / ownerAlias*` ve `zeroDrift`. **`zeroDrift = true` olmadan KC-05 açılmaz.** Raporlar `core_migration_reports/{latest-backfill|latest-parity}`.

## Yüzeyler

- `POST /api/cron/core-backfill` — imzalı ServicePrincipal (audience `kepenk.ai:/api/cron/core-backfill`, scope `core:backfill`, subject cloud-scheduler/cloud-tasks/operator); `CORE_BACKFILL_ENABLED=true` gerekli; body `{batchSize, startAfter, dryRun, parity}`; cursor ile sayfalı, tekrar güvenli.
- `GET/POST /api/admin/core/parity` — durable AdminSession; GET son raporlar, POST parity'yi yeniden hesaplar (salt-okunur).

## Kanıt

- `test/unit/coreBackfill.test.ts`: N hazır esnaf → N komut, ikinci çalıştırmada 0 komut; Core replay `created=false` → bağlı sayılır; foreign alias → bağlanmaz; slug çakışması rename/retry yok; dry-run komut üretmez; cursor sayfalama; parity zero-drift ve drift sınıflandırması.
- `test/unit/coreBackfillRoutes.test.ts`: yanlış audience/scope/subject/legacy secret → 401; flag/bağlantı kapıları; admin parity 401 negatifleri.
- CI: `Lint KC-03 ...` + `Typecheck KC-03 ...` (`test/tsconfig.kc-03-backfill.json`).

## Açık

- Gerçek esnaf sayısı ve `coreUserId` kapsamı (KC-00 hosted receipt + KC-02 canlı girişler) — backfill boyutunu belirler.
- Trial/abonelik durumu bu adımda **yazılmaz** (mevcut ödeme durumu koddan çıkarılmaz); KC-04 doğrulanmış ödeme olayı, KC-05 onboarding trial'ı ile gelir.
- DOMAIN-01 rezerve ad listesi kesinleşince `CORE_RESERVED_SLUGS` ona bağlanır.
