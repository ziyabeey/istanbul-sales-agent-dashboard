import { getTheme } from '@kepenk/templates/catalog'
import { THEME_MAP } from '@kepenk/templates/src/registry/theme-map'

interface DemoThemeDescriptor {
  id: string
  sectorId: string
  seoSchemaType: string
}

// Retained static URLs have real archived configs but may predate catalog IDs.
// This maps route metadata only; configs and business data still come from THEME_MAP.
const legacyThemes: Record<string, DemoThemeDescriptor> = {
  'haliyikama-fabrika': { id: 'haliyikama-fabrika', sectorId: 'haliyikama', seoSchemaType: 'LocalBusiness' },
  'haliyikama-koltuk': { id: 'haliyikama-koltuk', sectorId: 'haliyikama', seoSchemaType: 'LocalBusiness' },
  'haliyikama-lux': { id: 'haliyikama-lux', sectorId: 'haliyikama', seoSchemaType: 'LocalBusiness' },
  'haliyikama-organik': { id: 'haliyikama-organik', sectorId: 'haliyikama', seoSchemaType: 'LocalBusiness' },
  'cicekci-dugun': { id: 'cicekci-dugun', sectorId: 'cicekci', seoSchemaType: 'Florist' },
  'insaat-elite': { id: 'insaat-elite', sectorId: 'insaat', seoSchemaType: 'GeneralContractor' },
  'insaat-kurumsal': { id: 'insaat-kurumsal', sectorId: 'insaat', seoSchemaType: 'GeneralContractor' },
  'insaat-modern': { id: 'insaat-modern', sectorId: 'insaat', seoSchemaType: 'GeneralContractor' },
  'insaat-prestij': { id: 'insaat-prestij', sectorId: 'insaat', seoSchemaType: 'GeneralContractor' },
  'insaat-sade': { id: 'insaat-sade', sectorId: 'insaat', seoSchemaType: 'GeneralContractor' },
}

/** Metadata alone cannot make a missing theme config renderable. */
export function getRenderableDemoTheme(themeId: string): DemoThemeDescriptor | null {
  if (!Object.hasOwn(THEME_MAP, themeId) || typeof THEME_MAP[themeId] !== 'function') {
    return null
  }
  const theme = getTheme(themeId)
    ?? (Object.hasOwn(legacyThemes, themeId) ? legacyThemes[themeId] : null)
  if (!theme) return null
  return { id: theme.id, sectorId: theme.sectorId, seoSchemaType: theme.seoSchemaType }
}
