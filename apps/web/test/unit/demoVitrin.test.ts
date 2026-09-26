// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { THEME_CATALOG_ARRAY } from '@kepenk/templates/src/registry/theme-catalog'
import { THEME_MAP } from '@kepenk/templates/src/registry/theme-map'
import { RETIRED_DEMO_ROUTES, isRetiredDemo } from '@/data/sablonlar/curation'

vi.mock('next/link', () => ({
  default: ({ children }: { children: unknown }) => children,
}))

import { buildItems } from '../../src/app/demolar/vitrin/page'

describe('public demo showcase renderability', () => {
  const items = buildItems()
  const ids = new Set(items.map(item => item.key))

  it('shows only themes with a real loader and no retirement marker', () => {
    expect(items.length).toBeGreaterThan(0)
    for (const item of items) {
      expect(Object.hasOwn(THEME_MAP, item.key), item.key).toBe(true)
      expect(isRetiredDemo(item.key), item.key).toBe(false)
      expect(item.path).toBe(`/demolar/${item.key}`)
    }
  })

  it('does not advertise any catalog entry that the dynamic demo route cannot load', () => {
    const unrenderable = THEME_CATALOG_ARRAY
      .map(theme => theme.id)
      .filter(id => !Object.hasOwn(THEME_MAP, id) || isRetiredDemo(id))
    expect(unrenderable.length).toBeGreaterThan(0)
    for (const id of unrenderable) expect(ids.has(id), id).toBe(false)
  })

  it.each(RETIRED_DEMO_ROUTES)('keeps retired route %s out of the showcase', id => {
    expect(ids.has(id)).toBe(false)
  })

  it('keeps supported premium and bespoke-backed catalog entries when renderable', () => {
    for (const id of ['dis-premium', 'fitness-premium', 'berber-blade']) {
      if (Object.hasOwn(THEME_MAP, id)) expect(ids.has(id), id).toBe(true)
    }
  })

  it('derives visible sector counts from the renderable item set, not the raw catalog', () => {
    const visibleSectors = new Set(items.map(item => item.sektorId))
    expect(visibleSectors.size).toBeGreaterThan(0)
    expect(visibleSectors.size).toBeLessThanOrEqual(new Set(THEME_CATALOG_ARRAY.map(item => item.sectorId)).size)
  })
})
