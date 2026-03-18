import { NextResponse, NextRequest } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { FieldValue } from 'firebase-admin/firestore'

// GET — Ticket detail
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const doc = await adminDb.collection('destek_talepler').doc(id).get()

    if (!doc.exists) {
      return NextResponse.json({ ok: false, hata: 'Talep bulunamadı.' }, { status: 404 })
    }

    const d = doc.data()!
    return NextResponse.json({
      ok: true,
      talep: {
        id: doc.id,
        referans: d.referans,
        ad: d.ad,
        eposta: d.eposta,
        telefon: d.telefon,
        konu: d.konu,
        aciklama: d.aciklama,
        kategori: d.kategori,
        oncelik: d.oncelik,
        durum: d.durum,
        mesajlar: (d.mesajlar || []).map((m: Record<string, unknown>) => ({
          ...m,
          tarih: m.tarih && typeof (m.tarih as { toDate?: () => Date }).toDate === 'function'
            ? (m.tarih as { toDate: () => Date }).toDate().toISOString()
            : m.tarih,
        })),
        olusturma: d.olusturma?.toDate?.()?.toISOString() || null,
        guncelleme: d.guncelleme?.toDate?.()?.toISOString() || null,
      },
    })
  } catch (err) {
    console.error('[destek/talep/[id]] GET error:', err)
    return NextResponse.json({ ok: false, hata: 'Bir hata oluştu.' }, { status: 500 })
  }
}

// PATCH — Add message to ticket
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { gonderilenId, icerik } = body

    if (!gonderilenId || !icerik) {
      return NextResponse.json({ ok: false, hata: 'gonderilenId ve icerik zorunludur.' }, { status: 400 })
    }

    const docRef = adminDb.collection('destek_talepler').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return NextResponse.json({ ok: false, hata: 'Talep bulunamadı.' }, { status: 404 })
    }

    const talep = doc.data()!

    // Verify sender matches ticket owner
    if (talep.eposta !== gonderilenId && talep.esnafId !== gonderilenId) {
      return NextResponse.json({ ok: false, hata: 'Bu talebe mesaj gönderme yetkiniz yok.' }, { status: 403 })
    }

    const yeniMesaj = {
      id: crypto.randomUUID(),
      gonderilenId,
      gonderilenTip: 'customer',
      icerik,
      tarih: new Date().toISOString(),
    }

    const updates: Record<string, unknown> = {
      mesajlar: FieldValue.arrayUnion(yeniMesaj),
      guncelleme: FieldValue.serverTimestamp(),
    }

    // Reopen if resolved/closed
    if (talep.durum === 'resolved' || talep.durum === 'closed') {
      updates.durum = 'open'
    }

    await docRef.update(updates)

    return NextResponse.json({ ok: true, mesaj: yeniMesaj })
  } catch (err) {
    console.error('[destek/talep/[id]] PATCH error:', err)
    return NextResponse.json({ ok: false, hata: 'Bir hata oluştu.' }, { status: 500 })
  }
}
