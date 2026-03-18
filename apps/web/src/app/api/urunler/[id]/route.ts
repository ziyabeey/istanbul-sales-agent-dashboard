/**
 * Tek Ürün API
 * ─────────────────────────────────────────────────────────────
 * PATCH  /api/urunler/{id}  → Ürün güncelle
 * DELETE /api/urunler/{id}  → Ürün sil
 * ─────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

async function syncUrunlerToSiteJson(esnafId: string) {
  const snap = await adminDb
    .collection('esnaflar').doc(esnafId)
    .collection('urunler')
    .where('aktif', '==', true)
    .orderBy('sira', 'asc')
    .get()

  const urunler = snap.docs.map(d => ({
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const ref = adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('urunler').doc(id)

    const doc = await ref.get()
    if (!doc.exists) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }

    // Only allow specific fields to be updated
    const izinliBiSahalar = ['ad', 'aciklama', 'fiyat', 'gorsel', 'sku', 'kategori', 'tur', 'stok', 'aktif', 'sira']
    const guncelleme: Record<string, any> = { guncelleme: Timestamp.now() }
    for (const key of izinliBiSahalar) {
      if (body[key] !== undefined) {
        guncelleme[key] = body[key]
      }
    }

    await ref.update(guncelleme)

    // Sync to siteJson
    await syncUrunlerToSiteJson(esnafId)

    return NextResponse.json({
      ok: true,
      mesaj: 'Ürün güncellendi',
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const { id } = await params

    const ref = adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('urunler').doc(id)

    const doc = await ref.get()
    if (!doc.exists) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }

    await ref.delete()

    // Sync to siteJson
    await syncUrunlerToSiteJson(esnafId)

    return NextResponse.json({
      ok: true,
      mesaj: 'Ürün silindi',
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
