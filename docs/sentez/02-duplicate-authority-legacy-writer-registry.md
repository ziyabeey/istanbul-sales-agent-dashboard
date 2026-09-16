# SENTEZ 2 — Duplicate Authority & Legacy Writer Registry

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Kaynak:** SÖKÜM 01–41, `36-canonical-architecture-synthesis.md`, final inventory sweep ve `SENTEZ 1`  
> **Amaç:** Current/legacy Kepenk'te business truth yazan veya yetki sınırı oluşturan yolları canonical authority'lere teslim edilecek bir registry'de toplamak.  
> **Not:** Bu belge delete listesi değildir. Kod değişikliği yapmaz; migration/cutover girdisi üretir.

---

# 1. Registry kuralı

Her legacy writer için şu soru sorulur:

```text
Legacy writer
  -> hangi gerçeği yazıyor?
  -> o gerçeğin canonical sahibi kim?
  -> risk ne?
  -> compatibility adapter gerekir mi?
  -> ne zaman kapatılabilir?
```

Ana invariant:

> **Legacy route/UI/provider callback ancak canonical authority'nin command adapter'ı olarak geçici yaşayabilir. İkinci write authority olarak yaşayamaz.**

Risk sınıfları:

- **P0 / Critical:** privilege, para, credential, tenant destruction veya cross-tenant trust etkisi.
- **P1 / High:** aynı business fact için duplicate/mutable authority; veri drift'i ve yanlış state üretir.
- **P2 / Medium:** operational truth, demo/local state veya non-durable orchestration problemi.

---

# 2. P0 — Önce kontrol altına alınması gereken authority'ler

| ID | Legacy writer / boundary | Legacy'nin yazdığı veya kabul ettiği gerçek | Canonical authority | Risk | Compatibility | Cutover gate |
|---|---|---|---|---|---|---|
| LW-001 | Admin client `x-admin-token` + raw shared secret API auth | Platform operator privilege | Identity/Admin Policy | P0 | Hayır | Verified Admin Principal + revocable session + least privilege aktif; raw-secret caller = 0 |
| LW-002 | `/api/admin/login` process-local HMAC session Map + `proxy.ts` raw secret cookie kontrolü | Admin session truth | Identity/Admin Session | P0 | Hayır | Tek admin session verifier bütün UI/API/proxy'de zorunlu; centralized revoke çalışıyor |
| LW-003 | `/api/admin/esnaf` ve `/api/admin/esnaf/[id]` direct tenant create/patch | Tenant lifecycle, package/module/settings, integration alanları | BusinessTenant + Subscription + Entitlement + Integration | P0 | Evet | Route yalnız typed canonical commands çağırıyor; raw field mutation kapalı |
| LW-004 | Admin root tenant hard-delete | Tenant deletion/offboarding completed varsayımı | BusinessTenant + Data Lifecycle | P0 | Evet | Offboarding plan + legal hold/retention + resource purge proof + tombstone tamamlanıyor |
| LW-005 | `/api/admin/kota` içinde paket/kredi/suspend/reactivate/global status mutation | Commercial plan, quota, tenant state, incident state | Subscription/Billing + Entitlement + Tenant + Incident Control | P0 | Evet | Her operation ayrı canonical command'a ayrılmış; audit/approval policy aktif |
| LW-006 | Browser bundle içinde admin secret/token | Platform privilege credential | Identity/Admin Policy | P0 | Hayır | Client secret tamamen kaldırılmış; browser yalnız revocable session taşır |
| LW-007 | Tenant root'ta provider access/refresh token veya credential alanları | Secret material | Credential Authority | P0 | Evet | Domainler yalnız `CredentialRef` tutuyor; raw material tenant doc'tan purge edildi |
| LW-008 | Tenant root'ta provider account/number/page/resource state | Provider connection/resource truth | IntegrationConnection + ProviderResourceBinding | P0 | Evet | Provider resource inventory reconcile edilmiş; canonical binding tek source |
| LW-009 | Production dev-login/fixed OTP/fail-open secret fallback yolları | User/session trust | Identity Core | P0 | Geçici olabilir | Production path'lerinde fallback kapalı; real auth + session revocation zorunlu |
| LW-010 | Unsigned `kepenk_session` payload decode ederek `esnafId/sub` kabul eden Support route | Authenticated requester / tenant identity | Identity / RequestContext | P0 | Evet | Support adapter yalnız verified RequestContext kullanıyor |
| LW-011 | Support GET'te arbitrary e-posta ile ticket metadata erişimi | Case read authorization | Identity + Support authorization | P0 | Hayır | requester/tenant ownership veya operator capability zorunlu |
| LW-012 | Provider callback'in Booking/Order/Restaurant state'ini doğrudan payment success olarak mutate etmesi | Payment truth | Payment Core | P0 | Evet | Signature verify + idempotent provider event + Payment result + projection update |
| LW-013 | Restaurant split payment/local success ile item'ları doğrudan `odendi=true` yapmak | Tender/payment truth | Payment Core + Restaurant allocation projection | P0 | Evet | Item paid state yalnız verified Payment outcome projection'ından türetiliyor |
| LW-014 | Mutable transaction/balance/accounting writer | Financial history/balance | Finance Ledger | P0 | Evet | Immutable ledger events authoritative; legacy balance read-only projection |
| LW-015 | Booking/Order document'ındaki authoritative payment fields | Payment/settlement state | Payment Core | P0 | Evet | Booking/Order alanları yalnız read projection; write ownership Payment'ta |
| LW-016 | Simulated/no-op privacy purge success veya root-delete = erasure | Data deletion proof | Data Lifecycle | P0 | Evet | Durable erasure plan + per-resource proof + legal hold checks tamamlanıyor |

