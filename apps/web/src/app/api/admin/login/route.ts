import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    const { sifre } = await request.json()

    if (sifre !== process.env.ADMIN_SECRET_TOKEN) {
        return NextResponse.json({ error: 'Hatalı şifre' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set('admin_token', process.env.ADMIN_SECRET_TOKEN!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,  // 7 gün
        sameSite: 'strict',
        path: '/',
    })

    return NextResponse.json({ ok: true })
}
