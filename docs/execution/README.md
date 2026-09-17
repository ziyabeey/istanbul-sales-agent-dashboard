# Kepenk v2 — Exact Execution Manifest

> **Tarih:** 2026-09-16  
> **Durum:** **TEKNİK PLANLAMA KAPALI — P0/KC uygulaması ilerliyor; ürün ve kabul durumu ayrı izlenir**  
> **Kaynak:** SÖKÜM 01–41 + SENTEZ 01–05  
> **Amaç:** Canonical mimariyi exact file/route/package task'larına, güvenli cutover paketlerine, PR/branch birimlerine ve retirement gates'e dönüştürmek.  
> **Kural:** Bu klasör production kodu implement etmez; implementation sırasında hangi authority'nin, hangi sırada, hangi acceptance/rollback/retirement şartıyla değişeceğini sabitler.

## Ürün planı ve uygulama durumu

Ürün sırası ve çıkış ölçütleri [Kepenk Product Master Plan](../product/KEPENK_PRODUCT_MASTER_PLAN.md) içinde; commit/PR/kabul kanıtları [17 Eylül 2026 durum kaydında](../product/STATUS-2026-09-17.md) izlenir.

Bu dosyadaki W “kapanış” özetleri **planlama kararlarını** anlatır; geçmiş zamanla yazılmış maddeler uygulama/kabul kanıtı değildir. P0-01…07 main'e birleşmiş, KC-00 kabul edilmiş ve Randevu KC-01 birleşmiştir; sonraki kapılar durum kaydında ayrıdır. Eski “implementation başlamadı” başlıkları tarihsel planlama anını temsil eder.

K04/KC [adoption sözleşmesi](kepenk-core-adoption.md), P1'in iptal/değişen tenant-commercial işlerinde önceliklidir. Randevu'nun kendi ürün planı ve mevcut görev sahiplikleri korunur.

## Wave manifestleri

| Wave | Alan | Durum | Belge |
|---|---|---|---|
| W0 | Freeze / inventory / protected baselines | KAPALI / sentezde sabit | `docs/sentez/frontend-preservation-contract.md`, SENTEZ 2–4 |
| W1 | Trust Spine | KAPALI / planlandı | `docs/execution/w01-trust-spine.md` |
| W2 | Tenant + Business + Commercial Spine | KAPALI / planlandı | `docs/execution/w02-tenant-business-commercial-spine.md` |
| W3 | Durable Execution + Credential + Integration | KAPALI / planlandı | `docs/execution/w03-durable-execution-credential-integration.md` |
| W4 | Site / Asset / Publish / Public Experience | KAPALI / planlandı | `docs/execution/w04-site-asset-publish-public-experience.md` |
| W5 | Customer + Messaging + Support Foundation | KAPALI / planlandı | `docs/execution/w05-customer-messaging-support-foundation.md` |
| W6 | Booking + Payment + Finance | KAPALI / planlandı | `docs/execution/w06-booking-payment-finance.md` |
| W7 | Commerce + Inventory + Analytics + Marketing | KAPALI / planlandı | `docs/execution/w07-commerce-inventory-analytics-marketing.md` |
| W8 | Agent Runtime + Knowledge | KAPALI / planlandı | `docs/execution/w08-agent-runtime-knowledge.md` |
| W9 | Vertical Activation | KAPALI / planlandı | `docs/execution/w09-vertical-activation.md` |
| W10 | Admin / Privacy / Offboarding convergence + final cleanup | KAPALI / planlandı | `docs/execution/w10-admin-privacy-offboarding-final-cleanup.md` |

## Pilot cutover

`docs/execution/pilot-cutover-packaging.md` W1–W10 task'larını geri alınabilir implementation paketlerine böler:

