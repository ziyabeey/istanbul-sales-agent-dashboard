import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { urunleriGetir } from '@/lib/magazaDB'
import { exportUrunlerCSV } from '@/lib/urunImportExport'
import type { ExportTarget } from '@/lib/urunImportExport'

// GET — Ürün export (CSV / JSON)
export async function GET(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')
    const format = searchParams.get('format') || 'csv'
    const target = (searchParams.get('target') || 'standard') as ExportTarget
    const durum = searchParams.get('status') || undefined
    const kategori = searchParams.get('category') || undefined

    if (!shopId) {
      return NextResponse.json({ error: 'shopId gerekli' }, { status: 400 })
    }

    const { urunler } = await urunleriGetir(shopId, {
      durum: durum as any,
      kategori,
      sayfaBoyut: 10000,
    })

    if (format === 'json') {
      return NextResponse.json({ urunler })
    }

    const csv = exportUrunlerCSV(urunler, target)

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="urunler-${target}-${Date.now()}.csv"`,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
