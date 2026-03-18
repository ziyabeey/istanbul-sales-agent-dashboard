import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const TEMIZLIK_EKO_CSS: Record<string, string> = {
  '--color-bg': '#F0FDF4', '--color-surface': '#DCFCE7', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#BBF7D0', '--color-text': '#052E16', '--color-text-secondary': '#166534',
  '--color-text-muted': '#6B7280', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#16A34A',
  '--color-accent-hover': '#15803D', '--color-accent-light': '#F0FDF4', '--color-border': '#86EFAC',
  '--font-heading': "'DM Sans', sans-serif", '--font-body': "'DM Sans', sans-serif",
  '--radius-card': '16px', '--radius-btn': '9999px'}
export const TEMIZLIK_EKO_BUSINESS: BusinessData = {
  name: 'YeşilTem Eko', ownerName: 'Elif Kara', sector: 'temizlik',
  slogan: 'Doğaya saygılı temizlik', phone: '0535 111 22 33', phoneClean: '905351112233',
  whatsapp: '905351112233', email: 'info@yesiltem.com.tr',
  address: 'Caddebostan Mah. No.7, Kadıköy, İstanbul', city: 'İstanbul', district: 'Caddebostan',
  coordinates: { lat: 40.9685, lng: 29.0625 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/yesiltemeko' },
  photos: [], services: [
    { id: 's1', name: 'Eko Ev', icon: '🌿' }, { id: 's2', name: 'Organik', icon: '🍃' },
    { id: 's3', name: 'Bebek Güvenli', icon: '👶' }, { id: 's4', name: 'Allerjen', icon: '🫧' }],
  team: [{ id: 't1', name: 'Elif Kara', role: 'Kurucu', experience: '6 yıl' }],
  experience: '6 yıl', rating: 4.9, reviewCount: 380, foundedYear: 2018}
export const TEMIZLIK_EKO_CONFIG: ThemeConfig = {
  id: 'temizlik-eko', name: 'Eko', sectorId: 'temizlik', plan: 'pro',
  description: 'Yeşil, ekolojik temizlik. Caddebostan.', designPhilosophy: 'Eco green — doğal, güvenli, sürdürülebilir.',
  isDark: false, cssVariables: TEMIZLIK_EKO_CSS,
  fonts: { heading: { family: 'DM Sans', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'DM Sans', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'LocalBusiness', sectorSections: ['cleaning_services_grid', 'before_after_showcase', 'cleaning_packages', 'cleaning_booking'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'YeşilTem 🌿' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Paketler', href: '#paketler' }, { label: 'Teklif', href: '#teklif' }], cta: { text: 'Eko Teklif', href: '#teklif', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'YeşilTem', copyright: '© 2024 YeşilTem', contact: { phone: '0535 111 22 33', address: 'Caddebostan, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/yesiltemeko', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905351112233', message: 'Merhaba, ekolojik temizlik için bilgi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "YeşilTem Eko — Caddebostan", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Caddebostan', title: "YeşilTem Eko", subtitle: "Doğaya saygılı temizlik", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'temizlik_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905351112233" }, editableFields: [] }
    ]
  }]
}
