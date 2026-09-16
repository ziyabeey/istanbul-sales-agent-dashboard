import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { normalizeLoginEmail } from '@/lib/auth/legacyAccountResolver'
import { attachAuthFlowsCookie, beginAuthFlow, readAuthFlows } from '@/lib/core/authFlow'
import { CoreAuthError } from '@/lib/core/errors'
import { authErrorResponse, readJsonBody, requireCoreRuntime, requireSameOrigin } from '@/lib/core/routeHelpers'

/**
 * KC-02: password users cannot carry a Firebase scrypt hash into GoTrue, so
 * their first Core login is a Supabase recovery. The request starts a
 * browser-bound flow (state in a signed HttpOnly cookie) and asks GoTrue to
 * point the e-mail at `/api/core/auth/kurtarma?state=…`; the template appends
 * `token_hash`. The response never reveals whether the address exists.
 */
export function recoveryCallbackUrl(state: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL?.trim() || 'https://app.kepenk.ai'
  const url = new URL('/api/core/auth/kurtarma', base)
  url.searchParams.set('state', state)
  return url.toString()
}

export function emailBindingHash(email: string): string {
  return createHash('sha256').update(email.trim().toLowerCase(), 'utf8').digest('hex')
}

export async function POST(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response
  const origin = requireSameOrigin(request)
  if (origin) return origin

  const body = await readJsonBody(request)
  const email = normalizeLoginEmail(String(body.email ?? ''))
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Geçersiz e-posta' }, { status: 400 })
  }

  const { flow, flows } = beginAuthFlow(readAuthFlows(request), 'recovery', emailBindingHash(email))

  try {
    await gate.runtime.auth.requestPasswordRecovery(email, recoveryCallbackUrl(flow.state))
  } catch (error) {
    if (!(error instanceof CoreAuthError) || error.code === 'AUTH_UNAVAILABLE' || error.code === 'RATE_LIMITED') {
      return authErrorResponse(error)
    }
    // Unknown address: keep the response indistinguishable, but do not leave a usable flow behind.
    return attachAuthFlowsCookie(NextResponse.json({ ok: true }), readAuthFlows(request))
  }
  return attachAuthFlowsCookie(NextResponse.json({ ok: true }), flows)
}
