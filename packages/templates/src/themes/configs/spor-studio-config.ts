/**
 * @kepenk/templates — spor-studio ThemeConfig (starter)
 * Sarı/altın + beyaz, butik fitness stüdyo hissi. Outfit font.
 * Business: Studio Fit, Kadıköy
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const SPOR_STUDIO_CSS: Record<string, string> = {
  '--color-bg': '#FFFBEB',
  '--color-surface': '#FEF9C3',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FDE68A',
  '--color-text': '#1C1400',
  '--color-text-secondary': '#6B5000',
  '--color-text-muted': '#A07800',
  '--color-text-on-accent': '#1C1400',
  '--color-accent': '#F59E0B',
  '--color-accent-hover': '#D97706',
  '--color-accent-light': '#FEF3C7',
  '--color-border': '#FDE68A',
  '--font-heading': "'Outfit', sans-serif",
  '--font-body': "'Outfit', sans-serif",
  '--radius-card': '20px',
  '--radius-btn': '9999px'}

export const SPOR_STUDIO_BUSINESS: BusinessData = {
  name: 'Studio Fit',
  ownerName: 'Zeynep Aksu',
  sector: 'spor',
  slogan: 'Hareket et, hisset, dönüş',
  phone: '0216 349 52 11',
  phoneClean: '902163495211',
  whatsapp: '902163495211',
  email: 'hello@studiofit.com.tr',
  address: 'Moda Cad. Neşet Ömer Sk. No:12 D:3, Kadıköy, İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  coordinates: { lat: 40.9874, lng: 29.0295 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '07:00', close: '22:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '07:00', close: '22:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '07:00', close: '22:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '07:00', close: '22:00' },
    { day: 'friday', dayTr: 'Cuma', open: '07:00', close: '22:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '16:00' }],
  socialMedia: { instagram: 'https://instagram.com/studiofit.kadikoy' },
  photos: [],
  services: [
    { id: 's1', name: 'Pilates', price: '₺600/ders', icon: '🧘' },
    { id: 's2', name: 'Yoga', price: '₺550/ders', icon: '☯️' },
    { id: 's3', name: 'Barre', price: '₺650/ders', icon: '🩰' },
    { id: 's4', name: 'Reformer Pilates', price: '₺900/ders', icon: '⚙️' },
    { id: 's5', name: 'Dance Fit', price: '₺500/ders', icon: '💃' }],
  team: [
    { id: 't1', name: 'Zeynep Aksu', role: 'Kurucu & Pilates Eğitmeni', experience: '14 yıl' },
    { id: 't2', name: 'Ceren Yıldız', role: 'Yoga Eğitmeni', experience: '8 yıl' },
    { id: 't3', name: 'Hande Kaya', role: 'Barre & Dance Fit', experience: '6 yıl' }],
  experience: '10 yıl',
  rating: 4.9,
  reviewCount: 412,
  foundedYear: 2014}

export const SPOR_STUDIO_CONFIG: ThemeConfig = {
  id: 'spor-studio',
  name: 'Studio',
  sectorId: 'spor',
  plan: 'starter',
  description: 'Sarı/altın, butik fitness stüdyosu. Pilates/yoga/barre. Kadıköy.',
  designPhilosophy: 'Yumuşak sarı, yuvarlak formlar — ferah, enerjik, feminen.',
  isDark: false,
  cssVariables: SPOR_STUDIO_CSS,
  fonts: {
    heading: { family: 'Bodoni Moda', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Outfit', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'HealthClub',
  sectorSections: ['class_schedule', 'membership_pricing', 'transformation', 'team'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Studio Fit' },
        menuItems: [
          { label: 'Dersler', href: '#programlar' }, { label: 'Fiyatlar', href: '#uyelik' },
          { label: 'Eğitmenler', href: '#egitmenler' }, { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Deneme Dersi', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Studio Fit',
        copyright: '© 2024 Studio Fit',
        contact: { phone: '0216 349 52 11', address: 'Kadıköy, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/studiofit.kadikoy', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902163495211', message: 'Merhaba, deneme dersi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Studio Fit — Kadıköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Kadıköy', title: "Studio Fit", subtitle: "Hareket et, hisset, dönüş", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'spor_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902163495211" }, editableFields: [] }
    ]
  }]
}
