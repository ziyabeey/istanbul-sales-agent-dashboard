# SÖKÜM 38 - Marketplace / Job / Bid / Provider / Escrow / Credit Economy

> **Tarih:** 2026-09-16  
> **Durum:** KAPALI  
> **Kapsam:** `packages/marketplace`, `apps/web/src/app/dashboard/manage/pazaryeri`, müşteri/usta marketplace UX'i, Job/Bid lifecycle, provider identity, kredi ekonomisi, escrow/commission sınırı, auto-bid ve AI job analysis.  
> **Core baseline:** `docs/sokum/36-canonical-architecture-synthesis.md`

## Executive verdict

Marketplace bir UI eklentisi veya Commerce ekranı olarak eritilmemeli. Repo, iki taraflı hizmet pazaryeri için güçlü bir domain dili taşıyor:

```text
Customer
 -> Job
 -> Provider discovery
 -> Bid
 -> Award
 -> Work
 -> Escrow / Payment
 -> Settlement / Refund / Dispute
 -> Reputation
```

Fakat current main'de bunun gerçek runtime authority'si yok.

`packages/marketplace` bugün bir **domain-contract / type island** durumunda. `src/` altında yalnız barrel export ve `types/job.ts`, `types/bid.ts` var. Persistence, repository, service, command handler, API adapter, durable worker veya reconciliation implementation'ı yok. Müşteri ve usta ekranları ise açıkça `Demo Data` ile beslenen client-side prototipler.

Bu yüzden karar:

> **KEEP** Marketplace'i first-class bounded context olarak ve mevcut ürün/domain UX emeğini koru.  
> **REWRITE** Job/Bid/Award/Work state authority'sini, provider boundary'sini ve tüm parasal sözleşmeleri.  
> **DROP** Marketplace'in payment, identity, reputation, credit ve earnings truth'unu kendi aggregate'larında tekrar kurma fikrini.  
> **BUILD** gerçek Marketplace Core runtime'ı, Credit Ledger, Award/Work lifecycle, durable auto-bid ve canonical core entegrasyonları.

Marketplace'in hedefi yeni bir monolit yaratmak değil, hizmet pazarına özgü state machine'i sahiplenip payment, finance, identity, agent, observability ve durable execution authority'lerini canonical core'dan kullanmaktır.

---

## 1. Current-main kanıtı

### 1.1 `packages/marketplace` gerçek implementation değil

Current package footprint:

```text
packages/marketplace/
  package.json
  src/
    index.ts
    types/
      job.ts
      bid.ts
```

`index.ts` yalnız type/constant/function export ediyor.

Paket şu domain primitive'lerini tanımlıyor:

- `Job`, `JobStatus`, `JobLocation`, `AIJobAnalysis`
- `Bid`, `BidStatus`, `ProviderSnapshot`
- `ServiceProvider`
- `AutoBidConfig`
- credit cost / credit package sabitleri
- `EscrowPayment`
- commission oranı
- saf `calculateEscrow()` helper'ı

Ama package içinde bunların authority'sini kuran hiçbir runtime katmanı yok.

`package.json` yalnız `zod` dependency'si taşıyor. Buna rağmen mevcut `src/` footprint'inde Zod schema/parse boundary'si de bulunmuyor. Yani paket, runtime validation sözleşmesine bile henüz dönüşmemiş.

### 1.2 Müşteri marketplace ekranı demo state

`apps/web/src/app/dashboard/manage/pazaryeri/page.tsx` doğrudan:

```ts
/* Demo Data */
```

ile başlıyor.

Ekran şunları iyi biçimde tasarlamış:

- kategori keşfi,
- iş listesi,
- yeni iş oluşturma,
- bütçe,
- urgency,
- teklif sayısı,
- AI fiyat/süre/zorluk analizi,
- customer-side job detail,
- escrow yönelimli ürün dili.

