import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const PASTANE_TATLI_CSS: Record<string, string> = {
  '--color-bg': '#FFFBF0', '--color-surface': '#FEF3C7', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FDE68A', '--color-text': '#1C1300', '--color-text-secondary': '#5C4B19',
  '--color-text-muted': '#9E8B55', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#D97706',
  '--color-accent-hover': '#B45309', '--color-accent-light': '#FFFBEB', '--color-border': '#FCD34D',
  '--font-heading': "'Poppins', sans-serif", '--font-body': "'Poppins', sans-serif",
  '--radius-card': '14px', '--radius-btn': '9999px'}
export const PASTANE_TATLI_BUSINESS: BusinessData = {
  name: 'Bal & Kaymak', ownerName: 'Ahmet Şerbetçi', sector: 'pastane',
  slogan: 'Geleneksel Türk tatlıları', phone: '0212 511 22 33', phoneClean: '902125112233',
  whatsapp: '902125112233', email: 'info@balvekaymak.com.tr',
  address: 'Sultanahmet Mah. Divanyolu Cad. No.8, Fatih, İstanbul', city: 'İstanbul', district: 'Sultanahmet',
  coordinates: { lat: 41.0082, lng: 28.9784 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:00', close: '23:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:00', close: '23:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:00', close: '23:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:00', close: '23:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:00', close: '24:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '08:00', close: '24:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '08:00', close: '23:00' }],
  socialMedia: { instagram: 'https://instagram.com/balvekaymak' },
  photos: [], services: [
    { id: 's1', name: 'Baklava', icon: '🍯' }, { id: 's2', name: 'Künefe', icon: '🧀' },
    { id: 's3', name: 'Dondurma', icon: '🍦' }, { id: 's4', name: 'Sütlü Tatlı', icon: '🍮' }],
  team: [{ id: 't1', name: 'Ahmet Şerbetçi', role: 'Tatlı Ustası', experience: '30 yıl' }],
  experience: '30 yıl', rating: 4.8, reviewCount: 2340, foundedYear: 1994}
export const PASTANE_TATLI_CONFIG: ThemeConfig = {
  id: 'pastane-tatli', name: 'Tatlı', sectorId: 'pastane', plan: 'growth',
  description: 'Altın/bal, geleneksel Türk tatlıları. Sultanahmet.', designPhilosophy: 'Golden honey — geleneksel, sıcak.',
  isDark: false, cssVariables: PASTANE_TATLI_CSS,
  fonts: { heading: { family: 'Lora', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'Poppins', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Bakery', sectorSections: ['bakery_menu_grid', 'bakery_story', 'cake_gallery', 'cake_order'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Bal & Kaymak 🍯' }, menuItems: [{ label: 'Menü', href: '#menu' }, { label: 'Galeri', href: '#galeri' }, { label: 'Sipariş', href: '#siparis' }], cta: { text: 'Sipariş', href: '#siparis', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Bal & Kaymak', copyright: '© 2024 Bal & Kaymak', contact: { phone: '0212 511 22 33', address: 'Sultanahmet, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/balvekaymak', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902125112233', message: 'Merhaba, tatlı siparişi vermek istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Bal & Kaymak — Sultanahmet", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Sultanahmet', title: "Bal & Kaymak", subtitle: "Geleneksel Türk tatlıları", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'pastane_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902125112233" }, editableFields: [] }
    ]
  }]
}
