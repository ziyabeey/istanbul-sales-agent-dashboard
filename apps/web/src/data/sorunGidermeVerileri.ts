// ---------------------------------------------------------------------------
// destek.kepenk.ai — Sorun Giderme Verileri
// 6 kategori, 24 sorun, adim adim cozum rehberi
// ---------------------------------------------------------------------------

export interface SorunCozum {
  id: string
  baslik: string
  belirtiler: string[]
  cozumAdimlar: string[]
  onemDerecesi: 'kritik' | 'yuksek' | 'orta' | 'dusuk'
  ilgiliSayfa?: string
  anahtarlar: string[]
}

export interface SorunKategori {
  slug: string
  baslik: string
  aciklama: string
  ikon: string
  renk: string
  sorunlar: SorunCozum[]
}

// ---------------------------------------------------------------------------
// A. Odeme Sorunlari
// ---------------------------------------------------------------------------
const odemeSorunlari: SorunCozum[] = [
  {
    id: 'odeme-basarisiz',
    baslik: 'Odeme Islemi Basarisiz Oldu',
    belirtiler: [
      'Odeme sayfasinda hata mesaji aliyorum',
      'Kart bilgileri girdikten sonra islem basarisiz oluyor',
      'Odeme butonu calismiyor',
    ],
    cozumAdimlar: [
      'Kart limitinizi kontrol edin \u2014 aylik/gunluk harcama limiti dolmus olabilir.',
      'Farkli bir kredi veya banka karti ile tekrar deneyin.',
      'Tarayicinizin cerezlerini ve onbellegini temizleyin.',
      'Gizli/ozel pencerede tekrar deneyin.',
      'Sorun devam ediyorsa bankanizla iletisime gecin \u2014 3D Secure engellenmis olabilir.',
    ],
    onemDerecesi: 'kritik',
    ilgiliSayfa: '/destek/odeme-fatura/odeme-yontemleri',
    anahtarlar: ['odeme', 'basarisiz', 'hata', 'kart', 'reddedildi'],
  },
  {
    id: 'kart-reddedildi',
    baslik: 'Kart Bilgileri Reddedildi',
    belirtiler: [
      'Kart numarasi veya CVV hatali uyarisi aliyorum',
      'Sanal kartim kabul edilmiyor',
      'Banka kartim gecersiz diyor',
    ],
    cozumAdimlar: [
      'Kart numarasini, son kullanma tarihini ve CVV kodunu tekrar kontrol edin.',
      'Sanal kartlar bazi 3D Secure islemlerinde calismayabilir \u2014 fiziksel kartinizi deneyin.',
      'Kartinizin online alisveris icin aktif oldugundan emin olun (banka mobil uygulamasindan kontrol edin).',
      'Banka karti yerine kredi karti kullanmayi deneyin.',
    ],
    onemDerecesi: 'yuksek',
    anahtarlar: ['kart', 'reddedildi', 'cvv', 'gecersiz', 'numara'],
  },
  {
    id: '3d-secure-zaman-asimi',
    baslik: '3D Secure Zaman Asimi',
    belirtiler: [
      'SMS onay kodu gelmiyor veya gec geliyor',
      '3D Secure sayfasi zaman asimina ugradi',
      'Dogrulama sayfasinda takilip kaldim',
    ],
    cozumAdimlar: [
      "SMS'in gelmesini en az 2 dakika bekleyin.",
      'Telefonunuzun sinyalini kontrol edin \u2014 ucak modunda olmadigindan emin olun.',
      'Bankanizin mobil uygulamasindan onay bildirimi gelmis olabilir \u2014 kontrol edin.',
      'Islemi tekrar baslatip yeni bir SMS kodu talep edin.',
      'Farkli bir tarayici veya cihaz deneyin.',
    ],
    onemDerecesi: 'orta',
    anahtarlar: ['3d', 'secure', 'sms', 'onay', 'zaman asimi', 'dogrulama'],
  },
  {
    id: 'odeme-basarili-site-yok',
    baslik: 'Odeme Basarili Ama Site Olusmadi',
    belirtiler: [
      'Odeme basarili mesaji aldim ama site gorunmuyor',
      'Parami odedim ama dashboard bos',
      'Onay e-postasi gelmedi',
    ],
    cozumAdimlar: [
      ' 2-3 dakika bekleyin \u2014 site olusturma islemi arka planda devam ediyor olabilir.',
      'E-posta kutunuzu (spam dahil) kontrol edin \u2014 onay mesaji gonderilmis olabilir.',
      "WhatsApp'inizi kontrol edin \u2014 hosgeldin mesaji gelmis olabilir.",
      "Dashboard'a giris yaparak site durumunu kontrol edin.",
      "5 dakika sonra hala olusmadiysa destek talebi acin \u2014 odeme referans numaranizi belirtin.",
    ],
    onemDerecesi: 'kritik',
    ilgiliSayfa: '/destek/odeme-fatura/odeme-yontemleri',
    anahtarlar: ['odeme', 'basarili', 'site', 'olusmadi', 'gorunmuyor', 'bos'],
  },
  {
    id: 'fatura-goruntulenemiyor',
    baslik: 'Fatura Goruntulenemyor',
    belirtiler: [
      'Faturami bulamiyorum',
      'PDF fatura indirilemiyor',
      'Fatura sayfasi yuklenmiyor',
    ],
    cozumAdimlar: [
      "Dashboard \u2192 Profil \u2192 Aboneligim sayfasina gidin.",
      'Fatura gecmisi bolumunde tum faturalariniz listelenir.',
      'PDF indirme butonu calismiyorsa farkli bir tarayici deneyin.',
      'Fatura henuz olusmamis olabilir \u2014 odeme sonrasi 24 saate kadar surebilir.',
    ],
    onemDerecesi: 'dusuk',
    ilgiliSayfa: '/destek/odeme-fatura/fatura-indirme',
    anahtarlar: ['fatura', 'goruntulenemyor', 'pdf', 'indirme', 'bulamiyorum'],
  },
]

