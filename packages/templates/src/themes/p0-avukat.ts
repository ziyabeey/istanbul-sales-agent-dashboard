/**
 * @kepenk/templates — P0 Avukat Themes (5 themes)
 */

import type { P0ThemeDef } from './p0-themes'

export const AVUKAT_THEMES: P0ThemeDef[] = [
  {
    id: 'avukat-adalet', name: 'Adalet', sectorId: 'avukat', plan: 'free',
    description: 'Tek avukat profili. Lacivert-beyaz, ciddi ve güvenilir.',
    designPhilosophy: 'Source Serif 4 başlıklarda hukuki ciddiyet. Lacivert güven. Çalışma alanları ön planda.',
    isDark: false,
    fonts: { heading: { family: 'Source Serif 4', weights: [400, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#1E3A5F', '--color-accent-hover': '#152D4A', '--font-heading': "'Source Serif 4', serif",
    },
    homeSections: ['hero::fullscreen_overlay', 'practice_areas::card_grid', 'confidentiality::banner', 'about::split_left', 'working_hours::compact', 'map::full_width', 'contact::simple_form'],
    pages: ['home'], sectorSections: ['practice_areas', 'confidentiality'], animationLevel: 'css-only', demoBusinessKey: 'adalet',
  },
  {
    id: 'avukat-savunma', name: 'Savunma', sectorId: 'avukat', plan: 'starter',
    description: 'Hukuk bürosu. Lacivert, ekip, süreç adımları.',
    designPhilosophy: 'Ekip profilleri ve süreç adımları güven inşa eder. Dava sonuçları ile kanıt.',
    isDark: false,
    fonts: { heading: { family: 'Libre Baskerville', weights: [400, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#1E3A5F', '--color-accent-hover': '#152D4A', '--font-heading': "'Libre Baskerville', serif",
    },
    homeSections: ['hero::split_left', 'practice_areas::card_grid', 'case_results::stats_row', 'team::card_horizontal', 'testimonials::carousel', 'faq::accordion', 'process_steps::horizontal_timeline', 'confidentiality::banner', 'contact::split_form_map'],
    pages: ['home', 'hizmetler', 'iletisim'], sectorSections: ['practice_areas', 'case_results', 'confidentiality'], animationLevel: 'framer-basic', demoBusinessKey: 'savunma',
  },
  {
    id: 'avukat-kanun', name: 'Kanun', sectorId: 'avukat', plan: 'growth',
    description: 'Agresif hukuk firması. Koyu lacivert, altın, rakam odaklı.',
    designPhilosophy: 'Koyu lacivert otorite. Altın accent lüks. Büyük tazminat rakamları güç gösterir.',
    isDark: true,
    fonts: { heading: { family: 'Syne', weights: [600, 700, 800] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#D4AF37', '--color-accent-hover': '#C9A22E', '--color-bg': '#0A0A14', '--font-heading': "'Syne', sans-serif",
    },
    homeSections: ['hero::video_cinematic', 'stats::dark_bar', 'practice_areas::card_grid', 'case_results::stats_row', 'team::mono_to_color', 'confidentiality::banner', 'testimonials::marquee', 'cta::full_width_banner', 'contact::split_form_map'],
    pages: ['home', 'hizmetler', 'ekip', 'iletisim'], sectorSections: ['practice_areas', 'case_results', 'confidentiality'], animationLevel: 'framer-full', demoBusinessKey: 'kanun',
  },
  {
    id: 'avukat-kursu', name: 'Kürsü', sectorId: 'avukat', plan: 'pro',
    description: 'Akademik avukatlık ortaklığı. Bordo, serif editoryal.',
    designPhilosophy: 'Cormorant Garamond akademik derinlik. Bordo otoriterlik. Yayınlar, makaleler, blog.',
    isDark: false,
    fonts: { heading: { family: 'Cormorant Garamond', weights: [400, 600, 700] }, body: { family: 'DM Sans', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#7F1D1D', '--color-accent-hover': '#6B1717', '--font-heading': "'Cormorant Garamond', serif", '--font-body': "'DM Sans', sans-serif",
    },
    homeSections: ['hero::fullscreen_kenburns', 'philosophy', 'practice_areas::card_grid', 'case_results::stats_row', 'team::full_page_snap', 'blog_preview', 'awards_press', 'social_proof', 'testimonials::editorial_single', 'contact::split_form_map'],
    pages: ['home', 'hizmetler', 'ekip', 'hakkimizda', 'blog', 'iletisim'], sectorSections: ['practice_areas', 'case_results', 'confidentiality', 'awards_press'], animationLevel: 'gsap-allowed', demoBusinessKey: 'kursu',
  },
  {
    id: 'avukat-kuresel', name: 'Küresel', sectorId: 'avukat', plan: 'enterprise',
    description: 'Uluslararası hukuk firması. Kurumsal, çoklu ofis, kariyer.',
    designPhilosophy: 'Syne kurumsal güç. Çok şehirli ofisler, departman bazlı ekip filtresi.',
    isDark: false,
    fonts: { heading: { family: 'Archivo', weights: [500, 600, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#1E3A5F', '--color-accent-hover': '#152D4A', '--font-heading': "'Archivo', sans-serif", },
    homeSections: ['hero::video_cinematic', 'quick_access_cards', 'practice_areas::card_grid', 'multi_location', 'team::filterable_grid', 'case_results::stats_row', 'career_listings', 'contact::split_form_map'],
    pages: ['home', 'hizmetler', 'ofisler', 'ekip', 'kariyer', 'iletisim'], sectorSections: ['practice_areas', 'case_results', 'confidentiality', 'multi_location', 'career_listings', 'quick_access_cards'], animationLevel: 'gsap-allowed', demoBusinessKey: 'kuresel',
  },
]
