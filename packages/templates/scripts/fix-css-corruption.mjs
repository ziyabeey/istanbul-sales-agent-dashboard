/**
 * Fix CSS token corruption: remove ALL traces of badly inserted tokens,
 * whether on their own line or merged inline. Then fix commas/formatting.
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const THEMES_DIR = join(__dirname, '..', 'src', 'themes')

const THEME_FILES = [
  'p0-berber.ts', 'p0-restoran.ts', 'p0-doktor.ts', 'p0-guzellik.ts',
  'p0-avukat.ts', 'p0-disci.ts', 'p0-oto.ts', 'p0-spor.ts',
  'p1-kafe.ts', 'p1-health-food.ts', 'p1-creative.ts', 'p1-teknik.ts', 'p1-professional.ts',
  'p2-themes-a.ts', 'p2-themes-b.ts', 'p3-themes-a.ts', 'p3-themes-b.ts',
]

const BAD_TOKENS = ['--container-default', '--section-py', '--radius-md', '--radius-lg']

for (const file of THEME_FILES) {
  const filePath = join(THEMES_DIR, file)
  let content
  try {
    content = readFileSync(filePath, 'utf-8')
  } catch { continue }

  let modified = content

  // Phase 1: Remove bad tokens ANYWHERE (inline or standalone line)
  for (const token of BAD_TOKENS) {
    // Remove inline: ,? '${token}': '...',?  (with optional surrounding whitespace)
    const inlineRe = new RegExp(`\\s*,?\\s*'${token}':\\s*'[^']*'\\s*,?`, 'g')
    modified = modified.replace(inlineRe, '')
  }

  // Phase 2: Fix empty cssOverrides objects that lost all content
  // cssOverrides: {  }, → cssOverrides: {},
  modified = modified.replace(/cssOverrides:\s*\{\s*\}/g, 'cssOverrides: {}')

  // Phase 3: Fix missing comma after last real value in cssOverrides
  // Pattern: serif"  }, or serif"}, → need comma: serif" },
  // Find: closing quote/value followed by whitespace then }
  modified = modified.replace(/"(\s*)\}/g, (match, ws) => {
    // Only add comma if not already there
    return `",${ws ? ws : ' '}}`
  })

  // Phase 4: Fix double commas
  modified = modified.replace(/,\s*,/g, ',')

  // Phase 5: Fix empty lines left behind
  modified = modified.replace(/\n\s*\n\s*\n/g, '\n')

  // Phase 6: Fix trailing comma before } in object
  // Not needed — trailing commas are fine in TS

  if (modified !== content) {
    writeFileSync(filePath, modified, 'utf-8')
    console.log(`Fixed: ${file}`)
  } else {
    console.log(`OK: ${file}`)
  }
}
