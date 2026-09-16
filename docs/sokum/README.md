# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-16  
> **Durum:** **DOMAIN SÖKÜMÜ KAPALI - son numaralı tur SÖKÜM 41**  
> **Aktif frontier:** Söküm Sonrası Mimari Sentez / Kurtarma Planı. Yeni domain avı yok.  
> **Final sweep:** `docs/sokum/final-inventory-sweep.md`

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
| 36 | Canonical Architecture Synthesis / Migration & Cleanup Sequence | KAPALI / CORE BASELINE | `docs/sokum/36-canonical-architecture-synthesis.md` |
| 37 | Restaurant Operations / POS / Masa / Adisyon / KDS / Offline Sync | KAPALI | `docs/sokum/37-restaurant-operations-pos-kds-offline-sync.md` |
| 38 | Marketplace / Job / Bid / Provider / Escrow / Credit Economy | KAPALI | `docs/sokum/38-marketplace-job-bid-provider-escrow-credit-economy.md` |
| 39 | Supply / Procurement / Supplier / PO / Reorder / B2B Marketplace | KAPALI | `docs/sokum/39-supply-procurement-supplier-marketplace.md` |
| 40 | Support OS / Ticket / SLA / Knowledge Base / AI Assistance | KAPALI | `docs/sokum/40-support-ticket-sla-knowledge-ai.md` |
| 41 | Admin / Super Admin / Platform Control Plane | KAPALI | `docs/sokum/41-admin-platform-control-plane.md` |
| Final | Inventory / kapsam bütünlüğü kontrolü | KAPALI | `docs/sokum/final-inventory-sweep.md` |

## Final inventory sonucu

SÖKÜM 41 sonrasında koruma notlarında kalan package'lar yeniden kontrol edildi:

- `packages/voice` -> ayrı domain değil; multimodal command adapter seed'i.
- `packages/studio` -> Site/Media/CMO + Marketplace extension contract'ları.
- `packages/blog` -> Site Authoring/Publish + CMO content extension seed'i.
- `packages/seo` -> Public Projection + Integration + Growth optimization seed'i.
- `packages/influencer` -> Campaign + Marketplace + Finance + Support future vertical seed'i.

Beş package'ın manifest/source yapısında kendi durable repository/service/worker/route authority'si doğrulanmadı. Influencer'daki ek `pricing` utility'si de stateless fiyat öneri hesabıdır; business writer değildir.

**Karar:** current main'de daha önce ele alınmamış yeni bir canlı write-authority domain bulunmadı. Bu nedenle `SÖKÜM 42` açılmadı.

## SÖKÜM 41 kapanış özeti

Admin current main'de gerçek yüksek-yetkili platform operasyonları içerir; fakat auth/session modeli parçalıdır:

```text
/api/admin/login -> HMAC process-local session cookie
proxy.ts          -> cookie == raw ADMIN_SECRET_TOKEN
/api/admin/*      -> x-admin-token == raw ADMIN_SECRET_TOKEN
admin UI          -> client bundle hard-coded header token
```

Taşınacak esas primitive:

```text
Verified operator
 + least privilege
 + explicit reason
 + optional approval / step-up
 + canonical domain command
 + append-only audit
 + safe impersonation
 + observable outcome
```

Ana invariant:

> **Admin paneli platformdaki her collection'ın universal writer'ı değildir. Doğrulanmış operatörün policy-guarded canonical domain komutlarını çalıştırdığı ve her sonucu append-only audit ile izlediği control plane'dir.**

## Kanonik devam kuralı

- `KEPENK_SOKUM_PLANI.md` 01-24 tarihsel snapshot'tır.
- `docs/sokum/25-41` repo-doğrulanmış sonraki turlardır.
- `36-canonical-architecture-synthesis.md` core baseline'dır.
- Her business fact için tek write authority vardır; legacy UI/local state authority değildir.
- Korunan contract package'lar sırf runtime'a bağlı değiller diye otomatik archive/delete adayı değildir.
- `apps/randevu-server` Kepenk kapsamı dışındadır ve değiştirilmez.
- Production secret/token değerleri dokümana kopyalanmaz.
- Yeni `SÖKÜM 42` ancak ileride somut, current-main'de canlı ve 01-41 tarafından kapsanmayan bir write authority kanıtlanırsa açılabilir.

## Sıradaki faz

Domain sökümü bitti. Sonraki çalışma **Söküm Sonrası Mimari Sentez / Kurtarma Planı**dır:

1. 01-41 kararlarını tek canonical bounded-context haritasında birleştir.
2. KEEP / ADAPT / REWRITE / DROP matrisini çıkar.
3. Duplicate authorities ve legacy writer'ları listele.
4. Dependency/migration sırasını çıkar.
5. Cleanup backlog'unu risk + bağımlılık bazında sırala.
6. Kepenk v2'ye taşınacak minimum capability setini sabitle.

Bu faz da implementation değildir; önce neyi taşıyacağımızı ve hangi sırada taşıyacağımızı kesinleştirir.