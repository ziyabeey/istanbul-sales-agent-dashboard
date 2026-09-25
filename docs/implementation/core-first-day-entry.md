# Ortak kimlik — ilk giriş ve işletme akışı

25 Eylül 2026 · Yerel uygulama · Başlangıç sürümü `04c86b1`

Bu dilim KC-02'nin mevcut sunucu oturumunu tüketir. KC-02 hosted/R1 kabulü, KC-05 panel taşıması veya Randevu bağlantısı tamamlanmış sayılmaz. GitHub'a gönderim, Vercel/Cloud Run yayını ve canlı ayar değişikliği yapılmadı.

## Kullanıcının gördüğü akış

- `/giris`: e-posta/parola ve parola kurtarma isteği. Sunucunun doğruladığı mevcut oturum varsa işletme adımını gösterir.
- `/baslangic`: tek işletmede doğrudan seçili işletme; birden fazla işletmede seçim; sıfır üyelikte erişim açıklaması. Kullanıcı seçili işletmeyi değiştirebilir veya çıkış yapabilir.
- Parola kurtarma oturumu mevcut `/parola-yenile` ekranına gider; dönüşte `/giris` aynı yeni akışı gösterir.
- “Bugün” başlangıcı yalnız doğrulanmış işletmeyi ve bağlantı sınırını gösterir. Gerçek iş kartı, sıfır iş sayısı, gerçek Randevu bağlantısı veya sahte işletme adı üretmez.

İlk dilim yalnız e-posta/parola yoludur. SMS girişinin arayüz tüketimi, Google/broker, hesap açma, Firebase alias bağlama arayüzü, eski kullanıcı taşıma ve bütün dashboard'un dönüştürülmesi bu teslimde yoktur. Mevcut OTP/Google sunucu yolları değiştirilmedi.

## Kademeli açılış sınırı

Yeni akış yalnız `CORE_BFF_ENABLED=true` **ve** `CORE_ENTRY_ENABLED=true` sunucu ayarları birlikte sağlanırsa seçilir. İki ayar da bu çalışma sırasında hiçbir ortamda etkinleştirilmedi.

- Varsayılan `/giris`, aynı eski bileşeni kullanır (`LegacyGirisPage`; işlev gövdesi korunur).
- `/baslangic` ve yeni okuma ucu kapalıyken 404'tür.
- Açıkken yalnız tam giriş/başlangıç/parola-yenileme yolları ve `/api/core/auth/` ad alanı eski alt alan adı yönlendirmelerinin dışında kalır. API'lerin kendi sunucu yetki kontrolü korunur.
- Eski `/dashboard/**` erişim denetimi değiştirilmez; Core oturumu eski panel için ikinci bir kabul yolu olmaz.
- Kök sağlayıcı sınırı, yeni giriş sayfalarında eski `/api/auth/me` ve esnaf verisi okumalarını başlatmaz. Eski sayfalarda eski sağlayıcı çalışmayı sürdürür.

Bu bir üretim cutover'ı değildir. Etkinleştirmeden önce doğru KG-01 test ortamı, aynı origin üzerindeki giriş/başlangıç/kurtarma yolu ve `NEXT_PUBLIC_APP_URL` eşleşmesi doğrulanmalıdır. Parent-domain cookie veya uygulamalar arası oturum paylaşımı eklenmedi.

## İşletme adının kaynağı

