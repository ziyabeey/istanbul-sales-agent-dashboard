/**
 * dis-estetik ThemeConfig (growth)
 * Pembe + krem, smile design / estetik diş. Poppins.
 * Business: Smile Studio, Etiler
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const DIS_ESTETIK_CSS: Record<string, string> = {
  '--color-bg': '#FFF5F7',
  '--color-surface': '#FFE4EC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FFCDD9',
  '--color-text': '#3B0018',
  '--color-text-secondary': '#9D174D',
  '--color-text-muted': '#9CA3AF',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#DB2777',
  '--color-accent-hover': '#BE185D',
  '--color-accent-light': '#FCE7F3',
  '--color-border': '#FBCFE8',
  '--font-heading': "'Poppins', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '16px',
  '--radius-btn': '9999px'}

export const DIS_ESTETIK_BUSINESS: BusinessData = {
  name: 'Smile Studio',
  ownerName: 'Dt. Selin Demir',
  sector: 'dis',
  slogan: 'Hayalinizdeki gülüşü tasarlıyoruz',
  phone: '0212 357 44 22',
  phoneClean: '902123574422',
  whatsapp: '902123574422',
  email: 'merhaba@smilestudio.com.tr',
  address: 'Nispetiye Cad. No.5 D.8, Etiler, İstanbul',
  city: 'İstanbul',
  district: 'Etiler',
  coordinates: { lat: 41.0778, lng: 29.0288 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '16:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/smilestudio_istanbul', youtube: 'https://youtube.com/@smilestudio' },
  photos: [],
  services: [
    { id: 's1', name: 'Gülüş Tasarımı', price: '₺5.000', duration: '2 seans', icon: '✨' },
    { id: 's2', name: 'Diş Beyazlatma', price: '₺3.500', duration: '90 dk', icon: '💎' },
    { id: 's3', name: 'Zirkonyum', price: '₺4.500', duration: 'Planlı', icon: '👑' },
    { id: 's4', name: 'Kompozit Bonding', price: '₺2.500', duration: '1-2 saat', icon: '🎨' }],
  team: [{ id: 't1', name: 'Dt. Selin Demir', role: 'Estetik Diş Hekimi', experience: '10 yıl' }],
  experience: '10 yıl',
  rating: 5.0,
  reviewCount: 386,
  foundedYear: 2014}

export const DIS_ESTETIK_CONFIG: ThemeConfig = {
  id: 'dis-estetik',
  name: 'Estetik',
  sectorId: 'dis',
  plan: 'growth',
  description: 'Pembe + krem, smile design. Etiler.',
  designPhilosophy: 'Soft rose — estetik güzellik dünyası, pembe-beyaz palette. Smile design odaklı.',
  isDark: false,
  cssVariables: DIS_ESTETIK_CSS,
  fonts: {
    heading: { family: 'Lora', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'Dentist',
  sectorSections: ['dental_treatment_grid', 'smile_before_after', 'dentist_profile', 'dental_appointment'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Smile Studio' },
        menuItems: [
          { label: 'Tedaviler', href: '#tedaviler' }, { label: 'ÖnceSonra', href: '#onceSonra' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Gülüş Analizi', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Smile Studio',
        copyright: '© 2024 Smile Studio',
        contact: { phone: '0212 357 44 22', address: 'Etiler, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/smilestudio_istanbul', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902123574422', message: 'Merhaba, gülüş tasarımı hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Smile Studio — Etiler", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Etiler', title: "Smile Studio", subtitle: "Hayalinizdeki gülüşü tasarlıyoruz", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'dis_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902123574422" }, editableFields: [] }
    ]
  }]
}
