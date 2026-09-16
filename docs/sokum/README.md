# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-16  
> **Amaç:** `KEPENK_SOKUM_PLANI.md` korunmuş geniş snapshot olarak kalırken, güncel doğrulama turlarının canlı frontier'ını burada tutmak.

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
| 35 | Entitlement / Capability / Module / Feature Flag Runtime Authority | AÇIK | sıradaki doğrulama turu |

## Kanonik devam kuralı

- `KEPENK_SOKUM_PLANI.md` 01-24 geniş snapshot olarak korunur.
- 25+ doğrulanmış belgeler `docs/sokum/` altında ayrı tutulur.
- Yeni turda yalnız bu indeks + en son kapalı söküm + aktif frontier kodu okunur.
- Paralel ajan frontier'ı kapatmışsa güncel `main` okunup sonraki açık frontier'a geçilir.
- `apps/randevu-server` bu söküm serisi nedeniyle değiştirilmez.
- Production secret/token değerleri dokümana kopyalanmaz.

## Kapanan son karar: SÖKÜM 34

Canonical tenant lifecycle authority olmadığı doğrulandı.

En kritik bulgular:

- `/onboarding/submit` tenant yaratmadan AI preview success dönebilirken `/onboarding/complete` doğrudan `esnaflar/{id}` yaratıp session açıyor.
- onboarding request içindeki `paket` doğrudan tenant root'a yazılabiliyor; server-side entitlement authority bu noktada görünmüyor.
- `kvkkOnay: true` creation snapshot'ına hard-coded yazılıyor; consent lifecycle ile tenant creation karışmış.
- setup progress production truth değil, in-memory `demo-esnaf` state'i.
- gerçek `durum: aktif` geçişi ödeme sonrası `paketSenaryosuCalistir` içinde required provisioning tamamlanmadan önce yapılıyor.
- site/VAPI/domain/content/messaging provisioning farklı failure semantics ile fan-out oluyor; tek durable provisioning run yok.
- admin PATCH `durum`, `paket`, modüller, ayarlar ve provider resource alanlarını raw mutate edebiliyor.
- session JWT tenant lifecycle state'ini kontrol etmiyor; suspension için central fail-closed gate doğrulanmadı.
- admin DELETE yalnız root tenant document'ını siliyor; bu offboarding completion değildir.

Canonical yön:

```text
CREATING
  ↓
ONBOARDING
  ↓
PROVISIONING
  ↓
ACTIVE
  ├─→ SUSPENDED → ACTIVE
  └─→ CLOSING
          ↓
      OFFBOARDING
          ↓
        CLOSED
```

Tenant orchestration:

```text
BusinessTenant
   ├── OnboardingRun
   ├── ProvisioningRun / ProvisioningTask[]
   ├── lifecycleRevision + sessionEpoch
   └── OffboardingRun
```

En önemli invariant:

> Tenant `ACTIVE` ancak minimum-ready-set kullanılabilir olduğunda aktif olur; `CLOSED` ancak required internal/external offboarding task'ları reconciliation proof ile tamamlandığında kapanmış sayılır.

## Aktif frontier

### SÖKÜM 35 - Entitlement / Capability / Module / Feature Flag Runtime Authority

SÖKÜM 34 sırasında `paket`, `aktifModuller`, `aktifWebModulleri`, `ayarlar.*` ve farklı runtime flag'lerinin aynı capability gerçeğini paralel biçimde temsil ettiği yeniden görünür oldu. SÖKÜM 12 billing/package kararını yeniden yapmayacağız; bu tur özellikle **effective capability runtime truth** katmanını doğrulayacak.

Öncelikli sorular:

- Bir tenant'ın belirli capability'yi kullanıp kullanamayacağına hangi tek authority karar veriyor?
- `paket`, `aktifModuller`, `aktifWebModulleri`, `ayarlar.*`, feature flags ve quota sonuçları nasıl birleşiyor?
- Package plan yalnız entitlement input'u mu, yoksa runtime authorization doğrudan package string'e mi bakıyor?
- Admin override varsa canonical modeli, süresi, nedeni ve auditi var mı?
- Upgrade/downgrade capability diff'i transactional/idempotent mi?
- Capability kaldırılınca mevcut jobs, integrations, site modules ve scheduled actions nasıl deprovision oluyor?
- Public site module projection ile dashboard/backend capability gate aynı truth'u mu kullanıyor?
- Client payload/site draft içindeki package/module alanları authorization etkileyebiliyor mu?
- Feature flag ile commercial entitlement birbirinden ayrılmış mı?
- Quota exhaustion capability availability ile nasıl temsil ediliyor?
- Capability dependency'leri var mı? Örn. `ads.manage` için bağlı provider connection zorunlu mu?
- Runtime fail-closed mu, yoksa eksik field/default nedeniyle premium capability açılabiliyor mu?
- Legacy module/settings fields compatibility projection olarak mı kalacak?

SÖKÜM 35'in hedefi:

```text
Subscription / Contract
        ↓
Entitlement Policy
        ↓
Effective Capability Set
   ↙        ↓         ↘
Runtime   Quotas   Dependencies
 Gates             / Health
        ↓
Provision / Deprovision
        ↓
Capability Read Model
```

> **Package adından bağımsız, server-side ve audit edilebilir tek bir effective capability authority kurup tüm runtime authorization ve provisioning kararlarını aynı truth'a bağlamak.**