Fakat `JOBS`, `CATS`, KPI ve AI analysis verileri sabit client-side veriler. Formun submit'i canonical command/API'ye gitmiyor.

### 1.3 Usta/provider ekranı da demo state

`apps/web/src/app/dashboard/manage/pazaryeri/usta/page.tsx` yine açıkça `Demo Data` kullanıyor.

Ekran şunları taşıyor:

- job lead listesi,
- mesafe ve bütçe,
- teklif başına kredi maliyeti,
- aktif teklifler,
- kredi bakiyesi,
- kredi paketleri,
- reputation/rating,
- aylık kazanç,
- auto-bid,
- kategori/mesafe/bütçe/fiyat stratejisi,
- otomatik mesaj şablonu.

Bu UX korunmaya değer. Ancak mevcut ekran hiçbir gerçek Job/Bid/Credit/Payment writer'ına bağlı değil.

### 1.4 Package ile UI arasında gerçek authority köprüsü görünmüyor

Current-main code search, `MarketplaceJob`, `EscrowPayment`, `AutoBidConfig`, `CREDIT_PACKAGES`, `MARKETPLACE_COMMISSION_RATE` ve `@kepenk/marketplace` gibi ayırt edici semboller için gerçek caller/runtime yüzeyi göstermedi.

Bu nedenle package ve dashboard şu anda birbirini doğrulayan bir ürün niyeti taşısa da aynı authoritative runtime'ın iki katmanı değiller.

---

## 2. Job modeli doğru domain'i görüyor ama lifecycle fazla kaba

Mevcut `JobStatus`:

```text
open
in_progress
completed
cancelled
disputed
```

Bu liste ürün fikrini taşımak için yeterli, fakat canonical write authority için yeterli değil.

`Job` ayrıca:

- `customerId`
- category path/id
- title/description/questions/photos
- location
- budget
- urgency
- preferred date
- max bid / bid count
- selected bid id
- AI analysis

taşıyor.

Asıl problem `selectedBidId` ile `in_progress` arasındaki business transition'ın entity olarak modellenmemesi.

Bir teklifin seçilmesi aşağıdaki kavramların aynısı değildir:

```text
Bid accepted
!= Award created
!= Payment authorized
!= Work started
!= Work completed
!= Settlement completed
```

### Hedef Job state yaklaşımı

Final enum migration sırasında domain ihtiyacına göre kesinleştirilmeli, fakat authority en az şu fazları ayırabilmeli:

```text
DRAFT
 -> OPEN
 -> AWARDED
 -> ACTIVE
 -> COMPLETION_REQUESTED
 -> COMPLETED

branch:
CANCELLED
DISPUTED
```

`Award` ayrı bir durable entity/event olmalı. Böylece bid kabulü, seçilen provider, kabul edilen fiyat ve o anda geçerli ticari koşullar immutable biçimde snapshot'lanabilir.

---

## 3. Bid modeli iyi bir primitive, fakat acceptance tek başına iş sözleşmesi olamaz

Mevcut `Bid`:

- jobId
- providerId
- amount
- message
- estimatedDays
- warranty
- isAutoBid
- creditCost
- providerSnapshot
- pending / accepted / rejected / withdrawn

taşıyor.

Bu, quote/bid primitive'i olarak KEEP.

Ama `accepted` status'ü tek başına aşağıdaki otoriteleri kurmamalı:

- işi kimin kazandığı,
- müşteri ödeme yükümlülüğü,
- escrow reservation,
- provider payout,
- work lifecycle,
- commission,
- refund/dispute.

Canonical akış:

```text
MarketplaceJob
 -> Bid[]
 -> AcceptBid command
 -> Award
 -> PaymentIntent / EscrowReservation
 -> WorkOrder / Work lifecycle
```

### Invariant

> Bir Bid'in `accepted` olması para hareketi değildir ve finansal success anlamına gelmez.

---

