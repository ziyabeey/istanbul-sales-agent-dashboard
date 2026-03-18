/**
 * @kepenk/templates — doktor-trust ThemeConfig (free)
 * Mavi + beyaz, güvenilir pratisyen doktor. Inter font.
 * Business: Dr. Mehmet Yıldız, Şişli
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const DOKTOR_TRUST_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F0F7FC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E0EFF8',
  '--color-text': '#1A2742',
  '--color-text-secondary': '#4B6080',
  '--color-text-muted': '#8BA0B8',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#0077B6',
  '--color-accent-hover': '#005F92',
  '--color-accent-light': '#E1F0FA',
  '--color-border': '#CAE0EF',
  '--font-heading': "'Inter', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '8px'}

export const DOKTOR_TRUST_BUSINESS: BusinessData = {
  name: 'Dr. Mehmet Yıldız Kliniği',
  ownerName: 'Dr. Mehmet Yıldız',
  sector: 'doktor',
  slogan: 'Sağlığınız, önceliğimiz',
  phone: '0212 230 44 55',
  phoneClean: '902122304455',
  whatsapp: '902122304455',
  email: 'info@drmehmetyildiz.com.tr',
  address: 'Gülbahar Mah. Bağlarbaşı Sok. No:12 D:4, Şişli, İstanbul',
  city: 'İstanbul',
  district: 'Şişli',
  coordinates: { lat: 41.0624, lng: 28.9964 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '14:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/drmehmetyildiz' },
  photos: [],
  services: [
    { id: 's1', name: 'Genel Muayene', price: '₺800', duration: '30 dk', icon: '🩺' },
    { id: 's2', name: 'Check-Up', price: '₺2.500', duration: '60 dk', icon: '📋' },
    { id: 's3', name: 'Ultrason', price: '₺600', duration: '20 dk', icon: '🔬' },
    { id: 's4', name: 'Beslenme Danışmanlığı', price: '₺1.200', duration: '45 dk', icon: '🥗' }],
  team: [
    { id: 't1', name: 'Dr. Mehmet Yıldız', role: 'Dahiliye Uzmanı', experience: '22 yıl' }],
  experience: '22 yıl',
  rating: 4.9,
  reviewCount: 842,
  foundedYear: 2002}

export const DOKTOR_TRUST_CONFIG: ThemeConfig = {
  id: 'doktor-trust',
  name: 'Trust',
  sectorId: 'doktor',
  plan: 'free',
  description: 'Mavi + beyaz, güvenilir pratisyen. Şişli.',
  designPhilosophy: 'Profesyonel mavi — sağlık sektörünün klasik rengi, temiz ve güven verici.',
  isDark: false,
  cssVariables: DOKTOR_TRUST_CSS,
  fonts: {
    heading: { family: 'Outfit', weights: [600, 700], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'MedicalBusiness',
  sectorSections: ['treatment_accordion', 'booking', 'insurance_logos'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Dr. Yıldız' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' }, { label: 'Hakkımda', href: '#hakkimda' },
          { label: 'Sigortalar', href: '#sigortalar' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Online Randevu', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Dr. Mehmet Yıldız Kliniği',
        copyright: '© 2024 Dr. Mehmet Yıldız',
        contact: { phone: '0212 230 44 55', address: 'Şişli, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/drmehmetyildiz', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }, { label: 'Aydınlatma Metni', href: '/aydinlatma' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902122304455', message: 'Merhaba Dr. Mehmet Yıldız, randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Dr. Mehmet Yıldız Kliniği — Şişli", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Şişli', title: "Dr. Mehmet Yıldız Kliniği", subtitle: "Sağlığınız, önceliğimiz", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'doktor_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122304455" }, editableFields: [] }
    ]
  }]
}
