// MOCK IMPLEMENTATION OF TRENDYOL API
import { adminDb } from '@/lib/firebaseAdmin'

// Belirli bir sürede (örneğin 10 saniye) maksimum istek limitini aşmamak için 
// kuyruk (Queue) tutan ve Bulk istek yapan asenkron işleyici örneği
const rateLimiter = {
    maxRequests: 50,
    timeWindowMs: 10000,
    currentRequests: 0,
    lastReset: Date.now()
}

export async function handleRpc(method: string, params: any) {
    // Basic Auth Check & Limit
    if (Date.now() - rateLimiter.lastReset > rateLimiter.timeWindowMs) {
        rateLimiter.currentRequests = 0
        rateLimiter.lastReset = Date.now()
    }

    if (rateLimiter.currentRequests >= rateLimiter.maxRequests) {
        throw new Error('Trendyol API 429: Too Many Requests. Lütfen 10 saniye bekleyin veya Bulk Endpoint\'i kullanın.')
    }

    rateLimiter.currentRequests++

    if (method === 'sync_inventory') {
        const { esnafId, saticiId, urunListesi } = params

        // Trendyol Basic Auth Headers
        const headers = {
            'Authorization': 'Basic MOCKED_TOKEN_HOLDER',
            'User-Agent': `${saticiId} - KepenkAI`
        }

        console.log(`[Trendyol API] ${esnafId} için ${urunListesi.length} ürün stok-fiyat senkronizasyonu yapılıyor...`)

        // Veritabanına Log At - Agent UI'da gözüksün diye
        await adminDb.collection('agent_logs').add({
            esnafId,
            ajan: 'trendyol_agent',
            baslik: 'Trendyol Stok Senkronizasyonu',
            mesaj: `${urunListesi.length} adet ürün Trendyol pazar yerine aktarıldı/güncellendi.`,
            zaman: new Date(),
            kanal: 'trendyol_api'
        })

        return {
            status: 'success',
            batchId: `tr-${Date.now()}`,
            message: 'Stoklar Trendyol\'a iletildi.'
        }
    }

    if (method === 'fetch_orders') {
        return {
            status: 'success',
            orders: [
                { id: '1001', musteri: 'Ayşe T.', tutar: 450, kargo: 'Aras Kargo' }
            ]
        }
    }

    throw new Error(`Method [${method}] not found in TrendyolAgent`)
}
