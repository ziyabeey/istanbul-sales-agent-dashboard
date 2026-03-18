/**
 * emlak-yatirim ThemeConfig (pro)
 * Koyu lacivert + altın, yatırım danışmanlığı / ROI odaklı. Inter.
 * Business: Emlak Yatırım Danışmanlık, Şişli
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const EMLAK_YATIRIM_CSS: Record<string, string> = {
  '--color-bg': '#0D1B2A',
  '--color-surface': '#162032',
  '--color-surface-elevated': '#1E2D40',
  '--color-surface-muted': '#253648',
  '--color-text': '#E8F0FA',
  '--color-text-secondary': '#94B8D8',
  '--color-text-muted': '#4A6070',
  '--color-text-on-accent': '#0D1B2A',
  '--color-accent': '#F5C842',
  '--color-accent-hover': '#D4AA33',
  '--color-accent-light': 'rgba(245,200,66,0.15)',
  '--color-border': 'rgba(245,200,66,0.2)',
  '--font-heading': "'Montserrat', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '8px'}

export const EMLAK_YATIRIM_BUSINESS: BusinessData = {
  name: 'Pro Yatırım Gayrimenkul',
  ownerName: 'Alper Şen',
  sector: 'emlak',
  slogan: 'Gayrimenkulde yüksek getiri, düşük risk',
  phone: '0212 225 44 88',
  phoneClean: '902122254488',
  whatsapp: '902122254488',
  email: 'alper@proyatirim.com.tr',
  address: 'Cumhuriyet Cad. No.55 K.8, Şişli, İstanbul',
  city: 'İstanbul',
  district: 'Şişli',
  coordinates: { lat: 41.0612, lng: 28.9867 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { linkedin: 'https://linkedin.com/company/proyatirim', instagram: 'https://instagram.com/proyatirimgayrimenkul' },
  photos: [],
  services: [
    { id: 's1', name: 'Yatırım Danışmanlığı', icon: '📈' },
    { id: 's2', name: 'Portföy Analizi', icon: '📊' },
    { id: 's3', name: 'Kira Getirisi', icon: '💰' },
    { id: 's4', name: 'Kentsel Dönüşüm', icon: '🏗️' }],
  team: [{ id: 't1', name: 'Alper Şen', role: 'Yatırım Danışmanı', experience: '20 yıl' }],
  experience: '20 yıl',
  rating: 4.9,
  reviewCount: 98,
  foundedYear: 2004}

export const EMLAK_YATIRIM_CONFIG: ThemeConfig = {
  id: 'emlak-yatirim',
  name: 'Yatırım',
  sectorId: 'emlak',
  plan: 'pro',
  description: 'Koyu lacivert + altın, yatırım danışmanlığı. Şişli.',
  designPhilosophy: 'Investment gold — koyu arka plan, altın vurgu. ROI ve portföy büyümesi hissi.',
  isDark: true,
  cssVariables: EMLAK_YATIRIM_CSS,
  fonts: {
    heading: { family: 'Bodoni Moda', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'RealEstateAgent',
  sectorSections: ['property_listing_grid', 'neighborhood_map', 'real_estate_stats', 'valuation_request'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Pro Yatırım' },
        menuItems: [
          { label: 'Fırsatlar', href: '#portfolio' }, { label: 'Semtler', href: '#semtler' }, { label: 'Analiz', href: '#analiz' }],
        cta: { text: 'Danışanlık Al', href: '#analiz', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Pro Yatırım Gayrimenkul',
        copyright: '© 2024 Pro Yatırım',
        contact: { phone: '0212 225 44 88', address: 'Şişli, İstanbul' },
        social: [{ platform: 'linkedin', url: 'https://linkedin.com/company/proyatirim', icon: 'linkedin' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902122254488', message: 'Merhaba, gayrimenkul yatırımı hakkında danışmanlık almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Pro Yatırım Gayrimenkul — Şişli", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Şişli', title: "Pro Yatırım Gayrimenkul", subtitle: "Gayrimenkulde yüksek getiri, düşük risk", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'emlak_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122254488" }, editableFields: [] }
    ]
  }]
}
