/**
 * @kepenk/templates — mimarlik-tasarim Theme Configuration (P0 Master)
 *
 * Brutalist-Chic, Monumental Typography, Edge-to-Edge Portfolio.
 * Plan: enterprise
 * Font: Space Grotesk / Inter
 */

import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

// ═══ CSS VARIABLES ═══
export const MIMARLIK_TASARIM_CSS: Record<string, string> = {
  '--container-default': '100%', // Override to allow edge-to-edge
  '--section-py': '128px',
  '--radius-md': '0px',
  '--radius-lg': '0px',
  '--color-bg': '#E6E6E6', // Concrete gray
  '--color-surface': '#F5F5F5',
  '--color-surface-elevated': '#FFFFFF',
  '--color-text': '#0A0A0A',
  '--color-text-secondary': '#4A4A4A',
  '--color-text-on-dark': '#E6E6E6',
  '--color-accent': '#FF3B00', // Brutalist neon orange pop
  '--color-border': '#D1D1D1',
  '--font-heading': "'Space Grotesk', sans-serif",
  '--font-body': "'Inter', sans-serif",
}

// ═══ BUSINESS DATA ═══
export const MIMARLIK_TASARIM_BUSINESS = {
  name: 'STUDIO XYZ',
  ownerName: 'Mimar Sinan & Partners',
  sectorId: 'mimarlik',
  slogan: 'Hacimsel Manifestolar',
  phone: '0212 900 11 99',
  phoneClean: '902129001199',
  email: 'hello@studioxyz.com',
  address: 'Levent Mah. Carsi Cad. No:9, Besiktas/Istanbul',
  city: 'Istanbul',
  district: 'Besiktas',
  photos: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
  ],
  workingHours: [
    { day: 'Pazartesi', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Cuma', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Pazar', open: 'Kapali', close: 'Kapali', isOpen: false },
  ],
  services: []
} as unknown as BusinessData

// ═══ THEME CONFIG ═══
export const MIMARLIK_TASARIM_CONFIG: ThemeConfig = {
  id: 'mimarlik-tasarim',
  name: 'Studio XYZ Brutalist',
  sectorId: 'mimarlik',
  plan: 'enterprise',
  isDark: false,
  seoSchemaType: 'LocalBusiness',
  fonts: {
    heading: { family: 'Space Grotesk', weights: [400, 700], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500, 700], subsets: ['latin-ext'] },
  },
  cssVariables: MIMARLIK_TASARIM_CSS,
  business: MIMARLIK_TASARIM_BUSINESS,
  pages: [
    {
      id: 'anasayfa',
      slug: '/',
      title: 'Studio XYZ | Brutalist Architecture',
      titleTr: 'Studio XYZ',
      isHomePage: true,
      includeInNav: true,
      sections: [
        {
          id: 'hero',
          type: 'hero',
          variant: 'mimarlik_tasarim_hero',
          order: 1,
          settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true },
          defaultContent: { title: 'STUDIO XYZ', subtitle: 'Mekansal Hacimleri Zamanın Ruhuyla Yeniden Tanımlıyoruz.' },
          editableFields: []
        },
        {
          id: 'portfolio',
          type: 'portfolio_grid',
          variant: 'mimarlik_tasarim_portfolio',
          order: 2,
          settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true },
          defaultContent: { badge: '01 // Portfolio', title: 'Seçilmiş İşler' },
          editableFields: []
        },
        {
          id: 'process',
          type: 'process_steps',
          variant: 'mimarlik_tasarim_process',
          order: 3,
          settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true },
          defaultContent: { badge: 'METHODOLOGY', title: 'Disiplin ve Süreç' },
          editableFields: []
        },
        {
          id: 'contact',
          type: 'contact',
          variant: 'mimarlik_tasarim_contact',
          order: 4,
          settings: { bgMode: 'dark', paddingY: 'none', containerWidth: 'full', visible: true },
          defaultContent: { title: 'Projeni Başlat' },
          editableFields: []
        }
      ]
    }
  ],
  globalSections: [
    {
      id: 'global-footer',
      type: 'footer',
      variant: 'auto',
      order: 999,
      position: 'bottom',
      settings: { bgMode: 'dark', paddingY: 'sm', containerWidth: 'full', visible: true },
      defaultContent: { businessName: 'Studio XYZ', copyright: '© 2026 Studio XYZ', contact: { phone: '0212 900 11 99', address: 'Istanbul' }, poweredBy: 'kepenk.ai' },
      editableFields: []
    }
  ]
}