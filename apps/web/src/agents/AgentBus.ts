/**
 * AgentBus.ts — In-Memory Event Mediator
 * ─────────────────────────────────────────────────────────────────────────────
 * HTTP yerine RAM üzerinden ajan-ajan iletişimi.
 * /api/a2a HTTP gecikmesini ortadan kaldırır.
 * 
 * Özellikler:
 *   - EventEmitter tabanlı pub/sub
 *   - max_hops=3 sonsuz döngü koruması
 *   - Firestore fallback (cross-instance)
 *   - İşlem logları
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { EventEmitter } from 'events'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { runAgent, AjanContext } from '@/agents/agentRunner'
import { deadLetterKaydet } from '@/lib/alertLogger'

const MAX_HOPS = 3

// ── Singleton Event Bus ────────────────────────────────────────────────────

class AgentEventBus extends EventEmitter {
    private static instance: AgentEventBus | null = null

    private constructor() {
        super()
        this.setMaxListeners(50) // 19 ajan + buffer
    }

    static getInstance(): AgentEventBus {
        if (!AgentEventBus.instance) {
            AgentEventBus.instance = new AgentEventBus()
        }
        return AgentEventBus.instance
    }
}

const bus = AgentEventBus.getInstance()

// ── Tip tanımları ──────────────────────────────────────────────────────────

export interface BusMesaj {
    kaynakAjan: string
    hedefAjan: string
    payload: Record<string, any>
    context: AjanContext
    zaman: number
}

export interface BusSonuc {
    basarili: boolean
    cikti: any
    hata?: string
    hopCount: number
}

// ── Ana API ────────────────────────────────────────────────────────────────

/**
 * Bir ajandan başka bir ajana mesaj gönderir (RAM üzerinden).
 * HTTP gecikmesi SIFIR.
 * 
 * @param kaynakAjan - Gönderen ajan adı
 * @param hedefAjan - Hedef ajan adı (agentRunner'daki ajan adları)
 * @param payload - Ajana gönderilecek veri
 * @param context - Ajan bağlamı (esnafId, hopCount, vb.)
 */
export async function ajanMesajGonder(
    kaynakAjan: string,
    hedefAjan: string,
    payload: Record<string, any>,
    context: AjanContext = {}
): Promise<BusSonuc> {
    const hopCount = (context.hopCount ?? 0) + 1

    // ── MAX HOPS KONTROLÜ ──────────────────────────────────────────────
    if (hopCount > MAX_HOPS) {
        const hata = `[AgentBus] ⛔ max_hops aşıldı (${hopCount}/${MAX_HOPS}): ${kaynakAjan} → ${hedefAjan}`
        console.error(hata)

        // Log
        await logBusIslemi(kaynakAjan, hedefAjan, payload, null, false, hata)

        return {
            basarili: false,
            cikti: null,
            hata: `Zincirleme ajan limiti aşıldı (${kaynakAjan} → ${hedefAjan})`,
            hopCount,
        }
    }

    // ── AJAN ÇALIŞTIR (RAM üzerinden) ──────────────────────────────────
    try {
        console.log(`[AgentBus] 📡 ${kaynakAjan} → ${hedefAjan} (hop: ${hopCount}/${MAX_HOPS})`)

        const cikti = await runAgent(hedefAjan, payload, {
            ...context,
            tetikleyen: kaynakAjan,
            hopCount,
        })

        // Event emit (dinleyiciler varsa)
        bus.emit(`sonuc:${hedefAjan}`, { kaynakAjan, cikti, basarili: true })

        // Log
        await logBusIslemi(kaynakAjan, hedefAjan, payload, cikti, true)

        return { basarili: true, cikti, hopCount }
    } catch (error: any) {
        console.error(`[AgentBus] ❌ ${kaynakAjan} → ${hedefAjan} hata:`, error.message)

        // DLQ'ya kaydet
        await deadLetterKaydet({
            islem: `bus_${kaynakAjan}_to_${hedefAjan}`,
            kaynak: 'AgentBus.ajanMesajGonder',
            payload: { kaynakAjan, hedefAjan, payload, context },
            hata: error.message,
            hataSinifi: error.name || 'BusError',
            denemeSayisi: 1,
            oncelik: 'yuksek',
        })

        // Log
        await logBusIslemi(kaynakAjan, hedefAjan, payload, null, false, error.message)

        return {
            basarili: false,
            cikti: null,
            hata: error.message,
            hopCount,
        }
    }
}

/**
 * Ajan sonuçlarını dinle (pub/sub pattern).
 * Bir ajan başka ajanın sonucunu bekleyebilir.
 */
export function ajanSonucDinle(
    hedefAjan: string,
    handler: (data: { kaynakAjan: string; cikti: any; basarili: boolean }) => void
): () => void {
    const eventName = `sonuc:${hedefAjan}`
    bus.on(eventName, handler)

    // Cleanup fonksiyonu döner
    return () => bus.off(eventName, handler)
}

/**
 * Firestore üzerinden asenkron görev gönderimi (cross-instance).
 * Uzun süren veya farklı serverless instance'lar arası iletişim için.
 */
export async function ajanGorevKuyrugunaEkle(
    kaynakAjan: string,
    hedefAjan: string,
    payload: Record<string, any>,
    context: AjanContext = {}
): Promise<string> {
    const ref = await adminDb.collection('islem_kuyrugu').add({
        tip: 'agent_bus',
        durum: 'bekliyor',
        esnafId: context.esnafId || null,
        payload: {
            kaynakAjan,
            hedefAjan,
            mesaj: JSON.stringify(payload),
            context: JSON.stringify(context),
        },
        olusturma: new Date(),
        denemeSayisi: 0,
    })

    console.log(`[AgentBus] 📋 Kuyruk görevi oluşturuldu: ${kaynakAjan} → ${hedefAjan} (${ref.id})`)
    return ref.id
}

// ── Yardımcılar ────────────────────────────────────────────────────────────

async function logBusIslemi(
    kaynakAjan: string,
    hedefAjan: string,
    payload: Record<string, any>,
    cikti: any,
    basari: boolean,
    hata?: string
): Promise<void> {
    try {
        await adminDb.collection('agent_bus_logs').add({
            kaynakAjan,
            hedefAjan,
            payload: JSON.stringify(payload).slice(0, 2000),
            cikti: cikti ? JSON.stringify(cikti).slice(0, 2000) : null,
            basari,
            hata: hata || null,
            zaman: Timestamp.now(),
        })
    } catch { /* sessiz */ }
}
