# Kepenk Alpha — İlk Gün ve Bugün Deneyimi

> Ürün tanımı: 25 Eylül 2026. Kullanıcının kabul ettiği ilk Alpha kapsamı.
> Bu teslim: ürün sözleşmesi + mevcut laboratuvarda durum önizlemesi.
> Canlı bağlantı, onboarding, pilot veya production kabulü değildir.

> Türkçe metin ilkeleri ve güncel sözcük seçimi: [Türkçe arayüz dili](TURKCE_ARAYUZ_DILI.md). Aşağıdaki davranış sözleşmesi korunur; ekrandaki ifadeler bu rehbere göre sadeleştirilir.

## 1. Kullanıcı, ihtiyaç ve vaat

İlk kullanıcı Randevu kullanan işletme sahibidir. İhtiyacı; gün içinde hangi işe neden bakması gerektiğini, doğru işletme bağlamında ve gereksiz gezinmeden anlamaktır.

**Vaat: “Bugün ilgilenmen gereken işi, nedenini ve yapabileceğin adımı sana getir.”**

Kepenk ortak deneyim ve ürün ailesidir; Randevu rezervasyon/operasyon ürünüdür. Randevu MVP bağımsız tamamlanır. Ortak sırlar veya aynı marka, otomatik kimlik/veri entegrasyonu sayılmaz. Entegrasyon kabul edilmiş Core ve Randevu sözleşmeleriyle MVP sonrasında açılır.

Başarı, ekran veya AI çağrısı sayısı değil kullanıcının işini anlayıp doğru sonuca ulaşmasıdır. Gelir artışı veya zaman tasarrufu bu sürümde kanıtlanmış değildir.

## 2. İlk günün hedef yolculuğu

1. Kullanıcı güvenli giriş yapar. Bu akış KC-02 kabulünü tüketir; ikinci giriş/kimlik sistemi kurulmaz.
2. Yetkili olduğu işletmeyi seçer. Tek işletme varsa gereksiz seçim adımı eklenmez. İşletme bağlamı her zaman görünürdür.
3. Randevu bağlantısının durumunu görür. Bağlantı kurulmamışsa kurulu gibi görünmez; kurulacak gerçek süreç henüz bu teslimde yoktur.
4. “Bugün” ekranında ilgilenmesi gereken işleri veya kaynağa ilişkin açık durumu görür.
5. Karttan kanıtı anlar, izin verilen adımı seçer ve adımın gerçek sonucunu görür.

Bu yolculuk hedef sözleşmedir. Şimdiki `/dashboard/manage/experience-home` bir laboratuvardır: işletme seçimi/giriş/bağlantı sürecini uygulamaz, örnek veri ve durumlar gösterir. Ana dashboard yönlendirmesi ve mevcut navigasyon değiştirilmez.

## 3. İlk senaryo: iptal edilen randevu

| Adım | Ürün davranışı / sınır |
| --- | --- |
| Olay | Kabul edilmiş Randevu kaynağından iptal olayı okunur; Kepenk ikinci rezervasyon kaydı yaratmaz. |
| Kart | Olay, kaynak ve varsa doğrulanmış hizmet/zaman bağlamı gösterilir. Eksik müşteri, boş slot, gelir veya bekleme listesi uydurulmaz. |
| Kullanıcının kararı | Mevcut K4a yalnız ertele/kapat sunar. İlgili kaydı açma, gerçek ve kabul edilmiş hedef bağlantı hazır olduğunda eklenir. |
| Sonuç | “Kartı kapattı”, “kaydı açtı” ve “işlem tamamlandı” farklı sonuçlardır. Tıklama, rezervasyon veya kazanç sayılmaz. |
| Sonraki kapsam | Boşluğu doldurma, mesaj gönderme veya yeni rezervasyon ayrı domain yeteneği ve insan onayı gerektirir; bu Alpha tesliminde yoktur. |

İlk canlı kabul: doğru işletmenin gerçek iptal olayı bir kez ve doğru bağlamda görünür; yetkili kullanıcı kabul edilmiş ilgili kayda ulaşır; eski/tekrarlı olay yanlış iş üretmez; kaynak/erişim kaybında eski kartlar işlem yaptırmaz. Bu matris K4b'nin gerçek transport kabulüyle birlikte doğrulanır.

## 4. “Bugün” durum sözleşmesi

