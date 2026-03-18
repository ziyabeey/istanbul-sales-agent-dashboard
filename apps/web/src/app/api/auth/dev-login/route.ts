import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumOlustur } from '@/lib/sessionManager'

/**
 * DEV-ONLY: SMS bypass ile test hesabına giriş.
 * Production'da kaldırılacak veya ADMIN_SECRET_TOKEN ile korunacak.
 * 
 * POST /api/auth/dev-login
 * Body: { telefon: "05001234567", secret: "kepenk-admin-2026" }
 */
export async function POST(req: Request) {
  try {
    const { telefon, secret } = await req.json()

    // Güvenlik: sadece admin token ile çalışır
    const adminToken = process.env.ADMIN_SECRET_TOKEN || 'kepenk-admin-2026'
    if (secret !== adminToken) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 })
    }

    if (!telefon) {
      return NextResponse.json({ error: 'Telefon gerekli' }, { status: 400 })
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Veritabanı bağlantısı kurulamadı' }, { status: 500 })
    }

    const temizTelefon = telefon.replace(/[^0-9]/g, '')

    // Esnafı telefonla bul
    let esnafId: string
    const sorgu = await adminDb
      .collection('esnaflar')
      .where('telefonTemiz', '==', temizTelefon)
      .limit(1)
      .get()

    if (sorgu.empty) {
      // Yoksa oluştur (test hesabı)
      const yeniEsnaf = await adminDb.collection('esnaflar').add({
        ad: 'Test Esnaf',
        isletmeAdi: 'kepenk Test İşletmesi',
        telefonTemiz: temizTelefon,
        telefon: telefon,
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
      // Son giriş güncelle
      await adminDb.collection('esnaflar').doc(esnafId).update({
        sonGiris: new Date(),
      })
    }

    // JWT HttpOnly cookie oluştur
    const response = NextResponse.json({
      esnafId,
      mesaj: 'Dev login başarılı — dashboard\'a yönlendirin',
    })
    await oturumOlustur(esnafId, response)

    return response
  } catch (error: any) {
    console.error('[DEV LOGIN]', error)
    return NextResponse.json({ error: error.message || 'Sunucu hatası' }, { status: 500 })
  }
}
