# Kepenk AI MVP Demo Test Rehberi

## Amaç

Bu rehber, Kepenk AI MVP demo akışını yerel ve oynanabilir şekilde doğrulamak için kullanılır. Amaç; gerçek Firebase, OTP, Twilio, ödeme, Cloudflare, cron job, ajan orkestrasyonu, publish veya editor-save akışlarına bağlı kalmadan demo verisinin ve temel dashboard sayfalarının çalıştığını hızlıca kontrol etmektir.

Bu rehber sadece demo MVP akışı içindir. Production readiness, güvenlik denetimi ve gerçek entegrasyon testleri ayrı değerlendirilmelidir.

MVP test release modunda non-MVP modüller bilinçli olarak gizlenir.

MVP test release modunda non-MVP dashboard URL'leri `/dashboard`'a yönlendirilir.

Demo/MVP test modunda WhatsApp dış linkleri ve konuşma SSE stream bağlantısı kapalıdır.

## Demo Başlatma

Yerel geliştirme sunucusunu başlatın:

```bash
pnpm dev
```

## Önerilen Lokal Smoke Komutu

Monorepo içinde `EMFILE`/watch hatası görülürse polling değişkenleriyle `dev:smoke` kullanılmalıdır:

```bash
WATCHPACK_POLLING=true \
CHOKIDAR_USEPOLLING=true \
NEXT_PUBLIC_KEPENK_MVP_TEST_RELEASE=true \
KEPENK_DEMO_MODE=true \
pnpm run dev:smoke
```

### Hızlı Sağlık Kontrolü

```bash
curl -I http://127.0.0.1:3000/test-demo
curl -i http://127.0.0.1:3000/api/auth/me
curl -I http://127.0.0.1:3000/dashboard
```

`401` `/api/auth/me` için giriş öncesi normaldir; `404` olmamalıdır.

Cookie'li tam rota turu `200` dönmelidir; görsel UI kontrolü ayrıca tarayıcıda manuel yapılmalıdır.

Ardından tarayıcıda şu sayfaları açın:

- `/test-demo`
- `/test-demo/status`

Demo oturumu yoksa şu adres ile giriş yapın:

```text
/api/auth/demo-login?redirect=/test-demo/status
```

## Manuel Smoke Test Sırası

1. `/test-demo`
2. `/test-demo/status`
3. `/api/auth/me`
4. `/api/esnaf/demo-berber-01`
5. `/dashboard`
6. `/dashboard/konusmalar`
7. `/dashboard/musteriler`
8. `/dashboard/randevular`
9. `/dashboard/sitem`
10. `/site-preview/demo-berber-01`
11. `/test-demo/status` tekrar

## Beklenen Sonuçlar Tablosu

| Rota / Sayfa | Beklenen sonuç |
| --- | --- |
| `/test-demo` | Demo laboratuvarı açılır. `demo-berber-01` işletmesi görünür. Seed sayıları: services 4, customers 3, conversations 2, appointments 2. |
| `/test-demo/status` | Read-only durum paneli açılır. Demo oturumu yoksa demo giriş CTA'sı görünür. Demo oturumu varsa güvenli GET kontrolleri sonuç verir. |
| `/api/auth/demo-login?redirect=/dashboard` | Demo oturumu oluşturulur ve `/dashboard` sayfasına yönlenir. OTP, Twilio veya Firebase çağrısı yapılmaz. |
| `/api/auth/me` | Demo oturumunda `isDemo: true`, `esnafId: demo-berber-01` ve demo kullanıcı kimliği döner. |
| `/api/esnaf/demo-berber-01` | Demo berber işletme JSON'u döner. Firestore gerekmez. |
| `/api/dashboard/konusmalar?esnafId=demo-berber-01` | 2 demo konuşma döner. |
| `/api/dashboard/konusmalar/mesajlar?esnafId=demo-berber-01` | Geçerli `musteriNumara` ile ilk demo konuşmanın mesajları döner. Numara verilmezse rota hata dönebilir; status paneli numarayı seed veriden kullanır. |
| `/api/dashboard/musteriler?esnafId=demo-berber-01` | 3 demo müşteri döner. |
| `/api/randevu?esnafId=demo-berber-01` | `{ randevular: [...] }` içinde 2 demo randevu döner. |
| `/dashboard` | Demo işletmenin özet istatistikleri görünür. |
| `/dashboard/konusmalar` | Demo konuşmalar listelenir; konuşma seçilince mesajlar görünür. |
| `/dashboard/musteriler` | 3 demo müşteri, etiketler ve randevu bilgileri görünür. |
| `/dashboard/randevular` | Demo randevular görünür. Demo uyarısı görünür. No-show ve bakiye tahsil gibi gerçek aksiyonlar kapalıdır. |
| `/dashboard/sitem` | Yerel read-only site önizlemesi görünür. Demo modda dış `subdomainUrl` iframe'i kullanılmaz. Publish, editor-save ve Cloudflare akışları tetiklenmez. |
| `/site-preview/demo-berber-01` | Dashboard chrome olmadan müşteri gözüyle yayınlanmış demo berber sitesi açılır. Cloudflare, Firestore write, publish veya editor-save çağrısı yapılmaz. |

