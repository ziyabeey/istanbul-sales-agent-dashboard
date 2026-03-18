/**
 * @kepenk/templates — Sprint Plan + Prompt Templates + Deployment Config
 * File 8/8 — Sprint T-01→T-40, Opus prompt workflow, Firestore schema, Cloudflare deploy
 */

// ═══ SPRINT PLAN ═══

export interface SprintDef {
  id: string
  sectorId: string
  sectorName: string
  priority: 'P0' | 'P1' | 'P2' | 'P3'
  weeks: number
  newSections: string[]
  reusePercent: number
  themes: string[]          // 5 theme IDs per sprint
  dependencies: string[]    // sprint IDs that must complete first
}

export const SPRINT_PLAN: SprintDef[] = [
  // ═══ P0 — Foundation (13 hafta) ═══
  { id: 'T-01', sectorId: 'berber', sectorName: 'Berber & Kuaför', priority: 'P0', weeks: 2,
    newSections: ['before_after::slider', 'booking::inline_calendar', 'booking::cta_only', 'header::minimal_sticky', 'header::dark_glass', 'header::luxury_centered', 'header::corporate_mega', 'hero::fullscreen_overlay', 'hero::split_left', 'hero::video_cinematic', 'hero::fullscreen_kenburns', 'hero::video_showreel', 'services::card_grid', 'services::hover_reveal', 'services::sticky_scroll', 'about::split_left', 'team::card_horizontal', 'team::mono_to_color', 'team::full_page_snap', 'team::filterable_grid', 'gallery::masonry', 'gallery::horizontal_snap', 'testimonials::carousel', 'testimonials::marquee', 'testimonials::editorial_single', 'faq::accordion', 'contact::simple_form', 'contact::split_form_map', 'map::full_width', 'working_hours::compact', 'stats::animated_row', 'stats::dark_bar', 'footer::minimal', 'footer::dark_columns', 'footer::luxury_minimal', 'footer::corporate_mega', 'whatsapp_cta::floating', 'cookie_banner::bottom_bar', 'cta::full_width_banner', 'philosophy', 'social_proof', 'blog_preview', 'awards_press', 'quick_access_cards', 'multi_location', 'portfolio_grid::filtered_categories', 'promotions', 'loyalty_program', 'career_listings', 'franchise_section'],
    reusePercent: 0, themes: ['berber-sade', 'berber-klasik', 'berber-blade', 'berber-gentleman', 'berber-studio'], dependencies: [] },
  { id: 'T-02', sectorId: 'restoran', sectorName: 'Restoran', priority: 'P0', weeks: 2,
    newSections: ['menu_display::tab_categories', 'menu_display::visual_grid', 'reservation', 'daily_special', 'delivery_zone'],
    reusePercent: 60, themes: ['restoran-ev', 'restoran-lezzet', 'restoran-sehir', 'restoran-gurme', 'restoran-grup'], dependencies: ['T-01'] },
  { id: 'T-03', sectorId: 'doktor', sectorName: 'Doktor', priority: 'P0', weeks: 2,
    newSections: ['doctor_profile', 'insurance_logos', 'technology_showcase', 'health_tip'],
    reusePercent: 65, themes: ['doktor-guven', 'doktor-uzman', 'doktor-teknoloji', 'doktor-akademi', 'doktor-merkez'], dependencies: ['T-01'] },
  { id: 'T-04', sectorId: 'guzellik', sectorName: 'Güzellik', priority: 'P0', weeks: 1.5,
    newSections: ['pricing::package_compare'],
    reusePercent: 80, themes: ['guzellik-dogal', 'guzellik-glamour', 'guzellik-klinik', 'guzellik-wellness', 'guzellik-estetik'], dependencies: ['T-01', 'T-03'] },
  { id: 'T-05', sectorId: 'avukat', sectorName: 'Avukat', priority: 'P0', weeks: 1.5,
    newSections: ['practice_areas', 'case_results', 'confidentiality', 'certifications::grid'],
    reusePercent: 70, themes: ['avukat-adalet', 'avukat-kanun', 'avukat-savunma', 'avukat-prestij', 'avukat-hukuk'], dependencies: ['T-01'] },
  { id: 'T-06', sectorId: 'disci', sectorName: 'Dişçi', priority: 'P0', weeks: 1,
    newSections: ['smile_gallery', 'fear_reducer', 'price_calculator'],
    reusePercent: 86, themes: ['disci-gulus', 'disci-beyaz', 'disci-dijital', 'disci-estetik', 'disci-grup'], dependencies: ['T-03', 'T-04'] },
  { id: 'T-07', sectorId: 'oto', sectorName: 'Oto Servis', priority: 'P0', weeks: 1.5,
    newSections: ['emergency_banner', 'vehicle_brands', 'warranty_badge', 'service_area', 'work_before_after', 'project_type_selector'],
    reusePercent: 65, themes: ['oto-usta', 'oto-motor', 'oto-dijital', 'oto-prestij', 'oto-filo'], dependencies: ['T-01'] },
  { id: 'T-08', sectorId: 'spor', sectorName: 'Spor', priority: 'P0', weeks: 1.5,
    newSections: ['class_schedule', 'membership_pricing', 'transformation', 'trainer_profile', 'workout_of_day'],
    reusePercent: 65, themes: ['spor-form', 'spor-power', 'spor-elite', 'spor-boutique', 'spor-empire'], dependencies: ['T-01'] },

  // ═══ P1 — First Expansion (12 hafta) ═══
  { id: 'T-09', sectorId: 'kafe', sectorName: 'Kafe', priority: 'P1', weeks: 1.5, newSections: ['coffee_origin', 'brew_methods'], reusePercent: 80, themes: ['kafe-fincan', 'kafe-cekirdek', 'kafe-bohem', 'kafe-brew', 'kafe-blend'], dependencies: ['T-02'] },
  { id: 'T-10', sectorId: 'firin', sectorName: 'Fırın', priority: 'P1', weeks: 1, newSections: ['fresh_badge'], reusePercent: 85, themes: ['firin-maya', 'firin-hamur', 'firin-doga', 'firin-karabuday', 'firin-unlu'], dependencies: ['T-02'] },
  { id: 'T-11', sectorId: 'eczane', sectorName: 'Eczane', priority: 'P1', weeks: 1, newSections: ['duty_pharmacy', 'health_articles'], reusePercent: 85, themes: ['eczane-saglik', 'eczane-yesil', 'eczane-modern', 'eczane-akademik', 'eczane-sifa'], dependencies: ['T-03'] },
  { id: 'T-12', sectorId: 'veteriner', sectorName: 'Veteriner', priority: 'P1', weeks: 1, newSections: ['pet_gallery', 'vaccination_schedule'], reusePercent: 85, themes: ['veter-pati', 'veter-dost', 'veter-klinik', 'veter-hayat', 'veter-grup'], dependencies: ['T-03'] },
  { id: 'T-13', sectorId: 'fotografci', sectorName: 'Fotoğrafçı', priority: 'P1', weeks: 1, newSections: ['portfolio_grid::masonry_lightbox', 'project_story'], reusePercent: 80, themes: ['foto-kare', 'foto-lens', 'foto-pozlama', 'foto-anlik', 'foto-studio'], dependencies: ['T-01'] },
  { id: 'T-14', sectorId: 'dugun', sectorName: 'Düğün', priority: 'P1', weeks: 1, newSections: ['wedding_packages', 'booking_inquiry', 'countdown_wedding'], reusePercent: 75, themes: ['dugun-nikah', 'dugun-ruya', 'dugun-elegance', 'dugun-gelin', 'dugun-premium'], dependencies: ['T-13'] },
  { id: 'T-15', sectorId: 'elektrikci', sectorName: 'Elektrikçi', priority: 'P1', weeks: 1, newSections: [], reusePercent: 90, themes: ['elek-akim', 'elek-volt', 'elek-watt', 'elek-sigorta', 'elek-enerji'], dependencies: ['T-07'] },
  { id: 'T-16', sectorId: 'tesisatci', sectorName: 'Tesisatçı', priority: 'P1', weeks: 1, newSections: [], reusePercent: 92, themes: ['tesi-damla', 'tesi-akis', 'tesi-derya', 'tesi-isitma', 'tesi-kurumsal'], dependencies: ['T-07'] },
  { id: 'T-17', sectorId: 'muhasebeci', sectorName: 'Muhasebeci', priority: 'P1', weeks: 0.5, newSections: ['tax_calendar', 'document_upload_cta'], reusePercent: 88, themes: ['muha-tekin', 'muha-bilanço', 'muha-dijital', 'muha-mali', 'muha-holding'], dependencies: ['T-05'] },
  { id: 'T-18', sectorId: 'emlakci', sectorName: 'Emlakçı', priority: 'P1', weeks: 1, newSections: ['property_listings', 'property_search', 'neighborhood_guide', 'mortgage_calc'], reusePercent: 70, themes: ['emlak-anahtar', 'emlak-ev', 'emlak-yatirim', 'emlak-lux', 'emlak-holding'], dependencies: ['T-01'] },
  { id: 'T-19', sectorId: 'ozelders', sectorName: 'Özel Ders', priority: 'P1', weeks: 0.5, newSections: ['subject_grid', 'success_stories'], reusePercent: 88, themes: ['ders-kalem', 'ders-bilgi', 'ders-online', 'ders-akademi', 'ders-kurum'], dependencies: ['T-08'] },
  { id: 'T-20', sectorId: 'kuyumcu', sectorName: 'Kuyumcu', priority: 'P1', weeks: 1, newSections: ['gold_price_ticker', 'jewelry_showcase'], reusePercent: 80, themes: ['kuyu-halka', 'kuyu-pirlanta', 'kuyu-altin', 'kuyu-miras', 'kuyu-koleksiyon'], dependencies: ['T-01'] },

  // ═══ P2 — 6 Ayda (6 hafta) ═══
  { id: 'T-21', sectorId: 'psikolog', sectorName: 'Psikolog', priority: 'P2', weeks: 0.5, newSections: ['crisis_resources', 'online_offline_toggle'], reusePercent: 95, themes: ['psikolog-huzur', 'psikolog-denge', 'psikolog-icgoru', 'psikolog-bilinc', 'psikolog-merkez'], dependencies: ['T-03'] },
  { id: 'T-22', sectorId: 'fastfood', sectorName: 'Fast Food', priority: 'P2', weeks: 0.5, newSections: [], reusePercent: 97, themes: ['fastfood-lokma', 'fastfood-kombo', 'fastfood-ekspres', 'fastfood-lezzet', 'fastfood-franchise'], dependencies: ['T-02'] },
  { id: 'T-23', sectorId: 'bar', sectorName: 'Bar', priority: 'P2', weeks: 0.5, newSections: [], reusePercent: 95, themes: ['bar-kadeh', 'bar-kokteyl', 'bar-sahne', 'bar-lounge', 'bar-zincir'], dependencies: ['T-02'] },
  { id: 'T-24', sectorId: 'telefon', sectorName: 'Telefon', priority: 'P2', weeks: 0.5, newSections: ['device_repair_pricing'], reusePercent: 95, themes: ['telefon-ekran', 'telefon-cip', 'telefon-piksel', 'telefon-lab', 'telefon-servisplus'], dependencies: ['T-07'] },
  { id: 'T-25', sectorId: 'klima', sectorName: 'Klima', priority: 'P2', weeks: 0.5, newSections: ['seasonal_service'], reusePercent: 95, themes: ['klima-serinlik', 'klima-derece', 'klima-iklim', 'klima-konfor', 'klima-termo'], dependencies: ['T-07'] },
  { id: 'T-26', sectorId: 'mimarlik', sectorName: 'Mimarlık', priority: 'P2', weeks: 1, newSections: [], reusePercent: 97, themes: ['mimarlik-cizgi', 'mimarlik-perspektif', 'mimarlik-struktur', 'mimarlik-tasarim', 'mimarlik-yapi'], dependencies: ['T-13'] },
  { id: 'T-27', sectorId: 'sigorta', sectorName: 'Sigorta', priority: 'P2', weeks: 0.5, newSections: ['free_quote'], reusePercent: 95, themes: ['sigorta-kalkan', 'sigorta-police', 'sigorta-guvence', 'sigorta-koruma', 'sigorta-holding'], dependencies: ['T-05'] },
  { id: 'T-28', sectorId: 'surucu', sectorName: 'Sürücü', priority: 'P2', weeks: 0.5, newSections: [], reusePercent: 97, themes: ['surucu-direksiyon', 'surucu-serit', 'surucu-pilot', 'surucu-akademi', 'surucu-trafik'], dependencies: ['T-08'] },
  { id: 'T-29', sectorId: 'dil', sectorName: 'Dil Kursu', priority: 'P2', weeks: 0.5, newSections: ['level_path', 'free_trial'], reusePercent: 95, themes: ['dil-alfabe', 'dil-kelime', 'dil-konus', 'dil-poliglot', 'dil-global'], dependencies: ['T-19'] },
  { id: 'T-30', sectorId: 'yoga', sectorName: 'Yoga', priority: 'P2', weeks: 0.5, newSections: [], reusePercent: 97, themes: ['yoga-nefes', 'yoga-asana', 'yoga-reformer', 'yoga-zen', 'yoga-akis'], dependencies: ['T-08'] },

  // ═══ P3 — 12 Ayda (5 hafta) ═══
  { id: 'T-31', sectorId: 'optik', sectorName: 'Optik', priority: 'P3', weeks: 0.5, newSections: [], reusePercent: 98, themes: ['optik-gorus', 'optik-cerceve', 'optik-lens', 'optik-vizyon', 'optik-plus'], dependencies: ['T-04'] },
  { id: 'T-32', sectorId: 'petshop', sectorName: 'Pet Shop', priority: 'P3', weeks: 0.5, newSections: ['pet_species'], reusePercent: 97, themes: ['petshop-pati', 'petshop-yuva', 'petshop-dost', 'petshop-salon', 'petshop-zincir'], dependencies: ['T-12'] },
  { id: 'T-33', sectorId: 'cicekci', sectorName: 'Çiçekçi', priority: 'P3', weeks: 0.5, newSections: [], reusePercent: 98, themes: ['cicekci-tomurcuk', 'cicekci-buket', 'cicekci-sera', 'cicekci-atolye', 'cicekci-bahce'], dependencies: ['T-02'] },
  { id: 'T-34', sectorId: 'terzi', sectorName: 'Terzi', priority: 'P3', weeks: 0.5, newSections: [], reusePercent: 98, themes: ['terzi-igne', 'terzi-dikis', 'terzi-kumas', 'terzi-haute', 'terzi-moda'], dependencies: ['T-01'] },
  { id: 'T-35', sectorId: 'halisaha', sectorName: 'Halı Saha', priority: 'P3', weeks: 0.5, newSections: [], reusePercent: 98, themes: ['saha-saha', 'saha-gol', 'saha-turnuva', 'saha-arena', 'saha-stadyum'], dependencies: ['T-08'] },
  { id: 'T-36', sectorId: 'yuzme', sectorName: 'Yüzme', priority: 'P3', weeks: 0.5, newSections: [], reusePercent: 98, themes: ['yuzme-dalga', 'yuzme-havuz', 'yuzme-aqua', 'yuzme-okyanus', 'yuzme-olimpik'], dependencies: ['T-08'] },
  { id: 'T-37', sectorId: 'catering', sectorName: 'Catering', priority: 'P3', weeks: 0.5, newSections: [], reusePercent: 98, themes: ['catering-sofra', 'catering-ziyafet', 'catering-sef', 'catering-banket', 'catering-lojistik'], dependencies: ['T-02'] },
  { id: 'T-38', sectorId: 'kasap', sectorName: 'Kasap', priority: 'P3', weeks: 0.5, newSections: [], reusePercent: 98, themes: ['kasap-bicak', 'kasap-tezgah', 'kasap-mangal', 'kasap-ciftlik', 'kasap-etplus'], dependencies: ['T-02'] },
  { id: 'T-39', sectorId: 'cilingir', sectorName: 'Çilingir', priority: 'P3', weeks: 0.5, newSections: [], reusePercent: 97, themes: ['cilingir-kilit', 'cilingir-anahtar', 'cilingir-guvenlik', 'cilingir-kasa', 'cilingir-724'], dependencies: ['T-07'] },
  { id: 'T-40', sectorId: 'muzik', sectorName: 'Müzik Kursu', priority: 'P3', weeks: 0.5, newSections: [], reusePercent: 98, themes: ['muzik-nota', 'muzik-akor', 'muzik-studyo', 'muzik-konservatuar', 'muzik-armoni'], dependencies: ['T-19'] },
]

