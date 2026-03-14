import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

const ADMIN_TOKEN = process.env.ADMIN_SECRET_TOKEN!

/**
 * kepenk.ai'nin kendi Google Ads kampanyaları (B2B esnaf edinme)
 * esnafId = 'kepenk_self' olarak Firestore'da saklanır
 */

export async function GET(request: Request) {
    if (request.headers.get('x-admin-token') !== ADMIN_TOKEN) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    if (!adminDb) return NextResponse.json({ kampanyalar: [], butce: null })

    // kepenk.ai self-promotion kampanyaları
    const snap = await adminDb.collection('reklamlar')
        .where('esnafId', '==', 'kepenk_self')
        .orderBy('baslangic', 'desc')
        .limit(20)
        .get()

    const kampanyalar = snap.docs.map((d: FirebaseFirestore.QueryDocumentSnapshot) => {
        const data = d.data()
        return {
            id: d.id,
            kampanyaId: data.kampanyaId,
            baslik: data.baslik || 'kepenk.ai B2B Kampanya',
            platform: data.platform || 'google',
            butce: data.butce,
            gunlukButce: data.gunlukButce || data.butce,
            gun: data.gun,
            durum: data.durum,
            baslangic: data.baslangic?.toDate?.()?.toISOString() || null,
            bitis: data.bitis?.toDate?.()?.toISOString() || null,
            performans: data.performans || { gosterim: 0, tiklama: 0, harcama: 0, donusum: 0 },
            hedefSehir: data.hedefSehir || 'İstanbul',
            hedefSektorler: data.hedefSektorler || [],
        }
    })

    // Toplam bu ay harcama
    const buAy = new Date()
    buAy.setDate(1)
    buAy.setHours(0, 0, 0, 0)
    const buAyHarcama = kampanyalar.reduce((sum: number, k: { performans?: { harcama?: number } }) => {
        return sum + (k.performans?.harcama || 0)
    }, 0)

    return NextResponse.json({ kampanyalar, buAyHarcama })
}

export async function POST(request: Request) {
    if (request.headers.get('x-admin-token') !== ADMIN_TOKEN) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    if (!adminDb) return NextResponse.json({ error: 'DB yok' }, { status: 500 })

    const { baslik, platform, gunlukButce, gun, hedefSehir, hedefSektorler } = await request.json()

    if (!gunlukButce || !gun) {
        return NextResponse.json({ error: 'gunlukButce ve gun zorunlu' }, { status: 400 })
    }

    const kampanyaId = `kepenk_self_${Date.now()}`
    const bitis = new Date(Date.now() + gun * 24 * 60 * 60 * 1000)

    const docRef = await adminDb.collection('reklamlar').add({
        esnafId: 'kepenk_self',
        kampanyaId,
        baslik: baslik || 'kepenk.ai B2B Kampanya',
        platform: platform || 'google',
        gunlukButce: Number(gunlukButce),
        butce: Number(gunlukButce) * Number(gun),
        gun: Number(gun),
        hedefSehir: hedefSehir || 'İstanbul',
        hedefSektorler: hedefSektorler || ['elektrikçi', 'tesisatçı', 'kuaför'],
        durum: 'aktif',
        baslangic: Timestamp.now(),
        bitis: Timestamp.fromDate(bitis),
        performans: { gosterim: 0, tiklama: 0, harcama: 0, donusum: 0 },
    })

    return NextResponse.json({ ok: true, id: docRef.id, kampanyaId })
}

// PATCH — kampanya bütçe güncelle veya durdur
export async function PATCH(request: Request) {
    if (request.headers.get('x-admin-token') !== ADMIN_TOKEN) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    if (!adminDb) return NextResponse.json({ error: 'DB yok' }, { status: 500 })

    const { id, gunlukButce, durum } = await request.json()
    if (!id) return NextResponse.json({ error: 'id zorunlu' }, { status: 400 })

    const guncelleme: Record<string, any> = {}
    if (gunlukButce !== undefined) guncelleme.gunlukButce = Number(gunlukButce)
    if (durum !== undefined) guncelleme.durum = durum

    await adminDb.collection('reklamlar').doc(id).update(guncelleme)
    return NextResponse.json({ ok: true })
}
