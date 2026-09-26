import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const OTO_BAKIM_CSS: Record<string, string> = {
  '--color-bg': '#F0F4F8', '--color-surface': '#E2E8F0', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#CBD5E1', '--color-text': '#0F172A', '--color-text-secondary': '#334155',
  '--color-text-muted': '#94A3B8', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#2563EB',
  '--color-accent-hover': '#1D4ED8', '--color-accent-light': '#EFF6FF', '--color-border': '#93C5FD',
  '--font-heading': "'Inter', sans-serif", '--font-body': "'Inter', sans-serif",
  '--radius-card': '12px', '--radius-btn': '9999px'}
export const OTO_BAKIM_BUSINESS: BusinessData = {
  name: 'Usta Garaj', ownerName: 'Kemal Usta', sector: 'otoservis',
  slogan: 'Güvenilir oto bakım & onarım', phone: '0532 700 80 90', phoneClean: '905327008090',
  whatsapp: '905327008090', email: 'info@ustagaraj.com.tr',
  address: 'Mecidiyeköy Mah. Sanayi Cad. No.44, Şişli, İstanbul', city: 'İstanbul', district: 'Mecidiyeköy',
  coordinates: { lat: 41.0666, lng: 28.9916 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:00', close: '19:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '16:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/ustagaraj' },
  photos: [], services: [
    { id: 's1', name: 'Yağ Değişimi', icon: '🛢️' }, { id: 's2', name: 'Fren', icon: '🔴' },
    { id: 's3', name: 'Lastik', icon: '🛞' }, { id: 's4', name: 'Akü', icon: '🔋' }],
  team: [{ id: 't1', name: 'Kemal Usta', role: 'Usta Mekanik', experience: '20 yıl' }],
  experience: '20 yıl', rating: 4.7, reviewCount: 890, foundedYear: 2004}
export const OTO_BAKIM_CONFIG: ThemeConfig = {
  id: 'oto-bakim', name: 'Bakım', sectorId: 'otoservis', plan: 'free',
  description: 'Mavi/gri, genel oto bakım. Mecidiyeköy.', designPhilosophy: 'Auto blue — güvenilir, profesyonel.',
  isDark: false, cssVariables: OTO_BAKIM_CSS,
  fonts: { heading: { family: 'Bebas Neue', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'AutoRepair', sectorSections: ['auto_services_grid', 'vehicle_brands_bar', 'auto_stats_row', 'auto_booking'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Usta Garaj 🔧' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Fiyatlar', href: '#fiyatlar' }, { label: 'Randevu', href: '#randevu' }], cta: { text: 'Randevu', href: '#randevu', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Usta Garaj', copyright: '© 2024 Usta Garaj', contact: { phone: '0532 700 80 90', address: 'Mecidiyeköy, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/ustagaraj', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905327008090', message: 'Merhaba, araç servis randevusu almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Kabul', rejectText: 'Red', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Usta Garaj — Mecidiyeköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Mecidiyeköy', title: "Usta Garaj", subtitle: "Güvenilir oto bakım & onarım", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'otoservis_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905327008090" }, editableFields: [] }
    ]
  }]
}
