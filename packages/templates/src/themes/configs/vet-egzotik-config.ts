import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const VET_EGZOTIK_CSS: Record<string, string> = {
  '--color-bg': '#F0F7F0', '--color-surface': '#D5E8D4', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#B8D4B5', '--color-text': '#0B2E0B', '--color-text-secondary': '#1A5C1A',
  '--color-text-muted': '#6B8B6B', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#2E7D32',
  '--color-accent-hover': '#1B5E20', '--color-accent-light': '#E8F5E9', '--color-border': '#A5D6A7',
  '--font-heading': "'Merriweather', serif", '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px', '--radius-btn': '10px'}
export const VET_EGZOTIK_BUSINESS: BusinessData = {
  name: 'Egzotik Paws', ownerName: 'Dr. Nil Gök', sector: 'veteriner',
  slogan: 'Nadir dostlarınıza uzman bakım', phone: '0216 460 33 22', phoneClean: '902164603322',
  whatsapp: '902164603322', email: 'randevu@egzotikpaws.com.tr',
  address: 'Kavacık Mah. No.9, Beykoz, İstanbul', city: 'İstanbul', district: 'Beykoz',
  coordinates: { lat: 41.1012, lng: 29.0811 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '16:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/egzotikpaws' },
  photos: [], services: [
    { id: 's1', name: 'Sürüngen', icon: '🦎' }, { id: 's2', name: 'Papağan', icon: '🦜' },
    { id: 's3', name: 'Kemirgen', icon: '🐹' }, { id: 's4', name: 'Balık', icon: '🐠' }],
  team: [{ id: 't1', name: 'Dr. Nil Gök', role: 'Egzotik Hayvan Uzmanı', experience: '12 yıl' }],
  experience: '12 yıl', rating: 5.0, reviewCount: 189, foundedYear: 2015}
export const VET_EGZOTIK_CONFIG: ThemeConfig = {
  id: 'vet-egzotik', name: 'Egzotik', sectorId: 'veteriner', plan: 'pro',
  description: 'Koyu yeşil, egzotik hayvan uzmanı. Beykoz.', designPhilosophy: 'Jungle green — doğa, uzmanlık.',
  isDark: false, cssVariables: VET_EGZOTIK_CSS,
  fonts: { heading: { family: 'Bodoni Moda', weights: [700, 900], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'VeterinaryCare', sectorSections: ['pet_services_grid', 'vet_team', 'pet_gallery', 'pet_appointment'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Egzotik Paws 🦎' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Dr. Nil', href: '#ekip' }, { label: 'Randevu', href: '#randevu' }], cta: { text: 'Randevu', href: '#randevu', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Egzotik Paws', copyright: '© 2024 Egzotik Paws', contact: { phone: '0216 460 33 22', address: 'Beykoz, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/egzotikpaws', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902164603322', message: 'Merhaba, egzotik hayvanım için randevu almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Egzotik Paws — Beykoz", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Beykoz', title: "Egzotik Paws", subtitle: "Nadir dostlarınıza uzman bakım", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'veteriner_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902164603322" }, editableFields: [] }
    ]
  }]
}
