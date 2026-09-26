import { describe, expect, it } from 'vitest'
import { loadThemeConfig } from '../../../../packages/templates/src/registry/config-loader'
import { THEME_MAP } from '../../../../packages/templates/src/registry/theme-map'

const retainedThemes = [
  'cicekci-dugun',
  'insaat-elite', 'insaat-kurumsal', 'insaat-modern', 'insaat-prestij', 'insaat-sade',
  'haliyikama-fabrika', 'haliyikama-koltuk', 'haliyikama-lux', 'haliyikama-organik',
]

describe('shared demo loader preserves archived theme styling', () => {
  it.each(retainedThemes)('retains explicit variables and data without mutating %s', async themeId => {
    const module = await THEME_MAP[themeId]()
    const prefix = themeId.toUpperCase().replace(/-/g, '_')
    const original = module[`${prefix}_CONFIG`]
    const business = module[`${prefix}_BUSINESS`]
    const snapshot = JSON.stringify({ original, business })
    const expected = { ...original.cssVariables, ...original.cssOverrides }
    expect(Object.keys(expected).length).toBeGreaterThan(0)

    const loaded = await loadThemeConfig(themeId)
    expect(loaded).not.toBeNull()
    expect(loaded?.config.id).toBe(themeId)
    expect(loaded?.config.cssVariables).toMatchObject(expected)
    expect(loaded?.config.pages).toEqual(original.pages)
    expect(loaded?.config.globalSections).toEqual(original.globalSections)
    expect(loaded?.business).toBe(business)
    expect(JSON.stringify({ original, business })).toBe(snapshot)

    // A repeat load must be stable and must not accumulate another theme's tokens.
    const repeated = await loadThemeConfig(themeId)
    expect(repeated?.config).toEqual(loaded?.config)
    expect(JSON.stringify({ original, business })).toBe(snapshot)
  })
})
