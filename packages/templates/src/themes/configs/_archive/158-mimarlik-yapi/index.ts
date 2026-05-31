import type { ThemeConfig, BusinessData } from '../../../../types/section-types'


export const MIMARLIK_YAPI_BUSINESS = {
  name: 'Mühendislik & Mimarlık',
  ownerName: 'Mühendislik & Mimarlık Sahibi',
  sectorId: 'mimarlik',
  slogan: 'Profesyonel hizmet, güvenilir kalite',
  phone: '0532 000 00 00',
  phoneClean: '905320000000',
  whatsapp: '905320000000',
  email: 'info@mimarlik-yapi.com',
  address: 'İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  socialMedia: { instagram: 'https://instagram.com/mimarlik-yapi' },
  photos: [],
  services: [{"id":"s1","name":"Mimari Proje","price":"25.000 TL","duration":"4 hafta","description":"Anahtar teslim mimari proje çizimi."},{"id":"s2","name":"İç Mekan Tasarımı","price":"15.000 TL","duration":"2 hafta","description":"Yaşam alanları için fonksiyonel iç tasarım."},{"id":"s3","name":"3D Modelleme","price":"8.000 TL","duration":"1 hafta","description":"Detaylı 3 boyutlu modelleme ve render."},{"id":"s4","name":"Ruhsat Danışmanlığı","price":"5.000 TL","duration":"3 gün","description":"Belediye ve imar izinleri süreç yönetimi."}],
  workingHours: [
    { day: 'Pazartesi', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Salı', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Çarşamba', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Perşembe', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Cuma', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Cumartesi', open: '10:00', close: '16:00', isOpen: true },
    { day: 'Pazar', open: null, close: null, isOpen: false },
  ],
} as unknown as BusinessData

export const MIMARLIK_YAPI_CONFIG: ThemeConfig = { 
  id: 'mimarlik-yapi', 
  name: 'Mühendislik & Mimarlık', 
  sectorId: 'mimarlik', 
  plan: 'enterprise', 
  isDark: false, 
  cssVariables: { '--color-bg': '#FFFFFF', '--color-surface': '#F8FAFC', '--color-text': '#0F172A', '--color-accent': '#931f8d',
    '--color-accent-light': '#fce8fb',
    '--color-accent-hover': '#72186d',
    '--color-accent-active': '#61155d', '--color-text-on-accent': '#FFFFFF', '--color-border': '#E2E8F0', '--font-heading': "'Roboto', sans-serif", '--font-body': "'Roboto', sans-serif" }, 
  fonts: { 
    heading: { family: 'Roboto', subsets: ['latin'], weights: [700, 900] }, 
    body: { family: 'Roboto', subsets: ['latin', 'latin-ext'], weights: [400] } 
  },
    globalSections: [
    {
      id: 'global-header',
      type: 'header',
      variant: 'auto',
      order: 0,
      required: true,
      position: 'top' as const,
      settings: { bgMode: 'default' as const, paddingY: 'none' as const, containerWidth: 'full' as const, visible: true, order: 0, removable: false, animation: 'none' as const },
      defaultContent: {
        logo: { type: 'text', text: 'Mühendislik & Mimarlık' },
        menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Ara', href: 'tel:0532 000 00 00', variant: 'solid' },
      },
      editableFields: [],
    },
    {
      id: 'global-footer',
      type: 'footer',
      variant: 'auto',
      order: 999,
      required: true,
      position: 'bottom' as const,
      settings: { bgMode: 'dark' as const, paddingY: 'sm' as const, containerWidth: 'full' as const, visible: true, order: 999, removable: false, animation: 'none' as const },
      defaultContent: {
        businessName: 'Mühendislik & Mimarlık',
        copyright: '© 2026 Mühendislik & Mimarlık',
        poweredBy: 'kepenk.ai',
      },
      editableFields: [],
    },
    {
      id: 'global-whatsapp',
      type: 'whatsapp_cta',
      variant: 'floating',
      order: 1000,
      required: true,
      position: 'floating' as const,
      settings: { bgMode: 'default' as const, paddingY: 'none' as const, containerWidth: 'full' as const, visible: true, order: 1000, removable: false, animation: 'none' as const },
      defaultContent: { phone: '905320000000', message: 'Merhaba, bilgi almak istiyorum.' },
      editableFields: [],
    },
  ],
  description: 'Geniş kapsamlı mimarlık ve mühendislik hizmetleri.',
  seoSchemaType: 'ProfessionalService',
  sectorSections: [],
  designPhilosophy: 'Technical precision structure.',
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'framer-basic' },
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'Mühendislik Projeleri', 
    titleTr: 'Mühendislik Projeleri',
    isHomePage: true, 
    includeInNav: false, 
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, animation: 'none', order: 1, removable: false }, editableFields: [], defaultContent: {} }
    ] 
  }] 
}