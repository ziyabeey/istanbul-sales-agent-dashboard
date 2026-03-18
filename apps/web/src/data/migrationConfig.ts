/**
 * kepenk.ai — Veri Göçü & Migrasyon Konfigürasyonu
 * ═══════════════════════════════════════════════════
 * Platform göçü, AI-assisted veri çekme, CSV/Excel import,
 * OCR kağıt→dijital, doğrulama, rollback, KVKK uyum.
 */

// ══════════════════════════════════════════
// 1. GÖÇ MİMARİSİ SABİTLERİ
// ══════════════════════════════════════════

export const GOC_STACK = {
  pipeline: 'Cloud Run Jobs (uzun süren göç işleri)',
  kuyruk: 'Cloud Tasks (async adımlar)',
  geciciDepolama: 'gs://kepenk-ai-prod-migrations/',
  dogrulama: 'Zod (schema validation)',
  donusum: 'TypeScript transform fonksiyonları',
  aiZenginlestirme: 'Claude Sonnet (içerik iyileştirme, eksik veri tamamlama)',
  aiCrawl: 'Claude Haiku (web scraping analiz) + Puppeteer',
  ocr: 'Google Cloud Vision API (kağıt→metin)',
  monitoring: 'Cloud Logging + BigQuery',
} as const

export const GOC_PRENSIPLERI = [
  { id: 'veri_kaybi_sifir', baslik: 'Veri Kaybı Sıfır', aciklama: 'Dönüştürülemeyen alanlar raw_source_data olarak JSON saklanır' },
  { id: 'idempotent', baslik: 'İdempotent Göç', aciklama: 'Tekrar çalıştırılabilir — çift veri oluşmaz. migration_id + source_id deduplicate' },
  { id: 'esnaf_kontrolu', baslik: 'Esnaf Kontrolünde', aciklama: 'Otomatik overwrite YOK. Her adımda önizleme + onay' },
  { id: 'kvkk_uyumlu', baslik: 'KVKK Uyumlu', aciklama: 'Müşteri verisinde açık rıza kontrolü, İYS sorgulaması' },
  { id: 'ai_zenginlestirme', baslik: 'AI Zenginleştirme', aciklama: 'Eksik veriler AI ile tamamlanır, her AI üretimi işaretlenir' },
] as const

export type GocDurumu = 'INITIATED' | 'EXTRACTING' | 'TRANSFORMING' | 'VALIDATING' | 'PREVIEW' | 'IMPORTING' | 'ENRICHING' | 'COMPLETED' | 'FAILED' | 'ROLLED_BACK'

export const GOC_DURUMLARI: Record<GocDurumu, string> = {
  INITIATED: 'Esnaf göçü başlattı — kaynak seçildi',
  EXTRACTING: 'Kaynak veriler çekiliyor',
  TRANSFORMING: 'Veriler kepenk.ai formatına dönüştürülüyor',
  VALIDATING: 'Doğrulama çalışıyor — hatalar tespit ediliyor',
  PREVIEW: 'Esnaf önizliyor — onay bekliyor',
  IMPORTING: 'Veriler kepenk.ai\'ye yazılıyor',
  ENRICHING: 'AI eksik verileri tamamlıyor',
  COMPLETED: 'Göç tamamlandı',
  FAILED: 'Göç başarısız — rollback yapılabilir',
  ROLLED_BACK: 'Geri alındı — göç öncesi duruma dönüldü',
}

// ══════════════════════════════════════════
// 2. KAYNAK PLATFORM GÖÇÜ
// ══════════════════════════════════════════

export interface PlatformKaynak {
  id: string; isim: string; yontem: string; alternatif: string
  veriKapsami: string[]; apiLimit?: string; not?: string
}

