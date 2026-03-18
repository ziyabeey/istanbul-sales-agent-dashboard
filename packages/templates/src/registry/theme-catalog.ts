/**
 * @kepenk/templates — Unified Theme Catalog
 *
 * Single registry of all 200 themes across P0/P1/P2/P3 tiers.
 * Lightweight metadata only — no heavy config imports.
 * Used by: SablonMarket, dynamic demo route, search/filter.
 */

import type { P0ThemeDef } from '../themes/p0-themes'

// ── P0 (8 sectors × 5 = 40 themes) ──
import { BERBER_THEMES, RESTORAN_THEMES, DOKTOR_THEMES, GUZELLIK_THEMES, AVUKAT_THEMES, DISCI_THEMES, OTO_THEMES, SPOR_THEMES } from '../themes/p0-themes'
// ── P1 (12 sectors × 5 = 60 themes) ──
import { KAFE_THEMES, FIRIN_THEMES, ECZANE_THEMES, VETERINER_THEMES, FOTOGRAFCI_THEMES, DUGUN_THEMES, ELEKTRIKCI_THEMES, TESISATCI_THEMES, MUHASEBECI_THEMES, EMLAKCI_THEMES, OZELDERS_THEMES, KUYUMCU_THEMES } from '../themes/p1-themes'
// ── P2 (10 sectors × 5 = 50 themes) ──
import { PSIKOLOG_THEMES, FASTFOOD_THEMES, BAR_THEMES, TELEFON_THEMES, KLIMA_THEMES, MIMARLIK_THEMES, SIGORTA_THEMES, SURUCU_THEMES, DIL_THEMES, YOGA_THEMES } from '../themes/p2p3-themes'
// ── P3 (10 sectors × 5 = 50 themes) ──
import { OPTIK_THEMES, PETSHOP_THEMES, CICEKCI_THEMES, TERZI_THEMES, HALISAHA_THEMES, YUZME_THEMES, CATERING_THEMES, KASAP_THEMES, CILINGIR_THEMES, MUZIK_THEMES } from '../themes/p2p3-themes'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface ThemeCatalogEntry {
  id: string
  name: string
  sectorId: string
  sectorLabel: string
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise'
  description: string
  designPhilosophy: string
  isDark: boolean
  fonts: { heading: string; body: string }
  accentColor: string
  sectionCount: number
  pageCount: number
  animationLevel: string
  seoSchemaType: string
}

// ─────────────────────────────────────────────
// Sector Labels (sectorId → Turkish display name)
// ─────────────────────────────────────────────

const SECTOR_LABELS: Record<string, string> = {
  // P0
  berber: 'Berber & Kuaför',
  restoran: 'Restoran',
  doktor: 'Doktor & Klinik',
  guzellik: 'Güzellik Merkezi',
  avukat: 'Avukat & Hukuk',
  disci: 'Diş Hekimi',
  oto: 'Oto Servis',
  spor: 'Spor & Fitness',
  // P1
  kafe: 'Kafe & Pastane',
  firin: 'Fırın & Pastane',
  eczane: 'Eczane',
  veteriner: 'Veteriner',
  fotografci: 'Fotoğrafçı',
  dugun: 'Düğün & Organizasyon',
  elektrikci: 'Elektrikçi',
  tesisatci: 'Tesisatçı',
  muhasebeci: 'Muhasebe & Mali Müşavir',
  emlakci: 'Emlak & Gayrimenkul',
  ozelders: 'Özel Ders & Eğitim',
  kuyumcu: 'Kuyumcu',
  // P2
  psikolog: 'Psikolog & Terapi',
  fastfood: 'Fast Food',
  bar: 'Bar & Meyhane',
  telefon: 'Telefon & Teknik Servis',
  klima: 'Klima & Kombi',
  mimarlik: 'Mimarlık & İç Tasarım',
  sigorta: 'Sigorta',
  surucu: 'Sürücü Kursu',
  dil: 'Dil Kursu',
  yoga: 'Yoga & Pilates',
  // P3
  optik: 'Optik & Gözlük',
  petshop: 'Pet Shop',
  cicekci: 'Çiçekçi',
  terzi: 'Terzi & Kuru Temizleme',
  halisaha: 'Halı Saha',
  yuzme: 'Yüzme Havuzu',
  catering: 'Catering',
  kasap: 'Kasap & Şarküteri',
  cilingir: 'Çilingir',
  muzik: 'Müzik & Enstrüman',
}

// ─────────────────────────────────────────────
// SEO Schema.org type per sector
// ─────────────────────────────────────────────

