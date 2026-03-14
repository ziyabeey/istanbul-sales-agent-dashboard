import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import logger from '@/utils/logger' // Varsayılan log servisi
import { buyumeSkoruHesapla } from '@/utils/buyumeSkoru'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const esnafId = searchParams.get('esnafId')

    if (!esnafId) return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })

    try {
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data()!

        // GELİR TAHMİNİ Mock
        const gelirTahmini = {
            minTahmin: 15400,
            maxTahmin: 21000,
            hedefDurumu: '%80'
        }

        // RANDEVU ÖZETİ Mock
        const bugun = new Date()
        bugun.setHours(0, 0, 0, 0)
        const buHaftaRandevular = await adminDb.collection('randevular')
            .where('esnafId', '==', esnafId)
            .where('olusturma', '>=', bugun)
            .get()

        // BÜYÜME SKORU
        const skore = buyumeSkoruHesapla ? await buyumeSkoruHesapla(esnafId) : { skor: 850, rozet: 'Rocket' }

        // YENİ AKTİF BEKLEYEN BİLDİRİM SAYISI
        const uyariQuery = await adminDb.collection('esnafBildirimleri')
            .where('esnafId', '==', esnafId)
            .where('okundu', '==', false)
            .get()

        return NextResponse.json({
            isletme: {
                ad: esnaf.isletmeAdi || esnaf.ad,
                sektor: esnaf.sektor || 'Bilinmiyor',
                hedefKitle: esnaf.hedefKitle || 'Genel',
                subeler: esnaf.subeler || []
            },
            gelir: gelirTahmini,
            randevuHacmi: buHaftaRandevular.size,
            buyume: skore,
            bekleyenUyari: uyariQuery.size,
            bugunIcerik: null, // MOCK Data
            aktifYorumSayisi: 0,
            haftalikZiyaretci: 125,
            googlePuani: 4.8,
            saglikSkoru: 85,
            saglikOnerileri: ['Google yorumlarınıza hızlı yanıt veriyorsunuz', 'Aferin']
        })
    } catch (error) {
        console.error('[Dashboard Summary Hatası]', error)
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }
}
