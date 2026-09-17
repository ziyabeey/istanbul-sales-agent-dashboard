# KC-05 — Core → Firestore projection ve canary cutover

**Görev / yüzey:** KC-05 (Kepenk repo) · **Validation budget:** FOCUSED → STRICT (cutover)
**Bağımlılık:** KC-03 parity `zeroDrift = true`, KC-04 en az bir gerçek abonelik olayı, KC-01 feed (`core_read_change_feed`, olaylarda türetilmiş entitlement listesi)
**Durum:** kod + birim kanıtı hazır; canary tenant seçimi, projection gecikme ölçümü ve geri alma provası hosted

## Projection (tek yönlü)

`src/lib/core/projection.ts` — `POST /api/cron/core-projection` (imzalı ServicePrincipal, audience `kepenk.ai:/api/cron/core-projection`, scope `core:projection`; `CORE_PROJECTION_ENABLED=true`):

```text
core_projection_state/feed.afterEventId  (cursor)
  → core_read_change_feed(after, ≤100)
  → her olay için legacy esnafId: core_business_index/{business_id}
       (business_provisioned slug'ı, tenant_alias_linked legacy-kepenk-firestore external_id'yi indeksler;
        yoksa esnaflar.coreBusinessId gölge alanından fallback; hâlâ yoksa core_projection_orphans)
  → esnaflar/{esnafId}.core = { businessId, slug, subscription{planKey,status,period,policyVersion,eventId},
                                entitlements{key:{granted,limitValue,validUntil,eventId}}, lastEventId, projectedAt }   (merge)
  → cursor = event_id, lagMs raporlanır
```

Deterministik merge: cursor'ı geriye almak aynı duruma yakınsar (test: replay). Projection **yetki üretmez** (K04 §11): `has_entitlement` / snapshot her istekte Core'dan okunur; projection kasıtlı eskitildiğinde yetki kararı değişmez.

**Eşzamanlılık (R1 blocker 5).** Her tick kendi `owner` kimliğiyle `core_projection_state/feed` üzerindeki **durable tek lease**'i alır (TTL 60 s, Firestore transaction). Canlı lease başka bir worker'daysa tick `lease: busy` döner ve feed'i hiç okumaz. Cursor ilerletme aynı transaction guard'ında hem lease sahipliğini hem monotonluğu doğrular (`advanced | stale | lease_lost`); lease kaybedilirse worker döngüyü kırar ve `interrupted: true` raporlar, cursor'ı uygulanmamış bir noktaya taşımaz. Tenant yazımı da `core.lastEventId` ile monotoniktir: eski bir worker'ın geciken yazımı `stale` olur, yeni projection ezilmez. Rapor alanları: `owner`, `lease`, `heldBy`, `stale`, `interrupted`.

**Orphan DLQ recovery.** `core_projection_orphans/{event_id}` kalıcı dead-letter kanıtıdır. In-place canary recovery global cursor'ı veya tenant `core.lastEventId` değerini geriye çekmez; önce kanonik Core alias/producer sorunu düzeltilir, ardından güncel authoritative state yeni ve daha büyük `event_id` üreten bir `ChangeSubscription` / `GrantEntitlement` / `RevokeEntitlement` correction komutuyla redrive edilir. Böylece monoton guardlar korunur. Tam adımlar ve full-rebuild istisnası `docs/implementation/kc-05-operational-runbook.md` içindedir.

## Canary cutover (`src/lib/core/canary.ts`)

`CORE_CANARY_TENANTS` listesindeki esnaflar için legacy root **ticari yazımı kapanır**:

| Yüzey | Canary davranışı |
| --- | --- |
| `paketSenaryosuCalistir` (İyzico callback) | `durum` / `paket` / `aktifModuller` yazılmaz (`stripLegacyCommercialFields`); `odemeId`, `yenilenmeTarihi` yazılır. Ticari durum KC-04 komutu → Core → projection ile gelir |
| `paketSenaryosuCalistir` ücretli yan etkileri (R1 blocker 1) | `resolvePaidCapabilities` ile karara bağlanır. Canary'de callback'in Core kanıtı yoktur → yetki kümesi **boş**: VAPI sesli asistan, domain hediyesi, `ayarlar.*` ücretli bayrakları ve ücretli içerik platformları (facebook/gmb) açılmaz, yalnızca nötr karşılama mesajı gider. Forged/stale `paket=PREMIUM` hiçbir şey açmaz |
| Ücretli `ayarlar.*` bayrakları | Projection, Core `entitlement_granted` / `entitlement_revoked` ve `subscription_changed` olaylarındaki entitlement listesinden türetir (`ayarlarPatchForEntitlementChanges`); iki yönlü (revoke → `false`) |
| `PATCH /api/admin/esnaf/[id]` | `paket` / `durum` / `aktifModuller` içeren raw patch **409 `CORE_CANARY_WRITE_BLOCKED`** |
| Projection | Core `subscription.status` → legacy `durum` (`trial|active→aktif`, `past_due→riskli`, `cancelled→pasif`), `durumKaynak: core-projection` |