// ---------------------------------------------------------------------------
// B. Giris Sorunlari
// ---------------------------------------------------------------------------
const girisSorunlari: SorunCozum[] = [
  {
    id: 'otp-gelmiyor',
    baslik: 'OTP Dogrulama Kodu Gelmiyor',
    belirtiler: [
      'SMS kodu gelmiyor',
      'Dogrulama kodunu alamiyorum',
      'Kod gonderildi diyor ama SMS yok',
    ],
    cozumAdimlar: [
      'Spam/istenmeyen mesajlar klasorunu kontrol edin.',
      '60 saniye bekleyip tekrar kod isteyin \u2014 guvenlik nedeniyle kisa bir bekleme suresi vardir.',
      "Telefon sinyalinizi kontrol edin \u2014 dusuk sinyal SMS'leri geciktirebilir.",
      'Numaranizi +90 ulke koduyla birlikte girdiginizden emin olun.',
      "Farkli bir telefona SMS gondertmeyi deneyin (SIM kartinizi gecici olarak baska cihaza takin).",
      "Sorun devam ediyorsa bize WhatsApp'tan yazin.",
    ],
    onemDerecesi: 'kritik',
    anahtarlar: ['otp', 'kod', 'sms', 'gelmiyor', 'dogrulama', 'giris'],
  },
  {
    id: 'otp-suresi-dolmus',
    baslik: 'OTP Kodu Suresi Dolmus',
    belirtiler: [
      'Gecersiz kod hatasi aliyorum',
      'Kod suresi dolmus diyor',
      'Dogru kodu giriyorum ama kabul etmiyor',
    ],
    cozumAdimlar: [
      'OTP kodlari 3 dakika gecerlidir \u2014 sure dolmussa yeni kod isteyin.',
      'Kodu aldiginiz anda hemen girin \u2014 beklemeyin.',
      "'Yeni Kod Gonder' butonuna tiklayarak taze bir kod alin.",
      'Saatinizin dogru oldugundan emin olun \u2014 cihaz saati yanlissa dogrulama basarisiz olabilir.',
    ],
    onemDerecesi: 'orta',
    anahtarlar: ['otp', 'sure', 'dolmus', 'gecersiz', 'kod', 'suresi'],
  },
  {
    id: 'hesap-bulunamadi',
    baslik: 'Bu Numarayla Hesap Bulunamadi',
    belirtiler: [
      'Hesap bulunamadi hatasi',
      'Numaramla giris yapamiyorum',
      'Kayitli degilim diyor ama hesabim var',
    ],
    cozumAdimlar: [
      'Kayit oldugunuz telefon numarasini dogru girdiginizden emin olun.',
      'Baska bir numarayla kayit olmus olabilirsiniz \u2014 eski numaralarinizi da deneyin.',
      'Hesabiniz henuz aktif olmamis olabilir \u2014 odeme isleminizi tamamladiginizdan emin olun.',
      'Yeni hesap olusturmak icin kayit sayfasini kullanin.',
      'Hala sorun yasiyorsaniz destek talebi acin.',
    ],
    onemDerecesi: 'yuksek',
    anahtarlar: ['hesap', 'bulunamadi', 'numara', 'giris', 'kayitli'],
  },
  {
    id: 'rate-limit',
    baslik: '60 Saniye Bekleyiniz Uyarisi',
    belirtiler: [
      '60 saniye bekleyin hatasi',
      'Cok fazla deneme yaptiniz uyarisi',
      'Kod gonderme butonu devre disi',
    ],
    cozumAdimlar: [
      'Bu bir guvenlik onlemidir \u2014 art arda cok fazla kod talep edildiginde devreye girer.',
      ' 60 saniye bekleyip tekrar deneyin \u2014 geri sayim bittiginde buton aktif olacaktir.',
      'Bu sure zarfinda tarayiciyi kapatmayin.',
      'Her yeni kod talebinde onceki kod gecersiz olur \u2014 en son gelen kodu kullanin.',
    ],
    onemDerecesi: 'dusuk',
    anahtarlar: ['60 saniye', 'bekle', 'rate limit', 'cok fazla', 'deneme'],
  },
]

