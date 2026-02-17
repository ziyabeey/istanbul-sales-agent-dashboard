# Puan Gerçek İnceleme (Kod Doğrulamalı)

Bu belge, **AJAN_WEB_SATIS_PUANI.md** içindeki puanlama alanlarını kod tabanına göre doğrular; dokümanda yazılanların gerçekten uygulanıp uygulanmadığını ve **9 puanı engelleyen gerçek boşlukları** netleştirir.

**İnceleme tarihi:** Kod tabanı taraması ile oluşturuldu.

---

## Zaten Var Olduğu Doğrulanan Özellikler

| Özellik | Nerede | Doğrulama |
|--------|--------|-----------|
| A/B şablon raporu | `reportsService.getPerformanceData` → `templateAbReport` | ✅ Tablo: şablon, tür, gönderim, başarı, oran % |
| Sektör bazlı A/B | `templateAbReportBySector` (sectorStats) | ✅ Raporlarda "Sektöre göre" alt tablosu |
| Bu ay teklif hedefi | `getTargetTeklifAy()`, `webKpis.targetTeklifAy`, `teklifGonderilenBuAy` | ✅ Raporlarda kart + "Hedef aşıldı" etiketi |
| Hedef KPI toast | `Reports.tsx` useEffect, `period === 'thisMonth'` | ✅ "Hedef aşıldı" / "X teklif kaldı" toast (sessionStorage ile tekrarsız) |
| Aylık hedef ayarlanabilir | `Settings` → `targetTeklifAy`, localStorage `agent_target_teklif_ay` | ✅ Genel sekmesinde input + kaydet |
| Düşük performanslı şablonlar | `evolutionCandidates` = `getTemplatesNeedingEvolution(0.2, 5)` | ✅ Raporlarda kart (Q < 0,2) |
| 2 gün kuralı | `useAgentOutreach.ts` satır 138–141 | ✅ `Date.now() - lastContact < 2 * 24 * 60 * 60 * 1000` ise teklif atlanıyor |
| Takip süresi görünürlüğü | `Leads.tsx` `getSonTemasLabel`, teklifUygun | ✅ "X gün önce", "Teklif uygun" / "2 gün dolmadı" |
| Gelen mail filtreleme | `isNonActionableInbound`, `syncReplies` | ✅ Genel merkez/daemon/OOO → taslak yok |
| Persona (yanıt tonu) | `analyzePersonaFromReply` + syncReplies fire-and-forget | ✅ Yanıt sonrası persona güncelleme |
| RL sectorStats | `storage.recordTemplateSuccess(id, sector)` | ✅ Şablon başarısı sektör bazında kaydediliyor |

Bu maddeler tekrar "öneri" olarak eklenmemeli; zaten uygulanmış durumda.

---

## Alan Bazlı Gerçek Durum ve Eksikler

### 1. Lead Kalitesi ve Hedefleme (7,5)

**Kodda olan:** `discover` prompt’ta sitesi yok/eski vurgusu; `lead_skoru` hesaplaması; `checkLeadWebsiteByEmail` zenginleştirme sonrası; `WEB_DESIGN_SECTORS`.

**Gerçek eksik:**  
- `web_sitesi_durumu` keşif aşamasında tamamen AI çıktısına bağlı; CORS nedeniyle birçok sitede doğrulama "unknown" kalıyor.  
- Lead listesinde "sitesi yok" önceliği görsel olarak (örn. rozet) yok; sadece sıralama bonusu var.

**9 için engel:** Otomatik "site var mı" doğrulaması hâlâ sınırlı; kullanıcı tek tıkla "site kontrolü yenile" yapamıyor.

---

### 2. Keşif (8)

**Kodda olan:** Domain/telefon tekrar kontrolü; mojibake düzeltmesi; `checkSiteAge`; "çift kayıt yapma" prompt.

**Gerçek eksik:**  
- Keşif sonuç kalitesi tamamen harici AI/arama API’sine bağlı; boş veya tekrarlı sonuç için ek filtre yok.  
- Keşif limitleri sabit/config’de; kullanıcı "günde max keşif sayısı" göremiyor/ayarlayamıyor.

**9 için engel:** Küçük; keşif zaten 8. Asıl tavan veri kalitesi ve kullanıcı kontrolleri.

---

### 3. Zenginleştirme (7,5)

**Kodda olan:** `verifyEmail`, `quickValidateEmail`; 3 denemede "e-posta yok" notu; `checkSiteAge` + `checkMobileFriendly` notları.

**Gerçek eksik:**  
- Mobil uyum CORS’da çoğu sitede "unknown"; kullanıcıya "mobil bilinmiyor" açıklaması yok.  
- Zenginleştirme hatası sonrası "X dakika sonra tekrar" gibi net mesaj yok (circuit breaker var ama kullanıcı dilinde değil).

