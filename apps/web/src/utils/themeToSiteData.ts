/**
 * ThemeConfig → SiteData Adapter
 * ─────────────────────────────────────────────────────────────
 * Converts a @kepenk/templates ThemeConfig + BusinessData pair
 * into the editor's SiteData format.
 *
 * Used by EditorShell when no saved siteJson exists and
 * the esnaf's sector doesn't match any DEMOLAR entry.
 */

import type { SiteData, FontSettings, DesignSettings } from '@/app/dashboard/sitem/editor/store/editor-store'

// Minimal types matching @kepenk/templates (avoid importing heavy barrel)
interface ThemeConfigMinimal {
  id: string
  name: string
  sectorId: string
  plan: string
  isDark: boolean
  cssVariables: Record<string, string>
  fonts: {
    heading: { family: string; weights: number[] }
    body: { family: string; weights: number[] }
  }
  sectorSections?: string[]
  performanceBudget?: { animationLevel?: string }
  globalSections?: any[]
  pages?: Array<{
    id: string
    sections: Array<{
      id: string
      type: string
      defaultContent?: Record<string, any>
    }>
  }>
}

interface BusinessDataMinimal {
  name?: string
  ownerName?: string
  sectorId?: string
  slogan?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  district?: string
  services?: Array<{ id: string; name: string; description?: string }>
  photos?: Array<{ url: string; alt?: string }>
}

/**
 * Maps sectorId → DEMOLAR kategori for editor compatibility.
 */
const SEKTOR_KATEGORI: Record<string, 'yerel-esnaf' | 'profesyonel' | 'saglik-guzellik' | 'etkinlik'> = {
  berber: 'yerel-esnaf',
  restoran: 'yerel-esnaf',
  kafe: 'yerel-esnaf',
  firin: 'yerel-esnaf',
  eczane: 'yerel-esnaf',
  kuyumcu: 'yerel-esnaf',
  cicekci: 'yerel-esnaf',
  kasap: 'yerel-esnaf',
  terzi: 'yerel-esnaf',
  oto: 'yerel-esnaf',
  elektrikci: 'yerel-esnaf',
  tesisatci: 'yerel-esnaf',
  mobilyaci: 'yerel-esnaf',
  temizlik: 'yerel-esnaf',
  boyaci: 'yerel-esnaf',
  cambalkon: 'yerel-esnaf',
  otoyikama: 'yerel-esnaf',
  haliyikama: 'yerel-esnaf',
  lastikci: 'yerel-esnaf',
  matbaa: 'yerel-esnaf',
  nakliyat: 'yerel-esnaf',
  kargo: 'yerel-esnaf',
  organik: 'yerel-esnaf',
  peyzaj: 'yerel-esnaf',

  avukat: 'profesyonel',
  hukuk: 'profesyonel',
  muhasebeci: 'profesyonel',
  emlakci: 'profesyonel',
  mimarlik: 'profesyonel',
  insaat: 'profesyonel',
  sigorta: 'profesyonel',
  ozelders: 'profesyonel',
  fotografci: 'profesyonel',
  asansor: 'profesyonel',
  kres: 'profesyonel',
  muzik: 'profesyonel',

  doktor: 'saglik-guzellik',
  disci: 'saglik-guzellik',
  guzellik: 'saglik-guzellik',
  spor: 'saglik-guzellik',
  fitness: 'saglik-guzellik',
  klinik: 'saglik-guzellik',
  veteriner: 'saglik-guzellik',

  dugun: 'etkinlik',
}

/**
 * Maps plan tier → PAKET name for editor compatibility.
 */
const PLAN_TO_PAKET: Record<string, string> = {
  free: 'TEMEL',
  starter: 'STANDART',
  growth: 'BUYUME',
  pro: 'PREMIUM',
  enterprise: 'PREMIUMPLUS',
}

/**
 * Extract Unsplash photo ID from a full URL.
 * e.g. 'https://images.unsplash.com/photo-1234?...' → 'photo-1234'
 */
function extractUnsplashId(url?: string): string {
  if (!url) return 'photo-1414235077428-338989a2e8c0' // default
  const match = url.match(/(photo-[a-zA-Z0-9_-]+)/)
  return match?.[1] || 'photo-1414235077428-338989a2e8c0'
}

/**
 * Extract hero section content from ThemeConfig pages.
 */
