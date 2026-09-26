import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { checkTemplateExports, assertTemplateExports } from './check-template-exports.mjs'

function fixture(t, files = {}) {
  const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'template-exports-'))
  t.after(() => fs.rmSync(repoRoot, { recursive: true, force: true }))
  const defaults = {
    'apps/web/tsconfig.json': JSON.stringify({ compilerOptions: {
      target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', skipLibCheck: true,
      types: [], noLib: true,
    }, include: ['src/**/*.ts'] }),
    'apps/web/src/page.ts': "import { CONFIG } from '@kepenk/templates'; export const title = CONFIG.name;\n",
    'packages/templates/package.json': JSON.stringify({ name: '@kepenk/templates', exports: {
      '.': './src/index.ts', './loader': './src/loader.ts',
    } }),
    'packages/templates/src/index.ts': "export { CONFIG } from './theme';\n",
    'packages/templates/src/theme.ts': "export const CONFIG = { name: 'Original theme' };\n",
    'packages/templates/src/loader.ts': "export const loadThemeConfig = () => ({ config: 'original' });\n",
    ...files,
  }
  for (const [filename, content] of Object.entries(defaults)) {
    const target = path.join(repoRoot, filename)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, content)
  }
  const scope = path.join(repoRoot, 'apps/web/node_modules/@kepenk')
  fs.mkdirSync(scope, { recursive: true })
  fs.symlinkSync(path.join(repoRoot, 'packages/templates'), path.join(scope, 'templates'), 'dir')
  return () => checkTemplateExports({ repoRoot })
}

test('resolves a real linked package without a template path alias', t => {
  const report = fixture(t)()
  assert.equal(report.namesChecked, 1)
  assertTemplateExports(report)
})

test('detects missing named exports even when the module exists and suggests the real owner', t => {
  const report = fixture(t, { 'packages/templates/src/index.ts': 'export const unrelated = 1;\n' })()
  assert.equal(report.unresolved[0].name, 'CONFIG')
  assert.deepEqual(report.unresolved[0].providers, ['packages/templates/src/theme.ts'])
  assert.throws(() => assertTemplateExports(report), /contract failed/)
})

test('checks the imported name rather than the local alias', t => {
  const report = fixture(t, { 'apps/web/src/page.ts': "import { CONFIG as renamed } from '@kepenk/templates';" })()
  assertTemplateExports(report)
})

test('checks named re-exports and their original names', t => {
  const report = fixture(t, { 'apps/web/src/page.ts': "export { missing as renamed } from '@kepenk/templates';" })()
  assert.equal(report.unresolved[0].name, 'missing')
})

test('accepts default and type-only imports with real exports', t => {
  const report = fixture(t, {
    'packages/templates/src/index.ts': 'export default 7; export interface Shape { name: string }',
    'apps/web/src/page.ts': "import seven, { type Shape } from '@kepenk/templates';",
  })()
  assert.equal(report.namesChecked, 2)
  assertTemplateExports(report)
})

test('rejects a missing default', t => {
  const report = fixture(t, { 'apps/web/src/page.ts': "import missing from '@kepenk/templates';" })()
  assert.equal(report.unresolved[0].name, 'default')
})

test('resolves nested export-star chains', t => {
  const report = fixture(t, {
    'packages/templates/src/index.ts': "export * from './compat';",
    'packages/templates/src/compat.ts': "export * from './theme';",
  })()
  assertTemplateExports(report)
})

test('rejects a broken re-export instead of accepting its spelled name', t => {
  const report = fixture(t, { 'packages/templates/src/index.ts': "export { CONFIG } from './missing';" })()
  assert.ok(report.unresolved.length || report.barrelDiagnostics.length)
  assert.throws(() => assertTemplateExports(report))
})

test('rejects ambiguous export-star names', t => {
  const report = fixture(t, {
    'packages/templates/src/index.ts': "export * from './theme'; export * from './other';",
    'packages/templates/src/other.ts': "export const CONFIG = { name: 'Different theme' };",
  })()
  assert.ok(report.barrelDiagnostics.some(item => item.code === 2308))
  assert.throws(() => assertTemplateExports(report))
})

test('same-original-symbol star exports are not ambiguous', t => {
  const report = fixture(t, {
    'packages/templates/src/index.ts': "export * from './theme'; export * from './compat';",
    'packages/templates/src/compat.ts': "export * from './theme';",
  })()
  assertTemplateExports(report)
})

test('checks subpath names and a compatibility alias points at the same implementation', t => {
  const files = {
    'apps/web/src/page.ts': "import { loadTheme } from '@kepenk/templates/loader';",
    'packages/templates/src/loader.ts': 'export const loadThemeConfig = () => null; export { loadThemeConfig as loadTheme };',
  }
  assertTemplateExports(fixture(t, files)())
})

test('rejects an inaccessible package subpath', t => {
  const report = fixture(t, { 'apps/web/src/page.ts': "import { CONFIG } from '@kepenk/templates/not-exported';" })()
  assert.ok(report.unresolved.some(item => item.name === '*module*'))
})

test('scans editor consumers as well as demos and ignores comment/string lookalikes', t => {
  const report = fixture(t, {
    'apps/web/src/editor/panel.ts': "import { MISSING } from '@kepenk/templates';",
    'apps/web/src/notes.ts': `// import { fake } from '@kepenk/templates';\nconst example = "import { fake } from '@kepenk/templates'";`,
  })()
  assert.equal(report.filesScanned, 3)
  assert.equal(report.consumerFiles, 2)
  assert.deepEqual(report.unresolved.map(item => item.name), ['MISSING'])
})

test('does not execute module side effects', t => {
  const report = fixture(t, {
    'packages/templates/src/theme.ts': "throw new Error('must never execute'); export const CONFIG = { name: 'Original theme' };",
  })()
  assertTemplateExports(report)
})

test('fails closed with an empty consumer census', t => {
  const run = fixture(t, { 'apps/web/src/page.ts': 'export const unrelated = 1;' })
  assert.throws(run, /No template consumers/)
})
