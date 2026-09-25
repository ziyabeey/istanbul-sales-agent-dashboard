# Google ADK Recipes → Kepenk Pattern Library

> Tarih: 25 Eylül 2026  
> Kaynak: `google/adk-recipes`  
> Statü: **Araştırma / mimari referans**. Bu belge hiçbir Google recipe'ını production authority yapmaz ve mevcut Kepenk Core, Supabase/PostgreSQL, Randevu veya Vercel sınırlarını değiştirmez.

## 1. Amaç

Google ADK Recipes deposundaki örnekler, Kepenk'in mevcut tasarımında zaten tanımlı olan bazı zor problemler için uygulanmış referans desenler sunuyor. Amaç örnekleri kopyalamak değil; aşağıdaki parçaları seçici biçimde incelemek:

- event-driven agent workflow
- deterministic rule + LLM ayrımı
- human-in-the-loop
- büyük belge koleksiyonlarını batch işleme
- agent OAuth / kullanıcı onayı
- long-horizon agent harness
- cross-session memory
- tool/sandbox guardrails
- RAG ve semantic product search
- multi-agent research / critique
- LLM fact audit
- SDLC refinement / technical design / task planning
- GenMedia generate → evaluate → retry döngüsü

Değişmez Kepenk ilkesi:

`FACT != DECISION != ACTION`

Model veya ajan; booking, ödeme, stok, tenant, permission veya canonical state otoritesi değildir.

---

## 2. Yüksek öncelikli pattern'ler

### A. High-Volume Document Analyzer

Kaynak:
`python/agents/high-volume-document-analyzer`

Recipe'ın gösterdiği mekanizmalar:

- dosyaları Vector DB veya GCS'e taşımadan harici sistemden güvenli proxy ile alma
- Secret Manager üzerinden downstream credential çözümü
- PDF, text, HTML ve image byte stream'lerini doğrudan multimodal Gemini girdisine verme
- configurable batch processing
- `ToolContext.state` ile batch cursor/state tutma
- paralel indirme
- cevap erken bulunursa taramayı durdurma
- inner multimodal Gemini + outer orchestration ayrımı
- 500 dokümana kadar needle-in-haystack eval senaryosu

Kepenk karşılığı:

`Document / External Source → Batch Analyzer → typed observations → Evidence Spine`

Potansiyel kullanım:

- sözleşme
- fatura
- fiyat listesi
- katalog
- rapor
- hukuki/operasyonel dosya
- müşteri doküman koleksiyonları

Alınacak fikir:
**ham dokümanı memory/authority yapmak yerine provenance ile typed evidence üretmek.**

Alınmayacak fikir:
LLM çıktısını doğrudan business truth kabul etmek.

---

### B. Ambient Expense Agent

Kaynak:
`core/python/ambient-expense-agent`

Recipe'ın gösterdiği mekanizmalar:

- Pub/Sub ile ambient/event-driven tetikleme
- ADK graph workflow
- deterministic business rule'ların kodda tutulması
- düşük riskli akışın LLM çağırmadan tamamlanması
- yüksek riskli akışın LLM review'a gitmesi
- `RequestInput` ile human-in-the-loop pause/resume
- Cloud Run backend + approval UI
- structured log → Monitoring alert
- IAP ile approval yüzeyi

Kepenk karşılığı:

`Event → Fact → Deterministic Policy → [low risk action | LLM/JEV review] → Action Card/HITL → Outcome`

Bu pattern Action Card, Decision Engine ve Controlled Autonomy için doğrudan teknik referanstır.

Alınacak fikir:
**deterministic rules önce, model yalnız gerekli judgment noktasında.**

Alınmayacak fikir:
örnekteki sabit expense threshold'u veya domain mantığını Kepenk'e taşımak.

---

### C. OAuth User Consent Flow

Kaynak:
`core/python/oauth-user-consent-flow`

Recipe'ın gösterdiği mekanizmalar:

- local ADK ve production Agent Runtime için tek OAuth code path
- üç aşamalı credential negotiation:
  1. state içindeki cached/injected token
  2. completed auth response
  3. explicit credential request / consent
- production'da Gemini Enterprise tarafından token injection
- OAuth client secret'ın agent/model akışına taşınmaması
- kullanıcı adına Google Drive API erişimi
- authorization resource ile production consent bağlantısı

Kepenk karşılığı:

- F25 Booking Gateway
- F26 Agent Interop & Distribution
- external agent capability consent
- kullanıcı adına bağlı uygulama erişimi
- Google Workspace / partner connector yetkileri

Alınacak fikir:
**capability erişimi kullanıcı onayı ve kısa ömürlü/delegated credential ile açılır; prompt izin değildir.**

