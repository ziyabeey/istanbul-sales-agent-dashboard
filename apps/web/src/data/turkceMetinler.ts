/**
 * kepenk.ai — Türkçe UI Metin & Lokalizasyon Konfigürasyonu
 * ══════════════════════════════════════════════════════════
 * Ses tonu, terim sözlüğü, buton/etiket, hata/başarı mesajları,
 * WhatsApp şablonlar, push bildirim, e-posta, a11y, SEO, formatlar.
 */

// ══════════════════════════════════════════
// 1. SES TONU & DİL PRENSİPLERİ
// ══════════════════════════════════════════

export const SES_TONU = {
  kisilik: ['Samimi ama profesyonel', 'Güven veren ama otoriter değil', 'Enerjik ama aşırı heyecanlı değil', 'Teknoloji bilen ama teknik konuşmayan', 'Yerel ve modern'],
  hitap: { esnafa: 'Sen (samimi)', esnafMusterisi: 'Siz (resmi-saygılı)', aiAsistan: 'Ben (birinci tekil)' },
  kurallar: [
    { id: 'sade_turkce', kural: 'Teknik terim YASAK — Ahmet Usta\'nın bildiği Türkçe', ornekler: [{ yanlis: 'API bağlantı hatası', dogru: 'Bağlantı kurulamadı' }, { yanlis: 'Timeout oluştu', dogru: 'İşlem zaman aldı, tekrar deneyin' }, { yanlis: 'Authentication failed', dogru: 'Giriş yapılamadı' }] },
    { id: 'kisa_tut', kural: 'Maks 2 cümle. Buton: 2-4 kelime. Toast: 1 cümle.' },
    { id: 'aksiyon_oner', kural: 'Her hata mesajı somut çözüm içermeli', ornekler: [{ yanlis: 'Bir hata oluştu.', dogru: 'Bir hata oluştu. Sayfayı yenileyin.' }] },
    { id: 'suclama_yapma', kural: 'Kullanıcıyı suçlayan dil KULLANMA', ornekler: [{ yanlis: 'Yanlış şifre girdiniz', dogru: 'Şifre eşleşmedi. Tekrar deneyin.' }] },
    { id: 'emoji_olculu', kural: 'WhatsApp: emoji KULLAN. Dashboard UI: emoji KULLANMA. Kutlama istisna: 🎉' },
    { id: 'tutarli_terimler', kural: 'Aynı kavram için HER YERDE aynı kelime — terim sözlüğü bağlayıcı' },
    { id: 'turkce_karakter', kural: 'ç, ğ, ı, ö, ş, ü, İ doğru kullanılmalı. URL/slug hariç UTF-8 zorunlu.' },
  ],
} as const

// ══════════════════════════════════════════
// 2. TERİM SÖZLÜĞÜ
// ══════════════════════════════════════════

export const TERIM_SOZLUGU: Record<string, string> = {
  // Genel
  dashboard: 'Kontrol Paneli', settings: 'Ayarlar', profile: 'Profil', account: 'Hesap',
  logout: 'Çıkış Yap', login: 'Giriş Yap', sign_up: 'Kayıt Ol', password: 'Şifre',
  email: 'E-posta', phone: 'Telefon', save: 'Kaydet', cancel: 'İptal', delete: 'Sil',
  edit: 'Düzenle', add: 'Ekle', remove: 'Kaldır', search: 'Ara', filter: 'Filtrele',
  sort: 'Sırala', export: 'Dışa Aktar', import: 'İçe Aktar', upload: 'Yükle',
  download: 'İndir', preview: 'Önizleme', publish: 'Yayınla', unpublish: 'Yayından Kaldır',
  loading: 'Yükleniyor...', processing: 'İşleniyor...', retry: 'Tekrar Dene',
  back: 'Geri', next: 'İleri', done: 'Tamam', skip: 'Atla', close: 'Kapat',
  confirm: 'Onayla', select: 'Seç', more: 'Daha Fazla', help: 'Yardım', notifications: 'Bildirimler',
  // Site Editörü
  website: 'Web Sitesi', page: 'Sayfa', section: 'Bölüm', template: 'Şablon', theme: 'Tema',
  domain: 'Alan Adı', custom_domain: 'Özel Alan Adı', ssl: 'Güvenlik Sertifikası',
  seo: 'Arama Motoru Ayarları', meta_title: 'Sayfa Başlığı', meta_description: 'Sayfa Açıklaması',
  slug: 'Sayfa Adresi', header: 'Üst Bant', footer: 'Alt Bant', hero: 'Ana Görsel',
  gallery: 'Galeri', contact_form: 'İletişim Formu',
  // E-Ticaret
  product: 'Ürün', service: 'Hizmet', price: 'Fiyat', stock: 'Stok', order: 'Sipariş',
  cart: 'Sepet', checkout: 'Ödeme', payment: 'Ödeme', installment: 'Taksit',
  invoice: 'Fatura', e_invoice: 'e-Fatura', shipping: 'Kargo', tracking: 'Takip',
  coupon: 'Kupon', discount: 'İndirim', variant: 'Seçenek', category: 'Kategori',
  // Randevu
  appointment: 'Randevu', booking: 'Rezervasyon', schedule: 'Program',
  available: 'Müsait', unavailable: 'Dolu', slot: 'Saat', duration: 'Süre',
  provider: 'Hizmet Veren', reminder: 'Hatırlatma', no_show: 'Gelmedi', waitlist: 'Bekleme Listesi',
  // CRM
  customer: 'Müşteri', contact: 'Kişi', segment: 'Grup', campaign: 'Kampanya',
  automation: 'Otomatik İşlem', loyalty: 'Sadakat', points: 'Puan', tag: 'Etiket', note: 'Not',
  // Restoran
  menu: 'Menü', table: 'Masa', check: 'Adisyon', kitchen: 'Mutfak', waiter: 'Garson',
  tip: 'Bahşiş', takeaway: 'Paket Servis', delivery: 'Teslimat', dine_in: 'Restoranda',
  qr_menu: 'QR Menü', recipe: 'Reçete', allergen: 'Alerjen',
  // Analitik
  analytics: 'Raporlar', revenue: 'Gelir', visitors: 'Ziyaretçi',
  conversion: 'Dönüşüm', report: 'Rapor', weekly: 'Haftalık', monthly: 'Aylık',
  daily: 'Günlük', trend: 'Eğilim',
}