```text
Pilot-0  Trust Bootstrap
Pilot-1  First Canonical Tenant
Pilot-2  Customer + Booking + Payment + Finance Golden Flow
Pilot-3  Public Site + Public Action + Messaging
Pilot-4  Commerce + Analytics + Agent Safe Loop
         ↓
Vertical Activation
         ↓
Final Legacy Retirement
```

### PR-level implementation packaging

| Paket | Durum | Belge |
|---|---|---|
| Pilot-0 Trust Bootstrap | KAPALI / PR-planlandı | `docs/execution/pilot-0-trust-bootstrap-pr-plan.md` |
| Pilot-1 First Canonical Tenant | KAPALI / PR-planlandı | `docs/execution/pilot-1-first-canonical-tenant-pr-plan.md` |
| Pilot-2 Golden Flow | KAPALI / PR-planlandı | `docs/execution/pilot-2-customer-booking-payment-finance-pr-plan.md` |
| Pilot-3 Public Site + Messaging | KAPALI / PR-planlandı | `docs/execution/pilot-3-public-site-messaging-pr-plan.md` |
| Pilot-4 Commerce + Analytics + Agent | KAPALI / PR-planlandı | `docs/execution/pilot-4-commerce-analytics-agent-pr-plan.md` |
| Restaurant / Support / Marketplace / Procurement | KAPALI / PR-planlandı | `docs/execution/vertical-activation-pr-plan.md` |
| Admin / Privacy / Offboarding / Legacy Retirement | KAPALI / PR-planlandı | `docs/execution/final-retirement-pr-plan.md` |

### Cutover stratejisi

```text
EXPAND
 -> BACKFILL
 -> SHADOW READ
 -> CANONICAL WRITE
 -> one-way LEGACY PROJECTION
 -> CANARY READ
 -> OBSERVE
 -> BROADEN
 -> WRITE DENY
 -> RETIRE
```

Bidirectional dual-authority migration yasaktır.

## Disposition etiketleri

- `PRESERVE`: çalışan ürün/UX/primitive korunur.
- `REWIRE`: data source / command / authority boundary değişir.
- `ADAPTER`: legacy caller geçici olarak canonical command'a yönelir.
- `PROJECTION`: eski read field canonical authority'den türetilir.
- `HARD-CUT`: güvensiz yol replacement hazır olur olmaz kapatılır.
- `GREENFIELD`: contract/demo seed üstünde yeni canonical runtime kurulur.
- `ARCHIVE`: caller=0 ve permission=0 sonrası runtime dışına alınır.
- `DELETE-AFTER-GATE`: bütün retirement gate'lerinden sonra silinebilir.

## Koruma kuralları

- Kepenk public frontend `PRESERVE WHOLE UX + CONTENT/API REWIRE`.
- `/giris` gibi çalışan auth/acquisition UX'leri sırf backend authority değişiyor diye yeniden çizilmez.
- `apps/sites` public shell korunur.
- Site editor/theme/template/renderer emeği korunur; authority yeniden bağlanır.
- Strong typed/domain primitives mümkünse korunup canonical authority altında yeniden bağlanır.
- `apps/randevu-server` kapsam dışıdır.
- Hiçbir `DROP` etiketi tek başına delete yetkisi değildir.

## W1 kapanış

- signed session/permission primitive'leri `PRESERVE/REWRITE`,
- phone/Google login route'ları canonical User/Membership/Session'a `ADAPTER`,
- onboarding fixed `123456`, production dev-login ve raw Admin secret `HARD-CUT`,
- proxy cookie-existence trust ve parallel NextAuth/custom/admin session authority `REWRITE`,
- admin impersonation contract seed'i `PRESERVE/PROMOTE`.

## W2 kapanış