/** Sprint summary stats */
export const SPRINT_STATS = {
  totalSprints: 40,
  totalThemes: 200,
  totalWeeks: 36,
  byPriority: {
    P0: { sprints: 8, themes: 40, weeks: 13 },
    P1: { sprints: 12, themes: 60, weeks: 12 },
    P2: { sprints: 10, themes: 50, weeks: 6 },
    P3: { sprints: 10, themes: 50, weeks: 5 },
  },
} as const

// ═══ PROMPT TEMPLATES ═══

export interface PromptContext {
  sectorId: string
  themeId: string
  themeSpec: string           // from File 4/5/6
  demoData: string            // from File 7
  sectionInterfaces: string   // from File 2/3
  existingSections: string[]  // already built components
  newSections: string[]       // need to be created
}

/** Generate the initial Opus prompt for the first theme in a sector */
export function buildInitialPrompt(ctx: PromptContext): string {
  return `# SİSTEM PROMPT
[Dosya 1 tam metin] + [Dosya 2 tam metin] + [Dosya 3'ten ilgili section'lar]

# KULLANICI PROMPT
${ctx.sectorId} sektörü — "${ctx.themeId}" teması üret.

## SPEC (Dosya 4/5/6'dan):
${ctx.themeSpec}

## DEMO VERİSİ (Dosya 7'den):
${ctx.demoData}

## KURALLAR:
- Tailwind CSS semantic class'lar (text-foreground, bg-accent, HARD-CODE YASAK)
- CSS variable referansları (var(--color-accent), var(--font-heading))
- Mobile-first responsive (sm:, md:, lg:)
- Semantic HTML (section, nav, h2, address)
- next/image (src, alt, width, height)
- Lucide React ikonlar
- Tüm metin TÜRKÇE
- tel: link, wa.me link
- KVKK form consent checkbox
- JSON-LD structured data
- isEditing prop desteği
- Fotoğraf yoksa gradient/düz renk fallback`
}

