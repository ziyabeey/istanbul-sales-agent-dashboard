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
import { tmpdir } from 'node:os'

// Directory existence alone does not prove that a bundler can resolve a module.
function hasModuleFile(resolvedPath: string): boolean {
  const extensions = ['.ts', '.tsx', '.js', '.jsx']
  const candidates = [
    resolvedPath,
    ...extensions.map(extension => `${resolvedPath}${extension}`),
    ...extensions.map(extension => path.join(resolvedPath, `index${extension}`)),
  ]
  return candidates.some(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile())
}

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
      const exists = hasModuleFile(resolvedPath)

      if (!exists) {
        console.error(`Theme Map Validation Failed: Theme "${themeId}" has no resolvable module file at "${importPath}" (resolved: "${resolvedPath}")`)
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

  it('rejects an empty config directory and an index.ts directory', () => {
    const fixture = fs.mkdtempSync(path.join(tmpdir(), 'kepenk-theme-map-'))
    try {
      const configDir = path.join(fixture, 'config')
      fs.mkdirSync(configDir)
      expect(hasModuleFile(configDir)).toBe(false)
      fs.mkdirSync(path.join(configDir, 'index.ts'))
      expect(hasModuleFile(configDir)).toBe(false)
    } finally {
      fs.rmSync(fixture, { recursive: true, force: true })
    }
  })

  it('accepts actual config entry files and direct module files', () => {
    const fixture = fs.mkdtempSync(path.join(tmpdir(), 'kepenk-theme-map-'))
    try {
      const configDir = path.join(fixture, 'config')
      fs.mkdirSync(configDir)
      fs.writeFileSync(path.join(configDir, 'index.ts'), 'export const config = {}\n')
      expect(hasModuleFile(configDir)).toBe(true)
      const modulePath = path.join(fixture, 'standalone')
      fs.writeFileSync(`${modulePath}.tsx`, 'export const config = {}\n')
      expect(hasModuleFile(modulePath)).toBe(true)
      expect(hasModuleFile(`${modulePath}.tsx`)).toBe(true)
    } finally {
      fs.rmSync(fixture, { recursive: true, force: true })
    }
  })

  it('rejects absent targets and folders containing only documentation', () => {
    const fixture = fs.mkdtempSync(path.join(tmpdir(), 'kepenk-theme-map-'))
    try {
      expect(hasModuleFile(path.join(fixture, 'missing'))).toBe(false)
      fs.writeFileSync(path.join(fixture, 'README.md'), 'Config intentionally unavailable\n')
      expect(hasModuleFile(fixture)).toBe(false)
    } finally {
      fs.rmSync(fixture, { recursive: true, force: true })
    }
  })
})
