# Puanı Artırmak İçin Yapılabilecekler — Detaylı Yol Haritası

Bu belge, **AJAN_WEB_SATIS_PUANI.md** içindeki 7,5/10 puanını **8+** seviyesine çıkarmak için yapılabilecek iyileştirmeleri alan alan, öncelik ve etkiye göre listeler. Her madde uygulandığında hangi kriterin puanının artacağı belirtilmiştir.

---

## Mevcut Zayıf Noktalar (Puan Kaybına Neden Olanlar)

| Alan | Mevcut Puan | Ana Eksikler |
|------|-------------|--------------|
| Keşif | 7 | Sonuç kalitesi tamamen AI’a bağlı; tekrarlı/yanlış lead; “eski site” doğrulama yok |
| Zenginleştirme | 6,5 | E-posta bulma sonrası DNS/format doğrulama yok; sektöre göre fallback yok |
| Takip | 6 | Takip taslağında “web sitesi” + net CTA zorunlu değil; taslak genel kalabiliyor |
| RL | 6 | Web sitesi satışına özel ödül/ceza yok; soğuk havuz (cold_pool) için özel politika yok |

---

## 1. TAKİP VE YANIT (6 → 7,5)

**Hedef:** Takip maillerinde ve yanıt taslaklarında “web sitesi” ürünü ve net CTA (randevu / arama) zorunlu olsun; taslak kalitesi artsın.

### 1.1 `generateReplyDraft` prompt’una ürün + CTA ekle

- **Ne:** `aiService.generateReplyDraft` prompt’una sabit blok: “Satılan ürün: web sitesi tasarımı. Yanıtta mutlaka tek bir net sonraki adım olmalı: randevu linki veya ‘Sizi arayalım’.”
- **Nerede:** `services/aiService.ts` — `generateReplyDraft` içindeki prompt.
- **Etki:** Takip puanı +0,5; dönüşüm odaklı yanıtlar.

### 1.2 Takip taslağında randevu linki zorunluluğu

- **Ne:** `userProfile.calendarUrl` varsa prompt’ta “Yanıt gövdesinde mutlaka şu randevu linkini ekle: …” talimatı.
- **Nerede:** Aynı `generateReplyDraft` prompt’u.
- **Etki:** CTA tutarlılığı; takip puanı artar.

### 1.3 predictNextMove fallback’e web + CTA

- **Ne:** Snippet yokken kullanılan `predictNextMove` çıktısına post‑işlem: “Web sitesi teklifimizi kısaca hatırlat; randevu veya arama CTA’sı ekle” (sabit cümle veya kısa AI çağrısı).
- **Nerede:** `useAgentOutreach.performAutoReplyDrafting` — fallback body’ye ek blok.
- **Etki:** Snippet olmayan lead’lerde bile taslak dönüşüm odaklı olur.

---

## 2. KEŞİF (7 → 7,5–8)

**Hedef:** Daha kaliteli ve tekrarsız lead; “eski site” ve çift kayıt azalsın.

### 2.1 Keşif sonrası tekrar kontrolü (domain / telefon)

- **Ne:** Yeni keşfedilen lead’i eklemeden önce sadece `firma_adi` değil, **e-posta domain’i** veya **telefon (son 7–10 hane)** ile mevcut lead’lerle karşılaştır; çakışma varsa ekleme.
- **Nerede:** `useAgentDiscovery.performSmartDiscovery` — `existingNameSet` yanına `existingDomains` / `existingPhones` set’i; `api.leads.discover` sonrası filtreleme.
- **Etki:** Tekrarlı lead azalır; keşif kalitesi puanı artar.

### 2.2 Keşif prompt’una “çift kayıt yapma” talimatı

- **Ne:** `leadsService.discover` prompt’una: “Aynı işletmeyi farklı isimle (ör. unvan vs marka) tekrar döndürme; mümkünse resmi / bilinen firma adını kullan.”
- **Etki:** AI tarafında da tekrar azalır.

### 2.3 Discovery çıktısında `fixUtf8Mojibake`

- **Ne:** `discover()` içinde `result.text` veya parse edilen `firma_adi`, `adres` alanlarına `fixUtf8Mojibake` uygula.
- **Nerede:** `services/leadsService.ts` — `discover` sonrası map öncesi/sırasında.
- **Etki:** Keşif kayıtlarında Türkçe karakter bozulması olmaz; teknik tutarlılık.

---

## 3. ZENGİNLEŞTİRME (6,5 → 7–7,5)

**Hedef:** Bulunan e-postanın hemen doğrulanması; gereksiz outreach ve geçersiz sayacı azalsın.

### 3.1 Zenginleştirme sonrası e-posta doğrulama

- **Ne:** `performAutoEnrichment` içinde e-posta bulunduktan sonra, lead’i kaydetmeden önce: `verificationService.verifyEmail(data.email)` + isteğe bağlı `api.gmail.quickValidateEmail` (format). Geçersizse lead’i güncelleme (veya “geçersiz” yapma), bir sonraki denemeye bırak.
- **Nerede:** `hooks/agent/useAgentDiscovery.ts` — email bulundu block’unda.
- **Etki:** Geçersiz e-posta ile outreach azalır; zenginleştirme puanı artar.

