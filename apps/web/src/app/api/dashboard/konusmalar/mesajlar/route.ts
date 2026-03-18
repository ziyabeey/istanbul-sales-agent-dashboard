import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

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

    try {
        const snapshot = await adminDb
            .collection('musteriKonusmalar')
            .where('esnafId', '==', esnafId)
            .where('musteriNumara', '==', musteriNumara)
            .orderBy('zaman', 'asc')
            .limit(100)
            .get()

        if (snapshot.empty) return NextResponse.json([])

        const mesajlar = snapshot.docs.map((doc: any) => {
            const d = doc.data()
            const zamanObj = d.zaman?.toDate?.()
                ? d.zaman.toDate()
                : new Date(d.zaman)

            return {
                mesaj: d.mesaj || '',
                kimden: d.kimden === 'musteri' ? 'musteri' : 'ai' as const,
                zaman: zamanObj.toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            }
        })

        return NextResponse.json(mesajlar)
    } catch (err) {
        // console.error('[MESAJLAR API]', err)
        return NextResponse.json({ error: 'DB Fetch Error' }, { status: 500 })
    }
}
