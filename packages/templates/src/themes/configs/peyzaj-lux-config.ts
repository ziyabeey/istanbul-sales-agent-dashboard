/**
 * peyzaj-lux ThemeConfig (enterprise)
 * Koyu kahve + altın, villa & özel yapı lüks peyzaj. Cormorant Garamond.
 * Business: Prestige Peyzaj Ataşehir, Ataşehir
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const PEYZAJ_LUX_CSS: Record<string, string> = {
  '--color-bg': '#0F0A05',
  '--color-surface': '#1A1108',
  '--color-surface-elevated': '#261A0C',
  '--color-surface-muted': '#33220F',
  '--color-text': '#F5EDD6',
  '--color-text-secondary': '#C9AD7A',
  '--color-text-muted': '#80663A',
  '--color-text-on-accent': '#0F0A05',
  '--color-accent': '#D4A84B',
  '--color-accent-hover': '#B8913A',
  '--color-accent-light': 'rgba(212,168,75,0.15)',
  '--color-border': 'rgba(212,168,75,0.2)',
  '--font-heading': "'Cormorant Garamond', serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px',
  '--radius-btn': '9999px'}

export const PEYZAJ_LUX_BUSINESS: BusinessData = {
  name: 'Prestige Peyzaj',
  ownerName: 'Gökhan Şahin',
  sector: 'peyzaj',
  slogan: 'Lüks villalara özel peyzaj sanatı',
  phone: '0216 555 88 99',
  phoneClean: '902165558899',
  whatsapp: '902165558899',
  email: 'gokhan@prestigepeyzaj.com.tr',
  address: 'Ataşehir Bulvarı No.12 K.5, Ataşehir, İstanbul',
  city: 'İstanbul',
  district: 'Ataşehir',
  coordinates: { lat: 40.9885, lng: 29.1214 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/prestigepeyzaj' },
  photos: [],
  services: [
    { id: 's1', name: 'Villa Bahçesi', icon: '🌳' },
    { id: 's2', name: 'Havuz Peyzajı', icon: '🏊' },
    { id: 's3', name: '3D Tasarım', icon: '🎨' },
    { id: 's4', name: 'Bakım Sözleşmesi', icon: '🤝' }],
  team: [{ id: 't1', name: 'Gökhan Şahin', role: 'Kıdemli Peyzaj Mimarı', experience: '20 yıl' }],
  experience: '20 yıl',
  rating: 5.0,
  reviewCount: 87,
  foundedYear: 2004}

export const PEYZAJ_LUX_CONFIG: ThemeConfig = {
  id: 'peyzaj-lux',
  name: 'Lüks',
  sectorId: 'peyzaj',
  plan: 'enterprise',
  description: 'Koyu kahve + altın, villa lüks peyzaj. Ataşehir.',
  designPhilosophy: 'Dark luxe — ahşap, taş, altın. Villa bahçelerinde haute landscape.',
  isDark: true,
  cssVariables: PEYZAJ_LUX_CSS,
  fonts: {
    heading: { family: 'Raleway', weights: [600, 700], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'LandscapingService',
  sectorSections: ['project_portfolio_grid', 'landscape_packages', 'garden_stats_row', 'garden_consult'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Prestige Peyzaj' },
        menuItems: [
          { label: 'Portföy', href: '#portfoy' }, { label: 'Paketler', href: '#paketler' }, { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Proje Teklifi', href: '#iletisim', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Prestige Peyzaj',
        copyright: '© 2024 Prestige Peyzaj',
        contact: { phone: '0216 555 88 99', address: 'Ataşehir, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/prestigepeyzaj', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902165558899', message: 'Merhaba, villa peyzaj projesi hakkında görüşmek istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Prestige Peyzaj — Ataşehir", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Ataşehir', title: "Prestige Peyzaj", subtitle: "Lüks villalara özel peyzaj sanatı", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'peyzaj_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902165558899" }, editableFields: [] }
    ]
  }]
}
