/**
 * @kepenk/templates — P1 Kafe Themes (5 themes)
 */
import type { P0ThemeDef } from './p0-themes'

export const KAFE_THEMES: P0ThemeDef[] = [
  {
    id: 'kafe-fincan', name: 'Fincan', sectorId: 'kafe', plan: 'free',
    description: 'Mahalle kahvecisi. Kahverengi-krem, sıcak, WiFi dostu.',
    designPhilosophy: 'Kahve kahverengisi sıcaklık. Lora serif samimi. WiFi badge, çalışma dostu ortam.',
    isDark: false,
    fonts: { heading: { family: 'Lora', weights: [400, 700] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#6F4E37', '--color-accent-hover': '#5A3E2C', '--color-bg': '#FFFBF7', '--color-surface': '#F5F0EB', '--font-heading': "'Lora', serif",
    },
    homeSections: ['hero::fullscreen_overlay', 'menu_display::coffee_notes', 'about::split_left', 'daily_special::banner', 'working_hours::compact', 'map::full_width', 'contact::simple_form'],
    pages: ['home'], sectorSections: ['menu_display', 'daily_special'], animationLevel: 'css-only', demoBusinessKey: 'fincan',
  },
  {
    id: 'kafe-cekirdek', name: 'Çekirdek', sectorId: 'kafe', plan: 'starter',
    description: '3. dalga kahveci. Serif heading, latte art galeri.',
    designPhilosophy: 'DM Serif Display vintage kahve kültürü. Kahve tat notları detaylı. Latte art galeri.',
    isDark: false,
    fonts: { heading: { family: 'DM Serif Display', weights: [400] }, body: { family: 'DM Sans', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#8B5E34', '--color-accent-hover': '#724C2A', '--color-bg': '#FAF8F3', '--font-heading': "'DM Serif Display', serif", '--font-body': "'DM Sans', sans-serif",
    },
    homeSections: ['hero::fullscreen_overlay', 'menu_display::coffee_notes', 'gallery::masonry', 'testimonials::carousel', 'instagram_feed', 'newsletter', 'working_hours::compact', 'contact::split_form_map'],
    pages: ['home', 'menu', 'iletisim'], sectorSections: ['menu_display', 'daily_special'], animationLevel: 'framer-basic', demoBusinessKey: 'cekirdek',
  },
  {
    id: 'kafe-bohem', name: 'Bohem', sectorId: 'kafe', plan: 'growth',
    description: 'Kültür kafesi. Koyu, altın, etkinlik takvimi, canlı müzik.',
    designPhilosophy: 'Koyu atmosfer, altın accent. Playfair Display kültürel derinlik. Etkinlik takvimi kritik.',
    isDark: true,
    fonts: { heading: { family: 'Playfair Display', weights: [400, 600, 700] }, body: { family: 'Source Sans 3', weights: [400, 600] } },
    cssOverrides: { '--color-accent': '#D4A03C', '--color-accent-hover': '#C4902C', '--font-heading': "'Playfair Display', serif", '--font-body': "'Source Sans 3', sans-serif",
    },
    homeSections: ['hero::video_cinematic', 'menu_display::drink_menu', 'gallery::horizontal_snap', 'class_schedule', 'testimonials::marquee', 'instagram_feed', 'cta::full_width_banner'],
    pages: ['home', 'menu', 'etkinlikler', 'galeri', 'iletisim'], sectorSections: ['menu_display', 'class_schedule'], animationLevel: 'framer-full', demoBusinessKey: 'bohem',
  },
  {
    id: 'kafe-brew', name: 'Brew', sectorId: 'kafe', plan: 'pro',
    description: 'Kavurma atölyesi. Bakır accent, süreç hikayeleri, e-ticaret.',
    designPhilosophy: 'Bakır sıcaklık + zanaatçılık. Cormorant Garamond lüks kahve deneyimi. Process steps ve blog.',
    isDark: false,
    fonts: { heading: { family: 'Cormorant Garamond', weights: [400, 600, 700] }, body: { family: 'DM Sans', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#B87333', '--color-accent-hover': '#A06328', '--font-heading': "'Cormorant Garamond', serif", '--font-body': "'DM Sans', sans-serif",
    },
    homeSections: ['hero::fullscreen_kenburns', 'philosophy', 'process_steps::horizontal_timeline', 'menu_display::coffee_notes', 'team::full_page_snap', 'blog_preview', 'awards_press', 'newsletter', 'contact::split_form_map'],
    pages: ['home', 'menu', 'hikaye', 'blog', 'magaza', 'iletisim'], sectorSections: ['menu_display', 'daily_special', 'awards_press'], animationLevel: 'gsap-allowed', demoBusinessKey: 'brew',
  },
  {
    id: 'kafe-blend', name: 'Blend', sectorId: 'kafe', plan: 'enterprise',
    description: 'Kahve zinciri. Kurumsal, 8 şube, sadakat kartı, franchise.',
    designPhilosophy: 'Syne kurumsal. Multi-location, loyalty program, franchise. Promo carousel.',
    isDark: false,
    fonts: { heading: { family: 'Manrope', weights: [500, 600, 700, 800] }, body: { family: 'Inter', weights: [400, 500] } },
    cssOverrides: { '--color-accent': '#92400E', '--color-accent-hover': '#7C3510', '--font-heading': "'Manrope', sans-serif", },
    homeSections: ['hero::promo_carousel', 'quick_access_cards', 'menu_display::visual_grid', 'multi_location', 'loyalty_program', 'franchise_section', 'career_listings'],
    pages: ['home', 'menu', 'subeler', 'bayilik', 'kariyer', 'iletisim'], sectorSections: ['menu_display', 'multi_location', 'loyalty_program', 'franchise_section', 'career_listings', 'quick_access_cards'], animationLevel: 'gsap-allowed', demoBusinessKey: 'blend',
  },
]
