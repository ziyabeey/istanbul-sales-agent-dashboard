# Otopilot Ajanı — Kusursuz Tasarım

Bu belge, otopilotun tek doğruluk kaynağı (single source of truth) olacak şekilde döngü semantiği, aksiyon sınıfları ve kuralları tanımlar.

---

## 1. Amaç ve İlkeler

- **Güvenilirlik:** Hata durumunda davranış öngörülebilir; kalıcı/geçici ayrımı net.
- **Adillik:** Tüm lead tipleri (enrich, draft, outreach) öncelik sırasına göre işlenir; tek tip iş döngüyü bloke etmez.
- **Verim:** Bakım işleri her döngüde çalışır; pipeline hızlı ilerler.
- **Rate limit / bütçe:** Aynı döngüde tek “ağır” aksiyon (keşif veya mail gönderimi) ile aşırı yük ve spam önlenir.

---

## 2. Aksiyon Sınıfları

| Sınıf | Adımlar | Açıklama |
|-------|---------|----------|
| **Bakım** | `sanitize`, `strategy`, `inbox_sync` | Veri bütünlüğü ve senkronizasyon. **Her döngüde çalışır**, aksiyon kotasına dahil değil. |
| **Hafif** | `enrich`, `persona`, `draft` | Tek lead odaklı, AI/API kullanır; 1 slot sayılır. |
| **Ağır** | `discovery`, `outreach` | Rate limit ve bütçe kritik; 2 slot sayılır (döngüde en fazla bir ağır). |

---

## 3. Döngü Semantiği

### 3.1 Sıra (değişmez)

1. `leads` al, kuyruk hesapla, RL sweep.
2. **Bakım (her zaman):** `performLeadSanitization` → `performStrategyManagement` → `performInboxReplySync` (outreach izinliyse).
3. **Aksiyonlar (slot kotasına göre):** Öncelik sırasıyla:
   - `performAutoEnrichment` (hafif)
   - `performPersonaEnrichment` (hafif)
   - `performSmartDiscovery` (ağır)
   - `performAutoReplyDrafting` (hafif)
   - `performOutreach` (ağır)

### 3.2 Slot kotası

- **Döngü başına toplam slot = 2.**
- Hafif aksiyon = **1 slot**, ağır aksiyon = **2 slot**.
- İzin verilen kombinasyonlar: **2 hafif** veya **1 ağır** (2 hafif + 1 ağır aynı döngüde yok).
- Bir adım `true` döndüğünde slot tüketilir; slot kalmadıysa (≥2) döngü o adımda kesilir, sonraki adımlar atlanır.

### 3.3 Zamanlama

- **En az bir aksiyon yapıldıysa (slot tüketildiyse):** Sonraki döngü **BURST_INTERVAL** (2 sn) sonra.
- **Hiç aksiyon yapılmadıysa:** **IDLE_INTERVAL** (15 sn) sonra.
- **Burst streak > 45:** 30 sn soğuma, sonra döngü devam.

---

## 4. Hata ve Durdurma

- **Kalıcı hata:** Hemen durdur; mesaj “Kalıcı hata (yetki/ayar)”.
- **Geçici hata:** Sayaç artar; 12’de “Durduruldu (Hata)”.
- Bakım adımlarındaki hata döngüyü kesmez; sadece loglanır (ve isteğe bağlı `sessionStats.errors`). Kritik hata yalnızca aksiyon adımlarından veya `getLeads`/queue’dan gelirse sayaca yansır.

---

## 5. Özet Karar Tablosu

| Koşul | Sonuç |
|-------|--------|
| Bakım adımı | Her döngüde çalışır; slot tüketmez. |
| Hafif adım true | +1 slot; slot < 2 ise sıradaki adıma geç. |
| Ağır adım true | +2 slot; döngü aksiyon fazı biter. |
| Slot ≥ 2 | Aksiyon fazı biter, zamanlama burst/idle’a göre. |
| focusMode | discovery_only → discovery adımları; outreach_only → outreach adımları; balanced → hepsi. |

Bu tasarım ile pipeline tek bir iş tipine takılmaz, bakım sürekli yapılır ve aynı döngüde en fazla bir keşif veya bir mail gönderimi yapılır (kusursuz davranış).

---

## 6. Gelecek İyileştirmeler

Aşağıdaki başlıkların büyük kısmı uygulandı. İleride “kusursuzluk+” için adım bazlı süre logu vb. değerlendirilebilir.