- `esnaflar/{id}` monolit truth; Tenant, Profile, Subscription, Entitlement, Preference, Quota ve diğer projection'lara ayrıldı,
- onboarding complete canonical command orchestration'a `REWRITE`,
- setup-progress process Map authority olmaktan çıkarıldı,
- plan/module catalog metadata `PRESERVE`, runtime package-string authorization `REWRITE`,
- `sync-moduller` preference command + entitlement intersection'a taşındı,
- admin tenant/kota mutation'ları canonical commands'a bölündü,
- `paketSenaryosuCalistir` cross-wave decomposition adayı oldu,
- public `PricingCards` görsel olarak `PRESERVE`, commercial truth için `DATA REWIRE`.

## W3 kapanış

- Cloud Tasks + Firestore queue primitive'leri `PRESERVE/HARDEN`, tek DurableJob contract'ına bağlandı,
- shared cron/internal secret modeli ServicePrincipal/OIDC trust'a `REWRITE`,
- AES-GCM primitive `PRESERVE`, key-id/versioned envelope `BUILD`,
- raw provider env/token discovery Credential Authority'ye taşındı,
- Google OAuth Connection + CredentialRef lifecycle'a `REWIRE`,
- Twilio number provisioning/pool gerçek provider primitive'i olarak `PRESERVE`, resource authority `ProviderResourceBinding` oldu,
- duplicate WhatsApp/Instagram ingress tek verified + durable inbox contract'ına indirildi,
- mock/simulated provider success ve production trust downgrade yolları `HARD-CUT/RETIRE`.

## W4 kapanış

- `site-schema`, renderer, publish-engine generator, templates, editor ve `apps/sites` shell `PRESERVE`,
- editor save/autosave draft-only authority'ye taşındı; mutable public `siteData` write kapatıldı,
- `/site/v2/save` canonical Draft Save seed'i, `/site/v2/publish` canonical PublishCommand seed'i oldu,
- PublishedSiteRevision + immutable artifacts + atomic active pointer + rollback `BUILD`,
- DomainBinding global hostname authority olarak ayrıldı; Cloudflare/provider state projection oldu,
- Asset Core ile raw URL/blob media authority kaldırıldı,
- Public Action Gateway ile booking/contact/order live fake-success ve caller-controlled tenant target kapatıldı,
- Kepenk/KPNK ana marketing frontend'i ayrı preservation contract ile korunmaya devam ediyor.

## W5 kapanış

- `crm-schema` Contact/Activity/Label/Segment contract'ları `PRESERVE/PROMOTE`,
- current-main'de tarihsel `/api/customers` ve `/api/musteriler` route'ları yok; obsolete API dual-store yeniden kurulmayacak,
- `musteriCRM.ts` telefon-türetilmiş parallel profile authority olmaktan çıkarılıp migration/compatibility source'a indirildi,
- CustomerIdentityAlias + revisioned Customer Core runtime `BUILD`,
- Conversation / Message / MessageIntent provider-independent authority `BUILD`,
- W3 provider ingress/outbound transport ile Messaging lifecycle ayrıldı,
- campaign/agent/support direct provider send yerine MessageIntent contract'ına bağlandı,
- gerçek `/api/destek/talep` flow'u SupportCase foundation'a taşındı; unsigned cookie decode ve e-mail-only read authorization `HARD-CUT`,
- Support messages Messaging bridge'e, AI confidence ise advisory role'e indirildi.

## W6 kapanış

- booking-schema service/staff/resource/lifecycle/policy/deposit semantics `PRESERVE`; actual payment/refund fields projection'a indirildi,
- `/api/randevu` canonical Booking command + policy/price snapshots + durable notification path'ına `REWIRE`,
- PaymentIntent / Attempt / VerifiedResult / Allocation / Refund / Reconciliation authority `BUILD`,
- Iyzico checkout/installment/refund protocol know-how `PRESERVE`, raw state mutation ve credential lookup ayrıştırıldı,
- subscription/commerce/restaurant callback'lerinin direct domain `paid/odendi` mutation'ları kapatıldı,
- restaurant split payment local fake success `REWRITE`,
- accounting minor-unit/category/source-link primitive'leri `PRESERVE`, immutable FinancialEvent/Ledger authority `BUILD`,
- finance `bilanco` booked appointment price yerine canonical financial projections'a `REWIRE`,
- subscription cancellation Payment'tan W2 commercial command'a ayrıldı.

