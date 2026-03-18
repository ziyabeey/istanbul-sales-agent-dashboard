/**
 * Google OAuth 2.0 — Init (Başlatıcı)
 * ─────────────────────────────────────────────────────────────────────────────
 * Esnaf dashboard'unda "Google Hesabımı Bağla" tıklandığında çalışır.
 * Google Login URL'i üretir ve yönlendirir.
 *
 * Scope: business.manage (GMB yorum okuma/yanıtlama)
 * access_type=offline → refresh_token alınır (7/24 arka plan erişimi)
 * prompt=consent → Her seferinde izin ekranı (refresh_token garantisi)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import crypto from 'crypto'
import { oturumDogrula } from '@/lib/sessionManager'

const SCOPES = ['https://www.googleapis.com/auth/business.manage']

function getOAuth2Client() {
    return new google.auth.OAuth2(
        process.env.GOOGLE_OAUTH_CLIENT_ID,
        process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
    )
}

/**
 * CSRF korumalı state parametresi oluşturur.
 * Format: esnafId.hmacSignature
 */
function stateOlustur(esnafId: string): string {
    const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
    if (!secret) {
        throw new Error('GOOGLE_OAUTH_CLIENT_SECRET ortam değişkeni tanımlanmalıdır')
    }
    const hmac = crypto.createHmac('sha256', secret).update(esnafId).digest('hex')
    return `${esnafId}.${hmac}`
}

export async function GET(request: Request) {
    try {
        // Oturum kontrolü — sadece giriş yapmış esnaflar
        const esnafId = await oturumDogrula(request as any)
        if (!esnafId) {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
        }

        const oauth2Client = getOAuth2Client()

        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: SCOPES,
            state: stateOlustur(esnafId),
            include_granted_scopes: true,
        })

        // Google OAuth sayfasına yönlendir
        return NextResponse.redirect(authUrl)
    } catch (error: any) {
        // console.error('[GOOGLE OAUTH INIT] Hata:', error.message)
        return NextResponse.json(
            { error: 'OAuth başlatılamadı', detay: error.message },
            { status: 500 }
        )
    }
}
