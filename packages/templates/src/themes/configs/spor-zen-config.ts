/**
 * @kepenk/templates — spor-zen ThemeConfig (pro)
 * Mor + beyaz, wellness studio, yoga/meditasyon/pilates premium.
 * Business: Zen Wellness Studio, Beşiktaş
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const SPOR_ZEN_CSS: Record<string, string> = {
  '--color-bg': '#FAF5FF',
  '--color-surface': '#F3E8FF',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E9D5FF',
  '--color-text': '#150A1E',
  '--color-text-secondary': '#4A2480',
  '--color-text-muted': '#7C3AED',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#7C3AED',
  '--color-accent-hover': '#6D28D9',
  '--color-accent-light': '#EDE9FE',
  '--color-border': '#DDD6FE',
  '--font-heading': "'Cormorant Garamond', serif",
  '--font-body': "'Plus Jakarta Sans', sans-serif",
  '--radius-card': '20px',
  '--radius-btn': '9999px'}

export const SPOR_ZEN_BUSINESS: BusinessData = {
  name: 'Zen Wellness Studio',
  ownerName: 'Pınar Arslan',
  sector: 'spor',
  slogan: 'Nefes al, dönüş, dengeyi bul',
  phone: '0212 261 78 90',
  phoneClean: '902122617890',
  whatsapp: '902122617890',
  email: 'namaste@zenwellness.com.tr',
  address: 'Sinanpaşa Mah. Çırağan Cad. No:18 K:3, Beşiktaş, İstanbul',
  city: 'İstanbul',
  district: 'Beşiktaş',
  coordinates: { lat: 41.0450, lng: 29.0050 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '07:00', close: '21:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '07:00', close: '21:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '07:00', close: '21:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '07:00', close: '21:00' },
    { day: 'friday', dayTr: 'Cuma', open: '07:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '16:00' }],
  socialMedia: { instagram: 'https://instagram.com/zenwellness.istanbul' },
  photos: [],
  services: [
    { id: 's1', name: 'Iyengar Yoga', price: '₺800/ders', icon: '☯️' },
    { id: 's2', name: 'Meditasyon', price: '₺600/ders', icon: '🧘' },
    { id: 's3', name: 'Reformer Pilates', price: '₺1.200/ders', icon: '⚙️' },
    { id: 's4', name: 'Breathwork', price: '₺700/ders', icon: '💨' },
    { id: 's5', name: 'Wellness Koçluğu', price: '₺2.500/ay', icon: '🌿' }],
  team: [
    { id: 't1', name: 'Pınar Arslan', role: 'Kurucu & Yoga Öğretmeni', experience: '18 yıl' },
    { id: 't2', name: 'Nilüfer Çelik', role: 'Meditasyon & Breathwork', experience: '10 yıl' },
    { id: 't3', name: 'Aslı Koç', role: 'Reformer Pilates', experience: '8 yıl' }],
  experience: '15 yıl',
  rating: 5.0,
  reviewCount: 298,
  foundedYear: 2009}

export const SPOR_ZEN_CONFIG: ThemeConfig = {
  id: 'spor-zen',
  name: 'Zen',
  sectorId: 'spor',
  plan: 'pro',
  description: 'Mor + beyaz, mindful wellness premium. Beşiktaş.',
  designPhilosophy: 'Sakin lavanta tonlar, ince serif başlıklar — huzur ve sofistike.',
  isDark: false,
  cssVariables: SPOR_ZEN_CSS,
  fonts: {
    heading: { family: 'Cormorant Garamond', weights: [400, 600], subsets: ['latin-ext'] },
    body: { family: 'Plus Jakarta Sans', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'HealthClub',
  sectorSections: ['class_schedule', 'membership_pricing', 'team'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.0s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Zen Wellness' },
        menuItems: [
          { label: 'Dersler', href: '#programlar' }, { label: 'Öğretmenler', href: '#ogretmenler' },
          { label: 'Üyelik', href: '#uyelik' }, { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'İlk Ders Ücretsiz', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Zen Wellness Studio',
        copyright: '© 2024 Zen Wellness Studio',
        contact: { phone: '0212 261 78 90', address: 'Beşiktaş, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/zenwellness.istanbul', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902122617890', message: 'Merhaba, ders ve üyelik hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Zen Wellness Studio — Beşiktaş", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Beşiktaş', title: "Zen Wellness Studio", subtitle: "Nefes al, dönüş, dengeyi bul", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'spor_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122617890" }, editableFields: [] }
    ]
  }]
}
