import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

export const HUKUK_ELITE_CSS: Record<string, string> = {
  '--color-bg': '#FAFAF9',
  '--color-surface': '#F5F5F4',
  '--color-surface-elevated': '#FFFFFF',
  '--color-text': '#1C1917',
  '--color-text-secondary': '#57534E',
  '--color-text-muted': '#A8A29E',
  '--color-accent': '#C5A059',
  '--color-accent-hover': '#DFB86C',
    '--color-accent-active': '#2a3f7e',
  '--color-text-on-accent': '#000000',
  '--color-accent-light': '#1F1A10',
  '--color-border': '#D6D3D1',
  '--font-heading': "'Syne', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-md': '2px',
  '--radius-lg': '4px'
}

export const HUKUK_ELITE_BUSINESS: BusinessData = {
  name: 'Elit Hukuk',
  ownerName: 'Av. Cihan Elit',
  sectorId: 'hukuk',
  slogan: 'Hukukun haritasını yeniden çiziyoruz.',
  phone: '0212 999 11 00',
  email: 'mgmt@elithukuk.com',
  address: 'Bebek, Beşiktaş',
  city: 'İstanbul',
  district: 'Beşiktaş',
  coordinates: { lat: 41.07, lng: 29.04 },
  workingHours: [ { day: 'monday', dayTr: 'Pzt', open: '10:00', close: '17:00' } ],
  services: [
    { id: '1', name: 'Ağır Ceza Hukuku', description: 'Beyaz yaka suçları.', icon: 'shield' },
    { id: '2', name: 'Aile Hukuku', description: 'Yüksek profilli boşanmalar.', icon: 'users' }
  ],
  foundedYear: 2005
}

export const HUKUK_ELITE_CONFIG: ThemeConfig = {
  id: 'hukuk-elite',
  name: 'Elit Hukuk',
  sectorId: 'hukuk',
  plan: 'elite',
  description: 'Premium deneyim.',
  isDark: true,
  cssVariables: HUKUK_ELITE_CSS,
  fonts: { heading: { family: 'Syne', weights: [700, 800] }, body: { family: 'Inter', weights: [400] } },
  seoSchemaType: 'LegalService',
  sectorSections: [],
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'none' }, defaultContent: { logo: { type: 'text', text: 'ELIT HUKUK' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Elit Hukuk' }, editableFields: [] }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: 'Elit Hukuk', titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 1, animation: 'fadeUp' }, defaultContent: { badge: 'HIGH-END LEGAL', title: 'Hukukun Haritası', cta1: { text: 'Keşfet', href: '#uzmanlik' } }, editableFields: [] },
      { id: 'hakkimizda', type: 'philosophy', variant: 'editorial', order: 2, required: false, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 2, animation: 'fadeUp' }, defaultContent: { badge: 'POWER', title: 'Tavizsiz Savunma' }, editableFields: [] },
      { id: 'uzmanlik', type: 'services', variant: 'auto', order: 3, required: true, settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 3, animation: 'fadeUp' }, defaultContent: { badge: 'PRACTICE AREAS', title: 'Hukuki Hakimiyet' }, editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'full', visible: true, order: 4, animation: 'fadeUp' }, defaultContent: { badge: 'CONTACT', title: 'Randevu Talebi' }, editableFields: [] }
    ]
  }]
}