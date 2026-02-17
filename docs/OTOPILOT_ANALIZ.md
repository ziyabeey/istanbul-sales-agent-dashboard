# Otopilot Algoritması — Zayıf Yönler ve Eksikler

Bu belge, otopilot döngüsünün bütünüyle takibi sonucu tespit edilen tutarsızlıklar, eksikler ve iyileştirme alanlarını özetler.

---

## 1. Akış Özeti

```
Her döngü:
  leads = api.leads.getAll()
  focusMode → allowDiscovery, allowOutreach

  Queue hesapla (computeAgentQueue) → setAgentQueue
  RL sweep (sweepTimeoutPenalties)
  [1] performLeadSanitization  → actionTaken?
  [2] performStrategyManagement
  [3] performAutoEnrichment (allowDiscovery)
  [4] performPersonaEnrichment (allowDiscovery)
  [5] performSmartDiscovery (allowDiscovery)
  [6] performInboxReplySync (allowOutreach)
  [7] performAutoReplyDrafting(leads, true) (allowOutreach)
  [8] performOutreach (allowOutreach)

  actionTaken → BURST 2s : IDLE 15s
  burstStreak > 45 → 30sn soğuma
  hata → consecutiveErrors; > 12 → stopAgentSafely
```

---

## 2. Kuyruk vs Gerçek Mantık (Enrich)

**Sorun:** `computeAgentQueue` içindeki "enrich" sayısı ile `performAutoEnrichment` hedeflediği lead seti uyuşmuyor.

| Kaynak | Koşul |
|--------|--------|
| **utils/agentQueue.ts** (enrichCount) | `isProspectLead && lead_skoru < minEnrichmentScore && l.email` → **E-postası olan, skoru 3’ten düşük** lead sayısı |
| **useAgentDiscovery.performAutoEnrichment** | `isProspectLead && !l.email && lead_skoru >= minScore` → **E-postası olmayan, skoru 3+** lead’e email aranıyor |

Yani kuyrukta “zenginleştirilecek” diye gösterilen (skor < 3 ve email var) ile gerçekte yapılan (email yok, skor ≥ 3) farklı. Kullanıcı kuyrukta yanlış/şaşırtıcı sayı görür; “enrich” etiketi yanlış kavrama karşılık gelir.

**Öneri:** Kuyrukta “enrich” sayısını, gerçekten email aranacak adaylarla eşleştir: `isProspectLead(l) && !l.email && l.lead_skoru >= minEnrichmentScore` (ve isteğe bağlı district/sector filtresi). Böylece hem sayı hem etiket doğru olur.

---

## 3. SessionStats Güncellenmiyor

**Sorun:** `sessionStats` içinde yalnızca `sanitized` artırılıyor (useAgentMaintenance). `enriched`, `discovered`, `emailed`, `drafted`, `bounced`, `errors` hiç güncellenmiyor; UI’da bu alanlar fiilen hep 0 veya eski kalıyor.

**Öneri:** İlgili hook’larda başarı/hata sonrası `setSessionStats` ile artır:

- Discovery: lead bulunduğunda `enriched += 1` (performAutoEnrichment), yeni lead eklendiğinde `discovered += addedCount` (performSmartDiscovery).
- Outreach: mail gönderildiğinde `emailed += 1`; taslak oluşturulduğunda `drafted += 1`.
- Hata: Her hook’un catch’inde `errors += 1` (veya merkezi bir “agent action failed” noktasında).

Bounced zaten syncReplies tarafında işleniyor; orada da `bounced` artırılabilir.

---

## 4. RL Ödül Sinyali — Google Sheets Modu

**Sorun:** `rewardEngine.recordReward` yalnızca `storage.updateLead` içinde, lead durumu değişince tetikleniyor. `api.leads.update` ise Sheets kullanılıyorsa `sheetsService.updateLead` çağırıyor; bu durumda `storage.updateLead` hiç çalışmıyor ve RL sinyali hiç üretilmiyor. Yani Google Sheets ile çalışırken otopilotun öğrenmesi (Q-table güncellemesi) fiilen kapalı.

**Öneri:** RL sinyalini veri kaynağından bağımsız kılmak: ya `leadsService.update` içinde (Sheets güncellemesi sonrası) durum değişimine göre `rewardEngine.recordReward` çağrılmalı, ya da tek bir “lead status changed” event’i (storage + sheets ortak) üzerinden reward tetiklenmeli.

---

## 5. Strateji Yönetimi — Ölçek

**Sorun:** `performStrategyManagement` her döngüde **tüm** lead listesi üzerinde döngüye giriyor; faz değişimleri ve 21 gün cold_pool için çok sayıda `api.leads.update` yapılabiliyor. Lead sayısı büyüdükçe döngü süresi ve API çağrısı artar.

**Öneri:** Bir döngüde işlenecek lead sayısına üst sınır (örn. 50) koymak veya sadece “phase değişebilir” lead’leri filtreleyip onları işlemek. İsteğe bağlı: güncellemeleri toplu (batch) yapmak.

