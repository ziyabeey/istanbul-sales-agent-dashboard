# KEPENK Söküm Planı

> **Durum:** Mevcut söküm çalışmalarının korunmuş ve repo ile doğrulanmaya başlayan anlık görüntüsü  
> **Tarih:** 2026-09-15  
> **Kapsam:** SÖKÜM 01–24  
> **Amaç:** Önce bulunan kararları kaybetmeden tek yerde toplamak. Gereksizleri temizleme, eksikleri tamamlama ve kod değişiklikleri sonraki doğrulama turlarında yapılacaktır.

## 0. Bu dosya ne değildir?

Bu belge yeni baştan tasarlanmış nihai Kepenk mimarisi değildir. Söküm sohbetlerinde elde edilen mevcut kararların, bulguların ve açıkların kanonik arşividir.

Bu aşamada:

- Kod silinmeyecek.
- Büyük refactor yapılmayacak.
- Belirsiz bir karar kesinmiş gibi yazılmayacak.
- `apps/randevu-server` söküm kapsamına alınmayacak ve bu plan nedeniyle değiştirilmemelidir.
- `AT / DROP` notu görülen parçalar hemen silinecek şeyler değil, sonraki doğrulama turunda kaldırılmaya aday parçalardır.

İkinci aşamada her madde canlı repo ile yeniden doğrulanacak ve `KEEP / REWRITE / DROP / BUILD` etiketi kesinleştirilecektir.

---

# 1. Hedef mimari katmanları

Söküm boyunca tekrar tekrar ortaya çıkan ana omurga şudur:

1. **Business Facts / SSOT**
2. **Site Generator / Theme / Preview / Publish**
3. **Domain Resolver / Public Runtime**
4. **Customer Core / CRM / Identity / Consent**
5. **Messaging / Inbox / Lifecycle Campaigns**
6. **Marketing / Ads / Attribution / Analytics**
7. **Commerce Core**
8. **Payments / Billing / Package / Quota**
9. **Booking ↔ Finance policy bridge**
10. **Finance Core / Immutable Ledger**
11. **Worker / Queue / Durable Jobs / Outbox**
12. **Agent Runtime / Capability Bus / Model Gateway**
13. **RAG / Business Memory / Collective Intelligence**
14. **Integrations / Provider adapters**
15. **Audit / Observability / RBAC / Idempotency**

Ana prensip: **bir domain için tek otorite, domainler arasında açık sözleşme ve event tabanlı entegrasyon.**

---

# 2. Numaralandırma ve uzlaştırma notu

Eski söküm konuşmalarında birkaç numara başlığı zaman içinde kaymış veya aynı kabiliyet farklı isimle anılmış durumda. Bu belge bunu gizlemiyor.

- **SÖKÜM 11** için en güçlü ve doğrudan kayıt: **Local Site Renderer**.
- **SÖKÜM 12** için en güçlü ve doğrudan kayıt: **Payment + Package + Quota + İyzico**.
- Daha eski bir ara özette AI/Business tarafındaki başka bir katman yanlışlıkla SÖKÜM 12 diye anılmış. Bu dosyada kabiliyet bazlı doğru yerleşim korunur ve numara çakışması borç olarak not edilir.
- **SÖKÜM 05–07** için karar kümeleri kurtarıldı ancak üç numaranın birebir başlık ayrımı kesin değil. Bu yüzden tek küme halinde tutuluyor ve sonraki doğrulamada ayrıştırılacak.
- **SÖKÜM 13** kapsamı net, ayrıntılı nihai verdict kaydı kısmi.
- **SÖKÜM 23** 2026-09-15 güncel `main` üzerinden yeniden doğrulandı ve kapatıldı.
- **SÖKÜM 24** yeni açık frontier'dır.
- Eski söküm notlarında geçen bazı dosya adları güncel `main` ile drift etmiş olabilir. Bundan sonra her verdict'te **tarihsel karar** ile **bugünkü repo kanıtı** ayrı tutulacaktır.

---

# 3. Kanonik söküm haritası

| No | Kabiliyet | Durum | Ana karar |
|---|---|---|---|
| 01 | Business Facts / Site Data Foundation | Karar var | Tek Business Profile SSOT |
| 02 | Business → Public Site Projection | Karar var | Deterministik ve versioned projection |
| 03 | Local Site Preview / Draft Pipeline | Karar var | Immutable, typed pipeline |
| 04 | Theme / Template Engine | Karar var | Premium renderer korunur, codegen sınırı yeniden yazılır |
| 05–07 | Preview / Editor / Publish boundary cluster | Uzlaştırılacak | Tek typed contract ve artifact sınırı |
| 08 | Domain Resolver + Multi-Site Projection | Karar var | Tek domain resolve authority |
| 09 | CRM + Customer Identity + History | Karar var | Customer + activities tek çekirdek |
| 10 | WhatsApp + Inbox + AI Customer Assistant | Karar var | Tek provider wiring, identity-aware conversation |
| 11 | Local Site Renderer | Karar var | Component Registry + typed specs |
| 12 | Payment + Package + Quota + İyzico | Karar var | Tek billing/entitlement authority |
| 13 | Commerce Core | Kısmi | Product/variant/inventory/order tek otorite |
| 14 | CRM runtime verification | Karar var | Mevcut çift CRM authority birleştirilecek |
| 15 | Campaign / Lifecycle Messaging | Karar var | Tek message intent + durable send path |
| 16 | Marketing / Ads / CMO | Karar var | Observe → Decide → Act, gerçek outcome/audit |
| 17 | Growth Engine / Attribution + Analytics Spine | Karar var | Tek event/revenue/attribution truth |
| 18 | Agent Runtime + Capability Bus | Karar var | Üç runtime dünyası teke inecek |
| 19 | RAG / Collective Intelligence / Business Memory | Karar var | Provenance + tenant-safe RAG |
| 20 | Customer Core / CRM Authority | Karar var | CRM v2 authority, legacy compatibility shell |
| 21 | Finance Core / Immutable Financial Event | Karar var | Immutable ledger tek mali gerçek |
| 22 | Booking ↔ Finance Payment Policy | Karar var | Pure calculator + idempotent intents |
| 23 | Kapora / Ön Ödeme / Kısmi Tahsilat / No-Show | Karar var | Booking policy/snapshot; Payment + Settlement + Refund ayrı authority |
| 24 | Durable Jobs / Outbox / Webhook Inbox / Reconciliation | AÇIK | Sıradaki söküm frontier'ı |

---

# 4. SÖKÜM 01: Business Facts / Site Data Foundation

## Bulgu

İşletme ve site bilgileri birden fazla kaynaktan geliyor. File I/O, Firestore, local settings, module config ve varsayılan değerler aynı gerçeğin farklı kopyalarını oluşturabiliyor.

İlgili bulunan katmanlar:

- `lib/data.ts`
- `lib/siteSettings.ts`
- `lib/business-config.ts`
- `lib/modules.ts`
- `lib/languagePack.ts`
- `modules.json`
- `data/settings.json`
- theme/template girdileri

