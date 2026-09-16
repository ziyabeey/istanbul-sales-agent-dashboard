# KC-04 — Billing komut yolu (İyzico → Core)

**Görev / yüzey:** KC-04 (Kepenk repo + KC-01 RPC) · **Validation budget:** STRICT (R1; para/idempotency)
**Bağımlılık:** KC-01 `ChangeSubscription`, KC-03 en az bir gerçek business (`coreBusinessId` gölge alanı)
**Durum:** kod + birim kanıtı hazır; gerçek ödeme olayı ve Core bağlantısı hosted

## Zincir

```text
İyzico checkoutForm.retrieve (sunucu tarafı, paymentStatus=SUCCESS)   ← istemci beyanı değil
  → recordVerifiedIyzicoPayment (payment/callback, AWAIT edilir; R1 blocker 1)
  → core_billing_outbox/{key} durable kayıt (atomik create-if-absent; success yolu bu yazım gözlenmeden ilerlemez; persist hatası → basarisizSenaryolar + Telegram operatör sinyali + `?core=beklemede` bayrağı)
  → core_apply_platform_command(ChangeSubscription)
       key = kc04-iyzico-<sha256(paymentId)>   (sağlayıcı olay kimliğinden türetilir)
       payload = { business_id, plan_key: kepenk_standard, status: active,
                   current_period_start/end (paidAt + 12 ay; aylık ise +1 ay),
                   source: { provider, event_id, conversation_id, paket, billing_interval } }
  → core.subscription_events (append-only) → core.subscriptions + core.entitlements (Core türetir)
```

Plan → entitlement dönüşümü Core'daki `core.plan_entitlements` politikasından; Kepenk yalnız plan anahtarını adlandırır (tek lansman paketi: her legacy `paket` → `kepenk_standard`). Fiyat kodda yaşamaz.

## Idempotency ve kurtarma (K03/K04 §8)

| Durum | Davranış |
| --- | --- |
| Aynı ödeme olayı tekrar | outbox kaydı `applied` → **ikinci komut yok** |
| `PLATFORM_IDEMPOTENCY_CONFLICT` | `conflict`: operatör müdahalesi, otomatik retry yok |
| `CORE_UNAVAILABLE` / timeout / `IN_PROGRESS` | `pending`, üstel backoff (30 s … 1 saat); **aynı anahtarla** yeniden denenir |
| Esnaf henüz KC-03 ile bağlanmamış (Core `legacy-kepenk-firestore` tenant alias'ı yok) | `deferred`; bağlantı gelince aynı anahtarla uygulanır, business tahmin edilmez — Firestore `coreBusinessId` gölgesi tek başına asla yönlendirmez (R1 blocker 2) |
| Firestore `coreBusinessId` ≠ Core tenant alias | `failed` + `lastError: BUSINESS_SHADOW_MISMATCH` + `drift{shadowBusinessId, coreBusinessId}`; komut yok, operatör uzlaştırması |
| Aynı ödeme için eşzamanlı iki ilk callback | `create()` atomik; kaybeden kanonik saklı olayı okur, dönem saklı `paidAt`'tan türer → tek payload, tek Core olayı (R1 blocker 3) |
| Bilinmeyen paket / kalıcı Core hatası | `failed` (rapor) |
| Core runtime yapılandırılmamış | olay yine durable yazılır; outbox job'u uygular |

Outbox `POST /api/cron/core-billing-outbox` (imzalı ServicePrincipal, audience `kepenk.ai:/api/cron/core-billing-outbox`, scope `core:billing`) ile yeniden sürülür; `CORE_BILLING_ENABLED=true` gerekli.

Mevcut Firestore paket senaryosu (`paketSenaryosuCalistir`) aynen çalışmaya devam eder; Firestore KC-05 cutover'a kadar authoritative'dir. Randevu F14 salon kasası ayrı para akışıdır; bu yolla ilişkisi yoktur.

## Kanıt

- `test/unit/coreBilling.test.ts`: anahtar/plan/dönem türetimi; olay önce durable sonra komut; tekrar → ikinci komut yok; bağlantısız esnaf `deferred` → bağlanınca uygulanır; conflict retry edilmez; geçici hata backoff ile aynı anahtarla retry; bilinmeyen paket ve kalıcı hata fail-closed.
- `test/unit/coreBillingHook.test.ts`: flag kapalıyken no-op; runtime yokken durable pending; runtime varken uygular; callback'e asla exception sızmaz.
- `test/unit/coreBillingRoutes.test.ts`: yanlış audience/scope/legacy secret → 401; flag ve bağlantı kapıları.
- CI: `Lint KC-04 ...` + `Typecheck KC-04 ...` (`test/tsconfig.kc-04-billing.json`).

## Açık

- "Randevu ve Kepenk aynı snapshot'ı okur" ve "eşzamanlı iki komut aynı business'ta seri" kabulleri KC-01 CI (`kc01_core_platform*.sql`) + hosted kanıt.
- Aylık/yıllık ayrımı: mevcut checkout yalnız yıllık paket satar (`KEPENK_DEFAULT_BILLING_INTERVAL = annual`); aylık satış açılırsa create route'un `billing_interval`'ı olaya taşıması gerekir.
- Trial (3 ay tester erişimi) bu adımda değil, KC-05 onboarding'de `status: trial` ile verilir.
- **Hosted gerçek (Issue #10 receipt, DANIŞMA 3 kabul, 2026-09-16):** `odemeler` / `pendingPayments` / `abonelikler` / `kredi` / `islemler` collection-group sayıları 0; `paket` TEMEL 5 / buyume 2. Geriye dönük abonelik veya ödeme replay'i yoktur; komut yolu yalnız gelecekteki doğrulanmış İyzico callback'lerini etkiler ve KC-01 Core ticari modeli legacy ticari backfill varsayımı olmadan kurulur. Sonradan bulunacak harici bir fatura kaynağı **uzlaştırılır, üzerine yazılmaz** (outbox `conflict` durumu ve idempotent anahtar bunu zorlar). Her iki legacy paket tek `kepenk_standard` plan politikasına eşlenir; ikinci plan gerekirse `core.plan_entitlements`'a KC-01 tarafında eklenir.
- Usage/kredi ledger'ı (KC-04b): receipt'te ölçülen usage koleksiyonu yok (`kota_kullanim` kökü mevcut değil, `kredi` 0); ledger yalnız gerçekten ölçülmeye başlanınca açılır.