**Geri alma** = tenant'ı listeden çıkarmak; legacy yazım anında geri gelir, Core'daki olaylar silinmez, güvensiz bir yol açılmaz.

## Onboarding Core'a yazar (`src/lib/core/onboardingCore.ts`)

**Mutation gate (R1 blocker 2).** İstek bir Core BFF oturumu taşıyorsa `resolveOnboardingCoreGate` **esnaf dokümanı yaratılmadan önce** çalışır ve her Core mutation'ıyla aynı kapıyı uygular: `Origin` eşleşmesi + double-submit CSRF + `standard` oturum sınıfı. Reddedilen istek `403 ORIGIN_REJECTED` / `403 CSRF_REJECTED` / `401 SESSION_CLASS_UNVERIFIED` / `403 RECOVERY_REQUIRED` döner ve **sıfır tenant, sıfır Core komutu** üretir. Oturum hiç yoksa kapı `legacy` moduna düşer: bilinçli legacy akış korunur, KC-03 backfill sonradan bağlar.

Core onboarding etkin, Core session cookie sunulmuş fakat runtime kurulamaz durumunda istek legacy moda düşmez: `503 CORE_UNAVAILABLE` tenant/saga/Core yazımından önce döner. Oturumsuz + runtime-yok yolu bilinçli legacy davranışıdır.

**Durable saga (R1 blocker 3).** Kapıyı geçen istek için önce `core_onboarding_saga/{esnafId}` **atomik create-if-absent** ile yazılır: `slug`, `ownerUserId`, sabit `trialStart` / `trialEnd` ve sabit anahtarlar (`kc05-onboard-<hash>`, `kc05-trial-<hash>`) bu kayıtta dondurulur. Saga adımları `pending → provisioned → subscribed → completed`; her adım saklı payload'ı oynatır, dolayısıyla `ProvisionBusiness` commit olup trial yanıtı kaybolsa bile redrive **aynı anahtar ve aynı dönemle** devam eder — tek business, tek trial olayı, orijinal dönem. `ProvisionBusiness` owner eşleşmezse `OWNER_MISMATCH` ile kalıcı durur (foreign alias'a bağlanma yok). Retry edilebilir hatalar backoff ile `nextAttemptAt` alır ve `POST /api/cron/core-billing-outbox` (imzalı ServicePrincipal) açık sagaları `redriveOnboardingSagas` ile yeniden sürer; retry edilemez hatalar `status: failed` olur ve kuyruktan çıkar. Gölge alanlar (`coreUserId`, `coreBusinessId`, `coreOnboarding`) son adımda yazılır.

## Admin komutları ve plan okuma

- `POST /api/admin/core/entitlement {esnafId, action grant|revoke, entitlementKey, limitValue?, validUntil?, idempotencyKey}` — durable AdminSession + `runAuditedAdminMutation` + impersonation kısıtı; raw Firestore patch yerine `GrantEntitlement` / `RevokeEntitlement`. `idempotencyKey` **zorunludur** (trim sonrası 8–128 karakter) ve operator intent başına caller tarafından bir kez oluşturulup transport retry'larında aynen tekrar kullanılmalıdır. Eksik/kısa/uzun anahtar `400 IDEMPOTENCY_KEY_REQUIRED` ile routing/Core komutundan önce reddedilir; intent anahtarı audit metadata'sına da yazılır. **Kanonik yönlendirme (R1 blocker 4):** hedef business Core `legacy-kepenk-firestore:<esnafId>` tenant alias'ıdır; Firestore `coreBusinessId` gölgesi yalnız çapraz kontrol edilir. Alias yok → `409 BUSINESS_NOT_LINKED` (gölge tek başına asla yönlendirmez); alias ≠ gölge → `409 BUSINESS_SHADOW_MISMATCH`, `core_routing_drift` operatör kaydı ve sıfır komut.
- `GET /api/core/plan` — CoreRequestContext'ten plan/status/dönem/entitlement'lar (`source: core`); fiyat kodda yaşamaz.

## Kanıt

