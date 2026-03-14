export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { routerMesajIsle } from '@/lib/agents/routerAgent'

interface KuyrukMesaji {
    esnafId: string
    musteriNumara: string
    mesaj: string
    oturumId: string
}

export async function GET(req: Request) {
    const secret = req.headers.get('x-cron-secret')
    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Kuyruktaki işlenmemiş mesajları çek (batch of 10)
        const bekleyenMesajlar = await adminDb
            .collection('gelenMesajKuyrugu')
            .where('durum', '==', 'bekliyor')
            .orderBy('eklenmeZamani', 'asc')
            .limit(10)
            .get()

        if (bekleyenMesajlar.empty) {
            return NextResponse.json({ ok: true, islenen: 0, mesaj: 'Kuyruk boş' })
        }

        const promises = bekleyenMesajlar.docs.map(async (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
            const data = doc.data() as KuyrukMesaji

            try {
                // Mesajı işlemeye başlandı olarak işaretle (Multiple invocation lock)
                await doc.ref.update({ durum: 'isleniyor' })

                // Router Agent'a ver
                await routerMesajIsle({
                    esnafId: data.esnafId,
                    musteriNumara: data.musteriNumara,
                    mesaj: data.mesaj,
                    oturumId: data.oturumId
                })

                // İşlem bitti
                await doc.ref.update({ durum: 'tamamlandi' })
            } catch (e: unknown) {
                const hataMesaji = e instanceof Error ? e.message : String(e)
                console.error(`[CRON KUYRUK HATASI] Doc: ${doc.id}`, hataMesaji)
                await doc.ref.update({ durum: 'hata', hataNotu: hataMesaji })
            }
        })

        // Hepsini paralel işlet
        await Promise.all(promises)

        return NextResponse.json({ ok: true, islenen: bekleyenMesajlar.size })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        console.error('[CRON MESAJ İŞLEYİCİ HATA]', message)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
