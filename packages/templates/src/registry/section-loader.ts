/**
 * @kepenk/templates — Sector-based Section Loader
 *
 * Dynamically imports universal + sector-specific section components.
 * Each import triggers self-registration via registerSection() side-effects.
 * Used by the dynamic demo route to load only the sections a theme needs.
 */

type LazyImport = () => Promise<unknown>

// ─────────────────────────────────────────────
// Universal sections (always loaded)
// ─────────────────────────────────────────────

const UNIVERSAL_IMPORTS: LazyImport[] = [
  () => import('../sections/header/HeaderMinimalSticky'),
  () => import('../sections/hero/HeroFullscreenOverlay'),
  () => import('../sections/services/ServicesCardGrid'),
  () => import('../sections/footer/FooterSections'),
  () => import('../sections/global/GlobalSections'),
  () => import('../sections/common/CommonSections'),
  () => import('../sections/common/MapFullWidth'),
]

// ─────────────────────────────────────────────
// Sector → section file mapping
// ─────────────────────────────────────────────

const SECTOR_IMPORTS: Record<string, LazyImport[]> = {
  // P0
  berber: [],  // uses only universal sections
  restoran: [() => import('../sections/restoran/RestoranSections')],
  doktor: [() => import('../sections/doktor/DoktorSections')],
  guzellik: [() => import('../sections/guzellik/GuzellikSections')],
  avukat: [() => import('../sections/avukat/AvukatSections')],
  disci: [() => import('../sections/dis/DisSections')],
  oto: [() => import('../sections/oto/OtoSections')],
  spor: [() => import('../sections/spor/SporSections'), () => import('../sections/fitness/FitnessSections')],

  // P1
  kafe: [() => import('../sections/kahveci/KahveciSections')],
  firin: [() => import('../sections/pastane/PastaneSections')],
  eczane: [() => import('../sections/eczane/EczaneSections')],
  veteriner: [() => import('../sections/veteriner/VeterinerSections')],
  fotografci: [() => import('../sections/fotografci/FotografciSections')],
  dugun: [() => import('../sections/organizasyon/OrganizasyonSections')],
  elektrikci: [() => import('../sections/elektrikci/ElektrikciSections')],
  tesisatci: [() => import('../sections/tesisatci/TesisatciSections')],
  muhasebeci: [],  // uses universal sections
  emlakci: [() => import('../sections/emlak/EmlakSections')],
  ozelders: [],  // uses universal sections
  kuyumcu: [() => import('../sections/kuyumcu/KuyumcuSections')],

  // P2
  psikolog: [],  // uses universal + common sections
  fastfood: [() => import('../sections/restoran/RestoranSections')],
  bar: [() => import('../sections/restoran/RestoranSections')],
  telefon: [],  // uses universal sections
  klima: [],  // uses universal sections
  mimarlik: [],  // uses universal sections
  sigorta: [],  // uses universal sections
  surucu: [],  // uses universal sections
  dil: [],  // uses universal sections
  yoga: [() => import('../sections/fitness/FitnessSections')],

  // P3
  optik: [],  // uses universal sections
  petshop: [() => import('../sections/veteriner/VeterinerSections')],
  cicekci: [() => import('../sections/cicekci/CicekciSections')],
  terzi: [() => import('../sections/terzi/TerziSections')],
  halisaha: [() => import('../sections/spor/SporSections')],
  yuzme: [() => import('../sections/fitness/FitnessSections')],
  catering: [() => import('../sections/restoran/RestoranSections')],
  kasap: [],  // uses universal sections
  cilingir: [() => import('../sections/cilingir/CilingirSections')],
  muzik: [() => import('../sections/muzik/MuzikSections')],
}

// ─────────────────────────────────────────────
// Loader
// ─────────────────────────────────────────────

const loadedSectors = new Set<string>()
let universalLoaded = false

/**
 * Register all section components needed for a given sector.
 * Safe to call multiple times — deduplicates internally.
 */
export async function registerSectorSections(sectorId: string): Promise<void> {
  // Load universal sections once
  if (!universalLoaded) {
    await Promise.all(UNIVERSAL_IMPORTS.map(fn => fn()))
    universalLoaded = true
  }

  // Load sector-specific sections once per sector
  if (!loadedSectors.has(sectorId)) {
    const imports = SECTOR_IMPORTS[sectorId] ?? []
    if (imports.length > 0) {
      await Promise.all(imports.map(fn => fn()))
    }
    loadedSectors.add(sectorId)
  }
}

/** Check if a sector's sections are already loaded */
export function isSectorLoaded(sectorId: string): boolean {
  return loadedSectors.has(sectorId) && universalLoaded
}

/** Load ALL sections (useful for editor or full preview) */
export async function registerAllSections(): Promise<void> {
  if (!universalLoaded) {
    await Promise.all(UNIVERSAL_IMPORTS.map(fn => fn()))
    universalLoaded = true
  }

  const allSectors = Object.keys(SECTOR_IMPORTS)
  const unloaded = allSectors.filter(s => !loadedSectors.has(s))

  for (const sectorId of unloaded) {
    const imports = SECTOR_IMPORTS[sectorId] ?? []
    if (imports.length > 0) {
      await Promise.all(imports.map(fn => fn()))
    }
    loadedSectors.add(sectorId)
  }
}