- `test/unit/coreProjection.test.ts`: 6 olaylık feed → index + `core.*` alanları; replay idempotent; cursor ile sayfalama; canary `durum` projection'ı; orphan kaydı + gölge fallback.
- `test/unit/coreCanary.test.ts`: liste ayrıştırma, guard, strip, durum eşlemesi, geri alma (listeden çıkarınca yazım serbest); ücretli yetki türetimi (legacy paket eşlemesi / canary'de Core kanıtı yoksa boş küme / süresi geçmiş ve revoke edilmiş entitlement açmaz / bilinmeyen key açmaz) ve `ayarlar` bayrak eşlemesi.
- `test/unit/coreCanaryScenario.test.ts` (R1 blocker 1): canary tenant + `paket=PREMIUM` → VAPI yok, domain hediyesi yok, `ayarlar.*` yok, içerik yalnız instagram, yalnız nötr karşılama; non-canary kontrol senaryosu legacy davranışı korur.
- `test/unit/coreOnboardingCore.test.ts`: kapı matrisi (legacy/disabled, origin-less, cross-origin, CSRF eksik, CSRF hatalı, recovery, unverified, geçerli) ve durable saga (provision+trial+gölge, kayıp trial yanıtı → redrive aynı anahtar+dönem, mükerrer submission tek saga, retry edilemez hatalar, rezerve slug).
- `test/unit/coreOnboardingRoute.test.ts` (R1 blocker 2): route seviyesinde reddedilen isteklerde sıfır tenant + sıfır komut; Core session + runtime unavailable → 503 ve sıfır tenant/saga/Core side effect; oturumsuz legacy 200; kapıyı geçen istek saga ile provision.
- `test/unit/coreProjectionRoutes.test.ts`: projection ServicePrincipal + flag + worker `owner`; admin entitlement route AdminSession/raw header negatifleri, **caller-stable intent key zorunluluğu**, aynı intent replay'inde aynı Core idempotency key, unlinked 409, gölge-only 409 ve gölge uyuşmazlığı 409 + drift kaydı.
- `coreProjection.test.ts` eşzamanlılık bölümü (R1 blocker 5): başka worker lease'i tutarken feed hiç okunmaz; lease'i düşmüş worker cursor'ı ilerletmez (`interrupted`), devralan worker temiz cursor'dan tamamlar, eski worker'ın geciken yazımı `stale` olur ve `advanceCursor` `lease_lost` döner.
- `trustBaseline.characterization.test.ts`: KC-05 kaynak değişmezleri (legacy senaryo/admin patch/projection/entitlement route + ücretli yetki türetimi, onboarding kapısı + saga, alias yönlendirme, lease/monoton guard).
- `docs/implementation/kc-05-operational-runbook.md`: orphan DLQ corrective-event redrive, full rebuild sınırı, caller-stable entitlement intent ve hosted acceptance receipt prosedürü.
- CI: `Lint KC-05 ...` + `Typecheck KC-05 ...` (`test/tsconfig.kc-05-projection.json`).

## Açık / hosted-only (KC-05 kabulü)

- Canary kohortu: fixture tenant + bir gerçek canary tenant + AdminPrincipal + ServicePrincipal'lar (KC-01 `register_service_principal`); `CORE_CANARY_TENANTS`, `CORE_PROJECTION_ENABLED`, `CORE_ONBOARDING_ENABLED` env.
- Projection gecikmesi (`lagMs`) hosted ölçüm; "projection kasıtlı eskitildiğinde yetki değişmez" ve "canary'de Firestore root write kapalıyken tüm akışlar çalışır" tarayıcı/staging kanıtı.
- Geri alma provası (listeden çıkar → legacy yazım geri gelir) hosted.
- Orphan recovery runbook'u hosted kontrollü fixture üzerinde yeni corrective Core event ile provaya tabi tutulur; global cursor/tenant version rewind yapılmaz.
- Admin entitlement same-intent replay'i hosted ortamda aynı caller key ile doğrulanır; key'siz istek routing öncesi 400 vermelidir.
- `aktifModuller` canary'de yazılmaz; modül aktivasyonunun entitlement'tan türetilmesi UI tarafında `/api/core/plan` ile yapılır (W7 kapsamı).
- **Entitlement key sözleşmesi:** `CORE_ENTITLEMENT_CAPABILITIES` KC-01 katalogunun ötesinde anahtarlar içerir (`voice_assistant`, `custom_domain`, `ads_management`, `lead_mining`, `vip_support`, `google_review_tracking`, `morning_message`, `content_facebook`, `content_gmb`). KC-01'de bugün `booking`, `ai_booking_assistant`, `messaging_credits` tanımlı; kalan anahtarların `core.plan_entitlements` politikasına eklenmesi canary kabulünden önce Core tarafında yapılmalıdır. Eklenene kadar bu yetenekler canary'de **kapalı** kalır (bilinmeyen key hiçbir şey açmaz) — fail-closed davranış kasıtlıdır.
- **Hosted gerçek ve pre-cutover kanıt (Issue #10 receipt, DANIŞMA 3 kabul, 2026-09-16):** 7 tenant (`durum` aktif 2 / onboarding 5); canary kohortu için 1 onboarding tenant + fixture yeterlidir. Receipt'in dört telemetri UNKNOWN'ı (route bazlı runtime caller'lar, repo dışı doğrudan tarayıcı Firestore client'ları, aktif legacy esnafId JWT caller'ları, dış worker'lar) KC-05 canary/retirement için **pre-cutover kanıt** olarak açık kalır: canary, gizli bir yetki bağımlılığı olmadığını ispatlamadan legacy yazım kesintileri genişletilmez. Deployed Firestore rules ≠ repo rules olduğu için KC-00 hiçbir yıkıcı rules temizliği veya Firebase/Firestore retirement'ı yetkilendirmez; bu ayrı bir cutover/retirement kapısıdır.
- Firestore koleksiyon temizliği kapsam dışı.
