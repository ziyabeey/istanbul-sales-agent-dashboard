/**
 * Generate P0ThemeDef entries for sectors missing from theme-catalog.
 * v2 — Reads theme id from config file name, extracts CSS from config content.
 */

import * as fs from 'fs'
import * as path from 'path'

const CONFIGS_DIR = path.resolve(__dirname, '../packages/templates/src/themes/configs')
const OUTPUT_DIR = path.resolve(__dirname, '../packages/templates/src/themes')

const EXISTING = new Set([
  'berber','restoran','doktor','guzellik','avukat','disci','oto','spor',
  'kafe','firin','eczane','veteriner','fotografci','dugun','elektrikci',
  'tesisatci','muhasebeci','emlakci','ozelders','kuyumcu',
  'psikolog','fastfood','bar','telefon','klima','mimarlik',
  'sigorta','surucu','dil','yoga',
  'optik','petshop','cicekci','terzi','halisaha','yuzme',
  'catering','kasap','cilingir','muzik',
])

const LABELS: Record<string, string> = {
  asansor:'Asansör', boyaci:'Boyacı', cambalkon:'Cam Balkon', dis:'Diş Kliniği',
  emlak:'Emlak', fitness:'Fitness', foto:'Fotoğrafçı', haliyikama:'Halı Yıkama',
  hukuk:'Hukuk Bürosu', insaat:'İnşaat', kahveci:'Kahveci', kargo:'Kargo',
  klinik:'Özel Klinik', kres:'Kreş', lastikci:'Lastikçi', matbaa:'Matbaa',
  mobilya:'Mobilya', mobilyaci:'Mobilyacı', muhasebe:'Muhasebe', nakliyat:'Nakliyat',
  organik:'Organik Gıda', organizasyon:'Organizasyon', otoyikama:'Oto Yıkama',
  pastane:'Pastane', peyzaj:'Peyzaj', temizlik:'Temizlik', vet:'Veteriner',
}

const SCHEMA: Record<string, string> = {
  asansor:'LocalBusiness', boyaci:'LocalBusiness', cambalkon:'LocalBusiness',
  dis:'Dentist', emlak:'RealEstateAgent', fitness:'SportsActivityLocation',
  foto:'LocalBusiness', haliyikama:'LocalBusiness', hukuk:'LegalService',
  insaat:'GeneralContractor', kahveci:'CafeOrCoffeeShop', kargo:'LocalBusiness',
  klinik:'MedicalClinic', kres:'ChildCare', lastikci:'LocalBusiness',
  matbaa:'LocalBusiness', mobilya:'FurnitureStore', mobilyaci:'FurnitureStore',
  muhasebe:'AccountingService', nakliyat:'MovingCompany', organik:'GroceryStore',
  organizasyon:'EventVenue', otoyikama:'LocalBusiness', pastane:'Bakery',
  peyzaj:'LocalBusiness', temizlik:'LocalBusiness', vet:'VeterinaryCare',
}

// Font list from differentiation_table.json
const FONTS = [
  'Inter', 'Outfit', 'Syne', 'Montserrat', 'DM Sans', 'Oswald', 'Lora',
  'Playfair Display', 'Cormorant Garamond', 'Space Grotesk', 'Bebas Neue',
  'Raleway', 'Merriweather', 'Plus Jakarta Sans', 'Source Sans 3', 'Crimson Text',
  'Barlow', 'Bodoni Moda',
]

const PLAN_ORDER = ['free', 'starter', 'growth', 'pro', 'enterprise']

interface ThemeEntry {
  id: string
  name: string
  sectorId: string
  plan: string
  isDark: boolean
  accent: string
  fontHeading: string
  fontBody: string
}

function extractFromConfig(filePath: string, fileName: string): ThemeEntry | null {
  // Theme ID from filename: "berber-sade-config.ts" → "berber-sade"
  const themeId = fileName.replace('-config.ts', '')
  
  const content = fs.readFileSync(filePath, 'utf-8')
  
  // Extract sectorId from content or filename
  const sectorMatch = content.match(/sectorId:\s*'([^']+)'/)
  const sectorId = sectorMatch?.[1] ?? themeId.split('-')[0]
  
  // Extract name
  const nameMatch = content.match(/name:\s*'([^']+)'/)
  const name = nameMatch?.[1] ?? themeId.split('-').slice(1).map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
  
  // Extract plan
  const planMatch = content.match(/plan:\s*'([^']+)'/)
  const plan = planMatch?.[1] ?? 'free'
  
  // Extract isDark
  const isDark = /isDark:\s*true/.test(content)
  
  // Extract accent color
  const accentMatch = content.match(/['"]--color-accent['"]\s*:\s*['"]([^'"]+)['"]/)
  const accent = accentMatch?.[1] ?? '#1A1A1A'
  
  // Extract font heading from cssVariables or fonts
  let fontHeading = 'Inter'
  const fontHMatch = content.match(/['"]--font-heading['"]\s*:\s*['"]\\'?([^'\\,]+)/)
  if (fontHMatch) fontHeading = fontHMatch[1].trim()
  else {
    const familyMatch = content.match(/heading:\s*\{[^}]*family:\s*'([^']+)'/)
    if (familyMatch) fontHeading = familyMatch[1]
  }
  
  // Extract font body
  let fontBody = 'Inter'
  const fontBMatch = content.match(/['"]--font-body['"]\s*:\s*['"]\\'?([^'\\,]+)/)
  if (fontBMatch) fontBody = fontBMatch[1].trim()
  else {
    const familyMatch = content.match(/body:\s*\{[^}]*family:\s*'([^']+)'/)
    if (familyMatch) fontBody = familyMatch[1]
  }
  
  return { id: themeId, name, sectorId, plan, isDark, accent, fontHeading, fontBody }
}

