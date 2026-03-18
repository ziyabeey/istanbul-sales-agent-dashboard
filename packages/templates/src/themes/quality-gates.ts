/**
 * @kepenk/templates — Quality Gates Configuration
 * File 8/8 — Measurable thresholds for each plan tier
 */

// ═══ LIGHTHOUSE THRESHOLDS ═══

export interface LighthouseThresholds {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  lcp: number       // ms
  cls: number
  inp: number       // ms
}

export const LIGHTHOUSE_GATES: Record<string, LighthouseThresholds> = {
  free:       { performance: 95, accessibility: 95, bestPractices: 95, seo: 95, lcp: 2000, cls: 0.05, inp: 150 },
  starter:    { performance: 90, accessibility: 95, bestPractices: 95, seo: 95, lcp: 2500, cls: 0.05, inp: 150 },
  growth:     { performance: 88, accessibility: 90, bestPractices: 90, seo: 90, lcp: 2500, cls: 0.08, inp: 200 },
  pro:        { performance: 85, accessibility: 90, bestPractices: 90, seo: 90, lcp: 3000, cls: 0.08, inp: 200 },
  enterprise: { performance: 82, accessibility: 90, bestPractices: 90, seo: 90, lcp: 3000, cls: 0.10, inp: 250 },
}

// ═══ RESPONSIVE BREAKPOINTS ═══

export const RESPONSIVE_DEVICES = [
  { name: 'iPhone SE',      width: 375,  height: 667,  type: 'mobile' as const },
  { name: 'iPhone 14 Pro',  width: 393,  height: 852,  type: 'mobile' as const },
  { name: 'iPad Mini',      width: 768,  height: 1024, type: 'tablet' as const },
  { name: 'iPad Pro',       width: 1024, height: 1366, type: 'tablet' as const },
  { name: 'MacBook Air',    width: 1280, height: 800,  type: 'desktop' as const },
  { name: 'Desktop',        width: 1920, height: 1080, type: 'desktop' as const },
] as const

// ═══ QUALITY GATE CHECKLISTS ═══

export const GATE_RESPONSIVE = [
  'Header: logo ve menü kırılmıyor',
  'Hero: metin okunabilir, butonlar tıklanabilir',
  'Kartlar: grid doğru kolon sayısına düşüyor',
  'Fotoğraflar: boyut doğru, bozulma yok',
  'Form: alanlar tam genişlik (mobile)',
  'Footer: kolonlar stack oluyor (mobile)',
  'WhatsApp: buton görünür ve tıklanabilir',
  'Metin taşma: overflow yok, truncate doğru',
] as const

export const GATE_FUNCTIONAL = [
  'Telefon numarası tıklanabilir (tel: link açılıyor)',
  'WhatsApp butonu çalışıyor (wa.me link doğru mesajla açılıyor)',
  'Menü linkleri doğru section\'a scroll ediyor',
  'Hamburger menü açılıp kapanıyor (mobile)',
  'Form validation çalışıyor (boş alan uyarısı)',
  'KVKK checkbox zorunlu (işaretlemeden gönderemez)',
  'Form başarılı mesaj gösteriliyor',
  'Galeri lightbox açılıyor (varsa)',
  'Cookie banner: ilk ziyarette görünüyor',
  'Cookie banner: kabul edilince kaybolıyor',
  'Google Maps yükleniyor (veya statik fallback)',
  'Tüm görseller yükleniyor (kırık görsel yok)',
  'Koyu temada metin okunabilir (kontrast yeterli)',
  'Fotoğrafsız halde site çökmüyor (fallback çalışıyor)',
] as const

export const GATE_SEO = [
  '<title> tag var ve Türkçe ({{İşletme Adı}} — {{Sayfa Adı}})',
  '<meta name="description"> var ve 150-160 karakter',
  'Open Graph meta tags var (og:title, og:description, og:image)',
  'JSON-LD structured data var (doğru Schema.org tipi)',
  '<html lang="tr"> set',
  'Canonical URL var',
  'Tüm <img> tag\'larda alt text var',
  'H1 tek (sadece hero veya page title)',
  'H2-H6 hiyerarşisi doğru',
  'Sitemap.xml erişilebilir',
  'robots.txt var',
] as const

export const GATE_KVKK = [
  'Cookie banner gösteriliyor (ilk ziyaret)',
  'Cookie banner kabul/reddet butonları var',
  '/gizlilik-politikasi sayfası erişilebilir',
  '/kvkk-aydinlatma-metni sayfası erişilebilir',
  'Her formda KVKK onay checkbox\'u var',
  'Checkbox işaretlenmeden form gönderilemez',
  'Footer\'da yasal linkler var',
] as const

/** All quality gates */
export const QUALITY_GATES = {
  lighthouse: LIGHTHOUSE_GATES,
  responsive: { devices: RESPONSIVE_DEVICES, checklist: GATE_RESPONSIVE },
  functional: GATE_FUNCTIONAL,
  seo: GATE_SEO,
  kvkk: GATE_KVKK,
} as const
