import fs from 'node:fs'
import path from 'node:path'

// Resolve paths relative to this script directory (scripts/)
const CONFIGS_DIR = path.resolve(__dirname, '../packages/templates/src/themes/configs')
const ARCHIVE_DIR = path.join(CONFIGS_DIR, '_archive')
const REGISTRY_DIR = path.resolve(__dirname, '../packages/templates/src/registry')
const THEME_MAP_FILE = path.join(REGISTRY_DIR, 'theme-map.ts')

// Helper to convert kebab-case to Title Case (e.g., "oto-vip" -> "Oto Vip")
function toTitleCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Helper to convert kebab-case to UPPER_SNAKE (e.g., "oto-vip" -> "OTO_VIP")
function toUpperSnake(str: string): string {
  return str.toUpperCase().replace(/-/g, '_')
}

async function run() {
  console.log('Starting restoration of missing configuration files...')

  if (!fs.existsSync(THEME_MAP_FILE)) {
    console.error(`theme-map.ts not found at ${THEME_MAP_FILE}`)
    process.exit(1)
  }

  // First, parse theme-map.ts to find the folders we expect to exist in _archive
  const themeMapContent = fs.readFileSync(THEME_MAP_FILE, 'utf-8')
  const importRegex = /'([^']+)':\s*\(\)\s*=>\s*import\('([^']+)'\)/g

  let match
  const missingThemes: { themeId: string; folderName: string }[] = []

  while ((match = importRegex.exec(themeMapContent)) !== null) {
    const themeId = match[1]
    const importPath = match[2]
    
    // Extract folder name (e.g. "011-berber-blade") from "../themes/configs/_archive/011-berber-blade"
    const folderName = importPath.split('/').pop()!
    const resolvedPath = path.resolve(REGISTRY_DIR, importPath)
    
    const exists = 
      fs.existsSync(resolvedPath + '.ts') || 
      fs.existsSync(path.join(resolvedPath, 'index.ts'))
      
    if (!exists) {
      missingThemes.push({ themeId, folderName })
    }
  }

  console.log(`Identified ${missingThemes.length} missing themes in _archive.`)

  if (missingThemes.length === 0) {
    console.log('No missing themes to restore.')
    return
  }

  // Ensure _archive directory exists
  if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR, { recursive: true })
  }

  let flatRestored = 0
  let archiveRestored = 0

  for (const { themeId, folderName } of missingThemes) {
    const flatConfigPath = path.join(CONFIGS_DIR, `${themeId}-config.ts`)
    const archiveFolderPath = path.join(ARCHIVE_DIR, folderName)
    const archiveFilePath = path.join(archiveFolderPath, 'index.ts')

    // 1. Ensure the flat config exists first
    if (!fs.existsSync(flatConfigPath)) {
      // We must generate a boilerplate flat config by copying from a sibling
      let siblingId = ''
      if (themeId.startsWith('berber-')) {
        siblingId = 'berber-blade'
      } else if (themeId.startsWith('otoyikama-')) {
        siblingId = 'oto-mekanik'
      } else if (themeId.startsWith('oto-')) {
        siblingId = 'oto-mekanik'
      } else if (themeId.startsWith('restoran-')) {
        siblingId = 'restoran-sofra'
      } else {
        console.error(`Unknown sector for theme ${themeId}, skipping.`)
        continue
      }

      const siblingConfigPath = path.join(CONFIGS_DIR, `${siblingId}-config.ts`)
      if (!fs.existsSync(siblingConfigPath)) {
        console.error(`Sibling template config not found: ${siblingConfigPath}`)
        continue
      }

      console.log(`Generating flat config for ${themeId} using sibling template ${siblingId}...`)
      
      let configContent = fs.readFileSync(siblingConfigPath, 'utf-8')

      // Case-sensitive replacements
      const targetUpper = toUpperSnake(themeId)
      const siblingUpper = toUpperSnake(siblingId)
      const targetTitle = toTitleCase(themeId)
      const siblingTitle = toTitleCase(siblingId)

      // Simple name replacement
      configContent = configContent.replace(new RegExp(siblingId, 'g'), themeId)
      configContent = configContent.replace(new RegExp(siblingUpper, 'g'), targetUpper)
      configContent = configContent.replace(new RegExp(siblingTitle, 'g'), targetTitle)

      // Write flat config file
      fs.writeFileSync(flatConfigPath, configContent, 'utf-8')
      flatRestored++
    }

    // 2. Now ensure the archived folder and index.ts exist
    if (!fs.existsSync(archiveFolderPath)) {
      fs.mkdirSync(archiveFolderPath, { recursive: true })
    }

    // Read the flat config, adjust import paths, and write as archive index.ts
    let configContent = fs.readFileSync(flatConfigPath, 'utf-8')
    
    // Adjust types import path from "../../types/section-types" to "../../../../types/section-types"
    configContent = configContent.replace(
      "import type { ThemeConfig, BusinessData } from '../../types/section-types'",
      "import type { ThemeConfig, BusinessData } from '../../../../types/section-types'"
    )

    fs.writeFileSync(archiveFilePath, configContent, 'utf-8')
    archiveRestored++
  }

  console.log(`Restoration complete!`)
  console.log(`  - Flat configs generated/restored: ${flatRestored}`)
  console.log(`  - Archive index.ts files generated/restored: ${archiveRestored}`)
}

run().catch(err => console.error(err))