// ─── MAIN ───

const configFiles = fs.readdirSync(CONFIGS_DIR).filter(f => f.endsWith('-config.ts')).sort()

const sectorThemes: Record<string, ThemeEntry[]> = {}

for (const file of configFiles) {
  const entry = extractFromConfig(path.join(CONFIGS_DIR, file), file)
  if (!entry) continue
  if (EXISTING.has(entry.sectorId)) continue
  
  if (!sectorThemes[entry.sectorId]) sectorThemes[entry.sectorId] = []
  sectorThemes[entry.sectorId].push(entry)
}

// Assign fonts from differentiation table if currently Inter
let fontIdx = 0
for (const themes of Object.values(sectorThemes)) {
  for (const t of themes) {
    if (t.fontHeading === 'Inter' || t.fontHeading === ': ' || t.fontHeading.includes(':')) {
      t.fontHeading = FONTS[fontIdx % FONTS.length]
      fontIdx++
    }
    if (t.fontBody === 'Inter' || t.fontBody === ': ' || t.fontBody.includes(':')) {
      t.fontBody = ['Inter', 'DM Sans', 'Source Sans 3', 'Plus Jakarta Sans'][fontIdx % 4]
    }
  }
}

console.log(`Found ${Object.keys(sectorThemes).length} missing sectors, ${Object.values(sectorThemes).reduce((s, a) => s + a.length, 0)} total themes`)

// Generate output
let output = `/**
 * @kepenk/templates — Extended Sector Themes (Auto-Generated)
 *
 * P0ThemeDef arrays for ${Object.keys(sectorThemes).length} sectors missing from the unified catalog.
 * Total: ${Object.values(sectorThemes).reduce((s, a) => s + a.length, 0)} themes.
 * Generated: ${new Date().toISOString().slice(0, 10)}
 */

import type { P0ThemeDef } from './p0-themes'

`

const exportNames: string[] = []

for (const [sector, themes] of Object.entries(sectorThemes).sort()) {
  const constName = `${sector.toUpperCase()}_EXT_THEMES`
  exportNames.push(constName)
  
  output += `// ═══ ${(LABELS[sector] || sector).toUpperCase()} ═══\n`
  output += `export const ${constName}: P0ThemeDef[] = [\n`
  
  for (let i = 0; i < themes.length; i++) {
    const t = themes[i]
    const plan = PLAN_ORDER[i % PLAN_ORDER.length]
    const animLevel = plan === 'free' ? 'css-only' : plan === 'starter' ? 'framer-basic' : 'framer-full'
    const demoKey = t.id.split('-').slice(1).join('-')
    
    output += `  {\n`
    output += `    id: '${t.id}',\n`
    output += `    name: '${t.name.replace(/'/g, "\\'")}',\n`
    output += `    sectorId: '${sector}',\n`
    output += `    plan: '${t.plan || plan}',\n`
    output += `    description: '${t.name.replace(/'/g, "\\'")} — ${LABELS[sector] || sector}.',\n`
    output += `    designPhilosophy: '${t.fontHeading} heading, ${t.isDark ? 'koyu' : 'aydınlık'} tema.',\n`
    output += `    isDark: ${t.isDark},\n`
    output += `    fonts: {\n`
    output += `      heading: { family: '${t.fontHeading}', weights: [600, 700] },\n`
    output += `      body: { family: '${t.fontBody}', weights: [400, 500] },\n`
    output += `    },\n`
    output += `    cssOverrides: {\n`
    output += `      '--color-accent': '${t.accent}',\n`
    output += `      '--font-heading': "'${t.fontHeading}', sans-serif",\n`
    output += `      '--font-body': "'${t.fontBody}', system-ui, sans-serif",\n`
    output += `    },\n`
    output += `    homeSections: ['hero::fullscreen_overlay', 'services::card_grid', 'about::split_left', 'contact::simple_form'],\n`
    output += `    pages: ['home'],\n`
    output += `    sectorSections: [],\n`
    output += `    animationLevel: '${animLevel}',\n`
    output += `    demoBusinessKey: '${demoKey}',\n`
    output += `  },\n`
  }
  
  output += `]\n\n`
}

const outputFile = path.join(OUTPUT_DIR, 'extended-sector-themes.ts')
fs.writeFileSync(outputFile, output, 'utf-8')
console.log(`Wrote ${outputFile}`)

// Print SECTOR_LABELS additions
console.log('\n=== SECTOR_LABELS additions ===')
for (const s of Object.keys(sectorThemes).sort()) {
  console.log(`  ${s}: '${LABELS[s] || s}',`)
}

// Print SECTOR_SCHEMA additions
console.log('\n=== SECTOR_SCHEMA additions ===')
for (const s of Object.keys(sectorThemes).sort()) {
  console.log(`  ${s}: '${SCHEMA[s] || 'LocalBusiness'}',`)
}

// Print export names for theme-catalog
console.log('\n=== Import line ===')
console.log(`import { ${exportNames.join(', ')} } from '../themes/extended-sector-themes'`)
