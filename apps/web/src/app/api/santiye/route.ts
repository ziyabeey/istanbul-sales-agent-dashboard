import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'

// ── POST /api/santiye — Yeni proje güncelleme ekle ────────────────────────
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { esnafId, projeAdi, konum, tamamlanmaYuzde, tahminiSure, sonGuncelleme, durum } = body

        if (!esnafId || !projeAdi) {
            return NextResponse.json(
                { error: 'esnafId ve projeAdi zorunlu' },
                { status: 400 }
            )
        }

        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!esnafDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        const projeRef = await adminDb.collection('santiye_projeleri').add({
            esnafId,
            projeAdi,
            konum: konum || '',
            tamamlanmaYuzde: Math.min(100, Math.max(0, tamamlanmaYuzde ?? 0)),
            tahminiSure: tahminiSure || '',
            sonGuncelleme: sonGuncelleme || 'Proje başlatıldı',
            durum: durum || 'devam_ediyor',  // devam_ediyor | tamamlandi | beklemede
            olusturma: Timestamp.now(),
            guncelleme: Timestamp.now(),
        })

        telegramGonder(
            `🏗️ <b>Şantiye Projesi</b>\n` +
            `${esnafDoc.data()!.isletmeAdiTam || esnafDoc.data()!.ad}\n` +
            `Proje: ${projeAdi}\n` +
            `Konum: ${konum || '-'}\n` +
            `İlerleme: %${tamamlanmaYuzde ?? 0}`
        ).catch(() => {})

        return NextResponse.json({ projeId: projeRef.id, mesaj: 'Proje eklendi' })
    } catch (error: any) {
        // console.error('[SANTIYE POST]', error)
        return NextResponse.json({ error: 'Proje eklenemedi' }, { status: 500 })
    }
}

// ── GET /api/santiye?esnafId=xxx — Projeleri listele ──────────────────────
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const esnafId = searchParams.get('esnafId')

    if (!esnafId) {
        return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
    }

    const snap = await adminDb
        .collection('santiye_projeleri')
        .where('esnafId', '==', esnafId)
        .orderBy('guncelleme', 'desc')
        .limit(20)
        .get()

    const projeler = snap.docs.map((d: FirebaseFirestore.QueryDocumentSnapshot) => ({
        id: d.id,
        ...d.data(),
        olusturma: d.data().olusturma?.toDate?.()?.toISOString() ?? null,
        guncelleme: d.data().guncelleme?.toDate?.()?.toISOString() ?? null,
    }))

    return NextResponse.json({ projeler })
}

// ── PATCH /api/santiye — Proje güncelle ───────────────────────────────────
export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        const { projeId, tamamlanmaYuzde, sonGuncelleme, durum } = body

        if (!projeId) {
            return NextResponse.json({ error: 'projeId zorunlu' }, { status: 400 })
        }

        const ref = adminDb.collection('santiye_projeleri').doc(projeId)
        const doc = await ref.get()
        if (!doc.exists) {
            return NextResponse.json({ error: 'Proje bulunamadı' }, { status: 404 })
        }

        const updates: Record<string, any> = { guncelleme: Timestamp.now() }
        if (tamamlanmaYuzde !== undefined) updates.tamamlanmaYuzde = Math.min(100, Math.max(0, tamamlanmaYuzde))
        if (sonGuncelleme) updates.sonGuncelleme = sonGuncelleme
        if (durum) updates.durum = durum

        await ref.update(updates)

        return NextResponse.json({ ok: true, mesaj: 'Proje güncellendi' })
    } catch (error: any) {
        // console.error('[SANTIYE PATCH]', error)
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 })
    }
}