// ══════════════════════════════════════════
// 3. BUTON METİNLERİ
// ══════════════════════════════════════════

export const BUTONLAR = {
  genel: { kayitOl: 'Ücretsiz Başla', girisYap: 'Giriş Yap', cikisYap: 'Çıkış Yap', kaydet: 'Kaydet', iptal: 'İptal', sil: 'Sil', devam: 'Devam Et', geriDon: 'Geri Dön', tamamla: 'Tamamla', tekrarDene: 'Tekrar Dene' },
  editor: { yayinla: 'Yayınla', yayinlaPaylas: 'Yayınla ve Paylaş', onizle: 'Önizle', duzenle: 'Düzenle', sayfaEkle: 'Sayfa Ekle', bolumEkle: 'Bölüm Ekle', gorselYukle: 'Görsel Yükle', fotografCek: 'Fotoğraf Çek', aiOlustur: 'AI ile Oluştur', aiYenidenYaz: 'AI ile Yeniden Yaz', aiOneri: 'AI Önerisi Al' },
  eticaret: { urunEkle: 'Ürün Ekle', hizmetEkle: 'Hizmet Ekle', sepeteEkle: 'Sepete Ekle', satinAl: 'Satın Al', odemeYap: 'Ödemeyi Tamamla', siparisVer: 'Sipariş Ver', kuponKullan: 'Kuponu Uygula' },
  randevu: { randevuAl: 'Randevu Al', randevuIptal: 'Randevuyu İptal Et', musaitSaatler: 'Müsait Saatleri Gör', takvimGuncelle: 'Takvimi Güncelle' },
  crm: { kampanyaOlustur: 'Kampanya Oluştur', kampanyaGonder: 'Kampanyayı Gönder', mesajGonder: 'Mesaj Gönder', musteriEkle: 'Müşteri Ekle', grupOlustur: 'Grup Oluştur' },
  restoran: { siparisAl: 'Sipariş Al', adisyonKapat: 'Adisyonu Kapat', mutfagaGonder: 'Mutfağa Gönder', masaAc: 'Masa Aç', masaKapat: 'Masayı Kapat' },
  whatsapp: { paylas: 'WhatsApp\'ta Paylaş', gonder: 'WhatsApp ile Gönder', destek: 'WhatsApp Destek' },
} as const

// ══════════════════════════════════════════
// 4. FORM ETİKETLERİ
// ══════════════════════════════════════════

export interface FormAlani { etiket: string; placeholder: string; yardim?: string }

export const FORM_ALANLARI: Record<string, FormAlani> = {
  isletmeAdi: { etiket: 'İşletme Adı', placeholder: 'ör: Ahmet Usta Berber' },
  telefon: { etiket: 'Telefon Numarası', placeholder: '5XX XXX XX XX', yardim: 'Başında 0 olmadan yazın.' },
  eposta: { etiket: 'E-posta Adresi', placeholder: 'ornek@gmail.com', yardim: 'Opsiyonel — bildirimler için kullanılır.' },
  sifre: { etiket: 'Şifre', placeholder: 'En az 10 karakter', yardim: 'Büyük harf, küçük harf ve rakam içermelidir.' },
  adres: { etiket: 'Adres', placeholder: 'Mahalle, cadde, bina no...', yardim: 'Google Maps linki de yapıştırabilirsiniz.' },
  fiyat: { etiket: 'Fiyat (₺)', placeholder: '0,00', yardim: 'KDV dahil fiyat girin.' },
  aciklama: { etiket: 'Açıklama', placeholder: 'Ürün veya hizmet hakkında kısa bilgi...' },
  arama: { etiket: 'Ara', placeholder: 'Müşteri, ürün veya sipariş ara...' },
  kuponKodu: { etiket: 'Kupon Kodu', placeholder: 'KAMPANYA2026' },
  not: { etiket: 'Not', placeholder: 'Bu müşteri hakkında not ekleyin...' },
}

