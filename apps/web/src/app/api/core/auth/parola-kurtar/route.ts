import { NextResponse } from 'next/server'
import { normalizeLoginEmail } from '@/lib/auth/legacyAccountResolver'
import { authErrorResponse, readJsonBody, requireCoreRuntime, requireSameOrigin } from '@/lib/core/routeHelpers'
import { CoreAuthError } from '@/lib/core/errors'

/**
 * KC-02: password users cannot carry a Firebase scrypt hash into GoTrue, so
 * their first Core login is a Supabase recovery. The response never reveals
 * whether the address exists.
 */
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

  try {
    await gate.runtime.auth.requestPasswordRecovery(email)
  } catch (error) {
    if (!(error instanceof CoreAuthError) || error.code === 'AUTH_UNAVAILABLE' || error.code === 'RATE_LIMITED') {
      return authErrorResponse(error)
    }
  }
  return NextResponse.json({ ok: true })
}
