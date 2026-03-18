/**
 * @kepenk/templates — doktor-uzman ThemeConfig (growth)
 * Navy + gold, uzman cerrah. DM Serif Display.
 * Business: Prof. Dr. Levent Başar — Ortopedi, Nişantaşı
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const DOKTOR_UZMAN_CSS: Record<string, string> = {
  '--color-bg': '#F8F6F2',
  '--color-surface': '#EDE9E0',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E0D9C8',
  '--color-text': '#1E3A5F',
  '--color-text-secondary': '#4A6080',
  '--color-text-muted': '#8A9AB8',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#1E3A5F',
  '--color-accent-hover': '#162B47',
  '--color-accent-light': '#EBF2FA',
  '--color-border': '#C8D8E8',
  '--font-heading': "'DM Serif Display', serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '6px'}

export const DOKTOR_UZMAN_BUSINESS: BusinessData = {
  name: 'Prof. Dr. Levent Başar',
  ownerName: 'Prof. Dr. Levent Başar',
  sector: 'doktor',
  slogan: 'Ortopedide uzmanlık, cerrahide güven',
  phone: '0212 251 90 00',
  phoneClean: '902122519000',
  whatsapp: '902122519000',
  email: 'randevu@levantbasar.com.tr',
  address: 'Teşvikiye Mah. Abdi İpekçi Cad. No.78 K.3, Nişantaşı, İstanbul',
  city: 'İstanbul',
  district: 'Nişantaşı',
  coordinates: { lat: 41.0502, lng: 28.9980 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '17:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '17:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '17:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '17:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '16:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: null, close: null },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/profdrleventbasar' },
  photos: [],
  services: [
    { id: 's1', name: 'Ortopedi Muayenesi', price: '₺2.000', icon: '🦴' },
    { id: 's2', name: 'Diz Artroskopisi', price: 'Konsültasyon', icon: '🦵' }],
  team: [{ id: 't1', name: 'Prof. Dr. Levent Başar', role: 'Ortopedi & Travmatoloji', experience: '28 yıl' }],
  experience: '28 yıl',
  rating: 5.0,
  reviewCount: 1200,
  foundedYear: 1996}

export const DOKTOR_UZMAN_CONFIG: ThemeConfig = {
  id: 'doktor-uzman',
  name: 'Uzman',
  sectorId: 'doktor',
  plan: 'growth',
  description: 'Navy + gold, uzman cerrah profili. Nişantaşı.',
  designPhilosophy: 'Prestij navy — serif başlık, krem zemin. Üst düzey uzman hissi.',
  isDark: false,
  cssVariables: DOKTOR_UZMAN_CSS,
  fonts: {
    heading: { family: 'Cormorant Garamond', weights: [400], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'MedicalBusiness',
  sectorSections: ['doctor_profile_hero', 'treatment_accordion', 'booking'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Prof. Dr. Başar' },
        menuItems: [
          { label: 'Özgeçmiş', href: '#hakkimda' }, { label: 'Hizmetler', href: '#hizmetler' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Randevu', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Prof. Dr. Levent Başar',
        copyright: '© 2024 Prof. Dr. Levent Başar',
        contact: { phone: '0212 251 90 00', address: 'Nişantaşı, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/profdrleventbasar', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902122519000', message: 'Merhaba Prof. Dr. Başar, randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Prof. Dr. Levent Başar — Nişantaşı", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Nişantaşı', title: "Prof. Dr. Levent Başar", subtitle: "Ortopedide uzmanlık, cerrahide güven", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'doktor_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122519000" }, editableFields: [] }
    ]
  }]
}
