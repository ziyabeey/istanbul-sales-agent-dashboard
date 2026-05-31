import type { ThemeConfig } from '../../../../types/section-types'

export const PEYZAJ_MODERN_CONFIG: ThemeConfig = { 
  id: 'peyzaj-modern', 
  name: 'Modern Mimari Peyzaj', 
  sectorId: 'peyzaj', 
  plan: 'pro', 
  isDark: false, 
  cssVariables: { '--color-bg': '#FCFCFD', '--color-surface': '#F1F3F5', '--color-text': '#212529', '--color-accent': '#38D39F',
    '--color-accent-light': '#e8fcf7',
    '--color-accent-hover': '#148f6e',
    '--color-accent-active': '#127d60', '--color-text-on-accent': '#FFFFFF', '--color-border': '#DEE2E6', '--font-heading': "'Outfit', sans-serif", '--font-body': "'Inter', sans-serif" }, 
  fonts: { 
    heading: { family: 'Outfit', subsets: ['latin'], weights: [400, 700, 900] }, 
    body: { family: 'Source Sans 3', subsets: ['latin', 'latin-ext'], weights: [400, 600] } 
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
        logo: { type: 'text', text: 'Modern Mimari Peyzaj' },
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
        businessName: 'Modern Mimari Peyzaj',
        copyright: '© 2026 Modern Mimari Peyzaj',
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
  description: 'Sıra dışı geometrik dış mekan tasarımları.',
  seoSchemaType: 'HomeAndConstructionBusiness',
  sectorSections: [],
  designPhilosophy: 'Minimalist structural logic.',
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'framer-basic' },
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'Mimari', 
    titleTr: 'Mimari',
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

export const PEYZAJ_MODERN_BUSINESS = {} as Record<string, unknown>
