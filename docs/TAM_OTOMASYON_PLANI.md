# Tam Otomasyon ve Dörtlü İyileştirme Planı

Bu belge, **tam otomasyon** hedefi ile birlikte dikkat çeken dört iyileştirme alanını tek bir yol haritasında toplar.

---

## Hedef: Tam Otomasyon Ne Demek?

| Bugün | Tam otomasyon sonrası |
|-------|------------------------|
| Cold outreach (intro/teklif) zaten otomatik gönderiliyor. | Aynı; tek yerden **günlük limit** ve **mod** (tam otomatik / taslak onaylı) seçilebilsin. |
| Takip yanıtları: taslak oluşturuluyor, kullanıcı Mail Otomasyon’da onaylıyor. | **Seçenek:** “Takip mailleri de otomatik gönderilsin” açıldığında taslak atlanıp doğrudan `api.gmail.send` çağrılsın. |
| Ayar dağınık (bazıları Layout, bazıları Settings). | **Tek kontrol paneli:** Otopilot modu (Tam otomatik / Taslak onaylı), günlük mail limiti, hangi adımların loglanacağı. |

**Güvenlik / sınırlar (taslak):**
- Günlük gönderim üst limiti (örn. 50).
- İlk soğuk mail: her zaman otomatik (mevcut). Teklif maili: isteğe bağlı “önceden onay” (ileride).
- Takip yanıtı: “Tam otomatik” modunda otomatik; “Taslak onaylı” modunda sadece taslak.

---

## Dörtlü İyileştirme — Özet Tablo

| # | Başlık | Ne getirir? | Öncelik |
|---|--------|-------------|---------|
| **A** | **Adım bazlı süre** | Her döngüde sanitize / strategy / enrich / discovery / draft / outreach süreleri loglanır ve UI’da “Son döngü: X sn (sanitize 0.1, strategy 0.3, …)” şeklinde görünür. | P1 |
| **B** | **Tam otomasyon anahtarı** | Tek ayar: “Takip mailleri otomatik gönderilsin” + “Günlük mail limiti”. Otopilot modu (tam otomatik / taslak onaylı) Layout veya Settings’te tek yerde. | P0 |
| **C** | **Entegrasyon testleri** | Mock API ile tek döngü: kuyruk → bakım → slot’lı aksiyonlar. Circuit breaker, slot kotası, hata sayacı davranışı doğrulanır. | P2 |
| **D** | **Ürün tamamlama** | Login akışı, raporlar sayfası, takvim, mail otomasyon sayfası tutarlılığı — liste ve kısa aksiyonlar. | P2 |

---

## Fazlara Göre Aksiyon Planı

### Faz 0 — Tam otomasyon anahtarı (P0) ✅

**Hedef:** Kullanıcı “tam otomatik” veya “taslak onaylı” modunu tek yerden seçsin; takip mailleri buna göre gönderilsin veya sadece taslak kalsın.

| Adım | Yapılacak | Çıktı |
|------|-----------|--------|
| [x] 0.1 | `AgentConfig` veya Settings’e `autoSendFollowUp: boolean` ve `dailyEmailCap: number` ekle. | Config tipi + varsayılan (örn. autoSendFollowUp: false, dailyEmailCap: 50). |
| [x] 0.2 | `useAgentOutreach.performAutoReplyDrafting` içinde: `draftOnly = !config.autoSendFollowUp` kullan; günlük limit kontrolü ekle (sessionStats.emailed + drafted ile karşılaştır). | Takip yanıtları moda göre taslak veya doğrudan gönderim. |
| [x] 0.3 | Layout / Hızlı Ayarlar veya Settings’te “Takip mailleri: Otomatik gönder / Sadece taslak” ve “Günlük mail limiti” UI. | Tek yerden tam otomasyon kontrolü. |

**Doğrulama:** Taslak onaylı modda taslak oluşur, tam otomatik modda aynı senaryoda mail gider; limit aşılırsa o gün yeni gönderim yapılmaz.

---

### Faz 1 — Adım bazlı süre (P1) ✅

**Hedef:** Her döngüde hangi adımın ne kadar sürdüğü görülsün; yavaş adımlar kolay tespit edilsin.

