import { NextResponse } from 'next/server'
import { esnafSiteUret } from '@/utils/siteUreticisi'

export const maxDuration = 300 // Vercel Pro/Cloud Run için 5 dakika timeout limiti

export async function POST(req: Request) {
    try {
        // İç güvenlik: Sadece Cloud Tasks veya tanımlı yetkililer tetikleyebilir
        const token = req.headers.get('x-cloud-task-secret')
        const beklenenToken = process.env.CRON_SECRET || 'dev-secret-123'

        if (token !== beklenenToken) {
            console.error('[WORKER: Site Üreticisi] Yetkisiz erişim denemesi')
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { esnafId } = body

        if (!esnafId) {
            console.error('[WORKER: Site Üreticisi] Eksik parametre: esnafId')
            return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
        }

        console.log(`[WORKER: Site Üreticisi] ${esnafId} için site üretimi başlatılıyor...`)

        // Gerçek üretimi tetikle
        const url = await esnafSiteUret(esnafId)

        console.log(`[WORKER: Site Üreticisi] Başarılı: ${url}`)
        return NextResponse.json({ ok: true, url })

    } catch (error: any) {
        console.error(`[WORKER: Site Üreticisi] Kritik Hata:`, error)
        // Cloud Tasks'ın hata durumunda retry mekanizmasını tetiklemesi için 500 dönüyoruz
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
