import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const FOTO_PORTRE_CSS: Record<string, string> = {
  '--color-bg': '#1A1A2E', '--color-surface': '#16213E', '--color-surface-elevated': '#1F2B4D',
  '--color-surface-muted': '#0F3460', '--color-text': '#E8E8F0', '--color-text-secondary': '#A5B4CE',
  '--color-text-muted': '#6B7A8E', '--color-text-on-accent': '#1A1A2E', '--color-accent': '#E94560',
  '--color-accent-hover': '#D13550', '--color-accent-light': 'rgba(233,69,96,0.12)', '--color-border': 'rgba(233,69,96,0.2)',
  '--font-heading': "'DM Sans', sans-serif", '--font-body': "'DM Sans', sans-serif",
  '--radius-card': '12px', '--radius-btn': '9999px'}
export const FOTO_PORTRE_BUSINESS: BusinessData = {
  name: 'Lens & Soul', ownerName: 'Ada Kıvanç', sector: 'fotografci',
  slogan: 'Ruhunuzu yakalayan kareler', phone: '0533 900 11 22', phoneClean: '905339001122',
  whatsapp: '905339001122', email: 'ada@lensandsoul.com.tr',
  address: 'Cihangir Mah. Akarsu Cad. No.15, Beyoğlu, İstanbul', city: 'İstanbul', district: 'Cihangir',
  coordinates: { lat: 41.0321, lng: 28.9831 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '11:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '11:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '11:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '11:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '11:00', close: '19:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/lensandsoul' },
  photos: [], services: [
    { id: 's1', name: 'Portre', icon: '🖼️' }, { id: 's2', name: 'Headshot', icon: '👤' },
    { id: 's3', name: 'Editoryal', icon: '📰' }, { id: 's4', name: 'Sanat', icon: '🎨' }],
  team: [{ id: 't1', name: 'Ada Kıvanç', role: 'Portre Fotoğrafçısı', experience: '12 yıl' }],
  experience: '12 yıl', rating: 5.0, reviewCount: 203, foundedYear: 2012}
export const FOTO_PORTRE_CONFIG: ThemeConfig = {
  id: 'foto-portre', name: 'Portre', sectorId: 'fotografci', plan: 'growth',
  description: 'Koyu lacivert + pembe, portre stüdyosu. Cihangir.', designPhilosophy: 'Cinematic dark — derinlik, karakter, dramatik.',
  isDark: true, cssVariables: FOTO_PORTRE_CSS,
  fonts: { heading: { family: 'Bebas Neue', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'DM Sans', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'LocalBusiness', sectorSections: ['photo_portfolio_grid', 'photo_package_cards', 'client_testimonials', 'shooting_booking'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'LENS & SOUL' }, menuItems: [{ label: 'Gallery', href: '#gallery' }, { label: 'Pricing', href: '#pricing' }, { label: 'Book', href: '#book' }], cta: { text: 'Book Now', href: '#book', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Lens & Soul', copyright: '© 2024 Lens & Soul', contact: { phone: '0533 900 11 22', address: 'Cihangir, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/lensandsoul', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905339001122', message: 'Hi, I would like to book a portrait session.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Lens & Soul — Cihangir", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Cihangir', title: "Lens & Soul", subtitle: "Ruhunuzu yakalayan kareler", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'fotografci_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905339001122" }, editableFields: [] }
    ]
  }]
}
