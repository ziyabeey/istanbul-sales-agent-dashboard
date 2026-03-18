/**
 * vet-petshop ThemeConfig (starter) — Turuncu + krem, pet shop & aksesuar. Poppins.
 * Business: Patili Dünya Pet Shop, Üsküdar
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const VET_PETSHOP_CSS: Record<string, string> = {
  '--color-bg': '#FFFAF0', '--color-surface': '#FFF3E0', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FFE0B2', '--color-text': '#1A0900', '--color-text-secondary': '#5D3A15',
  '--color-text-muted': '#9E8B7A', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#F97316',
  '--color-accent-hover': '#EA580C', '--color-accent-light': '#FFF7ED', '--color-border': '#FDBA74',
  '--font-heading': "'Poppins', sans-serif", '--font-body': "'Poppins', sans-serif",
  '--radius-card': '16px', '--radius-btn': '9999px'}
export const VET_PETSHOP_BUSINESS: BusinessData = {
  name: 'Patili Dünya Pet Shop', ownerName: 'Aylin Yılmaz', sector: 'veteriner',
  slogan: 'Dostlarınızın mutluluğu burada', phone: '0216 341 22 55', phoneClean: '902163412255',
  whatsapp: '902163412255', email: 'siparis@patilidunya.com.tr',
  address: 'Bağlarbaşı Cad. No.45, Üsküdar, İstanbul', city: 'İstanbul', district: 'Üsküdar',
  coordinates: { lat: 41.0234, lng: 29.0155 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '19:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '11:00', close: '17:00' }],
  socialMedia: { instagram: 'https://instagram.com/patilidunya', tiktok: 'https://tiktok.com/@patilidunya' },
  photos: [], services: [
    { id: 's1', name: 'Mama & Beslenme', icon: '🦴' }, { id: 's2', name: 'Aksesuar', icon: '🎀' },
    { id: 's3', name: 'Pet Bakım', icon: '🛁' }, { id: 's4', name: 'Oyuncak', icon: '🧸' }],
  team: [{ id: 't1', name: 'Aylin Yılmaz', role: 'Kurucu', experience: '8 yıl' }],
  experience: '8 yıl', rating: 4.9, reviewCount: 892, foundedYear: 2016}
export const VET_PETSHOP_CONFIG: ThemeConfig = {
  id: 'vet-petshop', name: 'Pet Shop', sectorId: 'veteriner', plan: 'starter',
  description: 'Turuncu + krem, pet shop & aksesuar. Üsküdar.', designPhilosophy: 'Warm orange — sıcak, sevimli, enerjik.',
  isDark: false, cssVariables: VET_PETSHOP_CSS,
  fonts: { heading: { family: 'Cormorant Garamond', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'Poppins', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Store', sectorSections: ['pet_services_grid', 'pet_gallery', 'vet_stats_row', 'pet_appointment'],
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Patili Dünya 🐾' }, menuItems: [{ label: 'Ürünler', href: '#urunler' }, { label: 'Galeri', href: '#galeri' }, { label: 'Sipariş', href: '#siparis' }], cta: { text: 'Sipariş', href: '#siparis', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Patili Dünya', copyright: '© 2024 Patili Dünya', contact: { phone: '0216 341 22 55', address: 'Üsküdar, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/patilidunya', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902163412255', message: 'Merhaba, ürün hakkında bilgi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Patili Dünya Pet Shop — Üsküdar", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Üsküdar', title: "Patili Dünya Pet Shop", subtitle: "Dostlarınızın mutluluğu burada", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'veteriner_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902163412255" }, editableFields: [] }
    ]
  }]
}
