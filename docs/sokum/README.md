# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-16  
> **Durum:** **KEŞİF / SÖKÜM FAZI TAMAMLANDI**  
> **Amaç:** `KEPENK_SOKUM_PLANI.md` korunmuş geniş snapshot olarak kalırken, repo ile doğrulanmış söküm kararlarını ve final mimari baseline'ı burada indekslemek.

## Güncel durum

| No | Alan | Durum | Belge |
|---|---|---|---|
| 01-24 | Önceki söküm kararları | KAPALI / arşivlenmiş | `KEPENK_SOKUM_PLANI.md` |
| 25 | Public Site Runtime / Publish Artifact Authority | KAPALI | `docs/sokum/25-public-site-runtime.md` |
| 26 | Site Authoring / Publish / Domain Binding Writer | KAPALI | `docs/sokum/26-site-authoring-publish-domain-writer.md` |
| 27 | Media / Asset Authority | KAPALI | `docs/sokum/27-media-asset-authority.md` |
| 28 | Public Interaction / Forms / Lead Capture / Action Capability | KAPALI | `docs/sokum/28-public-interaction-action-capability-boundary.md` |
| 29 | Identity / Session / Tenant / Service Trust | KAPALI | `docs/sokum/29-identity-session-tenant-service-trust.md` |
| 30 | Secrets / Credentials / Rotation | KAPALI | `docs/sokum/30-secrets-credential-authority-rotation.md` |
| 31 | Observability / Audit / Operational Truth | KAPALI | `docs/sokum/31-observability-audit-operational-truth.md` |
| 32 | Data Lifecycle / Privacy / Consent / Retention | KAPALI | `docs/sokum/32-data-lifecycle-privacy-consent-retention.md` |
| 33 | External Integration Connection Lifecycle | KAPALI | `docs/sokum/33-integration-connection-lifecycle.md` |
| 34 | Tenant / Business Lifecycle / Onboarding / Provisioning / Offboarding | KAPALI | `docs/sokum/34-tenant-business-lifecycle.md` |
| 35 | Entitlement / Capability / Module / Feature Flag Runtime Authority | KAPALI | `docs/sokum/35-entitlement-capability-runtime-authority.md` |
| 36 | Canonical Architecture Synthesis / KEEP-REWRITE-DROP / Migration & Cleanup Sequence | KAPALI | `docs/sokum/36-canonical-architecture-synthesis.md` |

## Kanonik devam kuralı

- `KEPENK_SOKUM_PLANI.md` 01-24 geniş tarihsel snapshot olarak korunur.
- 25-36 doğrulanmış belgeler `docs/sokum/` altında ayrı tutulur.
- Yeni çalışma başlamadan önce normalde yalnız bu indeks + `36-canonical-architecture-synthesis.md` okunur; ayrıntı gerektiğinde ilgili eski söküm belgesi açılır.
- Yeni bir `SÖKÜM 37` otomatik açılmaz. Ancak file-level incelemede mevcut canonical authority haritasına map edilemeyen gerçek ve bağımsız bir domain bulunursa yeni söküm frontier'ı açılabilir.
- `apps/randevu-server` bu Kepenk söküm/migration çalışmasının kapsamı dışındadır ve değiştirilmez.
- Production secret/token değerleri dokümana kopyalanmaz.

## Kapanan son karar: SÖKÜM 36

01-35 arasındaki domain ve cross-cutting kararlar tek uygulanabilir mimari baseline'da birleştirildi.

Ana sonuç:

> **Bir business gerçeğinin tek write authority'si olacak; diğer bütün gösterimler projection, adapter veya read model olarak kalacak. Big-bang rewrite yapılmayacak.**

Final bounded-context grupları:

```text
CONTROL PLANE
Identity / RequestContext
BusinessTenant Lifecycle
Subscription / Entitlement / EffectiveCapabilitySet
Credential / Audit / Telemetry / Data Lifecycle

BUSINESS DOMAIN PLANE
Business Profile
Customer / Booking / Commerce
Payment / Finance
Messaging / Marketing
Agent Runtime / Knowledge

DELIVERY PLANE
SiteDraft / Asset
Publish / PublishedSiteRevision
DomainBinding / apps/sites
Public Action Gateway

INTEGRATION & EXECUTION PLANE
Durable Jobs / Outbox / Event Inbox
IntegrationConnection
Provider Adapters
```

KEEP yönü:

- `apps/sites` public shell,
- `apps/web` ürün/dashboard/editor UX,
- `site-schema`, `renderer`, `publish-engine`, `templates`,
- Cloudflare/provider adapters,
- CRM v2 primitive'leri,
- booking/e-commerce schema ve policy semantics,
- accounting minor-unit/source-link yönü,
- agent kernel/config/factory/result-verifier seed'leri,
- RAG/feedback/collective-learning algoritmik intent'i,
- Cloud Tasks/retry/DLQ, AES-GCM, Sentry/readiness ve consent UI primitive'leri.

REWRITE/BUILD yönü:

- BusinessTenant lifecycle,
- User/Membership/Session/RequestContext,
- Subscription/Entitlement/EffectiveCapabilitySet,
- Asset Core,
- immutable PublishedSiteRevision + active pointer,
- DomainBinding,
- Public Action Gateway,
- IntegrationConnection,
- canonical Durable Job/Outbox/Event Inbox,
- Payment Core,
- immutable Finance Ledger,
- Audit Ledger + TelemetryContext,
- Consent/Retention/Export/Erasure/Legal Hold lifecycle,
- single Agent Runtime / Capability Bus / Model Gateway,
- canonical analytics/revenue/attribution spine.

Migration stratejisi:

```text
canonical authority
      ↓
one-way compatibility projection
      ↓
shadow read / parity
      ↓
legacy write disable
      ↓
caller = 0
      ↓
archive
      ↓
delete
```

Financial, identity/security, tenant lifecycle, consent/privacy, entitlement, active publish ve provider credential lifecycle alanlarında bidirectional dual-write yasaktır.

## Sıradaki faz

Keşif/söküm tamamlandı. Bundan sonraki çalışma yeni domain aramak değil:

1. **exact file-level cleanup manifest**,
2. **canonical contract/spec dosyaları**,
3. **migration wave task breakdown**,
4. **implementation + review sırası**,
5. ardından kontrollü cleanup ve yeni Kepenk implementasyonu.

Bu fazda da önce deprecate/observe/adapter/cutover yapılacak; dosya silme en son gelecektir.
