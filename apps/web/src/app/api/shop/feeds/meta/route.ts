import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { urunleriGetir } from '@/lib/magazaDB'
import { metaKatalogXML } from '@/lib/metaAds'

// GET — Meta ürün kataloğu XML feed
export async function GET(request: Request) {
  if (!adminDb) {
    return new NextResponse('DB bağlantısı yok', { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')

    if (!shopId) {
      return new NextResponse('shopId gerekli', { status: 400 })
    }

    // Mağaza bilgilerini al
    const shopDoc = await adminDb.collection('esnaflar').doc(shopId).get()
    if (!shopDoc.exists) {
      return new NextResponse('Mağaza bulunamadı', { status: 404 })
    }
    const shop = shopDoc.data()!
    const magazaUrl = shop.siteUrl || `https://kepenk.ai/magaza/${shopId}`
    const magazaAd = shop.ad || shop.isletmeAdiTam || 'Mağaza'

    // Aktif ürünleri al
    const { urunler } = await urunleriGetir(shopId, { durum: 'aktif', sayfaBoyut: 5000 })

    // XML üret
    const xml = metaKatalogXML(urunler, magazaUrl, magazaAd)

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // 1 saat cache
      },
    })
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 })
  }
}
