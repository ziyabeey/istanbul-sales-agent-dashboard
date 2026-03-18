/**
 * Script: Add plan-based CSS tokens (container, spacing, radius) to theme definitions.
 * Only adds tokens if not already present in cssOverrides.
 *
 * Usage: node packages/templates/scripts/apply-css-tokens.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const THEMES_DIR = join(__dirname, '..', 'src', 'themes')

// Plan-tier CSS tokens
const PLAN_TOKENS = {
  free: {
    '--container-default': '640px',
    '--section-py': '48px',
    '--radius-md': '4px',
    '--radius-lg': '8px',
  },
  starter: {
    '--container-default': '960px',
    '--section-py': '64px',
    '--radius-md': '8px',
    '--radius-lg': '12px',
  },
  growth: {
    '--container-default': '1120px',
    '--section-py': '80px',
    '--radius-md': '12px',
    '--radius-lg': '16px',
  },
  pro: {
    '--container-default': '1280px',
    '--section-py': '96px',
    '--radius-md': '4px',
    '--radius-lg': '8px',
  },
  enterprise: {
    '--container-default': '1440px',
    '--section-py': '64px',
    '--radius-md': '0px',
    '--radius-lg': '4px',
  },
}

const THEME_FILES = [
  'p0-berber.ts', 'p0-restoran.ts', 'p0-doktor.ts', 'p0-guzellik.ts',
  'p0-avukat.ts', 'p0-disci.ts', 'p0-oto.ts', 'p0-spor.ts',
  'p1-kafe.ts', 'p1-health-food.ts', 'p1-creative.ts', 'p1-teknik.ts', 'p1-professional.ts',
  'p2-themes-a.ts', 'p2-themes-b.ts', 'p3-themes-a.ts', 'p3-themes-b.ts',
]

let totalAdded = 0

for (const file of THEME_FILES) {
  const filePath = join(THEMES_DIR, file)
  let content
  try {
    content = readFileSync(filePath, 'utf-8')
  } catch {
    continue
  }

  let modified = content
  let fileAdded = 0

  // Find each theme's plan
  const themeRegex = /id:\s*'([^']+)'[\s\S]*?plan:\s*'([^']+)'/g
  let match

  const themes = []
  while ((match = themeRegex.exec(content)) !== null) {
    themes.push({ id: match[1], plan: match[2], index: match.index })
  }

  // Process themes in reverse order to preserve indices
  for (let i = themes.length - 1; i >= 0; i--) {
    const { id, plan } = themes[i]
    const tokens = PLAN_TOKENS[plan]
    if (!tokens) continue

    // Find this theme's cssOverrides block
    const idStr = `id: '${id}'`
    const idIdx = modified.indexOf(idStr)
    if (idIdx === -1) continue

    // Find cssOverrides opening within this theme block
    const blockEnd = i < themes.length - 1
      ? modified.indexOf(`id: '${themes[i + 1].id}'`)
      : modified.length
    const block = modified.slice(idIdx, blockEnd)

    // Find the closing of cssOverrides: look for },\n pattern after cssOverrides
    const cssStart = block.indexOf('cssOverrides:')
    if (cssStart === -1) continue

    // Find the closing } of cssOverrides
    let braceDepth = 0
    let cssEnd = -1
    for (let j = cssStart; j < block.length; j++) {
      if (block[j] === '{') braceDepth++
      if (block[j] === '}') {
        braceDepth--
        if (braceDepth === 0) {
          cssEnd = j
          break
        }
      }
    }
    if (cssEnd === -1) continue

    const cssBlock = block.slice(cssStart, cssEnd + 1)
    let newCssBlock = cssBlock
    let added = 0

    for (const [key, value] of Object.entries(tokens)) {
      // Only add if not already present
      if (!cssBlock.includes(`'${key}'`)) {
        // Add before the closing }
        const insertPos = newCssBlock.lastIndexOf('}')
        // Determine indentation from existing content
        const lastCommaIdx = newCssBlock.lastIndexOf(',')
        const hasTrailingComma = lastCommaIdx > newCssBlock.lastIndexOf("'")

        const newEntry = `${hasTrailingComma ? '' : ','}\n      '${key}': '${value}',`
        newCssBlock = newCssBlock.slice(0, insertPos) + newEntry + '\n    ' + newCssBlock.slice(insertPos)
        added++
      }
    }

    if (added > 0) {
      const globalStart = idIdx + cssStart
      const globalEnd = idIdx + cssEnd + 1
      modified = modified.slice(0, globalStart) + newCssBlock + modified.slice(globalEnd)
      fileAdded += added
      totalAdded += added
    }
  }

  if (fileAdded > 0) {
    writeFileSync(filePath, modified, 'utf-8')
    console.log(`${file}: ${fileAdded} tokens added`)
  } else {
    console.log(`${file}: no tokens needed`)
  }
}

console.log(`\nTotal tokens added: ${totalAdded}`)
