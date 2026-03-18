/**
 * peyzaj-modern ThemeConfig (starter)
 * Beyaz + siyah + yeşil neon, minimalist modern peyzaj. Inter.
 * Business: Urban Green Design, Beşiktaş
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const PEYZAJ_MODERN_CSS: Record<string, string> = {
  '--color-bg': '#FAFAFA',
  '--color-surface': '#F0F0F0',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E5E5E5',
  '--color-text': '#111111',
  '--color-text-secondary': '#444444',
  '--color-text-muted': '#888888',
  '--color-text-on-accent': '#111111',
  '--color-accent': '#84CC16',
  '--color-accent-hover': '#65A30D',
  '--color-accent-light': '#ECFCCB',
  '--color-border': '#E5E5E5',
  '--font-heading': "'Inter', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '16px',
  '--radius-btn': '9999px'}

export const PEYZAJ_MODERN_BUSINESS: BusinessData = {
  name: 'Urban Green Design',
  ownerName: 'Leyla Arslan',
  sector: 'peyzaj',
  slogan: 'Kent bahçelerinde minimalist doğa estetiği',
  phone: '0212 345 77 88',
  phoneClean: '902123457788',
  whatsapp: '902123457788',
  email: 'hello@urbangreendesign.com.tr',
  address: 'Balmumcu Mah. Barbaros Blv. No.14 K.3, Beşiktaş, İstanbul',
  city: 'İstanbul',
  district: 'Beşiktaş',
  coordinates: { lat: 41.0647, lng: 29.0148 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/urbangreendesign' },
  photos: [],
  services: [
    { id: 's1', name: 'Minimalist Bahçe Tasarımı', icon: '✏️' },
    { id: 's2', name: 'İç Mekan Bitkileri', icon: '🪴' },
    { id: 's3', name: 'Dikey Bahçe', icon: '🌱' },
    { id: 's4', name: 'Teras Peyzaj', icon: '🌆' }],
  team: [{ id: 't1', name: 'Leyla Arslan', role: 'Peyzaj Mimarı', experience: '12 yıl' }],
  experience: '12 yıl',
  rating: 5.0,
  reviewCount: 178,
  foundedYear: 2012}

export const PEYZAJ_MODERN_CONFIG: ThemeConfig = {
  id: 'peyzaj-modern',
  name: 'Modern',
  sectorId: 'peyzaj',
  plan: 'starter',
  description: 'Beyaz + neon yeşil, minimalist modern kent peyzajı. Beşiktaş.',
  designPhilosophy: 'Urban minimal — siyah-beyaz zemin, neon yeşil vurgu. Modern mimari ile uyumlu.',
  isDark: false,
  cssVariables: PEYZAJ_MODERN_CSS,
  fonts: {
    heading: { family: 'Oswald', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'LandscapingService',
  sectorSections: ['project_portfolio_grid', 'plant_catalog', 'garden_stats_row', 'garden_consult'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Urban Green' },
        menuItems: [
          { label: 'Projeler', href: '#projeler' }, { label: 'Bitkiler', href: '#bitkiler' }, { label: 'Teklif', href: '#teklif' }],
        cta: { text: 'Proje Başlat', href: '#teklif', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Urban Green Design',
        copyright: '© 2024 Urban Green Design',
        contact: { phone: '0212 345 77 88', address: 'Beşiktaş, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/urbangreendesign', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902123457788', message: 'Merhaba, peyzaj proje fikrim var, görüşmek istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Urban Green Design — Beşiktaş", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Beşiktaş', title: "Urban Green Design", subtitle: "Kent bahçelerinde minimalist doğa estetiği", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'peyzaj_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902123457788" }, editableFields: [] }
    ]
  }]
}