## KEEP

- Olgun modül ayrımları.
- Saf dönüşüm yardımcıları.
- İşletme metadata kavramı.
- Dil, tema, modül, iletişim ve çalışma saati gibi domain verileri.

## REWRITE

Tek bir canonical **Business Profile** tanımlanmalı:

- business identity
- sektör / industry
- marka / brand
- iletişim
- adres / konum
- çalışma saatleri / timezone
- currency / language
- catalog / services
- appointment rules
- theme ID
- publish config
- integration config

Backend authoritative olmalı. Frontend yalnız gösterim ve kontrollü edit kabuğu olmalı.

Field alias'ları normalize edilmeli. Bir alanın üç farklı isimle gerçek kabul edilmesi bırakılmalı.

## DROP adayı

- Aynı işletme gerçeği için paralel default otoriteleri.
- Runtime'da sessiz fallback ile gerçeği değiştiren config kopyaları.
- Aynı bilgiyi file + Firestore + local object üçlüsünde authoritative kabul eden yollar.

---

# 5. SÖKÜM 02: Business → Public Site Projection

## Bulgu

Business Profile ile public site arasında kararlı, versioned ve deterministik bir projection katmanı eksik veya parçalı.

## KEEP

- Business bilgisinin siteye dönüştürülmesi fikri.
- Theme/template ayrımı.
- Public site ile işletme yönetim ekranının ayrılması.

## REWRITE

Akış şu hale gelmeli:

```text
Validated Business Profile
        ↓
Site Projection
        ↓
Theme / Template Input
        ↓
Versioned Artifact
        ↓
Preview veya Publish
```

Gerekenler:

- projection version
- business revision
- site revision
- theme revision
- draft/published ayrımı
- publish validation gate
- deterministik output

## DROP adayı

- Render sırasında farklı store'lardan rastgele veri toplama.
- Published site'ın canlı dashboard state'ine bağımlı olması.

---

# 6. SÖKÜM 03: Local Site Preview / Draft Pipeline

Kurtarılan çekirdek akış:

```text
metadata → adapter → blocks → renderer
```

## Bulgu

Pipeline kullanılabilir ancak spread/slice kopyaları, ref sızıntısı ve business/site revision eksikleri nedeniyle draft state ile runtime state birbirine karışabiliyor.

## KEEP

- Adapter katmanı.
- Block tabanlı render.
- Draft preview fikri.

## REWRITE

Her input immutable ve açık kimlikli olmalı:

- `businessId`
- `siteId`
- `themeId`
- `revision`
- `publishedVersion`

Preview override ile persisted business data birbirinden ayrılmalı.

## DROP adayı

- Gizli mutation.
- Module-global mutable singleton.
- Preview sırasında source-of-truth değiştiren yan etkiler.

---

# 7. SÖKÜM 04: Theme / Template Engine

Bulunan çekirdekler:

- `tsxUret.ts`
- `premiumTemplates.ts`
- `templates/web`
- `theme.ts`

## Bulgu

AST/Babel üretim tarafında `implicit any`, `ts-expect-error`, `ts-ignore` gibi tip güvenliğini delen kestirmeler bulunuyor. Buna karşılık premium/direct renderer yaklaşımı güçlü ve kurtarılabilir.

## KEEP

- Premium hand-crafted template yaklaşımı.
- Direct renderer.
- Semantic theme intent.
- Template varyasyonları.

## REWRITE

- Typed generator input/output.
- Artifact boundary.
- Generator'ın runtime renderer'dan ayrılması.
- Schema validation.
- Deterministik üretim.

## DROP adayı

- Tip sistemini susturarak çalışan codegen kestirmeleri.
- Dead generator paths.
- Runtime'ın generator internal'larına bağlanması.

---

# 8. SÖKÜM 05–07: Preview / Editor / Publish boundary cluster

> **Not:** Üç ayrı sökümün birebir başlık eşleşmesi henüz yeniden doğrulanmadı. Bu bölüm kararları korumak için bilinçli olarak gruplanmıştır.

## Bulgu

- Premium template yaklaşımı korunmaya değer.
- Editor/live preview shell'lerinde unsafe `any` kullanımları var.
- Config-only local preview gerçek runtime'dan sapabiliyor.
- Hard-coded theme listeleri drift üretebiliyor.
- Preview, draft ve publish arasındaki sözleşme yeterince keskin değil.

## KEEP

- Editor UX.
- Live preview fikri.
- Premium templates.
- Draft ve published sürüm ayrımı.

## REWRITE

Canonical sözleşmeler:

- `ThemeSpec`
- `BusinessSiteContract`
- persisted theme registry
- artifact index
- saved business data adapter
- live preview overrides adapter

Render, preview ve publish aynı artifact contract'ını tüketmeli. Generator internals doğrudan tüketilmemeli.

## DROP adayı

- Hard-coded theme authority.
- Preview'a özel ikinci gerçeklik.
- Module-global mutable state.
- Publish sırasında sessiz fallback.

---

# 9. SÖKÜM 08: Domain Resolver + Multi-Site Projection

## Hedef

`PublishOutput / SiteManifest` ile public domain routing aynı sözleşmeye bağlanmalı.

Canonical çözüm:

```text
hostname
  ↓
Domain Binding
  ↓
businessId + siteId + publishedRevision
  ↓
Published Artifact
```

## KEEP

- Domain map.
- Subdomain resolver.
- Hostname-first routing fikri.

## REWRITE

- Tek domain resolve contract.
- Canonical domain binding.
- Domain doğrulama ve ownership.
- Published revision pinning.
- Tenant-safe fallback.

## DROP adayı

- Aynı anda çalışan eski ve yeni route authority'leri.
- Tenant hostname leakage.
- Resolver dışından published site seçme yolları.

---

# 10. SÖKÜM 09: CRM + Customer Identity + History

Hedef çekirdek:

```text
Customer Core = Customer + Activities
```

Kavramlar:

- `CustomerAction`
- `CustomerActivity`
- unified timeline
- visits
- messages
- notes
- reviews
- payments
- next best action
- segment tags
- consent / KVKK

## Bulgu

Legacy inbox automation bazı yerlerde müşteri kaydını telefon numarasıyla anahtarlandırıyor. Gerçek document ID telefon değilse yanlış müşteri güncelleme riski var.

## KEEP

- Customer profile shell.
- Timeline intent.
- Segment kavramları.
- Notes ve activity modeli.

## REWRITE

- Canonical customer identity.
- Normalize phone/email.
- Dedupe/merge.
- Consent authority.
- Customer event stream.
- Identity üzerinden conversation linkage.

## DROP adayı

- `phone === documentId` varsayımı.
- Aynı müşteri için birden fazla authoritative kayıt.

---

# 11. SÖKÜM 10: WhatsApp + Inbox + AI Customer Assistant

Bulunan çekirdekler:

