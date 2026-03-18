import { NextResponse, NextRequest } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { FieldValue } from 'firebase-admin/firestore'
import { telegramGonder } from '@/lib/telegram'
import { oncelikBelirle } from '@/data/destekTalepConfig'

// POST — Create new ticket
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { ad, eposta, telefon, konu, aciklama, kategori } = body

    // Validation
    if (!ad || !eposta || !konu || !aciklama || !kategori) {
      return NextResponse.json({ ok: false, hata: 'Ad, e-posta, konu, açıklama ve kategori zorunludur.' }, { status: 400 })
    }
    if (konu.length < 5) {
      return NextResponse.json({ ok: false, hata: 'Konu en az 5 karakter olmalıdır.' }, { status: 400 })
    }
    if (aciklama.length < 20) {
      return NextResponse.json({ ok: false, hata: 'Açıklama en az 20 karakter olmalıdır.' }, { status: 400 })
    }

    // Generate reference
    const referans = 'KPNK-' + crypto.randomUUID().slice(0, 4).toUpperCase()

    // Auto-detect priority
    const oncelik = oncelikBelirle(konu, aciklama)

    // Optional: extract esnafId from session cookie
    let esnafId: string | undefined
    const sessionCookie = req.cookies.get('kepenk_session')?.value
    if (sessionCookie) {
      try {
        const payload = JSON.parse(atob(sessionCookie.split('.')[1]))
        esnafId = payload.esnafId || payload.sub
      } catch { /* ignore invalid session */ }
    }

    const docRef = adminDb.collection('destek_talepler').doc()
    await docRef.set({
      referans,
      ad,
      eposta,
      telefon: telefon || null,
      esnafId: esnafId || null,
      konu,
      aciklama,
      kategori,
      oncelik,
      durum: 'open',
      mesajlar: [],
      olusturma: FieldValue.serverTimestamp(),
      guncelleme: FieldValue.serverTimestamp(),
    })

    // Telegram notification
    try {
      await telegramGonder(
        `🎫 Yeni Destek Talebi!\n` +
        `Referans: ${referans}\n` +
        `Ad: ${ad}\n` +
        `Kategori: ${kategori}\n` +
        `Öncelik: ${oncelik}\n` +
        `Konu: ${konu}\n` +
        `---\n${aciklama.slice(0, 200)}`
      )
    } catch { /* Telegram failure should not block ticket creation */ }

    return NextResponse.json({ ok: true, referans })
  } catch (err) {
    console.error('[destek/talep] POST error:', err)
    return NextResponse.json({ ok: false, hata: 'Bir hata oluştu.' }, { status: 500 })
  }
}

// GET — List tickets by email
export async function GET(req: NextRequest) {
  try {
    const eposta = req.nextUrl.searchParams.get('eposta')
    if (!eposta) {
      return NextResponse.json({ ok: false, hata: 'E-posta parametresi gereklidir.' }, { status: 400 })
    }

    const snapshot = await adminDb
      .collection('destek_talepler')
      .where('eposta', '==', eposta)
      .orderBy('olusturma', 'desc')
      .limit(20)
      .get()

    const talepler = snapshot.docs.map((doc) => {
      const d = doc.data()
      return {
        id: doc.id,
        referans: d.referans,
        konu: d.konu,
        kategori: d.kategori,
        durum: d.durum,
        oncelik: d.oncelik,
        olusturma: d.olusturma?.toDate?.()?.toISOString() || null,
      }
    })

    return NextResponse.json({ ok: true, talepler })
  } catch (err) {
    console.error('[destek/talep] GET error:', err)
    return NextResponse.json({ ok: false, hata: 'Bir hata oluştu.' }, { status: 500 })
  }
}
