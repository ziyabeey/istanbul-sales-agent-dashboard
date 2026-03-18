/**
 * organik-pazar ThemeConfig (free)
 * Yeşil + krem, genel organik market. Nunito.
 * Business: Doğa Market, Kadıköy
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const ORGANIK_PAZAR_CSS: Record<string, string> = {
  '--color-bg': '#FAFFF5',
  '--color-surface': '#EDF7E3',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#D4EBC8',
  '--color-text': '#1A2E12',
  '--color-text-secondary': '#2D5218',
  '--color-text-muted': '#6B7280',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#3D8B2E',
  '--color-accent-hover': '#2F6E22',
  '--color-accent-light': '#E5F5DB',
  '--color-border': '#C5E0B5',
  '--font-heading': "'Nunito', sans-serif",
  '--font-body': "'Nunito', sans-serif",
  '--radius-card': '14px',
  '--radius-btn': '9999px'}

export const ORGANIK_PAZAR_BUSINESS: BusinessData = {
  name: 'Doğa Market',
  ownerName: 'Berk Demir',
  sector: 'organik',
  slogan: 'Doğruca çiftlikten sofranıza',
  phone: '0216 451 22 33',
  phoneClean: '902164512233',
  whatsapp: '902164512233',
  email: 'siparis@dogamarket.com.tr',
  address: 'Moda Cad. No.24, Kadıköy, İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  coordinates: { lat: 40.9847, lng: 29.0282 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '19:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '17:00' }],
  socialMedia: { instagram: 'https://instagram.com/dogamarket', facebook: 'https://facebook.com/dogamarket' },
  photos: [],
  services: [
    { id: 's1', name: 'Organik Sebze & Meyve', icon: '🥦' },
    { id: 's2', name: 'Doğal Süt Ürünleri', icon: '🥛' },
    { id: 's3', name: 'Haftalık Sepet', icon: '🧺' },
    { id: 's4', name: 'Hızlı Teslimat', icon: '🚚' }],
  team: [{ id: 't1', name: 'Berk Demir', role: 'Kurucu', experience: '9 yıl' }],
  experience: '9 yıl',
  rating: 4.9,
  reviewCount: 528,
  foundedYear: 2015}

export const ORGANIK_PAZAR_CONFIG: ThemeConfig = {
  id: 'organik-pazar',
  name: 'Pazar',
  sectorId: 'organik',
  plan: 'free',
  description: 'Yeşil + krem, organik market. Kadıköy.',
  designPhilosophy: 'Fresh green — doğal, taze, güven. Organik market klasiği.',
  isDark: false,
  cssVariables: ORGANIK_PAZAR_CSS,
  fonts: {
    heading: { family: 'DM Sans', weights: [700, 800], subsets: ['latin-ext'] },
    body: { family: 'Nunito', weights: [400, 500, 600], subsets: ['latin-ext'] }},
  seoSchemaType: 'Store',
  sectorSections: ['product_shop_grid', 'farm_story', 'food_stats_row', 'order_consult'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Doğa Market 🌿' },
        menuItems: [
          { label: 'Ürünler', href: '#urunler' }, { label: 'Biz Kimiz', href: '#hikaye' }, { label: 'Sipariş', href: '#siparis' }],
        cta: { text: 'Sipariş Ver', href: '#siparis', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Doğa Market',
        copyright: '© 2024 Doğa Market',
        contact: { phone: '0216 451 22 33', address: 'Kadıköy, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/dogamarket', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902164512233', message: 'Merhaba, organik ürün siparişi vermek istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Doğa Market — Kadıköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Kadıköy', title: "Doğa Market", subtitle: "Doğruca çiftlikten sofranıza", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'organik_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902164512233" }, editableFields: [] }
    ]
  }]
}
