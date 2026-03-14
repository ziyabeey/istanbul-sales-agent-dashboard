import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { urunleriGetir } from '@/lib/magazaDB'
import { googleShoppingFeedXML } from '@/lib/googleMerchant'

// GET — Google Shopping XML feed
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

    const shopDoc = await adminDb.collection('esnaflar').doc(shopId).get()
    if (!shopDoc.exists) {
      return new NextResponse('Mağaza bulunamadı', { status: 404 })
    }
    const shop = shopDoc.data()!
    const magazaUrl = shop.siteUrl || `https://kepenk.ai/magaza/${shopId}`
    const magazaAd = shop.ad || shop.isletmeAdiTam || 'Mağaza'

    const { urunler } = await urunleriGetir(shopId, { durum: 'aktif', sayfaBoyut: 5000 })

    const xml = googleShoppingFeedXML(urunler, magazaUrl, magazaAd)

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 })
  }
}
