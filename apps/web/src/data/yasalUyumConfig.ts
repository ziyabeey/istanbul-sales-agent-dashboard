/**
 * kepenk.ai — Yasal Uyumluluk Konfigürasyonu
 * ════════════════════════════════════════════
 * KVKK, İYS, e-Ticaret, çerez, VERBİS, otomatik uyum.
 */

// ══════════════════════════════════════════
// 1. YASAL ÇERÇEVE
// ══════════════════════════════════════════

export const YASAL_CERCEVE = [
  { kanun: '6698 — KVKK', kurum: 'Kişisel Verileri Koruma Kurumu', ceza: '100K—10M+ TL', kapsam: 'Kişisel veri işleme' },
  { kanun: '6563 — e-Ticaret / İYS', kurum: 'İleti Yönetim Sistemi (iys.org.tr)', ceza: '1K—15K TL per ileti', kapsam: 'Ticari elektronik ileti' },
  { kanun: '6502 — Tüketici Hakları', kurum: 'Ticaret Bakanlığı', ceza: 'Değişken', kapsam: 'Mesafeli satış, cayma hakkı' },
  { kanun: '5651 — İnternet Yayınları', kurum: 'BTK', ceza: 'Değişken', kapsam: 'İçerik/yer sağlayıcı sorumluluk' },
  { kanun: '213 VUK + 509/535 Tebliğ', kurum: 'GİB', ceza: 'Değişken', kapsam: 'e-Fatura/e-Arşiv (Prompt #25)' },
] as const

export const YASAL_POZISYON = {
  kepenkAi: 'Veri İşleyen (Data Processor) — platform olarak',
  esnaf: 'Veri Sorumlusu (Data Controller) — kendi müşteri verileri',
  iliski: 'kepenk.ai esnafın verilerini esnaf ADINA işler. Veri İşleyen Sözleşmesi (DPA) imzalanır.',
} as const

// ══════════════════════════════════════════
// 2. KVKK UYUMLULUĞU
// ══════════════════════════════════════════

export const VERI_SINIFLANDIRMASI = {
  genelKisisel: { ornekler: ['Ad, soyad', 'Telefon numarası', 'E-posta', 'Adres', 'Fotoğraf', 'IP adresi', 'Sipariş/randevu/ödeme geçmişi'], islemeSarti: 'Açık rıza VEYA KVKK m.5/2 istisnaları' },
  ozelNitelikli: { ornekler: ['Sağlık verileri (doktor sektörü — teşhis, reçete)', 'Biyometrik veri (şimdilik yok)'], islemeSarti: 'AÇIK RIZA ZORUNLU (m.6/2)', ozelOnlem: 'AES-256 şifreleme, AI\'ya GÖNDERİLMEZ, sadece doktor+hasta görür' },
  finansal: { ornekler: ['VKN/TCKN', 'IBAN', 'Fatura bilgileri'], ozelOnlem: 'AES-256 application-level encryption' },
  kartVerisi: { kural: 'kepenk.ai\'ye ASLA GELMEZ — iyzico PCI DSS L1 tokenization' },
} as const

export const AYDINLATMA = {
  zorunluIcerik: ['Veri sorumlusu kimliği', 'Hangi kişisel veriler', 'İşleme amaçları', 'Aktarım yapılan taraflar', 'Toplama yöntemi ve hukuki sebep', 'KVKK m.11 hakları'],
  gosterimNoktalari: ['Esnaf kayıt sayfası', 'Müşteri sipariş/randevu formu', 'İletişim formu', 'İlk WhatsApp etkileşimi', 'Cookie banner'],
  katmanli: { kisaMetin: '"Kişisel verileriniz {{isletme_adi}} tarafından kepenk.ai üzerinden işlenmektedir."', tamMetin: '/kvkk-aydinlatma sayfası' },
} as const

