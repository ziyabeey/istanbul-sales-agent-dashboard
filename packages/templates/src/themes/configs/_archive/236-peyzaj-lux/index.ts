import type { ThemeConfig } from '../../../../types/section-types'

export const PEYZAJ_LUX_CONFIG: ThemeConfig = { 
  id: 'peyzaj-lux', 
  name: 'Malikane Peyzajı', 
  sectorId: 'peyzaj', 
  plan: 'enterprise', 
  isDark: true, 
  cssVariables: { '--color-bg': '#FAFAF9', '--color-surface': '#F5F5F4', '--color-text': '#1C1917', '--color-accent': '#059669',
    '--color-accent-light': '#1f2e24',
    '--color-accent-hover': '#187239',
    '--color-accent-active': '#156130', '--color-text-on-accent': '#FFFFFF', '--color-border': '#D6D3D1', '--font-heading': "'Cormorant Garamond', serif", '--font-body': "'Inter', sans-serif" }, 
  fonts: { 
    heading: { family: 'Cormorant Garamond', subsets: ['latin'], weights: [400, 600] }, 
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
        logo: { type: 'text', text: 'Malikane Peyzajı' },
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
        businessName: 'Malikane Peyzajı',
        copyright: '© 2026 Malikane Peyzajı',
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
  description: 'V.I.P malikane ve villa peyzaj mimarisi.',
  seoSchemaType: 'HomeAndConstructionBusiness',
  sectorSections: [],
  designPhilosophy: 'Deep emerald grand luxury.',
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'framer-basic' },
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'Estate', 
    titleTr: 'Estate',
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

export const PEYZAJ_LUX_BUSINESS = {} as Record<string, unknown>
