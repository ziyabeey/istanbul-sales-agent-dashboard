/**
 * @kepenk/templates — P0 Spor Themes (5 themes)
 */

import type { P0ThemeDef } from './p0-themes'

export const SPOR_THEMES: P0ThemeDef[] = [
  {
    id: 'spor-form', name: 'Form', sectorId: 'spor', plan: 'free',
    description: 'Genel fitness salonu. Mor-beyaz, ders programı, 3 üyelik paketi.',
    designPhilosophy: 'Mor enerji ve motivasyon. Outfit heading — modern, atletik. Membership pricing ön planda.',
    isDark: false,
    fonts: { heading: { family: 'Outfit', weights: [500, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#7C3AED', '--color-accent-hover': '#6D28D9', '--font-heading': "'Outfit', sans-serif",
    },
    homeSections: ['hero::fullscreen_overlay', 'services::card_grid', 'class_schedule::day_tabs', 'membership_pricing::columns', 'about::split_left', 'working_hours::compact', 'map::full_width', 'contact::simple_form'],
    pages: ['home'], sectorSections: ['class_schedule', 'membership_pricing'], animationLevel: 'css-only', demoBusinessKey: 'form',
  },
  {
    id: 'spor-nabiz', name: 'Nabız', sectorId: 'spor', plan: 'starter',
    description: 'Topluluk spor kulübü. Mor, video hero, eğitmen profilleri.',
    designPhilosophy: 'Topluluk gücü. Grup ders fotoğrafları, eğitmen profilleri, dönüşüm hikayeleri ile sosyal kanıt.',
    isDark: false,
    fonts: { heading: { family: 'Anton', weights: [400] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#7C3AED', '--color-accent-hover': '#6D28D9', '--color-surface': '#F5F3FF', '--font-heading': "'Anton', sans-serif",
    },
    homeSections: ['hero::video_cinematic', 'services::card_grid', 'class_schedule::table', 'trainer_profile', 'transformation::carousel', 'testimonials::carousel', 'membership_pricing::columns', 'instagram_feed', 'contact::split_form_map'],
    pages: ['home', 'dersler', 'egitmenler', 'iletisim'], sectorSections: ['class_schedule', 'membership_pricing', 'trainer_profile', 'transformation'], animationLevel: 'framer-basic', demoBusinessKey: 'nabiz',
  },
  {
    id: 'spor-demir', name: 'Demir', sectorId: 'spor', plan: 'growth',
    description: 'CrossFit/hardcore gym. Koyu, kırmızı, WOD, büyük rakamlar.',
    designPhilosophy: 'Kırmızı-siyah hardcore. Syne heading — güçlü, agresif. WOD section, büyük rakam istatistikler.',
    isDark: true,
    fonts: { heading: { family: 'Syne', weights: [600, 700, 800] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#EF4444', '--color-accent-hover': '#DC2626', '--font-heading': "'Syne', sans-serif",
    },
    homeSections: ['hero::video_cinematic', 'workout_of_day', 'services::hover_reveal', 'transformation::carousel', 'stats::dark_bar', 'class_schedule::table', 'trainer_profile', 'testimonials::marquee', 'membership_pricing::columns', 'cta::full_width_banner'],
    pages: ['home', 'wod', 'dersler', 'egitmenler', 'iletisim'], sectorSections: ['class_schedule', 'membership_pricing', 'trainer_profile', 'transformation', 'workout_of_day'], animationLevel: 'framer-full', demoBusinessKey: 'demir',
  },
  {
    id: 'spor-denge', name: 'Denge', sectorId: 'spor', plan: 'pro',
    description: 'Yoga & Wellness. Sage yeşil, sakin, Cormorant serif, doğa.',
    designPhilosophy: 'Sage yeşil huzur ve denge. Cormorant Garamond zarif. Ken Burns doğa/yoga. Mindfulness blogu.',
    isDark: false,
    fonts: { heading: { family: 'Montserrat', weights: [500, 600, 700, 800] }, body: { family: 'DM Sans', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#5E7754', '--color-accent-hover': '#4A6040', '--color-bg': '#FAFBF5', '--color-surface': '#F2F5E8', '--font-heading': "'Montserrat', sans-serif", '--font-body': "'DM Sans', sans-serif",
    },
    homeSections: ['hero::fullscreen_kenburns', 'philosophy', 'services::editorial_zigzag', 'class_schedule::table', 'trainer_profile', 'testimonials::editorial_single', 'blog_preview', 'free_trial::banner', 'membership_pricing::toggle', 'contact::split_form_map'],
    pages: ['home', 'dersler', 'egitmenler', 'blog', 'magaza', 'iletisim'], sectorSections: ['class_schedule', 'membership_pricing', 'trainer_profile', 'free_trial'], animationLevel: 'gsap-allowed', demoBusinessKey: 'denge',
  },
  {
    id: 'spor-arena', name: 'Arena', sectorId: 'spor', plan: 'enterprise',
    description: 'Spor zinciri. Mor, video showreel, 5 şube, sadakat, franchise.',
    designPhilosophy: 'Syne kurumsal güç. Multi-location ağ, kurumsal üyelik, sadakat programı.',
    isDark: false,
    fonts: { heading: { family: 'Bebas Neue', weights: [400] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#7C3AED', '--color-accent-hover': '#6D28D9', '--font-heading': "'Bebas Neue', sans-serif", },
    homeSections: ['hero::video_showreel', 'quick_access_cards', 'services::filtered_tabs', 'multi_location', 'class_schedule::table', 'trainer_profile', 'loyalty_program', 'corporate_membership', 'career_listings', 'franchise_section'],
    pages: ['home', 'dersler', 'egitmenler', 'subeler', 'uyelik', 'kariyer', 'bayilik', 'iletisim'], sectorSections: ['class_schedule', 'membership_pricing', 'trainer_profile', 'multi_location', 'career_listings', 'franchise_section', 'loyalty_program', 'corporate_membership', 'quick_access_cards'], animationLevel: 'gsap-allowed', demoBusinessKey: 'arena',
  },
]
