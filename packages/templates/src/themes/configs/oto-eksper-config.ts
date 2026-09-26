/**
 * oto-eksper ThemeConfig (starter)
 * Turuncu + koyu gri, ikinci el araç ekspertiz. Inter.
 * Business: Güven Ekspertiz, Esenyurt
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const OTO_EKSPER_CSS: Record<string, string> = {
  '--color-bg': '#FFFBF5',
  '--color-surface': '#FEF3E2',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FDE8C4',
  '--color-text': '#1A1000',
  '--color-text-secondary': '#4A3500',
  '--color-text-muted': '#9B7A30',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#D97706',
  '--color-accent-hover': '#B45309',
  '--color-accent-light': '#FEF3E2',
  '--color-border': '#FDE8C4',
  '--font-heading': "'Montserrat', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '10px',
  '--radius-btn': '8px'}

export const OTO_EKSPER_BUSINESS: BusinessData = {
  name: 'Güven Ekspertiz',
  ownerName: 'Adem Şahin',
  sector: 'oto',
  slogan: '2. el araçlarda güvenilir ekspertiz',
  phone: '0212 886 34 55',
  phoneClean: '902128863455',
  whatsapp: '902128863455',
  email: 'info@guvenekspertiz.com.tr',
  address: 'Bağcılar Mah. Barbaros Cad. No.112, Esenyurt, İstanbul',
  city: 'İstanbul',
  district: 'Esenyurt',
  coordinates: { lat: 41.0188, lng: 28.6672 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '19:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '17:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/guvenekspertiz', youtube: 'https://youtube.com/@guvenekspertiz' },
  photos: [],
  services: [
    { id: 's1', name: 'Standart Ekspertiz', price: '₺750', duration: '45 dk', icon: '🔍' },
    { id: 's2', name: 'Kapsamlı Ekspertiz', price: '₺1.250', duration: '90 dk', icon: '🏆' },
    { id: 's3', name: 'Boya Ölçüm', price: '₺200', duration: '15 dk', icon: '🎨' },
    { id: 's4', name: 'Hasar Sorgulama', price: '₺150', duration: '10 dk', icon: '📋' }],
  team: [{ id: 't1', name: 'Adem Şahin', role: 'Ana Eksper', experience: '20 yıl' }],
  experience: '20 yıl',
  rating: 4.9,
  reviewCount: 1148,
  foundedYear: 2004}

export const OTO_EKSPER_CONFIG: ThemeConfig = {
  id: 'oto-eksper',
  name: 'Eksper',
  sectorId: 'oto',
  plan: 'starter',
  description: 'Turuncu + krem, ikinci el ekspertiz. Esenyurt.',
  designPhilosophy: 'Güven turuncu — ikinci el piyasasında şeffaf, güvenilir hizmet.',
  isDark: false,
  cssVariables: OTO_EKSPER_CSS,
  fonts: {
    heading: { family: 'Oswald', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'AutoRepair',
  sectorSections: ['service_price_grid', 'vehicle_appointment', 'service_stats_row'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Güven Ekspertiz' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' }, { label: 'Paketler', href: '#paketler' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Ekspertiz Al', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Güven Ekspertiz',
        copyright: '© 2024 Güven Ekspertiz',
        contact: { phone: '0212 886 34 55', address: 'Esenyurt, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/guvenekspertiz', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902128863455', message: 'Merhaba, araç ekspertizi için randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Güven Ekspertiz — Esenyurt", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Esenyurt', title: "Güven Ekspertiz", subtitle: "2. el araçlarda güvenilir ekspertiz", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'oto_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902128863455" }, editableFields: [] }
    ]
  }]
}
