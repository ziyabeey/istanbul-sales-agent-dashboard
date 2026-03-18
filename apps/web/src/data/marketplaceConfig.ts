/**
 * kepenk.ai — Türk Pazaryeri Entegrasyon Konfigürasyonu
 * ═══════════════════════════════════════════════════════
 * Trendyol, Hepsiburada, n11 API yapıları, komisyon oranları,
 * sipariş akışları, ürün gereksinimleri, stok senkronizasyonu.
 */

// ══════════════════════════════════════════
// 1. PAZARYERI API YAPILARI
// ══════════════════════════════════════════

export interface PazaryeriAPI {
  id: string; isim: string; apiTipi: string; authYontemi: string
  prodUrl: string; sandbox: string | null; rateLimits: string[]
  devPortal: string; notlar?: string
}

export const PAZARYERLERI: PazaryeriAPI[] = [
  {
    id: 'trendyol', isim: 'Trendyol', apiTipi: 'REST/JSON',
    authYontemi: 'HTTP Basic Auth (API Key + Secret — partner.trendyol.com)',
    prodUrl: 'apigw.trendyol.com',
    sandbox: 'stageapigw.trendyol.com (IP whitelist gerekli)',
    rateLimits: ['50 istek/10sn (endpoint başına)', '1.000 istek/dk (sipariş sorguları)'],
    devPortal: 'developers.trendyol.com',
    notlar: 'Gateway api.trendyol.com → apigw.trendyol.com\'a taşındı. v1.0-v5.0 API sürümleri, Postman koleksiyonları mevcut.',
  },
  {
    id: 'hepsiburada', isim: 'Hepsiburada', apiTipi: 'REST (JSON + XML)',
    authYontemi: 'HTTP Basic Auth / Servis Anahtarı (per-entegratör key)',
    prodUrl: 'mpop/listing-external/oms-external.hepsiburada.com',
    sandbox: 'SIT ortamı (domain adına -sit eklenir)',
    rateLimits: ['500 istek/sn (ürün durum)', '1.000 istek/sn (siparişler)', 'Maks 4.000 SKU/istek, 5 eşzamanlı güncelleme'],
    devPortal: 'developers.hepsiburada.com',
    notlar: 'Çoklu subdomain: mpop (katalog), listing-external (envanter), oms-external (sipariş). Fiyat eşik doğrulaması aktif.',
  },
  {
    id: 'n11', isim: 'n11', apiTipi: 'SOAP + REST (dual)',
    authYontemi: 'appkey + appsecret (HTTP header — REST) / XML body (SOAP)',
    prodUrl: 'api.n11.com (REST: /ms/ ve /rest/, SOAP: /ws/)',
    sandbox: null,
    rateLimits: ['1.000 sipariş sorgusu/dk', '1.000 SKU/batch istek'],
    devPortal: 'magazadestek.n11.com',
    notlar: 'Sandbox YOK — production\'da test. REST sipariş verisi Kasım 2024+. Ürün silme + tam sipariş yönetimi hâlâ SOAP gerektirir. TL/USD/EUR desteği.',
  },
]

// ══════════════════════════════════════════
// 2. ÜRÜN VERİ GEREKSİNİMLERİ
// ══════════════════════════════════════════

export interface UrunGereksinim {
  pazaryeri: string
  zorunluAlanlar: string[]
  gorselKurallari: { min: string; onerilen: string; maxBoyut: string; maxSayi: number; notlar?: string }
  varyant: string
  kisitlamalar: string[]
}

