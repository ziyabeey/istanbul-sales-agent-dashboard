# Kepenk v2 — Exact Execution Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLANLAMA AKTİF — implementation başlamadı  
> **Kaynak:** SÖKÜM 01–41 + SENTEZ 01–05  
> **Amaç:** Canonical mimariyi exact file/route/package task'larına dönüştürmek.  
> **Kural:** Bu klasör kod implementasyonu yapmaz; hangi dosyanın hangi wave'de ne olacağını ve hangi acceptance gate ile kapanacağını sabitler.

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
| W9 | Vertical Activation | AÇIK | — |
| W10 | Admin / Privacy / Offboarding convergence + final cleanup | BEKLİYOR | — |

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

## Aktif frontier

**W9 — Vertical Activation exact manifest.**

W9 target:

```text
Restaurant Operations / POS / KDS / offline-safe operations
Marketplace / Job / Bid / Agreement / Escrow / Credit
Procurement / Supplier / PO / Reorder
Support full SLA / escalation / knowledge activation
Future vertical seeds: Studio / Blog / SEO / Influencer
```
