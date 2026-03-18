/**
 * @kepenk/templates — guzellik-blanc ThemeConfig (pro)
 * Siyah + beyaz editorial. DM Serif Display. Etiler ultra-premium.
 * Business: Maison Blanc, Etiler
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const GUZELLIK_BLANC_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F7F7F7',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#EEEEEE',
  '--color-text': '#0A0A0A',
  '--color-text-secondary': '#444444',
  '--color-text-muted': '#888888',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#1A1A1A',
  '--color-accent-hover': '#000000',
  '--color-accent-light': '#F0F0F0',
  '--color-border': '#E0E0E0',
  '--font-heading': "'DM Serif Display', serif",
  '--font-body': "'DM Sans', sans-serif",
  '--radius-card': '0px',
  '--radius-btn': '2px'}

export const GUZELLIK_BLANC_BUSINESS: BusinessData = {
  name: 'Maison Blanc',
  ownerName: 'Deniz Blanc Ergün',
  sector: 'guzellik',
  slogan: 'Güzelliğin saf hali',
  phone: '0212 265 43 10',
  phoneClean: '902122654310',
  whatsapp: '902122654310',
  email: 'contact@maisonblanc.com.tr',
  address: 'Nispetiye Cad. Akmerkez A Blok No:4 K:5, Etiler, İstanbul',
  city: 'İstanbul',
  district: 'Etiler',
  coordinates: { lat: 41.0800, lng: 29.0300 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '11:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/maisonblanc.istanbul' },
  photos: [],
  services: [
    { id: 's1', name: 'Blanc Ritual', price: '₺2.500', duration: '90 dk', icon: '◻️' },
    { id: 's2', name: 'Editorial Makyaj', price: '₺3.000', duration: '90 dk', icon: '◼️' },
    { id: 's3', name: 'Kalıcı Makyaj', price: '₺5.000', duration: '2 saat', icon: '▪️' },
    { id: 's4', name: 'Fransa Pedikür', price: '₺800', duration: '60 dk', icon: '□' }],
  team: [
    { id: 't1', name: 'Deniz Blanc Ergün', role: 'Kurucu', experience: '20 yıl' },
    { id: 't2', name: 'Sophie Moreau', role: 'Baş Uzman (Paris)', experience: '15 yıl' }],
  experience: '15 yıl',
  rating: 5.0,
  reviewCount: 312,
  foundedYear: 2009}

export const GUZELLIK_BLANC_CONFIG: ThemeConfig = {
  id: 'guzellik-blanc',
  name: 'Blanc',
  sectorId: 'guzellik',
  plan: 'pro',
  description: 'Siyah + beyaz editorial. DM Serif Display. Etiler ultra-premium.',
  designPhilosophy: 'Mutlak minimalizm — sadece siyah, beyaz ve negatif alan.',
  isDark: false,
  cssVariables: GUZELLIK_BLANC_CSS,
  fonts: {
    heading: { family: 'Outfit', weights: [400], subsets: ['latin-ext'] },
    body: { family: 'DM Sans', weights: [300, 400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'BeautySalon',
  sectorSections: ['before_after', 'services', 'team', 'instagram_feed'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.0s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Maison Blanc' },
        menuItems: [
          { label: 'Ritüeller', href: '#hizmetler' },
          { label: 'Ekip', href: '#ekip' },
          { label: 'Paketler', href: '#paketler' },
          { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Randevu', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'minimal', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'default', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Maison Blanc',
        copyright: '© 2024 Maison Blanc',
        contact: { phone: '0212 265 43 10', address: 'Etiler, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/maisonblanc.istanbul', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902122654310', message: 'Randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Maison Blanc — Etiler", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Etiler', title: "Maison Blanc", subtitle: "Güzelliğin saf hali", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'guzellik_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122654310" }, editableFields: [] }
    ]
  }]
}
