/**
 * CSS Differentiation Pipeline — Sprint 0.2
 * 
 * Reads differentiation_table.json and applies unique font/color combinations
 * to config files that currently use generic CSS variables.
 * 
 * Usage: npx tsx scripts/apply-css-differentiation.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const ROOT = path.resolve(__dirname, '..')
const DIFF_TABLE_PATH = path.join(ROOT, 'differentiation_table.json')
const CONFIGS_DIR = path.join(ROOT, 'packages/templates/src/themes/configs')

interface DiffEntry {
  id: string
  sector: string
  headingFont: string
  colorStrategy: string
  accentUsage: string
  containerWidth: string
  layoutApproach: string
  visualLanguage: string
}

// Color palettes for different colorStrategy values
const COLOR_PALETTES: Record<string, { accent: string; accentHover: string; accentLight: string }> = {
  'gradient-rich': { accent: '#6366F1', accentHover: '#4F46E5', accentLight: '#EEF2FF' },
  'dark-with-glow': { accent: '#06B6D4', accentHover: '#0891B2', accentLight: '#162A30' },
  'high-contrast': { accent: '#DC2626', accentHover: '#B91C1C', accentLight: '#FEF2F2' },
  'duotone': { accent: '#7C3AED', accentHover: '#6D28D9', accentLight: '#F5F3FF' },
  'monochrome-accent': { accent: '#1A1A1A', accentHover: '#404040', accentLight: '#F5F5F5' },
}

// Font body pairings
const FONT_BODY_MAP: Record<string, string> = {
  'Inter': 'Inter',
  'Outfit': 'Inter',
  'Syne': 'Inter',
  'Montserrat': 'Inter',
  'DM Sans': 'DM Sans',
  'Oswald': 'Source Sans 3',
  'Lora': 'Source Sans 3',
  'Playfair Display': 'Lato',
  'Cormorant Garamond': 'DM Sans',
  'Space Grotesk': 'Inter',
  'Bebas Neue': 'Inter',
  'Raleway': 'Inter',
  'Merriweather': 'Inter',
  'Plus Jakarta Sans': 'Plus Jakarta Sans',
  'Crimson Text': 'DM Sans',
  'Barlow': 'Inter',
  'Bodoni Moda': 'Inter',
}

// Container width CSS values
const CONTAINER_MAP: Record<string, string> = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  'full': '100%',
}

function loadDiffTable(): DiffEntry[] {
  return JSON.parse(fs.readFileSync(DIFF_TABLE_PATH, 'utf-8'))
}

function applyDifferentiation(configPath: string, diff: DiffEntry): boolean {
  let content = fs.readFileSync(configPath, 'utf-8')
  let changed = false
  
  // Replace generic Inter heading font with the differentiation font
  const headingFont = diff.headingFont
  const bodyFont = FONT_BODY_MAP[headingFont] || 'Inter'
  
  // Replace --font-heading if it's generic Inter
  const fontHeadingGeneric = /(['"]--font-heading['"])\s*:\s*['"]\\'Inter\\?',?\s*sans-serif['"]/g
  if (fontHeadingGeneric.test(content)) {
    content = content.replace(fontHeadingGeneric, `$1: "'${headingFont}', sans-serif"`)
    changed = true
  }
  
  // Also update fonts.heading.family if it's Inter
  const fontsFamilyHeading = /(heading:\s*\{[^}]*family:\s*)'Inter'/
  if (fontsFamilyHeading.test(content)) {
    content = content.replace(fontsFamilyHeading, `$1'${headingFont}'`)
    changed = true
  }
  
  // Update --font-body if generic
  if (bodyFont !== 'Inter') {
    const fontBodyGeneric = /(['"]--font-body['"])\s*:\s*['"]\\'Inter\\?',?\s*(?:system-ui,\s*)?sans-serif['"]/g
    if (fontBodyGeneric.test(content)) {
      content = content.replace(fontBodyGeneric, `$1: "'${bodyFont}', system-ui, sans-serif"`)
      changed = true
    }
    
    const fontsFamilyBody = /(body:\s*\{[^}]*family:\s*)'Inter'/
    if (fontsFamilyBody.test(content)) {
      content = content.replace(fontsFamilyBody, `$1'${bodyFont}'`)
      changed = true
    }
  }
  
  // Update container width
  const containerWidth = CONTAINER_MAP[diff.containerWidth]
  if (containerWidth) {
    const containerGeneric = /(['"]--container-default['"])\s*:\s*'[^']+'/
    if (containerGeneric.test(content)) {
      content = content.replace(containerGeneric, `$1: '${containerWidth}'`)
      changed = true
    }
  }
  
  if (changed) {
    fs.writeFileSync(configPath, content, 'utf-8')
  }
  
  return changed
}

// ─── MAIN ───

const diffTable = loadDiffTable()
console.log(`Loaded ${diffTable.length} differentiation entries`)

let updatedCount = 0
let skippedCount = 0

for (const diff of diffTable) {
  const configFileName = `${diff.id}-config.ts`
  const configPath = path.join(CONFIGS_DIR, configFileName)
  
  if (!fs.existsSync(configPath)) {
    skippedCount++
    continue
  }
  
  const wasUpdated = applyDifferentiation(configPath, diff)
  if (wasUpdated) {
    updatedCount++
    console.log(`  ✅ ${diff.id}: ${diff.headingFont} (${diff.colorStrategy})`)
  }
}

console.log(`\nResults: ${updatedCount} configs updated, ${skippedCount} skipped (no config file)`)
