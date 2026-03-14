import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ esnafId: string }> }
) {
    try {
        const { esnafId } = await params

        const gunler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
        const bugunGun = gunler[new Date().getDay()]

        const [yorumSnap, icerikSnap] = await Promise.all([
            adminDb
                .collection('yorumlar')
                .where('esnafId', '==', esnafId)
                .get(),
            adminDb
                .collection('icerikler')
                .where('esnafId', '==', esnafId)
                .get(),
        ])

        const aktifYorumSayisi = yorumSnap.docs.filter((d: any) => d.data().yanitDurumu === 'bekliyor').length

        const bugunIcerikler = icerikSnap.docs
            .map((d: any) => ({ id: d.id, ...d.data() }))
            .filter((d: any) => d.platform === 'instagram' && d.gun === bugunGun)
            .sort((a: any, b: any) => {
                const tA = a.olusturmaTarihi?.toDate()?.getTime() || 0
                const tB = b.olusturmaTarihi?.toDate()?.getTime() || 0
                return tB - tA
            })
        const bugunIcerik = bugunIcerikler.length > 0 ? bugunIcerikler[0] : null

        return NextResponse.json({
            aktifYorumSayisi,
            bugunIcerik,
            haftalikZiyaretci: null,  // GA4 entegrasyonu sonraki fazda
            googlePuani: null,        // GMB API entegrasyonu sonraki fazda
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
