import type { ThemeConfig, BusinessData } from '../../../../types/section-types'


export const MIMARLIK_STRUKTUR_BUSINESS = {
  name: 'Endüstriyel Mimarlık',
  ownerName: 'Endüstriyel Mimarlık Sahibi',
  sectorId: 'mimarlik',
  slogan: 'Profesyonel hizmet, güvenilir kalite',
  phone: '0532 000 00 00',
  phoneClean: '905320000000',
  whatsapp: '905320000000',
  email: 'info@mimarlik-struktur.com',
  address: 'İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  socialMedia: { instagram: 'https://instagram.com/mimarlik-struktur' },
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

export const MIMARLIK_STRUKTUR_CONFIG: ThemeConfig = { 
  id: 'mimarlik-struktur', 
  name: 'Endüstriyel Mimarlık', 
  sectorId: 'mimarlik', 
  plan: 'pro', 
  isDark: true, 
  cssVariables: { '--color-bg': '#FFFFFF', '--color-surface': '#F8FAFC', '--color-text': '#0F172A', '--color-accent': '#EF4444',
    '--color-accent-light': '#231f2e',
    '--color-accent-hover': '#3b148f',
    '--color-accent-active': '#34127d', '--color-text-on-accent': '#000000', '--color-border': '#E2E8F0', '--font-heading': "'Anton', sans-serif", '--font-body': "'Inter', sans-serif" }, 
  fonts: { 
    heading: { family: 'Anton', subsets: ['latin'], weights: [400] }, 
    body: { family: 'Inter', subsets: ['latin', 'latin-ext'], weights: [300, 400] } 
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
        logo: { type: 'text', text: 'Endüstriyel Mimarlık' },
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
        businessName: 'Endüstriyel Mimarlık',
        copyright: '© 2026 Endüstriyel Mimarlık',
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
  description: 'Fabrika ve tesis yapı projeleri.',
  seoSchemaType: 'ProfessionalService',
  sectorSections: [],
  designPhilosophy: 'Brutalist industrial form.',
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'framer-basic' },
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'Endüstriyel Projeler', 
    titleTr: 'Endüstriyel Projeler',
    isHomePage: true, 
    includeInNav: false, 
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, animation: 'none', order: 1, removable: false }, editableFields: [], defaultContent: {} }
    ] 
  }] 
}