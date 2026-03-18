import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const PASTANE_PASTA_CSS: Record<string, string> = {
  '--color-bg': '#FFF0F5', '--color-surface': '#FFE1EC', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FFC0D3', '--color-text': '#2E0316', '--color-text-secondary': '#6E1443',
  '--color-text-muted': '#B06585', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#EC4899',
  '--color-accent-hover': '#DB2777', '--color-accent-light': '#FDF2F8', '--color-border': '#F9A8D4',
  '--font-heading': "'Playfair Display', serif", '--font-body': "'Lato', sans-serif",
  '--radius-card': '16px', '--radius-btn': '9999px'}
export const PASTANE_PASTA_BUSINESS: BusinessData = {
  name: 'Şeker Atölyesi', ownerName: 'Zeynep Tatlıcı', sector: 'pastane',
  slogan: 'Hayalinizdeki pastayı yaratıyoruz', phone: '0532 888 99 00', phoneClean: '905328889900',
  whatsapp: '905328889900', email: 'siparis@sekeratölyesi.com.tr',
  address: 'Nişantaşı Mah. Abdi İpekçi Cad. No.5, Şişli, İstanbul', city: 'İstanbul', district: 'Nişantaşı',
  coordinates: { lat: 41.0487, lng: 28.9923 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '21:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '19:00' }],
  socialMedia: { instagram: 'https://instagram.com/sekeratölyesi' },
  photos: [], services: [
    { id: 's1', name: 'Düğün Pastası', icon: '🎂' }, { id: 's2', name: 'Doğum Günü', icon: '🎉' },
    { id: 's3', name: 'Kurabiye', icon: '🍪' }, { id: 's4', name: 'Macaroon', icon: '🧁' }],
  team: [{ id: 't1', name: 'Zeynep Tatlıcı', role: 'Pastry Chef', experience: '12 yıl' }],
  experience: '12 yıl', rating: 4.9, reviewCount: 567, foundedYear: 2012}
export const PASTANE_PASTA_CONFIG: ThemeConfig = {
  id: 'pastane-pasta', name: 'Pasta', sectorId: 'pastane', plan: 'starter',
  description: 'Pembe/beyaz, butik pasta atölyesi. Nişantaşı.', designPhilosophy: 'Sweet pink — romantik, butik, özel.',
  isDark: false, cssVariables: PASTANE_PASTA_CSS,
  fonts: { heading: { family: 'Playfair Display', weights: [600, 700], subsets: ['latin-ext'] }, body: { family: 'Lato', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Bakery', sectorSections: ['bakery_menu_grid', 'cake_gallery', 'bakery_stats_row', 'cake_order'],
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Şeker Atölyesi 🎂' }, menuItems: [{ label: 'Menü', href: '#menu' }, { label: 'Galeri', href: '#galeri' }, { label: 'Sipariş', href: '#siparis' }], cta: { text: 'Sipariş', href: '#siparis', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Şeker Atölyesi', copyright: '© 2024 Şeker Atölyesi', contact: { phone: '0532 888 99 00', address: 'Nişantaşı, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/sekeratölyesi', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905328889900', message: 'Merhaba, pasta siparişi vermek istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Şeker Atölyesi — Nişantaşı", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Nişantaşı', title: "Şeker Atölyesi", subtitle: "Hayalinizdeki pastayı yaratıyoruz", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'pastane_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905328889900" }, editableFields: [] }
    ]
  }]
}
