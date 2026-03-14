import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import logger from '@/utils/logger'
import { tahsilatYap } from '@/lib/agents/tahsilatAjani'

export async function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const bugun = new Date()
        const acikHesaplar = await adminDb.collection('cariHesaplar')
            .where('durum', '==', 'bekliyor')
            .where('vadeTarihi', '<', Timestamp.fromDate(bugun)) // Vadesi geçmişler
            .get()

        if (acikHesaplar.empty) {
            return NextResponse.json({ ok: true, islenen: 0, mesaj: 'Vadesi geçmiş alacak bulunamadı' })
        }

        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

        // Esnaf bazında grupla
        const esnafDocs = new Map<string, any[]>()

        acikHesaplar.docs.forEach((doc: any) => {
            const data = doc.data()
            // Eğer son 24 saat içinde hatırlatıldıysa, tekrar mesaj atma
            if (data.sonHatirlatma && data.sonHatirlatma.toDate() > twentyFourHoursAgo) {
                return
            }

            const eId = data.esnafId
            if (!esnafDocs.has(eId)) esnafDocs.set(eId, [])
            esnafDocs.get(eId)!.push(doc)
        })

        if (esnafDocs.size === 0) {
            return NextResponse.json({ ok: true, islenen: 0, mesaj: 'Tüm borçlular halihazırda uyarılmış' })
        }

        // Tahsilat işlemini gruplar bazında ateşle
        const promises: Promise<void>[] = []
        for (const [esnafId, docs] of Array.from(esnafDocs.entries())) {
            promises.push(tahsilatYap(esnafId, docs))
        }

        await Promise.all(promises)

        return NextResponse.json({ ok: true, islenen: esnafDocs.size, mesaj: 'Tahsilat ajanları çalıştırıldı' })
    } catch (error: any) {
        console.error('[CRON TAHSILAT HATASI]', error)
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }
}
