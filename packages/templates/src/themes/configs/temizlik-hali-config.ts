import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const TEMIZLIK_HALI_CSS: Record<string, string> = {
  '--color-bg': '#FFF8F0', '--color-surface': '#FFEDD5', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FED7AA', '--color-text': '#1C0800', '--color-text-secondary': '#5C3819',
  '--color-text-muted': '#9E8570', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#EA580C',
  '--color-accent-hover': '#C2410C', '--color-accent-light': '#FFF7ED', '--color-border': '#FDBA74',
  '--font-heading': "'Poppins', sans-serif", '--font-body': "'Poppins', sans-serif",
  '--radius-card': '14px', '--radius-btn': '9999px'}
export const TEMIZLIK_HALI_BUSINESS: BusinessData = {
  name: 'Yıka-Pak Halı', ownerName: 'Mehmet Çelik', sector: 'temizlik',
  slogan: 'Halınız bizde güvende', phone: '0534 222 33 44', phoneClean: '905342223344',
  whatsapp: '905342223344', email: 'info@yikapak.com.tr',
  address: 'İkitelli OSB Mah. No.88, Başakşehir, İstanbul', city: 'İstanbul', district: 'Başakşehir',
  coordinates: { lat: 41.0830, lng: 28.8010 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '16:00' }],
  socialMedia: { instagram: 'https://instagram.com/yikapakhali' },
  photos: [], services: [
    { id: 's1', name: 'Halı Yıkama', icon: '🧹' }, { id: 's2', name: 'Koltuk', icon: '🛋️' },
    { id: 's3', name: 'Yorgan', icon: '🛏️' }, { id: 's4', name: 'Perde', icon: '🪟' }],
  team: [{ id: 't1', name: 'Mehmet Çelik', role: 'Kurucu', experience: '18 yıl' }],
  experience: '18 yıl', rating: 4.7, reviewCount: 2100, foundedYear: 2006}
export const TEMIZLIK_HALI_CONFIG: ThemeConfig = {
  id: 'temizlik-hali', name: 'Halı', sectorId: 'temizlik', plan: 'growth',
  description: 'Turuncu/krem, halı yıkama fabrikası. Başakşehir.', designPhilosophy: 'Warm orange — sıcak, güvenilir.',
  isDark: false, cssVariables: TEMIZLIK_HALI_CSS,
  fonts: { heading: { family: 'Inter', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'Poppins', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'LocalBusiness', sectorSections: ['cleaning_services_grid', 'before_after_showcase', 'cleaning_stats_row', 'cleaning_booking'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Yıka-Pak 🧹' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Fiyat', href: '#fiyat' }, { label: 'Sipariş', href: '#siparis' }], cta: { text: 'Sipariş Ver', href: '#siparis', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Yıka-Pak', copyright: '© 2024 Yıka-Pak', contact: { phone: '0534 222 33 44', address: 'Başakşehir, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/yikapakhali', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905342223344', message: 'Merhaba, halı yıkama için sipariş vermek istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Yıka-Pak Halı — Başakşehir", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Başakşehir', title: "Yıka-Pak Halı", subtitle: "Halınız bizde güvende", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'temizlik_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905342223344" }, editableFields: [] }
    ]
  }]
}