export const URUN_GEREKSINIMLERI: UrunGereksinim[] = [
  {
    pazaryeri: 'trendyol',
    zorunluAlanlar: ['barcode (EAN/GTIN)', 'title', 'productMainId (varyant gruplama)', 'brandId (marka kayıt)', 'categoryId (yaprak seviye)', 'description (maks 30.000 karakter, HTML)', 'quantity', 'salePrice', 'listPrice', 'vatRate', 'en az 1 görsel URL'],
    gorselKurallari: { min: '600×800px', onerilen: '1.200×1.800px', maxBoyut: '10MB', maxSayi: 8 },
    varyant: 'productMainId paylaşımı, her varyant benzersiz barcode + kategori-spesifik özellikler',
    kisitlamalar: ['Onay sonrası kategori + renk DEĞİŞTİRİLEMEZ — sil/yeniden oluştur', 'Kategori ağacı haftalık güncellenir'],
  },
  {
    pazaryeri: 'hepsiburada',
    zorunluAlanlar: ['UrunAdi', 'UrunAciklamasi', 'Marka', 'Barcode', 'VaryantGroupID', 'merchantSku', 'price', 'stock', 'tax_vat_rate', 'Image1-Image5'],
    gorselKurallari: { min: '600×600px', onerilen: '1.200×1.200px', maxBoyut: '10MB', maxSayi: 5, notlar: '+1 video destekli' },
    varyant: 'VaryantGroupID ile gruplama',
    kisitlamalar: ['Ön-eşleşme sistemi — mevcut katalogla match sonrası onay gerekir', 'Fiyat eşik doğrulaması (%80-%250 kategori ortalaması) — aşarsa fiyat kilitlenir'],
  },
  {
    pazaryeri: 'n11',
    zorunluAlanlar: ['title', 'description', 'categoryId', 'productMainId', 'stockCode (maks 255 karakter)', 'salePrice', 'listPrice', 'quantity', 'preparingDay (hazırlık süresi)', 'shipmentTemplate', 'images (HTTPS)', 'kategori zorunlu özellikleri'],
    gorselKurallari: { min: '500×500px', onerilen: '1.000×1.000px', maxBoyut: '10MB', maxSayi: 10 },
    varyant: 'productMainId + benzersiz stockCode',
    kisitlamalar: ['Barcode opsiyonel (katalog eşleşme hızlandırır)', 'TL/USD/EUR destekli — TCMB kuru ile otomatik çevrim', 'Fiyatlarda nokta ondalık ayırıcı, 2 basamak', 'listPrice ≥ salePrice zorunlu'],
  },
]

// ══════════════════════════════════════════
// 3. SİPARİŞ YAŞAM DÖNGÜSÜ
// ══════════════════════════════════════════

export interface SiparisAkisi {
  pazaryeri: string
  durumlar: string[]
  bildirimYontemi: string
  webhookDestegi: boolean
  webhookDetay?: string
  kargoEtiket?: string
  iptalKurali?: string
  iadeKurali?: string
  ozelNotlar: string[]
}

export const SIPARIS_AKISLARI: SiparisAkisi[] = [
  {
    pazaryeri: 'trendyol',
    durumlar: ['Created (ödeme doğrulandı)', 'Picking (hazırlanıyor)', 'Invoiced (opsiyonel)', 'Shipped (kargo taraması ile otomatik)', 'Delivered (takip ile otomatik)'],
    bildirimYontemi: 'Polling + Webhook',
    webhookDestegi: true,
    webhookDetay: 'Satıcı başına maks 15 webhook. Basic Auth / API Key callback auth. Durum bazlı abonelik.',
    kargoEtiket: 'TY Pays (Trendyol öder) / Seller Pays / ADEL modelleri. Alt paketlere bölünebilir.',
    iptalKurali: 'Standart süre içinde iptal',
    iadeKurali: 'Yasal 14 gün cayma hakkı',
    ozelNotlar: ['e-Fatura/e-Arşiv link\'i paket bazlı gönderilir', 'Sipariş alt paketlere bölünebilir (farklı kargo barkodu)', 'Mikro-ihracat desteği: etgbNo, etgbDate alanları'],
  },
  {
    pazaryeri: 'hepsiburada',
    durumlar: ['PaymentAwaiting', 'Open (paketlemeye hazır)', 'Packaged', 'InTransit', 'Delivered'],
    bildirimYontemi: 'Polling + Webhook',
    webhookDestegi: true,
    webhookDetay: 'Sipariş oluşturma, paketleme, iptal, kargo, teslimat, adres değişikliği event\'leri.',
    kargoEtiket: 'ZPL/PDF/PNG/JPG formatları. HepsiJet + Aras Kargo destekli.',
    iptalKurali: 'Sipariş değerine göre ceza: 10₺ (<50₺) — 2.000₺ (>20.000₺). Günlük maks 100 satıcı iptali.',
    iadeKurali: 'Claims API — satıcı kabul/ret. Yasal 14 gün cayma hakkı.',
    ozelNotlar: ['Fiyat eşik doğrulaması siparişi etkileyebilir', 'Granüler API: tekil fiyat/stok/teslimat güncellemesi', 'Kampanya API: sepet seviyesi indirimler'],
  },
  {
    pazaryeri: 'n11',
    durumlar: ['Created → Picking → Shipped → Delivered (REST)', 'New → Approved → Shipped → Delivered → Completed (SOAP)'],
    bildirimYontemi: 'Sadece Polling',
    webhookDestegi: false,
    kargoEtiket: 'n11 indirimli kargo ortaklıklarıyla takip no üretir.',
    iptalKurali: 'Standart süre içinde',
    iadeKurali: 'Yasal 14 gün — iade kargosu n11 öder. Satıcı 30 iş günü inceleme süresi.',
    ozelNotlar: ['REST ile sadece Picking (onay) durumu güncellenir', 'Tam sipariş yönetimi SOAP gerektirir', 'REST sipariş verisi Kasım 2024 sonrası', 'Webhook desteği YOK — polling zorunlu'],
  },
]

