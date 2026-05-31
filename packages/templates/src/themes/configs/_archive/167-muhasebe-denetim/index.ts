/**
 * @kepenk/templates — muhasebe-denetim ThemeConfig
 * Denetim Muhasebe — Bagimsiz ve guvenilir denetim hizmeti
 * Plan: pro | Font: Space Grotesk + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

export const MUHASEBE_DENETIM_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8FAFC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F1F5F9',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#475569',
  '--color-text-muted': '#94A3B8',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#38BDF8',
  '--color-accent-hover': '#0EA5E9',
  '--color-accent-active': '#0284C7',
  '--color-accent-light': '#0C4A6E',
  '--color-accent-subtle': '#082F49',
  '--color-border': '#E2E8F0',
  '--color-border-subtle': '#F1F5F9',
  '--font-heading': "'Space Grotesk', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-md': '6px',
  '--radius-lg': '12px'
}

export const MUHASEBE_DENETIM_BUSINESS: BusinessData = {
  name: 'Denetim Muhasebe',
  ownerName: 'YMM Ali Denetci',
  sectorId: 'muhasebe',
  slogan: 'Bagimsiz ve guvenilir denetim hizmeti',
  phone: '0212 777 88 99',
  phoneClean: '902127778899',
  whatsapp: '902127778899',
  email: 'info@denetimmuhasebe.com',
  address: 'Maslak Mah. Ahi Evran Cad. No:20, Sariyer',
  city: 'Istanbul',
  district: 'Sariyer',
  coordinates: { lat: 41.1092, lng: 29.0202 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Sal\u0131', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: '\u00c7ar\u015famba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Per\u015fembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '14:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }
  ],
  socialMedia: { instagram: 'https://instagram.com/muhasebe-denetim' },
  photos: [],
  services: [
    { id: 's1', name: 'Bagimsiz Denetim', price: '25.000 TL', duration: 'Yillik', icon: 'shield-check', popular: true, description: 'SPK/BDDK uyumlu denetim' },
    { id: 's2', name: 'Ic Denetim', price: '12.000 TL', duration: 'Yillik', icon: 'lock', description: 'Ic kontrol sistemi denetimi' },
    { id: 's3', name: 'Vergi Denetimi', price: '8.000 TL', duration: 'Yillik', icon: 'file-search', description: 'Vergi risk analizi ve denetim' }
  ],
  team: [
    { id: 't1', name: 'YMM Ali Denetci', role: 'Bas Denetci', experience: '20 yil' }
  ],
  experience: '20 yil',
  rating: 4.9,
  reviewCount: 120,
  foundedYear: 2005
}

export const MUHASEBE_DENETIM_CONFIG: ThemeConfig = {
  id: 'muhasebe-denetim',
  name: 'Denetim Muhasebe',
  sectorId: 'muhasebe',
  plan: 'pro',
  description: 'Bagimsiz ve guvenilir denetim hizmeti',
  isDark: true,
  cssVariables: MUHASEBE_DENETIM_CSS,
  fonts: {
    heading: { family: 'Space Grotesk', weights: [600,700], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400,500], subsets: ['latin-ext'] }
  },
  seoSchemaType: 'AccountingService',
  designPhilosophy: 'Denetim Muhasebe tema tasarimi.',
  inspiration: ['Modern TR muhasebe'],
  sectorSections: ['services', 'gallery'],
  performanceBudget: { maxJS: '250kb', maxLCP: '3.0s', animationLevel: 'gsap-allowed' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: { logo: { type: 'text', text: 'Denetim Muhasebe' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Hakk\u0131m\u0131zda', href: '#hakkimizda' }, { label: '\u0130leti\u015fim', href: '#iletisim' }], cta: { text: 'Hemen Ara', href: 'https://wa.me/902127778899', variant: 'solid' } },
      editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: { businessName: 'Denetim Muhasebe', description: 'Bagimsiz ve guvenilir denetim hizmeti', copyright: '\u00a9 2025 Denetim Muhasebe. T\u00fcm haklar\u0131 sakl\u0131d\u0131r.',
        columns: [{ title: 'Hizmetler', links: [{ label: 'Bagimsiz Denetim', href: '#' }, { label: 'Ic Denetim', href: '#' }, { label: 'Vergi Denetimi', href: '#' }] }, { title: 'Sayfalar', links: [{ label: 'Hakk\u0131m\u0131zda', href: '#hakkimizda' }, { label: '\u0130leti\u015fim', href: '#iletisim' }] }],
        contact: { phone: '0212 777 88 99', email: 'info@denetimmuhasebe.com', address: 'Maslak Mah. Ahi Evran Cad. No:20, Sariyer' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/muhasebe-denetim', icon: 'instagram' }],
        legal: [{ label: 'Gizlilik', href: '/gizlilik' }, { label: 'KVKK', href: '/kvkk' }], poweredBy: '\u26a1 kepenk.ai' },
      editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902127778899', message: 'Merhaba, Denetim Muhasebe hakk\u0131nda bilgi almak istiyorum.' },
      editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site \u00e7erezleri kullan\u0131r.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: [] }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: 'Denetim Muhasebe \u2014 Sariyer', titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true,
        settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: 'SARIYER', title: 'Denetim Muhasebe', subtitle: 'Bagimsiz ve guvenilir denetim hizmeti', cta1: { text: 'Hemen Ara', href: '#iletisim' } },
        editableFields: [] },
      { id: 'hakkimizda', type: 'about', variant: 'auto', order: 2, required: false,
        settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' },
        defaultContent: { badge: 'HAKKIMIZDA', title: 'Biz Kimiz?', description: 'Bagimsiz ve guvenilir denetim hizmeti' },
        editableFields: [] },
      { id: 'istatistik', type: 'stats', variant: 'auto', order: 3, required: false,
        settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' },
        defaultContent: { stats: [{ value: '20 yil', label: 'Deneyim' }, { value: '120+', label: 'Mutlu M\u00fc\u015fteri' }, { value: '4.9', label: 'Puan' }] },
        editableFields: [] },
      { id: 'hizmetler', type: 'services', variant: 'auto', order: 4, required: true,
        settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: 'H\u0130ZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: '\u00d6zel Hizmet', description: 'Detay i\u00e7in iletisime ge\u00e7in.', icon: 'star' }] },
        editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 5, required: true,
        settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: '\u0130LET\u0130\u015e\u0130M', title: 'Bize Ula\u015f\u0131n', whatsapp: '902127778899' },
        editableFields: [] }
    ]
  }]
}