## W7 kapanış

- `ecom-schema` Product/Variant/Cart/Order semantics `PRESERVE`; money minor-unit ve payment projection sınırı normalize edildi,
- `magazaDB.ts` transactional know-how `PRESERVE`, caller-price ve generic writer authority canonical Commerce commands'a `REWRITE`,
- InventoryItem/Reservation/Adjustment authority `BUILD`; immediate stock decrement reserve/commit/release lifecycle'a taşındı,
- bulk inventory UX `PRESERVE`, direct quantity mutation reason/idempotency/audit taşıyan adjustment command'a `REWIRE`,
- storefront/public catalog current UX korunup W4 public binding/projection'a bağlandı,
- AnalyticsEvent/ConversionEvent spine `BUILD`; revenue/ROAS yalnız W6 financial truth'tan türetilir,
- simulated funnel/churn/self-reported ciro financial truth olmaktan çıkarıldı,
- `packages/marketing` CAPI/audience/budget contracts ve CMO hard-budget guard `PRESERVE/PROMOTE`,
- Meta provider adapter `PRESERVE/HARDEN`, Google mock-active/fake provider ID yolları `HARD-CUT`,
- `/api/ads` gerçek dispatch olmadan success döndüren fake CAPI yolu `HARD-CUT`,
- Campaign/Audience/Budget/Approval lifecycle provider activation/reconciliation ile ayrıştırıldı.

## W8 kapanış

- `AgentBase` max-hop/circuit/quota/DLQ lifecycle intent'i `PRESERVE`, durable `AgentRun/RunStep` authority altına taşındı,
- process-local `AgentBus` ve ADK `InMemoryRunner` authority olmaktan çıkarıldı; W3 durable execution child-run/delegation omurgası oldu,
- `agentRunner`, `lib/ai/agentOrchestrator`, `modelClient`, `modelRouter` içindeki paralel prompt/model/agent registry'leri tek `AgentDefinition + ModelPolicy + ModelGateway` altında birleştirildi,
- `aiSecurity` PII/prompt-injection/cost guard seed'leri `PRESERVE/HARDEN`, prompt güvenliği capability authorization yerine geçmez,
- caller-controlled `esnafId` generic agent execution, literal A2A bearer ve guard'sız ADK RPC `HARD-CUT`,
- `tahsilatAjani`, marketing/reklam helper'ları ve kapora ADK modülü gibi direct domain/provider writers canonical W5/W6/W7 capability calls'a ayrıştırıldı,
- production model/provider fallback çıktılarının fake success olması kapatıldı,
- `kolektifZeka` anonymization/retrieval/evidence/confidence intent'i `PRESERVE`, Pinecone source truth olmaktan çıkarılıp KnowledgeSource/Chunk/EmbeddingRevision projection modeline taşındı,
- `platform_insights` derived projection olarak sınıflandı,
- `RetrievalEvidence`, `OutcomeVerification`, `FeedbackEvent` ve `EvaluationResult` canonical build requirement oldu.

## W9 kapanış

- Restaurant gerçek runtime/UX nedeniyle `MIGRATE + ACTIVATE`; masa/session/check, KDS, waiter task, offline replication, payment timing ve branch KPI akışları W1–W8 core'lara bağlandı,
- Support W5 foundation üstünde state machine, durable SLA, assignment/escalation, Messaging bridge, W8 Knowledge ve risk-tiered AI policy ile tamamlandı,
- Marketplace current contract/demo seed'lerinden Job/Bid/Award/Work, credit ledger ve W6 escrow/payment bridge ile gerçek runtime'a planlandı,
- Procurement current contract/demo seed'lerinden Vendor/SupplierRelationship, Requisition/PO, GoodsReceipt, Inventory movement ve AP bridge ile gerçek runtime'a planlandı,
- private procurement ile platform B2B supplier marketplace ayrı ürün/authority olarak tutuldu,
- Voice/Studio/Blog/SEO/Influencer yeni bounded context yapılmadı; mevcut core'lara adapter/extension/future vertical seed olarak sınıflandı.