// ══════════════════════════════════════════
// 4. KOMİSYON ORANLARI (2025-2026)
// ══════════════════════════════════════════

export interface KomisyonSatiri {
  kategori: string
  trendyol: string; hepsiburada: string; n11: string
}

export const KOMISYON_ORANLARI: KomisyonSatiri[] = [
  { kategori: 'Elektronik (telefon, laptop)', trendyol: '%8-15', hepsiburada: '%4,5-8,5', n11: '%5,5-8' },
  { kategori: 'Moda / Giyim', trendyol: '%15-28', hepsiburada: '%18', n11: '%13-18' },
  { kategori: 'Ev & Yaşam', trendyol: '%10-21', hepsiburada: '%17-22', n11: '%12-18' },
  { kategori: 'Kozmetik & Kişisel Bakım', trendyol: '%10-20', hepsiburada: '%15', n11: '%8-18' },
  { kategori: 'Beyaz Eşya', trendyol: '~%10', hepsiburada: '%8,5', n11: '~%8' },
  { kategori: 'Kitap', trendyol: '%10-15', hepsiburada: '%13', n11: '%6,5-17' },
  { kategori: 'Telefon Aksesuarları', trendyol: '~%20', hepsiburada: '%20-23', n11: '%5-15' },
  { kategori: 'Süpermarket / Market', trendyol: '%5-10', hepsiburada: '%15', n11: 'N/A' },
]

export const KOMISYON_DETAYLARI = {
  trendyol: {
    indirimler: 'Level 4: %2,5-7 indirim. Level 5: %10 indirim. Kadın Girişimci programı: %1,80-5,50.',
    odeme: 'Sipariş onayından 7-28 gün sonra (kategoriye göre)',
    ekUcret: 'Kurulum/aylık ücret YOK',
  },
  hepsiburada: {
    indirimler: 'Komisyon üzerine KDV eklenir (%18 komisyon → ~%21,24 efektif). Birim başı ~0,50₺ hizmet bedeli.',
    odeme: 'Elektronik: teslimat+14 gün. Diğer: teslimat+28 gün.',
    ekUcret: 'Cep telefonu en düşük komisyon (%4,5)',
  },
  n11: {
    indirimler: 'Pazarlama hizmet bedeli (~%0,8-1,2) + pazaryeri hizmet bedeli (~%0,8) ek olarak alınır.',
    odeme: 'Haftalık Perşembe / Ayda 3., 13., 23. gün. Erken ödeme: 8.0+ mağaza puanı, min 10.000₺.',
    ekUcret: 'Taksitli alımlarda satıcı tam tutar alır',
  },
} as const

export const STOPAJ_NOTU = 'Ocak 2025 itibariyle 7524 sayılı Kanun: pazaryerleri satıcı ödemelerinden stopaj (e-ticaret tevkifat vergisi) kesintisi yapar.' as const

// ══════════════════════════════════════════
// 5. STOK SENKRONİZASYONU
// ══════════════════════════════════════════

