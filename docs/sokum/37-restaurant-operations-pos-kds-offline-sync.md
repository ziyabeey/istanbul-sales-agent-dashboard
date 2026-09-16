# SÖKÜM 37 - Restaurant Operations / POS / Masa / Adisyon / KDS / Offline Sync

> **Tarih:** 2026-09-16  
> **Durum:** AÇIK  
> **Neden yeniden açıldı:** SÖKÜM 36 sonrasında yapılan file-level vertical audit, Restaurant tarafının yalnız ince bir package/type shell olmadığını; kendi operasyon state'i, offline-first modeli, KDS, masa/adisyon, QR sipariş ve split-payment semantiği olan bağımsız bir ürün domain'i olduğunu doğruladı.

## 1. İlk doğrulanan yüzey

### Package contract

`packages/restaurant` bugün şunları taşıyor:

- offline order/product/category/table modeli,
- kuruş bazlı money alanları,
- Dexie store layout,
- sync state ve conflict-resolution policy,
- KDS order/item/timer semantiği,
- QR/payment/cart sözleşmeleri,
- waiter/kitchen/revenue KPI tipleri ve yardımcıları.

Özellikle offline sync policy açıkça düşünülmüş:

```text
order status     -> server wins
payment state    -> server wins
items/note/tip   -> client wins
```

Bu, Restaurant'ın basit bir Commerce ekranı değil, offline-first operasyon çekirdeği taslağı olduğunu gösterir.

### Runtime / API

Doğrulanan `apps/web` yüzeyleri:

```text
/api/restoran/
  alman-odeme
  alman-odeme-callback
  masa-olustur
  masa-siparis
  menu-sihirbazi
  parasut-tetikle
  siparis-olustur
  split-odeme
  upsell-onerisi

/dashboard/manage/restoran/
  garson
  mutfak
  qr-siparis

/lib/restoran/
  MasaTypes.ts
  b2bTipler.ts
  tipler.ts
  utils.ts
```

Garson ve mutfak ekranları bugün demo/local state kullanıyor olsa da ürün akışı nettir. Backend tarafında ise gerçek Firestore adisyon, kuruş bazlı tutar, KDV, masa siparişi, split-bill ve İyzico checkout kodu vardır.

## 2. İlk verdict

### KEEP

Aşağıdaki ürün/domain emeği korunacaktır:

- masa / table kavramı,
- dining session / açık adisyon fikri,
- QR ordering UX ve semantiği,
- ortak masa sepeti / multiplayer cart intent'i,
- KDS ve kitchen-ticket lifecycle,
- waiter ready/delivered lifecycle,
- modifiers / notes,
- split bill / tender allocation ürün fikri,
- tip/bahşiş semantiği,
- KDV hesaplama intent'i,
- kuruş bazlı para yönü,
- offline-first POS modeli,
- explicit sync conflict policy,
- kitchen/waiter KPI intent'i,
- İyzico ve Paraşüt adapter intent'i.

Bunlar generic Commerce içine eritilip kaybedilmeyecektir.

### REWRITE / CONNECT

Restaurant kendi finansal veya tenant authority'sini tekrar kurmayacak. Aşağıdaki sınırlar canonical core'a bağlanmalıdır:

- tenant ve yetki -> `BusinessTenant` + `RequestContext`,
- capability -> `EffectiveCapabilitySet`,
- menu/product fiyat authority -> Commerce Catalog veya açık Restaurant Menu projection/policy,
- ödeme -> Payment Core,
- revenue/refund/tip/tax financial truth -> immutable Finance Ledger,
- public QR action -> Public Action Gateway,
- provider callbacks -> verified Payment/Integration ingress,
- Paraşüt -> IntegrationConnection/provider adapter,
- async işler -> Durable Jobs/Outbox/Event Inbox,
- audit/telemetry -> platform spine.

## 3. Şimdiden görülen kritik sınırlar

### 3.1 Public caller fiyat authority olamaz

`masa-siparis` request'i bugün `esnafId` ve `birimFiyatKurus` alabiliyor. Canonical modelde public QR client:

```text
signed/opaque table binding
+ product/menu item id
+ qty/modifier selection
```

gönderir; tenant/table resolution ve authoritative price snapshot server-side yapılır.

### 3.2 Açık adisyon create yarışı

Bugünkü mantık:

```text
open check query
  -> found: arrayUnion
  -> not found: create
```

şeklindedir. `arrayUnion` update'i atomik olsa da `query -> no result -> create` bölümü iki eşzamanlı request'in iki ayrı açık adisyon üretmesini engelleyen canonical transaction/idempotency authority değildir.

Hedef:

```text
DiningSession/Table identity
       ↓
OpenCheck unique reservation / transaction
       ↓
RestaurantOrder commandId
```

### 3.3 Split bill ödeme sonucu değildir

`split-odeme` bugün seçilen kalemleri doğrudan `odendi: true` yapıp `odemeler` altında `durum: basarili` yazabiliyor.

