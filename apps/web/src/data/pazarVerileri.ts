/**
 * kepenk.ai — Pazar Verileri, Rakip Analizi & Konumlandırma
 * ═══════════════════════════════════════════════════════════
 * Kaynak: TESK/ESBİS, TÜİK, OECD, DataReportal 2025, IMF
 * Güncelleme sıklığı: Çeyreklik
 * Son güncelleme: Mart 2026
 */

// ══════════════════════════════════════════
// 1. PAZAR VERİLERİ
// ══════════════════════════════════════════

export interface PazarVerileri {
  esnafSayisi: number
  isyeriSayisi: number
  toplamKobi: number
  yeniAcilis2025: number
  sektorDagilimi: Record<string, number>
  dijitalOlgunluk: Record<string, string>
  ekonomi: Record<string, string>
  devletDestekleri: DevletDestegi[]
}

export interface DevletDestegi {
  id: string
  program: string
  kurum: string
  maxDestek: string
  hibeOrani?: string
  kapsam: string[]
  aciklama: string
}

export const PAZAR_VERILERI: PazarVerileri = {
  esnafSayisi: 2_275_943,
  isyeriSayisi: 2_549_031,
  toplamKobi: 3_700_000,
  yeniAcilis2025: 323_481,

  sektorDagilimi: {
    perakende_ticaret: 580_000,
    yeme_icme_lokantacilik: 139_000,
    bakkalcilik: 196_000,
    nakliyat: 170_000,
    berberlik_kuaforluk: 120_000,
    tamir_servis: 85_000,
    saglik_eczane: 35_000,
    diger: 950_943,
  },

  dijitalOlgunluk: {
    internetPenetrasyonu: '%90.9',
    akillTelefonPenetrasyonu: '%85+',
    whatsappPenetrasyonu: '%88.6',
    instagramPenetrasyonu: '%68.1',
    kobiWebSitesiOrani: '%48',
    kobiEticaretOrani: '%9.2',
    kobiBulutKullanimi: '%11.9',
    kobiAiKullanimi: '%2.8',
    esnafInstagramProfil: '%60-70',
    esnafWhatsappBusiness: '%40-50',
    esnafWebSitesi: '%15-20',
    esnafEticaret: '%5-8',
    esnafPOS: '%25-35',
    esnafRandevuSistemi: '%10-15',
    esnafCRM: '%2-5',
  },

  ekonomi: {
    gdpPerCapita2025: '$18,198',
    asgariUcret2026: '₺28,075/ay',
    enflasyon2025: '%40+',
    tlUsdKuru: '~38 TRY/USD',
    eticaretPazarBuyuklugu2024: '3 trilyon TRY (~$89.6B)',
    eticaretBuyume2024: '%61.7 YoY',
    mobilIslemPayi: '%72',
    kartliOdeme2024: '$420B',
  },

  devletDestekleri: [
    {
      id: 'kosgeb-dijital',
      program: 'KOBİ Dijital Dönüşüm Destek Programı',
      kurum: 'KOSGEB',
      maxDestek: '20,000,000 TRY',
      hibeOrani: '%100 faiz desteği',
      kapsam: ['IoT', 'bulut', 'AI', 'otomasyon', 'yazılım'],
      aciklama: 'Geri ödemeli kredi — faiz tamamen devlet tarafından karşılanır.',
    },
    {
      id: 'kosgeb-kobigel',
      program: 'KOBİGEL İmalat Sanayii Dijitalleşme',
      kurum: 'KOSGEB',
      maxDestek: '1,000,000 TRY/işletme',
      hibeOrani: '%60-80 hibe',
      kapsam: ['dijitalleşme', 'imalat'],
      aciklama: 'Geri ödemesiz hibe.',
    },
    {
      id: 'tobb-akilli-kobi',
      program: 'Akıllı KOBİ Platformu',
      kurum: 'TOBB',
      maxDestek: 'Değişken',
      kapsam: ['dijital ürün', 'eğitim', 'destek'],
      aciklama: '1,500+ dijital ürün/hizmet, 300,000+ KOBİ erişimi. Google, Microsoft, Vodafone ortaklığı.',
    },
  ],
}

