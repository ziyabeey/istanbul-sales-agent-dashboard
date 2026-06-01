# Kepenk AI Controlled Launch v0 Gate Checklist

## Durum

Kepenk AI su an kontrollu internal production launch adayidir, fakat tam production-ready kabul edilmemelidir.

Readiness skoru: **82 / 100**

Guclu taraflar:

- Production ortaminda eksik/default `SESSION_SECRET` hard-fail eder.
- Public site preview visibility gate vardir.
- MVP dashboard read API'leri owner/admin guard altindadir.
- `GET /api/randevu` ve `PATCH/DELETE /api/randevu/[id]` owner/admin guard altindadir.
- Site generation, publish, editor-save ve worker route'lari server-only feature flag arkasindadir.
- `/api/health` sadece public liveness doner.
- `/api/health/readiness` `x-admin-token` ile korunur.
- Real local preview path calisir: onboarding -> `siteData/localPreviewUrl` -> `/dashboard/sitem` -> `/site-preview/{esnafId}`.

Kalan ana riskler:

- `POST /api/randevu` public booking adayi olarak `KEPENK_PUBLIC_BOOKING_ENABLED` arkasindadir; production'da kapali kalmalidir.
- Gercek staging/production deploy uzerinde readiness ve browser smoke henuz kanitlanmalidir.
- Legacy/admin side-effect route yuzeyi buyuktur; tam platform quarantine sonraki adimdir.

## v0 Feature Matrix

Acik kalacaklar:

- Onboarding complete
- Session auth
- `/dashboard/sitem`
- `/site-preview/{esnafId}` local public preview
- Owned dashboard read API'leri
- Owned `GET /api/randevu`
- Owned `PATCH/DELETE /api/randevu/[id]`
- Public `/api/health`
- Protected `/api/health/readiness`

Default kapali kalacaklar:

- Cloudflare publish
- AI site generation/update
- Site provision / worker generation
- Editor save / editor publish
- Payment
- Twilio/WhatsApp send
- Public appointment booking
- Cron jobs
- Agents
- Admin side-effect actions
- Production demo mode

Risk notu:

- `POST /api/randevu`, booking gate, stricter rate-limit ve notification policy eklenmeden production-public acilmamalidir.

## Env Gate

Production icin zorunlu:

- `SESSION_SECRET`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Operasyonel readiness kontrolu icin zorunlu:

- `ADMIN_SECRET_TOKEN`

Onerilen:

- `NEXT_PUBLIC_APP_URL`

Production'da unset olmali veya tam olarak `"true"` olmamali:

- `KEPENK_DEMO_MODE`
- `NEXT_PUBLIC_DEMO_MODE`
- `DEMO_MODE`
- `KEPENK_SITE_GENERATION_ENABLED`
- `KEPENK_SITE_PUBLISH_ENABLED`
- `KEPENK_SITE_EDITOR_SAVE_ENABLED`
- `KEPENK_SITE_EDITOR_PUBLISH_ENABLED`
- `KEPENK_PUBLIC_BOOKING_ENABLED`

Feature flag acilirsa ek gereksinimler:

- Generation: Firebase env'leri, `CRON_SECRET`, `NEXT_PUBLIC_APP_URL`, `GEMINI_API_KEY` veya `GOOGLE_API_KEY`
- Publish: Firebase env'leri, `CF_ACCOUNT_ID`, `CF_PAGES_TOKEN`, `CF_API_TOKEN`, `CF_ZONE_ID`
- Editor save: Firebase env'leri
- Editor publish: Firebase env'leri, `NEXT_PUBLIC_APP_URL`

## Local Smoke

Real-preview mode ile baslat:

```bash
WATCHPACK_POLLING=true \
CHOKIDAR_USEPOLLING=true \
NEXT_PUBLIC_KEPENK_MVP_TEST_RELEASE=true \
KEPENK_DEMO_MODE=false \
pnpm run dev:smoke
```

