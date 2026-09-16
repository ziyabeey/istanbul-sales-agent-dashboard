# KC-05 — Core → Firestore projection ve canary cutover

**Görev / yüzey:** KC-05 (Kepenk repo) · **Validation budget:** FOCUSED → STRICT (cutover)
**Bağımlılık:** KC-03 parity `zeroDrift = true`, KC-04 en az bir gerçek abonelik olayı, KC-01 feed (`core_read_change_feed`, olaylarda türetilmiş entitlement listesi)
**Durum:** kod + birim kanıtı hazır; canary tenant seçimi, projection gecikme ölçümü ve geri alma provası hosted

## Projection (tek yönlü)

`src/lib/core/projection.ts` — `POST /api/cron/core-projection` (imzalı ServicePrincipal, audience `kepenk.ai:/api/cron/core-projection`, scope `core:projection`; `CORE_PROJECTION_ENABLED=true`):

```text
core_projection_state/feed.afterEventId  (cursor)
  → core_read_change_feed(after, ≤100)
  → her olay için legacy esnafId: core_business_index/{business_id}
       (business_provisioned slug'ı, tenant_alias_linked legacy-kepenk-firestore external_id'yi indeksler;
        yoksa esnaflar.coreBusinessId gölge alanından fallback; hâlâ yoksa core_projection_orphans)
  → esnaflar/{esnafId}.core = { businessId, slug, subscription{planKey,status,period,policyVersion,eventId},
                                entitlements{key:{granted,limitValue,validUntil,eventId}}, lastEventId, projectedAt }   (merge)
  → cursor = event_id, lagMs raporlanır
```

Deterministik merge: cursor'ı geriye almak aynı duruma yakınsar (test: replay). Projection **yetki üretmez** (K04 §11): `has_entitlement` / snapshot her istekte Core'dan okunur; projection kasıtlı eskitildiğinde yetki kararı değişmez.

## Canary cutover (`src/lib/core/canary.ts`)

`CORE_CANARY_TENANTS` listesindeki esnaflar için legacy root **ticari yazımı kapanır**:

| Yüzey | Canary davranışı |
| --- | --- |
| `paketSenaryosuCalistir` (İyzico callback) | `durum` / `paket` / `aktifModuller` yazılmaz (`stripLegacyCommercialFields`); `odemeId`, `yenilenmeTarihi` yazılır. Ticari durum KC-04 komutu → Core → projection ile gelir |
| `PATCH /api/admin/esnaf/[id]` | `paket` / `durum` / `aktifModuller` içeren raw patch **409 `CORE_CANARY_WRITE_BLOCKED`** |
| Projection | Core `subscription.status` → legacy `durum` (`trial|active→aktif`, `past_due→riskli`, `cancelled→pasif`), `durumKaynak: core-projection` |

**Geri alma** = tenant'ı listeden çıkarmak; legacy yazım anında geri gelir, Core'daki olaylar silinmez, güvensiz bir yol açılmaz.

## Onboarding Core'a yazar (`src/lib/core/onboardingCore.ts`)

`POST /api/onboarding/complete` legacy dokümanı yazdıktan sonra, istekte Core BFF oturumu varsa (`CORE_ONBOARDING_ENABLED=true`): `ProvisionBusiness` (owner = oturumun `user_id`'si, alias = esnafId, key `kc05-onboard-<esnafId>`) + `ChangeSubscription status=trial` (`CORE_TRIAL_DAYS`, varsayılan 90; key `kc05-trial-<esnafId>`) → gölge alanlar (`coreUserId`, `coreBusinessId`, `coreOnboarding`). Core oturumu yoksa legacy akış değişmez ve KC-03 backfill sonradan bağlar. Core hatası `coreOnboarding.status = deferred` olarak kaydedilir; yarım provisioning yok, foreign alias'a bağlanma yok.

## Admin komutları ve plan okuma

- `POST /api/admin/core/entitlement {esnafId, action grant|revoke, entitlementKey, limitValue?, validUntil?, idempotencyKey?}` — durable AdminSession + `runAuditedAdminMutation` + impersonation kısıtı; raw Firestore patch yerine `GrantEntitlement` / `RevokeEntitlement`; bağlanmamış tenant 409.
- `GET /api/core/plan` — CoreRequestContext'ten plan/status/dönem/entitlement'lar (`source: core`); fiyat kodda yaşamaz.

## Kanıt

- `test/unit/coreProjection.test.ts`: 6 olaylık feed → index + `core.*` alanları; replay idempotent; cursor ile sayfalama; canary `durum` projection'ı; orphan kaydı + gölge fallback.
- `test/unit/coreCanary.test.ts`: liste ayrıştırma, guard, strip, durum eşlemesi, geri alma (listeden çıkarınca yazım serbest).
- `test/unit/coreOnboardingCore.test.ts`: provisioning + trial + gölge; flag/oturum/recovery no-op; adım bazlı hata, foreign alias reddi, rezerve slug.
- `test/unit/coreProjectionRoutes.test.ts`: projection ServicePrincipal + flag; admin entitlement route AdminSession/raw header negatifleri, audited komut, idempotent intent, unlinked 409.
- `trustBaseline.characterization.test.ts`: KC-05 kaynak değişmezleri (legacy senaryo/admin patch/projection/entitlement route).
- CI: `Lint KC-05 ...` + `Typecheck KC-05 ...` (`test/tsconfig.kc-05-projection.json`).

## Açık / hosted-only (KC-05 kabulü)

- Canary kohortu: fixture tenant + bir gerçek canary tenant + AdminPrincipal + ServicePrincipal'lar (KC-01 `register_service_principal`); `CORE_CANARY_TENANTS`, `CORE_PROJECTION_ENABLED`, `CORE_ONBOARDING_ENABLED` env.
- Projection gecikmesi (`lagMs`) hosted ölçüm; "projection kasıtlı eskitildiğinde yetki değişmez" ve "canary'de Firestore root write kapalıyken tüm akışlar çalışır" tarayıcı/staging kanıtı.
- Geri alma provası (listeden çıkar → legacy yazım geri gelir) hosted.
- `aktifModuller` canary'de yazılmaz; modül aktivasyonunun entitlement'tan türetilmesi UI tarafında `/api/core/plan` ile yapılır (W7 kapsamı).
- Firestore koleksiyon temizliği kapsam dışı.
