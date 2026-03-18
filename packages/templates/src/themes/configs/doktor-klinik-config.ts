/**
 * @kepenk/templates — doktor-klinik ThemeConfig (starter)
 * Beyaz + yeşil, aile hekimi / aile kliniği. Plus Jakarta Sans.
 * Business: Sağlık Aile Kliniği, Bağcılar
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const DOKTOR_KLINIK_CSS: Record<string, string> = {
  '--color-bg': '#F0FDF4',
  '--color-surface': '#DCFCE7',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#BBF7D0',
  '--color-text': '#052E16',
  '--color-text-secondary': '#166534',
  '--color-text-muted': '#16A34A',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#059669',
  '--color-accent-hover': '#047857',
  '--color-accent-light': '#D1FAE5',
  '--color-border': '#A7F3D0',
  '--font-heading': "'Plus Jakarta Sans', sans-serif",
  '--font-body': "'Plus Jakarta Sans', sans-serif",
  '--radius-card': '16px',
  '--radius-btn': '9999px'}

export const DOKTOR_KLINIK_BUSINESS: BusinessData = {
  name: 'Sağlık Aile Kliniği',
  ownerName: 'Dr. Fatma Çelik',
  sector: 'doktor',
  slogan: 'Aile sağlığınız bizim güvencemiz',
  phone: '0212 640 88 77',
  phoneClean: '902126408877',
  whatsapp: '902126408877',
  email: 'randevu@saglikaileklinigi.com.tr',
  address: 'Sancaktepe Mah. Onar Cad. No.8, Bağcılar, İstanbul',
  city: 'İstanbul',
  district: 'Bağcılar',
  coordinates: { lat: 41.0433, lng: 28.8478 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:30', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:30', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:30', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:30', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:30', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/saglikaileklinigi' },
  photos: [],
  services: [
    { id: 's1', name: 'Aile Hekimliği', price: '₺600', icon: '👨‍👩‍👧' },
    { id: 's2', name: 'Çocuk Muayenesi', price: '₺700', icon: '👶' },
    { id: 's3', name: 'Gebelik Takibi', price: '₺1.000', icon: '🤰' },
    { id: 's4', name: 'Aşı Takip', price: '₺0', icon: '💉' }],
  team: [
    { id: 't1', name: 'Dr. Fatma Çelik', role: 'Aile Hekimi', experience: '16 yıl' },
    { id: 't2', name: 'Dr. Kemal Aydın', role: 'Çocuk Sağlığı', experience: '12 yıl' }],
  experience: '16 yıl',
  rating: 4.8,
  reviewCount: 623,
  foundedYear: 2008}

export const DOKTOR_KLINIK_CONFIG: ThemeConfig = {
  id: 'doktor-klinik',
  name: 'Klinik',
  sectorId: 'doktor',
  plan: 'starter',
  description: 'Yeşil + beyaz, aile kliniği. Bağcılar.',
  designPhilosophy: 'Yeşil sağlık — temiz, güvence verici, sıcak aile kliniği hissi.',
  isDark: false,
  cssVariables: DOKTOR_KLINIK_CSS,
  fonts: {
    heading: { family: 'Lora', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Plus Jakarta Sans', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'MedicalBusiness',
  sectorSections: ['treatment_accordion', 'booking', 'insurance_logos', 'clinic_grid'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Sağlık Aile Kliniği' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' }, { label: 'Doktorlar', href: '#doktorlar' },
          { label: 'Sigortalar', href: '#sigortalar' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Randevu Al', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Sağlık Aile Kliniği',
        copyright: '© 2024 Sağlık Aile Kliniği',
        contact: { phone: '0212 640 88 77', address: 'Bağcılar, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/saglikaileklinigi', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }, { label: 'Aydınlatma', href: '/aydinlatma' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902126408877', message: 'Merhaba, randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Sağlık Aile Kliniği — Bağcılar", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Bağcılar', title: "Sağlık Aile Kliniği", subtitle: "Aile sağlığınız bizim güvencemiz", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'doktor_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902126408877" }, editableFields: [] }
    ]
  }]
}
