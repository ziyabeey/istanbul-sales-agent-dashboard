/**
 * @kepenk/templates — Config Generator Utility
 *
 * Generates complete ThemeConfig + BusinessData + CSS from minimal input.
 * Used to quickly scaffold new demo sites with plan-appropriate sections.
 */

import type {
  ThemeConfig,
  BusinessData,
  SectionConfig,
  GlobalSectionConfig,
  SectionType,
  EditableField,
} from '../types/section-types'

// ═══════════════════════════════════════════
// INPUT/OUTPUT TYPES
// ═══════════════════════════════════════════

export interface ConfigGeneratorInput {
  sectorId: string
  variantName: string
  plan: ThemeConfig['plan']
  businessData: BusinessData
  colorScheme: {
    bg: string
    surface: string
    surfaceElevated?: string
    surfaceMuted?: string
    text: string
    textSecondary?: string
    textMuted?: string
    textOnAccent?: string
    accent: string
    accentHover?: string
    accentActive?: string
    accentLight?: string
    border?: string
    borderSubtle?: string
  }
  fonts: { heading: string; body: string }
  isDark: boolean
  description?: string
  designPhilosophy?: string
  inspiration?: string[]
  seoSchemaType?: string
  extraSections?: { type: SectionType; defaultContent: Record<string, unknown> }[]
  /** Manifest content overrides — rich, unique content per section */
  contentOverrides?: Partial<Record<SectionType, Record<string, unknown>>>
}

export interface ConfigGeneratorOutput {
  config: ThemeConfig
  business: BusinessData
  css: Record<string, string>
}

// ═══════════════════════════════════════════
// PLAN → SECTION MAPPING
// ═══════════════════════════════════════════

const PLAN_SECTION_MAP: Record<ThemeConfig['plan'], SectionType[]> = {
  free:       ['hero', 'services', 'contact'],
  starter:    ['hero', 'about', 'services', 'stats', 'contact', 'faq'],
  growth:     ['hero', 'about', 'services', 'stats', 'gallery', 'testimonials', 'contact', 'faq', 'cta'],
  pro:        ['hero', 'about', 'services', 'stats', 'team', 'gallery', 'testimonials', 'contact', 'faq', 'cta', 'process_steps'],
  enterprise: ['hero', 'about', 'services', 'stats', 'team', 'gallery', 'testimonials', 'contact', 'faq', 'cta', 'process_steps', 'blog_preview', 'newsletter', 'brands_logos'],
  elite:      ['hero', 'about', 'services', 'stats', 'team', 'gallery', 'testimonials', 'contact', 'faq', 'cta', 'process_steps', 'blog_preview', 'newsletter', 'brands_logos'],
}

const PLAN_TOKENS: Record<string, Record<string, string>> = {
  free:       { '--container-default': '640px',  '--section-py': '48px', '--radius-md': '4px',  '--radius-lg': '8px' },
  starter:    { '--container-default': '960px',  '--section-py': '64px', '--radius-md': '8px',  '--radius-lg': '12px' },
  growth:     { '--container-default': '1120px', '--section-py': '80px', '--radius-md': '12px', '--radius-lg': '16px' },
  pro:        { '--container-default': '1280px', '--section-py': '96px', '--radius-md': '4px',  '--radius-lg': '8px' },
  enterprise: { '--container-default': '1440px', '--section-py': '64px', '--radius-md': '0px',  '--radius-lg': '4px' },
  elite:      { '--container-default': '1440px', '--section-py': '64px', '--radius-md': '0px',  '--radius-lg': '4px' },
}

type AnimationLvl = NonNullable<ThemeConfig['performanceBudget']>['animationLevel'];
const PLAN_ANIMATION: Record<ThemeConfig['plan'], AnimationLvl> = {
  free:       'css-only',
  starter:    'framer-basic',
  growth:     'framer-full',
  pro:        'framer-full',
  enterprise: 'gsap-allowed',
  elite:      'gsap-allowed',
}

