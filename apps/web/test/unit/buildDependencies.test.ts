// @vitest-environment node
import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import os from 'node:os'
import ts from 'typescript'

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

// Use a fresh native Node process: Vitest's DOM environment must not hide a
// broken server import or resolve a different test-only jsdom dependency.
function runSanitizerSmoke(appDir: string) {
  const script = pathToFileURL(path.join(root, 'scripts/smoke-cloud-run-assets.mjs')).href
  return spawnSync(process.execPath, ['--input-type=module', '-e', `
    import { verifyCloudRunSanitizer } from ${JSON.stringify(script)};
    console.log(JSON.stringify(verifyCloudRunSanitizer({ appDir: ${JSON.stringify(appDir)} })));
  `], { cwd: root, encoding: 'utf8', timeout: 15000 })
}

describe('native server sanitizer packaging', () => {
  it('keeps the filesystem-dependent sanitizer external without dropping existing packages', () => {
    const source = ts.createSourceFile('next.config.ts',
      fs.readFileSync(path.join(webDir, 'next.config.ts'), 'utf8'), ts.ScriptTarget.Latest, true)
    const properties: ts.PropertyAssignment[] = []
    function visit(node: ts.Node) {
      if (ts.isPropertyAssignment(node) && node.name.getText(source) === 'serverExternalPackages') properties.push(node)
      ts.forEachChild(node, visit)
    }
    visit(source)
    expect(properties).toHaveLength(1)
    const initializer = properties[0].initializer
    expect(ts.isArrayLiteralExpression(initializer)).toBe(true)
    if (!ts.isArrayLiteralExpression(initializer)) throw new Error('Expected an explicit external package list')
    const names = initializer.elements.map(element => ts.isStringLiteral(element) ? element.text : '')
    expect(names).toEqual([
      'iyzipay', 'firebase-admin', '@google-cloud/tasks', 'twilio', 'puppeteer-core',
      'isomorphic-dompurify', 'jsdom',
    ])
  })

  it('loads the real server package, default stylesheet and unchanged sanitization in native Node', () => {
    const result = runSanitizerSmoke(webDir)
    expect(result.error).toBeUndefined()
    expect(result.status, result.stderr).toBe(0)
    expect(JSON.parse(result.stdout)).toEqual({
      status: 'passed', checks: ['native-sanitizer', 'jsdom-default-stylesheet', 'html-sanitization'],
    })
  }, 20000)

  it('fails instead of declaring success when the runtime app manifest is missing', () => {
    const appDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kepenk-missing-runtime-'))
    try {
      const result = runSanitizerSmoke(appDir)
      expect(result.error).toBeUndefined()
      expect(result.status).toBe(1)
      expect(result.stderr).toContain('package.json')
      expect(result.stdout).not.toContain('"status":"passed"')
    } finally {
      fs.rmSync(appDir, { recursive: true, force: true })
    }
  }, 20000)
})
