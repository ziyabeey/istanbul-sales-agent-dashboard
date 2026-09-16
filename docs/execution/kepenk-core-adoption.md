# Kepenk Core adoption — cross-repo authority sync

> **Koordinasyon:** DANIŞMA 3  
> **Tarih:** 2026-09-16  
> **Kepenk base:** `main@2745f56a2c2f4860f04eb008b25cbf82358a9785`  
> **Authoritative sözleşme:** `ziyabeey1-ai/randevu/docs/plan/k04-platform-core-contract.md`  
> **Authoritative geçiş planı:** `ziyabeey1-ai/randevu/docs/plan/kepenk-core-migration-plan.md`

Bu belge K04'ün ikinci kopyası değildir. Canonical sözleşme ve Core migration planı Randevu reposunda tek kopya yaşar; bu repo o sözleşmeyi tüketir ve kendi P0/P1 hattını KC track'ine göre yorumlar.

## 1. Dondurulan authority topolojisi

- User / Business / Membership authority: Randevu Supabase/Postgres (`public.profiles`, `public.businesses`, `public.memberships`).
- Platform Subscription / Entitlement / alias authority: aynı Postgres veritabanındaki `core` şeması.
- Booking, müşteri CRM, personel, takvim, adisyon ve stok: Randevu domaini, aynı canonical `business_id`.
- Firestore: projection / cache / legacy compatibility; yetki kaynağı değildir.
- Firebase Auth: yalnız geçici identity adapter, DB authority değildir.
- ServicePrincipal / AdminPrincipal: platform operasyon kimlikleridir; active Membership yerine geçmez.

## 2. Kepenk tarafında hemen geçerli sınırlar

1. Yeni bir Firestore `BusinessTenant` canonical authority açılmaz.
2. `esnafId` ikinci tenant kimliği değildir; ileride `core.tenant_aliases` ile canonical `business_id`'ye bağlanır.
3. Firebase UID ikinci user authority değildir; ileride `core.identity_aliases` ile Supabase user'a bağlanır.
4. Browser token taşımaz; `app.kepenk.ai` kendi host-only HttpOnly BFF oturumunu kullanır.
5. ServicePrincipal Core tablolarına doğrudan yazmaz; yalnız dar, secret-gated, idempotent RPC çağırır.
6. Kepenk salon vertical için ikinci booking/payment/customer master kurmaz.
7. SaaS billing ile Randevu F14 salon kasa/adisyon akışı ayrı para akışlarıdır.

## 3. P0/P1 → KC eşlemesi

| Mevcut Kepenk işi | KC karşılığı | Karar |
| --- | --- | --- |
| P0-00…P0-04 | KC-02 girdisi | Yapılan trust/session/service/durable-job işi korunur; BFF sözleşmesine hizalanır |
| P0-05 Credential Envelope | KC-01/KC-04 girdisi | **Devam eder ve tamamlanır**; Core principal/JWT materyali için önkoşuldur |
| P0-06 AdminPrincipal | KC-07 | Korunur; çalışır uygulama kritik yolunun dışında |
| P0-07 audit/impersonation | KC-07 | Audit korunur; booking impersonation yok; ihtiyaçsız impersonation ertelenir |
| P0-08 hard-cuts | KC güvenlik değişmezleri | İlgili hard-cut'lar korunur; authority değişikliğini tersine çeviremez |
| P1-00 inventory | KC-00 / KC-03 | Kepenk envanteri sayılarla tamamlanır |
| P1-01 Firestore BusinessTenant | **İPTAL** | İkinci tenant authority kurulmaz |
| P1-02 commercial/entitlement | KC-01 / KC-04 | Core Postgres'te uygulanır |
| P1-03 backfill/shadow | KC-03 | `esnafId` → `business_id` alias + parity |
| P1-04 onboarding | KC-05 | Canonical Core'a yazar |
| P1-05 profile/projection | KC-05 | Core → Firestore tek yönlü projection |
| P1-06 admin commands | KC-05 / KC-07 | Raw Firestore patch yerine command/RPC |
| P1-07 pricing/modules | KC-01 / KC-05 | Core commercial projection tüketilir |
| P1-08 canary cutover | KC-05 | Firestore authoritative root write canary'de kapanır |

## 4. Yeni kritik yol

```text
KC-00 sözleşme + Kepenk envanteri
  ↓
KC-01 Core schema/RPC              [randevu repo]
  ↓
KC-02 Kepenk BFF + identity adapter [bu repo]
  ├─ KC-03 backfill + aliases
  └─ KC-04 İyzico → Core command
  ↓
KC-05 Core → Firestore projection + canary
```

`KC-05` ilk birleşik "çalışır uygulama" kapısıdır. `auth.kepenk.ai` broker ve geniş platform-admin yüzeyi bundan sonra açılır.

## 5. P0-05 için mevcut durum

`p0/05-credential-envelope` işi geçerliliğini korur. Credential Envelope, confidential `NEXT_PUBLIC_*` hard-cut ve resolved credential seam'leri KC mimarisinin girdisidir. P0-05 tamamlanırken canonical tenant/identity sahibi olarak Firestore'a yeni yetki verilmez.

## 6. KC-00 Kepenk envanter teslimi

KC-02/KC-03 implementation açılmadan bu repo için aşağıdakiler sayılarla raporlanır:

- gerçek production kullanıcı sayısı,
- login yöntemi dağılımı (password / OTP / diğer),
- `esnaflar/{id}` kayıt sayısı ve authority alanları,
- slug/domain alanları ve çakışmalar,
- identity/tenant okuyan Firestore collections + Security Rules,
- `/api/randevu` tüketicileri,
- `packages/booking-schema` gerçek kullanım yüzeyleri,
- mevcut kredi/metered sayaçları,
- P0-05 credential resolver/secret taşıma yüzeyi.

Bu envanter olmadan KC-02 veya KC-03 kartı implementation-ready sayılmaz.

## 7. Karar değişikliği

K04 ile çelişen bir durum bulunursa implementation sessizce farklı authority kurmaz. Kanıt + en dar alternatif DANIŞMA 3 koordinasyonuna taşınır. Özellikle Firestore canonical tenant, Firebase JWT'ye DB güveni, parent-domain cookie ve service-role bypass varsayılan çözüm değildir.