// ══════════════════════════════════════════
// 2. RAKİP ANALİZİ
// ══════════════════════════════════════════

export type RakipKategori = 'eticaret' | 'restoran_pos' | 'randevu' | 'crm_muhasebe' | 'global' | 'ai_builder'
export type TehditSeviyesi = 'sifir' | 'dusuk' | 'dusuk_orta' | 'orta' | 'orta_yuksek' | 'yuksek'

export interface Rakip {
  id: string
  ad: string
  kategori: RakipKategori
  kurulus?: number
  kullaniciSayisi?: string
  fiyatlandirma: { tier: string; fiyat: string }[]
  gucluYanlar: string[]
  zayifYanlar: string[]
  tehditSeviyesi: TehditSeviyesi
  turkiyeMevcut: boolean
  vsKepenk: string // Positioning cümlesi
}

export const RAKIPLER: Rakip[] = [
  // ── E-Ticaret ──
  {
    id: 'ikas', ad: 'ikas', kategori: 'eticaret', kurulus: 2017,
    kullaniciSayisi: '100,000+',
    fiyatlandirma: [
      { tier: 'Starter', fiyat: '₺0/ay (ücretsiz — sınırlı)' },
      { tier: 'Basic', fiyat: '₺659/ay' },
      { tier: 'Standard', fiyat: '₺1,649/ay' },
      { tier: 'Professional', fiyat: '₺3,329/ay' },
    ],
    gucluYanlar: [
      'Ücretsiz başlangıç tier\'ı — en agresif Türk freemium',
      'Headless mimari (API-first)',
      'N11, Trendyol, Hepsiburada marketplace entegrasyonu',
      'IFC (World Bank) $23.5M fonlama',
    ],
    zayifYanlar: [
      'SADECE e-ticaret — randevu, POS, restaurant yok',
      'WhatsApp AI müşteri temsilcisi yok',
      'CRM ve pazarlama otomasyonu yok',
      'AI site oluşturma yok',
      'Hizmet sektörlerine uygun değil',
    ],
    tehditSeviyesi: 'orta_yuksek',
    turkiyeMevcut: true,
    vsKepenk: 'ikas size online mağaza verir. kepenk.ai tüm işletmenizi verir.',
  },
  {
    id: 'ideasoft', ad: 'IdeaSoft', kategori: 'eticaret', kurulus: 2005,
    kullaniciSayisi: '50,000+',
    fiyatlandirma: [
      { tier: 'Starter', fiyat: '₺2,158/ay' },
      { tier: 'Growth', fiyat: '₺3,408/ay' },
      { tier: 'Scale', fiyat: '₺4,575/ay' },
    ],
    gucluYanlar: ['En geniş müşteri tabanı (20 yıl)', 'Güçlü marketplace entegrasyonları'],
    zayifYanlar: ['Kurucu ekip ayrıldı', 'Eski teknoloji stack', 'Yüksek giriş fiyatı', 'AI özelliği yok'],
    tehditSeviyesi: 'orta',
    turkiyeMevcut: true,
    vsKepenk: 'IdeaSoft pahalı ve karmaşık. kepenk.ai esnaf için tasarlandı — basit, AI-destekli, ₺999\'dan.',
  },
  {
    id: 'ticimax', ad: 'Ticimax', kategori: 'eticaret', kurulus: 2005,
    kullaniciSayisi: '30,000+',
    fiyatlandirma: [{ tier: 'Başlangıç', fiyat: '~₺2,900/ay' }],
    gucluYanlar: ['Büyük markalar (Koton, Karaca)', 'Güçlü B2B'],
    zayifYanlar: ['KOBİ/esnaf için çok pahalı', 'Sadece e-ticaret'],
    tehditSeviyesi: 'dusuk',
    turkiyeMevcut: true,
    vsKepenk: 'Ticimax büyük markalar için. kepenk.ai esnafın yanında.',
  },

  // ── Restoran POS ──
  {
    id: 'adisyo', ad: 'Adisyo', kategori: 'restoran_pos',
    fiyatlandirma: [
      { tier: 'Lite', fiyat: '₺955/ay +KDV' },
      { tier: 'Standard', fiyat: '₺1,410/ay +KDV' },
      { tier: 'Pro', fiyat: '₺1,955/ay +KDV' },
    ],
    gucluYanlar: ['Temiz bulut mimarisi', 'İş Bankası dağıtım ortaklığı'],
    zayifYanlar: ['SADECE restoran', 'WhatsApp AI yok', 'Web sitesi yok', 'CRM yok', 'Sadakat programı yok'],
    tehditSeviyesi: 'orta',
    turkiyeMevcut: true,
    vsKepenk: 'Adisyo sadece adisyon tutar. kepenk.ai restoranınızın tüm dijital dünyasını yönetir.',
  },
  {
    id: 'narpos', ad: 'NarPOS', kategori: 'restoran_pos', kurulus: 2012,
    kullaniciSayisi: '14,000+',
    fiyatlandirma: [
      { tier: 'POS Yazılımı', fiyat: '₺1,716/yıl (~₺143/ay)' },
      { tier: 'QR Menü', fiyat: '₺2,160-₺3,588/yıl' },
    ],
    gucluYanlar: ['Türkiye\'nin en geniş restoran POS ağı', 'Banka ortaklıkları ile ücretsiz donanım'],
    zayifYanlar: ['Web sitesi yok', 'CRM/pazarlama yok', 'WhatsApp yok', 'AI yok'],
    tehditSeviyesi: 'dusuk_orta',
    turkiyeMevcut: true,
    vsKepenk: 'NarPOS sadece kasa. kepenk.ai restoranınızı WhatsApp\'tan yönetmenizi sağlar.',
  },

  // ── Randevu ──
  {
    id: 'kolayrandevu', ad: 'KolayRandevu / SalonAppy', kategori: 'randevu',
    kullaniciSayisi: '16,000+',
    fiyatlandirma: [{ tier: 'Başlangıç', fiyat: '~₺600/ay' }],
    gucluYanlar: ['Türkiye\'nin en geniş salon ağı', 'WhatsApp bildirim desteği'],
    zayifYanlar: ['SADECE güzellik sektörü', 'Web sitesi yok', 'E-ticaret yok', 'AI yok'],
    tehditSeviyesi: 'dusuk_orta',
    turkiyeMevcut: true,
    vsKepenk: 'KolayRandevu sadece randevu alır. kepenk.ai randevu + site + CRM + kampanya = tek platform.',
  },
  {
    id: 'salonrandevu', ad: 'SalonRandevu', kategori: 'randevu',
    fiyatlandirma: [
      { tier: 'Silver', fiyat: '₺779/ay' },
      { tier: 'Diamond', fiyat: '₺3,480/ay (WhatsApp dahil)' },
    ],
    gucluYanlar: ['WhatsApp entegrasyonu (üst tier)', 'Personel prim hesaplama'],
    zayifYanlar: ['Sadece salon/kuaför', 'Web sitesi yok', 'AI yok'],
    tehditSeviyesi: 'dusuk',
    turkiyeMevcut: true,
    vsKepenk: 'SalonRandevu ₺3,480\'de WhatsApp veriyor. kepenk.ai ₺999\'dan WhatsApp AI dahil.',
  },

  // ── Global ──
  {
    id: 'wix', ad: 'Wix', kategori: 'global',
    kullaniciSayisi: '282,000,000+',
    fiyatlandirma: [
      { tier: 'Light', fiyat: '$17/ay (₺646)' },
      { tier: 'Business', fiyat: '$36/ay (₺1,368)' },
      { tier: 'Business Elite', fiyat: '$159/ay (₺6,042)' },
    ],
    gucluYanlar: ['Dünyanın en büyük site builder', 'Wix Harmony AI', 'Base44 akizisyonu ($80M)'],
    zayifYanlar: ['WhatsApp entegrasyonu YOK', 'Türk ödeme/kargo/fatura YOK', 'Türkçe AI kalitesi düşük', 'POS sığ'],
    tehditSeviyesi: 'orta_yuksek',
    turkiyeMevcut: true,
    vsKepenk: 'Wix İngilizce düşünür. kepenk.ai Türkçe konuşur, WhatsApp\'tan yönetir, taksit çeker.',
  },
  {
    id: 'shopify', ad: 'Shopify', kategori: 'global',
    fiyatlandirma: [
      { tier: 'Basic', fiyat: '$39/ay (₺1,482)' },
      { tier: 'Advanced', fiyat: '$399/ay (₺15,162)' },
    ],
    gucluYanlar: ['Dünyanın en güçlü e-ticaret ekosistemi', '8,000+ app'],
    zayifYanlar: ['Shopify Payments TR\'de YOK — %2 ek komisyon', 'e-Fatura YOK', 'Türkçe destek YOK'],
    tehditSeviyesi: 'dusuk_orta',
    turkiyeMevcut: true,
    vsKepenk: 'Shopify ayda ₺1,500+ ve her şey İngilizce. kepenk.ai ₺999\'dan, her şey Türkçe.',
  },
  {
    id: 'square', ad: 'Square', kategori: 'global',
    fiyatlandirma: [{ tier: 'Free', fiyat: '$0 + %2.6+10¢ komisyon' }],
    gucluYanlar: ['Hepsi-bir-arada (POS+Restaurant+Appointments+Loyalty)', '2024 $6.3B gelir'],
    zayifYanlar: ['Türkiye\'de MEVCUT DEĞİL', 'WhatsApp AI yok'],
    tehditSeviyesi: 'sifir',
    turkiyeMevcut: false,
    vsKepenk: 'kepenk.ai, Türkiye\'nin Square\'i — ama WhatsApp-native ve AI-first.',
  },

  // ── AI Builder ──
  {
    id: 'durable', ad: 'Durable', kategori: 'ai_builder',
    kullaniciSayisi: '3,000,000+',
    fiyatlandirma: [{ tier: 'Starter', fiyat: '$15/ay' }, { tier: 'Business', fiyat: '$95/ay' }],
    gucluYanlar: ['AI-first — 30 saniyede site', '$20M+ fonlama', 'CRM + faturalama dahil'],
    zayifYanlar: ['Sınırlı tasarım özelleştirme', 'POS yok', 'Türkçe yok', 'WhatsApp yok'],
    tehditSeviyesi: 'dusuk',
    turkiyeMevcut: false,
    vsKepenk: 'Durable sığ ama geniş. kepenk.ai derin, Türkçe ve WhatsApp-native.',
  },
]