/** Per-section animation assignment based on plan level */
const PLAN_SECTION_ANIMATION: Record<ThemeConfig['plan'], Record<string, string>> = {
  free:       {},  // all 'none'
  starter:    { hero: 'fadeUp', about: 'fadeUp', services: 'fadeUp', stats: 'fadeUp', contact: 'fadeUp', faq: 'fadeUp' },
  growth:     { hero: 'fadeUp', about: 'slideLeft', services: 'fadeUp', stats: 'scaleUp', gallery: 'fadeIn', testimonials: 'slideRight', contact: 'fadeUp', faq: 'fadeUp', cta: 'scaleUp' },
  pro:        { hero: 'fadeUp', about: 'slideLeft', services: 'stagger', stats: 'scaleUp', team: 'stagger', gallery: 'fadeIn', testimonials: 'slideRight', contact: 'fadeUp', faq: 'fadeUp', cta: 'scaleUp', process_steps: 'stagger' },
  enterprise: { hero: 'stagger', about: 'slideLeft', services: 'stagger', stats: 'scaleUp', team: 'stagger', gallery: 'fadeIn', testimonials: 'slideRight', contact: 'fadeUp', faq: 'fadeUp', cta: 'scaleUp', process_steps: 'stagger', blog_preview: 'fadeUp', newsletter: 'fadeUp', brands_logos: 'fadeIn' },
  elite:      { hero: 'stagger', about: 'slideLeft', services: 'stagger', stats: 'scaleUp', team: 'stagger', gallery: 'fadeIn', testimonials: 'slideRight', contact: 'fadeUp', faq: 'fadeUp', cta: 'scaleUp', process_steps: 'stagger', blog_preview: 'fadeUp', newsletter: 'fadeUp', brands_logos: 'fadeIn' },
}

const PLAN_JS_BUDGET: Record<ThemeConfig['plan'], string> = {
  free: '80kb', starter: '120kb', growth: '180kb', pro: '250kb', enterprise: '350kb', elite: '350kb',
}

// ═══════════════════════════════════════════
// SECTOR → SCHEMA TYPE
// ═══════════════════════════════════════════

const SECTOR_SCHEMA: Record<string, string> = {
  berber: 'BarberShop', restoran: 'Restaurant', doktor: 'Physician',
  avukat: 'Attorney', emlak: 'RealEstateAgent', kuyumcu: 'JewelryStore',
  eczane: 'Pharmacy', fitness: 'ExerciseGym', spor: 'SportsActivityLocation',
  foto: 'PhotographAction', guzellik: 'BeautySalon', dis: 'Dentist',
  vet: 'VeterinaryCare', hukuk: 'LegalService', insaat: 'GeneralContractor',
  klinik: 'MedicalClinic', pastane: 'Bakery', kahveci: 'CafeOrCoffeeShop',
  organizasyon: 'EventPlanningBusiness', temizlik: 'HousekeepingService',
  elektrikci: 'Electrician', tesisatci: 'Plumber', nakliyat: 'MovingCompany',
  haliyikama: 'DryCleaningOrLaundry', terzi: 'TailorShop',
  default: 'LocalBusiness',
}

// ═══════════════════════════════════════════
// SECTOR → EXTRA SECTION TYPES
// ═══════════════════════════════════════════

const SECTOR_SPECIFIC_SECTIONS: Record<string, SectionType[]> = {
  berber: ['before_after', 'booking'],
  restoran: ['menu_display', 'daily_special', 'reservation', 'delivery_zone'],
  doktor: ['doctor_profile', 'insurance_logos', 'booking'],
  avukat: ['practice_areas', 'case_results', 'confidentiality'],
  emlak: ['property_listing', 'free_valuation'],
  kuyumcu: ['gold_price_ticker', 'jewelry_grid', 'gold_buyback', 'custom_design'],
  eczane: ['duty_pharmacy'],
  fitness: ['class_schedule', 'membership_pricing', 'transformation'],
  spor: ['class_schedule', 'membership_pricing'],
  foto: ['portfolio_grid', 'video_showreel', 'booking_inquiry'],
  guzellik: ['before_after', 'booking'],
  dis: ['smile_gallery', 'fear_reducer', 'technology_showcase'],
  organizasyon: ['wedding_packages', 'planning_timeline', 'venue_directory'],
  oto: ['vehicle_brands', 'warranty_badge'],
}

