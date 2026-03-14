import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { urunOlustur, urunleriGetir } from '@/lib/magazaDB'

// POST — Yeni ürün oluştur
export async function POST(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { shopId, ...urunData } = body

    if (!shopId || !urunData.ad) {
      return NextResponse.json(
        { error: 'shopId ve ad alanları zorunludur' },
        { status: 400 }
      )
    }

    const urunId = await urunOlustur(shopId, urunData)
    return NextResponse.json({ ok: true, id: urunId })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET — Ürün listesi
export async function GET(request: Request) {
  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')

    if (!shopId) {
      return NextResponse.json({ error: 'shopId gerekli' }, { status: 400 })
    }

    const filtre = {
      kategori: searchParams.get('kategori') || undefined,
      durum: (searchParams.get('durum') as any) || undefined,
      fiyatMin: searchParams.get('fiyatMin') ? Number(searchParams.get('fiyatMin')) : undefined,
      fiyatMax: searchParams.get('fiyatMax') ? Number(searchParams.get('fiyatMax')) : undefined,
      arama: searchParams.get('arama') || undefined,
      sayfa: searchParams.get('sayfa') ? Number(searchParams.get('sayfa')) : 1,
      sayfaBoyut: searchParams.get('sayfaBoyut') ? Number(searchParams.get('sayfaBoyut')) : 20,
      siralama: (searchParams.get('siralama') as any) || undefined,
    }

    const sonuc = await urunleriGetir(shopId, filtre)
    return NextResponse.json(sonuc)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