export const RIZA_YONETIMI = {
  acikRizaGereken: ['Pazarlama iletişimi (WhatsApp/SMS/email kampanya)', 'Özel nitelikli veri (sağlık — doktor sektörü)', 'Yurt dışı aktarım', 'AI profilleme (müşteri davranış analizi)'],
  acikRizaGerekmeyen: ['Sözleşme ifası (sipariş, randevu)', 'Yasal yükümlülük (e-fatura, vergi)', 'Meşru menfaat (hizmet kalitesi — ölçülülük şartıyla)'],
  uiKurallari: { onTikli: 'YASAK (KVKK + GDPR)', herRizaAyri: 'Toplu rıza YASAK — her kanal ayrı checkbox', aktifIslem: 'Kullanıcı bilinçli tıklamalı' },
  checkboxOrnekleri: ['☐ KVKK Aydınlatma Metnini okudum (zorunlu)', '☐ WhatsApp kampanya mesajı almak istiyorum (opsiyonel)', '☐ SMS kampanya almak istiyorum (opsiyonel)', '☐ E-posta kampanya almak istiyorum (opsiyonel)'],
  rizaKaydi: { depolama: 'Firestore contacts/{id}.consent', alanlar: ['kvkkAccepted', 'kvkkDate', 'kvkkVersion', 'kvkkIP (hash)', 'marketingWhatsApp', 'marketingSMS', 'marketingEmail'] },
  geriAlma: { ui: 'Müşteri → Gizlilik Ayarları → toggle', whatsapp: '"DURDUR" yazarsa → kapalı', email: '"Abonelikten çık" linki', sure: '24 saat içinde tüm pazarlama durur' },
} as const

export const VERI_SAHIBI_HAKLARI = [
  { hak: 'Bilgi edinme (m.11/a)', aciklama: 'Verilerin işlenip işlenmediğini öğrenme', implementasyon: 'Müşteri portalı → Verilerim' },
  { hak: 'İşlem bilgisi (m.11/b)', aciklama: 'İşlenme amacını öğrenme', implementasyon: 'Aydınlatma metni + talep üzerine detay' },
  { hak: 'Üçüncü taraf (m.11/c)', aciklama: 'Aktarılan kişileri bilme', implementasyon: 'Aydınlatma metninde listelenir' },
  { hak: 'Düzeltme (m.11/d)', aciklama: 'Eksik/yanlış veri düzeltme', implementasyon: 'Müşteri portalı → Bilgilerimi Düzenle', sure: '30 gün' },
  { hak: 'Silme (m.11/e)', aciklama: 'İşleme sebebi kalktığında silme', implementasyon: 'Hesabımı Sil → anonimleştirme (fatura VUK 10 yıl korunur, AI vektör silinir)', sure: '30 gün' },
  { hak: 'Taşınabilirlik (m.11/f)', aciklama: 'Verileri başka sorumluya aktarım', implementasyon: 'Verilerimi İndir → JSON (24 saat içinde hazır)', format: 'JSON (makine okunabilir)' },
  { hak: 'İtiraz (m.11/g)', aciklama: 'Aleyhte sonuçlara itiraz', implementasyon: 'AI profilleme sonuçlarına itiraz → insan review' },
]

export const VERI_IHLALI = {
  kvkkKurulu: '72 saat içinde bildirim',
  ilgiliKisiler: 'En kısa sürede (risk yüksekse)',
  bildirimIcerigi: ['İhlalin zamanı', 'Etkilenen veri kategorileri', 'Tahmini kişi sayısı', 'Olası sonuçlar', 'Alınan/planlanan önlemler'],
  kanal: 'KVKK portalı + WhatsApp/email',
} as const

// ══════════════════════════════════════════
// 3. İYS ENTEGRASYONU
// ══════════════════════════════════════════

export const IYS_CONFIG = {
  tanim: 'Ticari elektronik ileti göndermek için İYS ONAY zorunlu. İzinsiz ileti → 1K-15K TL ceza PER İLETİ.',
  apiBaseUrl: 'https://api.iys.org.tr',
  auth: 'JWT token (marka kaydı sonrası)',
  islemler: [
    { islem: 'İzin ekleme', endpoint: 'POST /iys/brands/{brandCode}/consents', neZaman: 'Müşteri rıza checkbox tıkladığında' },
    { islem: 'İzin kaldırma', endpoint: 'PUT /iys/brands/{brandCode}/consents', neZaman: 'Rıza geri alındığında', status: 'RET' },
    { islem: 'İzin sorgulama', endpoint: 'GET /iys/brands/{brandCode}/consents/status', neZaman: 'Kampanya öncesi toplu sorgu' },
  ],
  akis: {
    rizaVerince: ['UI checkbox → consent kaydedildi', 'Async İYS API → ONAY gönder', 'İYS OK → contact.consent.iysStatus = granted', 'Başarısız → 3 retry → manuel kuyruğa'],
    kampanyaOncesi: ['Hedef segmentteki numaraları İYS toplu sorgula', 'ONAY olmayan → listeden ÇIKAR', 'Sadece İYS onaylılara gönder', 'OTOMATİK — esnaf farkında bile olmaz'],
    rizaGeriAlinca: ['Toggle kapatıldı / "DURDUR" yazıldı', 'Firestore güncelle', 'İYS API → RET gönder', '24 saat içinde pazarlama durur'],
  },
  iletiSiniflandirmasi: {
    hizmetIletisi: { iysGerekli: false, ornekler: ['Sipariş onayı', 'Kargo bildirimi', 'Randevu hatırlatma', 'Ödeme onayı', 'OTP', 'Fatura'] },
    ticariIleti: { iysGerekli: true, ornekler: ['Kampanya/indirim', 'Yeni ürün duyurusu', 'Sadakat puan', 'Geri kazanım', 'Anket', 'Blog paylaşımı'] },
  },
} as const