// ---------------------------------------------------------------------------
// C. Site Sorunlari
// ---------------------------------------------------------------------------
const siteSorunlari: SorunCozum[] = [
  {
    id: 'site-yuklenmiyor',
    baslik: 'Site Yuklenmiyor veya 404 Hatasi',
    belirtiler: [
      'Sitem acilmiyor',
      '404 sayfa bulunamadi hatasi',
      'Beyaz ekran goruyorum',
      'Site cok yavas yukleniyor',
    ],
    cozumAdimlar: [
      "Sitenizin yayinlanmis oldugundan emin olun \u2014 Dashboard \u2192 Sitem \u2192 'Yayinla' butonuna tiklayin.",
      "URL'yi dogru yazdiginizdan emin olun \u2014 kepenk.ai alan adini kontrol edin.",
      'Ozel domain bagladiysiniz DNS yayilmasi 24-48 saat surebilir.',
      'Tarayici onbellegini temizleyin: Ctrl+Shift+R (Windows) veya Cmd+Shift+R (Mac).',
      'Farkli bir cihaz veya agdan erismeyi deneyin.',
    ],
    onemDerecesi: 'yuksek',
    ilgiliSayfa: '/destek/editor/yayinlama',
    anahtarlar: ['site', 'yuklenmiyor', '404', 'acilmiyor', 'beyaz ekran', 'hata'],
  },
  {
    id: 'yayinlama-hatasi',
    baslik: 'Site Yayinlama Hatasi',
    belirtiler: [
      'Yayinla butonuna tikliyorum ama hata veriyor',
      'Yayinlama islemi yarida kaliyor',
      'Yayinlandi diyor ama degisiklikler gorunmuyor',
    ],
    cozumAdimlar: [
      '30 saniye bekleyip tekrar deneyin \u2014 sunucu gecici olarak mesgul olabilir.',
      "Tarayicinizi yenileyin ve tekrar 'Yayinla' butonuna tiklayin.",
      'Farkli bir tarayici deneyin (Chrome onerilir).',
      'Internet baglantinizi kontrol edin.',
      'Sorun 5 dakikadan fazla suruyorsa destek talebi acin.',
    ],
    onemDerecesi: 'yuksek',
    ilgiliSayfa: '/destek/editor/yayinlama',
    anahtarlar: ['yayinlama', 'hata', 'basarisiz', 'publish'],
  },
  {
    id: 'uretim-devam-ediyor',
    baslik: "'Uretim Zaten Devam Ediyor' Hatasi",
    belirtiler: [
      'Uretim zaten devam ediyor hatasi aliyorum',
      'Siteyi duzenleyemiyorum',
      'Editor kilitlenmis gorunuyor',
    ],
    cozumAdimlar: [
      'Bu mesaj, onceki bir site olusturma isleminin henuz tamamlanmadigini gosterir.',
      '5 dakika bekleyip sayfayi yenileyin.',
      'Sorun devam ediyorsa tarayici onbellegini temizleyip tekrar deneyin.',
      "10 dakikadan fazla suruyorsa bir destek talebi acin \u2014 kilit durumunu sifirlamamiz gerekebilir.",
    ],
    onemDerecesi: 'yuksek',
    anahtarlar: ['uretim', 'devam ediyor', 'kilitlenmis', 'editor', 'calismiyor'],
  },
  {
    id: 'eski-icerik',
    baslik: 'Eski Icerik Gorunuyor',
    belirtiler: [
      'Degisiklikleri yaptim ama eski hali gorunuyor',
      'Cache sorunu yasiyorum',
      'Guncel icerik yansimiyor',
    ],
    cozumAdimlar: [
      'Tarayicinizda Ctrl+Shift+R (Windows) veya Cmd+Shift+R (Mac) ile hard refresh yapin.',
      "CDN onbellegi 5 dakikaya kadar eski icerik gosterebilir \u2014 biraz bekleyin.",
      'Farkli bir cihaz veya gizli pencereden kontrol edin.',
      "Tum degisiklikleri kaydedip 'Yayinla' butonuna tikladiginizdan emin olun.",
    ],
    onemDerecesi: 'orta',
    anahtarlar: ['eski', 'icerik', 'cache', 'onbellek', 'guncelleme', 'yansimiyor'],
  },
]