Browser smoke oncesi:

```bash
pnpm test
pnpm lint
curl -i http://127.0.0.1:3000/api/health
curl -i -H "x-admin-token: $ADMIN_SECRET_TOKEN" http://127.0.0.1:3000/api/health/readiness
```

Beklenen:

- `/api/health` sadece liveness doner.
- `/api/health/readiness` sadece dogru token ile safe readiness doner.
- Secret value, raw provider error, collection name, `NODE_ENV`, version veya build metadata gorunmez.

## API Smoke

Disposable real business record ile calistir:

1. Cookie jar ile `POST /api/onboarding/complete`.
2. Response icinde `esnafId` ve `localPreviewUrl: /site-preview/{esnafId}` oldugunu dogrula.
3. `Set-Cookie: kepenk_session` geldigini dogrula.
4. Cookie ile `GET /api/auth/me`; ayni `esnafId` donmeli.
5. Cookie ile `GET /api/esnaf/{esnafId}`; real business fields donmeli.
6. `HEAD` veya `GET /site-preview/{esnafId}`; `200` donmeli.
7. Cookie ile `HEAD /dashboard/sitem`; `200` donmeli.
8. Cookie ile `GET /api/randevu?esnafId={esnafId}`; allowed olmali.
9. Missing-session veya wrong-session dashboard/randevu read istekleri `401/403` donmeli.
10. Write test edilecekse disposable appointment kullan; `PATCH/DELETE /api/randevu/[id]` owner/admin istemeli.

## Browser Smoke

Real path:

1. `/onboarding`
2. Disposable business ile onboarding'i tamamla.
3. Authenticated session olustugunu dogrula.
4. `/dashboard/sitem`
5. “Yerel Yayın Önizlemesini Aç” linkini dogrula.
6. `/site-preview/{esnafId}` ac.
7. Customer-facing site dashboard chrome olmadan render edilmeli.
8. Public preview sadece public-safe business fields gostermeli.
9. MVP test release modunda `/dashboard` nav non-v0 modulleri gostermemeli.

Demo sanity path ayridir:

- `/test-demo`
- `/test-demo/status`
- `/api/auth/demo-login?redirect=/dashboard`
- MVP demo dashboard pages

## Forbidden Calls

Controlled launch smoke sirasinda, bilincli disabled-response testi disinda su cagrilar gorunmemeli:

- `/api/site/uret`
- `/api/site/guncelle`
- `/api/site/provision`
- `/api/site/editor-kaydet`
- `/api/site/publish`
- `/api/site/v2/publish`
- `/api/workers/site-ureticisi`
- `POST /api/randevu`
- `/api/payment/**`
- `/api/whatsapp/**`
- `/api/cron/**`
- `/api/ajan/**`
- `/api/admin/**`
- Cloudflare calls
- Twilio/WhatsApp send
- Telegram send
- `wa.me`

Allowed:

- `/api/health`
- `/api/health/readiness` with admin token
- `/api/onboarding/complete`
- `/api/auth/me`
- `/api/esnaf/{ownedEsnafId}`
- owned dashboard read API'leri
- intentionally tested owned randevu read/update/delete

## Go / No-Go Gate

Go:

- Required production env'ler hazir.
- Demo env flag'leri production'da kapali.
- Site generation/publish/editor feature flag'leri kapali.
- `/api/health/readiness` dogru token ile safe `ok` sinyali veriyor.
- Onboarding real record olusturuyor.
- `/dashboard/sitem` local preview linkini gosteriyor.
- `/site-preview/{esnafId}` dashboard chrome olmadan render ediliyor.
- Forbidden call list temiz.

No-go:

- `SESSION_SECRET` veya Firebase Admin env eksik.
- Production'da demo mode acik.
- Cloudflare/publish/generation/editor flag'lerinden biri yanlislikla acik.
- Readiness public/token'siz erisilebilir.
- Public preview sensitive/internal field gosteriyor.
- Missing/wrong session ile baska esnaf datasina erisim mumkun.
- Forbidden route veya external provider call smoke sirasinda gorunuyor.

