/**
 * @kepenk/templates — doktor-denta ThemeConfig (pro)
 * Teal + beyaz, modern diş kliniği. Nunito.
 * Business: Denta Smile Kliniği, Kadıköy
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const DOKTOR_DENTA_CSS: Record<string, string> = {
  '--color-bg': '#F0FDFA',
  '--color-surface': '#CCFBF1',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#99F6E4',
  '--color-text': '#042F2E',
  '--color-text-secondary': '#0F766E',
  '--color-text-muted': '#14B8A6',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#0D9488',
  '--color-accent-hover': '#0F766E',
  '--color-accent-light': '#CCFBF1',
  '--color-border': '#99F6E4',
  '--font-heading': "'Nunito', sans-serif",
  '--font-body': "'Nunito', sans-serif",
  '--radius-card': '20px',
  '--radius-btn': '9999px'}

export const DOKTOR_DENTA_BUSINESS: BusinessData = {
  name: 'Denta Smile Kliniği',
  ownerName: 'Dr. Ece Yılmaz',
  sector: 'doktor',
  slogan: 'Sağlıklı dişler, güzel gülüşler',
  phone: '0216 418 66 55',
  phoneClean: '902164186655',
  whatsapp: '902164186655',
  email: 'info@dentasmile.com.tr',
  address: 'Moda Cad. No.45 D.3, Kadıköy, İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  coordinates: { lat: 40.9888, lng: 29.0209 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/dentasmilekadikoy', tiktok: 'https://tiktok.com/@dentasmile' },
  photos: [],
  services: [
    { id: 's1', name: 'Diş Beyazlatma', price: '₺3.500', icon: '✨' },
    { id: 's2', name: 'İmplant', price: '₺12.000', icon: '🦷' },
    { id: 's3', name: 'Zirkonyum Kaplama', price: '₺5.000', icon: '💎' },
    { id: 's4', name: 'Ortodonti', price: '₺18.000', icon: '😁' }],
  team: [
    { id: 't1', name: 'Dr. Ece Yılmaz', role: 'Diş Hekimi — Estetik Diş', experience: '12 yıl' },
    { id: 't2', name: 'Dr. Barış Kurt', role: 'İmplant Uzmanı', experience: '8 yıl' }],
  experience: '12 yıl',
  rating: 4.9,
  reviewCount: 567,
  foundedYear: 2012}

export const DOKTOR_DENTA_CONFIG: ThemeConfig = {
  id: 'doktor-denta',
  name: 'Denta',
  sectorId: 'doktor',
  plan: 'pro',
  description: 'Teal + beyaz, modern diş kliniği. Kadıköy.',
  designPhilosophy: 'Taze teal — diş kliniği için sağlık + tasarım dengesi, yuvarlak formlar.',
  isDark: false,
  cssVariables: DOKTOR_DENTA_CSS,
  fonts: {
    heading: { family: 'Bebas Neue', weights: [700, 800], subsets: ['latin-ext'] },
    body: { family: 'Nunito', weights: [400, 500, 600], subsets: ['latin-ext'] }},
  seoSchemaType: 'Dentist',
  sectorSections: ['treatment_accordion', 'booking', 'insurance_logos', 'clinic_grid'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Denta Smile' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' }, { label: 'Doktorlar', href: '#doktorlar' },
          { label: 'Klinik', href: '#klinik' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Randevu Al', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Denta Smile Kliniği',
        copyright: '© 2024 Denta Smile',
        contact: { phone: '0216 418 66 55', address: 'Kadıköy, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/dentasmilekadikoy', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902164186655', message: 'Merhaba, diş tedavisi için randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Denta Smile Kliniği — Kadıköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Kadıköy', title: "Denta Smile Kliniği", subtitle: "Sağlıklı dişler, güzel gülüşler", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'doktor_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902164186655" }, editableFields: [] }
    ]
  }]
}
