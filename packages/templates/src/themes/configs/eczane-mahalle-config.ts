import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const ECZANE_MAHALLE_CSS: Record<string, string> = {
  '--color-bg': '#F0F9FF', '--color-surface': '#E0F2FE', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#BAE6FD', '--color-text': '#0C1B2A', '--color-text-secondary': '#1E3A5F',
  '--color-text-muted': '#6B7280', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#0284C7',
  '--color-accent-hover': '#0369A1', '--color-accent-light': '#F0F9FF', '--color-border': '#7DD3FC',
  '--font-heading': "'Inter', sans-serif", '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px', '--radius-btn': '9999px'}
export const ECZANE_MAHALLE_BUSINESS: BusinessData = {
  name: 'Hayat Eczanesi', ownerName: 'Ecz. Ayşe Sağlık', sector: 'eczane',
  slogan: 'Mahallenizin güvenilir eczanesi', phone: '0212 444 55 66', phoneClean: '902124445566',
  whatsapp: '902124445566', email: 'info@hayateczanesi.com.tr',
  address: 'Bakırköy Mah. İstanbul Cad. No.18, Bakırköy, İstanbul', city: 'İstanbul', district: 'Bakırköy',
  coordinates: { lat: 40.9800, lng: 28.8716 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '19:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '18:00' }],
  socialMedia: { instagram: 'https://instagram.com/hayateczanesi' },
  photos: [], services: [
    { id: 's1', name: 'Reçete', icon: '📋' }, { id: 's2', name: 'Tansiyon', icon: '🩺' },
    { id: 's3', name: 'Şeker Ölçüm', icon: '🩸' }, { id: 's4', name: 'Danışmanlık', icon: '💊' }],
  team: [{ id: 't1', name: 'Ecz. Ayşe Sağlık', role: 'Eczacı', experience: '15 yıl' }],
  experience: '15 yıl', rating: 4.8, reviewCount: 560, foundedYear: 2009}
export const ECZANE_MAHALLE_CONFIG: ThemeConfig = {
  id: 'eczane-mahalle', name: 'Mahalle', sectorId: 'eczane', plan: 'free',
  description: 'Mavi/beyaz, mahalle eczanesi. Bakırköy.', designPhilosophy: 'Trust blue — güvenilir, samimi.',
  isDark: false, cssVariables: ECZANE_MAHALLE_CSS,
  fonts: { heading: { family: 'Montserrat', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Pharmacy', sectorSections: ['pharmacy_services_grid', 'pharmacy_duty', 'pharmacy_stats_row', 'pharmacy_contact'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Hayat Eczanesi 💊' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Nöbet', href: '#nobet' }, { label: 'İletişim', href: '#iletisim' }], cta: { text: 'Ara', href: 'tel:02124445566', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Hayat Eczanesi', copyright: '© 2024 Hayat Eczanesi', contact: { phone: '0212 444 55 66', address: 'Bakırköy, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/hayateczanesi', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902124445566', message: 'Merhaba, ilaç bilgisi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Kabul', rejectText: 'Red', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Hayat Eczanesi — Bakırköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Bakırköy', title: "Hayat Eczanesi", subtitle: "Mahallenizin güvenilir eczanesi", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'eczane_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902124445566" }, editableFields: [] }
    ]
  }]
}
