/** Public demo curation only. Never use this list to migrate tenant sites. */
export const RETIRED_DEMO_THEME_IDS = [
  'oto-dinamik', 'oto-guven', 'oto-hizli', 'oto-vip',
  'restoran-fine', 'restoran-hizli', 'restoran-kafe', 'restoran-klasik', 'restoran-vip',
] as const

// oto-oto was a second demo URL for the missing oto-vip source.
export const RETIRED_DEMO_ROUTES = [...RETIRED_DEMO_THEME_IDS, 'oto-oto'] as const
const retiredRoutes = new Set<string>(RETIRED_DEMO_ROUTES)

export function isRetiredDemo(themeId: string): boolean {
  return retiredRoutes.has(themeId)
}

/** Preservation candidates, not a declaration of visual or production acceptance. */
export const PRESERVED_PREMIUM_TEMPLATE_IDS = [
  'sablon-premium',
  'sektor-insaat-premium',
  'sektor-spor-premium',
  'sektor-saglik-premium',
  'sektor-ajans-premium',
  'sektor-otel-premium',
] as const
