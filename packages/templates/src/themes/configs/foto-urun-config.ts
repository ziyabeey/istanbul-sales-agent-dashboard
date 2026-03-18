import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const FOTO_URUN_CSS: Record<string, string> = {
  '--color-bg': '#F8F8F8', '--color-surface': '#EEEEEE', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E0E0E0', '--color-text': '#111111', '--color-text-secondary': '#444444',
  '--color-text-muted': '#888888', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#111111',
  '--color-accent-hover': '#333333', '--color-accent-light': '#F3F3F3', '--color-border': '#DDDDDD',
  '--font-heading': "'Inter', sans-serif", '--font-body': "'Inter', sans-serif",
  '--radius-card': '10px', '--radius-btn': '6px'}
export const FOTO_URUN_BUSINESS: BusinessData = {
  name: 'Pixel Studio', ownerName: 'Deniz Yalçın', sector: 'fotografci',
  slogan: 'Ürününüz, en iyi haliyle', phone: '0212 280 90 11', phoneClean: '902122809011',
  whatsapp: '902122809011', email: 'info@pixelstudio.com.tr',
  address: 'Maslak Mah. Büyükdere Cad. No.100, Sarıyer, İstanbul', city: 'İstanbul', district: 'Maslak',
  coordinates: { lat: 41.1070, lng: 29.0210 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: null, close: null },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/pixelstudiotr' },
  photos: [], services: [
    { id: 's1', name: 'Ürün Çekim', icon: '📦' }, { id: 's2', name: 'E-ticaret', icon: '🛒' },
    { id: 's3', name: 'Yemek Fotoğraf', icon: '🍽️' }, { id: 's4', name: 'Mücevher', icon: '💎' }],
  team: [{ id: 't1', name: 'Deniz Yalçın', role: 'Ürün Fotoğrafçısı', experience: '8 yıl' }],
  experience: '8 yıl', rating: 4.9, reviewCount: 186, foundedYear: 2016}
export const FOTO_URUN_CONFIG: ThemeConfig = {
  id: 'foto-urun', name: 'Ürün', sectorId: 'fotografci', plan: 'starter',
  description: 'Minimal siyah/beyaz, ürün fotoğrafçısı. Maslak.', designPhilosophy: 'Clean minimal — ürünü ön plana çıkarır.',
  isDark: false, cssVariables: FOTO_URUN_CSS,
  fonts: { heading: { family: 'Oswald', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'LocalBusiness', sectorSections: ['photo_portfolio_grid', 'photo_package_cards', 'photo_stats_row', 'shooting_booking'],
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'PIXEL' }, menuItems: [{ label: 'Portfolio', href: '#portfolio' }, { label: 'Fiyat', href: '#fiyat' }, { label: 'Teklif', href: '#teklif' }], cta: { text: 'Teklif Al', href: '#teklif', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Pixel Studio', copyright: '© 2024 Pixel Studio', contact: { phone: '0212 280 90 11', address: 'Maslak, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/pixelstudiotr', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902122809011', message: 'Merhaba, ürün çekimi için teklif almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Pixel Studio — Maslak", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Maslak', title: "Pixel Studio", subtitle: "Ürününüz, en iyi haliyle", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'fotografci_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122809011" }, editableFields: [] }
    ]
  }]
}
