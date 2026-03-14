/**
 * gcpAuthGuard.ts — Google Cloud OIDC Token Doğrulaması
 * ─────────────────────────────────────────────────────────────────────────────
 * Cloud Scheduler / Cloud Tasks'ın gönderdiği OIDC (OpenID Connect)
 * Bearer token'ını kriptografik olarak doğrular.
 * 
 * İsteğin gerçekten Google Cloud'dan geldiğini garanti eder.
 * Dışarıdan gelen sahte cron tetiklemelerini ENGELLER.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server'

const GOOGLE_TOKEN_INFO_URL = 'https://oauth2.googleapis.com/tokeninfo'
const GOOGLE_CERTS_URL = 'https://www.googleapis.com/oauth2/v3/certs'

// ── Geçerli servis hesabı e-postaları ──────────────────────────────────────
function getIzinliServisHesaplari(): string[] {
    const envHesaplar = process.env.GCP_ALLOWED_SERVICE_ACCOUNTS || ''
    const varsayilan = process.env.GCP_SERVICE_ACCOUNT_EMAIL || ''

    const hesaplar = new Set<string>()

    // Cloud Scheduler ve Cloud Tasks varsayılan servis hesabı
    if (varsayilan) hesaplar.add(varsayilan)

    // Env'den ek hesaplar (virgülle ayrılmış)
    envHesaplar.split(',').filter(Boolean).forEach(h => hesaplar.add(h.trim()))

    return Array.from(hesaplar)
}

/**
 * Google Cloud OIDC token doğrulaması.
 * Cloud Scheduler ve Cloud Tasks, isteklere otomatik OIDC token ekler.
 * Bu fonksiyon token'ın geçerli olduğunu ve doğru servis hesabından geldiğini kontrol eder.
 */
export async function gcpOidcDogrula(
    request: Request
): Promise<{ gecerli: boolean; email?: string; hata?: string }> {
    const authHeader = request.headers.get('authorization')

    if (!authHeader?.startsWith('Bearer ')) {
        return { gecerli: false, hata: 'Authorization header eksik veya geçersiz format' }
    }

    const token = authHeader.replace('Bearer ', '')

    try {
        // ── Google tokeninfo endpoint ile doğrula ───────────────────────────
        const res = await fetch(`${GOOGLE_TOKEN_INFO_URL}?id_token=${token}`, {
            signal: AbortSignal.timeout(5000),
        })

        if (!res.ok) {
            return { gecerli: false, hata: `Token doğrulama başarısız: HTTP ${res.status}` }
        }

        const payload = await res.json()

        // ── Audience kontrolü (kendi Cloud Run URL'imiz olmalı) ─────────────
        const expectedAudience = process.env.CLOUD_RUN_URL || process.env.NEXT_PUBLIC_APP_URL
        if (expectedAudience && payload.aud !== expectedAudience) {
            return {
                gecerli: false,
                hata: `Token audience uyuşmuyor. Beklenen: ${expectedAudience}, Gelen: ${payload.aud}`,
            }
        }

        // ── Service account kontrolü ────────────────────────────────────────
        const izinliHesaplar = getIzinliServisHesaplari()
        if (izinliHesaplar.length > 0 && !izinliHesaplar.includes(payload.email)) {
            return {
                gecerli: false,
                hata: `Yetkisiz servis hesabı: ${payload.email}`,
            }
        }

        // ── Token süresi kontrolü ───────────────────────────────────────────
        const now = Math.floor(Date.now() / 1000)
        if (payload.exp && Number(payload.exp) < now) {
            return { gecerli: false, hata: 'Token süresi dolmuş' }
        }

        return { gecerli: true, email: payload.email }
    } catch (error: any) {
        console.error('[GCP AUTH] Token doğrulama hatası:', error.message)
        return { gecerli: false, hata: `Token doğrulama exception: ${error.message}` }
    }
}

/**
 * API route güvenlik wrapper'ı.
 * Cron ve Cloud Tasks endpoint'lerinde kullanılır.
 * 
 * Önce GCP OIDC kontrol eder, başarısızsa CRON_SECRET fallback'e düşer.
 * (dev ortamında OIDC olmayacağı için fallback şart)
 */
export async function gcpGuard(
    request: Request
): Promise<{ ok: true } | { ok: false; response: NextResponse }> {
    // ── Development bypass ──────────────────────────────────────────────────
    if (process.env.NODE_ENV === 'development') {
        const secret =
            request.headers.get('x-cron-secret') ||
            request.headers.get('authorization')?.replace('Bearer ', '')

        if (secret === process.env.CRON_SECRET || secret === 'dev') {
            return { ok: true }
        }
    }

    // ── 1. GCP OIDC token doğrulaması (Production) ──────────────────────────
    const oidcSonuc = await gcpOidcDogrula(request)
    if (oidcSonuc.gecerli) {
        return { ok: true }
    }

    // ── 2. Fallback: CRON_SECRET (geçiş dönemi) ────────────────────────────
    const secret =
        request.headers.get('x-cron-secret') ||
        request.headers.get('authorization')?.replace('Bearer ', '')

    if (secret && secret === process.env.CRON_SECRET) {
        return { ok: true }
    }

    // ── 3. Her iki yöntem de başarısız ───────────────────────────────────────
    console.warn(`[GCP GUARD] ⛔ Yetkisiz cron/worker isteği: ${oidcSonuc.hata}`)
    return {
        ok: false,
        response: NextResponse.json(
            { error: 'Unauthorized — GCP OIDC token geçersiz', detay: oidcSonuc.hata },
            { status: 401 }
        ),
    }
}
