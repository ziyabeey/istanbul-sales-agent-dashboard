/**
 * @kepenk/templates — P0 Klinik Themes (5 themes)
 */

import type { P0ThemeDef } from './p0-themes'

export const KLINIK_THEMES: P0ThemeDef[] = [
  {
    id: 'klinik-sade',
    name: 'Klinik Bio-Link',
    sectorId: 'klinik',
    plan: 'free',
    description: 'Tek sütun, yalın, fonksiyonel ve hızlı bilgi akışı sağlayan hekim tasarımı.',
    designPhilosophy: 'Minimalist Klinik Duruşu. Hızlı Randevu ve Biyografi Odaklı.',
    isDark: false,
    fonts: {
      heading: { family: 'Cormorant Garamond', weights: [600, 700] },
      body: { family: 'Inter', weights: [400, 500] },
    },
    cssOverrides: {
      '--color-accent': '#0ea5e9',
      '--color-accent-hover': '#0284c7',
      '--font-heading': "'Inter', system-ui, sans-serif",
      '--font-body': "'Inter', system-ui, sans-serif",
    
      '--container-default': '100%',},
    homeSections: [
      'hero::klinik_sade_bio',
      'services::klinik_sade_services',
      'contact::klinik_sade_contact'
    ],
    pages: ['home'],
    sectorSections: ['biography', 'services'],
    animationLevel: 'css-only',
    demoBusinessKey: 'sade',
  },
  {
    id: 'klinik-kurumsal',
    name: 'Klinik Kurumsal',
    sectorId: 'klinik',
    plan: 'starter',
    description: 'Kurumsal dil, güven veren detaylar, 30/70 Sticky Sidebar layout ve uzman kadro vurgusu.',
    designPhilosophy: 'Akademik ve kurumsal duruş. Lora serif font ile geleneksellik ve güven hissi. 30/70 oranında bölünmüş asimetrik sayfa yapısı.',
    isDark: false,
    fonts: {
      heading: { family: 'Montserrat', weights: [400, 500, 600, 700] },
      body: { family: 'Inter', weights: [400, 500] },
    },
    cssOverrides: {
      '--color-accent': '#0369a1',
      '--color-accent-hover': '#075985',
      '--color-bg': '#f8fafc',
      '--font-heading': "'Lora', serif",
      '--font-body': "'Inter', system-ui, sans-serif",
    
      '--container-default': '768px',},
    homeSections: [
      'hero::klinik_kurumsal',
      'services::klinik_kurumsal',
      'team::klinik_kurumsal',
      'faq::klinik_kurumsal',
      'faq::simple'
    ],
    pages: ['home', 'hizmetler', 'kadro', 'iletisim'],
    sectorSections: ['services', 'team', 'faq', 'accreditation'],
    animationLevel: 'framer-basic',
    demoBusinessKey: 'kurumsal',
  },
  {
    id: 'klinik-modern',
    name: 'Klinik Modern',
    sectorId: 'klinik',
    plan: 'growth',
    description: 'Neumorphism (Soft UI) estetiği. Teknolojik ve yenilikçi hissettiren pürüzsüz arayüz tasarımı.',
    designPhilosophy: 'Keskin hatlar yerine yumuşak gölgelerle oluşturulmuş pürüzsüz kartlar.',
    isDark: false,
    fonts: {
      heading: { family: 'Playfair Display', weights: [500, 600, 700] },
      body: { family: 'Nunito', weights: [400, 600] },
    },
    cssOverrides: {
      '--color-accent': '#8b5cf6',
      '--color-accent-hover': '#7c3aed',
      '--color-bg': '#f3f4f6',
      '--font-heading': "'Poppins', sans-serif",
      '--font-body': "'Nunito', sans-serif",
    
      '--container-default': '1280px',},
    homeSections: [
      'hero::klinik_modern',
      'before_after::klinik_modern',
      'services::klinik_modern'
    ],
    pages: ['home', 'hizmetler', 'iletisim'],
    sectorSections: ['services', 'before_after', 'technology'],
    animationLevel: 'framer-full',
    demoBusinessKey: 'modern',
  },
  {
    id: 'klinik-estetik',
    name: 'Premium Estetik',
    sectorId: 'klinik',
    plan: 'pro',
    description: 'Lüks segment klinik tasarımı. Buzlu cam paneller, sinematik hareketler.',
    designPhilosophy: 'Glassmorphism. Zengin siyah arka plan ve zarif Serif tipografi.',
    isDark: true,
    fonts: {
      heading: { family: 'DM Sans', weights: [400, 500, 600, 700] },
      body: { family: 'Montserrat', weights: [300, 400, 500] },
    },
    cssOverrides: {
      '--color-accent': '#d4af37',
      '--color-accent-hover': '#f1c40f',
      '--color-bg': '#0f1115',
      '--font-heading': "'Cormorant Garamond', serif",
      '--font-body': "'Montserrat', sans-serif",
    
      '--container-default': '1280px',},
    homeSections: [
      'hero::klinik_estetik',
      'about::klinik_estetik',
      'services::klinik_estetik'
    ],
    pages: ['home', 'hizmetler', 'iletisim'],
    sectorSections: ['services', 'gallery', 'vip_consultation'],
    animationLevel: 'gsap-allowed',
    demoBusinessKey: 'estetik',
  },
  {
    id: 'klinik-vip',
    name: 'Klinik VIP',
    sectorId: 'klinik',
    plan: 'enterprise',
    description: 'Fütüristik ve teknolojik klinik imajı. Neon Cyan detaylar, keskin köşeler ve yüksek interaktivite.',
    designPhilosophy: 'Cyber-aesthetic. Karanlık yüzeyler üzerinde parlayan anatomik hotspotlar.',
    isDark: true,
    fonts: {
      heading: { family: 'Inter', weights: [500, 700, 800] },
      body: { family: 'Inter', weights: [300, 400, 500] },
    },
    cssOverrides: {
      '--color-accent': '#00ffcc',
      '--color-accent-hover': '#00ccaa',
      '--color-bg': '#000000',
      '--font-heading': "'Syne', sans-serif",
      '--font-body': "'Inter', sans-serif",
    
      '--container-default': '640px',},
    homeSections: [
      'hero::klinik_vip',
      'anatomy::klinik_vip',
      'services::klinik_vip'
    ],
    pages: ['home', 'harita', 'iletisim'],
    sectorSections: ['services', 'anatomy_hotspot', 'team_slider', 'vip_concierge'],
    animationLevel: 'gsap-full',
    demoBusinessKey: 'vip',
  }
]
