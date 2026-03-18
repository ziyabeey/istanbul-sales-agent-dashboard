import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const ECZANE_BITKISEL_CSS: Record<string, string> = {
  '--color-bg': '#F0FDF4', '--color-surface': '#DCFCE7', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#BBF7D0', '--color-text': '#052E16', '--color-text-secondary': '#166534',
  '--color-text-muted': '#6B7280', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#16A34A',
  '--color-accent-hover': '#15803D', '--color-accent-light': '#F0FDF4', '--color-border': '#86EFAC',
  '--font-heading': "'DM Sans', sans-serif", '--font-body': "'DM Sans', sans-serif",
  '--radius-card': '16px', '--radius-btn': '9999px'}
export const ECZANE_BITKISEL_BUSINESS: BusinessData = {
  name: 'Doğa Eczanesi', ownerName: 'Ecz. Elif Yeşil', sector: 'eczane',
  slogan: 'Bitkisel & doğal ürün uzmanı', phone: '0533 111 22 33', phoneClean: '905331112233',
  whatsapp: '905331112233', email: 'info@dogaeczane.com.tr',
  address: 'Moda Cad. No.55, Kadıköy, İstanbul', city: 'İstanbul', district: 'Moda',
  coordinates: { lat: 40.9840, lng: 29.0249 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '19:30' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '19:30' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '19:30' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '19:30' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '19:30' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/dogaeczane' },
  photos: [], services: [
    { id: 's1', name: 'Bitkisel', icon: '🌿' }, { id: 's2', name: 'Vitamin', icon: '💊' },
    { id: 's3', name: 'Probiyotik', icon: '🧬' }, { id: 's4', name: 'Aromaterapi', icon: '🕯️' }],
  team: [{ id: 't1', name: 'Ecz. Elif Yeşil', role: 'Fitofarmasi Uzmanı', experience: '8 yıl' }],
  experience: '8 yıl', rating: 4.9, reviewCount: 245, foundedYear: 2016}
export const ECZANE_BITKISEL_CONFIG: ThemeConfig = {
  id: 'eczane-bitkisel', name: 'Bitkisel', sectorId: 'eczane', plan: 'growth',
  description: 'Yeşil, bitkisel/doğal eczane. Moda.', designPhilosophy: 'Natural green — doğal, sağlıklı.',
  isDark: false, cssVariables: ECZANE_BITKISEL_CSS,
  fonts: { heading: { family: 'DM Sans', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'DM Sans', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Pharmacy', sectorSections: ['pharmacy_services_grid', 'pharmacy_products', 'pharmacy_stats_row', 'pharmacy_contact'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Doğa Eczanesi 🌿' }, menuItems: [{ label: 'Ürünler', href: '#urunler' }, { label: 'Hizmetler', href: '#hizmetler' }, { label: 'Danışma', href: '#danisma' }], cta: { text: 'Danışma', href: '#danisma', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Doğa Eczanesi', copyright: '© 2024 Doğa', contact: { phone: '0533 111 22 33', address: 'Moda, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/dogaeczane', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905331112233', message: 'Merhaba, bitkisel ürün hakkında bilgi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Kabul', rejectText: 'Red', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Doğa Eczanesi — Moda", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Moda', title: "Doğa Eczanesi", subtitle: "Bitkisel & doğal ürün uzmanı", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'eczane_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905331112233" }, editableFields: [] }
    ]
  }]
}
