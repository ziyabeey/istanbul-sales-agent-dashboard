import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { smsGonderVeLogla, smsIstatistik, SMS_SABLONLARI, iysSmsOnayla, NetGSMProvider } from '@/lib/netgsmClient'
import type { SMSTetikleyici } from '@/lib/netgsmClient'

// POST — SMS Gönder
export async function POST(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  try {
    const body = await request.json()
    const { shopId, telefon, tetikleyici, degiskenler = {}, ozelMetin } = body

    if (!shopId || !telefon || !tetikleyici) {
      return NextResponse.json({ error: 'shopId, telefon ve tetikleyici zorunlu' }, { status: 400 })
    }

    const sonuc = await smsGonderVeLogla(
      shopId, telefon, tetikleyici as SMSTetikleyici, degiskenler, ozelMetin
    )

    return NextResponse.json({ ok: sonuc.success, ...sonuc })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET — SMS istatistik + bakiye + şablonlar
export async function GET(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  try {
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')
    const action = searchParams.get('action') || 'stats'

    if (action === 'templates') {
      return NextResponse.json({ sablonlar: SMS_SABLONLARI })
    }

    if (action === 'balance') {
      const provider = new NetGSMProvider()
      const bakiye = await provider.getBalance()
      return NextResponse.json({ bakiye })
    }

    if (!shopId) {
      return NextResponse.json({ error: 'shopId gerekli' }, { status: 400 })
    }

    const stats = await smsIstatistik(shopId)
    return NextResponse.json(stats)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT — IYS onay güncelle
export async function PUT(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  try {
    const body = await request.json()
    const { shopId, telefon, onay } = body

    if (!shopId || !telefon || onay === undefined) {
      return NextResponse.json({ error: 'shopId, telefon ve onay zorunlu' }, { status: 400 })
    }

    await iysSmsOnayla(shopId, telefon, onay)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
