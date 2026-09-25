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

**Oturum sınıfı (R1 pre-review, 2026-09-17):** `classifySession(claims)` → `standard | recovery | unverified`. `amr` eksik, boş veya bilinmeyen/kullanılamaz (`anonymous`, boş method) ise oturum **unverified** sayılır ve membership/entitlement okunmadan `SESSION_CLASS_UNVERIFIED` 401 ile kapanır (Core'daki `AUTH_SESSION_CLASS_UNVERIFIED` ile aynı fail-closed davranış); giriş route'ları (`otp-dogrula`, `parola-giris`) böyle bir JWT için BFF oturumu üretmez (`AUTH_SESSION_CLASS_UNVERIFIED` 401). `recovery` yalnız recovery-only yüzeylere girer; yalnız bilinen etkileşimli bir yöntem (`password`, `otp`, `oauth`, `sso/saml`, `magiclink`, `totp`, `mfa/*`, `webauthn`, `invite`) `standard` üretir. Boolean `recovery` alanı sınıftan türetilir.

`resolveCoreRequestContext`: locator → kayıt → (gerekirse refresh) → JWT doğrula → `sub == kayıt sahibi` → aktif membership listesi → `business_id` (saklanan seçim yalnız aktif membership ile eşleşirse; tek membership varsa o) → `get_business_platform_snapshot` (kullanıcının kendi JWT'si) → **granted ve süresi dolmamış entitlement anahtarları** + abonelik özeti. Snapshot okunamazsa istek fail-closed (503); `BUSINESS_ACCESS_DENIED` → oturum düşürülür. Tek yetki primitive'i: `hasContextEntitlement(context, key)` / `requireCoreContext(..., { requireEntitlement })`. `/me` ayrı bir kaynaktan okumaz; aynı context'i döner.

### Origin kapısı

Oturumsuz giriş/kurtarma POST'ları (`otp-gonder`, `otp-dogrula`, `parola-giris`, `parola-kurtar`) `requireSameOrigin` ile cross-site ve Origin'siz isteklerde 403 döner; Supabase'e hiç ulaşılmaz. Oturumlu mutasyonlar ek olarak double-submit CSRF ister.

### Parola kurtarma tamamlama (tarayıcı token görmeden, tarayıcıya bağlı)

Randevu F10-01 `yzt_auth_flows` sözleşmesinin Kepenk karşılığı (`src/lib/core/authFlow.ts`):

1. `POST /api/core/auth/parola-kurtar {email}` → `beginAuthFlow('recovery', sha256(email))`: `state` (24 byte) + e-posta bağlama hash'i + 10 dk TTL, HMAC(SESSION_SECRET) imzalı **`kepenk_core_flows`** cookie'sine yazılır (HttpOnly, host-only, SameSite=Lax, Path=`/api/core/auth`, en fazla 4 akış). GoTrue `recover?redirect_to=https://app.kepenk.ai/api/core/auth/kurtarma?state=<state>` (adres varlığı sızdırılmaz; bilinmeyen adreste akış bırakılmaz).
2. Supabase recovery e-posta şablonu `{{ .RedirectTo }}&token_hash={{ .TokenHash }}` üretir (implicit `#access_token` fragment'i kullanılmaz; `redirect_to` allow-list'te olmalı).
3. `GET kurtarma?state=…&token_hash=…` → akış cookie'sinde `state` **bulunmalı** (aynı tarayıcı), akış hemen tüketilir (tekrar → geçersiz), sunucu `verify {type: recovery, token_hash}` ile oturumu alır, `amr` recovery değilse veya oturumun e-postası akışın hash'iyle eşleşmiyorsa (hesap karışıklığı) reddeder, recovery-sınıfı BFF oturumu kurar, `/parola-yenile` sayfasına 303 yönlendirir. Farklı tarayıcıdaki link → cookie yok → geçersiz, oturum yok.
4. `POST /api/core/auth/parola-guncelle {parola}` (CSRF) **yalnız recovery oturumu**: standart oturum `RECOVERY_SESSION_REQUIRED` 403. `PUT /auth/v1/user` → BFF oturumu revoke + remote logout + cookie temizliği.
5. Kullanıcı `parola-giris` ile standart oturum açar.

Recovery oturumu `me` ve `parola-guncelle` dışında hiçbir route'a giremez (`requireCoreContext` varsayılan olarak `RECOVERY_REQUIRED` 403).

### Kimlik adaptörü ve alias sözleşmesi

Oturum üretim noktasında `LinkIdentityAlias(provider=legacy-kepenk-phone, external_subject=<rakam-only telefon>, user_id)` komutu çalışır; idempotent anahtar `kc02-identity-<sha256(provider, subject, user_id)>`. Yetki vermez, girişi engellemez; conflict/outage yalnız raporlanır. **Legacy tenant dokümanına yazım yoktur**; esnaf → business gölge alanları KC-03'ün işidir (KC-03 sahibi `core_resolve_identity_aliases` ile Core'dan çözer).

**Hosted gerçek (Issue #10 receipt, 2026-09-16T20:02:47Z, DANIŞMA 3 kabul):** `esnaflar` 7 (telefonTemiz 5, businessId 0), Firebase Auth 1 password kullanıcısı, `sites` claim 0, `auth_sessions` 0. **Migration modu: additive / adapter-first.** Telefon alias'ı geçici uyumluluk alias'ıdır, canonical taşıma kimliği değildir. Firebase popülasyonu sıfır olmadığı için `firebase:<uid> → user_id` alias'ı yalnız **güvenli eşleşme** ile yazılır: `POST /api/core/auth/firebase-bagla {idToken}` — standart (recovery olmayan) Core oturumu + CSRF + aynı origin **ve** firebase-admin `verifyIdToken(idToken, checkRevoked=true)` ile sunucu tarafında doğrulanmış, gerçek sign-in provider'lı (`anonymous`/`custom` reddedilir) ve taze (`auth_time` ≤ 600 s) bir Firebase ID token'ı aynı istekte. E-posta/telefon/doküman üzerinden UID tahmini yoktur; ID token süreci terk etmez, Core'a yalnız uid gider. Idempotent anahtar aynı `kc02-identity-<sha256(provider, subject, user_id)>` ailesi; conflict 409, Core kesintisi 503. Tarayıcının ID token'ı Firebase client SDK girişiyle alması UI/hosted kabul kapsamıdır (W7).

### Modüller (`apps/web/src/lib/core/`)

`config.ts`, `coreClient.ts`, `supabaseAuth.ts` (+ `verifyRecoveryTokenHash`, `updatePassword`, `recover?redirect_to`), `jwtVerifier.ts`, `bffSession.ts`, `authFlow.ts` (tarayıcıya bağlı tek kullanımlık akışlar), `requestContext.ts`, `identityAdapter.ts`, `deps.ts`, `routeHelpers.ts` (+ `requireSameOrigin`).

### Route'lar (`/api/core/auth/*`)

`otp-gonder`, `otp-dogrula`, `parola-giris`, `parola-kurtar`, `kurtarma`, `parola-guncelle`, `firebase-bagla`, `me`, `isletme-sec`, `cikis`. `CORE_BFF_ENABLED=true` olmadan 404, Supabase bağlantısı yoksa 503. Google/PKCE akışı KC-06 broker'a bırakıldı.

## Kanıt

- `coreClient`, `coreJwtVerifier` (imza/exp/iss/aud/kid rotasyonu/HS256), `coreBffSession` (şifreleme, revoke, CSRF+Origin negatifleri), `coreRequestContext` (entitlement türetme + fail-closed snapshot, membership pasifleştirme sonraki istekte etkili, refresh rotasyonu, recovery engeli, `requireEntitlement`), `coreIdentityAdapter` (idempotent anahtar, conflict/outage, legacy yazım yok; `firebase` alias komutu ve bağlanabilirlik matrisi: anonymous/custom/eksik provider, eski veya gelecekteki `auth_time`, bozuk uid), `coreAuthRoutes › firebase-bagla` (oturumsuz/CSRF'siz/cross-site 403, geçersiz-iptal edilmiş token 401, unlinkable 403, conflict 409, kesinti 503, recovery oturumu 403, replay aynı idempotent anahtar, token komuta sızmaz), `coreAuthFlow` (imza/tamper/expiry/limit), `coreAuthRoutes` (cross-site/Origin'siz POST 403 × 4 route, 404 gate, token sızmaz, cookie öznitelikleri, parola-kurtar → kurtarma → parola-guncelle → parola-giris zinciri: farklı tarayıcı/yanlış state/replay/hesap uyuşmazlığı/non-recovery/expired negatifleri, standart oturumla parola-guncelle 403, replay/CSRF).
- `trustBaseline.characterization.test.ts`: KC-02 kaynak düzeyi değişmezleri; `CURRENT_PRINCIPAL_SOURCES.coreBff`.
- CI: `Lint KC-02 ...` + `Typecheck KC-02 ...` (`test/tsconfig.kc-02-core-bff.json`). `zod` artık `@kepenk/web` bağımlılığı (P0-08'deki düzeltme bu branch'e cherry-pick edildi; CI'daki "Cannot find module 'zod'" nedeni).

## Açık / hosted-only

- Supabase URL/anon key, ServicePrincipal secret (`core.register_service_principal`), JWKS açık mı (değilse `SUPABASE_JWT_SECRET`), Supabase phone provider (Twilio), recovery e-posta şablonunun `{{ .RedirectTo }}&token_hash={{ .TokenHash }}` üretmesi ve `https://app.kepenk.ai/api/core/auth/kurtarma*` redirect allow-list'i.
- "Alias'lı kullanıcı aynı `user_id` ile Randevu'ya da girer" kabulü ve cookie host scope / cross-site / recovery / membership deactivation / multi-membership / logout-replay tarayıcı kabulü hosted/staging kanıtı ister.
- Build çıktısında secret grep receipt'i (`NEXT_PUBLIC_*` yok) release adımında alınır.
- `/parola-yenile` sayfası (UI) bu PR'da yok; API sözleşmesi hazır.
