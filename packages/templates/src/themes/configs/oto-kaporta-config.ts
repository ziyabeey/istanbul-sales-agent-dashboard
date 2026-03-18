import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const OTO_KAPORTA_CSS: Record<string, string> = {
  '--color-bg': '#FAFAFA', '--color-surface': '#F0F0F0', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E5E5E5', '--color-text': '#111111', '--color-text-secondary': '#444444',
  '--color-text-muted': '#888888', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#EA580C',
  '--color-accent-hover': '#C2410C', '--color-accent-light': '#FFF7ED', '--color-border': '#D4D4D4',
  '--font-heading': "'DM Sans', sans-serif", '--font-body': "'DM Sans', sans-serif",
  '--radius-card': '12px', '--radius-btn': '9999px'}
export const OTO_KAPORTA_BUSINESS: BusinessData = {
  name: 'Kaport34', ownerName: 'Ali Çelik', sector: 'otoservis',
  slogan: 'Boyasız göçük & kaporta uzmanı', phone: '0533 200 30 40', phoneClean: '905332003040',
  whatsapp: '905332003040', email: 'info@kaport34.com.tr',
  address: 'İkitelli OSB Mah. No.65, Başakşehir, İstanbul', city: 'İstanbul', district: 'İkitelli',
  coordinates: { lat: 41.0750, lng: 28.7840 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:30', close: '18:30' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:30', close: '18:30' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:30', close: '18:30' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:30', close: '18:30' },
    { day: 'friday', dayTr: 'Cuma', open: '08:30', close: '18:30' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/kaport34' },
  photos: [], services: [
    { id: 's1', name: 'Boyasız Göçük', icon: '🔨' }, { id: 's2', name: 'Boya', icon: '🎨' },
    { id: 's3', name: 'Kaporta', icon: '🚗' }, { id: 's4', name: 'Cam Filmi', icon: '🪟' }],
  team: [{ id: 't1', name: 'Ali Çelik', role: 'Kaporta Ustası', experience: '18 yıl' }],
  experience: '18 yıl', rating: 4.9, reviewCount: 650, foundedYear: 2006}
export const OTO_KAPORTA_CONFIG: ThemeConfig = {
  id: 'oto-kaporta', name: 'Kaporta', sectorId: 'otoservis', plan: 'growth',
  description: 'Turuncu/beyaz, kaporta & boya. İkitelli.', designPhilosophy: 'Bold orange — güçlü, uzman.',
  isDark: false, cssVariables: OTO_KAPORTA_CSS,
  fonts: { heading: { family: 'Syne', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'DM Sans', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'AutoRepair', sectorSections: ['auto_services_grid', 'auto_pricing_table', 'auto_stats_row', 'auto_booking'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'KAPORT34 🚗' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Fiyat', href: '#fiyat' }, { label: 'Teklif', href: '#teklif' }], cta: { text: 'Teklif', href: '#teklif', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Kaport34', copyright: '© 2024 Kaport34', contact: { phone: '0533 200 30 40', address: 'İkitelli, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/kaport34', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905332003040', message: 'Merhaba, kaporta teklifi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Kabul', rejectText: 'Red', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Kaport34 — İkitelli", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İkitelli', title: "Kaport34", subtitle: "Boyasız göçük & kaporta uzmanı", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'otoservis_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905332003040" }, editableFields: [] }
    ]
  }]
}
