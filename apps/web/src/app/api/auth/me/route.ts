import { NextResponse } from 'next/server'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { adminDb } from '@/lib/firebaseAdmin'
import { DEMO_USER, isDemoSession } from '@/lib/demoMode'
import { demoBusiness } from '@/data/demoBusiness'
import { getActiveImpersonationFromRequest } from '@/lib/impersonation'

export async function GET(request: Request) {
  try {
    const impersonation = await getActiveImpersonationFromRequest(request)
    const esnafId = impersonation?.subject.id || await oturumDogrulaServer()
    if (!esnafId) {
      return NextResponse.json({ error: 'Oturum bulunamadı' }, { status: 401 })
    }

    if (isDemoSession(esnafId)) {
      return NextResponse.json({
        esnafId,
        isDemo: true,
        user: DEMO_USER,
        ad: demoBusiness.ad,
        paket: demoBusiness.paket,
        sektor: demoBusiness.sektor,
        durum: demoBusiness.durum,
      })
    }

    if (!adminDb) {
      return NextResponse.json({
        esnafId,
        ...(impersonation ? {
          impersonating: true,
          actingAdminId: impersonation.adminId,
          actingAsTargetId: impersonation.subject.id,
        } : {}),
      })
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
      ...(impersonation ? {
        impersonating: true,
        actingAdminId: impersonation.adminId,
        actingAsTargetId: impersonation.subject.id,
      } : {}),
    })
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