## 4. Provider modeli çok fazla authority'yi tek struct içinde topluyor

Mevcut `ServiceProvider` aynı nesnede şunları birleştiriyor:

- `userId`
- kişisel profil ve telefon
- category/service radius
- payment provider `subMerchantKey`
- rating / completedJobs / responseTime / repeatRate
- `creditBalance`
- `totalEarnings`
- `autoBidConfig`
- verification flags

Bu bir product view-model olarak anlaşılır, fakat authoritative aggregate olarak yanlış sınırdır.

### Ayrılması gereken source-of-truth'lar

```text
User / Membership / Tenant identity
 -> SÖKÜM 29 authority

ProviderProfile / marketplace capability
 -> Marketplace Core

Verification evidence / trust decision
 -> dedicated trust/review policy

Payment account / sub-merchant binding
 -> Payment / Integration authority

Credit balance
 -> Credit Ledger projection

Total earnings
 -> Finance projection

Rating / completed jobs / response metrics
 -> Reputation / Marketplace projection

AutoBidConfig
 -> Marketplace policy + Durable Jobs
```

### ProviderSnapshot KEEP

`ProviderSnapshot` kavramı korunmalı.

Bir Bid oluşturulduğunda kullanıcının gördüğü provider adı/rating gibi sunum verilerini tarihsel olarak sabitlemek faydalıdır. Ancak snapshot kaynak truth değildir.

```text
Canonical Provider/Reputation
 -> ProviderSnapshot at Bid creation
```

---

## 5. Money contract current modelde güvenli değil

Bu turdaki en kritik teknik bulgulardan biri parasal birim tutarsızlığıdır.

`bid.ts`:

```ts
export const CREDIT_PRICE_TRY = 5
```

ile kredi başına 5 TL niyeti taşıyor.

Aynı dosyada:

```ts
{ credits: 10, price: 5000 }
{ credits: 30, price: 13500 }
```

gibi paket fiyatları var.

UI ise aynı paketleri:

```text
10 kredi  -> ₺50
30 kredi  -> ₺135
100 kredi -> ₺400
```

şeklinde gösteriyor.

Bu nedenle package'taki `price` alanı fiilen kuruş gibi davranıyor, fakat type adı/birimi bunu ifade etmiyor.

Aynı `bid.ts` içinde:

```text
Bid.amount            number // TRY
Escrow.totalAmount    number // TRY
commissionAmount      number // TRY
providerAmount        number // TRY
```

kullanılıyor.

Yani aynı bounded context içinde bir yerde 5000 = 50 TL, başka yerde number doğrudan TL anlamına geliyor.

### Karar

Bare `number` + yorumla money contract yasaklanmalı.

Canonical model:

```ts
Money = {
  currency: 'TRY'
  minor: bigint | integer
}
```

veya core'da zaten seçilen eşdeğer typed minor-unit standardı.

Marketplace:

- Bid amount,
- budget,
- AI estimated price,
- commission,
- escrow,
- payout,
- credit package price

için aynı Money standardını kullanmalı.

### Invariant

> UI formatı bir money unit sözleşmesi değildir.

---

## 6. Credit economy entitlement değil, ayrı marketplace economy primitive'i

Mevcut sistem:

- kolay iş 2 kredi,
- orta iş 3 kredi,
- zor iş 5 kredi,
- yüksek rating için %20 indirim,
- paket satın alma,
- mutable `creditBalance`

tasarlıyor.

Bu değerli bir marketplace monetization modeli. Ancak SÖKÜM 35'teki product entitlement ile aynı şey değildir.

### Ayrım

```text
Entitlement / Capability
= tenant bu modülü/özelliği kullanabilir mi?

Marketplace Credit
= provider belirli bir ekonomik aksiyonu kaç kez / hangi maliyetle yapabilir?
```

Kredi bir **Marketplace Wallet / Credit Ledger** olarak modellenmeli.

