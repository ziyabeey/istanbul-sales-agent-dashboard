import { NextResponse } from 'next/server'
import { reklamPerformansGuncelle } from '@/utils/reklamPerformans'

export async function GET(req: Request) {
    const secret = req.headers.get('x-cron-secret')
    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        await reklamPerformansGuncelle()
        return NextResponse.json({ ok: true })
    } catch (error) {
        // console.error('[CRON REKLAM PERFORMANS HATA]', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
