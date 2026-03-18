/**
 * @kepenk/templates — guzellik-narin ThemeConfig (free)
 * Soft pembe, feminen, davetkar. Lato body, Cormorant başlık.
 * Business: Narin Güzellik Merkezi, Üsküdar
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const GUZELLIK_NARIN_CSS: Record<string, string> = {
  '--color-bg': '#FFFBFE',
  '--color-surface': '#FFF0F7',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FCE7F3',
  '--color-text': '#1A0A12',
  '--color-text-secondary': '#6B3A52',
  '--color-text-muted': '#9C7080',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#BE185D',
  '--color-accent-hover': '#9D1550',
  '--color-accent-light': '#FCE7F3',
  '--color-border': '#F3D5E5',
  '--font-heading': "'Cormorant Garamond', serif",
  '--font-body': "'Lato', sans-serif",
  '--radius-card': '16px',
  '--radius-btn': '9999px'}

export const GUZELLIK_NARIN_BUSINESS: BusinessData = {
  name: 'Narin Güzellik Merkezi',
  ownerName: 'Ayşe Narin Yıldız',
  sector: 'guzellik',
  slogan: 'Güzelliğinize özel dokunuş',
  phone: '0216 418 72 33',
  phoneClean: '902164187233',
  whatsapp: '902164187233',
  email: 'randevu@naringüzellik.com',
  address: 'Mimar Sinan Mah. Hakimiyet Cad. No:24 D:3, Üsküdar, İstanbul',
  city: 'İstanbul',
  district: 'Üsküdar',
  coordinates: { lat: 41.0220, lng: 29.0150 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/narinGuzellik' },
  photos: [],
  services: [
    { id: 's1', name: 'Cilt Bakımı', price: '₺500', duration: '60 dk', icon: '✨' },
    { id: 's2', name: 'Makyaj', price: '₺400', duration: '45 dk', icon: '💄' },
    { id: 's3', name: 'Lazer Epilasyon', price: '₺800', duration: '30 dk', icon: '⚡' },
    { id: 's4', name: 'Kalıcı Makyaj', price: '₺2.500', duration: '90 dk', icon: '💋' },
    { id: 's5', name: 'Tırnak Bakımı', price: '₺250', duration: '40 dk', icon: '💅' },
    { id: 's6', name: 'Medikal Makyaj', price: '₺350', duration: '50 dk', icon: '🌸' }],
  team: [
    { id: 't1', name: 'Ayşe Narin Yıldız', role: 'Baş Güzellik Uzmanı', experience: '14 yıl' },
    { id: 't2', name: 'Selin Arslan', role: 'Cilt Bakım Uzmanı', experience: '7 yıl' }],
  experience: '8 yıl',
  rating: 4.8,
  reviewCount: 213,
  foundedYear: 2016}

export const GUZELLIK_NARIN_CONFIG: ThemeConfig = {
  id: 'guzellik-narin',
  name: 'Narin',
  sectorId: 'guzellik',
  plan: 'free',
  description: 'Soft pembe, feminen, davetkar. Üsküdar güzellik merkezi.',
  designPhilosophy: 'Sıcak pembe tonlar, yuvarlak köşeler, kadınca zarif typografi.',
  isDark: false,
  cssVariables: GUZELLIK_NARIN_CSS,
  fonts: {
    heading: { family: 'Merriweather', weights: [400, 600, 700], subsets: ['latin-ext'] },
    body: { family: 'Lato', weights: [400, 700], subsets: ['latin-ext'] }},
  seoSchemaType: 'BeautySalon',
  sectorSections: ['before_after', 'services', 'instagram_feed'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Narin Güzellik' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' },
          { label: 'Ekibimiz', href: '#ekip' },
          { label: 'Çalışmalar', href: '#galeri' },
          { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Randevu Al', href: 'https://wa.me/902164187233', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Narin Güzellik Merkezi',
        copyright: '© 2024 Narin Güzellik Merkezi',
        contact: { phone: '0216 418 72 33', address: 'Üsküdar, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/narinGuzellik', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }, { label: 'Gizlilik', href: '/gizlilik' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902164187233', message: 'Merhaba, randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Narin Güzellik Merkezi — Üsküdar", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Üsküdar', title: "Narin Güzellik Merkezi", subtitle: "Güzelliğinize özel dokunuş", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'guzellik_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902164187233" }, editableFields: [] }
    ]
  }]
}