## Demo Modda Bilerek Kapalı Olanlar

- Real OTP
- Firebase/Firestore dependency for demo reads
- Twilio/WhatsApp send
- Payment/iyzico
- Cloudflare/site publish/generation
- Cron jobs
- Agent orchestration
- Editor autosave/publish
- Domain management
- AI site regeneration
- Appointment no-show and balance collection actions

## Demo Smoke Sırasında Asla Çağrılmaması Gerekenler

- `POST /api/randevu`
- `/api/site/guncelle`
- `/api/site/uret`
- `/api/site/editor-kaydet`
- `/api/site/publish`
- Admin APIs
- Twilio, Cloudflare, payment, cron, agent, kill-switch routes

## Gerçek Lokal Site Preview Smoke

Bu bölüm, demo seed yerine gerçek Firestore `esnaflar/{id}` kaydıyla çalışan ilk lokal site preview akışını doğrular.

Sunucuyu gerçek preview smoke için demo modu kapalı başlatın:

```bash
WATCHPACK_POLLING=true \
CHOKIDAR_USEPOLLING=true \
NEXT_PUBLIC_KEPENK_MVP_TEST_RELEASE=true \
KEPENK_DEMO_MODE=false \
pnpm run dev:smoke
```

Direct onboarding isteği:

```bash
curl -i -c /tmp/kepenk-real.cookies \
  -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:3000/api/onboarding/complete \
  --data '{
    "adim1": {
      "ad": "Mert",
      "soyad": "Kaya",
      "isletmeAdi": "Kadıköy Gerçek Berber",
      "sektor": "berber",
      "sehir": "İstanbul",
      "ilce": "Kadıköy",
      "paket": "TEMEL"
    },
    "adim2": {
      "gmbLink": "",
      "instagramUsername": "kadikoygercekberber",
      "instagramUrl": "https://instagram.com/kadikoygercekberber",
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

Beklenen onboarding cevabı:

- HTTP `200`
- `esnafId`
- `localPreviewUrl: /site-preview/{esnafId}`
- `Set-Cookie: kepenk_session`

Cookie/session kontrolleri:

```bash
curl -i -b /tmp/kepenk-real.cookies \
  http://127.0.0.1:3000/api/auth/me

curl -s -b /tmp/kepenk-real.cookies \
  http://127.0.0.1:3000/api/esnaf/{esnafId}
```

Beklenen Firestore/public alanları:

- `siteData`
- `siteData.isletmeAdi`
- `siteData.heroBaslik`
- `siteData.generatedBy: local-deterministic`
- `localPreviewUrl`
- `siteDurumu: local-preview-ready`
- `subdomainUrl` Cloudflare yayını yapılmadıysa boş kalır.

Public preview kontrolü:

```bash
curl -I http://127.0.0.1:3000/site-preview/{esnafId}
```

Beklenen:

- `/site-preview/{esnafId}` HTTP `200` döner.
- HTML işletme adını içerir.
- Dashboard chrome görünmez.

Dashboard kontrolü:

```bash
curl -I -b /tmp/kepenk-real.cookies \
  http://127.0.0.1:3000/dashboard/sitem
```

Beklenen:

- `/dashboard/sitem` HTTP `200` döner.
- Tarayıcıda “Yerel Yayın Önizlemesini Aç” butonu görünür.
- Link `/site-preview/{esnafId}` hedefine gider.

Gerçek lokal site preview smoke sırasında çağrılmaması gerekenler:

- `/api/site/uret`
- `/api/site/guncelle`
- `/api/site/editor-kaydet`
- `/api/site/publish`
- `/api/site/provision`
- `/api/workers/site-ureticisi`
- `/api/payment/**`
- `/api/whatsapp/**`
- `/api/cron/**`
- `/api/ajan/**`
- `/api/admin/**`
- Cloudflare
- Twilio/WhatsApp send
- Telegram
- `wa.me`

Son görsel kontrol manuel yapılmalıdır:

- `/dashboard/sitem`
- `/site-preview/{esnafId}`

## Tarayıcıda Kontrol Edilecekler

- Console error var mı?
- Sayfalarda infinite loading var mı?
- Yanlış veya boş veri görünüyor mu?
- Network panelinde yasaklı route veya entegrasyon çağrısı var mı?
- Mobil genişlikte layout taşması, üst üste binme veya okunmayan metin var mı?

## Test Komutları

Tüm mevcut Vitest testleri:

```bash
pnpm test
```

Değişen dosyalara hedefli ESLint örneği:

```bash
pnpm exec eslint src/app/test-demo/page.tsx src/app/test-demo/status/page.tsx
```

## Notlar

- Bu rehber yalnızca demo MVP akışını doğrulamak içindir.
- Production readiness ve güvenlik denetimi ayrı yapılmalıdır.
- Görsel kontroller, tarayıcı network kontrolleri ve mobil davranış kontrolleri şimdilik manuel kalmalıdır.
