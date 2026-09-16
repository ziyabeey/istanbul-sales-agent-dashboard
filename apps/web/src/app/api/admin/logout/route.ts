import { NextResponse } from 'next/server'
import {
    ADMIN_SESSION_COOKIE,
    readAdminSessionToken,
    revokeAdminSessionToken,
} from '@/lib/auth/adminSession'
import { isSameOriginMutation } from '@/lib/apiGuard'

function clearAdminCookies(response: NextResponse) {
    const secure = process.env.NODE_ENV === 'production'

    response.cookies.set(ADMIN_SESSION_COOKIE, '', {
        httpOnly: true,
        secure,
        maxAge: 0,
        sameSite: 'strict',
        path: '/',
    })
    response.cookies.set('admin_token', '', {
        httpOnly: true,
        secure,
        maxAge: 0,
        sameSite: 'strict',
        path: '/',
    })
}

export async function POST(request: Request) {
    if (!isSameOriginMutation(request)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const token = readAdminSessionToken(request)

    if (token) {
        try {
            await revokeAdminSessionToken(token)
        } catch {
            return NextResponse.json(
                { error: 'Admin oturumu iptal edilemedi' },
                { status: 503 }
            )
        }
    }

    const response = NextResponse.json({ ok: true })
    clearAdminCookies(response)
    return response
}
