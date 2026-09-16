# SÖKÜM 37 - Restaurant Operations / POS / Masa / Adisyon / KDS / Offline Sync

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Verdict:** **KEEP Restaurant OS as a first-class product bounded context; KEEP the table/adisyon/KDS/offline-sync/staff-KPI/menu-digitization/QR-order/split-bill product semantics; REWRITE public trust, payment truth, callback verification, operational state ownership and offline reconciliation behind canonical commands/events; CONNECT Restaurant Operations to Payment Core, Finance Ledger, Commerce Catalog, Public Action Gateway, IntegrationConnection and Durable Execution; BUILD the missing real-time staff notification, payment-timing policy and multi-branch managerless-operations control plane; DROP only demo/fake-success and duplicate authority paths after cutover.**

## 1. Neyi doğruladık?

SÖKÜM 36 sonrasında yapılan file-level vertical audit, Restaurant tarafının yalnız ince bir package/type shell olmadığını doğruladı. Ürün emeği şu yüzeylere dağılmış durumda:

```text
packages/restaurant
  offline DB / Dexie contracts
  sync conflict policy
  KDS
  QR + payment/cart
  waiter/kitchen/revenue KPI

apps/web/src/lib/restoran
  MasaTypes.ts
  restaurant domain types
  tax/utilities
  B2B/procurement-adjacent types

apps/web/src/app/api/restoran
  masa-olustur
  masa-siparis
  siparis-olustur
  alman-odeme
  alman-odeme-callback
  split-odeme
  menu-sihirbazi
  upsell-onerisi
  parasut-tetikle

apps/web/src/app/dashboard/manage/restoran
  garson
  mutfak / KDS
  QR siparis
```

Ana sonuç:

> Restaurant, generic Commerce ekranı değildir. Masa yaşam döngüsü, açık adisyon, mutfak, servis, personel görevi, offline POS ve operasyon KPI'ları nedeniyle ayrı bir **Restaurant Operations** bounded context'idir.

---

## 2. Kurtarılan Restaurant OS ürün vizyonu

### 2.1 Garson çağırmadan masadan sipariş

Bu fikir yalnız mock tasarım değildir.

`masa-olustur` işletmenin masa sayısından masa kayıtları ve QR linkleri üretir. QR kartları basılabilir. `siparis-olustur` ve `masa-siparis` public müşteri akışından gelen siparişi gerçek `aktif_adisyonlar` state'ine yazmaktadır.

`masa-siparis` ayrıca:

- aynı masadaki birden fazla cihazı `deviceId` ile ayırır,
- mevcut açık adisyona atomik item append yapar,
- split-bill için item'ın hangi cihazdan geldiğini saklar,
- kuruş bazlı fiyat/KDV state'i taşır.

**Karar:** Self-ordering / multiplayer table cart **KEEP**.

### 2.2 Sipariş anında ödeme

`alman-odeme` gerçek İyzico checkout başlatma primitive'ine bağlanır. Dolayısıyla klasik "yemek bitti, garson hesap getirsin" zorunluluğunu kıran pay-first ürün yönü kodda vardır.

**Karar:** `ON_ORDER` payment timing **KEEP**.

### 2.3 Hazırlık başladığında ödeme

Masa state machine'i açıkça:

```text
siparis_verildi
 -> servis_acildi
 -> mutfakta_hazirlaniyor
 -> mutfak_hazir
 -> teslim_edildi
```

transition'larını içeriyor.

Ancak güncel audit'te `mutfakta_hazirlaniyor` transition'ına bağlı canonical bir ödeme başlatma/capture orchestration'ı doğrulanmadı.

Bu nedenle ürün fikri kaybedilmeyecek ve explicit policy olarak **BUILD** edilecek:

```text
RestaurantPaymentTimingPolicy
  = ON_ORDER
  | ON_KITCHEN_START
  | POSTPAID
```

Gelecekte gerekirse `ON_KITCHEN_ACCEPT` ayrı policy olabilir; fakat mevcut ürün hedefi en az yukarıdaki üç modu desteklemelidir.

### 2.4 Split bill / Alman usulü hesap

Item seçerek ödeme semantiği ve ürün UX'i vardır. Mevcut `split-odeme` doğrudan item'ları `odendi: true` yapıp lokal payment success yazabildiği için finansal authority olarak kullanılamaz.