// ══════════════════════════════════════════
// 3. ÖZELLİK KARŞILAŞTIRMA MATRİSİ
// ══════════════════════════════════════════

export type OzellikDurumu = 'native' | 'kismi' | 'yok' | 'en_guclu'

export interface OzellikKarsilastirma {
  ozellik: string
  ozellikTR: string
  kepenk: OzellikDurumu
  rakipler: Record<string, OzellikDurumu>
}

export const OZELLIK_MATRISI: OzellikKarsilastirma[] = [
  {
    ozellik: 'ai_site_builder', ozellikTR: 'AI Site Oluşturucu',
    kepenk: 'native',
    rakipler: { ikas: 'yok', adisyo: 'yok', kolayrandevu: 'yok', wix: 'native', shopify: 'kismi', durable: 'native' },
  },
  {
    ozellik: 'eticaret', ozellikTR: 'E-Ticaret',
    kepenk: 'native',
    rakipler: { ikas: 'en_guclu', adisyo: 'yok', kolayrandevu: 'yok', wix: 'native', shopify: 'en_guclu', durable: 'yok' },
  },
  {
    ozellik: 'restoran_os', ozellikTR: 'Restoran OS',
    kepenk: 'native',
    rakipler: { ikas: 'yok', adisyo: 'en_guclu', narpos: 'en_guclu', wix: 'kismi', shopify: 'yok', square: 'native' },
  },
  {
    ozellik: 'randevu_booking', ozellikTR: 'Randevu & Booking',
    kepenk: 'native',
    rakipler: { ikas: 'yok', adisyo: 'yok', kolayrandevu: 'en_guclu', wix: 'native', shopify: 'yok', square: 'native' },
  },
  {
    ozellik: 'whatsapp_ai', ozellikTR: 'WhatsApp AI Temsilci',
    kepenk: 'native',
    rakipler: { ikas: 'yok', adisyo: 'yok', kolayrandevu: 'kismi', wix: 'yok', shopify: 'yok', square: 'yok', durable: 'yok' },
  },
  {
    ozellik: 'crm_otomasyon', ozellikTR: 'CRM & Otomasyon',
    kepenk: 'native',
    rakipler: { ikas: 'kismi', adisyo: 'yok', kolayrandevu: 'kismi', wix: 'kismi', shopify: 'kismi', square: 'kismi' },
  },
  {
    ozellik: 'mobil_pos', ozellikTR: 'Mobil POS',
    kepenk: 'native',
    rakipler: { ikas: 'yok', adisyo: 'native', narpos: 'en_guclu', wix: 'kismi', shopify: 'native', square: 'en_guclu' },
  },
  {
    ozellik: 'sadakat_programi', ozellikTR: 'Sadakat Programı',
    kepenk: 'native',
    rakipler: { ikas: 'yok', adisyo: 'yok', narpos: 'yok', wix: 'native', shopify: 'yok', square: 'kismi' },
  },
  {
    ozellik: 'e_fatura', ozellikTR: 'e-Fatura / e-Arşiv',
    kepenk: 'native',
    rakipler: { ikas: 'native', ideasoft: 'native', adisyo: 'kismi', wix: 'yok', shopify: 'yok', square: 'yok' },
  },
  {
    ozellik: 'collective_intelligence', ozellikTR: 'Cross-Esnaf AI Öğrenme',
    kepenk: 'native',
    rakipler: { ikas: 'yok', adisyo: 'yok', wix: 'yok', shopify: 'yok', square: 'yok', durable: 'yok' },
  },
  {
    ozellik: 'turkiye_lokalizasyonu', ozellikTR: 'Türkiye Lokalizasyonu',
    kepenk: 'en_guclu',
    rakipler: { ikas: 'native', ideasoft: 'native', adisyo: 'native', wix: 'kismi', shopify: 'kismi', square: 'yok' },
  },
]

