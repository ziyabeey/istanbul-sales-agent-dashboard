import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

describe('Theme Registry dynamic import map', () => {
  it('resolves every theme import map entry to an existing directory/file on disk', () => {
    // The relative path in the dynamic import is relative to packages/templates/src/registry/theme-map.ts
    // In our test, we'll resolve relative to packages/templates/src/registry
    const REGISTRY_DIR = path.resolve(__dirname, '../../../../packages/templates/src/registry')

    // Find the file content of theme-map.ts to parse the exact import strings
    const THEME_MAP_FILE = path.join(REGISTRY_DIR, 'theme-map.ts')
    expect(fs.existsSync(THEME_MAP_FILE)).toBe(true)

    const themeMapContent = fs.readFileSync(THEME_MAP_FILE, 'utf-8')
    const importRegex = /'([^']+)':\s*\(\)\s*=>\s*import\('([^']+)'\)/g

    let match
    const missingPaths: string[] = []

    while ((match = importRegex.exec(themeMapContent)) !== null) {
      const themeId = match[1]
      const importPath = match[2]
      
      const resolvedPath = path.resolve(REGISTRY_DIR, importPath)
      
      const exists = 
        fs.existsSync(resolvedPath + '.ts') || 
        fs.existsSync(path.join(resolvedPath, 'index.ts'))
        
      if (!exists) {
        missingPaths.push(`${themeId} -> ${importPath}`)
      }
    }

    expect(missingPaths).toEqual([])
  })
})
