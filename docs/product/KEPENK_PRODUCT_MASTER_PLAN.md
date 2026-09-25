# Kepenk Product Master Plan

> Ürün kararı: 17 Eylül 2026  
> Kapsam: mevcut teknik planları ürün çıkışlarına ve kanıtlanabilir kabul ölçütlerine eşlemek.  
> Durum: doküman önerisi; mevcut uygulama görevlerinin kabul, sahiplik veya bağımlılık durumunu değiştirmez.  
> Güncel ilerleme: [17 Eylül durum kaydı](STATUS-2026-09-17.md).

> 25 Eylül ürün dilimi: [Kepenk Alpha — İlk Gün ve Bugün Deneyimi](KEPENK_ALPHA_FIRST_DAY.md). Bu ek, mevcut deneyim temelini kullanır ve Drive faz adlarındaki farkları eşler; aşağıdaki teknik kabul ve bağımlılıkları kaldırmaz. 17 Eylül durum kaydı tarihsel bir gözlemdir, bugünün canlı kabulü değildir.

## 1. Bu belgenin yeri

Ürün sırası: **Randevu → Web Builder → Commerce satış modülü → Restaurant**.
Kepenk Internal Alpha, hazır kabiliyetler üzerinde paralel iç kullanım hattıdır. Company AI Work bu hattın sonraki ürünleşmesidir; Work Device ve Astra Decision Rooms sonraki vizyondur.

İki ayrı plan birlikte kullanılır:

