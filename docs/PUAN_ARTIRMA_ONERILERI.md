# Puanı Artırmak İçin Öneriler (9 – 9,5 / 10)

Bu belge, **AJAN_WEB_SATIS_PUANI.md** ve **PUAN_ARTIRMA_YOL_HARITASI.md** tamamlandıktan sonra puanı **9 – 9,5 / 10** seviyesine taşımak için önerilen adımları listeler.

---

## Uygulanan Öneriler (Bu Turda)

| # | Öneri | Etki |
|---|--------|------|
| 1 | **Intro konu satırı kuralı** — `generateEmail` prompt’una: Konu satırında "web sitesi", "ücretsiz görüşme", "15 dk görüşme" veya değer vaadi; spam gibi görünmesin. | Outreach (intro) açılım/tıklanma kalitesi |
| 2 | **Teklif konu satırı kuralı** — `generateProposal`’da konu: Firma/sektör + "web sitesi teklifi" / "görüşme daveti" / "15 dk ücretsiz görüşme" net ifade. | Outreach (teklif) netliği |
| 3 | **Puan dokümanı güncellemesi** — Takip/RL metinleri düzeltildi; bölüm puanları özet tabloyla uyumlu; RL 7,5; uygulanan öneriler 13–14 eklendi. | Tutarlılık, hedef 9–9,5 görünürlüğü |
| 4 | **Cold pool re-engagement** — Soğuk havuzdaki lead’lere tek seferlik “yeniden temas” maili; `performColdPoolReEngagement`, queue `re_engagement`, `recordReward('re_engagement_sent')`. | RL + Takip |
| 5 | **Bu ay teklif hedefi** — Raporlar’da “Bu ay teklif hedefi: 20” + gerçekleşen; hedef aşıldığında “Hedef aşıldı” etiketi. | Kullanıcı deneyimi |
| 6 | **A/B şablon raporu** — Raporlar’da “A/B Şablon Performansı” tablosu: şablon adı, tür, gönderim, başarı sayısı, başarı oranı %. | reportsService + Reports | RL ölçüm |
| 7 | **Eski site doğrulama** — `verificationService.checkSiteAge(domain)`: Last-Modified header’a göre 24 ay üzeri “eski”; zenginleştirmede sitesi olan lead’e not: [Site yaşı: eski] / [Site: güncel]. | verificationService + useAgentDiscovery | Keşif / Lead kalitesi |

---

## Sonraki Öneriler (9+ için)

| Öncelik | Öneri | Nerede | Tahmini etki |
|---------|--------|--------|---------------|
| 1 | **Persona “Bilinmiyor”** — Zaten uygulandı: `useAgentPersona` ile analiz yok veya “Bilinmiyor” olan lead’lere analiz yapılıyor. | useAgentPersona | Lead kalitesi |
| 2 | **Hedef KPI bildirimi** — Uygulandı: Raporlar’da “Bu ay” seçiliyken hedefe yaklaşınca veya aşıldığında toast; teklifGonderilenBuAy kullanılıyor. | Reports | Kullanıcı deneyimi |

---

## Yeniden Puanlama Sonrası — Güncel Durum

- **Genel puan:** **8,5 / 10** (yeniden puanlama ile 8'den 8,5'e çıkarıldı).
- **Yükselen alanlar:** Keşif 8, Zenginleştirme 7,5, Teklif 7,5, Teknik 8,5; hedef KPI toast, eski site KPI, teklif sitesi yok vurgusu, teklifGonderilenBuAy dahil.

---

## Puan Artırma Önerileri (9 / 9,5 hedefi)

| Öncelik | Öneri | Nerede | Tahmini etki |
|---------|--------|--------|---------------|
| 1 | **Takip süresi görünürlüğü** — Lead detayında veya listede Son temas: X gün önce ve 2 gün kuralına göre Teklif için uygun / 2 gün dolmadı göstergesi. | Leads sayfası | Takip + UX |
| 2 | **Hedef ayarlanabilir** — Bu ay teklif hedefi (20) sabit yerine Ayarlar veya Raporlar'dan kullanıcının girebileceği alan. | reportsService + Settings | Teknik / UX |
| 3 | **Sektör bazlı A/B** — A/B raporunda sektör bazında da gönderim/başarı (template sectorStats; rapora sektör filtresi veya tablo). | reportsService + Reports | RL |
| 4 | **Persona güncelleme (gelen mail)** — Uygulandı: syncReplies'da yanıt gelince analyzePersonaFromReply ile persona güncellenir. | strategyService + emailService | Lead kalitesi |
| 5 | **Mobil uyum kontrolü** — Uygulandı: checkMobileFriendly(domain); zenginleştirmede [Mobil: uyumlu/zayıf] notu. | verificationService + useAgentDiscovery | Keşif |

---

## Özet

- **Şu an:** Genel puan **8,5 / 10**; cold pool re-engagement, bu ay teklif hedefi KPI’sı ve önceki öneriler uygulandı.
- **Hedef:** **9 – 9,5 / 10** (WhatsApp olmadan, e-posta odaklı).
- **Sonraki adım:** A/B şablon raporu ve eski site doğrulama ile 9’a yaklaşmak; hedef KPI bildirimi (toast) isteğe bağlı.

Detaylı yol haritası → **PUAN_ARTIRMA_YOL_HARITASI.md**
