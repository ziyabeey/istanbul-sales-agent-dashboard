import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { isRetiredDemo } from '@/data/sablonlar/curation'
import { getRenderableDemoTheme } from '@/lib/demoTheme'
import { THEME_MAP } from '@kepenk/templates/src/registry/theme-map'

const available = [
  'cicekci-dugun', 'insaat-elite', 'insaat-kurumsal',
  'insaat-modern', 'insaat-prestij', 'insaat-sade',
]
const carpetThemes = ['haliyikama-fabrika', 'haliyikama-koltuk', 'haliyikama-lux', 'haliyikama-organik']
// These existing URLs referred to configs already removed from THEME_MAP in #49.
const unavailable = [
  'oto-lux', 'oto-mekanik', 'oto-prestij', 'oto-vip',
  'otoyikama-detay', 'otoyikama-ekspres', 'otoyikama-fleet',
  'otoyikama-lux', 'otoyikama-oto',
]
const demoRoot = path.resolve(__dirname, '../../src/app/demolar')

function parse(filename: string) {
  return ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
}

function imports(source: ts.SourceFile) {
  return source.statements.filter(ts.isImportDeclaration).map(statement =>
    ts.isStringLiteral(statement.moduleSpecifier) ? statement.moduleSpecifier.text : '',
  )
}

function attributes(source: ts.SourceFile, tagName: string, name: string) {
  const values: string[] = []
  function visit(node: ts.Node) {
    if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText(source) === tagName) {
      for (const attribute of node.attributes.properties) {
        if (ts.isJsxAttribute(attribute) && attribute.name.getText(source) === name && attribute.initializer && ts.isStringLiteral(attribute.initializer)) {
          values.push(attribute.initializer.text)
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return values
}

describe('legacy demo route convergence', () => {
  it.each(available)('loads the real config and business data for %s', async themeId => {
    const theme = getRenderableDemoTheme(themeId)
    expect(theme?.id).toBe(themeId)
    expect(theme?.sectorId).toBe(themeId.startsWith('insaat-') ? 'insaat' : 'cicekci')
    expect(theme?.seoSchemaType).toBe(themeId.startsWith('insaat-') ? 'GeneralContractor' : 'Florist')
    const module = await THEME_MAP[themeId]()
    const prefix = themeId.toUpperCase().replace(/-/g, '_')
    const config = module[`${prefix}_CONFIG`]
    expect(config.id).toBe(themeId)
    expect(config.pages.length).toBeGreaterThan(0)
    expect(module[`${prefix}_BUSINESS`].name).toBeTruthy()
  })

  it.each(carpetThemes)('keeps the real carpet-cleaning configuration for %s', async themeId => {
    expect(getRenderableDemoTheme(themeId)).toEqual({
      id: themeId, sectorId: 'haliyikama', seoSchemaType: 'LocalBusiness',
    })
    const module = await THEME_MAP[themeId]()
    const prefix = themeId.toUpperCase().replace(/-/g, '_')
    expect(module[`${prefix}_CONFIG`].id).toBe(themeId)
    expect(module[`${prefix}_CONFIG`].pages[0].sections.length).toBeGreaterThan(0)
    expect(module[`${prefix}_BUSINESS`].name).toBeTruthy()
  })

  it.each(unavailable)('does not advertise a loadable config for %s', themeId => {
    expect(Object.hasOwn(THEME_MAP, themeId)).toBe(false)
    expect(getRenderableDemoTheme(themeId)).toBeNull()
  })

  it.each(['', 'unknown-demo', 'constructor', '__proto__'])('rejects non-theme key %j', themeId => {
    expect(getRenderableDemoTheme(themeId)).toBeNull()
  })

  it.each([...available, ...unavailable, ...carpetThemes].filter(id => !isRetiredDemo(id)))('keeps %s on its exact server-side compatibility wrapper', themeId => {
    const source = parse(path.join(demoRoot, themeId, 'client.tsx'))
    expect(imports(source)).toEqual(['../_components/RegisteredDemo'])
    expect(attributes(source, 'RegisteredDemo', 'themeId')).toEqual([themeId])
    expect(source.statements.some(statement => ts.isExpressionStatement(statement)
      && ts.isStringLiteral(statement.expression) && statement.expression.text === 'use client')).toBe(false)
  })

  it.each(available.slice(1).map((id, i) => [id, `${108 + i}-${id}`]))('reads %s metadata from its actual config module', (themeId, directory) => {
    const source = parse(path.join(demoRoot, themeId, 'page.tsx'))
    expect(imports(source)).toContain(`@kepenk/templates/src/themes/configs/_archive/${directory}`)
    expect(imports(source)).not.toContain('@kepenk/templates')
  })

  it('keeps availability rejection on the server before rendering the shared client', () => {
    const source = parse(path.join(demoRoot, '_components/RegisteredDemo.tsx'))
    expect(imports(source)).toEqual(['next/navigation', '@/lib/demoTheme', '../[themeId]/client'])
    const component = source.statements.find(ts.isFunctionDeclaration)
    expect(component?.body?.statements[1]?.getText(source)).toBe('if (!theme) notFound()')
    expect(source.statements.some(statement => ts.isExpressionStatement(statement)
      && ts.isStringLiteral(statement.expression) && statement.expression.text === 'use client')).toBe(false)
  })
})
