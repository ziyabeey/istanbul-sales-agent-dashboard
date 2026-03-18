/**
 * Shipping Tracking API
 * ─────────────────────
 * GET /api/v1/ecom/shipping/track?carrier=yurtici&trackingNo=xxx
 * 
 * Public endpoint — customers can track their shipments.
 */

import { NextResponse } from 'next/server'
import { trackShipment, getTrackingUrl } from '@/lib/shipping/cargoTracker'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const carrier = searchParams.get('carrier')
    const trackingNo = searchParams.get('trackingNo')

    if (!carrier || !trackingNo) {
      return NextResponse.json({ error: 'carrier ve trackingNo gerekli' }, { status: 400 })
    }

    const result = await trackShipment(carrier, trackingNo)

    if (!result.ok) {
      return NextResponse.json({
        error: result.error || 'Takip bilgisi alınamadı',
        carrier: result.carrierName,
      }, { status: 404 })
    }

    return NextResponse.json({
      ok: true,
      tracking: {
        ...result,
        trackingUrl: getTrackingUrl(carrier, trackingNo),
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Takip sorgusu başarısız', detay: error.message }, { status: 500 })
  }
}
