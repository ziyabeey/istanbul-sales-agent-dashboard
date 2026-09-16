import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { attachAuthFlowsCookie, findAuthFlow, hashAuthFlowState, readAuthFlows, removeAuthFlow } from '@/lib/core/authFlow'
import { attachCoreSessionCookies, issueCoreBffSession } from '@/lib/core/bffSession'
import { isRecoverySession } from '@/lib/core/jwtVerifier'
import { requireCoreRuntime } from '@/lib/core/routeHelpers'

/**
 * KC-02: landing point of the Supabase recovery e-mail
 * (`/api/core/auth/kurtarma?state=…&token_hash=…`).
 *
 * The link is only honoured in the browser that started the flow: the
 * signed flow cookie must contain `state`, the state is consumed on first use
 * both in the cookie and in a server-side one-time record (replay from a
 * stale cookie -> invalid), the exchanged session must be recovery-class and must
 * belong to the e-mail the flow was started for (account-confusion guard).
 * The browser never sees a token; the resulting session can only call
 * `parola-guncelle`.
 */
const TOKEN_HASH_RE = /^[A-Za-z0-9._~-]{16,512}$/

function passwordPage(status: 'ok' | 'invalid'): URL {
  const base = process.env.NEXT_PUBLIC_APP_URL?.trim() || 'https://app.kepenk.ai'
  const url = new URL('/parola-yenile', base)
  if (status !== 'ok') url.searchParams.set('durum', status)
  return url
}

function emailHash(email: string | null | undefined): string | null {
  const normalized = String(email ?? '').trim().toLowerCase()
  return normalized ? createHash('sha256').update(normalized, 'utf8').digest('hex') : null
}

export async function GET(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response
  const { runtime } = gate

  const params = new URL(request.url).searchParams
  const tokenHash = params.get('token_hash') ?? ''
  const state = params.get('state')
  const flows = readAuthFlows(request)
  const flow = findAuthFlow(flows, state, 'recovery')

  if (!flow || !TOKEN_HASH_RE.test(tokenHash)) {
    return attachAuthFlowsCookie(NextResponse.redirect(passwordPage('invalid'), 303), flows)
  }

  // One-time: whatever happens next, this state can never be used again, in
  // this browser (cookie) or from a replayed cookie value (server record).
  const remaining = removeAuthFlow(flows, flow.state)
  const firstUse = await runtime.flows.consume(hashAuthFlowState(flow.state), new Date(flow.expiresAt).toISOString())
  if (!firstUse) {
    return attachAuthFlowsCookie(NextResponse.redirect(passwordPage('invalid'), 303), remaining)
  }

  try {
    const session = await runtime.auth.verifyRecoveryTokenHash(tokenHash)
    const claims = await runtime.verifier.verify(session.access_token)
    const boundEmail = emailHash(session.user.email ?? claims.email)
    if (claims.sub !== session.user.id || !isRecoverySession(claims) || boundEmail !== flow.bindingHash) {
      return attachAuthFlowsCookie(NextResponse.redirect(passwordPage('invalid'), 303), remaining)
    }
    const issued = await issueCoreBffSession(runtime.sessions, session)
    return attachAuthFlowsCookie(attachCoreSessionCookies(NextResponse.redirect(passwordPage('ok'), 303), issued), remaining)
  } catch {
    return attachAuthFlowsCookie(NextResponse.redirect(passwordPage('invalid'), 303), remaining)
  }
}
