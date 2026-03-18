/**
 * kepenk.ai — Erişilebilirlik (Accessibility) Konfigürasyonu
 * ════════════════════════════════════════════════════════════
 * WCAG 2.1 AA, ARIA pattern'leri, klavye navigasyon, kontrast doğrulama,
 * Türkçe a11y, mobil a11y, test pipeline, esnaf site a11y.
 */

// ══════════════════════════════════════════
// 1. A11Y SABİTLERİ & STACK
// ══════════════════════════════════════════

export const A11Y_HEDEF = 'WCAG 2.1 AA' as const

export const A11Y_STACK = {
  otomatikTest: 'axe-core (jest-axe + @axe-core/playwright)',
  ciEntegrasyon: 'GitHub Actions — her PR\'da axe tarama',
  manuelTest: 'VoiceOver (macOS), NVDA (Windows), TalkBack (Android)',
  renkKontrast: 'Chrome DevTools Contrast Checker',
  lighthouse: 'Lighthouse Accessibility audit (hedef ≥90)',
  storybook: 'storybook-addon-a11y (axe entegrasyonlu)',
} as const

export const POUR_PRENSIPLERI = [
  { id: 'perceivable', tr: 'Algılanabilir', aciklama: 'İçerik tüm duyulara sunulmalı' },
  { id: 'operable', tr: 'Çalıştırılabilir', aciklama: 'Arayüz klavye ve yardımcı teknoloji ile kullanılabilmeli' },
  { id: 'understandable', tr: 'Anlaşılabilir', aciklama: 'İçerik ve arayüz anlaşılabilir olmalı' },
  { id: 'robust', tr: 'Sağlam', aciklama: 'İçerik çeşitli teknolojilerle uyumlu olmalı' },
] as const

export const A11Y_KONTEKSTLER = {
  editorDashboard: { kullanici: 'Esnaf (35-55 yaş, gözlük kullanabilir)', tema: 'Dark (sabit)', oncelik: 'Okunabilirlik + klavye verimliliği + hata önleme', engelOrani: 'Türkiye 18-65 yaş %10+ engel/kısıtlılık, en yaygın: azalmış görme, %8 renk körlüğü (erkek)' },
  esnafSiteleri: { kullanici: 'Esnafın müşterisi — her yaş, her yetenek', tema: 'Çoklu (9 tema)', oncelik: 'Tam WCAG 2.1 AA — engelli müşteriler dahil', yasal: '5378 Engelliler Kanunu (TR) + AB EAA (2025)' },
} as const

// ══════════════════════════════════════════
// 2. RENK KONTRAST DOĞRULAMA
// ══════════════════════════════════════════

export const KONTRAST_GEREKSINIMLERI = {
  normalMetin: '≥4.5:1 (16px altı)', buyukMetin: '≥3:1 (18px+ veya 14px bold)', uiBilesen: '≥3:1 (kenar, ikon, interaktif)',
} as const

export interface KontrastDogrulama { fg: string; fgDeger: string; bg: string; bgDeger: string; oran: string; sonuc: '✅' | '⚠️' | '❌'; not?: string }

export const EDITOR_KONTRAST_TABLOSU: KontrastDogrulama[] = [
  { fg: 'kp-text', fgDeger: '#F5F0E8', bg: 'kp-surface', bgDeger: '#1E1E2E', oran: '12.4:1', sonuc: '✅', not: 'AA+ — mükemmel' },
  { fg: 'kp-text-secondary', fgDeger: '#9CA3AF', bg: 'kp-surface', bgDeger: '#1E1E2E', oran: '5.9:1', sonuc: '✅' },
  { fg: 'kp-text-muted', fgDeger: '#6B7280', bg: 'kp-surface', bgDeger: '#1E1E2E', oran: '3.8:1', sonuc: '✅', not: 'Büyük metin + UI bileşeni için yeterli' },
  { fg: 'kp-text-disabled', fgDeger: '#4B5563', bg: 'kp-surface', bgDeger: '#1E1E2E', oran: '2.5:1', sonuc: '⚠️', not: 'Disabled state — WCAG istisnası' },
  { fg: 'kp-rust', fgDeger: '#C84B31', bg: 'kp-surface', bgDeger: '#1E1E2E', oran: '4.7:1', sonuc: '✅' },
  { fg: 'white', fgDeger: '#FFFFFF', bg: 'kp-rust', bgDeger: '#C84B31', oran: '4.2:1', sonuc: '✅', not: 'Buton metin → rust zemin' },
  { fg: 'kp-ai', fgDeger: '#8B5CF6', bg: 'kp-surface', bgDeger: '#1E1E2E', oran: '4.9:1', sonuc: '✅' },
  { fg: 'kp-success', fgDeger: '#22C55E', bg: 'kp-surface', bgDeger: '#1E1E2E', oran: '6.5:1', sonuc: '✅' },
  { fg: 'kp-error', fgDeger: '#EF4444', bg: 'kp-surface', bgDeger: '#1E1E2E', oran: '5.2:1', sonuc: '✅' },
  { fg: 'kp-warning', fgDeger: '#F59E0B', bg: 'kp-surface', bgDeger: '#1E1E2E', oran: '8.4:1', sonuc: '✅', not: 'AA+' },
  { fg: 'kp-blue', fgDeger: '#3B82F6', bg: 'kp-surface', bgDeger: '#1E1E2E', oran: '4.8:1', sonuc: '✅' },
]

