import { describe, expect, it } from 'vitest'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const webRoot = path.resolve(__dirname, '../..')
const templatesRoot = path.resolve(webRoot, '../../packages/templates')
const webRequire = createRequire(path.join(webRoot, 'package.json'))
const manifest = JSON.parse(fs.readFileSync(path.join(templatesRoot, 'package.json'), 'utf8'))
const config = ts.readConfigFile(path.join(webRoot, 'tsconfig.json'), ts.sys.readFile)
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'))
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, webRoot)
if (parsed.errors.length) throw new Error('Web TypeScript configuration must parse before export checks')

const entrypoints = [
  ['.', './src/index.ts'],
  ['./catalog', './src/registry/theme-catalog.ts'],
  ['./src/registry/theme-catalog', './src/registry/theme-catalog.ts'],
  ['./src/registry/theme-map', './src/registry/theme-map.ts'],
  ['./src/registry/config-loader', './src/registry/config-loader.ts'],
  ['./src/types/ast-types', './src/types/ast-types.ts'],
  ['./src/types/section-types', './src/types/section-types.ts'],
  ['./src/renderer/ThemeRenderer', './src/renderer/ThemeRenderer.tsx'],
  ...['elite', 'kurumsal', 'modern', 'prestij', 'sade'].map((variant, i) => [
    `./src/themes/configs/_archive/${108 + i}-insaat-${variant}`,
    `./src/themes/configs/_archive/${108 + i}-insaat-${variant}/index.ts`,
  ]),
]

describe('template package export boundaries', () => {
  it.each(entrypoints)('resolves %s through the installed package, not a test alias', (entrypoint, target) => {
    const specifier = entrypoint === '.' ? '@kepenk/templates' : `@kepenk/templates/${entrypoint.slice(2)}`
    const expected = fs.realpathSync(path.join(templatesRoot, target))
    expect(fs.statSync(expected).isFile()).toBe(true)
    expect(manifest.exports[entrypoint]).toBe(target)

    // Resolution only: no renderer, provider or archived business module is executed.
    expect(fs.realpathSync(webRequire.resolve(specifier))).toBe(expected)
    const resolved = ts.resolveModuleName(
      specifier, path.join(webRoot, 'src/app/page.tsx'), parsed.options, ts.sys,
    ).resolvedModule
    expect(resolved).toBeDefined()
    expect(fs.realpathSync(resolved!.resolvedFileName)).toBe(expected)
  })
})
