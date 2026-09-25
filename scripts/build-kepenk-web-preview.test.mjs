import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { isolatedRoutes, previewProjectId, withPreviewIsolation } from './build-kepenk-web-preview.mjs';

const allowed = { VERCEL_ENV: 'preview', VERCEL_PROJECT_ID: previewProjectId };

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'kepenk-preview-test-'));
  t.after(() => rmSync(root, { recursive: true }));
  for (const route of isolatedRoutes) {
    mkdirSync(join(root, route), { recursive: true });
    writeFileSync(join(root, route, 'page.tsx'), `preserved:${route}`);
  }
  return root;
}

function assertRestored(root) {
  for (const route of isolatedRoutes) {
    assert.equal(readFileSync(join(root, route, 'page.tsx'), 'utf8'), `preserved:${route}`);
  }
}

test('rejects production, local builds and other projects before touching source', t => {
  const root = fixture(t);
  for (const env of [{}, { ...allowed, VERCEL_ENV: 'production' }, { ...allowed, VERCEL_PROJECT_ID: 'other' }]) {
    assert.throws(() => withPreviewIsolation(root, env, () => assert.fail('must not build')), /restricted/);
    assertRestored(root);
  }
});

test('isolates only the two routes and restores them after success', t => {
  const root = fixture(t);
  assert.equal(withPreviewIsolation(root, allowed, () => {
    isolatedRoutes.forEach(route => assert.equal(existsSync(join(root, route)), false));
    return 'built';
  }), 'built');
  assertRestored(root);
});

test('restores source after a build error', t => {
  const root = fixture(t);
  assert.throws(() => withPreviewIsolation(root, allowed, () => { throw new Error('build failed'); }), /build failed/);
  assertRestored(root);
});

test('missing route fails before isolating any existing route', t => {
  const root = fixture(t);
  rmSync(join(root, isolatedRoutes[1]), { recursive: true });
  assert.throws(() => withPreviewIsolation(root, allowed, () => assert.fail('must not build')), /Missing expected route/);
  assert.equal(readFileSync(join(root, isolatedRoutes[0], 'page.tsx'), 'utf8'), `preserved:${isolatedRoutes[0]}`);
});
