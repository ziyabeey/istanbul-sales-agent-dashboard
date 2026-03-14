import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { shopIdBul, storefrontVeri, tekUrunGetir } from '@/lib/magazaDB'

// GET — Public storefront verisi (auth gereksiz)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ shopSlug: string }> }
) {
  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const { shopSlug } = await params
    const { searchParams } = new URL(request.url)
    const urunSlug = searchParams.get('urun')

    // Shop slug → shopId
    const shopId = await shopIdBul(shopSlug)
    if (!shopId) {
      return NextResponse.json({ error: 'Mağaza bulunamadı' }, { status: 404 })
    }

    // Tek ürün detayı
    if (urunSlug) {
      const urun = await tekUrunGetir(shopId, urunSlug)
      if (!urun) {
        return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
      }
      return NextResponse.json({ urun })
    }

    // Tüm storefront verisi
    const data = await storefrontVeri(shopId)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
