/**
 * dis-implant ThemeConfig (starter)
 * Lacivert + altın, implant uzmanlığı. Poppins.
 * Business: İmplant Center İstanbul, Nişantaşı
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const DIS_IMPLANT_CSS: Record<string, string> = {
  '--color-bg': '#F8FAFC',
  '--color-surface': '#EEF4FF',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#DBEAFE',
  '--color-text': '#0C1445',
  '--color-text-secondary': '#1E3A8A',
  '--color-text-muted': '#6B7280',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#1D4ED8',
  '--color-accent-hover': '#1E40AF',
  '--color-accent-light': '#EFF6FF',
  '--color-border': '#BFDBFE',
  '--font-heading': "'Poppins', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '9999px'}

export const DIS_IMPLANT_BUSINESS: BusinessData = {
  name: 'İmplant Center İstanbul',
  ownerName: 'Op. Dr. Mehmet Arslan',
  sector: 'dis',
  slogan: 'İmplantolojide uzman merkez',
  phone: '0212 290 55 33',
  phoneClean: '902122905533',
  whatsapp: '902122905533',
  email: 'info@implantcenter.com.tr',
  address: 'Teşvikiye Mah. Vali Konağı Cad. No.20 K.3, Nişantaşı, İstanbul',
  city: 'İstanbul',
  district: 'Nişantaşı',
  coordinates: { lat: 41.0484, lng: 28.9956 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/implantcenterist', youtube: 'https://youtube.com/@implantcenterist' },
  photos: [],
  services: [
    { id: 's1', name: 'Tek Diş İmplant', price: '₺12.000', duration: 'Planlı', icon: '🦷' },
    { id: 's2', name: 'All-on-4', price: '₺65.000', duration: 'Planlı', icon: '💎' },
    { id: 's3', name: 'Kemik Grefti', price: '₺8.000', duration: 'Planlı', icon: '🔬' },
    { id: 's4', name: '3D Tomografi', price: '₺1.200', duration: '15 dk', icon: '🖥️' }],
  team: [
    { id: 't1', name: 'Op. Dr. Mehmet Arslan', role: 'İmplantoloji Uzmanı', experience: '18 yıl' },
    { id: 't2', name: 'Dt. Zeynep Çelik', role: 'Protetik Diş Hekimi', experience: '10 yıl' }],
  experience: '18 yıl',
  rating: 5.0,
  reviewCount: 642,
  foundedYear: 2006}

export const DIS_IMPLANT_CONFIG: ThemeConfig = {
  id: 'dis-implant',
  name: 'İmplant',
  sectorId: 'dis',
  plan: 'starter',
  description: 'Lacivert + beyaz, implant uzmanlığı. Nişantaşı.',
  designPhilosophy: 'Güçlü mavi — medikal otorite, yüksek teknoloji implant merkezi.',
  isDark: false,
  cssVariables: DIS_IMPLANT_CSS,
  fonts: {
    heading: { family: 'Playfair Display', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'Dentist',
  sectorSections: ['dental_treatment_grid', 'dentist_profile', 'smile_before_after', 'dental_appointment'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'İmplant Center' },
        menuItems: [
          { label: 'Tedaviler', href: '#tedaviler' }, { label: 'Hekim', href: '#hekim' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Ücretsiz Muayene', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'İmplant Center İstanbul',
        copyright: '© 2024 İmplant Center',
        contact: { phone: '0212 290 55 33', address: 'Nişantaşı, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/implantcenterist', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902122905533', message: 'Merhaba, implant hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "İmplant Center İstanbul — Nişantaşı", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Nişantaşı', title: "İmplant Center İstanbul", subtitle: "İmplantolojide uzman merkez", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'dis_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122905533" }, editableFields: [] }
    ]
  }]
}
