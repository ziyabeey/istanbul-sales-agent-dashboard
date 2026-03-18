/**
 * organik-premium ThemeConfig (enterprise)
 * Siyah + altın, premium gurme & özel üretim. Cormorant Garamond.
 * Business: Noir Gurme, Nişantaşı
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const ORGANIK_PREMIUM_CSS: Record<string, string> = {
  '--color-bg': '#080808',
  '--color-surface': '#121212',
  '--color-surface-elevated': '#1C1C1C',
  '--color-surface-muted': '#272727',
  '--color-text': '#F5EDD6',
  '--color-text-secondary': '#CCBA8A',
  '--color-text-muted': '#7A6A4A',
  '--color-text-on-accent': '#080808',
  '--color-accent': '#D4AF37',
  '--color-accent-hover': '#B8943A',
  '--color-accent-light': 'rgba(212,175,55,0.12)',
  '--color-border': 'rgba(212,175,55,0.18)',
  '--font-heading': "'Cormorant Garamond', serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px',
  '--radius-btn': '9999px'}

export const ORGANIK_PREMIUM_BUSINESS: BusinessData = {
  name: 'Noir Gurme',
  ownerName: 'Alexandre & Dilara',
  sector: 'organik',
  slogan: 'Dünyanın dört bir yanından seçilmiş, sofranıza özel',
  phone: '0212 355 44 77',
  phoneClean: '902123554477',
  whatsapp: '902123554477',
  email: 'bonjour@noirGurme.com.tr',
  address: 'Abdi İpekçi Cad. No.10, Nişantaşı, İstanbul',
  city: 'İstanbul',
  district: 'Nişantaşı',
  coordinates: { lat: 41.0477, lng: 28.9966 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '19:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '12:00', close: '18:00' }],
  socialMedia: { instagram: 'https://instagram.com/noirGurme', facebook: 'https://facebook.com/noirGurme' },
  photos: [],
  services: [
    { id: 's1', name: 'Siyah Truffle', icon: '🍄' },
    { id: 's2', name: 'İtalyan Zeytinyağı', icon: '🫒' },
    { id: 's3', name: 'Gurme Kutusu', icon: '🎁' },
    { id: 's4', name: 'Kurumsal Hediye', icon: '💼' }],
  team: [{ id: 't1', name: 'Alexandre Petit', role: 'Gurme Küratör', experience: '22 yıl' }],
  experience: '22 yıl',
  rating: 5.0,
  reviewCount: 94,
  foundedYear: 2018}

export const ORGANIK_PREMIUM_CONFIG: ThemeConfig = {
  id: 'organik-premium',
  name: 'Premium',
  sectorId: 'organik',
  plan: 'enterprise',
  description: 'Siyah + altın, premium gurme & özel üretim. Nişantaşı.',
  designPhilosophy: 'Dark gourmet — truffle siyahı, altın etiket. Ultra lüks gurme deneyimi.',
  isDark: true,
  cssVariables: ORGANIK_PREMIUM_CSS,
  fonts: {
    heading: { family: 'Raleway', weights: [600, 700], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'FoodEstablishment',
  sectorSections: ['product_shop_grid', 'farm_story', 'food_stats_row', 'order_consult'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Noir Gurme' },
        menuItems: [
          { label: 'Koleksiyon', href: '#urunler' }, { label: 'Maison', href: '#hikaye' }, { label: 'Sipariş', href: '#siparis' }],
        cta: { text: 'Sipariş', href: '#siparis', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Noir Gurme',
        copyright: '© 2024 Noir Gurme',
        contact: { phone: '0212 355 44 77', address: 'Nişantaşı, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/noirGurme', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902123554477', message: 'Bonjour, gurme koleksiyonunuz hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Noir Gurme — Nişantaşı", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Nişantaşı', title: "Noir Gurme", subtitle: "Dünyanın dört bir yanından seçilmiş, sofranıza özel", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'organik_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902123554477" }, editableFields: [] }
    ]
  }]
}
