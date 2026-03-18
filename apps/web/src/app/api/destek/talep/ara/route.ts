import { NextResponse, NextRequest } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { referans } = body

    if (!referans) {
      return NextResponse.json({ ok: false, hata: 'Referans numarası gereklidir.' }, { status: 400 })
    }

    const snapshot = await adminDb
      .collection('destek_talepler')
      .where('referans', '==', referans.toUpperCase().trim())
      .limit(1)
      .get()

    if (snapshot.empty) {
      return NextResponse.json({ ok: false, hata: 'Bu referans numarasıyla talep bulunamadı.' }, { status: 404 })
    }

    const doc = snapshot.docs[0]
    const d = doc.data()

    return NextResponse.json({
      ok: true,
      talep: {
        id: doc.id,
        referans: d.referans,
        konu: d.konu,
        kategori: d.kategori,
        durum: d.durum,
        oncelik: d.oncelik,
        olusturma: d.olusturma?.toDate?.()?.toISOString() || null,
      },
    })
  } catch (err) {
    console.error('[destek/talep/ara] POST error:', err)
    return NextResponse.json({ ok: false, hata: 'Bir hata oluştu.' }, { status: 500 })
  }
}
