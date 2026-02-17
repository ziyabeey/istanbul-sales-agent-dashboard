# Istanbul Sales Agent Dashboard – Genel Test Planı

Bu plan, uygulamadaki bozuklukları ve eksikleri tespit etmek için kullanılacak test kategorileri, senaryolar ve kontrol listesini içerir. Her bölümde "Ne test edilir" ve "Bozukluk/eksik işareti" kısaca belirtilmiştir.

---

## 1. Mevcut otomatik testler (temel)

- **Vitest** ile çalışan unit testler: `vitest.config.ts` altında `context/**`, `services/**`, `utils/**` içindeki `*.test.{ts,tsx}` dosyaları kapsanır.
- Kapsanan alanlar: `agentUtils` (fixUtf8Mojibake, hata mesajları, bounce/daemon), `agentQueue`, `agentLoopSlots`, `circuitBreaker`, `storage`, `rewardEngine`, `qTable`, `gmailService` (validation, bounce subject), `agentFilters`.
- **Yapılacak:** Proje kökünde `npm run test` çalıştırıp tüm testlerin geçtiğini doğrulayın. Kırmızı test = regresyon veya ortam/veri uyumsuzluğu.

---

## 2. E-posta ve Türkçe karakter (regresyon)

Son değişiklik: `services/gmailService.ts` – HTML gövde base64, ek dosya adları RFC 2047.

| #   | Test                         | Nasıl                                                                                                                                           | Bozukluk işareti                                      |
| --- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| 2.1 | Konu Türkçe karakter         | Gmail üzerinden veya uygulama içi "Yeni Mail" ile konuya ğ, ü, ş, ı, ö, ç, İ yazıp gönder; Gmail "Gönderilen"de aç.                             | Konu çöp karakter (Ã§, Ã¼ vb.) veya boş/görünmüyor.   |
| 2.2 | Gövde Türkçe karakter        | Aynı mailde gövdeye Türkçe cümle yaz (imza dahil); alıcıda veya "Gönderilen"de HTML görüntüle.                                                  | Gövdede mojibake veya karakterler yanlış.             |
| 2.3 | AI ile üretilen mail         | Lead sayfası veya Mail Otomasyonu'nda AI ile mail üret, konu+gövde Türkçe; gönder veya taslak kaydet, sonra gönderilen/gelen kutuda kontrol et. | AI çıktısında veya gönderilmiş mailde bozuk karakter. |
| 2.4 | Ekli mail (Türkçe dosya adı) | Ek dosya adında Türkçe karakter içeren bir ek ile mail gönder; alıcıda ek adını kontrol et.                                                     | Ek adı bozuk veya ek açılmıyor.                       |

**Not:** Gmail API gerçek ortamda çalıştığı için bu senaryolar manuel veya (ileride) gerçek API kullanan entegrasyon testi ile yapılmalı.

---

## 3. Tema (dark mode) ve görsel

Son değişiklik: Birçok sayfa ve bileşende `dark:` Tailwind sınıfları eklendi.

| #   | Test                 | Nasıl                                                                                                                                  | Bozukluk işareti                                               |
| --- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 3.1 | Tema geçişi          | Layout'taki güneş/ay ile light/dark geçir; tüm sayfalarda dolaş.                                                                       | Arka plan siyah ama yazılar hâlâ koyu (okunmuyor); veya tersi. |
| 3.2 | Sayfa bazlı dark     | Dark modda: Dashboard, Lead Yönetimi, Mail Otomasyonu, Raporlar, Ayarlar, Görevler, Takvim, Eğitim, Rehber, Login, Onboarding.         | Belirli bir sayfada koyu üzerine koyu metin, kontrast düşük.   |
| 3.3 | Modallar ve paneller | Dark modda: Compose modal, Lead detay paneli, Onay bekleyen taslaklar, Otopilot config popover, Command Palette (Ctrl+K), Diagnostics. | Modal/panel içi metin veya arka plan yanlış.                   |
| 3.4 | Form ve input        | Dark modda input, textarea, select, butonlar (özellikle Mail taslak konu/İçerik, Ayarlar formları).                                    | Placeholder veya yazılan metin görünmüyor; border kaybolmuş.   |

