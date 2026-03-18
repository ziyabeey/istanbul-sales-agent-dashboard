import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const FOTO_DOGUM_CSS: Record<string, string> = {
  '--color-bg': '#FFF5F9', '--color-surface': '#FFE4EE', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FFD1E1', '--color-text': '#2E0316', '--color-text-secondary': '#6E1443',
  '--color-text-muted': '#B06585', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#DB2777',
  '--color-accent-hover': '#BE185D', '--color-accent-light': '#FDF2F8', '--color-border': '#F9A8D4',
  '--font-heading': "'Nunito', sans-serif", '--font-body': "'Nunito', sans-serif",
  '--radius-card': '16px', '--radius-btn': '9999px'}
export const FOTO_DOGUM_BUSINESS: BusinessData = {
  name: 'Minik Anlar', ownerName: 'Ceyda Öz', sector: 'fotografci',
  slogan: 'İlk nefesten ilk adıma', phone: '0535 777 88 99', phoneClean: '905357778899',
  whatsapp: '905357778899', email: 'ceyda@minikanlar.com.tr',
  address: 'Bostancı Mah. No.18, Kadıköy, İstanbul', city: 'İstanbul', district: 'Bostancı',
  coordinates: { lat: 40.9580, lng: 29.0607 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '16:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/minikanlar' },
  photos: [], services: [
    { id: 's1', name: 'Yenidoğan', icon: '👶' }, { id: 's2', name: 'Hamilelik', icon: '🤰' },
    { id: 's3', name: 'Smash Cake', icon: '🎂' }, { id: 's4', name: 'Aile', icon: '👨‍👩‍👧' }],
  team: [{ id: 't1', name: 'Ceyda Öz', role: 'Yenidoğan Fotoğrafçısı', experience: '9 yıl' }],
  experience: '9 yıl', rating: 5.0, reviewCount: 456, foundedYear: 2015}
export const FOTO_DOGUM_CONFIG: ThemeConfig = {
  id: 'foto-dogum', name: 'Doğum', sectorId: 'fotografci', plan: 'pro',
  description: 'Pembe, yenidoğan & hamilelik. Bostancı.', designPhilosophy: 'Soft pink — hassas, sevecen, sıcak.',
  isDark: false, cssVariables: FOTO_DOGUM_CSS,
  fonts: { heading: { family: 'Syne', weights: [700, 800], subsets: ['latin-ext'] }, body: { family: 'Nunito', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'LocalBusiness', sectorSections: ['photo_portfolio_grid', 'photo_package_cards', 'client_testimonials', 'shooting_booking'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Minik Anlar 👶' }, menuItems: [{ label: 'Galeri', href: '#galeri' }, { label: 'Paketler', href: '#paketler' }, { label: 'Randevu', href: '#randevu' }], cta: { text: 'Randevu', href: '#randevu', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Minik Anlar', copyright: '© 2024 Minik Anlar', contact: { phone: '0535 777 88 99', address: 'Bostancı, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/minikanlar', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905357778899', message: 'Merhaba, bebek çekimi için bilgi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Minik Anlar — Bostancı", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Bostancı', title: "Minik Anlar", subtitle: "İlk nefesten ilk adıma", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'fotografci_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905357778899" }, editableFields: [] }
    ]
  }]
}
