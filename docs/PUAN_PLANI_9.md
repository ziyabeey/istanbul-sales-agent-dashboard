# Yeni Puan Planı — 9 / 10 Hedefi

Bu belge, **PUAN_GERCEK_INCELEME.md** sonucuna göre hazırlanmıştır. A/B şablon raporu, KPI toast, 2 gün kuralı, takip süresi, hedef ayarlanabilir, sektör A/B, düşük performanslı şablonlar vb. **zaten yapılmış** kabul edilir; aşağıdaki plan **sadece yeni** adımları içerir.

**Mevcut genel puan:** 8,5 / 10  
**Hedef:** 9 / 10  
**Yaklaşım:** 6 gerçek boşluktan en az 3–4’ünü uygulayarak ortalama puanı yukarı çekmek.

---

## Plan Özeti

| # | Hedef | Alan | Öncelik | Kabul kriteri |
|---|--------|------|---------|----------------|
| 1 | Web sitesi kontrolü yenile | Lead kalitesi | Yüksek | Lead detayında veya satır aksiyonunda "Site kontrolü" butonu; tıklanınca checkLeadWebsiteByEmail + sonuç (Evet/Hayır/bilinmiyor) lead’e yazılsın ve UI güncellensin. |
| 2 | Teklif fiyat/paket ayarı | Teklif | Yüksek | Ayarlar > Genel (veya Teklif) bölümünde "Teklif fiyat aralığı veya paket bilgisi" metin alanı; generateProposal prompt’unda bu metin kullanılsın. |
| 3 | Onay bekleyen toplu aksiyon | Takip | Orta | Leads sayfasında "Yanıt/Onay Bekliyor" filteli görünümde "Seçilenleri mail gönder" / "Seçilenleri arşivle" butonları; seçim (checkbox) + toplu update. |
| 4 | En iyi sektör–şablon kartı | RL | Orta | Raporlar’da "En iyi 5 sektör–şablon" kartı veya tablo: sektör + şablon adı + başarı oranı + kullanım (templateAbReportBySector verisinden türetilebilir). |
| 5 | Otopilot durum özeti | Teknik | Orta | Otopilot/Layout panelinde "Son durum: Çalışıyor / Durduruldu. Sebep: Günlük limit / Hata (X) / Manuel." tek satır özeti. |
| 6 | Hedef ve mobil açıklamaları | UX | Düşük | Raporlarda "Bu ay hedefi" kartında kısa tooltip/açıklama: "Hedef Ayarlar > Genel’den değiştirilir." Zenginleştirme notunda [Mobil: bilinmiyor] için tooltip: "CORS nedeniyle birçok sitede tespit edilemiyor." |

---

## Uygulama Sırası (Önerilen)

1. **P1 – Teklif fiyat/paket ayarı**  
   - Etki: Teklif puanı 7,5 → 8.  
   - Dosyalar: `constants.ts` veya `storage` (yeni ayar), `Settings.tsx` (input), `aiService.ts` veya proposal prompt (metni kullan).

2. **P2 – Web sitesi kontrolü yenile**  
   - Etki: Lead kalitesi 7,5 → 8.  
   - Dosyalar: `Leads.tsx` veya lead detay modalı (buton), `verificationService.checkLeadWebsiteByEmail`, lead update.

3. **P3 – Otopilot durum özeti**  
   - Etki: Teknik 8,5 → 9.  
   - Dosyalar: `Layout.tsx` veya otopilot bileşeni; agent durumu + son sebep (limit/hata sayısı/manuel) state’ten tek cümle.

3. **P4 – En iyi sektör–şablon**  
   - Etki: RL 7,5 → 8.  
   - Dosyalar: `reportsService.ts` (templateAbReportBySector’dan en iyi 5’i seç), `Reports.tsx` (yeni kart/tablo).

4. **P5 – Onay bekleyen toplu aksiyon**  
   - Etki: Takip 7,5 → 8.  
   - Dosyalar: `Leads.tsx` (checkbox, seçim state, "Seçilenleri mail gönder" / "Arşivle" butonları, toplu update API).

5. **P6 – Açıklamalar**  
   - Etki: Kullanıcı deneyimi; puan dokümanında "net açıklama" kriteri.  
   - Raporlarda hedef kartı + Leads/Raporlarda mobil/unknown tooltip.

---

## Puan Revizyonu (Bu Plan Uygulandıktan Sonra)

- **Lead kalitesi:** 7,5 → 8 (site kontrolü yenile).  
- **Teklif:** 7,5 → 8 (fiyat/paket ayarı).  
- **Takip:** 7,5 → 8 (toplu onay aksiyonu).  
- **RL:** 7,5 → 8 (en iyi sektör–şablon).  
- **Teknik:** 8,5 → 9 (durum özeti).  

**Ortalama:** ~8,2 → **Genel puan: 9 / 10** hedeflenir.

---

## Tekrarlanmayacak Öğeler

Aşağıdakiler **zaten kodda var**; bu plana ek öneri olarak yazılmamalı:

- A/B şablon raporu ve sektör bazlı tablo  
- Bu ay teklif hedefi kartı ve "Hedef aşıldı"  
- Hedef KPI toast (Bu ay seçiliyken)  
- Aylık teklif hedefini Ayarlar’dan değiştirme  
- Düşük performanslı şablonlar (evolutionCandidates)  
- 2 gün kuralı (kodda zorunlu)  
- Takip süresi "X gün önce" ve "Teklif uygun / 2 gün dolmadı"  
- Gelen mail filtreleme (genel merkez/daemon/OOO)  
- Persona güncelleme (gelen yanıt tonu)  
- Mobil uyum notu (zenginleştirme)

Bu doküman, **PUAN_GERCEK_INCELEME.md** ile birlikte kullanılmalı; yeni geliştirmeler tamamlandıkça inceleme dokümanı güncellenip puan revizyonu yapılabilir.
