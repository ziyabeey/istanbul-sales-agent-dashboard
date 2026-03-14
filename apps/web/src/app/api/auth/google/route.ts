import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumOlustur } from '@/lib/sessionManager'

export async function POST(req: Request) {
  try {
    const { credential } = await req.json()
    if (!credential) {
      return NextResponse.json({ error: 'Credential gerekli' }, { status: 400 })
    }

    // Google tokeninfo ile doğrula (harici paket gerekmez)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    let payload: Record<string, string>
    try {
      const res = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`,
        { signal: controller.signal }
      )
      clearTimeout(timeout)
      if (!res.ok) {
        return NextResponse.json({ error: 'Geçersiz Google token' }, { status: 401 })
      }
      payload = await res.json()
    } catch {
      clearTimeout(timeout)
      return NextResponse.json({ error: 'Google doğrulama zaman aşımı' }, { status: 502 })
    }

    // Audience kontrolü
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (clientId && payload.aud !== clientId) {
      return NextResponse.json({ error: 'Token audience uyuşmuyor' }, { status: 401 })
    }

    const googleEmail = (payload.email || '').toLowerCase()
    const googleName = payload.name || ''

    if (!googleEmail) {
      return NextResponse.json({ error: 'Email bilgisi alınamadı' }, { status: 400 })
    }

    // Firestore'da email ile ara
    const sorgu = await adminDb
      .collection('esnaflar')
      .where('email', '==', googleEmail)
      .limit(1)
      .get()

    if (sorgu.empty) {
      return NextResponse.json({ needsOnboarding: true, googleEmail, googleName })
    }

    const doc = sorgu.docs[0]
    const esnaf = doc.data()

    // Güvenlik: pasif/silindi hesaplara erişim verme
    if (esnaf.durum === 'pasif' || esnaf.durum === 'silindi') {
      return NextResponse.json({ needsOnboarding: true, googleEmail, googleName })
    }

    // JWT HttpOnly cookie oluştur
    if (esnaf.durum === 'onboarding') {
      const response = NextResponse.json({ esnafId: doc.id, durum: 'onboarding' })
      await oturumOlustur(doc.id, response)
      return response
    }

    const response = NextResponse.json({ esnafId: doc.id })
    await oturumOlustur(doc.id, response)
    return response
  } catch (error: any) {
    console.error('[Google Auth]', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