- `paylasimliApi.ts`
- `whatsappProvider.ts`
- `twilioWhatsappProvider.ts`
- `twilio.ts`
- `mesajlar-*`
- `mesajKuyrugu.ts`
- `webhookGelen.ts`
- `nluBasit.ts`

## Bulgu

Provider abstraction var ve gerçek Twilio yolu mevcut. Ancak adapter her yerde tek authority değil. Bazı yollar dinamik `pickProvider()` ile abstraction'ı bypass ediyor.

## Hedef akış

```text
Inbound Message
      ↓
Customer Identity
      ↓
Conversation / Thread
      ↓
AI veya Human Action
      ↓
Booking / CRM / Campaign capability
      ↓
Durable outcome + audit
```

## KEEP

- Provider abstraction.
- Webhook parse mantığı.
- Message queue fikri.
- Central API shell.

## REWRITE

- Tek provider wiring.
- Tenant-aware identity resolution.
- Conversation authority.
- Retry + idempotency.
- Durable outbox/status.
- Delivery observability.

## DROP adayı

- Duplicate provider logic.
- Stub/fake success senders.
- Provider'ın business logic seçtiği yollar.

---

# 12. SÖKÜM 11: Local Site Renderer

Bu sökümün hedef mimarisi açık şekilde kararlaştırıldı:

```text
SiteProject_v1
    ↓
ThemeAdapter
    ↓
TemplateSpec_v1
    ↓
ComponentSpec_v1
    ↓
Component Registry
    ↓
renderBlock(spec, ctx)
    ↓
Preview HTML / SSR HTML / Static Deploy Artifact
```

## Kesin kararlar

- Component Registry kullanılacak.
- Typed component specs kullanılacak.
- Props JSON-safe olmalı: `Record<string, Json>` benzeri sıkı yapı.
- Function prop yasak.
- Blind spread yasak.
- Her component açık schema ile doğrulanmalı. Örnek: `HeroSpec`.
- React HTML attribute'larının yalnız güvenli subset'i geçirilmeli.
- Dangerous HTML, inline event handler, function props ve kontrolsüz arbitrary style engellenmeli.
- Draft/live renderer aynı yapıyı kullanmalı. Yalnız veri kaynağı ve asset base değişebilir.

## Repo doğrulama düzeltmesi — 2026-09-15

Güncel `main` üzerinde `apps/sites` **gerçekten vardır** ve kendi `src` dizini olan ayrı bir Next.js uygulamasıdır. Dolayısıyla önceki "mevcut olmayan modül" ifadesi güncel repo için yanlıştır.

Bununla birlikte yalnız dizinin varlığı onun **authoritative renderer** olduğunu kanıtlamaz. Bu yüzden doğru karar:

- `apps/sites` → **KEEP / VERIFY** adayı.
- Renderer ownership, publish artifact ve preview/runtime bağı bir sonraki site-runtime doğrulamasında import/call graph ile kesinleştirilecek.
- Yeni renderer inşa edilmeden önce mevcut `apps/sites/src` mutlaka sökülecek.

---

# 13. SÖKÜM 12: Payment + Package + Quota + İyzico

## Bulgu

Gerçek ödeme parçaları var:

- server-side package price map
- `/app/api/payments/checkout/route.ts`
- İyzico CheckoutForm initialize
- callback retrieve
- merchant/account Firestore check
- Zod validation
- callback'te `paymentStatus === SUCCESS`
- failure scenario işleme
- `telegram_id` gibi bağlayıcı metadata

Eksik ana otoriteler:

- package/plan provisioning
- entitlement authority
- quota lifecycle
- checkout intent binding
- callback idempotency
- replay protection
- webhook/event history
- financial audit

## KEEP

- Provider envelope.
- Server-side fiyat doğruluğu.
- Merchant guard.
- Zod validation.
- İyzico callback retrieve.

## REWRITE

Canonical akış:

```text
Plan / Package
      ↓
Billing Intent
      ↓
Provider Checkout
      ↓
Verified Provider Result
      ↓
Immutable Billing Event
      ↓
Entitlement + Quota Projection
```

## DROP adayı

- Client'ın finansal gerçek olması.
- Birden fazla package state authority.
- Callback'in yalnız UI sonucuna dönüşmesi.
- Replay/idempotency olmayan provisioning.

---

# 14. SÖKÜM 13: Commerce Core

> **Durum:** Kapsam sabit, ayrıntılı nihai verdict kısmen kurtarıldı. Eksik ayrıntı sonraki canlı repo doğrulamasında tamamlanacak.

## Sabit kapsam

- product
- variant
- inventory
- order
- TRY minor-unit money
- CSV import
- coupon / promotion
- cargo / shipping
- İyzico compatibility

## Korunacak yön

- Product/variant/inventory/order domain'lerinin ayrı ama tek commerce authority altında olması.
- Para değerlerinin float yerine minor-unit üzerinden tutulması.
- Import validation.
- Payment provider ile commerce order gerçeğinin ayrılması.

## Yeniden doğrulanacak

- Exact file ownership.
- Inventory mutation paths.
- Order lifecycle.
- Coupon authority.
- Shipping state.
- CSV idempotency / duplicate behavior.
- Payment-order reconciliation.

---

# 15. SÖKÜM 14: CRM runtime verification / Customer Profile + Segmentation + Memory

Bulunan parçalar:

- `lib/musteri/musteriCRM.ts`
- `lib/musteri/musteriOgrenmesi.ts`
- `lib/musteri/profil.ts`
- `lib/musteri/musteriServisi.ts`
- `lib/kuyruk/musteriGorevleri.ts`
- `lib/otomasyon/aksiyonCalistirici.ts`
- `lib/otomasyon/kuralMotoru.ts`
- `/api/musteriler`
- `/api/musteriler/[id]`
- `/profil`
- `/activity`
- `/segment`
- `/segments/auto`
- `/bulk`
- `app/segments/page.tsx`
- `app/musteriler/[id]/page.tsx`
- `app/raporlar/page.tsx`

## Bulgular

- Gerçek runtime API request'leri var.
- `/api/musteriler` queue-backed v2 benzeri write yolu ile compatibility list read'i karıştırıyor.
- `musteriServisi` ID üretiminde phone/email + business kullanıyor.
- CRM ve learning `musteri_olaylari.jsonl` tüketiyor.
- Automation, agent ve loyalty activity yazıyor.
- Churn/campaign segmentation alanları mevcut.
- Dashboard API-backed.
- Frontend shape kararsızlığı nedeniyle compatibility conversion yapıyor.

Sorunlar:

- Multiple authorities.
- `manual_segments`, `manualSegments`, `segments`, `segment` field drift.
- Dual activity authority.
- Duplicate identity generation.
- Loose Firestore validation.
- Fragile bulk import.
- PII / observability açıkları.

## KEEP

- Profile.
- Timeline.
- Segment.
- Loyalty.
- Churn.
- Customer learning intent.

## REWRITE

Tek customer authority + identity + segment + consent event stream.

## DROP adayı

- Duplicate authorities.
- Field aliases'ın authoritative gerçek olarak kullanılması.

