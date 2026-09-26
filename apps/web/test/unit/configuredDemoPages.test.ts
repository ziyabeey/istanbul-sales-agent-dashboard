// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import * as configLoader from '@kepenk/templates/src/registry/config-loader'
import { THEME_MAP } from '@kepenk/templates/src/registry/theme-map'
import DemoClient from '../../src/app/demolar/[themeId]/client'

// Only isolate browser effects. Real configs, metadata, registry and notFound run.
vi.mock('../../src/app/demolar/[themeId]/client', () => ({ default: function DemoClient() { return null } }))

const routes = [
  ['boyaci-dekoratif', () => import('../../src/app/demolar/boyaci-dekoratif/page')],
  ['boyaci-dis', () => import('../../src/app/demolar/boyaci-dis/page')],
  ['boyaci-endustriyel', () => import('../../src/app/demolar/boyaci-endustriyel/page')],
  ['boyaci-ev', () => import('../../src/app/demolar/boyaci-ev/page')],
  ['boyaci-lux', () => import('../../src/app/demolar/boyaci-lux/page')],
  ['guzellik-narin', () => import('../../src/app/demolar/guzellik-narin/page')],
  ['guzellik-atelier', () => import('../../src/app/demolar/guzellik-atelier/page')],
  ['guzellik-glow', () => import('../../src/app/demolar/guzellik-glow/page')],
  ['guzellik-blanc', () => import('../../src/app/demolar/guzellik-blanc/page')],
  ['guzellik-dermis', () => import('../../src/app/demolar/guzellik-dermis/page')],
  ['kahveci-lux', () => import('../../src/app/demolar/kahveci-lux/page')],
  ['kahveci-turk', () => import('../../src/app/demolar/kahveci-turk/page')],
  ['kahveci-3nesil', () => import('../../src/app/demolar/kahveci-3nesil/page')],
  ['kahveci-brunch', () => import('../../src/app/demolar/kahveci-brunch/page')],
  ['kahveci-kavurma', () => import('../../src/app/demolar/kahveci-kavurma/page')],
] as const
const demoRoot = path.resolve(__dirname, '../../src/app/demolar')

describe('configured demo page contracts', () => {
  it.each(routes)('%s metadata comes from the real full config, not a catalog entry', async (id, loadPage) => {
    const original = await THEME_MAP[id]()
    const prefix = id.toUpperCase().replaceAll('-', '_')
    const config = original[`${prefix}_CONFIG`]
    const business = original[`${prefix}_BUSINESS`]
    expect(config.id).toBe(id)
    expect(config.name).toBeTruthy()
    expect(config.pages[0].sections.length).toBeGreaterThan(0)
    expect(business.name).toBeTruthy()
    const page = await loadPage()
    expect(await page.generateMetadata()).toEqual({
      title: `${config.name} | Kepenk Demo`, description: config.description,
    })
  })

  it.each(routes)('%s reaches the existing shared renderer with its exact identity', async (id, loadPage) => {
    const result = await configLoader.loadThemeConfig(id)
    expect(result).not.toBeNull()
    expect(result!.config.id).toBe(id)
    expect(result!.config.sectorId).toBeTruthy()
    expect(result!.config.seoSchemaType).toBeTruthy()
    const page = await loadPage()
    const element = await page.default()
    expect(element.type).toBe(DemoClient)
    expect(element.props).toEqual({
      themeId: id,
      sectorId: result!.config.sectorId,
      seoSchemaType: result!.config.seoSchemaType,
    })
    // Catalog metadata must never be passed as a complete ThemeConfig again.
    expect(element.props).not.toHaveProperty('theme')
  })

  it('rejects a missing real config instead of fabricating a catalog-based page', async () => {
    const page = await routes[0][1]()
    const spy = vi.spyOn(configLoader, 'loadThemeConfig').mockResolvedValue(null)
    try {
      expect(await page.generateMetadata()).toEqual({ title: 'Not Found' })
      await expect(page.default()).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404')
    } finally {
      spy.mockRestore()
    }
  })

  it('does not call array find on THEME_CATALOG in any demo page', () => {
    const files: string[] = []
    function walk(dir: string) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const filename = path.join(dir, entry.name)
        if (entry.isDirectory()) walk(filename)
        else if (entry.name === 'page.tsx') files.push(filename)
      }
    }
    walk(demoRoot)
    expect(files.length).toBeGreaterThan(routes.length)
    const offenders: string[] = []
    for (const filename of files) {
      const source = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
      function visit(node: ts.Node) {
        if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)
          && node.expression.name.text === 'find' && ts.isIdentifier(node.expression.expression)
          && node.expression.expression.text === 'THEME_CATALOG') {
          offenders.push(path.relative(demoRoot, filename))
        }
        ts.forEachChild(node, visit)
      }
      visit(source)
    }
    expect(offenders).toEqual([])
  })
})
