/**
 * @kepenk/templates — klinik-vip Theme Configuration
 *
 * Klinik (Güzellik & Sağlık) — VIP (Premium+ Tier)
 * Plan: enterprise (Fütüristik WebGL tarzı GSAP etkileşimleri, Interactive SVG)
 * Font: Syne + Inter | Accent: #00ffcc (Neon Teal) | Background: #000000 (Pure Black)
 */

import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

// ═══ CSS VARIABLES ═══

export const KLINIK_VIP_CSS: Record<string, string> = {
  '--color-bg': '#1C1917',
  '--color-surface': '#292524',
  '--color-surface-elevated': '#44403C',
  '--color-surface-muted': '#171717',
  '--color-text': '#FAFAF9',
  '--color-text-secondary': '#D6D3D1',
  '--color-text-muted': '#78716C',
  '--color-text-on-accent': '#000000',
  '--color-text-on-dark': '#ffffff',
  '--color-accent': '#00ffcc', // Neon Teal / Cyan
  '--color-accent-hover': '#00ccaa',
  '--color-accent-active': '#009988',
  '--color-accent-light': 'rgba(0, 255, 204, 0.1)',
  '--color-accent-subtle': 'rgba(0, 255, 204, 0.05)',
  '--color-border': '#57534E',
  '--color-border-subtle': '#44403C',
  '--color-border-strong': '#555555',
  '--font-heading': "'Syne', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--container-default': '1200px',
  '--radius-md': '2px',
  '--radius-lg': '4px' // Sharp, techy corners
}

// ═══ DEMO BUSINESS DATA ═══
export const KLINIK_VIP_BUSINESS: Partial<BusinessData> = {
  name: 'X-Medica Advanced Clinic',
  ownerName: 'Dr. Atlas Kaan',
  sectorId: 'klinik',
  slogan: 'Precision Medical Aesthetics',
  phone: '0850 999 88 77',
  phoneClean: '908509998877',
  whatsapp: '908509998877',
  email: 'concierge@xmedica.com',
  address: 'Levent Loft, Büyükdere Cad. No:201',
  city: 'İstanbul',
  district: 'Beşiktaş',
  services: [
    { id: 's1', name: 'Face Sculpting', description: '3D Mapping destekli yapısal yüz şekillendirme.', icon: 'scan-face' },
    { id: 's2', name: 'Cellular Therapy', description: 'Kök hücre ve eksozom destekli cilt yenilenmesi.', icon: 'dna' },
    { id: 's3', name: 'Body Contouring', description: 'Robotik bölgesel incelme ve kas aktivasyon ünitesi.', icon: 'activity' }
  ],
  photos: [
    { url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80', alt: 'Clinic Image 1', width: 1920, height: 1080 },
    { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80', alt: 'Clinic Image 2', width: 1920, height: 1080 }
  ]
}

// ═══ THEME CONFIG ═══

export const KLINIK_VIP_CONFIG: ThemeConfig = {
  id: 'klinik-vip',
  name: 'VIP Cyber Klinik',
  sectorId: 'klinik',
  plan: 'enterprise',
  description: 'Industrial-Bold/Lüks. Font: Clash Display. Layout: Full-page-snap (full).',
  designPhilosophy: 'Cyber-aesthetic ve premium tıp. Clash Display fontunun gücüyle endüstriyel lüks ve tam sayfa keskin geçişler.',
  isDark: true,
  cssVariables: KLINIK_VIP_CSS,
  fonts: {
    heading: { family: 'Clash Display', weights: [500, 600, 700], subsets: ['latin-ext'] },
    body:    { family: 'Inter', weights: [300, 400, 500], subsets: ['latin-ext'] }
  },
  seoSchemaType: 'MedicalClinic',
  sectorSections: ['services', 'anatomy_hotspot', 'team_slider', 'vip_concierge'],
  performanceBudget: {
    maxJS: '300kb',
    maxLCP: '3.0s',
    animationLevel: 'gsap-allowed'
  },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: { logo: { type: 'text', text: 'X-Medica' }, menuItems: [{ label: 'VIP Services', href: '#hizmetler' }, { label: 'Team', href: '#uzmanlar' }, { label: 'Concierge', href: '#iletisim' }], cta: { text: 'Book Now', href: '#iletisim', variant: 'solid' } },
      editableFields: []
    },
    {
      id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'full', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: { businessName: 'X-Medica Advanced Clinic', copyright: '© 2024 X-Medica', contact: { phone: '0850 999 88 77', address: 'Levent Loft, İstanbul' }, legal: [{ label: 'Privacy', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' },
      editableFields: []
    }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: "X-Medica Advanced Clinic", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Levent Loft', title: "X-Medica Clinic", subtitle: "Precision Medical Aesthetics", cta1: { text: 'Concierge', href: '#iletisim' } }, editableFields: [] },
      { id: 'hizmetler', type: 'services', variant: 'auto', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'full', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'ADVANCED', title: 'Treatments', services: [{ id: 's1', name: 'Face Sculpting', description: '3D Mapping destekli yüz şekillendirme.', icon: 'star' }] }, editableFields: [] },
      { id: 'uzmanlar', type: 'team', variant: 'auto', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'full', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'MEDICAL TEAM', title: 'Top Specialists', items: [] }, editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 4, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'LOCATION', title: 'Concierge Contact', whatsapp: "908509998877" }, editableFields: [] }
    ]
  }]
}