// ══════════════════════════════════════════
// 4. E-TİCARET YASAL UYUM
// ══════════════════════════════════════════

export const MESAFELI_SATIS = {
  onBilgilendirme: { zorunluBilgiler: ['Satıcı kimlik (unvan, adres, tel, email)', 'Ürün temel nitelikleri', 'KDV dahil toplam fiyat', 'Ödeme şekli, teslimat koşulları', 'Cayma hakkı (14 gün)', 'Kargo ücreti', 'Şikayet başvuru adresi'], gosterim: 'Checkout → sipariş onaylamadan ÖNCE → checkbox zorunlu' },
  sozlesme: { zorunlu: 'Her online sipariş için', gosterim: 'Checkout link + onay checkbox', arsiv: 'PDF müşteriye gönderilir', saklama: '3 yıl' },
  caymaHakki: { sure: '14 gün (teslimden itibaren)', iade: '10 gün içinde ürün iadesi', ucretIadesi: '14 gün içinde aynı yöntemle', muafUrunler: ['Kişiye özel ürünler', 'Çabuk bozulan (gıda, çiçek)', 'Açılmış hijyen ürünleri', 'İndirilen dijital içerik', 'Tamamlanan hizmetler'] },
} as const

export const ZORUNLU_SAYFALAR = [
  { sayfa: 'Gizlilik Politikası', url: '/gizlilik-politikasi', icerik: 'KVKK aydınlatma + çerez', otomatik: true },
  { sayfa: 'Kullanım Koşulları', url: '/kullanim-kosullari', icerik: 'Site kullanım şartları', otomatik: true },
  { sayfa: 'Mesafeli Satış Sözleşmesi', url: '/mesafeli-satis-sozlesmesi', icerik: 'Mesafeli satış metni', otomatik: true, kosul: 'e-Ticaret aktif' },
  { sayfa: 'İade Politikası', url: '/iade-politikasi', icerik: 'Cayma hakkı, iade koşulları', otomatik: true, kosul: 'e-Ticaret aktif' },
  { sayfa: 'İletişim', url: '/iletisim', icerik: 'Unvan, MERSİS, VKN, adres, tel, email', otomatik: true },
  { sayfa: 'Çerez Politikası', url: '/cerez-politikasi', icerik: 'Çerez kullanım detayları', otomatik: true },
  { sayfa: 'KVKK Başvuru', url: '/kvkk-basvuru', icerik: 'KVKK m.11 başvuru formu', otomatik: true },
]

// ══════════════════════════════════════════
// 5. ÇEREZ YÖNETİMİ
// ══════════════════════════════════════════

export const CEREZ_YONETIMI = {
  banner: { gosterim: 'İlk ziyarette — sayfa altında sabit', metin: '🍪 Bu site çerezleri kullanmaktadır.', butonlar: ['Tümünü Kabul Et', 'Sadece Gerekli', 'Ayarlar'] },
  kategoriler: [
    { kategori: 'Gerekli', aciklama: 'Sitenin çalışması için zorunlu', ornekler: 'Oturum, sepet, dil tercihi', kapatilabilir: false, varsayilan: true },
    { kategori: 'Analitik', aciklama: 'Site kullanım analizi', ornekler: 'Google Analytics, Web Vitals', kapatilabilir: true, varsayilan: false },
    { kategori: 'Pazarlama', aciklama: 'Kişiselleştirilmiş reklam', ornekler: 'Meta Pixel, Google Ads', kapatilabilir: true, varsayilan: false },
  ],
  teknikKural: 'Onay verilmeden 3rd party script YÜKLENMEZ. Meta Pixel, GA → consent sonrası aktif.',
  depolama: 'localStorage kepenk_cookie_consent → {version, timestamp, necessary, analytics, marketing}',
} as const