| Durum | Kullanıcıya söylenen | Kart / sayı |
| --- | --- | --- |
| Bağlantı kurulmadı | “Randevu henüz bağlı değil.” | Gösterilmez; sıfır iş denmez. |
| Yükleniyor | “İşlerin kontrol ediliyor.” | Henüz sonuç iddiası yok. |
| Başarılı okuma, işler var | İş ve kanıt görünür. | Mevcut K2 öncelik kuralları uygulanır. |
| Başarılı okuma, şimdi iş yok | “Şu an ilgilenmen gereken bir iş yok.” | Yalnız başarıyla okunan kaynak kapsamı; ertelenen işler ayrıca görünür. |
| Kaynak erişilemiyor | “İşlerini şu an kontrol edemedik.” | Eski kartlar/sayılar ve başarı işareti gösterilmez. |
| Yetki yok | “Bu işletmenin işlerini görme yetkin yok.” | İşletme ve erişim kontrolü önerilir; kartlar gizlenir. |
| Güncellik doğrulanamıyor | “Bilgilerin güncel olduğundan emin değiliz.” | Yeniden doğrulanana kadar kart/işlem gösterilmez. |

İstemcideki durum seçici yalnız laboratuvar simülasyonudur; gerçek erişim yetkisi vermez, kaynak sağlığını ölçmez. Canlı durum sunucudaki kabul edilmiş kimlik/transport sonucundan türetilmelidir. Güncellik eşiği ve yeniden deneme davranışı K4b kapsamında kaynak sözleşmesiyle belirlenir; burada keyfî süre seçilmez.

## 5. Şimdi ve sonraki teslim sınırı

| Dilim | Şimdi / kapı | Mevcut karşılık |
| --- | --- | --- |
| Ürün tanımı ve yedi durumun önizlemesi | Bu yerel teslim; canlı kabul değil | K0/K1/K2 korunur; mevcut laboratuvar genişletilir. |
| Gerçek ilk gün / işletme seçimi | KC-02 hosted kabulü, ilgili onboarding/Core kabulü ve bağlantı akışı sonrası | KC tüketilir; ikinci üyelik/tenant otoritesi yok. |
| Gerçek iptal olayı ve ilgili kayda erişim | Randevu MVP + gerekli Core/transport kabulü + gerçek hedef bağlantı sonrası | K4a yeniden yapılmaz; K4b açılır. |
| Kalıcı pilot ölçümü | K4b + tenant kapsamı + şema sahibi + saklama/gizlilik kararı sonrası | K5a korunur, K5b açılır. |

Bu tablo yeni bir paralel görev kuyruğu veya mevcut PR'ların sahipliğini değiştiren iş devri değildir. KC-02 adayı [PR #44](https://github.com/ziyabeey/istanbul-sales-agent-dashboard/pull/44) bu ürün tanımıyla kabul edilmiş/merge olmuş sayılmaz.

Bu teslimde kapsam dışı: canlı Randevu okuma/yazma, dış mesaj, ödeme, stok değişimi, otomatik rezervasyon, JEV runtime, otonomi, yeni dikey, üretim deploy'u ve yeni telemetry sağlayıcısı. Finance/Inventory/Property kartları laboratuvar örneği olarak kalır; ilk Randevu pilotunun satış vaadine dönüşmez.

## 6. Pilot soruları ve kabul

İlk nitel pilot bir işletme sahibiyle, gerçek bağlantı kapıları geçildikten sonra yapılır. Pilot sayısı ve süresi bir istatistiksel etki iddiası değildir.

- Kullanıcı yardım almadan seçili işletmeyi, verinin gerçek/örnek olduğunu ve kaynağın durumunu ayırt edebiliyor mu?
- Kartın neden geldiğini ve yapılabilecek adımı açıklayabiliyor mu?
- İlgili kayda ulaşabiliyor mu; erişim/hata durumunda yanlış başarı mesajı görüyor mu?
- Kaynak kesildiğinde bunu “iş yok” sanıyor mu?
- Erteleme/kapatma tercihi doğru yansıyor mu; gereksiz tekrar veya alakasız kart var mı?

K5a'nın gösterim/karar/tıklama/erteleme/kapatma ölçüleri yalnız etkileşimdir. Gerçek işlem sonucu ayrı olayla doğrulanır. Zaman tasarrufu için aynı görevin mevcut akışıyla karşılaştırma; gelir için açık sonuç ilişkilendirmesi gerekir. Kişisel veri içeren serbest metin pilot telemetrisine kendiliğinden eklenmez.

## 7. Mevcut planların eşlemesi — numaralara göre yeni iş açma

