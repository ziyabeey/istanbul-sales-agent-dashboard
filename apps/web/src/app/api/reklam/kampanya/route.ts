import { NextResponse } from 'next/server'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { kampanyaIcerigiUret } from '@/agents/ReklamAsistaniAgent'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

export const dynamic = 'force-dynamic'

/**
 * POST /api/reklam/kampanya — Yeni kampanya başlat
 * PATCH /api/reklam/kampanya — Kampanya duraklat/devam
 */

export async function POST(request: Request) {
    try {
        const esnafId = await oturumDogrulaServer()
        if (!esnafId) {
            return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
        }

        const { aylikButce } = await request.json()

        // Hard limit kontrol
        if (!aylikButce || aylikButce < 500 || aylikButce > 20_000) {
            return NextResponse.json({ error: 'Bütçe ₺500-₺20.000 arası olmalı' }, { status: 400 })
        }

        // AI ile reklam içeriği üret
        const sonuc = await kampanyaIcerigiUret(esnafId, aylikButce)

        if (!sonuc.basarili) {
            return NextResponse.json({ error: sonuc.hata || 'AI içerik üretemedi' }, { status: 500 })
        }

        // Aktif kampanya olarak kaydet
        await adminDb.collection('esnaflar').doc(esnafId)
            .collection('reklam_kampanyalari').add({
                ...sonuc,
                aylikButce,
                gunlukButce: Math.round(aylikButce / 30),
                durum: 'aktif',
                harcanan: 0,
                gelenMusteri: 0,
                baslangic: Timestamp.now(),
            })

        return NextResponse.json({
            ok: true,
            mesaj: 'Kampanya başlatıldı',
            reklamSayisi: (sonuc.metaReklamlar?.length || 0) + (sonuc.googleReklamlar?.length || 0),
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        const esnafId = await oturumDogrulaServer()
        if (!esnafId) {
            return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
        }

        const { aksiyon } = await request.json()

        // Aktif kampanyayı bul
        const kampanyalar = await adminDb.collection('esnaflar').doc(esnafId)
            .collection('reklam_kampanyalari')
            .where('durum', '==', 'aktif')
            .limit(1)
            .get()

        if (kampanyalar.empty) {
            return NextResponse.json({ error: 'Aktif kampanya bulunamadı' }, { status: 404 })
        }

        const kampanyaRef = kampanyalar.docs[0].ref
        const yeniDurum = aksiyon === 'duraklat' ? 'duraklatildi' : 'aktif'

        await kampanyaRef.update({
            durum: yeniDurum,
            [`${aksiyon}Zamani`]: Timestamp.now(),
        })

        return NextResponse.json({ ok: true, durum: yeniDurum })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