export const ETICARET_KAYNAKLARI: PlatformKaynak[] = [
  { id: 'ikas', isim: 'ikas', yontem: 'ikas REST API (API key)', alternatif: 'CSV export (admin panel)', veriKapsami: ['ürünler', 'kategoriler', 'siparişler', 'müşteriler', 'kuponlar'], apiLimit: '100 kayıt/istek, 60 istek/dk' },
  { id: 'ideasoft', isim: 'IdeaSoft', yontem: 'IdeaSoft REST API v3', alternatif: 'XML + CSV export', veriKapsami: ['ürünler', 'kategoriler', 'siparişler', 'müşteriler', 'markalar'], apiLimit: '250 kayıt/istek' },
  { id: 'shopify', isim: 'Shopify', yontem: 'Shopify Admin API (GraphQL)', alternatif: 'CSV export (admin)', veriKapsami: ['ürünler', 'koleksiyonlar', 'siparişler', 'müşteriler', 'indirimler'], apiLimit: '50 istek/sn (GraphQL)' },
  { id: 'wix', isim: 'Wix', yontem: 'Wix Data API + CSV export', alternatif: 'Web scraping (Puppeteer) + AI', veriKapsami: ['sayfalar', 'blog', 'ürünler', 'booking', 'müşteriler'], not: 'API kısıtlı — scraping + CSV ağırlıklı' },
  { id: 'wordpress', isim: 'WordPress', yontem: 'WordPress REST API + WooCommerce REST API', alternatif: 'WordPress XML export (WXR)', veriKapsami: ['sayfalar', 'yazılar', 'ürünler', 'siparişler', 'medya'] },
]

export const URUN_HARITALAMA = {
  ikas: {
    'product.name': 'product.title',
    'product.description': 'product.description',
    'product.price.sellPrice': 'product.price.amount (kuruş cinsine çevir)',
    'product.price.discountPrice': 'product.compareAtPrice',
    'product.images[].url': 'product.media[] (Cloud Storage kopyala)',
    'product.categories[]': 'product.categories[] (slug eşleştir)',
    'product.variants[]': 'product.variants[] (boyut/renk)',
    'product.stockCount': 'product.inventory.quantity',
    'product.sku': 'product.sku',
    'product.barcode': 'product.barcode',
    'product.isActive': 'product.status (active/draft)',
  },
  shopify: {
    'product.title': 'product.title',
    'product.body_html': 'product.description (HTML→Markdown)',
    'product.vendor': 'product.brand',
    'product.product_type': 'product.category (AI eşleştir)',
    'product.variants[].price': 'product.price.amount',
    'product.variants[].sku': 'product.sku',
    'product.variants[].inventory_quantity': 'product.inventory.quantity',
    'product.images[].src': 'product.media[] (download + optimize)',
    'product.tags': 'product.tags[]',
    'product.status': 'product.status (active/draft/archived→draft)',
  },
} as const

export const MUSTERI_HARITALAMA = {
  name: 'contact.name.first + contact.name.last',
  email: 'contact.emails[0] (primaryEmail)',
  phone: 'contact.phones[0] (Türk format: +90 5XX)',
  address: 'contact.addresses[0]',
  totalSpent: 'contact.extendedFields.totalSpent',
  orderCount: 'contact.extendedFields.orderCount',
  createdAt: 'contact.createdAt (orijinal tarih)',
  tags: 'contact.labels[]',
} as const

export const SIPARIS_GOC_KURALI = {
  strateji: 'SADECE geçmiş kayıt — yeniden işlenMEZ',
  kapsam: 'Son 12 ay (daha eski opsiyonel)',
  koleksiyon: 'orders_migrated (aktif orders\'dan ayrı)',
  readOnly: true,
} as const

export const KVKK_KURALLARI = {
  rizaVar: 'consent=granted',
  rizaBilinmiyor: 'consent=unknown → İYS\'den kontrol',
  rizaYok: 'consent=denied → pazarlama gönderilmez',
  iysKontrol: 'İthal telefon numaraları İYS API ile sorgulanır',
} as const

// ══════════════════════════════════════════
// 3. AI-ASSISTED VERİ ÇEKME
// ══════════════════════════════════════════

