// @vitest-environment node
import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  PREVIEW_BUILD,
  runPreviewBuild,
} from '../../../../scripts/build-kepenk-web-preview.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')

describe('Vercel preview compatibility build', () => {
  it('uses the exact Webpack/PWA build path accepted by the Cloud Run image', () => {
    expect(PREVIEW_BUILD).toEqual({
      command: 'pnpm',
      args: ['--filter', '@kepenk/web', 'build', '--webpack'],
      cwd: root,
    })

    const dockerfile = fs.readFileSync(path.join(root, 'Dockerfile'), 'utf8')
    expect(dockerfile).toContain('RUN pnpm --filter @kepenk/web build --webpack')
  })

  it('runs from the repository root with inherited stdio and environment', () => {
    const calls: unknown[][] = []
    const status = runPreviewBuild(((command: string, args: string[], options: Record<string, unknown>) => {
      calls.push([command, args, options])
      return { status: 0 }
    }) as never)

    expect(status).toBe(0)
    expect(calls).toHaveLength(1)
    const [command, args, options] = calls[0] as [string, string[], Record<string, unknown>]
    expect(command).toBe('pnpm')
    expect(args).toEqual(['--filter', '@kepenk/web', 'build', '--webpack'])
    expect(options.cwd).toBe(root)
    expect(options.stdio).toBe('inherit')
    expect(options.env).toBe(process.env)
  })

  it('preserves the child build exit status instead of turning failures green', () => {
    const status = runPreviewBuild((() => ({ status: 37 })) as never)
    expect(status).toBe(37)
  })

  it('fails closed when the child process cannot start', () => {
    expect(() => runPreviewBuild((() => ({
      status: null,
      error: new Error('pnpm unavailable'),
    })) as never)).toThrow('pnpm unavailable')
  })

  it('fails closed on a signal-only child exit', () => {
    expect(() => runPreviewBuild((() => ({ status: null, signal: 'SIGTERM' })) as never))
      .toThrow('without a numeric status')
  })
})