export const STOK_SENK = {
  strateji: 'Merkezi stok havuzu + güvenlik stoku (buffer stock)',
  formul: 'Güvenlik Stoku = (Maks Günlük Satış × Maks Tedarik Süresi) - (Ort Günlük Satış × Ort Tedarik Süresi)',
  ornek: 'Gerçek stok 50 birim → 45 birim yayınla (5 birim tampon)',
  riskler: ['Black Friday / 11.11 senkron gecikmeleri → aşırı satış', 'Hepsiburada: tekrarlı stoksuz iptal → kara liste', 'Tüm platformlar: BuyBox kaybı, suspense, kalıcı yasaklama'],
  cozumler: ['Saniye-seviye stok güncellemesi', 'Platform bazlı stok tahsis', 'Otomatik deaktivate (stok < güvenlik seviyesi)'],
} as const

// ══════════════════════════════════════════
// 6. MIDDLEWARE EKOSİSTEMİ
// ══════════════════════════════════════════

export const MIDDLEWARE_PLATFORMLARI = [
  { isim: 'Entegra (Sync Teknoloji)', ozellikler: '20+ pazaryeri desteği, Logo/Netsis/Mikro/SAP ERP entegrasyonu', fiyat: '~500-5.000+ ₺/ay (SKU sayısına göre)' },
  { isim: 'Sopyo', ozellikler: 'Çoklu pazaryeri yönetimi, stok senkronizasyonu', fiyat: 'Aylık abonelik' },
  { isim: 'Dopigo', ozellikler: 'Kategori eşleştirme, sipariş yönlendirme, kargo etiketi', fiyat: 'Aylık abonelik' },
  { isim: 'Sentos', ozellikler: 'Hızlı entegrasyon, temel özellikler', fiyat: 'Aylık abonelik' },
] as const

export const ETICARET_PLATFORMLARI = {
  ikas: 'Trendyol push, n11 çift yönlü, Hepsiburada sadece pull. Barcode/SKU eşleşmesi ile otomatik bağlantı.',
  ideasoft: 'App store yaklaşımı — pazaryeri başına ~10.000₺ tek seferlik.',
  ticimax: 'Marketplace V2 — ek ücret yok, 30.000+ işletme.',
} as const

// ══════════════════════════════════════════
// 7. KATEGORİ EŞLEŞTİRME
// ══════════════════════════════════════════

export const KATEGORI_ESLESTIRME = {
  zorluk: '1 numaralı entegrasyon zorluğu — her pazaryeri bağımsız taksonomi',
  trendyol: 'Tek API çağrısı ile tam ağaç. Yaprak seviye zorunlu. Haftalık güncelleme.',
  hepsiburada: 'Sayfalı sorgulama (parent-child traversal gerekir). Yaprak seviye zorunlu.',
  n11: 'Tek API çağrısı ile tam ağaç. Yaprak seviye zorunlu.',
  otoEslestirme: 'İsim bazlı otomatik eşleştirme sık BAŞARISIZ — isimlendirme farklılıkları. Manuel doğrulama standart pratik.',
  kepenk_cozum: 'AI-destekli kategori haritalama: ürün başlığı + açıklama → tüm platformlarda en uygun kategori önerisi',
} as const

// ══════════════════════════════════════════
// 8. 2025-2026 ÖNEMLİ DEĞİŞİKLİKLER
// ══════════════════════════════════════════

export const GUNCEL_DEGISIKLIKLER = [
  { platform: 'n11', degisiklik: 'REST API lansmanı (Kasım 2024+)', etki: 'SOAP\'a paralel modern arayüz. Ürün CRUD, fiyat/stok, kategori, sınırlı sipariş yönetimi. Tam sipariş REST aktif geliştirmede.' },
  { platform: 'Trendyol', degisiklik: 'Gateway göçü: api.trendyol.com → apigw.trendyol.com', etki: 'Tüm entegrasyonlar base URL güncellemeli. Uluslararası API desteği, mikro-ihracat ve çoklu mağaza (storeFrontCode).' },
  { platform: 'Hepsiburada', degisiklik: 'API modernizasyonu: granüler endpoint\'ler', etki: 'Tekil fiyat/stok/teslimat güncellemesi (tam listeleme gerekmez). Komisyon Sorgu API, kampanya API, hızlı ürün listeleme.' },
  { platform: 'Tümü', degisiklik: 'E-ticaret tevkifat vergisi (Kanun 7524, Ocak 2025)', etki: 'Pazaryerleri ödeme öncesi stopaj kesintisi. Ödeme hesaplama mantığına yeni katman.' },
] as const
