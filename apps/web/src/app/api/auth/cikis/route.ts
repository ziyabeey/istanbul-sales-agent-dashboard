import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_ADI, oturumSil } from '@/lib/sessionManager'
import {
  isCanonicalSessionTokenCandidate,
  verifyCanonicalSessionToken,
} from '@/lib/auth/sessionToken'
import { FirestoreSessionRepository } from '@/lib/auth/sessionRepository'

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_ADI)?.value

  if (token && isCanonicalSessionTokenCandidate(token)) {
    const claims = await verifyCanonicalSessionToken(token)

    if (claims) {
      const revoked = await new FirestoreSessionRepository().revoke(
        claims.sessionId,
        new Date().toISOString()
      )

      if (!revoked) {
        return NextResponse.json({ error: 'Oturum bulunamadı' }, { status: 401 })
      }
    }
  }

  // Legacy compatibility JWTs have no durable Session to revoke. They are
  // cookie-cleared only until P0-03/P0-08 retires the legacy human path.
  const response = NextResponse.json({ ok: true })
  await oturumSil(response)
  return response
}