function extractHeroContent(config: ThemeConfigMinimal): { title: string; subtitle: string } {
  const firstPage = config.pages?.[0]
  if (!firstPage) return { title: '', subtitle: '' }

  const heroSection = firstPage.sections.find(s => s.type === 'hero')
  if (!heroSection?.defaultContent) return { title: '', subtitle: '' }

  return {
    title: heroSection.defaultContent.title || heroSection.defaultContent.heading || '',
    subtitle: heroSection.defaultContent.subtitle || heroSection.defaultContent.description || '',
  }
}

/**
 * Extract services from BusinessData or ThemeConfig.
 * Always returns a tuple of 3 strings for SiteData compatibility.
 */
function extractHizmetler(business: BusinessDataMinimal, config: ThemeConfigMinimal): [string, string, string] {
  // Try business.services first
  if (business.services && business.services.length >= 3) {
    return [
      business.services[0].name,
      business.services[1].name,
      business.services[2].name,
    ]
  }

  // Try config sections for service names
  const firstPage = config.pages?.[0]
  const servicesSection = firstPage?.sections.find(s => s.type === 'services')
  const services = servicesSection?.defaultContent?.services as Array<{ name: string }> | undefined
  if (services && services.length >= 3) {
    return [services[0].name, services[1].name, services[2].name]
  }

  // Fallback
  return ['Hizmet 1', 'Hizmet 2', 'Hizmet 3']
}

/**
 * Derive animation level from config.
 */
function deriveDesignSettings(config: ThemeConfigMinimal): DesignSettings {
  const radius = config.cssVariables['--radius-md'] || '8px'
  const radiusPx = parseInt(radius)

  let borderRadius: DesignSettings['borderRadius'] = 'medium'
  if (radiusPx === 0) borderRadius = 'none'
  else if (radiusPx <= 4) borderRadius = 'small'
  else if (radiusPx <= 12) borderRadius = 'medium'
  else if (radiusPx <= 20) borderRadius = 'large'
  else borderRadius = 'pill'

  const animLevel = config.performanceBudget?.animationLevel || 'css-only'
  let animationLevel: DesignSettings['animationLevel'] = 'standard'
  if (animLevel === 'none') animationLevel = 'none'
  else if (animLevel === 'css-only') animationLevel = 'minimal'
  else if (animLevel === 'gsap-allowed') animationLevel = 'playful'

  return {
    borderRadius,
    buttonStyle: 'solid',
    shadowLevel: config.isDark ? 'none' : 'subtle',
    animationLevel,
    darkMode: config.isDark,
  }
}

/**
 * Convert ThemeConfig + BusinessData → SiteData for editor compatibility.
 */
export function themeConfigToSiteData(
  config: ThemeConfigMinimal,
  business: BusinessDataMinimal,
  esnafOverrides?: {
    isletmeAdi?: string
    telefon?: string
    adres?: string
    paket?: string
  }
): SiteData {
  const hero = extractHeroContent(config)
  const hizmetler = extractHizmetler(business, config)
  const css = config.cssVariables

  const fontSettings: FontSettings = {
    heading: config.fonts.heading.family,
    body: config.fonts.body.family,
    headingWeight: Math.max(...config.fonts.heading.weights),
    bodyWeight: config.fonts.body.weights.includes(400) ? 400 : config.fonts.body.weights[0],
  }

  const designSettings = deriveDesignSettings(config)

  return {
    sektorId: 0, // Will be overridden by EditorShell with DEMOLAR index
    kategori: SEKTOR_KATEGORI[config.sectorId] || 'yerel-esnaf',
    isletmeAdi: esnafOverrides?.isletmeAdi || business.name || config.name,
    heroBaslik: esnafOverrides?.isletmeAdi || hero.title || business.name || '',
    heroAlt: hero.subtitle || business.slogan || '',
    hizmetler,
    bg: css['--color-bg'] || '#ffffff',
    accent: css['--color-accent'] || '#1a1a1a',
    text: css['--color-text'] || '#111111',
    font: config.fonts.heading.family,
    unsplash: extractUnsplashId(business.photos?.[0]?.url),
    telefon: esnafOverrides?.telefon || business.phone || '',
    adres: esnafOverrides?.adres || business.address || '',
    paket: esnafOverrides?.paket || PLAN_TO_PAKET[config.plan] || 'STANDART',
    moduller: config.sectorSections || [],
    fontSettings,
    designSettings,
  }
}
