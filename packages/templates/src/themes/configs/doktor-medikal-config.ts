/**
 * @kepenk/templates — doktor-medikal ThemeConfig (enterprise)
 * Koyu navy + beyaz, özel hastane / medikal merkez. Inter.
 * Business: Medikal Pro Sağlık Grubu, Ataşehir
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const DOKTOR_MEDIKAL_CSS: Record<string, string> = {
  '--color-bg': '#EFF6FF',
  '--color-surface': '#DBEAFE',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#BFDBFE',
  '--color-text': '#0C1445',
  '--color-text-secondary': '#1E3A8A',
  '--color-text-muted': '#3B82F6',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#1D4ED8',
  '--color-accent-hover': '#1E40AF',
  '--color-accent-light': '#EFF6FF',
  '--color-border': '#BFDBFE',
  '--font-heading': "'Inter', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '10px',
  '--radius-btn': '6px'}

export const DOKTOR_MEDIKAL_BUSINESS: BusinessData = {
  name: 'Medikal Pro Sağlık Grubu',
  ownerName: 'Prof. Dr. Murat Şen',
  sector: 'doktor',
  slogan: 'Multidisipliner sağlık, tek çatı altında',
  phone: '0216 570 22 00',
  phoneClean: '902165702200',
  whatsapp: '902165702200',
  email: 'info@medikalpro.com.tr',
  address: 'Barbaros Mah. Begonya Sok. No.15, Ataşehir, İstanbul',
  city: 'İstanbul',
  district: 'Ataşehir',
  coordinates: { lat: 40.9876, lng: 29.1258 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:00', close: '19:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '17:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '14:00' }],
  socialMedia: { instagram: 'https://instagram.com/medikalpro.tr', youtube: 'https://youtube.com/@medikalpro', linkedin: 'https://linkedin.com/company/medikalpro' },
  photos: [],
  services: [
    { id: 's1', name: 'Kardiyoloji', price: '', icon: '❤️' },
    { id: 's2', name: 'Onkoloji', price: '', icon: '🎗️' },
    { id: 's3', name: 'Nöroloji', price: '', icon: '🧠' },
    { id: 's4', name: 'Ortopedi', price: '', icon: '🦴' },
    { id: 's5', name: 'Dahiliye', price: '', icon: '🩺' },
    { id: 's6', name: 'Kadın-Doğum', price: '', icon: '🤰' }],
  team: [
    { id: 't1', name: 'Prof. Dr. Murat Şen', role: 'Genel Müdür & Kardiyoloji', experience: '25 yıl' },
    { id: 't2', name: 'DoÇ. Dr. Selin Arslan', role: 'Onkoloji Direktörü', experience: '18 yıl' }],
  experience: '15 yıl',
  rating: 4.9,
  reviewCount: 2580,
  foundedYear: 2009}

export const DOKTOR_MEDIKAL_CONFIG: ThemeConfig = {
  id: 'doktor-medikal',
  name: 'Medikal',
  sectorId: 'doktor',
  plan: 'enterprise',
  description: 'Koyu blue + beyaz, özel medikal merkez. Ataşehir.',
  designPhilosophy: 'Kurumsal mavi — güven, netlik, çok bölümlü sağlık merkezi.',
  isDark: false,
  cssVariables: DOKTOR_MEDIKAL_CSS,
  fonts: {
    heading: { family: 'DM Sans', weights: [700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'MedicalBusiness',
  sectorSections: ['treatment_accordion', 'booking', 'insurance_logos', 'clinic_grid'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Medikal Pro' },
        menuItems: [
          { label: 'Uzmanlıklar', href: '#uzmanliklar' }, { label: 'Doktorlar', href: '#doktorlar' },
          { label: 'Klinik', href: '#klinik' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Online Randevu', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Medikal Pro Sağlık Grubu',
        copyright: '© 2024 Medikal Pro',
        contact: { phone: '0216 570 22 00', address: 'Ataşehir, İstanbul' },
        social: [
          { platform: 'instagram', url: 'https://instagram.com/medikalpro.tr', icon: 'instagram' },
          { platform: 'youtube', url: 'https://youtube.com/@medikalpro', icon: 'youtube' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }, { label: 'Aydınlatma', href: '/aydinlatma' }, { label: 'Gizlilik', href: '/gizlilik' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902165702200', message: 'Merhaba, Medikal Pro randevu hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Medikal Pro Sağlık Grubu — Ataşehir", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Ataşehir', title: "Medikal Pro Sağlık Grubu", subtitle: "Multidisipliner sağlık, tek çatı altında", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'doktor_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902165702200" }, editableFields: [] }
    ]
  }]
}