export const GBP_IMPORT = {
  yontem: 'Google Business Profile API + Places API',
  tetikleyici: 'Onboarding: "Google İşletme Profiliniz var mı?"',
  cekilecekVeriler: ['İşletme adı + kategori', 'Telefon + adres + koordinat', 'Çalışma saatleri + özel günler', 'Görseller (AI sınıflandırma: cover/profile/interior/product)', 'Değerlendirmeler (puan + yorum)', 'Ek özellikler (Wi-Fi, otopark, erişilebilirlik)'],
  aiZenginlestirme: ['Kısa açıklama → SEO meta description', 'Kategori → sektör şablon seçimi', 'Fotoğraflar → otomatik alt text', 'Çalışma saatleri → randevu takvimi ön-konfigürasyonu'],
} as const

export const INSTAGRAM_IMPORT = {
  yontem: 'Instagram Basic Display API (OAuth) + Puppeteer fallback',
  tetikleyici: 'Onboarding: "Instagram hesabınız var mı?"',
  apiVerileri: ['username → socialLinks.instagram', 'biography → iş açıklaması kaynağı', 'profile_picture → logo adayı', 'media[].media_url → galeri görselleri', 'media[].caption → ürün/hizmet çıkarma'],
  limit: 'Son 25 paylaşım',
  aiAnaliz: ['İş sektörü belirleme', 'Hizmet/ürün listesi çıkarma', 'Marka tonu analizi', 'En iyi görselleri seçme', 'Hashtag → SEO anahtar kelime', 'Comment → testimonial çıkarma'],
} as const

export const WEB_CRAWL_IMPORT = {
  yontem: 'Puppeteer + Claude AI extraction',
  tetikleyici: 'Onboarding: "Mevcut web siteniz var mı?" + URL',
  crawlKapsam: { sayfaLimit: 50, gorselLimit: 100, sure: '2-5 dakika' },
  aiExtractionAlanlari: ['Sayfa tipi (anasayfa, hakkımızda, hizmetler, iletişim)', 'İş bilgileri (isim, adres, telefon, saatler)', 'Hizmet/ürün listesi + fiyat', 'Görselleri sınıfla (logo, hero, ürün, galeri)', 'SEO bilgileri (title, desc, h1, h2)', 'Marka renkleri (CSS\'den) → tema önerisi'],
  onizleme: 'Yan yana karşılaştırma: eski site vs yeni kepenk.ai site',
  redirectPlani: '301 redirect haritası (eski URL → yeni URL)',
} as const

// ══════════════════════════════════════════
// 4. POS / ADİSYON GÖÇÜ
// ══════════════════════════════════════════

export const POS_KAYNAKLARI = [
  { id: 'narpos', isim: 'NarPOS', yontem: 'CSV export (admin panel)', veri: ['Menü öğeleri + fiyat + kategori', 'Geçmiş satış raporları (12 ay)', 'Müşteri listesi'] },
  { id: 'adisyo', isim: 'Adisyo', yontem: 'Adisyo CSV export + API', veri: ['Menü + opsiyonlar/ekstralar', 'Masa planı (sayı)', 'Satış geçmişi', 'Personel listesi'] },
  { id: 'genel', isim: 'Genel POS (CSV)', yontem: 'CSV/Excel standart format', veri: ['Menü (urun_adi, kategori, fiyat, aciklama, alerjenler, porsiyon)'] },
] as const

export const RESTORAN_AI_ZENGINLESTIRME = [
  'Kısa ürün açıklaması (yoksa AI üretir)',
  'Alerjen tahmini (malzeme listesinden)',
  'Kalori tahmini (porsiyon bazlı)',
  'Food cost tahmini (sektör ortalaması)',
  'Menü kategorisi standardizasyonu',
] as const

// ══════════════════════════════════════════
// 5. CSV/EXCEL IMPORT ŞABLONLARI
// ══════════════════════════════════════════

export interface ImportSutun { sutun: string; tip: string; zorunlu: boolean; ornek?: string; not?: string }