// ══════════════════════════════════════════
// 5. HATA MESAJLARI (MODÜL BAZLI)
// ══════════════════════════════════════════

export interface HataMesaji { mesaj: string; aksiyon: string; buton?: string; destek?: string; alternatif?: string }

export const HATA_MESAJLARI: Record<string, Record<string, HataMesaji>> = {
  genel: {
    baglanti_yok: { mesaj: 'İnternet bağlantınız kesildi.', aksiyon: 'Bağlantınızı kontrol edip tekrar deneyin.' },
    sunucu_hatasi: { mesaj: 'Bir sorun oluştu.', aksiyon: 'Birkaç dakika sonra tekrar deneyin. Sorun devam ederse destek ekibimize yazın.', destek: 'Hata kodu: {{traceId}}' },
    sayfa_bulunamadi: { mesaj: 'Aradığınız sayfa bulunamadı.', aksiyon: 'Adres doğru mu kontrol edin veya ana sayfaya dönün.' },
    erisim_yok: { mesaj: 'Bu sayfaya erişim yetkiniz yok.', aksiyon: 'Farklı bir hesapla giriş yapın veya işletme sahibiyle iletişime geçin.' },
    oturum_doldu: { mesaj: 'Oturumunuzun süresi doldu.', aksiyon: 'Güvenliğiniz için tekrar giriş yapmanız gerekiyor.', buton: 'Giriş Yap' },
    cok_fazla_istek: { mesaj: 'Çok hızlı ilerliyorsunuz!', aksiyon: 'Lütfen birkaç saniye bekleyip tekrar deneyin.' },
    bakim: { mesaj: 'Sistem bakımda.', aksiyon: 'Kısa bir süre sonra geri döneceğiz. İşletme siteniz çalışmaya devam ediyor.' },
    bilinmeyen: { mesaj: 'Beklenmeyen bir hata oluştu.', aksiyon: 'Sayfayı yenileyin. Sorun devam ederse bize yazın.', destek: 'Hata kodu: {{traceId}} — bu kodu destek ekibimize iletin.' },
  },
  auth: {
    telefon_gecersiz: { mesaj: 'Telefon numarasını kontrol edin.', aksiyon: '10 haneli, başında 0 olmadan girin: 5XX XXX XX XX' },
    kod_hatali: { mesaj: 'Doğrulama kodu hatalı.', aksiyon: 'Kodu kontrol edip tekrar girin. Gelmedi mi?', buton: 'Kodu Tekrar Gönder' },
    kod_suresi_doldu: { mesaj: 'Doğrulama kodunun süresi doldu.', aksiyon: 'Yeni kod gönderdik — lütfen kontrol edin.' },
    sifre_eslesmedi: { mesaj: 'Şifre eşleşmedi.', aksiyon: 'Şifrenizi kontrol edip tekrar deneyin.' },
    hesap_kilitlendi: { mesaj: 'Hesabınız geçici olarak kilitlendi.', aksiyon: 'Çok fazla hatalı giriş denemesi. {{sure}} sonra tekrar deneyin.' },
    hesap_bulunamadi: { mesaj: 'Bu numarayla kayıtlı hesap bulunamadı.', aksiyon: 'Numaranızı kontrol edin veya yeni hesap oluşturun.', buton: 'Ücretsiz Başla' },
  },
  odeme: {
    kart_hatali: { mesaj: 'Kart bilgilerini kontrol edin.', aksiyon: 'Kart numarası, son kullanma tarihi veya güvenlik kodu hatalı olabilir.' },
    yetersiz_bakiye: { mesaj: 'Kartınızda yeterli bakiye yok.', aksiyon: 'Başka bir kart deneyin veya taksitli ödeme seçin.' },
    kart_reddedildi: { mesaj: 'Kartınız reddedildi.', aksiyon: 'Bankanızla iletişime geçin veya başka bir kart deneyin.' },
    taksit_yok: { mesaj: 'Bu kart için taksit seçeneği yok.', aksiyon: 'Tek çekim ile devam edebilir veya başka kart deneyebilirsiniz.' },
    banka_dogrulama: { mesaj: 'Banka doğrulaması tamamlanamadı.', aksiyon: 'Bankanızdan gelen SMS\'i kontrol edin ve tekrar deneyin.' },
    sistem_mesgul: { mesaj: 'Ödeme sistemi şu anda meşgul.', aksiyon: 'Birkaç dakika sonra tekrar deneyin.', alternatif: 'Havale ile ödemek isterseniz aşağıdaki bilgileri kullanabilirsiniz.' },
    cift_odeme: { mesaj: 'Bu ödeme zaten işleniyor.', aksiyon: 'Lütfen birkaç saniye bekleyin — tekrar tıklamayın.' },
    iptal_edildi: { mesaj: 'Ödeme işlemi iptal edildi.', aksiyon: 'Tekrar denemek isterseniz \'Ödemeyi Tamamla\' butonuna tıklayın.' },
  },
  randevu: {
    saat_dolu: { mesaj: 'Bu saat artık dolu.', aksiyon: 'Aşağıdaki müsait saatlerden birini seçebilirsiniz.' },
    gecmis_tarih: { mesaj: 'Geçmiş bir tarihe randevu alınamaz.', aksiyon: 'Lütfen bugünden sonraki bir tarih seçin.' },
    mesai_disi: { mesaj: 'Seçtiğiniz saat çalışma saatleri dışında.', aksiyon: 'Çalışma saatleri: {{saatler}}' },
    cift_randevu: { mesaj: 'Bu saatte zaten bir randevunuz var.', aksiyon: 'Mevcut randevunuzu iptal edip yenisini alabilirsiniz.' },
    iptal_suresi: { mesaj: 'Randevu iptal süresi geçti.', aksiyon: 'İşletmeyle iletişime geçin.' },
    musait_yok: { mesaj: 'Bu tarihte müsait saat bulunamadı.', aksiyon: 'Farklı bir gün deneyin veya bekleme listesine ekleyin.', buton: 'Bekleme Listesine Ekle' },
  },
  editor: {
    kayit_basarisiz: { mesaj: 'Değişiklikler kaydedilemedi.', aksiyon: 'İnternet bağlantınızı kontrol edin. Değişiklikleriniz cihazınızda korunuyor.' },
    yayinlama_basarisiz: { mesaj: 'Site yayınlanamadı.', aksiyon: 'Birkaç dakika sonra tekrar deneyin. Mevcut siteniz etkilenmedi.' },
    gorsel_buyuk: { mesaj: 'Bu görsel çok büyük.', aksiyon: 'Maksimum {{max_mb}} MB boyutunda görsel yükleyebilirsiniz.' },
    gorsel_format: { mesaj: 'Bu dosya formatı desteklenmiyor.', aksiyon: 'JPG, PNG veya WebP formatında görsel yükleyin.' },
    ai_mesgul: { mesaj: 'AI asistanımız şu anda yoğun.', aksiyon: 'Birkaç dakika sonra tekrar deneyin. Bu arada manuel olarak düzenleyebilirsiniz.' },
    ai_limit: { mesaj: 'Bugünkü AI kullanım hakkınız doldu.', aksiyon: 'Yarın yenilenir. Şimdilik manuel düzenleme yapabilirsiniz.' },
    alanadı_kullanimda: { mesaj: 'Bu alan adı zaten kullanılıyor.', aksiyon: 'Başka bir adres deneyin: {{oneri}}' },
  },
  kargo: {
    api_erisim: { mesaj: 'Kargo firmasından yanıt alınamadı.', aksiyon: 'Birkaç dakika sonra tekrar deneyin.' },
    fiyat_hesap: { mesaj: 'Kargo ücreti hesaplanamadı.', aksiyon: 'Adres bilgilerini kontrol edin.' },
    bolge_disi: { mesaj: 'Bu adrese teslimat yapılamıyor.', aksiyon: 'Farklı bir teslimat adresi deneyin veya mağazadan teslim alın.' },
    takip_yok: { mesaj: 'Kargo takip bilgisi henüz güncellenmedi.', aksiyon: 'Kargo firması bilgiyi işlediğinde burada görünecektir.' },
  },
  whatsapp: {
    gonderilemedi: { mesaj: 'Mesaj gönderilemedi.', aksiyon: 'Müşterinin WhatsApp numarasını kontrol edin.' },
    numara_gecersiz: { mesaj: 'Bu numara WhatsApp\'ta kayıtlı değil.', aksiyon: 'Numarayı kontrol edin veya SMS ile gönderin.', buton: 'SMS ile Gönder' },
    kampanya_limiti: { mesaj: 'Bu ay için kampanya mesaj limitinize ulaştınız.', aksiyon: 'Üst plana geçerek daha fazla mesaj gönderebilirsiniz.', buton: 'Planımı Yükselt' },
    sablon_reddedildi: { mesaj: 'Bu mesaj şablonu gönderilemedi.', aksiyon: 'Mesaj içeriğini düzenleyin ve tekrar deneyin.' },
  },
}