// ---------------------------------------------------------------------------
// D. WhatsApp Sorunlari
// ---------------------------------------------------------------------------
const whatsappSorunlari: SorunCozum[] = [
  {
    id: 'hosgeldin-mesaji-yok',
    baslik: 'Hosgeldin Mesaji Gelmedi',
    belirtiler: [
      'Kayit oldum ama WhatsApp mesaji gelmedi',
      'Hosgeldin mesaji bekliyorum',
      "WhatsApp'ta hicbir mesaj yok",
    ],
    cozumAdimlar: [
      '5 dakika bekleyin \u2014 mesaj kuyrukta sirasini bekliyor olabilir.',
      "WhatsApp'ta KPNK numarasini engellemediginizden emin olun.",
      'WhatsApp Business degil, normal WhatsApp uygulamasini kontrol edin.',
      'Telefonunuzun internet baglantisini kontrol edin.',
      "10 dakika sonra hala gelmediyse destek talebi acin \u2014 Twilio entegrasyonunda gecici bir sorun olabilir.",
    ],
    onemDerecesi: 'kritik',
    ilgiliSayfa: '/destek/whatsapp/kurulum',
    anahtarlar: ['hosgeldin', 'mesaj', 'whatsapp', 'gelmedi', 'bildirim'],
  },
  {
    id: 'ai-yanit-vermiyor',
    baslik: 'AI Asistan Yanit Vermiyor',
    belirtiler: [
      "WhatsApp'tan yazdim ama cevap gelmiyor",
      'AI bot calismiyor',
      'Mesajima yanit alamiyorum',
    ],
    cozumAdimlar: [
      "Dashboard \u2192 Ayarlar'dan WhatsApp AI asistaninin aktif oldugunu kontrol edin.",
      'Islem kredi kotanizi kontrol edin \u2014 kotaniz dolmus olabilir.',
      'Sadece metin mesajlari desteklenir \u2014 gorsel, ses veya video gondermeyin.',
      '5 dakika bekleyip tekrar deneyin \u2014 yogun saatlerde yanitlar gecikebilir.',
      "Paketinizin WhatsApp AI ozelligini desteklediginden emin olun (Buyume ve uzeri).",
    ],
    onemDerecesi: 'yuksek',
    ilgiliSayfa: '/destek/whatsapp/otomatik-yanitlar',
    anahtarlar: ['ai', 'yanit', 'cevap', 'bot', 'calismiyor', 'whatsapp'],
  },
  {
    id: 'kredi-bitti',
    baslik: 'Islem Kredim Bitti',
    belirtiler: [
      'Kota asildi uyarisi',
      "AI asistan 'kota doldu' diyor",
      'Islem kredisi yetersiz',
    ],
    cozumAdimlar: [
      "Dashboard \u2192 Profil \u2192 Aboneligim'den kalan kredi miktarinizi kontrol edin.",
      'Krediler her ay yenilenir \u2014 yenilenme tarihinizi kontrol edin.',
      'Daha fazla kredi icin paketinizi yukseltin.',
      'TEMEL: 100, STANDART: 250, BUYUME: 750, PREMIUM: 2.000, PREMIUM PLUS: 5.000 islem/ay',
    ],
    onemDerecesi: 'orta',
    ilgiliSayfa: '/destek/paketler',
    anahtarlar: ['kredi', 'kota', 'bitti', 'yetersiz', 'islem', 'doldu'],
  },
  {
    id: 'mesaj-gecikme',
    baslik: 'Mesajlar Gecikiyor',
    belirtiler: [
      'AI yanitlari cok gec geliyor',
      'Mesaj gonderiyorum dakikalarca cevap yok',
      'Bazen hizli bazen yavas',
    ],
    cozumAdimlar: [
      'Yogun saatlerde (09:00-12:00, 18:00-21:00) yanit sureleri uzayabilir.',
      'AI asistan bir kuyruk sistemiyle calisir \u2014 mesajiniz sirasini bekliyor olabilir.',
      'Normal yanit suresi 5-30 saniyedir.',
      "1 dakikadan fazla surduyse mesaji tekrar gonderin.",
      'Surekli gecikme yasiyorsaniz destek talebi acin.',
    ],
    onemDerecesi: 'dusuk',
    anahtarlar: ['gecikme', 'yavas', 'gec', 'bekleme', 'sure'],
  },
]

