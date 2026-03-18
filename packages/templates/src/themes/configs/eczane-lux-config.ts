import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const ECZANE_LUX_CSS: Record<string, string> = {
  '--color-bg': '#080808', '--color-surface': '#111111', '--color-surface-elevated': '#1A1A1A',
  '--color-surface-muted': '#222222', '--color-text': '#F5EDD6', '--color-text-secondary': '#C9AD7A',
  '--color-text-muted': '#80663A', '--color-text-on-accent': '#080808', '--color-accent': '#D4AF37',
  '--color-accent-hover': '#B8943A', '--color-accent-light': 'rgba(212,175,55,0.12)',
  '--color-border': 'rgba(212,175,55,0.18)',
  '--font-heading': "'Cormorant Garamond', serif", '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px', '--radius-btn': '9999px'}
export const ECZANE_LUX_BUSINESS: BusinessData = {
  name: 'Pharma Prestige', ownerName: 'Ecz. Dr. Zeynep Elit', sector: 'eczane',
  slogan: 'Premium sağlık & wellness', phone: '0212 227 55 66', phoneClean: '902122275566',
  whatsapp: '902122275566', email: 'concierge@pharmaprestige.com.tr',
  address: 'Teşvikiye Cad. No.50, Şişli, İstanbul', city: 'İstanbul', district: 'Teşvikiye',
  coordinates: { lat: 41.0494, lng: 28.9939 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '19:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '11:00', close: '17:00' }],
  socialMedia: { instagram: 'https://instagram.com/pharmaprestige' },
  photos: [], services: [
    { id: 's1', name: 'Concierge', icon: '🔑' }, { id: 's2', name: 'Wellness', icon: '🧘' },
    { id: 's3', name: 'Anti-aging', icon: '✨' }, { id: 's4', name: 'IV Terapi', icon: '💉' }],
  team: [{ id: 't1', name: 'Ecz. Dr. Zeynep Elit', role: 'Kurucu & Klinik Eczacı', experience: '18 yıl' }],
  experience: '18 yıl', rating: 5.0, reviewCount: 120, foundedYear: 2010}
export const ECZANE_LUX_CONFIG: ThemeConfig = {
  id: 'eczane-lux', name: 'Lüks', sectorId: 'eczane', plan: 'enterprise',
  description: 'Siyah + altın, premium eczane & wellness. Teşvikiye.', designPhilosophy: 'Dark gold — VIP, wellness.',
  isDark: true, cssVariables: ECZANE_LUX_CSS,
  fonts: { heading: { family: 'Oswald', weights: [600, 700], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Pharmacy', sectorSections: ['pharmacy_services_grid', 'pharmacy_products', 'pharmacy_stats_row', 'pharmacy_contact'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'PHARMA PRESTIGE' }, menuItems: [{ label: 'Wellness', href: '#wellness' }, { label: 'Products', href: '#products' }, { label: 'Concierge', href: '#concierge' }], cta: { text: 'Concierge', href: '#concierge', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Pharma Prestige', copyright: '© 2024 Pharma Prestige', contact: { phone: '0212 227 55 66', address: 'Teşvikiye, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/pharmaprestige', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902122275566', message: 'Bonjour, wellness randevusu almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Kabul', rejectText: 'Red', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Pharma Prestige — Teşvikiye", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Teşvikiye', title: "Pharma Prestige", subtitle: "Premium sağlık & wellness", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'eczane_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122275566" }, editableFields: [] }
    ]
  }]
}
