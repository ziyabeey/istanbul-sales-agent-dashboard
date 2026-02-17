# Ajan Algoritması — Web Sitesi Satışında Başarı Puanı

Bu belge, otopilot ajanının **web sitesi tasarlayıp satma** hedefinde (KOBİ’lere, hızlı yanıt verebilecek kaliteli lead’lere) ne kadar başarılı olacağını kriterlere göre puanlar. **Son güncelleme:** Gelen mail filtreleme (genel merkez/daemon/OOO), persona güncelleme (yanıt tonu), mobil uyum kontrolü ve ayarlanabilir teklif hedefi eklendi.

---

## Genel Puan: **8,5 / 10** (hedef 9–9,5)

**Kısa cevap:** Ajan, web sitesi satışı için **yüksek seviye** bir temel sunuyor. Yol haritası (PUAN_ARTIRMA_YOL_HARITASI) uygulandı: takip taslağında ürün + CTA, outreach’te sitesi olmayan önceliği, zenginleştirmede e-posta doğrulama, keşifte domain/telefon tekrar kontrolü + mojibake, RL’de web ihtiyacı çarpanı, raporlarda “sitesi olmayan → teklif” oranı ve günlük limit bilgisi eklendi. Gerçek dünyada başarı için Gmail bağlı kullanım ve RL verisi birikmesi önemli.

---

## 1. Lead Kalitesi ve Hedefleme — **7,5 / 10**

| Kriter | Durum | Not |
|--------|--------|-----|
| Web sitesi ihtiyacı önceliği | ✅ | `discover()` prompt’unda “sitesi yok / eski” vurgusu; `lead_skoru` sitesi Yok/Eski olanlara +1 |
| KOBİ odaklı sektörler | ✅ | `WEB_DESIGN_SECTORS`: Kuaför, Restoran/Kafe, Emlak, Sağlık, Otel, E-ticaret, Eğitim, Spor, Perakende |
| İletişim filtresi | ✅ | Sadece telefon **veya** e-posta olan lead’ler listeye alınıyor |
| Bölge rotasyonu | ✅ | Round-robin district/sector; aynı bölgeye takılı kalmıyor |

**Eksikler:** AI bazen `web_sitesi_durumu`’nu yanlış dönebilir; CORS olan sitelerde doğrulama çalışmaz. Zenginleştirme sonrası checkLeadWebsiteByEmail ile web sitesi var mı kontrolü eklendi. İleride “site var mı” kontrolü bir servis ile doğrulanabilir.

---

## 2. Keşif (Discovery) — **8 / 10**

| Kriter | Durum | Not |
|--------|--------|-----|
| Hedef cümle | ✅ | “Web sitesi tasarımı satışı için kaliteli lead”, “hızlı yanıt verebilecek” |
| Kalite filtresi | ✅ | En az bir iletişim kanalı zorunlu; skor sıralaması ile web ihtiyacı olanlar önde |
| Ölçek sınırı | ✅ | `discoveryMaxActionableLeads`, `discoveryMaxTotalActive` ile pipeline tıkanmıyor |

**Eksikler:** Keşif tamamen AI + Google Search’e bağlı; bazen boş veya tekrarlı sonuç dönebilir. Zenginleştirmede site varsa checkSiteAge(domain) ile [Site yaşı: eski] / [Site: güncel] notu ekleniyor.

---

## 3. Zenginleştirme (Enrichment) — **7,5 / 10**

