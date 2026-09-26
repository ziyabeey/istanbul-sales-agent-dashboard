/**
 * restoran-nar (growth) — Fusion, dark, fire-red accent. Syne heading.
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const RESTORAN_NAR_CSS: Record<string, string> = {
  '--color-bg': '#0A0A0A', '--color-surface': '#141414', '--color-surface-elevated': '#1A1A1A',
  '--color-text': '#F5F5F5', '--color-text-secondary': '#A0A0A0', '--color-text-muted': '#666',
  '--color-text-on-accent': '#FFFFFF', '--color-accent': '#EF4444', '--color-accent-hover': '#DC2626',
  '--color-accent-light': '#1A0808', '--color-border': '#2A2A2A',
  '--font-heading': "'Syne', sans-serif", '--font-body': "'Inter', sans-serif"}

export const RESTORAN_NAR_BUSINESS: BusinessData = {
  name: 'NÂR Kitchen & Bar', ownerName: 'Chef Emre Yıldız', sector: 'restoran',
  slogan: 'Ateşle pişer, tutkuyla sunulur',
  phone: '0212 243 77 88', phoneClean: '902122437788', whatsapp: '902122437788',
  email: 'info@narkitchen.com', address: 'Kemankeş Cad. No:28, Karaköy, İstanbul',
  city: 'İstanbul', district: 'Beyoğlu', coordinates: { lat: 41.0230, lng: 28.9770 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: null, close: null },
    { day: 'tuesday', dayTr: 'Salı', open: '18:00', close: '01:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '18:00', close: '01:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '18:00', close: '01:00' },
    { day: 'friday', dayTr: 'Cuma', open: '18:00', close: '02:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '18:00', close: '02:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '18:00', close: '00:00' }],
  socialMedia: { instagram: 'https://instagram.com/narkitchen' }, photos: [],
  services: [
    { id: 's1', name: 'Tasting Menu', price: '₺950', icon: '🔥', popular: true },
    { id: 's2', name: 'Chef\'s Table', price: '₺1500', icon: '👨‍🍳' }],
  team: [{ id: 't1', name: 'Chef Emre Yıldız', role: 'Executive Chef', experience: '15 yıl' }],
  rating: 4.8, reviewCount: 410, foundedYear: 2020}

export const RESTORAN_NAR_CONFIG: ThemeConfig = {
  id: 'restoran-nar', name: 'Nâr', sectorId: 'restoran', plan: 'growth',
  description: 'Fusion mutfak. Koyu, ateş kırmızısı, dramatik.',
  designPhilosophy: 'Syne heading — güçlü. Kırmızı-siyah dramatik.',
  isDark: true, cssVariables: RESTORAN_NAR_CSS,
  fonts: { heading: { family: 'Outfit', weights: [700, 800], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Restaurant', sectorSections: ['menu_display', 'reservation'],
  performanceBudget: { maxJS: '180kb', maxLCP: '3.0s', animationLevel: 'framer-full' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'dark', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'NÂR' }, menuItems: [{ label: 'Menu', href: '#menu' }, { label: 'Reservation', href: '#rezervasyon' }, { label: 'Contact', href: '#contact' }], cta: { text: 'Reserve', href: '#rezervasyon', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'minimal', order: 999, required: true, position: 'bottom', settings: { bgMode: 'dark', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'NÂR Kitchen & Bar', copyright: '© 2024 NÂR', contact: { phone: '0212 243 77 88' }, legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902122437788', message: 'Merhaba, NÂR\'da rezervasyon yapmak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'We use cookies.', acceptText: 'Accept', rejectText: 'Decline' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "NÂR Kitchen & Bar — Beyoğlu", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Beyoğlu', title: "NÂR Kitchen & Bar", subtitle: "Ateşle pişer, tutkuyla sunulur", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'restoran_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122437788" }, editableFields: [] }
    ]
  }]
}
