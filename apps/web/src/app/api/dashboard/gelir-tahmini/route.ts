import { NextResponse } from 'next/server'
import { gelirTahminEt } from '@/utils/gelirTahmini'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const esnafId = searchParams.get('esnafId')

        if (!esnafId) {
            return NextResponse.json({ error: 'Esnaf ID gerekli' }, { status: 400 })
        }

        const tahmin = await gelirTahminEt(esnafId)
        return NextResponse.json(tahmin)
    } catch (error) {
        // console.error('[GELİR TAHMİNİ HATA]', error)
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}
