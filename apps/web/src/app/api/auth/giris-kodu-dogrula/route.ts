import { NextResponse } from 'next/server'
import { otpDogrula, canonicalOturumOlustur } from '@/lib/sessionManager'
import {
  findUniqueActiveTenantByPhone,
  normalizeLoginPhone,
} from '@/lib/auth/legacyAccountResolver'
import { issueCanonicalHumanSession } from '@/lib/auth/humanAuthService'

export async function POST(req: Request) {
  try {
    const { telefon, kod } = await req.json()
    if (!telefon || !kod) {
      return NextResponse.json({ error: 'Telefon ve kod gerekli' }, { status: 400 })
    }

    const temizTelefon = normalizeLoginPhone(String(telefon))
    if (temizTelefon.length < 10) {
      return NextResponse.json({ error: 'Kod hatalı veya süresi dolmuş' }, { status: 400 })
    }

    const gecerli = await otpDogrula(temizTelefon, String(kod))
    if (!gecerli) {
      return NextResponse.json({ error: 'Kod hatalı veya süresi dolmuş' }, { status: 400 })
    }

    // OTP doğrulandıktan sonra hesap tekrar çözülür. Telefon artık tek ve aktif
    // bir tenant'a bağlı değilse eski limit(1) davranışıyla rastgele seçim yok.
    const account = await findUniqueActiveTenantByPhone(temizTelefon)
    if (account.kind !== 'unique') {
      return NextResponse.json({ error: 'Hesap doğrulanamadı' }, { status: 409 })
    }

    const issued = await issueCanonicalHumanSession({
      tenantId: account.account.tenantId,
      provider: 'phone',
      subject: temizTelefon,
      authMethod: 'phone_otp',
    })

    // Response shape korunur; yetki kaynağı artık durable canonical Session'dır.
    const response = NextResponse.json({ esnafId: account.account.tenantId })
    await canonicalOturumOlustur(issued.session, response)
    return response
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