---

# 16. SÖKÜM 15: Campaign / Lifecycle Messaging

Bulunan parçalar:

- `lib/whatsapp/metinSablonlari.ts`
- `whatsappAdapter.ts`
- `lib/otomasyon/gunaydinMesaji.ts`
- `lib/segmentOtomasyon/metinSablonlari.ts`
- `fsm.ts`
- `segmentEngine.ts`
- `lib/automationRouter.ts`
- `lib/salesAgent.ts`
- `lib/routing/mesaj.ts`
- auto WhatsApp yolları

## Bulgu

Journey/campaign fikri güçlü ama gönderim, logging, scheduler, consent ve sonuç ölçümü parçalara bölünmüş.

## KEEP

- Lifecycle intent.
- Campaign intent.
- Template intent.
- Segment-triggered messaging.

## REWRITE

Tek bir message intent / MessagingIR sözleşmesi:

```text
Campaign / Journey Decision
          ↓
Message Intent
          ↓
Consent + Policy Gate
          ↓
Durable Queue / Outbox
          ↓
Provider
          ↓
Delivery / Reply / Conversion Event
```

Gerekenler:

- retry
- idempotency
- canonical thread/message ID
- canonical outcome
- consent pre-send gate
- tenant isolation

## DROP adayı

- One-off sender'lar.
- Gönderildi sanılan fakat provider sonucu doğrulanmayan fake-success akışları.

---

# 17. SÖKÜM 16: Marketing / Ads / CMO

## Bulgu

Meta/Google adapter ve bazı gerçek marketing parçaları mevcut. Observe → Decide → Act modeli doğru yönde. Buna karşılık dashboard KPI, analysis, generation, optimizer ve adapters birbirinden kopuk; bazı ekranlar mock/synthetic sinyal üretebiliyor.

## KEEP

- Real provider adapters.
- Marketing domain kavramları.
- Observe → Decide → Act karar modeli.

## REWRITE

- Tek campaign/journey model.
- Attribution bağlantısı.
- Spend controls.
- Approval gates.
- Allow/deny policy.
- Rate limit.
- Audit.
- Rollback / pause.
- Secret isolation.
- Provider result verification.

## DROP adayı

- Synthetic success.
- Mock dashboard metric'lerinin gerçek business KPI sayılması.
- Duplicate schedulers.

---

# 18. SÖKÜM 17: Growth Engine / Attribution + Analytics Spine

Bu sökümde temel soru şuydu: **Gösterilen $1 gerçekten revenue mu?**

## Kontrol alanları

- UTM capture
- `fbclid`
- `gclid`
- anonymous → known identity merge
- first touch
- last touch
- linear
- time-decay
- attribution window
- duplicate order/payment
- refund
- goal correctness
- CRM connection
- booking connection
- commerce connection
- ads connection

## Ana karar

Tek bir **event / revenue / attribution truth** olmalı.

## KEEP

- Gerçek analytics adapters.
- Event toplama fikri.
- Attribution intent.

## REWRITE

- Canonical event schema.
- Revenue authority.
- Identity stitching.
- Attribution model/window.
- Idempotency.
- Refund-aware revenue.
- Verified conversion.

## DROP adayı

- Synthetic metric.
- Fake revenue.
- Provider sonucu doğrulanmamış conversion.
- Duplicate event'in revenue'yu iki kez şişirmesi.

---

# 19. SÖKÜM 18: Agent Runtime + Capability Bus

Bulunan çekirdekler:

- `lib/utils/models.ts`
- `lib/agents/config.ts`
- `agentKernel.ts`
- `agentOrchestrator.ts`
- `agentFactory.ts`
- `lib/agentRunner.ts`
- `agentResultVerifier.ts`
- `modelSSOT.ts`
- `modelSecici.ts`
- `modelHealth.ts`
- `aiProvider.ts`
- `agentYetki.ts`
- `agentMimarisi.ts`
- `/agents/chat`
- `/agents/run`
- `/assistant`

## Bulgu

En güçlü mevcut hat:

```text
config → factory → kernel → orchestrator
```

Ayrıca model/provider registry ve result verifier değerli.

Ancak en az üç runtime dünyası aynı anda bulunuyor:

1. `agentRuntime.ts`
2. kernel + orchestrator
3. `agentRunner.ts`

Buna ek olarak birden fazla AI gateway/provider selector var. Runner bazı yerlerde yalnız başlangıç logluyor, cron placeholder, stop/restart davranışı kısmi ve verifier ana akışa tam bağlanmış değil.

## KEEP

- Kernel.
- Event queue fikri.
- Config/factory.
- Capability/RBAC intent.
- Model-provider registry.
- Outcome verifier.

## REWRITE

Tek runtime:

```text
Agent Request
    ↓
Policy + Permission
    ↓
Capability Bus
    ↓
Model Gateway veya Deterministic Tool
    ↓
Durable Run State
    ↓
Verified Outcome
    ↓
Audit Event
```

Gerekenler:

- single model gateway
- action registry
- persisted run state
- permission check
- capability contracts
- verified outcomes
- durable job semantics

## DROP adayı

- Duplicate partial runners.
- Shell agents.
- Fake-success accounting.
- Birbirini bypass eden model selectors.

---

# 20. SÖKÜM 19: RAG / Collective Intelligence / Business Memory

## Bulgu

Gerçek bir loop var:

```text
Library
  ↓
RAG Sync
  ↓
Retrieval
  ↓
Agent Action
  ↓
Feedback
  ↓
Tactic Generation
  ↓
RAG
```

Bulunan parçalar:

- `ragManager`
- `ragService`
- `pineconeSync`
- `agentRagSearch`
- collective intelligence
- `feedbackEngine`
- `tacticGenerator`

Sorunlar:

- Multiple Pinecone authorities/client/env.
- Embedding/model tutarsızlığı.
- Weak provenance.
- Başarı varsayımları.
- Best tactics sıralama sorunu.
- Privacy / tenant boundary riski.

## KEEP

- Retrieval loop.
- Feedback loop.
- Tactic generation intent.
- Collective learning fikri.

## REWRITE

- Provenance.
- Canonical embedding model/version.
- Canonical index ownership.
- Tenant boundary.
- Evaluation.
- Privacy/redaction.
- Source citations.
- Outcome-backed tactic score.

## DROP adayı

- Sonucu ölçmeden başarılı kabul edilen tactic.
- Duplicate vector clients.
- Cross-tenant memory leakage riski taşıyan yollar.

---

# 21. SÖKÜM 20: Customer Core / CRM Authority

Bu turda eski CRM'in gerçekten canlı olduğu doğrulandı.

## Gerçek runtime bağlantıları

- `/api/musteriler` kullanılıyor.
- `app/raporlar/page.tsx` bu yolu okuyor.
- `lib/OtonomRaporAgent.ts` bu yolu kullanıyor.
- `/api/musteriler` → `lib/musteri/musteriServisi.ts` → Mongo.
- `/api/customers` → `lib/crm/customerService.ts` → Firestore `customers`.
- `/api/musteriler/[id]`
- `/profil`
- `/segment`
- `/segments/auto`
- `/bulk`
- JSONL queue → runner → service akışı mevcut.

