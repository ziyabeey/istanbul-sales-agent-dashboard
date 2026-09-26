/**
 * oto-filo ThemeConfig (enterprise)
 * Koyu gri + mavi, kurumsal filo bakım. Inter.
 * Business: Fleet Pro Servis, İkitelli OSB
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const OTO_FILO_CSS: Record<string, string> = {
  '--color-bg': '#F8FAFC',
  '--color-surface': '#EEF2F7',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E1E8F0',
  '--color-text': '#0C1B2B',
  '--color-text-secondary': '#314860',
  '--color-text-muted': '#6B7D8E',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#1D4ED8',
  '--color-accent-hover': '#1E40AF',
  '--color-accent-light': '#EEF2FF',
  '--color-border': '#C7D5E8',
  '--font-heading': "'Montserrat', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '8px',
  '--radius-btn': '6px'}

export const OTO_FILO_BUSINESS: BusinessData = {
  name: 'Fleet Pro Servis',
  ownerName: 'Okan Demirtaş',
  sector: 'oto',
  slogan: 'Kurumsal filonuzun güvenilir bakım ortağı',
  phone: '0212 549 22 88',
  phoneClean: '902125492288',
  whatsapp: '902125492288',
  email: 'info@fleetpro.com.tr',
  address: 'İkitelli OSB Mah. Atatürk Blv. No.404, Başakşehir, İstanbul',
  city: 'İstanbul',
  district: 'İkitelli',
  coordinates: { lat: 41.0648, lng: 28.7787 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '07:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '07:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '07:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '07:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '07:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '08:00', close: '17:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { linkedin: 'https://linkedin.com/company/fleetpro', instagram: 'https://instagram.com/fleetproservis' },
  photos: [],
  services: [
    { id: 's1', name: 'Filo Bakım Sözleşmesi', price: 'Teklif alın', icon: '📋' },
    { id: 's2', name: 'Periyodik Servis', price: '₺2.000+/araç', icon: '🔧' },
    { id: 's3', name: 'Acil Yol Yardımı', price: '7/24 Dahil', icon: '🆘' },
    { id: 's4', name: 'Araç Takip Sistemi', price: 'Aylık abonelik', icon: '📡' }],
  team: [
    { id: 't1', name: 'Okan Demirtaş', role: 'Genel Müdür', experience: '22 yıl' },
    { id: 't2', name: 'Serdar Güneş', role: 'Filo Koordinatörü', experience: '14 yıl' }],
  experience: '22 yıl',
  rating: 4.8,
  reviewCount: 93,
  foundedYear: 2002}

export const OTO_FILO_CONFIG: ThemeConfig = {
  id: 'oto-filo',
  name: 'Filo',
  sectorId: 'oto',
  plan: 'enterprise',
  description: 'Koyu gri + mavi, kurumsal filo bakım. İkitelli.',
  designPhilosophy: 'Corporate trust — koyu gri/mavi, kurumsal görünüm. B2B odaklı sade tasarım.',
  isDark: false,
  cssVariables: OTO_FILO_CSS,
  fonts: {
    heading: { family: 'Inter', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'AutoRepair',
  sectorSections: ['service_price_grid', 'maintenance_packages', 'vehicle_appointment', 'service_stats_row'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Fleet Pro' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' }, { label: 'Paketler', href: '#paketler' },
          { label: 'Referanslar', href: '#referanslar' }, { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Teklif Al', href: '#iletisim', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Fleet Pro Servis',
        copyright: '© 2024 Fleet Pro Servis',
        contact: { phone: '0212 549 22 88', address: 'İkitelli OSB, Başakşehir, İstanbul' },
        social: [{ platform: 'linkedin', url: 'https://linkedin.com/company/fleetpro', icon: 'linkedin' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902125492288', message: 'Merhaba, kurumsal filo bakım hakkında teklif almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Fleet Pro Servis — İkitelli", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İkitelli', title: "Fleet Pro Servis", subtitle: "Kurumsal filonuzun güvenilir bakım ortağı", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'oto_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902125492288" }, editableFields: [] }
    ]
  }]
}