Önerilen primitive'ler:

```text
CreditAccount
CreditLedgerEntry
CreditPurchase
CreditGrant
CreditReservation
CreditSpend
CreditRelease
CreditRefund
CreditExpiry   // ürün kararı varsa
```

### Teklif verme örneği

```text
PlaceBid
 -> validate provider + job + policy
 -> reserve credits idempotently
 -> create Bid
 -> commit credit spend

failure
 -> release reservation
```

### Invariant'lar

- kredi sessizce negatife düşemez,
- her mutation'ın immutable ledger entry'si vardır,
- her spend/refund idempotency key taşır,
- aynı job/provider için retry duplicate kredi tüketmez,
- ödeme ile alınan kredi paketi yalnız verified Payment success sonrası grant edilir,
- promotional bonus ile purchased credit aynı source metadata ile izlenebilir.

---

## 7. Escrow Marketplace'in financial truth'u olamaz

Mevcut `EscrowPayment`:

- jobId / bidId
- customerId / providerId
- subMerchantKey
- total / commission / provider amount
- paymentTransactionId
- pending / paid / approved / disapproved / refunded

taşıyor.

Bu model ödeme sağlayıcısı semantiğini doğrudan Marketplace aggregate'ına gömüyor.

### Problem

Marketplace aşağıdakilerin authority'si olmamalı:

- payment transaction truth,
- provider sub-merchant credential/resource truth,
- settlement truth,
- immutable financial ledger,
- refund ledger.

### Canonical sınır

```text
Marketplace Award
 -> PaymentIntent / EscrowIntent
 -> Payment Core
 -> provider callback/webhook
 -> verified PaymentState
 -> Finance Ledger events
 -> Marketplace projection
```

Marketplace'in bilmesi gereken şey provider transaction detayının kendisi değil, canonical payment/settlement referansıdır.

### Commission

`MARKETPLACE_COMMISSION_RATE = 0.10` bir business policy primitive'i olarak KEEP edilebilir.

Ama oran:

- versioned policy olmalı,
- Award anında snapshot'lanmalı,
- settlement calculation Payment/Finance tarafında minor-unit rounding ile yapılmalı,
- geçmiş iş yeni commission oranından etkilenmemeli.

### Invariant

> `Escrow approved` bir Marketplace boolean/status mutation'ı değil, doğrulanmış ödeme ve finans event'lerinden türeyen business state'tir.

---

## 8. Dispute, cancellation, refund ve payout ayrı lifecycle'lar

Current Job modelinde `disputed`, Escrow modelinde `refunded` var. Fakat aradaki süreç tanımlı değil.

Canonical flow en az şunu ayırmalı:

```text
Job/Work dispute
Payment dispute/refund
Settlement hold
Payout release
Financial reversal
```

Örneğin:

```text
WorkCompleted
 -> completion acceptance window
 -> release settlement

DisputeOpened
 -> settlement hold
 -> evidence/review
 -> resolution
 -> release | partial refund | full refund
 -> append Finance events
```

Marketplace'te yalnız final `refunded=true` benzeri state tutmak kabul edilmemeli.

SÖKÜM 21 Finance invariant'ı geçerlidir:

> Finansal geçmiş mutation ile düzeltilmez, reversal/refund event'leri append edilir.

---

## 9. Auto-bid gerçek bir durable capability olmalı

Auto-bid UX'i ve `AutoBidConfig` güçlü bir ürün primitive'i.

Kriterler:

- category,
- radius,
- min/max budget,
- price strategy,
- fixed rules,
- auto message.

Fakat bunu browser açıkken çalışan client logic veya basit cron'a bağlamak doğru değildir.

Canonical akış:

```text
JobOpened event
 -> AutoBidMatcher durable job
 -> eligible provider candidates
 -> policy checks
 -> credit reservation
 -> deterministic pricing capability
 -> PlaceBid command
 -> audit
```

