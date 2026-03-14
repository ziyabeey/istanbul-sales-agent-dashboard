import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { fiyatOnerisiHesapla } from '@/lib/aiUrunAsistani'
import type { FiyatOneriIstek } from '@/lib/aiUrunAsistani'

// POST — AI fiyat önerisi
export async function POST(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  try {
    const body = await request.json()
    const { productName, costPrice, category, competitorPrices, currentConversionRate } = body

    if (!productName || !costPrice || !category) {
      return NextResponse.json({ error: 'productName, costPrice ve category zorunlu' }, { status: 400 })
    }

    const istek: FiyatOneriIstek = {
      productName, costPrice, category, competitorPrices, currentConversionRate,
    }

    const sonuc = fiyatOnerisiHesapla(istek)
    return NextResponse.json(sonuc)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
