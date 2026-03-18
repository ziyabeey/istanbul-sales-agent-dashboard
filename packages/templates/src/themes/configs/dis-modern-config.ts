/**
 * dis-modern ThemeConfig (free)
 * Cyan + beyaz, genel diş kliniği. Poppins.
 * Business: Modern Diş Kliniği, Kadıköy
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const DIS_MODERN_CSS: Record<string, string> = {
  '--color-bg': '#F0FDFA',
  '--color-surface': '#CCFBF1',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#99F6E4',
  '--color-text': '#134E4A',
  '--color-text-secondary': '#0F766E',
  '--color-text-muted': '#6B7280',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#0D9488',
  '--color-accent-hover': '#0F766E',
  '--color-accent-light': '#CCFBF1',
  '--color-border': '#99F6E4',
  '--font-heading': "'Poppins', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px',
  '--radius-btn': '9999px'}

export const DIS_MODERN_BUSINESS: BusinessData = {
  name: 'Modern Diş Kliniği',
  ownerName: 'Dt. Ayşe Kaya',
  sector: 'dis',
  slogan: 'Sağlıklı gülüşler için uzman bakım',
  phone: '0216 340 88 11',
  phoneClean: '902163408811',
  whatsapp: '902163408811',
  email: 'bilgi@moderndis.com.tr',
  address: 'Moda Cad. No.44 D.3, Kadıköy, İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  coordinates: { lat: 40.9872, lng: 29.0236 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/moderndisklinigi', facebook: 'https://facebook.com/moderndisklinigi' },
  photos: [],
  services: [
    { id: 's1', name: 'Diş Beyazlatma', price: '₺3.000', duration: '60 dk', icon: '✨' },
    { id: 's2', name: 'İmplant', price: '₺12.000', duration: 'Planlı', icon: '🦷' },
    { id: 's3', name: 'Dolgu', price: '₺800', duration: '30 dk', icon: '🔧' },
    { id: 's4', name: 'Diş Taşı Temizliği', price: '₺600', duration: '30 dk', icon: '💎' }],
  team: [{ id: 't1', name: 'Dt. Ayşe Kaya', role: 'Diş Hekimi', experience: '12 yıl' }],
  experience: '12 yıl',
  rating: 4.9,
  reviewCount: 528,
  foundedYear: 2012}

export const DIS_MODERN_CONFIG: ThemeConfig = {
  id: 'dis-modern',
  name: 'Modern',
  sectorId: 'dis',
  plan: 'free',
  description: 'Cyan + beyaz, genel diş kliniği. Kadıköy.',
  designPhilosophy: 'Taze teal — güven, temizlik ve sağlık hissi. Açık ve modern.',
  isDark: false,
  cssVariables: DIS_MODERN_CSS,
  fonts: {
    heading: { family: 'Oswald', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'Dentist',
  sectorSections: ['dental_treatment_grid', 'dentist_profile', 'clinic_stats_row', 'dental_appointment'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Modern Diş' },
        menuItems: [
          { label: 'Tedaviler', href: '#tedaviler' }, { label: 'Hekim', href: '#hekim' },
          { label: 'ÖnceSonra', href: '#onceSonra' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Randevu Al', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Modern Diş Kliniği',
        copyright: '© 2024 Modern Diş Kliniği',
        contact: { phone: '0216 340 88 11', address: 'Kadıköy, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/moderndisklinigi', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }, { label: 'Sağlık Bakanlığı Onaylı', href: '#' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902163408811', message: 'Merhaba, diş kliniği randevusu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Modern Diş Kliniği — Kadıköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Kadıköy', title: "Modern Diş Kliniği", subtitle: "Sağlıklı gülüşler için uzman bakım", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'dis_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902163408811" }, editableFields: [] }
    ]
  }]
}