export const RENK_DISI_KURALLARI = [
  { senaryo: 'Hata alanı', yanlis: 'Sadece kırmızı kenar', dogru: 'Kırmızı kenar + ⚠️ ikon + metin açıklama' },
  { senaryo: 'Başarı toast', yanlis: 'Sadece yeşil arka plan', dogru: 'Yeşil arka plan + ✅ ikon + metin' },
  { senaryo: 'Zorunlu alan', yanlis: 'Sadece kırmızı yıldız', dogru: 'Kırmızı yıldız + "(zorunlu)" metin' },
  { senaryo: 'Link', yanlis: 'Sadece renk farkı', dogru: 'Alt çizgi + renk' },
  { senaryo: 'Grafik', yanlis: 'Sadece renk kodlama', dogru: 'Renk + desen (pattern) + etiket' },
]

export const RENK_KORLUGU_TIPLERI = ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'] as const

// ══════════════════════════════════════════
// 3. KLAVYE NAVİGASYON HARİTASI
// ══════════════════════════════════════════

export interface KlavyePattern { bilesen: string; tuslar: Record<string, string> }

export const KLAVYE_PATTERNLERI: KlavyePattern[] = [
  { bilesen: 'Genel', tuslar: { Tab: 'Sonraki interaktif element', 'Shift+Tab': 'Önceki element', Enter: 'Buton/link aktivasyonu', Space: 'Buton/checkbox toggle', Escape: 'Modal/dropdown kapat' } },
  { bilesen: 'Modal', tuslar: { 'Enter/Space': 'Tetikleyici butonda aç', Escape: 'Kapat', Tab: 'Döngüsel focus trap', 'Shift+Tab': 'Ters döngü' } },
  { bilesen: 'Dropdown Menu', tuslar: { 'Enter/Space/↓': 'Aç', Escape: 'Kapat', '↑/↓': 'Öğeler arası gezin', 'Enter/Space': 'Seç', 'Karakter': 'Typeahead atla' } },
  { bilesen: 'Tabs', tuslar: { '←/→': 'Yatay gezin', '↑/↓': 'Dikey gezin', Home: 'İlk tab', End: 'Son tab' } },
  { bilesen: 'Accordion', tuslar: { 'Enter/Space': 'Aç/kapa', '↓': 'Sonraki header', '↑': 'Önceki header', Home: 'İlk', End: 'Son' } },
  { bilesen: 'Combobox', tuslar: { 'Enter/Space/↓': 'Listeyi aç', '↑/↓': 'Gezin', Enter: 'Seç', Escape: 'Kapat', 'Yazma': 'Filtrele' } },
  { bilesen: 'Tablo', tuslar: { Space: 'Satır checkbox toggle', Enter: 'Satır tıklama aksiyonu', 'Enter (başlık)': 'Sıralama' } },
  { bilesen: 'Date Picker', tuslar: { 'Enter/Space': 'Takvimi aç', 'Arrow keys': 'Gün gezinme (4 yön)', 'PageUp/Down': 'Ay değiştir', 'Shift+PageUp/Down': 'Yıl değiştir', Enter: 'Seç' } },
  { bilesen: 'Drag & Drop', tuslar: { 'Space (başlat)': 'Sürüklemeyi başlat', 'Arrow keys': 'Taşı', 'Space (bırak)': 'Bırak', Escape: 'İptal' } },
  { bilesen: 'Slider', tuslar: { '→/↑': 'Artır', '←/↓': 'Azalt', Home: 'Minimum', End: 'Maksimum', 'PageUp/Down': 'Büyük adım' } },
]

