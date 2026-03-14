import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const toptanciId = searchParams.get('toptanciId')
    const esnafId = searchParams.get('esnafId')

    try {
        let query: FirebaseFirestore.Query = adminDb.collection('b2bCariHesaplar')

        if (toptanciId) {
            query = query.where('toptanciId', '==', toptanciId)
        } else if (esnafId) {
            query = query.where('esnafId', '==', esnafId)
        } else {
            return NextResponse.json({ error: 'toptanciId veya esnafId parametresi gerekli.' }, { status: 400 })
        }

        const snapshot = await query.get()
        const cariler = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        return NextResponse.json(cariler)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { toptanciId, esnafId, tutar, aciklama, vadeTarihi } = body

        if (!toptanciId || !esnafId || !tutar) {
            return NextResponse.json({ error: 'toptanciId, esnafId ve tutar zorunludur.' }, { status: 400 })
        }

        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnafAd = esnafDoc.data()?.isletmeAdi || 'Bilinmeyen İşletme'

        const yeniCari = {
            toptanciId,
            esnafId,
            isletmeAdi: esnafAd,
            tutar: Number(tutar),
            aciklama: aciklama || 'Toptan Malzeme Alımı',
            olusturmaTarihi: Timestamp.now(),
            vadeTarihi: vadeTarihi ? Timestamp.fromDate(new Date(vadeTarihi)) : Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // Default 30 gün vade
            durum: 'odenmedi' // odenmedi, odendi, gecikmede
        }

        const docRef = await adminDb.collection('b2bCariHesaplar').add(yeniCari)

        return NextResponse.json({ id: docRef.id, ...yeniCari, mesaj: 'B2B Cari borç kaydedildi.' })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        const { cariId, yeniDurum, toptanciId } = body

        if (!cariId || !yeniDurum || !toptanciId) {
            return NextResponse.json({ error: 'cariId, toptanciId ve yeniDurum zorunludur.' }, { status: 400 })
        }

        const cariRef = adminDb.collection('b2bCariHesaplar').doc(cariId)
        const doc = await cariRef.get()

        if (!doc.exists || doc.data()?.toptanciId !== toptanciId) {
            return NextResponse.json({ error: 'Yetkisiz işlem veya cari bulunamadı' }, { status: 403 })
        }

        await cariRef.update({ durum: yeniDurum })

        return NextResponse.json({ ok: true, mesaj: 'Cari durumu güncellendi.' })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
