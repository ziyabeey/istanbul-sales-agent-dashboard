import { cpSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const isolatedRoutes = [
  'apps/web/src/app/demolar',
  'apps/web/src/app/dashboard/sitem/editor',
]

for (const route of isolatedRoutes) {
  if (!existsSync(join(repoRoot, route))) {
    throw new Error(`Cloud Run build expected the legacy route to exist: ${route}`)
  }
}

const scratch = mkdtempSync(join(repoRoot, '.kepenk-cloud-run-'))
const moved = []

try {
  isolatedRoutes.forEach((route, index) => {
    const source = join(repoRoot, route)
    const destination = join(scratch, String(index))
    // Docker overlay filesystems can reject directory rename with EXDEV even
    // when both paths appear under /app. A scoped copy/remove works on Cloud
    // Build and the finally block restores the source tree for local runs.
    cpSync(source, destination, { recursive: true })
    rmSync(source, { recursive: true })
    moved.push({ source, destination })
  })

  console.log('Cloud Run build isolation: /demolar/** and /dashboard/sitem/editor/**')
  const result = spawnSync('pnpm', ['exec', 'turbo', 'run', 'build', '--filter={apps/web}...'], {
    cwd: repoRoot,
    env: process.env,
    stdio: 'inherit',
  })

  if (result.error) throw result.error
  if (result.status !== 0) {
    throw new Error(`Kepenk Cloud Run build failed (${result.signal ?? result.status}).`)
  }
} finally {
  for (const { source, destination } of moved.reverse()) {
    cpSync(destination, source, { recursive: true })
    rmSync(destination, { recursive: true })
  }
  rmSync(scratch, { recursive: true })
}
