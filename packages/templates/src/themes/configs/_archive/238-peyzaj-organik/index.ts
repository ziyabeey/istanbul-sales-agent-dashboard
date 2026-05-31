import type { ThemeConfig } from '../../../../types/section-types'

export const PEYZAJ_ORGANIK_CONFIG: ThemeConfig = { 
  id: 'peyzaj-organik', 
  name: 'Ekolojik Tasarım', 
  sectorId: 'peyzaj', 
  plan: 'starter', 
  isDark: false, 
  cssVariables: { '--color-bg': '#FDFBF7', '--color-surface': '#F4F1EA', '--color-text': '#3D3831', '--color-accent': '#8B5A2B',
    '--color-accent-light': '#e8fafc',
    '--color-accent-hover': '#23808b',
    '--color-accent-active': '#1f717a', '--color-text-on-accent': '#FFFFFF', '--color-border': '#DED8CE', '--font-heading': "'Lora', serif", '--font-body': "'Lora', serif" }, 
  fonts: { 
    heading: { family: 'Lora', subsets: ['latin'], weights: [400, 600] }, 
    body: { family: 'Lora', subsets: ['latin', 'latin-ext'], weights: [400] } 
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
        logo: { type: 'text', text: 'Ekolojik Tasarım' },
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
        businessName: 'Ekolojik Tasarım',
        copyright: '© 2026 Ekolojik Tasarım',
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
  description: 'Biyoçeşitlilik destekli sürdürülebilir bahçeler.',
  seoSchemaType: 'HomeAndConstructionBusiness',
  sectorSections: [],
  designPhilosophy: 'Earthy permaculture essence.',
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'framer-basic' },
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'Ekoloji', 
    titleTr: 'Ekoloji',
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

export const PEYZAJ_ORGANIK_BUSINESS = {} as Record<string, unknown>