## Güçlü yeni çekirdek

CRM v2 tarafında:

- `customerService.ts`
- `customerRepository.ts`
- `identityService.ts`
- `activityService.ts`
- `rfm.ts`
- `segmentDsl.ts`
- `/api/customers/...`

## Kritik bug notu

Identity merge sırasında `targetRevision = 0` benzeri sıfırlama yaklaşımı kullanılmamalı. Merge sonrası gerçek updated revision korunmalı.

## KEEP

- CRM v2.
- Activity model.
- RFM.
- Segment DSL.
- Consent.
- Labels.
- Custom fields.

## REWRITE

- Legacy `/api/musteriler` bir compatibility shell haline getirilmeli.
- Arkadaki authority CRM v2 olmalı.
- Identity revision düzeltilmeli.
- Timeline/automation aynı customer graph'ını kullanmalı.

## DROP adayı

- Mongo + Firestore dual authority.
- Field alias'larının business truth olması.

---

# 22. SÖKÜM 21: Finance Core / Immutable Financial Event

Bulunan domain parçaları:

- `cariHesaplar.ts`
- `b2bCariHesaplar.ts`
- `borcEkle`
- `odemeEkle`
- `tahsilatAjani`
- `finansAjani`
- `efatura.ts`
- `faturaUretici`
- `invoice/eFaturaClient`
- expense / cash / ledger benzeri yollar

## Bulgu

Eski cari dünya gerçek iş mantığı taşıyor fakat finansal gerçek parçalı mutation'lar halinde dağılmış durumda.

## Ana karar

Appointment, payment ve commerce **finansal event üretir**. Finance Core immutable ledger'ın sahibidir.

## KEEP

- Borç domain mantığı.
- Payment/tahsilat domain kavramları.
- Invoice/e-fatura adapter intent.
- Gerçek provider entegrasyonları.

## REWRITE

Tek Finance Core:

```text
Business Event
   ↓
Financial Intent
   ↓
Idempotent Financial Writer
   ↓
Immutable Ledger Event
   ↓
Balance / Receivable / Revenue Projection
```

Gerekenler:

- minor-unit money
- explicit `appointmentId`
- explicit `orderId`
- explicit `paymentId`
- idempotency key
- reconciliation
- audit trail
- reversal/refund event semantics

## DROP adayı

- Dağınık balance mutation.
- Agent'ın ledger kanıtı olmadan "ödendi" veya "başarılı" demesi.
- Finansal gerçeğin CRM field'ında saklanması.

### Güncel repo drift notu — 2026-09-15

Bu bölümdeki eski dosya adlarının tamamı bugünkü `main` üzerinde doğrulanmış kabul edilmemelidir. Güncel repoda açıkça bulunan finansal paket `packages/accounting`'dir. Buradaki `Transaction` modeli `amount` ve `kdvAmount` için **kuruş** kullanır ve `booking` / `order` source link'lerini destekler; fakat kayıt `updatedAt` taşıyan mutable transaction modelidir. Bu nedenle tarihsel **immutable ledger** kararı hâlâ geçerlidir, ancak implementasyon sahipliği güncel paket ağacına göre yeniden kurulmalıdır.

---

# 23. SÖKÜM 22: Booking ↔ Finance Payment Policy / Lifecycle

Bu sökümde booking lifecycle ile finance lifecycle ayrıştırıldı.

## Appointment durumları

- scheduled
- completed
- cancelled
- no_show

## Payment durumları

- unpaid
- partial
- paid
- refunded

## Payment policy

- pay_at_venue
- deposit_required
- prepaid
- waived

## Amount alanları

- gross
- depositExpected
- paid
- refunded
- due

## Kesin kararlar

### 1. Pure calculator

Bir pure calculator kullanılmalı:

```text
calculateAppointmentMode({
  status,
  paymentPolicy,
  amounts
})
→ {
  financialState,
  ledgerIntents,
  alerts
}
```

Calculator doğrudan database/ledger yazmaz.

### 2. Authority split

- **Booking:** policy + service price snapshot.
- **Payments / Commerce:** provider/payment truth.
- **Finance Ledger:** immutable amount/event truth.
- **CRM:** customer identity.

### 3. No-show + deposit

`deposit_required` senaryosunda no-show gerçekleşirse business policy'ye göre:

- ödenmiş deposit tutulabilir/forfeit olabilir,
- veya ödenmemiş no-show fee için receivable oluşturulabilir.

Bu karar explicit policy ile verilmelidir.

### 4. Refund async

Refund isteği ile gerçek provider refund aynı event değildir.

```text
refund_requested
        ↓
provider processing
        ↓
refund_succeeded / refund_failed
```

Ledger ancak gerçek provider outcome ile actual refund event yazmalıdır.

### 5. Overpayment

- `due` negatif gösterilmemeli.
- Overpayment ayrı refundable/credit amount olarak işaretlenmeli.
- Alert üretilmeli.

### 6. Idempotency

Örnek semantic key yapıları:

```text
finance_intended:{appointmentId}:{revision}:{intentType}
provider:{provider}:{paymentId}:{eventType}
```

### 7. Guarded transitions

Appointment lifecycle geçişleri explicit ve guarded olmalı.

### 8. Completion semantics

Appointment completion revenue/receivable intent üretebilir. Payment bundan ayrı olaydır. Deposit daha önce oluşmuş olabilir. Kalan bakiye ledger/projection'dan türetilir.

### 9. Finance agent sınırı

Finance agent CRM'i doğrudan mutate etmez. Domain event üretir veya capability kullanır.

### 10. Zero-safe behavior

Tutarı `0` olan anlamsız finansal event üretilmemeli. Sıfır tutarlı business metadata gerekiyorsa finans dışı event olarak tutulabilir.

---

# 24. SÖKÜM 23: Kapora / Ön Ödeme / Kısmi Tahsilat / No-Show / İptal Ücreti / Kalan Bakiye

> **Durum:** 2026-09-15 güncel `main` üzerinden kapatıldı.  
> **Verdict:** **KEEP policy semantics / REWRITE embedded payment state / BUILD dedicated payment lifecycle.**

## 24.1 Güncel repo kanıtı

Bugünkü repoda finansal davranış düşündüğümüzden daha somut çıktı:

### Booking tarafı

`packages/booking-schema/src/index.ts` içinde:

- `ServicePricingSchema.deposit`
  - `required`
  - `amount`
  - `type: fixed | percentage`
  - `taksitEnabled`
  - `fullPaymentAllowed`
- `paymentTiming`
  - `online_now`
  - `online_later`
  - `in_person`
  - `deposit_now_rest_in_person`
- `Booking.payment.status`
  - `not_paid`
  - `deposit_paid`
  - `fully_paid`
  - `refunded`
  - `partially_refunded`