### Zorunlu guard'lar

- provider active/verified olmalı,
- marketplace capability/entitlement açık olmalı,
- job hâlâ OPEN olmalı,
- max bid dolmamış olmalı,
- duplicate provider bid olmamalı,
- credit yeterli olmalı,
- mesafe/budget/category criteria canonical data üzerinden hesaplanmalı,
- retry duplicate bid veya duplicate credit spend üretmemeli,
- budget ceiling client'tan değil server-side config'ten okunmalı.

Bu SÖKÜM 24 Durable Jobs ile bağlanır.

---

## 10. AI Job Analysis advisory kalmalı

Mevcut model AI için güzel bir product contract taşıyor:

- estimated price range,
- suggested materials,
- safety tips,
- duration,
- complexity,
- consumer advice.

KEEP.

Ama AI sonucu authoritative financial/business state olamaz.

```text
Job facts
 -> Agent Capability
 -> AIJobAnalysis artifact
 -> UI advisory projection
```

AI:

- Job status değiştiremez,
- provider seçemez,
- ödeme başlatamaz,
- commission belirleyemez,
- kredi düşemez,
- dispute kararı veremez.

Analysis version/provenance taşımalı ve gerektiğinde yeniden üretilebilir olmalı.

---

## 11. Public/customer trust boundary

Marketplace iki taraflı olduğu için normal dashboard CRUD'dan daha yüksek trust ihtiyacı var.

### Customer-side commands

- CreateJob
- EditJob before lock point
- CancelJob
- AcceptBid
- ConfirmCompletion
- OpenDispute

### Provider-side commands

- PlaceBid
- WithdrawBid
- UpdateMarketplaceProfile
- ConfigureAutoBid
- BuyCredits
- Start/Complete work lifecycle içindeki izinli aksiyonlar

Her command server-side:

```text
Actor
 + Membership / identity
 + Marketplace role/capability
 + Entity ownership
 + Current revision/state
 + policy
 -> authorized transition
```

Client'ın gönderdiği:

- customerId,
- providerId,
- rating,
- creditBalance,
- totalEarnings,
- payment state

authoritative kabul edilmemeli.

---

## 12. Reputation ve verification current modelde projection gibi duruyor, source authority eksik

Current `ProviderSnapshot` ve `ServiceProvider`:

- rating,
- completedJobs,
- response time,
- repeat rate,
- verification status,
- identity/address verified

taşıyor.

Bunlar gerçek marketplace kalitesinin merkezinde, fakat current package bunların nasıl üretildiğini tanımlamıyor.

Bu nedenle 38 içinde yeni bir paralel identity sistemi kurmuyoruz.

Şimdilik canonical kural:

```text
Identity verification evidence
 + Marketplace completion events
 + review/moderation events
 + operational response metrics
 -> ProviderReputationProjection
 -> Bid-time ProviderSnapshot
```

Reputation/review/trust & safety ayrı sistemik frontier olarak ancak repo evidence dedicated implementation gösterirse bağımsız söküme çıkarılmalı.

---

## 13. KEEP / REWRITE / DROP / BUILD

### KEEP

- Marketplace first-class bounded context fikri
- iki taraflı customer/provider UX
- Job/category/location/urgency primitives
- Bid primitive'i
- ProviderSnapshot fikri
- credit-based lead/bid economy fikri
- commission policy fikri
- auto-bid product primitive'i
- AI job analysis product primitive'i
- dispute gereksinimi
- rating/reputation UX gereksinimi
- mevcut müşteri ve usta dashboard tasarım emeği

### REWRITE

- Job lifecycle
- Bid acceptance -> Award transition
- provider model authority sınırı
- all money types
- credit balance/economy
- escrow/payment mapping
- commission snapshot/rounding
- dispute/refund/payout lifecycle
- auto-bid execution
- AI analysis provenance
- provider reputation source mapping
- public/customer/provider command authorization

