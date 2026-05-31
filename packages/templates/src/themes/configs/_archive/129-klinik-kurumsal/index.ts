/**
 * @kepenk/templates — klinik-kurumsal Theme Configuration
 *
 * Klinik (Güzellik & Sağlık) — Kurumsal (Standart Tier)
 * Plan: starter (30/70 Sticky Sidebar, Akreditasyon barları, SSS)
 * Font: Lora + Inter | Accent: #0369a1 | Background: #f8fafc
 */

import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

// ═══ CSS VARIABLES ═══

export const KLINIK_KURUMSAL_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8FAFC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F1F5F9',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#475569',
  '--color-text-muted': '#94A3B8',
  '--color-text-on-accent': '#ffffff',
  '--color-text-on-dark': '#f8fafc',
  '--color-accent': '#0369a1',
  '--color-accent-hover': '#075985',
  '--color-accent-active': '#0c4a6e',
  '--color-accent-light': '#e0f2fe',
  '--color-accent-subtle': '#f0f9ff',
  '--color-border': '#E2E8F0',
  '--color-border-subtle': '#F1F5F9',
  '--color-border-strong': '#cbd5e1',
  '--font-heading': "'Lora', serif",
  '--font-body': "'Inter', system-ui, sans-serif",
  '--container-default': '1024px',
  '--radius-md': '6px',
  '--radius-lg': '12px'
}

// ═══ DEMO BUSINESS DATA is fetched from p0-demo-businesses.ts ═══
export const KLINIK_KURUMSAL_BUSINESS: Partial<BusinessData> = {
  name: 'Anadolu Sağlık Kliniği',
  ownerName: 'Prof. Dr. Ahmet Yılmaz',
  sectorId: 'klinik',
  slogan: 'Güvenilir ellerde profesyonel sağlık',
  phone: '0850 555 44 33',
  phoneClean: '908505554433',
  whatsapp: '908505554433',
  email: 'info@anadolusaglik.com.tr',
  address: 'Büyükdere Cad. Plaza 33 No:45 Kat:2, Levent, Beşiktaş, İstanbul',
  city: 'İstanbul',
  district: 'Beşiktaş',
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:30', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:30', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:30', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:30', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:30', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '14:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }
  ],
  services: [
    { id: 's1', name: 'Genel Cerrahi', description: 'Gelişmiş tekniklerle güvenli müdahale', price: '₺5000', icon: 'stethoscope' },
    { id: 's2', name: 'Kardiyoloji', description: 'Kapsamlı kalp sağlığı taraması', price: '₺2000', icon: 'heartPulse', popular: true },
    { id: 's3', name: 'Dahiliye', description: 'Erken teşhis ve takip programları', price: '₺1500', icon: 'clipboardList' }
  ],
  photos: [
    { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80', alt: 'Clinic Image 1', width: 1920, height: 1080 },
    { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80', alt: 'Clinic Image 2', width: 1920, height: 1080 }
  ]
}

// ═══ THEME CONFIG ═══

export const KLINIK_KURUMSAL_CONFIG: ThemeConfig = {
  id: 'klinik-kurumsal',
  name: 'Kurumsal Klinik',
  sectorId: 'klinik',
  plan: 'growth',
  description: 'Editorial-Magazine. Asymmetric (lg). Lora serif font.',
  designPhilosophy: 'Akademik ve kurumsal duruş. Lora serif font ile geleneksellik ve güven hissi. Asimetrik layout.',
  isDark: false,
  cssVariables: KLINIK_KURUMSAL_CSS,
  fonts: {
    heading: { family: 'Lora', weights: [400, 500, 600, 700], subsets: ['latin-ext'] },
    body:    { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }
  },
  seoSchemaType: 'MedicalClinic',
  sectorSections: ['services', 'team', 'faq', 'accreditation'],
  performanceBudget: {
    maxJS: '100kb',
    maxLCP: '2.2s',
    animationLevel: 'framer-basic'
  },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'lg', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: { logo: { type: 'text', text: 'Anadolu Sağlık' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Uzmanlar', href: '#uzmanlar' }, { label: 'İletişim', href: '#iletisim' }], cta: { text: 'Randevu', href: '#iletisim', variant: 'solid' } },
      editableFields: []
    },
    {
      id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'lg', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: { businessName: 'Anadolu Sağlık Kliniği', copyright: '© 2024 Anadolu Sağlık', contact: { phone: '0850 555 44 33', address: 'Beşiktaş, İstanbul' }, legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' },
      editableFields: []
    }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Anadolu Sağlık Kliniği — Beşiktaş", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'lg', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Beşiktaş', title: "Anadolu Sağlık Kliniği", subtitle: "Güvenilir ellerde profesyonel sağlık", cta1: { text: 'Randevu Al', href: '#iletisim' } }, editableFields: [] },
      { id: 'hakkimizda', type: 'about', variant: 'auto', order: 2, required: false, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'lg', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'KLİNİĞİMİZ', title: "Tıpta Gelişmiş Teknoloji", description: "Yılların deneyimiyle en iyi hizmeti sunuyoruz." }, editableFields: [] },
      { id: 'hizmetler', type: 'services', variant: 'auto', order: 3, required: true, settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'lg', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'BÖLÜMLER', title: 'Tıbbi Birimler', services: [{ id: 's1', name: 'Genel Cerrahi', description: 'Gelişmiş tekniklerle müdahale.', icon: 'stethoscope' }] }, editableFields: [] },
      { id: 'uzmanlar', type: 'team', variant: 'auto', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'xl', containerWidth: 'lg', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'KADRO', title: 'Doktorlarımız', items: [] }, editableFields: [] },
      { id: 'galeri', type: 'gallery', variant: 'auto', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'lg', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'TESİSLER', title: 'Kliniğimiz' }, editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'LOKASYON', title: 'Bize Ulaşın', whatsapp: "908505554433" }, editableFields: [] }
    ]
  }]
}