// ═══════════════════════════════════════════
// CSS GENERATION
// ═══════════════════════════════════════════

function generateCSS(input: ConfigGeneratorInput): Record<string, string> {
  const { colorScheme, fonts, isDark } = input
  const planTokens = PLAN_TOKENS[input.plan] || {}

  return {
    ...planTokens,
    '--color-bg': colorScheme.bg,
    '--color-surface': colorScheme.surface,
    '--color-surface-elevated': colorScheme.surfaceElevated || (isDark ? '#1A1A1A' : '#FFFFFF'),
    '--color-surface-muted': colorScheme.surfaceMuted || (isDark ? '#111111' : '#F9FAFB'),
    '--color-text': colorScheme.text,
    '--color-text-secondary': colorScheme.textSecondary || (isDark ? '#A0A0A0' : '#6B7280'),
    '--color-text-muted': colorScheme.textMuted || (isDark ? '#666666' : '#9CA3AF'),
    '--color-text-on-accent': colorScheme.textOnAccent || '#FFFFFF',
    '--color-text-on-dark': isDark ? colorScheme.text : '#F5F5F5',
    '--color-accent': colorScheme.accent,
    '--color-accent-hover': colorScheme.accentHover || colorScheme.accent,
    '--color-accent-active': colorScheme.accentActive || colorScheme.accent,
    '--color-accent-light': colorScheme.accentLight || (isDark ? '#1A1008' : '#FEF3C7'),
    '--color-border': colorScheme.border || (isDark ? '#2A2A2A' : '#E5E7EB'),
    '--color-border-subtle': colorScheme.borderSubtle || (isDark ? '#1E1E1E' : '#F3F4F6'),
    '--font-heading': `'${fonts.heading}', sans-serif`,
    '--font-body': `'${fonts.body}', system-ui, sans-serif`,
  }
}

// ═══════════════════════════════════════════
// SECTION CONFIG GENERATION
// ═══════════════════════════════════════════

function buildSection(
  id: string,
  type: SectionType,
  order: number,
  required: boolean,
  defaultContent: Record<string, unknown>,
  plan: ThemeConfig['plan'],
  editableFields: EditableField[] = [],
): SectionConfig {
  const animationMap = PLAN_SECTION_ANIMATION[plan] || {}
  const animation = animationMap[type] || (plan === 'free' ? 'none' : 'fadeUp')

  return {
    id,
    type,
    variant: 'auto', // ThemeRenderer resolves to plan_${plan}
    order,
    required,
    settings: {
      bgMode: order % 2 === 0 ? 'default' : 'surface',
      paddingY: 'lg',
      containerWidth: 'full',
      visible: true,
      order,
      removable: !required,
      animation,
    },
    defaultContent,
    editableFields,
  }
}

function buildGlobalSections(business: BusinessData, plan: ThemeConfig['plan']): GlobalSectionConfig[] {
  // Build nav items based on plan sections
  const navItems: { label: string; href: string }[] = [
    { label: 'Hizmetler', href: '#hizmetler' },
  ]
  if (plan !== 'free') navItems.push({ label: 'Hakkımızda', href: '#hakkimizda' })
  navItems.push({ label: 'İletişim', href: '#iletisim' })
  if (['growth', 'pro', 'enterprise', 'elite'].includes(plan)) navItems.push({ label: 'SSS', href: '#faq' })

  const globals: GlobalSectionConfig[] = [
    {
      id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 0, removable: false, animation: 'none' },
      defaultContent: {
        logo: { type: 'text', text: business.name },
        menuItems: navItems,
        cta: business.whatsapp
          ? { text: 'WhatsApp', href: `https://wa.me/${business.whatsapp}`, variant: 'solid' }
          : { text: 'Ara', href: `tel:${business.phoneClean}`, variant: 'solid' },
      },
      editableFields: [],
    },
    {
      id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'dark', paddingY: 'sm', containerWidth: 'full', visible: true, order: 999, removable: false, animation: 'none' },
      defaultContent: {
        businessName: business.name,
        copyright: `© ${new Date().getFullYear()} ${business.name}`,
        contact: { phone: business.phone, email: business.email, address: business.address },
        social: Object.entries(business.socialMedia || {}).filter(([, v]) => v).map(([k, v]) => ({ platform: k, url: v, icon: k })),
        legal: [{ label: 'Gizlilik', href: '/gizlilik' }, { label: 'KVKK', href: '/kvkk' }],
        poweredBy: 'kepenk.ai',
      },
      editableFields: [],
    },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 1000, removable: false, animation: 'none' },
      defaultContent: { phone: business.whatsapp || business.phoneClean, message: 'Merhaba, bilgi almak istiyorum.' },
      editableFields: [],
    },
  ]

  // Cookie banner only for starter+
  if (plan !== 'free') {
    globals.push({
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true, order: 1001, removable: false, animation: 'none' },
      defaultContent: { text: 'Çerezleri en iyi deneyim için kullanıyoruz.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: [],
    })
  }

  return globals
}

