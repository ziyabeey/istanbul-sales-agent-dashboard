/**
 * peyzaj-sulama ThemeConfig (growth)
 * Mavi + yeşil, sulama sistemleri & otomatik bahçe. Inter.
 * Business: AquaGarden Sulama, Esenyurt
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const PEYZAJ_SULAMA_CSS: Record<string, string> = {
  '--color-bg': '#F0F9FF',
  '--color-surface': '#E0F2FE',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#BAE6FD',
  '--color-text': '#0C1E2E',
  '--color-text-secondary': '#0369A1',
  '--color-text-muted': '#6B7280',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#0284C7',
  '--color-accent-hover': '#0369A1',
  '--color-accent-light': '#E0F2FE',
  '--color-border': '#BAE6FD',
  '--font-heading': "'Roboto', sans-serif",
  '--font-body': "'Roboto', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '8px'}

export const PEYZAJ_SULAMA_BUSINESS: BusinessData = {
  name: 'AquaGarden Sulama Sistemleri',
  ownerName: 'Ercan Yılmaz',
  sector: 'peyzaj',
  slogan: 'Akıllı sulama, yeşil tasarruf',
  phone: '0212 555 33 77',
  phoneClean: '902125553377',
  whatsapp: '902125553377',
  email: 'info@aquagarden.com.tr',
  address: 'Esenyurt Osb, Sarıca Mah. No.8, Esenyurt, İstanbul',
  city: 'İstanbul',
  district: 'Esenyurt',
  coordinates: { lat: 41.0310, lng: 28.6705 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:00', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '14:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/aquagarden_sulama', youtube: 'https://youtube.com/@aquagarden' },
  photos: [],
  services: [
    { id: 's1', name: 'Damla Sulama', icon: '💧' },
    { id: 's2', name: 'Yağmurlama', icon: '🌧️' },
    { id: 's3', name: 'Akıllı Kontrol', icon: '📱' },
    { id: 's4', name: 'Bakım & Servis', icon: '🔧' }],
  team: [{ id: 't1', name: 'Ercan Yılmaz', role: 'Sulama Mühendisi', experience: '17 yıl' }],
  experience: '17 yıl',
  rating: 4.7,
  reviewCount: 398,
  foundedYear: 2007}

export const PEYZAJ_SULAMA_CONFIG: ThemeConfig = {
  id: 'peyzaj-sulama',
  name: 'Sulama',
  sectorId: 'peyzaj',
  plan: 'growth',
  description: 'Mavi + yeşil, sulama sistemleri. Esenyurt.',
  designPhilosophy: 'Aqua blue — su, teknoloji, tasarruf. Damla & yağmurlama sistemlerinin teknik güveni.',
  isDark: false,
  cssVariables: PEYZAJ_SULAMA_CSS,
  fonts: {
    heading: { family: 'DM Sans', weights: [700, 900], subsets: ['latin-ext'] },
    body: { family: 'Roboto', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'LandscapingService',
  sectorSections: ['landscape_packages', 'garden_stats_row', 'project_portfolio_grid', 'garden_consult'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'AquaGarden 💧' },
        menuItems: [
          { label: 'Sistemler', href: '#sistemler' }, { label: 'Projeler', href: '#projeler' }, { label: 'Teklif', href: '#teklif' }],
        cta: { text: 'Ücretsiz Keşif', href: '#teklif', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'AquaGarden Sulama',
        copyright: '© 2024 AquaGarden',
        contact: { phone: '0212 555 33 77', address: 'Esenyurt, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/aquagarden_sulama', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902125553377', message: 'Merhaba, sulama sistemi hakkında teklif almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "AquaGarden Sulama Sistemleri — Esenyurt", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Esenyurt', title: "AquaGarden Sulama Sistemleri", subtitle: "Akıllı sulama, yeşil tasarruf", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'peyzaj_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902125553377" }, editableFields: [] }
    ]
  }]
}
