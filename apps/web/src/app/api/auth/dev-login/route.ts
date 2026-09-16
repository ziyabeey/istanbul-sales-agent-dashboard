import crypto from 'node:crypto'
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumOlustur } from '@/lib/sessionManager'

function safeSecretEquals(presented: unknown, expected: string): boolean {
  if (typeof presented !== 'string') return false
  const left = Buffer.from(presented)
  const right = Buffer.from(expected)
  return left.length === right.length && crypto.timingSafeEqual(left, right)
}

/**
 * Explicit local/test-only login helper.
 * Production is permanently disabled by P0-08.
 */
export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_DEV_LOGIN !== 'true') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const { telefon, secret } = await req.json()
    const devLoginSecret = process.env.DEV_LOGIN_SECRET?.trim()

    if (!devLoginSecret || !safeSecretEquals(secret, devLoginSecret)) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 })
    }

    if (!telefon) {
      return NextResponse.json({ error: 'Telefon gerekli' }, { status: 400 })
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Veritabanı bağlantısı kurulamadı' }, { status: 500 })
    }

    const temizTelefon = telefon.replace(/[^0-9]/g, '')
    const sorgu = await adminDb
      .collection('esnaflar')
      .where('telefonTemiz', '==', temizTelefon)
      .limit(1)
      .get()

    let esnafId: string
    if (sorgu.empty) {
      if (process.env.ENABLE_DEV_LOGIN_FIXTURE_CREATE !== 'true') {
        return NextResponse.json({ error: 'Test hesabı bulunamadı' }, { status: 404 })
      }

      const yeniEsnaf = await adminDb.collection('esnaflar').add({
        ad: 'Test Esnaf',
        isletmeAdi: 'Kepenk Test İşletmesi',
        telefonTemiz: temizTelefon,
        telefon,
        email: 'test@kepenk.ai',
        sektor: 'berber',
        paket: 'buyume',
        durum: 'aktif',
        olusturmaZamani: new Date(),
        sonGiris: new Date(),
      })
      esnafId = yeniEsnaf.id
    } else {
      esnafId = sorgu.docs[0].id
      await adminDb.collection('esnaflar').doc(esnafId).update({
        sonGiris: new Date(),
      })
    }

    const response = NextResponse.json({
      esnafId,
      mesaj: 'Dev login başarılı',
    })
    await oturumOlustur(esnafId, response)
    return response
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Sunucu hatası'
    console.error('[DEV LOGIN]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
