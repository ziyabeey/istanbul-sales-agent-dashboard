import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { smsSend } from '@/lib/netgsmClient'

export async function GET(req: Request) {
    const guard = await apiGuard(req, { requireCronSecret: true })
    if (!guard.ok) return guard.response

    const now = Date.now()
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kepenk.ai'

    const windows = [
        { gun: 7, label: '7 gun' },
        { gun: 1, label: 'YARIN' },
    ]

    let yediGun = 0
    let birGun = 0

    for (const { gun, label } of windows) {
        const hedefMs = now + gun * 24 * 60 * 60 * 1000
        const baslangic = new Date(hedefMs - 60 * 60 * 1000) // ±1 saat
        const bitis = new Date(hedefMs + 60 * 60 * 1000)

        const snapshot = await adminDb.collection('esnaflar')
            .where('durum', '==', 'aktif')
            .where('yenilenmeTarihi', '>=', baslangic)
            .where('yenilenmeTarihi', '<=', bitis)
            .get()

        for (const doc of snapshot.docs) {
            const esnaf = doc.data()
            const telefon: string = esnaf.telefonTemiz || esnaf.telefon || ''
            if (!telefon) continue

            const temizTelefon = telefon.replace(/\D/g, '').replace(/^0/, '')
            if (temizTelefon.length < 10) continue

            const mesaj = gun === 7
                ? `kepenk.ai: Aboneliginiz 7 gun icinde yenileniyor. ${APP_URL}/dashboard/abonelik`
                : `kepenk.ai: Aboneliginiz YARIN yenileniyor. ${APP_URL}/dashboard/abonelik`

            await smsSend(temizTelefon, mesaj)

            if (gun === 7) yediGun++
            else birGun++
        }
    }

    return NextResponse.json({ ok: true, yediGun, birGun })
}
