import { describe, expect, it } from 'vitest'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import * as recovered from '../../../packages/templates/src/historical-demo-configs'

const root = path.resolve(__dirname, '../../..')
// Exact blobs from the last pre-checkpoint source, commit 5288d433.
// These hashes cover all authored data, CSS and section configuration, not just names.
const originals = [
  ['oto-bakim', '285f6a59041f12606d5c77ddf2d321c2d0b25aba'],
  ['oto-detay', '415995aef1b10bb6d1e2ca30c89d1d58d1e3fb88'],
  ['oto-eksper', '1cddab7a3ef1fa3b076cd1cfe2774b8ea0249285'],
  ['oto-elektrik', '9ec251b9fe33e161176ddc1928276fc1ff4cde82'],
  ['oto-filo', '4c3978e68f8175012326c7019da9ad9485b21f28'],
  ['oto-kaporta', '40fdb3e305878cc9d5be528ae703809c10bfd5ff'],
  ['oto-lastik', '03bdaf038f11ed08cd6dd2f649069d281675a7a4'],
  ['restoran-lezzet', 'f1bbc49e24d138399cc99246e02672898e1e657a'],
  ['restoran-nar', '774fb9f906007b8b405b5f046f3b281f8fea58f7'],
  ['restoran-sofra', '20dbf6256d1ca9fbf66653c1b7753ec0b259a557'],
  ['restoran-tabledot', '6a2dbac24a3aec215fd1ea13f23c1f4daa2fe730'],
  ['restoran-zincir', '6ccb5fdd3981b04b3bf4ade94dacddafac4dd36a'],
] as const

const recoveredExports = recovered as Record<string, unknown>

describe('historical demo source recovery', () => {
  it.each(originals)('%s preserves its source bytes and real named exports', (id, sha) => {
    const bytes = fs.readFileSync(path.join(root, 'packages/templates/src/themes/configs', `${id}-config.ts`))
    const actualSha = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex')
    expect(actualSha).toBe(sha)

    const prefix = id.toUpperCase().replaceAll('-', '_')
    const config = recoveredExports[`${prefix}_CONFIG`] as { id: string; name: string; cssVariables: unknown; pages: unknown[] }
    const business = recoveredExports[`${prefix}_BUSINESS`] as { name: string }
    const css = recoveredExports[`${prefix}_CSS`]
    expect(config, `${prefix}_CONFIG`).toBeDefined()
    expect(business, `${prefix}_BUSINESS`).toBeDefined()
    expect(css, `${prefix}_CSS`).toBeDefined()
    expect(config.id).toBe(id)
    expect(config.name).toBeTruthy()
    expect(business.name).toBeTruthy()
    expect(config.cssVariables).toBe(css)
    expect(Array.isArray(config.pages)).toBe(true)
    expect(config.pages.length).toBeGreaterThan(0)
  })

  it('forwards only recovered modules and connects them to the package root', () => {
    const barrel = fs.readFileSync(path.join(root, 'packages/templates/src/historical-demo-configs.ts'), 'utf8')
    const forwarded = [...barrel.matchAll(/export \* from '\.\/themes\/configs\/([^']+)-config'/g)].map(match => match[1]).sort()
    expect(forwarded).toEqual(originals.map(([id]) => id).sort())
    const entry = fs.readFileSync(path.join(root, 'packages/templates/src/index.ts'), 'utf8')
    expect(entry).toContain("export * from './historical-demo-configs'")
  })
})