### DROP

Migration sonrası:

- bare `number` ile örtük TL/kuruş karışımı
- Marketplace içinde payment transaction truth
- Marketplace içinde mutable earnings truth
- raw mutable `creditBalance` source-of-truth
- `selectedBidId` ile Award entity'sinin yerine geçme
- client-side state'in business success sayılması
- UI hard-coded KPI/data'nın production truth gibi kullanılması
- provider verification/payment binding/identity'nin tek Marketplace struct'ında authority kabul edilmesi

### BUILD

```text
Marketplace Core
  MarketplaceJob
  Bid
  Award
  WorkOrder / WorkLifecycle
  MarketplacePolicy
  ProviderMarketplaceProfile

Marketplace Credit Economy
  CreditAccount
  CreditLedgerEntry
  CreditReservation
  CreditPurchase/Grant/Spend/Release/Refund

Adapters
  PaymentIntent / EscrowIntent -> Payment Core
  Financial events -> Finance Ledger
  Actor/tenant -> Identity Core
  AutoBid -> Durable Jobs
  AI analysis -> Agent Runtime
  audit/health -> Observability
```

---

## 14. Hedef canonical architecture

```text
Customer Actor
 -> CreateJob
 -> Marketplace Core
 -> MarketplaceJob

JobOpened
 -> provider matching
 -> provider UX / notification
 -> optional AutoBid durable capability
 -> Bid[]

Customer AcceptBid
 -> Award
 -> commercial snapshot
 -> PaymentIntent / EscrowIntent
 -> Payment Core
 -> verified provider events
 -> Finance Ledger
 -> Marketplace payment projection

Award
 -> WorkLifecycle
 -> completion | cancellation | dispute
 -> settlement/refund intent
 -> Payment + Finance
 -> Marketplace completion projection
 -> Reputation projection
```

Credit tarafı:

```text
Payment success / promo grant
 -> CreditLedger CREDIT

PlaceBid
 -> CreditReservation
 -> Bid create
 -> CreditLedger DEBIT

failed/rejected-before-commit path
 -> reservation release / explicit refund policy
```

---

## 15. Temel invariant'lar

1. `Bid accepted != Payment paid`.
2. `Award != Work completed`.
3. `Payment authorized != Settlement released`.
4. `Escrow reservation != immutable financial settlement`.
5. Marketplace provider identity, canonical User/Membership/Tenant authority'sini tekrar kurmaz.
6. Marketplace payment provider credential/resource authority'sini tekrar kurmaz.
7. Tüm money alanları explicit currency + minor unit kullanır.
8. Credit mutation'ları immutable/idempotent ledger event'leriyle izlenir.
9. Auto-bid retry duplicate bid veya duplicate credit spend üretemez.
10. AI analysis advisory'dir.
11. Client-provided rating/earnings/credit/payment state authoritative değildir.
12. ProviderSnapshot historical presentation snapshot olabilir, source-of-truth değildir.
13. Dispute finansal geçmişi mutate etmez; settlement/refund/reversal event'leri üretir.
14. Marketplace command'ları actor + ownership + current state + revision + policy ile server-side authorize edilir.

---

## 16. Core baseline ile bağlantı

### SÖKÜM 21 - Finance

- settlement,
- commission,
- payout,
- refund,
- reversal,
- earnings

immutable Finance events/projections üzerinden ilerler.

### SÖKÜM 24 - Durable Jobs

- auto-bid,
- payment side-effects,
- notifications,
- reconciliation

durable/idempotent yürütülür.

### SÖKÜM 29 - Identity / Tenant / Service Trust

Marketplace yeni paralel login/provider identity sistemi kurmaz.

### SÖKÜM 30 / 33 - Credential + IntegrationConnection

`subMerchantKey` gibi provider resource binding'leri Marketplace aggregate'ının credential authority'si değildir.

### SÖKÜM 31 - Observability

