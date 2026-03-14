import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { runAdkOrchestrator } from '@/agents/OrchestratorAgent'
import { instagramDmGonder } from '@/lib/metaGraphClient'
import { kotaKontrol } from '@/utils/quotaManager'

// Meta Cloud / Webhook Doğrulaması. (Meta Webhook'u ilk kurduğunuzda hub.challenge bekler)
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('hub.mode')
    const token = searchParams.get('hub.verify_token')
    const challenge = searchParams.get('hub.challenge')

    // System Env olarak merkezi Verify Token tanımı olmalı (Örn: kepenk_ig_webhook_2024)
    if (mode === 'subscribe' && token === process.env.META_WEBHOOK_VERIFY_TOKEN) {
        console.log('[Instagram Webhook] Doğrulandı!')
        return new NextResponse(challenge, { status: 200 })
    }

    return new NextResponse('Yasak', { status: 403 })
}

// Instagram'dan Gelen Gerçek Zamanlı DM (POST) Webhook
export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Meta yapısında mi?
        if (body.object === 'instagram') {
            const entry = body.entry?.[0]
            const msgEvent = entry?.messaging?.[0]

            // Text Message mı kontrol et
            if (msgEvent && msgEvent.message && msgEvent.message.text) {
                const instagramUserId = msgEvent.sender.id
                const igAccountId = msgEvent.recipient.id // Hangi esnafın Instagram sayfasına geldi
                const mesajBody = msgEvent.message.text

                // 1. Gelen mesajın hangi Esnafa ait olduğunu bul (IG Account ID üzerinden)
                const esnafRef = await adminDb.collection('esnaflar')
                    .where('instagramAccountId', '==', igAccountId)
                    .where('botAktif', '==', true)
                    .limit(1)
                    .get()

                if (esnafRef.empty) {
                    console.log(`[Instagram] Hedef Esnaf Bulunamadı veya Pasif: ${igAccountId}`)
                    return NextResponse.json({ status: 'ignored' }, { status: 200 })
                }

                const esnafDoc = esnafRef.docs[0]
                const esnaf = esnafDoc.data()
                const esnafId = esnafDoc.id

                // 2. Kota Kontrolü: Esnafın AI limiti var mı?
                const kota = await kotaKontrol(esnafId)
                if (!kota.izinVar) {
                    // Kotası bitmiş esnafa cevap vermiyoruz ve limit uyarısı atıyoruz. (Opsiyonel olarak WhatsApp'tan "Kotanız bitti, Instagram DM cevapsız kaldı" denilebilir)
                    return NextResponse.json({ status: 'quota_exceeded' }, { status: 200 })
                }

                // 3. ADK Orchestrator'a Kontext Bildirme (Kanal: Instagram)
                const sessionId = `ig_${instagramUserId}`
                const contextStr = `[KANAL: INSTAGRAM DM] [Esnaf: ${esnaf.isletmeAdi || esnaf.ad}, Sektor: ${esnaf.sektor}, Fiyat Listesi: "${esnaf.istatistik?.fiyatListesi || 'Belirtilmedi'}"]
⚠️ DİKKAT: Instagram'da olduğunu unutma. Linkleri veya tasarımları Instagram DM ritmine uygun (kısa ve etkileşimsel) ver.\nMesaj: `

                // 4. Müşteri Mesajına AI Yanıt Üretme
                const aiYanit = await runAdkOrchestrator(
                    sessionId,
                    `${contextStr}"${mesajBody}"`
                )

                // 5. Yanıtı Geri Instagram Kullanıcısına Gönderme (Meta Graph API)
                if (aiYanit) {
                    // Instagram'da XML formatı işlemez düz metin gerekli (ADK xml/TwiML formati dondurmuyorsa sıkıntı yok, WhatsApp hook'u XML sariyordu)
                    const temizYanit = aiYanit.replace(/<[^>]*>?/gm, '').trim();

                    await instagramDmGonder(instagramUserId, temizYanit, esnafId)

                    // Karşılanan/Yanıtlanan mesajı logla
                    await adminDb.collection('agent_logs').add({
                        ajan: 'instagram_webhook',
                        esnafId,
                        tip: 'mesaj_alindi_ve_yonetildi',
                        input: { igTarget: instagramUserId, mesaj: mesajBody },
                        output: { yanit: temizYanit },
                        basari: true,
                        hata: null,
                        zaman: new Date(),
                        kanal: 'instagram',
                    })
                }

                return NextResponse.json({ status: 'ok' }, { status: 200 })
            }
        }

        return NextResponse.json({ status: 'event_ignored' }, { status: 200 })

    } catch (error: any) {
        console.error('[INSTAGRAM WEBHOOK HATA]', error)
        // Webhook tarafını 200 dönmek zorundayız ki Meta tekrar tekrar aynı mesagi kuyrukta darlamasın. (Retry Hell)
        return NextResponse.json({ error: error.message }, { status: 200 })
    }
}
