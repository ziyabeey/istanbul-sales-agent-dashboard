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
| 35 | Entitlement / Capability / Module / Feature Flag Runtime Authority | KAPALI | `docs/sokum/35-entitlement-capability-runtime-authority.md` |
| 36 | Canonical Architecture Synthesis / KEEP-REWRITE-DROP / Migration & Cleanup Sequence | AÇIK | sıradaki sentez turu |

## Kanonik devam kuralı

- `KEPENK_SOKUM_PLANI.md` 01-24 geniş snapshot olarak korunur.
- 25+ doğrulanmış belgeler `docs/sokum/` altında ayrı tutulur.
- Yeni turda yalnız bu indeks + gerekli kapalı söküm belgeleri + aktif frontier okunur.
- Paralel ajan frontier'ı kapatmışsa güncel `main` okunup sonraki açık frontier'a geçilir.
- `apps/randevu-server` bu söküm serisi nedeniyle değiştirilmez.
- Production secret/token değerleri dokümana kopyalanmaz.

## Kapanan son karar: SÖKÜM 35

Runtime capability authority'nin package, modül projection'ları, `ayarlar.*`, quota, provider health ve global feature flag'ler arasında parçalı olduğu doğrulandı.

En kritik bulgular:

- package catalog ve `minPaket` module policy değerli input'lar fakat tek runtime authorization truth'u değiller,
- `paketSenaryosuCalistir` package değişiminde `aktifModuller`, çok sayıda `ayarlar.*` boolean'ı ve provider provisioning side effect'i üretiyor,
- downgrade tarafında üst paketten kalan capability/resource state'ini sistematik deprovision eden simetrik akış görünmüyor,
- `/api/esnaf/sync-moduller` client'ın gönderdiği module listesini package entitlement ile server-side kesiştirmeden `aktifWebModulleri` ve `siteJson.moduller` alanlarına yazıyor,
- global MVP/release flags ile commercial entitlement farklı kavramlar olmasına rağmen runtime availability aynı yüzeylerde kesişiyor,
- `runAgent()` tenant entitlement/quota gate'i olmadan model çalıştırabiliyor,
- `/api/domain/sec` gibi route'lar effective capability yerine doğrudan `esnaf.paket` string'ine bakarak authorization kararı veriyor,
- quota exhaustion ile entitlement yokluğu aynı şey değildir ve ayrı reason code gerektirir,
- provider/integration health capability hakkı değil, runtime dependency girdisidir.

Canonical yön:

```text
Subscription / Contract
        ↓
Entitlement Policy
        ↓
EntitlementGrant[]
        ↓
+--------------------------------+
| Tenant lifecycle               |
| Release flags                  |
| Tenant preferences             |
| Quotas                         |
| Integration/resource health    |
+--------------------------------+
        ↓
EffectiveCapabilitySet
        ↓
+--------------------------------+
| Dashboard / APIs               |
| Public Action Gateway          |
| Site Editor / Publish          |
| Workers / Schedulers           |
| Provider Adapters              |
| AI / Messaging / Commerce      |
+--------------------------------+
        ↓
Audit + Outbox + Provisioning
```

En önemli invariant:

> Bir capability'nin varlığı package string'i veya mutable boolean ile değil, server-side effective policy decision ile kanıtlanmalıdır.

## Aktif frontier

### SÖKÜM 36 - Canonical Architecture Synthesis / KEEP-REWRITE-DROP / Migration & Cleanup Sequence

01-35 arasındaki domain ve cross-cutting authority sökümleri artık yeterli kapsama ulaştı. Bu tur yeni bir feature domain aramak yerine, bulunan parçaları tek bir yeni Kepenk mimarisine bağlayacak ve eski repodan neyin taşınacağı, yeniden yazılacağı veya tamamen atılacağı konusunda uygulanabilir bir migration/cleanup haritası çıkaracak.

Öncelikli sorular:

- 01-35 kararları tek canonical bounded-context haritasında nasıl birleşiyor?
- Hangi mevcut package/app/library doğrudan KEEP edilebilir?
- Hangi parçalar yalnız adapter/UI/algorithm olarak tutulup authority katmanı REWRITE edilmelidir?
- Hangi legacy route, collection, parallel schema, fake/demo runtime ve duplicate authority DROP edilmelidir?
- Yeni sistemde stable ID ve ownership graph nasıl olmalıdır?
- Migration hangi dependency sırasıyla yapılırsa public site, booking, CRM, commerce, messaging ve integrations aynı anda kırılmaz?
- Strangler/migration sırasında legacy ve canonical state arasında hangi compatibility projections gerekir?
- Hangi dual-write yolları kısa süreli kabul edilebilir, hangileri kesinlikle yasaklanmalıdır?
- Cutover readiness ve rollback kriterleri nelerdir?
- Temizlikte hangi dosyalar/route'lar önce deprecate, sonra archive, en son delete edilmelidir?
- Yeni Kepenk'in minimum production-ready core'u hangi authority'lerden oluşmalıdır?
- Hangi alanlar sonraki ürün fazlarına bırakılabilir?

SÖKÜM 36'nın hedefi:

```text
01-35 Verified Decisions
          ↓
Canonical Bounded Context Map
          ↓
KEEP / REWRITE / DROP Matrix
          ↓
Target Dependency Graph
          ↓
Migration Waves
          ↓
Compatibility / Shadow Read
          ↓
Cutover Gates
          ↓
Legacy Cleanup Manifest
          ↓
New Kepenk Architecture Baseline
```

> **Söküm çıktısını dağınık kararlar koleksiyonundan, uygulanabilir tek mimari ve temizleme planına dönüştürmek.**