- `depositAmount`
- `depositPaidAt`
- installment bilgileri
- `transactionId`
- `orderId`
- cancellation altında:
  - `refundStatus`
  - `refundAmount`
  - `cancellationFee`
- `BookingPolicy.noShow.fee`
- yüksek no-show sayısından sonra deposit zorunluluğu için `requireDepositAfterNoShows`

Yani ürün fikri ve kullanıcı senaryosu **var**. Eksik olan şey bu alanların finansal otorite olarak güvenli ayrıştırılması.

### Commerce tarafı

`packages/ecom-schema/src/order.ts` içinde order doğrudan:

- `paymentStatus`
- `payment.paidAmount`
- `payment.refundedAmount`
- provider
- transactionId

taşıyor.

### Accounting tarafı

`packages/accounting/src/types/transaction.ts`:

- `amount` → kuruş
- `kdvAmount` → kuruş
- `source: order | booking | ...`
- `sourceOrderId`
- `sourceBookingId`

taşıyor.

Ancak `Transaction` mutable `updatedAt` alanına sahip. Bu bir raporlama/accounting modeli olarak kullanılabilir, fakat immutable payment/ledger authority olamaz.

### Firestore erişim yüzeyi

`firestore.rules` güncel durumda:

- `sites/{siteId}/bookings/{bookingId}` → editor dahil `canWrite` ile update edilebilir.
- `sites/{siteId}/orders/{orderId}` → editor dahil `canWrite` ile update edilebilir.
- `sites/{siteId}/transactions/{txId}` → owner/admin update edebilir.

Bu önemli çünkü `Booking.payment` ve `Order.payment` içine finansal gerçek gömülmüş durumda. Böylece iş akışı belgesini düzenleme yetkisi olan bir kullanıcı teorik olarak payment/refund alanlarını da aynı belge mutasyonu içinde değiştirebilir.

**Karar:** finansal truth bu belgelerin içinde authoritative tutulamaz.

## 24.2 Money-unit drift

Bugünkü repo üç farklı semantik sinyal veriyor:

- Accounting açıkça **kuruş** diyor.
- E-commerce checkout/installment alanlarında yorumlar **₺** semantiği kullanıyor.
- Booking pricing/deposit alanlarında unit açık değil.

Bu sessiz birim farkı ileride `1000` değerinin **10 TL mi, 1000 TL mi** olduğu sınıfında finansal hata üretir.

### Kesin kural

Bütün authoritative money alanları:

```text
MoneyMinor = integer
currency = TRY
```

olmalı.

UI/adapters TL ↔ kuruş dönüşümünü sınırda yapmalı. Domain içinde float TL financial truth olmayacak.

## 24.3 KEEP

Aşağıdaki ürün/domain fikirleri güçlü ve korunmalı:

- fixed veya percentage deposit policy
- `deposit_now_rest_in_person`
- full payment allowed seçeneği
- taksit intent'i
- cancellation windows
- cancellation fee intent'i
- no-show fee intent'i
- no-show sonrası deposit zorunluluğu
- booking revision kavramı
- order/provider reference intent'i
- accounting'deki `sourceBookingId` / `sourceOrderId`
- accounting'deki minor-unit yönü

Bunlar silinmeyecek; doğru authority'lere taşınacak.

## 24.4 REWRITE

### A. `ServicePricing.deposit` → versioned policy snapshot

Service üzerinde yaşayan mutable policy, booking oluşturulduğu anda snapshot edilmeli.

Önerilen sözleşme:

```text
PaymentPolicySnapshot {
  version
  mode: pay_at_venue | deposit_required | prepaid | waived
  grossAmountMinor
  currency: TRY
  deposit?: {
    type: fixed | percentage
    value
    expectedAmountMinor
    minAmountMinor?
    maxAmountMinor?
  }
  cancellationPolicySnapshot
  noShowPolicySnapshot
}
```

Booking sonradan servis fiyatı/politikası değişince geçmiş randevunun finansal şartları değişmemeli.

### B. `Booking.payment` authority olmaktan çıkarılacak

Booking üzerinde payment alanı kalabilir ama yalnız **projection / summary** olmalı.

Örneğin:

```text
paymentSummary {
  state
  paidMinor
  refundedMinor
  dueMinor
  creditMinor
  lastPaymentId?
  projectionVersion
}
```

Bu alan doğrudan kullanıcı mutasyonu ile finansal gerçek oluşturmaz.

### C. `Order.payment` authority olmaktan çıkarılacak

`paidAmount` ve `refundedAmount` mutable order state yerine Payment/Settlement/Refund çekirdeğinden projekte edilmeli.

### D. Cancellation alanları ayrılacak

Şu an cancellation içinde:

- refundStatus
- refundAmount
- cancellationFee

aynı business object üzerinde birlikte duruyor.

Doğru ayrım:

- Booking cancellation → **business fact**
- refund eligibility → **policy decision**
- refund request → **financial intent**
- refund provider result → **payment fact**
- refund ledger event → **financial fact**

### E. No-show fee doğrudan balance mutation yapmayacak

No-show:

```text
AppointmentNoShow
      ↓
Policy Evaluator
      ↓
NoShowFeeIntent / DepositForfeitIntent
      ↓
Payment / Receivable / Ledger
```

şeklinde ilerlemeli.

## 24.5 BUILD

Güncel paket ağacında ayrı, açık bir Payment Core görünmediği için aşağıdaki çekirdek **inşa edilmeli**.

### 1. PaymentAttempt

Provider sürecidir, para gerçeği değildir.

```text
PaymentAttempt {
  id
  businessId
  provider
  purpose
  amountMinor
  currency
  status: created | pending | succeeded | failed | expired
  providerReference?
  idempotencyKey
  createdAt
  updatedAt
}
```

### 2. Payment

Yalnız doğrulanmış provider veya kontrollü manual-cash sonucu ile oluşan money fact.

```text
Payment {
  id
  businessId
  amountMinor
  currency
  method
  provider?
  providerPaymentId?
  capturedAt
  sourceAttemptId?
}
```

### 3. Settlement / PaymentApplication

Payment'ın hangi obligation'a uygulandığını gösterir.

```text
Settlement {
  id
  paymentId
  targetType: booking | order | invoice | receivable
  targetId
  amountMinor
  kind: deposit | final | partial | fee | adjustment
}
```

Bu nesne sayesinde:

- partial payment
- split payment
- tek ödemeyi birden fazla borca dağıtma
- bir booking'e birden fazla ödeme

normal hale gelir.

### 4. Refund

Refund ayrı lifecycle'dır:

```text
requested
  ↓
processing
  ↓
succeeded | failed
```

`cancelled` olmak `refunded` olmak değildir.

### 5. Fee / Forfeit / Adjustment

Şunlar ayrı explicit financial intent/event olmalı:

- cancellation fee
- no-show fee
- deposit forfeiture
- manual adjustment
- price-delta adjustment

### 6. Balance Projection

Kalan bakiye mutable bir sayı olarak source-of-truth tutulmayacak.

