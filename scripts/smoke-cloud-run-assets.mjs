import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
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

// CI streams this script to the running container: node --input-type=module -.
const invokedAsScript = process.argv[1] === '-'
  || (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url)
if (invokedAsScript) {
  try {
    const report = await verifyCloudRunAssets({
      appDir: '/app/apps/web',
      baseUrl: `http://127.0.0.1:${process.env.PORT || '8080'}`,
    })
    console.log(JSON.stringify(report, null, 2))
  } catch (error) {
    console.error(`[cloud-run-assets] ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  }
}