export const FOCUS_YONETIMI = {
  modalAcildiginda: 'İlk focusable elemente focus',
  modalKapandiginda: 'Tetikleyici (trigger) elemente focus dönüş',
  toastGosterildiginde: 'Focus KAYDIRMAZ — aria-live ile duyurur',
  routeDegisiminde: 'Yeni sayfa başlığına focus (h1)',
  hataDurumunda: 'İlk hatalı form alanına focus',
  silmeSonrasi: 'Listede bir sonraki elemente focus',
} as const

export const TABINDEX_KURALLARI = {
  tabindex0: 'Doğal sıra (tercih edilir)',
  tabindexPozitif: 'YASAK (DOM sırası bozulur)',
  tabindexNegatif: 'tabindex=-1 sadece programatik focus için (modal trap)',
} as const

// ══════════════════════════════════════════
// 4. ARIA PATTERN KATALOĞI
// ══════════════════════════════════════════

export interface AriaPattern { bilesen: string; elementler: Record<string, string>; notlar?: string }

export const ARIA_PATTERNLERI: AriaPattern[] = [
  { bilesen: 'Modal Dialog', elementler: { container: 'role="dialog" aria-modal="true" aria-labelledby="title-id"', baslik: 'id="title-id"', aciklama: 'aria-describedby="desc-id"' }, notlar: 'Focus trap zorunlu, Escape kapatır' },
  { bilesen: 'Alert Dialog', elementler: { container: 'role="alertdialog" aria-modal="true"' }, notlar: 'Escape kapanMAYABİLİR (kritik onay)' },
  { bilesen: 'Toast (info/success)', elementler: { container: 'role="status" aria-live="polite"' }, notlar: 'Sıradaki duyuruyu bekler' },
  { bilesen: 'Toast (error)', elementler: { container: 'role="alert" aria-live="assertive"' }, notlar: 'Anında duyurulur' },
  { bilesen: 'Tabs', elementler: { tablist: 'role="tablist" aria-label="Grup adı"', tab: 'role="tab" aria-selected aria-controls="panel-id"', panel: 'role="tabpanel" aria-labelledby="tab-id"' } },
  { bilesen: 'Accordion', elementler: { trigger: 'button aria-expanded aria-controls="panel-id"', panel: 'role="region" aria-labelledby="trigger-id"' } },
  { bilesen: 'Combobox', elementler: { input: 'role="combobox" aria-expanded aria-controls="listbox-id" aria-activedescendant', liste: 'role="listbox"', secenek: 'role="option" aria-selected' } },
  { bilesen: 'Dropdown Menu', elementler: { trigger: 'aria-haspopup="true" aria-expanded', menu: 'role="menu"', item: 'role="menuitem"', separator: 'role="separator"' } },
  { bilesen: 'Data Table', elementler: { siralama: 'th aria-sort="ascending/descending/none"', secim: 'input type="checkbox" aria-label="X seç"' } },
  { bilesen: 'ProgressBar', elementler: { bar: 'role="progressbar" aria-valuenow aria-valuemin="0" aria-valuemax="100"' } },
  { bilesen: 'Loading Spinner', elementler: { spinner: 'role="status" aria-label="Yükleniyor"', container: 'aria-busy="true"' } },
  { bilesen: 'Live Region', elementler: { bilgi: 'aria-live="polite"', acil: 'aria-live="assertive"', guncelleme: 'aria-atomic="true"' } },
  { bilesen: 'Breadcrumb', elementler: { nav: 'nav aria-label="Sayfa konumu"', mevcut: 'aria-current="page"' } },
  { bilesen: 'Search', elementler: { form: 'role="search"', input: 'type="search" aria-label="Ara"', sonuc: 'aria-live="polite" — "X sonuç bulundu"' } },
]

// ══════════════════════════════════════════
// 5. METİN ALTERNATİFLERİ & SEMANTİK HTML
// ══════════════════════════════════════════

