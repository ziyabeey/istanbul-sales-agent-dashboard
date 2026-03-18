import { NextResponse } from 'next/server'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET() {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) {
      return NextResponse.json({ error: 'Oturum bulunamadı' }, { status: 401 })
    }

    if (!adminDb) {
      return NextResponse.json({ esnafId })
    }

    const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
    if (!doc.exists) {
      return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
    }

    const data = doc.data()!
    return NextResponse.json({
      esnafId,
      ad: data.ad || '',
      paket: data.paket || 'TEMEL',
      sektor: data.sektor || '',
      durum: data.durum || 'aktif',
    })
  } catch (error: any) {
    // console.error('[AUTH ME]', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
