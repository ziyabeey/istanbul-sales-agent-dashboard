import { adminDb } from '@/lib/firebaseAdmin'

// MOCK Yemeksepeti Q-Commerce / Restaurant API Integration
// OAuth 2.0 ile çalışır, 2 saatte bir token yenileme mantığı barındırır.
export async function handleRpc(method: string, params: any) {
    if (method === 'refresh_oauth') {
        const { esnafId } = params

        // OAuth 2.0 Webhook call...
        console.log(`[YemeksepetiAgent] ${esnafId} için Bearer Token yenileniyor...`)

        return {
            status: 'success',
            newBearer: 'YS-BEARER-eyJhb...',
            expiresIn: 7200
        }
    }

    if (method === 'manage_catalog') {
        const { esnafId, urunler, token } = params

        console.log(`[YemeksepetiAgent] ${urunler.length} menü kalemi güncelleniyor.`)

        await adminDb.collection('agent_logs').add({
            esnafId,
            ajan: 'yemeksepeti_agent',
            baslik: 'Menü & Katalog Güncellemesi',
            mesaj: `Yemeksepeti'ndeki katalogunuz anlık olarak güncellendi. ${urunler.length} ürün senkronize edildi.`,
            zaman: new Date(),
            kanal: 'yemeksepeti_api'
        })

        return {
            status: 'success',
            message: 'Yemeksepeti Restoran/Market Kataloğu başarıyla güncellendi.'
        }
    }

    throw new Error(`Method [${method}] not found in YemeksepetiAgent`)
}
