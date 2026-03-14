import { adminDb } from '@/lib/firebaseAdmin'
import logger from '@/utils/logger'

// Vapi.ai API'sine yeni bir Voice Agent oluşturan ve Esnafa tahsis eden servis
export async function createVoiceAgentForEsnaf(esnafId: string): Promise<string | null> {
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    if (!esnafDoc.exists) return null

    const esnaf = esnafDoc.data()!
    const vapiToken = process.env.VAPI_API_KEY

    if (!vapiToken) {
        console.warn('VAPI_API_KEY eksik. Sesli asistan modülü çalışmayacak.')
        return null
    }

    // Telefon açılış cümlesi
    const firstMessage = `Merhaba, ${esnaf.isletmeAdi || esnaf.ad} dükkanına hoş geldiniz. Ben dükkanın yapay zeka asistanı Kepenk. Size nasıl yardımcı olabilirim?`

    // Vapi Prompt Yapısı (Sadece Randevu / Bilgi odaklı)
    const systemPrompt = `
Sen ${esnaf.isletmeAdi || esnaf.ad}'in telefona bakan zeki asistanısın. İşletmenin sektörü: ${esnaf.sektor}.
Amacın: İnsanların telefondaki sorularını (Fiyat, Adres, Hizmetler) cevaplamak ve randevu almak.
Asla bir yapay zeka olduğunu belli etme. Gerçek, dostane bir dükkan çalışanı gibi konuş.

İşletme Detayları:
Adres/İlçe: ${esnaf.ilce}
Hizmetler: ${(esnaf.hizmetler || []).join(', ')}
Randevu Alınabilecek Saatler: Sadece 09:00 - 18:00 arası (veya işletmenin belirttiği saatler).

Eğer müşteri randevu almak isterse adını, istediği hizmeti ve saatini tam al. 
Sonra "Randevunuzu hemen sistemi işliyorum. Şimdiden hoş geldiniz." de.

Müşteri kapattığında konuşma transkripti arka planda sisteme düşecek. Senin asıl görevin mükemmel bir diksiyonla telefonu yönetmek.
`

    try {
        const response = await fetch('https://api.vapi.ai/assistant', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${vapiToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `kepenk_agent_${esnafId}`,
                firstMessage,
                model: {
                    provider: 'openai', // veya anthropic
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: systemPrompt }
                    ]
                },
                voice: {
                    provider: '11labs',
                    voiceId: 'ErXwobaYiN019PkySvjV', // Örnek Türkçe Ses (Antoni / Rachel vs)
                    speed: 1.05
                },
                recordingEnabled: true,
                endCallFunctionEnabled: true
            })
        })

        if (!response.ok) {
            const err = await response.text()
            throw new Error(`Vapi Create Error: ${err}`)
        }

        const data = await response.json()
        const agentId = data.id

        // Esnafın dökümanına kaydet
        await adminDb.collection('esnaflar').doc(esnafId).update({
            vapiAgentId: agentId
        })

        await logger.logYaz(esnafId, 'info', 'Voice AI Kuruldu', `Kepenk.ai Vapi Sesli Asistanı (${agentId}) yayına alındı.`)

        return agentId
    } catch (e: any) {
        console.error('[VAPI YARATMA HATASI]', e)
        await logger.logYaz(esnafId, 'error', 'Voice AI Hatası', `Sesli asistan kurulamadı: ${e.message}`)
        return null
    }
}
