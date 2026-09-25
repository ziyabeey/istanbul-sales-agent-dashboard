# Kepenk — Türkçe arayüz dili

25 Eylül 2026. İlk uygulama alanı: Bugün görünümü ve örnek kartlar. Tüm ürünün dil denetiminin tamamlandığı iddiası değildir.

## Ses ve anlatım

- Kullanıcıya tutarlı biçimde “sen” diye hitap edilir. Sade ve saygılı bir dil kullanılır; arayüzde “kanka” gibi sohbet hitapları kullanılmaz.
- Cümle önce ne olduğunu, gerekiyorsa sonra kullanıcının ne yapabileceğini anlatır. “Bir hata oluştu” yerine “İşlerini şu an kontrol edemedik” gibi somut ifadeler seçilir.
- İç mimari, veritabanı adları, olay kodları ve kayıt kimlikleri kullanıcı açıklamasına taşınmaz. Teknik değerler modelde ve doğrulama kayıtlarında korunur.
- Başlıklar cümle düzeninde yazılır. Türkçe karakterler korunur. Kepenk ve Randevu gibi ürün adları değiştirilmez.
- Bir terim her yerde aynı anlama gelir: randevu işlemi için “randevu”; kullanıcıya sunulan iş için “iş kartı”; düğmede belirli fiil kullanılır: “İncele”, “Kapat”, “Daha sonra”.

## Terimler

| Teknik/iç kullanım | Kullanıcıya gösterilen |
| --- | --- |
| Finance | Finans |
| Inventory | Stok |
| Property | Emlak |
| CRM | Müşteriler |
| Commerce | Satış |
| Marketing | Pazarlama |
| Action Card | İş kartı |
| Source unavailable | Bilgilerine ulaşamadık |
| Suppressed | Gösterilmeyen |
| Navigation selection | Sayfa açma seçimi |
| Outcome | İşlem sonucu |
| Demo | Örnek / önizleme |

Bu eşleme kullanıcı metni içindir; API, tablo, olay, yetki veya route adlarını yeniden adlandırmaz. Ayrı bir ürünün resmî marka adı bağlama göre korunabilir.

## Tarih, saat, sayı

- Tarih: `24 Eylül 2026`. Saat: `19:30`. Bu ilk Türkiye odaklı deneyimde saat dilimi açıkça `Europe/Istanbul`; gösterimde `(TSİ)` yazılır.
- Saat dilimi bulunmayan veya geçersiz zaman değeri için saat uydurulmaz. Ham tarih kodu kullanıcıya gösterilmez.
- Ondalık ayracı virgüldür: `1,3 sn`. Binlik ayracı noktadır: `12.450 TL`.
- “Ortanca karar süresi” ortalamaya çevrilmez. Seçim sayısı, tamamlanan işlem sayısı diye sunulmaz.
- `lang="tr"` ve yerel biçimlendirme korunur. Sunucu ve tarayıcı aynı saat dilimini kullanır; cihaz ayarına göre farklı sonuç üretilmez.

## Doğru beklenti

- Örnek veri her zaman belirtilir. Kartı kapatmak, randevuyu iptal etmek değildir.
- Önizlemede erteleme, gerçek hatırlatma kurulmuş gibi anlatılmaz.
- Bağlantı hatası “iş yok” değildir; beklenen yanıt “başarılı” değildir.
- Gerçekten yapılmayan iş için “tamamlandı”, “gönderildi”, “kaydedildi” veya “gelir sağlandı” denmez.
- Bir kart yalnız tek hizmet iptalini kanıtlıyorsa bütün randevunun iptal edildiği iddia edilmez.
- Kaynakta olmayan müşteri, zaman, tutar, iptal nedeni veya boşluk süresi metne eklenmez.

## Dil kabulü

Görünür metin, açılan açıklamalar, durum mesajları ve seçim sonuçları birlikte kontrol edilir. Birim testleri; Türkçe alan/olay adlarını, tarih-sayı biçimini, teknik kodların görünmemesini ve örnek işlem sınırını kapsar. Özel kişi/işletme adları otomatik çevrilmez.

25 Eylül yerel doğrulaması: 35 dosyada 331 birim testi, 66 testlik odaklı alt küme, Alpha tip kontrolü ve değişen dosyaların ESLint kontrolü başarılı. Son açıklama düzenlemesinden sonra ilgili 26 arayüz/dil testi tekrar geçti. Chrome'da Türkçe kartlar, açılmış açıklamalar, ölçüm metinleri, iki örnek ekran arasında geçiş ve seçim mesajları doğrulandı; konsol hata/uyarı kaydı görülmedi. Kontrol örnek verili yerel yüzeydedir; canlı giriş, gerçek veri bağlantısı veya production kabulü değildir.
