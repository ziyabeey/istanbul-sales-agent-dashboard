/**
 * restoran-zincir (enterprise) — Fast food chain. Syne, red, multi-location.
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const RESTORAN_ZINCIR_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF', '--color-surface': '#F9FAFB', '--color-surface-elevated': '#FFFFFF',
  '--color-text': '#1A1A1A', '--color-text-secondary': '#6B7280', '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#DC2626', '--color-accent-hover': '#B91C1C', '--color-accent-light': '#FEF2F2',
  '--color-border': '#E5E7EB', '--font-heading': "'Syne', sans-serif", '--font-body': "'Inter', sans-serif",
  '--container-default': '1280px'}

export const RESTORAN_ZINCIR_BUSINESS: BusinessData = {
  name: 'BurgerLab Türkiye', ownerName: 'Can Özkan', sector: 'restoran',
  slogan: 'Laboratuvardan sofraya, bilimsel lezzet',
  phone: '0850 123 45 67', phoneClean: '908501234567', whatsapp: '905001234567',
  email: 'info@burgerlab.com.tr', address: 'Kadıköy HQ — Bağdat Cad. No:100',
  city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9817, lng: 29.0344 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '11:00', close: '23:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '11:00', close: '23:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '11:00', close: '23:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '11:00', close: '23:00' },
    { day: 'friday', dayTr: 'Cuma', open: '11:00', close: '00:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '11:00', close: '00:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '11:00', close: '23:00' }],
  socialMedia: { instagram: 'https://instagram.com/burgerlab' }, photos: [],
  services: [
    { id: 's1', name: 'Classic Lab Burger', price: '₺180', icon: '🍔' },
    { id: 's2', name: 'Smoke Lab', price: '₺220', icon: '🔬', popular: true },
    { id: 's3', name: 'Lab Combo', price: '₺280', icon: '🧪' }],
  team: [{ id: 't1', name: 'Can Özkan', role: 'CEO', experience: '10 yıl' }],
  rating: 4.5, reviewCount: 3200, foundedYear: 2015}

export const RESTORAN_ZINCIR_CONFIG: ThemeConfig = {
  id: 'restoran-zincir', name: 'Zincir', sectorId: 'restoran', plan: 'enterprise',
  description: 'Burger/fast food zinciri. Kırmızı, kampanya, çoklu şube.',
  designPhilosophy: 'Syne heading — enerjik. Kırmızı accent iştah açıcı.',
  isDark: false, cssVariables: RESTORAN_ZINCIR_CSS,
  fonts: { heading: { family: 'Syne', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Restaurant', sectorSections: ['menu_display', 'delivery_zone', 'multi_location'],
  performanceBudget: { maxJS: '350kb', maxLCP: '3.5s', animationLevel: 'gsap-allowed' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'BurgerLab' }, menuItems: [{ label: 'Menü', href: '#menu' }, { label: 'Şubeler', href: '#subeler' }, { label: 'Kariyer', href: '#kariyer' }], cta: { text: 'Sipariş Ver', href: 'tel:908501234567', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'BurgerLab Türkiye', copyright: '© 2024', columns: [{ title: 'Menü', links: [{ label: 'Burgerlar', href: '#' }, { label: 'Kombolar', href: '#' }] }, { title: 'Kurumsal', links: [{ label: 'Kariyer', href: '#kariyer' }, { label: 'Bayilik', href: '#bayilik' }] }], contact: { phone: '0850 123 45 67' }, legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '905001234567', message: 'BurgerLab sipariş' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Tamam', rejectText: 'Hayır' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "BurgerLab Türkiye — Kadıköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Kadıköy', title: "BurgerLab Türkiye", subtitle: "Laboratuvardan sofraya, bilimsel lezzet", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'restoran_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905001234567" }, editableFields: [] }
    ]
  }]
}
