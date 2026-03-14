import { NextResponse } from 'next/server'
import { kampanyaBaslatSahaSatis } from '@/lib/agents/sahaSatisAjani'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { toptanciId, kampanyaIcerigi } = body

        if (!toptanciId || !kampanyaIcerigi) {
            return NextResponse.json({ error: 'toptanciId veya kampanyaIcerigi eksik' }, { status: 400 })
        }

        // Asenkron başlat, bekleme
        kampanyaBaslatSahaSatis(toptanciId, kampanyaIcerigi)

        return NextResponse.json({ ok: true, message: 'Saha Satış Ajanı başlatıldı.' })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
