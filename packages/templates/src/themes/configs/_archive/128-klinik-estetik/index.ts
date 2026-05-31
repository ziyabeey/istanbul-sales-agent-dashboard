/**
 * @kepenk/templates — klinik-estetik Theme Configuration
 *
 * Klinik (Güzellik & Sağlık) — Estetik (Premium Tier)
 * Plan: pro (Glassmorphism, Cinematic background, Slow motion CSS animations)
 * Font: Cormorant Garamond + Montserrat | Accent: #d4af37 (Gold) | Background: #0a0a0a (Dark)
 */

import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

// ═══ CSS VARIABLES ═══

export const KLINIK_ESTETIK_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF', // Deep luxurious dark
  '--color-surface': '#F8FAFC', // Glass effect
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F1F5F9',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#475569',
  '--color-text-muted': '#94A3B8',
  '--color-text-on-accent': '#000000',
  '--color-text-on-dark': '#ffffff',
  '--color-accent': '#d4af37', // Gold
  '--color-accent-hover': '#f1c40f',
  '--color-accent-active': '#b8960b',
  '--color-accent-light': 'rgba(212, 175, 55, 0.1)',
  '--color-accent-subtle': 'rgba(212, 175, 55, 0.05)',
  '--color-border': '#E2E8F0',
  '--color-border-subtle': '#F1F5F9',
  '--color-border-strong': 'rgba(255, 255, 255, 0.2)',
  '--font-heading': "'Cormorant Garamond', serif",
  '--font-body': "'Montserrat', sans-serif",
  '--container-default': '1024px',
  '--radius-md': '6px',
  '--radius-lg': '12px'
}

// ═══ DEMO BUSINESS DATA ═══
export const KLINIK_ESTETIK_BUSINESS: Partial<BusinessData> = {
  name: 'Aura Premium Clinic',
  ownerName: 'Op. Dr. Aylin Güneş',
  sectorId: 'klinik',
  slogan: 'Lüks ve Zarafetin Buluştuğu Nokta',
  phone: '0212 280 90 00',
  phoneClean: '902122809000',
  whatsapp: '902122809000',
  email: 'info@auraclinic.com.tr',
  address: 'Zorlu Center Teras Evler, Beşiktaş, İstanbul',
  city: 'İstanbul',
  district: 'Beşiktaş',
  services: [
    { id: 's1', name: 'Premium Yüz Germe', description: 'İz bırakmayan endoskopik yüz germe estetiği.', icon: 'star' },
    { id: 's2', name: 'Rinoplasti', description: 'Altın orana uygun burun estetiği tasarımı.', icon: 'wind' },
    { id: 's3', name: 'Vücut Şekillendirme', description: 'Vaser liposuction ile mükemmel hatlar.', icon: 'figma' }
  ],
  photos: [
    { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80', alt: 'Clinic Image 1', width: 1920, height: 1080 },
    { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80', alt: 'Clinic Image 2', width: 1920, height: 1080 }
  ]
}

// ═══ THEME CONFIG ═══

export const KLINIK_ESTETIK_CONFIG: ThemeConfig = {
  id: 'klinik-estetik',
  name: 'Premium Estetik',
  sectorId: 'klinik',
  plan: 'pro',
  description: 'Minimal-Clean. Font: Cormorant Garamond. Layout: Editorial-zigzag (xl).',
  designPhilosophy: 'Glassmorphism. Zengin ve derin siyah arka planlar üzerinde zarif Serif tipografi kullanımı ve zigzag akış.',
  isDark: true,
  cssVariables: KLINIK_ESTETIK_CSS,
  fonts: {
    heading: { family: 'Cormorant Garamond', weights: [400, 500, 600, 700], subsets: ['latin-ext'] },
    body:    { family: 'Montserrat', weights: [300, 400, 500], subsets: ['latin-ext'] }
  },
  seoSchemaType: 'MedicalClinic',
  sectorSections: ['services', 'gallery', 'vip_consultation'],
  performanceBudget: {
    maxJS: '200kb',
    maxLCP: '2.8s',
    animationLevel: 'gsap-allowed' // the highest level before full WebGL
  },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: { logo: { type: 'text', text: 'Aura Premium' }, menuItems: [{ label: 'VIP Estetik', href: '#hizmetler' }, { label: 'Uzmanlar', href: '#uzmanlar' }, { label: 'İletişim', href: '#iletisim' }], cta: { text: 'Randevu', href: '#iletisim', variant: 'solid' } },
      editableFields: []
    },
    {
      id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: { businessName: 'Aura Premium Clinic', copyright: '© 2024 Aura Premium', contact: { phone: '0212 280 90 00', address: 'Zorlu Center, İstanbul' }, legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' },
      editableFields: []
    }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Aura Premium Clinic", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Zorlu Center', title: "Aura Premium Clinic", subtitle: "Lüks ve Zarafetin Buluştuğu Nokta", cta1: { text: 'VIP İletişim', href: '#iletisim' } }, editableFields: [] },
      { id: 'hizmetler', type: 'services', variant: 'auto', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'PREMIUM', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Yüz Germe', description: 'İz bırakmayan endoskopik sistem.', icon: 'star' }] }, editableFields: [] },
      { id: 'galeri', type: 'gallery', variant: 'auto', order: 3, required: false, settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'ESTETİK', title: 'Galeri' }, editableFields: [] },
      { id: 'uzmanlar', type: 'team', variant: 'auto', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'KADRO', title: 'Uzmanlarımız', items: [] }, editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 5, required: true, settings: { bgMode: 'accent', paddingY: 'xl', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'LOKASYON', title: 'Bize Ulaşın', whatsapp: "902122809000" }, editableFields: [] }
    ]
  }]
}
