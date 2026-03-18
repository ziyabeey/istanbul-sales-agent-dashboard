/**
 * vet-cerrahi ThemeConfig (growth) — Yeşil + beyaz, cerrahi & acil. Inter.
 * Business: MediPet Cerrahi Merkezi, Beşiktaş
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const VET_CERRAHI_CSS: Record<string, string> = {
  '--color-bg': '#F0FDF4', '--color-surface': '#DCFCE7', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#BBF7D0', '--color-text': '#052E16', '--color-text-secondary': '#166534',
  '--color-text-muted': '#6B7280', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#16A34A',
  '--color-accent-hover': '#15803D', '--color-accent-light': '#F0FDF4', '--color-border': '#86EFAC',
  '--font-heading': "'Inter', sans-serif", '--font-body': "'Inter', sans-serif",
  '--radius-card': '12px', '--radius-btn': '8px'}
export const VET_CERRAHI_BUSINESS: BusinessData = {
  name: 'MediPet Cerrahi Merkezi', ownerName: 'Prof. Dr. Burak Özen', sector: 'veteriner',
  slogan: '7/24 acil cerrahi & yoğun bakım', phone: '0212 260 77 88', phoneClean: '902122607788',
  whatsapp: '902122607788', email: 'acil@medipet.com.tr',
  address: 'Barbaros Bulvarı No.55, Beşiktaş, İstanbul', city: 'İstanbul', district: 'Beşiktaş',
  coordinates: { lat: 41.0486, lng: 29.0101 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '00:00', close: '23:59' },
    { day: 'tuesday', dayTr: 'Salı', open: '00:00', close: '23:59' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '00:00', close: '23:59' },
    { day: 'thursday', dayTr: 'Perşembe', open: '00:00', close: '23:59' },
    { day: 'friday', dayTr: 'Cuma', open: '00:00', close: '23:59' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '00:00', close: '23:59' },
    { day: 'sunday', dayTr: 'Pazar', open: '00:00', close: '23:59' }],
  socialMedia: { instagram: 'https://instagram.com/medipetvet', youtube: 'https://youtube.com/@medipet' },
  photos: [], services: [
    { id: 's1', name: 'Cerrahi', icon: '🏥' }, { id: 's2', name: 'Yoğun Bakım', icon: '🫀' },
    { id: 's3', name: 'Ortopedi', icon: '🦴' }, { id: 's4', name: 'Acil Müdahale', icon: '🚑' }],
  team: [{ id: 't1', name: 'Prof. Dr. Burak Özen', role: 'Vet Cerrah', experience: '20 yıl' }],
  experience: '20 yıl', rating: 4.9, reviewCount: 456, foundedYear: 2010}
export const VET_CERRAHI_CONFIG: ThemeConfig = {
  id: 'vet-cerrahi', name: 'Cerrahi', sectorId: 'veteriner', plan: 'growth',
  description: 'Yeşil + beyaz, cerrahi & acil. Beşiktaş.', designPhilosophy: 'Clinical green — steril, güven, uzmanlık.',
  isDark: false, cssVariables: VET_CERRAHI_CSS,
  fonts: { heading: { family: 'Space Grotesk', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'VeterinaryCare', sectorSections: ['pet_services_grid', 'vet_team', 'vet_stats_row', 'pet_appointment'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'MediPet 🏥' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Ekip', href: '#ekip' }, { label: 'Acil', href: '#acil' }], cta: { text: '🚑 Acil Randevu', href: '#acil', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'MediPet', copyright: '© 2024 MediPet', contact: { phone: '0212 260 77 88', address: 'Beşiktaş, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/medipetvet', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902122607788', message: 'Acil! Hayvanım için yardım gerekiyor.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "MediPet Cerrahi Merkezi — Beşiktaş", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Beşiktaş', title: "MediPet Cerrahi Merkezi", subtitle: "7/24 acil cerrahi & yoğun bakım", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'veteriner_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122607788" }, editableFields: [] }
    ]
  }]
}
