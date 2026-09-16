import { NextResponse } from 'next/server'
import { attachCoreSessionCookies, issueCoreBffSession } from '@/lib/core/bffSession'
import { linkLegacyPhoneIdentity } from '@/lib/core/identityAdapter'
import { classifySession } from '@/lib/core/jwtVerifier'
import { authErrorResponse, readJsonBody, requireCoreRuntime, requireSameOrigin } from '@/lib/core/routeHelpers'
import { toTurkishE164 } from '@/lib/core/supabaseAuth'

/**
 * KC-02: complete a Supabase phone OTP login and establish the host-only BFF
 * session. Tokens stay on the server; the browser receives an opaque locator
 * and a CSRF cookie. The legacy identity alias is linked after the session is
 * established and never blocks or authorizes the login. No legacy tenant
 * document is written here (KC-03 owns esnaf -> business shadow state).
 */
export async function POST(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response
  const origin = requireSameOrigin(request)
  if (origin) return origin
  const { runtime } = gate

  const body = await readJsonBody(request)
  const phone = toTurkishE164(String(body.telefon ?? ''))
  const code = String(body.kod ?? '').trim()
  if (!phone || !/^[0-9]{6,8}$/.test(code)) {
    return NextResponse.json({ error: 'Kod hatalı veya süresi dolmuş' }, { status: 400 })
  }

  try {
    const session = await runtime.auth.verifyPhoneOtp(phone, code)
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
    const identityAlias = await linkLegacyPhoneIdentity(runtime.client, { phoneE164: phone, userId: session.user.id })

    const response = NextResponse.json({
      userId: session.user.id,
      recovery,
      businessId: memberships.length === 1 ? memberships[0].business_id : null,
      membershipCount: memberships.length,
      identityAlias,
    })
    return attachCoreSessionCookies(response, issued)
  } catch (error) {
    return authErrorResponse(error)
  }
}
