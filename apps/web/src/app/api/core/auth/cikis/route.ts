import { NextResponse } from 'next/server'
import { clearCoreSessionCookies, decryptedTokens, loadCoreBffSession, readCoreSessionToken, revokeCoreBffSession, verifyCoreCsrf } from '@/lib/core/bffSession'
import { requireCoreRuntime } from '@/lib/core/routeHelpers'

/**
 * KC-02: revoke the BFF session. Revocation is durable first; the remote
 * GoTrue logout is best effort. A replayed logout with a dead locator is 401.
 */
export async function POST(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response
  const { runtime } = gate

  if (!verifyCoreCsrf(request)) {
    return NextResponse.json({ error: 'CSRF_REJECTED' }, { status: 403 })
  }

  const token = readCoreSessionToken(request)
  const record = token ? await loadCoreBffSession(runtime.sessions, token) : null
  if (!token || !record) {
    return clearCoreSessionCookies(NextResponse.json({ error: 'NO_SESSION' }, { status: 401 }))
  }

  await revokeCoreBffSession(runtime.sessions, token)
  const tokens = decryptedTokens(record)
  if (tokens) await runtime.auth.signOut(tokens.accessToken)

  return clearCoreSessionCookies(NextResponse.json({ ok: true }))
}