**9 için engel:** Orta; raporlarda "mobil bilinmiyor" açıklaması ve hata mesajı iyileştirmesi yeterli olabilir.

---

### 4. Outreach Intro (8)

**Kodda olan:** Persona, şablon, ürün+CTA, konu satırı kuralı, sitesi yok sort bonusu, günlük limit bildirimi.

**Gerçek eksik:**  
- Günlük limit dolunca "yarın X lead bekliyor" sayısı Layout/otopilot panelinde kalıcı görünmüyor olabilir (addThought/addNotification ile anlık).  
- Intro öncesi "bu lead’e neden bu şablon?" kısa gerekçesi kullanıcıya gösterilmiyor.

**9 için engel:** Küçük; şeffaflık artışı (limit özeti + şablon gerekçesi) 8’i 8,5’e taşır.

---

### 5. Outreach Teklif (7,5)

**Kodda olan:** `generateProposal`; sitesi yok vurgusu; CTA; konu satırı kuralı; randevu linki.

**Gerçek eksik:**  
- Teklif metninde "fiyat aralığı" veya "paket fiyatı" ayarlardan gelmiyor; AI’a sabit ipucu veriliyor.  
- Raporlarda "teklif gönderilen lead’lerin ortalama yanıt süresi" gibi bir metrik yok (veri varsa hesaplanabilir).

**9 için engel:** Ayarlardan teklif fiyat aralığı/paket bilgisi + raporlarda bir ek KPI ile 8’e çıkabilir.

---

### 6. Takip ve Yanıt (7,5)

**Kodda olan:** syncReplies; generateReplyDraft (ürün+CTA); predictNextMove fallback; 2 gün kuralı (kodda zorunlu); isNonActionableInbound; persona güncelleme.

**Gerçek eksik:**  
- "Onay bekliyor" lead’ler için tek ekrandan toplu "hepsini mail gönder" / "hepsini arşivle" yok; tek tek işlem gerekiyor.  
- Takip taslağı oluşturulurken "gelen mail özeti" (snippet) kullanıcıya taslak modalında net gösterilmiyor olabilir.

**9 için engel:** Onay bekleyen toplu aksiyon ve taslak ekranında snippet görünürlüğü.

---

### 7. RL / Önceliklendirme (7,5)

**Kodda olan:** Q-table; recordTemplateSuccess(sektor); web çarpanı 1.1x; cold pool; evolutionCandidates; A/B ve sektör raporu.

**Gerçek eksik:**  
- Raporlarda "hangi sektörde hangi şablon kazanıyor" tek bir özet kart/tablo (en iyi 5 sektör–şablon çifti) yok; sektör tablosu var ama "öne çıkan" vurgusu yok.  
- Q-table’ı sıfırlama / dışa aktarma kullanıcı arayüzü yok (debug/şeffaflık).

**9 için engel:** Raporlarda "En iyi sektör–şablon" özeti + isteğe bağlı Q-table yönetimi.

---

### 8. Teknik Dayanıklılık (8,5)

**Kodda olan:** Mock/Gmail ayrımı; circuit breaker; slot kotası; hata sınıflandırması; UTF-8; hedef toast; 12 hata sonrası durdurma.

**Gerçek eksik:**  
- Kullanıcı "son X hatanın logu"nu göremiyor; sadece thought/notification akıyor.  
- Otopilot durduğunda "Neden durdu?" (limit mi, hata mı, manuel mi) tek satırda özetlenmiyor.

**9 için engel:** Hata logu özeti ve durdurma sebebi özeti ile 9’a çıkabilir.

---

## Özet: 9 Puanı Engelleyen 6 Gerçek Boşluk

1. **Lead kalitesi:** Lead detayında veya listede "web sitesi kontrolü yenile" + sonuç (Evet/Hayır/unknown) net görünsün.  
2. **Teklif:** Ayarlarda "teklif fiyat aralığı veya paket bilgisi" alanı; generateProposal bu metni kullansın.  
3. **Takip/Onay:** "Yanıt/Onay Bekliyor" filtresinde toplu aksiyon: "Seçilenleri mail gönder" / "Arşivle".  
4. **RL rapor:** "En iyi 5 sektör–şablon" kartı (başarı oranı + kullanım).  
5. **Teknik:** Otopilot panelinde "Son durum özeti" (çalışıyor / durdu – sebep: limit / hata / manuel).  
6. **Rapor/Zenginleştirme:** "Bu ay teklif hedefi" yanında kısa açıklama: "Hedef Ayarlar > Genel’den değiştirilir"; mobil notu "CORS nedeniyle çoğu sitede bilinmiyor" ifadesi.

Bu maddeler **yeni puan planında** tek tek hedeflenmeli; A/B raporu, KPI toast, 2 gün kuralı gibi zaten yapılmış işler tekrar öneri listesine alınmamalı.
