# KC-02 — Kepenk kimlik adaptörü ve BFF oturumu

**Görev / yüzey:** KC-02 (Kepenk repo) · **Validation budget:** STRICT (auth authority; R1)
**Bağlayıcı sözleşme:** Randevu `docs/plan/k04-platform-core-contract.md` + `docs/plan/kepenk-core-migration-plan.md` §KC-02
**Bağımlılık:** KC-01 RPC yüzeyi (Randevu [PR #111](https://github.com/ziyabeey1-ai/randevu/pull/111), draft)
**Durum:** kod + birim kanıtı hazır; hosted Supabase bağlantısı ve R1 incelemesi açık

## Ne yapıldı

Kepenk sunucusunda Supabase Auth'a karşı **BFF oturumu**. Tarayıcı yalnız iki cookie görür:

| Cookie | Özellik | Amaç |
| --- | --- | --- |
| `kepenk_core_session` | HttpOnly, Secure (prod), SameSite=strict, host-only (Domain yok) | Opaque locator (32 byte base64url); değeri `sha256` ile `core_bff_sessions/{hash}` kaydına bağlanır |
| `kepenk_core_csrf` | okunabilir, SameSite=strict, host-only | Double-submit CSRF; mutasyonlarda `x-kepenk-csrf` başlığı + Origin kontrolü zorunlu |

Supabase access/refresh token'ları yalnız `core_bff_sessions` kaydında, AES-256-GCM ile (anahtar `SESSION_SECRET`'tan HKDF) şifreli yaşar. Firestore bu kayıt için **önbellektir**; yetki her istekte doğrulanmış JWT + Postgres membership'ten türetilir.

### Modüller (`apps/web/src/lib/core/`)

- `config.ts` — `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `CORE_PRINCIPAL_NAME`; confidential değerler için CredentialRef'ler (`platform:core-principal` → `CORE_PRINCIPAL_SECRET`, `platform:supabase-jwt` → `SUPABASE_JWT_SECRET`), `NEXT_PUBLIC_*` asla. `CORE_BFF_ENABLED=true` olmadan yüzey 404.
- `coreClient.ts` — KC-01 RPC istemcisi: `core_apply_platform_command` / `core_read_change_feed` (anon key + principal secret, secret tembel çözülür), `has_entitlement` / `get_business_platform_snapshot` / `memberships` (kullanıcının kendi JWT'si). Hata zarfı → tipli `CorePlatformError` (KC-01 whitelist), `coreIdempotencyKey(prefix, ...parts)` deterministik anahtar.
- `supabaseAuth.ts` — GoTrue sunucu adaptörü: phone OTP gönder/doğrula, parola girişi, refresh, logout, recovery; `toTurkishE164`.
- `jwtVerifier.ts` — ES256/RS256 JWKS (önbellek + bilinmeyen `kid` için tek yeniden çekim) veya resolver'dan gelen HS256 secret; `exp/nbf/iss/aud` doğrulaması; `amr` recovery tespiti.
- `bffSession.ts` — oturum kaydı, şifreleme, cookie yazma/temizleme, CSRF doğrulama, revoke.
- `requestContext.ts` — `resolveCoreRequestContext`: locator → kayıt → (gerekirse refresh) → JWT doğrula → `sub == kayıt sahibi` → membership listesi → `business_id` seçimi (sadece aktif membership; saklanan seçim ipucudur). `requireCoreContext` route guard'ı: CSRF, recovery engeli, business zorunluluğu.
- `identityAdapter.ts` — oturum üretim noktasında Firebase/legacy → Supabase eşlemesi: `LinkIdentityAlias(legacy-kepenk-phone, <telefon> → user_id)` komutu + legacy `esnaflar/{id}` dokümanına `coreUserId` gölge alanı (KC-03 owner çözümü için). Yetki vermez; başarısızlık girişi engellemez; farklı bir Core kullanıcısına sessiz rebind yok.
- `deps.ts` — process-wide runtime (Firestore repo, client, auth, verifier); bağlantı yoksa `null` → 503.

### Route'lar (`/api/core/auth/*`)

`otp-gonder`, `otp-dogrula`, `parola-giris`, `parola-kurtar` (adres varlığını sızdırmaz), `me`, `isletme-sec`, `cikis`. Google/PKCE akışı KC-06 broker'a bırakıldı.

### Taşıma modu (KC-00 envanterine göre)

- OTP kullanıcıları → Supabase phone OTP; doğrulanmış telefonla alias bağlama.
- Parola kullanıcıları → Supabase recovery (`parola-kurtar`) sonra `parola-giris`.
- Yeni kullanıcı → doğrudan Supabase; Firebase'e kayıt yazılmaz.

## Kanıt

- `test/unit/coreClient.test.ts`, `coreJwtVerifier.test.ts`, `coreBffSession.test.ts`, `coreRequestContext.test.ts`, `coreIdentityAdapter.test.ts`, `coreAuthRoutes.test.ts` — yetkisiz/eskimiş oturum, cross-site Origin, CSRF, recovery oturumu negatifleri; JWT imza/exp/iss/aud/kid; membership pasifleştirmenin sonraki istekte etkisi; refresh rotasyonu; cookie'lerde Domain yok, token'lar yanıtta yok.
- `test/unit/trustBaseline.characterization.test.ts` — KC-02 kaynak düzeyi değişmezleri; `CURRENT_PRINCIPAL_SOURCES.coreBff`.
- CI: `Lint KC-02 ...` + `Typecheck KC-02 ...` (`test/tsconfig.kc-02-core-bff.json`).

## Açık / hosted-only

- Supabase projesi URL/anon key, ServicePrincipal secret (KC-01 `core.register_service_principal`), JWKS'in projede açık olup olmadığı (değilse `SUPABASE_JWT_SECRET` resolver üzerinden), Supabase phone provider (Twilio) — env/credential kurulumu.
- "Alias'lı kullanıcının aynı `user_id` ile Randevu'ya da girebildiği" kabulü hosted-only; staging kanıtı gerekir.
- Build çıktısında secret grep receipt'i (`NEXT_PUBLIC_*` yok) release adımında alınır.
