/**
 * circuitBreaker.ts — AI API Devre Kesici
 * ─────────────────────────────────────────────────────────────────────────────
 * 3-State Circuit Breaker:
 *   CLOSED  → Normal çalışma
 *   OPEN    → Devre kesik (5 dk) → Fallback mesaj döner
 *   HALF_OPEN → Test modu (1 istek geçirilir)
 * 
 * Tetikleme: 5 ardışık hata (429 rate-limit veya 5xx) → OPEN
 * Kurtarma:  5 dk sonra HALF_OPEN → 1 başarılı istek → CLOSED
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN'

interface CircuitConfig {
    hataEsigi: number       // Kaç ardışık hata → OPEN (varsayılan: 5)
    acikKalmaSuresiMs: number // OPEN durumda bekleme süresi (varsayılan: 5dk)
    ad: string              // Devre adı (log için)
}

interface CircuitData {
    state: CircuitState
    hataSayisi: number
    sonHataZamani: number
    sonBasariZamani: number
}

const DEFAULT_CONFIG: CircuitConfig = {
    hataEsigi: 5,
    acikKalmaSuresiMs: 5 * 60 * 1000, // 5 dakika
    ad: 'unknown',
}

// In-memory devre durumları
const circuits = new Map<string, CircuitData>()

function getCircuit(ad: string): CircuitData {
    if (!circuits.has(ad)) {
        circuits.set(ad, {
            state: 'CLOSED',
            hataSayisi: 0,
            sonHataZamani: 0,
            sonBasariZamani: Date.now(),
        })
    }
    return circuits.get(ad)!
}

/**
 * Devrenin mevcut durumunu kontrol eder.
 * OPEN ise fallback mesaj döner ve istek yapılmamalı.
 */
export function devreKontrol(ad: string, config?: Partial<CircuitConfig>): {
    izinVar: boolean
    durum: CircuitState
    fallbackMesaj?: string
} {
    const cfg = { ...DEFAULT_CONFIG, ...config, ad }
    const circuit = getCircuit(ad)

    // CLOSED → her zaman izin ver
    if (circuit.state === 'CLOSED') {
        return { izinVar: true, durum: 'CLOSED' }
    }

    // OPEN → süre doldu mu kontrol et
    if (circuit.state === 'OPEN') {
        const gecenSure = Date.now() - circuit.sonHataZamani
        if (gecenSure >= cfg.acikKalmaSuresiMs) {
            // HALF_OPEN'a geç — 1 test isteğine izin ver
            circuit.state = 'HALF_OPEN'
            console.log(`[CIRCUIT BREAKER] 🟡 ${ad} → HALF_OPEN (test modu)`)
            return { izinVar: true, durum: 'HALF_OPEN' }
        }

        // Hâlâ OPEN — blokla
        const kalanSn = Math.ceil((cfg.acikKalmaSuresiMs - gecenSure) / 1000)
        return {
            izinVar: false,
            durum: 'OPEN',
            fallbackMesaj: `Sistemde anlık yoğunluk var, işleminiz sıraya alındı. Tahmini bekleme: ${kalanSn}sn`,
        }
    }

    // HALF_OPEN → test isteğine izin ver
    return { izinVar: true, durum: 'HALF_OPEN' }
}

/**
 * Başarılı istek sonrası çağır → devreyi sağlıklı işaretle.
 */
export function devreBasarili(ad: string): void {
    const circuit = getCircuit(ad)
    
    if (circuit.state === 'HALF_OPEN') {
        console.log(`[CIRCUIT BREAKER] 🟢 ${ad} → CLOSED (kurtarıldı)`)
    }

    circuit.state = 'CLOSED'
    circuit.hataSayisi = 0
    circuit.sonBasariZamani = Date.now()
}

/**
 * Hatalı istek sonrası çağır → ardışık hata sayacını artır.
 * Eşik aşılırsa OPEN durumuna geçer.
 */
export function devreHata(ad: string, config?: Partial<CircuitConfig>): void {
    const cfg = { ...DEFAULT_CONFIG, ...config, ad }
    const circuit = getCircuit(ad)

    circuit.hataSayisi++
    circuit.sonHataZamani = Date.now()

    // HALF_OPEN'da hata → tekrar OPEN
    if (circuit.state === 'HALF_OPEN') {
        circuit.state = 'OPEN'
        console.log(`[CIRCUIT BREAKER] 🔴 ${ad} → OPEN (HALF_OPEN test başarısız)`)
        return
    }

    // Eşik aşıldı → OPEN
    if (circuit.hataSayisi >= cfg.hataEsigi) {
        circuit.state = 'OPEN'
        console.log(`[CIRCUIT BREAKER] 🔴 ${ad} → OPEN (${circuit.hataSayisi} ardışık hata)`)
    }
}

/**
 * Belirli HTTP status kodlarının circuit breaker tetikleyip tetiklemeyeceğini kontrol eder.
 */
export function circuitBreakerHatasiMi(statusCode: number): boolean {
    return statusCode === 429 || statusCode >= 500
}

/**
 * Tüm devrelerin durumunu döner (monitoring/dashboard için).
 */
export function devreleriListele(): Record<string, { state: CircuitState; hataSayisi: number }> {
    const sonuc: Record<string, { state: CircuitState; hataSayisi: number }> = {}
    for (const [ad, data] of circuits.entries()) {
        sonuc[ad] = { state: data.state, hataSayisi: data.hataSayisi }
    }
    return sonuc
}