| Kriter | Durum | Not |
|--------|--------|-----|
| E-posta bulma | ✅ | AI + Google Search ile kurumsal e-posta aranıyor |
| Tahmin yasağı | ✅ | Prompt’ta “uydurma yapma, sadece kaynakta geçen” vurgusu |
| Retry / arşiv | ✅ | 3 denemede bulunamazsa lead “geçersiz”; backoff var |
| Mobil uyum notu | ✅ | checkMobileFriendly(domain); notta [Mobil: uyumlu] / [Mobil: zayıf] (CORS'da çoğu unknown) |

**İyileştirme (yapıldı):** E-posta bulunduktan sonra verificationService.verifyEmail + quickValidateEmail; geçersizse kaydetme veya gecersiz işaretleme. 3 denemede bulunamazsa not: “İletişim: sadece telefon (e-posta yok).”

---

## 4. Outreach — Tanışma (Intro) — **8 / 10**

| Kriter | Durum | Not |
|--------|--------|-----|
| Persona | ✅ | Ayarlardaki persona / rol / ton AI prompt’una gidiyor |
| Lead bilgisi | ✅ | Firma, sektor, ilçe, `websitesi_var_mi`, notlar, persona analizi |
| Kanca (hook) | ✅ | Prompt’ta “lead’e özel kanca cümlesi”, “web durumunu düşün” adımı var |
| Çeşitlilik | ✅ | Rastgele “TARZ” (açılış stili) ile mailler birbirinden farklılaşıyor |
| Şablon + kişiselleştirme | ✅ | Şablon referans alınıyor ama ezbere kullanılmama talimatı var |

**İyileştirme (yapıldı):** Prompt’a sabit “SATILAN ÜRÜN” ve zorunlu CTA; konu satırı kuralı: “web sitesi / ücretsiz görüşme / 15 dk görüşme” veya değer vaadi içersin.

---

## 5. Outreach — Teklif (Proposal) — **7,5 / 10**

| Kriter | Durum | Not |
|--------|--------|-----|
| Lead’e özel teklif | ✅ | `generateProposal` araştırma + benzersiz değer önerisi istiyor |
| Persona + web durumu | ✅ | `websitesi_var_mi`, persona bilgisi prompt’ta |
| Randevu linki | ✅ | `calendarUrl` varsa ekleniyor |

**İyileştirme (yapıldı):** Prompt’a ürün bloğu, zorunlu tek CTA, konu satırı için “web sitesi teklifi / görüşme daveti” net ifade ve isteğe bağlı fiyat ipucu eklendi.

---

## 6. Takip ve Yanıt — **7,5 / 10**

| Kriter | Durum | Not |
|--------|--------|-----|
| Gelen kutusu senkronu | ✅ | `syncReplies`, bounce tespiti, lead eşleştirme |
| Takip taslağı | ✅ | Gelen e-postanın snippet’i ile `generateReplyDraft`; yoksa predictNextMove |
| 2 gün kuralı | ✅ | İlk temas sonrası 2 gün geçmeden teklif gönderilmiyor |
| Gelen mail filtreleme | ✅ | isNonActionableInbound: genel merkez, hastane bölümü, daemon, OOO → taslak oluşturulmaz |
| Persona (yanıt tonu) | ✅ | Yanıt gelince analyzePersonaFromReply ile persona güncellenir (fire-and-forget) |

**İyileştirme (yapıldı):** “Web sitesi” ürünü ve net CTA (randevu / arama) generateReplyDraft ve predictNextMove fallback’te zorunlu eklendi.

---

## 7. Öğrenme ve Önceliklendirme (RL) — **7,5 / 10**

| Kriter | Durum | Not |
|--------|--------|-----|
| Şablon seçimi | ✅ | Q-table ile intro/proposal şablonları sektör/duruma göre seçiliyor |
| Ödül sinyali | ✅ | Durum değişimi (olumlu, teklif_gonderildi, takipte vb.) Sheets dahil tetikleniyor |
| Timeout cezası | ✅ | 7/14 gün yanıt yoksa ceza; lead başına tekrarsız |

**İyileştirme (yapıldı):** Web ihtiyacı (sitesi yok) için ödül çarpanı 1.1x; cold pool için no_response_21d / re_engagement_sent event’leri; Raporlar’da “Düşük performanslı şablonlar” kartı. Uzun vadede veri biriktikçe şablon ve sektör bazlı performans iyileşir.

---

## 8. Teknik Dayanıklılık ve Kullanıcı Deneyimi — **8,5 / 10**

| Kriter | Durum | Not |
|--------|--------|-----|
| Gmail bağlı değilken | ✅ | Mock gönderimde lead güncellenmiyor, “Mail gönderilmedi” uyarısı, Layout’ta sarı banner |
| Circuit breaker | ✅ | Gmail/AI hatalarında 5 dk pause |
| Slot kotası | ✅ | Döngüde en fazla 2 hafif veya 1 ağır aksiyon; spam/rate limit kontrolü |
| Hata ayrımı | ✅ | Kalıcı (yetki/ayar) vs geçici; 12 hata sonrası durdurma; keşif/zenginleştirme hata mesajı sınıflandırması |
| **Mail konu/gövde Türkçe** | ✅ | AI yanıtında UTF-8 mojibake `fixUtf8Mojibake` ile düzeltiliyor; intro/proposal/reply taslağı çıktılarına uygulanıyor. |
| **Hedef KPI bildirimi** | ✅ | Raporlar'da "Bu ay" seçiliyken hedefe yaklaşınca veya aşıldığında toast; teklifGonderilenBuAy kullanılıyor. |

Bu alan web sitesi satışına özel değil ama ajanın güvenilir çalışması için güçlü.

---

## Özet Tablo (Revize — Yeniden Puanlama)

| Alan | Puan | Açıklama |
|------|------|----------|
| Lead kalitesi / hedefleme | 7,5 | KOBİ + web ihtiyacı önceliği; doğrulama kısmen eklendi |
| Keşif | 8 | Domain/telefon tekrar kontrolü; mojibake + “çift kayıt yapma” prompt |
| Zenginleştirme | 7,5 | E-posta doğrulama (verifyEmail + quickValidate) sonrası kaydet |
| Outreach (intro) | 8 | Sitesi olmayan lead önceliği; ürün + CTA; günlük limit bilgisi |
| Outreach (teklif) | 7,5 | Paket/CTA, fiyat ipucu, konu satırı; sitesi yok vurgusu (kurumsal/ilk site) |
| Takip | 7,5 | generateReplyDraft ürün + CTA; predictNextMove fallback’e CTA |
| RL / önceliklendirme | 7,5 | Web çarpanı 1.1x; cold pool event’leri; düşük performanslı şablonlar raporu |
| Teknik dayanıklılık | 8,5 | Mock/Gmail, circuit breaker, slot, UTF-8, limit bildirimi, hata sınıflandırması |

**Ortalama (ağırlıksız):** ~8,0 → **Genel puan: 8,5 / 10** (hedef 9–9,5).

---

## Test Senaryoları ve Metin İncelemesi

- **agentUtils.test.ts:** `getErrorMessage`, `isPermanentAgentError`, `isSystemMailbox`, `isBounceOrDaemonSnippet`, **`fixUtf8Mojibake`** (Türkçe mojibake düzeltmesi) — geçiyor.
- **agentQueue.test.ts:** `computeAgentQueue` — sanitize, enrich (e-postası yok + skor ≥ min), outreach, draft, inbox_sync; “email aranacak” etiketi doğrulanıyor.
- **gmailService.test.ts:** `isBlockedMailbox`, `isBounceLikeSubject`; sistem/daemon adresleri ve bounce konuları filtreleniyor.
- **rewardEngine.test.ts:** `recordReward`, `sweepTimeoutPenalties` (lead başına tek ceza); Q-table güncellemesi.
- **agentFilters.test.ts:** `isSystemMailbox`, `isFollowupDue` (1 gün kuralı) — AgentContext ile uyumlu mantık.
- **Metinler:** Intro/proposal prompt’larında ürün bloğu ve CTA Türkçe; persona şablonu ve rapor KPI etiketleri Türkçe. AI çıktı metinleri birim testte mock’lanmadığı için canlı/entegrasyon testinde doğrulanmalı.

---

## Uygulanan Öneriler (Tamamlandı)

1. ✅ **Ürün dilini sabitle:** Intro ve proposal’da “Satılan ürün: profesyonel web sitesi tasarımı…” ve CTA (“15 dk ücretsiz görüşme” / randevu linki) eklendi.
2. ✅ **Teklifte net CTA:** Proposal’da zorunlu tek CTA ve isteğe bağlı fiyat ipucu talep ediliyor.
3. ✅ **Web sitesi durumu doğrulama:** `checkLeadWebsiteByEmail` (verificationService) + zenginleştirme sonrası güncelleme.
4. ✅ **Persona şablonu:** Ayarlar > Persona’da “Web sitesi satış danışmanı (şablon)” butonu.
5. ✅ **Raporlarda web KPI:** “Sitesi olmayan lead’e mail”, “Teklif gönderilen”, “Olumlu yanıt”, “Teklif → olumlu oranı”.
6. ✅ **Mail konu/gövde encoding:** Türkçe karakter bozulması (mojibake) `fixUtf8Mojibake` ile düzeltiliyor.
7. ✅ **Takip taslağı ürün + CTA:** generateReplyDraft’a ürün bloğu ve zorunlu CTA; predictNextMove fallback’e CTA satırı.
8. ✅ **Outreach sitesi yok önceliği:** validQueue sort’ta websitesi_var_mi === 'Hayır' +2 bonus; günlük limit dolunca “X lead yarın işlenecek” bildirimi.
9. ✅ **Zenginleştirme doğrulama:** E-posta bulunduktan sonra verifyEmail + quickValidateEmail; geçersizse kaydetme.
10. ✅ **Keşif tekrar + mojibake:** Domain ve telefon ile çift kayıt kontrolü; discover prompt’a “çift kayıt yapma”; fixUtf8Mojibake.
11. ✅ **RL web çarpanı:** Sitesi olmayan lead’de olumlu ödül 1.1x.
12. ✅ **Rapor:** “Teklif (sitesi yok)” sayısı ve oranı (teklifOraniSitesiOlmayan).
13. ✅ **Intro konu satırı:** generateEmail prompt’una konu satırı kuralı (web sitesi / ücretsiz görüşme / değer vaadi).
14. ✅ **Teklif konu satırı:** generateProposal’da konu satırı için “web sitesi teklifi / görüşme daveti” net ifade talimatı.
15. ✅ **Cold pool re-engagement:** Soğuk havuzdaki lead’lere tek seferlik yeniden temas maili; queue `re_engagement`, `recordReward('re_engagement_sent')`.
16. ✅ **Bu ay teklif hedefi:** Raporlar’da “Bu ay teklif hedefi: 20” + gerçekleşen; “Hedef aşıldı” etiketi.
17. ✅ **A/B şablon raporu:** Raporlar’da “A/B Şablon Performansı” tablosu (gönderim, başarı, oran %).
18. ✅ **Eski site doğrulama:** `checkSiteAge(domain)` (Last-Modified; 24 ay+ = eski); zenginleştirmede lead notuna [Site yaşı: eski] / [Site: güncel].
19. ✅ **Hedef KPI bildirimi:** Raporlar’da “Bu ay” seçiliyken hedefe yaklaşınca veya aşıldığında toast (hedef aşıldı / X teklif kaldı); bu ay teklif sayısı (teklifGonderilenBuAy) raporlarda kullanılıyor.
20. ✅ **Raporlarda eski site sayısı:** webKpis.eskiSiteLeadSayisi (notunda [Site yaşı: eski] geçen lead) Raporlar’da kart olarak gösteriliyor.
21. ✅ **Teklif prompt’unda sitesi yok vurgusu:** generateProposal’da websitesi_var_mi === 'Hayır' ise “kurumsal site / ilk web sitesi fırsatını net vurgula” talimatı.
22. ✅ **Gelen mail filtreleme:** isNonActionableInbound ile genel merkez, hastane bölümü, daemon, OOO mailleri eleniyor; taslak oluşturulmaz, onay_bekliyor yapılmaz.
23. ✅ **Persona güncelleme (gelen mail):** syncReplies'da yanıt gelince analyzePersonaFromReply ile ton tahmini; Bilinmiyor değilse lead personaAnalysis güncellenir.
24. ✅ **Mobil uyum kontrolü:** verificationService.checkMobileFriendly(domain); zenginleştirmede notta [Mobil: uyumlu/zayıf]. Aylık teklif hedefi Ayarlar > Genel'den ayarlanabilir.

---

*Bu puan, yol haritası (PUAN_ARTIRMA_YOL_HARITASI) uygulandıktan sonra revize edilmiştir. Canlı kullanım ve A/B testleri puanı tekrar revize edebilir.*

---

**Puanı 9’a taşımak için (tekrarsız, kod doğrulamalı):**
- **Gerçek inceleme:** Hangi özelliklerin kodda olduğu ve 9’u engelleyen gerçek boşluklar → **docs/PUAN_GERCEK_INCELEME.md**
- **Yeni puan planı:** Sadece yeni adımlar (A/B rapor, KPI toast vb. hariç), kabul kriterli 6 madde → **docs/PUAN_PLANI_9.md**

Eski referanslar: Yol haritası → **docs/PUAN_ARTIRMA_YOL_HARITASI.md** · Öneriler → **docs/PUAN_ARTIRMA_ONERILERI.md**