// ══════════════════════════════════════════
// 6. BAŞARI MESAJLARI
// ══════════════════════════════════════════

export const BASARI_MESAJLARI = {
  genel: { kaydedildi: 'Kaydedildi ✓', guncellendi: 'Güncellendi ✓', silindi: 'Silindi ✓', kopyalandi: 'Panoya kopyalandı ✓', yuklendi: 'Yüklendi ✓' },
  site: {
    yayinlandi: { toast: 'Siteniz yayında! 🎉', detay: '{{site_url}} adresinden erişilebilir.', buton: 'Siteyi Gör' },
    guncellendi: { toast: 'Değişiklikler yayınlandı ✓', detay: 'Birkaç saniye içinde sitenizde görünecek.' },
  },
  eticaret: { urunEklendi: 'Ürün eklendi ✓', siparisAlindi: 'Yeni sipariş aldınız! 🔔', siparisKargo: 'Sipariş kargoya verildi ✓' },
  randevu: { olusturuldu: { esnafa: 'Yeni randevu oluşturuldu ✓', musteriye: 'Randevunuz onaylandı.' }, iptal: { esnafa: 'Randevu iptal edildi.', musteriye: 'Randevunuz iptal edilmiştir.' } },
  odeme: { basarili: { esnafa: 'Ödeme alındı: ₺{{tutar}} ✓', musteriye: 'Ödemeniz başarıyla tamamlandı.' }, ilkOdeme: { mesaj: '🎉 Tebrikler! İlk ödemenizi aldınız!', detay: '₺{{tutar}} — dijital işletmenizin ilk geliri!', animasyon: 'konfeti' } },
  crm: { kampanyaGonderildi: 'Kampanya gönderildi ✓', detay: '{{sayi}} kişiye gönderildi.' },
  onboarding: { hosgeldin: 'Hoş geldin, {{isim}}! 🎉', profilTamamlandi: 'İşletme profili tamamlandı ✓', checklistTamamlandi: 'Harika! İşletmeniz tamamen hazır! 🚀' },
} as const

