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

        const rateOk = await otpRateKontrol(temizTelefon)
        if (!rateOk) {
            return NextResponse.json({ error: '60 saniye bekleyiniz' }, { status: 429 })
        }

        const kod = Math.floor(100000 + Math.random() * 900000).toString()

        let smsBasari = false
        try {
            const smsResult = await otpGonderNetgsm(temizTelefon, kod)
            smsBasari = smsResult.success
        } catch {
            smsBasari = false
        }

        // P0-08 hard cut: provider failure never creates a locally-verifiable bypass code.
        if (!smsBasari) {
            return NextResponse.json(
                { error: 'SMS servisi geçici olarak kullanılamıyor' },
                { status: 503 }
            )
        }

        await otpKaydet(temizTelefon, kod)
        return NextResponse.json({ ok: true })
    } catch {
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}