// ══════════════════════════════════════════
// 4. KONUMLANDIRMA
// ══════════════════════════════════════════

export const KONUMLANDIRMA = {
  tagline: 'Esnafın AI İş Ortağı',
  oneLiner: 'Tek platform, tüm işletme — web sitesi, e-ticaret, WhatsApp AI, POS, randevu, CRM, pazarlama.',

  positioningStatement: `kepenk.ai, Türkiye'nin 2.28 milyon esnafı için tasarlanmış AI-destekli hepsi-bir-arada işletme yönetim platformudur. Mevcut nokta çözümlerinin hiçbirinin tek başına çözemediği sorunu çözer: dijital okuryazarlığı düşük işletme sahiplerinin WhatsApp üzerinden konuşarak tüm dijital varlıklarını kurmasını, yönetmesini ve büyütmesini sağlar.`,

  valueProps: [
    { id: 'vp1', baslik: '10 Dakikada Online', aciklama: 'AI, WhatsApp\'ta 5 soru sorar — siteniz hazır.', kanit: 'Berber → randevu sayfası, Restoran → dijital menü, Doktor → hasta randevusu' },
    { id: 'vp2', baslik: 'Tek Platform, Tek Fatura', aciklama: 'Web sitesi + POS + Randevu + CRM + Pazarlama — hepsi tek abonelik.', kanit: 'Rakiplerde 5-7 ayrı yazılım = ₺3,000-₺8,000/ay. kepenk.ai = ₺999\'dan.' },
    { id: 'vp3', baslik: 'WhatsApp\'tan Yönet', aciklama: 'Müşteri randevusu, sipariş takibi, kampanya — hepsi WhatsApp\'tan.', kanit: 'WhatsApp açma oranı %98 vs email %20.' },
    { id: 'vp4', baslik: 'AI İş Danışmanı', aciklama: 'Mevsimsel kampanya önerileri, rakip radar, dijital sağlık skoru.', kanit: 'Cross-esnaf veriden öğrenir.' },
    { id: 'vp5', baslik: 'Devlet Desteği ile Dijitalleş', aciklama: 'KOSGEB dijital dönüşüm kredisi ile kepenk.ai maliyetini devlet karşılasın.', kanit: '20M TRY\'ye kadar %100 faiz destekli kredi.' },
  ],

  vsRakip: {
    ikas: 'ikas size online mağaza verir. kepenk.ai tüm işletmenizi verir.',
    adisyo: 'Adisyo sadece adisyon tutar. kepenk.ai restoranınızın tüm dijital dünyasını yönetir.',
    wix: 'Wix İngilizce düşünür. kepenk.ai Türkçe konuşur, WhatsApp\'tan yönetir, taksit çeker.',
    shopify: 'Shopify ayda ₺1,500+ ve her şey İngilizce. kepenk.ai ₺999\'dan, her şey Türkçe.',
    kolayrandevu: 'KolayRandevu sadece randevu alır. kepenk.ai randevu + site + CRM + kampanya = tek platform.',
    hicbiri: 'WhatsApp\'a mesaj yazar gibi işletmeni kur.',
  },
} as const

