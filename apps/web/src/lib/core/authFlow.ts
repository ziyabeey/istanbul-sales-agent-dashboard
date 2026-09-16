import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import type { NextResponse } from 'next/server'
import { getSessionSecret } from '../auth/sessionSecret'
import { readCookie } from './bffSession'

/**
 * KC-02: browser-bound auth flows, the Kepenk counterpart of the accepted
 * Randevu F10-01 `yzt_auth_flows` contract.
 *
 * A recovery request writes a short-lived, HMAC-signed, HttpOnly, host-only
 * flow cookie scoped to `/api/core/auth`. The e-mail link must come back to
 * the same browser with the flow's `state`; the flow is removed on first use,
 * so a replayed or cross-browser link cannot mint a session. SameSite=Lax is
 * required because the link arrives as a top-level navigation from a mail
 * client. The cookie is self-contained (no server state) and bounded to a few
 * concurrent flows, exactly like the Randevu worker.
 */
export const CORE_AUTH_FLOW_COOKIE = 'kepenk_core_flows'
export const CORE_AUTH_FLOW_PATH = '/api/core/auth'
export const CORE_AUTH_FLOW_TTL_SECONDS = 10 * 60
export const CORE_AUTH_FLOW_MAX = 4

export type CoreAuthFlowAction = 'recovery'

export interface CoreAuthFlow {
  action: CoreAuthFlowAction
  state: string
  /** sha256 of the normalized identifier the flow was started for (e-mail). */
  bindingHash: string
  expiresAt: number
}

const STATE_RE = /^[A-Za-z0-9_-]{32,128}$/
const HASH_RE = /^[0-9a-f]{64}$/

function sign(payload: string): string {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('base64url')
}

function validFlow(value: unknown, now: number): value is CoreAuthFlow {
  if (!value || typeof value !== 'object') return false
  const flow = value as Partial<CoreAuthFlow>
  return (
    flow.action === 'recovery' &&
    typeof flow.state === 'string' &&
    STATE_RE.test(flow.state) &&
    typeof flow.bindingHash === 'string' &&
    HASH_RE.test(flow.bindingHash) &&
    typeof flow.expiresAt === 'number' &&
    Number.isFinite(flow.expiresAt) &&
    flow.expiresAt > now
  )
}

export function encodeAuthFlows(flows: CoreAuthFlow[]): string {
  const payload = Buffer.from(JSON.stringify(flows.slice(-CORE_AUTH_FLOW_MAX)), 'utf8').toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function decodeAuthFlows(cookieValue: string | null, now: number = Date.now()): CoreAuthFlow[] {
  if (!cookieValue) return []
  const separator = cookieValue.lastIndexOf('.')
  if (separator <= 0) return []
  const payload = cookieValue.slice(0, separator)
  const signature = cookieValue.slice(separator + 1)
  const expected = sign(payload)
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return []
  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (!Array.isArray(decoded)) return []
    return decoded.filter((flow) => validFlow(flow, now)).slice(-CORE_AUTH_FLOW_MAX)
  } catch {
    return []
  }
}

export function readAuthFlows(request: Request, now: number = Date.now()): CoreAuthFlow[] {
  return decodeAuthFlows(readCookie(request, CORE_AUTH_FLOW_COOKIE), now)
}

export function beginAuthFlow(
  existing: CoreAuthFlow[],
  action: CoreAuthFlowAction,
  bindingHash: string,
  now: number = Date.now()
): { flow: CoreAuthFlow; flows: CoreAuthFlow[] } {
  const flow: CoreAuthFlow = {
    action,
    state: randomBytes(24).toString('base64url'),
    bindingHash,
    expiresAt: now + CORE_AUTH_FLOW_TTL_SECONDS * 1000,
  }
  return { flow, flows: [...existing.filter((f) => f.expiresAt > now), flow].slice(-CORE_AUTH_FLOW_MAX) }
}

export function findAuthFlow(flows: CoreAuthFlow[], state: string | null, action: CoreAuthFlowAction): CoreAuthFlow | null {
  if (!state || !STATE_RE.test(state)) return null
  return flows.find((flow) => flow.state === state && flow.action === action) ?? null
}

export function removeAuthFlow(flows: CoreAuthFlow[], state: string): CoreAuthFlow[] {
  return flows.filter((flow) => flow.state !== state)
}

function secureCookies(): boolean {
  return process.env.NODE_ENV === 'production'
}

/** Writes the remaining flows, or clears the cookie when none remain. */
export function attachAuthFlowsCookie(response: NextResponse, flows: CoreAuthFlow[]): NextResponse {
  response.cookies.set(CORE_AUTH_FLOW_COOKIE, flows.length ? encodeAuthFlows(flows) : '', {
    httpOnly: true,
    secure: secureCookies(),
    sameSite: 'lax',
    path: CORE_AUTH_FLOW_PATH,
    maxAge: flows.length ? CORE_AUTH_FLOW_TTL_SECONDS : 0,
  })
  return response
}

/**
 * Server-side one-time record for a consumed flow state. The signed cookie
 * already removes a used flow, but a stale cookie value replayed from another
 * client must still fail: `consume` returns false when the state was already
 * spent. Records only need to outlive the flow TTL.
 */
export interface CoreAuthFlowConsumptionStore {
  consume(stateHash: string, expiresAt: string): Promise<boolean>
}

export function hashAuthFlowState(state: string): string {
  return createHash('sha256').update(state, 'utf8').digest('hex')
}

export class InMemoryCoreAuthFlowConsumptionStore implements CoreAuthFlowConsumptionStore {
  readonly consumed = new Map<string, string>()
  async consume(stateHash: string, expiresAt: string): Promise<boolean> {
    if (this.consumed.has(stateHash)) return false
    this.consumed.set(stateHash, expiresAt)
    return true
  }
}
