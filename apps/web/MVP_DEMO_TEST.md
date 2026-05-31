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
10. `/test-demo/status` tekrar

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
