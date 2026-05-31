import type { ThemeConfig } from '../../../../types/section-types'

export const PEYZAJ_SULAMA_CONFIG: ThemeConfig = { 
  id: 'peyzaj-sulama', 
  name: 'Akıllı Sulama', 
  sectorId: 'peyzaj', 
  plan: 'growth', 
  isDark: false, 
  cssVariables: { '--color-bg': '#FFFFFF', '--color-surface': '#F8FAFC', '--color-text': '#0F172A', '--color-accent': '#3B82F6',
    '--color-accent-light': '#e8f3fc',
    '--color-accent-hover': '#1f6bad',
    '--color-accent-active': '#1c609c', '--color-text-on-accent': '#FFFFFF', '--color-border': '#E2E8F0', '--font-heading': "'Nunito', sans-serif", '--font-body': "'Inter', sans-serif" }, 
  fonts: { 
    heading: { family: 'Nunito', subsets: ['latin'], weights: [400, 700, 900] }, 
    body: { family: 'DM Sans', subsets: ['latin', 'latin-ext'], weights: [400, 500] } 
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
        logo: { type: 'text', text: 'Akıllı Sulama' },
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
        businessName: 'Akıllı Sulama',
        copyright: '© 2026 Akıllı Sulama',
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
  description: 'Teknolojik ve otomatik sulama sistemleri kurulumu.',
  seoSchemaType: 'HomeAndConstructionBusiness',
  sectorSections: [],
  designPhilosophy: 'Hydro tech precision.',
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'framer-basic' },
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'Sistem', 
    titleTr: 'Sistem',
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

export const PEYZAJ_SULAMA_BUSINESS = {} as Record<string, unknown>
