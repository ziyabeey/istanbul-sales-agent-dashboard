import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const ECZANE_DERMO_CSS: Record<string, string> = {
  '--color-bg': '#FFF5F7', '--color-surface': '#FFE4ED', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FBBFD0', '--color-text': '#2E0316', '--color-text-secondary': '#6E1443',
  '--color-text-muted': '#B06585', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#DB2777',
  '--color-accent-hover': '#BE185D', '--color-accent-light': '#FDF2F8', '--color-border': '#F9A8D4',
  '--font-heading': "'Poppins', sans-serif", '--font-body': "'Poppins', sans-serif",
  '--radius-card': '16px', '--radius-btn': '9999px'}
export const ECZANE_DERMO_BUSINESS: BusinessData = {
  name: 'Glow Eczanesi', ownerName: 'Ecz. Selin Cilt', sector: 'eczane',
  slogan: 'Dermokozmetik uzmanı', phone: '0532 777 88 99', phoneClean: '905327778899',
  whatsapp: '905327778899', email: 'info@gloweczane.com.tr',
  address: 'Bağdat Cad. No.120, Kadıköy, İstanbul', city: 'İstanbul', district: 'Bağdat Caddesi',
  coordinates: { lat: 40.9640, lng: 29.0680 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '20:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '11:00', close: '18:00' }],
  socialMedia: { instagram: 'https://instagram.com/gloweczane' },
  photos: [], services: [
    { id: 's1', name: 'Dermokozmetik', icon: '🧴' }, { id: 's2', name: 'Cilt Analizi', icon: '🔬' },
    { id: 's3', name: 'Anti-aging', icon: '✨' }, { id: 's4', name: 'Güneş Koruma', icon: '☀️' }],
  team: [{ id: 't1', name: 'Ecz. Selin Cilt', role: 'Dermokozmetik Uzmanı', experience: '10 yıl' }],
  experience: '10 yıl', rating: 4.9, reviewCount: 320, foundedYear: 2014}
export const ECZANE_DERMO_CONFIG: ThemeConfig = {
  id: 'eczane-dermo', name: 'Dermo', sectorId: 'eczane', plan: 'starter',
  description: 'Pembe, dermokozmetik eczane. Bağdat Caddesi.', designPhilosophy: 'Pink glow — dermokozmetik, bakım.',
  isDark: false, cssVariables: ECZANE_DERMO_CSS,
  fonts: { heading: { family: 'Outfit', weights: [600, 700], subsets: ['latin-ext'] }, body: { family: 'Poppins', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Pharmacy', sectorSections: ['pharmacy_services_grid', 'pharmacy_products', 'pharmacy_stats_row', 'pharmacy_contact'],
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Glow Eczanesi ✨' }, menuItems: [{ label: 'Ürünler', href: '#urunler' }, { label: 'Hizmetler', href: '#hizmetler' }, { label: 'Danışma', href: '#danisma' }], cta: { text: 'Danışma', href: '#danisma', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Glow Eczanesi', copyright: '© 2024 Glow', contact: { phone: '0532 777 88 99', address: 'Bağdat Cad., İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/gloweczane', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905327778899', message: 'Merhaba, dermokozmetik danışmanlık almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Kabul', rejectText: 'Red', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Glow Eczanesi — Bağdat Caddesi", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Bağdat Caddesi', title: "Glow Eczanesi", subtitle: "Dermokozmetik uzmanı", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'eczane_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905327778899" }, editableFields: [] }
    ]
  }]
}
