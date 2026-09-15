# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-15  
> **Amaç:** `KEPENK_SOKUM_PLANI.md` korunmuş geniş snapshot olarak kalırken, güncel doğrulama turlarının canlı frontier'ını burada tutmak.

## Güncel durum

| No | Alan | Durum | Belge |
|---|---|---|---|
| 01-24 | Önceki söküm kararları | KAPALI / arşivlenmiş | `KEPENK_SOKUM_PLANI.md` |
| 25 | Public Site Runtime / `apps/sites` / Publish Artifact Authority | KAPALI | `docs/sokum/25-public-site-runtime.md` |
| 26 | Site Authoring / Draft -> Publish Command / Artifact Storage / Domain Binding Writer | KAPALI | `docs/sokum/26-site-authoring-publish-domain-writer.md` |
| 27 | Media / Asset Storage / Upload / CDN / Immutable Asset Reference Authority | KAPALI | `docs/sokum/27-media-asset-authority.md` |
| 28 | Public Interaction Runtime / Forms / Lead Capture / Action Capability Boundary | KAPALI | `docs/sokum/28-public-interaction-action-capability-boundary.md` |
| 29 | Identity / Session / Tenant Context / API Guard / Service Trust Boundary | KAPALI | `docs/sokum/29-identity-session-tenant-service-trust.md` |
| 30 | Secrets / Configuration / Provider Credentials / Encryption Key Rotation Authority | KAPALI | `docs/sokum/30-secrets-credential-authority-rotation.md` |
| 31 | Observability / Audit / Logging / Metrics / Tracing / Operational Truth | KAPALI | `docs/sokum/31-observability-audit-operational-truth.md` |
| 32 | Data Lifecycle / Privacy / Consent / Retention / Export / Deletion Authority | AÇIK | sıradaki doğrulama turu |

## Kanonik devam kuralı

- Eski kararları kaybetmemek için `KEPENK_SOKUM_PLANI.md` toplu snapshot olarak korunur.
- SÖKÜM 25 ve sonrası detaylı, repo ile doğrulanmış belgeler `docs/sokum/` altında ayrı tutulur.
- Yeni tur başlamadan önce bu indeks ve en son kapalı söküm belgesi okunur.
- Paralel ajan aynı frontier'ı kapatmışsa üzerine yazılmaz; güncel `main` yeniden okunup sonraki açık frontier'a geçilir.
- `apps/randevu-server` bu söküm serisi nedeniyle değiştirilmez.

## Kapanan son karar: SÖKÜM 31

Observability parçalarının mevcut olduğu fakat tek bir operational truth authority oluşturmadığı doğrulandı.

Mevcut iyi tohumlar:

- Sentry error/tracing,
- liveness/readiness ayrımı,
- provider/agent operational log intent'i,
- Cloud Tasks managed retry,
- Firestore queue race-control,
- DLQ + operator alarm fikri.

Canonical yön:

```text
Inbound Request
      ↓
RequestContext + TelemetryContext
      ↓
CommandEnvelope
      ↓
Domain Commit
      ↓
DomainEvent
      ↓
OutboxJob
      ↓
JobAttempt
      ↓
ProviderCall
      ↓
ProviderOutcome
```

Aynı business causality bütün async sınırlar boyunca `correlationId`yi koruyacaktır.

Yan authority'ler ayrıdır:

```text
Structured Logs
Distributed Traces
Operational Metrics
Immutable Audit Ledger
```

En kritik kararlar:

- debug/application log, merchant notification ve audit birbirinden ayrılacaktır.
- `requestId`, `correlationId`, `commandId`, `eventId`, `jobId`, `attemptId` ve provider call kimlikleri explicit olacaktır.
- retry attempt geçmişi overwrite edilmeyecek, her deneme ayrı record olacaktır.
- security/compliance audit sample edilmeyecek ve normal CRUD ile değiştirilemeyecektir.
- admin/impersonation, credential rotate/revoke, role changes, finance, publish/domain ve privacy actions audit-worthy olacaktır.
- raw request body, worker payload, AI output, phone/email, token ve provider response default telemetry olmayacaktır.
- Sentry/log/DLQ dahil bütün sink'ler ortak data-classification + recursive redaction policy kullanacaktır.
- sensitive authenticated surfaces için session replay text/media masking güvenli default olacaktır.
- operational metrics capability bazlı SLI/SLO ve provider degradation alerting'i besleyecektir.
- liveness, core readiness ve capability readiness ayrı kavramlardır.

En önemli invariant:

> Production doğruluğu yalnız final domain state ile değil, o state'e hangi actor/command/event/job/provider zinciriyle ulaşıldığını kanıtlayan causal evidence ile tamamlanır.

## Aktif frontier

### SÖKÜM 32 - Data Lifecycle / Privacy / Consent / Retention / Export / Deletion Authority

Öncelikli sorular:

- kişisel veri hangi canonical owner/resource altında tutuluyor?
- consent yalnız UI checkbox mı, yoksa versioned legal/purpose event mi?
- KVKK/GDPR aydınlatma ve izin kanıtı hangi policy version'a bağlı?
- lead/customer/contact/booking/commerce verileri için retention sınıfları var mı?
- tenant kapanınca soft-delete, hard-delete ve legal hold nasıl çalışıyor?
- data subject deletion request CRM, booking, commerce, logs, DLQ, assets, integrations ve provider kopyalarına nasıl yayılıyor?
- deletion idempotent ve resumable bir workflow mu?
- anonymization, restriction ve deletion birbirinden ayrılmış mı?
- data export canonical snapshot mı, yoksa raw collection dump mı?
- audit integrity ile right-to-erasure nasıl birlikte korunuyor?
- backup retention primary deletion'dan nasıl ayrılıyor?
- AI prompt/output, embeddings/vector stores ve generated media lifecycle graph'a dahil mi?
- consent withdrawal gelecekteki automation/provider actions'ı gerçekten durduruyor mu?

SÖKÜM 32'nin hedefi:

```text
Data Classification
       ↓
Data Subject / Tenant Ownership
       ↓
Purpose + Consent / Legal Basis
       ↓
Retention Policy
       ↓
Export / Restrict / Anonymize / Delete
       ↓
Propagation Graph
       ↓
Verifiable Completion + Audit
```

> **Verinin yalnız nerede tutulduğunu değil, neden tutulduğunu, ne kadar yaşayacağını ve silme/export kararının bütün kopyalara nasıl güvenilir biçimde yayılacağını canonical authority'ye bağlamak.**
