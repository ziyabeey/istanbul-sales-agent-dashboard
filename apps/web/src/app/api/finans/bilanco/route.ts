import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'

export async function GET(req: Request) {
    // ── Auth Guard ──
    const guard = await apiGuard(req, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    const { searchParams } = new URL(req.url)
    const esnafId = searchParams.get('esnafId')
    const ay = searchParams.get('ay') // 'YYYY-MM' formatında, örn: 2026-03

    if (!esnafId) return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })

    // ay formatı doğrulama
    if (ay && !/^\d{4}-\d{2}$/.test(ay)) {
        return NextResponse.json({ error: 'ay formatı: YYYY-MM' }, { status: 400 })
    }

    try {
        let baslangic: Date
        let bitis: Date

        if (ay) {
            const [year, month] = ay.split('-').map(Number)
            baslangic = new Date(year, month - 1, 1)
            bitis = new Date(year, month, 1)
        } else {
            // Varsayılan: Son 30 gün
            bitis = new Date()
            baslangic = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }

        // 1. GİDERLER (limit ile)
        const giderlerQuery = await adminDb.collection('giderler')
            .where('esnafId', '==', esnafId)
            .where('tarih', '>=', Timestamp.fromDate(baslangic))
            .where('tarih', '<', Timestamp.fromDate(bitis))
            .limit(500)
            .get()

        interface GiderDoc { tutar: number; tarih?: FirebaseFirestore.Timestamp; [key: string]: unknown }

        const giderlerList = giderlerQuery.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => {
            const data = doc.data() as GiderDoc
            return {
                id: doc.id,
                ...data,
                tarih: data.tarih?.toDate?.()?.toISOString() ?? null,
            }
        })
        const toplamGider = giderlerList.reduce((acc: number, cur: { tutar: number }) => acc + (cur.tutar || 0), 0)

        // 2. GELİRLER (randevulardan — limit ile)
        const randevularQuery = await adminDb.collection('randevular')
            .where('esnafId', '==', esnafId)
            .where('olusturma', '>=', Timestamp.fromDate(baslangic))
            .where('olusturma', '<', Timestamp.fromDate(bitis))
            .limit(500)
            .get()

        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const hizmetFiyatlari: Record<string, number> = esnafDoc.data()?.hizmetFiyatlari || {}

        interface RandevuDoc { durum?: string; fiyat?: number; hizmet?: string }

        let toplamGelir = 0
        randevularQuery.forEach((doc: FirebaseFirestore.QueryDocumentSnapshot) => {
            const data = doc.data() as RandevuDoc
            if (data.durum !== 'iptal') {
                if (data.fiyat) {
                    toplamGelir += Number(data.fiyat)
                } else if (data.hizmet && hizmetFiyatlari[data.hizmet]) {
                    toplamGelir += Number(hizmetFiyatlari[data.hizmet])
                }
                // Magic ₺500 fallback kaldırıldı — fiyatı bilinmeyen randevular 0₺
            }
        })

        // 3. CARİ HESAPLAR (limit ile)
        const cariQuery = await adminDb.collection('cariHesaplar')
            .where('esnafId', '==', esnafId)
            .where('durum', '==', 'bekliyor')
            .limit(200)
            .get()

        interface CariDoc { tutar: number; olusturma?: FirebaseFirestore.Timestamp; vadeTarihi?: FirebaseFirestore.Timestamp; [key: string]: unknown }

        const cariList = cariQuery.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => {
            const data = doc.data() as CariDoc
            return {
                id: doc.id,
                ...data,
                olusturma: data.olusturma?.toDate?.()?.toISOString() ?? null,
                vadeTarihi: data.vadeTarihi?.toDate?.()?.toISOString() ?? null,
            }
        })
        const toplamAlacak = cariList.reduce((acc: number, cur: { tutar: number }) => acc + (cur.tutar || 0), 0)

        // Bilanço Hesaplama
        const netKar = toplamGelir - toplamGider

        return NextResponse.json({
            ok: true,
            bilanco: {
                toplamGelir,
                toplamGider,
                netKar,
                toplamAlacak,
                donem: ay || 'Son 30 Gün',
                giderler: giderlerList,
                acikHesaplar: cariList,
            },
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        console.error('[BİLANÇO GETİRME HATASI]', message)
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }
}
