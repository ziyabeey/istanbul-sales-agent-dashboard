/**
 * Modül senkronizasyon API
 * Editor'dan modül toggle yapıldığında aktifWebModulleri'ni günceller
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const { moduller } = await request.json()

    if (!Array.isArray(moduller)) {
      return NextResponse.json({ error: 'moduller array olmalı' }, { status: 400 })
    }

    // Update both aktifWebModulleri and siteJson.moduller
    await adminDb.collection('esnaflar').doc(esnafId).update({
      aktifWebModulleri: moduller,
      'siteJson.moduller': moduller,
      sonGuncelleme: Timestamp.now(),
    })

    return NextResponse.json({ ok: true, mesaj: 'Modüller senkronize edildi' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
