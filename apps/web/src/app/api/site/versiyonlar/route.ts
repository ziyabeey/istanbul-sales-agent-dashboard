import { NextResponse } from 'next/server'
import { versiyonlariGetir, versiyonGeriYukle, versiyonSil } from '@/lib/siteVersiyonlari'

// GET — Son 15 versiyonu listele
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const esnafId = searchParams.get('esnafId')
        if (!esnafId) {
            return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
        }

        const versiyonlar = await versiyonlariGetir(esnafId)
        return NextResponse.json({ ok: true, versiyonlar })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}

// POST — Rollback veya Sil
export async function POST(req: Request) {
    try {
        const { esnafId, versiyonId, islem } = await req.json()
        if (!esnafId || !versiyonId || !islem) {
            return NextResponse.json({ error: 'esnafId, versiyonId ve islem gerekli' }, { status: 400 })
        }

        if (islem === 'rollback') {
            const versiyon = await versiyonGeriYukle(esnafId, versiyonId)
            return NextResponse.json({ ok: true, versiyon_adi: versiyon.versiyon_adi })
        }

        if (islem === 'sil') {
            await versiyonSil(esnafId, versiyonId)
            return NextResponse.json({ ok: true })
        }

        return NextResponse.json({ error: 'Geçersiz islem' }, { status: 400 })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
