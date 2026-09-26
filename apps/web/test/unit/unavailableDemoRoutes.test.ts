import { describe, expect, it, vi } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { THEME_MAP } from '@kepenk/templates/src/registry/theme-map'
import { LEGACY_SABLONLAR } from '@/data/sablonlar'
import { UNIFIED_SABLONLAR } from '@/data/sablonlar/unified-catalog'
import {
  RETIRED_DEMO_ROUTES, RETIRED_DEMO_THEME_IDS,
  PRESERVED_PREMIUM_TEMPLATE_IDS, isRetiredDemo,
} from '@/data/sablonlar/curation'
import DemoPage from '../../src/app/demolar/[themeId]/page'

// Only the browser renderer is isolated; page, registry, catalog and notFound are real.
vi.mock('../../src/app/demolar/[themeId]/client', () => ({ default: () => null }))

const root = path.resolve(__dirname, '../../../../')
const demoRoot = path.join(root, 'apps/web/src/app/demolar')

describe('premium-first demo curation', () => {
  it.each(RETIRED_DEMO_ROUTES)('retires %s without leaving a blank static page', async route => {
    expect(fs.existsSync(path.join(demoRoot, route, 'page.tsx'))).toBe(false)
    expect(fs.existsSync(path.join(demoRoot, route, 'client.tsx'))).toBe(false)
    expect(isRetiredDemo(route)).toBe(true)
    expect(UNIFIED_SABLONLAR.some(theme => theme.id === route)).toBe(false)
    await expect(DemoPage({ params: Promise.resolve({ themeId: route }) }))
      .rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404')
  })

  it('does not manufacture replacement source entries for retired designs', () => {
    for (const id of RETIRED_DEMO_THEME_IDS) expect(Object.hasOwn(THEME_MAP, id)).toBe(false)
  })

  it.each(PRESERVED_PREMIUM_TEMPLATE_IDS)('retains the real HTML source for %s', id => {
    const template = LEGACY_SABLONLAR.find(entry => entry.id === id)
    expect(template, id).toBeDefined()
    expect(template!.minPaket).toBe('PREMIUM')
    expect(template!.htmlKodu).toMatch(/<!doctype html>/i)
    expect(template!.htmlKodu).toMatch(/<style[\s>]/i)
    expect(template!.htmlKodu).toMatch(/<body[\s>]/i)
    expect(template!.htmlKodu).toMatch(/<section[\s>]/i)
    expect(isRetiredDemo(id)).toBe(false)
  })

  it('retains the beauty launch candidate and the original HTML catalog', () => {
    const beauty = LEGACY_SABLONLAR.find(entry => entry.id === 'sektor-guzellik-buyume')
    expect(beauty?.ad).toBe('İpek')
    expect(beauty?.htmlKodu).toMatch(/<!doctype html>/i)
  })

  it.each(['berber-blade', 'cicekci-dugun'])('keeps an actual supported demo for %s', async themeId => {
    const element = await DemoPage({ params: Promise.resolve({ themeId }) })
    expect(element.props.themeId).toBe(themeId)
    expect(Object.hasOwn(THEME_MAP, themeId)).toBe(true)
    expect(isRetiredDemo(themeId)).toBe(false)
  })

  it('rejects an unknown selection instead of constructing a blank browser demo', async () => {
    await expect(DemoPage({ params: Promise.resolve({ themeId: 'no-such-curated-theme' }) }))
      .rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404')
  })

  it('removes the obsolete generator that would recreate retired demo files', () => {
    expect(fs.existsSync(path.join(root, 'create-routes.js'))).toBe(false)
  })
})
