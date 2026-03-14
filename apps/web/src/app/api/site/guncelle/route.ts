import { NextResponse } from 'next/server'
import { esnafSiteGuncelle } from '@/utils/siteUreticisi'

export async function POST(request: Request) {
    const { esnafId } = await request.json()
    if (!esnafId) {
        return NextResponse.json({ error: 'esnafId zorunlu' }, { status: 400 })
    }

    await esnafSiteGuncelle(esnafId)
    return NextResponse.json({ ok: true })
}