// ---------------------------------------------------------------------------
// E. Domain Sorunlari
// ---------------------------------------------------------------------------
const domainSorunlari: SorunCozum[] = [
  {
    id: 'dns-yayilmadi',
    baslik: 'DNS Henuz Yayilmadi',
    belirtiler: [
      'Domain bagladim ama calismiyor',
      'Sitenin domainden acilmasi cok uzun suruyor',
      'DNS ayarlarini yaptim ama hala eski site gorunuyor',
    ],
    cozumAdimlar: [
      'DNS degisiklikleri 24-48 saat icinde yayilir \u2014 sabirli olun.',
      'whatsmydns.net gibi online araclarla DNS yayilma durumunu kontrol edin.',
      'CNAME kaydini dogru eklediginizden emin olun: sites.kepenk.ai',
      'DNS saglayicinizin kontrol panelinde TTL degerini dusurun (300 saniye onerilir).',
      '48 saatten fazla olduysa destek talebi acin.',
    ],
    onemDerecesi: 'orta',
    ilgiliSayfa: '/destek/editor/domain-baglama',
    anahtarlar: ['dns', 'yayilma', 'domain', 'propagation', 'sure'],
  },
  {
    id: 'ssl-aktif-degil',
    baslik: 'SSL Sertifikasi Aktif Degil',
    belirtiler: [
      "Sitemde 'Guvenli degil' uyarisi cikiyor",
      'https calismiyor',
      'SSL sertifikasi yok',
    ],
    cozumAdimlar: [
      'SSL sertifikasi DNS yayilmasi tamamlandiktan sonra otomatik olusturulur.',
      "DNS'i bagladiktan sonra 24 saate kadar bekleyin.",
      'Siteye http:// yerine https:// ile erismeyi deneyin.',
      "24 saatten sonra hala aktif olmadiysa destek talebi acin.",
    ],
    onemDerecesi: 'yuksek',
    ilgiliSayfa: '/destek/editor/domain-baglama',
    anahtarlar: ['ssl', 'sertifika', 'guvenli degil', 'https', 'guvenlik'],
  },
  {
    id: 'www-yonlendirme',
    baslik: 'www Yonlendirmesi Calismiyor',
    belirtiler: [
      'www.sitem.com calisiyor ama sitem.com calismiyor',
      'www olmadan siteye erisilemiyor',
      'Sadece bir versiyonu calisiyor',
    ],
    cozumAdimlar: [
      'Hem root domain hem de www icin CNAME kaydi eklemeniz gerekir.',
      'Root domain: @ \u2192 sites.kepenk.ai',
      'www subdomain: www \u2192 sites.kepenk.ai',
      'Her iki kaydi da ekledikten sonra 24-48 saat bekleyin.',
      "Bazi DNS saglayicilarinda root domain icin A kaydi gerekebilir \u2014 destek talebi acin.",
    ],
    onemDerecesi: 'orta',
    ilgiliSayfa: '/destek/editor/domain-baglama',
    anahtarlar: ['www', 'yonlendirme', 'root', 'domain', 'redirect'],
  },
  {
    id: 'domain-baglama-hatasi',
    baslik: 'Domain Baglama Hatasi',
    belirtiler: [
      'Domain baglama islemi basarisiz oluyor',
      'Hata mesaji aliyorum',
      'Domain dogrulanamyor',
    ],
    cozumAdimlar: [
      "Domain'in size ait oldugundan emin olun \u2014 whois sorgusu yapin.",
      'CNAME kaydini ekledikten sonra dogrulama butonuna tiklayin.',
      'DNS degisikliklerinin aktif olmasi icin birkac saat bekleyin.',
      "Domain'in baska bir servise bagli olmadigindan emin olun \u2014 mevcut A/CNAME kayitlarini kaldirin.",
      'Sorun devam ediyorsa domain saglayicinizin adini belirterek destek talebi acin.',
    ],
    onemDerecesi: 'orta',
    ilgiliSayfa: '/destek/editor/domain-baglama',
    anahtarlar: ['domain', 'baglama', 'hata', 'dogrulama', 'cname'],
  },
]

