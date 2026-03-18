/**
 * Customer Auth API — Phone OTP, Social Login, Session
 * ──────────────────────────────────────────────────────
 * POST /api/v1/auth — Auth actions
 * GET  /api/v1/auth — Session check
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionToken = searchParams.get('token') || request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!sessionToken) return NextResponse.json({ ok: false, authenticated: false })

    // Verify session
    const sessionDoc = await adminDb.collection('customer_sessions').doc(sessionToken).get()
    if (!sessionDoc.exists) return NextResponse.json({ ok: false, authenticated: false })

    const session = sessionDoc.data()!
    const expiresAt = new Date(session.expiresAt)
    if (expiresAt < new Date()) {
      return NextResponse.json({ ok: false, authenticated: false, mesaj: 'Oturum süresi doldu' })
    }

    return NextResponse.json({
      ok: true,
      authenticated: true,
      customer: {
        contactId: session.contactId,
        phone: session.phone,
        name: session.name,
        esnafId: session.esnafId,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Oturum kontrolü başarısız', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, esnafId } = body

    if (!esnafId) return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })

    switch (action) {
      case 'send_otp': {
        const { phone } = body
        if (!phone) return NextResponse.json({ error: 'phone gerekli' }, { status: 400 })

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 min

        await adminDb.collection('otp_codes').doc(`${esnafId}_${phone}`).set({
          phone, otp, esnafId,
          expiresAt,
          attempts: 0,
          createdAt: new Date().toISOString(),
        })

        // TODO: Send via SMS (NetGSM) or WhatsApp
        return NextResponse.json({ ok: true, mesaj: 'Doğrulama kodu gönderildi', expiresIn: 300 })
      }

      case 'verify_otp': {
        const { phone, otp } = body
        if (!phone || !otp) return NextResponse.json({ error: 'phone ve otp gerekli' }, { status: 400 })

        const otpRef = adminDb.collection('otp_codes').doc(`${esnafId}_${phone}`)
        const otpDoc = await otpRef.get()
        if (!otpDoc.exists) return NextResponse.json({ error: 'OTP bulunamadı' }, { status: 404 })

        const otpData = otpDoc.data()!
        if (otpData.attempts >= 5) return NextResponse.json({ error: 'Çok fazla deneme' }, { status: 429 })
        if (new Date(otpData.expiresAt) < new Date()) return NextResponse.json({ error: 'OTP süresi doldu' }, { status: 410 })

        if (otpData.otp !== otp) {
          await otpRef.update({ attempts: otpData.attempts + 1 })
          return NextResponse.json({ error: 'Geçersiz kod' }, { status: 401 })
        }

        // OTP valid — find or create contact
        const contactsSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('contacts').where('channels.phones', 'array-contains', { number: phone, primary: true }).limit(1).get()

        let contactId: string
        let contactName = ''
        if (!contactsSnap.empty) {
          contactId = contactsSnap.docs[0].id
          contactName = contactsSnap.docs[0].data().info?.displayName || ''
        } else {
          contactId = crypto.randomUUID()
          await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId).set({
            id: contactId, esnafId,
            identityTier: 'contact',
            info: { displayName: phone },
            channels: { phones: [{ number: phone, primary: true }] },
            source: { channel: 'portal' },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        }

        // Create session (30 days)
        const sessionToken = crypto.randomUUID()
        await adminDb.collection('customer_sessions').doc(sessionToken).set({
          contactId, phone, esnafId,
          name: contactName,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
        })

        // Clean up OTP
        await otpRef.delete()

        return NextResponse.json({ ok: true, token: sessionToken, contactId, name: contactName })
      }

      case 'social_login': {
        const { provider, idToken } = body
        if (!provider || !idToken) return NextResponse.json({ error: 'provider ve idToken gerekli' }, { status: 400 })

        // TODO: Verify Google/Apple idToken via Firebase Auth
        return NextResponse.json({ ok: true, mesaj: `${provider} login — Firebase Auth entegrasyonu gerekli` })
      }

      case 'logout': {
        const token = body.token || request.headers.get('Authorization')?.replace('Bearer ', '')
        if (token) await adminDb.collection('customer_sessions').doc(token).delete()
        return NextResponse.json({ ok: true, mesaj: 'Çıkış yapıldı' })
      }

      default:
        return NextResponse.json({ error: 'action: send_otp, verify_otp, social_login, logout' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Auth başarısız', detay: error.message }, { status: 500 })
  }
}