export const IMPORT_SABLONLARI: Record<string, { baslik: string; dosyaFormat: string; sutunlar: ImportSutun[]; ornekCsv?: string }> = {
  musteri: {
    baslik: 'Müşteri İçe Aktarma',
    dosyaFormat: 'CSV (UTF-8-BOM) veya XLSX',
    sutunlar: [
      { sutun: 'ad', tip: 'text', zorunlu: true, ornek: 'Ahmet' },
      { sutun: 'telefon', tip: 'phone', zorunlu: true, ornek: '5321234567' },
      { sutun: 'soyad', tip: 'text', zorunlu: false, ornek: 'Yılmaz' },
      { sutun: 'eposta', tip: 'email', zorunlu: false, ornek: 'ahmet@gmail.com' },
      { sutun: 'dogum_tarihi', tip: 'date', zorunlu: false, ornek: '15.03.1985', not: 'GG.AA.YYYY' },
      { sutun: 'adres', tip: 'text', zorunlu: false },
      { sutun: 'not', tip: 'text', zorunlu: false, ornek: 'VIP müşteri' },
      { sutun: 'etiket', tip: 'text', zorunlu: false, ornek: 'düzenli;vip', not: '; ile ayır' },
      { sutun: 'pazarlama_izni', tip: 'boolean', zorunlu: false, ornek: 'evet/hayır' },
    ],
    ornekCsv: 'ad,soyad,telefon,eposta,not,etiket,pazarlama_izni\nAhmet,Yılmaz,5321234567,ahmet@gmail.com,VIP müşteri,düzenli;vip,evet\nFatma,Demir,5559876543,,Alerji var,yeni,hayır',
  },
  urun: {
    baslik: 'Ürün / Hizmet İçe Aktarma',
    dosyaFormat: 'CSV (UTF-8-BOM) veya XLSX',
    sutunlar: [
      { sutun: 'urun_adi', tip: 'text', zorunlu: true, ornek: 'Saç Kesimi' },
      { sutun: 'fiyat', tip: 'number', zorunlu: true, ornek: '250', not: '₺ cinsinden, KDV dahil' },
      { sutun: 'kategori', tip: 'text', zorunlu: false, ornek: 'Saç Hizmetleri' },
      { sutun: 'aciklama', tip: 'text', zorunlu: false },
      { sutun: 'stok', tip: 'number', zorunlu: false, ornek: '100', not: 'Hizmetlerde boş' },
      { sutun: 'sku', tip: 'text', zorunlu: false },
      { sutun: 'gorsel_url', tip: 'url', zorunlu: false, not: 'Erişilebilir URL' },
      { sutun: 'sure_dakika', tip: 'number', zorunlu: false, ornek: '30', not: 'Randevulu hizmetler' },
      { sutun: 'durum', tip: 'text', zorunlu: false, ornek: 'aktif/taslak' },
    ],
  },
  menu: {
    baslik: 'Restoran Menü İçe Aktarma',
    dosyaFormat: 'CSV (UTF-8-BOM) veya XLSX',
    sutunlar: [
      { sutun: 'yemek_adi', tip: 'text', zorunlu: true },
      { sutun: 'kategori', tip: 'text', zorunlu: true },
      { sutun: 'fiyat', tip: 'number', zorunlu: true },
      { sutun: 'aciklama', tip: 'text', zorunlu: false },
      { sutun: 'alerjenler', tip: 'text', zorunlu: false, ornek: 'Gluten;Süt', not: '; ile ayır' },
      { sutun: 'porsiyon', tip: 'text', zorunlu: false, ornek: 'Tam/Yarım' },
      { sutun: 'gorsel_url', tip: 'url', zorunlu: false },
    ],
  },
  randevu: {
    baslik: 'Randevu Geçmişi İçe Aktarma',
    dosyaFormat: 'CSV (UTF-8-BOM) veya XLSX',
    sutunlar: [
      { sutun: 'musteri_adi', tip: 'text', zorunlu: true },
      { sutun: 'musteri_telefon', tip: 'phone', zorunlu: true },
      { sutun: 'hizmet', tip: 'text', zorunlu: true },
      { sutun: 'tarih', tip: 'date', zorunlu: true, not: 'GG.AA.YYYY' },
      { sutun: 'saat', tip: 'time', zorunlu: true, not: 'SS:DD' },
      { sutun: 'durum', tip: 'text', zorunlu: false, ornek: 'tamamlandı/iptal/gelmedi' },
    ],
  },
}