---

# 3. P1 — Duplicate business truth ve lifecycle writer'ları

| ID | Legacy writer / boundary | Duplicate truth | Canonical authority | Compatibility | Cutover gate |
|---|---|---|---|---|---|
| LW-017 | File + Firestore + local/default business settings writers | Business facts/profile | Business Profile | Evet | Canonical profile populated; old sources read-only compatibility projection |
| LW-018 | Editor/autosave paths that can touch live/published state | Site draft vs published truth | Site Authoring | Evet | Autosave yalnız SiteDraft revision yazar; published pointer değişmez |
| LW-019 | `/site/v2/save` ve diğer paralel site save yolları | Draft/site config | Site Authoring | Evet | Tek validated Draft Save Command + revision conflict control |
| LW-020 | `/site/v2/publish` ve paralel publish/version paths | Published revision | Publish Authority | Evet | Tek idempotent PublishCommand; immutable PublishedSiteRevision + active pointer |
| LW-021 | Domain/hostname field mutation ve provider-side domain state'i business truth sayan yollar | Hostname ownership/binding | DomainBinding | Evet | Global uniqueness + verified binding + provider projection reconcile |
| LW-022 | Mutable URL/media refs ve farklı upload/state yolları | Asset identity/lifecycle | Asset Core | Evet | Canonical AssetRef + provenance + derivative/GC policy aktif |
| LW-023 | Public form/action route'larının core collection'lara doğrudan yazması | Public customer/booking/order mutations | Public Action Gateway + target domain | Evet | Revision-bound capability gate + canonical command-only mutation |
| LW-024 | Mongo + Firestore CRM dual persistence | Customer identity/profile/activity | Customer Core | Evet | Identity merge/mapping tamam; legacy store read-only; caller parity doğrulandı |
| LW-025 | `/api/musteriler` legacy CRUD | Customer state | Customer Core | Evet | Temporary compatibility shell canonical repository/commands kullanıyor |
| LW-026 | Duplicate WhatsApp send/inbound routes | Conversation/message/provider delivery | Messaging Core + Integration | Evet | Tek MessageIntent/outbox + inbound dedupe + provider binding |
| LW-027 | Duplicate Instagram webhook/tenant lookup routes | Provider event/tenant binding | IntegrationConnection + Event Inbox | Evet | Tek verified webhook ingress + ProviderResourceBinding + dedupe |
| LW-028 | Campaign one-off sender'larının provider'a doğrudan çıkması | Message delivery truth | Messaging Core | Evet | Campaign yalnız MessageIntent üretir; durable outbox gönderir |
| LW-029 | `paket`, `aktifModuller`, `aktifWebModulleri`, `ayarlar.*` ile runtime authorization | Capability allow/deny | Entitlement / Capability Resolver | Evet | EffectiveCapabilitySet mandatory gate; legacy fields projection/input olur |
| LW-030 | Boolean `connected` veya benzeri integration flags | Connection lifecycle/health | IntegrationConnection | Evet | explicit lifecycle + health + reconciliation authority aktif |
| LW-031 | Provider ID/telefon/hostname'i internal identity gibi kullanmak | Internal entity identity | Canonical stable IDs + typed aliases | Evet | Mapping tables complete; new writes stable IDs zorunlu |
| LW-032 | Multiple agent runners/model selectors/orchestrators | Agent execution state/model routing | Agent Runtime + Model Gateway | Evet | Tek persisted run lifecycle + capability bus; old runners adapters/disabled |
| LW-033 | Agent/tool path'lerinin canonical domain'i bypass ederek business/provider mutation yapması | Domain action authority | Target domain command + Durable Execution | Evet | Agent yalnız scoped capability command üretir; verified outcome kaydı var |
| LW-034 | `agent_logs`, console islands veya Telegram'ı audit truth saymak | Security/business mutation evidence | Audit Ledger | Hayır | Append-only audit mandatory; telemetry/notifications ayrı tutulur |
| LW-035 | Raw sensitive provider/payload logging | Operational telemetry | Telemetry + redaction policy | Hayır | Structured/redacted telemetry + retention policy aktif |

