import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { esnafSiteUret } from '@/utils/siteUreticisi'
import { requireSessionEsnaf } from '@/lib/esnafOwnership'
import { isSiteGenerationEnabled, siteFeatureDisabledResponse } from '@/lib/site/siteFeatureFlags'

export async function POST(request: Request) {
    try {
        const { esnafId } = await request.json()
        if (!esnafId) return NextResponse.json({ error: 'esnafId zorunlu' }, { status: 400 })

        if (!isSiteGenerationEnabled()) {
            return siteFeatureDisabledResponse()
        }

        const ownership = await requireSessionEsnaf(request, esnafId)
        if (!ownership.ok) return ownership.response

        const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!doc.exists) return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })

        const siteUrl = await esnafSiteUret(esnafId)

        return NextResponse.json({ ok: true, subdomainUrl: siteUrl })
    } catch (error: unknown) {
        // console.error('[SITE PROVISION YENi]', error)
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const esnafId = searchParams.get('esnafId')
    if (!esnafId) return NextResponse.json({ error: 'esnafId zorunlu' }, { status: 400 })

    if (!isSiteGenerationEnabled()) {
        return siteFeatureDisabledResponse()
    }

    const ownership = await requireSessionEsnaf(request, esnafId)
    if (!ownership.ok) return ownership.response

    const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
    if (!doc.exists) return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })

    const e = doc.data()!
    return NextResponse.json({
        subdomainUrl: e.subdomainUrl || null,
        subdomain: e.subdomain || null
    })
}
