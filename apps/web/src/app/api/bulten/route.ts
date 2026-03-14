import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

// ── POST /api/bulten — E-posta bülteni kaydı ──────────────────────────────
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { esnafId, email } = body

        if (!esnafId || !email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Geçerli bir esnafId ve e-posta gerekli' },
                { status: 400 }
            )
        }

        // Esnaf var mı
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!esnafDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        // Daha önce kayıt olmuş mu
        const mevcutSnap = await adminDb.collection('bulten_aboneleri')
            .where('esnafId', '==', esnafId)
            .where('email', '==', email.toLowerCase().trim())
            .limit(1)
            .get()

        if (!mevcutSnap.empty) {
            return NextResponse.json({ ok: true, mesaj: 'Bu e-posta zaten kayıtlı' })
        }

        // Kaydet
        await adminDb.collection('bulten_aboneleri').add({
            esnafId,
            email: email.toLowerCase().trim(),
            aktif: true,
            kayitTarihi: Timestamp.now(),
        })

        return NextResponse.json({ ok: true, mesaj: 'Bülten kaydı başarılı' })
    } catch (error: any) {
        console.error('[BULTEN POST]', error)
        return NextResponse.json({ error: 'Kayıt başarısız' }, { status: 500 })
    }
}

// ── GET /api/bulten?esnafId=xxx — Aboneleri listele ───────────────────────
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const esnafId = searchParams.get('esnafId')

    if (!esnafId) {
        return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
    }

    const snap = await adminDb
        .collection('bulten_aboneleri')
        .where('esnafId', '==', esnafId)
        .where('aktif', '==', true)
        .orderBy('kayitTarihi', 'desc')
        .limit(100)
        .get()

    const aboneler = snap.docs.map((d: FirebaseFirestore.QueryDocumentSnapshot) => ({
        id: d.id,
        ...d.data(),
        kayitTarihi: d.data().kayitTarihi?.toDate?.()?.toISOString() ?? null,
    }))

    return NextResponse.json({ aboneler, toplam: aboneler.length })
}
