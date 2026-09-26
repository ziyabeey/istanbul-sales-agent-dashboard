import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as legacy from '../../../../packages/templates/src/legacy-demo-configs'
import { THEME_MAP } from '../../../../packages/templates/src/registry/theme-map'
import { loadTheme, loadThemeConfig } from '../../../../packages/templates/src/registry/config-loader'

const root = fileURLToPath(new URL('../../../../', import.meta.url))

describe('legacy template export compatibility', () => {
  it('exports exactly the archived module paths from the unchanged registry', () => {
    const map = fs.readFileSync(path.join(root, 'packages/templates/src/registry/theme-map.ts'), 'utf8')
    const barrel = fs.readFileSync(path.join(root, 'packages/templates/src/legacy-demo-configs.ts'), 'utf8')
    const registered = [...map.matchAll(/import\('\.\.\/(themes\/configs\/_archive\/[^']+)'\)/g)].map(match => match[1]).sort()
    const forwarded = [...barrel.matchAll(/export \* from '\.\/(themes\/configs\/_archive\/[^']+)'/g)].map(match => match[1]).sort()
    expect(registered.length).toBeGreaterThan(0)
    expect(new Set(forwarded).size).toBe(forwarded.length)
    expect(forwarded).toEqual(registered)
    for (const module of forwarded) expect(fs.existsSync(path.join(root, 'packages/templates/src', module, 'index.ts'))).toBe(true)
  })

  it.each(['asansor-bina', 'berber-blade', 'cicekci-lux', 'haliyikama-lux', 'spor-zen', 'vet-spa'])(
    '%s retains the original config, business and CSS object identities', async themeId => {
      const original = await THEME_MAP[themeId]()
      const prefix = themeId.toUpperCase().replaceAll('-', '_')
      const exports = legacy as Record<string, unknown>
      for (const suffix of ['CONFIG', 'BUSINESS', 'CSS']) {
        const name = `${prefix}_${suffix}`
        expect(original[name], name).toBeDefined()
        expect(exports[name], name).toBe(original[name])
      }
    },
  )

  it('supplies the actual config name read during cicekci-lux page collection', () => {
    expect(legacy.CICEKCI_LUX_CONFIG.name).toBeTruthy()
    expect(legacy.CICEKCI_LUX_BUSINESS.name).toBe('Maison Florale Istanbul')
  })

  it('the historical editor loader name is the exact canonical function', () => {
    expect(loadTheme).toBe(loadThemeConfig)
  })

  it('does not invent a theme for an unknown editor selection', async () => {
    expect(await loadTheme('no-such-kg01-theme')).toBeNull()
  })
})
