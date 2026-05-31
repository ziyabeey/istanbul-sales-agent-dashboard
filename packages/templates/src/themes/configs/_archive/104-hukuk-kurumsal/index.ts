import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

export const HUKUK_KURUMSAL_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8FAFC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#475569',
  '--color-text-muted': '#94A3B8',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#1E3A8A',
  '--color-accent-hover': '#1E40AF',
    '--color-accent-active': '#342a7e',
  '--color-accent-light': '#DBEAFE',
  '--color-border': '#E2E8F0',
  '--font-heading': "'Roboto', sans-serif",
  '--font-body': "'Open Sans', sans-serif",
  '--radius-md': '6px',
  '--radius-lg': '12px'
}

export const HUKUK_KURUMSAL_BUSINESS: BusinessData = {
  name: 'Birlik Hukuk Bürosu',
  ownerName: 'Av. Mehmet Birlik',
  sectorId: 'hukuk',
  slogan: 'Güvenilir Hukuki Danışmanlık ve Güçlü Temsil',
  phone: '0212 555 44 33',
  phoneClean: '902125554433',
  email: 'bilgi@birlikhukuk.com',
  address: 'Levent, Şişli, İstanbul',
  city: 'İstanbul',
  district: 'Şişli',
  coordinates: { lat: 41.0766, lng: 29.0123 },
  workingHours: [ { day: 'monday', dayTr: 'Pzt-Cum', open: '08:30', close: '18:30' } ],
  services: [
    { id: '1', name: 'Ticaret Hukuku', description: 'Şirket kuruluşları ve sözleşmeler.', icon: 'building' },
    { id: '2', name: 'İcra ve İflas', description: 'Alacak tahsili ve konkordato.', icon: 'scale' },
    { id: '3', name: 'Gayrimenkul Hukuku', description: 'Tapu iptal ve kat karşılığı sözleşmeler.', icon: 'home' }
  ],
  experience: '15 Yıl',
  foundedYear: 2009
}

export const HUKUK_KURUMSAL_CONFIG: ThemeConfig = {
  id: 'hukuk-kurumsal',
  name: 'Kurumsal Hukuk',
  sectorId: 'hukuk',
  plan: 'free',
  description: 'Kurumsal müvekkillere hitap eden resmi tasarım.',
  isDark: false,
  cssVariables: HUKUK_KURUMSAL_CSS,
  fonts: { heading: { family: 'Roboto', weights: [700] }, body: { family: 'Open Sans', weights: [400] } },
  seoSchemaType: 'LegalService',
  sectorSections: [],
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'none' }, defaultContent: { logo: { type: 'text', text: 'Birlik Hukuk' }, menuItems: [ { label: 'Uzmanlıklar', href: '#uzmanliklar' }, { label: 'Hakkımızda', href: '#hakkimizda' } ], cta: { text: 'İletişim', href: '#iletisim', variant: 'outline' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Birlik Hukuk Bürosu', description: 'Kurumsal ve güvenilir hukuki çözüm ortağınız.' }, editableFields: [] }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: 'Birlik Hukuk Bürosu', titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, animation: 'fadeUp' }, defaultContent: { badge: '15 YILLIK TECRÜBE', title: 'Güvenilir Danışmanlık', subtitle: 'Şirketler hukuku uyuşmazlıklarında yanınızdayız.', cta1: { text: 'Uzmanlıklarımız', href: '#uzmanliklar' } }, editableFields: [] },
      { id: 'stats', type: 'stats', variant: 'auto', order: 2, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 2, animation: 'fadeUp' }, defaultContent: { stats: [{value: '15+', label: 'Yıl Tecrübe'}, {value: '1000+', label: 'Dava'}, {value: '100+', label: 'Müvekkil'}] }, editableFields: [] },
      { id: 'hakkimizda', type: 'about', variant: 'auto', order: 3, required: false, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 3, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: 'Haklarınızı Savunuyoruz', description: 'Uzman kadromuzla sürecinizi güvence altına alıyoruz.' }, editableFields: [] },
      { id: 'uzmanliklar', type: 'services', variant: 'auto', order: 4, required: true, settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 4, animation: 'fadeUp' }, defaultContent: { badge: 'UZMANLIK ALANLARI', title: 'Çalışma Alanlarımız' }, editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 5, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Merkez Ofis' }, editableFields: [] }
    ]
  }]
}