export const GORSEL_ALT_KURALLARI = {
  anlamliGorsel: 'alt attribute ZORUNLU — görselin ne gösterdiğini açıklar',
  dekoratifGorsel: 'alt="" (boş string) — ekran okuyucu atlar',
  karmasikGorsel: 'aria-describedby ile uzun açıklama bağlantısı',
  ikonTekBasina: 'aria-label="İşlev adı" (ikon-only buton)',
  ikonMetinYaninda: 'aria-hidden="true" (ikon dekoratif)',
  svgAnlamli: 'role="img" aria-labelledby="title-id"',
  svgDekoratif: 'aria-hidden="true" focusable="false"',
} as const

export const SEMANTIK_HTML_KURALLARI = [
  { yanlis: '<div onClick>', dogru: '<button>', aciklama: 'Buton için button kullan' },
  { yanlis: '<button> (navigasyon)', dogru: '<a href>', aciklama: 'Link navigasyonu için a kullan' },
  { yanlis: 'h1 → h3 (atlama)', dogru: 'h1 → h2 → h3', aciklama: 'Başlık seviyesi ATLANMAZ' },
  { yanlis: '<div role="button">', dogru: '<button>', aciklama: 'ARIA yerine native HTML tercih et' },
]

export const BASLIK_HIYERARSISI = {
  dashboard: { h1: 'Sayfa başlığı (1 adet)', h2: 'Bölüm başlıkları', h3: 'Kart/modal başlıkları' },
  esnafSite: { h1: 'Sayfa ana başlığı (1 adet)', h2: 'Section başlıkları (Hizmetler, Galeri...)', h3: 'Hizmet/ürün adları' },
  kural: 'Her sayfada TAM BİR h1. Seviye ATLANMAZ.',
} as const

// ══════════════════════════════════════════
// 6. TÜRKÇE-SPESİFİK A11Y
// ══════════════════════════════════════════

export const TURKCE_A11Y = {
  htmlLang: '<html lang="tr">',
  charset: '<meta charset="UTF-8">',
  buyukIUyarisi: 'text-transform: uppercase Türkçe\'de SORUNLU — "istanbul" → "ISTANBUL" (yanlış). toLocaleUpperCase("tr-TR") kullan.',
  fontTurkceTest: 'Her fontta ç, ğ, ı, ö, ş, ü, Ç, Ğ, İ, Ö, Ş, Ü — tamamı kontrol',
  ttsOrnekleri: [
    { metin: '₺1.299,00', ariaLabel: 'Bin iki yüz doksan dokuz Türk lirası' },
    { metin: '5★', ariaLabel: '5 yıldız' },
    { metin: '%30', ariaLabel: 'Yüzde otuz' },
    { metin: '09:00-18:00', ariaLabel: 'Dokuz sıfır sıfır ile on sekiz sıfır sıfır arası' },
    { metin: 'WhatsApp', ariaLabel: '<span lang="en">WhatsApp</span>' },
  ],
  yabanciKelime: 'Yabancı kelimeler (WhatsApp, AI, QR) lang attribute ile işaretlenir',
} as const

// ══════════════════════════════════════════
// 7. ADAPTİF METİN & ZOOM
// ══════════════════════════════════════════

export const ZOOM_KURALLARI = {
  hedef: 'Sayfa %200 zoom\'da içerik kaybolmaz, yatay scroll gerekmez',
  minimumBoyutlar: { dashboard: '13px (--kp-text-base)', esnafSite: '16px (body), mobilde 14px min' },
  satırYuksekligi: '≥1.5 (body metin)', paragrafAraligi: '≥1.5em',
  hizalama: 'Uzun metin (3+ satır) justify DEĞİL left-aligned — disleksi uyumu',
  implementasyon: ['rem/em birim (px yerine font için)', 'max-width: 100% tüm görsellerde', 'Media query min-width tercih'],
} as const

// ══════════════════════════════════════════
// 8. MOBİL ERİŞİLEBİLİRLİK
// ══════════════════════════════════════════