## Rollback Notes

- Kontrollu launch icin en guvenli rollback, yeni deploy'u geri almak ve site generation/publish/editor flag'lerini kapali tutmaktir.
- Local preview path Firestore'daki `siteData/localPreviewUrl/siteDurumu` alanlarina dayanir; bu alanlar destructive degildir.
- Cloudflare publish kapali oldugu surece domain/DNS yan etkisi beklenmez.
- `POST /api/randevu`, `KEPENK_PUBLIC_BOOKING_ENABLED` acilmadikca public booking traffic almamalidir.

## Final Smoke

Bu smoke'un amaci urun demosunu degil, production gate'in guvenli kapandigini kanitlamaktir.

Remaining production readiness skoru: **88 / 100**

Puanı halen dusurenler:

- Gercek staging/production ortaminda smoke calistirilmali.
- Legacy/admin side-effect route yuzeyi halen genistir.
- Public booking ileride acilacaksa ayri gate, rate-limit ve notification modeli gerekir.

### Final Smoke Env

Local controlled-launch smoke icin:

```bash
export ADMIN_SECRET_TOKEN="set-a-real-local-admin-token"
export SESSION_SECRET="set-a-real-local-session-secret"
export FIREBASE_PROJECT_ID="..."
export FIREBASE_CLIENT_EMAIL="..."
export FIREBASE_PRIVATE_KEY="..."

export NEXT_PUBLIC_APP_URL="http://127.0.0.1:3000"
export NEXT_PUBLIC_KEPENK_MVP_TEST_RELEASE=true

export KEPENK_DEMO_MODE=false
export NEXT_PUBLIC_DEMO_MODE=false
export DEMO_MODE=false

export KEPENK_PUBLIC_BOOKING_ENABLED=false
export KEPENK_SITE_GENERATION_ENABLED=false
export KEPENK_SITE_PUBLISH_ENABLED=false
export KEPENK_SITE_EDITOR_SAVE_ENABLED=false
export KEPENK_SITE_EDITOR_PUBLISH_ENABLED=false
```

Sunucuyu baslat:

```bash
WATCHPACK_POLLING=true \
CHOKIDAR_USEPOLLING=true \
NEXT_PUBLIC_KEPENK_MVP_TEST_RELEASE=true \
KEPENK_DEMO_MODE=false \
pnpm run dev:smoke
```

Production deploy'da ayrica `NODE_ENV=production` olmalidir; local `next dev` smoke'ta `NODE_ENV` zorlanmamalidir.

### Passing API Smoke Sequence

Disposable real business kullan:

```bash
COOKIE_JAR=/tmp/kepenk-controlled-launch.cookies

curl -i -c "$COOKIE_JAR" \
  -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:3000/api/onboarding/complete \
  --data '{
    "adim1": {
      "ad": "Mert",
      "soyad": "Kaya",
      "isletmeAdi": "Kadıköy Kontrollü Berber",
      "sektor": "berber",
      "sehir": "İstanbul",
      "ilce": "Kadıköy",
      "paket": "TEMEL"
    },
    "adim2": {
      "gmbLink": "",
      "instagramUsername": "kontrolluberber",
      "instagramUrl": "https://instagram.com/kontrolluberber",
      "facebookUrl": null
    },
    "adim3": {
      "paletId": "siyah-altin",
      "temaId": "modern-minimal"
    },
    "adim4": {
      "aktifWebModulleri": ["hizmetler", "iletisim", "yorumlar"]
    },
    "adim5": {
      "email": "mert@example.com",
      "telefon": "05321112233",
      "waNumarasi": "05321112233",
      "telefonDogrulandi": true
    },
    "smsRizasi": false
  }'
```

Beklenen:

