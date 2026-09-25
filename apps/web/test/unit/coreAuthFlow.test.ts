import { beforeAll, describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ParolaYenilePage from '@/app/parola-yenile/page'
import {
  CORE_AUTH_FLOW_MAX,
  CORE_AUTH_FLOW_TTL_SECONDS,
  beginAuthFlow,
  decodeAuthFlows,
  encodeAuthFlows,
  findAuthFlow,
  readAuthFlows,
  removeAuthFlow,
} from '@/lib/core/authFlow'

const NOW = Date.parse('2026-09-16T12:00:00Z')
const HASH = 'a'.repeat(64)
const here = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.resolve(here, '../..')

beforeAll(() => {
  process.env.SESSION_SECRET = 'kc02-test-session-secret-0123456789abcdef'
})

describe('browser-bound auth flows', () => {
  it('round-trips a signed flow cookie and finds flows by state and action', () => {
    const { flow, flows } = beginAuthFlow([], 'recovery', HASH, NOW)
    expect(flow.state).toMatch(/^[A-Za-z0-9_-]{32}$/)
    expect(flow.expiresAt).toBe(NOW + CORE_AUTH_FLOW_TTL_SECONDS * 1000)

    const encoded = encodeAuthFlows(flows)
    const decoded = decodeAuthFlows(encoded, NOW)
    expect(decoded).toEqual(flows)
    expect(findAuthFlow(decoded, flow.state, 'recovery')).toEqual(flow)
    expect(findAuthFlow(decoded, 'B'.repeat(32), 'recovery')).toBeNull()
    expect(findAuthFlow(decoded, 'short', 'recovery')).toBeNull()
    expect(removeAuthFlow(decoded, flow.state)).toEqual([])
  })

  it('rejects tampered, unsigned and expired flows', () => {
    const { flow, flows } = beginAuthFlow([], 'recovery', HASH, NOW)
    const encoded = encodeAuthFlows(flows)

    const [payload, signature] = [encoded.slice(0, encoded.lastIndexOf('.')), encoded.slice(encoded.lastIndexOf('.') + 1)]
    const forged = Buffer.from(JSON.stringify([{ ...flow, bindingHash: 'b'.repeat(64) }]), 'utf8').toString('base64url')
    expect(decodeAuthFlows(`${forged}.${signature}`, NOW)).toEqual([])
    expect(decodeAuthFlows(payload, NOW)).toEqual([])
    expect(decodeAuthFlows(`${payload}.x`, NOW)).toEqual([])
    expect(decodeAuthFlows('garbage', NOW)).toEqual([])
    expect(decodeAuthFlows(encoded, flow.expiresAt + 1)).toEqual([])
  })

  it('keeps at most a few concurrent flows and drops expired ones when a new flow starts', () => {
    let flows = beginAuthFlow([], 'recovery', HASH, NOW - 2 * CORE_AUTH_FLOW_TTL_SECONDS * 1000).flows
    for (let i = 0; i < CORE_AUTH_FLOW_MAX + 2; i++) flows = beginAuthFlow(flows, 'recovery', HASH, NOW).flows
    expect(flows.length).toBe(CORE_AUTH_FLOW_MAX)
    expect(flows.every((f) => f.expiresAt > NOW)).toBe(true)
  })

  it('reads flows from the request cookie by exact name', () => {
    const { flow, flows } = beginAuthFlow([], 'recovery', HASH, NOW)
    const request = new Request('https://app.kepenk.ai/api/core/auth/kurtarma', {
      headers: { cookie: `other=1; kepenk_core_flows=${encodeAuthFlows(flows)}` },
    })
    expect(readAuthFlows(request, NOW).map((f) => f.state)).toEqual([flow.state])
    expect(readAuthFlows(new Request('https://app.kepenk.ai/'), NOW)).toEqual([])
  })

  it('ships a usable token-free password-reset page that completes through the recovery BFF session', () => {
    const source = fs.readFileSync(path.join(appRoot, 'src/app/parola-yenile/page.tsx'), 'utf8')

    expect(ParolaYenilePage).toBeTypeOf('function')
    expect(source).toContain("const CORE_CSRF_COOKIE = 'kepenk_core_csrf'")
    expect(source).toContain("const CORE_CSRF_HEADER = 'x-kepenk-csrf'")
    expect(source).toContain("fetch('/api/core/auth/parola-guncelle'")
    expect(source).toContain("credentials: 'same-origin'")
    expect(source).toContain('[CORE_CSRF_HEADER]: csrf')
    expect(source).toContain('minLength={MIN_PASSWORD_LENGTH}')
    expect(source).toContain('maxLength={MAX_PASSWORD_LENGTH}')
    expect(source).toContain("durum === 'invalid'")
    expect(source).not.toContain('token_hash')
    expect(source).not.toContain('access_token')
    expect(source).not.toContain('refresh_token')
  })
})
