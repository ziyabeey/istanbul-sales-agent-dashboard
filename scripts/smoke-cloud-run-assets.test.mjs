import assert from 'node:assert/strict'
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { verifyCloudRunAssets } from './smoke-cloud-run-assets.mjs'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))
const dockerfile = fs.readFileSync(path.join(repoRoot, 'Dockerfile'), 'utf8')
const runner = dockerfile.split(/FROM\s+\S+\s+AS\s+runner\s*\n/i)[1]

test('Docker starts the app-relative standalone entrypoint without a shell wrapper', () => {
  assert.ok(runner)
  assert.match(runner, /^WORKDIR \/app\s*$/m)
  assert.match(runner, /^CMD \["node", "apps\/web\/server\.js"\]\s*$/m)
  assert.match(runner, /^USER nextjs\s*$/m)
})

test('Docker copies public and static assets beside the traced web server', () => {
  assert.match(runner, /^COPY --from=builder --chown=nextjs:nodejs \/app\/apps\/web\/public \.\/apps\/web\/public\s*$/m)
  assert.match(runner, /^COPY --from=builder --chown=nextjs:nodejs \/app\/apps\/web\/\.next\/static \.\/apps\/web\/\.next\/static\s*$/m)
  assert.match(runner, /^COPY --from=builder --chown=nextjs:nodejs \/app\/apps\/web\/\.next\/standalone \.\/\s*$/m)
})

async function fixture(t, overrides = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kepenk-cloud-run-assets-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  const appDir = path.join(root, 'apps', 'web')
  const files = {
    'server.js': '// fixture entrypoint, not a built Next server\n',
    '.next/BUILD_ID': 'fixture-build-id',
    'public/manifest.json': JSON.stringify({ name: 'Kepenk.ai' }),
    'public/sw.js': '// fixture worker\n',
    '.next/static/chunks/main.js': '// fixture client asset\n',
    '.next/static/css/app.css': 'body { display: block; }\n',
  }
  for (const [name, content] of Object.entries(files)) {
    const filename = path.join(appDir, name)
    fs.mkdirSync(path.dirname(filename), { recursive: true })
    fs.writeFileSync(filename, content)
  }
  const routes = {
    '/api/health': { body: JSON.stringify({ ok: true, service: 'kepenk-web' }), type: 'application/json' },
    '/manifest.json': { body: files['public/manifest.json'], type: 'application/manifest+json' },
    '/sw.js': { body: files['public/sw.js'], type: 'application/javascript' },
    '/_next/static/chunks/main.js': { body: files['.next/static/chunks/main.js'], type: 'text/javascript' },
    '/_next/static/css/app.css': { body: files['.next/static/css/app.css'], type: 'text/css' },
    ...overrides,
  }
  const requests = []
  const server = http.createServer((req, res) => {
    requests.push(req.url)
    const route = routes[req.url] ?? { status: 404, body: 'Not found', type: 'text/plain' }
    res.writeHead(route.status ?? 200, {
      'content-type': route.type,
      ...(route.location ? { location: route.location } : {}),
    })
    res.end(route.body)
  })
  await new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', resolve)
  })
  t.after(() => new Promise(resolve => {
    server.close(resolve)
    server.closeAllConnections()
  }))
  return { root, appDir, baseUrl: `http://127.0.0.1:${server.address().port}`, requests }
}

test('checks health plus manifest, worker, JS and CSS against actual fixture bytes', async t => {
  const context = await fixture(t)
  const report = await verifyCloudRunAssets(context)
  assert.equal(report.status, 'passed')
  assert.equal(report.checks.length, 4)
  assert.equal(context.requests.length, 5)
  assert.ok(report.checks.every(check => check.bytes > 0))
})

test('rejects an entrypoint copied at the image root instead of apps/web', async t => {
  const context = await fixture(t)
  fs.renameSync(path.join(context.appDir, 'server.js'), path.join(context.root, 'server.js'))
  await assert.rejects(verifyCloudRunAssets(context), /server\.js/)
  assert.equal(context.requests.length, 0)
})

test('rejects public files at the old image-root location', async t => {
  const context = await fixture(t)
  fs.renameSync(path.join(context.appDir, 'public'), path.join(context.root, 'public'))
  await assert.rejects(verifyCloudRunAssets(context), /manifest\.json/)
})

test('rejects a missing generated PWA worker', async t => {
  const context = await fixture(t)
  fs.unlinkSync(path.join(context.appDir, 'public', 'sw.js'))
  await assert.rejects(verifyCloudRunAssets(context), /sw\.js/)
})

test('rejects missing client CSS even when JavaScript is present', async t => {
  const context = await fixture(t)
  fs.unlinkSync(path.join(context.appDir, '.next', 'static', 'css', 'app.css'))
  await assert.rejects(verifyCloudRunAssets(context), /No \.css asset/)
})

test('rejects an empty client asset', async t => {
  const context = await fixture(t)
  fs.writeFileSync(path.join(context.appDir, '.next', 'static', 'chunks', 'main.js'), '')
  await assert.rejects(verifyCloudRunAssets(context), /File is empty/)
})

test('does not accept a healthy response from the wrong service', async t => {
  const context = await fixture(t, {
    '/api/health': { body: JSON.stringify({ ok: true, service: 'other-app' }), type: 'application/json' },
  })
  await assert.rejects(verifyCloudRunAssets(context), /identify kepenk-web/)
})

test('does not accept ok=false just because HTTP status is 200', async t => {
  const context = await fixture(t, {
    '/api/health': { body: JSON.stringify({ ok: false, service: 'kepenk-web' }), type: 'application/json' },
  })
  await assert.rejects(verifyCloudRunAssets(context), /ok=true/)
})

test('rejects asset 404s after a healthy liveness response', async t => {
  const context = await fixture(t, {
    '/_next/static/chunks/main.js': { status: 404, body: 'missing', type: 'text/plain' },
  })
  await assert.rejects(verifyCloudRunAssets(context), /must return 200/)
})

test('rejects HTML fallback responses for static assets', async t => {
  const context = await fixture(t, {
    '/_next/static/css/app.css': { body: '<html>Not found</html>', type: 'text/html' },
  })
  await assert.rejects(verifyCloudRunAssets(context), /wrong content type/)
})

test('rejects stale assets even when status and MIME type are correct', async t => {
  const context = await fixture(t, {
    '/sw.js': { body: '// worker from a different build', type: 'application/javascript' },
  })
  await assert.rejects(verifyCloudRunAssets(context), /does not match/)
})

test('does not follow redirects when checking image-local assets', async t => {
  const context = await fixture(t, {
    '/manifest.json': { status: 302, location: '/fallback', body: '', type: 'application/json' },
  })
  await assert.rejects(verifyCloudRunAssets(context), /fetch failed/)
  assert.ok(!context.requests.includes('/fallback'))
})
