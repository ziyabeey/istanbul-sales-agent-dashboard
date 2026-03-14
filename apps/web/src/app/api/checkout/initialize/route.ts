import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { checkoutBaslat } from '@/lib/iyzicoClient'
import { zodGuard, checkoutBaslatSema } from '@/lib/zodSemalar'
import { rateLimitCheck } from '@/lib/rateLimiter'

// POST — İyzico Checkout Form başlat
export async function POST(request: Request) {
  // ── Rate Limit ──
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const rl = rateLimitCheck(`checkout:${clientIp}`, 'webhook')
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
  }

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const body = await request.json()

    // ── Zod Validation ──
    const parsed = zodGuard(checkoutBaslatSema, body)
    if (!parsed.ok) {
      return NextResponse.json(
        { error: parsed.hata, detaylar: parsed.detaylar },
        { status: 400 }
      )
    }

    const {
      shopId, siparisId, sepetItems, musteriInfo,
      teslimatAdresi, faturaAdresi, toplamFiyatKurus,
      kargoUcretiKurus, taksitSecenekleri,
    } = parsed.data

    // IP adresini request'ten al
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || '127.0.0.1'

    const sonuc = await checkoutBaslat({
      shopId,
      siparisId,
      sepetItems,
      musteriInfo: { ...musteriInfo, ip },
      teslimatAdresi,
      faturaAdresi,
      toplamFiyatKurus,
      kargoUcretiKurus: kargoUcretiKurus || 0,
      taksitSecenekleri,
    })

    if (sonuc.status !== 'success') {
      return NextResponse.json(
        { error: 'Ödeme formu oluşturulamadı', detay: sonuc },
        { status: 502 }
      )
    }

    return NextResponse.json({
      ok: true,
      token: sonuc.token,
      checkoutFormContent: sonuc.checkoutFormContent,
      paymentPageUrl: sonuc.paymentPageUrl,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
    console.error('[CHECKOUT INITIALIZE HATA]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
