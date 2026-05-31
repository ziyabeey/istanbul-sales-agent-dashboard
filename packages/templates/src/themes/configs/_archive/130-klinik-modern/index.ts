/**
 * @kepenk/templates — klinik-modern Theme Configuration
 *
 * Klinik (Güzellik & Sağlık) — Modern (Büyüme Tier)
 * Plan: growth (Neumorphism estetiği, Soft box-shadows, Before/After Slider)
 * Font: Poppins + Nunito | Accent: #8b5cf6 (Violet) | Background: #f3f4f6 (Soft Gray)
 */

import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

// ═══ CSS VARIABLES ═══

export const KLINIK_MODERN_CSS: Record<string, string> = {
  '--color-bg': '#FCFCFD', // Light gray core for neumorphism
  '--color-surface': '#F1F3F5',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E9ECEF',
  '--color-text': '#212529',
  '--color-text-secondary': '#495057',
  '--color-text-muted': '#868E96',
  '--color-text-on-accent': '#ffffff',
  '--color-text-on-dark': '#ffffff',
  '--color-accent': '#6366f1', // Indigo
  '--color-accent-hover': '#4f46e5',
  '--color-accent-active': '#4338ca',
  '--color-accent-light': '#e0e7ff',
  '--color-accent-subtle': '#eef2ff',
  '--color-border': '#DEE2E6', // Neumorphism relies on shadows
  '--color-border-subtle': '#F1F3F5',
  '--color-border-strong': '#cbd5e1',
  '--font-heading': "'Poppins', sans-serif",
  '--font-body': "'Nunito', sans-serif",
  '--container-default': '1120px',
  '--radius-md': '8px',
  '--radius-lg': '16px',
  // Custom Neumorphism Shadows for background #e6eaf0
  '--shadow-neu': '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)',
  '--shadow-neu-hover': 'inset 6px 6px 10px 0 rgba(163,177,198, 0.6), inset -6px -6px 10px 0 rgba(255,255,255, 0.5)',
  '--shadow-neu-sm': '5px 5px 10px rgb(163,177,198,0.6), -5px -5px 10px rgba(255,255,255, 0.5)'
}

// ═══ DEMO BUSINESS DATA ═══
export const KLINIK_MODERN_BUSINESS: Partial<BusinessData> = {
  name: 'NeoEstetik Merkezi',
  ownerName: 'Uzm. Dr. Selim Kaya',
  sectorId: 'klinik',
  slogan: 'Estetikte Yeni Çağ',
  phone: '0216 444 88 99',
  phoneClean: '902164448899',
  whatsapp: '902164448899',
  email: 'info@neoestetik.com',
  address: 'Bağdat Cad. No:200 Kadıköy, İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  services: [
    { id: 's1', name: 'Lazer Epilasyon', description: 'Buz lazer ile acısız ve kalıcı pürüzsüzlük.', icon: 'zap' },
    { id: 's2', name: 'Cilt Yenileme', description: 'Dermapen ve PRP ile hücre yenilenmesi.', icon: 'sparkle' },
    { id: 's3', name: 'Bölgesel İncelme', description: 'Soğuk lipoliz ve G5 masajı kombinasyonu.', icon: 'activity' },
    { id: 's4', name: 'Botoks & Dolgu', description: 'Yüz hatlarını yeniden tanımlama sanatı.', icon: 'syringe' }
  ],
  photos: [
    { url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80', alt: 'Clinic Image 1', width: 1920, height: 1080 },
    { url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80', alt: 'Clinic Image 2', width: 1920, height: 1080 },
    { url: 'https://images.unsplash.com/photo-1598444226849-0fa392cc3f2f?auto=format&fit=crop&q=80', alt: 'Clinic Image 3', width: 1920, height: 1080 }
  ]
}

// ═══ THEME CONFIG ═══

export const KLINIK_MODERN_CONFIG: ThemeConfig = {
  id: 'klinik-modern',
  name: ' Modern Klinik ',
  sectorId: 'klinik',
  plan: 'growth',
  description: 'Neumorphism (Soft UI) estetiği. Teknolojik ve yenilikçi hissettiren pürüzsüz arayüz tasarımı.',
  designPhilosophy: 'Keskin hatlar yerine yumuşak gölgelerle oluşturulmuş pürüzsüz kartlar. Poppins ile modern ve yuvarlak hatlı bir görünüm.',
  isDark: false,
  cssVariables: KLINIK_MODERN_CSS,
  fonts: {
    heading: { family: 'Inter', weights: [500, 600, 700], subsets: ['latin-ext'] },
    body:    { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }
  },
  seoSchemaType: 'MedicalClinic',
  sectorSections: ['services', 'before_after', 'technology'],
  performanceBudget: {
    maxJS: '150kb',
    maxLCP: '2.5s',
    animationLevel: 'framer-full'
  },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'md', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: { logo: { type: 'text', text: 'NeoEstetik' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'İletişim', href: '#iletisim' }], cta: { text: 'Randevu Al', href: '#iletisim', variant: 'solid' } },
      editableFields: []
    },
    {
      id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'md', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: { businessName: 'NeoEstetik Merkezi', copyright: '© 2024 NeoEstetik', contact: { phone: '0216 444 88 99', address: 'Kadıköy, İstanbul' }, legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' },
      editableFields: []
    }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: "NeoEstetik Merkezi — Kadıköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'md', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Kadıköy', title: "NeoEstetik Merkezi", subtitle: "Estetikte Yeni Çağ", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
      { id: 'hakkimizda', type: 'about', variant: 'auto', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'md', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Modern cihazlar ve uzman kadroyla hizmetinizdeyiz." }, editableFields: [] },
      { id: 'hizmetler', type: 'services', variant: 'auto', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'md', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Uzmanlık Alanlarımız', services: [{ id: 's1', name: 'Lazer Epilasyon', description: 'Buz lazer ile acısız pürüzsüzlük.', icon: 'zap' }] }, editableFields: [] },
      { id: 'gorusler', type: 'testimonials', variant: 'auto', order: 4, required: true, settings: { bgMode: 'default', paddingY: 'md', containerWidth: 'md', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'YORUMLAR', title: 'Hasta Görüşleri', items: [] }, editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902164448899" }, editableFields: [] }
    ]
  }]
}