// ══════════════════════════════════════════
// 6. VERBİS & SAKLAMA SÜRELERİ
// ══════════════════════════════════════════

export const VERBIS = {
  tanim: 'Veri Sorumluları Sicil Bilgi Sistemi — KVKK Kurumu kaydı',
  kepenkKaydi: {
    veriKategorileri: ['Kimlik (ad, soyad, TCKN)', 'İletişim (tel, email, adres)', 'Müşteri işlem (sipariş, randevu, ödeme)', 'Pazarlama (kampanya etkileşimi)', 'Hukuki işlem (fatura, sözleşme)'],
    islemeAmaclari: ['Hizmet sunumu', 'Yasal yükümlülük (e-fatura, vergi)', 'Pazarlama (rıza ile)', 'İstatistik/analitik (anonimleştirilmiş)'],
    aktarimYurtIci: ['iyzico (ödeme)', 'Twilio (mesajlaşma)', 'Nilvera (e-fatura)'],
    aktarimYurtDisi: ['GCP europe-west1 (AB)', 'Anthropic Claude (ABD — anonimleştirilmiş)'],
    yurtDisiGuvence: 'Açık rıza + SCC (Standart Sözleşme Klozları)',
  },
  saklamaSureleri: [
    { veri: 'Müşteri verileri', sure: 'İş ilişkisi + 3 yıl (zamanaşımı)' },
    { veri: 'Fatura verileri', sure: '10 yıl (VUK m.253)' },
    { veri: 'Log verileri', sure: '2 yıl (5651 sayılı Kanun)' },
    { veri: 'Rıza kayıtları', sure: '5 yıl (ispat yükümlülüğü)' },
  ],
  esnafRehber: 'Dashboard → Ayarlar → Yasal Uyum → VERBİS Rehberi (50+ çalışan yoksa opsiyonel)',
} as const

// ══════════════════════════════════════════
// 7. OTOMATİK UYUM
// ══════════════════════════════════════════

export const OTOMATIK_UYUM = {
  platformYapan: ['Aydınlatma metni otomatik üretim', 'Mesafeli satış sözleşmesi otomatik doldurma', 'İade politikası sektöre göre şablon', 'Cookie banner tüm sitelerde aktif', 'İYS otomatik kontrol (kampanya öncesi)', 'Rıza kaydı Firestore + İYS sync', 'e-Fatura otomatik (Prompt #25)', 'Veri silme pipeline (anonimleştirme)', 'Footer yasal linkler otomatik (kaldırılamaz)'],
  esnafSorumlulugu: ['Doğru işletme bilgileri (unvan, VKN, adres)', 'Veriyi amacı dışında kullanmamak', 'KVKK başvurularına 30 gün yanıt', 'VERBİS kaydı (gerekiyorsa)'],
  platformBildirimleri: ['Yasal metin güncelleme gerektiğinde WhatsApp', 'Mevzuat değişikliğinde dashboard banner', 'KVKK başvurusu geldiğinde anında bildirim'],
} as const

// ══════════════════════════════════════════
// 8. HEDEF METRİKLER
// ══════════════════════════════════════════

export const YASAL_METRIKLERI = {
  kvkk: [
    { metrik: 'Aydınlatma gösterim oranı', hedef: '%100 (tüm kayıt noktaları)' },
    { metrik: 'Rıza İYS kayıt oranı', hedef: '%100 (İYS sync)' },
    { metrik: 'Veri silme süresi', hedef: '<30 gün' },
    { metrik: 'İhlal bildirim süresi', hedef: '<72 saat' },
  ],
  iys: [
    { metrik: 'İYS sync başarı', hedef: '>%99' },
    { metrik: 'İzinsiz ileti sayısı', hedef: '0 (SIFIR)' },
  ],
  eticaret: [
    { metrik: 'Zorunlu sayfa kapsam', hedef: '%100' },
    { metrik: 'Ön bilgilendirme gösterim', hedef: '%100 checkout' },
  ],
}