// ══════════════════════════════════════════
// 7. BOŞ DURUM METİNLERİ
// ══════════════════════════════════════════

export interface BosDurum { baslik: string; aciklama: string; buton?: string; ikon: string }

export const BOS_DURUMLAR: Record<string, BosDurum> = {
  urun_yok: { baslik: 'Henüz ürün eklenmemiş', aciklama: 'İlk ürününüzü ekleyerek mağazanızı doldurun.', buton: 'İlk Ürünü Ekle', ikon: '📦' },
  siparis_yok: { baslik: 'Henüz sipariş yok', aciklama: 'Sitenizi müşterilerinizle paylaştığınızda siparişler buraya gelecek.', buton: 'Siteyi Paylaş', ikon: '🛒' },
  randevu_yok: { baslik: 'Henüz randevu yok', aciklama: 'Çalışma saatlerinizi belirleyin — müşteriler online randevu alsın.', buton: 'Randevuyu Aç', ikon: '📅' },
  musteri_yok: { baslik: 'Henüz müşteri kaydı yok', aciklama: 'İlk müşteriniz geldiğinde otomatik olarak burada görünecek.', buton: 'Müşteri Ekle', ikon: '👥' },
  kampanya_yok: { baslik: 'Henüz kampanya yok', aciklama: 'Müşterilerinize WhatsApp ile kampanya gönderin — satışlarınız artsın.', buton: 'İlk Kampanyayı Oluştur', ikon: '📣' },
  rapor_yok: { baslik: 'Henüz yeterli veri yok', aciklama: 'Birkaç gün kullandıktan sonra burada detaylı raporlarınız görünecek.', ikon: '📊' },
  arama_yok: { baslik: 'Sonuç bulunamadı', aciklama: '\'{{arama_terimi}}\' ile eşleşen kayıt yok. Farklı bir arama deneyin.', ikon: '🔍' },
  bildirim_yok: { baslik: 'Bildirim yok', aciklama: 'Yeni sipariş, randevu veya mesaj geldiğinde burada göreceksiniz.', ikon: '🔔' },
  menu_bos: { baslik: 'Menünüz henüz boş', aciklama: 'Yemeklerinizi ekleyin — müşteriler QR kodla menünüzü görsün.', buton: 'İlk Yemeği Ekle', ikon: '🍽️' },
  masa_yok: { baslik: 'Henüz masa tanımlanmamış', aciklama: 'Masalarınızı ekleyerek sipariş takibini başlatın.', buton: 'Masa Ekle', ikon: '🪑' },
}

// ══════════════════════════════════════════
// 8. ONAY DİYALOGLARI
// ══════════════════════════════════════════

export interface OnayDiyalog { baslik: string; aciklama: string; onayla: string; iptal: string; ekDogrulama?: string }