Alınmayacak fikir:
Google-specific auth mekanizmasını bütün vendor'ların canonical auth modeli yapmak.

---

### D. Long Horizon Harness

Kaynak:
`core/python/long-horizon-harness`

Recipe'ın gösterdiği mekanizmalar:

- cross-session Memory Bank
- preloaded memory
- background memory extraction / consolidation
- nightly cross-session review
- per-user sandbox
- per-user Secret Manager entegrasyonu
- modelin secret değerini görmeden sandbox'a secret injection
- A2A-native interface
- blocking veya background sub-agent delegation
- dynamic `SKILL.md` / script loading
- scheduled chats
- resumability
- conversation compaction
- iteration-budget / no-progress / repeated-failure halts
- structured user feedback
- Agent Platform Sessions + Memory Bank + Sandbox kombinasyonu

Kepenk karşılığı:

- Company AI Work
- Internal Alpha
- Agent Mesh
- uzun süreli görevler
- kullanıcıya özel tool/runtime
- per-user secret boundary
- scheduled operating routines

Önemli sınır:
Memory Bank **Evidence Spine yerine geçmez**. Preference, workflow context ve kullanıcı çalışma hafızası için kullanılabilir; canonical business truth/evidence ayrı tutulur.

Maliyet notu:
Recipe'ın referans deployment'ı warm Cloud Run + Cloud SQL içerir. Bu nedenle bugün aynen deploy edilmesi değil, interface/pattern madenciliği hedeflenir.

---

## 3. İkinci öncelik pattern'leri

### E. LLM Auditor

Kaynak:
`python/agents/llm-auditor`

Mekanizmalar:

- LLM çıktısından doğrulanabilir claim çıkarma
- Google Search ile grounding/fact checking
- claim-level audit report
- isteğe bağlı corrected rewrite

Kepenk karşılığı:

`model output → claims → evidence check → supported / contested / unknown`

RECAP / Evidence quality / shadow verification için aday.

Sınır:
Auditor verdict'i canonical fact değildir; Evidence Spine'a kaynak/provenance ile ek kanıt üretir.

---

### F. Deep Search

Kaynak:
`python/agents/deep-search` ve `core/python/deep-search`

Mekanizmalar:

- önce araştırma planı
- human-in-the-loop plan approval
- outline
- iterative search
- critic/gap detection
- follow-up research
- citation-aware report composition

Kepenk karşılığı:

- araştırma modu
- RECAP evidence acquisition
- uzun araştırma raporları
- kullanıcı onaylı araştırma planı

Sınır:
Bu akış production transaction authority değildir.

---

### G. Software Bug Assistant

Kaynak:
`python/agents/software-bug-assistant`

Mekanizmalar:

- PostgreSQL ticket database
- GitHub MCP
- RAG
- Google Search
- StackOverflow retrieval
- duplicate/related bug retrieval
- developer/support triage

Kepenk karşılığı:

- mevcut geliştirme motoru
- CI failure triage
- issue/PR/evidence retrieval
- geçmiş hata çözümü hatırlama

Doğrudan agent transplant yerine retrieval + evidence + tool contract desenleri incelenir.

---

### H. SDLC Agent Trio

Kaynaklar:

- `python/agents/sdlc-user-story-refiner`
- `python/agents/sdlc-technical-designer`
- `python/agents/sdlc-task-planner`

Zincir:

`raw request → refined user story + BDD acceptance → RFC/ADR architecture → bounded implementation plan`

Kepenk geliştirme motoruna alınabilecek parçalar:

- structured clarification
- BDD acceptance criteria
- code knowledge graph ile teknik bağlam
- ADR/RFC formatı
- dependency-aware task decomposition
- branch/task sizing

Yeni üç agent açmak zorunlu değildir; mevcut YAZAR → Tester → R0/R1/R2 zincirinde contract/prompt deseni olarak kullanılabilir.

---

### I. Data Science Multi-Agent

Kaynak:
`python/agents/data-science`

Mekanizmalar:

- orchestrated sub-agents
- BigQuery / AlloyDB
- NL2SQL
- NL2Py
- BQML
- Code Interpreter
- cross-dataset join configuration

Kepenk karşılığı:

- analytics / research sandbox
- Sector Intelligence
- RECAP measurement exploration

Sınır:
production authority veya autonomous SQL writer olarak değil; bounded analysis yüzeyi olarak değerlendirilir.

---

## 4. Social / Commerce pattern'leri

### J. On-Brand GenMedia / GenMedia for Commerce

Kaynaklar:

- Google Cloud Agent Garden: On-Brand GenMedia
- `core/python/genmedia-for-commerce`

Mekanizmalar:

- brand asset/policy retrieval
- prompt enrichment
- image/video generation
- multiple candidates
- automated scoring/evaluation
- validation
- retry/regeneration
- product catalog vector search
- image/video virtual try-on
- GCS artifact handling

