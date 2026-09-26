import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { assertDemoImports, checkDemoImports } from './check-demo-imports.mjs'

function fixture(t, files) {
  const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'kepenk-demo-imports-'))
  t.after(() => fs.rmSync(repoRoot, { recursive: true, force: true }))
  const allFiles = {
    'apps/web/tsconfig.json': JSON.stringify({ compilerOptions: {
      module: 'esnext', moduleResolution: 'bundler', allowJs: true, jsx: 'react-jsx',
      paths: { '@/*': ['./src/*'], '@kepenk/*': ['../../packages/*/src/index.ts'] },
    }, include: ['src/**/*'] }),
    'apps/web/src/lib/real.ts': 'export const value = 1',
    ...files,
  }
  for (const [relative, text] of Object.entries(allFiles)) {
    const filename = path.join(repoRoot, relative)
    fs.mkdirSync(path.dirname(filename), { recursive: true })
    fs.writeFileSync(filename, text)
  }
  return { repoRoot }
}

const demo = 'apps/web/src/app/demolar/sample/client.tsx'

test('resolves relative, alias and workspace imports against real fixture files', t => {
  const context = fixture(t, {
    [demo]: "import './sibling'; import '@/lib/real'; import '@kepenk/templates'",
    'apps/web/src/app/demolar/sample/sibling.ts': 'export const value = 2',
    'packages/templates/src/index.ts': 'export const theme = {}',
  })
  const report = checkDemoImports(context)
  assert.equal(report.filesChecked, 2)
  assert.equal(report.importsChecked, 3)
  assertDemoImports(report)
})

test('collects every stale import instead of stopping at the first failure', t => {
  const context = fixture(t, {
    [demo]: "import '@/components/layout/MinimalLayout';\nimport '@/components/PreviewViewer';\nimport '@xinxia/templates'",
  })
  const report = checkDemoImports(context)
  assert.deepEqual(report.unresolved.map(item => item.specifier), [
    '@/components/layout/MinimalLayout', '@/components/PreviewViewer', '@xinxia/templates',
  ])
  assert.deepEqual(report.unresolved.map(item => item.line), [1, 2, 3])
  assert.throws(() => assertDemoImports(report), /Unresolved demo project imports \(3\)/)
})

test('checks literal dynamic imports, re-exports and require calls', t => {
  const context = fixture(t, {
    [demo]: "import('./missing-dynamic'); export * from './missing-export'; const x = require('./missing-require')",
  })
  assert.equal(checkDemoImports(context).unresolved.length, 3)
})

test('does not mistake comments or string contents for imports', t => {
  const context = fixture(t, {
    [demo]: "// import '@/missing-comment'\nconst text = \"import '@/missing-string'\";\nimport '@/lib/real'",
  })
  const report = checkDemoImports(context)
  assert.equal(report.importsChecked, 1)
  assertDemoImports(report)
})

test('rejects empty directories presented as code modules', t => {
  const context = fixture(t, { [demo]: "import './empty-module'" })
  fs.mkdirSync(path.join(context.repoRoot, 'apps/web/src/app/demolar/sample/empty-module'))
  assert.equal(checkDemoImports(context).unresolved.length, 1)
})

test('finds errors in nested demo directories', t => {
  const context = fixture(t, {
    [demo]: "import '@/lib/real'",
    'apps/web/src/app/demolar/nested/deeper/page.tsx': "import './missing'",
  })
  const report = checkDemoImports(context)
  assert.equal(report.filesChecked, 2)
  assert.equal(report.unresolved[0].file, 'apps/web/src/app/demolar/nested/deeper/page.tsx')
})

test('keeps asset-loader and external npm resolution outside this code-import check', t => {
  const context = fixture(t, { [demo]: "import 'react'; import './theme.css'; import '@/logo.svg'; import '@/lib/real'" })
  const report = checkDemoImports(context)
  assert.equal(report.importsChecked, 1)
  assertDemoImports(report)
})

test('fails closed for a missing demo source tree', t => {
  const context = fixture(t, {})
  assert.throws(() => checkDemoImports(context), /ENOENT/)
})

test('fails closed for an empty demo source tree', t => {
  const context = fixture(t, {})
  fs.mkdirSync(path.join(context.repoRoot, 'apps/web/src/app/demolar'), { recursive: true })
  assert.throws(() => checkDemoImports(context), /No demo source files/)
})

test('fails closed for an invalid TypeScript configuration', t => {
  const context = fixture(t, { [demo]: "import '@/lib/real'", 'apps/web/tsconfig.json': '{broken json' })
  assert.throws(() => checkDemoImports(context))
})
