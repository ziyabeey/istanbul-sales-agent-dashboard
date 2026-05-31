/**
 * @kepenk/templates — P0 Oto Tamir Themes (5 themes)
 */

import type { P0ThemeDef } from './p0-themes'

export const OTO_THEMES: P0ThemeDef[] = [
  {
    id: 'oto-usta', name: 'Usta', sectorId: 'oto', plan: 'free',
    description: 'Güvenilir oto servis. Kırmızı-beyaz, acil servis bandı.',
    designPhilosophy: 'Kırmızı aciliyet ve enerji. Outfit heading — modern, teknik. Emergency banner en üstte. Dev telefon numarası.',
    isDark: false,
    fonts: { heading: { family: 'Outfit', weights: [500, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#DC2626', '--color-accent-hover': '#B91C1C', '--font-heading': "'Outfit', sans-serif",
    },
    homeSections: ['emergency_banner', 'hero::fullscreen_overlay', 'services::card_grid', 'vehicle_brands::row', 'warranty_badge::row', 'working_hours::compact', 'map::full_width', 'contact::simple_form'],
    pages: ['home'], sectorSections: ['emergency_banner', 'vehicle_brands', 'warranty_badge'], animationLevel: 'css-only', demoBusinessKey: 'usta',
  },
  {
    id: 'oto-garaj', name: 'Garaj', sectorId: 'oto', plan: 'starter',
    description: 'Endüstriyel oto. Koyu, sarı-siyah, şeffaf fiyat.',
    designPhilosophy: 'Sarı-siyah endüstriyel. Şeffaf fiyat listesi güven inşa eder.',
    isDark: true,
    fonts: { heading: { family: 'Archivo Black', weights: [400] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#EAB308', '--color-accent-hover': '#CA8A04', '--color-text-on-accent': '#000000', '--color-bg': '#111111', '--font-heading': "'Archivo Black', sans-serif",
    },
    homeSections: ['emergency_banner', 'hero::fullscreen_overlay', 'services::card_grid', 'process_steps::horizontal_timeline', 'work_before_after', 'testimonials::carousel', 'service_area::list_only', 'warranty_badge::row', 'contact::split_form_map'],
    pages: ['home', 'hizmetler', 'iletisim'], sectorSections: ['emergency_banner', 'vehicle_brands', 'warranty_badge', 'service_area', 'work_before_after'], animationLevel: 'framer-basic', demoBusinessKey: 'garaj',
  },
  {
    id: 'oto-pitstop', name: 'PitStop', sectorId: 'oto', plan: 'growth',
    description: 'Express servis. Koyu, kırmızı, video hero, proje türü seçici.',
    designPhilosophy: 'Kırmızı-siyah yarış hissi. Video hero mekanik çalışırken. Proje türü seçici ile hızlı yönlendirme.',
    isDark: true,
    fonts: { heading: { family: 'Syne', weights: [600, 700, 800] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#EF4444', '--color-accent-hover': '#DC2626', '--font-heading': "'Syne', sans-serif",
    },
    homeSections: ['emergency_banner', 'hero::video_cinematic', 'project_type_selector', 'services::hover_reveal', 'stats::dark_bar', 'gallery::masonry', 'testimonials::marquee', 'warranty_badge::row', 'cta::full_width_banner'],
    pages: ['home', 'hizmetler', 'galeri', 'iletisim'], sectorSections: ['emergency_banner', 'vehicle_brands', 'warranty_badge', 'project_type_selector'], animationLevel: 'framer-full', demoBusinessKey: 'pitstop',
  },
  {
    id: 'oto-motor', name: 'Motor', sectorId: 'oto', plan: 'pro',
    description: 'Premium detailing. Koyu, mavi, lüks marka odaklı.',
    designPhilosophy: 'Mavi premium his. Asimetrik editoryal galeri. BMW, Mercedes gibi lüks marka odaklı.',
    isDark: true,
    fonts: { heading: { family: 'IBM Plex Sans', weights: [500, 600, 700] }, body: { family: 'DM Sans', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#2563EB', '--color-accent-hover': '#1D4ED8', '--font-heading': "'IBM Plex Sans', sans-serif", '--font-body': "'DM Sans', sans-serif",
    },
    homeSections: ['hero::oto_bespoke_hero', 'services::oto_bespoke_services', 'about::oto_bespoke_about', 'contact::oto_bespoke_contact'],
    pages: ['home'], sectorSections: ['vehicle_brands', 'warranty_badge', 'before_after'], animationLevel: 'gsap-allowed', demoBusinessKey: 'motor',
  },
  {
    id: 'oto-filo', name: 'Filo', sectorId: 'oto', plan: 'enterprise',
    description: 'Oto servis ağı. Kurumsal, filo anlaşması, franchise.',
    designPhilosophy: 'Syne kurumsal güç. Multi-location ağ. Filo anlaşması, kariyer, franchise.',
    isDark: false,
    fonts: { heading: { family: 'Bebas Neue', weights: [400] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#DC2626', '--color-accent-hover': '#B91C1C', '--font-heading': "'Bebas Neue', sans-serif", },
    homeSections: ['emergency_banner', 'hero::video_showreel', 'quick_access_cards', 'services::filtered_tabs', 'multi_location', 'corporate_membership', 'stats::dark_bar', 'career_listings', 'franchise_section'],
    pages: ['home', 'hizmetler', 'subeler', 'filo', 'kariyer', 'bayilik', 'iletisim'], sectorSections: ['emergency_banner', 'vehicle_brands', 'warranty_badge', 'multi_location', 'career_listings', 'franchise_section', 'corporate_membership', 'quick_access_cards'], animationLevel: 'gsap-allowed', demoBusinessKey: 'filo',
  },
]