---

## 6. Tek Aksiyon / Döngü Kısıtı

**Sorun:** Bir döngüde en fazla **bir** “actionTaken” alınıyor: ilk `true` dönen adımda sonrakiler atlanıyor. Örneğin sanitization 5 lead temizlese, aynı döngüde enrichment/discovery/outreach yapılmıyor. Bu tasarım sadeleştiriyor ama yoğun pipeline’da “bir döngüde tek iş” kuyruğun hızlı erimesini engelleyebilir.

**Öneri:** Kritik değil; tercih tasarımı. İstenirse “aynı döngüde en fazla N aksiyon” (örn. 2) veya “düşük maliyetli adımlar (sanitize, inbox sync) sonrası bir yüksek maliyetli (enrich, discovery, outreach) daha çalıştır” gibi kurallar eklenebilir.

---

## 7. Takip Taslağı (performAutoReplyDrafting)

**Sorunlar:**

- **draftOnly = true:** Döngüde hep `true` ile çağrılıyor; yani taslak oluşturuluyor ama otomatik gönderim yok. Bu bilinçli olabilir; ancak “drafted” sayacı artmıyor ve kullanıcı kaç taslak üretildiğini sessionStats’ta göremez.
- **İçerik:** Taslak, `predictNextMove` çıktısındaki tek bir soru/cevap (neutral/aggressive/consultative) ile üretiliyor; lead’in gerçek e-postasına “yanıt” niteliği taşımıyor. Yani “gelen mail’e göre cevap” değil, genel bir tahmin sorusuna cevap metni.

**Öneri:** En azından taslak oluşturulduğunda `setSessionStats(..., drafted: s.drafted + 1)`. İçerik için: gelen e-posta metni (inbox’tan veya interaction’dan) varsa, buna göre kısa bir “yanıt taslağı” üreten ayrı bir adım (veya `predictNextMove`’a bağlam) düşünülebilir.

---

## 8. Keşif (Discovery) — Rastgele Seçim

**Sorun:** `targetDistrict === 'Tümü'` ve `targetSector === 'Tümü'` iken district ve sector her döngüde `Math.random()` ile seçiliyor. Aynı sector/district tekrar tekrar seçilebilir; diğerleri ihmal edilebilir.

**Öneri:** Son kullanılan (district, sector) bir ref’te tutulup round-robin veya “en az keşfedilen” önceliği ile seçim yapılabilir.

---

## 9. Persona Enrichment — Sadece Eksik Olanlar

**Sorun:** Persona atama yalnızca `!l.personaAnalysis` olan lead’lere yapılıyor. Bir lead’e daha önce `{ type: 'Bilinmiyor' }` atanmışsa tekrar analiz edilmiyor; “Bilinmiyor” kalıyor.

**Öneri:** Koşulu `!l.personaAnalysis || l.personaAnalysis.type === 'Bilinmiyor'` yaparak Bilinmiyor’ları da (ör. belli bir süre sonra veya limitli sayıda) yeniden analiz etmek.

---

## 10. stopAgentSafely Mesajı

**Sorun:** `stopAgentSafely` her zaman `setAgentStatus('Durduruldu (Bütçe)')` atıyor. Oysa durdurma sebebi “12 kez kritik hata” veya başka bir neden de olabilir; kullanıcı yanlış bilgi görüyor.

**Öneri:** Sebep parametresine göre status metni seçmek (örn. bütçe → “Durduruldu (Bütçe)”, hata → “Durduruldu (Hata)”).

---

## 11. RL Sweep — Aynı Lead’e Tekrar Cezalandırma

**Sorun:** `sweepTimeoutPenalties` içinde “son 3 gün içinde bu lead için no_response_7d/14d cezası verildiyse atla” kontrolü var. 3 gün sonra aynı lead hâlâ “takipte” ve yanıt yoksa tekrar ceza yazılıyor. Bu, uzun süre yanıt gelmeyen lead’lerde aynı şablon için defalarca negatif ödül demek; Q değerini aşırı düşürebilir.

**Öneri:** Lead bazında “bu lead için 7d/14d cezası en fazla bir kez” veya “son X günde en fazla 1 kez” gibi bir kısıt eklenebilir; ya da ceza sadece ilk 7/14 gün geçişinde bir kez uygulanır, tekrarı yapılmaz.

---

## 12. Hata Sınıflandırması (consecutiveErrors)

**Sorun:** Tüm hatalar aynı sayacı (consecutiveErrors) artırıyor. Ağ/geçici hata ile “API key yok”, “yetki yok” gibi kalıcı hatalar aynı muameleyi görüyor; 12’de tam durma oluyor.

**Öneri:** Hata mesajı veya koduna göre “kalıcı” (auth, config) ise hemen durdurup kullanıcıyı uyarmak, “geçici” (network, 429) ise backoff + sayacı daha yavaş artırmak veya sadece gecikmeyi uzatmak.

---

