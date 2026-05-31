import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { isDemoEsnafId, isDemoModeEnabled } from '@/lib/demoMode'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const esnafId = searchParams.get('esnafId')
    if (!esnafId) {
      return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
    }

    if (isDemoModeEnabled() && isDemoEsnafId(esnafId)) {
      return NextResponse.json([])
    }

    const snapshot = await adminDb
      .collection('musteriKonusmalar')
      .where('esnafId', '==', esnafId)
      .where('ajan', '==', 'vapi_voice')
      .orderBy('zaman', 'desc')
      .limit(50)
      .get()

    const aramalar = await Promise.all(
      snapshot.docs.map(async (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
        const data = doc.data()
        const musteriNumara: string = data.musteriNumara || 'Gizli Numara'

        // Özet çıkar: "[SESLİ ARAMA TRANSKRİPTİ]\nÖzet: ..." formatından
        const mesaj: string = data.mesaj || ''
        const ozetSatir = mesaj.split('\n').find((l: string) => l.startsWith('Özet:'))
        const ozet = ozetSatir ? ozetSatir.replace('Özet:', '').trim().slice(0, 200) : mesaj.slice(0, 200)

        // Bu aramayla ilgili randevu var mı?
        let randevuVar = false
        try {
          const randevuSnap = await adminDb
            .collection('randevular')
            .where('esnafId', '==', esnafId)
            .where('musteriNumara', '==', musteriNumara)
            .where('kaynak', '==', 'vapi_sesli_asistan')
            .limit(1)
            .get()
          randevuVar = !randevuSnap.empty
        } catch { }

        // Zaman formatla
        const zamanTs = data.zaman?.toDate ? data.zaman.toDate() : new Date()
        const zaman = zamanTs.toLocaleString('tr-TR', {
          timeZone: 'Europe/Istanbul',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })

        return { musteriNumara, zaman, ozet, randevuVar }
      })
    )

    return NextResponse.json(aramalar)
  } catch {
    // console.error('[Sesli Aramalar]')
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
