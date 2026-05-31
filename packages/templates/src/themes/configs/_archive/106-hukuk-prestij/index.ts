import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

export const HUKUK_PRESTIJ_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8FAFC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#475569',
  '--color-text-muted': '#94A3B8',
  '--color-accent': '#9A7B4F',
  '--color-accent-hover': '#7A603D',
    '--color-accent-active': '#6d127d',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent-light': '#F4F1ED',
  '--color-border': '#E2E8F0',
  '--font-heading': "'Playfair Display', serif",
  '--font-body': "'Lora', serif",
  '--radius-md': '6px',
  '--radius-lg': '12px'
}

export const HUKUK_PRESTIJ_BUSINESS: BusinessData = {
  name: 'Kozan & Ortakları',
  ownerName: 'Prof. Dr. İlkim Kozan',
  sectorId: 'hukuk',
  slogan: 'Güçlü Adımlar',
  phone: '0212 999 88 77',
  email: 'partner@kozanukuk.com',
  address: 'Zorlu Center, Beşiktaş',
  city: 'İstanbul',
  district: 'Beşiktaş',
  coordinates: { lat: 41.066, lng: 29.0175 },
  workingHours: [ { day: 'monday', dayTr: 'Pzt', open: '09:00', close: '18:00' } ],
  services: [
    { id: '1', name: 'Birleşme ve Devralmalar', description: 'Due diligence süreçleri.', icon: 'briefcase' },
    { id: '2', name: 'Uluslararası Tahkim', description: 'ICSID ve ISTAC temsil.', icon: 'globe' },
    { id: '3', name: 'Rekabet Hukuku', description: 'Soruşturmalar ve programlar.', icon: 'shield' }
  ],
  foundedYear: 1985
}

export const HUKUK_PRESTIJ_CONFIG: ThemeConfig = {
  id: 'hukuk-prestij',
  name: 'Prestij Hukuk',
  sectorId: 'hukuk',
  plan: 'pro',
  description: 'Köklü, prestijli hukuk ofisleri.',
  isDark: false,
  cssVariables: HUKUK_PRESTIJ_CSS,
  fonts: { heading: { family: 'Playfair Display', weights: [600, 700] }, body: { family: 'Lora', weights: [400, 500] } },
  seoSchemaType: 'LegalService',
  sectorSections: [],
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'none' }, defaultContent: { logo: { type: 'text', text: 'KOZAN & ORTAKLARI' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Kozan & Ortakları' }, editableFields: [] }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: 'Kozan & Ortakları', titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 1, animation: 'fadeUp' }, defaultContent: { badge: 'EST. 1985', title: 'Sessiz ve Güçlü', cta1: { text: 'Hakkımızda', href: '#hakkimizda', variant: 'outline' } }, editableFields: [] },
      { id: 'hakkimizda', type: 'philosophy', variant: 'editorial', order: 2, required: false, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 2, animation: 'fadeUp' }, defaultContent: { badge: 'FELSEFEMİZ', title: 'Güven Mirası' }, editableFields: [] },
      { id: 'uzmanlik', type: 'services', variant: 'auto', order: 3, required: true, settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 3, animation: 'fadeUp' }, defaultContent: { badge: 'UZMANLIK', title: 'Çalışma Alanları' }, editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 5, required: true, settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'md', visible: true, order: 5, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Ziyaret Edin' }, editableFields: [] }
    ]
  }]
}