/** Generate delta prompt for subsequent themes (reuse existing sections) */
export function buildDeltaPrompt(ctx: PromptContext): string {
  const existing = ctx.existingSections.map(s => `- ${s} → MEVCUT`).join('\n')
  const newOnes = ctx.newSections.map(s => `- ${s} (YENİ)`).join('\n')

  return `# KULLANICI PROMPT
${ctx.sectorId} sektörü — "${ctx.themeId}" teması üret.

## SPEC:
${ctx.themeSpec}

## MEVCUT SECTION'LAR (tekrar yazma, sadece import et):
${existing}

## YENİ YAZILACAK SECTION'LAR:
${newOnes}

## ÜRET: SADECE yeni section TSX'leri + theme-config.json + globals.css + page.tsx`
}

// ═══ FIRESTORE SCHEMA ═══

export interface FirestoreThemeDoc {
  id: string
  sectorId: string
  name: string
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise'
  description: string
  thumbnailUrl: string
  previewUrl: string

  config: Record<string, unknown>   // full ThemeConfig JSON

  metadata: {
    sectionCount: number
    pageCount: number
    isDark: boolean
    fonts: string[]
    accentColor: string
    heroVariant: string
    animationLevel: string
  }

  stats: {
    usageCount: number
    rating: number | null
    lastUsed: Date | null
  }