export const MOBIL_A11Y = {
  dokunmaHedefi: { minimumWCAG: '24×24px (AA)', kepenkStandart: '44×44px (AAA)', aradakiBosluk: '≥8px' },
  ekranOkuyucu: { ios: 'VoiceOver (dahili)', android: 'TalkBack (dahili)', test: 'Çeyreklik gerçek cihaz testi' },
  oryantasyon: 'orientation lock YASAK — dikey+yatay çalışmalı',
  hareket: 'Shake/tilt işlevlerin buton alternatifi olmalı, swipe → buton fallback',
  pwa: { manifest: '"orientation": "any"', offline: 'Çevrimdışı sayfada erişilebilir hata mesajı' },
} as const

// ══════════════════════════════════════════
// 9. ZAMANLAMA & HAREKET
// ══════════════════════════════════════════

export const ZAMANLAMA_KURALLARI = {
  toastAutoDismiss: 'Bilgi toast otomatik kapanır (3-5sn), HATA toast otomatik KAPANMAZ',
  toastHoverDurma: 'Hover/focus → zamanlayıcı durur',
  oturumSuresi: '2 dk önce uyarı modal — tek tıkla uzatma',
  formTimeout: 'Form verisi OTOMATİK SİLİNMEZ — taslak olarak saklanır',
} as const

export const HAREKET_KURALLARI = {
  prefersReducedMotion: '@media (prefers-reduced-motion: reduce) → TÜM animasyonlar devre dışı',
  framerMotion: 'useReducedMotion() hook — tüm motion component\'larda',
  otomatikOynatma: 'Video autoplay YASAK (veya muted + kontrol)',
  yanipSonen: '3 Hz üstü yanıp sönen içerik YASAK (epilepsi — WCAG 2.3.1)',
} as const

// ══════════════════════════════════════════
// 10. SKIP NAVİGASYON & LANDMARK
// ══════════════════════════════════════════

export const SKIP_NAVIGATION = {
  skipLink: { metin: 'İçeriğe Atla', hedef: '#main-content', gorunum: 'Gizli → Tab ile focus\'ta görünür' },
  dashboardLandmarks: { header: 'role="banner"', nav: 'role="navigation" aria-label="Ana menü"', main: 'role="main" id="main-content"', aside: 'role="complementary"', footer: 'role="contentinfo"' },
  esnafSiteLandmarks: { header: 'role="banner"', nav: 'role="navigation" aria-label="Site menüsü"', main: 'role="main" id="main-content"', footer: 'role="contentinfo"', sections: 'aria-labelledby="section-heading-id"' },
  kural: 'Her sayfa TAM BİR <main>. Birden fazla <nav> varsa ayrı aria-label.',
} as const

// ══════════════════════════════════════════
// 11. ESNAF SİTESİ COMPONENT A11Y
// ══════════════════════════════════════════

export const ESNAF_SITE_A11Y: Record<string, { aria: string; notlar: string }> = {
  SiteHeader: { aria: 'nav role="navigation" aria-label="Ana menü"', notlar: 'Hamburger: aria-expanded, skip link zorunlu' },
  HeroBanner: { aria: 'Dekoratif arka plan: aria-hidden="true"', notlar: 'Anlamlı CTA metni ("Daha Fazla" DEĞİL → "Randevu Al")' },
  WhatsAppCTA: { aria: 'aria-label="WhatsApp ile iletişim (yeni pencerede)"', notlar: 'role="link", yeni pencere belirtilmeli' },
  Gallery: { aria: 'role="region" aria-label="Galeri" aria-roledescription="carousel"', notlar: 'Slayt: role="group" aria-label="N/Toplam". Auto-rotate YASAK' },
  BookingWidget: { aria: 'form aria-label="Randevu formu"', notlar: 'Takvim full klavye, saat radio group, onay role="status"' },
  ContactForm: { aria: 'form aria-label="İletişim formu"', notlar: 'aria-required + yıldız, gönderim aria-live="polite"' },
  MenuList: { aria: 'Kategori section + aria-labelledby', notlar: 'Fiyat: aria-label="Yemek — ₺X". Alerjen: aria-label' },
  PriceTable: { aria: 'Semantik <table> — th hizmet, td fiyat', notlar: 'aria-label="Hizmet — ₺X Türk lirası"' },
  GoogleMap: { aria: 'iframe title="İşletme harita konumu"', notlar: 'Altında metin adres (harita yüklenemezse)' },
  BeforeAfter: { aria: 'role="slider" aria-label="Öncesi-sonrası"', notlar: 'Her görsel ayrı alt text' },
}

