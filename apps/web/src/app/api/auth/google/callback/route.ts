/**
 * Google OAuth 2.0 — Callback (Token Takası)
 * ─────────────────────────────────────────────────────────────────────────────
 * Google'dan dönen yetki kodunu (code) → Access Token + Refresh Token'a çevirir.
 * Refresh token AES-256-GCM ile şifrelenerek Firestore'a kaydedilir.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import crypto from 'crypto'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { tokenSifrele } from '@/lib/tokenSifreleme'

function getOAuth2Client() {
    return new google.auth.OAuth2(
        process.env.GOOGLE_OAUTH_CLIENT_ID,
        process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
    )
}

/**
 * State parametresinin HMAC imzasını doğrular (CSRF koruması).
 */
function stateDogrula(state: string): string | null {
    const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || 'fallback-secret'
    const parts = state.split('.')
    if (parts.length !== 2) return null

    const [esnafId, signature] = parts
    const expectedSig = crypto.createHmac('sha256', secret).update(esnafId).digest('hex')

    // Timing-safe comparison to prevent timing attacks
    try {
        const sigBuffer = Buffer.from(signature, 'hex')
        const expectedBuffer = Buffer.from(expectedSig, 'hex')
        if (sigBuffer.length !== expectedBuffer.length) return null
        if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null
    } catch {
        return null
    }

    return esnafId
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const code = url.searchParams.get('code')
        const state = url.searchParams.get('state')
        const error = url.searchParams.get('error')

        // Google'dan hata döndüyse
        if (error) {
            console.error('[GOOGLE CALLBACK] OAuth hatası:', error)
            return NextResponse.redirect(
                new URL('/dashboard/sitem?gmb_error=denied', process.env.NEXT_PUBLIC_APP_URL!)
            )
        }

        if (!code || !state) {
            return NextResponse.redirect(
                new URL('/dashboard/sitem?gmb_error=missing_params', process.env.NEXT_PUBLIC_APP_URL!)
            )
        }

        // ── CSRF doğrulaması ────────────────────────────────────────────────
        const esnafId = stateDogrula(state)
        if (!esnafId) {
            console.error('[GOOGLE CALLBACK] Geçersiz state (CSRF)')
            return NextResponse.redirect(
                new URL('/dashboard/sitem?gmb_error=csrf', process.env.NEXT_PUBLIC_APP_URL!)
            )
        }

        // ── Code → Token takası ─────────────────────────────────────────────
        const oauth2Client = getOAuth2Client()
        const { tokens } = await oauth2Client.getToken(code)

        if (!tokens.refresh_token) {
            console.error('[GOOGLE CALLBACK] refresh_token alınamadı')
            return NextResponse.redirect(
                new URL('/dashboard/sitem?gmb_error=no_refresh', process.env.NEXT_PUBLIC_APP_URL!)
            )
        }

        // ── Refresh Token'ı AES-256-GCM ile şifrele ────────────────────────
        const sifreliRefreshToken = tokenSifrele(tokens.refresh_token)
        const sifreliAccessToken = tokens.access_token
            ? tokenSifrele(tokens.access_token)
            : null

        // ── Firestore'a kaydet ──────────────────────────────────────────────
        await adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('integrations')
            .doc('google_gmb')
            .set({
                refreshToken: sifreliRefreshToken,
                accessToken: sifreliAccessToken,
                tokenTipi: tokens.token_type || 'Bearer',
                scope: tokens.scope || '',
                sonGuncelleme: Timestamp.now(),
                baglanti: true,
                baglantiTarihi: Timestamp.now(),
                // Access token expiry (saniye → ms)
                accessTokenSonlanma: tokens.expiry_date
                    ? Timestamp.fromMillis(tokens.expiry_date)
                    : null,
            }, { merge: true })

        console.log(`[GOOGLE CALLBACK] ✅ ${esnafId} GMB bağlantısı başarılı`)

        // ── Dashboard'a yönlendir ───────────────────────────────────────────
        return NextResponse.redirect(
            new URL('/dashboard/sitem?gmb=success', process.env.NEXT_PUBLIC_APP_URL!)
        )
    } catch (error: any) {
        console.error('[GOOGLE CALLBACK] Hata:', error.message)
        return NextResponse.redirect(
            new URL('/dashboard/sitem?gmb_error=server', process.env.NEXT_PUBLIC_APP_URL!)
        )
    }
}
