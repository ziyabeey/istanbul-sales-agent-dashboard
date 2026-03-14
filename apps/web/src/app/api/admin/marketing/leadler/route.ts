import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

const ADMIN_TOKEN = process.env.ADMIN_SECRET_TOKEN!

function checkAuth(req: Request) {
    return req.headers.get('x-admin-token') === ADMIN_TOKEN
}

// GET /api/admin/marketing/leadler — lead listesi
export async function GET(request: Request) {
    if (!checkAuth(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (!adminDb) return NextResponse.json({ error: 'DB yok' }, { status: 500 })

    const { searchParams } = new URL(request.url)
    const durum = searchParams.get('durum') // bekliyor | gonderildi | cevapladi | kapandi
    const limit = parseInt(searchParams.get('limit') || '100')

    let query: FirebaseFirestore.Query = adminDb.collection('leads')
        .orderBy('kayitTarihi', 'desc')
        .limit(limit)

    if (durum && durum !== 'TÜMÜ') {
        query = adminDb.collection('leads')
            .where('durum', '==', durum)
            .orderBy('kayitTarihi', 'desc')
            .limit(limit)
    }

    const snap = await query.get()
    const leadler = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        kayitTarihi: d.data().kayitTarihi?.toDate?.()?.toISOString() || null,
    }))

    // Toplam istatistik
    const [bekliyor, gonderildi, cevapladi, kapandi] = await Promise.all([
        adminDb.collection('leads').where('durum', '==', 'bekliyor').count().get(),
        adminDb.collection('leads').where('durum', '==', 'gonderildi').count().get(),
        adminDb.collection('leads').where('durum', '==', 'cevapladi').count().get(),
        adminDb.collection('leads').where('durum', '==', 'kapandi').count().get(),
    ])

    return NextResponse.json({
        leadler,
        stats: {
            bekliyor: bekliyor.data().count,
            gonderildi: gonderildi.data().count,
            cevapladi: cevapladi.data().count,
            kapandi: kapandi.data().count,
        },
    })
}

// PATCH /api/admin/marketing/leadler — lead durumunu güncelle
export async function PATCH(request: Request) {
    if (!checkAuth(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (!adminDb) return NextResponse.json({ error: 'DB yok' }, { status: 500 })

    const { leadId, durum, not } = await request.json()
    if (!leadId || !durum) return NextResponse.json({ error: 'leadId ve durum zorunlu' }, { status: 400 })

    const izinliDurumlar = ['bekliyor', 'gonderildi', 'cevapladi', 'kapandi', 'musteri_oldu']
    if (!izinliDurumlar.includes(durum)) {
        return NextResponse.json({ error: 'Geçersiz durum' }, { status: 400 })
    }

    const guncelleme: Record<string, any> = {
        durum,
        sonGuncellemeTarihi: Timestamp.now(),
    }
    if (not !== undefined) guncelleme.not = not

    await adminDb.collection('leads').doc(leadId).update(guncelleme)
    return NextResponse.json({ ok: true })
}
