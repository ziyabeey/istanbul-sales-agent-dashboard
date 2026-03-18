import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const PASTANE_SIMIT_CSS: Record<string, string> = {
  '--color-bg': '#FFF8F0', '--color-surface': '#FFEDD5', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FED7AA', '--color-text': '#1C0800', '--color-text-secondary': '#5C3819',
  '--color-text-muted': '#9E8570', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#B45309',
  '--color-accent-hover': '#92400E', '--color-accent-light': '#FFFBEB', '--color-border': '#FBBF24',
  '--font-heading': "'Nunito', sans-serif", '--font-body': "'Nunito', sans-serif",
  '--radius-card': '14px', '--radius-btn': '9999px'}
export const PASTANE_SIMIT_BUSINESS: BusinessData = {
  name: 'Simit & Un', ownerName: 'Mustafa Fırıncı', sector: 'pastane',
  slogan: 'Geleneksel lezzetler, taze fırından', phone: '0216 330 55 88', phoneClean: '902163305588',
  whatsapp: '902163305588', email: 'info@simitveun.com.tr',
  address: 'Üsküdar Mah. Çarşı Cad. No.12, Üsküdar, İstanbul', city: 'İstanbul', district: 'Üsküdar',
  coordinates: { lat: 41.0261, lng: 29.0159 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '06:00', close: '21:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '06:00', close: '21:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '06:00', close: '21:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '06:00', close: '21:00' },
    { day: 'friday', dayTr: 'Cuma', open: '06:00', close: '21:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '06:00', close: '22:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '07:00', close: '20:00' }],
  socialMedia: { instagram: 'https://instagram.com/simitveun' },
  photos: [], services: [
    { id: 's1', name: 'Ekmek', icon: '🍞' }, { id: 's2', name: 'Simit', icon: '🥯' },
    { id: 's3', name: 'Börek', icon: '🥐' }, { id: 's4', name: 'Poğaça', icon: '🥖' }],
  team: [{ id: 't1', name: 'Mustafa Fırıncı', role: 'Usta Fırıncı', experience: '25 yıl' }],
  experience: '25 yıl', rating: 4.7, reviewCount: 890, foundedYear: 1999}
export const PASTANE_SIMIT_CONFIG: ThemeConfig = {
  id: 'pastane-simit', name: 'Simit', sectorId: 'pastane', plan: 'free',
  description: 'Sıcak turuncu/krem, geleneksel fırın. Üsküdar.', designPhilosophy: 'Bakery warm — geleneksel, samimi.',
  isDark: false, cssVariables: PASTANE_SIMIT_CSS,
  fonts: { heading: { family: 'Outfit', weights: [700, 800], subsets: ['latin-ext'] }, body: { family: 'Nunito', weights: [400, 500, 600], subsets: ['latin-ext'] } },
  seoSchemaType: 'Bakery', sectorSections: ['bakery_menu_grid', 'bakery_story', 'bakery_stats_row', 'cake_order'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Simit & Un 🥯' }, menuItems: [{ label: 'Menü', href: '#menu' }, { label: 'Hakkımızda', href: '#hikaye' }, { label: 'Sipariş', href: '#siparis' }], cta: { text: 'Sipariş', href: '#siparis', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Simit & Un', copyright: '© 2024 Simit & Un', contact: { phone: '0216 330 55 88', address: 'Üsküdar, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/simitveun', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902163305588', message: 'Merhaba, sipariş vermek istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Simit & Un — Üsküdar", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Üsküdar', title: "Simit & Un", subtitle: "Geleneksel lezzetler, taze fırından", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'pastane_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902163305588" }, editableFields: [] }
    ]
  }]
}
