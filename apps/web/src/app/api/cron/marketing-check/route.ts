import { NextResponse } from 'next/server'
import { pazarlamaKarariVer } from '@/lib/agents/marketingAgent'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const specificEsnafId = searchParams.get('esnafId')

        if (specificEsnafId) {
            // Belirli bir esnafa zorla pazarlama kontrolü yap (Dashboard "Reklam Başlat" butonu için ideal)
            await pazarlamaKarariVer(specificEsnafId)
            return NextResponse.json({ success: true, message: `Otonom pazarlama ${specificEsnafId} için tetiklendi.` })
        }

        // Genel Cron Job (Tüm esnafları dön, Vercel Cron vb.)
        const esnaflarRef = await adminDb.collection('esnaflar').limit(10).get()
        const vaatler = esnaflarRef.docs.map((doc: any) => pazarlamaKarariVer(doc.id))

        await Promise.all(vaatler)

        return NextResponse.json({ success: true, message: `${esnaflarRef.docs.length} esnaf için pazarlama kontrolü yapıldı.` })
    } catch (e: any) {
        console.error('[Marketing Cron Error]', e)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
