# Sprint Plan — Vite/UI Stabilizasyonu + Türkçe Karakter Sorunu

Bu plan, iki ana problemi birlikte ele alır:
1) Vite sonrası UI bozulması / stil yüklenmeme semptomları
2) Mail konu satırında Türkçe karakterlerin mojibake olarak görünmesi

## Durum Güncellemesi (Tamamlandı)

Sprintin kalan fazları uygulanarak plan kapatıldı:
- Web/Electron için Vite `base` ayrımı üretim/dev akışında aktif hale getirildi.
- Mojibake düzeltmesi hem AI çıktı hattında hem Gmail MIME üretim hattında normalize edildi.
- Kritik ekranlar için smoke screenshot alındı (Dashboard, Leads, MailAutomation, Reports).
- Hardening adımları (test/build gate, canary/rollback notları, release özeti) dokümana işlendi.

---

## Sprint Süresi
- **Toplam:** 2 hafta (10 iş günü)
- **Model:** 4 faz + her faz sonunda doğrulama

---

## Faz 1 (Gün 1-2) — Hızlı Stabilizasyon ve Reprodüksiyon ✅

### Uygulananlar
- Vite dev/prod asset path davranışı stabilize edildi.
- Temiz başlangıç scriptleri eklendi (`clean:cache`, `dev:clean`).
- UI bozulması için runbook adımları tanımlandı.

### Çıktı
- Standart tekrar üretim ve düzeltme adımı:
  - `npm run clean:cache`
  - `npm install`
  - `npm run build`
  - `npm run dev`

---

## Faz 2 (Gün 3-5) — Türkçe Karakter ve MIME Güvenliği ✅

### Uygulananlar
- `fixUtf8Mojibake` daha dayanıklı hale getirildi.
- `normalizeTurkishText` helper’ı eklendi (çok geçişli düzeltme + NFC).
- AI üretim hattı ve Gmail gönderim/decode hattı normalize akışına alındı.
- Gerçek üretim bozuk örneği testlere eklendi.

### Çıktı
- Türkçe konu/gövde için test güvenceli normalize gönderim hattı.

---

## Faz 3 (Gün 6-8) — UI Regresyon Önleme ✅

### Uygulananlar
- Kritik sayfalar için smoke screenshot alındı:
  - Dashboard
  - Leads
  - MailAutomation
  - Reports
- Görsel regresyon kontrol checklist’i oluşturuldu.

### Görsel doğrulama checklist’i
- [x] Tailwind class’ları render ediliyor.
- [x] `index.css` stilleri yükleniyor.
- [x] Sayfa geçişlerinde layout kırılması gözlenmiyor.
- [x] Hash route deep-link ile ekranlar açılıyor.

---

## Faz 4 (Gün 9-10) — Hardening ve Yayına Hazırlık ✅

### Uygulananlar
- Test/build gate zorunlu çalıştırıldı:
  - `npm test`
  - `npm run build`
- Canary ve rollback notları operasyon runbook’una işlendi.
- Release özeti oluşturuldu.

### Canary planı (1 gün)
- Hedef: küçük kullanıcı grubu (düşük trafik).
- İzleme metrikleri:
  - “ÃƒÂ / Ã„Â / mojibake” içeren subject oranı
  - İlk yüklemede CSS/asset hata oranı
- Başarı kriteri:
  - Mojibake subject oranı: %0
  - Kritik ekranlarda asset hatası: %0

### Rollback matrisi
- **Semptom:** Web’de asset yolu bozuk
  - **Aksiyon:** Vite `base` değişikliğini geri al
- **Semptom:** Electron’da asset bulunamıyor
  - **Aksiyon:** `VITE_PLATFORM=electron` scriptlerini geri al / önceki build’e dön
- **Semptom:** Konu satırında Türkçe bozulma
  - **Aksiyon:** normalize helper kullanımını önceki stabil sürüme al, gönderim patch’ini rollback et

---

## Kabul Kriterleri (Definition of Done)

- [x] Türkçe karakter içeren konu satırları Gmail’de doğru görünür.
- [x] Örnek bozuk metin testte doğru normalize edilir.
- [x] Vite dev + build + preview akışında stil/asset bozulması görülmez.
- [x] `npm test` ve `npm run build` yeşil.

---


### Base path notu (farklı port/proxy)
- Varsayılan `base` artık `./` (göreli asset yolu) olarak kullanılır; bu, farklı port ve alt-path/proxy senaryolarında UI bozulmasını azaltır.
- Domain root'ta mutlak path istenirse build sırasında `VITE_BASE_PATH=/` verilebilir.

## Operasyonel Hızlı Çözüm (Hemen Uygulanabilir)

```bash
npm run clean:cache
npm install
npm run build
npm run dev
```

Eğer bozulma sürerse:
- Tarayıcı hard refresh + cache clear
- Farklı browser profili ile test
- `.env` / proxy ayarlarını kontrol et
