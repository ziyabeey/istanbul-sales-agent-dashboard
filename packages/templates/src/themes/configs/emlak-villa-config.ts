/**
 * emlak-villa ThemeConfig (starter)
 * Yeşil + beyaz, villa & müstakil konut. Montserrat.
 * Business: Yeşil Bahçe Gayrimenkul, Beykoz
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const EMLAK_VILLA_CSS: Record<string, string> = {
  '--color-bg': '#F0FDF4',
  '--color-surface': '#DCFCE7',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#BBF7D0',
  '--color-text': '#052E16',
  '--color-text-secondary': '#166534',
  '--color-text-muted': '#6B7280',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#16A34A',
  '--color-accent-hover': '#15803D',
  '--color-accent-light': '#F0FDF4',
  '--color-border': '#BBF7D0',
  '--font-heading': "'Montserrat', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px',
  '--radius-btn': '8px'}

export const EMLAK_VILLA_BUSINESS: BusinessData = {
  name: 'Yeşil Bahçe Gayrimenkul',
  ownerName: 'Serkan Doğan',
  sector: 'emlak',
  slogan: 'Hayalinizdeki villayı buluyoruz',
  phone: '0216 425 33 55',
  phoneClean: '902164253355',
  whatsapp: '902164253355',
  email: 'info@yesilbahce.com.tr',
  address: 'Anadoluhisarı Mah. Göksu Cad. No.3, Beykoz, İstanbul',
  city: 'İstanbul',
  district: 'Beykoz',
  coordinates: { lat: 41.0832, lng: 29.0746 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '16:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/yesilbahcegayrimenkul' },
  photos: [],
  services: [
    { id: 's1', name: 'Satılık Villa', icon: '🏡' },
    { id: 's2', name: 'Müstakil Konut', icon: '🏠' },
    { id: 's3', name: 'Yazlık', icon: '🌊' },
    { id: 's4', name: 'Arsa & Tarla', icon: '🌿' }],
  team: [{ id: 't1', name: 'Serkan Doğan', role: 'Villa Uzmanı', experience: '16 yıl' }],
  experience: '16 yıl',
  rating: 4.9,
  reviewCount: 184,
  foundedYear: 2008}

export const EMLAK_VILLA_CONFIG: ThemeConfig = {
  id: 'emlak-villa',
  name: 'Villa',
  sectorId: 'emlak',
  plan: 'starter',
  description: 'Yeşil + beyaz, villa & bahçeli konut. Beykoz.',
  designPhilosophy: 'Doğa yeşili — villa, bahçe, huzur. Ormanlık ve Boğaz lokasyonlarına uygun palette.',
  isDark: false,
  cssVariables: EMLAK_VILLA_CSS,
  fonts: {
    heading: { family: 'Oswald', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'RealEstateAgent',
  sectorSections: ['property_listing_grid', 'neighborhood_map', 'agent_profile', 'valuation_request'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Yeşil Bahçe' },
        menuItems: [
          { label: 'Villalar', href: '#portfolio' }, { label: 'Semtler', href: '#semtler' }, { label: 'Değerleme', href: '#degerleme' }],
        cta: { text: 'İlan Ara', href: '#portfolio', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Yeşil Bahçe Gayrimenkul',
        copyright: '© 2024 Yeşil Bahçe Gayrimenkul',
        contact: { phone: '0216 425 33 55', address: 'Beykoz, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/yesilbahcegayrimenkul', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902164253355', message: 'Merhaba, villa portföyünüz hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Yeşil Bahçe Gayrimenkul — Beykoz", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Beykoz', title: "Yeşil Bahçe Gayrimenkul", subtitle: "Hayalinizdeki villayı buluyoruz", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'emlak_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902164253355" }, editableFields: [] }
    ]
  }]
}
