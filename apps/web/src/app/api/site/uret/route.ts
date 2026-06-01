import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { createHttpTask } from '@/lib/cloudTasksClient'
import { requireSessionEsnaf } from '@/lib/esnafOwnership'
import { isSiteGenerationEnabled, siteFeatureDisabledResponse } from '@/lib/site/siteFeatureFlags'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const { esnafId } = await request.json()

    if (!esnafId) {
        return NextResponse.json({ error: 'esnafId zorunlu' }, { status: 400 })
    }

    if (!isSiteGenerationEnabled()) {
        return siteFeatureDisabledResponse()
    }

    const ownership = await requireSessionEsnaf(request, esnafId)
    if (!ownership.ok) return ownership.response

    // Esnaf var mı?
    const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
    if (!doc.exists) {
        return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
    }

    // Üretim zaten devam ediyorsa tekrar tetikleme
    const esnaf = doc.data()!
    if (esnaf.siteUretimDevamEdiyor) {
        return NextResponse.json({
            mesaj: 'Site üretimi zaten devam ediyor',
            url: esnaf.subdomainUrl,
        })
    }

    // Kilit koy
    await doc.ref.update({ siteUretimDevamEdiyor: true })

    // Arka planda çalıştır (timeout olmasın diye Cloud Tasks üzerinden)
    try {
        await createHttpTask('site-uretim-kuyrugu', '/api/workers/site-ureticisi', { esnafId })
        return NextResponse.json({
            mesaj: 'Site üretimi sıraya alındı',
            tahminiSure: '30-120 saniye',
        })
    } catch {
        await doc.ref.update({ siteUretimDevamEdiyor: false })
        // console.error('[SİTE ÜRET KUYRUK]', e)
        return NextResponse.json({ error: 'Kuyruğa eklenemedi' }, { status: 500 })
    }
}
