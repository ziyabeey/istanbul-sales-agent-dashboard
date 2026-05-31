import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  DEMO_ESNAF_ID,
  isDemoEsnafId,
  isDemoSession,
  safeDemoRedirectPath,
} from '@/lib/demoMode'

const DEMO_ENV_KEYS = [
  'KEPENK_DEMO_MODE',
  'DEMO_MODE',
  'NEXT_PUBLIC_DEMO_MODE',
] as const

type DemoEnvKey = typeof DEMO_ENV_KEYS[number]

let originalEnv: Record<DemoEnvKey, string | undefined>

function setDemoEnv(value: string | undefined) {
  for (const key of DEMO_ENV_KEYS) {
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }
}

describe('demoMode helpers', () => {
  beforeEach(() => {
    originalEnv = {
      KEPENK_DEMO_MODE: process.env.KEPENK_DEMO_MODE,
      DEMO_MODE: process.env.DEMO_MODE,
      NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
    }
  })

  afterEach(() => {
    for (const key of DEMO_ENV_KEYS) {
      const value = originalEnv[key]
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
  })

  it('recognizes the demo esnaf id', () => {
    expect(isDemoEsnafId(DEMO_ESNAF_ID)).toBe(true)
  })

  it('rejects random or missing esnaf ids', () => {
    expect(isDemoEsnafId('real-esnaf-01')).toBe(false)
    expect(isDemoEsnafId('')).toBe(false)
    expect(isDemoEsnafId(null)).toBe(false)
    expect(isDemoEsnafId(undefined)).toBe(false)
  })

  it('only treats the demo esnaf as a demo session when demo mode is enabled', () => {
    setDemoEnv('true')

    expect(isDemoSession(DEMO_ESNAF_ID)).toBe(true)
    expect(isDemoSession('real-esnaf-01')).toBe(false)
    expect(isDemoSession(undefined)).toBe(false)
  })

  it('does not allow demo sessions when demo mode is explicitly disabled', () => {
    setDemoEnv('false')

    expect(isDemoSession(DEMO_ESNAF_ID)).toBe(false)
  })

  it('allows safe internal demo redirect paths', () => {
    expect(safeDemoRedirectPath('/dashboard')).toBe('/dashboard')
    expect(safeDemoRedirectPath('/test-demo/status')).toBe('/test-demo/status')
  })

  it('falls back for unsafe or malformed demo redirect paths', () => {
    expect(safeDemoRedirectPath('//evil.com')).toBe('/dashboard')
    expect(safeDemoRedirectPath('http://bad')).toBe('/dashboard')
    expect(safeDemoRedirectPath('dashboard')).toBe('/dashboard')
    expect(safeDemoRedirectPath('')).toBe('/dashboard')
    expect(safeDemoRedirectPath(null)).toBe('/dashboard')
    expect(safeDemoRedirectPath(undefined)).toBe('/dashboard')
  })
})
