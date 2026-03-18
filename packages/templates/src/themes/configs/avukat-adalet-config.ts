/**
 * avukat-adalet ThemeConfig (starter)
 * Navy + beyaz, ceza hukuku odaklı. Inter.
 * Business: Adalet Hukuk & Danışmanlık, Bakırköy Adalet
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const AVUKAT_ADALET_CSS: Record<string, string> = {
  '--color-bg': '#F8FAFC',
  '--color-surface': '#EFF4FF',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#DBEAFE',
  '--color-text': '#0C1445',
  '--color-text-secondary': '#1E3A8A',
  '--color-text-muted': '#6B7280',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#1E3A8A',
  '--color-accent-hover': '#1E2D72',
  '--color-accent-light': '#EFF4FF',
  '--color-border': '#BFDBFE',
  '--font-heading': "'Inter', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '10px',
  '--radius-btn': '8px'}

export const AVUKAT_ADALET_BUSINESS: BusinessData = {
  name: 'Adalet Hukuk & Danışmanlık',
  ownerName: 'Av. Seda Kaya',
  sector: 'avukat',
  slogan: 'Ceza hukukunda güvenilir savunuculuk',
  phone: '0212 571 33 22',
  phoneClean: '902125713322',
  whatsapp: '902125713322',
  email: 'iletisim@adalethukuk.com.tr',
  address: 'Zeytinlik Mah. Florya Cad. No.22 K.4, Bakırköy, İstanbul',
  city: 'İstanbul',
  district: 'Bakırköy',
  coordinates: { lat: 40.9786, lng: 28.8697 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: null, close: null },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { linkedin: 'https://linkedin.com/company/adalethukuk', instagram: 'https://instagram.com/adalethukuk' },
  photos: [],
  services: [
    { id: 's1', name: 'Ceza Savunması', price: 'Danışma: ₺2.000', icon: '⚖️' },
    { id: 's2', name: 'İş Hukuku', price: 'Danışma: ₺2.000', icon: '💼' },
    { id: 's3', name: 'İcra İflas', price: 'Danışma: ₺1.500', icon: '📜' },
    { id: 's4', name: 'Tazminat', price: 'Danışma: ₺1.500', icon: '⚡' }],
  team: [
    { id: 't1', name: 'Av. Seda Kaya', role: 'Kurucu Avukat — Ceza', experience: '14 yıl' },
    { id: 't2', name: 'Av. Tolga Öztürk', role: 'İş Hukuku Uzmanı', experience: '9 yıl' }],
  experience: '14 yıl',
  rating: 4.7,
  reviewCount: 205,
  foundedYear: 2010}

export const AVUKAT_ADALET_CONFIG: ThemeConfig = {
  id: 'avukat-adalet',
  name: 'Adalet',
  sectorId: 'avukat',
  plan: 'starter',
  description: 'Navy + beyaz, ceza hukuku. Bakırköy.',
  designPhilosophy: 'Güçlü navy — güven ve otorite, temiz modern layout.',
  isDark: false,
  cssVariables: AVUKAT_ADALET_CSS,
  fonts: {
    heading: { family: 'Oswald', weights: [700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'LegalService',
  sectorSections: ['legal_practice_areas', 'attorney_profile', 'consultation_widget'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Adalet Hukuk' },
        menuItems: [
          { label: 'Uzmanlıklar', href: '#uzmanliklar' }, { label: 'Avukatlar', href: '#avukatlar' },
          { label: 'Davalar', href: '#davalar' }, { label: 'Danışma', href: '#danisma' }],
        cta: { text: 'Ücretsiz Danışma', href: '#danisma', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Adalet Hukuk & Danışmanlık',
        copyright: '© 2024 Adalet Hukuk',
        contact: { phone: '0212 571 33 22', address: 'Bakırköy, İstanbul' },
        social: [{ platform: 'linkedin', url: 'https://linkedin.com/company/adalethukuk', icon: 'linkedin' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902125713322', message: 'Merhaba, hukuki danışmanlık hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Adalet Hukuk & Danışmanlık — Bakırköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Bakırköy', title: "Adalet Hukuk & Danışmanlık", subtitle: "Ceza hukukunda güvenilir savunuculuk", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'avukat_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902125713322" }, editableFields: [] }
    ]
  }]
}