Bu ürün UX'i korunur fakat finansal truth değildir.

Hedef:

```text
Check
  ↓
TenderAllocation / selected items
  ↓
PaymentIntent
  ↓
Verified provider outcome
  ↓
Payment Core
  ↓
Finance Ledger
  ↓
Check payment projection
```

### 3.4 Restaurant İyzico callback ayrı payment authority olamaz

`alman-odeme` gerçek İyzico checkout başlatma primitive'i taşıyor ve korunmalıdır.

Ancak `alman-odeme-callback` request body'deki token/status/metadata üzerinden doğrudan paid restaurant state üretebiliyor. Canonical akış provider sonucunu Payment Core içinde doğrulayıp idempotent event üretmelidir.

### 3.5 Demo UI != çöpe atılacak UX

Garson, KDS ve QR ekranlarının bazıları demo/local state kullanıyor.

Karar:

> Demo data DROP adayıdır; ekranın ürün davranışı ve UX emeği değildir.

UI'lar canonical restaurant read model/commands'a bağlanarak korunabilir.

## 4. Hedef bounded context

```text
BusinessTenant
      ↓
Restaurant Operations
  ├── RestaurantLocation / Floor / Table
  ├── DiningSession
  ├── Check / Adisyon
  ├── RestaurantOrder
  ├── KitchenTicket / KDS
  ├── WaiterTask / Delivery
  └── OfflineReplica / SyncCursor
          ↓
+---------------------------------------+
| Commerce Catalog / Menu snapshots     |
| Payment Core / Tender allocations     |
| Finance Ledger / tax / tip / revenue  |
| Public Action Gateway / QR            |
| IntegrationConnection / Paraşüt       |
| Durable Jobs / Event Inbox            |
+---------------------------------------+
```

Restaurant Operations kendi operasyon state'inin sahibidir. Payment, Finance, Identity, Tenant ve Integration truth'larını kopyalamaz.

## 5. SÖKÜM 37'de cevaplanacak sorular

- `MasaTypes.ts`, `tipler.ts` ve `packages/restaurant` arasında kaç paralel schema var?
- Masa/table ID ve dining-session ID canonical olarak nasıl üretilecek?
- Aynı masada birden fazla cihaz/kişi sipariş verirken order/check revision nasıl korunacak?
- Menü Commerce Catalog'un projection'ı mı, Restaurant'a özel ayrı aggregate mı?
- Modifier, availability, kitchen routing ve course/station bilgisi nerede yaşayacak?
- KDS state transition'ları hangileri ve kim değiştirebilir?
- Garson teslim lifecycle'ı order'dan ayrı task mı olmalı?
- Offline Dexie replica server state ile event/revision bazında nasıl reconcile olacak?
- Conflict rules bütün alanlar için yeterli mi; hangi durumlarda manual resolution gerekir?
- Split bill item-level mi, amount-level mi, ikisini de destekleyecek mi?
- Tip/tax/refund/cancellation/void semantiği Payment ve Finance'e nasıl projekte edilecek?
- QR table binding tahmin edilemez ve tenant-safe nasıl olacak?
- İyzico callback doğrulaması ve replay protection nasıl merkezileşecek?
- Paraşüt export/sync Restaurant mı yoksa Accounting/Integration authority üzerinden mi akacak?
- Restaurant capability'leri hangi entitlement'larla açılacak?
- Stock/supply consumption ile `packages/supply` arasında gerçek bir bağ var mı?

## 6. Diğer vertical paketlere etkisi

Bu tur aynı zamanda şu paketlerin de otomatik cleanup/drop adayı olmadığını teyit etti:

- `packages/marketplace`
- `packages/supply`
- `packages/support`
- `packages/voice`
- `packages/studio`
- `packages/blog`
- `packages/seo`
- `packages/admin`
- `packages/influencer`

Bunlar dedicated caller/runtime triage tamamlanmadan archive/delete edilmeyecektir.

`admin` içindeki impersonation/feature-flag/audit primitive'leri mevcut Control Plane kararlarına map edilir. `seo`, `voice`, `blog` gibi paketler extension olabilir. Marketplace ve Supply gibi gerçek ürün state'i taşıyan paketler gerekirse Restaurant gibi bağımsız vertical teardown frontier'ı açabilir.

## 7. Şimdilik değişmeyen kural

- Hiçbir Restaurant dosyası bu tur nedeniyle silinmez.
- `apps/randevu-server` kapsam dışıdır.
- Restaurant'ın finansal state'i mevcut mutable alanlardan canonical Payment/Finance authority'ye taşınmadan cleanup yapılmaz.

> **SÖKÜM 37'nin amacı Restaurant emeğini koruyarak, gerçek Restaurant Operations bounded context'ini eski dağınık implementation'dan ayırmak ve yeni Kepenk'e güvenli biçimde taşımaktır.**
