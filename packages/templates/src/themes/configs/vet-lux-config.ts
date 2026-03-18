/**
 * vet-lux ThemeConfig (enterprise) — Siyah + altın, VIP pet otel & klinik. Cormorant.
 * Business: Noir Paws VIP, Etiler
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const VET_LUX_CSS: Record<string, string> = {
  '--color-bg': '#080808', '--color-surface': '#111111', '--color-surface-elevated': '#1A1A1A',
  '--color-surface-muted': '#222222', '--color-text': '#F5EDD6', '--color-text-secondary': '#C9AD7A',
  '--color-text-muted': '#80663A', '--color-text-on-accent': '#080808', '--color-accent': '#D4AF37',
  '--color-accent-hover': '#B8943A', '--color-accent-light': 'rgba(212,175,55,0.12)',
  '--color-border': 'rgba(212,175,55,0.18)',
  '--font-heading': "'Cormorant Garamond', serif", '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px', '--radius-btn': '9999px'}
export const VET_LUX_BUSINESS: BusinessData = {
  name: 'Noir Paws VIP', ownerName: 'Dr. Canan Eser', sector: 'veteriner',
  slogan: 'Ultra premium pet bakım & klinik', phone: '0212 358 66 77', phoneClean: '902123586677',
  whatsapp: '902123586677', email: 'vip@noirpaws.com.tr',
  address: 'Nispetiye Cad. No.12, Etiler, İstanbul', city: 'İstanbul', district: 'Etiler',
  coordinates: { lat: 41.0810, lng: 29.0325 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '21:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '21:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '21:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '21:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '16:00' }],
  socialMedia: { instagram: 'https://instagram.com/noirpaws' },
  photos: [], services: [
    { id: 's1', name: 'VIP Klinik', icon: '🏥' }, { id: 's2', name: 'Pet Otel', icon: '🏨' },
    { id: 's3', name: 'Spa & Bakım', icon: '🧖' }, { id: 's4', name: 'Beslenme', icon: '🥩' }],
  team: [{ id: 't1', name: 'Dr. Canan Eser', role: 'VIP Klinik Direktörü', experience: '18 yıl' }],
  experience: '18 yıl', rating: 5.0, reviewCount: 98, foundedYear: 2019}
export const VET_LUX_CONFIG: ThemeConfig = {
  id: 'vet-lux', name: 'Lüks', sectorId: 'veteriner', plan: 'enterprise',
  description: 'Siyah + altın, VIP pet otel & klinik. Etiler.',
  designPhilosophy: 'Dark gold — lüks, VIP, özel bakım.',
  isDark: true, cssVariables: VET_LUX_CSS,
  fonts: { heading: { family: 'Syne', weights: [600, 700], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'VeterinaryCare', sectorSections: ['pet_services_grid', 'vet_team', 'vet_stats_row', 'pet_appointment'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'NOIR PAWS' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Ekip', href: '#ekip' }, { label: 'Randevu', href: '#randevu' }], cta: { text: 'VIP Randevu', href: '#randevu', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Noir Paws VIP', copyright: '© 2024 Noir Paws VIP', contact: { phone: '0212 358 66 77', address: 'Etiler, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/noirpaws', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902123586677', message: 'Bonjour, VIP pet bakım için bilgi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Noir Paws VIP — Etiler", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Etiler', title: "Noir Paws VIP", subtitle: "Ultra premium pet bakım & klinik", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'veteriner_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902123586677" }, editableFields: [] }
    ]
  }]
}
