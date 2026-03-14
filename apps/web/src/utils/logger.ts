import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

export type LogLevel = 'info' | 'warn' | 'error' | 'critical'

export async function logYaz(esnafId: string, level: LogLevel, baslik: string, detay: string) {
    // 1. Konsola her halükarda logla
    const prefix = `[${level.toUpperCase()}] Esnaf:${esnafId} | ${baslik}:`
    if (level === 'error' || level === 'critical') console.error(prefix, detay)
    else console.log(prefix, detay)

    // 2. Kritik/Hata durumlarında DB'ye uyarı (Bildirim) düş
    // Bu sayede esnaf /dashboard/bildirimler sayfasından kırmızı Toast görebilir
    if (level === 'error' || level === 'critical') {
        try {
            await adminDb.collection('esnafBildirimleri').add({
                esnafId,
                tip: level,
                baslik,
                detay,
                zaman: Timestamp.now(),
                okundu: false
            })
        } catch (e) {
            console.error('[LOGGER DB YAZMA HATASI]', e)
        }
    }
}

// Legacy Function (Faz 26 ve Öncesi Uyumluluk)
export function logAgentAction(params: { agentName?: string, agentId?: string, action?: string, actionType?: string, details?: any, description?: string, metadata?: any }) {
    console.log(`[AGENT:${params.agentName || params.agentId || 'Bonsai'}] ${params.action || params.actionType}`, params.details || params.description || '')
}

export default { logYaz, logAgentAction }
