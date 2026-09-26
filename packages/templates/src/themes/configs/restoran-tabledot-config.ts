/**
 * restoran-tabledot (pro) — Fine dining, Cormorant Garamond, editorial.
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const RESTORAN_TABLEDOT_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF', '--color-surface': '#FAF8F5', '--color-surface-elevated': '#FFFFFF',
  '--color-text': '#1A1A1A', '--color-text-secondary': '#5A5A5A', '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#1A1A1A', '--color-accent-hover': '#374151', '--color-accent-light': '#F3F4F6',
  '--color-border': '#E5E7EB', '--font-heading': "'Cormorant Garamond', serif", '--font-body': "'Source Sans 3', sans-serif",
  '--radius-md': '4px', '--radius-lg': '8px'}

export const RESTORAN_TABLEDOT_BUSINESS: BusinessData = {
  name: "Table d'Hôte", ownerName: 'Chef Sinan Arıkan', sector: 'restoran',
  slogan: 'Lezzet bir sanattır. Biz onu yaşatıyoruz.',
  phone: '0212 230 55 66', phoneClean: '902122305566', whatsapp: '902122305566',
  email: 'reservation@tabledot.com.tr', address: 'Abdi İpekçi Cad. No:42, Nişantaşı, İstanbul',
  city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0491, lng: 28.9935 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: null, close: null },
    { day: 'tuesday', dayTr: 'Salı', open: '19:00', close: '23:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '19:00', close: '23:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '19:00', close: '23:00' },
    { day: 'friday', dayTr: 'Cuma', open: '19:00', close: '00:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '19:00', close: '00:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '12:00', close: '16:00' }],
  socialMedia: { instagram: 'https://instagram.com/tabledot' }, photos: [],
  services: [{ id: 's1', name: 'Degustation Menu', price: '₺2500', icon: '🍷', popular: true }],
  team: [{ id: 't1', name: 'Chef Sinan Arıkan', role: 'Executive Chef', experience: '20 yıl' }],
  rating: 4.9, reviewCount: 580, foundedYear: 2017}

export const RESTORAN_TABLEDOT_CONFIG: ThemeConfig = {
  id: 'restoran-tabledot', name: "Table d'Hôte", sectorId: 'restoran', plan: 'pro',
  description: 'Fine dining. Serif lüks, editoryal şef profili.',
  designPhilosophy: 'Cormorant Garamond ile dergi kalitesinde layout.',
  isDark: false, cssVariables: RESTORAN_TABLEDOT_CSS,
  fonts: { heading: { family: 'Lora', weights: [400, 600, 700], subsets: ['latin-ext'] }, body: { family: 'Source Sans 3', weights: [400, 600], subsets: ['latin-ext'] } },
  seoSchemaType: 'Restaurant', sectorSections: ['menu_display', 'reservation'],
  performanceBudget: { maxJS: '250kb', maxLCP: '3.0s', animationLevel: 'gsap-allowed' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: "Table d'Hôte" }, menuItems: [{ label: 'Menü', href: '#menu' }, { label: 'Şef', href: '#sef' }, { label: 'Rezervasyon', href: '#rezervasyon' }], cta: { text: 'Reservation', href: '#rezervasyon', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: "Table d'Hôte", copyright: '© 2024', contact: { phone: '0212 230 55 66', email: 'reservation@tabledot.com.tr' }, legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902122305566', message: 'Reservation request.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez politikamızı kabul ediyor musunuz?', acceptText: 'Kabul Et', rejectText: 'Reddet' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Table d — Şişli", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Şişli', title: "Table d", subtitle: "Lezzet bir sanattır. Biz onu yaşatıyoruz.", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'restoran_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122305566" }, editableFields: [] }
    ]
  }]
}