### 3.2 E-posta bulunamayan lead’e “email bulunamadı” notu

- **Ne:** 3 denemede e-posta bulunamayınca lead’e ek not: “İletişim: sadece telefon (e-posta yok).” İleride “sadece telefon” lead’leri için SMS/WhatsApp kanalı açılırsa bu lead’ler kullanılabilir.
- **Nerede:** Aynı hook’ta “3 denemede email bulunamadı” güncellemesi.
- **Etki:** Veri kalitesi ve ilerideki çok kanallı satış için hazırlık.

---

## 4. RL VE ÖNCELİKLENDİRME (6 → 7)

**Hedef:** Web sitesi satışına özel sinyaller; soğuk havuz ve “sitesi yok” lead’lere hafif öncelik.

### 4.1 Web sitesi ihtiyacına özel ödül çarpanı

- **Ne:** `rewardEngine.recordReward` çağrılırken lead’in `websitesi_var_mi === 'Hayır'` ise olumlu ödüllere küçük çarpan (örn. 1.1x); böylece “sitesi olmayan” lead’e giden şablonlar biraz daha hızlı öğrenilir.
- **Nerede:** `rewardEngine.ts` — `recordReward` içinde; veya `leadsService.update` tetiklemesinden önce lead bilgisi zaten mevcut.
- **Etki:** RL puanı artar; sektör + persona yanında “web ihtiyacı” da örtük olarak modele girer.

### 4.2 Cold pool (soğuk havuz) için özel ödül/ceza

- **Ne:** 21 gün sessizlik sonrası `cold_pool`’a düşen lead’e “re_engagement” denemesi yapıldığında (ileride eklenirse) ayrı bir event: `re_engagement_sent`; yanıt gelmezse `no_response_21d` gibi hafif ceza. Böylece Q-table soğuk havuz şablonlarını ayrı öğrenir.
- **Nerede:** `rewardEngine` + `useAgentStrategy` (cold_pool geçişi) ve ileride re‑engagement adımı.
- **Etki:** Uzun vadede soğuk havuz performansı ölçülebilir ve iyileştirilebilir.

### 4.3 Şablon “evrim” uyarısı (opsiyonel)

- **Ne:** Raporlar veya Ayarlar’da “Düşük performanslı şablonlar” listesi: `getTemplatesNeedingEvolution()` ile Q < 0.2 ve N ≥ 5 olan şablonları göster; kullanıcı metni güncelleyebilsin.
- **Nerede:** Yeni bir rapor bileşeni veya Settings’te küçük blok.
- **Etki:** RL’in iş değeri görünür; kullanıcı müdahalesi ile puan artar.

---

## 5. OUTREACH ÖNCELİĞİ (İntro / Teklif)

**Hedef:** “Sitesi olmayan” lead’lere öncelik; günlük limit içinde en yüksek potansiyelli lead’e mail gitsin.

### 5.1 Outreach kuyruğunda “sitesi yok” önceliği

- **Ne:** `validQueue.sort` sıralamasında sadece `lead_skoru` değil, `websitesi_var_mi === 'Hayır'` ise ek bonus puan (örn. skor + 2) uygula; aynı skorda olanlarda “Hayır” önce gelsin.
- **Nerede:** `hooks/agent/useAgentOutreach.ts` — `const lead = validQueue.sort(...)` satırı.
- **Etki:** Intro/teklif puanı dolaylı artar (doğru lead’e daha çok kaynak ayrılır).

### 5.2 Günlük limit dolunca “yarın için” bilgisi

- **Ne:** Günlük mail limiti dolduğunda `addThought` / `addNotification`: “Günlük limit doldu. Yarın devam edecek; X lead bekliyor.”
- **Nerede:** Aynı outreach hook’ta `canSendWithinDailyCap()` false döndüğünde.
- **Etki:** Kullanıcı deneyimi; teknik puanı destekler.

---

## 6. TEKNİK VE KALİTE (8,5 → 9)

**Hedef:** Hata yönetimi, izlenebilirlik ve veri kalitesi.

### 6.1 Discovery ve enrichment’ta hata mesajı sınıflandırması

- **Ne:** AI/API hatalarında (rate limit, timeout, invalid JSON) `recordCircuitFailure('ai')` yanında kullanıcıya kısa mesaj: “Keşif şu an kullanılamıyor (limit/timeout). Bir süre sonra tekrar denenecek.”
- **Nerede:** `useAgentDiscovery` try/catch; `useAgentOutreach` catch.
- **Etki:** Kalıcı/geçici ayrımı netleşir; teknik puanı korur.

### 6.2 Lead/Interaction verisi için basit bütünlük kontrolü

- **Ne:** Periyodik (veya lead ekleme/güncelleme sonrası) kontrol: aynı e-posta ile iki “aktif” lead var mı? Varsa uyarı veya birleştirme önerisi (opsiyonel).
- **Nerede:** `leadsService` veya bakım adımı (örn. `performLeadSanitization` genişletmesi).
- **Etki:** Veri kalitesi; raporların güvenilirliği artar.