// ---------------------------------------------------------------------------
// F. Editor Sorunlari
// ---------------------------------------------------------------------------
const editorSorunlari: SorunCozum[] = [
  {
    id: 'kaydetme-sorunu',
    baslik: 'Degisiklikler Kaydedilmiyor',
    belirtiler: [
      'Kaydet butonuna tikliyorum ama degisiklikler kaybolyor',
      'Hata mesaji aliyorum kaydetmeye calisinca',
      'Degisikliklerim geri donuyor',
    ],
    cozumAdimlar: [
      'Internet baglantinizi kontrol edin \u2014 editor cevrimici calisir.',
      'Sayfayi yenileyip tekrar kaydetmeyi deneyin.',
      'Farkli bir tarayici deneyin \u2014 Chrome en iyi uyumlulugu saglar.',
      'Tarayici eklentilerini gecici olarak devre disi birakin (ozellikle ad blocker).',
      'Buyuk degisiklikleri kucuk parcalar halinde kaydedin.',
    ],
    onemDerecesi: 'yuksek',
    ilgiliSayfa: '/destek/editor/kullanim-kilavuzu',
    anahtarlar: ['kaydetme', 'kayit', 'kaybolyor', 'hata', 'degisiklik'],
  },
  {
    id: 'bloklar-yuklenmiyor',
    baslik: 'Bloklar Yuklenmiyor',
    belirtiler: [
      'Editorde bloklar gorunmuyor',
      'Bos sayfa goruyorum editorde',
      'Bloklar yuklenirken hata olustu',
    ],
    cozumAdimlar: [
      'Ctrl+Shift+R ile hard refresh yapin.',
      'Tarayici onbellegini ve cerezleri temizleyin.',
      'Tarayici eklentilerini gecici olarak kapatin.',
      'Farkli bir tarayici veya gizli pencere deneyin.',
      'Sorun devam ediyorsa destek talebi acin.',
    ],
    onemDerecesi: 'orta',
    ilgiliSayfa: '/destek/editor/blok-ekleme-silme',
    anahtarlar: ['blok', 'yuklenmiyor', 'gorunmuyor', 'bos', 'editor'],
  },
  {
    id: 'gorsel-yuklenmiyor',
    baslik: 'Gorseller Yuklenmiyor',
    belirtiler: [
      'Resim yukleme basarisiz oluyor',
      'Gorsel cok uzun suruyor',
      'Desteklenmeyen format hatasi',
    ],
    cozumAdimlar: [
      'Dosya boyutunu kontrol edin \u2014 maksimum 5 MB desteklenir.',
      'Desteklenen formatlar: JPG, PNG, WebP, GIF.',
      'Gorsel boyutlarini kulculterek tekrar deneyin (tinypng.com onerilir).',
      'Internet baglantinizin hizini kontrol edin.',
      'Farkli bir gorsel ile deneyin \u2014 dosya bozuk olabilir.',
    ],
    onemDerecesi: 'orta',
    ilgiliSayfa: '/destek/editor/gorsel-yukleme',
    anahtarlar: ['gorsel', 'resim', 'yuklenmiyor', 'format', 'boyut'],
  },
]