- `200`
- response `esnafId` icerir.
- response `localPreviewUrl: /site-preview/{esnafId}` icerir.
- `Set-Cookie: kepenk_session` gelir.

Sonra:

```bash
curl -i http://127.0.0.1:3000/api/health

curl -i -H "x-admin-token: $ADMIN_SECRET_TOKEN" \
  http://127.0.0.1:3000/api/health/readiness

curl -i -b "$COOKIE_JAR" \
  http://127.0.0.1:3000/api/auth/me

curl -i -b "$COOKIE_JAR" \
  http://127.0.0.1:3000/api/esnaf/{esnafId}

curl -I http://127.0.0.1:3000/site-preview/{esnafId}

curl -I -b "$COOKIE_JAR" \
  http://127.0.0.1:3000/dashboard/sitem

curl -i -b "$COOKIE_JAR" \
  "http://127.0.0.1:3000/api/randevu?esnafId={esnafId}"
```

Beklenen:

- `/api/health`: `200`, sadece `{ ok, service, time }`
- `/api/health/readiness`: `200`, safe readiness object, secret value yok
- `/api/auth/me`: `200`, ayni `esnafId`
- `/api/esnaf/{esnafId}`: `200`, owned real data
- `/site-preview/{esnafId}`: `200`, dashboard chrome yok
- `/dashboard/sitem`: `200`
- owned `GET /api/randevu`: `200`

### Expected Disabled-Route Checks

Flag'ler kapaliyken, minimum valid auth/body ile disabled response donmeli.

Public booking:

```bash
curl -i -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:3000/api/randevu \
  --data '{}'
```

Beklenen:

- `503`
- `code: BOOKING_DISABLED`

Generation/provision:

```bash
curl -i -b "$COOKIE_JAR" -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:3000/api/site/uret \
  --data '{"esnafId":"{esnafId}"}'

curl -i -b "$COOKIE_JAR" -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:3000/api/site/guncelle \
  --data '{"esnafId":"{esnafId}"}'

curl -i -b "$COOKIE_JAR" -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:3000/api/site/provision \
  --data '{"esnafId":"{esnafId}"}'

curl -i -b "$COOKIE_JAR" \
  "http://127.0.0.1:3000/api/site/provision?esnafId={esnafId}"
```

Beklenen:

- `503`
- `code: SITE_FEATURE_DISABLED`

Publish/editor:

```bash
curl -i -b "$COOKIE_JAR" -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:3000/api/site/publish \
  --data '{}'

curl -i -b "$COOKIE_JAR" -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:3000/api/site/v2/publish \
  --data '{}'

curl -i -b "$COOKIE_JAR" -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:3000/api/site/editor-kaydet \
  --data '{"siteJson":{},"publish":false}'

curl -i -b "$COOKIE_JAR" -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:3000/api/site/editor-kaydet \
  --data '{"siteJson":{},"publish":true}'
```

Beklenen:

- `503`
- `code: SITE_FEATURE_DISABLED`

Worker route once secret kontrol eder, sonra feature flag kontrol eder:

```bash
curl -i -H "Content-Type: application/json" \
  -H "x-cloud-task-secret: $CRON_SECRET" \
  -X POST http://127.0.0.1:3000/api/workers/site-ureticisi \
  --data '{"esnafId":"{esnafId}"}'
```

Beklenen:

- `CRON_SECRET` set ve header dogruysa `503` + `SITE_FEATURE_DISABLED`
- `CRON_SECRET` yoksa `500`
- token yanlissa `401`

### Expected Auth / Ownership Checks

Readiness token yok:

```bash
curl -i http://127.0.0.1:3000/api/health/readiness
```

Beklenen:

- `401`
- `code: UNAUTHORIZED`

Readiness token yanlis:

```bash
curl -i -H "x-admin-token: wrong" \
  http://127.0.0.1:3000/api/health/readiness
```

Beklenen:

