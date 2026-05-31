import type { ThemeConfig, BusinessData } from '../../../../types/section-types'


export const MUZIK_COCUK_BUSINESS = {
  name: 'Çocuk Müzik Akademisi',
  ownerName: 'Çocuk Müzik Akademisi Sahibi',
  sectorId: 'muzik',
  slogan: 'Profesyonel hizmet, güvenilir kalite',
  phone: '0532 000 00 00',
  phoneClean: '905320000000',
  whatsapp: '905320000000',
  email: 'info@muzik-cocuk.com',
  address: 'İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  socialMedia: { instagram: 'https://instagram.com/muzik-cocuk' },
  photos: [],
  services: [{"id":"s1","name":"Gitar Dersi","price":"400 TL","duration":"4 ders","description":"Klasik ve akustik gitar eğitimi."},{"id":"s2","name":"Piyano Dersi","price":"500 TL","duration":"4 ders","description":"Her seviye piyano eğitimi."},{"id":"s3","name":"Ses Eğitimi","price":"600 TL","duration":"4 ders","description":"Profesyonel vokal koçluğu."},{"id":"s4","name":"Enstrüman Tamiri","price":"200 TL","duration":"1-3 gün","description":"Her türlü enstrüman bakım ve onarım."}],
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

export const MUZIK_COCUK_CONFIG: ThemeConfig = { 
  id: 'muzik-cocuk', 
  name: 'Çocuk Müzik Akademisi', 
  sectorId: 'muzik', 
  plan: 'free', 
  isDark: false, 
  cssVariables: { '--color-bg': '#FFFAFA', '--color-surface': '#FFF0F0', '--color-text': '#4A3B3B', '--color-accent': '#F9A8D4',
    '--color-accent-light': '#f6e8fc',
    '--color-accent-hover': '#6e2f8e',
    '--color-accent-active': '#622a7e', '--color-text-on-accent': '#831843', '--color-border': '#FFD6D6', '--font-heading': "'Fredoka One', cursive", '--font-body': "'Nunito', sans-serif" }, 
  fonts: { 
    heading: { family: 'Fredoka One', subsets: ['latin'], weights: [400] }, 
    body: { family: 'Nunito', subsets: ['latin', 'latin-ext'], weights: [400, 700] } 
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
        logo: { type: 'text', text: 'Çocuk Müzik Akademisi' },
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
        businessName: 'Çocuk Müzik Akademisi',
        copyright: '© 2026 Çocuk Müzik Akademisi',
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
  description: 'Erken yaş çocuk müzik eğitimi.',
  seoSchemaType: 'EducationalOrganization',
  sectorSections: [],
  designPhilosophy: 'Playful colorful melodies.',
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'framer-basic' },
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'Çocuk Akademi', 
    titleTr: 'Çocuk Akademi',
    isHomePage: true, 
    includeInNav: false, 
    sections: [
      { id: 'h0', type: 'hero', variant: 'auto', order: 0, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, animation: 'none', order: 0, removable: false }, editableFields: [], defaultContent: {} },
      { id: 'h1', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, animation: 'none', order: 1, removable: false }, editableFields: [], defaultContent: {} },
      { id: 's2', type: 'services', variant: 'auto', order: 2, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, animation: 'none', order: 2, removable: false }, editableFields: [], defaultContent: {} },
      { id: 'f3', type: 'footer', variant: 'auto', order: 3, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, animation: 'none', order: 3, removable: false }, editableFields: [], defaultContent: {} }
    ] 
  }] 
}