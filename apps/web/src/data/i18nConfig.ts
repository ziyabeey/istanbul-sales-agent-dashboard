/**
 * kepenk.ai — Çoklu Dil & Lokalizasyon (i18n) Konfigürasyonu
 * ═══════════════════════════════════════════════════════════
 * 7 dil, RTL, AI çeviri, hreflang, turist bölgesi, veri modeli.
 */

// ══════════════════════════════════════════
// 1. STACK & DESTEKLENEN DİLLER
// ══════════════════════════════════════════

export const I18N_STACK = {
  framework: 'next-intl (Next.js native i18n)',
  ceviriler: 'JSON dosyaları (statik UI) + Firestore (dinamik içerik)',
  aiCeviri: 'Claude Sonnet (sektör-bazlı bağlamsal çeviri)',
  urlStratejisi: 'Subdirectory (/en/, /ar/, /de/)',
  varsayilanDil: 'tr (Türkçe)',
} as const

export interface DilTanimi { kod: string; isim: string; yerelIsim: string; yon: 'LTR' | 'RTL'; oncelik: number; varsayilan?: boolean; gelecek?: boolean }

export const DESTEKLENEN_DILLER: DilTanimi[] = [
  { kod: 'tr', isim: 'Turkish', yerelIsim: 'Türkçe', yon: 'LTR', oncelik: 1, varsayilan: true },
  { kod: 'en', isim: 'English', yerelIsim: 'English', yon: 'LTR', oncelik: 2 },
  { kod: 'ar', isim: 'Arabic', yerelIsim: 'العربية', yon: 'RTL', oncelik: 3 },
  { kod: 'ku', isim: 'Kurdish', yerelIsim: 'Kurdî', yon: 'LTR', oncelik: 4 },
  { kod: 'ru', isim: 'Russian', yerelIsim: 'Русский', yon: 'LTR', oncelik: 5 },
  { kod: 'de', isim: 'German', yerelIsim: 'Deutsch', yon: 'LTR', oncelik: 6 },
  { kod: 'fa', isim: 'Persian', yerelIsim: 'فارسی', yon: 'RTL', oncelik: 7, gelecek: true },
]

export const PLAN_KISITLAMA = {
  baslangic: 'Sadece Türkçe',
  buyume: 'Türkçe + 1 ek dil',
  profesyonel: 'Türkçe + 3 ek dil',
  kurumsal: 'Sınırsız dil',
} as const

// ══════════════════════════════════════════
// 2. URL YAPISI & ROUTING
// ══════════════════════════════════════════

export const URL_YAPISI = {
  strateji: 'Subdirectory (alt dizin)',
  neden: 'Subdomain → ayrı DNS/SSL/SEO bölünür. Subdirectory → tek domain, birleşik SEO, kolay yönetim.',
  ornekler: [
    { dil: 'Türkçe (varsayılan)', url: 'ahmetberber.kepenk.site/' },
    { dil: 'İngilizce', url: 'ahmetberber.kepenk.site/en/' },
    { dil: 'Arapça', url: 'ahmetberber.kepenk.site/ar/' },
    { dil: 'Almanca', url: 'ahmetberber.kepenk.site/de/' },
  ],
  hreflang: 'Her sayfada <link rel="alternate" hreflang="xx" /> + x-default → Türkçe',
  dilSecici: { konum: 'Header sağ üst', gorunum: 'Bayrak + dil adı (🇹🇷 Türkçe)', cookie: 'localStorage tercih', otomatikTespit: 'Accept-Language header → "View in English?" banner' },
} as const

// ══════════════════════════════════════════
// 3. ÇEVİRİ MİMARİSİ
// ══════════════════════════════════════════

export const CEVIRI_KATMANLARI = [
  { katman: 'Statik UI', kaynak: 'JSON — packages/ui/locales/{locale}.json', yonetim: 'Geliştirici günceller', ornekler: { tr: { add_to_cart: 'Sepete Ekle', book_now: 'Randevu Al' }, en: { add_to_cart: 'Add to Cart', book_now: 'Book Now' }, ar: { add_to_cart: 'أضف إلى السلة', book_now: 'احجز الآن' } } },
  { katman: 'Dinamik İçerik', kaynak: 'Firestore — entity.i18n alanı', yonetim: 'AI çeviri + esnaf düzenleme', ornekler: 'products/{id}.i18n.en.name = "Men\'s Haircut"' },
  { katman: 'SEO Meta', kaynak: 'Firestore — sayfa bazlı i18n SEO', yonetim: 'AI çeviri (SEO-optimize)' },
]

