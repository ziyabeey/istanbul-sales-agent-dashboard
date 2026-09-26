import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

function readNonemptyFile(filename) {
  assert.ok(fs.statSync(filename).isFile(), `Expected a regular file: ${filename}`)
  const bytes = fs.readFileSync(filename)
  assert.ok(bytes.length > 0, `File is empty: ${filename}`)
  return bytes
}

function findAsset(directory, extension) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const filename = path.join(directory, entry.name)
    if (entry.isFile() && entry.name.endsWith(extension)) return filename
    if (entry.isDirectory()) {
      const found = findAsset(filename, extension)
      if (found) return found
    }
  }
  return null
}

/** Verify the running image serves its own assets, not a redirect or HTML fallback. */
export async function verifyCloudRunAssets({ appDir, baseUrl, timeoutMs = 5000 }) {
  const origin = new URL(baseUrl)
  assert.ok(['http:', 'https:'].includes(origin.protocol), 'Expected an HTTP(S) origin')
  assert.equal(origin.pathname, '/', 'Expected an origin without a path')
  assert.ok(!origin.username && !origin.password && !origin.search && !origin.hash, 'Expected a plain origin')
  assert.ok(Number.isSafeInteger(timeoutMs) && timeoutMs > 0, 'Expected a positive request timeout')

  readNonemptyFile(path.join(appDir, 'server.js'))
  readNonemptyFile(path.join(appDir, '.next', 'BUILD_ID'))
  const publicDir = path.join(appDir, 'public')
  const manifest = readNonemptyFile(path.join(publicDir, 'manifest.json'))
  const manifestData = JSON.parse(manifest.toString('utf8'))
  assert.ok(typeof manifestData.name === 'string' && manifestData.name.length > 0, 'Manifest must identify the app')
  const worker = readNonemptyFile(path.join(publicDir, 'sw.js'))
  const staticDir = path.join(appDir, '.next', 'static')
  const assets = ['.js', '.css'].map(extension => {
    const filename = findAsset(staticDir, extension)
    assert.ok(filename, `No ${extension} asset in ${staticDir}`)
    const relative = path.relative(staticDir, filename).split(path.sep).map(encodeURIComponent).join('/')
    return {
      url: `/_next/static/${relative}`,
      bytes: readNonemptyFile(filename),
      contentType: extension === '.css' ? /^text\/css(?:;|$)/i : /(?:java|ecma)script/i,
    }
  })

  async function get(url, contentType) {
    const response = await fetch(new URL(url, origin), {
      redirect: 'error',
      signal: AbortSignal.timeout(timeoutMs),
    })
    assert.equal(response.status, 200, `${url} must return 200`)
    assert.match(response.headers.get('content-type') ?? '', contentType, `${url} has the wrong content type`)
    return response
  }

  const healthResponse = await get('/api/health', /application\/(?:[^;]+\+)?json(?:;|$)/i)
  const health = await healthResponse.json()
  assert.equal(health.ok, true, 'Health must report ok=true')
  assert.equal(health.service, 'kepenk-web', 'Health must identify kepenk-web')

  const checks = []
  for (const asset of [
    { url: '/manifest.json', bytes: manifest, contentType: /application\/(?:[^;]+\+)?json(?:;|$)/i },
    { url: '/sw.js', bytes: worker, contentType: /(?:java|ecma)script/i },
    ...assets,
  ]) {
    const response = await get(asset.url, asset.contentType)
    const actual = Buffer.from(await response.arrayBuffer())
    assert.ok(actual.equals(asset.bytes), `${asset.url} does not match the running image's file`)
    checks.push({ path: asset.url, bytes: actual.length, status: 'passed' })
  }
  return { status: 'passed', service: health.service, entrypoint: 'apps/web/server.js', checks }
}

/** Exercise the native sanitizer and its package-relative CSS in the runtime image. */
export function verifyCloudRunSanitizer({ appDir }) {
  assert.ok(path.isAbsolute(appDir), 'Expected an absolute app directory')
  readNonemptyFile(path.join(appDir, 'package.json'))
  const appRequire = createRequire(path.join(appDir, 'package.json'))
  const sanitizerEntry = appRequire.resolve('isomorphic-dompurify')
  // Resolve the exact jsdom used by the sanitizer, not a test-only dependency.
  const sanitizerRequire = createRequire(sanitizerEntry)
  const { JSDOM } = sanitizerRequire('jsdom')
  const dom = new JSDOM('<!doctype html><p>Runtime check</p>')
  try {
    const paragraph = dom.window.document.querySelector('p')
    assert.equal(dom.window.getComputedStyle(paragraph).display, 'block', 'jsdom default stylesheet must load')
  } finally {
    dom.window.close()
  }

  const loaded = appRequire('isomorphic-dompurify')
  const DOMPurify = loaded.default ?? loaded
  assert.equal(typeof DOMPurify.sanitize, 'function', 'Native sanitizer must be callable')
  // These are the existing /sites/[domain] options; no policies are relaxed here.
  const clean = DOMPurify.sanitize(
    '<p data-demo="kepenk"><strong>Randevu</strong><script type="application/json">{}</script></p>',
    {
      ADD_TAGS: ['style', 'link'],
      ADD_ATTR: ['target', 'rel', 'loading', 'decoding'],
      ALLOW_DATA_ATTR: true,
      WHOLE_DOCUMENT: false,
    },
  )
  assert.equal(clean, '<p data-demo="kepenk"><strong>Randevu</strong></p>', 'Sanitization must preserve content and remove the script element')
  assert.equal(DOMPurify.sanitize(''), '', 'Empty HTML must remain empty')
  return { status: 'passed', checks: ['native-sanitizer', 'jsdom-default-stylesheet', 'html-sanitization'] }
}

// CI streams this script to the running container: node --input-type=module -.
const invokedAsScript = process.argv[1] === '-'
  || (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url)
if (invokedAsScript) {
  try {
    const report = await verifyCloudRunAssets({
      appDir: '/app/apps/web',
      baseUrl: `http://127.0.0.1:${process.env.PORT || '8080'}`,
    })
    const sanitizer = verifyCloudRunSanitizer({ appDir: '/app/apps/web' })
    console.log(JSON.stringify({ ...report, sanitizer }, null, 2))
  } catch (error) {
    console.error(`[cloud-run-assets] ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  }
}
