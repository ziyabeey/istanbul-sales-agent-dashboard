/**
 * Ürün CRUD API
 * ─────────────────────────────────────────────────────────────
 * GET    /api/urunler           → Esnafın tüm ürünlerini listele
 * POST   /api/urunler           → Yeni ürün ekle
 * ─────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export interface Urun {
  id?: string
  ad: string
  aciklama?: string
  fiyat: number
  gorsel?: string
  sku?: string
  kategori?: string
  tur: 'Fiziksel' | 'Dijital'
  stok?: number
  aktif: boolean
  sira: number
  olusturma?: any
  guncelleme?: any
}

async function syncUrunlerToSiteJson(esnafId: string) {
  const snap = await adminDb
    .collection('esnaflar').doc(esnafId)
    .collection('urunler')
    .where('aktif', '==', true)
    .orderBy('sira', 'asc')
    .get()

  const urunler = snap.docs.map((d: any) => ({
    id: d.id,
    ad: d.data().ad,
    aciklama: d.data().aciklama || '',
    fiyat: d.data().fiyat,
    gorsel: d.data().gorsel || '',
    kategori: d.data().kategori || '',
    sku: d.data().sku || '',
  }))

  await adminDb.collection('esnaflar').doc(esnafId).update({
    'siteJson.urunler': urunler,
    sonGuncelleme: Timestamp.now(),
  })
}

export async function GET() {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const snap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('urunler')
      .orderBy('sira', 'asc')
      .get()

    const urunler = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }))

    return NextResponse.json({ ok: true, urunler })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const body = await request.json()
    const { ad, aciklama, fiyat, gorsel, sku, kategori, tur, stok } = body

    if (!ad || fiyat === undefined) {
      return NextResponse.json({ error: 'Ad ve fiyat zorunlu' }, { status: 400 })
    }

    // Get next sort order
    const countSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('urunler')
      .count().get()
    const sira = countSnap.data().count

    const yeniUrun: Omit<Urun, 'id'> = {
      ad,
      aciklama: aciklama || '',
      fiyat: Number(fiyat),
      gorsel: gorsel || '',
      sku: sku || '',
      kategori: kategori || '',
      tur: tur || 'Fiziksel',
      stok: stok ?? null,
      aktif: true,
      sira,
      olusturma: Timestamp.now(),
      guncelleme: Timestamp.now(),
    }

    const ref = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('urunler')
      .add(yeniUrun)

    // Sync to siteJson for live site rendering
    await syncUrunlerToSiteJson(esnafId)

    return NextResponse.json({
      ok: true,
      urun: { id: ref.id, ...yeniUrun },
      mesaj: 'Ürün eklendi',
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