| # | Başlık | Durum |
|---|--------|--------|
| 1 | **Takip taslağı içeriği** | ✅ Yapıldı. `lead.notlar` → son `[Inbox]:` satırı; `api.ai.generateReplyDraft(lead, snippet)`; yoksa predictNextMove. |
| 2 | **Bounced sayacı** | ✅ Yapıldı. `syncReplies` → `bouncedCount`; `setSessionStats(..., bounced)`. Layout’ta “Geri Dönen” kutusu. |
| 3 | **Bakım hatalarında errors sayacı** | ✅ Yapıldı. Bakım try/catch içinde `sessionStats.errors + 1`. |
| 4 | **Strateji batch güncelleme** | ✅ Yapıldı. `storage.updateLeads`, `leadsService.updateMany`; strateji döngüsü toplu `updateMany`. |
| 5 | **Circuit breaker** | ✅ Yapıldı. gmail/ai için 5 dk pause; hook’larda `isCircuitOpen` / `recordCircuitFailure`. |
| 6 | **Gözlemlenebilirlik** | ✅ Kısmen. `sessionStats.lastLoopMs` + Layout’ta “Son döngü: X sn”. Adım bazlı süre: ileride. |
| 7 | **Yapılandırılabilir slot/burst** | ✅ Yapıldı. `AgentConfig`: slotCount, burstIntervalMs, idleIntervalMs, cooldown*, speedProfile (agresif/dengeli/tasarruf). |

---

## 7. Aksiyon Planı

Uygulama ve doğrulama için önerilen sıra. Her madde tamamlandığında işaretlenebilir.

### Faz 1 — Temel (tamamlandı kabul)
- [x] Kuyruk enrich sayısı / etiket düzeltmesi
- [x] SessionStats (enriched, discovered, emailed, drafted, errors) güncellemeleri
- [x] RL ödülünün Sheets modunda tetiklenmesi
- [x] stopAgentSafely sebep parametresi (bütçe/hata)
- [x] Persona “Bilinmiyor” yeniden analiz
- [x] Strateji döngü limiti (50)
- [x] Discovery round-robin (district/sector)
- [x] RL sweep tekrar ceza kısıtı (lead başına bir kez)
- [x] Hata tipi ayrımı (kalıcı/geçici)
- [x] Kusursuz döngü: bakım her zaman + slot kotası (2 slot)

### Faz 2 — İyileştirmeler (kısa vade) ✅
- [x] **Takip taslağı içeriği:** `lead.notlar` içindeki son `[Inbox]:` satırı ile `api.ai.generateReplyDraft(lead, lastEmailSnippet)`; yoksa predictNextMove fallback.
- [x] **Bounced sayacı:** `emailService.syncReplies` dönüşüne `bouncedCount` eklendi; `performInboxReplySync` içinde `setSessionStats(..., bounced: s.bounced + result.bouncedCount)`.
- [x] **Bakım hatalarında errors:** Bakım try/catch içinde `setSessionStats(..., errors: s.errors + 1)`.

### Faz 3 — Dayanıklılık ve gözlem (orta vade) ✅
- [x] **Circuit breaker:** `circuitBreakerRef` (gmail/ai), `isCircuitOpen`, `recordCircuitFailure`; 5 dk pause. Hook’larda ilgili adım başında kontrol, catch’te kayıt.
- [x] **Metrikler:** `sessionStats.lastLoopMs` her döngü sonunda set; Layout’ta “Son döngü: X sn” gösterimi.
- [x] **Yapılandırılabilir parametreler:** `AgentConfig`: slotCount, burstIntervalMs, idleIntervalMs, cooldownThreshold, cooldownDurationMs, speedProfile. Döngüde config/profil varsayılanları kullanılıyor.

### Faz 4 — Opsiyonel ✅
- [x] **Strateji batch:** `storage.updateLeads`, `leadsService.updateMany`; `useAgentStrategy` güncellemeleri toplu yapıp tek `updateMany` çağrısı.
- [x] **A/B profil:** `speedProfile`: agresif / dengeli / tasarruf. Layout Hızlı Ayarlar’da select; profil değerleri slot, burst, idle, cooldown varsayılanlarını belirliyor.

### Test ve geliştirme
- **utils/agentQueue.test.ts:** Enrich mantığı güncellendi (e-postası yok + skor ≥ min); “email aranacak” etiketi ve dışlama senaryoları test ediliyor.
- **utils/agentUtils.test.ts:** `getErrorMessage`, `isPermanentAgentError`, `isSystemMailbox` birim testleri.
- **services/__tests__/rewardEngine.test.ts:** `sweepTimeoutPenalties` için “lead başına en fazla bir kez ceza” senaryosu eklendi.
- **services/__tests__/storage.test.ts:** `updateLeads` toplu birleştirme ve boş dizi davranışı. `vitest-setup.ts` ile localStorage stub’ı tüm testler için tanımlı.

**Tam otomasyon ve dörtlü iyileştirme:** Yol haritası ve fazlar için → **docs/TAM_OTOMASYON_PLANI.md**