## W10 kapanış

- Admin shared-secret/process-local session modeli canonical AdminPrincipal/AdminSession/Capability policy'ye `REWRITE`,
- Admin generic Firestore PATCH/DELETE yerine cross-domain `AdminCommand Gateway` kullanan control plane olarak sabitlendi,
- append-only `AdminActionEvent`, reason/case, step-up/approval, break-glass ve <=1h dual-identity impersonation planlandı,
- FeatureFlag, Entitlement ve OperationalPolicy/KillSwitch authority'leri kesin ayrıldı,
- DataClassPolicy registry ile W1–W9 tüm data sınıfları, derived data ve external sink'ler lifecycle inventory'ye bağlandı,
- versioned Consent, Retention, LegalHold, ExportRequest, ErasureRequest, LifecycleTask ve PurgeProof authority'leri planlandı,
- iki fake privacy cron production success yolu `HARD-CUT`; gerçek `kvkk-purge` lifecycle seed'i Data Inventory driven orchestrator'a `REWIRE`,
- root tenant DELETE `HARD-CUT`; canonical OffboardingRun access revoke -> retention -> purge plan -> verified purge -> tombstone akışına bağlandı,
- final P0/P1/P2 legacy retirement matrix ve universal deletion gates sabitlendi,
- protected frontend/core/extension deny-list final cleanup'a taşındı.

## Master planning kapanış kararı

`SÖKÜM 01–41 -> SENTEZ 01–05 -> W0–W10 -> Pilot-0–4 -> Vertical Activation -> Final Retirement` planlama zinciri tamamlandı.

**Yeni SÖKÜM 42, W11 veya yeni planning frontier açılmaz.** Yeni bir current-main live writer implementation sırasında keşfedilirse önce mevcut canonical owner'lardan birine map edilir; gerçekten yeni domain authority olduğu kanıtlanmadan yeni bounded context açılmaz.

### Implementation entry gate

İlk implementation başlangıcı şu paket olarak tanımlanmıştır; tamamlanan iş yeniden başlatılmaz:

```text
Pilot-0 / P0-00 Trust Baseline / Evidence Harness
```

Ardından planlanan dependency graph izlenir. Trust gate geçmeden feature migration başlamaz.

### Mevcut durum

- SÖKÜM: **kapalı**
- SENTEZ: **kapalı**
- W0–W10 execution planning: **kapalı**
- Pilot cutover packaging: **kapalı**
- Pilot-0 PR packaging: **kapalı**
- Pilot-1 PR packaging: **kapalı**
- Pilot-2 PR packaging: **kapalı**
- Pilot-3 PR packaging: **kapalı**
- Pilot-4 PR packaging: **kapalı**
- Vertical activation PR packaging: **kapalı**
- Final retirement PR packaging: **kapalı**
- Planning frontier: **YOK**
- Production implementation: **P0/KC İLERLİYOR**; [tarihli durum ve açık kapılar](../product/STATUS-2026-09-17.md)
- Application code: bu planlama fazında **DEĞİŞTİRİLMEDİ**
- Kepenk public/frontend preservation contract: **AKTİF**

### Sonraki adım

Mevcut P0/KC görevleri ve Randevu'nun bağımsız ürün hattı kendi sahipleriyle ilerler. Güncel PR/CI/acceptance kontrol edilmeden tarihsel başlangıç paketi yeniden açılmaz. Bu index ürün sırası için master plana, sıradaki somut kapılar için tarihli durum kaydına yönlendirir; yeni runtime görevi veya merge izni vermez.
