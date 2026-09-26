#!/usr/bin/env node
/**
 * Compatibility entrypoint for the existing KPNK Vercel project Build Command.
 *
 * Vercel currently invokes:
 *   cd ../.. && node scripts/build-kepenk-web-preview.mjs
 *
 * Keep preview compilation on the same explicit Next.js 16 Webpack/PWA path
 * accepted by the Cloud Run container build. This file may be removed after
 * the Vercel project setting is normalized to the package command directly.
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const PREVIEW_BUILD = Object.freeze({
  command: 'pnpm',
  args: Object.freeze(['--filter', '@kepenk/web', 'build', '--webpack']),
  cwd: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
})

export function runPreviewBuild(spawn = spawnSync) {
  const result = spawn(PREVIEW_BUILD.command, [...PREVIEW_BUILD.args], {
    cwd: PREVIEW_BUILD.cwd,
    env: process.env,
    stdio: 'inherit',
  })

  if (result.error) throw result.error
  if (!Number.isInteger(result.status)) {
    throw new Error('Preview build exited without a numeric status')
  }
  return result.status
}

const invokedAsScript = process.argv[1]
  && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url

if (invokedAsScript) {
  try {
    process.exitCode = runPreviewBuild()
  } catch (error) {
    console.error(`[vercel-preview-build] ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  }
}
