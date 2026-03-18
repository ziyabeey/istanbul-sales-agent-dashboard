/**
 * oto-detay ThemeConfig (pro)
 * Gece mavisi + beyaz, detailing & oto yıkama. Inter.
 * Business: Prestige Detailing, Beşiktaş
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const OTO_DETAY_CSS: Record<string, string> = {
  '--color-bg': '#040D1A',
  '--color-surface': '#071525',
  '--color-surface-elevated': '#0B1F35',
  '--color-surface-muted': '#0F2945',
  '--color-text': '#E8F4FF',
  '--color-text-secondary': '#90B8D8',
  '--color-text-muted': '#4A7090',
  '--color-text-on-accent': '#040D1A',
  '--color-accent': '#38BDF8',
  '--color-accent-hover': '#0EA5E9',
  '--color-accent-light': 'rgba(56,189,248,0.1)',
  '--color-border': 'rgba(56,189,248,0.2)',
  '--font-heading': "'Montserrat', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '9999px'}

export const OTO_DETAY_BUSINESS: BusinessData = {
  name: 'Prestige Detailing',
  ownerName: 'Emre Kaya',
  sector: 'oto',
  slogan: 'Arabanızı yeni gibi hissettiriyoruz',
  phone: '0212 327 44 11',
  phoneClean: '902123274411',
  whatsapp: '902123274411',
  email: 'hello@prestigedetailing.com.tr',
  address: 'Balmumcu Mah. Barbaros Blv. No.72/B, Beşiktaş, İstanbul',
  city: 'İstanbul',
  district: 'Beşiktaş',
  coordinates: { lat: 41.0658, lng: 29.0150 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/prestigedetailing_istanbul', youtube: 'https://youtube.com/@prestigedetailing' },
  photos: [],
  services: [
    { id: 's1', name: 'Detay Yıkama', price: '₺800', duration: '2 saat', icon: '✨' },
    { id: 's2', name: 'Seramik Kaplama', price: '₺5.000+', duration: '2 gün', icon: '💎' },
    { id: 's3', name: 'PPF Film', price: '₺8.000+', duration: '1-2 gün', icon: '🛡️' },
    { id: 's4', name: 'İç Temizlik', price: '₺1.500', duration: '3 saat', icon: '🪣' }],
  team: [{ id: 't1', name: 'Emre Kaya', role: 'Detailing Uzmanı', experience: '10 yıl' }],
  experience: '10 yıl',
  rating: 5.0,
  reviewCount: 342,
  foundedYear: 2014}

export const OTO_DETAY_CONFIG: ThemeConfig = {
  id: 'oto-detay',
  name: 'Detay',
  sectorId: 'oto',
  plan: 'pro',
  description: 'Gece mavisi + cyan, premium detailing. Beşiktaş.',
  designPhilosophy: 'Dark luxury — gece mavisi zemin, cyan aksan. Premium detailing hissi.',
  isDark: true,
  cssVariables: OTO_DETAY_CSS,
  fonts: {
    heading: { family: 'Lora', weights: [700, 800, 900], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'AutoRepair',
  sectorSections: ['service_price_grid', 'maintenance_packages', 'vehicle_appointment', 'workshop_photos'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Prestige Detailing' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' }, { label: 'Paketler', href: '#paketler' },
          { label: 'Galeri', href: '#galeri' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Randevu Al', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Prestige Detailing',
        copyright: '© 2024 Prestige Detailing',
        contact: { phone: '0212 327 44 11', address: 'Beşiktaş, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/prestigedetailing_istanbul', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902123274411', message: 'Merhaba, araç detailing için randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Prestige Detailing — Beşiktaş", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Beşiktaş', title: "Prestige Detailing", subtitle: "Arabanızı yeni gibi hissettiriyoruz", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'oto_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902123274411" }, editableFields: [] }
    ]
  }]
}
