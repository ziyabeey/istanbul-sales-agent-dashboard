import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { otpDogrula, oturumOlustur } from '@/lib/sessionManager'

export async function POST(req: Request) {
  try {
    const { telefon, kod } = await req.json()
    if (!telefon || !kod) {
      return NextResponse.json({ error: 'Telefon ve kod gerekli' }, { status: 400 })
    }

    const temizTelefon = telefon.replace(/[^0-9]/g, '')

    // Firestore OTP doğrulama (3dk TTL, otomatik silme)
    const gecerli = await otpDogrula(temizTelefon, kod)
    if (!gecerli) {
      return NextResponse.json({ error: 'Kod hatalı veya süresi dolmuş' }, { status: 400 })
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Veritabanı bağlantısı kurulamadı' }, { status: 500 })
    }

    const sorgu = await adminDb
      .collection('esnaflar')
      .where('telefonTemiz', '==', temizTelefon)
      .limit(1)
      .get()

    if (sorgu.empty) {
      return NextResponse.json({ error: 'Hesap bulunamadı' }, { status: 404 })
    }

    const esnafId = sorgu.docs[0].id

    // JWT HttpOnly cookie oluştur (7 gün geçerli)
    const response = NextResponse.json({ esnafId })
    await oturumOlustur(esnafId, response)

    return response
  } catch (error: any) {
    console.error('[GİRİŞ KODU DOĞRULA]', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
