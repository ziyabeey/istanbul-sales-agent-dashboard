/**
 * @kepenk/templates — spor-iron ThemeConfig (free)
 * Kırmızı/siyah, hardcore powerlifting hissi. Syne bold.
 * Business: Iron Gym, Bağcılar
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const SPOR_IRON_CSS: Record<string, string> = {
  '--color-bg': '#0A0A0A',
  '--color-surface': '#111111',
  '--color-surface-elevated': '#1A1A1A',
  '--color-surface-muted': '#222222',
  '--color-text': '#F5F5F5',
  '--color-text-secondary': '#AAAAAA',
  '--color-text-muted': '#666666',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#EF4444',
  '--color-accent-hover': '#DC2626',
  '--color-accent-light': '#3A1212',
  '--color-border': '#2A2A2A',
  '--font-heading': "'Syne', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '8px',
  '--radius-btn': '4px'}

export const SPOR_IRON_BUSINESS: BusinessData = {
  name: 'Iron Gym',
  ownerName: 'Hakan Demir',
  sector: 'spor',
  slogan: 'Demir yalan söylemez',
  phone: '0212 502 17 88',
  phoneClean: '902125021788',
  whatsapp: '902125021788',
  email: 'info@irongym.com.tr',
  address: 'Güneşli Mah. Halit Ziya Türkkan Sk. No:8, Bağcılar, İstanbul',
  city: 'İstanbul',
  district: 'Bağcılar',
  coordinates: { lat: 41.0541, lng: 28.8310 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '06:00', close: '23:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '06:00', close: '23:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '06:00', close: '23:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '06:00', close: '23:00' },
    { day: 'friday', dayTr: 'Cuma', open: '06:00', close: '23:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '08:00', close: '21:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '09:00', close: '18:00' }],
  socialMedia: { instagram: 'https://instagram.com/irongym.istanbul', youtube: 'https://youtube.com/@irongym' },
  photos: [],
  services: [
    { id: 's1', name: 'Powerlifting', price: '', icon: '🏋️' },
    { id: 's2', name: 'Bodybuilding', price: '', icon: '💪' },
    { id: 's3', name: 'Fonksiyonel', price: '', icon: '⚡' },
    { id: 's4', name: 'Kişisel Antrenör', price: '₺800/seans', icon: '🎯' }],
  team: [
    { id: 't1', name: 'Hakan Demir', role: 'Baş Antrenör', experience: '15 yıl' },
    { id: 't2', name: 'Mert Yılmaz', role: 'Powerlifting Koç', experience: '10 yıl' }],
  experience: '12 yıl',
  rating: 4.7,
  reviewCount: 289,
  foundedYear: 2012}

export const SPOR_IRON_CONFIG: ThemeConfig = {
  id: 'spor-iron',
  name: 'Iron',
  sectorId: 'spor',
  plan: 'free',
  description: 'Kırmızı/siyah hardcore powerlifting hissi. Bağcılar.',
  designPhilosophy: 'Dark metal — siyah zemin, kırmızı enerji, Syne bold başlıklar.',
  isDark: true,
  cssVariables: SPOR_IRON_CSS,
  fonts: {
    heading: { family: 'Oswald', weights: [700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'HealthClub',
  sectorSections: ['class_schedule', 'membership_pricing', 'transformation'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'IRON GYM' },
        menuItems: [
          { label: 'Programlar', href: '#programlar' },
          { label: 'Üyelik', href: '#uyelik' },
          { label: 'Eğitmenler', href: '#egitmenler' },
          { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Üye Ol', href: '#uyelik', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'minimal', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Iron Gym',
        copyright: '© 2024 Iron Gym',
        contact: { phone: '0212 502 17 88', address: 'Bağcılar, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/irongym.istanbul', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902125021788', message: 'Merhaba, üyelik hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Iron Gym — Bağcılar", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Bağcılar', title: "Iron Gym", subtitle: "Demir yalan söylemez", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'spor_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902125021788" }, editableFields: [] }
    ]
  }]
}
