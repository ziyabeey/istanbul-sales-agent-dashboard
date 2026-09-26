// @vitest-environment node
import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const root = path.resolve(__dirname, '../../../../')
const webDir = path.join(root, 'apps/web')
const webRequire = createRequire(path.join(webDir, 'package.json'))
const templatesRequire = createRequire(path.join(root, 'packages/templates/package.json'))
const webPackage = JSON.parse(fs.readFileSync(path.join(webDir, 'package.json'), 'utf8'))

describe('Cloud Run build dependency contracts', () => {
  it('resolves the real Firebase client exports without initializing an app', () => {
    const app = webRequire('firebase/app')
    const before = app.getApps().length
    const firestore = webRequire('firebase/firestore')
    expect(typeof app.initializeApp).toBe('function')
    expect(typeof firestore.getFirestore).toBe('function')
    expect(app.getApps().length).toBe(before)
    expect(webPackage.dependencies.firebase).toBe('12.19.0')
  })

  it('resolves motion from the templates workspace, not from an app-only install', () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(root, 'packages/templates/package.json'), 'utf8'))
    expect(manifest.dependencies['framer-motion']).toBe('12.35.2')
    expect(fs.statSync(templatesRequire.resolve('framer-motion')).isFile()).toBe(true)
  })

  it.each([
    ['inter', 'Inter Variable', '100 900'],
    ['plus-jakarta-sans', 'Plus Jakarta Sans Variable', '200 800'],
  ])('ships %s variable weights and Turkish-supporting subsets as real local assets', (name, family, weights) => {
    expect(webPackage.dependencies[`@fontsource-variable/${name}`]).toBe('5.3.0')
    const filename = webRequire.resolve(`@fontsource-variable/${name}/wght.css`)
    const css = fs.readFileSync(filename, 'utf8')
    expect(css).toContain(family)
    expect(css).toContain('latin-ext')
    expect(css).toContain(`font-weight: ${weights}`)
    expect(css).toMatch(/font-display:\s*swap/)
    expect(css).not.toMatch(/https?:\/\//)
    const urls = [...css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)]
    expect(urls.length).toBeGreaterThan(0)
    for (const [, relative] of urls) {
      const bytes = fs.readFileSync(path.resolve(path.dirname(filename), relative))
      expect(bytes.length).toBeGreaterThan(4)
      expect(bytes.subarray(0, 4).toString('ascii')).toBe('wOF2')
    }
  })

  it('preserves brand CSS variables and loads fonts before global styles', () => {
    const fonts = fs.readFileSync(path.join(webDir, 'src/app/fonts.css'), 'utf8')
    const layout = fs.readFileSync(path.join(webDir, 'src/app/layout.tsx'), 'utf8')
    expect(fonts).toContain("@import '@fontsource-variable/inter/wght.css'")
    expect(fonts).toContain("@import '@fontsource-variable/plus-jakarta-sans/wght.css'")
    expect(fonts).toContain("--font-inter: 'Inter Variable'")
    expect(fonts).toContain("--font-display: 'Plus Jakarta Sans Variable'")
    expect(layout).toContain("import './fonts.css'")
    expect(layout.indexOf("import './fonts.css'")).toBeLessThan(layout.indexOf("import './globals.css'"))
    expect(layout).toContain('className="font-sans antialiased"')
    expect(layout).not.toContain('next/font/google')
  })
})
