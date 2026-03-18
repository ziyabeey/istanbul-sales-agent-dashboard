/**
 * @kepenk/templates — guzellik-dermis ThemeConfig (enterprise)
 * Teal/yeşil, klinik-estetik, medikal dönüşüm. Plus Jakarta Sans. Çankaya.
 * Business: Dermis Clinic, Çankaya (Ankara)
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const GUZELLIK_DERMIS_CSS: Record<string, string> = {
  '--color-bg': '#F0FDFA',
  '--color-surface': '#CCFBF1',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#99F6E4',
  '--color-text': '#042F2E',
  '--color-text-secondary': '#115E59',
  '--color-text-muted': '#0F766E',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#0F766E',
  '--color-accent-hover': '#0D6A62',
  '--color-accent-light': '#CCFBF1',
  '--color-border': '#99F6E4',
  '--font-heading': "'Plus Jakarta Sans', sans-serif",
  '--font-body': "'Plus Jakarta Sans', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '8px'}

export const GUZELLIK_DERMIS_BUSINESS: BusinessData = {
  name: 'Dermis Clinic',
  ownerName: 'Dr. Emine Yalçın',
  sector: 'guzellik',
  slogan: 'Bilimle güzellik, sonuçlarla güven',
  phone: '0312 440 29 11',
  phoneClean: '903124402911',
  whatsapp: '903124402911',
  email: 'bilgi@dermisclinic.com.tr',
  address: 'Kızılırmak Mah. Atatürk Bulvarı No:121 K:8, Çankaya, Ankara',
  city: 'Ankara',
  district: 'Çankaya',
  coordinates: { lat: 39.9090, lng: 32.8591 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/dermisclinic.tr' },
  photos: [],
  services: [
    { id: 's1', name: 'Medikal Cilt Analizi', price: 'Ücretsiz', duration: '30 dk', icon: '🔬' },
    { id: 's2', name: 'PRP Saç & Cilt', price: '₺2.800', duration: '60 dk', icon: '💉' },
    { id: 's3', name: 'Profesyonel Peeling', price: '₺1.500', duration: '45 dk', icon: '⚗️' },
    { id: 's4', name: 'Lazer Cilt Yenileme', price: '₺4.500', duration: '60 dk', icon: '⚡' },
    { id: 's5', name: 'Botox / Dolgu', price: '₺3.500\'den', duration: '30 dk', icon: '✦' }],
  team: [
    { id: 't1', name: 'Dr. Emine Yalçın', role: 'Dermatoloji Uzmanı', experience: '16 yıl' },
    { id: 't2', name: 'Uzm. Hem. Didem Şahin', role: 'Klinik Koordinatör', experience: '9 yıl' }],
  experience: '14 yıl',
  rating: 4.9,
  reviewCount: 641,
  foundedYear: 2010}

export const GUZELLIK_DERMIS_CONFIG: ThemeConfig = {
  id: 'guzellik-dermis',
  name: 'Dermis',
  sectorId: 'guzellik',
  plan: 'enterprise',
  description: 'Teal/yeşil, klinik-estetik. Bilimsel güven hissi. Ankara Çankaya.',
  designPhilosophy: 'Klinik temizliği + teal enerji. Güven, uzmanik, modern sağlık estetiği.',
  isDark: false,
  cssVariables: GUZELLIK_DERMIS_CSS,
  fonts: {
    heading: { family: 'Cinzel', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Plus Jakarta Sans', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'MedicalBusiness',
  sectorSections: ['before_after', 'services', 'team', 'instagram_feed'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Dermis Clinic' },
        menuItems: [
          { label: 'Tedaviler', href: '#hizmetler' },
          { label: 'Uzmanlar', href: '#ekip' },
          { label: 'Sonuçlar', href: '#oncesisonrasi' },
          { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Ücretsiz Analiz', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Dermis Clinic',
        copyright: '© 2024 Dermis Clinic',
        contact: { phone: '0312 440 29 11', address: 'Çankaya, Ankara' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/dermisclinic.tr', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }, { label: 'Gizlilik', href: '/gizlilik' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '903124402911', message: 'Merhaba, randevu ve bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Dermis Clinic — Çankaya", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Çankaya', title: "Dermis Clinic", subtitle: "Bilimle güzellik, sonuçlarla güven", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'guzellik_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "903124402911" }, editableFields: [] }
    ]
  }]
}