// ══════════════════════════════════════════
// 5. HENDEK MİMARİSİ
// ══════════════════════════════════════════

export const HENDEK_KATMANLARI = [
  { katman: 1, ad: 'İş Akışı Gömülme', sure: '0-6 ay', olcum: 'Haftalık 5+ gün giriş yapan esnaf oranı >%60', taklitZorlugu: 'Orta' },
  { katman: 2, ad: 'Veri Birikimi', sure: '3-12 ay', olcum: '6 ay+ veri biriken esnaf churn <%2/ay', taklitZorlugu: 'Yüksek' },
  { katman: 3, ad: 'AI Öğrenme Döngüsü', sure: '6-24 ay', olcum: 'AI önerisi uygulayan esnaf gelir artışı >%15', taklitZorlugu: 'Çok Yüksek' },
  { katman: 4, ad: 'Ağ Etkileri', sure: '12-36 ay', olcum: '2+ kepenk.ai esnafı ile etkileşen tüketici sayısı', taklitZorlugu: 'Çok Yüksek' },
  { katman: 5, ad: 'Gömülü Finans', sure: '18-48 ay', olcum: 'Finans ürünü kullanan esnaf >%30', taklitZorlugu: 'Çok Yüksek' },
] as const

// ══════════════════════════════════════════
// 6. HEDEF METRİKLER
// ══════════════════════════════════════════

