import { NextResponse } from 'next/server'
import { otpDogrula } from '@/lib/sessionManager'

export async function POST(req: Request) {
    try {
        const { telefon, kod } = await req.json()
        if (!telefon || !kod) {
            return NextResponse.json({ error: 'Telefon ve kod gerekli' }, { status: 400 })
        }

        const temizTelefon = telefon.replace(/[^0-9]/g, '').replace(/^0/, '')

        // Firestore OTP doğrulama (3dk TTL, otomatik silme)
        const gecerli = await otpDogrula(temizTelefon, kod.trim())
        if (!gecerli) {
            return NextResponse.json({ error: 'Kod hatalı veya süresi dolmuş' }, { status: 400 })
        }

        return NextResponse.json({ ok: true })
    } catch (error: any) {
        console.error('[ONBOARDING OTP DOĞRULA]', error)
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}
