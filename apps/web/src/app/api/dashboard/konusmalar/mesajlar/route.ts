import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { isDemoEsnafId, isDemoModeEnabled } from '@/lib/demoMode'
import { demoBusiness } from '@/data/demoBusiness'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const esnafId = searchParams.get('esnafId')
    const musteriNumara = searchParams.get('musteriNumara')

    if (!esnafId || !musteriNumara) {
        return NextResponse.json(
            { error: 'esnafId ve musteriNumara required' },
            { status: 400 }
        )
    }

    if (isDemoModeEnabled() && isDemoEsnafId(esnafId)) {
        const konusma = demoBusiness.conversations.find((item) => item.musteriNumara === musteriNumara)
        return NextResponse.json((konusma?.messages || []).map((mesaj, index) => ({
            id: `demo-mesaj-${index + 1}`,
            mesaj: mesaj.mesaj,
            kimden: mesaj.kimden,
            zaman: mesaj.zaman,
        })))
    }

    try {
        const snapshot = await adminDb
            .collection('musteriKonusmalar')
            .where('esnafId', '==', esnafId)
            .where('musteriNumara', '==', musteriNumara)
            .orderBy('zaman', 'asc')
            .limit(100)
            .get()

        if (snapshot.empty) return NextResponse.json([])

        const mesajlar = snapshot.docs.map((doc) => {
            const d = doc.data() as Record<string, unknown>
            const zamanObj = tarihOlustur(d.zaman)

            return {
                mesaj: typeof d.mesaj === 'string' ? d.mesaj : '',
                kimden: d.kimden === 'musteri' ? 'musteri' : 'ai' as const,
                zaman: zamanObj.toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            }
        })

        return NextResponse.json(mesajlar)
    } catch {
        // console.error('[MESAJLAR API]')
        return NextResponse.json({ error: 'DB Fetch Error' }, { status: 500 })
    }
}

function tarihOlustur(deger: unknown): Date {
    if (deger && typeof deger === 'object' && 'toDate' in deger && typeof deger.toDate === 'function') {
        return deger.toDate()
    }
    return new Date(typeof deger === 'string' || typeof deger === 'number' ? deger : Date.now())
}
