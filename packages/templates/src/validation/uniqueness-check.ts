/**
 * @kepenk/templates — Theme Uniqueness Validation
 *
 * Checks that themes within the same sector are visually distinct.
 * Run: npx tsx packages/templates/src/validation/uniqueness-check.ts
 *
 * Scoring (per sector, 5 themes):
 * 1. Heading font uniqueness (0-20)
 * 2. Section order uniqueness (0-20)
 * 3. CSS differentiation (0-20)
 * 4. Container width variety (0-20)
 * 5. Section count spread (0-20)
 * Total: 0-100, target ≥80
 */

import { ALL_THEME_DEFS } from '../registry/theme-catalog'
import type { P0ThemeDef } from '../themes/p0-themes'

interface SectorScore {
  sector: string
  fontScore: number
  sectionScore: number
  cssScore: number
  containerScore: number
  countScore: number
  total: number
}

function groupBySector(): Map<string, P0ThemeDef[]> {
  const map = new Map<string, P0ThemeDef[]>()
  for (const def of ALL_THEME_DEFS) {
    const list = map.get(def.sectorId) ?? []
    list.push(def)
    map.set(def.sectorId, list)
  }
  return map
}

/** 1. All 5 heading fonts unique = 20, each duplicate = -4 */
function scoreFonts(themes: P0ThemeDef[]): number {
  const fonts = themes.map(t => t.fonts.heading.family)
  const unique = new Set(fonts).size
  return Math.max(0, unique * 4)
}

/** 2. Section order similarity (Jaccard distance between consecutive pairs) */
function scoreSections(themes: P0ThemeDef[]): number {
  let totalDistance = 0
  let pairs = 0

  for (let i = 0; i < themes.length; i++) {
    for (let j = i + 1; j < themes.length; j++) {
      const a = new Set(themes[i].homeSections)
      const b = new Set(themes[j].homeSections)
      const union = new Set([...a, ...b])
      const intersection = [...a].filter(x => b.has(x))
      const jaccard = union.size > 0 ? intersection.length / union.size : 1
      totalDistance += (1 - jaccard) // distance = 1 - similarity
      pairs++
    }
  }

  const avgDistance = pairs > 0 ? totalDistance / pairs : 0
  // avgDistance 0 = identical, 1 = completely different
  // Map [0, 1] → [0, 20]
  return Math.round(avgDistance * 20)
}

// Plan-based layout tokens (mirrored from config-loader for validation)
const PLAN_TOKENS: Record<string, Record<string, string>> = {
  free:       { '--container-default': '640px',  '--section-py': '48px', '--radius-md': '4px',  '--radius-lg': '8px' },
  starter:    { '--container-default': '960px',  '--section-py': '64px', '--radius-md': '8px',  '--radius-lg': '12px' },
  growth:     { '--container-default': '1120px', '--section-py': '80px', '--radius-md': '12px', '--radius-lg': '16px' },
  pro:        { '--container-default': '1280px', '--section-py': '96px', '--radius-md': '4px',  '--radius-lg': '8px' },
  enterprise: { '--container-default': '1440px', '--section-py': '64px', '--radius-md': '0px',  '--radius-lg': '4px' },
}

/** Merge plan tokens with theme cssOverrides (theme overrides win) */
function effectiveCss(t: P0ThemeDef): Record<string, string> {
  const planDefaults = PLAN_TOKENS[t.plan] ?? {}
  return { ...planDefaults, ...t.cssOverrides }
}

/** 3. CSS variable differentiation (count unique overrides across themes) */
function scoreCss(themes: P0ThemeDef[]): number {
  const uniqueValues = new Map<string, Set<string>>()

  for (const t of themes) {
    for (const [key, val] of Object.entries(effectiveCss(t))) {
      if (!uniqueValues.has(key)) uniqueValues.set(key, new Set())
      uniqueValues.get(key)!.add(val)
    }
  }

  // Score: for each CSS property, count unique values / total themes
  let diversitySum = 0
  let propCount = 0
  for (const [, vals] of uniqueValues) {
    if (vals.size > 1) {
      diversitySum += vals.size / themes.length
      propCount++
    }
  }

  const avgDiversity = propCount > 0 ? diversitySum / propCount : 0
  return Math.round(avgDiversity * 20)
}

