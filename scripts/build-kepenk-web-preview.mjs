import { existsSync, mkdtempSync, renameSync, rmdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Temporary KC-02 acceptance build, NOT a production deployment strategy.
export const previewProjectId = 'prj_arUiO7uZYRBklb0dkifWj0uT8d86';
export const isolatedRoutes = [
  'apps/web/src/app/demolar',
  'apps/web/src/app/dashboard/sitem/editor',
];

export function withPreviewIsolation(repoRoot, env, build) {
  if (env.VERCEL_ENV !== 'preview' || env.VERCEL_PROJECT_ID !== previewProjectId) {
    throw new Error('This build is restricted to the kepenk-web Preview project. Production is not supported.');
  }

  // Fail before moving anything if the expected source layout has changed.
  for (const route of isolatedRoutes) {
    if (!existsSync(join(repoRoot, route))) throw new Error(`Missing expected route: ${route}`);
  }

  // Same filesystem for atomic moves. No source files are deleted or rewritten.
  const scratch = mkdtempSync(join(repoRoot, '.kepenk-preview-'));
  const moved = [];
  try {
    isolatedRoutes.forEach((route, index) => {
      const source = join(repoRoot, route);
      const destination = join(scratch, String(index));
      renameSync(source, destination);
      moved.push({ source, destination });
    });
    console.log('Preview-only isolation: /demolar/** and /dashboard/sitem/editor/**; source will be restored.');
    return build();
  } finally {
    for (const { source, destination } of moved.reverse()) renameSync(destination, source);
    // Only remove the now-empty scratch directory; never recursively delete source.
    rmdirSync(scratch);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  // Let the child receive interruption signals, then restore source in finally.
  const onSignal = () => {};
  process.on('SIGINT', onSignal);
  process.on('SIGTERM', onSignal);
  try {
    withPreviewIsolation(repoRoot, process.env, () => {
      const result = spawnSync('pnpm', ['exec', 'turbo', 'run', 'build', '--filter={apps/web}...'], {
        cwd: repoRoot,
        env: process.env,
        stdio: 'inherit',
      });
      if (result.error) throw result.error;
      if (result.status !== 0) throw new Error(`apps/web build failed (${result.signal ?? result.status}).`);
    });
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    process.off('SIGINT', onSignal);
    process.off('SIGTERM', onSignal);
  }
}
