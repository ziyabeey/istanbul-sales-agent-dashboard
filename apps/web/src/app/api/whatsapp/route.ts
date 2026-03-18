import { NextResponse } from 'next/server'
import { adminDb, getEsnafByPhone } from '@/lib/firebaseAdmin'
import { kotaKontrol } from '@/utils/quotaManager'
import { rateLimitCheck } from '@/lib/rateLimiter'
import { karalisteKontrol, karalisteEkle } from '@/lib/firebaseAdmin'
import { logAgentAction } from '@/utils/logger'
import { kuyruğaEkle } from '@/lib/islemKuyrugu'
import { dinamikFiyatHesapla } from '@/lib/fiyatlandirmaMotoru'

// GET: Twilio webhook doğrulama
export async function GET() {
    return NextResponse.json({ status: 'ok' })
}

/**
 * POST: Gelen WhatsApp mesajları — ASENKRON (Faz 44)
 *
 * Eski: runAdkOrchestrator() senkron bekleme (Twilio 15sn timeout riski)
 * Yeni: Kuyruğa ekle → anında TwiML boş yanıt → Worker arka planda işler
 */
export async function POST(request: Request) {
    try {
        // Rate limit — IP başına dakikada kontrol
        const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
        const rl = rateLimitCheck(`wa_ip:${clientIp}`, 'webhook')
        if (!rl.allowed) {
            return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
        }

        const form = await request.formData()
        const mesajBody = (form.get('Body') as string) || ''
        const fromRaw = (form.get('From') as string) || ''
        const numMedia = parseInt((form.get('NumMedia') as string) || '0', 10)
        const mediaUrl = numMedia > 0 ? (form.get('MediaUrl0') as string) : null
        const mimeType = numMedia > 0 ? (form.get('MediaContentType0') as string) : null

        const telefon = fromRaw.replace('whatsapp:', '')

        if (!telefon) {
            return NextResponse.json({ error: 'Geçersiz istek' }, { status: 400 })
        }

        // Kara liste kontrolü
        const karalistede = await karalisteKontrol(telefon)
        if (karalistede) {
            return new Response(
                `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
                { headers: { 'Content-Type': 'text/xml' } }
            )
        }

        // HAYIR/İPTAL → Karaliste
        const iptalKelimeleri = ['HAYIR', 'İPTAL', 'DURDURUN', 'STOP', 'UNSUBSCRIBE']
        if (iptalKelimeleri.some((k) => mesajBody.toUpperCase().includes(k))) {
            await karalisteEkle(telefon, `Kullanıcı isteği: ${mesajBody}`)
            await logAgentAction({
                agentId: 'whatsapp_webhook',
                actionType: 'WHATSAPP_OPTOUT',
                description: `${telefon} karaliste eklendi`,
                metadata: { telefon, mesaj: mesajBody },
            })
            return new Response(
                `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Talebiniz alındı. Numaranız iletişim listemizden çıkarıldı.</Message></Response>`,
                { headers: { 'Content-Type': 'text/xml' } }
            )
        }

        // Firestore'dan esnaf bul
        const esnaf = await getEsnafByPhone(telefon)
        const esnafId = esnaf?.id || null

        // Kota kontrolü (esnaf yoksa atla)
        if (esnafId) {
            const kota = await kotaKontrol(esnafId)
            if (!kota.izinVar) {
                return new Response(
                    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${kota.upsellMesaji}</Message></Response>`,
                    { headers: { 'Content-Type': 'text/xml' } }
                )
            }
        }

        // ── ASENKRON: Kuyruğa ekle ve anında dön ──
        const sessionId = `wa_${telefon.replace(/\D/g, '')}`
        let contextStr = ''

        if (esnaf && esnafId) {
            const dinamikFiyatStrateji = await dinamikFiyatHesapla(esnafId)
            contextStr = `[Esnaf: ${esnaf.isletmeAdi || esnaf.ad}, Sektor: ${esnaf.sektor}, Fiyat Listesi: "${esnaf.istatistik?.fiyatListesi || 'Belirtilmedi'}"]
${dinamikFiyatStrateji.sistemTalimati}
`
        }

        await kuyruğaEkle({
            tip: 'whatsapp',
            esnafId,
            payload: {
                telefon,
                mesaj: mesajBody,
                mediaUrl,
                mimeType,
                sessionId,
                context: contextStr,
            },
        })

        // Firestore log
        await adminDb.collection('agent_logs').add({
            ajan: 'whatsapp_webhook',
            esnafId,
            tip: 'mesaj_kuyruga_eklendi',
            input: { telefon, mesaj: mesajBody },
            output: { durum: 'kuyrukta' },
            basari: true,
            hata: null,
            zaman: new Date(),
            kanal: 'whatsapp',
        })

        // Boş TwiML yanıt — asıl yanıt worker tarafından gönderilecek
        return new Response(
            `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
            { headers: { 'Content-Type': 'text/xml' } }
        )
    } catch (error: any) {
        // console.error('[WA WEBHOOK HATA]', error)
        return new Response(
            `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Teknik bir sorun yaşıyoruz. Lütfen birazdan tekrar deneyin.</Message></Response>`,
            { headers: { 'Content-Type': 'text/xml' } }
        )
    }
}
