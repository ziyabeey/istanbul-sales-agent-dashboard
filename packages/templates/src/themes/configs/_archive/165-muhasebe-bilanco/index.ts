/**
 * @kepenk/templates — muhasebe-bilanco ThemeConfig
 * Bilanco Muhasebe — Sirketinizin mali tablolarinda uzman
 * Plan: pro | Font: Plus Jakarta Sans + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

export const MUHASEBE_BILANCO_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8FAFC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F1F5F9',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#475569',
  '--color-text-muted': '#94A3B8',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#4F46E5',
  '--color-accent-hover': '#4338CA',
  '--color-accent-active': '#3730A3',
  '--color-accent-light': '#EEF2FF',
  '--color-accent-subtle': '#F5F7FF',
  '--color-border': '#E2E8F0',
  '--color-border-subtle': '#F1F5F9',
  '--font-heading': "'Plus Jakarta Sans', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-md': '6px',
  '--radius-lg': '12px'
}

export const MUHASEBE_BILANCO_BUSINESS: BusinessData = {
  name: 'Bilanco Muhasebe',
  ownerName: 'YMM Hasan Bilanco',
  sectorId: 'muhasebe',
  slogan: 'Sirketinizin mali tablolarinda uzman',
  phone: '0212 444 55 66',
  phoneClean: '902124445566',
  whatsapp: '902124445566',
  email: 'info@bilancomuhasebe.com',
  address: 'Levent Mah. Kanyon AVM Yani No:5, Besiktas',
  city: 'Istanbul',
  district: 'Besiktas',
  coordinates: { lat: 41.0793, lng: 29.0113 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Sal\u0131', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: '\u00c7ar\u015famba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Per\u015fembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '14:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }
  ],
  socialMedia: { instagram: 'https://instagram.com/muhasebe-bilanco' },
  photos: [],
  services: [
    { id: 's1', name: 'Bilanco Hazirlama', price: '8.000 TL', duration: 'Yillik', icon: 'bar-chart', popular: true, description: 'Yillik bilanco ve gelir tablosu' },
    { id: 's2', name: 'Denetim Raporu', price: '15.000 TL', duration: 'Yillik', icon: 'search', description: 'Bagimsiz denetim raporu' },
    { id: 's3', name: 'Mali Analiz', price: '5.000 TL', duration: 'Ceyreklik', icon: 'trending-up', description: 'Finansal oran analizi' }
  ],
  team: [
    { id: 't1', name: 'YMM Hasan Bilanco', role: 'Yeminli Mali Musavir', experience: '25 yil' }
  ],
  experience: '25 yil',
  rating: 4.8,
  reviewCount: 180,
  foundedYear: 2000
}

export const MUHASEBE_BILANCO_CONFIG: ThemeConfig = {
  id: 'muhasebe-bilanco',
  name: 'Bilanco Muhasebe',
  sectorId: 'muhasebe',
  plan: 'pro',
  description: 'Sirketinizin mali tablolarinda uzman',
  isDark: false,
  cssVariables: MUHASEBE_BILANCO_CSS,
  fonts: {
    heading: { family: 'Plus Jakarta Sans', weights: [600,700], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400,500], subsets: ['latin-ext'] }
  },
  seoSchemaType: 'AccountingService',
  designPhilosophy: 'Bilanco Muhasebe tema tasarimi.',
  inspiration: ['Modern TR muhasebe'],
  sectorSections: ['services', 'gallery'],
  performanceBudget: { maxJS: '250kb', maxLCP: '3.0s', animationLevel: 'gsap-allowed' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: { logo: { type: 'text', text: 'Bilanco Muhasebe' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Hakk\u0131m\u0131zda', href: '#hakkimizda' }, { label: '\u0130leti\u015fim', href: '#iletisim' }], cta: { text: 'Hemen Ara', href: 'https://wa.me/902124445566', variant: 'solid' } },
      editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: { businessName: 'Bilanco Muhasebe', description: 'Sirketinizin mali tablolarinda uzman', copyright: '\u00a9 2025 Bilanco Muhasebe. T\u00fcm haklar\u0131 sakl\u0131d\u0131r.',
        columns: [{ title: 'Hizmetler', links: [{ label: 'Bilanco Hazirlama', href: '#' }, { label: 'Denetim Raporu', href: '#' }, { label: 'Mali Analiz', href: '#' }] }, { title: 'Sayfalar', links: [{ label: 'Hakk\u0131m\u0131zda', href: '#hakkimizda' }, { label: '\u0130leti\u015fim', href: '#iletisim' }] }],
        contact: { phone: '0212 444 55 66', email: 'info@bilancomuhasebe.com', address: 'Levent Mah. Kanyon AVM Yani No:5, Besiktas' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/muhasebe-bilanco', icon: 'instagram' }],
        legal: [{ label: 'Gizlilik', href: '/gizlilik' }, { label: 'KVKK', href: '/kvkk' }], poweredBy: '\u26a1 kepenk.ai' },
      editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902124445566', message: 'Merhaba, Bilanco Muhasebe hakk\u0131nda bilgi almak istiyorum.' },
      editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site \u00e7erezleri kullan\u0131r.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: [] }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: 'Bilanco Muhasebe \u2014 Besiktas', titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true,
        settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: 'BESIKTAS', title: 'Bilanco Muhasebe', subtitle: 'Sirketinizin mali tablolarinda uzman', cta1: { text: 'Hemen Ara', href: '#iletisim' } },
        editableFields: [] },
      { id: 'hakkimizda', type: 'about', variant: 'auto', order: 2, required: false,
        settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' },
        defaultContent: { badge: 'HAKKIMIZDA', title: 'Biz Kimiz?', description: 'Sirketinizin mali tablolarinda uzman' },
        editableFields: [] },
      { id: 'istatistik', type: 'stats', variant: 'auto', order: 3, required: false,
        settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' },
        defaultContent: { stats: [{ value: '25 yil', label: 'Deneyim' }, { value: '180+', label: 'Mutlu M\u00fc\u015fteri' }, { value: '4.8', label: 'Puan' }] },
        editableFields: [] },
      { id: 'hizmetler', type: 'services', variant: 'auto', order: 4, required: true,
        settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: 'H\u0130ZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: '\u00d6zel Hizmet', description: 'Detay i\u00e7in iletisime ge\u00e7in.', icon: 'star' }] },
        editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 5, required: true,
        settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: '\u0130LET\u0130\u015e\u0130M', title: 'Bize Ula\u015f\u0131n', whatsapp: '902124445566' },
        editableFields: [] }
    ]
  }]
}