**KEEP:** item-level tender allocation / split-bill UX.  
**REWRITE:** gerçek ödeme sonucu Payment Core + provider verification + Finance Ledger üzerinden gelir.

---

## 3. Masa yaşam döngüsü, düşündüğümüzden daha ileri

`MasaTypes.ts` sekiz aşamalı explicit state machine taşıyor:

```text
bos
 -> siparis_verildi
 -> servis_acildi
 -> mutfakta_hazirlaniyor
 -> mutfak_hazir
 -> teslim_edildi
 -> hesap_odendi_kirli
 -> temizleniyor
 -> bos
```

Ayrıca:

- kirli/temizleniyor durumda QR sipariş kilidi,
- atanmış garson ID/adı,
- aktif adisyon referansı,
- son sipariş/durum/temizlik timestamps,
- oturum ciro state'i,
- state transition validation,
- garsonun görmesi gereken bir sonraki aksiyon

modellenmiş durumda.

Özellikle ürün davranışı:

```text
siparis_verildi -> "Servis Aç"
mutfak_hazir -> "Yemek Hazır, Masaya Teslim Et"
hesap_odendi_kirli -> "Masayı Temizle ve Kapat"
```

şeklinde görev yönlendirme taşıyor.

**Karar:** Table/DiningSession lifecycle **KEEP**, fakat canonical event/state authority olarak yeniden bağlanacak.

---

## 4. KDS + garson takibi + KPI gerçekten tasarlanmış

`packages/restaurant` KDS katmanı:

- kitchen order/item state,
- elapsed/prep timers,
- green/yellow/red urgency,
- overdue detection,
- geciken siparişi önceliklendirme

primitive'leri taşıyor.

KPI contract'ında ayrı ayrı:

### Waiter KPI

- teslim sayısı,
- ortalama teslim süresi,
- gecikme sayısı,
- rating.

### Kitchen KPI

- ortalama hazırlama süresi,
- geciken iş,
- iptal,
- peak/busy hour.

### Revenue KPI

- ciro,
- bahşiş,
- ortalama adisyon,
- en çok satan ürünler.

Bu nedenle "kim çalışıyor, nerede darboğaz var, servis mi mutfak mı yavaş" fikrinin veri modeli gerçek ve korunmaya değerdir.

**Karar:** Waiter/Kitchen/Revenue KPI model **KEEP + HARDEN**.

---

## 5. Personel ve vardiya intent'i de kodda var

`MasaTypes.ts` personel için:

```text
rol = garson | asci | patron | kasiyer
durum = online | mola | offline
telefon
fcmToken
aktif_masa_sayisi
bugun_toplam_masa
bugun_toplam_bahsis_kurus
son_atama_sira
vardiya_baslangic
son_gorev_ani
```

alanlarını tanımlıyor.

Bu önemli çünkü Restaurant OS'un yönetici yerine geçen kontrol döngüsünün tohumu burada:

```text
kim vardiyada?
kim molada?
kim kaç masa taşıyor?
kim ne zaman son görev aldı?
kim ne kadar hızlı teslim ediyor?
mutfak ne kadar hızlı çıkarıyor?
```

### Garson atama yönü

`atanan_garson_id` / `atanan_garson_adi` masa state'inde bulunuyor; personelde yük metriği ve round-robin tie-breaker için `son_atama_sira` var.

Bu nedenle otomatik workload-aware waiter assignment ürün intent'i **KEEP/BUILD** olarak korunacaktır.

---

## 6. "Yemek hazır -> garsonun telefonuna bildirim" durumu

Repo açıkça:

- `mutfak_hazir` state'ini,
- atanmış garson kimliğini,
- `fcmToken` alanını,
- "Yemek Hazır, Masaya Teslim Et" waiter action'ını

modelliyor.

Ancak güncel audit'te şu full production zinciri doğrulanmadı:

```text
KitchenReady event
 -> assigned waiter resolve
 -> FCM push send
 -> waiter device receive
 -> acknowledgement
 -> delivered transition
 -> delivery SLA/KPI projection
```

Dolayısıyla fikir **kaybolmuş değildir**, fakat mevcut repository'de sender/orchestrator'ın tamamı doğrulanmış değildir.

### BUILD

```text
KitchenReady
  -> WaiterTask created
  -> Assignment policy
  -> OperationalNotification
  -> FCM / device push
  -> ACK
  -> Delivered
  -> KPI projection
```

