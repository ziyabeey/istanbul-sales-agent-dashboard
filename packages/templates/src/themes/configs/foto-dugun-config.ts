import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const FOTO_DUGUN_CSS: Record<string, string> = {
  '--color-bg': '#FFF9F5', '--color-surface': '#FFF0E6', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FFE0CC', '--color-text': '#1A0800', '--color-text-secondary': '#5C3A1F',
  '--color-text-muted': '#9E8B7A', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#C2410C',
  '--color-accent-hover': '#9A3412', '--color-accent-light': '#FFF7ED', '--color-border': '#FDBA74',
  '--font-heading': "'Playfair Display', serif", '--font-body': "'Lato', sans-serif",
  '--radius-card': '14px', '--radius-btn': '9999px'}
export const FOTO_DUGUN_BUSINESS: BusinessData = {
  name: 'Aşk Karesi', ownerName: 'Mert Aydın', sector: 'fotografci',
  slogan: 'Anlarınızı ölümsüzleştirin', phone: '0532 444 55 66', phoneClean: '905324445566',
  whatsapp: '905324445566', email: 'mert@askkaresi.com.tr',
  address: 'Moda Cad. No.32, Kadıköy, İstanbul', city: 'İstanbul', district: 'Kadıköy',
  coordinates: { lat: 40.9832, lng: 29.0244 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '19:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '21:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '09:00', close: '21:00' }],
  socialMedia: { instagram: 'https://instagram.com/askkaresi' },
  photos: [], services: [
    { id: 's1', name: 'Düğün', icon: '💒' }, { id: 's2', name: 'Nişan', icon: '💍' },
    { id: 's3', name: 'Dış Çekim', icon: '🌳' }, { id: 's4', name: 'Klip', icon: '🎬' }],
  team: [{ id: 't1', name: 'Mert Aydın', role: 'Düğün Fotoğrafçısı', experience: '10 yıl' }],
  experience: '10 yıl', rating: 5.0, reviewCount: 324, foundedYear: 2014}
export const FOTO_DUGUN_CONFIG: ThemeConfig = {
  id: 'foto-dugun', name: 'Düğün', sectorId: 'fotografci', plan: 'free',
  description: 'Turuncu/krem, düğün fotoğrafçısı. Kadıköy.', designPhilosophy: 'Warm amber — romantik, sıcak.',
  isDark: false, cssVariables: FOTO_DUGUN_CSS,
  fonts: { heading: { family: 'Inter', weights: [600, 700], subsets: ['latin-ext'] }, body: { family: 'Lato', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'LocalBusiness', sectorSections: ['photo_portfolio_grid', 'photo_package_cards', 'client_testimonials', 'shooting_booking'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Aşk Karesi 📸' }, menuItems: [{ label: 'Portföy', href: '#portfolyo' }, { label: 'Paketler', href: '#paketler' }, { label: 'İletişim', href: '#iletisim' }], cta: { text: 'Teklif Al', href: '#iletisim', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Aşk Karesi', copyright: '© 2024 Aşk Karesi', contact: { phone: '0532 444 55 66', address: 'Kadıköy, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/askkaresi', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905324445566', message: 'Merhaba, düğün fotoğrafı için bilgi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Aşk Karesi — Kadıköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Kadıköy', title: "Aşk Karesi", subtitle: "Anlarınızı ölümsüzleştirin", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'fotografci_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905324445566" }, editableFields: [] }
    ]
  }]
}