function buildPageSections(
  plan: ThemeConfig['plan'],
  business: BusinessData,
  sectorId: string,
  extraSections?: ConfigGeneratorInput['extraSections'],
  contentOverrides?: Partial<Record<SectionType, Record<string, unknown>>>,
): SectionConfig[] {
  const sectionTypes = PLAN_SECTION_MAP[plan]
  const sections: SectionConfig[] = []
  let order = 1

  const sectionDefaults: Partial<Record<SectionType, Record<string, unknown>>> = {
    hero: {
      badge: business.district || business.sector,
      title: business.name,
      subtitle: business.slogan || `${business.district} bölgesinin güvenilir ${business.sector} hizmeti`,
      cta1: { text: 'İletişim', href: '#iletisim' },
      cta2: business.whatsapp ? { text: 'WhatsApp', href: `https://wa.me/${business.whatsapp}` } : undefined,
    },
    about: {
      badge: 'Hakkımızda',
      title: 'Biz Kimiz?',
      description: `${business.foundedYear ? `${business.foundedYear} yılından bu yana` : 'Yılların tecrübesiyle'} ${business.district} bölgesinde hizmet vermekteyiz.`,
      stats: [
        business.experience ? { value: business.experience, label: 'Deneyim' } : null,
        business.customerCount ? { value: business.customerCount, label: 'Müşteri' } : null,
        business.rating ? { value: `${business.rating}`, label: 'Puan', suffix: '/5' } : null,
      ].filter(Boolean),
    },
    services: {
      badge: 'Hizmetler',
      title: 'Hizmetlerimiz',
      services: business.services || [],
    },
    stats: {
      stats: [
        business.experience ? { value: business.experience, label: 'Yıllık Deneyim', icon: '⏱' } : { value: '10+', label: 'Yıllık Deneyim', icon: '⏱' },
        business.customerCount ? { value: business.customerCount, label: 'Mutlu Müşteri', icon: '😊' } : { value: '1000+', label: 'Mutlu Müşteri', icon: '😊' },
        business.rating ? { value: `${business.rating}`, label: 'Ortalama Puan', icon: '⭐', suffix: '/5' } : { value: '4.9', label: 'Ortalama Puan', icon: '⭐', suffix: '/5' },
        business.reviewCount ? { value: `${business.reviewCount}`, label: 'Değerlendirme', icon: '💬' } : { value: '500+', label: 'Değerlendirme', icon: '💬' },
      ],
    },
    gallery: {
      badge: 'Galeri',
      title: 'Çalışmalarımız',
      images: business.photos?.map((p, i) => ({ id: `g${i}`, ...p })) || [],
    },
    team: {
      badge: 'Ekibimiz',
      title: 'Uzman Kadromuz',
      members: business.team || [],
    },
    testimonials: {
      badge: 'Yorumlar',
      title: 'Müşterilerimiz Ne Diyor?',
      reviews: [],
      overallRating: business.rating ? { value: business.rating, count: business.reviewCount || 0, source: 'Google' } : undefined,
    },
    faq: {
      badge: 'SSS',
      title: 'Sıkça Sorulan Sorular',
      questions: [],
      ctaText: 'Bize Ulaşın',
      ctaHref: '#iletisim',
      ctaDescription: 'Sorunuza cevap bulamadınız mı?',
    },
    contact: {
      badge: 'İletişim',
      title: 'Bize Ulaşın',
      subtitle: 'Sorularınız için bizimle iletişime geçin',
      fields: [
        { id: 'name', type: 'text', label: 'Ad Soyad', placeholder: 'Adınız', required: true },
        { id: 'phone', type: 'phone', label: 'Telefon', placeholder: '05XX XXX XX XX', required: true },
        { id: 'message', type: 'textarea', label: 'Mesajınız', placeholder: 'Mesajınızı yazın...', required: true },
      ],
      submitText: 'Gönder',
      consentText: 'KVKK kapsamında kişisel verileriniz işlenecektir.',
      consentLink: '/kvkk',
      successMessage: 'Mesajınız alındı! En kısa sürede dönüş yapacağız.',
      contactInfo: { phone: business.phone, email: business.email, address: business.address },
    },
    cta: {
      badge: 'Başlayın',
      title: 'Hemen Randevu Alın',
      subtitle: `${business.name} ile tanışın`,
      cta: { text: 'İletişim', href: '#iletisim' },
      secondaryCta: business.whatsapp ? { text: 'WhatsApp', href: `https://wa.me/${business.whatsapp}` } : undefined,
    },
  }

  for (const type of sectionTypes) {
    const id = type === 'hero' ? 'hero' : type === 'about' ? 'hakkimizda' : type === 'services' ? 'hizmetler' : type === 'contact' ? 'iletisim' : type
    const defaults = sectionDefaults[type] || {}
    const overrides = contentOverrides?.[type] || {}
    const content = { ...defaults, ...overrides }
    const required = type === 'hero' || type === 'services' || type === 'contact'
    sections.push(buildSection(id, type, order++, required, content, plan))
  }

  // Extra sector/custom sections
  if (extraSections) {
    for (const extra of extraSections) {
      sections.push(buildSection(extra.type, extra.type, order++, false, extra.defaultContent, plan))
    }
  }

  return sections
}