- `401`
- `code: UNAUTHORIZED`

No-session owned reads:

```bash
curl -i "http://127.0.0.1:3000/api/randevu?esnafId={esnafId}"
curl -i "http://127.0.0.1:3000/api/dashboard/konusmalar?esnafId={esnafId}"
curl -i "http://127.0.0.1:3000/api/dashboard/musteriler?esnafId={esnafId}"
```

Beklenen:

- `401`

Wrong owner session:

- Ikinci disposable business/session olustur.
- Ilk business API'lerini ikinci business cookie'si ile cagir.
- Beklenen: `403`

Appointment write guard:

- Sadece disposable appointment kullan.
- `PATCH/DELETE /api/randevu/{appointmentId}` owner session olmadan `401` donmeli.
- Wrong owner `403` donmeli.
- Owner/admin allowed olmali.
- `PATCH` customer notification side-effect tetikleyebilir; sadece disposable veriyle test edilmelidir.

### Browser Smoke Sequence

Real controlled launch path:

1. `/onboarding`
2. Disposable business ile onboarding'i tamamla.
3. Authenticated session olustugunu dogrula.
4. `/dashboard/sitem`
5. “Yerel Yayın Önizlemesini Aç” gorunmeli.
6. `/site-preview/{esnafId}` ac.
7. Public site dashboard sidebar/nav olmadan render edilmeli.
8. Public site sadece business-safe public fields gostermeli.
9. MVP test release modunda `/dashboard` nav non-v0 modulleri gostermemeli.
10. `/api/health/readiness` browser'da tokensiz acilmamali.

Demo sanity ayridir ve production posture sonucu ile karistirilmamalidir:

- `/test-demo`
- `/test-demo/status`
- `/api/auth/demo-login?redirect=/dashboard`
- MVP demo pages

### Final Smoke Forbidden Watchlist

DevTools Network ve server log'larda asagidakiler istemsiz gorunurse smoke durdur:

- `POST /api/randevu`
- `/api/site/uret`
- `/api/site/guncelle`
- `/api/site/provision`
- `/api/site/editor-kaydet`
- `/api/site/publish`
- `/api/site/v2/publish`
- `/api/workers/site-ureticisi`
- `/api/payment/**`
- `/api/whatsapp/**`
- `/api/cron/**`
- `/api/ajan/**`
- `/api/admin/**`
- Cloudflare requests
- Twilio/WhatsApp send
- Telegram send
- `wa.me`

Istisna: disabled-route checks bu route'lari bilerek cagirabilir; fakat side-effect oncesi `503` donmelidir.

### Final Smoke Go / No-Go

Go:

- Tum testler gecer.
- Public health boring liveness doner.
- Readiness dogru `x-admin-token` ister.
- Readiness response secret value veya raw provider error icermez.
- Required env'ler hazirdir.
- Demo env flag'leri kapalidir.
- Publish/generation/editor/booking flag'leri kapalidir.
- Onboarding real `siteData/localPreviewUrl/siteDurumu` olusturur.
- `/dashboard/sitem` local preview acabilir.
- `/site-preview/{esnafId}` public-safe site render eder.
- Missing/wrong session baska esnaf datasini okuyamaz.
- Forbidden watchlist temiz kalir.

No-go:

- Health/readiness secret value sizdirir.
- Readiness tokensiz calisir.
- Production demo mode aciktir.
- Site generation/publish/editor flag'lerinden biri yanlislikla aciktir.
- Booking flag kapaliyken `POST /api/randevu` `503` donmez.
- Missing/wrong owner baska esnaf datasina erisebilir.
- Public preview private/internal/payment/token field sizdirir.
- Cloudflare, Twilio, Telegram, payment, cron, agent veya admin side-effect istemsiz calisir.

## First Follow-Up

Bir sonraki production hardening adimi:

- Public booking'i acmadan once booking gate + stricter rate limit + notification flag modelini tasarla.
