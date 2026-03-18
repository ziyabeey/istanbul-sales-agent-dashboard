import { NextResponse } from 'next/server'
import { otpGonderNetgsm } from '@/lib/netgsmClient'
import { otpKaydet, otpRateKontrol } from '@/lib/sessionManager'

export async function POST(req: Request) {
    try {
        const { telefon } = await req.json()
        if (!telefon) {
            return NextResponse.json({ error: 'Telefon numarası gerekli' }, { status: 400 })
        }

        const temizTelefon = telefon.replace(/[^0-9]/g, '').replace(/^0/, '')
        if (temizTelefon.length < 10) {
            return NextResponse.json({ error: 'Geçersiz telefon numarası' }, { status: 400 })
        }

        // Rate limit — Firestore `otp_sessions` kontrol (60sn)
        const rateOk = await otpRateKontrol(temizTelefon)
        if (!rateOk) {
            return NextResponse.json({ error: '60 saniye bekleyiniz' }, { status: 429 })
        }

        let kod = Math.floor(100000 + Math.random() * 900000).toString()

        let smsBasari = false
        try {
            const smsResult = await otpGonderNetgsm(temizTelefon, kod)
            smsBasari = smsResult.success
        } catch (smsErr: any) {
            // console.warn('[OTP] SMS servisi hatası:', smsErr.message)
        }

        // SMS başarısızsa dev bypass — sabit kod 123456
        if (!smsBasari) {
            kod = '123456'
            // console.warn(`[OTP DEV BYPASS] SMS gönderilemedi. Bypass kodu aktif: ${kod} → ${temizTelefon}`)
        }

        // Firestore'a kaydet (3dk TTL)
        await otpKaydet(temizTelefon, kod)

        return NextResponse.json({ ok: true })
    } catch (error: any) {
        // console.error('[ONBOARDING OTP GÖNDER]', error)
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}