## 13. Özet Tablo

| # | Konu | Şiddet | Özet |
|---|------|--------|------|
| 2 | Kuyruk enrich sayısı yanlış | Orta | enrichCount ile performAutoEnrichment hedefi uyuşmuyor |
| 3 | SessionStats eksik | Orta | enriched, discovered, emailed, drafted, errors artmıyor |
| 4 | RL Sheets’te çalışmıyor | Yüksek | Sheets modunda reward hiç tetiklenmiyor |
| 5 | Strateji tüm lead’lerde | Düşük | Ölçekte yavaşlama riski |
| 6 | Döngüde tek aksiyon | Bilgi | Tasarım tercihi |
| 7 | Taslak içerik / drafted sayacı | Orta | drafted artmıyor; taslak “gerçek yanıt” değil |
| 8 | Discovery rastgele | Düşük | Sector/district rotasyonu yok |
| 9 | Persona Bilinmiyor tekrar yok | Düşük | Bilinmiyor lead’ler yeniden analiz edilmiyor |
| 10 | stopAgentSafely metni | Düşük | Hep “Bütçe” yazıyor |
| 11 | RL sweep tekrar ceza | Düşük | Aynı lead’e 3 gün sonra tekrar ceza |
| 12 | Hata tipi ayrımı yok | Orta | Kalıcı/geçici hata farkı yok |

Öncelik önerisi: **4 (RL Sheets)** ve **3 (SessionStats)** sonra **2 (kuyruk enrich)**; ardından 7, 10, 12.

---

## 14. Uygulanan Öneriler (Yapılan Değişiklikler)

Aşağıdaki maddeler analiz sonrası kodda uygulandı.

| # | Madde | Yapılan |
|---|--------|--------|
| **2** | Kuyruk enrich sayısı | `utils/agentQueue.ts`: enrich sayısı artık **e-postası olmayan** ve **skor ≥ minEnrichmentScore** lead’lere göre hesaplanıyor; etiket “email aranacak” olarak güncellendi. |
| **3** | SessionStats | `setSessionStats` discovery ve outreach hook’larına geçirildi. **enriched**: email bulunduğunda; **discovered**: yeni lead eklendiğinde; **emailed**: mail gönderildiğinde; **drafted**: taslak oluşturulduğunda; **errors**: döngü catch’inde her hata için +1 artırılıyor. |
| **4** | RL Sheets modu | `services/leadsService.ts`: `update()` içinde Sheets kullanılıyorsa güncellemeden önce mevcut lead alınıyor, durum değişiminde `rewardEngine.recordReward` ve `storage.recordTemplateSuccess` tetikleniyor; RL öğrenmesi Sheets ile de çalışıyor. |
| **7** | drafted sayacı | Taslak oluşturulduğunda `setSessionStats(..., drafted: s.drafted + 1)` eklendi (`useAgentOutreach.performAutoReplyDrafting`). |
| **9** | Persona Bilinmiyor | `useAgentPersona`: Filtre `!l.personaAnalysis \|\| l.personaAnalysis.type === 'Bilinmiyor'` olarak güncellendi; “Bilinmiyor” lead’ler yeniden analiz adayı. |
| **10** | stopAgentSafely mesajı | `stopAgentSafely(reason, cause?: 'budget' \| 'error')` eklendi. Bütçe → “Durduruldu (Bütçe)”, 12 hata → “Durduruldu (Hata)” ile çağrılıyor. |
| **5** | Strateji ölçeği | `useAgentStrategy`: Döngü başına en fazla **50** güncelleme (`STRATEGY_MAX_UPDATES_PER_LOOP`); `changedCount >= 50` olunca döngü kesiliyor. |
| **8** | Discovery round-robin | `useAgentDiscovery`: `discoveryRotationRef` ile district ve sector için sıralı rotasyon; “Tümü” seçiliyken rastgele yerine sırayla Bahçeşehir → Esenyurt → Beylikdüzü ve Sağlık → Restoran → … kullanılıyor. |
| **11** | RL sweep tekrar ceza | `rewardEngine.sweepTimeoutPenalties`: Lead başına **7d cezası en fazla bir kez**, **14d cezası en fazla bir kez**; logda (son 500 kayıt) daha önce verilmişse atlanıyor. |
| **12** | Hata tipi ayrımı | `utils/agentUtils`: `isPermanentAgentError(error)` eklendi. `AgentContext` catch: **Kalıcı** (API key, yetki, 401/403) → hemen durdur, “Kalıcı hata (yetki/ayar)” mesajı. **Geçici** → mevcut sayaç + 12’de dur. |

| **6** | Döngüde çoklu aksiyon | **Kusursuz tasarım:** `docs/OTOPILOT_TASARIM.md`. Bakım her döngüde; aksiyon fazında slot kotası (2 slot: 2 hafif veya 1 ağır). |

**Tüm analiz maddeleri uygulandı.** Tek doğruluk kaynağı: `docs/OTOPILOT_TASARIM.md`.
