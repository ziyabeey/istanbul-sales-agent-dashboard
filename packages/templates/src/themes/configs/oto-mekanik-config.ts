/**
 * oto-mekanik ThemeConfig (free)
 * Kırmızı + siyah, güçlü genel oto tamir. Montserrat.
 * Business: Mehmet Usta Oto Tamiri, Bağcılar
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const OTO_MEKANIK_CSS: Record<string, string> = {
  '--color-bg': '#0F0F0F',
  '--color-surface': '#1A1A1A',
  '--color-surface-elevated': '#252525',
  '--color-surface-muted': '#2D2D2D',
  '--color-text': '#F5F5F5',
  '--color-text-secondary': '#BBBBBB',
  '--color-text-muted': '#777777',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#DC2626',
  '--color-accent-hover': '#B91C1C',
  '--color-accent-light': 'rgba(220,38,38,0.15)',
  '--color-border': 'rgba(255,255,255,0.1)',
  '--font-heading': "'Montserrat', sans-serif",
  '--font-body': "'Open Sans', sans-serif",
  '--radius-card': '10px',
  '--radius-btn': '6px'}

export const OTO_MEKANIK_BUSINESS: BusinessData = {
  name: 'Mehmet Usta Oto Tamiri',
  ownerName: 'Mehmet Demir',
  sector: 'oto',
  slogan: 'Aracınız en güvenilir ellerde',
  phone: '0212 640 55 88',
  phoneClean: '902126405588',
  whatsapp: '902126405588',
  email: 'info@mehmetustaamir.com.tr',
  address: 'Güneşli İş Merkezi Yanı, Bağcılar Sanayi Sitesi No.14, Bağcılar, İstanbul',
  city: 'İstanbul',
  district: 'Bağcılar',
  coordinates: { lat: 41.0452, lng: 28.8448 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:00', close: '19:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '08:00', close: '17:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/mehmetustaamir', facebook: 'https://facebook.com/mehmetustaamir' },
  photos: [],
  services: [
    { id: 's1', name: 'Motor Bakım', price: '₺1.500', duration: '2-3 saat', icon: '🔧' },
    { id: 's2', name: 'Fren Sistemi', price: '₺800', duration: '1-2 saat', icon: '🛑' },
    { id: 's3', name: 'Yağ Değişimi', price: '₺500', duration: '30 dk', icon: '🛢️' },
    { id: 's4', name: 'Egzoz & Tahliye', price: '₺600', duration: '1 saat', icon: '💨' }],
  team: [{ id: 't1', name: 'Mehmet Demir', role: 'Baş Usta', experience: '18 yıl' }],
  experience: '18 yıl',
  rating: 4.7,
  reviewCount: 412,
  foundedYear: 2006}

export const OTO_MEKANIK_CONFIG: ThemeConfig = {
  id: 'oto-mekanik',
  name: 'Mekanik',
  sectorId: 'oto',
  plan: 'free',
  description: 'Kırmızı + siyah, güçlü oto tamir. Bağcılar.',
  designPhilosophy: 'Dark güç — endüstriyel siyah, kırmızı enerji. Oto tamiri ruhu.',
  isDark: true,
  cssVariables: OTO_MEKANIK_CSS,
  fonts: {
    heading: { family: 'Cinzel', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Open Sans', weights: [400, 600], subsets: ['latin-ext'] }},
  seoSchemaType: 'AutoRepair',
  sectorSections: ['service_price_grid', 'vehicle_appointment', 'service_stats_row'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Mehmet Usta' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' }, { label: 'Paketler', href: '#paketler' },
          { label: 'Galeri', href: '#galeri' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Randevu Al', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Mehmet Usta Oto Tamiri',
        copyright: '© 2024 Mehmet Usta Oto Tamiri',
        contact: { phone: '0212 640 55 88', address: 'Bağcılar, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/mehmetustaamir', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902126405588', message: 'Merhaba, servis randevusu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Mehmet Usta Oto Tamiri — Bağcılar", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Bağcılar', title: "Mehmet Usta Oto Tamiri", subtitle: "Aracınız en güvenilir ellerde", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'oto_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902126405588" }, editableFields: [] }
    ]
  }]
}