Push notification Messaging/Campaign marketing hattı değil, Restaurant'ın **operational notification** capability'sidir; provider adapter ortak messaging altyapısını kullanabilir.

---

## 7. Offline-first POS emeği kesinlikle korunacak

`packages/restaurant` Dexie-oriented local model taşır:

- order,
- product,
- category,
- table,
- payment status,
- sync status,
- timestamps,
- waiter links.

Para alanları kuruştur.

Conflict policy explicit'tir:

```text
order status    -> server wins
payment status  -> server wins
payment id      -> server wins
items           -> client wins
customer note   -> client wins
tip             -> client wins
waiter/timers   -> server wins
```

Bu ürün yönü çok değerlidir, çünkü restoran internet kesilince durmamalıdır.

### KEEP

- offline POS intent,
- local replica,
- conflict-category ayrımı,
- pending/synced/conflict state.

### REWRITE

Conflict yalnız field-name map ile çözülmeyecek. Canonical model:

```text
Restaurant command/event revision
 -> local pending event
 -> server acknowledgement
 -> deterministic merge/reject
 -> conflict record when required
```

Payment state hiçbir zaman client-wins olamaz.

---

## 8. Menü onboarding + upsell + accounting otomasyonu

Restaurant emeği POS ile sınırlı değil.

### Menu Wizard

`menu-sihirbazi` fiziksel/kağıt menü görselini Vision AI ile okuyup:

- ürün,
- fiyat,
- kategori,
- KDV tipi

şeklinde dijital menü seed'ine dönüştürme intent'i taşır.

**KEEP:** Restaurant onboarding acceleration / menu digitization.

### Upsell

`upsell-onerisi` sipariş bağlamından AI önerisi üretme yönü taşır.

**KEEP:** recommendation intent.  
**CONNECT:** Agent/Recommendation capability + gerçek conversion outcome/attribution.

### Paraşüt

`parasut-tetikle` accounting/e-fatura provider side-effect intent'i taşır.

**KEEP_ADAPTER:** Paraşüt entegrasyon fikri.  
**CONNECT:** Finance/Accounting event -> Outbox -> IntegrationConnection -> provider adapter.

Restaurant route'u doğrudan accounting success truth'u üretmez.

---

## 9. Müdürsüz / az müdürlü operasyon için canonical hedef

Mevcut kod güçlü bir başlangıç veriyor fakat ürün vizyonunun tam ekonomik değerini ortaya çıkarmak için şu bounded context genişletmesi gereklidir:

```text
RestaurantLocation / Branch
  ├── Floor / Table
  ├── Employee / Shift
  ├── DiningSession / Check
  ├── RestaurantOrder
  ├── KitchenTicket
  ├── WaiterTask
  ├── OperationalNotification
  └── OfflineReplica
```

Operasyon event spine:

```text
OrderPlaced
 -> PaymentAuthorized/Captured (policy'ye göre)
 -> ServiceOpened
 -> KitchenStarted
 -> KitchenReady
 -> WaiterTaskAssigned
 -> WaiterNotified
 -> Delivered
 -> TableDirty
 -> CleaningStarted
 -> TableAvailable
```

### Managerless Operations Projection

Bu eventlerden şunlar türetilir:

- waiter workload,
- waiter response/delivery SLA,
- kitchen prep SLA,
- order backlog,
- overdue table/task,
- table turn time,
- cleaning turnaround,
- cancellation/void rate,
- revenue / tip / average check,
- product throughput,
- staff idle/bottleneck signals.

### BUILD - multi-branch / roaming manager cockpit

Güncel audit'te canonical çok-şubeli regional-manager hierarchy ve tek bir cross-branch operations cockpit doğrulanmadı.

Bu ürün vizyonu kayda geçirildi:

```text
BusinessTenant
  -> RestaurantLocation[]
       -> Shift + Staff + Operations
              ↓
      BranchHealthProjection
              ↓
Regional / Roaming Manager Cockpit
```

Cockpit normal akışta insanın tek tek ekran izlemesini istemez. Yalnız exception üretir:

- kitchen SLA bozuldu,
- garson backlog yükseldi,
- personel eksik / mola yükü anormal,
- masa turn süresi bozuldu,
- iptal/void anomalisi,
- ödeme/provider problemi,
- stok kritik,
- cihaz/offline-sync sorunu.

Hedef:

