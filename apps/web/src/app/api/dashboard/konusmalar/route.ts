import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { isDemoEsnafId, isDemoModeEnabled } from '@/lib/demoMode'
import { demoBusiness } from '@/data/demoBusiness'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const esnafId = searchParams.get('esnafId')

    if (!esnafId) {
        return NextResponse.json({ error: 'esnafId required' }, { status: 400 })
    }

    if (isDemoModeEnabled() && isDemoEsnafId(esnafId)) {
        return NextResponse.json(demoBusiness.conversations.map((konusma, index) => ({
            id: `demo-konusma-${index + 1}`,
            musteriNumara: konusma.musteriNumara,
            musteriAd: konusma.musteriAd,
            sonMesaj: konusma.sonMesaj,
            sonZaman: konusma.sonZaman,
            mesajSayisi: konusma.mesajSayisi,
            randevuVar: konusma.randevuVar,
        })))
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
        const gruplar = new Map<string, { mesajlar: Record<string, unknown>[]; sonZaman: unknown }>()

        for (const doc of snapshot.docs) {
            const d = doc.data() as Record<string, unknown>
            const numara = typeof d.musteriNumara === 'string' ? d.musteriNumara : 'bilinmeyen'
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
                const musteriNumara = rd.data().musteriNumara
                if (typeof musteriNumara === 'string') randevuSet.add(musteriNumara)
            }
        }

        // Sonuc dizisi olustur
        const sonuc = Array.from(gruplar.entries()).map(([numara, grup]) => {
            const sonMesajDoc = grup.mesajlar[0]
            const zamanObj = tarihOlustur(sonMesajDoc.zaman)

            return {
                musteriNumara: numara,
                sonMesaj: typeof sonMesajDoc.mesaj === 'string' ? sonMesajDoc.mesaj : '',
                sonZaman: zamanFormat(zamanObj),
                mesajSayisi: grup.mesajlar.length,
                randevuVar: randevuSet.has(numara),
            }
        })

        return NextResponse.json(sonuc)
    } catch {
        // console.error('[KONUSMALAR API]')
        return NextResponse.json({ error: 'DB Fetch Error' }, { status: 500 })
    }
}

function tarihOlustur(deger: unknown): Date {
    if (deger && typeof deger === 'object' && 'toDate' in deger && typeof deger.toDate === 'function') {
        return deger.toDate()
    }
    return new Date(typeof deger === 'string' || typeof deger === 'number' ? deger : Date.now())
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
