import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { runAgent } from '@/agents/agentRunner'

export async function POST(request: Request) {
    try {
        const { esnafId, platform } = await request.json()

        if (!esnafId || !platform) {
            return NextResponse.json({ error: 'esnafId ve platform zorunlu' }, { status: 400 })
        }

        // Esnaf bilgilerini çek
        const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!doc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        const esnaf = doc.data()!

        // TheCreator ajanından içerik üret
        const icerik = await runAgent('the_creator' as any, {
            action: 'icerik_uret',
            esnafId,
            esnaf: {
                ad: esnaf.ad,
                sektor: esnaf.sektor,
                ilce: esnaf.ilce,
            },
            platform,
        })

        // Firestore'a kaydet
        const metin = typeof icerik === 'string' ? icerik : (icerik?.metin || JSON.stringify(icerik))
        const hashtagler = typeof icerik === 'object' && icerik?.hashtagler ? icerik.hashtagler : []

        const ref = await adminDb.collection('icerikler').add({
            esnafId,
            platform,
            metin,
            hashtagler,
            durum: 'bekliyor',
            olusturulma: Timestamp.now(),
        })

        return NextResponse.json({ id: ref.id, metin, hashtagler })
    } catch (error: any) {
        // console.error('[İÇERİK ÜRET HATA]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
