/**
 * QR Code System — Generate, Scan, Templates
 * POST /api/v1/mobile/qr — Generate/Scan
 * GET  /api/v1/mobile/qr — Templates
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

const QR_TYPES = ['business', 'product', 'menu', 'payment', 'loyalty', 'booking', 'wifi'] as const

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data() || {}
    const domain = esnaf.domain || `${esnafId}.kepenk.site`

    return NextResponse.json({
      ok: true,
      templates: [
        { type: 'business', label: 'İşletme QR', content: `https://${domain}`, description: 'Web sitesi + iletişim bilgileri' },
        { type: 'menu', label: 'Menü QR', content: `https://${domain}/menu`, description: 'Dijital menü (restoran/kafe)' },
        { type: 'loyalty', label: 'Sadakat QR', content: `https://${domain}/loyalty/join`, description: 'Müşteri sadakat programına katılım' },
        { type: 'wifi', label: 'Wi-Fi QR', content: 'WIFI:S:{{ssid}};T:WPA;P:{{password}};;', description: 'Otomatik Wi-Fi bağlantısı' },
      ],
      printFormats: ['sticker_5x5cm', 'tabletop_stand_10x15cm', 'poster_a4'],
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    if (body.action === 'generate') {
      const { type, data } = body
      if (!type || !QR_TYPES.includes(type)) return NextResponse.json({ error: `type: ${QR_TYPES.join(', ')}` }, { status: 400 })

      const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
      const domain = esnafDoc.data()?.domain || `${esnafId}.kepenk.site`

      let content = ''
      switch (type) {
        case 'business': content = `https://${domain}`; break
        case 'product':  content = `https://${domain}/urunler/${data?.slug || data?.productId}`; break
        case 'menu':     content = `https://${domain}/menu`; break
        case 'payment':  content = `https://${domain}/pay/${data?.sessionId}`; break
        case 'loyalty':  content = `https://${domain}/loyalty/${data?.customerId || 'join'}`; break
        case 'booking':  content = `https://${domain}/booking/check-in/${data?.bookingId}`; break
        case 'wifi':     content = `WIFI:S:${data?.ssid || ''};T:WPA;P:${data?.password || ''};;`; break
      }

      return NextResponse.json({
        ok: true, type, content,
        // QR image would be generated client-side using a library like qrcode.js
        mesaj: 'QR kodu oluşturuldu — bu content\'i QR kütüphanesi ile render edin',
      })
    }

    if (body.action === 'scan_result') {
      // Process scanned QR code
      const { scannedContent } = body
      if (!scannedContent) return NextResponse.json({ error: 'scannedContent gerekli' }, { status: 400 })

      // Detect QR type from content
      if (scannedContent.startsWith('WIFI:')) {
        return NextResponse.json({ ok: true, type: 'wifi', data: { raw: scannedContent } })
      }
      if (scannedContent.includes('/pay/')) {
        const sessionId = scannedContent.split('/pay/')[1]
        return NextResponse.json({ ok: true, type: 'payment', data: { sessionId } })
      }
      if (scannedContent.includes('/loyalty/')) {
        const customerId = scannedContent.split('/loyalty/')[1]
        return NextResponse.json({ ok: true, type: 'loyalty', data: { customerId } })
      }
      if (scannedContent.includes('/check-in/')) {
        const bookingId = scannedContent.split('/check-in/')[1]
        return NextResponse.json({ ok: true, type: 'booking_checkin', data: { bookingId } })
      }

      return NextResponse.json({ ok: true, type: 'url', data: { url: scannedContent } })
    }

    return NextResponse.json({ error: 'action: generate, scan_result' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
