/**
 * @kepenk/templates — muhasebe-defter ThemeConfig
 * Defter Muhasebe — Defterleriniz guvenli ellerde
 * Plan: starter | Font: Inter + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

export const MUHASEBE_DEFTER_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8FAFC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F1F5F9',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#475569',
  '--color-text-muted': '#94A3B8',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#742bab',
  '--color-accent-hover': '#1D4ED8',
  '--color-accent-active': '#1E40AF',
  '--color-accent-light': '#EFF6FF',
  '--color-accent-subtle': '#F8FAFF',
  '--color-border': '#E2E8F0',
  '--color-border-subtle': '#F1F5F9',
  '--font-heading': "'Inter', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-md': '6px',
  '--radius-lg': '12px'
}

export const MUHASEBE_DEFTER_BUSINESS: BusinessData = {
  name: 'Defter Muhasebe',
  ownerName: 'SMMM Mehmet Defter',
  sectorId: 'muhasebe',
  slogan: 'Defterleriniz guvenli ellerde',
  phone: '0212 111 22 33',
  phoneClean: '902121112233',
  whatsapp: '902121112233',
  email: 'info@deftermuhasebe.com',
  address: 'Mecidiyekoy Mah. Buyukdere Cad. No:80, Sisli',
  city: 'Istanbul',
  district: 'Sisli',
  coordinates: { lat: 41.0639, lng: 28.9929 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Sal\u0131', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: '\u00c7ar\u015famba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Per\u015fembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '14:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }
  ],
  socialMedia: { instagram: 'https://instagram.com/muhasebe-defter' },
  photos: [],
  services: [
    { id: 's1', name: 'Defter Tutma', price: '3.000 TL/ay', duration: 'Aylik', icon: 'book-open', popular: true, description: 'Yasal defter tutma ve beyanname' },
    { id: 's2', name: 'KDV Beyannamesi', price: '500 TL', duration: 'Aylik', icon: 'file-text', description: 'Aylik KDV beyan hizmeti' },
    { id: 's3', name: 'Gelir Vergisi', price: '1.500 TL', duration: 'Yillik', icon: 'calculator', description: 'Yillik gelir vergisi beyannamesi' }
  ],
  team: [
    { id: 't1', name: 'SMMM Mehmet Defter', role: 'Mali Musavir', experience: '15 yil' }
  ],
  experience: '15 yil',
  rating: 4.7,
  reviewCount: 340,
  foundedYear: 2010
}

export const MUHASEBE_DEFTER_CONFIG: ThemeConfig = {
  id: 'muhasebe-defter',
  name: 'Defter Muhasebe',
  sectorId: 'muhasebe',
  plan: 'starter',
  description: 'Defterleriniz guvenli ellerde',
  isDark: false,
  cssVariables: MUHASEBE_DEFTER_CSS,
  fonts: {
    heading: { family: 'Inter', weights: [600,700], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400,500], subsets: ['latin-ext'] }
  },
  seoSchemaType: 'AccountingService',
  designPhilosophy: 'Defter Muhasebe tema tasarimi.',
  inspiration: ['Modern TR muhasebe'],
  sectorSections: ['services', 'gallery'],
  performanceBudget: { maxJS: '250kb', maxLCP: '3.0s', animationLevel: 'gsap-allowed' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: { logo: { type: 'text', text: 'Defter Muhasebe' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Hakk\u0131m\u0131zda', href: '#hakkimizda' }, { label: '\u0130leti\u015fim', href: '#iletisim' }], cta: { text: 'Hemen Ara', href: 'https://wa.me/902121112233', variant: 'solid' } },
      editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: { businessName: 'Defter Muhasebe', description: 'Defterleriniz guvenli ellerde', copyright: '\u00a9 2025 Defter Muhasebe. T\u00fcm haklar\u0131 sakl\u0131d\u0131r.',
        columns: [{ title: 'Hizmetler', links: [{ label: 'Defter Tutma', href: '#' }, { label: 'KDV Beyannamesi', href: '#' }, { label: 'Gelir Vergisi', href: '#' }] }, { title: 'Sayfalar', links: [{ label: 'Hakk\u0131m\u0131zda', href: '#hakkimizda' }, { label: '\u0130leti\u015fim', href: '#iletisim' }] }],
        contact: { phone: '0212 111 22 33', email: 'info@deftermuhasebe.com', address: 'Mecidiyekoy Mah. Buyukdere Cad. No:80, Sisli' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/muhasebe-defter', icon: 'instagram' }],
        legal: [{ label: 'Gizlilik', href: '/gizlilik' }, { label: 'KVKK', href: '/kvkk' }], poweredBy: '\u26a1 kepenk.ai' },
      editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902121112233', message: 'Merhaba, Defter Muhasebe hakk\u0131nda bilgi almak istiyorum.' },
      editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site \u00e7erezleri kullan\u0131r.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: [] }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: 'Defter Muhasebe \u2014 Sisli', titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true,
        settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: 'SISLI', title: 'Defter Muhasebe', subtitle: 'Defterleriniz guvenli ellerde', cta1: { text: 'Hemen Ara', href: '#iletisim' } },
        editableFields: [] },
      { id: 'hakkimizda', type: 'about', variant: 'auto', order: 2, required: false,
        settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' },
        defaultContent: { badge: 'HAKKIMIZDA', title: 'Biz Kimiz?', description: 'Defterleriniz guvenli ellerde' },
        editableFields: [] },
      { id: 'istatistik', type: 'stats', variant: 'auto', order: 3, required: false,
        settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' },
        defaultContent: { stats: [{ value: '15 yil', label: 'Deneyim' }, { value: '340+', label: 'Mutlu M\u00fc\u015fteri' }, { value: '4.7', label: 'Puan' }] },
        editableFields: [] },
      { id: 'hizmetler', type: 'services', variant: 'auto', order: 4, required: true,
        settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: 'H\u0130ZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: '\u00d6zel Hizmet', description: 'Detay i\u00e7in iletisime ge\u00e7in.', icon: 'star' }] },
        editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 5, required: true,
        settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: '\u0130LET\u0130\u015e\u0130M', title: 'Bize Ula\u015f\u0131n', whatsapp: '902121112233' },
        editableFields: [] }
    ]
  }]
}