// ══════════════════════════════════════════
// 6. IMPORT İŞLEME PİPELINE
// ══════════════════════════════════════════

export const IMPORT_PIPELINE = {
  dosyaYukleme: { maxBoyut: '10 MB', formatlar: ['csv', 'xlsx', 'xls'], encodingTespit: 'chardet (UTF-8, Windows-1254, ISO-8859-9)' },
  parsing: { csv: 'Papa Parse (streaming)', xlsx: 'SheetJS', satirLimiti: 10000 },
  sutunEslestirme: { yontem: 'Fuzzy match (%80 benzerlik)', ui: 'Sürükle-bırak sütun eşleştirme' },
  batchBoyutu: 50,
  hataYonetimi: { tekSatir: 'Atlanır, diğerleri devam', batchHata: 'Checkpoint + kaldığı yerden devam', tamBasarisizlik: 'Rollback (import edilen silinir)' },
} as const

export const DOGRULAMA_KURALLARI = {
  telefon: ['10 hane mi?', '5 ile başlıyor mu?', 'Sadece rakam mı?', 'Duplicate (dosya içi + mevcut DB)'],
  eposta: ['Geçerli format mi?', 'Duplicate mi?'],
  fiyat: ['Pozitif sayı mı?', 'Mantıklı aralık (₺1 — ₺100.000)'],
  tarih: ['Geçerli tarih mi?', 'Gelecekte/geçmişte uygun mu?'],
} as const

export const CAKISMA_STRATEJILERI = {
  musteri: {
    tespit: 'Telefon numarası exact match (birincil) + isim fuzzy match (ikincil)',
    secenekler: ['GÜNCELLE (import öncelikli)', 'KORU (mevcut veri)', 'BİRLEŞTİR (eksik alanları tamamla)', 'TEK TEK SOR'],
    varsayilan: 'BİRLEŞTİR',
  },
  urun: {
    tespit: 'Ürün adı normalized match + fiyat benzerliği',
    secenekler: ['GÜNCELLE', 'KORU', 'YENİ OLUŞTUR'],
    varsayilan: 'YENİ OLUŞTUR',
  },
} as const

// ══════════════════════════════════════════
// 7. KAĞIT → DİJİTAL (OCR + AI)
// ══════════════════════════════════════════

export const OCR_KAYNAKLARI = [
  { id: 'kagit_menu', baslik: 'Kağıt Menü', akis: 'Fotoğraf → OCR → AI parse → MenuItem[]', ornekler: 'Restoran menü' },
  { id: 'kagit_fiyat', baslik: 'Fiyat Listesi', akis: 'Fotoğraf → OCR → AI → Service[]/Product[]', ornekler: 'Berber, oto yıkama, klinik' },
  { id: 'kartvizit', baslik: 'Kartvizit', akis: 'Fotoğraf → OCR → AI → Contact/BusinessProfile', ornekler: 'İsim, telefon, e-posta, adres' },
  { id: 'kagit_defter', baslik: 'Kağıt Defter', akis: 'Fotoğraf → OCR → AI → müşteri listesi', ornekler: 'El yazısı (düşük doğruluk — esnaf doğrulaması şart)' },
] as const

export const OCR_TEKNIK_AKIS = [
  'Esnaf kamera ile fotoğraf çeker (dashboard/WhatsApp)',
  'Görsel Cloud Storage\'a yüklenir',
  'Cloud Vision API ile OCR (text detection)',
  'OCR çıktısı Claude Sonnet\'e (yapılandırılmış veri çıkarma)',
  'AI çıktısı Zod ile validate',
  'Esnafa tablo halinde önizleme',
  'Esnaf düzeltir + onaylar',
  'Veriler kepenk.ai\'ye import',
] as const

export const WHATSAPP_OCR_AKISI = {
  esnafMesaj: '"Menümü sisteme aktarmak istiyorum" + [fotoğraf]',
  aiYanit1: 'Menünüzü aldım, şu anda işliyorum... ⏳',
  aiYanit2: 'Menünüzde {{sayi}} ürün buldum. Kontrol edin: [Dashboard Linki]',
  sure: '~30 saniye',
} as const