| Soru | Yetkili kaynak |
| --- | --- |
| Neyi, kime ve hangi çalışan akışla çıkaracağız? | Bu ürün master planı |
| Hangi otoriteyi nasıl taşıyacağız? | [W manifestleri ve Pilot planları](../execution/README.md) |
| User / Business / Membership ve platform ticari yetkileri nerede yaşar? | Randevu [K04 sözleşmesi](https://github.com/ziyabeey1-ai/randevu/blob/main/docs/plan/k04-platform-core-contract.md), [KC geçiş planı](https://github.com/ziyabeey1-ai/randevu/blob/main/docs/plan/kepenk-core-migration-plan.md), Kepenk [adoption eşlemesi](../execution/kepenk-core-adoption.md) |
| Randevu hangi özelliği ne zaman kabul eder? | Randevu [TASKS](https://github.com/ziyabeey1-ai/randevu/blob/main/TASKS.md), ilgili phase/handoff, [Issue #65](https://github.com/ziyabeey1-ai/randevu/issues/65) |
| Bugün ne gerçekten tamamlandı? | Tarihli durum kaydı + aynı commit'e ait PR/CI/bağımsız kabul + gerekiyorsa hosted/pilot kanıtı |

Bu belge yeni W11, ikinci Core, yeni booking/customer master veya alternatif görev kuyruğu yaratmaz. Randevu'nun F09–F17 kapsamı, SalonApp akışları ve mevcut ajan sahiplikleri korunur. P1'in K04 ile değiştirilmiş kısımları eski Firestore tenant otoritesini yeniden kurmak için uygulanmaz.

## 2. Durum dili

| Etiket | Gerekli kanıt |
| --- | --- |
| Planlandı | Kapsam, mevcut görev karşılığı ve kabul ölçütü yazılı |
| Uygulama adayı | Branch/PR ve tam head SHA var; kabul henüz açık olabilir |
| İnceleme kabulü | Belirli head ve inceleme alanı için kabul var; başka alanların yerine geçmez |
| Main'de | Birleşme kanıtı var; tek başına hosted/pilot başarısı sayılmaz |
| Teknik kabul | Görevin gerektirdiği CI ve bağımsız inceleme; hosted-only davranış varsa onun kanıtı da var |
| Kontrollü pilot kabulü | Sınırlı gerçek kullanımda hedef akış, hata/geri alma ve destek yolu doğrulanmış |
| Ticari çıkış | İlgili ürünün teknik ve pilot ölçütleri ile etkin dış sağlayıcı kapıları karşılanmış |

Görev adedi ürün tamamlanma yüzdesi olarak sunulmaz. Eski commit'in yeşil sonucu yeni semantik değişikliğe taşınmaz. “Plan kapalı” ifadesi uygulamanın bittiği anlamına gelmez. Bir inceleme sonucu yalnız belirtilen alan ve commit için kullanılır.

## 3. Ürün çıkış haritası

| Sıra / ürün | İlk kullanıcıya verilen değer | Mevcut teknik karşılık | Çıkış ölçütü |
| --- | --- | --- | --- |
| Platform hazırlığı | Uygulamalar aynı işletme, üyelik ve platform ticari yetkilerini kullanır | P0 trust temeli + KC-00…05; [P1→KC eşlemesi](../execution/kepenk-core-adoption.md) | KC-05 canary: doğru kullanıcı/işletme eşlemesi, gerçek abonelik olayı, sıfır açıklanamayan parity farkı, gecikme ölçümü, eski projection ile değişmeyen yetki, güvenli geri alma |
| 1 — Randevu | Müşteri rezervasyonu, işletme yönetimi ve SalonApp aynı kayıtlarla çalışır | Mevcut F09–F17 / G09–G17 | Randevu'nun kendi F17-03/04/05 yayın, kabul ve kontrollü pilot ölçütleri |
| 2 — Web Builder | Esnaf sitesini oluşturur, yayınlar, düzenler ve önceki yayına döner | W4 + W3/W5 bağlantıları; P3-00…P3-09 | Desteksiz edit/save/republish/history/rollback; hostname ve asset tutarlılığı; etkin Booking/Contact aksiyonlarının gerçek sonucu; P3 canary kabulü |
| 3 — Commerce satış modülü | Web Builder sitesine gerçek satış eklenir | W6/W7 + P4-00…P4-10; Pilot-2 Payment/Finance tüketilir | Sunucu fiyatı, gerçek order, stok reserve/commit/release, doğrulanmış ödeme/iade, tek finansal etki ve çalışan sipariş sonucu |
| 4 — Restaurant | Masa, adisyon, mutfak ve servis vardiyası aynı operasyonu yürütür | W9 + REST-00…REST-07; tükettiği W6/W7 ve Pilot bağımlılıkları | Gerçek vardiyada sipariş→KDS→servis→tahsilat zinciri; gerekiyorsa split ödeme ve offline replay; mutabakat ve canary kabulü |
| Paralel — Internal Alpha | Kendi şirketimizde hazır kabiliyetlerle iş takibi ve öneri | W8 + W3/W10; P4-07/08/09/10'daki ilgili safe-loop kabulü | Sınırlı görev, belirlenmiş yetki, kaydedilmiş run, doğrulanmış outcome; başarısız/belirsiz sonuç açık gösterilir |
| Sonraki — Company AI Work | Şirket olayını görür, işi insana/ajana yönlendirir ve sonucu takip eder | W8 Agent/Knowledge + kabul edilmiş domain capability'leri + W10 policy/approval | Event→policy→routing→capability→verified outcome zinciri; izin iptali, tekrar ve kesinti kanıtı |
| Sonraki vizyon — Work Device | Aynı platforma güvenli cihaz istemcisi | Identity/session + W8/W10; launcher/MDM/work-profile ürün keşfi | İhtiyaç ve cihaz pilotu tanımlanınca ayrı teslim kapsamı; bugün implementation claim'i yok |
| Park — Astra Decision Rooms | Ortak değerlendirme ve onay deneyimi | Mevcut AgentRun/Approval/Policy/Notification kavramları | Bugünkü çıkışları engellemez; doğrulanmış kullanım ihtiyacından sonra UX ve kabul tanımı |

**Core sınırı:** KC-01 şema/RPC teslimidir; KC-05 ilk birleşik uygulama kapısıdır. İkisi de W3–W10'un tamamının, ortak Payment/Finance/Inventory/Messaging/Agent kabiliyetlerinin veya her ürünün hazır olduğu iddiası değildir.

Randevu kendi kabul hattında bağımsız ilerler. Web Builder'ın ticari çıkışından önce ortak Core canary kabulü gerekir; bu, Web Builder'ın kendi Pilot-3 önkoşullarını ikame etmez. Tüm W10 retirement kapsamı başlangıç kapısına taşınmaz; etkin akışın gerektirdiği güvenlik, audit ve veri yaşam döngüsü parçaları kendi kabulünde kanıtlanır.

## 4. Randevu hattına dokunmadan eşleme

| Ürün sonucu | Kanonik Randevu görevleri |
| --- | --- |
| Ortak yönetim, ekip, katalog ve müşteri | F10-01…F10-06 |
| Çoklu hizmet ve grup bütünlüğü | F11-01…F11-04 |
| Müşteri rezervasyon deneyimi | F12-01…F12-05 |
| İşletme takvimi ve operasyon | F13-01…F13-04 |
| SalonApp, adisyon, manuel tahsilat | F14-01…F14-05 |
| Ürün, stok, masraf, kasa | F15-01…F15-04 |
| Referans özellikleri | F16-01…F16-08 |
| Yayın ve pilot | F17-01…F17-05 |

Bu tablo paralel görevleri tek bir zorunlu seri haline getirmez; exact dependency graph TASKS'ta kalır. F14 salon kasası ile KC-04 SaaS abonelik tahsilatı ayrı para akışlarıdır. Platformun Payment/Finance entegrasyonu, Randevu MVP'sine kendiliğinden çevrimiçi ödeme veya e-fatura eklemez.

## 5. Web Builder'ın mevcut teknik kapısı

[Pilot-3](../execution/pilot-3-public-site-messaging-pr-plan.md) şu bağımlılıkları korur:

| Mevcut paket | Kapsam | Bağımlılık / sonuç |
| --- | --- | --- |
| P3-00 | Korunan frontend/runtime baseline | Pilot-0, Pilot-1, Pilot-2 kabulü; Pilot-1'in iptal/değişen işleri adoption/KC üzerinden yorumlanır |
| P3-01 / P3-02 | Draft save / owned asset | P3-00; taslak kaydı canlı yayını değiştirmez |
| P3-03 / P3-04 | Immutable publish, rollback, domain/runtime | P3-01/02 sonrası; eski yayına aynı içerik/asset ile dönüş |
| P3-05 / P3-06 | Public actions, Booking/Inquiry bridge | P3-04, capability ve Pilot-2 Customer/Booking sözleşmeleri |
| P3-07 / P3-08 | Messaging / provider bridge | Pilot-0/1 + W5; plandaki izin verilen paralellik korunur |
| P3-09 | Bir canary site/hostname ile uçtan uca kabul | P3-00…08 kabulü |

İlk P3 canary'si Booking + Contact içerir. Commerce Order/Checkout Pilot-4/W7'ye bırakılmıştır. W6'da ödeme gerektirmeyen ve sonra ödemeli booking politikalarının bulunması, Pilot-2'nin para içeren entegrasyon kabulünü kaldırmaz.

**Açık ürün/entegrasyon kararı:** İlk yayınlanan Booking aksiyonu hangi mevcut ödeme politikasını ve hangi Randevu domain çağrısını tüketir? Ziya ürün kapsamını, DANIŞMA 3 ilgili domain sahipleriyle teknik eşlemeyi netleştirir. Mevcut Randevu MVP sınırı korunur; ödeme isteyen bir genişleme ayrı kapsam kararı gerektirir.

Yalnız tanıtım sitesiyle daha dar çıkış istenirse mevcut Pilot-3 kapsamı ve bağımlılıkları ayrı, incelenebilir doküman değişikliğiyle daraltılır. Bu master plan böyle bir istisna vermez; varsayılan mevcut Pilot-3 kabulüdür.

[Pilot-2](../execution/pilot-2-customer-booking-payment-finance-pr-plan.md) ve W6'daki tarihsel Customer/Booking “build” maddeleri, salon vertical için ikinci master kurma yetkisi değildir. K04/adoption gereği kabul edilmiş Randevu domainine adapter/command bağlantısı kurulmalıdır. Exact P2 görev eşlemesi implementation öncesi ilgili kanonik planda netleştirilir; bu belge P2 kabulü vermemektedir.

## 6. Ticari paketleme ve ileriki hatlar

- **Commerce:** müşteri teklifinde Web Builder satış modülü; teknik Commerce/Inventory kabiliyeti birinci sınıf kalır. İki API ailesi tek sipariş/fiyat otoritesine bağlanmadan gerçek satış açılmaz.
- **Restaurant:** ayrı uygulama/deployment adaydır; ortak Identity, Customer, Inventory, Messaging, Payment ve Finance'ı kopyalamaz. Ayrı hostname mevcut deployment kanıtı değildir.
- **Internal Alpha:** Restaurant'ın tamamlanmasını bekleyen zorunlu seri iş değildir. Yalnız kabul edilmiş veri/komut sınırları üzerinde paralel ilerler; P4/W8 bağımlılıklarını atlamaz, gelir ürünlerinin kritik sahiplerini yeniden atamaz.
- **Company AI:** Read → Suggest → Draft → Approval → Execute yetki kademeleri ürün ilkesi olarak kullanılır. Prompt izin değildir; karar anındaki kullanıcı/üyelik, entitlement, capability ve policy sınırları uygulanır.
- **Support:** mevcut SUP hattı ve ihtiyaç duyulan erken destek yolu korunur. Gelişmiş SLA/AI sonraki kapsamdır.
- **Marketplace / Procurement / B2B Supplier Marketplace:** mevcut MKTPL/PROC bağımlılıklarıyla sonraki ürünlerdir; bugün satışa hazır sayılmaz.
- **Voice:** giriş/çıkış adapter'ı. **SEO / Blog / Studio:** Site/Marketing extension'ı. **Influencer:** Marketing/Marketplace extension'ı. Yeni ortak domain otoritesi açılmaz.

## 7. Pilot ve operasyon kanıtları

Yeni genel güvenlik töreni veya zorunlu çift reviewer kuralı kurulmaz. Mevcut risk bütçesi uygulanır: LIGHT varsayılan; FOCUSED gerçek akış/entegrasyon riski için; STRICT kimlik, yetki, schema, para, idempotency ve concurrency için. Hosted test yalnız hosted-only davranış veya ilgili cutover sözleşmesi gerektiriyorsa yapılır.

| Kanıt | Hangi noktada gerekir? | Mevcut karşılık |
| --- | --- | --- |
| Kimlik/yetki, audit ve doğru hata sonucu | Etkin akışın teknik kabulünde | P0, KC, ilgili Randevu/ürün kabulü |
| Error capture, kritik job uyarıları, destek yolu | İlgili kontrollü pilotta | Ürün runbook/canary; Randevu F17-03 |
| Yedek ve geri yükleme / yazılım geri alma | İlgili veri ve dağıtım cutover'ında | KC-05 ve Pilot cutover'ları; Randevu F17-03 |
| Mobil/klavye ve loading/empty/error/success | Kullanıcıya açılan temel akışta | Mevcut browser acceptance ve Randevu F12-01 |
| Yük/kapasite, product analytics, geniş SLA/status | Kullanım genişletilirken; kritik sınırlar ilk pilotta | Mevcut performans/canary ve W7/W10 işleri |
| Abonelik yaşam döngüsü ve veri export/erasure | İlgili ücretli/veri akışı açıldığı kapsamda | KC ticari kapsamı ve W10; bütününü süresiz sonraya atma yok |

FeatureFlag, Entitlement ve OperationalPolicy/KillSwitch ayrı kalır. Rollback eski güvensiz yetki yolunu açmaz; doğrulanmış ödeme/ledger olaylarını silmez.

## 8. Dış sağlayıcı kapıları

Bu satırlar sözleşme, hesap, satın alma veya entegrasyonun tamamlandığı iddiası değildir. Ürün sahibi/iş geliştirme mevcut sağlayıcılarla hazırlığı koddan bağımsız takip eder; dış kişilere iletişim bu belgeyle başlatılmaz.

| Kapı | Etkilenen ürün/akış | Çıkışta aranacak somut kanıt |
| --- | --- | --- |
| SMS / WhatsApp kapasitesi ve gönderici kurulumu | Etkin OTP, hatırlatma, Messaging | Onaylı hesap/gönderici, gerçek gönderim/teslim, limit ve hata yolu |
| Ödeme sağlayıcısı; ikinci sağlayıcı ihtiyacı | Etkin platform billing / Commerce / Restaurant | Yetkili hesap, doğrulanmış olay, idempotency, iade/mutabakat; ikinci sağlayıcı yalnız vaat edildiğinde |
| e-Arşiv/e-Fatura, mali fiş/ÖKC kapsamı | Faturalama/fiş vaat edilen satış ve Restaurant | Ürünün gerçek kapsamına uygun sağlayıcı/süreç ve uçtan uca kanıt; güncel gereklilik ayrıca doğrulanır |
| Yemek kartları ve food platformları | İlgili Restaurant teklifleri | Sağlayıcı erişimi, test hesabı ve doğrulanmış sipariş/ödeme/iptal akışı |
| Kurye, kargo ve taşıma anlaşmaları | Teslimat vaat eden Restaurant / Commerce | Yetkili operasyon hesabı, sipariş/etiket/durum/hata akışı |

Kullanılmayan dış entegrasyon tüm ürünleri bloke etmez. Etkin olarak vaat edilen entegrasyonun kanıtı ilgili ticari çıkışa bağlanır.

## 9. Çalışma ve güncelleme disiplini

1. Mevcut owner aynı görevi sürdürür; açık PR varken aynı kapsam yeniden sahiplenilmez.
2. Her durum güncellemesi repo, branch/head, merge, CI ve gereken kabul bağlantılarını taşır.
3. Birleşme, review, hosted kabul ve pilot sonucu ayrı kaydedilir.
4. Başlık ile canlı kanıt çatışıyorsa tarihli durum kaydında iki durum açık yazılır; değişmeyen eski plan başlığı yeni kabul yerine kullanılmaz.
5. Ürün sırası değişikliği teknik bağımlılığı kendiliğinden kaldırmaz. Gerekli contract değişikliği ilgili kanonik dosyada incelenir.
6. Sonraki somut işler [durum kaydında](STATUS-2026-09-17.md); yeni görevi başlatma/merge kararı mevcut koordinasyon protokolünde kalır.

Bu teslimin doğrulaması belge bağlantıları, kapsam/dependency tutarlılığı, mevcut kanıtlarla durum eşlemesi ve bağımsız doküman incelemesidir. Runtime, migration, deploy veya yeni ürün kabulü değildir.