Projection:

```text
obligation
- applied settlements
+ charge adjustments
- successful refunds reversal etkisi
= due
```

Kurallar:

- `due < 0` gösterilmez.
- Fazla ödeme `customerCreditMinor` veya `refundableMinor` olarak ayrılır.
- Refund edilen tutar captured/refundable tutarı aşamaz.

### 7. Reconciliation

En az şu üç dünya periyodik karşılaştırılmalı:

```text
Provider Captures / Refunds
        ↕
Payment + Refund Records
        ↕
Immutable Finance Ledger
```

Drift varsa sessizce overwrite edilmemeli, reconciliation incident üretilmeli.

## 24.6 Kritik invariants

Aşağıdaki kurallar DB/service seviyesinde enforce edilmeli:

1. `PaymentAttempt != Payment`.
2. Deposit ayrı para authority'si değil, payment application türüdür.
3. `sum(Settlement.amountMinor)` bir payment'ın kullanılabilir captured tutarını aşamaz.
4. `refundSucceededMinor <= capturedMinor - previouslyRefundedMinor`.
5. Aynı provider event yalnız bir kez işlenir.
6. Aynı source financial event yalnız bir ledger event üretir.
7. Booking/order status payment truth yaratamaz.
8. Payment status yalnız verified payment facts'ten projekte edilir.
9. Tüm authoritative money integer minor-unit'tir.
10. Historical payment/policy snapshot rewrite edilmez.

## 24.7 Appointment revision sonrası fiyat değişimi

Booking oluşturulduktan ve deposit ödendikten sonra servis fiyatı değişirse geçmiş snapshot yeniden hesaplanmamalı.

Randevunun kendisinde fiyat değişikliği yapılıyorsa:

```text
Old Obligation
     +
PriceAdjustment
     =
New Obligation
```

şeklinde delta yaratılmalı.

Geçmiş Payment ve Settlement kayıtları aynen kalır.

## 24.8 Deposit forfeiture

Kaporanın yanması, payment kaydını silmek veya status değiştirmek değildir.

Doğru semantik:

```text
Deposit Payment
      ↓
Deposit Settlement
      ↓
NoShow / LateCancel
      ↓
Policy Decision
      ↓
DepositForfeitEvent
```

Bu event finans tarafında gelir/fee sınıflandırmasına projekte edilebilir.

## 24.9 Receipt / invoice ilişkisi

Receipt/invoice ödeme authority'si değildir.

- Payment → money fact
- Ledger → financial truth
- Invoice/receipt → mali belge/projection

Belge iptal edildi diye payment yok olmaz. Payment refund edildi diye eski belge sessizce overwrite edilmez; mevzuata uygun yeni/reversal document lifecycle gerekir.

## 24.10 Firestore/RBAC kararı

Payment, refund, settlement ve immutable finance event koleksiyonları client tarafından doğrudan write edilebilir olmamalı.

Minimum kural:

```text
client: read projection if authorized
client: create intent through controlled API/capability
server: verify provider/policy
server: write payment/refund/settlement/ledger
```

Booking editor'ü finansal truth editor'ü değildir.

## 24.11 DROP adayları

Aşağıdakiler yeni authority devreye girdikten sonra kaldırılmalı veya compatibility projection'a indirilmeli:

- `Booking.payment.status`'un payment truth sayılması
- `Booking.payment.transactionId`'nin tek başına ödeme kanıtı sayılması
- `Order.payment.paidAmount` mutable SSOT
- `Order.payment.refundedAmount` mutable SSOT
- cancellation içindeki `refundStatus`'un provider refund truth sayılması
- client'in booking/order belgesi üzerinden payment amount/status değiştirebilmesi
- float/TL ile authoritative para saklama
- no-show/cancel status değişiminin otomatik ve doğrulanmamış mali sonuç üretmesi

## 24.12 Canonical akış

```text
Booking Created
      ↓
PaymentPolicySnapshot
      ↓
Financial Obligation
      ↓
PaymentAttempt
      ↓ verified provider/manual outcome
Payment
      ↓
Settlement / Application
      ↓
Immutable Finance Event
      ↓
Booking/Order Payment Projection
```

Cancellation/no-show yolu:

```text
Cancelled / NoShow
      ↓
Policy Evaluation
      ↓
RefundIntent / FeeIntent / ForfeitIntent
      ↓
Provider + Finance outcome
      ↓
Projection
```

## 24.13 Smoke/probe seti

SÖKÜM 23 sonrası minimum acceptance seti:

- fixed deposit
- percentage deposit
- full prepayment
- deposit + venue remainder
- iki parça partial payment
- iki farklı payment method ile split payment
- no-show + deposit retained
- no-show + ek receivable fee
- erken cancel + full refund
- geç cancel + partial refund + fee
- refund provider failure
- duplicate provider webhook
- duplicate finance intent
- deposit sonrası appointment price revision
- overpayment → credit/refundable amount
- order payment + partial refund
- provider/Payment/Ledger reconciliation drift

---

# 25. SÖKÜM 24: AÇIK FRONTIER

## Durable Jobs / Outbox / Webhook Inbox / Retry / Reconciliation

SÖKÜM 23 payment lifecycle'ının güvenli çalışması için sıradaki zorunlu katman budur.

### Güncel ilk sinyal

- Root'ta `functions` var ancak güncel `functions/src` ağacında görünen scheduled iş `firestoreBackup.ts` ile sınırlı.
- Paket listesinde açık bir `queue`, `worker` veya `payment` core paketi görünmüyor.
- Önceki sökümlerde queue/outbox niyeti birçok domain'de tekrar ediyor ama tek durable execution authority henüz güncel repo üzerinden doğrulanmadı.

### SÖKÜM 24'te incelenecek

- queue/job authority
- cron/scheduler authority
- webhook inbox
- outbox
- retry semantics
- at-least-once delivery
- idempotency ownership
- lock / lease
- dead-letter queue
- poison job behavior
- backoff
- job timeout
- replay
- provider callback dedupe
- message delivery status jobs
- payment reconciliation jobs
- campaign scheduler
- agent run durability
- observability / trace correlation
- recovery after process crash

**Bu başlık için nihai verdict henüz yazılmamalıdır.**

---

# 26. Çapraz mimari kuralları

Bütün sökümlerin ortak sonucu aşağıdaki kurallardır.

## 26.1 Tek authority

Her domain'in tek authoritative çekirdeği olmalı:

- Business → Business Core
- Site → Site Project / Publish
- Customer → Customer Core
- Conversation → Messaging Core
- Commerce → Commerce Core
- Billing → Billing Core
- Booking → Booking Core
- Payment → Payment Core
- Finance → Ledger
- Agent execution → Agent Runtime
- Knowledge → RAG/Memory Core

Compatibility route olabilir, compatibility **authority** olamaz.

## 26.2 Typed contracts

Domainler birbirine internal object spread ile değil açık sözleşmeyle bağlanmalı.

## 26.3 Tenant boundary