// ══════════════════════════════════════════
// 8. ROLLBACK & GÜVENLİK
// ══════════════════════════════════════════

export const ROLLBACK_MEKANIK = {
  snapshot: { nerede: 'gs://kepenk-ai-prod-migrations/{esnafId}/snapshots/{migrationId}/', icerik: 'Firestore export (etkilenen koleksiyonlar)', retention: '30 gün' },
  akis: ['Esnaf "Göçü Geri Al" tıklar', 'Onay dialogu', 'imported_ids listesinden batch delete', 'Snapshot\'tan restore (varsa)', 'Status → ROLLED_BACK', 'Bildirim: "Her şey eski haline döndü"'],
  zamanSiniri: '7 gün (sonra geri alma butonu kaybolur)',
} as const

export const KVKK_UYUM = {
  musteriVerisi: 'Rıza yoksa veri import edilir ama pazarlama izni KAPALI',
  dosyaSilme: 'Göç dosyaları 24 saat sonra silinir',
  geciciDepolama: '7 gün lifecycle policy',
  snapshotSilme: '30 gün sonra otomatik',
  auditLog: '5 yıl retention (yasal zorunluluk)',
} as const

export const MIGRATION_LOG_ALANLARI = ['esnaf_id', 'source (ikas|shopify|gbp|csv|ocr|…)', 'status', 'created_at', 'completed_at', 'record_count', 'imported_ids[]', 'snapshot_path', 'error_log'] as const

// ══════════════════════════════════════════
// 9. GÖÇ DASHBOARD UI
// ══════════════════════════════════════════

export const GOC_SECENEKLERI = [
  { ikon: '🌐', baslik: 'Mevcut Web Sitesinden', aciklama: 'URL girin — AI sitenizi analiz etsin', aksiyon: 'URL input + Analiz Et' },
  { ikon: '🛒', baslik: 'E-Ticaret Platformundan', aciklama: 'ikas, IdeaSoft, Shopify, Wix', aksiyon: 'Platform seç → API key / OAuth' },
  { ikon: '📱', baslik: 'Google & Instagram\'dan', aciklama: 'Google İşletme Profili ve Instagram', aksiyon: 'Google OAuth + Instagram OAuth' },
  { ikon: '🍽️', baslik: 'POS / Adisyon Sisteminden', aciklama: 'NarPOS, Adisyo veya diğer POS', aksiyon: 'Platform seç → CSV rehberi' },
  { ikon: '📋', baslik: 'Excel / CSV Dosyasından', aciklama: 'Müşteri, ürün, menü listesi', aksiyon: 'Dosya yükle → sütun eşleştir' },
  { ikon: '📸', baslik: 'Fotoğraftan (Kağıt Menü)', aciklama: 'Kağıt menü/fiyat listesi → AI dijitale çevirsin', aksiyon: 'Kamera / dosya yükle' },
] as const

export const GOC_GECMIS_SUTUNLARI = ['Tarih', 'Kaynak', 'Tür', 'Kayıt Sayısı', 'Durum', 'İşlem'] as const

// ══════════════════════════════════════════
// 10. HEDEF METRİKLER
// ══════════════════════════════════════════

export const GOC_METRIKLERI = {
  performans: [
    { metrik: 'Başarı oranı (kayıt bazlı)', hedef: '>%95' },
    { metrik: 'Ortalama süre (1000 kayıt)', hedef: '<5 dakika' },
    { metrik: 'Rollback oranı', hedef: '<%5' },
    { metrik: 'AI eksik alan tamamlama', hedef: '>%80' },
  ],
  kullaniciDeneyimi: [
    { metrik: 'Onboarding göç kullanım', hedef: '>%30 (kayıt olanların)' },
    { metrik: 'Göç tamamlama oranı', hedef: '>%80 (başlayanların)' },
    { metrik: 'Göç sonrası memnuniyet', hedef: 'NPS >40' },
  ],
  veriKalitesi: [
    { metrik: 'Duplicate oranı (import sonrası)', hedef: '<%2' },
    { metrik: 'Eksik alan oranı (AI sonrası)', hedef: '<%10' },
  ],
} as const
