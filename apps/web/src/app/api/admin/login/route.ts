import crypto from 'crypto'
import { NextResponse } from 'next/server'
import {
    ADMIN_SESSION_COOKIE,
    ADMIN_SESSION_TTL_SECONDS,
    issueAdminSession,
} from '@/lib/auth/adminSession'

// Basit in-memory rate limiting (IP başına). Session authority değildir.
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

    let sifre: unknown
    try {
        const body = await request.json()
        sifre = body?.sifre
    } catch {
        return NextResponse.json({ error: 'Geçersiz istek' }, { status: 400 })
    }

    const secret = process.env.ADMIN_SECRET_TOKEN
    if (!secret) {
        return NextResponse.json({ error: 'Sunucu yapılandırma hatası' }, { status: 500 })
    }

    // Compare fixed-length digests so secret length is not exposed by an early exit.
    const expected = crypto.createHash('sha256').update(secret, 'utf8').digest()
    const actual = crypto.createHash('sha256').update(String(sifre || ''), 'utf8').digest()

    if (!crypto.timingSafeEqual(expected, actual)) {
        return NextResponse.json({ error: 'Hatalı şifre' }, { status: 401 })
    }

    try {
        const { token, session } = await issueAdminSession()
        const response = NextResponse.json({ ok: true })

        response.cookies.set(ADMIN_SESSION_COOKIE, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: ADMIN_SESSION_TTL_SECONDS,
            expires: new Date(session.expiresAt),
            sameSite: 'strict',
            path: '/',
        })

        // Eski statik-secret cookie authority'sini kalıcı olarak söndür.
        response.cookies.set('admin_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0,
            sameSite: 'strict',
            path: '/',
        })

        return response
    } catch {
        return NextResponse.json(
            { error: 'Admin oturumu oluşturulamadı' },
            { status: 503 }
        )
    }
}
