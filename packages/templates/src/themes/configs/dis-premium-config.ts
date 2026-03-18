/**
 * dis-premium ThemeConfig (enterprise)
 * Koyu + altın, VIP premium klinik. Poppins.
 * Business: Royal Dental Clinic, Bağcılar Ataköy
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const DIS_PREMIUM_CSS: Record<string, string> = {
  '--color-bg': '#0A0A0A',
  '--color-surface': '#141414',
  '--color-surface-elevated': '#1E1E1E',
  '--color-surface-muted': '#282828',
  '--color-text': '#F5F5F5',
  '--color-text-secondary': '#C9A96E',
  '--color-text-muted': '#6B6B6B',
  '--color-text-on-accent': '#0A0A0A',
  '--color-accent': '#C9A96E',
  '--color-accent-hover': '#B8935A',
  '--color-accent-light': 'rgba(201,169,110,0.15)',
  '--color-border': 'rgba(201,169,110,0.2)',
  '--font-heading': "'Poppins', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px',
  '--radius-btn': '9999px'}

export const DIS_PREMIUM_BUSINESS: BusinessData = {
  name: 'Royal Dental Clinic',
  ownerName: 'Prof. Dr. Beril Yılmaz',
  sector: 'dis',
  slogan: 'Dünya standartlarında diş hekimliği',
  phone: '0212 410 66 00',
  phoneClean: '902124106600',
  whatsapp: '902124106600',
  email: 'vip@royaldental.com.tr',
  address: 'Ataköy 9-10 Marina, İstanbul, Bakırköy',
  city: 'İstanbul',
  district: 'Bakırköy',
  coordinates: { lat: 40.9640, lng: 28.8626 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '16:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/royaldentaltr', youtube: 'https://youtube.com/@royaldentaltr' },
  photos: [],
  services: [
    { id: 's1', name: 'Gülüş Tasarımı', price: '₺10.000', duration: '2 seans', icon: '✨' },
    { id: 's2', name: 'Lüks İmplant', price: '₺18.000', duration: 'Planlı', icon: '💎' },
    { id: 's3', name: 'Porselen Veneer', price: '₺8.500', duration: 'Planlı', icon: '👑' },
    { id: 's4', name: 'Seramik Dolgu', price: '₺2.500', duration: '1 saat', icon: '🔬' }],
  team: [
    { id: 't1', name: 'Prof. Dr. Beril Yılmaz', role: 'Klinik Direktörü', experience: '25 yıl' },
    { id: 't2', name: 'Dt. Can Özturk', role: 'İmplantoloji & Estetik', experience: '15 yıl' }],
  experience: '25 yıl',
  rating: 5.0,
  reviewCount: 194,
  foundedYear: 1999}

export const DIS_PREMIUM_CONFIG: ThemeConfig = {
  id: 'dis-premium',
  name: 'Premium',
  sectorId: 'dis',
  plan: 'enterprise',
  description: 'Koyu altın, VIP premium klinik. Bakırköy.',
  designPhilosophy: 'Dark luxury — siyah zemin, altın detaylar. Lüks marka kimliği.',
  isDark: true,
  cssVariables: DIS_PREMIUM_CSS,
  fonts: {
    heading: { family: 'Merriweather', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'Dentist',
  sectorSections: ['dental_treatment_grid', 'smile_before_after', 'dentist_profile', 'clinic_stats_row', 'dental_appointment'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Royal Dental' },
        menuItems: [
          { label: 'Tedaviler', href: '#tedaviler' }, { label: 'Ekip', href: '#ekip' },
          { label: 'Dönüşümler', href: '#donusumler' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'VIP Randevu', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Royal Dental Clinic',
        copyright: '© 2024 Royal Dental Clinic',
        contact: { phone: '0212 410 66 00', address: 'Ataköy Marina, Bakırköy, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/royaldentaltr', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }, { label: 'Sağlık Bakanlığı Onaylı', href: '#' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902124106600', message: 'Merhaba, VIP diş klinik randevusu için bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Royal Dental Clinic — Bakırköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Bakırköy', title: "Royal Dental Clinic", subtitle: "Dünya standartlarında diş hekimliği", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'dis_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902124106600" }, editableFields: [] }
    ]
  }]
}