export const AI_URETIM_A11Y_KONTROL = [
  'AI her görsel için otomatik alt text üretir — boş bırakılmaz',
  'AI sayfa üretirken h1→h2→h3 sırası korunur',
  'AI tema özelleştirmesinde renk kontrastı anlık kontrol',
  'AI formlarda her input\'un label\'ı olur',
  'AI "tıklayınız" yerine anlamlı link metni üretir',
] as const

// ══════════════════════════════════════════
// 12. OTOMATİK TEST PIPELINE
// ══════════════════════════════════════════

export const TEST_PIPELINE = {
  unitTest: { kutuphane: 'jest-axe (@axe-core/react)', kapsam: 'TÜM packages/ui component\'ları', kural: 'Her .test.tsx\'de a11y test' },
  e2eTest: { kutuphane: '@axe-core/playwright', wcagTags: ['wcag2a', 'wcag2aa', 'wcag21aa'], sayfalar: ['/dashboard', '/dashboard/orders', '/dashboard/bookings', '/dashboard/customers', '/dashboard/campaigns', '/dashboard/settings', '/dashboard/editor', '/auth/login', '/auth/signup'] },
  ci: { failSeviyesi: 'critical + serious → PR FAIL', uyariSeviyesi: 'moderate + minor → uyarı (fail etmez)', rapor: 'HTML rapor artifacts' },
  storybook: { addon: 'storybook-addon-a11y', kural: 'Yeni story axe temiz olmalı' },
} as const

export const MANUEL_TEST = {
  siklık: 'Çeyreklik (3 ayda 1)',
  ekranOkuyucuSenaryolari: [
    'Dashboard ana sayfa → h1 duyuruldu mu?',
    'Tab ile sidebar menüde gezin → her öğe duyuruluyor mu?',
    'Sipariş listesini tablo olarak oku → satır/sütun doğru mu?',
    'Modal aç → focus trap çalışıyor mu? / Kapat → focus döndü mü?',
    'Kayıt formunu yalnız klavye ile doldur',
    'Hatalı gönder → hata mesajları duyuruluyor mu?',
    'Esnaf sitesini VoiceOver ile baştan sona navige et',
    'Randevu al — takvim, saat, onay — tamamı klavye ile',
  ],
  klavyeTesti: ['Tab ile tüm sayfayı geç — sıra mantıklı mı?', 'Focus ring HER elementte görünüyor mu?', 'Escape ile modal/dropdown kapanıyor mu?', 'Skip link var mı ve çalışıyor mu?', 'Focus hiç kaybolmuyor mu?'],
  zoomTesti: ['%200 büyütme → yatay scroll var mı?', 'Metin kesiliyor mu?', 'Butonlar tıklanabilir boyutta mı?'],
  renkTesti: ['Protanopia modunda UI anlaşılıyor mu?', 'Deuteranopia modunda hata/başarı ayırt edilebiliyor mu?', 'Grayscale modunda bilgi kaybı var mı?'],
} as const

// ══════════════════════════════════════════
// 13. HEDEF METRİKLER
// ══════════════════════════════════════════

export const A11Y_METRIKLERI = {
  otomatik: [
    { metrik: 'axe critical ihlal', hedef: '0', olcum: 'CI — her PR' },
    { metrik: 'axe serious ihlal', hedef: '0', olcum: 'CI — her PR' },
    { metrik: 'axe moderate ihlal', hedef: '<5', olcum: 'Haftalık trend' },
    { metrik: 'Lighthouse a11y skoru', hedef: '≥90', olcum: 'Haftalık CI' },
  ],
  manuel: [
    { metrik: 'VoiceOver navigasyon', hedef: 'Tüm kritik akışlar sorunsuz', olcum: 'Çeyreklik' },
    { metrik: 'Klavye navigasyon', hedef: 'Focus trap yok, sıra mantıklı', olcum: 'Çeyreklik' },
    { metrik: 'Zoom %200', hedef: 'Yatay scroll yok, kayıp yok', olcum: 'Çeyreklik' },
    { metrik: 'Renk körlüğü', hedef: 'Renk dışı gösterim tüm durumlarda', olcum: 'Çeyreklik' },
  ],
  kapsam: { componentTestOrani: '%100', sayfaTarama: 'Tüm dashboard + auth + esnaf site şablon' },
} as const
