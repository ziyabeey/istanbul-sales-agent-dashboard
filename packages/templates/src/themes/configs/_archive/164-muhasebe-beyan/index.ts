/**
 * @kepenk/templates — muhasebe-beyan ThemeConfig
 * Beyan Muhasebe — Beyannameleriniz zamaninda ve dogru
 * Plan: starter | Font: Roboto + Roboto
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

export const MUHASEBE_BEYAN_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8FAFC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F1F5F9',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#475569',
  '--color-text-muted': '#94A3B8',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#0369A1',
  '--color-accent-hover': '#075985',
  '--color-accent-active': '#0C4A6E',
  '--color-accent-light': '#F0F9FF',
  '--color-accent-subtle': '#F8FDFF',
  '--color-border': '#E2E8F0',
  '--color-border-subtle': '#F1F5F9',
  '--font-heading': "'Roboto', sans-serif",
  '--font-body': "'Roboto', sans-serif",
  '--radius-md': '6px',
  '--radius-lg': '12px'
}

export const MUHASEBE_BEYAN_BUSINESS: BusinessData = {
  name: 'Beyan Muhasebe',
  ownerName: 'SMMM Ayse Beyan',
  sectorId: 'muhasebe',
  slogan: 'Beyannameleriniz zamaninda ve dogru',
  phone: '0216 222 33 44',
  phoneClean: '902162223344',
  whatsapp: '902162223344',
  email: 'info@beyanmuhasebe.com',
  address: 'Altunizade Mah. Kisikli Cad. No:30, Uskudar',
  city: 'Istanbul',
  district: 'Uskudar',
  coordinates: { lat: 41.0244, lng: 29.0379 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Sal\u0131', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: '\u00c7ar\u015famba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Per\u015fembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '14:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }
  ],
  socialMedia: { instagram: 'https://instagram.com/muhasebe-beyan' },
  photos: [],
  services: [
    { id: 's1', name: 'E-Beyanname', price: '2.500 TL/ay', duration: 'Aylik', icon: 'send', popular: true, description: 'Tum beyanname hizmetleri' },
    { id: 's2', name: 'SGK Bildirge', price: '800 TL', duration: 'Aylik', icon: 'shield', description: 'SGK aylik prim bildirgeleri' },
    { id: 's3', name: 'BA-BS Formlari', price: '400 TL', duration: 'Aylik', icon: 'file-check', description: 'Alis-satis ba-bs bildirimi' }
  ],
  team: [
    { id: 't1', name: 'SMMM Ayse Beyan', role: 'Mali Musavir', experience: '12 yil' }
  ],
  experience: '12 yil',
  rating: 4.6,
  reviewCount: 280,
  foundedYear: 2013
}

export const MUHASEBE_BEYAN_CONFIG: ThemeConfig = {
  id: 'muhasebe-beyan',
  name: 'Beyan Muhasebe',
  sectorId: 'muhasebe',
  plan: 'starter',
  description: 'Beyannameleriniz zamaninda ve dogru',
  isDark: false,
  cssVariables: MUHASEBE_BEYAN_CSS,
  fonts: {
    heading: { family: 'Roboto', weights: [500,700], subsets: ['latin-ext'] },
    body: { family: 'Roboto', weights: [400,500], subsets: ['latin-ext'] }
  },
  seoSchemaType: 'AccountingService',
  designPhilosophy: 'Beyan Muhasebe tema tasarimi.',
  inspiration: ['Modern TR muhasebe'],
  sectorSections: ['services', 'gallery'],
  performanceBudget: { maxJS: '250kb', maxLCP: '3.0s', animationLevel: 'gsap-allowed' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: { logo: { type: 'text', text: 'Beyan Muhasebe' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Hakk\u0131m\u0131zda', href: '#hakkimizda' }, { label: '\u0130leti\u015fim', href: '#iletisim' }], cta: { text: 'Hemen Ara', href: 'https://wa.me/902162223344', variant: 'solid' } },
      editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: { businessName: 'Beyan Muhasebe', description: 'Beyannameleriniz zamaninda ve dogru', copyright: '\u00a9 2025 Beyan Muhasebe. T\u00fcm haklar\u0131 sakl\u0131d\u0131r.',
        columns: [{ title: 'Hizmetler', links: [{ label: 'E-Beyanname', href: '#' }, { label: 'SGK Bildirge', href: '#' }, { label: 'BA-BS Formlari', href: '#' }] }, { title: 'Sayfalar', links: [{ label: 'Hakk\u0131m\u0131zda', href: '#hakkimizda' }, { label: '\u0130leti\u015fim', href: '#iletisim' }] }],
        contact: { phone: '0216 222 33 44', email: 'info@beyanmuhasebe.com', address: 'Altunizade Mah. Kisikli Cad. No:30, Uskudar' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/muhasebe-beyan', icon: 'instagram' }],
        legal: [{ label: 'Gizlilik', href: '/gizlilik' }, { label: 'KVKK', href: '/kvkk' }], poweredBy: '\u26a1 kepenk.ai' },
      editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902162223344', message: 'Merhaba, Beyan Muhasebe hakk\u0131nda bilgi almak istiyorum.' },
      editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site \u00e7erezleri kullan\u0131r.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: [] }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: 'Beyan Muhasebe \u2014 Uskudar', titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true,
        settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: 'USKUDAR', title: 'Beyan Muhasebe', subtitle: 'Beyannameleriniz zamaninda ve dogru', cta1: { text: 'Hemen Ara', href: '#iletisim' } },
        editableFields: [] },
      { id: 'hakkimizda', type: 'about', variant: 'auto', order: 2, required: false,
        settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' },
        defaultContent: { badge: 'HAKKIMIZDA', title: 'Biz Kimiz?', description: 'Beyannameleriniz zamaninda ve dogru' },
        editableFields: [] },
      { id: 'istatistik', type: 'stats', variant: 'auto', order: 3, required: false,
        settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' },
        defaultContent: { stats: [{ value: '12 yil', label: 'Deneyim' }, { value: '280+', label: 'Mutlu M\u00fc\u015fteri' }, { value: '4.6', label: 'Puan' }] },
        editableFields: [] },
      { id: 'hizmetler', type: 'services', variant: 'auto', order: 4, required: true,
        settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: 'H\u0130ZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: '\u00d6zel Hizmet', description: 'Detay i\u00e7in iletisime ge\u00e7in.', icon: 'star' }] },
        editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 5, required: true,
        settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: '\u0130LET\u0130\u015e\u0130M', title: 'Bize Ula\u015f\u0131n', whatsapp: '902162223344' },
        editableFields: [] }
    ]
  }]
}