export const HEDEF_METRIKLER = {
  edinme: { cacHedef: '₺500-₺1,500', cacPayback: '<12 ay', ltvCacOrani: '≥3:1' },
  aktivasyon: { profilYayindaGun1: '>%50', ilkOdemeGun30: '>%15 → >%20' },
  gelir: { arpuBaslangic: '₺800/ay', arpu12ay: '₺1,200/ay', arpu24ay: '₺1,800/ay' },
  retention: { aylikChurn: '<%5 → <%3 → <%2', nrr: '>%100 → >%105', nps: '>30 → >40 → >50' },
  buyume: { aktifEsnaf6ay: 5_000, aktifEsnaf12ay: 25_000, aktifEsnaf24ay: 100_000, mrr12ay: '₺30M', arr24ay: '₺2.16B' },
} as const

// ══════════════════════════════════════════
// 7. YATIRIMCI HİKAYESİ
// ══════════════════════════════════════════

export const YATIRIMCI_HIKAYESI = {
  oneLiner: 'kepenk.ai, Türkiye\'nin 2.28 milyon esnafı için WhatsApp-native, AI-first hepsi-bir-arada işletme platformu — Türkiye\'nin Square\'i.',
  pazar: { tam: '₺32.8B/yıl (2.28M esnaf × ₺14,400)', sam: '₺7.2B/yıl (500K hizmet sektörü)', som3yil: '₺2.16B ARR (100K esnaf)' },
  birimEkonomi: { arpuHedef: '₺1,200/ay', cacHedef: '₺1,000', ltv: '₺28,800 (24 ay)', ltvCac: '28.8:1', brutKarMarji: '%80+' },
  nedenSimdi: [
    'AI maliyeti %90 düştü',
    'KOSGEB 20M TRY dijitalleşme kredisi',
    'e-Fatura zorunluluğu genişliyor',
    'WhatsApp Business API maliyeti düştü',
    'IdeaSoft kurucuları ayrıldı — pazar açığı',
  ],
} as const

