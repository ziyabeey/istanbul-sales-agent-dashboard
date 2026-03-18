/**
 * restoran-lezzet (starter) — Modern Türk mutfağı. Plus Jakarta Sans, orange.
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const RESTORAN_LEZZET_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF', '--color-surface': '#F9FAFB', '--color-surface-elevated': '#FFFFFF',
  '--color-text': '#1A1A1A', '--color-text-secondary': '#6B7280', '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#EA580C', '--color-accent-hover': '#C2410C', '--color-accent-light': '#FFF7ED',
  '--color-border': '#E5E7EB', '--font-heading': "'Plus Jakarta Sans', sans-serif", '--font-body': "'Inter', sans-serif"}

export const RESTORAN_LEZZET_BUSINESS: BusinessData = {
  name: 'Lezzet Mutfağı', ownerName: 'Ayşe Kara', sector: 'restoran',
  slogan: 'Modern Türk lezzetleri, özgün sunumlar',
  phone: '0212 245 89 01', phoneClean: '902122458901', whatsapp: '902122458901',
  email: 'info@lezzetmutfagi.com', address: 'İstiklal Cad. Atlas Pasajı No:5, Beyoğlu, İstanbul',
  city: 'İstanbul', district: 'Beyoğlu', coordinates: { lat: 41.0335, lng: 28.9770 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '12:00', close: '23:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '12:00', close: '23:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '12:00', close: '23:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '12:00', close: '23:00' },
    { day: 'friday', dayTr: 'Cuma', open: '12:00', close: '00:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '12:00', close: '00:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '12:00', close: '22:00' }],
  socialMedia: { instagram: 'https://instagram.com/lezzetmutfagi' }, photos: [],
  services: [
    { id: 's1', name: 'Lezzet Tabağı', price: '₺280', icon: '🍽️' },
    { id: 's2', name: 'Pide Çeşitleri', price: '₺160', icon: '🫓' },
    { id: 's3', name: 'Ocakbaşı', price: '₺320', icon: '🔥' }],
  team: [{ id: 't1', name: 'Ayşe Kara', role: 'Şef', experience: '15 yıl' }],
  rating: 4.7, reviewCount: 230, foundedYear: 2018}

export const RESTORAN_LEZZET_CONFIG: ThemeConfig = {
  id: 'restoran-lezzet', name: 'Lezzet', sectorId: 'restoran', plan: 'starter',
  description: 'Modern Türk mutfağı. Yuvarlak, turuncu, fotoğraf odaklı.',
  designPhilosophy: 'Plus Jakarta Sans — modern, yuvarlık. Yemek fotoğrafları ön planda.',
  isDark: false, cssVariables: RESTORAN_LEZZET_CSS,
  fonts: { heading: { family: 'Bebas Neue', weights: [600, 700], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Restaurant', sectorSections: ['menu_display', 'reservation', 'delivery_zone'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Lezzet Mutfağı' }, menuItems: [{ label: 'Menü', href: '#menu' }, { label: 'Rezervasyon', href: '#rezervasyon' }, { label: 'İletişim', href: '#iletisim' }], cta: { text: 'Rezervasyon', href: '#rezervasyon', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'minimal', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Lezzet Mutfağı', copyright: '© 2024', contact: { phone: '0212 245 89 01' }, legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902122458901', message: 'Merhaba, rezervasyon yapmak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanımını kabul ediyor musunuz?', acceptText: 'Evet', rejectText: 'Hayır' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Lezzet Mutfağı — Beyoğlu", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Beyoğlu', title: "Lezzet Mutfağı", subtitle: "Modern Türk lezzetleri, özgün sunumlar", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'restoran_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122458901" }, editableFields: [] }
    ]
  }]
}