Her read/write/action tenant/business kimliğiyle doğrulanmalı. Provider adapter veya agent runtime bu sınırı bypass edememeli.

## 26.4 Idempotency

Özellikle şu işlemler idempotent olmalı:

- payment callback
- webhook
- message send
- campaign action
- booking financial intent
- ledger writer
- import
- agent action
- provider retry

## 26.5 Durable queue / outbox

"Fonksiyon çağrıldı" ile "iş başarıyla gerçekleşti" aynı şey değildir. Dış sistem aksiyonları durable job/outbox + verified outcome üzerinden ilerlemeli.

## 26.6 Audit

Kritik aksiyonlarda kim, hangi tenant için, hangi intent ile, hangi provider sonucu üzerine ne yaptı görülebilmeli.

## 26.7 Money

Para değerleri minor-unit üzerinden tutulmalı. Float finansal gerçek olmamalı.

## 26.8 Consent / RBAC

Marketing, CRM, messaging ve agent aksiyonlarında consent ile role/capability kontrolü merkezi olmalı.

## 26.9 Provider abstraction

Twilio, İyzico, Meta, Google, Pinecone ve model provider'ları business logic'in içine dağılmamalı. Tek gateway/adapter kontratı olmalı.

## 26.10 Verified outcome

Agent, campaign, provider veya automation için "success" ancak doğrulanabilir outcome varsa success'tir.

---

# 27. Birleşik smoke/probe listesi

Sonraki temizlik ve yeniden bağlama turunda en az aşağıdaki uçtan uca problar çalıştırılmalı.

## Business / Site

- İşletme bilgisi değişir.
- Draft preview değişir.
- Published site değişmez.
- Publish yapılır.
- Published revision atomik olarak değişir.
- Domain doğru site/revision'a resolve olur.

## Customer

- Yeni contact yaratılır.
- Reload sonrası aynı identity görülür.
- Aynı phone/email tekrar geldiğinde duplicate yerine canonical identity bulunur/merge edilir.
- Timeline activity kalıcıdır.

## Messaging

- Incoming WhatsApp doğru tenant/customer/thread'e bağlanır.
- Outgoing send outbox'a girer.
- Provider sonucu status'u günceller.
- Retry duplicate mesaj üretmez.
- Consent yoksa gönderim bloklanır ve sebep kaydolur.

## Campaign

- Campaign create.
- Pause.
- Resume.
- Scheduler yalnız eligible audience'a çalışır.
- Her action loglanır.
- Delivery/reply/conversion outcome campaign'e geri akar.

## Billing

- Checkout intent yaratılır.
- Provider callback intent ile eşleşir.
- Replay duplicate entitlement üretmez.
- Entitlement aktifleşir.
- Usage artar.
- Quota dolunca capability açık reason ile bloklanır.

## Booking / Finance

- Appointment scheduled.
- Deposit varsa ayrı financial event.
- Appointment completed.
- Revenue/receivable intent idempotent oluşur.
- Partial payment sonrası kalan bakiye doğru projection'dır.
- Refund request ile actual refund ayrıdır.
- No-show/cancellation policy ledger'a doğru intent üretir.
- Duplicate callback ledger'ı şişirmez.
- Booking/order client mutation finansal truth değiştiremez.
- Money-unit conversion yalnız boundary'de yapılır.

## Agent Runtime

- Agent permission olmadan capability çağıramaz.
- Run persisted olur.
- Retry aynı action'ı kontrolsüz tekrar etmez.
- Tool/provider result verifier'dan geçer.
- Fake success accepted sayılmaz.

## RAG

- Tenant A bilgisi Tenant B retrieval'ında görünmez.
- Source provenance korunur.
- Embedding/index version bilinir.
- Feedback sonucu tactic score ölçülebilir outcome'a bağlanır.

---

# 28. Sonraki faz: Temizleme ve eksik tamamlama sırası

Bu dosya yazıldıktan sonraki çalışma sırası:

1. **Repo-runtime doğrulaması**  
   Her söküm maddesindeki gerçek import/call/runtime bağı tekrar kontrol edilir.

2. **KEEP / REWRITE / DROP / BUILD matrisi**  
   Dosya bazlı kesin tablo çıkarılır.

3. **Authority çakışmalarını kapatma**  
   Önce müşteri, business facts, billing, messaging, payment, finance ve agent runtime gibi çoklu gerçek kaynakları çözülür.

4. **Dead/duplicate kod temizliği**  
   Ancak import/runtime kanıtından sonra silme yapılır.

5. **Eksik çekirdeklerin inşası**  
   Renderer, durable jobs/outbox, Payment Core, immutable ledger, capability bus gibi eksikler tamamlanır.

6. **Compatibility katmanları**  
   Eski route/UI bir anda kırılmadan yeni authority'lere yönlendirilir.

7. **Smoke + integration + regression**  
   Çapraz domain probları geçmeden eski authority tamamen kaldırılmaz.

---

# 29. Bilinen plan borçları

Aşağıdakiler bilinçli olarak açık bırakılmıştır:

- SÖKÜM 05–07'nin tek tek eski başlık numaraları yeniden eşlenecek.
- Eski SÖKÜM 12 numara çakışmasının kaynak konuşması tekrar doğrulanacak.
- SÖKÜM 13 için exact file/verdict matrisi tamamlanacak.
- SÖKÜM 21–22'deki tarihsel dosya referansları güncel `main` package/import graph ile yeniden eşlenecek.
- SÖKÜM 24 tamamlanacak.
- Bu belgeye henüz otomatik dependency graph eklenmedi.
- `KEEP / REWRITE / DROP / BUILD` eski bölümlerin çoğunda capability seviyesinde; sonraki turlarda dosya seviyesine indirilecek.

---

# 30. Korunan ana fikir

Kepenk'in asıl değeri tek tek agent dosyaları, dashboard kartları veya route sayısı değil. Değer, işletmenin gerçeklerini bir kez tanımlayıp bütün sistemi aynı gerçek üzerinden çalıştırabilmesidir.

Hedef omurga:

```text
Business Facts
    ↓
Customer / Booking / Commerce
    ↓
Canonical Events
    ↓
Messaging / Marketing / Payment / Finance / Analytics
    ↓
Agent Capability Bus
    ↓
Verified Actions
    ↓
Audit + Learning + RAG Memory
```

Site üretimi de aynı Business Facts'ten beslenir:

```text
Business Facts
    ↓
Site Project
    ↓
Theme Adapter
    ↓
Typed Renderer
    ↓
Preview
    ↓
Publish Artifact
    ↓
Domain Resolver
```

Bu iki omurga birbirinin kopyası değil, aynı işletme gerçeğinin iki farklı projection'ıdır.

---

**Şimdiki checkpoint:** SÖKÜM 01–23'ün kararları tek belgede. SÖKÜM 23 güncel repo kanıtıyla kapatıldı. SÖKÜM 24 `Durable Jobs / Outbox / Webhook Inbox / Reconciliation` açık frontier'dır.