import { describe, expect, it } from 'vitest'
import { THEME_MAP } from '@kepenk/templates/src/registry/theme-map'
import ts from 'typescript'
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

// Inspect public export wiring without evaluating unrelated renderer side effects.
// Full renderer imports still require separate browser/build acceptance.
function valueStarExports(content: string): string[] {
  const source = ts.createSourceFile('barrel.ts', content, ts.ScriptTarget.Latest, true)
  return source.statements
    .filter(ts.isExportDeclaration)
    .filter(statement => !statement.isTypeOnly && !statement.exportClause)
    .flatMap(statement => statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
      ? [statement.moduleSpecifier.text]
      : [])
}

const restoredBerberThemes = [
  { themeId: 'berber-blade', directory: '011-berber-blade', prefix: 'BERBER_BLADE' },
  { themeId: 'berber-gentleman', directory: '012-berber-gentleman', prefix: 'BERBER_GENTLEMAN' },
  { themeId: 'berber-klasik', directory: '013-berber-klasik', prefix: 'BERBER_KLASIK' },
  { themeId: 'berber-sade', directory: '014-berber-sade', prefix: 'BERBER_SADE' },
  { themeId: 'berber-studio', directory: '015-berber-studio', prefix: 'BERBER_STUDIO' },
] as const

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

  it.each(restoredBerberThemes)('loads $themeId config and business through its real registry importer', async ({ themeId, prefix }) => {
    const importer = THEME_MAP[themeId]
    expect(importer).toBeTypeOf('function')
    const mod = await importer()
    const config = mod[`${prefix}_CONFIG`]
    const business = mod[`${prefix}_BUSINESS`]

    expect(config?.id).toBe(themeId)
    expect(Array.isArray(config.pages)).toBe(true)
    expect(config.pages.length).toBeGreaterThan(0)
    expect(business?.name).toBeTypeOf('string')
    expect(business.name.trim().length).toBeGreaterThan(0)
  })

  it('preserves both public value re-export links for the restored Berber modules', () => {
    const workspaceRoot = path.resolve(__dirname, '../../../../')
    const templatesDir = path.join(workspaceRoot, 'packages/templates')
    const manifest = JSON.parse(fs.readFileSync(path.join(templatesDir, 'package.json'), 'utf8'))
    expect(manifest.exports['.']).toBe('./src/index.ts')

    const publicBarrel = fs.readFileSync(path.join(templatesDir, 'src/index.ts'), 'utf8')
    const configBarrel = fs.readFileSync(path.join(templatesDir, 'src/exports-configs-sections.ts'), 'utf8')
    expect(valueStarExports(publicBarrel)).toContain('./exports-configs-sections')
    const exportedModules = valueStarExports(configBarrel)
    for (const { directory } of restoredBerberThemes) {
      expect(exportedModules).toContain(`./themes/configs/_archive/${directory}`)
    }
  })

  it('does not mistake comments, strings, type-only or namespace exports for value star exports', () => {
    const content = `
      // export * from './commented'
      /* export * from './block-commented' */
      const note = "export * from './string-only'"
      export type * from './types-only'
      export * as configs from './namespace-only'
      export { config } from './named-only'
    `
    expect(valueStarExports(content)).toEqual([])
  })

  it('recognizes value star exports regardless of quote style or line breaks', () => {
    expect(valueStarExports(`export * from './first';
export *
from "./second";`))
      .toEqual(['./first', './second'])
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
