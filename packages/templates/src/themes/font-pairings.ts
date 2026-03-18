/**
 * @kepenk/templates — Font Pairings & Sector Assignments
 *
 * 45 unique heading fonts organized by personality.
 * RULE: Same heading font NEVER repeats within the same sector (5 themes = 5 unique fonts).
 *
 * Each sector assignment maps plan tier → heading font family.
 */

// ─────────────────────────────────────────────
// Font Pool (45 families by personality)
// ─────────────────────────────────────────────

export const FONT_POOL = {
  // Minimal / Clean
  inter: { family: 'Inter', weights: [600, 700], style: 'minimal' },
  ibmPlexSans: { family: 'IBM Plex Sans', weights: [500, 600, 700], style: 'minimal' },
  spaceGrotesk: { family: 'Space Grotesk', weights: [500, 600, 700], style: 'minimal' },
  geist: { family: 'Geist', weights: [500, 600, 700], style: 'minimal' },

  // Warm / Friendly
  lora: { family: 'Lora', weights: [400, 700], style: 'warm' },
  merriweather: { family: 'Merriweather', weights: [400, 700], style: 'warm' },
  crimsonText: { family: 'Crimson Text', weights: [400, 600, 700], style: 'warm' },
  vollkorn: { family: 'Vollkorn', weights: [400, 600, 700], style: 'warm' },
  ebGaramond: { family: 'EB Garamond', weights: [400, 600, 700], style: 'warm' },

  // Bold / Energetic
  syne: { family: 'Syne', weights: [600, 700, 800], style: 'bold' },
  bebasNeue: { family: 'Bebas Neue', weights: [400], style: 'bold' },
  archivoBlack: { family: 'Archivo Black', weights: [400], style: 'bold' },
  anton: { family: 'Anton', weights: [400], style: 'bold' },
  oswald: { family: 'Oswald', weights: [500, 600, 700], style: 'bold' },

  // Elegant / Luxury
  cormorantGaramond: { family: 'Cormorant Garamond', weights: [400, 600, 700], style: 'elegant' },
  playfairDisplay: { family: 'Playfair Display', weights: [400, 600, 700], style: 'elegant' },
  gildaDisplay: { family: 'Gilda Display', weights: [400], style: 'elegant' },
  spectral: { family: 'Spectral', weights: [400, 600, 700], style: 'elegant' },
  libreCaslon: { family: 'Libre Caslon Text', weights: [400, 700], style: 'elegant' },

  // Friendly / Rounded
  nunito: { family: 'Nunito', weights: [600, 700, 800], style: 'friendly' },
  quicksand: { family: 'Quicksand', weights: [500, 600, 700], style: 'friendly' },
  rubik: { family: 'Rubik', weights: [400, 500, 600, 700], style: 'friendly' },
  poppins: { family: 'Poppins', weights: [500, 600, 700], style: 'friendly' },
  workSans: { family: 'Work Sans', weights: [500, 600, 700], style: 'friendly' },

  // Editorial / Serif
  dmSerifDisplay: { family: 'DM Serif Display', weights: [400], style: 'editorial' },
  sourceSerif4: { family: 'Source Serif 4', weights: [400, 600, 700], style: 'editorial' },
  libreBaskerville: { family: 'Libre Baskerville', weights: [400, 700], style: 'editorial' },
  bitter: { family: 'Bitter', weights: [400, 600, 700], style: 'editorial' },
  alegreya: { family: 'Alegreya', weights: [400, 600, 700], style: 'editorial' },

  // Modern / Geometric
  plusJakartaSans: { family: 'Plus Jakarta Sans', weights: [500, 600, 700], style: 'modern' },
  outfit: { family: 'Outfit', weights: [500, 600, 700], style: 'modern' },
  manrope: { family: 'Manrope', weights: [500, 600, 700, 800], style: 'modern' },
  satoshi: { family: 'Satoshi', weights: [500, 700], style: 'modern' },
  generalSans: { family: 'General Sans', weights: [500, 600, 700], style: 'modern' },

  // Tech / Mono-inspired
  jetbrainsMono: { family: 'JetBrains Mono', weights: [400, 500, 700], style: 'tech' },
  spaceMono: { family: 'Space Mono', weights: [400, 700], style: 'tech' },
  firaCode: { family: 'Fira Code', weights: [400, 500, 700], style: 'tech' },
  ibmPlexMono: { family: 'IBM Plex Mono', weights: [500, 600, 700], style: 'tech' },

  // Display / Statement
  josefinSans: { family: 'Josefin Sans', weights: [400, 600, 700], style: 'display' },
  raleway: { family: 'Raleway', weights: [500, 600, 700], style: 'display' },
  montserrat: { family: 'Montserrat', weights: [500, 600, 700, 800], style: 'display' },
  archivo: { family: 'Archivo', weights: [500, 600, 700], style: 'display' },
  barlow: { family: 'Barlow', weights: [500, 600, 700], style: 'display' },
} as const