Kaynaklar:

- [Drive Master Ürün Haritası, 24 Eylül sürümü](https://docs.google.com/document/d/1NqQMMPJ84R93sMoxZogbQWH8kTLPd_XpsjGpQEaSz1k/edit)
- [Drive Randevu Ürün Raporu, 24 Eylül sürümü](https://docs.google.com/document/d/1Ti_0oq-WfjrY53WJxdrSfiVIO4uhdkscg4VzJFAyjhs/edit)
- [Repo ürün master planı, 17 Eylül](KEPENK_PRODUCT_MASTER_PLAN.md)
- [K4 sınırı](../experience/k4-randevu-event-adapter.md), [K5 ölçüm sınırı](../experience/k5-pilot-metrics.md), [Core adoption](../execution/kepenk-core-adoption.md)

| Kabiliyet | Drive master etiketi | Randevu raporu etiketi | Bu Alpha'nın ilişkisi |
| --- | --- | --- | --- |
| Kanıt/olay omurgası | F18 JEV Kernel & Event Spine | F18 Evidence Spine | Randevu olayını tüketir; ikinci event authority kurmaz. |
| Ucuz değerlendirme runtime'ı | F19 JEV Fabric | F19 JEV Runtime | Şimdilik kapsam dışı. |
| Kalite / karar | F20 Quality Laboratory | F20 Decision Engine | Aynı kapsam değiller; tek faz gibi uygulanmaz. |
| Canlı etkileşim / üst model | F21 Live Session Intelligence | F21 Upper Mind | Aynı kapsam değiller; şimdilik ikisi de dışarıda. |
| Kart ve sonuç | F22 Action Cards & Outcome Engine | F22 Outcome Loop | K0–K5 mevcut teslimleri yeniden kurulmaz; canlı sonuç kabulü ayrıca gerekir. |
| Evrim / otonomi | F23 JEV Evolution, F24 Controlled Autonomy | F23 Autonomous Kepenk | Tek faz gibi uygulanmaz; insan onayı kaldırılmaz. |
| Dış ajan rezervasyonu | F25 Booking Gateway, F26 Agent Interop | Uzun vadeli AI Booking Channel | MVP sonrasıdır; bu Alpha'da açılmaz. |

Çalışma kuralı: belirsiz F numarasıyla yeni implementation başlatılmaz; kabiliyet adı ve ilgili kanonik Randevu görev/kabul kaydı kullanılır. Bu eşleme çelişkiyi görünür kılar, Randevu görevlerini yeniden numaralandırmaz veya Drive belgelerini sessizce değiştirmez.

Repo master planındaki ürün sırası ile Drive'ın genişleyen strateji dalgaları bu teslimde yeniden sıralanmaz. Ortak kesin öncelik korunur: Randevu MVP kendi başına değer üretir; Kepenk Alpha onun teslimini bloke etmez.

## 8. Bu yerel teslimin doğrulaması

- Başlangıç: `30a72d098ac61460d72078817b1eb24f2c6975c0`; ayrı yerel dal: `codex/kepenk-alpha-first-day`.
- `pnpm --filter @kepenk/web exec vitest run test/unit/`: 34 dosyada 313 test başarılı; yeni durum ve React etkileşim testleri dahil.
- Alpha/durum/adapter/protokol/ölçüm odaklı alt küme: 6 dosyada 48 test başarılı.
- `pnpm --filter @kepenk/web exec tsc --noEmit -p test/tsconfig.alpha-experience.json`: başarılı. Mevcut iki test yardımcısındaki toplam üç yinelenen alan ataması, aynı sonucu koruyarak temizlendi.
- Değişen TypeScript/React ve test dosyalarının ESLint kontrolü: başarılı; sayfa içi laboratuvar bağlantısı Next Link kullanır.
- Chrome: aynı sayfa bileşeni ve CSS, yalnız örnek verili izole yerel test yüzeyinde render edildi. Örnek kartlar, bağlantı yok, kaynak hatası ve başarılı boş durumları görüldü; konsol hata/uyarı kaydı yoktu. Next navigasyonu bu görsel testte taklit edildi, gerçek giriş veya protected dashboard akışı test edilmedi.
- Tam uygulama build'i, mobil breakpoint ve hosted/pilot kabulü bu teslimin yeni kanıtı değildir. Yeni CI/deploy sonucu yoktur; K4b/K5b ve canlı ilk gün yolculuğu açık kalır.
