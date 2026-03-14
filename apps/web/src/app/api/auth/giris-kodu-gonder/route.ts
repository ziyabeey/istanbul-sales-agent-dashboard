import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { otpGonderNetgsm } from '@/lib/netgsmClient'
import { otpKaydet, otpRateKontrol } from '@/lib/sessionManager'

export async function POST(req: Request) {
  try {
    const { telefon } = await req.json()
    if (!telefon) {
      return NextResponse.json({ error: 'Telefon numarası gerekli' }, { status: 400 })
    }

    const temizTelefon = telefon.replace(/[^0-9]/g, '')
    if (temizTelefon.length < 10) {
      return NextResponse.json({ error: 'Geçersiz telefon numarası' }, { status: 400 })
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Veritabanı bağlantısı kurulamadı' }, { status: 500 })
    }

    // Firestore'da bu telefon var mı?
    const sorgu = await adminDb
      .collection('esnaflar')
      .where('telefonTemiz', '==', temizTelefon)
      .where('durum', '==', 'aktif')
      .limit(1)
      .get()

    if (sorgu.empty) {
      return NextResponse.json(
        { error: 'Bu numarayla kayıtlı aktif hesap bulunamadı' },
        { status: 404 }
      )
    }

    const esnafDoc = sorgu.docs[0]
    const esnaf = esnafDoc.data()

    // Rate limit — Firestore'daki son OTP kaydı kontrolü (60sn)
    const rateOk = await otpRateKontrol(temizTelefon)
    if (!rateOk) {
      return NextResponse.json({ error: '60 saniye bekleyiniz' }, { status: 429 })
    }

    // 6 haneli OTP üret
    const kod = Math.floor(100000 + Math.random() * 900000).toString()

    // Firestore'a kaydet (3dk TTL)
    await otpKaydet(temizTelefon, kod)

    // SMS ile gönder (NetGSM)
    const smsBasari = await otpGonderNetgsm(temizTelefon, kod)
    if (!smsBasari) {
      // OTP'yi Firestore'dan sil
      await adminDb.collection('otp_sessions').doc(temizTelefon).delete()
      return NextResponse.json({ error: 'SMS gönderilemedi, tekrar deneyin' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, ad: esnaf.ad || '' })
  } catch (error: any) {
    console.error('[GİRİŞ KODU GÖNDER]', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