> Müdür rutin mikro-yönetim yapmaz; sistem normal operasyonu yönetir, insan yalnız istisna ve koçluk gerektiren şubeye gider.

---

## 10. Canonical authority split

```text
BusinessTenant
      ↓
Restaurant Operations
  ├── RestaurantLocation
  ├── Table / DiningSession
  ├── Check / Adisyon
  ├── RestaurantOrder
  ├── KitchenTicket / KDS
  ├── WaiterTask
  ├── Employee / Shift
  ├── OperationalNotification
  └── OfflineReplica
          ↓
+-------------------------------------------+
| Commerce Catalog / menu price snapshots   |
| Payment Core / tender + timing policy     |
| Finance Ledger / tax/tip/revenue truth    |
| Public Action Gateway / QR self-order     |
| IntegrationConnection / Iyzico/Paraşüt    |
| Durable Execution / notification/outbox   |
| Audit + Telemetry / KPI projections       |
+-------------------------------------------+
```

Restaurant yalnız kendi operasyon state'inin authority'sidir.

Aşağıdakileri tekrar kurmaz:

- tenant identity,
- commercial entitlement,
- customer identity,
- provider credential truth,
- payment truth,
- immutable finance truth.

---

## 11. KEEP / REWRITE / BUILD / DROP

### KEEP

- `packages/restaurant` domain contracts,
- offline-first / Dexie intent,
- explicit conflict categories,
- Masa lifecycle state machine,
- table/QR provisioning,
- QR self-ordering,
- multiplayer table cart,
- dining-session/adisyon concept,
- KDS urgency/timer algorithms,
- waiter delivery workflow,
- personnel status/workload/shift metrics,
- waiter/kitchen/revenue KPI contract,
- item modifiers/notes,
- split-bill/tender allocation UX,
- tip and tax semantics,
- kuruş money direction,
- Iyzico checkout adapter intent,
- Menu Wizard / Vision AI digitization,
- AI upsell intent,
- Paraşüt/accounting adapter intent,
- garson/mutfak/QR dashboard UX.

### REWRITE / CONNECT

- QR/table identity and authoritative price resolution,
- open-check concurrency and idempotency,
- Restaurant command/state authority,
- verified payment callbacks,
- split-bill payment truth,
- financial projections,
- offline revision/event reconciliation,
- real KDS/waiter UIs instead of demo state,
- accounting/provider side-effects through outbox/integration authority.

### BUILD

- `RestaurantPaymentTimingPolicy` with `ON_ORDER | ON_KITCHEN_START | POSTPAID`,
- durable Restaurant event stream/state transitions,
- real `KitchenReady -> WaiterTask -> FCM push -> ACK -> Delivered` orchestration,
- workload-aware waiter assignment,
- Employee/Shift canonical authority,
- RestaurantLocation/Branch hierarchy,
- branch-health and exception engine,
- multi-branch / roaming-manager cockpit,
- canonical operational KPI projection.

### DROP_AFTER_CUTOVER

- demo order arrays as production truth,
- client-local fake order success,
- caller-controlled price/total as business truth,
- local `durum: basarili` payment claims without verified provider result,
- duplicate direct Firestore state mutations after Restaurant command authority exists.

---

## 12. SÖKÜM 37 final kararı

Restaurant OS **kurtarılacaktır** ve generic Commerce içine eritilmeyecektir.

Mevcut repo, ürünün şu ana parçalarının gerçekten düşünülüp kısmen implement edildiğini kanıtlıyor:

```text
QR SELF ORDER
+ TABLE / ADISYON
+ PAY-FIRST / SPLIT BILL
+ KDS
+ WAITER DELIVERY
+ OFFLINE POS
+ STAFF STATE
+ KPI
+ MENU DIGITIZATION
+ AI UPSELL
+ ACCOUNTING ADAPTER
```

Eksik olan ürün fikri değil, production-grade orchestration'dır.

En önemli yeni invariant:

> **Restaurant OS'un amacı ekran çoğaltmak değil; order, kitchen, waiter, table, payment ve staff event'lerini tek operasyon döngüsüne bağlayarak yöneticinin rutin mikro-yönetim yükünü otomasyona devretmektir.**

Bu nedenle `packages/restaurant`, `apps/web/src/lib/restoran`, `/api/restoran/*` ve Restaurant dashboard yüzeyleri dedicated migration/cutover tamamlanmadan archive/delete edilemez.
