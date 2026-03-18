/**
 * dis-cocuk ThemeConfig (pro)
 * Renkli + neşeli, çocuk diş hekimliği. Nunito.
 * Business: Minik Gülüşler Çocuk Diş, Üsküdar
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const DIS_COCUK_CSS: Record<string, string> = {
  '--color-bg': '#FEFFF0',
  '--color-surface': '#FFF9C4',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FEF08A',
  '--color-text': '#1A1A00',
  '--color-text-secondary': '#4A4A10',
  '--color-text-muted': '#8B8B40',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#16A34A',
  '--color-accent-hover': '#15803D',
  '--color-accent-light': '#DCFCE7',
  '--color-border': '#BBF7D0',
  '--font-heading': "'Nunito', sans-serif",
  '--font-body': "'Nunito', sans-serif",
  '--radius-card': '20px',
  '--radius-btn': '9999px'}

export const DIS_COCUK_BUSINESS: BusinessData = {
  name: 'Minik Gülüşler Çocuk Diş',
  ownerName: 'Dt. Arzu Polat',
  sector: 'dis',
  slogan: 'Çocuğunuzun sağlıklı gülüşü için',
  phone: '0216 410 22 55',
  phoneClean: '902164102255',
  whatsapp: '902164102255',
  email: 'bilgi@minikgulus.com.tr',
  address: 'Altunizade Mah. Kısıklı Cad. No.12 D.2, Üsküdar, İstanbul',
  city: 'İstanbul',
  district: 'Üsküdar',
  coordinates: { lat: 41.0208, lng: 29.0390 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '14:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/minikgulus_dis', facebook: 'https://facebook.com/minikgulusdis' },
  photos: [],
  services: [
    { id: 's1', name: 'Süt Diş Tedavisi', price: '₺600', duration: '30 dk', icon: '🦷' },
    { id: 's2', name: 'Fissür Örtücü', price: '₺400', duration: '20 dk', icon: '🛡️' },
    { id: 's3', name: 'Çocuk Kontrol', price: '₺300', duration: '15 dk', icon: '🔍' },
    { id: 's4', name: 'Florür Uygulaması', price: '₺250', duration: '10 dk', icon: '✨' }],
  team: [{ id: 't1', name: 'Dt. Arzu Polat', role: 'Çocuk Diş Hekimi', experience: '11 yıl' }],
  experience: '11 yıl',
  rating: 5.0,
  reviewCount: 294,
  foundedYear: 2013}

export const DIS_COCUK_CONFIG: ThemeConfig = {
  id: 'dis-cocuk',
  name: 'Çocuk',
  sectorId: 'dis',
  plan: 'pro',
  description: 'Sarı + yeşil, çocuk diş hekimi. Üsküdar.',
  designPhilosophy: 'Neşeli sarı/yeşil — çocuklara güven veren, ebeveynlere rahatlatıcı renk paleti.',
  isDark: false,
  cssVariables: DIS_COCUK_CSS,
  fonts: {
    heading: { family: 'Montserrat', weights: [700, 800], subsets: ['latin-ext'] },
    body: { family: 'Nunito', weights: [400, 500, 600], subsets: ['latin-ext'] }},
  seoSchemaType: 'Dentist',
  sectorSections: ['dental_treatment_grid', 'dentist_profile', 'clinic_stats_row', 'dental_appointment'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Minik Gülüşler 🦷' },
        menuItems: [
          { label: 'Tedaviler', href: '#tedaviler' }, { label: 'Hekim', href: '#hekim' }, { label: 'Randevu', href: '#randevu' }],
        cta: { text: 'Randevu Al 😊', href: '#randevu', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Minik Gülüşler Çocuk Diş',
        copyright: '© 2024 Minik Gülüşler',
        contact: { phone: '0216 410 22 55', address: 'Üsküdar, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/minikgulus_dis', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902164102255', message: 'Merhaba, çocuğumun diş randevusu için arayacaktım.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Minik Gülüşler Çocuk Diş — Üsküdar", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Üsküdar', title: "Minik Gülüşler Çocuk Diş", subtitle: "Çocuğunuzun sağlıklı gülüşü için", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'dis_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902164102255" }, editableFields: [] }
    ]
  }]
}