---

## 4. Kimlik doğrulama ve yönlendirme

| #   | Test                         | Nasıl                                                                                            | Bozukluk işareti                                        |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| 4.1 | Login olmadan korumalı sayfa | Oturum kapalıyken `/`, `/leads`, `/mail` vb. doğrudan aç (HashRouter: `#/leads`).                | Koruma yok, içerik görünüyor.                           |
| 4.2 | Login sonrası yönlendirme    | Login ol; `from` state ile önce gidilmek istenen sayfaya yönlendirildiğini kontrol et.           | Hep `/` veya hep aynı sayfaya gidiyor.                  |
| 4.3 | Onboarding zorunluluğu       | Login ol, profilde `isSetupComplete: false` yap (veya yeni kullanıcı); korumalı bir sayfaya git. | Onboarding'e yönlendirme yok.                           |
| 4.4 | Çıkış                        | Çıkış yap; tekrar korumalı URL'e gidildiğinde login sayfasına düş.                               | Çıkış sonrası hâlâ içerik görünüyor veya state karışık. |

---

## 5. Sayfa bazlı işlevsellik

Her sayfa için: sayfa açılıyor mu, kritik aksiyonlar çalışıyor mu, hata mesajları anlamlı mı?

| Sayfa                 | Kontrol listesi                                                                                         | Bozukluk/eksik işareti                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Dashboard**         | Widget seçimi, son ileti listesi, grafikler yükleniyor mu.                                              | Boş ekran, konsol hatası, veri yok.                         |
| **Lead Yönetimi**     | Tablo/kanban/saha görünümü, filtre, arama, lead seçimi, detay paneli, teklif/keşfet/analiz modalları.   | Liste gelmiyor, filtre bozuk, panel açılmıyor, modal crash. |
| **Mail Otomasyonu**   | Gelen/Gönderilen/Onay/Aktivite sekmeleri, arama, mesaj seçimi, taslak onay/gönder, yeni mail (compose). | Sekmeler boş, gönderim hatası, taslak kayboluyor.           |
| **Takvim**            | Takvim görünümü, entegrasyon (varsa) bilgisi.                                                           | Sayfa açılmıyor, konsol hatası.                             |
| **Görevler**          | Görev listesi, ekleme, tamamlama, tarih/öncelik.                                                        | CRUD hata veriyor veya UI güncellenmiyor.                   |
| **Eğitim / Training** | İçerik yükleniyor mu, simülasyon/akış (varsa) çalışıyor mu.                                             | Boş sayfa veya akış yarıda kalıyor.                         |
| **Raporlar**          | Dönem seçimi, istatistik kartları, grafikler (huni vb.).                                                | Veri 0 veya hep aynı, grafik render hatası.                |
| **Ayarlar**           | Genel/Bulut/Persona/Fiyatlandırma sekmeleri, API key, Firebase, paket CRUD.                             | Kaydetme çalışmıyor, form validasyonu yok.                  |
| **Rehber**            | İçerik görünüyor mu.                                                                                    | Boş veya linkler kırık.                                     |
| **Login**             | E-posta/şifre (veya kullanılan yöntem), hata mesajı.                                                    | Giriş olmuyor, hata mesajı yanlış.                          |
| **Onboarding**        | Adımlar tamamlanabiliyor mu, tamamlanınca `isSetupComplete` ve yönlendirme.                             | Adım atlanıyor veya bitmiyor.                               |

---

## 6. Otopilot (Agent) ve terminal

| #   | Test                       | Nasıl                                                                               | Bozukluk işareti                                  |
| --- | -------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------- |
| 6.1 | Başlat/Durdur              | Header'daki otopilot alanından Başlat/Durdur.                                       | Buton tepki vermiyor, durum metni güncellenmiyor. |
| 6.2 | Terminal & Kuyruk popover  | Config popover aç, session istatistikleri (Temizlenen, E-posta vb.) görünüyor mu.   | Sayılar hep 0 veya popover açılmıyor.             |
| 6.3 | Zihin akışı (LiveTerminal) | Dashboard'da ajan çalışırken "AJAN ZİHİN AKIŞI" alanında düşünce/aksiyon akıyor mu. | Hiç kayıt gelmiyor veya Türkçe karakter bozuk.    |

