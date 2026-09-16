import { NextResponse } from 'next/server'
import { clearCoreSessionCookies, revokeCoreBffSession, readCoreSessionToken } from '@/lib/core/bffSession'
import { requireCoreContext } from '@/lib/core/requestContext'
import { authErrorResponse, readJsonBody, requireCoreRuntime } from '@/lib/core/routeHelpers'

/**
 * KC-02: the only surface a recovery-class session may use. Updates the
 * Supabase password with the server-held access token, then revokes the BFF
 * session so the user continues with a fresh standard login (`parola-giris`).
 */
export async function POST(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response
  const { runtime } = gate

  const resolved = await requireCoreContext(request, runtime, { allowRecovery: true })
  if (!resolved.ok) return resolved.response

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
