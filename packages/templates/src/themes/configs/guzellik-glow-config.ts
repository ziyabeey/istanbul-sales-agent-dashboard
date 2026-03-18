/**
 * @kepenk/templates — guzellik-glow ThemeConfig (growth / dark)
 * Koyu mor, neon glow efektleri. Syne bold. Levent modern beauty studio.
 * Business: GLOW Studio, Levent
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const GUZELLIK_GLOW_CSS: Record<string, string> = {
  '--color-bg': '#0D0417',
  '--color-surface': '#160924',
  '--color-surface-elevated': '#1E0F30',
  '--color-surface-muted': '#2A1545',
  '--color-text': '#F5F0FF',
  '--color-text-secondary': '#C4AEE8',
  '--color-text-muted': '#8B72B0',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#7C3AED',
  '--color-accent-hover': '#6D28D9',
  '--color-accent-light': '#2A1545',
  '--color-border': '#3D1F63',
  '--font-heading': "'Syne', sans-serif",
  '--font-body': "'Plus Jakarta Sans', sans-serif",
  '--radius-card': '16px',
  '--radius-btn': '8px'}

export const GUZELLIK_GLOW_BUSINESS: BusinessData = {
  name: 'GLOW Studio',
  ownerName: 'Selin Karaçay',
  sector: 'guzellik',
  slogan: 'Işıltını bul, kendini keşfet',
  phone: '0212 317 88 44',
  phoneClean: '902123178844',
  whatsapp: '902123178844',
  email: 'hello@glowstudio.com.tr',
  address: 'Büyükdere Cad. Kanyon AVM No:185 K:4, Levent, İstanbul',
  city: 'İstanbul',
  district: 'Levent',
  coordinates: { lat: 41.0771, lng: 29.0108 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '21:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '21:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '21:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '21:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '21:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '20:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '12:00', close: '18:00' }],
  socialMedia: {
    instagram: 'https://instagram.com/glowstudio.ist',
    tiktok: 'https://tiktok.com/@glowstudio'},
  photos: [],
  services: [
    { id: 's1', name: 'Glow Facial', price: '₺1.500', duration: '80 dk', icon: '✨' },
    { id: 's2', name: 'LED Terapi', price: '₺800', duration: '40 dk', icon: '💡' },
    { id: 's3', name: 'Hyalu Boost', price: '₺2.200', duration: '60 dk', icon: '💉' },
    { id: 's4', name: 'Lazer Cilt', price: '₺3.500', duration: '45 dk', icon: '⚡' },
    { id: 's5', name: 'Brows & Lashes', duration: '90 dk', price: '₺1.800', icon: '👁️' }],
  team: [
    { id: 't1', name: 'Selin Karaçay', role: 'Kurucu & Medikal Estetik Uzmanı', experience: '12 yıl' },
    { id: 't2', name: 'Deniz Yılmaz', role: 'Lazer Teknisyeni', experience: '6 yıl' },
    { id: 't3', name: 'Buse Öztürk', role: 'Brows & Lashes Sanatçısı', experience: '5 yıl' }],
  experience: '10 yıl',
  rating: 4.9,
  reviewCount: 524,
  foundedYear: 2014}

export const GUZELLIK_GLOW_CONFIG: ThemeConfig = {
  id: 'guzellik-glow',
  name: 'Glow',
  sectorId: 'guzellik',
  plan: 'growth',
  description: 'Koyu mor, neon glow efektleri. Syne bold. Levent modern beauty studio.',
  designPhilosophy: 'Dark luxury — derin mor, parlak accent, ultra-modern hissiyat.',
  isDark: true,
  cssVariables: GUZELLIK_GLOW_CSS,
  fonts: {
    heading: { family: 'Cormorant Garamond', weights: [700, 800], subsets: ['latin-ext'] },
    body: { family: 'Plus Jakarta Sans', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'BeautySalon',
  sectorSections: ['before_after', 'services', 'team', 'instagram_feed'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'GLOW' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' },
          { label: 'Ekip', href: '#ekip' },
          { label: 'Üyelik', href: '#uyelik' },
          { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Randevu', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'minimal', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'GLOW Studio',
        copyright: '© 2024 GLOW Studio',
        contact: { phone: '0212 317 88 44', address: 'Levent, İstanbul' },
        social: [
          { platform: 'instagram', url: 'https://instagram.com/glowstudio.ist', icon: 'instagram' },
          { platform: 'tiktok', url: 'https://tiktok.com/@glowstudio', icon: 'tiktok' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902123178844', message: 'Merhaba, GLOW\'da randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "GLOW Studio — Levent", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Levent', title: "GLOW Studio", subtitle: "Işıltını bul, kendini keşfet", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'guzellik_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902123178844" }, editableFields: [] }
    ]
  }]
}
