/**
 * @kepenk/templates — P0 Güzellik Themes (5 themes)
 */

import type { P0ThemeDef } from './p0-themes'

export const GUZELLIK_THEMES: P0ThemeDef[] = [
  {
    id: 'guzellik-dogal', name: 'Doğal', sectorId: 'guzellik', plan: 'free',
    description: 'Doğal güzellik salonu. Nude tonlar, minimal.',
    designPhilosophy: 'Nude/pembe tonlar doğallık ve feminenlik. Nunito sıcak ve yuvarlak. Sade ama zarif.',
    isDark: false,
    fonts: { heading: { family: 'Quicksand', weights: [500, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#D4A89A', '--color-accent-hover': '#C49080', '--color-bg': '#FFFBF8', '--color-surface': '#FFF5F0', '--font-heading': "'Quicksand', sans-serif",
    },
    homeSections: ['hero::fullscreen_overlay', 'services::card_grid', 'about::split_left', 'working_hours::compact', 'map::full_width', 'contact::simple_form'],
    pages: ['home'], sectorSections: ['before_after', 'booking'], animationLevel: 'css-only', demoBusinessKey: 'dogal',
  },
  {
    id: 'guzellik-pembe', name: 'Pembe', sectorId: 'guzellik', plan: 'starter',
    description: 'Butik güzellik. Pembe accent, carousel hero, before/after slider.',
    designPhilosophy: 'Pembe enerji ve feminen güç. Before/after slider ile sonuçları göster. Hediye kartı CTA.',
    isDark: false,
    fonts: { heading: { family: 'Plus Jakarta Sans', weights: [500, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#EC4899', '--color-accent-hover': '#DB2777', '--color-bg': '#FFF5F7', '--color-surface': '#FFF0F3', '--font-heading': "'Plus Jakarta Sans', sans-serif",
    },
    homeSections: ['hero::soft_carousel', 'services::card_grid', 'before_after::slider', 'gallery::masonry', 'testimonials::carousel', 'booking::inline_calendar', 'cta::full_width_banner', 'working_hours::compact', 'contact::split_form_map'],
    pages: ['home', 'hizmetler', 'iletisim'], sectorSections: ['before_after', 'booking'], animationLevel: 'framer-basic', demoBusinessKey: 'pembe',
  },
  {
    id: 'guzellik-noir', name: 'Noir', sectorId: 'guzellik', plan: 'growth',
    description: 'Premium güzellik lounge. Siyah-altın, koyu lüks.',
    designPhilosophy: 'Siyah arka plan + altın accent — lüksün dili. Video hero, dramatik aydınlatma. Koyu portfolyo.',
    isDark: true,
    fonts: { heading: { family: 'Playfair Display', weights: [400, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#C9A84C', '--color-accent-hover': '#B8952F', '--color-text-on-accent': '#000000', '--font-heading': "'Playfair Display', serif",
    },
    homeSections: ['hero::video_cinematic', 'services::hover_reveal', 'before_after::curtain_reveal', 'gallery::horizontal_snap', 'team::mono_to_color', 'stats::dark_bar', 'testimonials::marquee', 'booking::cta_only'],
    pages: ['home', 'hizmetler', 'galeri', 'ekip', 'iletisim'], sectorSections: ['before_after', 'booking'], animationLevel: 'framer-full', demoBusinessKey: 'noir',
  },
  {
    id: 'guzellik-atolye', name: 'Atölye', sectorId: 'guzellik', plan: 'pro',
    description: 'Sanatçı güzellik atölyesi. Editoryal layout, serif, minimalist.',
    designPhilosophy: 'Güzellik bir sanattır. Cormorant Garamond editoryal zarif. Ken Burns zoom, dergi layout.',
    isDark: false,
    fonts: { heading: { family: 'Cormorant Garamond', weights: [400, 600, 700] }, body: { family: 'DM Sans', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#1A1A1A', '--color-accent-hover': '#374151', '--font-heading': "'Cormorant Garamond', serif", '--font-body': "'DM Sans', sans-serif", },
    homeSections: ['hero::guzellik_bespoke_hero', 'services::guzellik_bespoke_services', 'about::guzellik_bespoke_about', 'contact::guzellik_bespoke_contact'],
    pages: ['home'], sectorSections: ['before_after', 'booking'], animationLevel: 'gsap-allowed', demoBusinessKey: 'atolye',
  },
  {
    id: 'guzellik-glamour', name: 'Glamour', sectorId: 'guzellik', plan: 'enterprise',
    description: 'Güzellik zinciri. Magenta, çoklu şube, gelin paketi, franchise.',
    designPhilosophy: 'Syne kurumsal güç. Magenta enerji. Promo carousel, sadakat kartı, bayilik.',
    isDark: false,
    fonts: { heading: { family: 'Josefin Sans', weights: [400, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#BE185D', '--color-accent-hover': '#9D174D', '--font-heading': "'Josefin Sans', sans-serif", },
    homeSections: ['hero::promo_carousel', 'quick_access_cards', 'services::filtered_tabs', 'multi_location', 'wedding_packages', 'testimonials::grid_cards', 'loyalty_program', 'career_listings', 'franchise_section'],
    pages: ['home', 'hizmetler', 'subeler', 'gelin', 'kariyer', 'bayilik', 'iletisim'], sectorSections: ['before_after', 'booking', 'wedding_packages', 'multi_location', 'career_listings', 'franchise_section', 'loyalty_program', 'quick_access_cards'], animationLevel: 'gsap-allowed', demoBusinessKey: 'glamour',
  },
]
