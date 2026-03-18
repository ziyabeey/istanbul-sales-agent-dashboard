import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const OTO_ELEKTRIK_CSS: Record<string, string> = {
  '--color-bg': '#FFFFF0', '--color-surface': '#FEF9C3', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FDE68A', '--color-text': '#1C1A00', '--color-text-secondary': '#5C5400',
  '--color-text-muted': '#9E9555', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#CA8A04',
  '--color-accent-hover': '#A16207', '--color-accent-light': '#FEFCE8', '--color-border': '#FACC15',
  '--font-heading': "'Nunito', sans-serif", '--font-body': "'Nunito', sans-serif",
  '--radius-card': '12px', '--radius-btn': '9999px'}
export const OTO_ELEKTRIK_BUSINESS: BusinessData = {
  name: 'Voltaj Oto Elektrik', ownerName: 'Emre Akım', sector: 'otoservis',
  slogan: 'Oto elektrik & elektronik uzmanı', phone: '0534 600 70 80', phoneClean: '905346007080',
  whatsapp: '905346007080', email: 'info@voltajoto.com.tr',
  address: 'Dolapdere Cad. No.90, Beyoğlu, İstanbul', city: 'İstanbul', district: 'Dolapdere',
  coordinates: { lat: 41.0468, lng: 28.9824 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:00', close: '19:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '16:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/voltajoto' },
  photos: [], services: [
    { id: 's1', name: 'Arıza Tespit', icon: '🔍' }, { id: 's2', name: 'Akü', icon: '🔋' },
    { id: 's3', name: 'Far/Lamba', icon: '💡' }, { id: 's4', name: 'Marş/Şarj', icon: '⚡' }],
  team: [{ id: 't1', name: 'Emre Akım', role: 'Oto Elektrikçi', experience: '14 yıl' }],
  experience: '14 yıl', rating: 4.8, reviewCount: 420, foundedYear: 2010}
export const OTO_ELEKTRIK_CONFIG: ThemeConfig = {
  id: 'oto-elektrik', name: 'Elektrik', sectorId: 'otoservis', plan: 'pro',
  description: 'Sarı/beyaz, oto elektrik uzmanı. Dolapdere.', designPhilosophy: 'Electric yellow — enerji, uzmanlık.',
  isDark: false, cssVariables: OTO_ELEKTRIK_CSS,
  fonts: { heading: { family: 'Montserrat', weights: [700, 800], subsets: ['latin-ext'] }, body: { family: 'Nunito', weights: [400, 500, 600], subsets: ['latin-ext'] } },
  seoSchemaType: 'AutoRepair', sectorSections: ['auto_services_grid', 'vehicle_brands_bar', 'auto_pricing_table', 'auto_booking'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Voltaj ⚡' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Fiyat', href: '#fiyat' }, { label: 'Randevu', href: '#randevu' }], cta: { text: 'Randevu', href: '#randevu', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Voltaj Oto', copyright: '© 2024 Voltaj', contact: { phone: '0534 600 70 80', address: 'Dolapdere, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/voltajoto', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905346007080', message: 'Merhaba, oto elektrik arızası için randevu almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Kabul', rejectText: 'Red', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Voltaj Oto Elektrik — Dolapdere", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Dolapdere', title: "Voltaj Oto Elektrik", subtitle: "Oto elektrik & elektronik uzmanı", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'otoservis_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905346007080" }, editableFields: [] }
    ]
  }]
}
