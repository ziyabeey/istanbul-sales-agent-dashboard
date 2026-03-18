/**
 * peyzaj-klasik ThemeConfig (free)
 * Yeşil + krem, genel peyzaj & bahçe düzenleme. Roboto.
 * Business: Yeşil Dokunuş Peyzaj, Pendik
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const PEYZAJ_KLASIK_CSS: Record<string, string> = {
  '--color-bg': '#F7FFF4',
  '--color-surface': '#E8F5E3',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#C8E6C9',
  '--color-text': '#1B2E1C',
  '--color-text-secondary': '#2E5930',
  '--color-text-muted': '#6B7280',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#2D7A28',
  '--color-accent-hover': '#1F5F1C',
  '--color-accent-light': '#E8F5E3',
  '--color-border': '#C8E6C9',
  '--font-heading': "'Roboto Slab', serif",
  '--font-body': "'Roboto', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '8px'}

export const PEYZAJ_KLASIK_BUSINESS: BusinessData = {
  name: 'Yeşil Dokunuş Peyzaj',
  ownerName: 'Hüseyin Kaya',
  sector: 'peyzaj',
  slogan: 'Bahçenizi yaşayan bir sanat eserine dönüştürüyoruz',
  phone: '0216 499 11 22',
  phoneClean: '902164991122',
  whatsapp: '902164991122',
  email: 'bilgi@yesildonus.com.tr',
  address: 'Kurtköy Mah. Atatürk Cad. No.55, Pendik, İstanbul',
  city: 'İstanbul',
  district: 'Pendik',
  coordinates: { lat: 40.9105, lng: 29.2536 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '16:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/yesildonuspeyzaj', facebook: 'https://facebook.com/yesildonuspeyzaj' },
  photos: [],
  services: [
    { id: 's1', name: 'Bahçe Düzenleme', icon: '🌿' },
    { id: 's2', name: 'Çim Serimi', icon: '🌱' },
    { id: 's3', name: 'Sulama Sistemi', icon: '💧' },
    { id: 's4', name: 'Bakım & Budama', icon: '✂️' }],
  team: [{ id: 't1', name: 'Hüseyin Kaya', role: 'Peyzaj Mimarı', experience: '15 yıl' }],
  experience: '15 yıl',
  rating: 4.8,
  reviewCount: 243,
  foundedYear: 2009}

export const PEYZAJ_KLASIK_CONFIG: ThemeConfig = {
  id: 'peyzaj-klasik',
  name: 'Klasik',
  sectorId: 'peyzaj',
  plan: 'free',
  description: 'Yeşil + krem, genel peyzaj & bahçe. Pendik.',
  designPhilosophy: 'Doğa yeşili — toprak, ağaç, bitki. Klasik peyzajın güvenceli paleti.',
  isDark: false,
  cssVariables: PEYZAJ_KLASIK_CSS,
  fonts: {
    heading: { family: 'Bodoni Moda', weights: [600, 700], subsets: ['latin-ext'] },
    body: { family: 'Roboto', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'LandscapingService',
  sectorSections: ['project_portfolio_grid', 'landscape_packages', 'garden_stats_row', 'garden_consult'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'lg', visible: true, order: 0, removable: false, animation: 'fadeIn' },
      defaultContent: {
        logo: { type: 'text', text: 'Yeşil Dokunuş 🌿' },
        menuItems: [
          { label: 'Projeler', href: '#projeler' }, { label: 'Paketler', href: '#paketler' }, { label: 'Keşif', href: '#kesif' }],
        cta: { text: 'Ücretsiz Keşif', href: '#kesif', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'lg', visible: true, order: 999, removable: false, animation: 'fadeIn' },
      defaultContent: {
        businessName: 'Yeşil Dokunuş Peyzaj',
        copyright: '© 2024 Yeşil Dokunuş Peyzaj',
        contact: { phone: '0216 499 11 22', address: 'Pendik, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/yesildonuspeyzaj', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'lg', visible: true, order: 1000, removable: false, animation: 'fadeIn' },
      defaultContent: { phone: '902164991122', message: 'Merhaba, bahçe peyzaj hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'lg', visible: true, order: 1001, removable: false, animation: 'fadeIn' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Yeşil Dokunuş Peyzaj — Pendik", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'lg', visible: true, order: 1, removable: false, animation: 'fadeIn' }, defaultContent: { badge: 'Pendik', title: "Yeşil Dokunuş Peyzaj", subtitle: "Bahçenizi yaşayan bir sanat eserine dönüştürüyoruz", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'lg', visible: true, order: 2, removable: true, animation: 'fadeIn' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'lg', visible: true, order: 3, removable: true, animation: 'fadeIn' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'peyzaj_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'lg', visible: true, order: 4, removable: false, animation: 'fadeIn' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'lg', visible: true, order: 5, removable: true, animation: 'fadeIn' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'lg', visible: true, order: 6, removable: false, animation: 'fadeIn' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902164991122" }, editableFields: [] }
    ]
  }]
}