// ═══════════════════════════════════════════
// MAIN GENERATOR
// ═══════════════════════════════════════════

export function generateThemeConfig(input: ConfigGeneratorInput): ConfigGeneratorOutput {
  const css = generateCSS(input)
  const themeId = `${input.sectorId}-${input.variantName}`

  const config: ThemeConfig = {
    id: themeId,
    name: input.variantName.charAt(0).toUpperCase() + input.variantName.slice(1),
    sectorId: input.sectorId,
    plan: input.plan,
    description: input.description || `${input.sectorId} sektörü - ${input.variantName} teması`,
    designPhilosophy: input.designPhilosophy || '',
    inspiration: input.inspiration,
    isDark: input.isDark,
    cssVariables: css,
    fonts: {
      heading: { family: input.fonts.heading, weights: [700, 800], subsets: ['latin-ext'] },
      body:    { family: input.fonts.body, weights: [400, 500, 600], subsets: ['latin-ext'] },
    },
    seoSchemaType: input.seoSchemaType || SECTOR_SCHEMA[input.sectorId] || SECTOR_SCHEMA.default,
    sectorSections: (SECTOR_SPECIFIC_SECTIONS[input.sectorId] || []) as string[],
    performanceBudget: {
      maxJS: PLAN_JS_BUDGET[input.plan],
      maxLCP: input.plan === 'enterprise' ? '2.5s' : '3.0s',
      animationLevel: PLAN_ANIMATION[input.plan],
    },
    globalSections: buildGlobalSections(input.businessData, input.plan),
    pages: [{
      id: 'anasayfa',
      slug: '/',
      title: `${input.businessData.name} — ${input.businessData.district}`,
      titleTr: 'Ana Sayfa',
      isHomePage: true,
      includeInNav: false,
      sections: buildPageSections(input.plan, input.businessData, input.sectorId, input.extraSections, input.contentOverrides),
    }],
  }

  return { config, business: input.businessData, css }
}
