import fs from 'node:fs'
import path from 'node:path'

// Resolve paths relative to this script directory (scripts/)
const REGISTRY_DIR = path.resolve(__dirname, '../packages/templates/src/registry')
const THEME_MAP_FILE = path.join(REGISTRY_DIR, 'theme-map.ts')

if (!fs.existsSync(THEME_MAP_FILE)) {
  console.error(`theme-map.ts not found at ${THEME_MAP_FILE}`)
  process.exit(1)
}

const themeMapContent = fs.readFileSync(THEME_MAP_FILE, 'utf-8')
const importRegex = /'([^']+)':\s*\(\)\s*=>\s*import\('([^']+)'\)/g

let match
const missingPaths: { themeId: string; importPath: string; absolutePath: string }[] = []

while ((match = importRegex.exec(themeMapContent)) !== null) {
  const themeId = match[1]
  const importPath = match[2]
  
  // Resolve the import path relative to the registry directory
  const resolvedPath = path.resolve(REGISTRY_DIR, importPath)
  
  // An import path can point to:
  // 1. A .ts file (e.g. path.ts)
  // 2. A folder containing index.ts
  const exists = 
    fs.existsSync(resolvedPath + '.ts') || 
    fs.existsSync(path.join(resolvedPath, 'index.ts'))
    
  if (!exists) {
    missingPaths.push({
      themeId,
      importPath,
      absolutePath: resolvedPath
    })
  }
}

if (missingPaths.length > 0) {
  console.log(`Found ${missingPaths.length} missing config paths in THEME_MAP:`)
  for (const item of missingPaths) {
    console.log(`  - Theme: ${item.themeId} -> ${item.importPath}`)
  }
  process.exit(1)
} else {
  console.log('All THEME_MAP entries resolve to existing config targets!')
}
