/**
 * AgentBase.ts — Tüm Ajanların Türeyeceği Abstract Sınıf
 * ─────────────────────────────────────────────────────────────────────────────
 * Lifecycle: execute() → 
 *   1. Kota kontrolü (kredi var mı?)  
 *   2. Ajan iş mantığı (calistir)
 *   3. Başarı logu + kredi düş
 *   4. Hata durumunda DLQ'ya kaydet
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { kotaKontrol } from '@/utils/quotaManager'
import { deadLetterKaydet } from '@/lib/alertLogger'
import { devreKontrol, devreBasarili, devreHata, circuitBreakerHatasiMi } from '@/lib/circuitBreaker'
import type { AjanContext } from './agentRunner'

const MAX_HOPS = 3

export interface AjanSonuc {
    basarili: boolean
    cikti: any
    hata?: string
    krediBitti?: boolean
    circuitOpen?: boolean
    maxHopsAsildi?: boolean
}

export abstract class AgentBase {
    /** Ajan benzersiz tanımlayıcı (ör: 'the_closer', 'lead_madencisi') */
    abstract readonly ajanAdi: string

    /** Ajan görüntü adı (ör: 'The Closer') */
    abstract readonly gorunenAd: string

    /** AI model tipi ('gemini' veya 'claude') */
    abstract readonly modelAilesi: 'gemini' | 'claude'

    /** Ajan kota gerektiriyor mu? (bazı internal ajanlar gerektirmez) */
    readonly kotaGerekli: boolean = true

    /**
     * Alt sınıflar bu metodu implement eder.
     * İş mantığı burada çalışır — AI çağrısı, veri işleme, vb.
     */
    protected abstract calistir(
        input: Record<string, any>,
        context: AjanContext
    ): Promise<any>

    /**
     * Ana giriş noktası — kota kontrolü, circuit breaker, max_hops
     * ve hata yönetimi ile sarılmış lifecycle.
     */
    async execute(
        input: Record<string, any>,
        context: AjanContext = {}
    ): Promise<AjanSonuc> {
        const esnafId = context.esnafId || input.esnafId
        const hopCount = context.hopCount ?? 0

        // ── 1. MAX HOPS KONTROLÜ ───────────────────────────────────────────
        if (hopCount >= MAX_HOPS) {
            console.error(`[AgentBase] ⛔ MAX_HOPS aşıldı: ${this.ajanAdi} (hop: ${hopCount})`)
            await this.logla(esnafId, input, null, false, 'MAX_HOPS_EXCEEDED')
            return {
                basarili: false,
                cikti: null,
                hata: 'Zincirleme işlem limiti aşıldı',
                maxHopsAsildi: true,
            }
        }

        // ── 2. CIRCUIT BREAKER KONTROLÜ ────────────────────────────────────
        const devreTipi = `${this.modelAilesi}_api`
        const devreSonuc = devreKontrol(devreTipi)
        if (!devreSonuc.izinVar) {
            console.warn(`[AgentBase] ⛔ Circuit OPEN: ${this.ajanAdi}`)
            return {
                basarili: false,
                cikti: null,
                hata: devreSonuc.fallbackMesaj || 'Sistemde anlık yoğunluk var',
                circuitOpen: true,
            }
        }

        // ── 3. KOTA KONTROLÜ ───────────────────────────────────────────────
        if (this.kotaGerekli && esnafId) {
            const kota = await kotaKontrol(esnafId)
            if (!kota.izinVar) {
                console.warn(`[AgentBase] 📊 Kredi bitti: ${esnafId} → ${this.ajanAdi}`)

                // Esnaf bildirimine "Krediniz bitti" uyarısı at
                await this.krediBittiBildirimi(esnafId, kota.upsellMesaji)

                return {
                    basarili: false,
                    cikti: null,
                    hata: kota.upsellMesaji || 'AI kredi hakkınız doldu',
                    krediBitti: true,
                }
            }
        }

        // ── 4. AJAN İŞ MANTIĞI ─────────────────────────────────────────────
        try {
            const cikti = await this.calistir(input, {
                ...context,
                hopCount: hopCount + 1, // Bir sonraki ajan için artır
            })

            // Circuit breaker: başarılı
            devreBasarili(devreTipi)

            // Log
            await this.logla(esnafId, input, cikti, true)

            return { basarili: true, cikti }
        } catch (error: any) {
            // Circuit breaker: hata sayacını artır
            const statusCode = error.status || error.statusCode || 500
            if (circuitBreakerHatasiMi(statusCode)) {
                devreHata(devreTipi)
            }

            console.error(`[AgentBase] ❌ ${this.ajanAdi} hata:`, error.message)

            // Hata logu
            await this.logla(esnafId, input, null, false, error.message)

            // DLQ'ya kaydet (kritik hatalar için)
            await deadLetterKaydet({
                islem: `agent_${this.ajanAdi}`,
                kaynak: 'AgentBase.execute',
                payload: { input, context: { ...context, hopCount } },
                hata: error.message,
                hataSinifi: error.name || 'AgentError',
                denemeSayisi: 1,
                oncelik: 'yuksek',
            })

            return {
                basarili: false,
                cikti: null,
                hata: error.message,
            }
        }
    }

    // ── Yardımcılar ────────────────────────────────────────────────────────

    private async krediBittiBildirimi(esnafId: string, mesaj?: string): Promise<void> {
        try {
            await adminDb
                .collection('esnaflar')
                .doc(esnafId)
                .collection('bildirimler')
                .add({
                    tip: 'kredi_bitti',
                    mesaj: mesaj || '📊 AI kredi hakkınız doldu. Paket yükseltme için fiyatlar sayfasını ziyaret edin.',
                    okundu: false,
                    zaman: Timestamp.now(),
                })
        } catch (err) {
            console.error('[AgentBase] Bildirim hatası:', err)
        }
    }

    private async logla(
        esnafId: string | undefined,
        input: Record<string, any>,
        output: any,
        basari: boolean,
        hata?: string
    ): Promise<void> {
        try {
            await adminDb.collection('agent_logs').add({
                ajan: this.ajanAdi,
                gorunenAd: this.gorunenAd,
                esnafId: esnafId || null,
                tip: input.action || 'genel',
                input,
                output,
                basari,
                hata: hata || null,
                zaman: new Date(),
                kanal: 'agent_base',
            })
        } catch { /* sessiz */ }
    }
}