---

# 4. Vertical writer registry

## 4.1 Restaurant Operations

Restaurant gerçek runtime writer'lar içerir ve bu nedenle migration'a girecektir.

| ID | Legacy writer | Gerçek | Canonical sahip | Karar |
|---|---|---|---|---|
| V-REST-01 | `masa-olustur` | Table setup | Restaurant OS | ADAPT -> canonical command |
| V-REST-02 | `siparis-olustur` / `masa-siparis` | Dining session/adisyon items | Restaurant OS | ADAPT; payment fields ayrıştır |
| V-REST-03 | `split-odeme` | Item allocation + payment success karışımı | Restaurant OS + Payment Core | SPLIT/REWRITE |
| V-REST-04 | `alman-odeme` | Checkout intent | Payment Core, Restaurant source link | ADAPT |
| V-REST-05 | `alman-odeme-callback` | Provider outcome + restaurant mutation | Payment Core -> Restaurant projection | REWRITE |
| V-REST-06 | Offline local/Dexie sync writers | Restaurant operational state | Restaurant OS sync/reconciliation | REWRITE/HARDEN |
| V-REST-07 | KDS/garson local operational state | Kitchen/waiter workflow | Restaurant OS | KEEP semantics, canonicalize writer |

Restaurant invariant:

> Table/KDS/adisyon gerçeği Restaurant OS'ta; ödeme Payment'ta; mali kayıt Finance'ta; catalog/inventory Commerce'ta kalır.

## 4.2 Support OS

| ID | Legacy writer | Gerçek | Canonical sahip | Karar |
|---|---|---|---|---|
| V-SUP-01 | `/api/destek/talep` Firestore POST | New ticket/case | SupportCase | ADAPT after verified identity |
| V-SUP-02 | Demo/local operator state | assign/status/messages/KPI görünümü | Support OS read models | KEEP UX, DROP as truth |
| V-SUP-03 | confidence/`autoSent`/`aiResolved` intent | AI assistance / closure proposal | Agent + Support Policy | REWRITE authority |
| V-SUP-04 | timerless SLA helper | SLA projection | Support OS + Durable Timer | KEEP algorithm seed, BUILD authority |

Support current main'de create-ticket dışında tam lifecycle writer'a sahip değildir. Eksik lifecycle ikinci authority değildir; **BUILD** alanıdır.

## 4.3 Marketplace

Current main'de canonicalize edilecek gerçek backend writer doğrulanmadı.

- Dashboard customer/provider flows demo/local state.
- `packages/marketplace` type/contract island.

Bu nedenle migration yaklaşımı:

```text
KEEP UX + domain vocabulary
BUILD Marketplace Core runtime
DO NOT migrate demo state as business data
```

Marketplace için delete/cutover registry yerine **greenfield authority build** uygulanır.

## 4.4 Procurement / Supply

Current main'de canonicalize edilecek gerçek backend Procurement writer doğrulanmadı.

- `tedarik` local state.
- `b2b-pazar` local state.
- `packages/supply` type/helper contract.

Yaklaşım:

```text
KEEP supplier / PO / reorder semantics
BUILD Procurement Core + GoodsReceipt
DO NOT promote local demo data to authority
```

B2B Supplier Marketplace Procurement Core'un private supplier state'ini sahiplenemez.

---

# 5. Provider / integration writer registry

Bu sınıf business domainlerden ayrı yönetilmelidir.

| Legacy pattern | Sorun | Canonical karşılık |
|---|---|---|
| Route içinde doğrudan provider SDK call + local success | Retry/idempotency/reconciliation yok | Durable Job + Provider Adapter |
| Tenant document'ından token/account lookup | Credential/resource ownership karışıyor | CredentialRef + IntegrationConnection |
| Duplicate inbound webhook endpoints | Double processing / tenant ambiguity | Verified Event Inbox + dedupe |
| Provider resource satın alıp raw tenant field'a yazmak | Provider state business doc'a gömülüyor | Provisioning Job + ProviderResourceBinding |
| "Sync" endpoint'inin yalnız local boolean/field değiştirmesi | External provider state ile local state farklı | Reconciliation job + explicit lifecycle |
| Cron/raw bearer ile privileged mutation | Service trust belirsiz | Service Principal + scoped capability + durable job |

