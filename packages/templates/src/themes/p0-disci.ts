/**
 * @kepenk/templates — P0 Dişçi Themes (5 themes)
 */

import type { P0ThemeDef } from './p0-themes'

export const DISCI_THEMES: P0ThemeDef[] = [
  {
    id: 'disci-gulus', name: 'Gülüş', sectorId: 'disci', plan: 'free',
    description: 'Teal dental klinik. Gülümseyen hasta, güven veren.',
    designPhilosophy: 'Teal yeşil sağlık ve tazelik. Smile gallery, korku azaltıcı bölüm, sigorta logoları.',
    isDark: false,
    fonts: { heading: { family: 'Nunito', weights: [600, 700, 800] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#0D9488', '--color-accent-hover': '#0F766E', '--color-accent-light': '#CCFBF1', '--color-surface': '#F0FDFA', '--font-heading': "'Nunito', sans-serif",
    },
    homeSections: ['hero::fullscreen_overlay', 'services::card_grid', 'smile_gallery', 'doctor_profile::split', 'booking::cta_only', 'map::full_width', 'contact::simple_form'],
    pages: ['home'], sectorSections: ['smile_gallery', 'fear_reducer', 'doctor_profile', 'insurance_logos', 'booking'], animationLevel: 'css-only', demoBusinessKey: 'gulus',
  },
  {
    id: 'disci-inci', name: 'İnci', sectorId: 'disci', plan: 'starter',
    description: 'Sky blue dental. Teknoloji vitrini, 5 before/after, FAQ.',
    designPhilosophy: 'Gökyüzü mavisi güven ve hijyen. Teknoloji showcase ile modern klinik imajı.',
    isDark: false,
    fonts: { heading: { family: 'Plus Jakarta Sans', weights: [500, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#0EA5E9', '--color-accent-hover': '#0284C7', '--font-heading': "'Plus Jakarta Sans', sans-serif",
    },
    homeSections: ['hero::split_left', 'services::card_grid', 'smile_gallery', 'technology_showcase', 'testimonials::carousel', 'faq::accordion', 'insurance_logos::grid', 'booking::inline_calendar', 'contact::split_form_map'],
    pages: ['home', 'tedaviler', 'iletisim'], sectorSections: ['smile_gallery', 'fear_reducer', 'technology_showcase', 'doctor_profile', 'insurance_logos', 'booking'], animationLevel: 'framer-basic', demoBusinessKey: 'inci',
  },
  {
    id: 'disci-parlak', name: 'Parlak', sectorId: 'disci', plan: 'growth',
    description: 'Lüks dental. Koyu, altın accent, gülüş tasarımı vurgusu.',
    designPhilosophy: 'Siyah-altın lüks dental. İnteraktif fiyat hesaplama ile şeffaflık.',
    isDark: true,
    fonts: { heading: { family: 'Rubik', weights: [400, 500, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#D4AF37', '--color-accent-hover': '#C9A22E', '--font-heading': "'Rubik', sans-serif",
    },
    homeSections: ['hero::video_cinematic', 'services::hover_reveal', 'smile_gallery', 'price_calculator::interactive', 'doctor_profile::carousel', 'stats::dark_bar', 'testimonials::marquee', 'gallery::horizontal_snap', 'booking::cta_only'],
    pages: ['home', 'tedaviler', 'galeri', 'iletisim'], sectorSections: ['smile_gallery', 'price_calculator', 'doctor_profile', 'insurance_logos', 'booking'], animationLevel: 'framer-full', demoBusinessKey: 'parlak',
  },
  {
    id: 'disci-klinik', name: 'Klinik', sectorId: 'disci', plan: 'pro',
    description: 'Dijital dental klinik. Mavi, search hero, blog rehberleri.',
    designPhilosophy: 'Mavi dijital güven. Search-centric hero ile tedavi arama. Blog ile eğitim.',
    isDark: false,
    fonts: { heading: { family: 'Spectral', weights: [400, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#2563EB', '--color-accent-hover': '#1D4ED8', '--font-heading': "'Spectral', serif",
    },
    homeSections: ['hero::search_centric', 'services::filtered_tabs', 'smile_gallery', 'doctor_profile::carousel', 'technology_showcase', 'price_calculator::table', 'blog_preview', 'testimonials::grid_cards', 'booking::inline_calendar'],
    pages: ['home', 'tedaviler', 'doktorlar', 'blog', 'iletisim'], sectorSections: ['smile_gallery', 'price_calculator', 'technology_showcase', 'doctor_profile', 'insurance_logos', 'booking'], animationLevel: 'gsap-allowed', demoBusinessKey: 'klinik',
  },
  {
    id: 'disci-dentgrup', name: 'DentGrup', sectorId: 'disci', plan: 'enterprise',
    description: 'Diş sağlığı zinciri. Kurumsal, dental turizm, franchise.',
    designPhilosophy: 'Syne kurumsal. Multi-location, dental turizm paketi, kariyer ve franchise.',
    isDark: false,
    fonts: { heading: { family: 'Manrope', weights: [500, 600, 700, 800] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#0D9488', '--color-accent-hover': '#0F766E', '--font-heading': "'Manrope', sans-serif", },
    homeSections: ['hero::video_showreel', 'quick_access_cards', 'services::filtered_tabs', 'multi_location', 'smile_gallery', 'doctor_profile::carousel', 'stats::dark_bar', 'testimonials::marquee', 'booking::inline_calendar', 'career_listings', 'franchise_section'],
    pages: ['home', 'tedaviler', 'doktorlar', 'subeler', 'dental-turizm', 'kariyer', 'bayilik', 'iletisim'], sectorSections: ['smile_gallery', 'doctor_profile', 'insurance_logos', 'booking', 'multi_location', 'career_listings', 'franchise_section', 'quick_access_cards'], animationLevel: 'gsap-allowed', demoBusinessKey: 'dentgrup',
  },
]
