import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const ECZANE_NOBETCI_CSS: Record<string, string> = {
  '--color-bg': '#FFFBEB', '--color-surface': '#FEF3C7', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FDE68A', '--color-text': '#1C1804', '--color-text-secondary': '#5C4F19',
  '--color-text-muted': '#9E9055', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#DC2626',
  '--color-accent-hover': '#B91C1C', '--color-accent-light': '#FEF2F2', '--color-border': '#FCA5A5',
  '--font-heading': "'Nunito', sans-serif", '--font-body': "'Nunito', sans-serif",
  '--radius-card': '14px', '--radius-btn': '9999px'}
export const ECZANE_NOBETCI_BUSINESS: BusinessData = {
  name: '7/24 Eczanesi', ownerName: 'Ecz. Murat Gece', sector: 'eczane',
  slogan: '7 gün 24 saat hizmet', phone: '0212 999 88 77', phoneClean: '902129998877',
  whatsapp: '902129998877', email: 'info@724eczane.com.tr',
  address: 'Taksim Mah. İstiklal Cad. No.200, Beyoğlu, İstanbul', city: 'İstanbul', district: 'Taksim',
  coordinates: { lat: 41.0370, lng: 28.9850 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '00:00', close: '23:59' },
    { day: 'tuesday', dayTr: 'Salı', open: '00:00', close: '23:59' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '00:00', close: '23:59' },
    { day: 'thursday', dayTr: 'Perşembe', open: '00:00', close: '23:59' },
    { day: 'friday', dayTr: 'Cuma', open: '00:00', close: '23:59' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '00:00', close: '23:59' },
    { day: 'sunday', dayTr: 'Pazar', open: '00:00', close: '23:59' }],
  socialMedia: { instagram: 'https://instagram.com/724eczane' },
  photos: [], services: [
    { id: 's1', name: '7/24 Reçete', icon: '📋' }, { id: 's2', name: 'Acil', icon: '🚨' },
    { id: 's3', name: 'Eve Teslimat', icon: '🚗' }, { id: 's4', name: 'Enjeksiyon', icon: '💉' }],
  team: [{ id: 't1', name: 'Ecz. Murat Gece', role: 'Eczacı', experience: '12 yıl' }],
  experience: '12 yıl', rating: 4.7, reviewCount: 780, foundedYear: 2012}
export const ECZANE_NOBETCI_CONFIG: ThemeConfig = {
  id: 'eczane-nobetci', name: 'Nöbetçi', sectorId: 'eczane', plan: 'pro',
  description: 'Kırmızı/sarı, 7/24 nöbetçi eczane. Taksim.', designPhilosophy: 'Emergency — acil, 7/24, güvenilir.',
  isDark: false, cssVariables: ECZANE_NOBETCI_CSS,
  fonts: { heading: { family: 'Lora', weights: [700, 800], subsets: ['latin-ext'] }, body: { family: 'Nunito', weights: [400, 500, 600], subsets: ['latin-ext'] } },
  seoSchemaType: 'Pharmacy', sectorSections: ['pharmacy_services_grid', 'pharmacy_duty', 'pharmacy_stats_row', 'pharmacy_contact'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: '7/24 Eczanesi 🚨' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Nöbet', href: '#nobet' }, { label: 'Acil', href: '#acil' }], cta: { text: '📞 Acil Ara', href: 'tel:02129998877', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: '7/24 Eczanesi', copyright: '© 2024 7/24 Eczanesi', contact: { phone: '0212 999 88 77', address: 'Taksim, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/724eczane', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902129998877', message: 'Merhaba, acil ilaç ihtiyacım var.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Çerez kullanıyoruz.', acceptText: 'Kabul', rejectText: 'Red', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "7/24 Eczanesi — Taksim", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Taksim', title: "7/24 Eczanesi", subtitle: "7 gün 24 saat hizmet", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'eczane_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902129998877" }, editableFields: [] }
    ]
  }]
}
