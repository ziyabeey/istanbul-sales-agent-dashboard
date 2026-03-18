import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const PASTANE_VEGAN_CSS: Record<string, string> = {
  '--color-bg': '#F0FDF4', '--color-surface': '#DCFCE7', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#BBF7D0', '--color-text': '#052E16', '--color-text-secondary': '#166534',
  '--color-text-muted': '#6B7280', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#059669',
  '--color-accent-hover': '#047857', '--color-accent-light': '#ECFDF5', '--color-border': '#6EE7B7',
  '--font-heading': "'DM Sans', sans-serif", '--font-body': "'DM Sans', sans-serif",
  '--radius-card': '16px', '--radius-btn': '9999px'}
export const PASTANE_VEGAN_BUSINESS: BusinessData = {
  name: 'Green Bake', ownerName: 'Selin Tohumcu', sector: 'pastane',
  slogan: 'Vegan, glutensiz, günahsız', phone: '0533 444 55 66', phoneClean: '905334445566',
  whatsapp: '905334445566', email: 'info@greenbake.com.tr',
  address: 'Moda Cad. No.22, Kadıköy, İstanbul', city: 'İstanbul', district: 'Moda',
  coordinates: { lat: 40.9840, lng: 29.0249 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '21:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '19:00' }],
  socialMedia: { instagram: 'https://instagram.com/greenbaketr' },
  photos: [], services: [
    { id: 's1', name: 'Vegan Pasta', icon: '🌱' }, { id: 's2', name: 'Glutensiz', icon: '🚫' },
    { id: 's3', name: 'Raw', icon: '🥑' }, { id: 's4', name: 'Keto', icon: '🥥' }],
  team: [{ id: 't1', name: 'Selin Tohumcu', role: 'Vegan Chef', experience: '7 yıl' }],
  experience: '7 yıl', rating: 4.9, reviewCount: 289, foundedYear: 2017}
export const PASTANE_VEGAN_CONFIG: ThemeConfig = {
  id: 'pastane-vegan', name: 'Vegan', sectorId: 'pastane', plan: 'pro',
  description: 'Yeşil, vegan/glutensiz pastane. Moda.', designPhilosophy: 'Green clean — sağlıklı, doğal.',
  isDark: false, cssVariables: PASTANE_VEGAN_CSS,
  fonts: { heading: { family: 'DM Sans', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'DM Sans', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Bakery', sectorSections: ['bakery_menu_grid', 'bakery_story', 'cake_gallery', 'cake_order'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Green Bake 🌱' }, menuItems: [{ label: 'Menü', href: '#menu' }, { label: 'Galeri', href: '#galeri' }, { label: 'Sipariş', href: '#siparis' }], cta: { text: 'Sipariş', href: '#siparis', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Green Bake', copyright: '© 2024 Green Bake', contact: { phone: '0533 444 55 66', address: 'Moda, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/greenbaketr', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905334445566', message: 'Merhaba, vegan pasta siparişi vermek istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Kabul', rejectText: 'Red', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Green Bake — Moda", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Moda', title: "Green Bake", subtitle: "Vegan, glutensiz, günahsız", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'pastane_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905334445566" }, editableFields: [] }
    ]
  }]
}
