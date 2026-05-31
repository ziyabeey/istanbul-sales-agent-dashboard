import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { isDemoEsnafId, isDemoModeEnabled } from '@/lib/demoMode'
import { demoBusiness } from '@/data/demoBusiness'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const esnafId = searchParams.get('esnafId')

        if (!esnafId) {
            return NextResponse.json({ error: 'Esnaf ID gerekli' }, { status: 400 })
        }

        if (isDemoModeEnabled() && isDemoEsnafId(esnafId)) {
            return NextResponse.json(demoBusiness.customers.map((musteri) => ({
                id: musteri.id,
                ad: musteri.ad,
                telefon: musteri.telefon,
                toplamRandevu: musteri.toplamRandevu,
                etiketler: musteri.etiketler,
                sonRandevu: musteri.sonRandevu,
                sonrakiTahminiZiyaret: musteri.sonrakiTahminiZiyaret,
            })))
        }

        const profillerRef = await adminDb
            .collection('musteriProfiller')
            .where('esnafId', '==', esnafId)
            .orderBy('sonRandevu', 'desc')
            .get()

        const musteriler = profillerRef.docs.map((d) => {
            const data = d.data() as Record<string, unknown>
            return {
                id: typeof data.id === 'string' ? data.id : d.id,
                telefon: typeof data.telefon === 'string' ? data.telefon : '',
                ad: typeof data.ad === 'string' ? data.ad : 'Belirtilmemiş',
                toplamRandevu: typeof data.toplamRandevu === 'number' ? data.toplamRandevu : 0,
                etiketler: Array.isArray(data.etiketler) ? data.etiketler : ['yeni'],
                sonRandevu: tarihIso(data.sonRandevu),
                sonrakiTahminiZiyaret: tarihIso(data.sonrakiTahminiZiyaret)
            }
        })

        return NextResponse.json(musteriler)
    } catch {
        // console.error('[MUSTERILER API HATA]')
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}

function tarihIso(deger: unknown): string | null {
    if (deger && typeof deger === 'object' && 'toDate' in deger && typeof deger.toDate === 'function') {
        return deger.toDate().toISOString()
    }
    if (typeof deger === 'string') return deger
    return null
}
