/**
 * avukat-aile ThemeConfig (pro)
 * Yeşil + beyaz, aile & boşanma hukuku. Nunito.
 * Business: Av. Elif Güneş — Aile Hukuku, Üsküdar
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const AVUKAT_AILE_CSS: Record<string, string> = {
  '--color-bg': '#F7FEF7',
  '--color-surface': '#ECFDF5',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#D1FAE5',
  '--color-text': '#064E3B',
  '--color-text-secondary': '#065F46',
  '--color-text-muted': '#6B7280',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#059669',
  '--color-accent-hover': '#047857',
  '--color-accent-light': '#ECFDF5',
  '--color-border': '#A7F3D0',
  '--font-heading': "'Nunito', sans-serif",
  '--font-body': "'Nunito', sans-serif",
  '--radius-card': '16px',
  '--radius-btn': '9999px'}

export const AVUKAT_AILE_BUSINESS: BusinessData = {
  name: 'Av. Elif Güneş — Aile Hukuku',
  ownerName: 'Av. Elif Güneş',
  sector: 'avukat',
  slogan: 'Zor anlarda güvenilir hukuki destek',
  phone: '0216 340 77 22',
  phoneClean: '902163407722',
  whatsapp: '902163407722',
  email: 'info@avelilgunes.com.tr',
  address: 'Mimar Sinan Mah. Paşalimanı Cad. No.16 D.3, Üsküdar, İstanbul',
  city: 'İstanbul',
  district: 'Üsküdar',
  coordinates: { lat: 41.0280, lng: 29.0149 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: null, close: null },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/aveligunes', linkedin: 'https://linkedin.com/in/av-elif-gunes' },
  photos: [],
  services: [
    { id: 's1', name: 'Boşanma Davası', price: 'Danışma: ₺1.500', icon: '⚖️' },
    { id: 's2', name: 'Velayet', price: 'Danışma: ₺1.500', icon: '👧' },
    { id: 's3', name: 'Nafaka', price: 'Danışma: ₺1.000', icon: '💰' },
    { id: 's4', name: 'Mal Paylaşımı', price: 'Danışma: ₺2.000', icon: '🏠' }],
  team: [{ id: 't1', name: 'Av. Elif Güneş', role: 'Aile & Boşanma Hukuku Uzmanı', experience: '12 yıl' }],
  experience: '12 yıl',
  rating: 5.0,
  reviewCount: 248,
  foundedYear: 2012}

export const AVUKAT_AILE_CONFIG: ThemeConfig = {
  id: 'avukat-aile',
  name: 'Aile',
  sectorId: 'avukat',
  plan: 'pro',
  description: 'Yeşil + beyaz, aile hukuku uzmanı. Üsküdar.',
  designPhilosophy: 'Sıcak yeşil — güven ve umut, boşanma hukukunun zor sürecinde kolaylaştırıcı.',
  isDark: false,
  cssVariables: AVUKAT_AILE_CSS,
  fonts: {
    heading: { family: 'Playfair Display', weights: [700, 800], subsets: ['latin-ext'] },
    body: { family: 'Nunito', weights: [400, 500, 600], subsets: ['latin-ext'] }},
  seoSchemaType: 'LegalService',
  sectorSections: ['attorney_profile', 'legal_practice_areas', 'legal_faq', 'consultation_widget'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Av. Elif Güneş' },
        menuItems: [
          { label: 'Hakkımda', href: '#hakkimda' }, { label: 'Hizmetler', href: '#hizmetler' },
          { label: 'SSS', href: '#sss' }, { label: 'Danışma', href: '#danisma' }],
        cta: { text: 'Ücretsiz Danışma', href: '#danisma', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Av. Elif Güneş',
        copyright: '© 2024 Av. Elif Güneş',
        contact: { phone: '0216 340 77 22', address: 'Üsküdar, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/aveligunes', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902163407722', message: 'Merhaba, aile hukuku konusunda danışmak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Av. Elif Güneş — Aile Hukuku — Üsküdar", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Üsküdar', title: "Av. Elif Güneş — Aile Hukuku", subtitle: "Zor anlarda güvenilir hukuki destek", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'avukat_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902163407722" }, editableFields: [] }
    ]
  }]
}
