/**
 * Script: Apply font-pairings.ts assignments to all theme definition files.
 *
 * Usage: node packages/templates/scripts/apply-fonts.mjs
 *
 * For each theme, updates:
 * 1. fonts.heading.family
 * 2. fonts.heading.weights
 * 3. cssOverrides['--font-heading']
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const THEMES_DIR = join(__dirname, '..', 'src', 'themes')

// ── Font pool (mirrored from font-pairings.ts) ──
const FONT_POOL = {
  inter: { family: 'Inter', weights: [600, 700], serif: false },
  ibmPlexSans: { family: 'IBM Plex Sans', weights: [500, 600, 700], serif: false },
  spaceGrotesk: { family: 'Space Grotesk', weights: [500, 600, 700], serif: false },
  geist: { family: 'Geist', weights: [500, 600, 700], serif: false },
  lora: { family: 'Lora', weights: [400, 700], serif: true },
  merriweather: { family: 'Merriweather', weights: [400, 700], serif: true },
  crimsonText: { family: 'Crimson Text', weights: [400, 600, 700], serif: true },
  vollkorn: { family: 'Vollkorn', weights: [400, 600, 700], serif: true },
  ebGaramond: { family: 'EB Garamond', weights: [400, 600, 700], serif: true },
  syne: { family: 'Syne', weights: [600, 700, 800], serif: false },
  bebasNeue: { family: 'Bebas Neue', weights: [400], serif: false },
  archivoBlack: { family: 'Archivo Black', weights: [400], serif: false },
  anton: { family: 'Anton', weights: [400], serif: false },
  oswald: { family: 'Oswald', weights: [500, 600, 700], serif: false },
  cormorantGaramond: { family: 'Cormorant Garamond', weights: [400, 600, 700], serif: true },
  playfairDisplay: { family: 'Playfair Display', weights: [400, 600, 700], serif: true },
  gildaDisplay: { family: 'Gilda Display', weights: [400], serif: true },
  spectral: { family: 'Spectral', weights: [400, 600, 700], serif: true },
  libreCaslon: { family: 'Libre Caslon Text', weights: [400, 700], serif: true },
  nunito: { family: 'Nunito', weights: [600, 700, 800], serif: false },
  quicksand: { family: 'Quicksand', weights: [500, 600, 700], serif: false },
  rubik: { family: 'Rubik', weights: [400, 500, 600, 700], serif: false },
  poppins: { family: 'Poppins', weights: [500, 600, 700], serif: false },
  workSans: { family: 'Work Sans', weights: [500, 600, 700], serif: false },
  dmSerifDisplay: { family: 'DM Serif Display', weights: [400], serif: true },
  sourceSerif4: { family: 'Source Serif 4', weights: [400, 600, 700], serif: true },
  libreBaskerville: { family: 'Libre Baskerville', weights: [400, 700], serif: true },
  bitter: { family: 'Bitter', weights: [400, 600, 700], serif: true },
  alegreya: { family: 'Alegreya', weights: [400, 600, 700], serif: true },
  plusJakartaSans: { family: 'Plus Jakarta Sans', weights: [500, 600, 700], serif: false },
  outfit: { family: 'Outfit', weights: [500, 600, 700], serif: false },
  manrope: { family: 'Manrope', weights: [500, 600, 700, 800], serif: false },
  satoshi: { family: 'Satoshi', weights: [500, 700], serif: false },
  generalSans: { family: 'General Sans', weights: [500, 600, 700], serif: false },
  jetbrainsMono: { family: 'JetBrains Mono', weights: [400, 500, 700], serif: false },
  spaceMono: { family: 'Space Mono', weights: [400, 700], serif: false },
  firaCode: { family: 'Fira Code', weights: [400, 500, 700], serif: false },
  ibmPlexMono: { family: 'IBM Plex Mono', weights: [500, 600, 700], serif: false },
  josefinSans: { family: 'Josefin Sans', weights: [400, 600, 700], serif: false },
  raleway: { family: 'Raleway', weights: [500, 600, 700], serif: false },
  montserrat: { family: 'Montserrat', weights: [500, 600, 700, 800], serif: false },
  archivo: { family: 'Archivo', weights: [500, 600, 700], serif: false },
  barlow: { family: 'Barlow', weights: [500, 600, 700], serif: false },
}

// ── Sector assignments (from font-pairings.ts) ──
const ASSIGNMENTS = {
  berber: { free: 'inter', starter: 'playfairDisplay', growth: 'oswald', pro: 'cormorantGaramond', enterprise: 'montserrat' },
  restoran: { free: 'lora', starter: 'plusJakartaSans', growth: 'syne', pro: 'cormorantGaramond', enterprise: 'barlow' },
  doktor: { free: 'nunito', starter: 'ibmPlexSans', growth: 'sourceSerif4', pro: 'plusJakartaSans', enterprise: 'manrope' },
  guzellik: { free: 'quicksand', starter: 'plusJakartaSans', growth: 'playfairDisplay', pro: 'cormorantGaramond', enterprise: 'josefinSans' },
  avukat: { free: 'sourceSerif4', starter: 'libreBaskerville', growth: 'syne', pro: 'cormorantGaramond', enterprise: 'archivo' },
  disci: { free: 'nunito', starter: 'plusJakartaSans', growth: 'rubik', pro: 'spectral', enterprise: 'manrope' },
  oto: { free: 'outfit', starter: 'archivoBlack', growth: 'syne', pro: 'ibmPlexSans', enterprise: 'bebasNeue' },
  spor: { free: 'outfit', starter: 'anton', growth: 'syne', pro: 'montserrat', enterprise: 'bebasNeue' },
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

// ── Theme files to process ──
const THEME_FILES = [
  'p0-berber.ts', 'p0-restoran.ts', 'p0-doktor.ts', 'p0-guzellik.ts',
  'p0-avukat.ts', 'p0-disci.ts', 'p0-oto.ts', 'p0-spor.ts',
  'p1-kafe.ts', 'p1-health-food.ts', 'p1-creative.ts', 'p1-teknik.ts', 'p1-professional.ts',
  'p2-themes-a.ts', 'p2-themes-b.ts', 'p3-themes-a.ts', 'p3-themes-b.ts',
]

// ── Helpers ──
function fontCssValue(fontKey) {
  const font = FONT_POOL[fontKey]
  if (!font) return null
  const fallback = font.serif ? 'serif' : 'sans-serif'
  return `'${font.family}', ${fallback}`
}

// ── Process each file ──
let totalChanged = 0
let totalSkipped = 0

for (const file of THEME_FILES) {
  const filePath = join(THEMES_DIR, file)
  let content
  try {
    content = readFileSync(filePath, 'utf-8')
  } catch {
    console.log(`SKIP: ${file} (not found)`)
    continue
  }

  let modified = content
  let fileChanges = 0

  // Find all theme blocks: look for sectorId + plan patterns
  // Pattern: id: 'SECTOR-NAME', ... sectorId: 'SECTOR', plan: 'PLAN'
  const themeRegex = /id:\s*'([^']+)'[^}]*?sectorId:\s*'([^']+)'[^}]*?plan:\s*'([^']+)'/gs
  let match

  while ((match = themeRegex.exec(content)) !== null) {
    const themeId = match[1]
    const sectorId = match[2]
    const plan = match[3]

    const sectorMap = ASSIGNMENTS[sectorId]
    if (!sectorMap) {
      console.log(`  SKIP: ${themeId} (no sector assignment for ${sectorId})`)
      totalSkipped++
      continue
    }

    const fontKey = sectorMap[plan]
    if (!fontKey) {
      console.log(`  SKIP: ${themeId} (no plan assignment for ${plan})`)
      totalSkipped++
      continue
    }

    const font = FONT_POOL[fontKey]
    if (!font) {
      console.log(`  SKIP: ${themeId} (unknown font key ${fontKey})`)
      totalSkipped++
      continue
    }

    const cssVal = fontCssValue(fontKey)

    // Find the theme block boundaries (rough: from this id to the next theme or end)
    // We need to find and replace within this theme's block
    const idStr = `id: '${themeId}'`
    const idIdx = modified.indexOf(idStr)
    if (idIdx === -1) continue

    // Find the end of this theme block (next `id:` or `]` close)
    const nextIdIdx = modified.indexOf("id: '", idIdx + idStr.length)
    const blockEnd = nextIdIdx > -1 ? nextIdIdx : modified.length
    const block = modified.slice(idIdx, blockEnd)

    let newBlock = block

    // 1. Replace heading family
    const headingFamilyRegex = /heading:\s*\{\s*family:\s*'[^']+'/
    const headingMatch = headingFamilyRegex.exec(newBlock)
    if (headingMatch) {
      const oldFamily = headingMatch[0]
      const newFamily = `heading: { family: '${font.family}'`
      newBlock = newBlock.replace(oldFamily, newFamily)
    }

    // 2. Replace heading weights (within heading block)
    const headingWeightsRegex = /(heading:\s*\{\s*family:\s*'[^']+',\s*weights:\s*)\[[^\]]+\]/
    const weightsMatch = headingWeightsRegex.exec(newBlock)
    if (weightsMatch) {
      const oldWeights = weightsMatch[0]
      const newWeights = weightsMatch[1] + `[${font.weights.join(', ')}]`
      newBlock = newBlock.replace(oldWeights, newWeights)
    }

    // 3. Replace --font-heading CSS variable
    const fontHeadingRegex = /'--font-heading':\s*"'[^"]+"/
    const fontHeadingMatch = fontHeadingRegex.exec(newBlock)
    if (fontHeadingMatch) {
      const oldCss = fontHeadingMatch[0]
      const newCss = `'--font-heading': "'${font.family}', ${font.serif ? 'serif' : 'sans-serif'}"`
      newBlock = newBlock.replace(oldCss, newCss)
    }

    if (newBlock !== block) {
      modified = modified.slice(0, idIdx) + newBlock + modified.slice(blockEnd)
      fileChanges++
      totalChanged++
    } else {
      totalSkipped++
    }
  }

  if (fileChanges > 0) {
    writeFileSync(filePath, modified, 'utf-8')
    console.log(`${file}: ${fileChanges} themes updated`)
  } else {
    console.log(`${file}: no changes needed`)
  }
}

console.log(`\nDone: ${totalChanged} themes changed, ${totalSkipped} skipped/unchanged`)
