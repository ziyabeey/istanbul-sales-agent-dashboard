/**
 * @kepenk/templates — klinik-sade Theme Configuration
 *
 * Klinik (Güzellik & Sağlık) — Minimalist Klinik Duruşu (Temel Tier)
 * Plan: free (1 page, tek sütun, yalın ve fonksiyonel hekim tasarımı)
 * Font: Inter | Accent: #0ea5e9 | Background: #ffffff
 */

import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

// ═══ CSS VARIABLES ═══

export const KLINIK_SADE_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8FAFC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F1F5F9',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#475569',
  '--color-text-muted': '#94A3B8',
  '--color-text-on-accent': '#ffffff',
  '--color-text-on-dark': '#f8fafc',
  '--color-accent': '#0ea5e9',
  '--color-accent-hover': '#0284c7',
  '--color-accent-active': '#0369a1',
  '--color-accent-light': '#e0f2fe',
  '--color-accent-subtle': '#f0f9ff',
  '--color-border': '#E2E8F0',
  '--color-border-subtle': '#F1F5F9',
  '--color-border-strong': '#cbd5e1',
  '--font-heading': "'Inter', system-ui, sans-serif",
  '--font-body': "'Inter', system-ui, sans-serif"
}

// ═══ DEMO BUSINESS DATA ═══

export const KLINIK_SADE_BUSINESS: BusinessData = {
  name: 'Dr. Hande Aslan Kliniği',
  ownerName: 'Uzm. Dr. Hande Aslan',
  sectorId: 'klinik',
  slogan: 'Dermatoloji ve Estetik Kliniği',
  phone: '0532 999 88 77',
  phoneClean: '905329998877',
  whatsapp: '905329998877',
  email: 'iletisim@drhandeaslan.com',
  address: 'Teşvikiye Mah. Hakkı Yeten Cad. No:11 Şişli, İstanbul',
  city: 'İstanbul',
  district: 'Şişli',
  coordinates: { lat: 41.0544, lng: 28.9959 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }
  ],
  socialMedia: { instagram: 'https://instagram.com/drhandeaslan' },
  logoUrl: undefined,
  photos: [
    { url: 'https://images.unsplash.com/photo-1594824432258-3d120a4afce4?auto=format&fit=crop&q=80', alt: 'Clinic Image 1', width: 1920, height: 1080 },
    { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80', alt: 'Clinic Image 2', width: 1920, height: 1080 }
  ],
  services: [
    { id: 's1', name: 'Medikal Estetik', price: '₺2500', duration: '45 dk', icon: 'sparkles', description: 'Ameliyatsız estetik uygulamaları' },
    { id: 's2', name: 'Botoks & Dolgu', price: '₺3000', duration: '30 dk', icon: 'syringe', description: 'FDA onaylı orijinal ürünlerle uygulama', popular: true },
    { id: 's3', name: 'Cilt Leke Tedavisi', price: '₺1800', duration: '60 dk', icon: 'circle-dot' },
    { id: 's4', name: 'Lazer Epilasyon', price: '₺1500', duration: '45 dk', icon: 'zap' },
    { id: 's5', name: 'Peeling Uygulamaları', price: '₺1200', duration: '40 dk', icon: 'droplets' }
  ],
  team: [
    { id: 't1', name: 'Uzm. Dr. Hande Aslan', role: 'Dermatoloji Uzmanı', experience: '15 yıl' }
  ],
  experience: '15 yıl',
  rating: 4.9,
  reviewCount: 124,
  foundedYear: 2010
}

// ═══ THEME CONFIG ═══

export const KLINIK_SADE_CONFIG: ThemeConfig = {
  id: 'klinik-sade',
  name: 'Minimal Biyografi',
  sectorId: 'klinik',
  plan: 'free',
  description: 'Pastel-Soft. Font: Cinzel/Inter. Layout: Single-column (sm).',
  designPhilosophy: 'Pastel yumuşak tonlar, Cinzel zarif tipografisiyle minimal klinik dizilimi.',
  inspiration: ['Bio-link sayfaları', 'Zocdoc profil sayfaları'],
  isDark: false,
  cssVariables: KLINIK_SADE_CSS,
  fonts: {
    heading: { family: 'Cinzel', weights: [400, 600, 700], subsets: ['latin-ext'] },
    body:    { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }
  },
  seoSchemaType: 'MedicalClinic',
  sectorSections: ['services', 'biography'],
  performanceBudget: {
    maxJS: '80kb',
    maxLCP: '2.0s',
    animationLevel: 'css-only'
  },

  // ─── Global sections (every page) ───
  globalSections: [
    {
      id: 'global-cookie',
      type: 'cookie_banner',
      variant: 'bottom_bar',
      order: 1001,
      required: true,
      position: 'floating',
      settings: {
        bgMode: 'surface', paddingY: 'none', containerWidth: 'sm',
        visible: true, order: 1001, removable: false, animation: 'none'
      },
      defaultContent: {
        text: 'Size daha iyi bir deneyim sunmak için çerezleri kullanıyoruz.',
        acceptText: 'Anladım',
        rejectText: '',
        detailsText: 'Gizlilik',
        detailsLink: '/gizlilik'
      },
      editableFields: []
    }
  ],

  // ─── Pages ───
  pages: [{
    id: 'anasayfa', slug: '/', title: "Dr. Hande Aslan — Şişli", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      {
        id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true,
        settings: { bgMode: 'default', paddingY: 'md', containerWidth: 'sm', visible: true, order: 1, removable: false, animation: 'none' },
        defaultContent: { badge: 'Dermatoloji Uzmanı', title: 'Dr. Hande Aslan', subtitle: 'Ameliyatsız estetik ve cilt sağlığı üzerine 15 yıllık klinik deneyim.', cta1: { text: 'Hemen Randevu Al', href: '#iletisim' } }, editableFields: []
      },
      {
        id: 'hizmetler', type: 'services', variant: 'auto', order: 2, required: true,
        settings: { bgMode: 'surface', paddingY: 'md', containerWidth: 'sm', visible: true, order: 2, removable: false, animation: 'none' },
        defaultContent: { badge: 'HİZMETLER', title: 'Uzmanlık Alanları', services: [{ id: 's1', name: 'Botoks', icon: 'syringe' }] }, editableFields: []
      },
      {
        id: 'gorusler', type: 'testimonials', variant: 'auto', order: 3, required: true,
        settings: { bgMode: 'default', paddingY: 'md', containerWidth: 'sm', visible: true, order: 3, removable: true, animation: 'none' },
        defaultContent: { badge: 'YORUMLAR', title: 'Hasta Görüşleri', items: [] }, editableFields: []
      },
      {
        id: 'istatistik', type: 'stats', variant: 'auto', order: 4, required: false,
        settings: { bgMode: 'surface', paddingY: 'md', containerWidth: 'sm', visible: true, order: 4, removable: true, animation: 'none' },
        defaultContent: { stats: [{value: '15+', label: 'Yıl Deneyim'}] }, editableFields: []
      }
    ]
  }]
}
