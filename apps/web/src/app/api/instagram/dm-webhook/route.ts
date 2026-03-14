import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

// Meta Webhooks: GET (doğrulama) + POST (mesaj alma)

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const mode = searchParams.get('hub.mode')
    const token = searchParams.get('hub.verify_token')
    const challenge = searchParams.get('hub.challenge')

    if (mode === 'subscribe' && token === process.env.INSTAGRAM_WEBHOOK_TOKEN) {
        return new NextResponse(challenge, { status: 200 })
    }
    return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // ── Tüm entry'lerin esnaf lookup'ını ÖN-YÜKLE (N+1 çözümü) ──
        // Benzersiz Instagram hesap ID'lerini topla
        const igAccountIds = new Set<string>()
        for (const entry of body.entry ?? []) {
            if (entry.id) igAccountIds.add(entry.id)
        }

        if (igAccountIds.size === 0) {
            return NextResponse.json({ ok: true })
        }

        // Tek sorguda tüm esnafları çek (batch lookup)
        // Firestore 'in' max 30 element destekler
        const igIdArray = Array.from(igAccountIds).slice(0, 30)
        const esnafSnap = await adminDb
            .collection('esnaflar')
            .where('instagramUserId', 'in', igIdArray)
            .get()

        // Lookup map: instagramUserId → esnafId
        const esnafMap = new Map<string, string>()
        for (const doc of esnafSnap.docs) {
            const igUserId = (doc.data() as { instagramUserId?: string }).instagramUserId
            if (igUserId) esnafMap.set(igUserId, doc.id)
        }

        // ── Mesajları paralel işle ──
        const islemler: Promise<void>[] = []

        for (const entry of body.entry ?? []) {
            const esnafId = esnafMap.get(entry.id)
            if (!esnafId) continue

            for (const messaging of entry.messaging ?? []) {
                const senderId = messaging.sender?.id as string | undefined
                const mesaj = messaging.message?.text as string | undefined

                if (!senderId || !mesaj) continue

                islemler.push(
                    mesajIsle(esnafId, senderId, mesaj)
                )
            }
        }

        // Tüm mesajları paralel, hata izolasyonlu olarak işle
        if (islemler.length > 0) {
            const sonuclar = await Promise.allSettled(islemler)
            for (const s of sonuclar) {
                if (s.status === 'rejected') {
                    console.error('[IG MESAJ İŞLEME HATASI]', s.reason)
                }
            }
        }

        return NextResponse.json({ ok: true })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        console.error('[IG WEBHOOK ERROR]', message)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

// ── Tek mesaj işleme fonksiyonu (modüler) ──────────────────────────────
async function mesajIsle(esnafId: string, senderId: string, mesaj: string): Promise<void> {
    const { musteriMesajiIsle } = await import('@/lib/musteriAjani')

    await musteriMesajiIsle({
        esnafId,
        musteriNumara: `ig_${senderId}`,
        mesaj,
        oturumId: `ig_${esnafId}_${senderId}_${new Date().toDateString()}`,
        kanal: 'instagram',
        yanıtCallback: async (yanitMetni: string) => {
            const response = await fetch(`https://graph.facebook.com/v18.0/me/messages`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.INSTAGRAM_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipient: { id: senderId },
                    message: { text: yanitMetni },
                }),
            })

            if (!response.ok) {
                const errorBody = await response.text().catch(() => 'Unknown')
                console.error(`[IG SEND ERROR] ${response.status}: ${errorBody}`)
            }
        },
    })
}