  status: 'draft' | 'review' | 'published' | 'archived'
  version: number
  createdAt: Date
  updatedAt: Date
}

// ═══ DEPLOYMENT CONFIG ═══

export const DEPLOYMENT_CONFIG = {
  demo: {
    pattern: 'demo-{sectorId}-{themeName}.kepenk.site',
    method: 'Cloudflare Pages — OpenNext adapter',
    example: 'demo-berber-sade.kepenk.site',
  },
  tenant: {
    pattern: '{slug}.kepenk.site',
    customDomain: 'Cloudflare for SaaS — Custom Hostnames',
    ssl: 'Automatic (Cloudflare)',
  },
  multiTenant: {
    routing: 'Next.js middleware — subdomain detection',
    cache: 'Cloudflare KV (hostname → siteId mapping)',
    data: 'Firestore (site config + business data)',
    revalidation: 'ISR — revalidate=3600 + on-demand webhook',
  },
} as const

// ═══ PRODUCTION WORKFLOW ═══

export const WORKFLOW_STEPS = [
  { step: 1, name: 'PROMPT HAZIRLA', desc: 'Dosya 4/5/6 tema spec + Dosya 7 demo data + Dosya 2/3 section interfaces' },
  { step: 2, name: 'OPUS\'A GÖNDER', desc: 'theme-config.json + globals.css + sections/*.tsx + page.tsx + demo-business.json üret' },
  { step: 3, name: 'KALİTE KAPISI', desc: 'TypeScript compile + ESLint + Lighthouse + responsive + functional + SEO + KVKK' },
  { step: 4, name: 'FİRESTORE KAYIT', desc: 'themes/{themeId} dokümanına kaydet' },
  { step: 5, name: 'DEPLOY', desc: 'Cloudflare Pages\'e demo site olarak yayınla' },
] as const
