import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

// Basit in-memory rate limiting (IP başına)
const loginAttempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 dakika

function rateLimitCheck(ip: string): boolean {
    const now = Date.now()
    const entry = loginAttempts.get(ip)

    if (!entry || now > entry.resetAt) {
        loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
        return true
    }

    if (entry.count >= MAX_ATTEMPTS) {
        return false
    }

    entry.count++
    return true
}

export async function POST(request: Request) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'

    if (!rateLimitCheck(ip)) {
        return NextResponse.json(
            { error: 'Çok fazla deneme. 15 dakika sonra tekrar deneyin.' },
            { status: 429 }
        )
    }

    const { sifre } = await request.json()
    const secret = process.env.ADMIN_SECRET_TOKEN

    if (!secret) {
        return NextResponse.json({ error: 'Sunucu yapılandırma hatası' }, { status: 500 })
    }

    // Timing-safe karşılaştırma
    const expected = Buffer.from(secret, 'utf8')
    const actual = Buffer.from(String(sifre || ''), 'utf8')

    if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
        return NextResponse.json({ error: 'Hatalı şifre' }, { status: 401 })
    }

    // Oturum token'ı oluştur (plaintext secret yerine HMAC hash)
    const sessionToken = crypto
        .createHmac('sha256', secret)
        .update(`admin-session-${Date.now()}`)
        .digest('hex')

    const cookieStore = await cookies()
    cookieStore.set('admin_token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,  // 7 gün
        sameSite: 'strict',
        path: '/',
    })

    // Session token'ı process-local Map'e kaydet (doğrulama için)
    if (!(global as any).ADMIN_SESSIONS) {
        (global as any).ADMIN_SESSIONS = new Map()
    }
    (global as any).ADMIN_SESSIONS.set(sessionToken, { createdAt: Date.now() })

    return NextResponse.json({ ok: true })
}
