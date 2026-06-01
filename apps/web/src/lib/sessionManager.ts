/**
 * Session Manager — JWT HttpOnly Cookie tabanlı oturum yönetimi
 * 
 * global.GECICI_KODLAR ve localStorage yerine:
 * - OTP: Firestore `otp_sessions` koleksiyonu (3dk TTL)
 * - Auth: HttpOnly Secure SameSite=Strict JWT cookie
 */

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const COOKIE_ADI = 'kepenk_session'
const JWT_SURE = '7d' // 7 gün geçerlilik
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 // 7 gün (saniye)
const DEV_SESSION_SECRET = 'kepenk-dev-secret-change-in-production-32ch'

function getSecret(): Uint8Array {
    const secret = process.env.SESSION_SECRET || DEV_SESSION_SECRET
    if (process.env.NODE_ENV === 'production' && secret === DEV_SESSION_SECRET) {
        throw new Error('SESSION_SECRET production ortamında zorunludur')
    }

    return new TextEncoder().encode(secret)
}

// ── JWT Oluştur ──────────────────────────────────────────────────────────────
export async function jwtOlustur(esnafId: string): Promise<string> {
    return new SignJWT({ esnafId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(JWT_SURE)
        .setIssuer('kepenk.ai')
        .sign(getSecret())
}

// ── JWT Doğrula ──────────────────────────────────────────────────────────────
export async function jwtDogrula(token: string): Promise<{ esnafId: string } | null> {
    try {
        const { payload } = await jwtVerify(token, getSecret(), { issuer: 'kepenk.ai' })
        return payload as unknown as { esnafId: string }
    } catch {
        return null
    }
}

// ── Oturum Oluştur (API route'lardan çağrılır) ───────────────────────────────
export async function oturumOlustur(esnafId: string, response: NextResponse): Promise<NextResponse> {
    const token = await jwtOlustur(esnafId)

    response.cookies.set(COOKIE_ADI, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
    })

    return response
}

// ── Oturum Doğrula (middleware + API route'lardan) ───────────────────────────
export async function oturumDogrula(req: NextRequest): Promise<string | null> {
    const token = req.cookies.get(COOKIE_ADI)?.value
    if (!token) return null

    const payload = await jwtDogrula(token)
    return payload?.esnafId ?? null
}

// ── Oturum Doğrula (Server Component / Route Handler — cookies() ile) ────────
export async function oturumDogrulaServer(): Promise<string | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_ADI)?.value
    if (!token) return null

    const payload = await jwtDogrula(token)
    return payload?.esnafId ?? null
}

// ── Oturum Sil ───────────────────────────────────────────────────────────────
export async function oturumSil(response: NextResponse): Promise<NextResponse> {
    response.cookies.set(COOKIE_ADI, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
    })
    return response
}

// ── Firestore OTP İşlemleri ──────────────────────────────────────────────────
const OTP_TTL_MS = 3 * 60 * 1000 // 3 dakika
const OTP_RATE_MS = 60 * 1000    // 60 saniye (gönderim arası minimum bekleme)

import { adminDb } from './firebaseAdmin'

export async function otpKaydet(telefon: string, kod: string): Promise<void> {
    await adminDb.collection('otp_sessions').doc(telefon).set({
        kod,
        telefon,
        olusturma: new Date(),
        sonKullanim: new Date(Date.now() + OTP_TTL_MS),
    })
}

export async function otpDogrula(telefon: string, kod: string): Promise<boolean> {
    const ref = adminDb.collection('otp_sessions').doc(telefon)
    const doc = await ref.get()

    if (!doc.exists) return false

    const data = doc.data()!
    const suruDoldu = new Date() > new Date(data.sonKullanim?.toDate?.() || data.sonKullanim)
    if (suruDoldu) {
        await ref.delete()
        return false
    }

    if (data.kod !== String(kod)) return false

    // Başarılı — OTP'yi sil
    await ref.delete()
    return true
}

export async function otpRateKontrol(telefon: string): Promise<boolean> {
    const doc = await adminDb.collection('otp_sessions').doc(telefon).get()

    if (!doc.exists) return true // Rate limit yok, gönderilebilir

    const data = doc.data()!
    const olusturma = data.olusturma?.toDate?.() || new Date(data.olusturma)
    return (Date.now() - olusturma.getTime()) >= OTP_RATE_MS
}

export { COOKIE_ADI }
