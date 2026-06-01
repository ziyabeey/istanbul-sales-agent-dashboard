import { NextResponse } from 'next/server'
import { esnafSiteUret } from '@/utils/siteUreticisi'
import { isSiteGenerationEnabled, siteFeatureDisabledResponse } from '@/lib/site/siteFeatureFlags'

export const maxDuration = 300 // Vercel Pro/Cloud Run için 5 dakika timeout limiti

export async function POST(req: Request) {
    try {
        // İç güvenlik: Sadece Cloud Tasks veya tanımlı yetkililer tetikleyebilir
        const token = req.headers.get('x-cloud-task-secret')
        const beklenenToken = process.env.CRON_SECRET
        if (!beklenenToken) {
            return NextResponse.json({ error: 'CRON_SECRET tanımlı değil' }, { status: 500 })
        }

        if (token !== beklenenToken) {
            // Yetkisiz erisim denemesi
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        if (!isSiteGenerationEnabled()) {
            return siteFeatureDisabledResponse()
        }

        const body = await req.json()
        const { esnafId } = body

        if (!esnafId) {
            // Eksik parametre
            return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
        }

        // Site uretimi baslatiliyor

        // Gerçek üretimi tetikle
        const url = await esnafSiteUret(esnafId)

        // Site uretimi basarili
        return NextResponse.json({ ok: true, url })

    } catch (error: unknown) {
        // Kritik hata
        // Cloud Tasks'ın hata durumunda retry mekanizmasını tetiklemesi için 500 dönüyoruz
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
