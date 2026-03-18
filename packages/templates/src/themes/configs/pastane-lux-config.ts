import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const PASTANE_LUX_CSS: Record<string, string> = {
  '--color-bg': '#080808', '--color-surface': '#111111', '--color-surface-elevated': '#1A1A1A',
  '--color-surface-muted': '#222222', '--color-text': '#F5EDD6', '--color-text-secondary': '#C9AD7A',
  '--color-text-muted': '#80663A', '--color-text-on-accent': '#080808', '--color-accent': '#D4AF37',
  '--color-accent-hover': '#B8943A', '--color-accent-light': 'rgba(212,175,55,0.12)',
  '--color-border': 'rgba(212,175,55,0.18)',
  '--font-heading': "'Cormorant Garamond', serif", '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px', '--radius-btn': '9999px'}
export const PASTANE_LUX_BUSINESS: BusinessData = {
  name: 'Maison Dorée', ownerName: 'Pierre Lefevre', sector: 'pastane',
  slogan: 'Haute pâtisserie', phone: '0212 227 88 99', phoneClean: '902122278899',
  whatsapp: '902122278899', email: 'reservation@maisondoree.com.tr',
  address: 'Teşvikiye Cad. No.45, Şişli, İstanbul', city: 'İstanbul', district: 'Teşvikiye',
  coordinates: { lat: 41.0494, lng: 28.9939 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '22:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '22:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '22:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '22:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '23:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '23:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '11:00', close: '21:00' }],
  socialMedia: { instagram: 'https://instagram.com/maisondoree' },
  photos: [], services: [
    { id: 's1', name: 'Haute Pâtisserie', icon: '🍰' }, { id: 's2', name: 'Düğün', icon: '💒' },
    { id: 's3', name: 'Çikolata', icon: '🍫' }, { id: 's4', name: 'Afternoon Tea', icon: '🫖' }],
  team: [{ id: 't1', name: 'Pierre Lefevre', role: 'Executive Pastry Chef', experience: '20 yıl' }],
  experience: '20 yıl', rating: 5.0, reviewCount: 178, foundedYear: 2010}
export const PASTANE_LUX_CONFIG: ThemeConfig = {
  id: 'pastane-lux', name: 'Lüks', sectorId: 'pastane', plan: 'enterprise',
  description: 'Siyah + altın, haute pâtisserie. Teşvikiye.', designPhilosophy: 'Dark gold — lüks, Fransız, prestige.',
  isDark: true, cssVariables: PASTANE_LUX_CSS,
  fonts: { heading: { family: 'Cinzel', weights: [600, 700], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Bakery', sectorSections: ['bakery_menu_grid', 'cake_gallery', 'bakery_story', 'cake_order'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'MAISON DORÉE' }, menuItems: [{ label: 'Carte', href: '#carte' }, { label: 'Galerie', href: '#galerie' }, { label: 'Réserver', href: '#reserver' }], cta: { text: 'Réserver', href: '#reserver', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Maison Dorée', copyright: '© 2024 Maison Dorée', contact: { phone: '0212 227 88 99', address: 'Teşvikiye, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/maisondoree', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902122278899', message: 'Bonjour, sipariş vermek istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Kabul', rejectText: 'Red', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Maison Dorée — Teşvikiye", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Teşvikiye', title: "Maison Dorée", subtitle: "Haute pâtisserie", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'pastane_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122278899" }, editableFields: [] }
    ]
  }]
}