| Adım | Yapılacak | Çıktı |
|------|-----------|--------|
| [x] 1.1 | `sessionStats` içine `lastLoopStepMs: Record<string, number>` ekle (sanitize, strategy, inbox_sync, enrich, persona, discovery, draft, outreach). | Her adımın ms cinsinden süresi. |
| [x] 1.2 | AgentContext (veya ilgili hook) döngüde her adım öncesi/sonrası `performance.now()` ile süre ölç; adım bitince `lastLoopStepMs[step] = elapsed`. | Döngü sonunda tüm adım süreleri dolu. |
| [x] 1.3 | Layout’ta “Son döngü” yanında veya küçük bir tooltip/genişletilmiş blokta adım bazlı süreleri listele (örn. “sanitize 0.1s, strategy 0.3s, outreach 1.2s”). | Gözlemlenebilirlik artar. |

**Doğrulama:** Bir döngü çalıştıktan sonra UI’da en az bir adımın süresi 0’dan büyük görünür.

---

### Faz 2 — Entegrasyon testleri (P2) ✅

**Hedef:** Otopilot döngüsü mock’larla tek testte çalışsın; slot, circuit breaker, hata sayacı doğrulansın.

| Adım | Yapılacak | Çıktı |
|------|-----------|--------|
| [x] 2.1 | Slot ve circuit breaker için test edilebilir yardımcılar: `utils/agentLoopSlots.ts`, `utils/circuitBreaker.ts`. | Slot ve circuit mantığı birim testlerle doğrulanır. |
| [x] 2.2 | Test: “Bir döngüde slot kotasına uyulur (en fazla 2 hafif veya 1 ağır)”. | `utils/agentLoopSlots.test.ts` — computeSlotsUsed. |
| [x] 2.3 | Test: “Gmail circuit açıkken outreach atlanır”. | `utils/circuitBreaker.test.ts` — isOpen/record. |
| [x] 2.4 | Test: “Kalıcı hata sonrası agent durur”. | `utils/agentUtils.test.ts` — isPermanentAgentError zaten test ediliyor. |

**Doğrulama:** `npm run test` ile yeni testler geçer (132 test).

---

### Faz 3 — Ürün tamamlama (P2) ✅

**Hedef:** Login, raporlar, takvim, mail otomasyon sayfalarının eksiklerini listeleyip kısa aksiyonlara böl.

| Alan | Kontrol listesi | Aksiyon (kısa) |
|------|------------------|----------------|
| **Login** | Token yenileme, hata mesajları, yönlendirme | ✅ Dokümante edildi. İleride: şifre sıfırla. |
| **Raporlar** | Grafikler yükleniyor mu, boş veri durumu | Boş/hata state UI kısa iş olarak not edildi. |
| **Takvim** | Entegrasyon (Google Calendar?), görevlerle bağ | İleride notu eklendi. |
| **Mail otomasyon** | Taslak onayı, “Tam otomatik” modu bu sayfayla uyumlu mu | Mod Layout config’ten; uyumlu. |

**Çıktı:** **docs/URUN_CHECKLIST.md** — her alan için “Yapıldı / Kısa iş / İleride” checklist.

---

## Özet Zaman Çizelgesi (Öneri)

```
Faz 0 (Tam otomasyon anahtarı)     → 1–2 gün   ← Önce bu
Faz 1 (Adım bazlı süre)            → 1 gün
Faz 2 (Entegrasyon testleri)       → 1–2 gün
Faz 3 (Ürün tamamlama checklist)  → 0.5 gün (liste + küçük düzeltmeler)
```

---

## Bu Planla İlgili Referanslar

- **Otopilot davranışı:** `docs/OTOPILOT_TASARIM.md`
- **Mevcut slot / döngü:** `context/AgentContext.tsx`, `hooks/agent/useAgentOutreach.ts`
- **Mail gönderim:** `services/gmailService.ts` `sendEmail`, `services/emailService.ts` `send`
- **Config:** `constants.ts` veya `context/AgentContext` içindeki agent config yapısı

Bu plan uygulandıkça ilgili fazların maddeleri işaretlenebilir (örn. `[x]`). **Tüm fazlar (0–3) uygulandı.** Ürün checklist: **docs/URUN_CHECKLIST.md**
