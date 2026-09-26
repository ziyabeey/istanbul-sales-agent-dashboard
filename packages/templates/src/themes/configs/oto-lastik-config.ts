import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const OTO_LASTIK_CSS: Record<string, string> = {
  '--color-bg': '#1A1A1A', '--color-surface': '#222222', '--color-surface-elevated': '#2A2A2A',
  '--color-surface-muted': '#333333', '--color-text': '#F5F5F5', '--color-text-secondary': '#CCCCCC',
  '--color-text-muted': '#888888', '--color-text-on-accent': '#000000', '--color-accent': '#EF4444',
  '--color-accent-hover': '#DC2626', '--color-accent-light': 'rgba(239,68,68,0.12)', '--color-border': 'rgba(239,68,68,0.25)',
  '--font-heading': "'Poppins', sans-serif", '--font-body': "'Poppins', sans-serif",
  '--radius-card': '12px', '--radius-btn': '8px'}
export const OTO_LASTIK_BUSINESS: BusinessData = {
  name: 'Lastik34', ownerName: 'Burak Tekerlek', sector: 'otoservis',
  slogan: 'Her marka lastik, en iyi fiyat', phone: '0212 555 66 77', phoneClean: '902125556677',
  whatsapp: '902125556677', email: 'info@lastik34.com.tr',
  address: 'Maslak San. Sit. No.80, Sarıyer, İstanbul', city: 'İstanbul', district: 'Maslak',
  coordinates: { lat: 41.1070, lng: 29.0210 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '08:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '09:00', close: '15:00' }],
  socialMedia: { instagram: 'https://instagram.com/lastik34' },
  photos: [], services: [
    { id: 's1', name: 'Lastik', icon: '🛞' }, { id: 's2', name: 'Jant', icon: '⭕' },
    { id: 's3', name: 'Rot Balans', icon: '🔄' }, { id: 's4', name: 'Nitrojen', icon: '💨' }],
  team: [{ id: 't1', name: 'Burak Tekerlek', role: 'Kurucu', experience: '15 yıl' }],
  experience: '15 yıl', rating: 4.8, reviewCount: 1200, foundedYear: 2009}
export const OTO_LASTIK_CONFIG: ThemeConfig = {
  id: 'oto-lastik', name: 'Lastik', sectorId: 'otoservis', plan: 'starter',
  description: 'Koyu/kırmızı, lastik merkezi. Maslak.', designPhilosophy: 'Dark red — güçlü, sportif.',
  isDark: true, cssVariables: OTO_LASTIK_CSS,
  fonts: { heading: { family: 'Bodoni Moda', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'Poppins', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'AutoRepair', sectorSections: ['auto_services_grid', 'auto_pricing_table', 'auto_stats_row', 'auto_booking'],
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'LASTİK34 🛞' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Fiyat', href: '#fiyat' }, { label: 'Randevu', href: '#randevu' }], cta: { text: 'Randevu', href: '#randevu', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Lastik34', copyright: '© 2024 Lastik34', contact: { phone: '0212 555 66 77', address: 'Maslak, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/lastik34', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902125556677', message: 'Merhaba, lastik fiyatı almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Kabul', rejectText: 'Red', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Lastik34 — Maslak", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Maslak', title: "Lastik34", subtitle: "Her marka lastik, en iyi fiyat", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'otoservis_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902125556677" }, editableFields: [] }
    ]
  }]
}
