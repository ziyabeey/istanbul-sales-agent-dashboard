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
| 32 | Data Lifecycle / Privacy / Consent / Retention / Export / Deletion Authority | KAPALI | `docs/sokum/32-data-lifecycle-privacy-consent-retention.md` |
| 33 | External Integration Connection Lifecycle / OAuth Grants / Webhooks / Sync / Reconciliation | AÇIK | sıradaki doğrulama turu |

## Kanonik devam kuralı

- Eski kararları kaybetmemek için `KEPENK_SOKUM_PLANI.md` toplu snapshot olarak korunur.
- SÖKÜM 25 ve sonrası detaylı, repo ile doğrulanmış belgeler `docs/sokum/` altında ayrı tutulur.
- Yeni tur başlamadan önce bu indeks ve en son kapalı söküm belgesi okunur.
- Paralel ajan aynı frontier'ı kapatmışsa üzerine yazılmaz; güncel `main` yeniden okunup sonraki açık frontier'a geçilir.
- `apps/randevu-server` bu söküm serisi nedeniyle değiştirilmez.
- Gerçek production secret/token değerleri dokümana kopyalanmaz; yalnız secret adı, scope'u, lifecycle ve blast radius değerlendirilir.

## Kapanan son karar: SÖKÜM 32

Privacy/KVKK niyeti mevcut olsa da canonical Data Lifecycle Authority olmadığı doğrulandı.

En kritik bulgular:

- tenant purge akışları yalnız belirli collection/alanları kapsıyor; bütün veri grafiğini bilmiyor,
- ayrı `data-purge` yolu gerçek deletion yerine simüle edilmiş başarı üretebiliyor,
- admin tenant DELETE yalnız root `esnaflar/{id}` dokümanını silebiliyor,
- consent UI checkbox ve metin düzeyinde bulunabiliyor ancak versioned purpose/evidence authority yok,
- canonical subject-level customer erase/export workflow doğrulanmadı,
- `musteriProfiller` telefon, özel gün, segment, harcama tahmini ve sonraki ziyaret tahmini gibi derived personal data taşıyor,
- `esnafHafizalari` ve `musteriKonusmalar` gibi AI/conversation-derived veriler source lifecycle'a otomatik bağlanmıyor,
- logs, DLQ, audit, Sentry/Telegram ve external provider kopyaları privacy propagation graph'ın doğal parçası değil,
- canonical legal-hold ve restore sonrası erasure reconciliation authority doğrulanmadı.

Canonical yön:

```text
              Data Inventory
                    ↓
             DataClassPolicy
          ↙         ↓          ↘
   Consent Core  Retention   Legal Hold
          ↘         ↓          ↙
             Lifecycle Core
          ↙         ↓          ↘
   ExportRequest  Erasure   Offboarding
                      ↓
                DeletionPlan
                      ↓
                DeletionTask[]
                      ↓
     +----------------------------------+
     | Domain DB                        |
     | CRM / Booking / Commerce         |
     | Conversation / AI Derived Data   |
     | Assets                           |
     | Search / Vector / Analytics      |
     | Logs / Audit / DLQ               |
     | Cache / Jobs                     |
     | External Providers               |
     +----------------------------------+
                      ↓
                Reconciliation
                      ↓
             ErasureProof / Audit
```

En önemli ayrımlar:

```text
Consent withdrawal != ErasureRequest
Subject erasure     != Tenant offboarding
Root delete         != Completed purge
Credential delete   != Provider grant revoke
Source data delete  != Derived data delete
```

Privacy lifecycle durable ve idempotent olacaktır. Bir required deletion target başarısızsa request `COMPLETED` olamaz. Simulated/no-op purge production success üretemez. Immutable published artifact'lar erasable customer PII embed etmeyecektir.

## Aktif frontier

### SÖKÜM 33 - External Integration Connection Lifecycle / OAuth Grants / Webhook Subscription / Sync & Reconciliation Authority

Öncelikli sorular:

- Bir tenant provider bağlantısı canonical olarak nasıl `CONNECTED` olur?
- OAuth grant, stored credential ve provider resource mapping aynı connection'a nasıl bağlanır?
- Aynı tenant/provider için birden fazla connection destekleniyor mu?
- Token refresh/reconnect failure state machine'i var mı?
- Webhook subscription create/rotate/delete lifecycle'ını kim yönetiyor?
- Provider webhook hangi IntegrationConnection'a ve tenant'a server-side resolve ediliyor?
- Kepenk -> provider ve provider -> Kepenk sync cursor/idempotency authority nerede?
- External state drift nasıl detect/reconcile ediliyor?
- Provider resource deletion/revocation ile local disconnect nasıl koordine ediliyor?
- Tenant offboarding provider grants/subscriptions/resources tarafına nasıl yayılıyor?
- Connection `DEGRADED`, `EXPIRED`, `REVOKED` veya `BROKEN` olduğunda domain feature fail-closed mu?
- Provider rate limit/quota/backoff state'i connection lifecycle'a bağlı mı?
- Credential rotation connection'ı kesmeden nasıl uygulanıyor?
- Health/observability connection ve provider resource seviyesinde yeterli mi?

SÖKÜM 33'ün hedefi:

```text
Tenant + Provider
      ↓
IntegrationConnection
      ↓
OAuth Grant / CredentialRef
      ↓
Provider Resource Bindings
      ↓
Webhook Subscriptions + Sync Cursors
      ↓
Inbound / Outbound Sync
      ↓
Reconciliation + Health
      ↓
Reconnect / Revoke / Disconnect / Offboarding
```

> **Credential'dan daha üst seviye bir IntegrationConnection authority kurup provider bağlantısının bütün yaşam döngüsünü observable, reconnectable, revocable ve reconcilable hale getirmek.**