export const ONAY_DIYALOGLARI: Record<string, OnayDiyalog> = {
  urun_sil: { baslik: 'Ürünü silmek istediğinize emin misiniz?', aciklama: '\'{{urun_adi}}\' kalıcı olarak silinecek.', onayla: 'Evet, Sil', iptal: 'İptal' },
  siparis_iptal: { baslik: 'Siparişi iptal etmek istediğinize emin misiniz?', aciklama: '{{musteri_adi}} adlı müşterinin siparişi iptal edilecek.', onayla: 'Siparişi İptal Et', iptal: 'Vazgeç' },
  randevu_iptal: { baslik: 'Randevuyu iptal etmek istediğinize emin misiniz?', aciklama: '{{musteri_adi}} bilgilendirilecektir.', onayla: 'İptal Et', iptal: 'Vazgeç' },
  hesap_sil: { baslik: 'Hesabınızı silmek istediğinize emin misiniz?', aciklama: 'Tüm verileriniz, siteniz ve müşteri kayıtlarınız kalıcı olarak silinecek. Bu işlem geri alınamaz.', onayla: 'Hesabımı Sil', iptal: 'Vazgeç', ekDogrulama: '\'SİL\' yazarak onaylayın' },
  kampanya_gonder: { baslik: 'Kampanyayı göndermek istediğinize emin misiniz?', aciklama: '{{sayi}} kişiye {{kanal}} ile gönderilecek.', onayla: 'Gönder', iptal: 'Düzenlemeye Dön' },
  site_kaldır: { baslik: 'Sitenizi yayından kaldırmak istediğinize emin misiniz?', aciklama: 'Müşterileriniz sitenize erişemeyecek. İstediğiniz zaman tekrar yayınlayabilirsiniz.', onayla: 'Yayından Kaldır', iptal: 'Vazgeç' },
  plan_degistir: { baslik: 'Planınızı değiştirmek istediğinize emin misiniz?', aciklama: '{{yeni_plan}} planına geçiş yapılacak.', onayla: 'Planı Değiştir', iptal: 'Mevcut Planımda Kal' },
}

// ══════════════════════════════════════════
// 9. TOOLTIP METİNLERİ
// ══════════════════════════════════════════

export const TOOLTIP_METINLERI: Record<string, string> = {
  seo_baslik: 'Google aramalarında görünen başlık. 50-60 karakter ideal.',
  seo_aciklama: 'Google aramalarında başlığın altında görünen kısa açıklama.',
  slug: 'Sayfanızın web adresi. Türkçe karakter kullanmayın.',
  ssl: 'Sitenizi güvenli bağlantı ile korur. Otomatik olarak aktiftir.',
  kdv_dahil: 'Türkiye\'de fiyatlar KDV dahil gösterilmelidir.',
  stok_takibi: 'Açık olduğunda her satışta stok otomatik düşer.',
  taksit: 'Müşterileriniz kredi kartıyla taksitli ödeme yapabilir.',
  kupon: 'Müşterilerinize indirim kodu oluşturun.',
  online_randevu: 'Açık olduğunda müşteriler sitenizden 7/24 randevu alabilir.',
  otomatik_hatirlatma: 'Randevudan 24 saat önce müşterinize otomatik mesaj gider.',
  musait_saatler: 'Randevu alınabilecek günleri ve saatleri belirleyin.',
  tampon_sure: 'Randevular arasında hazırlık süresi. Örneğin 15 dakika.',
  segment: 'Müşterilerinizi gruplara ayırarak hedefli kampanya gönderin.',
  etiket: 'Müşterilerinizi sınıflandırmak için etiketler ekleyin. Örneğin: VIP, Yeni.',
  ziyaretci: 'Sitenize giren kişi sayısı.',
  donusum: 'Ziyaretçilerin kaçının sipariş veya randevu aldığını gösterir.',
  dijital_saglik: 'İşletmenizin dijital performansını 0-100 arasında ölçer.',
  iyzico: 'Güvenli ödeme altyapımız. Kart bilgileriniz kepenk.ai\'de saklanmaz.',
}

// ══════════════════════════════════════════
// 10. WHATSAPP ŞABLON METİNLERİ
// ══════════════════════════════════════════

export interface WaSablon { id: string; kategori: 'utility' | 'marketing'; mesaj: string; butonlar?: string[] }

