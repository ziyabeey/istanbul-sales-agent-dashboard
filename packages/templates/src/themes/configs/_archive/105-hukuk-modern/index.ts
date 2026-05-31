import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

export const HUKUK_MODERN_CSS: Record<string, string> = {
  '--color-bg': '#FCFCFD',
  '--color-surface': '#F1F3F5',
  '--color-surface-elevated': '#FFFFFF',
  '--color-text': '#212529',
  '--color-text-secondary': '#495057',
  '--color-text-muted': '#868E96',
  '--color-accent': '#D9F044',
  '--color-accent-hover': '#C0D83A',
    '--color-accent-active': '#46127d',
  '--color-accent-light': '#1E293B',
  '--color-text-on-accent': '#000000',
  '--color-border': '#DEE2E6',
  '--font-heading': "'Plus Jakarta Sans', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-md': '8px',
  '--radius-lg': '16px'
}

export const HUKUK_MODERN_BUSINESS: BusinessData = {
  name: 'NextGen Legal',
  ownerName: 'Av. Serra Yılmaz',
  sectorId: 'hukuk',
  slogan: 'Yenilikçi İş Modelleri İçin Modern Hukuk',
  phone: '0530 000 00 00',
  email: 'hello@nextgenlegal.tech',
  address: 'Levent, Şişli',
  city: 'İstanbul',
  district: 'Şişli',
  coordinates: { lat: 41.07, lng: 29.01 },
  workingHours: [ { day: 'monday', dayTr: 'Pzt-Cum', open: '10:00', close: '17:00' } ],
  services: [
    { id: '1', name: 'Siber Hukuk', description: 'Yazılım, e-ticaret, KVKK.', icon: 'monitor' },
    { id: '2', name: 'Fikri Mülkiyet', description: 'Marka tescil, telif.', icon: 'lightbulb' },
    { id: '3', name: 'Startup & Yatırım', description: 'Yatırım turları ve hisse senetleri.', icon: 'zap' }
  ],
  foundedYear: 2021
}

export const HUKUK_MODERN_CONFIG: ThemeConfig = {
  id: 'hukuk-modern',
  name: 'Modern Hukuk',
  sectorId: 'hukuk',
  plan: 'pro',
  description: 'Startup ve teknoloji odaklı hukuk büroları.',
  isDark: true,
  cssVariables: HUKUK_MODERN_CSS,
  fonts: { heading: { family: 'Plus Jakarta Sans', weights: [700, 800] }, body: { family: 'Inter', weights: [400, 500] } },
  seoSchemaType: 'LegalService',
  sectorSections: [],
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'none' }, defaultContent: { logo: { type: 'text', text: 'NextGen Legal' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'NextGen Legal', description: 'Coders need lawyers too.' }, editableFields: [] }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: 'NextGen Legal', titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 1, animation: 'fadeUp' }, defaultContent: { badge: 'TECH LAW', title: 'Modern Hukuk', subtitle: 'Startup, Kripto, Bilişim Mülkiyeti.', cta1: { text: 'Keşfet', href: '#uzmanlik' } }, editableFields: [] },
      { id: 'uzmanlik', type: 'services', variant: 'auto', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 2, animation: 'fadeUp' }, defaultContent: { badge: 'UYGULAMA', title: 'Odak Alanlarımız' }, editableFields: [] },
      { id: 'faq', type: 'faq', variant: 'auto', order: 3, required: false, settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'md', visible: true, order: 3, animation: 'fadeUp' }, defaultContent: { badge: 'S.S.S.', title: 'Sık Sorulan Sorular', items: [{q:'Startup kurulumu?', a:'2-4 hafta arası sürebilmektedir.'}] }, editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'full', visible: true, order: 4, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Görüşelim' }, editableFields: [] }
    ]
  }]
}