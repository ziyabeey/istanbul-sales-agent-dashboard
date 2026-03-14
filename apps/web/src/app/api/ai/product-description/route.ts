import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { urunAciklamasiUret, seoIcerikUret } from '@/lib/aiUrunAsistani'
import type { UrunAciklamaIstek, Ton } from '@/lib/aiUrunAsistani'

// POST — AI ürün açıklaması üret
export async function POST(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  try {
    const body = await request.json()
    const { productName, category, features = [], tone = 'formal', targetAudience, seoKeywords } = body

    if (!productName || !category) {
      return NextResponse.json({ error: 'productName ve category zorunlu' }, { status: 400 })
    }

    const istek: UrunAciklamaIstek = {
      productName, category, features,
      tone: tone as Ton, targetAudience, seoKeywords,
    }

    const sonuc = await urunAciklamasiUret(istek)
    const seo = seoIcerikUret({ productName, category, features })

    return NextResponse.json({ ...sonuc, seo })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
