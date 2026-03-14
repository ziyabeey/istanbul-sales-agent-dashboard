import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { kuponOlustur, kuponlariGetir, kuponGuncelle, kuponSil, kuponDogrula } from '@/lib/kuponMotoru'

// GET — Kupon listesi veya doğrulama
export async function GET(request: Request) {
  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')
    const kod = searchParams.get('kod')
    const sepetTutar = searchParams.get('sepetTutar')

    if (!shopId) {
      return NextResponse.json({ error: 'shopId gerekli' }, { status: 400 })
    }

    // Kupon doğrulama modu
    if (kod && sepetTutar) {
      const sonuc = await kuponDogrula(shopId, kod, Number(sepetTutar))
      return NextResponse.json(sonuc)
    }

    // Kupon listesi (admin)
    const kuponlar = await kuponlariGetir(shopId)
    return NextResponse.json({ kuponlar })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST — Yeni kupon oluştur
export async function POST(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { shopId, ...kuponData } = body

    if (!shopId || !kuponData.kod) {
      return NextResponse.json({ error: 'shopId ve kod zorunlu' }, { status: 400 })
    }

    const id = await kuponOlustur(shopId, kuponData)
    return NextResponse.json({ ok: true, id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// PUT — Kupon güncelle
export async function PUT(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  try {
    const body = await request.json()
    const { shopId, kuponId, ...data } = body

    if (!shopId || !kuponId) {
      return NextResponse.json({ error: 'shopId ve kuponId zorunlu' }, { status: 400 })
    }

    await kuponGuncelle(shopId, kuponId, data)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE — Kupon pasifleştir
export async function DELETE(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  try {
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')
    const kuponId = searchParams.get('kuponId')

    if (!shopId || !kuponId) {
      return NextResponse.json({ error: 'shopId ve kuponId zorunlu' }, { status: 400 })
    }

    await kuponSil(shopId, kuponId)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
