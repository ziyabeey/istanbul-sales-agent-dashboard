# KC-02 — Kepenk kimlik adaptörü ve BFF oturumu

**Görev / yüzey:** KC-02 (Kepenk repo) · **Validation budget:** STRICT (auth authority; R1)
**Bağlayıcı sözleşme:** Randevu `docs/plan/k04-platform-core-contract.md` + `docs/plan/kepenk-core-migration-plan.md` §KC-02
**Bağımlılık:** KC-01 RPC yüzeyi (Randevu [PR #111](https://github.com/ziyabeey1-ai/randevu/pull/111), draft)
**PR:** [#18](https://github.com/ziyabeey1-ai/istanbul-sales-agent-dashboard/pull/18) (draft)
**Durum:** kod + birim kanıtı hazır; PR #18 ön-inceleme blocker'ları bu revizyonda kapatıldı; hosted Supabase bağlantısı ve R1 incelemesi açık

## Ne yapıldı

Kepenk sunucusunda Supabase Auth'a karşı **BFF oturumu**. Tarayıcı yalnız iki cookie görür:

| Cookie | Özellik | Amaç |
| --- | --- | --- |
| `kepenk_core_session` | HttpOnly, Secure (prod), SameSite=strict, host-only (Domain yok) | Opaque locator (32 byte base64url); değeri `sha256` ile `core_bff_sessions/{hash}` kaydına bağlanır |
| `kepenk_core_csrf` | okunabilir, SameSite=strict, host-only | Double-submit CSRF; oturumlu mutasyonlarda `x-kepenk-csrf` başlığı + Origin kontrolü zorunlu |

Supabase access/refresh token'ları yalnız `core_bff_sessions` kaydında, AES-256-GCM ile (anahtar `SESSION_SECRET`'tan HKDF) şifreli yaşar. Firestore bu kayıt için **önbellektir**; yetki her istekte doğrulanmış JWT + Postgres membership + KC-01 snapshot'tan türetilir.

### CoreRequestContext = { user_id, business_id, role, entitlements }

`resolveCoreRequestContext`: locator → kayıt → (gerekirse refresh) → JWT doğrula → `sub == kayıt sahibi` → aktif membership listesi → `business_id` (saklanan seçim yalnız aktif membership ile eşleşirse; tek membership varsa o) → `get_business_platform_snapshot` (kullanıcının kendi JWT'si) → **granted ve süresi dolmamış entitlement anahtarları** + abonelik özeti. Snapshot okunamazsa istek fail-closed (503); `BUSINESS_ACCESS_DENIED` → oturum düşürülür. Tek yetki primitive'i: `hasContextEntitlement(context, key)` / `requireCoreContext(..., { requireEntitlement })`. `/me` ayrı bir kaynaktan okumaz; aynı context'i döner.

### Origin kapısı

Oturumsuz giriş/kurtarma POST'ları (`otp-gonder`, `otp-dogrula`, `parola-giris`, `parola-kurtar`) `requireSameOrigin` ile cross-site ve Origin'siz isteklerde 403 döner; Supabase'e hiç ulaşılmaz. Oturumlu mutasyonlar ek olarak double-submit CSRF ister.

### Parola kurtarma tamamlama (tarayıcı token görmeden)

1. `POST /api/core/auth/parola-kurtar {email}` → GoTrue `recover` (adres varlığı sızdırılmaz).
2. Supabase recovery e-posta şablonu `{{ .TokenHash }}` ile **`/api/core/auth/kurtarma?token_hash=…`** adresine yönlendirir (implicit `#access_token` fragment'i kullanılmaz).
3. `GET kurtarma` → sunucu `verify {type: recovery, token_hash}` ile oturumu alır, `amr` recovery değilse reddeder, recovery-sınıfı BFF oturumu kurar, `/parola-yenile` sayfasına 303 yönlendirir.
4. `POST /api/core/auth/parola-guncelle {parola}` (CSRF; recovery oturumunun kullanabildiği **tek** yüzey) → `PUT /auth/v1/user` → BFF oturumu revoke + remote logout + cookie temizliği.
5. Kullanıcı `parola-giris` ile standart oturum açar.

Recovery oturumu `me` dışında hiçbir route'a giremez (`requireCoreContext` varsayılan olarak `RECOVERY_REQUIRED` 403).

### Kimlik adaptörü ve alias sözleşmesi

Oturum üretim noktasında `LinkIdentityAlias(provider=legacy-kepenk-phone, external_subject=<rakam-only telefon>, user_id)` komutu çalışır; idempotent anahtar `kc02-identity-<sha256(provider, subject, user_id)>`. Yetki vermez, girişi engellemez; conflict/outage yalnız raporlanır. **Legacy tenant dokümanına yazım yoktur**; esnaf → business gölge alanları KC-03'ün işidir (KC-03 sahibi `core_resolve_identity_aliases` ile Core'dan çözer).

Neden `firebase uid` değil: Kepenk işletme kullanıcılarının Firebase Auth hesabı yoktur; Pilot-0 kimlikleri Firestore `auth_identities` içinde `provider: phone`, `subject: normalize edilmiş telefon` olarak yaşar (KC-00 statik envanteri). Planın `LinkIdentityAlias(firebase, uid → user_id)` ifadesi Kepenk tarafı okunamadan yazılmıştır. KC-00 hosted receipt'i gerçek bir Firebase Auth popülasyonu gösterirse aynı komutla ikinci bir `firebase` alias'ı eklenir; bu kararı DANIŞMA 3 KC planı metninde sabitler.

### Modüller (`apps/web/src/lib/core/`)

`config.ts`, `coreClient.ts`, `supabaseAuth.ts` (+ `verifyRecoveryTokenHash`, `updatePassword`), `jwtVerifier.ts`, `bffSession.ts`, `requestContext.ts`, `identityAdapter.ts`, `deps.ts`, `routeHelpers.ts` (+ `requireSameOrigin`).

### Route'lar (`/api/core/auth/*`)

`otp-gonder`, `otp-dogrula`, `parola-giris`, `parola-kurtar`, `kurtarma`, `parola-guncelle`, `me`, `isletme-sec`, `cikis`. `CORE_BFF_ENABLED=true` olmadan 404, Supabase bağlantısı yoksa 503. Google/PKCE akışı KC-06 broker'a bırakıldı.

## Kanıt

- `coreClient`, `coreJwtVerifier` (imza/exp/iss/aud/kid rotasyonu/HS256), `coreBffSession` (şifreleme, revoke, CSRF+Origin negatifleri), `coreRequestContext` (entitlement türetme + fail-closed snapshot, membership pasifleştirme sonraki istekte etkili, refresh rotasyonu, recovery engeli, `requireEntitlement`), `coreIdentityAdapter` (idempotent anahtar, conflict/outage, legacy yazım yok), `coreAuthRoutes` (cross-site/Origin'siz POST 403 × 4 route, 404 gate, token sızmaz, cookie öznitelikleri, kurtarma → parola-guncelle → parola-giris zinciri, replay/CSRF).
- `trustBaseline.characterization.test.ts`: KC-02 kaynak düzeyi değişmezleri; `CURRENT_PRINCIPAL_SOURCES.coreBff`.
- CI: `Lint KC-02 ...` + `Typecheck KC-02 ...` (`test/tsconfig.kc-02-core-bff.json`). `zod` artık `@kepenk/web` bağımlılığı (P0-08'deki düzeltme bu branch'e cherry-pick edildi; CI'daki "Cannot find module 'zod'" nedeni).

## Açık / hosted-only

- Supabase URL/anon key, ServicePrincipal secret (`core.register_service_principal`), JWKS açık mı (değilse `SUPABASE_JWT_SECRET`), Supabase phone provider (Twilio), recovery e-posta şablonunun `token_hash` + `kurtarma` adresine ayarlanması.
- "Alias'lı kullanıcı aynı `user_id` ile Randevu'ya da girer" kabulü ve cookie host scope / cross-site / recovery / membership deactivation / multi-membership / logout-replay tarayıcı kabulü hosted/staging kanıtı ister.
- Build çıktısında secret grep receipt'i (`NEXT_PUBLIC_*` yok) release adımında alınır.
- `/parola-yenile` sayfası (UI) bu PR'da yok; API sözleşmesi hazır.
