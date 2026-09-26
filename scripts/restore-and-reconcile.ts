import fs from 'node:fs'
import path from 'node:path'

const CONFIGS_DIR = path.resolve('packages/templates/src/themes/configs')
const ARCHIVE_DIR = path.join(CONFIGS_DIR, '_archive')
const THEME_MAP_PATH = path.resolve('packages/templates/src/registry/theme-map.ts')
const REGISTRY_DIR = path.dirname(THEME_MAP_PATH)

const MOVES: Record<string, string> = {
  // Berber
  'berber-blade-config.ts': '011-berber-blade',
  'berber-gentleman-config.ts': '012-berber-gentleman',
  'berber-klasik-config.ts': '013-berber-klasik',
  'berber-sade-config.ts': '014-berber-sade',
  'berber-studio-config.ts': '015-berber-studio',
  // Oto
  'oto-bakim-config.ts': '198-oto-bakim',
  'oto-detay-config.ts': '199-oto-detay',
  'oto-eksper-config.ts': '201-oto-eksper',
  'oto-elektrik-config.ts': '202-oto-elektrik',
  'oto-mekanik-config.ts': '209-oto-mekanik',
  // Restoran
  'restoran-lezzet-config.ts': '244-restoran-lezzet',
  'restoran-nar-config.ts': '245-restoran-nar',
  'restoran-sofra-config.ts': '246-restoran-sofra',
  'restoran-tabledot-config.ts': '247-restoran-tabledot',
  'restoran-zincir-config.ts': '249-restoran-zincir',
}

function restoreAndReconcile() {
  console.log('Starting restore and reconciliation process...')

  // 1. Move and update the 15 flat files to the archive
  for (const [filename, folderName] of Object.entries(MOVES)) {
    const flatFilePath = path.join(CONFIGS_DIR, filename)
    if (!fs.existsSync(flatFilePath)) {
      console.warn(`Warning: Flat config file ${filename} does not exist. Skipping.`)
      continue
    }

    const targetFolder = path.join(ARCHIVE_DIR, folderName)
    const targetFilePath = path.join(targetFolder, 'index.ts')

    // Create target directory
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true })
    }

    // Read content and adjust imports
    let content = fs.readFileSync(flatFilePath, 'utf-8')
    content = content.replace(
      "import type { ThemeConfig, BusinessData } from '../types/section-types'",
      "import type { ThemeConfig, BusinessData } from '../../../../types/section-types'"
    )

    // Write to target location and remove original flat file
    fs.writeFileSync(targetFilePath, content, 'utf-8')
    fs.unlinkSync(flatFilePath)
    console.log(`Moved & updated: ${filename} -> _archive/${folderName}/index.ts`)
  }

  // 2. Reconcile theme-map.ts against existing directories/files
  console.log('Reconciling theme-map.ts entries against filesystem...')
  const originalMapContent = fs.readFileSync(THEME_MAP_PATH, 'utf-8')
  
  // Parse existing entries
  const entryRegex = /'([^']+)':\s*\(\)\s*=>\s*import\('([^']+)'\),?/g
  const existingEntries: string[] = []
  let match
  let totalProcessed = 0
  let totalKept = 0
  let totalFiltered = 0

  while ((match = entryRegex.exec(originalMapContent)) !== null) {
    totalProcessed++
    const key = match[1]
    const importPath = match[2]
    
    const resolvedPath = path.resolve(REGISTRY_DIR, importPath)
    
    // Check if the file/folder exists
    const possiblePaths = [
      resolvedPath,
      resolvedPath + '.ts',
      resolvedPath + '.tsx',
      path.join(resolvedPath, 'index.ts'),
      path.join(resolvedPath, 'index.tsx'),
    ]
    
    const exists = possiblePaths.some(p => fs.existsSync(p))
    
    if (exists) {
      existingEntries.push(`  '${key}': () => import('${importPath}'),`)
      totalKept++
    } else {
      console.log(`Filtering out nonexistent target: "${key}" -> "${importPath}"`)
      totalFiltered++
    }
  }

  // Re-write theme-map.ts
  const newMapContent = `// Auto-generated dynamic import map - Global Registry\n\nexport const THEME_MAP: Record<string, () => Promise<any>> = {\n${existingEntries.join('\n')}\n};\n`
  fs.writeFileSync(THEME_MAP_PATH, newMapContent, 'utf-8')
  
  console.log('\n--- Reconciliation Summary ---')
  console.log(`Processed entries: ${totalProcessed}`)
  console.log(`Kept entries:      ${totalKept}`)
  console.log(`Filtered entries:  ${totalFiltered}`)
  console.log('Reconciliation complete! theme-map.ts has been updated successfully.')
}

restoreAndReconcile()
