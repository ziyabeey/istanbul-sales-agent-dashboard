import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'
import { runAgent } from '@/agents/agentRunner'
import { rateLimitCheck } from '@/lib/rateLimiter'

// POST: Yeni olumsuz yorum geldi
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { yildiz, metin, platform, esnafId, yazarAdi } = body

        if (!esnafId || yildiz === undefined || !metin) {
            return NextResponse.json(
                { error: 'Eksik alanlar: esnafId, yildiz, metin zorunlu' },
                { status: 400 }
            )
        }

        // Rate limit — esnaf başına dakikada kontrol
        const rl = rateLimitCheck(`reviews:${esnafId}`, 'public')
        if (!rl.allowed) {
            return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
        }

        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!esnafDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }
        const esnaf = esnafDoc.data()!

        // 4-5 yıldız → basit bildirim
        if (yildiz > 3) {
            await waMesajGonder(
                esnaf.waNumarasi,
                `⭐ ${esnaf.ad} ${esnaf.unvan}, ${platform}'da yeni ${yildiz} yıldızlı yorum geldi! 🎉`,
                esnafId,
                'sentiment_guardian'
            )
            return NextResponse.json({ durum: 'olumlu_bildirim' })
        }

        // Olumsuz yorum → Ajan 12 devreye girer
        const yanitTaslagi = await runAgent('sentiment_guardian', {
            yildiz,
            metin,
            platform,
            esnafId,
            esnafAdi: `${esnaf.ad} ${esnaf.unvan}`,
        })

        const yorumRef = await adminDb.collection('yorumlar').add({
            esnafId,
            platform: platform || 'google',
            yildiz,
            metin,
            yazarAdi: yazarAdi || 'Anonim',
            tarih: Timestamp.now(),
            sistemYaniti: yanitTaslagi,
            yanitDurumu: 'bekliyor',
            yanitZamani: null,
        })

        // Esnafa WA bildirimi
        await waMesajGonder(
            esnaf.waNumarasi,
            `⚠️ ${esnaf.ad} ${esnaf.unvan}, ${platform}'da ${yildiz}⭐ yorum geldi.\n\n` +
            `Endişelenme — yanıtı yazdım:\n"${yanitTaslagi?.slice(0, 100)}..."\n\n` +
            `Onaylamak için: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/kriz`,
            esnafId,
            'sentiment_guardian'
        )

        return NextResponse.json({ yorumId: yorumRef.id, taslak: yanitTaslagi })
    } catch (error: any) {
        // console.error('[REVIEWS HATA]', error)
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}

// PUT: Esnaf yanıtı onayladı
export async function PUT(request: Request) {
    try {
        const { yorumId, yanitMetni, esnafId } = await request.json()

        if (!yorumId || !yanitMetni) {
            return NextResponse.json({ error: 'yorumId ve yanitMetni zorunlu' }, { status: 400 })
        }

        await adminDb.collection('yorumlar').doc(yorumId).update({
            sistemYaniti: yanitMetni,
            yanitDurumu: 'onaylandi',
            yanitZamani: Timestamp.now(),
        })

        await adminDb.collection('agent_logs').add({
            ajan: 'sentiment_guardian',
            esnafId: esnafId || null,
            tip: 'yorum_yanit_onaylandi',
            input: { yorumId },
            output: { yanitMetni },
            basari: true,
            hata: null,
            zaman: new Date(),
            kanal: 'internal',
        })

        return NextResponse.json({ ok: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
