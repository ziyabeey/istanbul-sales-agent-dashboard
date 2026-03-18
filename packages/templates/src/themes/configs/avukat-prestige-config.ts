/**
 * avukat-prestige ThemeConfig (free)
 * Siyah + gold, klasik hukuk bürosu prestij.
 * Business: Yılmaz Hukuk Bürosu, Çağlayan Adalet Sarayı
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const AVUKAT_PRESTIGE_CSS: Record<string, string> = {
  '--color-bg': '#FAFAF8',
  '--color-surface': '#F2F0EC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E8E4DA',
  '--color-text': '#1A1208',
  '--color-text-secondary': '#4A3F2A',
  '--color-text-muted': '#8B7A5A',
  '--color-text-on-accent': '#1A1208',
  '--color-accent': '#D4AF37',
  '--color-accent-hover': '#B8960A',
  '--color-accent-light': '#FFF8DC',
  '--color-border': '#D4C49A',
  '--font-heading': "'Libre Baskerville', serif",
  '--font-body': "'Source Sans 3', sans-serif",
  '--radius-card': '6px',
  '--radius-btn': '4px'}

export const AVUKAT_PRESTIGE_BUSINESS: BusinessData = {
  name: 'Yılmaz Hukuk Bürosu',
  ownerName: 'Av. Kemal Yılmaz',
  sector: 'avukat',
  slogan: 'Hukukun gücü, yanınızda',
  phone: '0212 621 88 44',
  phoneClean: '902126218844',
  whatsapp: '902126218844',
  email: 'info@yilmazhukuk.com.tr',
  address: 'Çağlayan Mah. Çağlayan Adalet Sarayı Karşısı, No.18 K.5, Kâğıthane, İstanbul',
  city: 'İstanbul',
  district: 'Kâğıthane',
  coordinates: { lat: 41.0718, lng: 28.9815 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: null, close: null },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { linkedin: 'https://linkedin.com/in/av-kemal-yilmaz', instagram: 'https://instagram.com/yilmazhukuk' },
  photos: [],
  services: [
    { id: 's1', name: 'Ceza Hukuku', price: '₺2.000 danışma', icon: '⚖️' },
    { id: 's2', name: 'İcra & İflas', price: '₺1.500 danışma', icon: '📜' },
    { id: 's3', name: 'Aile Hukuku', price: '₺1.500 danışma', icon: '👨‍👩‍👧' },
    { id: 's4', name: 'Miras Hukuku', price: '₺2.000 danışma', icon: '🏛️' }],
  team: [{ id: 't1', name: 'Av. Kemal Yılmaz', role: 'Kurucu Avukat', experience: '18 yıl' }],
  experience: '18 yıl',
  rating: 4.8,
  reviewCount: 312,
  foundedYear: 2006}

export const AVUKAT_PRESTIGE_CONFIG: ThemeConfig = {
  id: 'avukat-prestige',
  name: 'Prestige',
  sectorId: 'avukat',
  plan: 'free',
  description: 'Siyah + gold, klasik hukuk bürosu. Çağlayan.',
  designPhilosophy: 'Gold detaylar, serif başlıklar — prestij ve otorite.',
  isDark: false,
  cssVariables: AVUKAT_PRESTIGE_CSS,
  fonts: {
    heading: { family: 'Inter', weights: [400, 700], subsets: ['latin-ext'] },
    body: { family: 'Source Sans 3', weights: [400, 600], subsets: ['latin-ext'] }},
  seoSchemaType: 'LegalService',
  sectorSections: ['legal_practice_areas', 'consultation_widget'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Yılmaz Hukuk' },
        menuItems: [
          { label: 'Uzmanlıklar', href: '#uzmanliklar' }, { label: 'Hakkımızda', href: '#hakkimizda' },
          { label: 'SSS', href: '#sss' }, { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Danışma Al', href: '#danisma', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Yılmaz Hukuk Bürosu',
        copyright: '© 2024 Yılmaz Hukuk Bürosu',
        contact: { phone: '0212 621 88 44', address: 'Kâğıthane, İstanbul' },
        social: [{ platform: 'linkedin', url: 'https://linkedin.com/in/av-kemal-yilmaz', icon: 'linkedin' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }, { label: 'Gizlilik', href: '/gizlilik' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902126218844', message: 'Merhaba, hukuki danışmanlık hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Yılmaz Hukuk Bürosu — Kâğıthane", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Kâğıthane', title: "Yılmaz Hukuk Bürosu", subtitle: "Hukukun gücü, yanınızda", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'avukat_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902126218844" }, editableFields: [] }
    ]
  }]
}
