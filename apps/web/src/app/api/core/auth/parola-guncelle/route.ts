import { NextResponse } from 'next/server'
import { clearCoreSessionCookies, revokeCoreBffSession, readCoreSessionToken } from '@/lib/core/bffSession'
import { requireCoreContext } from '@/lib/core/requestContext'
import { authErrorResponse, readJsonBody, requireCoreRuntime } from '@/lib/core/routeHelpers'

/**
 * KC-02: the recovery-only password-update surface. A standard session is
 * rejected (fail closed); a recovery-class session updates the Supabase
 * password with the server-held access token and is then revoked so the user
 * continues with a fresh standard login (`parola-giris`).
 */
export async function POST(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response
  const { runtime } = gate

  const resolved = await requireCoreContext(request, runtime, { allowRecovery: true })
  if (!resolved.ok) return resolved.response
  if (resolved.context.recovery !== true) {
    return NextResponse.json({ error: 'RECOVERY_SESSION_REQUIRED' }, { status: 403 })
  }

  const body = await readJsonBody(request)
  const password = String(body.parola ?? '')
  if (password.length < 8 || password.length > 256) {
    return NextResponse.json({ error: 'Parola en az 8 karakter olmalı' }, { status: 400 })
  }

  try {
    await runtime.auth.updatePassword(resolved.context.accessToken, password)
  } catch (error) {
    return authErrorResponse(error)
  }

  const token = readCoreSessionToken(request)
  if (token) await revokeCoreBffSession(runtime.sessions, token)
  await runtime.auth.signOut(resolved.context.accessToken)
  return clearCoreSessionCookies(NextResponse.json({ ok: true, next: 'parola-giris' }))
}
