import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const esnafId = searchParams.get('esnafId')

    if (!esnafId) {
        return NextResponse.json({ error: 'esnafId required' }, { status: 400 })
    }

    try {
        // Son 200 mesaji getir
        const snapshot = await adminDb
            .collection('musteriKonusmalar')
            .where('esnafId', '==', esnafId)
            .orderBy('zaman', 'desc')
            .limit(200)
            .get()

        if (snapshot.empty) return NextResponse.json([])

        // musteriNumara bazinda grupla
        const gruplar = new Map<string, { mesajlar: any[]; sonZaman: any }>()

        for (const doc of snapshot.docs) {
            const d = doc.data()
            const numara = d.musteriNumara || 'bilinmeyen'
            if (!gruplar.has(numara)) {
                gruplar.set(numara, { mesajlar: [], sonZaman: d.zaman })
            }
            gruplar.get(numara)!.mesajlar.push(d)
        }

        // Aktif randevulari kontrol et
        const numaralar = Array.from(gruplar.keys())
        const randevuSet = new Set<string>()

        // Firestore 'in' sorgusu max 30 eleman alir
        for (let i = 0; i < numaralar.length; i += 30) {
            const dilim = numaralar.slice(i, i + 30)
            const randevuSnap = await adminDb
                .collection('randevular')
                .where('esnafId', '==', esnafId)
                .where('musteriNumara', 'in', dilim)
                .where('durum', '==', 'onaylandi')
                .get()

            for (const rd of randevuSnap.docs) {
                randevuSet.add(rd.data().musteriNumara)
            }
        }

        // Sonuc dizisi olustur
        const sonuc = Array.from(gruplar.entries()).map(([numara, grup]) => {
            const sonMesajDoc = grup.mesajlar[0]
            const zamanObj = sonMesajDoc.zaman?.toDate?.()
                ? sonMesajDoc.zaman.toDate()
                : new Date(sonMesajDoc.zaman)

            return {
                musteriNumara: numara,
                sonMesaj: sonMesajDoc.mesaj || '',
                sonZaman: zamanFormat(zamanObj),
                mesajSayisi: grup.mesajlar.length,
                randevuVar: randevuSet.has(numara),
            }
        })

        return NextResponse.json(sonuc)
    } catch (err) {
        // console.error('[KONUSMALAR API]', err)
        return NextResponse.json({ error: 'DB Fetch Error' }, { status: 500 })
    }
}

function zamanFormat(tarih: Date): string {
    const simdi = new Date()
    const farkMs = simdi.getTime() - tarih.getTime()
    const farkDk = Math.floor(farkMs / 60000)
    const farkSaat = Math.floor(farkDk / 60)
    const farkGun = Math.floor(farkSaat / 24)

    if (farkDk < 1) return 'az once'
    if (farkDk < 60) return `${farkDk} dk once`
    if (farkSaat < 24) return `${farkSaat} saat once`
    if (farkGun < 7) return `${farkGun} gun once`

    return tarih.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
}