Job/Bid/Award/Payment/Dispute transitions audit ve correlation kimliği taşır.

### SÖKÜM 32 - Data Lifecycle

Job açıklaması, fotoğraf, konum, telefon/profile ve dispute evidence kişisel veri lifecycle'ına dahildir.

### SÖKÜM 35 - Entitlement

Marketplace modül erişimi product entitlement'tır; marketplace kredisi ayrı ekonomik ledger'dır.

### SÖKÜM 36 - Canonical Core

Marketplace core'u bozmaz. Üzerine bounded context olarak oturur.

---

## 17. Migration sırası

### Faz 1 - Contract normalization

1. Money type'larını minor-unit standardına geçir.
2. Job/Bid state transition contract'larını tanımla.
3. Award entity'sini ekle.
4. ProviderProfile ile identity/payment/reputation projection alanlarını ayır.

### Faz 2 - Runtime authority

5. Marketplace repository/service/command boundary kur.
6. optimistic revision / idempotency ekle.
7. customer/provider API command'larını bağla.
8. demo UI'ları gerçek query/command yüzeyine geçir.

### Faz 3 - Economy

9. Credit Ledger kur.
10. credit purchase/grant/reservation/spend/refund akışlarını bağla.
11. Payment Core ile escrow/payment intent bağlantısını kur.
12. Finance Ledger ile commission/payout/refund events bağla.

### Faz 4 - Automation and trust

13. auto-bid'i Durable Jobs'a bağla.
14. AI analysis'i Agent Runtime advisory artifact'ına çevir.
15. reputation/review projection'ını canonical events'ten üret.
16. dispute/reconciliation/audit path'ini tamamla.

---

## 18. Acceptance criteria

Marketplace migration ancak aşağıdakiler sağlandığında tamamlanmış sayılır:

- [ ] Customer gerçek Job oluşturabiliyor ve persistent ID alıyor.
- [ ] Provider yalnız yetkili/eligible job'a teklif verebiliyor.
- [ ] Aynı bid retry'sı duplicate credit tüketmiyor.
- [ ] Job ve Bid transitions server-side state machine'den geçiyor.
- [ ] Accepted Bid durable Award yaratıyor.
- [ ] Marketplace money tek minor-unit standardında.
- [ ] Credit package price unit'i ambiguity taşımıyor.
- [ ] Credit balance ledger projection'ından türetiliyor.
- [ ] Payment state Marketplace tarafından uydurulmuyor.
- [ ] Commission/payout/refund Finance events ile izleniyor.
- [ ] Auto-bid durable ve idempotent.
- [ ] AI analysis authoritative mutation yapamıyor.
- [ ] ProviderSnapshot canonical reputation/profile projection'ından üretiliyor.
- [ ] Dispute settlement hold/release/refund akışına bağlı.
- [ ] Müşteri/usta demo UI'ları gerçek runtime'a taşınırken mevcut ürün UX'i korunuyor.

---

## 19. Kapanış

SÖKÜM 38'in ana sonucu:

> **Marketplace korunacak. Fakat bugünkü `packages/marketplace` çalışan bir pazar motoru değil, çok iyi bir domain eskizi. Yeni mimaride bu eskiz gerçek Marketplace Core'a dönüştürülecek; payment, finance, identity, integration, durable execution ve observability truth'ları ise yeniden icat edilmeyip canonical core'a bağlanacak.**

Özellikle `CREDIT_PRICE_TRY = 5` ile package içindeki `price: 5000` paketleri arasındaki implicit unit farkı, mevcut contract'ın production financial authority olarak kullanılamayacağının doğrudan kanıtıdır.

Sıradaki vertical frontier, README'deki koruma listesinden isim sırasıyla seçilmeyecek. Current repo'da bağımsız state/economy ve gerçek product surface taşıyan bir sonraki package + caller birlikte doğrulanarak açılacaktır.
