/**
 * fetchWithRetry.ts — Exponential Backoff + DLQ Fallback
 * ─────────────────────────────────────────────────────────────────────────────
 * 3 deneme: 1s → 2s → 4s (exponential backoff)
 * 3. başarısızlıkta → DLQ'ya kaydet, exception fırlatma
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { deadLetterKaydet, DLQOncelik } from '@/lib/alertLogger'

interface RetryConfig {
    maxDeneme: number        // Varsayılan: 3
    baslangicBeklemeMs: number  // Varsayılan: 1000 (1sn)
    carpan: number           // Varsayılan: 2 (exponential)
    islem: string            // DLQ için işlem adı
    kaynak: string           // DLQ için kaynak dosya
    oncelik: DLQOncelik      // DLQ öncelik seviyesi
    retryStatusKodlari?: number[] // Hangi HTTP status'lerde retry yapılır
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxDeneme: 3,
    baslangicBeklemeMs: 1000,
    carpan: 2,
    islem: 'bilinmeyen',
    kaynak: 'bilinmeyen',
    oncelik: 'yuksek',
    retryStatusKodlari: [429, 500, 502, 503, 504],
}

function bekle(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * fetch() wrapper — exponential backoff ile retry.
 * 3 başarısızlıktan sonra DLQ'ya kayıt + null döner (exception fırlatmaz).
 */
export async function fetchWithRetry(
    url: string,
    options: RequestInit = {},
    config?: Partial<RetryConfig>
): Promise<Response | null> {
    const cfg = { ...DEFAULT_RETRY_CONFIG, ...config }
    let sonHata: Error | null = null
    let sonStatus = 0

    for (let deneme = 1; deneme <= cfg.maxDeneme; deneme++) {
        try {
            const res = await fetch(url, {
                ...options,
                signal: AbortSignal.timeout(30_000), // 30sn max timeout
            })

            // Başarılı veya retry yapılmayacak status
            if (res.ok || !cfg.retryStatusKodlari!.includes(res.status)) {
                return res
            }

            sonStatus = res.status
            sonHata = new Error(`HTTP ${res.status}: ${res.statusText}`)

            console.warn(
                `[RETRY] ⚠️ ${cfg.islem} deneme ${deneme}/${cfg.maxDeneme} başarısız (HTTP ${res.status})`
            )
        } catch (err: any) {
            sonHata = err
            console.warn(
                `[RETRY] ⚠️ ${cfg.islem} deneme ${deneme}/${cfg.maxDeneme} exception: ${err.message}`
            )
        }

        // Son denemeyse retry yapma
        if (deneme < cfg.maxDeneme) {
            const bekleme = cfg.baslangicBeklemeMs * Math.pow(cfg.carpan, deneme - 1)
            // Jitter ekle (%0-25 rastgele ek süre)
            const jitter = bekleme * Math.random() * 0.25
            console.log(`[RETRY] ⏳ ${Math.round(bekleme + jitter)}ms bekleniyor...`)
            await bekle(bekleme + jitter)
        }
    }

    // ═══ 3 DENEME DE BAŞARISIZ → DLQ'YA KAYDET ═══
    console.error(`[RETRY] ❌ ${cfg.islem} — ${cfg.maxDeneme} deneme de başarısız, DLQ'ya kaydediliyor`)

    await deadLetterKaydet({
        islem: cfg.islem,
        kaynak: cfg.kaynak,
        payload: {
            url,
            method: options.method || 'GET',
            body: typeof options.body === 'string' ? options.body.slice(0, 2000) : null,
        },
        hata: sonHata?.message || `HTTP ${sonStatus}`,
        hataSinifi: sonHata?.name || `HTTP_${sonStatus}`,
        denemeSayisi: cfg.maxDeneme,
        oncelik: cfg.oncelik,
    })

    return null
}

/**
 * Herhangi bir async fonksiyonu retry ile saran generic wrapper.
 * DLQ'ya payload bilgisi olarak fonksiyon adı ve argümanlar kaydedilir.
 */
export async function fnWithRetry<T>(
    fn: () => Promise<T>,
    config: Partial<RetryConfig> & { islem: string; kaynak: string }
): Promise<T | null> {
    const cfg = { ...DEFAULT_RETRY_CONFIG, ...config }
    let sonHata: Error | null = null

    for (let deneme = 1; deneme <= cfg.maxDeneme; deneme++) {
        try {
            const sonuc = await fn()
            return sonuc
        } catch (err: any) {
            sonHata = err
            console.warn(
                `[RETRY] ⚠️ ${cfg.islem} deneme ${deneme}/${cfg.maxDeneme}: ${err.message}`
            )

            if (deneme < cfg.maxDeneme) {
                const bekleme = cfg.baslangicBeklemeMs * Math.pow(cfg.carpan, deneme - 1)
                const jitter = bekleme * Math.random() * 0.25
                await bekle(bekleme + jitter)
            }
        }
    }

    // DLQ'ya kaydet
    await deadLetterKaydet({
        islem: cfg.islem,
        kaynak: cfg.kaynak,
        payload: { fonksiyon: cfg.islem },
        hata: sonHata?.message || 'Bilinmeyen hata',
        hataSinifi: sonHata?.name || 'Error',
        denemeSayisi: cfg.maxDeneme,
        oncelik: cfg.oncelik,
    })

    return null
}