---

## 7. Entegrasyonlar ve dış bağımlılıklar

| #   | Test        | Nasıl                                                                  | Bozukluk işareti                                                                  |
| --- | ----------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 7.1 | Gmail       | Ayarlar'da Gmail bağla; Mail'de gelen/gönderilen listele, mail gönder. | Liste boş (bağlı olmasına rağmen), gönderim 401/403 veya "Gmail API hazır değil". |
| 7.2 | Firebase    | Ayarlar'da Firebase config gir; (varsa) senkron/veri çekme.            | "Bağlantı bekleniyor" kalıyor veya konsol hata.                                   |
| 7.3 | Gemini / AI | API key ayarlı; Lead veya Mail'de AI ile mail/teklif üret.             | Sürekli "Servis kullanılamıyor" veya boş/hatalı JSON.                             |

---

## 8. Performans ve hata sınırları

| #   | Test            | Nasıl                                                                           | Bozukluk işareti                                   |
| --- | --------------- | ------------------------------------------------------------------------------- | -------------------------------------------------- |
| 8.1 | Çok sayıda lead | 100+ lead ile liste, filtre, sayfalama.                                         | Sayfa donuyor, bellek tükeniyor, pagination bozuk. |
| 8.2 | Ağ kesikliği    | DevTools'ta offline simüle et; bir sayfa veri çekerken.                         | Sonsuz yükleme, anlamsız hata, sayfa crash.        |
| 8.3 | Geçersiz veri   | localStorage veya API'den bozuk/eksik veri (ör. eksik `firma_adi`, null email). | Sayfa veya bileşen crash, konsol exception.         |

---

## 9. Erişilebilirlik ve tarayıcı

| #   | Test            | Nasıl                                                   | Bozukluk işareti                                          |
| --- | --------------- | ------------------------------------------------------- | --------------------------------------------------------- |
| 9.1 | Klavye          | Sadece Tab/Enter ile gezinme; Command Palette (Ctrl+K). | Odak takılı kalıyor, modal kapanmıyor.                    |
| 9.2 | Farklı tarayıcı | Chrome, Firefox, Safari (veya Edge) ile kritik akışlar.  | Layout bozuk, tarih/format farklı, API farklı davranıyor.  |

---

## 10. Özet kontrol listesi (tek sayfa)

Tüm testleri tek bir checklist gibi kullanmak için:

- [ ] **Otomatik:** `npm run test` – tüm Vitest testleri geçiyor mu?
- [ ] **E-posta:** Türkçe konu + gövde + (isteğe bağlı) Türkçe ek adı ile gönderim ve alıcıda doğrulama.
- [ ] **Tema:** Dark modda tüm sayfalar + modallar + formlar okunaklı mı?
- [ ] **Auth:** Login, onboarding, çıkış ve korumalı route'lar doğru mu?
- [ ] **Sayfalar:** Dashboard, Leads, Mail, Tasks, Reports, Settings, Calendar, Training, Guide, Login, Onboarding – açılıyor ve kritik aksiyonlar çalışıyor mu?
- [ ] **Otopilot:** Başlat/durdur, popover, terminal çıktısı.
- [ ] **Entegrasyon:** Gmail, Firebase, Gemini (key varken) temel senaryolar.
- [ ] **Sınır:** Çok lead, offline, bozuk veri ile crash/sonsuz yükleme var mı?

---

## Hata kaydı

Bu planı takip ederek bulduğunuz her bozukluk veya eksik için not edin:

- **Sayfa/bileşen adı**
- **Yapılan işlem**
- **Beklenen**
- **Gerçekleşen**
- **Konsol hata mesajı** (varsa)

Bu bilgiler düzeltme önceliklendirmesini kolaylaştırır.
