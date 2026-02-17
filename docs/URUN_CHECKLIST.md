# Ürün Tamamlama Checklist

Bu belge, Login, Raporlar, Takvim ve Mail Otomasyon sayfalarının durumunu ve kısa aksiyonları listeler.

---

## Login

| Kontrol | Durum | Not |
|--------|--------|-----|
| E-posta/şifre ile giriş | ✅ Yapıldı | firebaseService.login |
| Kayıt (register) | ✅ Yapıldı | mode toggle |
| Hata mesajları (invalid-credential, email-already-in-use) | ✅ Yapıldı | setError ile kullanıcıya gösteriliyor |
| Yönlendirme (başarılı giriş → /) | ✅ Yapıldı | navigate('/') |
| Yerel mod (oturum açmadan kullanım) | ✅ Yapıldı | handleLocalMode |
| Token yenileme | ⏳ İleride | Firebase auth otomatik yenileme kullanılıyor; ek manuel yenileme istenirse eklenebilir |
| Şifre sıfırla | ⏳ İleride | Firebase auth sendPasswordResetEmail ile eklenebilir |
| Çıkış | ✅ Yapıldı | Layout/Settings üzerinden; firebaseService.logout |

**Özet:** Giriş akışı çalışır durumda. İleride: şifre sıfırla, isteğe bağlı token yenileme UI.

---

## Raporlar

| Kontrol | Durum | Not |
|--------|--------|-----|
| Veri yükleme (getPerformanceData, getStats) | ✅ Yapıldı | useEffect + api.reports, api.dashboard |
| Yükleniyor durumu | ✅ Yapıldı | loading + Loader2 |
| KPI kartları (lead sayısı, başarı oranı vb.) | ✅ Yapıldı | stats ile render |
| Grafikler (Bar, Area, Radar) | ✅ Yapıldı | recharts kullanılıyor |
| Boş veri / hata durumu | ⚠️ Kısa iş | data null/empty veya catch sonrası EmptyState veya hata mesajı gösterilebilir |
| PDF İndir / Bu Ay filtresi | 🔘 UI var | Butonlar mevcut; handler’lar (export PDF, filtre) ileride bağlanabilir |

**Özet:** Raporlar sayfası veri ve grafiklerle çalışıyor. Eksik: net boş/hata state UI, PDF export ve filtre mantığı.

---

## Takvim

| Kontrol | Durum | Not |
|--------|--------|-----|
| Etkinlik listesi (api.calendar.getAll) | ✅ Yapıldı | events state |
| Görevler (api.tasks.getAll) | ✅ Yapıldı | tasks state, takvimle birlikte |
| Haftalık/aylık görünüm | ✅ Yapıldı | viewMode state |
| Yeni etkinlik ekleme | ✅ Yapıldı | handleAddEvent, api.calendar.create |
| “Müsait değil” (blocked) günü | ✅ Yapıldı | type: 'blocked' |
| Google Calendar entegrasyonu | ⏳ İleride | Şu an muhtemelen mock/yerel; gerçek Google Calendar API istenirse eklenebilir |
| Görev–takvim bağlantısı | ✅ Yapıldı | Aynı sayfada tasks + events |

**Özet:** Takvim ve görevler çalışıyor. İleride: gerçek Google Calendar senkronizasyonu.

---

## Mail Otomasyon

| Kontrol | Durum | Not |
|--------|--------|-----|
| Gelen kutusu / Gönderilen / Onay sekmesi | ✅ Yapıldı | activeTab, inbox/sent/approval |
| Taslak onayı (onay bekleyen lead’lere mail gönder) | ✅ Yapıldı | handleApproveSend, api.gmail.send |
| Otopilot “Tam otomatik” modu ile uyum | ✅ Yapıldı | agentConfig.autoSendFollowUp açıkken takip yanıtları otomatik gönderilir; Onay sekmesi daha az taslak görür. Aynı config Layout’tan okunuyor. |
| Taslak oluşturma (otopilot) | ✅ Yapıldı | Otopilot taslak üretir; bu sayfa onaylar veya tam otomatik modda otopilot doğrudan gönderir |
| Hata durumu (gönderim başarısız) | ✅ Yapıldı | catch + alert |

**Özet:** Mail otomasyon ve otopilot modu (taslak / tam otomatik) uyumlu. Ek: Onay sekmesinde “Tam otomatik mod açık” bilgisi isteğe bağlı gösterilebilir.

---

## Genel

- **Otopilot modu (Tam otomatik / Taslak onaylı)** ve **günlük mail limiti**: Layout > Hızlı Ayarlar’dan yönetiliyor (Faz 0).
- **Adım bazlı süreler**: Layout otopilot panelinde “Son döngü” altında gösteriliyor (Faz 1).

Bu checklist güncellenebilir; yeni sayfalar veya maddeler eklenebilir.
