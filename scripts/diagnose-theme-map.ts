import fs from 'node:fs'
import path from 'node:path'

// Resolve paths relative to the script location
const ROOT = path.resolve(__dirname, '..')
const REGISTRY_DIR = path.resolve(ROOT, 'packages/templates/src/registry')
const THEME_MAP_PATH = path.resolve(REGISTRY_DIR, 'theme-map.ts')

function diagnoseThemeMap() {
  console.log('Diagnosing theme-map.ts target paths...\n')

  if (!fs.existsSync(THEME_MAP_PATH)) {
    console.error(`Error: theme-map.ts not found at: ${THEME_MAP_PATH}`)
    process.exit(1)
  }

  const content = fs.readFileSync(THEME_MAP_PATH, 'utf-8')
  
  // Extract all import definitions
  const importRegex = /'([^']+)':\s*\(\)\s*=>\s*import\('([^']+)'\)/g
  let match
  let totalTargets = 0
  let missingCount = 0
  let existingCount = 0

  while ((match = importRegex.exec(content)) !== null) {
    totalTargets++
    const key = match[1]
    const importPath = match[2]
    
    // Resolve the dynamic import path relative to the registry folder
    const resolvedPath = path.resolve(REGISTRY_DIR, importPath)
    
    // Check if the file/folder exists under various possibilities
    const possiblePaths = [
      resolvedPath,
      resolvedPath + '.ts',
      resolvedPath + '.tsx',
      path.join(resolvedPath, 'index.ts'),
      path.join(resolvedPath, 'index.tsx')
    ]
    
    const exists = possiblePaths.some(p => fs.existsSync(p))
    
    if (!exists) {
      console.log(`❌ Missing Dynamic Import:`)
      console.log(`  - Key: "${key}" -> Path: "${importPath}"`)
      console.log(`  - Resolved: ${resolvedPath}\n`)
      missingCount++
    } else {
      existingCount++
    }
  }

  console.log(`Found ${existingCount} existing targets.`)
  console.log(`Found ${missingCount} missing targets.`)
  
  if (missingCount > 0) {
    process.exit(1)
  } else {
    process.exit(0)
  }
}

diagnoseThemeMap()
