/**
 * organik-sut ThemeConfig (growth)
 * Krem + mavi, süt ürünleri & mandıra. Merriweather.
 * Business: Çiğ Süt Mandırası, Bolu
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const ORGANIK_SUT_CSS: Record<string, string> = {
  '--color-bg': '#F8FBFF',
  '--color-surface': '#EBF4FF',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#DAEAFF',
  '--color-text': '#0A1929',
  '--color-text-secondary': '#1A3A5A',
  '--color-text-muted': '#6B7280',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#1565C0',
  '--color-accent-hover': '#0D47A1',
  '--color-accent-light': '#E3F2FD',
  '--color-border': '#BBDEFB',
  '--font-heading': "'Merriweather', serif",
  '--font-body': "'Lato', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '8px'}

export const ORGANIK_SUT_BUSINESS: BusinessData = {
  name: 'Bolu Çiğ Süt Mandırası',
  ownerName: 'Ahmet Aydın',
  sector: 'organik',
  slogan: 'Bolu\'nun berrak sütü, doğruca kapınıza',
  phone: '0374 222 45 67',
  phoneClean: '903742224567',
  whatsapp: '903742224567',
  email: 'siparis@bolumandira.com.tr',
  address: 'Köroğlu Yolu km:5, Bolu Merkez, Bolu',
  city: 'Bolu',
  district: 'Merkez',
  coordinates: { lat: 40.7386, lng: 31.6053 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '06:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '06:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '06:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '06:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '06:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '06:00', close: '14:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '07:00', close: '12:00' }],
  socialMedia: { instagram: 'https://instagram.com/bolumandira', facebook: 'https://facebook.com/bolumandira' },
  photos: [],
  services: [
    { id: 's1', name: 'Taze Çiğ Süt', icon: '🥛' },
    { id: 's2', name: 'Mandıra Yoğurdu', icon: '🍶' },
    { id: 's3', name: 'Kaymak & Tereyağı', icon: '🧈' },
    { id: 's4', name: 'Tulum Peyniri', icon: '🧀' }],
  team: [{ id: 't1', name: 'Ahmet Aydın', role: '3. Nesil Süt Üreticisi', experience: '30 yıl' }],
  experience: '30 yıl',
  rating: 4.9,
  reviewCount: 621,
  foundedYear: 1994}

export const ORGANIK_SUT_CONFIG: ThemeConfig = {
  id: 'organik-sut',
  name: 'Süt',
  sectorId: 'organik',
  plan: 'growth',
  description: 'Krem + mavi, mandıra & süt ürünleri. Bolu.',
  designPhilosophy: 'Milk blue — saf, temiz, güvenilir. Mandıra beyazı ve dağ mavisi.',
  isDark: false,
  cssVariables: ORGANIK_SUT_CSS,
  fonts: {
    heading: { family: 'Inter', weights: [700, 900], subsets: ['latin-ext'] },
    body: { family: 'Lato', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'FoodEstablishment',
  sectorSections: ['product_shop_grid', 'nutrition_facts', 'farm_story', 'order_consult'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Bolu Mandıra 🥛' },
        menuItems: [
          { label: 'Ürünler', href: '#urunler' }, { label: 'Besin Değerleri', href: '#besin' }, { label: 'Sipariş', href: '#siparis' }],
        cta: { text: 'Sipariş Ver', href: '#siparis', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Bolu Çiğ Süt Mandırası',
        copyright: '© 2024 Bolu Mandıra',
        contact: { phone: '0374 222 45 67', address: 'Bolu Merkez, Bolu' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/bolumandira', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '903742224567', message: 'Merhaba, Bolu mandıra ürünleri hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Bolu Çiğ Süt Mandırası — Merkez", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Merkez', title: "Bolu Çiğ Süt Mandırası", subtitle: "Bolu'nun Doğal Sütü", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'organik_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "903742224567" }, editableFields: [] }
    ]
  }]
}
