# Kepenk Söküm - Canlı İndeks

> **Tarih:** 2026-09-16  
> **Durum:** **SÖKÜM 41 KAPALI - Admin / Super Admin / Platform Control Plane**  
> **Aktif frontier:** Yeni domain açılmadı. Önce final inventory sweep / kapsam bütünlüğü kontrolü yapılacak.  
> **Amaç:** `KEPENK_SOKUM_PLANI.md` 01-24 tarihsel snapshot olarak, 25+ repo-doğrulanmış turlar ise `docs/sokum/` altında korunur. Bu dosya yalnız canlı frontier ve kısa handoff taşır.

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

## Kanonik devam kuralı

- Yeni turda yalnız bu indeks + en son gerekli söküm belgesi + frontier kodu okunur.
- `36-canonical-architecture-synthesis.md` core baseline'dır; vertical'lar bunu bozmak yerine bounded context veya explicit extension olarak bağlanır.
- Dedicated vertical triage tamamlanmadan hiçbir korunan vertical archive/delete adayı sayılmaz.
- Her business fact için tek write authority vardır; legacy UI/local state authority değildir.
- `apps/randevu-server` Kepenk kapsamı dışındadır ve değiştirilmez.
- Production secret/token değerleri dokümana kopyalanmaz.
- Paralel ajan frontier'ı kapatmışsa overwrite edilmez; main yeniden okunup ilk açık frontier'a geçilir.
- `SÖKÜM 42` yalnız final inventory sweep gerçek, daha önce ele alınmamış bir domain kanıtlarsa açılır.

## Kapanan son karar: SÖKÜM 41

Admin current main'de gerçek yüksek-yetkili platform operasyonları içerir:

- tenant/esnaf create/update/delete,
- package/kota/suspend/reactivate,
- impersonation,
- Twilio number provisioning,
- agent telemetry,
- global maintenance/kill-switch intent,
- platform finance/infra/marketing read/control yüzeyleri.

Fakat current auth modeli parçalı ve güvenilir değildir:

```text
/api/admin/login -> HMAC process-local session cookie
proxy.ts          -> cookie == raw ADMIN_SECRET_TOKEN
/api/admin/*      -> x-admin-token == raw ADMIN_SECRET_TOKEN
admin UI          -> client bundle hard-coded header token
```

Bu dört parça tek admin session authority oluşturmuyor.

### KEEP

- ayrı Platform Admin / Operations ürünü,
- mevcut operator UX seed'leri,
- `packages/admin` immutable audit vocabulary,
- reason + dual-identity impersonation contract'ı,
- deterministic feature rollout evaluator,
- emergency control intent'i.

### REWRITE / BUILD

- verified Admin Principal + revocable session,
- least-privilege role/capability enforcement,
- MFA/step-up ve kritik aksiyon approval politikası,
- append-only `AdminActionEvent`,
- safe impersonation,
- cross-domain Admin Command Gateway,
- provider provisioning/reconciliation,
- real Observability/Billing projections.

### DROP AFTER CUTOVER

- shared raw secret human auth,
- browser bundle'da admin token,
- process-local admin session Map,
- root tenant doc hard-delete,
- raw package/module field mutation,
- Telegram'ı audit truth saymak,
- mock infra/finance verisini operational truth saymak.

Ana invariant:

> **Admin paneli platformdaki her collection'ın universal writer'ı değildir. Doğrulanmış operatörün policy-guarded canonical domain komutlarını çalıştırdığı ve her sonucu append-only audit ile izlediği control plane'dir.**

## Final inventory sweep - numarasız kontrol turu

Şimdilik yeni domain açılmıyor.

Kontrol sırası:

1. `KEPENK_SOKUM_PLANI.md` 01-24 ile `docs/sokum/25-41` çapraz kontrol edilir.
2. Eski indeks notlarında kalan `packages/voice`, `packages/studio`, `packages/blog`, `packages/seo`, `packages/influencer` paketlerinin önceki sökümlerde gerçekten kapsanıp kapsanmadığı doğrulanır.
3. Daha önce kapsanan capability için yeni söküm numarası açılmaz.
4. Gerçek açık domain yoksa teardown fazı kapatılır.
5. Sonraki faz canonical architecture + migration + cleanup backlog sentezidir.

### Önemli

Bu sweep yeni implementation işi değildir. Kod yazılmaz; yalnız kapsam boşluğu ve duplicate frontier aranır.