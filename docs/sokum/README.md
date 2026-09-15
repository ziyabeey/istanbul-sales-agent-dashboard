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
| 30 | Secrets / Configuration / Provider Credentials / Encryption Key Rotation Authority | AÇIK | sıradaki doğrulama turu |

## Kanonik devam kuralı

- Eski kararları kaybetmemek için `KEPENK_SOKUM_PLANI.md` toplu snapshot olarak korunur.
- SÖKÜM 25 ve sonrası detaylı, repo ile doğrulanmış belgeler `docs/sokum/` altında ayrı tutulur.
- Yeni tur başlamadan önce bu indeks ve en son kapalı söküm belgesi okunur.
- Paralel ajan aynı frontier'ı kapatmışsa üzerine yazılmaz; güncel `main` yeniden okunup sonraki açık frontier'a geçilir.
- `apps/randevu-server` bu söküm serisi nedeniyle değiştirilmez.

## Kapanan son karar: SÖKÜM 29

Identity ve service trust katmanında tek bir canonical trust graph olmadığı doğrulandı. Merchant JWT, NextAuth admin, raw admin token, impersonation JWT, cron secret, Cloud Task secret, GCP OIDC ve provider webhook doğrulamaları paralel authority'ler olarak yaşıyor.

En kritik bulgular:

- `/api/onboarding/complete`, verified OTP proof olmadan tenant ve session oluşturabiliyor; client package ve aktif modül seçimlerini etkileyebiliyor.
- onboarding SMS başarısızlığında sabit `123456` OTP fallback'i devreye giriyor.
- dashboard proxy custom merchant session'ı doğrulamak yerine cookie varlığına bakıyor.
- admin login cookie contract'ı ile proxy'nin admin cookie doğrulaması aynı değil.
- `/api/cron/kuyruk-isleyici` auth olmadan privileged queue/AI/WhatsApp işleri çalıştırabiliyor.
- `food-delivery` webhook secret/signature eksikken signature kontrolünü atlayabiliyor.
- `iyzico-kapora` request body'deki ödeme başarısını provider verification olmadan state transition'a çevirebiliyor.
- `domain/sec` ve `site/versiyonlar` gibi legacy route'lar tenant ID'yi request'ten authority olarak kabul edebiliyor.

Canonical yön:

```text
Credential
   ↓
Authentication Adapter
   ↓
Principal
   ↓
RequestContext Resolver
   ↓
Tenant / Membership / Delegation
   ↓
Capability Authorization
   ↓
Entitlement Check
   ↓
Domain Command / Query
   ↓
Audit + Outbox
```

Temel ayrım:

```text
Credential  -> kim olduğunu kanıtlar
Membership  -> hangi tenant'ta yetkili olduğunu kanıtlar
Capability  -> ne yapabileceğini belirler
Entitlement -> tenant'ın özelliğe sahip olup olmadığını belirler
RequestContext -> bunları domain katmanına tek sözleşme olarak taşır
```

GCP OIDC verifier intent'i, Firestore RBAC intent'i, fail-closed session secret yaklaşımı ve AES-256-GCM token encryption primitive'i korunacaktır. Production dev-login, fixed OTP fallback, cookie-presence authorization, auth'suz privileged workers ve unverified payment webhooks kaldırılacaktır.

## Aktif frontier

### SÖKÜM 30 - Secrets / Configuration / Provider Credentials / Encryption Key Rotation Authority

Öncelikli sorular:

- Environment secret'ları hangi dosyalarda default/fallback değerlerle kullanılıyor?
- Hangi credentials platform-global, hangileri tenant/provider bağlantısına ait?
- `TOKEN_ENCRYPTION_KEY` versioning ve rotation nasıl yapılacak?
- OAuth refresh/access token'ları nerede ve hangi owner altında tutuluyor?
- Encryption key id/version ciphertext ile birlikte saklanıyor mu?
- Dual-read / dual-write rotation mümkün mü?
- Secret Manager/KMS adapter mevcut mu?
- Cloudflare, Google, Twilio, Netgsm, Meta ve Iyzico credentials nasıl ayrıştırılıyor?
- Production readiness hangi security dependency'lerini gerçekten zorunlu tutuyor?
- Secret leak/revoke sonrası blast radius nasıl sınırlandırılıyor?
- Runtime config ile domain/business config nasıl ayrılıyor?
- Provider credential last-used, expiry, refresh, revoke ve audit lifecycle'ı var mı?

SÖKÜM 30'un hedefi:

> **Secret değerlerini kod/env fallback dünyasından çıkarıp versioned, rotatable, scoped ve auditable credential authority'ye bağlamak.**
