/**
 * Color Palette Enrichment — Sprint 1.2
 * 
 * Assigns unique accent color palettes to configs where accent colors are generic.
 * Uses HSL color space for harmonious variations within each sector.
 *
 * Usage: npx tsx scripts/enrich-color-palettes.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const CONFIGS_DIR = path.resolve(__dirname, '../packages/templates/src/themes/configs')
const DIFF_TABLE = path.resolve(__dirname, '../differentiation_table.json')

// Curated sector color palettes - each sector gets a base hue range
const SECTOR_HUES: Record<string, number> = {
  berber: 30, restoran: 15, doktor: 200, guzellik: 330, avukat: 220,
  dis: 190, oto: 25, spor: 0, kafe: 28, firin: 38, eczane: 150,
  vet: 160, foto: 210, dugun: 340, elektrikci: 48, tesisatci: 210,
  muhasebe: 230, emlak: 220, ozelders: 265, kuyumcu: 45,
  psikolog: 270, fastfood: 5, bar: 330, telefon: 220, klima: 195,
  mimarlik: 215, sigorta: 210, surucu: 25, dil: 260, yoga: 150,
  optik: 200, petshop: 140, cicekci: 350, terzi: 285, halisaha: 120,
  yuzme: 188, catering: 20, kasap: 5, cilingir: 40, muzik: 280,
  asansor: 210, boyaci: 15, cambalkon: 195, hukuk: 225, insaat: 35,
  kahveci: 30, kargo: 20, klinik: 190, kres: 140, lastikci: 35,
  matbaa: 250, mobilya: 25, nakliyat: 215, organik: 95, organizasyon: 320,
  otoyikama: 200, pastane: 350, peyzaj: 120, temizlik: 175, fitness: 0,
}

// Plan-based saturation and lightness variations
const PLAN_COLOR_PROFILES: Record<string, { satShift: number; lightBase: number; lightDark: number }> = {
  free:       { satShift: -15, lightBase: 45, lightDark: 30 },
  starter:    { satShift: -5,  lightBase: 42, lightDark: 28 },
  growth:     { satShift: 5,   lightBase: 48, lightDark: 32 },
  pro:        { satShift: 10,  lightBase: 40, lightDark: 25 },
  enterprise: { satShift: 0,   lightBase: 35, lightDark: 20 },
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100
  s /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function generateAccentPalette(sectorHue: number, variantIdx: number, plan: string, isDark: boolean) {
  // Each variant in a sector gets a hue rotation of 15-25 degrees
  const hueOffset = variantIdx * 22
  const hue = (sectorHue + hueOffset) % 360
  
  const profile = PLAN_COLOR_PROFILES[plan] || PLAN_COLOR_PROFILES.free
  const sat = Math.min(85, 65 + profile.satShift)
  const lightMain = isDark ? profile.lightDark + 15 : profile.lightBase
  
  return {
    accent: hslToHex(hue, sat, lightMain),
    accentHover: hslToHex(hue, sat, Math.max(lightMain - 8, 15)),
    accentActive: hslToHex(hue, sat, Math.max(lightMain - 12, 10)),
    accentLight: isDark 
      ? hslToHex(hue, 20, 15) 
      : hslToHex(hue, 80, 95),
  }
}

// Load differentiation table to get sector/plan info
interface DiffEntry { id: string; sector: string }
const diffEntries: DiffEntry[] = JSON.parse(fs.readFileSync(DIFF_TABLE, 'utf-8'))
const diffMap = new Map(diffEntries.map(e => [e.id, e]))

// Group configs by sector
const configFiles = fs.readdirSync(CONFIGS_DIR).filter(f => f.endsWith('-config.ts')).sort()
const sectorFiles = new Map<string, string[]>()

for (const f of configFiles) {
  const themeId = f.replace('-config.ts', '')
  const sector = themeId.split('-')[0]
  if (!sectorFiles.has(sector)) sectorFiles.set(sector, [])
  sectorFiles.get(sector)!.push(f)
}

let updatedCount = 0

for (const [sector, files] of sectorFiles) {
  const baseHue = SECTOR_HUES[sector] ?? Math.floor(Math.random() * 360)
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const themeId = file.replace('-config.ts', '')
    const filePath = path.join(CONFIGS_DIR, file)
    let content = fs.readFileSync(filePath, 'utf-8')
    
    // Detect plan from content
    const planMatch = content.match(/plan:\s*'([^']+)'/)
    const plan = planMatch?.[1] ?? 'free'
    
    // Detect isDark
    const isDark = /isDark:\s*true/.test(content)
    
    const palette = generateAccentPalette(baseHue, i, plan, isDark)
    
    let changed = false
    
    // Replace --color-accent (main) — only if it's a common generic value
    const accentMatch = content.match(/(['"]--color-accent['"])\s*:\s*['"]([^'"]+)['"]/)
    if (accentMatch) {
      const existingColor = accentMatch[2]
      // Check if it's one of the overused colors
      const OVERUSED = ['#0284C7', '#2563EB', '#1A1A1A', '#C9A84C']
      if (OVERUSED.includes(existingColor)) {
        content = content.replace(
          new RegExp(`(['"]--color-accent['"])\\s*:\\s*['"]${existingColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`),
          `$1: '${palette.accent}'`
        )
        changed = true
      }
    }
    
    // Add --color-accent-hover if missing
    if (!content.includes('--color-accent-hover')) {
      content = content.replace(
        /(['"]--color-accent['"])\s*:\s*'([^']+)'/,
        `$1: '$2',\n    '--color-accent-hover': '${palette.accentHover}'`
      )
      changed = true
    }
    
    // Add --color-accent-active if missing  
    if (!content.includes('--color-accent-active')) {
      content = content.replace(
        /(['"]--color-accent-hover['"])\s*:\s*'([^']+)'/,
        `$1: '$2',\n    '--color-accent-active': '${palette.accentActive}'`
      )
      changed = true
    }
    
    // Add --color-accent-light if missing
    if (!content.includes('--color-accent-light')) {
      const insertPoint = content.match(/(['"]--color-accent(?:-active|-hover)?['"])\s*:\s*'([^']+)'/)
      if (insertPoint) {
        content = content.replace(
          insertPoint[0],
          `${insertPoint[0]},\n    '--color-accent-light': '${palette.accentLight}'`
        )
        changed = true
      }
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8')
      updatedCount++
    }
  }
}

console.log(`Color palette enrichment complete: ${updatedCount} configs updated`)

// Verify no more overused accent colors
let overusedAfter = 0
for (const f of configFiles) {
  const content = fs.readFileSync(path.join(CONFIGS_DIR, f), 'utf-8')
  const match = content.match(/['"]--color-accent['"]\s*:\s*'([^']+)'/)
  if (match && ['#0284C7', '#2563EB', '#1A1A1A'].includes(match[1])) {
    overusedAfter++
  }
}
console.log(`Remaining overused accent colors: ${overusedAfter}`)
