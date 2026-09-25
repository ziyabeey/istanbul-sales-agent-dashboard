# K0 — Kepenk Experience / Action Card Foundation

## Amaç

Kepenk'in yeni ana etkileşim tezini mevcut monorepo üzerinde, domain authority'lerine dokunmadan kanıtlamak:

> **Bırak iş sana gelsin.**

K0 bir redesign değildir. Mevcut dashboard, modüller ve SÖKÜM/W/KC authority kararları korunur. Bu slice yalnız ortak presentation contract'ını ve düşük yoğunluklu aksiyon yüzeyini kurar.

## Mevcut UI envanteri

Korunan kaynaklar:

- `apps/web/src/app/dashboard/manage/kepenk-tokens.css`: ana renk, surface, typography, shell, card ve navigation tokenları.
- `apps/web/src/app/dashboard/manage/layout.tsx`: mevcut Manage shell.
- `apps/web/src/app/dashboard/manage/components/**`: navbar/sidebar varlıkları.
- `packages/ui`: gelecekte ortaklaştırılacak UI paketi; K0 sırasında zorla taşınmaz.
- CRM automation/inbox schema: event kelime dağarcığı için referans, UI authority değildir.

K0 yeni bir paralel design system yaratmaz. Var olan `--kpnk-*` token ailesini genişletir.

## Yeni semantic tokenlar

K0 şu semantic katmanı ekler:

- `surface-raised`, `surface-soft`
- `attention-neutral`
- `attention-info`
- `attention-warning`
- `attention-critical`
- `attention-success`
- `focus`
- Action Card radius/shadow

Attention rengi tek başına anlam taşımaz; başlık, event adı ve metinle birlikte kullanılır.

## Canonical Action Card presentation contract

Bir kart minimum olarak şunları taşır:

- `id`
- `domain`
- `sourceEvent`
- `title`
- `context`
- `attention`
- `state`
- primary action
- opsiyonel secondary action
- opsiyonel reason/evidence açıklaması
- opsiyonel deadline
- dismiss / snooze lifecycle hook'ları
- outcome hook

Bu contract **UI contract'ıdır**. Slot, fiyat, payment, tenant, permission veya stok gerçekliğinin authority'si değildir.

## State matrix

| State | Anlam | UI davranışı |
| --- | --- | --- |
| new | yeni geldi | normal görünürlük |
| seen | kullanıcı gördü | aynı kart, daha düşük attention mümkün |
| snoozed | daha sonraya ertelendi | feed'den geçici çıkar |
| acted | aksiyon seçildi | outcome bekler / sonuç state'i gösterir |
| dismissed | kullanıcı kapattı | feed'den çıkar |

K1/K2'de batching, cooldown, duplicate suppression ve escalation eklenecektir.

## İlk demo yüzeyi

Route:

`/dashboard/manage/experience-lab`

Üç domain-agnostic örnek:

1. `appointment.cancelled`
2. `payment.attention_required`
3. `inventory.low_forecast`

Hepsi demo-state'tir. Gerçek command veya mutation çağrısı yapmaz.

## Accessibility / responsive

- Kart article semantiği kullanır.
- Başlık `aria-labelledby` ile karta bağlanır.
- Outcome mesajı `aria-live=polite` ile duyurulur.
- Tüm aksiyonlar keyboard-accessible native button'dır.
- `:focus-visible` açıkça tanımlıdır.
- Mobilde action row sarılır ve butonlar genişler.
- `prefers-reduced-motion` altında hover/transition hareketi kapatılır.

## K0 sınırı

K0 sırasında:

- sidebar sadeleştirilmez,
- ana dashboard sökülmez,
- Jev runtime eklenmez,
- Decision Engine eklenmez,
- gerçek event adapter yazılmaz,
- Randevu repo contract'ı değiştirilmez.

K0 başarı ölçütü yeni modelin mevcut ürüne zarar vermeden tekrar kullanılabilir component olarak render edilmesidir.
