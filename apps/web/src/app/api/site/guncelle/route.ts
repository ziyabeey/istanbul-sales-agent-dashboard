import { NextResponse } from 'next/server'
import { esnafSiteGuncelle } from '@/utils/siteUreticisi'
import { requireSessionEsnaf } from '@/lib/esnafOwnership'
import { isSiteGenerationEnabled, siteFeatureDisabledResponse } from '@/lib/site/siteFeatureFlags'

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

    await esnafSiteGuncelle(esnafId)
    return NextResponse.json({ ok: true })
}
