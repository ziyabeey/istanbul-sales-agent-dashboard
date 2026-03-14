import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const esnafId = searchParams.get('esnafId')

        if (!esnafId) {
            return NextResponse.json({ error: 'Esnaf ID gerekli' }, { status: 400 })
        }

        const profillerRef = await adminDb
            .collection('musteriProfiller')
            .where('esnafId', '==', esnafId)
            .orderBy('sonRandevu', 'desc')
            .get()

        const musteriler = profillerRef.docs.map((d: any) => {
            const data = d.data()
            return {
                id: data.id,
                telefon: data.telefon,
                ad: data.ad || 'Belirtilmemiş',
                toplamRandevu: data.toplamRandevu || 0,
                etiketler: data.etiketler || ['yeni'],
                sonRandevu: data.sonRandevu?.toDate().toISOString() || null,
                sonrakiTahminiZiyaret: data.sonrakiTahminiZiyaret?.toDate().toISOString() || null
            }
        })

        return NextResponse.json(musteriler)
    } catch (error) {
        console.error('[MUSTERILER API HATA]', error)
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}
