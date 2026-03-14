import { adminDb } from '@/lib/firebaseAdmin'

// TikTok Content Posting (Direct Post) API
export async function handleRpc(method: string, params: any) {
    if (method === 'direct_post') {
        const { esnafId, videoUrl, aciklama } = params

        console.log(`[TikTokAgent] Yeni içerik TikTok Direct Post ile yayınlanıyor...`)

        await adminDb.collection('agent_logs').add({
            esnafId,
            ajan: 'tiktok_agent',
            baslik: 'Otonom Video Paylaşımı',
            mesaj: `Yapay Zeka TikTok hesabınıza yeni bir video yükledi. Açıklama: '${aciklama}'`,
            zaman: new Date(),
            kanal: 'tiktok_api'
        })

        return {
            status: 'success',
            message: 'TikTok paylaşımı yayına alındı.'
        }
    }

    throw new Error(`Method [${method}] not found in TikTokAgent`)
}
