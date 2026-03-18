/**
 * @kepenk/templates — guzellik-atelier ThemeConfig (starter)
 * Warm gold + cream, Paris atölye hissi. Cormorant Garamond.
 * Business: Atelier Beauté, Nişantaşı
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const GUZELLIK_ATELIER_CSS: Record<string, string> = {
  '--color-bg': '#FDFAF5',
  '--color-surface': '#F5EFE0',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#ECE5D0',
  '--color-text': '#1C1008',
  '--color-text-secondary': '#5C4A28',
  '--color-text-muted': '#97815A',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#92400E',
  '--color-accent-hover': '#78350F',
  '--color-accent-light': '#FEF3C7',
  '--color-border': '#DDD0B0',
  '--font-heading': "'Cormorant Garamond', serif",
  '--font-body': "'Plus Jakarta Sans', sans-serif",
  '--radius-card': '8px',
  '--radius-btn': '4px'}

export const GUZELLIK_ATELIER_BUSINESS: BusinessData = {
  name: 'Atelier Beauté',
  ownerName: 'Cécile Karadağ',
  sector: 'guzellik',
  slogan: 'L\'art de la beauté — Güzelliğin sanatı',
  phone: '0212 231 09 18',
  phoneClean: '902122310918',
  whatsapp: '902122310918',
  email: 'bonjour@atelierbeaute.com.tr',
  address: 'Teşvikiye Mah. Valikonağı Cad. No:54 K:2, Nişantaşı, İstanbul',
  city: 'İstanbul',
  district: 'Nişantaşı',
  coordinates: { lat: 41.0508, lng: 28.9988 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '11:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/atelierbeautetr' },
  photos: [],
  services: [
    { id: 's1', name: 'Signature Facial', price: '₺1.200', duration: '75 dk', icon: '✨' },
    { id: 's2', name: 'Gold Treatment', price: '₺1.800', duration: '90 dk', icon: '🌟' },
    { id: 's3', name: 'Atelier Makyaj', price: '₺900', duration: '60 dk', icon: '💄' },
    { id: 's4', name: 'Kalıcı Makyaj', price: '₺3.500', duration: '120 dk', icon: '💋' },
    { id: 's5', name: 'Tırnak Atölyesi', price: '₺600', duration: '60 dk', icon: '💅' }],
  team: [
    { id: 't1', name: 'Cécile Karadağ', role: 'Atölye Kurucusu & Baş Uzman', experience: '18 yıl' },
    { id: 't2', name: 'Lara Demirci', role: 'Cilt & Antiaging Uzmanı', experience: '10 yıl' }],
  experience: '12 yıl',
  rating: 4.9,
  reviewCount: 387,
  foundedYear: 2012}

export const GUZELLIK_ATELIER_CONFIG: ThemeConfig = {
  id: 'guzellik-atelier',
  name: 'Atelier',
  sectorId: 'guzellik',
  plan: 'starter',
  description: 'Warm gold + cream, Paris atölye hissi. Nişantaşı premium.',
  designPhilosophy: 'Krem tonlar, gold vurgular, serifli başlıklar. Minimalist ama lüks.',
  isDark: false,
  cssVariables: GUZELLIK_ATELIER_CSS,
  fonts: {
    heading: { family: 'Raleway', weights: [300, 400, 600, 700], subsets: ['latin-ext'] },
    body: { family: 'Plus Jakarta Sans', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'BeautySalon',
  sectorSections: ['before_after', 'services', 'team', 'instagram_feed'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Atelier Beauté' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' },
          { label: 'Ekip', href: '#ekip' },
          { label: 'Paketler', href: '#paketler' },
          { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Randevu', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Atelier Beauté',
        copyright: '© 2024 Atelier Beauté',
        contact: { phone: '0212 231 09 18', address: 'Nişantaşı, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/atelierbeautetr', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902122310918', message: 'Bonjour, randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Atelier Beauté — Nişantaşı", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Nişantaşı', title: "Atelier Beauté", subtitle: "L'art de la Beauté", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'guzellik_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122310918" }, editableFields: [] }
    ]
  }]
}
