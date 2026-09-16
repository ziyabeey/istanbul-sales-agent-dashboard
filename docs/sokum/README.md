# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-16  
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
| 33 | External Integration Connection Lifecycle / OAuth Grants / Webhooks / Sync / Reconciliation | KAPALI | `docs/sokum/33-integration-connection-lifecycle.md` |
| 34 | Tenant / Business Lifecycle / Onboarding / Provisioning / Suspension / Offboarding Authority | AÇIK | sıradaki doğrulama turu |

## Kanonik devam kuralı

- Eski kararları kaybetmemek için `KEPENK_SOKUM_PLANI.md` toplu snapshot olarak korunur.
- SÖKÜM 25 ve sonrası detaylı, repo ile doğrulanmış belgeler `docs/sokum/` altında ayrı tutulur.
- Yeni tur başlamadan önce bu indeks ve en son kapalı söküm belgesi okunur.
- Paralel ajan aynı frontier'ı kapatmışsa üzerine yazılmaz; güncel `main` yeniden okunup sonraki açık frontier'a geçilir.
- `apps/randevu-server` bu söküm serisi nedeniyle değiştirilmez.
- Gerçek production secret/token değerleri dokümana kopyalanmaz; yalnız secret adı, scope'u, lifecycle ve blast radius değerlendirilir.

## Kapanan son karar: SÖKÜM 33

Provider entegrasyonlarının mevcut olduğu fakat tenant-provider ilişkisinin kendisi için canonical lifecycle authority bulunmadığı doğrulandı.

En kritik bulgular:

- Google OAuth callback encrypted tokenları `esnaflar/{id}/integrations/google_gmb` altına yazarken Google runtime client'ı root `googleAccessToken/googleAccountId/googleLocationId` alanlarını okuyor.
- Instagram için iki ayrı webhook authority farklı tenant-binding alanları (`instagramAccountId` / `instagramUserId`) ve farklı verify-token isimleri kullanıyor.
- Instagram outbound credential ownership tenant root tokenı ile global env tokenı arasında parçalı.
- WhatsApp için iki ayrı inbound authority var; bir yol sender/customer telefonundan tenant çözmeye çalışırken diğer yol destination Twilio numarasını kullanıyor.
- İncelenen provider POST webhook yollarında ortak ve zorunlu signature verification ingress guard doğrulanmadı.
- Webhook idempotency provider bazında ad hoc; canonical durable provider-event inbox yok.
- Twilio provisioning provider resource'u doğrudan tenant root'a bağlıyor; explicit resource lifecycle/health/release authority yok.
- Token varlığı, provider resource doğrulaması, connection health, webhook subscription, sync cursor, reconnect/revoke/disconnect ve offboarding tek aggregate altında birleşmiyor.

Canonical yön:

```text
Tenant
  ↓
IntegrationConnection
  ├── CredentialRef
  ├── ProviderResourceBinding[]
  ├── WebhookSubscription[]
  ├── SyncCursor[]
  └── Health / Reconciliation
           ↓
   Provider Adapters
```

State family:

```text
PENDING_AUTH
  ↓
CONNECTED
  ├─→ DEGRADED
  ├─→ EXPIRED / REAUTH_REQUIRED
  ├─→ REVOKING → REVOKED
  └─→ DISCONNECTING → DISCONNECTED
```

Provider ingress için zorunlu sıra:

```text
verify signature
      ↓
resolve ProviderResourceBinding
      ↓
resolve IntegrationConnection + tenant
      ↓
dedupe providerEventId
      ↓
durable IntegrationEventInbox commit
      ↓
ACK provider
      ↓
async processing / retry / DLQ
```

En önemli invariant:

> Bir provider action veya inbound event ancak verified, tenant-bound ve lifecycle-aware bir `IntegrationConnection` üzerinden domain'e girebilir.

## Aktif frontier

### SÖKÜM 34 - Tenant / Business Lifecycle / Onboarding / Provisioning / Suspension / Offboarding Authority

SÖKÜM 29 tenant identity/trust boundary'yi, SÖKÜM 32 data deletion/offboarding propagation'ını, SÖKÜM 33 external provider connection lifecycle'ını kapattı. Açık kalan üst seviye soru tenant'ın kendisinin yaşam döngüsüdür.

Öncelikli sorular:

- Yeni işletme/tenant hangi canonical command ile yaratılıyor?
- `esnafId`, business identity ve tenant authority tek aggregate mi?
- Onboarding yalnız form/progress state mi, yoksa resumable provisioning workflow mu?
- Tenant ne zaman `ACTIVE` kabul ediliyor?
- Site, package/entitlement, integration, domain, messaging ve diğer provider resource provisioning hangi orchestrator'a bağlı?
- Partial onboarding/provisioning failure nasıl resume/rollback ediliyor?
- Aynı create/provision command retry edilirse duplicate tenant veya resource oluşuyor mu?
- `ACTIVE`, `SUSPENDED`, `CLOSING`, `DELETING`, `DELETED` gibi tenant state'leri var mı?
- Suspension public runtime, background jobs, outbound messaging, provider actions ve login üzerinde fail-closed uygulanıyor mu?
- Billing/package downgrade tenant state'inden mi, entitlement state'inden mi yönetiliyor?
- Tenant kapanışı önce capability/resource freeze mi yapıyor, sonra SÖKÜM 32 deletion ve SÖKÜM 33 provider revoke akışlarını mı çağırıyor?
- DomainBinding, media assets, jobs, integrations ve external resources tenant ownership graph'ında explicit mi?
- Offboarding tamamlandı denebilmesi için hangi reconciliation/proof gerekiyor?
- Tenant restore/reopen destekleniyorsa silme ve provider revoke state'leriyle nasıl çakışmıyor?
- Admin/operator tenant lifecycle action'ları audit ve optimistic concurrency altında mı?

SÖKÜM 34'ün hedefi:

```text
CreateBusinessCommand
        ↓
Tenant / Business Aggregate
        ↓
Onboarding Workflow
        ↓
Provisioning Plan
   ↙      ↓       ↘
Site   Entitlements  External Resources
        ↓
ACTIVE
  ↓          ↓
SUSPENDED   CLOSING
                ↓
       Freeze New Actions
                ↓
   Provider / Resource Offboarding
                ↓
       Data Lifecycle / Erasure
                ↓
       Reconciliation Proof
                ↓
             CLOSED
```

> **Tenant'ın yalnız bir `esnaflar/{id}` dokümanı değil, yaratılmasından kapanışına kadar bütün capability ve resource lifecycle'ını yöneten canonical aggregate olup olmadığını doğrulamak.**
