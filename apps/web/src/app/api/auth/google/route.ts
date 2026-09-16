import { NextResponse } from 'next/server'
import { canonicalOturumOlustur } from '@/lib/sessionManager'
import {
  findUniqueTenantByEmail,
  normalizeLoginEmail,
} from '@/lib/auth/legacyAccountResolver'
import { issueCanonicalHumanSession } from '@/lib/auth/humanAuthService'

const GOOGLE_ISSUERS = new Set(['accounts.google.com', 'https://accounts.google.com'])

export async function POST(req: Request) {
  try {
    const { credential } = await req.json()
    if (!credential) {
      return NextResponse.json({ error: 'Credential gerekli' }, { status: 400 })
    }

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId) {
      return NextResponse.json({ error: 'Google giriş yapılandırılmamış' }, { status: 503 })
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    let payload: Record<string, string>

    try {
      const res = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(String(credential))}`,
        { signal: controller.signal }
      )

      if (!res.ok) {
        return NextResponse.json({ error: 'Geçersiz Google token' }, { status: 401 })
      }

      payload = await res.json()
    } catch {
      return NextResponse.json({ error: 'Google doğrulama zaman aşımı' }, { status: 502 })
    } finally {
      clearTimeout(timeout)
    }

    if (payload.aud !== clientId) {
      return NextResponse.json({ error: 'Token audience uyuşmuyor' }, { status: 401 })
    }

    if (!GOOGLE_ISSUERS.has(payload.iss || '')) {
      return NextResponse.json({ error: 'Geçersiz Google issuer' }, { status: 401 })
    }

    if (payload.email_verified !== 'true') {
      return NextResponse.json({ error: 'Google email doğrulanmamış' }, { status: 401 })
    }

    const googleSubject = (payload.sub || '').trim()
    const googleEmail = normalizeLoginEmail(payload.email || '')
    const googleName = payload.name || ''

    if (!googleSubject || !googleEmail) {
      return NextResponse.json({ error: 'Google kimlik bilgisi eksik' }, { status: 400 })
    }

    // Email yalnız legacy tenant migration lookup'ıdır. Canonical AuthIdentity
    // stable Google subject (`sub`) ile bağlanır.
    const account = await findUniqueTenantByEmail(googleEmail)
    if (account.kind === 'none') {
      return NextResponse.json({ needsOnboarding: true, googleEmail, googleName })
    }

    if (account.kind === 'ambiguous') {
      return NextResponse.json({ error: 'Hesap eşleştirmesi belirsiz' }, { status: 409 })
    }

    const durum = String(account.account.data.durum || '')
    if (durum === 'pasif' || durum === 'silindi') {
      return NextResponse.json({ needsOnboarding: true, googleEmail, googleName })
    }

    const issued = await issueCanonicalHumanSession({
      tenantId: account.account.tenantId,
      provider: 'google',
      subject: googleSubject,
      authMethod: 'google_oidc',
    })

    if (durum === 'onboarding') {
      const response = NextResponse.json({
        esnafId: account.account.tenantId,
        durum: 'onboarding',
      })
      await canonicalOturumOlustur(issued.session, response)
      return response
    }

    const response = NextResponse.json({ esnafId: account.account.tenantId })
    await canonicalOturumOlustur(issued.session, response)
    return response
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
