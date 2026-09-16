import { NextResponse } from 'next/server'
import { authErrorResponse, readJsonBody, requireCoreRuntime } from '@/lib/core/routeHelpers'
import { toTurkishE164 } from '@/lib/core/supabaseAuth'

/**
 * KC-02: start a Supabase phone OTP login. The SMS is sent by the Supabase
 * project's provider; Kepenk never creates a locally verifiable bypass code.
 */
export async function POST(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response

  const body = await readJsonBody(request)
  const phone = toTurkishE164(String(body.telefon ?? ''))
  if (!phone) {
    return NextResponse.json({ error: 'Geçersiz telefon numarası' }, { status: 400 })
  }

  try {
    await gate.runtime.auth.sendPhoneOtp(phone)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return authErrorResponse(error)
  }
}
