import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { siparisOlustur, siparisleriGetir, siparisDurumGuncelle } from '@/lib/magazaDB'
import { zodGuard, siparisOlusturSema } from '@/lib/zodSemalar'
import { rateLimitCheck } from '@/lib/rateLimiter'
import type { SiparisDurum } from '@/types/eticaret'

// POST — Sipariş oluştur (Transaction ile stok düşürme)
export async function POST(request: Request) {
  // ── Auth Guard ──
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  // ── Rate Limit ──
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
  const rl = rateLimitCheck(`order_create:${clientIp}`, 'webhook')
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
  }

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const body = await request.json()

    // ── Zod Validation ──
    const parsed = zodGuard(siparisOlusturSema, body)
    if (!parsed.ok) {
      return NextResponse.json(
        { error: parsed.hata, detaylar: parsed.detaylar },
        { status: 400 }
      )
    }

    const { shopId, ...siparisData } = parsed.data
    const siparisId = await siparisOlustur(shopId, {
      ...siparisData,
      durum: 'beklemede' as const,
    })

    return NextResponse.json({ ok: true, id: siparisId })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
    // Stok yetersizliği hatası
    if (message.includes('Yetersiz stok')) {
      return NextResponse.json({ error: message }, { status: 409 })
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// GET — Sipariş listesi (mağaza sahibi için)
export async function GET(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

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
      durum: (searchParams.get('durum') as SiparisDurum) || undefined,
      sayfa: searchParams.get('sayfa') ? Number(searchParams.get('sayfa')) : 1,
      sayfaBoyut: searchParams.get('sayfaBoyut') ? Number(searchParams.get('sayfaBoyut')) : 20,
    }

    const sonuc = await siparisleriGetir(shopId, filtre)
    return NextResponse.json(sonuc)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT — Sipariş durumu güncelle
export async function PUT(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { shopId, siparisId, durum, kargoNo, kargoFirma } = body

    if (!shopId || !siparisId || !durum) {
      return NextResponse.json({ error: 'shopId, siparisId ve durum zorunlu' }, { status: 400 })
    }

    await siparisDurumGuncelle(shopId, siparisId, durum, {
      ...(kargoNo && { kargoNo }),
      ...(kargoFirma && { kargoFirma }),
    })

    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
