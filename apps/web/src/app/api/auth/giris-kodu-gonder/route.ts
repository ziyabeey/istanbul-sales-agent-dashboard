import { NextResponse } from 'next/server'
import { otpGonderNetgsm } from '@/lib/netgsmClient'
import { otpKaydet, otpRateKontrol } from '@/lib/sessionManager'
import {
  findUniqueActiveTenantByPhone,
  normalizeLoginPhone,
} from '@/lib/auth/legacyAccountResolver'
import { adminDb } from '@/lib/firebaseAdmin'

const GENERIC_SUCCESS = { ok: true }

export async function POST(req: Request) {
  try {
    const { telefon } = await req.json()
    if (!telefon) {
      return NextResponse.json({ error: 'Telefon numarası gerekli' }, { status: 400 })
    }

    const temizTelefon = normalizeLoginPhone(String(telefon))
    if (temizTelefon.length < 10) {
      return NextResponse.json({ error: 'Geçersiz telefon numarası' }, { status: 400 })
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Veritabanı bağlantısı kurulamadı' }, { status: 500 })
    }

    // Account enumeration önleme: kayıt yoksa veya telefon birden fazla aktif
    // tenant'a bağlıysa aynı başarılı response dönülür ve OTP üretilmez.
    const account = await findUniqueActiveTenantByPhone(temizTelefon)
    if (account.kind !== 'unique') {
      return NextResponse.json(GENERIC_SUCCESS)
    }

    // Rate-limit bilgisi de hesabın varlığını dışarı sızdırmaz.
    const rateOk = await otpRateKontrol(temizTelefon)
    if (!rateOk) {
      return NextResponse.json(GENERIC_SUCCESS)
    }

    const kod = Math.floor(100000 + Math.random() * 900000).toString()
    await otpKaydet(temizTelefon, kod)

    const smsBasari = await otpGonderNetgsm(temizTelefon, kod)
    if (!smsBasari) {
      await adminDb.collection('otp_sessions').doc(temizTelefon).delete()
      // Provider outcome must not become an account-existence oracle.
      return NextResponse.json(GENERIC_SUCCESS)
    }

    return NextResponse.json(GENERIC_SUCCESS)
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
