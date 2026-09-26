import { NextResponse } from 'next/server'
import { normalizeLoginEmail } from '@/lib/auth/legacyAccountResolver'
import { attachCoreSessionCookies, issueCoreBffSession } from '@/lib/core/bffSession'
import { classifySession } from '@/lib/core/jwtVerifier'
import { authErrorResponse, readJsonBody, requireCoreRuntime, requireSameOrigin } from '@/lib/core/routeHelpers'

/**
 * KC-02: e-mail + password login against Supabase Auth for users who have
 * completed their recovery. Same BFF session contract as the OTP path.
 */
export async function POST(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response
  const origin = requireSameOrigin(request)
  if (origin) return origin
  const { runtime } = gate

  const body = await readJsonBody(request)
  const email = normalizeLoginEmail(String(body.email ?? ''))
  const password = String(body.parola ?? '')
  if (!email || password.length < 8 || password.length > 256) {
    return NextResponse.json({ error: 'E-posta veya parola hatalı' }, { status: 400 })
  }

  try {
    const session = await runtime.auth.signInWithPassword(email, password)
    const claims = await runtime.verifier.verify(session.access_token)
    if (claims.sub !== session.user.id) {
      return NextResponse.json({ error: 'Kimlik doğrulanamadı' }, { status: 401 })
    }
    const sessionClass = classifySession(claims)
    if (sessionClass === 'unverified') {
      // No BFF session for a JWT without a usable amr: nothing downstream may treat it as a login.
      return NextResponse.json({ error: 'AUTH_SESSION_CLASS_UNVERIFIED' }, { status: 401 })
    }
    const issued = await issueCoreBffSession(runtime.sessions, session)
    const recovery = sessionClass === 'recovery'
    const memberships = recovery ? [] : await runtime.client.listMemberships(session.access_token)
    const response = NextResponse.json({
      userId: session.user.id,
      recovery,
      businessId: memberships.length === 1 ? memberships[0].business_id : null,
      membershipCount: memberships.length,
    })
    return attachCoreSessionCookies(response, issued)
  } catch (error) {
    return authErrorResponse(error)
  }
}