// ---------------------------------------------------------------------------
// Tum kategoriler
// ---------------------------------------------------------------------------
export const SORUN_GIDERME_KATEGORILERI: SorunKategori[] = [
  {
    slug: 'odeme-sorunlari',
    baslik: 'Odeme Sorunlari',
    aciklama:
      'Odeme islemi basarisizliklari, kart reddi, 3D Secure sorunlari ve fatura problemleri icin cozumler.',
    ikon: 'credit',
    renk: 'bg-rose-100 text-rose-700',
    sorunlar: odemeSorunlari,
  },
  {
    slug: 'giris-sorunlari',
    baslik: 'Giris Sorunlari',
    aciklama:
      'OTP kodu gelmemesi, suresi dolmus kodlar, hesap bulunamamasi ve guvenlik sinirlamalari icin cozumler.',
    ikon: 'key',
    renk: 'bg-amber-100 text-amber-700',
    sorunlar: girisSorunlari,
  },
  {
    slug: 'site-sorunlari',
    baslik: 'Site Sorunlari',
    aciklama:
      'Sitenin yuklenme hatalari, yayinlama sorunlari, eski icerik ve uretim kilitleri icin cozumler.',
    ikon: 'globe',
    renk: 'bg-blue-100 text-blue-700',
    sorunlar: siteSorunlari,
  },
  {
    slug: 'whatsapp-sorunlari',
    baslik: 'WhatsApp Sorunlari',
    aciklama:
      'Hosgeldin mesaji gelmemesi, AI asistan yanitlamama, kredi kotasi ve mesaj gecikmeleri icin cozumler.',
    ikon: 'message',
    renk: 'bg-green-100 text-green-700',
    sorunlar: whatsappSorunlari,
  },
  {
    slug: 'domain-sorunlari',
    baslik: 'Domain Sorunlari',
    aciklama:
      'DNS yayilma gecikmeleri, SSL sertifikasi, www yonlendirmesi ve domain baglama hatalari icin cozumler.',
    ikon: 'link',
    renk: 'bg-violet-100 text-violet-700',
    sorunlar: domainSorunlari,
  },
  {
    slug: 'editor-sorunlari',
    baslik: 'Editor Sorunlari',
    aciklama:
      'Kaydetme hatalari, blok yukleme sorunlari ve gorsel yukleme problemleri icin cozumler.',
    ikon: 'pencil',
    renk: 'bg-indigo-100 text-indigo-700',
    sorunlar: editorSorunlari,
  },
]

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/** Slug'a gore kategori bul */
export function sorunKategorisiBul(slug: string): SorunKategori | undefined {
  return SORUN_GIDERME_KATEGORILERI.find((k) => k.slug === slug)
}

/** Id'ye gore herhangi bir sorun bul (tum kategorileri tarar) */
export function sorunBul(id: string): SorunCozum | undefined {
  for (const kategori of SORUN_GIDERME_KATEGORILERI) {
    const sorun = kategori.sorunlar.find((s) => s.id === id)
    if (sorun) return sorun
  }
  return undefined
}
