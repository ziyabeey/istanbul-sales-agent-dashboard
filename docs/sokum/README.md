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
| 31 | Observability / Audit / Logging / Metrics / Tracing / Operational Truth | AÇIK | sıradaki doğrulama turu |

## Kanonik devam kuralı

- Eski kararları kaybetmemek için `KEPENK_SOKUM_PLANI.md` toplu snapshot olarak korunur.
- SÖKÜM 25 ve sonrası detaylı, repo ile doğrulanmış belgeler `docs/sokum/` altında ayrı tutulur.
- Yeni tur başlamadan önce bu indeks ve en son kapalı söküm belgesi okunur.
- Paralel ajan aynı frontier'ı kapatmışsa üzerine yazılmaz; güncel `main` yeniden okunup sonraki açık frontier'a geçilir.
- `apps/randevu-server` bu söküm serisi nedeniyle değiştirilmez.

## Kapanan son karar: SÖKÜM 30

Credential ve secret katmanında tek bir canonical authority olmadığı doğrulandı. Platform provider key'leri, tenant OAuth grant'leri, signing/encryption key'leri, admin/service bearer'ları ve webhook secrets env/document sözleşmelerine dağılmış durumda.

En kritik kararlar:

- `.env` canonical secret vault değildir; bootstrap/config/secret-reference katmanı olacaktır.
- provider adapter'ları raw `process.env` okumak yerine Credential Resolver üzerinden scoped credential handle alacaktır.
- tenant OAuth tokenları generic business record içinde yaşamayacak, ayrı `OAuthGrant` lifecycle'ına taşınacaktır.
- persistent encrypted envelope `kid` taşıyacak ve versioned keyring ile decrypt/rotate edilecektir.
- session signing key'leri de `kid` + active/previous keyring ile döndürülebilecektir.
- `ADMIN_SECRET_TOKEN` ve `CRON_SECRET` universal production authority olmaktan çıkacaktır.
- service-to-service trust kısa ömürlü OIDC/workload identity + audience ile kurulacaktır.
- required webhook signing credential yoksa endpoint fail-closed olacaktır.
- production mock/default/empty credential fallback'leri ve confidential `NEXT_PUBLIC_*` secret fallback'leri kaldırılacaktır.
- sandbox/mock provider environment'a production'da sessiz fallback yasaktır.

Canonical yön:

```text
Actor / Service / Public Capability
               ↓
           TrustContext
               ↓
       Capability Definition
               ↓
     Credential Requirements
               ↓
       Credential Resolver
          ↙           ↘
platform credential   tenant OAuthGrant
          ↓             ↓
   CredentialVersion  encrypted envelope(kid)
          ↘             ↙
        Secret Store / KMS
               ↓
         Provider Adapter
               ↓
       External Provider
```

En önemli invariant:

> Secret değerinin kendisi authority değildir. Credential owner + scope + caller + active version + capability policy birlikte authority oluşturur.

## Aktif frontier

### SÖKÜM 31 - Observability / Audit / Logging / Metrics / Tracing / Operational Truth

Öncelikli sorular:

- Structured logging var mı, yoksa `console.*` adaları mı?
- Request ID, correlation ID, command ID ve event ID zinciri var mı?
- Public action -> domain command -> outbox -> worker -> provider tek trace altında izlenebiliyor mu?
- Admin, impersonation, credential rotation ve tenant-sensitive mutation'lar immutable audit'e düşüyor mu?
- Audit log ile debug/application log birbirinden ayrılmış mı?
- Outbox/worker attempt, retry, DLQ ve dead-job görünürlüğü var mı?
- Metrics, SLI/SLO ve error budget kavramları var mı?
- Provider latency/error/rate-limit degradation alarm üretiyor mu?
- PII, token ve credential redaction merkezi mi?
- Liveness, readiness ve dependency health birbirinden ayrılmış mı?
- Production incident sırasında hangi tenant/command/provider zincirinin etkilendiği bulunabiliyor mu?
- Retention, tamper resistance ve audit export politikası var mı?

SÖKÜM 31'in hedefi:

```text
request / actor / tenant / command / event / worker / provider
                         ↓
                 tek correlation graph
                         ↓
        logs + metrics + traces + immutable audit
```

> **Önceki sökümlerde tanımlanan invariant'ların production'da gerçekten korunup korunmadığını kanıtlayacak operational truth katmanını kurmak.**