export const WA_SABLONLARI: WaSablon[] = [
  { id: 'randevu_onay', kategori: 'utility', mesaj: '✅ Randevunuz onaylandı.\n\n📅 Tarih: {{tarih}}\n🕐 Saat: {{saat}}\n📍 {{isletme_adi}}\n\nİptal veya değişiklik için cevap yazın.', butonlar: ['📅 Takvime Ekle', '❌ İptal Et'] },
  { id: 'randevu_hatirlatma', kategori: 'utility', mesaj: '⏰ Hatırlatma: Yarın randevunuz var.\n\n📅 {{tarih}} {{saat}}\n📍 {{isletme_adi}}\n\nGelemeyecek misiniz?', butonlar: ['✅ Geleceğim', '❌ İptal Et'] },
  { id: 'siparis_onay', kategori: 'utility', mesaj: '✅ Siparişiniz alındı!\n\n🛒 Sipariş No: #{{siparis_no}}\n💰 Tutar: ₺{{tutar}}\n\nHazırlandığında size haber vereceğiz.' },
  { id: 'kargo_bildirim', kategori: 'utility', mesaj: '📦 Siparişiniz kargoya verildi!\n\n🚚 Kargo: {{kargo_firmasi}}\n📋 Takip No: {{takip_no}}', butonlar: ['📍 Kargomun Nerede'] },
  { id: 'odeme_onay', kategori: 'utility', mesaj: '✅ Ödemeniz alındı.\n\n💰 Tutar: ₺{{tutar}}\n🧾 İşlem: {{islem_no}}\n\nTeşekkür ederiz!' },
  { id: 'odeme_basarisiz', kategori: 'utility', mesaj: '⚠️ Ödeme işlemi tamamlanamadı.\n\nKart bilgilerinizi kontrol edip tekrar deneyin:', butonlar: ['💳 Tekrar Dene'] },
  { id: 'kampanya_genel', kategori: 'marketing', mesaj: '{{kampanya_baslik}}\n\n{{kampanya_icerik}}\n\n{{isletme_adi}}', butonlar: ['{{cta_text}}'] },
  { id: 'yorum_istegi', kategori: 'marketing', mesaj: 'Merhaba {{musteri_adi}}!\n\n{{isletme_adi}}\'deki deneyiminiz nasıldı?\nGoogle\'da bize yorum bırakır mısınız? ⭐', butonlar: ['⭐ Yorum Yap', '👋 Şimdi Değil'] },
]

// ══════════════════════════════════════════
// 11. PUSH BİLDİRİM METİNLERİ
// ══════════════════════════════════════════

export const PUSH_BILDIRIMLERI: Record<string, { baslik: string; govde: string }> = {
  yeni_siparis: { baslik: 'Yeni sipariş! 🔔', govde: '{{musteri_adi}} — ₺{{tutar}}' },
  yeni_randevu: { baslik: 'Yeni randevu 📅', govde: '{{musteri_adi}} — {{tarih}} {{saat}}' },
  randevu_iptali: { baslik: 'Randevu iptal edildi', govde: '{{musteri_adi}} — {{tarih}} {{saat}} randevusunu iptal etti.' },
  yeni_mesaj: { baslik: 'Yeni WhatsApp mesajı 💬', govde: '{{musteri_adi}}: {{mesaj_on_izleme}}' },
  odeme_alindi: { baslik: 'Ödeme alındı! 💰', govde: '₺{{tutar}} — {{musteri_adi}}' },
  stok_uyarisi: { baslik: 'Stok uyarısı ⚠️', govde: '\'{{urun_adi}}\' stoku {{adet}} adete düştü.' },
  haftalik_rapor: { baslik: 'Haftalık raporunuz hazır 📊', govde: 'Bu hafta: ₺{{gelir}} gelir, {{musteri}} yeni müşteri.' },
}

// ══════════════════════════════════════════
// 12. E-POSTA KONU SATIRLARI
// ══════════════════════════════════════════

export const EPOSTA_KONULARI: Record<string, string> = {
  hosgeldin: 'kepenk.ai\'ye hoş geldiniz! 🎉', sifre_sifirlama: 'Şifre sıfırlama talebi',
  hesap_dogrulama: 'Hesabınızı doğrulayın', fatura: 'kepenk.ai faturanız — {{ay}} {{yil}}',
  odeme_basarili: 'Ödemeniz alındı ✓', odeme_basarisiz: 'Ödeme bilgilerinizi güncelleyin',
  plan_degisikligi: 'Plan değişikliğiniz onaylandı', haftalik_rapor: 'Haftalık işletme raporunuz — {{tarih}}',
  aylik_rapor: '{{ay}} ayı işletme raporu', ilk_adim: 'İşletmenizi kurmak için son bir adım kaldı',
  tamamlanmamis: 'Siteniz sizi bekliyor!', kampanya_ozeti: 'Kampanya sonuçları: {{kampanya_adi}}',
}

// ══════════════════════════════════════════
// 13. ERİŞİLEBİLİRLİK (A11Y) METİNLERİ
// ══════════════════════════════════════════