const SECTOR_SCHEMA: Record<string, string> = {
  berber: 'BarberShop',
  restoran: 'Restaurant',
  doktor: 'MedicalBusiness',
  guzellik: 'BeautySalon',
  avukat: 'LegalService',
  disci: 'Dentist',
  oto: 'AutoRepair',
  spor: 'SportsActivityLocation',
  kafe: 'CafeOrCoffeeShop',
  firin: 'Bakery',
  eczane: 'Pharmacy',
  veteriner: 'VeterinaryCare',
  fotografci: 'LocalBusiness',
  dugun: 'EventVenue',
  elektrikci: 'Electrician',
  tesisatci: 'Plumber',
  muhasebeci: 'AccountingService',
  emlakci: 'RealEstateAgent',
  ozelders: 'EducationalOrganization',
  kuyumcu: 'JewelryStore',
  psikolog: 'MedicalBusiness',
  fastfood: 'FastFoodRestaurant',
  bar: 'BarOrPub',
  telefon: 'LocalBusiness',
  klima: 'HVACBusiness',
  mimarlik: 'LocalBusiness',
  sigorta: 'InsuranceAgency',
  surucu: 'DrivingSchool',
  dil: 'EducationalOrganization',
  yoga: 'SportsActivityLocation',
  optik: 'Optician',
  petshop: 'PetStore',
  cicekci: 'Florist',
  terzi: 'LocalBusiness',
  halisaha: 'SportsActivityLocation',
  yuzme: 'SportsActivityLocation',
  catering: 'FoodEstablishment',
  kasap: 'LocalBusiness',
  cilingir: 'Locksmith',
  muzik: 'LocalBusiness',
}

// ─────────────────────────────────────────────
// Build catalog from theme defs
// ─────────────────────────────────────────────

function defToEntry(def: P0ThemeDef): ThemeCatalogEntry {
  return {
    id: def.id,
    name: def.name,
    sectorId: def.sectorId,
    sectorLabel: SECTOR_LABELS[def.sectorId] ?? def.sectorId,
    plan: def.plan,
    description: def.description,
    designPhilosophy: def.designPhilosophy,
    isDark: def.isDark,
    fonts: {
      heading: def.fonts.heading.family,
      body: def.fonts.body.family,
    },
    accentColor: def.cssOverrides['--color-accent'] ?? '#1A1A1A',
    sectionCount: def.homeSections.length,
    pageCount: def.pages.length,
    animationLevel: def.animationLevel,
    seoSchemaType: SECTOR_SCHEMA[def.sectorId] ?? 'LocalBusiness',
  }
}

/** All theme definition arrays in registration order */
const ALL_THEME_DEFS: P0ThemeDef[] = [
  // P0
  ...BERBER_THEMES, ...RESTORAN_THEMES, ...DOKTOR_THEMES, ...GUZELLIK_THEMES,
  ...AVUKAT_THEMES, ...DISCI_THEMES, ...OTO_THEMES, ...SPOR_THEMES,
  // P1
  ...KAFE_THEMES, ...FIRIN_THEMES, ...ECZANE_THEMES, ...VETERINER_THEMES,
  ...FOTOGRAFCI_THEMES, ...DUGUN_THEMES, ...ELEKTRIKCI_THEMES, ...TESISATCI_THEMES,
  ...MUHASEBECI_THEMES, ...EMLAKCI_THEMES, ...OZELDERS_THEMES, ...KUYUMCU_THEMES,
  // P2
  ...PSIKOLOG_THEMES, ...FASTFOOD_THEMES, ...BAR_THEMES, ...TELEFON_THEMES,
  ...KLIMA_THEMES, ...MIMARLIK_THEMES, ...SIGORTA_THEMES, ...SURUCU_THEMES,
  ...DIL_THEMES, ...YOGA_THEMES,
  // P3
  ...OPTIK_THEMES, ...PETSHOP_THEMES, ...CICEKCI_THEMES, ...TERZI_THEMES,
  ...HALISAHA_THEMES, ...YUZME_THEMES, ...CATERING_THEMES, ...KASAP_THEMES,
  ...CILINGIR_THEMES, ...MUZIK_THEMES,
]

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────

/** Flat array of all theme definitions (P0ThemeDef) */
export { ALL_THEME_DEFS }

/** Map<themeId, ThemeCatalogEntry> — 200 entries */
export const THEME_CATALOG: Map<string, ThemeCatalogEntry> = new Map(
  ALL_THEME_DEFS.map(def => [def.id, defToEntry(def)])
)

/** All catalog entries as array (for iteration/filter) */
export const THEME_CATALOG_ARRAY: ThemeCatalogEntry[] = [...THEME_CATALOG.values()]

/** Unique sector IDs present in the catalog */
export const CATALOG_SECTORS: { id: string; label: string; count: number }[] = (() => {
  const counts = new Map<string, number>()
  for (const entry of THEME_CATALOG.values()) {
    counts.set(entry.sectorId, (counts.get(entry.sectorId) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([id, count]) => ({ id, label: SECTOR_LABELS[id] ?? id, count }))
    .sort((a, b) => a.label.localeCompare(b.label, 'tr'))
})()

/** Lookup helpers */
export function getTheme(id: string): ThemeCatalogEntry | undefined {
  return THEME_CATALOG.get(id)
}

export function getThemesBySector(sectorId: string): ThemeCatalogEntry[] {
  return THEME_CATALOG_ARRAY.filter(e => e.sectorId === sectorId)
}

export function getThemesByPlan(plan: ThemeCatalogEntry['plan']): ThemeCatalogEntry[] {
  return THEME_CATALOG_ARRAY.filter(e => e.plan === plan)
}