Özel Admin örneği:

- Twilio numara satın alma capability'si korunur.
- Provider side-effect Admin domain'ine ait değildir.
- Admin yalnız `ProvisionProviderResource` command başlatır.
- Integration/Execution provider call, resource binding ve reconciliation'ı sahiplenir.

---

# 6. "Writer değil" diye ayrıca işaretlenen yüzeyler

Aşağıdaki parçalar business authority sanılmamalıdır:

- Marketplace demo customer/provider state,
- Procurement/B2B local state,
- mock infra health,
- synthetic finance/ARR projections,
- dashboard KPI cards,
- `voice` contracts,
- `studio` contracts,
- `blog` contracts,
- `seo` contracts,
- `influencer` contracts/stateless pricing helper,
- provider adapter response object'leri,
- AI confidence,
- recommendation/suggestion output.

Bunlar migration sırasında data source olarak alınmaz; yalnız UX, algorithm veya contract seed olarak korunur.

---

# 7. Cutover tipleri

## Type A — Security hard cut

Uygulanır:

- raw admin secret,
- browser-bundled token,
- unsigned session trust,
- fail-open auth.

Kural: compatibility için ikinci insecure authority açık tutulmaz.

## Type B — Strangler adapter

Uygulanır:

- legacy CRM/API routes,
- site save/publish routes,
- public action routes,
- messaging routes,
- admin tenant/kota operations.

Akış:

```text
legacy caller
 -> compatibility route
 -> canonical command
 -> canonical authority
```

Legacy route business state'i kendisi yazmayı bırakır.

## Type C — Projection migration

Uygulanır:

- package/module/settings flags,
- booking/order payment summaries,
- KPI/analytics,
- integration connected flags,
- legacy balances.

Yeni truth canonical authority'dedir; eski field yalnız read projection olarak geçici tutulur.

## Type D — Greenfield authority

Uygulanır:

- Marketplace runtime,
- Procurement runtime,
- eksik Support lifecycle/SLA,
- eksik Restaurant reconciliation parçaları,
- yeni Admin command gateway.

Demo/local state migrate edilmez.

---

# 8. Deletion gate

Hiçbir legacy writer sırf `DROP` etiketi aldı diye hemen silinmez.

Her writer için minimum gate:

```text
1. canonical owner çalışıyor
2. legacy route canonical command adapter'a dönüştü
3. write telemetry legacy direct-write = 0 gösteriyor
4. read/projection parity doğrulandı
5. provider/resource reconciliation temiz
6. rollback/incident planı var
7. caller inventory = 0 veya approved compatibility consumer
8. archive window geçti
9. ancak sonra delete
```

Security hard-cut sınıfında insecure compatibility tutulmaz; güvenli replacement hazır olduğunda eski trust path kapatılır.

---

# 9. Migration graph'a aktarılacak bloklar

SENTEZ 2 sonucunda writer'lar sekiz migration kümesine indirildi:

```text
A. Identity / Admin Trust
B. Tenant / Subscription / Entitlement
C. Site / Asset / Public Action
D. Customer / Messaging
E. Integration / Durable Execution / Credentials
F. Payment / Finance
G. Agent / Audit / Telemetry / Privacy
H. Vertical Products
```

Bu kümeler birbirinden bağımsız taşınamaz.

Özellikle:

- `A` olmadan güvenli canonical commands yok,
- `B` olmadan capability enforcement yok,
- `E` olmadan provider/messaging/payment side-effect'leri durable değil,
- `F` olmadan Restaurant/Marketplace financial flows açılamaz,
- vertical'lar `A/B/E/F` omurgalarını yeniden icat edemez.

---

# 10. Sonraki sentez frontier'ı

**SENTEZ 3 — Dependency / Migration Graph**

Amaç:

1. sekiz migration kümesini wave'lere ayır,
2. hangi authority'nin hangisinden önce kurulacağını kesinleştir,
3. parallel yapılabilecek işleri işaretle,
4. compatibility ve projection dönemlerini tanımla,
5. vertical pack'lerin açılma gate'lerini belirle,
6. big-bang yerine gerçek strangler cutover sırasını çıkar.

SENTEZ 3 de implementation değildir.