/** 4. Container width variety (count distinct --container-default values) */
function scoreContainer(themes: P0ThemeDef[]): number {
  const widths = new Set<string>()
  for (const t of themes) {
    const css = effectiveCss(t)
    widths.add(css['--container-default'] ?? 'default')
  }
  // 1 unique = 4, 2 = 8, ..., 5 = 20
  return Math.min(20, widths.size * 4)
}

/** 5. Section count spread (range between min and max) */
function scoreCountSpread(themes: P0ThemeDef[]): number {
  const counts = themes.map(t => t.homeSections.length)
  const min = Math.min(...counts)
  const max = Math.max(...counts)
  const range = max - min
  // range 0 = 0, 4+ = 20
  return Math.min(20, range * 5)
}

// ── Run ──
const sectors = groupBySector()
const scores: SectorScore[] = []

for (const [sector, themes] of sectors) {
  const fontScore = scoreFonts(themes)
  const sectionScore = scoreSections(themes)
  const cssScore = scoreCss(themes)
  const containerScore = scoreContainer(themes)
  const countScore = scoreCountSpread(themes)
  const total = fontScore + sectionScore + cssScore + containerScore + countScore

  scores.push({ sector, fontScore, sectionScore, cssScore, containerScore, countScore, total })
}

scores.sort((a, b) => a.total - b.total)

// ── Output ──
console.log('\n═══ THEME UNIQUENESS VALIDATION ═══\n')
console.log('Sector'.padEnd(15), 'Font', 'Sect', 'CSS', 'Cont', 'Count', 'TOTAL')
console.log('─'.repeat(60))

let passing = 0
let failing = 0

for (const s of scores) {
  const status = s.total >= 80 ? '✓' : s.total >= 60 ? '~' : '✗'
  console.log(
    s.sector.padEnd(15),
    String(s.fontScore).padStart(4),
    String(s.sectionScore).padStart(4),
    String(s.cssScore).padStart(4),
    String(s.containerScore).padStart(4),
    String(s.countScore).padStart(5),
    String(s.total).padStart(5),
    status
  )
  if (s.total >= 80) passing++
  else failing++
}

console.log('─'.repeat(60))
const avg = Math.round(scores.reduce((a, b) => a + b.total, 0) / scores.length)
console.log(`\nAverage: ${avg}/100 | Passing (≥80): ${passing}/${scores.length} | Failing: ${failing}`)

// Font duplicate check
console.log('\n═══ FONT DUPLICATE CHECK ═══\n')
let fontIssues = 0
for (const [sector, themes] of sectors) {
  const fonts = themes.map(t => t.fonts.heading.family)
  const unique = new Set(fonts)
  if (unique.size < fonts.length) {
    const dupes = fonts.filter((f, i) => fonts.indexOf(f) !== i)
    console.log(`  ${sector}: DUPLICATE → ${[...new Set(dupes)].join(', ')}`)
    fontIssues++
  }
}
if (fontIssues === 0) console.log('  All 40 sectors: 0 duplicate heading fonts ✓')

// Summary stats
const allFonts = new Set(ALL_THEME_DEFS.map(t => t.fonts.heading.family))
console.log(`\n═══ SUMMARY ═══`)
console.log(`  Total themes: ${ALL_THEME_DEFS.length}`)
console.log(`  Total sectors: ${sectors.size}`)
console.log(`  Unique heading fonts: ${allFonts.size}`)
console.log(`  Average uniqueness score: ${avg}/100`)
