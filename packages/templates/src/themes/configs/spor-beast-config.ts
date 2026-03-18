/**
 * @kepenk/templates — spor-beast ThemeConfig (growth / dark)
 * Yeşil neon + siyah, CrossFit — en agresif dark tema.
 * Business: Beast CrossFit, Ataşehir
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const SPOR_BEAST_CSS: Record<string, string> = {
  '--color-bg': '#050F0A',
  '--color-surface': '#0A1A10',
  '--color-surface-elevated': '#103018',
  '--color-surface-muted': '#163D20',
  '--color-text': '#ECFDF5',
  '--color-text-secondary': '#6EE7B7',
  '--color-text-muted': '#34D399',
  '--color-text-on-accent': '#000000',
  '--color-accent': '#22C55E',
  '--color-accent-hover': '#16A34A',
  '--color-accent-light': '#163D20',
  '--color-border': '#1A4A28',
  '--font-heading': "'Bebas Neue', sans-serif",
  '--font-body': "'Roboto Condensed', sans-serif",
  '--radius-card': '4px',
  '--radius-btn': '4px'}

export const SPOR_BEAST_BUSINESS: BusinessData = {
  name: 'Beast CrossFit',
  ownerName: 'Levent Kara',
  sector: 'spor',
  slogan: 'Canavar içindeki seni uyandır',
  phone: '0216 688 33 22',
  phoneClean: '902166883322',
  whatsapp: '902166883322',
  email: 'wod@beastcrossfit.com.tr',
  address: 'Küçükbakkalköy Mah. Kayışdağı Cad. No:45, Ataşehir, İstanbul',
  city: 'İstanbul',
  district: 'Ataşehir',
  coordinates: { lat: 40.9956, lng: 29.1100 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '06:00', close: '22:30' },
    { day: 'tuesday', dayTr: 'Salı', open: '06:00', close: '22:30' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '06:00', close: '22:30' },
    { day: 'thursday', dayTr: 'Perşembe', open: '06:00', close: '22:30' },
    { day: 'friday', dayTr: 'Cuma', open: '06:00', close: '22:30' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '08:00', close: '20:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '09:00', close: '17:00' }],
  socialMedia: {
    instagram: 'https://instagram.com/beastcrossfit.ist',
    youtube: 'https://youtube.com/@beastcrossfit'},
  photos: [],
  services: [
    { id: 's1', name: 'CrossFit WOD', price: '', icon: '🔥' },
    { id: 's2', name: 'Olympic Lifting', price: '', icon: '🏋️' },
    { id: 's3', name: 'Gymnastic Skills', price: '', icon: '🤸' },
    { id: 's4', name: 'Open Gym', price: '', icon: '⚡' }],
  team: [
    { id: 't1', name: 'Levent Kara', role: 'Head Coach', experience: '12 yıl' },
    { id: 't2', name: 'Tuğba Öz', role: 'Olympic Lifting Coach', experience: '8 yıl' },
    { id: 't3', name: 'Can Polat', role: 'Gymnastics Coach', experience: '7 yıl' }],
  experience: '9 yıl',
  rating: 4.9,
  reviewCount: 567,
  foundedYear: 2015}

export const SPOR_BEAST_CONFIG: ThemeConfig = {
  id: 'spor-beast',
  name: 'Beast',
  sectorId: 'spor',
  plan: 'growth',
  description: 'Yeşil neon + siyah, CrossFit. Bebas Neue. Ataşehir.',
  designPhilosophy: 'Dark intensity — derin siyah, neon yeşil accent, bold typography.',
  isDark: true,
  cssVariables: SPOR_BEAST_CSS,
  fonts: {
    heading: { family: 'DM Sans', weights: [400], subsets: ['latin-ext'] },
    body: { family: 'Roboto Condensed', weights: [400, 700], subsets: ['latin-ext'] }},
  seoSchemaType: 'HealthClub',
  sectorSections: ['class_schedule', 'membership_pricing', 'transformation', 'team'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'BEAST CROSSFIT' },
        menuItems: [
          { label: 'WOD', href: '#wod' }, { label: 'Üyelik', href: '#uyelik' },
          { label: 'Coaches', href: '#coaches' }, { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Ücretsiz WOD Dene', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'minimal', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Beast CrossFit',
        copyright: '© 2024 Beast CrossFit',
        contact: { phone: '0216 688 33 22', address: 'Ataşehir, İstanbul' },
        social: [
          { platform: 'instagram', url: 'https://instagram.com/beastcrossfit.ist', icon: 'instagram' },
          { platform: 'youtube', url: 'https://youtube.com/@beastcrossfit', icon: 'youtube' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902166883322', message: 'Merhaba, ücretsiz WOD denemek istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Beast CrossFit — Ataşehir", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Ataşehir', title: "Beast CrossFit", subtitle: "Canavar içindeki seni uyandır", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'spor_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902166883322" }, editableFields: [] }
    ]
  }]
}
