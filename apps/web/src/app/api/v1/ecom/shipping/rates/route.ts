/**
 * Shipping Rates API — Calculate shipping costs
 * ───────────────────────────────────────────────
 * POST /api/v1/ecom/shipping/rates
 * 
 * Body:
 *   - esnafId: string
 *   - fromCity: string (gönderen il)
 *   - toCity: string (alıcı il)
 *   - totalWeight: number (gram)
 *   - subtotal: number (₺, ücretsiz kargo kontrolü için)
 * 
 * Returns: Available carrier rates
 * 
 * NOTE: Mock rates. Production → Yurtiçi/Aras/PTT API calls.
 */

import { NextResponse } from 'next/server'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { adminDb } from '@/lib/firebaseAdmin'

interface ShippingRate {
  carrierId: string
  carrierName: string
  serviceType: string
  price: number
  estimatedDelivery: string   // "1-2 iş günü"
  isFreeEligible: boolean
}

// Desi hesaplama: (en × boy × yükseklik) / 3000
function calculateDesi(weightGram: number): number {
  // Simple weight-based desi (for actual desi, dimensions needed)
  return Math.max(1, Math.ceil(weightGram / 1000))
}

function calculateBaseRate(carrierId: string, desi: number, isIntercity: boolean): number {
  const baseRates: Record<string, number> = {
    yurtici: 45, aras: 42, ptt: 35, surat: 50,
  }
  const base = baseRates[carrierId] || 45
  const desiRate = isIntercity ? 5 : 3
  return Math.round((base + (desi - 1) * desiRate) * 100) / 100
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { esnafId, fromCity, toCity, totalWeight, subtotal } = body

    if (!esnafId || !fromCity || !toCity) {
      return NextResponse.json({ error: 'esnafId, fromCity, toCity gerekli' }, { status: 400 })
    }

    const weight = totalWeight || 1000  // default 1kg
    const desi = calculateDesi(weight)
    const isIntercity = fromCity.toLowerCase() !== toCity.toLowerCase()

    // Fetch esnaf shipping config
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnafData = esnafDoc.exists ? esnafDoc.data()! : {}
    const shippingConfig = esnafData.shippingConfig || {}
    const freeShippingThreshold = shippingConfig.freeShippingThreshold || 0

    const isFreeEligible = freeShippingThreshold > 0 && (subtotal || 0) >= freeShippingThreshold

    const carriers = [
      {
        carrierId: 'yurtici',
        carrierName: 'Yurtiçi Kargo',
        serviceType: 'Standart',
        estimatedDelivery: isIntercity ? '2-3 iş günü' : '1-2 iş günü',
      },
      {
        carrierId: 'aras',
        carrierName: 'Aras Kargo',
        serviceType: 'Standart',
        estimatedDelivery: isIntercity ? '2-3 iş günü' : '1-2 iş günü',
      },
      {
        carrierId: 'ptt',
        carrierName: 'PTT Kargo',
        serviceType: 'Standart',
        estimatedDelivery: isIntercity ? '3-5 iş günü' : '2-3 iş günü',
      },
      {
        carrierId: 'surat',
        carrierName: 'Sürat Kargo',
        serviceType: 'Ekspres',
        estimatedDelivery: isIntercity ? '1-2 iş günü' : 'Aynı gün',
      },
    ]

    const rates: ShippingRate[] = carriers.map(c => ({
      ...c,
      price: isFreeEligible ? 0 : calculateBaseRate(c.carrierId, desi, isIntercity),
      isFreeEligible,
    }))

    return NextResponse.json({
      ok: true,
      rates,
      freeShippingThreshold,
      amountUntilFree: freeShippingThreshold > 0
        ? Math.max(0, freeShippingThreshold - (subtotal || 0))
        : null,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kargo ücreti hesaplanamadı', detay: error.message }, { status: 500 })
  }
}
