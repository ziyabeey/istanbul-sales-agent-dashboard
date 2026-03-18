/**
 * emlak-ticari ThemeConfig (growth)
 * Koyu gri + turuncu, ticari gayrimenkul. Inter.
 * Business: Metro Ticari Gayrimenkul, Levent
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const EMLAK_TICARI_CSS: Record<string, string> = {
  '--color-bg': '#F9F9F9',
  '--color-surface': '#F0F0F0',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E5E5E5',
  '--color-text': '#111111',
  '--color-text-secondary': '#444444',
  '--color-text-muted': '#888888',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#EA580C',
  '--color-accent-hover': '#C2410C',
  '--color-accent-light': '#FFF7ED',
  '--color-border': '#E5E5E5',
  '--font-heading': "'Montserrat', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '10px',
  '--radius-btn': '6px'}

export const EMLAK_TICARI_BUSINESS: BusinessData = {
  name: 'Metro Ticari Gayrimenkul',
  ownerName: 'Cem Arslan',
  sector: 'emlak',
  slogan: 'Ticari gayrimenkulde güvenilir çözüm ortağı',
  phone: '0212 280 45 55',
  phoneClean: '902122804555',
  whatsapp: '902122804555',
  email: 'info@metroticari.com.tr',
  address: 'Büyükdere Cad. Levent Plaza No.18 K.12, Levent, İstanbul',
  city: 'İstanbul',
  district: 'Levent',
  coordinates: { lat: 41.0760, lng: 29.0133 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { linkedin: 'https://linkedin.com/company/metroticari', instagram: 'https://instagram.com/metroticari' },
  photos: [],
  services: [
    { id: 's1', name: 'Kiralık Ofis', icon: '🏢' },
    { id: 's2', name: 'Satılık Dükkan', icon: '🏪' },
    { id: 's3', name: 'Depo/Lojistik', icon: '🏭' },
    { id: 's4', name: 'AVM/Mağaza', icon: '🛍️' }],
  team: [{ id: 't1', name: 'Cem Arslan', role: 'Ticari Gayrimenkul Danışmanı', experience: '18 yıl' }],
  experience: '18 yıl',
  rating: 4.7,
  reviewCount: 127,
  foundedYear: 2006}

export const EMLAK_TICARI_CONFIG: ThemeConfig = {
  id: 'emlak-ticari',
  name: 'Ticari',
  sectorId: 'emlak',
  plan: 'growth',
  description: 'Koyu gri + turuncu, ticari gayrimenkul. Levent.',
  designPhilosophy: 'Corporate orange — B2B güveni, ticari dinamizm. Ofis-plaza-dükkan odaklı.',
  isDark: false,
  cssVariables: EMLAK_TICARI_CSS,
  fonts: {
    heading: { family: 'Cinzel', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'RealEstateAgent',
  sectorSections: ['property_listing_grid', 'real_estate_stats', 'agent_profile', 'valuation_request'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Metro Ticari' },
        menuItems: [
          { label: 'İlanlar', href: '#portfolio' }, { label: 'Danışman', href: '#danisman' }, { label: 'Teklif', href: '#teklif' }],
        cta: { text: 'Teklif Al', href: '#teklif', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Metro Ticari Gayrimenkul',
        copyright: '© 2024 Metro Ticari',
        contact: { phone: '0212 280 45 55', address: 'Levent, İstanbul' },
        social: [{ platform: 'linkedin', url: 'https://linkedin.com/company/metroticari', icon: 'linkedin' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902122804555', message: 'Merhaba, ticari gayrimenkul hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Metro Ticari Gayrimenkul — Levent", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Levent', title: "Metro Ticari Gayrimenkul", subtitle: "Ticari gayrimenkulde güvenilir çözüm ortağı", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'emlak_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122804555" }, editableFields: [] }
    ]
  }]
}