### 6.3 Raporlarda “sitesi olmayan” lead’e gönderilen teklif oranı

- **Ne:** `webKpis` içine ek metrik: “Sitesi olmayan lead’e giden teklif sayısı” ve “toplam teklif”e oranı (%). Hedef: bu oranın yüksek olması (web odaklı satış).
- **Nerede:** `reportsService.getPerformanceData` + Reports sayfası.
- **Etki:** Strateji ölçülebilir; puanlama dokümanındaki “web odaklı KPI” tamamlanır.

---

## 7. ÖZET: ÖNCELİK SIRASI VE TAHMİNİ PUAN ETKİSİ

| Öncelik | Madde | Alan | Tahmini puan artışı |
|---------|--------|------|---------------------|
| 1 | 1.1 + 1.2 Takip taslağı ürün + CTA | Takip | 6 → 7 |
| 2 | 5.1 Outreach’ta sitesi yok önceliği | Intro/Teklif | +0,25 |
| 3 | 3.1 Zenginleştirme sonrası e-posta doğrulama | Zenginleştirme | 6,5 → 7 |
| 4 | 2.1 Keşifte domain/telefon tekrar kontrolü | Keşif | 7 → 7,5 |
| 5 | 4.1 Web ihtiyacı ödül çarpanı | RL | 6 → 6,5 |
| 6 | 1.3 predictNextMove fallback CTA | Takip | 7 → 7,25 |
| 7 | 2.2 + 2.3 Discovery prompt + mojibake | Keşif | 7,5 → 7,75 |
| 8 | 6.3 Rapor: sitesi olmayan → teklif oranı | Rapor / Strateji | Dolaylı |
| 9 | 4.2 Cold pool event’leri | RL | 6,5 → 7 (uzun vade) |
| 10 | 6.1 + 6.2 Hata mesajı + lead bütünlük | Teknik | 8,5 → 9 |

**Hedef genel puan (bu maddelerin büyük kısmı uygulandığında):** ~**8 – 8,5 / 10**.

---

## Uygulanan Maddeler (Yol Haritası — Tamamlanan)

| Madde | Durum |
|-------|--------|
| 1.1 + 1.2 generateReplyDraft ürün + CTA + randevu | ✅ |
| 1.3 predictNextMove fallback’e web + CTA | ✅ |
| 5.1 Outreach’ta sitesi yok önceliği (sort) | ✅ |
| 5.2 Günlük limit dolunca “yarın X lead” bildirimi | ✅ |
| 3.1 Zenginleştirme sonrası verifyEmail + quickValidate | ✅ |
| 2.1 Keşifte domain + telefon tekrar kontrolü | ✅ |
| 2.2 Discovery prompt’a “çift kayıt yapma” | ✅ |
| 2.3 Discovery çıktısında fixUtf8Mojibake | ✅ |
| 4.1 RL: web ihtiyacı ödül çarpanı 1.1x | ✅ |
| 6.3 Rapor: teklifSitesiOlmayan + teklifOraniSitesiOlmayan | ✅ |
| 3.2 “3 denemede email yok” notuna “İletişim: sadece telefon” | ✅ |
| 6.1 Keşif/Zenginleştirme hata mesajı sınıflandırması (limit / geçici) | ✅ |
| 6.2 Bakım: çift e-posta tespitinde thought “X tekrar arşivlendi” | ✅ |
| 4.2 Cold pool: no_response_21d + re_engagement_sent; strategy’de recordReward | ✅ |
| 4.3 Raporlar’da “Düşük performanslı şablonlar” kartı (evolutionCandidates) | ✅ |
| Cold pool re-engagement (performColdPoolReEngagement + queue re_engagement + re_engagement_sent) | ✅ |
| Bu ay teklif hedefi (Raporlar’da hedef 20 + gerçekleşen) | ✅ |
| A/B şablon raporu (Raporlar’da şablon bazlı gönderim/başarı oranı) | ✅ |
| Eski site doğrulama (checkSiteAge + zenginleştirmede [Site yaşı: eski/güncel] notu) | ✅ |

**Güncel genel puan (AJAN_WEB_SATIS_PUANI.md):** **8 / 10**. **Hedef:** **9 – 9,5 / 10** (WhatsApp olmadan).

---

## Faz 2: 9 – 9,5 / 10 hedefi

Bu fazda yapılanlar: hata mesajı sınıflandırması (6.1), lead bütünlük bildirimi (6.2), cold pool ödül/ceza (4.2), düşük performanslı şablonlar raporu (4.3). WhatsApp kanalı maliyet nedeniyle iptal; puan artışı e-posta odaklı iyileştirmelerle hedefleniyor. İsteğe bağlı ileride: A/B şablon testi, persona “Bilinmiyor” yeniden analiz.

---

*Bu yol haritası, mevcut kod tabanı ve **AJAN_WEB_SATIS_PUANI.md** kriterlerine göre hazırlanmıştır. Uygulama sırası proje önceliklerine göre değiştirilebilir.*
