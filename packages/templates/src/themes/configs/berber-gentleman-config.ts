/**
 * @kepenk/templates — berber-gentleman ThemeConfig
 *
 * Luxury barber club. Gold details, editorial layout.
 * Plan: pro | Font: Cormorant Garamond (heading) + DM Sans (body)
 */

import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const BERBER_GENTLEMAN_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#FAF8F5',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F0EDE8',
  '--color-text': '#1A1A2E',
  '--color-text-secondary': '#5A5A72',
  '--color-text-muted': '#8E8E9E',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#C9A84C',
  '--color-accent-hover': '#B8952F',
  '--color-accent-active': '#A07E22',
  '--color-accent-light': '#FBF5E8',
  '--color-accent-subtle': '#FDF9F0',
  '--color-border': '#E8E4DC',
  '--color-border-subtle': '#F0EDE8',
  '--font-heading': "'Cormorant Garamond', serif",
  '--font-body': "'DM Sans', sans-serif",
  '--radius-md': '4px',
  '--radius-lg': '8px'}

export const BERBER_GENTLEMAN_BUSINESS: BusinessData = {
  name: 'The Gentleman Club',
  ownerName: 'Selim Koçer',
  sector: 'berber',
  slogan: 'Beyefendinin adresi',
  phone: '0533 222 44 66',
  phoneClean: '905332224466',
  whatsapp: '905332224466',
  email: 'info@thegentlemanclub.com.tr',
  address: 'Abdi İpekçi Cad. No:18, Nişantaşı, İstanbul',
  city: 'İstanbul',
  district: 'Şişli',
  coordinates: { lat: 41.0495, lng: 28.9925 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '21:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '21:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '21:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '21:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '21:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '20:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '18:00' }],
  socialMedia: { instagram: 'https://instagram.com/thegentlemanclub' },
  photos: [],
  services: [
    { id: 's1', name: 'Gentleman\'s Cut', price: '₺500', duration: '45 dk', icon: 'scissors', description: 'Signature precision cut with hot towel finish' },
    { id: 's2', name: 'Royal Shave', price: '₺350', duration: '30 dk', icon: 'pen-tool', description: 'Traditional straight razor shave ritual' },
    { id: 's3', name: 'The Gentleman Package', price: '₺750', duration: '75 dk', icon: 'crown', popular: true, description: 'Cut + Shave + Face Treatment' },
    { id: 's4', name: 'Beard Sculpting', price: '₺300', duration: '25 dk', icon: 'star' },
    { id: 's5', name: 'Executive Facial', price: '₺600', duration: '45 dk', icon: 'sparkles' },
    { id: 's6', name: 'The Chairman', price: '₺1500', duration: '120 dk', icon: 'crown', description: 'Ultimate luxury — cut, shave, facial, massage, shoe shine' }],
  team: [
    { id: 't1', name: 'Selim Koçer', role: 'Founder & Master Barber', experience: '25 yıl' },
    { id: 't2', name: 'Ozan Balcı', role: 'Senior Barber', experience: '15 yıl' },
    { id: 't3', name: 'Tolga Alpay', role: 'Barber & Grooming Specialist', experience: '10 yıl' }],
  experience: '25 yıl',
  rating: 4.9,
  reviewCount: 487,
  foundedYear: 1999}

export const BERBER_GENTLEMAN_CONFIG: ThemeConfig = {
  id: 'berber-gentleman',
  name: 'Gentleman',
  sectorId: 'berber',
  plan: 'pro',
  description: 'Lüks berber kulübü. Altın detaylar, editoryal dergi layout.',
  designPhilosophy: 'Cormorant Garamond headings for old-world luxury. Sharp corners, gold accents.',
  inspiration: ['Truefitt & Hill', 'GQ Magazine'],
  isDark: false,
  cssVariables: BERBER_GENTLEMAN_CSS,
  fonts: {
    heading: { family: 'Inter', weights: [400, 600, 700], subsets: ['latin-ext'] },
    body:    { family: 'DM Sans', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'BarberShop',
  sectorSections: ['before_after', 'booking'],
  performanceBudget: { maxJS: '250kb', maxLCP: '3.0s', animationLevel: 'gsap-allowed' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'zoomIn' },
      defaultContent: {
        logo: { type: 'text', text: 'The Gentleman Club' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' },
          { label: 'Hakkımızda', href: '#hakkimizda' },
          { label: 'Ekip', href: '#ekip' },
          { label: 'Referanslar', href: '#yorumlar' },
          { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Randevu', href: 'https://wa.me/905332224466', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'zoomIn' },
      defaultContent: {
        businessName: 'The Gentleman Club',
        description: '1999\'dan beri Nişantaşı\'nda beyefendi bakımının adresi.',
        copyright: '© 2024 The Gentleman Club. Tüm hakları saklıdır.',
        columns: [
          { title: 'Hizmetler', links: [{ label: 'Gentleman\'s Cut', href: '#' }, { label: 'Royal Shave', href: '#' }, { label: 'The Chairman', href: '#' }] },
          { title: 'Sayfalar', links: [{ label: 'Hakkımızda', href: '#hakkimizda' }, { label: 'Ekibimiz', href: '#ekip' }, { label: 'Blog', href: '#' }] }],
        contact: { phone: '0533 222 44 66', email: 'info@thegentlemanclub.com.tr', address: 'Abdi İpekçi Cad. No:18, Nişantaşı' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/thegentlemanclub', icon: 'instagram' }],
        legal: [{ label: 'Gizlilik', href: '/gizlilik' }, { label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'zoomIn' },
      defaultContent: { phone: '905332224466', message: 'Merhaba, The Gentleman Club\'da randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'zoomIn' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "The Gentleman Club — Şişli", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'zoomIn' }, defaultContent: { badge: 'Şişli', title: "The Gentleman Club", subtitle: "Beyefendinin adresi", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'zoomIn' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'zoomIn' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'zoomIn' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'berber_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'zoomIn' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'zoomIn' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905332224466" }, editableFields: [] }
    ]
  }]
}