Kepenk karşılığı:

`Brand Context → Generate Candidates → Rubric/Checker → Refine/Retry → Draft Asset → Action Card → Human Approval`

Ana kullanım:
**Kepenk Social / Creative Engine**

İkincil kullanım:
Commerce catalog enrichment.

Sınır:
üretilen asset önce draft'tır; otomatik publish authority verilmez.

---

### K. Retail Product Search Skill

Kaynak:
`skills/retail/product-search`

Mekanizmalar:

- BigQuery catalog
- Vertex AI Vector Search
- `gemini-embedding-001`
- semantic product intent search
- structured catalog schema
- explicit cleanup tooling

Kepenk karşılığı:

- Tedarik semantic procurement
- Commerce catalog discovery
- intent → real SKU mapping

Sınır:
sonuç yalnız indexed canonical catalog içinden gelmeli; LLM yeni ürün/SKU uyduramaz.

Not:
Recipe dokümanında Vector Search 2.0 için `us-central1` kullanıldığı belirtiliyor. Kepenk'in Avrupa veri/latency gereksinimleri ayrı değerlendirilmelidir.

---

### L. Personalized Shopping

Kaynak:
`python/agents/personalized-shopping`

Mekanizmalar:

- catalog search/click environment
- text + image search
- conversational memory
- preference-aware recommendation
- tool trajectory / response quality eval

Kepenk karşılığı:

- kullanıcı tercih modeli
- Tedarik / Commerce recommendation
- UX personalization

En değerli parça:
**evaluation yaklaşımı ve tool trajectory ölçümü.**

---

### M. TypeScript Customer Service Agent

Kaynak:
`typescript/agents/customer_service`

Mekanizmalar:

- Google ADK TypeScript
- tool/capability contracts
- product availability
- cart mutation
- appointment availability
- appointment scheduling
- approval
- CRM update
- email/SMS
- multimodal input

Kepenk karşılığı:

- Booking Gateway capability surface
- TypeScript agent/tool ergonomisi
- customer-facing external-agent adapter

Sınır:
Recipe backend tools'u mock'tur; production implementation kanıtı değildir.

---

## 5. Kepenk'e birleşik yerleşim

```text
External docs / events / catalogs
              |
              v
   Evidence acquisition layer
   - Document Analyzer
   - Deep Search
   - LLM Auditor
   - Product Search
              |
              v
        Evidence Spine
              |
              v
        JEV typed facts
              |
              v
    Deterministic Decision Engine
              |
       +------+------+
       |             |
   low risk      judgment needed
       |             |
     Action       Agent/LLM
       |             |
       +------v------+
          Action Card
              |
        Human / bounded autonomy
              |
            Outcome

Social      -> GenMedia generate/evaluate/retry
Company AI -> Long Horizon patterns
Dev Engine  -> Bug Assistant + SDLC contracts
External AI-> OAuth consent + A2A + Booking Gateway
Tedarik     -> Semantic Product Search
```

---

## 6. İnceleme / adaptasyon sırası

Kod madenciliği sırası:

1. **Ambient Expense Agent**
   - graph routing
   - deterministic rule node
   - HITL pause/resume
   - authenticated event trigger
   - structured logging / approval

2. **High-Volume Document Analyzer**
   - stateful batching
   - early-stop
   - secure proxy
   - provenance-friendly extraction

3. **OAuth User Consent Flow**
   - credential negotiation
   - injected delegated token
   - consent boundary

4. **Long Horizon Harness**
   - guardrails
   - resumability
   - per-user sandbox/secrets
   - A2A/sub-agent
   - memory separation

5. **GenMedia for Commerce / On-Brand GenMedia**
   - candidate generation
   - scoring
   - retry
   - artifact pipeline

6. **LLM Auditor + Deep Search**
   - claim audit
   - research/critic loop

7. **SDLC / Bug Assistant**
   - development-engine prompt/tool contracts

8. **Product Search / Personalized Shopping**
   - Tedarik/Commerce semantic retrieval + evaluation

---

## 7. Karar

Bu kaynaklar **yeni Kepenk mimarisi değildir**. Mevcut Kepenk planını doğrulamak, riskli parçaları daha önce uygulanmış örneklerden öğrenmek ve gerektiğinde küçük mekanizmaları taşımak için referans kütüphanesidir.

Varsayılan politika:

**copy product ≠ copy pattern**

Her dış pattern:
1. mevcut Kepenk invariant'larına göre incelenir,
2. en küçük işe yarayan mekanizma ayrılır,
3. shadow/test ortamında ölçülür,
4. ancak ölçülmüş net değer üretirse authority kazanır.