export type FontKey = keyof typeof FONT_POOL

// ─────────────────────────────────────────────
// Sector → Plan → Heading Font Assignments
// Each sector has 5 UNIQUE heading fonts (no repeats)
// ─────────────────────────────────────────────

export interface SectorFontMap {
  free: FontKey
  starter: FontKey
  growth: FontKey
  pro: FontKey
  enterprise: FontKey
}

export const SECTOR_FONT_ASSIGNMENTS: Record<string, SectorFontMap> = {
  // ═══ P0 (8 sectors) ═══
  berber: { free: 'inter', starter: 'playfairDisplay', growth: 'oswald', pro: 'cormorantGaramond', enterprise: 'montserrat' },
  restoran: { free: 'lora', starter: 'plusJakartaSans', growth: 'syne', pro: 'cormorantGaramond', enterprise: 'barlow' },
  doktor: { free: 'nunito', starter: 'ibmPlexSans', growth: 'sourceSerif4', pro: 'plusJakartaSans', enterprise: 'manrope' },
  guzellik: { free: 'quicksand', starter: 'plusJakartaSans', growth: 'playfairDisplay', pro: 'cormorantGaramond', enterprise: 'josefinSans' },
  avukat: { free: 'sourceSerif4', starter: 'libreBaskerville', growth: 'syne', pro: 'cormorantGaramond', enterprise: 'archivo' },
  disci: { free: 'nunito', starter: 'plusJakartaSans', growth: 'rubik', pro: 'spectral', enterprise: 'manrope' },
  oto: { free: 'outfit', starter: 'archivoBlack', growth: 'syne', pro: 'ibmPlexSans', enterprise: 'bebasNeue' },
  spor: { free: 'outfit', starter: 'anton', growth: 'syne', pro: 'montserrat', enterprise: 'bebasNeue' },

  // ═══ P1 (12 sectors) ═══
  kafe: { free: 'lora', starter: 'dmSerifDisplay', growth: 'playfairDisplay', pro: 'cormorantGaramond', enterprise: 'manrope' },
  firin: { free: 'merriweather', starter: 'plusJakartaSans', growth: 'vollkorn', pro: 'cormorantGaramond', enterprise: 'barlow' },
  eczane: { free: 'plusJakartaSans', starter: 'rubik', growth: 'ibmPlexSans', pro: 'sourceSerif4', enterprise: 'manrope' },
  veteriner: { free: 'nunito', starter: 'poppins', growth: 'plusJakartaSans', pro: 'cormorantGaramond', enterprise: 'raleway' },
  fotografci: { free: 'spaceGrotesk', starter: 'cormorantGaramond', growth: 'syne', pro: 'gildaDisplay', enterprise: 'archivo' },
  dugun: { free: 'cormorantGaramond', starter: 'spectral', growth: 'playfairDisplay', pro: 'gildaDisplay', enterprise: 'josefinSans' },
  elektrikci: { free: 'outfit', starter: 'ibmPlexSans', growth: 'plusJakartaSans', pro: 'syne', enterprise: 'archivoBlack' },
  tesisatci: { free: 'rubik', starter: 'outfit', growth: 'plusJakartaSans', pro: 'syne', enterprise: 'oswald' },
  muhasebeci: { free: 'plusJakartaSans', starter: 'ibmPlexSans', growth: 'bitter', pro: 'cormorantGaramond', enterprise: 'manrope' },
  emlakci: { free: 'plusJakartaSans', starter: 'libreBaskerville', growth: 'raleway', pro: 'cormorantGaramond', enterprise: 'montserrat' },
  ozelders: { free: 'poppins', starter: 'plusJakartaSans', growth: 'workSans', pro: 'alegreya', enterprise: 'syne' },
  kuyumcu: { free: 'ebGaramond', starter: 'cormorantGaramond', growth: 'playfairDisplay', pro: 'gildaDisplay', enterprise: 'josefinSans' },

  // ═══ P2 (10 sectors) ═══
  psikolog: { free: 'nunito', starter: 'plusJakartaSans', growth: 'quicksand', pro: 'cormorantGaramond', enterprise: 'manrope' },
  fastfood: { free: 'outfit', starter: 'syne', growth: 'bebasNeue', pro: 'archivoBlack', enterprise: 'barlow' },
  bar: { free: 'playfairDisplay', starter: 'syne', growth: 'crimsonText', pro: 'cormorantGaramond', enterprise: 'oswald' },
  telefon: { free: 'plusJakartaSans', starter: 'outfit', growth: 'spaceGrotesk', pro: 'syne', enterprise: 'jetbrainsMono' },
  klima: { free: 'plusJakartaSans', starter: 'outfit', growth: 'ibmPlexSans', pro: 'syne', enterprise: 'archivoBlack' },
  mimarlik: { free: 'spaceGrotesk', starter: 'libreCaslon', growth: 'syne', pro: 'cormorantGaramond', enterprise: 'archivo' },
  sigorta: { free: 'plusJakartaSans', starter: 'ibmPlexSans', growth: 'libreBaskerville', pro: 'cormorantGaramond', enterprise: 'manrope' },
  surucu: { free: 'plusJakartaSans', starter: 'rubik', growth: 'syne', pro: 'oswald', enterprise: 'archivo' },
  dil: { free: 'poppins', starter: 'plusJakartaSans', growth: 'alegreya', pro: 'cormorantGaramond', enterprise: 'manrope' },
  yoga: { free: 'quicksand', starter: 'libreCaslon', growth: 'plusJakartaSans', pro: 'spectral', enterprise: 'josefinSans' },

  // ═══ P3 (10 sectors) ═══
  optik: { free: 'plusJakartaSans', starter: 'spaceGrotesk', growth: 'ibmPlexSans', pro: 'syne', enterprise: 'montserrat' },
  petshop: { free: 'nunito', starter: 'poppins', growth: 'quicksand', pro: 'plusJakartaSans', enterprise: 'raleway' },
  cicekci: { free: 'lora', starter: 'crimsonText', growth: 'playfairDisplay', pro: 'cormorantGaramond', enterprise: 'josefinSans' },
  terzi: { free: 'lora', starter: 'ebGaramond', growth: 'cormorantGaramond', pro: 'spectral', enterprise: 'raleway' },
  halisaha: { free: 'outfit', starter: 'anton', growth: 'syne', pro: 'oswald', enterprise: 'bebasNeue' },
  yuzme: { free: 'plusJakartaSans', starter: 'quicksand', growth: 'syne', pro: 'cormorantGaramond', enterprise: 'manrope' },
  catering: { free: 'merriweather', starter: 'lora', growth: 'cormorantGaramond', pro: 'syne', enterprise: 'barlow' },
  kasap: { free: 'outfit', starter: 'oswald', growth: 'syne', pro: 'cormorantGaramond', enterprise: 'archivoBlack' },
  cilingir: { free: 'rubik', starter: 'outfit', growth: 'plusJakartaSans', pro: 'syne', enterprise: 'bebasNeue' },
  muzik: { free: 'plusJakartaSans', starter: 'dmSerifDisplay', growth: 'syne', pro: 'cormorantGaramond', enterprise: 'montserrat' },
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Get the font family string for a sector + plan */
export function getSectorFont(sectorId: string, plan: string): string {
  const map = SECTOR_FONT_ASSIGNMENTS[sectorId]
  if (!map) return 'Inter'
  const key = map[plan as keyof SectorFontMap]
  if (!key) return 'Inter'
  return FONT_POOL[key].family
}

/** Get font weights for a sector + plan */
export function getSectorFontWeights(sectorId: string, plan: string): number[] {
  const map = SECTOR_FONT_ASSIGNMENTS[sectorId]
  if (!map) return [600, 700]
  const key = map[plan as keyof SectorFontMap]
  if (!key) return [600, 700]
  return [...FONT_POOL[key].weights]
}

/** Validate: no font repeats within a sector */
export function validateSectorUniqueness(): { sector: string; duplicates: string[] }[] {
  const issues: { sector: string; duplicates: string[] }[] = []

  for (const [sector, map] of Object.entries(SECTOR_FONT_ASSIGNMENTS)) {
    const fonts = [map.free, map.starter, map.growth, map.pro, map.enterprise]
    const families = fonts.map(k => FONT_POOL[k].family)
    const seen = new Set<string>()
    const dupes: string[] = []

    for (const f of families) {
      if (seen.has(f)) dupes.push(f)
      seen.add(f)
    }

    if (dupes.length > 0) {
      issues.push({ sector, duplicates: [...new Set(dupes)] })
    }
  }

  return issues
}
