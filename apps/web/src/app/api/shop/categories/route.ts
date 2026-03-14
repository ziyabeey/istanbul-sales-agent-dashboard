import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { kategoriOlustur, kategorileriGetir, kategoriGuncelle, kategoriSil } from '@/lib/magazaDB'

// POST — Kategori oluştur
export async function POST(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { shopId, ...katData } = body

    if (!shopId || !katData.ad) {
      return NextResponse.json({ error: 'shopId ve ad zorunlu' }, { status: 400 })
    }

    const katId = await kategoriOlustur(shopId, katData)
    return NextResponse.json({ ok: true, id: katId })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET — Kategorileri listele
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

    const kategoriler = await kategorileriGetir(shopId)
    return NextResponse.json({ kategoriler })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT — Kategori güncelle
export async function PUT(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { shopId, katId, ...updateData } = body

    if (!shopId || !katId) {
      return NextResponse.json({ error: 'shopId ve katId zorunlu' }, { status: 400 })
    }

    await kategoriGuncelle(shopId, katId, updateData)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE — Kategori sil (soft delete)
export async function DELETE(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')
    const katId = searchParams.get('katId')

    if (!shopId || !katId) {
      return NextResponse.json({ error: 'shopId ve katId gerekli' }, { status: 400 })
    }

    await kategoriSil(shopId, katId)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