Mevcut [Randevu okuma yolu](https://github.com/ziyabeey/randevu/blob/07688ae08ef5c834bcadf5dc6a23c4e42e4621dd/worker/snapshot-reads.ts) doğrulandı. `public.memberships` üzerinden `businesses!memberships_business_id_fkey(id,name,slug)` ilişkisi kullanılır; ikinci işletme otoritesi veya Firestore tahmini kurulmaz.

Yeni `GET /api/core/auth/baslangic`:

1. Var olan `requireCoreContext` üzerinden sunucu oturumunu, kullanıcıyı, aktif üyelikleri ve varsa seçili işletme snapshot'ını doğrular.
2. Görünen adları kullanıcının sunucudaki access token'ıyla, doğrulanmış `userId` filtresiyle okur. Service principal/service-role kullanılmaz; token tarayıcıya gönderilmez.
3. Ad okuması ile yetki context'inin üyelik kimlikleri, işletmeleri ve rolleri aynı değilse 503 döner; tahmin veya eski kayda dönüş yapmaz.
4. En fazla 50 üyelik gösterir; 51. satır taşma kontrolüdür. Fazla kayıt sessizce kesilmez. Eksik ad/ilişki ve bozuk yanıt, boş başarılı liste sayılmaz.
5. Tarayıcıya yalnız `recovery`, `businessId`, `memberships[{businessId,name,slug,role}]` döner. Başarı ve hata yanıtları `private, no-store` taşır.

Bu yeni yanıt bir görüntüleme sözleşmesidir, yetki primitive'i değildir. Mutasyonlar mevcut `parola-giris`, `parola-kurtar`, `isletme-sec`, `cikis` uçlarını kullanır; mevcut Origin/CSRF ve Core kontrolleri korunur. İşletme seçimi cevabından sonra sunucu bağlamı tekrar okunup seçimin doğrulandığı görülmeden başarı gösterilmez.

## İstemci davranışı ve Türkçe

- İşletme değişimi, yeniden doğrulama ve çıkış sırasında eski işletme görünümü kaldırılır.
- Sekmeye/pencereye dönüşte tekrar okuma yapılır. Sonradan dönen eski istek sonucu, daha yeni durumu ezemez. Aynı anda ikinci form/işlem gönderimi engellenir.
- Başarılı girişten sonraki işletme okuması başarısızsa parola yeniden istenmez; bağlamı tekrar kontrol etme ve çıkış seçeneği sunulur.
- Bağlantı kesilirse “İşletmelerini şu an kontrol edemedik”; başarılı boş liste için “Erişebileceğin bir işletme bulunamadı” gösterilir.
- “Çıkış yap” başarısızsa tamamlandı denmez. Parola yanıt sonrasında temizlenir; uygulama parolayı veya oturum bilgisini yerel depoya yazmaz.
- Kurtarma isteğinin cevabı hesap varlığını açıklamaz. Teknik hata kodları ve ham sunucu hata metinleri kullanıcıya taşınmaz.
- Alan etiketleri, durum/uyarı rolleri ve adımlar arasında başlığa klavye odağı uygulanır. İşletme adı çevrilmez; rol Türkçe, ayırt edici işletme kısa adı kaynaktan gösterilir.

## Yerel doğrulama

- 39 dosyada **407 birim testi** başarılı; yeni arayüz, görüntüleme sözleşmesi ve yönlendirme kontrolleri dahil.
- Mevcut gerçek BFF/route koduyla, taklit Auth/Core bağımlılıkları ve bellek içi oturum deposunda parola girişi → işletme okuma → seçim → çıkış zinciri başarılı.
- `test/tsconfig.core-entry.json` ve `test/tsconfig.kc-02-core-bff.json` odaklı tip kontrolleri başarılı.
- Değişen uygulama kodunun ESLint ve diff boşluk kontrolü başarılı. Değişmeden taşınan eski giriş bileşeninin mevcut teknik borcu yeni kodun temiz olduğu iddiasına dahil edilmez.
- Chrome: izole yerel görsel testte örnek giriş, tek/çoklu işletme, işletme değiştirme, çıkış, erişim yok ve kaynak hatası durumları doğrulandı. 390 × 844 görünümde giriş alanları ve erişim açıklaması taşmadı. Yakalanan konsol hata/uyarı kaydı yoktu; geçici ekran ölçüsü geri alındı.

Görsel testte gerçek uygulama bileşeni kullanıldı; Next navigasyonu ve sunucu yanıtları yalnız `work/core-entry-preview` altında taklit edildi. Bu yardımcı repo/ürün paketine dahil değildir. Gerçek hesap/parola kullanılmadı, SMS/e-posta veya Core/Firestore isteği gönderilmedi. Bu kanıt tam Next build, hosted giriş, gerçek mobil cihaz, performans ölçümü veya güvenlik/R1 kabulü değildir.

## Açık kalan kapılar

1. [KG-01](https://github.com/ziyabeey/istanbul-sales-agent-dashboard/issues/45): doğru Google/Firebase proje envanteri ve ortam sahipliği; Cloud Run test yayını.
2. KC-02 bağlantı/principal/test hesabı hazırlığı; giriş ve recovery ayarlarının seçilen aynı-origin ortamla uyumu.
3. Tam derleme/istemci paket sınırı kontrolü, bağımsız auth incelemesi ve hosted tarayıcı kabulü. Bu yerel değişiklikler PR #44'e eklenmiş veya onaylanmış değildir.
4. SMS giriş arayüzü ve kullanıcı taşıma kapsamı; mevcut panelin Core/projeksiyon geçişi ilgili KC-03/KC-05 kabullerine bağlıdır.
5. Randevu MVP ve gerekli sözleşmelerden sonra gerçek olay bağlantısı (K4b); kalıcı ölçüm (K5b) ayrıca kapalı kalır.

Next.js rehberi sunucu/istemci ayrımını ve dinamik giriş rotalarını, Supabase rehberi kullanıcı token'ıyla yetkili okumayı ve gizli anahtarların sunucuda kalmasını, React kontrol listesi eşzamanlı yanıtlar ile klavye/durum davranışlarını yönlendirdi. [Next.js auth rehberi](https://nextjs.org/docs/app/guides/authentication) ve [Supabase SSR rehberi](https://supabase.com/docs/guides/auth/server-side/advanced-guide) incelendi; mevcut K04 BFF sözleşmesi genel SDK örnekleriyle değiştirilmedi.
