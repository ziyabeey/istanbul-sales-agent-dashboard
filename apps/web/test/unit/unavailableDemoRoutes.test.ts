import { describe, expect, it, vi } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { getRenderableDemoTheme } from '@/lib/demoTheme'
import { THEME_MAP } from '@kepenk/templates/src/registry/theme-map'
import RegisteredDemo from '../../src/app/demolar/_components/RegisteredDemo'

// Isolate the browser renderer only. The registry, resolver and Next notFound are real.
vi.mock('../../src/app/demolar/[themeId]/client', () => ({ default: () => null }))

const routes = [
  ['oto-dinamik', 'oto-dinamik'],
  ['oto-guven', 'oto-guven'],
  ['oto-hizli', 'oto-hizli'],
  ['oto-oto', 'oto-vip'],
  ['restoran-fine', 'restoran-fine'],
  ['restoran-hizli', 'restoran-hizli'],
  ['restoran-kafe', 'restoran-kafe'],
  ['restoran-klasik', 'restoran-klasik'],
  ['restoran-vip', 'restoran-vip'],
] as const

const metadataPages = [
  ['oto-guven', () => import('../../src/app/demolar/oto-guven/page')],
  ['oto-hizli', () => import('../../src/app/demolar/oto-hizli/page')],
  ['restoran-fine', () => import('../../src/app/demolar/restoran-fine/page')],
  ['restoran-hizli', () => import('../../src/app/demolar/restoran-hizli/page')],
  ['restoran-kafe', () => import('../../src/app/demolar/restoran-kafe/page')],
  ['restoran-klasik', () => import('../../src/app/demolar/restoran-klasik/page')],
] as const

const demoRoot = path.resolve(__dirname, '../../src/app/demolar')

function readSource(route: string) {
  const filename = path.join(demoRoot, route, 'client.tsx')
  return ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
}

describe('unrecovered demo source containment', () => {
  it.each(routes)('%s preserves its exact requested theme %s on the server', (route, themeId) => {
    const source = readSource(route)
    const imports = source.statements.filter(ts.isImportDeclaration).map(node =>
      ts.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text : '',
    )
    expect(imports).toEqual(['../_components/RegisteredDemo'])
    expect(source.statements.some(node => ts.isExpressionStatement(node)
      && ts.isStringLiteral(node.expression) && node.expression.text === 'use client')).toBe(false)
    const requested: string[] = []
    function visit(node: ts.Node) {
      if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(source) === 'RegisteredDemo') {
        for (const attribute of node.attributes.properties) {
          if (ts.isJsxAttribute(attribute) && attribute.name.getText(source) === 'themeId'
            && attribute.initializer && ts.isStringLiteral(attribute.initializer)) {
            requested.push(attribute.initializer.text)
          }
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(source)
    expect(requested).toEqual([themeId])
  })

  it.each(routes)('%s refuses to render without the source for %s', (_route, themeId) => {
    // Update this recovery debt only when the original data and visual acceptance exist.
    expect(Object.hasOwn(THEME_MAP, themeId)).toBe(false)
    expect(getRenderableDemoTheme(themeId)).toBeNull()
    expect(() => RegisteredDemo({ themeId })).toThrow('NEXT_HTTP_ERROR_FALLBACK;404')
  })

  it.each(metadataPages)('%s imports metadata without nonexistent business data', async (_route, load) => {
    const { metadata } = await load()
    expect(metadata.title).toBe('Demo henüz kullanılamıyor | Kepenk.ai')
    expect(metadata.description).toContain('kaynak dosyası henüz doğrulanmadığı')
    expect(metadata.robots).toEqual({ index: false, follow: false })
  })

  it('does not turn the shared resolver into a blanket unavailable switch', () => {
    expect(getRenderableDemoTheme('cicekci-dugun')).toEqual({
      id: 'cicekci-dugun', sectorId: 'cicekci', seoSchemaType: 'Florist',
    })
  })
})