export const AI_CEVIRI = {
  model: 'Claude Sonnet',
  nedenAi: 'Google Translate: kelime kelime → bağlam yok. Claude: sektör bağlamı + ton + kültürel uyum = profesyonel.',
  kurallar: ['Doğal, akıcı çeviri (kelime kelime DEĞİL)', 'Sektör terminolojisine uygun', 'Kültürel adaptasyon (Türk yemek → açıklamalı)', 'Fiyatlar TRY kalır (dönüştürme YAPMA)', 'Adres ve telefon DEĞİŞMEZ', 'SEO anahtar kelimeleri hedef dilde doğal ekle'],
  ozelKurallar: {
    menuCeviri: 'Tanınmayan Türk yemek: orijinal + parantez açıklama ("Adana Kebap (Spicy minced meat kebab on skewer)")',
    hizmetCeviri: 'Profesyonel terim: "Cilt Bakımı" → "Facial Treatment" (Skin Care DEĞİL)',
    arapcaOzel: 'RTL yön, Batı rakamları tercih (1,2,3), ₺ sembolü korunur',
  },
  topluCeviri: { akis: ['Esnaf "Çeviri Ekle" tıklar + dil seçer', 'AI tüm sayfaları toplu çevirir (arka plan)', 'Tamamlanınca WhatsApp bildirimi', 'Esnaf önizler + düzenler + yayınlar'], sure: '50 sayfa <5 dakika', maliyet: '~$0.50-$1.00 per site (Sonnet)' },
} as const

// ══════════════════════════════════════════
// 4. RTL DESTEK
// ══════════════════════════════════════════

export const RTL_DESTEK = {
  etkilenenDiller: ['ar (Arapça)', 'fa (Farsça)'],
  html: '<html lang="ar" dir="rtl">',
  cssStratejisi: {
    yontem: 'CSS Logical Properties (Tailwind RTL plugin)',
    kurallar: ['margin-inline-start (margin-left yerine)', 'padding-inline-end (padding-right yerine)', 'text-align: start (left yerine)', 'float: start (left yerine)', 'border-inline-start (border-left yerine)'],
    anaKural: 'TÜM yeni CSS\'te logical properties kullan → RTL otomatik çalışır.',
  },
  layout: { header: 'Logo sağda, menü solda (RTL\'de ters)', sidebar: 'Sağ → sol', formLabel: 'Sağ hizalı', inputText: 'Sağdan sola' },
  ikonlar: { yonBagimsiz: '✓ ✗ ⭐ 📞 📍 (değişmez)', yonBagimli: '← → ArrowLeft ↔ ArrowRight swap' },
  test: ['Her component RTL modda test', 'Storybook RTL story', 'Playwright dir="rtl" E2E'],
} as const

// ══════════════════════════════════════════
// 5. TURİST BÖLGESİ OPTİMİZASYONU
// ══════════════════════════════════════════

export interface TuristBolgesi { bolge: string; ilceler: string[]; onerilenDiller: string[] }

export const TURIST_BOLGELERI: TuristBolgesi[] = [
  { bolge: 'İstanbul', ilceler: ['Sultanahmet', 'Fatih', 'Beyoğlu', 'Taksim', 'Karaköy', 'Balat'], onerilenDiller: ['en', 'ar'] },
  { bolge: 'Kapadokya', ilceler: ['Göreme', 'Ürgüp', 'Avanos'], onerilenDiller: ['en', 'ja', 'ko'] },
  { bolge: 'Antalya', ilceler: ['Kaleiçi', 'Lara', 'Konyaaltı', 'Side', 'Alanya'], onerilenDiller: ['en', 'de', 'ru'] },
  { bolge: 'Bodrum', ilceler: ['Bodrum Merkez', 'Gümbet', 'Turgutreis'], onerilenDiller: ['en', 'de'] },
  { bolge: 'İzmir', ilceler: ['Alsancak', 'Konak', 'Çeşme', 'Alaçatı'], onerilenDiller: ['en'] },
]

export const TURIST_OZELLIKLERI = {
  otomatikOneri: 'Esnaf konumu turist bölgesiyse → dashboard banner: "İngilizce menü ekleyin → daha fazla müşteri"',
  qrMenuCokluDil: ['Müşteri QR tarar', 'Accept-Language → dil tespit', 'Menü o dilde açılır (çeviri varsa)', 'Dil seçici ile manuel değiştirebilir'],
} as const

// ══════════════════════════════════════════
// 6. DASHBOARD LOKALIZASYONU
// ══════════════════════════════════════════

export const DASHBOARD_I18N = {
  durum: 'FAZ 1: SADECE Türkçe (dashboard çok dilliliği düşük öncelik)',
  neden: 'Esnafların %99\'u Türkçe konuşuyor',
  gelecekFaz: { neZaman: 'Uluslararası genişleme (diaspora — Almanya, Hollanda)', diller: ['en', 'de', 'nl'], mekanik: 'next-intl JSON locale' },
  formatlar: { tarih: 'GG.AA.YYYY (Türk) vs MM/DD/YYYY (kullanıcı tercihi)', para: 'TRY (₺) varsayılan', sayi: 'Türk standardı (1.000,00)' },
} as const

// ══════════════════════════════════════════
// 7. VERİ MODELİ
// ══════════════════════════════════════════

export const I18N_VERI_MODELI = {
  entityI18n: 'Her entity\'ye i18n alanı: { [locale]: { name, description, ... } }',
  componentI18n: 'ComponentNode text data: { text: "Türkçe", i18n: { en: { text: "English" } } }',
  siteConfig: {
    defaultLocale: 'tr',
    enabledLocales: 'string[] (örn: ["tr", "en", "ar"])',
    translationStatus: '{ [locale]: { totalKeys, translatedKeys, lastUpdated, status: complete|partial|draft } }',
  },
  ornekProduct: '{ name: "Erkek Saç Kesimi", i18n: { en: { name: "Men\'s Haircut" }, ar: { name: "قص شعر رجالي" } } }',
} as const
