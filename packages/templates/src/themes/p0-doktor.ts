/**
 * @kepenk/templates — P0 Doktor Themes (5 themes)
 */

import type { P0ThemeDef } from './p0-themes'

export const DOKTOR_THEMES: P0ThemeDef[] = [
  {
    id: 'doktor-huzur', name: 'Huzur', sectorId: 'doktor', plan: 'free',
    description: 'Güven veren tıp teması. Mavi-beyaz, sakin.',
    designPhilosophy: 'Sağlık mavisi güven verir. Nunito yuvarlak, sıcak. Tek sayfa, doktor profili ön planda.',
    isDark: false,
    fonts: { heading: { family: 'Nunito', weights: [600, 700, 800] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: {
      '--color-accent': '#0077B6', '--color-accent-hover': '#005E8A', '--color-accent-light': '#E0F2FE',
      '--color-surface': '#F0F7FB', '--font-heading': "'Nunito', sans-serif",
    },
    homeSections: ['hero::image_card', 'services::card_grid', 'doctor_profile::split', 'insurance_logos::row', 'booking::cta_only', 'working_hours::compact', 'map::full_width', 'contact::simple_form'],
    pages: ['home'], sectorSections: ['doctor_profile', 'insurance_logos', 'booking'], animationLevel: 'css-only', demoBusinessKey: 'huzur',
  },
  {
    id: 'doktor-sifa', name: 'Şifa', sectorId: 'doktor', plan: 'starter',
    description: 'Çok branşlı tıp merkezi. Yeşil, güvenilir.',
    designPhilosophy: 'Yeşil sağlık ve doğallık. Çoklu doktor carousel, sigorta logoları, online randevu.',
    isDark: false,
    fonts: { heading: { family: 'IBM Plex Sans', weights: [500, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#059669', '--color-accent-hover': '#047857', '--color-accent-light': '#D1FAE5', '--font-heading': "'IBM Plex Sans', sans-serif",
    },
    homeSections: ['hero::split_left', 'services::card_grid', 'team::carousel', 'testimonials::carousel', 'faq::accordion', 'insurance_logos::grid', 'booking::inline_calendar', 'working_hours::compact', 'contact::split_form_map'],
    pages: ['home', 'hizmetler', 'iletisim'], sectorSections: ['doctor_profile', 'insurance_logos', 'booking'], animationLevel: 'framer-basic', demoBusinessKey: 'sifa',
  },
  {
    id: 'doktor-otorite', name: 'Otorite', sectorId: 'doktor', plan: 'growth',
    description: 'Akademik doktor profili. Koyu lacivert, video tanıtım.',
    designPhilosophy: 'Lacivert akademik ciddiyet. Video klinik tanıtımı. Detaylı hekim profili — yayınlar, kongreler.',
    isDark: false,
    fonts: { heading: { family: 'Source Serif 4', weights: [400, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#1E3A5F', '--color-accent-hover': '#152D4A', '--font-heading': "'Source Serif 4', serif",
    },
    homeSections: ['hero::video_cinematic', 'doctor_profile::split', 'services::card_grid', 'technology_showcase', 'stats::animated_row', 'testimonials::editorial_single', 'blog_preview', 'awards_press', 'booking::inline_calendar'],
    pages: ['home', 'hizmetler', 'hakkimizda', 'blog', 'iletisim'], sectorSections: ['doctor_profile', 'insurance_logos', 'booking', 'technology_showcase', 'awards_press'], animationLevel: 'framer-full', demoBusinessKey: 'otorite',
  },
  {
    id: 'doktor-vita', name: 'Vita', sectorId: 'doktor', plan: 'pro',
    description: 'Dijital-first sağlık merkezi. Mor, online konsültasyon vurgusu.',
    designPhilosophy: 'Mor dijital modernlik. Search-centric hero. Online randevu ve telekonsültasyon ön planda.',
    isDark: false,
    fonts: { heading: { family: 'Plus Jakarta Sans', weights: [500, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#7C3AED', '--color-accent-hover': '#6D28D9', '--font-heading': "'Plus Jakarta Sans', sans-serif",
    },
    homeSections: ['hero::search_centric', 'services::card_grid', 'online_offline_toggle', 'doctor_profile::carousel', 'price_calculator::table', 'testimonials::grid_cards', 'blog_preview', 'newsletter', 'booking::inline_calendar'],
    pages: ['home', 'hizmetler', 'doktorlar', 'blog', 'iletisim'], sectorSections: ['doctor_profile', 'insurance_logos', 'booking', 'online_offline_toggle', 'price_calculator'], animationLevel: 'gsap-allowed', demoBusinessKey: 'vita',
  },
  {
    id: 'doktor-merkez', name: 'Merkez', sectorId: 'doktor', plan: 'enterprise',
    description: 'Hastane/sağlık grubu. Kurumsal mavi, çoklu şube, kariyer.',
    designPhilosophy: 'Kurumsal mavi güven. Departman arama hero. Multi-location, kariyer, acil servis bandı.',
    isDark: false,
    fonts: { heading: { family: 'Manrope', weights: [500, 600, 700, 800] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#1E40AF', '--color-accent-hover': '#1E3A8A', '--font-heading': "'Manrope', sans-serif", },
    homeSections: ['emergency_banner', 'hero::search_centric', 'quick_access_cards', 'services::filtered_tabs', 'multi_location', 'team::filterable_grid', 'stats::dark_bar', 'testimonials::grid_cards', 'career_listings'],
    pages: ['home', 'bolumler', 'doktorlar', 'subeler', 'kariyer', 'iletisim'], sectorSections: ['doctor_profile', 'insurance_logos', 'booking', 'multi_location', 'career_listings', 'emergency_banner', 'quick_access_cards'], animationLevel: 'gsap-allowed', demoBusinessKey: 'merkez',
  },
]
