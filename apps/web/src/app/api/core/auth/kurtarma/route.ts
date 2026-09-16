import { NextResponse } from 'next/server'
import { attachCoreSessionCookies, issueCoreBffSession } from '@/lib/core/bffSession'
import { isRecoverySession } from '@/lib/core/jwtVerifier'
import { requireCoreRuntime } from '@/lib/core/routeHelpers'

/**
 * KC-02: landing point of the Supabase recovery e-mail. The template links to
 * `/api/core/auth/kurtarma?token_hash=...`; the BFF exchanges the token hash
 * server-side, stores the resulting recovery-class session behind the opaque
 * locator and redirects to the password page. The browser never sees a token,
 * and the resulting session can only call `parola-guncelle`.
 */
const TOKEN_HASH_RE = /^[A-Za-z0-9._~-]{16,512}$/

function passwordPage(status: 'ok' | 'invalid' | 'unavailable'): URL {
  const base = process.env.NEXT_PUBLIC_APP_URL?.trim() || 'https://app.kepenk.ai'
  const url = new URL('/parola-yenile', base)
  if (status !== 'ok') url.searchParams.set('durum', status)
  return url
}

export async function GET(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response
  const { runtime } = gate

  const tokenHash = new URL(request.url).searchParams.get('token_hash') ?? ''
  if (!TOKEN_HASH_RE.test(tokenHash)) {
    return NextResponse.redirect(passwordPage('invalid'), 303)
  }

  try {
    const session = await runtime.auth.verifyRecoveryTokenHash(tokenHash)
    const claims = await runtime.verifier.verify(session.access_token)
    if (claims.sub !== session.user.id || !isRecoverySession(claims)) {
      return NextResponse.redirect(passwordPage('invalid'), 303)
    }
    const issued = await issueCoreBffSession(runtime.sessions, session)
    return attachCoreSessionCookies(NextResponse.redirect(passwordPage('ok'), 303), issued)
  } catch {
    return NextResponse.redirect(passwordPage('invalid'), 303)
  }
}
