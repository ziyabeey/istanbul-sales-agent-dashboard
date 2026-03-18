import { NextResponse } from 'next/server'
import { adminDb, FieldValue } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { ad, telefon, sektorId, kaynakSite, mesaj } = body

        if (!telefon) {
            return NextResponse.json({ error: 'Telefon gerekli' }, { status: 400 })
        }

        const temizTelefon = String(telefon).replace(/[^0-9]/g, '')
        if (temizTelefon.length < 10) {
            return NextResponse.json({ error: 'Geçersiz telefon' }, { status: 400 })
        }

        // Firestore'a kaydet
        const ref = await adminDb.collection('demo_leads').add({
            ad: ad || '',
            telefon: temizTelefon,
            sektorId: sektorId || null,
            kaynakSite: kaynakSite || 'demo-vitrin',
            mesaj: mesaj || '',
            durum: 'yeni',
            olusturma: FieldValue.serverTimestamp(),
        })

        // Telegram operatör bildirimi
        try {
            await telegramGonder(
                `🆕 Demo Lead!\n` +
                `👤 ${ad || 'İsimsiz'}\n` +
                `📱 ${temizTelefon}\n` +
                `🏷️ Sektör: ${sektorId || '-'}\n` +
                `🌐 Kaynak: ${kaynakSite || 'demo-vitrin'}\n` +
                `💬 ${mesaj || '-'}\n` +
                `🔗 ID: ${ref.id}`
            )
        } catch {
            // Telegram hatası lead kaydını engellemez
        }

        return NextResponse.json({ ok: true, id: ref.id })
    } catch (error: any) {
        // console.error('[DEMO LEAD FORM]', error)
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}

// CORS headers for iframe cross-origin
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    })
}
