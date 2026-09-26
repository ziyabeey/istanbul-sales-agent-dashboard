import { describe, expect, it } from 'vitest'
import { THEME_MAP } from '@kepenk/templates/src/registry/theme-map'
import {
  BERBER_BLADE_CONFIG,
  BERBER_GENTLEMAN_CONFIG,
  BERBER_KLASIK_CONFIG,
  BERBER_SADE_CONFIG,
  BERBER_STUDIO_CONFIG,
} from '@kepenk/templates'
import fs from 'node:fs'
import path from 'node:path'

const restoredBerberConfigs = [
  BERBER_BLADE_CONFIG,
  BERBER_GENTLEMAN_CONFIG,
  BERBER_KLASIK_CONFIG,
  BERBER_SADE_CONFIG,
  BERBER_STUDIO_CONFIG,
]

describe('Theme Map Validation Guard', () => {
  it('verifies that every dynamic import in THEME_MAP has a physically existing target on disk', () => {
    const workspaceRoot = path.resolve(__dirname, '../../../../')
    const registryDir = path.join(workspaceRoot, 'packages/templates/src/registry')

    const mapKeys = Object.keys(THEME_MAP)
    expect(mapKeys.length).toBeGreaterThan(0)

    const themeMapFile = path.join(registryDir, 'theme-map.ts')
    const content = fs.readFileSync(themeMapFile, 'utf8')

    const pattern = /'([^']+)':\s*\(\)\s*=>\s*import\('([^']+)'\)/g
    let match
    let checkedCount = 0

    while ((match = pattern.exec(content)) !== null) {
      const themeId = match[1]
      const importPath = match[2]
      const resolvedPath = path.normalize(path.join(registryDir, importPath))
      const exists = fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()

      if (!exists) {
        console.error(`Theme Map Validation Failed: Theme "${themeId}" points to nonexistent directory "${importPath}" (resolved: "${resolvedPath}")`)
      }

      expect(exists).toBe(true)
      checkedCount++
    }

    expect(checkedCount).toBe(mapKeys.length)
  })

  it('keeps restored Berber configs available through the public templates barrel', () => {
    expect(restoredBerberConfigs.map(config => config.id).sort()).toEqual([
      'berber-blade',
      'berber-gentleman',
      'berber-klasik',
      'berber-sade',
      'berber-studio',
    ])
    for (const config of restoredBerberConfigs) {
      expect(config.pages.length).toBeGreaterThan(0)
      expect(THEME_MAP[config.id]).toBeTypeOf('function')
    }
  })
})