export const A11Y_METINLERI = {
  aria: { anaMenu: 'Ana menü', yanPanel: 'Yan panel', bildirimler: 'Bildirimler paneli', arama: 'Arama', filtre: 'Filtre seçenekleri', sayfalama: 'Sayfa gezinme', modalKapat: 'Pencereyi kapat', menuAc: 'Menüyü aç', menuKapat: 'Menüyü kapat', onceki: 'Önceki sayfa', sonraki: 'Sonraki sayfa' },
  altText: { logo: '{{isletme_adi}} logosu', urunGorsel: '{{urun_adi}} ürün görseli', profilFoto: '{{isim}} profil fotoğrafı', telefon: 'Telefon', konum: 'Konum', saat: 'Çalışma saatleri', harita: '{{isletme_adi}} harita konumu' },
  form: { zorunlu: 'Bu alan zorunludur.', karakterSayaci: '{{mevcut}} / {{maks}} karakter', sifreGuc: 'Şifre gücü: {{seviye}}', dosyaSecildi: '{{sayi}} dosya seçildi', yukleIlerleme: 'Yükleniyor: %{{yuzde}}' },
  canlıBildirim: { kayitBasarili: 'Değişiklikler başarıyla kaydedildi.', hataOlustu: 'Hata oluştu. Detaylar aşağıda.', yukleniyor: 'İçerik yükleniyor, lütfen bekleyin.', aramaSonuc: '{{sayi}} sonuç bulundu.' },
} as const

// ══════════════════════════════════════════
// 14. SEO VARSAYILANLAR
// ══════════════════════════════════════════

export const SEO_VARSAYILANLAR = {
  metaTitleSablon: { anasayfa: '{{isletme_adi}} — {{sehir}} {{sektor}}', hizmetler: '{{isletme_adi}} Hizmetler ve Fiyat Listesi', randevu: '{{isletme_adi}} Online Randevu Al', iletisim: '{{isletme_adi}} İletişim ve Adres', menu: '{{isletme_adi}} Menü', urunler: '{{isletme_adi}} Ürünler' },
  metaDescriptionSablon: {
    berber: '{{sehir}} {{ilce}}\'de {{isletme_adi}}. Saç kesimi, sakal tıraşı ve bakım hizmetleri. Online randevu alın.',
    restoran: '{{sehir}} {{ilce}}\'de {{isletme_adi}}. {{mutfak_turu}} lezzetleri. Online sipariş ve rezervasyon.',
    doktor: '{{unvan}} {{isim}} — {{uzmanlik}}. {{sehir}} {{ilce}}\'de muayene. Online randevu alın.',
  },
  structuredData: { currency: 'TRY', language: 'tr', country: 'TR', priceRange: '₺' },
} as const

// ══════════════════════════════════════════
// 15. TARİH, SAAT & SAYISAL FORMAT
// ══════════════════════════════════════════

export const FORMATLAR = {
  tarih: { kisa: 'GG.AA.YYYY', uzun: 'GG Ay YYYY', gunler: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'], gunlerKisa: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'], aylar: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'] },
  goreliZaman: { simdi: 'Az önce', dakika: '{{n}} dakika önce', saat: '{{n}} saat önce', dun: 'Dün', gun: '{{n}} gün önce', hafta: 'Geçen hafta' },
  saat: { format: 'HH:mm', aralik: '{{baslangic}} — {{bitis}}' },
  para: { format: '₺{{tutar}}', binlikAyirici: '.', ondalikAyirici: ',', ondalikHane: 2, pozisyon: 'sol' },
  sayi: { binlikAyirici: '.', ondalikAyirici: ',', yuzde: '%{{deger}}' },
  telefon: { gosterim: '0(5XX) XXX XX XX', giris: '5XXXXXXXXX' },
} as const

// ══════════════════════════════════════════
// 16. LOADING METİNLERİ
// ══════════════════════════════════════════

export const LOADING_METINLERI = {
  genel: { yukleniyor: 'Yükleniyor...', hazirlaniyor: 'Sayfa hazırlanıyor...', kaydediliyor: 'Kaydediliyor...', siliniyor: 'Siliniyor...', gonderiliyor: 'Gönderiliyor...', dosyaYukleniyor: 'Dosya yükleniyor...' },
  ai: { siteOlusturuluyor: 'AI, sitenizi hazırlıyor...', icerikYaziliyor: 'İçerik oluşturuluyor...', oneriHazirlaniyor: 'Öneriler hazırlanıyor...', gorselIsleniyor: 'Görsel iyileştiriliyor...', analizYapiliyor: 'Analiz ediliyor...' },
  odeme: { isleniyor: 'Ödeme işleniyor...', dogrulaniyor: 'Banka doğrulaması bekleniyor...', tamamlaniyor: 'Ödeme tamamlanıyor...' },
  site: { yayinlaniyor: 'Siteniz yayınlanıyor...', guncelleniyor: 'Değişiklikler uygulanıyor...' },
  ilerleme: { yuzde: '%{{yuzde}} tamamlandı', adim: 'Adım {{mevcut}} / {{toplam}}' },
} as const