// ══════════════════════════════════════════
// 8. SEKTÖR ÖNCELİKLENDİRME
// ══════════════════════════════════════════

export const SEKTOR_ONCELIKLENDIRME = {
  faz1: { donem: 'Ay 0-6', sektorler: ['Berber & Kuaför (~120K salon)', 'Restoran & Kafe (~139K lokantacılık)'], hedef: 'İstanbul pilot — Kadıköy, Beşiktaş, Bakırköy' },
  faz2: { donem: 'Ay 6-12', sektorler: ['Doktor & Diş hekimi', 'Oto tamir & servis', 'Spor salonu & PT'], hedef: 'İstanbul genişleme + Ankara, İzmir' },
  faz3: { donem: 'Ay 12-24', sektorler: ['Fotoğrafçı', 'Özel ders / eğitim', 'Eczane', 'Bakkal & market', 'Perakende genel'], hedef: 'İlk 10 il + TESK ortaklığı ile ulusal erişim' },
} as const

// ══════════════════════════════════════════
// 9. TEHDİT DEĞERLENDİRMESİ
// ══════════════════════════════════════════

export const TEHDIT_DEGERLENDIRMESI = {
  yuksek: [
    { id: 'wix-harmony', senaryo: 'Wix Türkçe AI + WhatsApp + Türk ödeme ekler', olasilik: '%15-25', savunma: 'Hız: 50K+ esnaf yakalamak, derinlik: sektör-spesifik özellikler' },
    { id: 'ikas-genisleme', senaryo: 'ikas $23.5M ile booking/POS/CRM\'e genişler', olasilik: '%30-40', savunma: 'Hizmet sektöründen başla — ikas\'ın en zayıf noktası' },
  ],
  orta: [
    { id: 'turk-telekom-wix', senaryo: 'Türk Telekom + Wix agresifleşir', olasilik: '%10-15', savunma: 'Telekom SaaS dağıtım başarı oranı düşük' },
    { id: 'banka-super-app', senaryo: 'Banka esnaf super app çıkarır', olasilik: '%20-30', savunma: 'Bankalar yazılım yapamaz — ortaklık fırsatı' },
  ],
  dusuk: [
    { id: 'shopify-tr', senaryo: 'Shopify Türkiye derinleşir', olasilik: '%5-10', savunma: 'Esnaf kitlesi için çok pahalı/karmaşık' },
    { id: 'square-tr', senaryo: 'Square Türkiye\'ye girer', olasilik: '<%5', savunma: 'Ödeme lisansı yok, donanım bağımlı' },
  ],
  fırsatPenceresi: { wixHarmony: '18-24 ay', ikasSeriesB: '12-18 ay', bankaSuperApp: '24-36 ay' },
} as const
