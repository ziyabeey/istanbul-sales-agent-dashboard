/**
 * avukat-ticaret ThemeConfig (enterprise)
 * Koyu mor + altın, özel ticaret/finans hukuku firması. Inter.
 * Business: Ticaret & Finans Hukuku Grubu, Maslak
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const AVUKAT_TICARET_CSS: Record<string, string> = {
  '--color-bg': '#0D0820',
  '--color-surface': '#18123A',
  '--color-surface-elevated': '#221A4A',
  '--color-surface-muted': '#2C2358',
  '--color-text': '#F0EBF8',
  '--color-text-secondary': '#B8A8D8',
  '--color-text-muted': '#7860A8',
  '--color-text-on-accent': '#0D0820',
  '--color-accent': '#D4AF37',
  '--color-accent-hover': '#B8960A',
  '--color-accent-light': 'rgba(212,175,55,0.15)',
  '--color-border': 'rgba(212,175,55,0.2)',
  '--font-heading': "'Libre Baskerville', serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '8px',
  '--radius-btn': '4px'}

export const AVUKAT_TICARET_BUSINESS: BusinessData = {
  name: 'TF Hukuk — Ticaret & Finans',
  ownerName: 'Av. Dr. Murat Ercan',
  sector: 'avukat',
  slogan: 'Finans hukukunda kurumsal güvenilirlik',
  phone: '0212 286 55 44',
  phoneClean: '902122865544',
  whatsapp: '902122865544',
  email: 'info@tfhukuk.com.tr',
  address: 'Maslak Mah. AOS 55. Sok. 42 Maslak Plaza K.12, Sarıyer, İstanbul',
  city: 'İstanbul',
  district: 'Maslak',
  coordinates: { lat: 41.1072, lng: 29.0196 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: null, close: null },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { linkedin: 'https://linkedin.com/company/tfhukuk', instagram: 'https://instagram.com/tfhukuk' },
  photos: [],
  services: [
    { id: 's1', name: 'Finans Hukuku', price: 'Teklife göre', icon: '🏦' },
    { id: 's2', name: 'M&A Danışmanlık', price: 'Teklife göre', icon: '🤝' },
    { id: 's3', name: 'Sermaye Piyasası', price: 'Teklife göre', icon: '📈' },
    { id: 's4', name: 'Uluslararası Tahkim', price: 'Teklife göre', icon: '⚖️' }],
  team: [
    { id: 't1', name: 'Av. Dr. Murat Ercan', role: 'Kurucu Ortak — LLM, PhD', experience: '20 yıl' },
    { id: 't2', name: 'Av. Ceylan Aslan', role: 'Finans & Sermaye Piyasası', experience: '16 yıl' }],
  experience: '20 yıl',
  rating: 4.9,
  reviewCount: 94,
  foundedYear: 2004}

export const AVUKAT_TICARET_CONFIG: ThemeConfig = {
  id: 'avukat-ticaret',
  name: 'Ticaret',
  sectorId: 'avukat',
  plan: 'enterprise',
  description: 'Koyu mor + altın, finans hukuku firması. Maslak.',
  designPhilosophy: 'Dark luxury — koyu mor zemin, gold aksan, serif başlıklar. Üst segment kurumsal hukuk.',
  isDark: true,
  cssVariables: AVUKAT_TICARET_CSS,
  fonts: {
    heading: { family: 'Space Grotesk', weights: [400, 700], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'LegalService',
  sectorSections: ['attorney_profile', 'legal_practice_areas', 'case_results', 'consultation_widget'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'TF Hukuk' },
        menuItems: [
          { label: 'Uzmanlıklar', href: '#uzmanliklar' }, { label: 'Ekip', href: '#ekip' },
          { label: 'Referanslar', href: '#referanslar' }, { label: 'İletişim', href: '#danisma' }],
        cta: { text: 'Danışma Talebi', href: '#danisma', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'TF Hukuk — Ticaret & Finans',
        copyright: '© 2024 TF Hukuk',
        contact: { phone: '0212 286 55 44', address: 'Maslak, İstanbul' },
        social: [{ platform: 'linkedin', url: 'https://linkedin.com/company/tfhukuk', icon: 'linkedin' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }, { label: 'Gizlilik', href: '/gizlilik' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902122865544', message: 'Merhaba, ticaret hukuku danışmanlığı hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "TF Hukuk — Ticaret & Finans — Maslak", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Maslak', title: "TF Hukuk — Ticaret & Finans", subtitle: "Finans hukukunda kurumsal güvenilirlik", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'avukat_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122865544" }, editableFields: [] }
    ]
  }]
}
