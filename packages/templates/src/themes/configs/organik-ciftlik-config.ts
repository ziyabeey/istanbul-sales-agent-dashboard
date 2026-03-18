/**
 * organik-ciftlik ThemeConfig (starter)
 * Toprak + turuncu, doğrudan çiftlikten üretici. Lato.
 * Business: Kır Çiftliği, Sakarya
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const ORGANIK_CIFTLIK_CSS: Record<string, string> = {
  '--color-bg': '#FFFBF0',
  '--color-surface': '#FEF3C7',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FDE68A',
  '--color-text': '#292600',
  '--color-text-secondary': '#65560A',
  '--color-text-muted': '#9E8B3C',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#D97706',
  '--color-accent-hover': '#B45309',
  '--color-accent-light': '#FEF3C7',
  '--color-border': '#FDE68A',
  '--font-heading': "'Lato', sans-serif",
  '--font-body': "'Lato', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '8px'}

export const ORGANIK_CIFTLIK_BUSINESS: BusinessData = {
  name: 'Kır Çiftliği',
  ownerName: 'Mustafa & Fatma Kaya',
  sector: 'organik',
  slogan: 'Kendi toprağımızda büyüttük, size getirdik',
  phone: '0264 273 45 67',
  phoneClean: '902642734567',
  whatsapp: '902642734567',
  email: 'siparis@kirciftligi.com.tr',
  address: 'Hendek İlçesi Kırsal Mah. No.12, Sakarya',
  city: 'Sakarya',
  district: 'Hendek',
  coordinates: { lat: 40.7890, lng: 30.7406 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '07:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '07:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '07:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '07:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '07:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '07:00', close: '14:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/kirciftligi', youtube: 'https://youtube.com/@kirciftligi' },
  photos: [],
  services: [
    { id: 's1', name: 'Taze Yumurta', icon: '🥚' },
    { id: 's2', name: 'Köy Peyniri', icon: '🧀' },
    { id: 's3', name: 'Domates & Biber', icon: '🍅' },
    { id: 's4', name: 'Bal & Reçel', icon: '🍯' }],
  team: [{ id: 't1', name: 'Mustafa Kaya', role: 'Çiftçi', experience: '25 yıl' }],
  experience: '25 yıl',
  rating: 5.0,
  reviewCount: 312,
  foundedYear: 1999}

export const ORGANIK_CIFTLIK_CONFIG: ThemeConfig = {
  id: 'organik-ciftlik',
  name: 'Çiftlik',
  sectorId: 'organik',
  plan: 'starter',
  description: 'Toprak + turuncu, doğrudan üretici çiftlik. Sakarya.',
  designPhilosophy: 'Harvest gold — buğday rengi, çiftlik sıcaklığı. Direkt üretici güveni.',
  isDark: false,
  cssVariables: ORGANIK_CIFTLIK_CSS,
  fonts: {
    heading: { family: 'Cinzel', weights: [700, 900], subsets: ['latin-ext'] },
    body: { family: 'Lato', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'FoodEstablishment',
  sectorSections: ['product_shop_grid', 'farm_story', 'food_stats_row', 'order_consult'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Kır Çiftliği 🌾' },
        menuItems: [
          { label: 'Ürünler', href: '#urunler' }, { label: 'Biz Kimiz', href: '#hikaye' }, { label: 'Sipariş', href: '#siparis' }],
        cta: { text: 'Sipariş Ver', href: '#siparis', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Kır Çiftliği',
        copyright: '© 2024 Kır Çiftliği',
        contact: { phone: '0264 273 45 67', address: 'Hendek, Sakarya' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/kirciftligi', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902642734567', message: 'Merhaba, çiftlik ürünleri hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Kır Çiftliği — Hendek", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Hendek', title: "Kır Çiftliği", subtitle: "Kendi toprağımızda büyüttük, size getirdik", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'organik_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902642734567" }, editableFields: [] }
    ]
  }]
}
