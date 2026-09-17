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
| owner Core'da yok | **bekletilir** — sahipsiz business yaratılmaz; Firestore `coreUserId` gölgesi tek başına sahip saymaz (`deferredShadowOnly`) |
| Firestore `coreUserId` ≠ Core'un çözdüğü owner | **fail-closed** — `ownerShadowMismatch` raporlanır, komut yok |
| ad < 2 veya > 120 karakter | `invalid_name` raporlanır |
| slug türetilemez / rezerve | `slug_invalid` / `slug_reserved` raporlanır |
| hazır | `ProvisionBusiness` — idempotency key `kc03-provision-<sha256(esnafId)>`, payload `{owner_user_id, name, slug, timezone, tenant_alias{legacy-kepenk-firestore, esnafId}}` |

Owner çözümü **her çalıştırmada** Core'dan okunur, Kepenk tarafı yazımdan değil: KC-02 girişte `legacy-kepenk-phone:<telefon> → user_id` alias'ını bağlar; backfill her sayfa için `core_resolve_identity_aliases` (100'lük batch) ile `telefonTemiz`'i Core kullanıcısına çevirir (`OwnerResolution`: `core` / `shadow_only` / `shadow_mismatch` / `none`). Firestore'daki `coreUserId` yalnız **ipucu**dur: Core doğrulamadan asla `ProvisionBusiness.owner_user_id` olmaz (R1 KC-03 blocker 2); Core'un cevabıyla çelişen gölge fail-closed drift'tir. Çözülen `coreUserId` yalnız başarılı provisioning ile birlikte gölge alan olarak yazılır (PR #18 blocker 4).

Slug: mevcut `subdomain`/`slug` canonical ise korunur, değilse Randevu `slugify` portu (`src/lib/core/slug.ts`) ile addan türetilir. Rezerve ad listesi DOMAIN-01 kesinleşene kadar geçici ve dardır. `BUSINESS_SLUG_TAKEN` → **fail-closed, rapor**, sessiz rename yok.

Sonuç `coreUserId`, `coreBusinessId`, `coreBusinessSlug`, `coreBusinessLinkedAt`, `coreBackfill{created, slugSource, idempotencyKey}` olarak legacy dokümana gölge yazılır. Firestore hâlâ authoritative'dir; bu alanlar yetki vermez.

Koruma: KC-01 `ProvisionBusiness` aynı alias için mevcut business'ı döndürür; sahip bu business'ın üyesi değilse (`membership_id = null`) legacy tenant **bağlanmaz** ve `ownerMismatch` raporlanır (foreign-alias hijack yok).

## Shadow parity

`runTenantParityCheck`: bağlı esnaflar için `core_resolve_tenant_aliases` (100'lük batch) ile `coreBusinessId` karşılaştırılır; `coreUserId` + telefon olanlar için `core_resolve_identity_aliases(legacy-kepenk-phone)` ile owner eşlemesi doğrulanır. Rapor: `aliasMatch / aliasMissing / aliasMismatch / ownerAlias*`, `exhausted`, `truncated` ve `zeroDrift`. **`zeroDrift` tam cutover değişmezidir (R1 KC-03 blocker 1):** tarama exhaustive olmalı (`maxTenants` kesmesi → `truncated`, asla zero drift), canlı tenant'lar arasında `unlinked = 0` ve `deferredNoOwner = 0` olmalı, alias/owner missing ve mismatch listeleri boş olmalı. **`zeroDrift = true` olmadan KC-05 açılmaz.** Raporlar `core_migration_reports/{latest-backfill|latest-parity}`.

## Yüzeyler

- `POST /api/cron/core-backfill` — imzalı ServicePrincipal (audience `kepenk.ai:/api/cron/core-backfill`, scope `core:backfill`, subject cloud-scheduler/cloud-tasks/operator); `CORE_BACKFILL_ENABLED=true` gerekli; body `{batchSize, startAfter, dryRun, parity}`; cursor ile sayfalı, tekrar güvenli.
- `GET/POST /api/admin/core/parity` — durable AdminSession; GET son raporlar, POST parity'yi yeniden hesaplar (salt-okunur).

## Kanıt

- `test/unit/coreBackfill.test.ts`: N hazır esnaf → N komut, ikinci çalıştırmada 0 komut; Core replay `created=false` → bağlı sayılır; foreign alias → bağlanmaz; slug çakışması rename/retry yok; dry-run komut üretmez; cursor sayfalama; parity zero-drift ve drift sınıflandırması.
- `test/unit/coreBackfillRoutes.test.ts`: yanlış audience/scope/subject/legacy secret → 401; flag/bağlantı kapıları; admin parity 401 negatifleri.
- CI: `Lint KC-03 ...` + `Typecheck KC-03 ...` (`test/tsconfig.kc-03-backfill.json`).

## Açık

- **Hosted gerçek (Issue #10 receipt, DANIŞMA 3 kabul, 2026-09-16):** `esnaflar` 7; `telefonTemiz` 5 (tekrar yok), `slug` 0, `subdomain` 1, `businessId` 0. Backfill boyutu: en fazla 5 tenant telefon alias'ı ile sahibine bağlanabilir ve bu yalnız sahip KC-02 üzerinden doğrulanmış OTP girişi yaptıktan sonra olur; telefonu olmayan 2 tenant yapı gereği `deferred_no_owner` kalır (business yaratılmaz, `core_migration_reports`'ta listelenir). 6 slug `ad`/`isletmeAdi`'den türetilir. Ürün kararı: sahipsiz 2 tenant'ın niteliği (bayat onboarding kaydı mı, manuel sahip atanacak gerçek işletme mi).
- `firebase:<uid>` alias'ı (KC-02 `firebase-bagla`, migration kararı) owner çözümünde **kullanılmaz**: receipt tenant tarafında Firebase uid alanı göstermedi (`sites` claim 0), telefon dışı bir eşleme tahmin edilmez. Firebase kimliği olan tek kullanıcı KC-02 ile kendi Core hesabına bağlandığında, o kullanıcının telefon alias'ı üzerinden tenant çözümü değişmeden çalışır.
- Trial/abonelik durumu bu adımda **yazılmaz** (mevcut ödeme durumu koddan çıkarılmaz); KC-04 doğrulanmış ödeme olayı, KC-05 onboarding trial'ı ile gelir.
- DOMAIN-01 rezerve ad listesi kesinleşince `CORE_RESERVED_SLUGS` ona bağlanır.
