import { describe, expect, it } from 'vitest'
import { THEME_MAP } from '@kepenk/templates/src/registry/theme-map'
import fs from 'node:fs'
import path from 'node:path'

describe('Theme Map Validation Guard', () => {
  it('verifies that every dynamic import in THEME_MAP has a physically existing target on disk', () => {
    // Resolve the path to the packages/templates/src/registry folder
    // Since we are running the test under apps/web, let's find the absolute workspace root first
    const workspaceRoot = path.resolve(__dirname, '../../../../')
    const registryDir = path.join(workspaceRoot, 'packages/templates/src/registry')

    const mapKeys = Object.keys(THEME_MAP)
    expect(mapKeys.length).toBeGreaterThan(0)

    // Read theme-map.ts to extract import paths statically
    const themeMapFile = path.join(registryDir, 'theme-map.ts')
    const content = fs.readFileSync(themeMapFile, 'utf8')

    // Regex to match import lines like: 'theme-id': () => import('path')
    const pattern = /'([^']+)':\s*\(\)\s*=>\s*import\('([^']+)'\)/g
    let match
    let checkedCount = 0

    while ((match = pattern.exec(content)) !== null) {
      const themeId = match[1]
      const importPath = match[2]

      // Resolve importPath relative to the registry directory
      const resolvedPath = path.normalize(path.join(registryDir, importPath))
      
      // Check that the target directory exists
      const exists = fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()
      
      if (!exists) {
        console.error(`Theme Map Validation Failed: Theme "${themeId}" points to nonexistent directory "${importPath}" (resolved: "${resolvedPath}")`)
      }

      expect(exists).toBe(true)
      checkedCount++
    }

    expect(checkedCount).toBe(mapKeys.length)
  })
})
