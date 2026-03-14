import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { topluStokGuncelle } from '@/lib/urunImportExport'
import type { StokGuncellemeSatir } from '@/lib/urunImportExport'

// POST — Toplu stok güncelleme
export async function POST(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { shopId, items } = body as { shopId: string; items: StokGuncellemeSatir[] }

    if (!shopId || !items?.length) {
      return NextResponse.json({ error: 'shopId ve items zorunlu' }, { status: 400 })
    }

    // Validasyon
    for (const item of items) {
      if (!item.sku || item.quantity === undefined) {
        return NextResponse.json({ error: 'Her satırda sku ve quantity zorunlu' }, { status: 400 })
      }
      if (!['set', 'add', 'subtract'].includes(item.action)) {
        return NextResponse.json({ error: `Geçersiz action: ${item.action} (set/add/subtract)` }, { status: 400 })
      }
    }

    const sonuc = await topluStokGuncelle(shopId, items)

    return NextResponse.json({
      ok: true,
      ...sonuc,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
