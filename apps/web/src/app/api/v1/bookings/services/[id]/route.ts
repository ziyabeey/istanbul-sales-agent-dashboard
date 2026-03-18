/**
 * Service Detail API
 * ───────────────────
 * GET    /api/v1/bookings/services/[id]
 * PUT    /api/v1/bookings/services/[id]
 * DELETE /api/v1/bookings/services/[id]
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

interface RouteParams { params: Promise<{ id: string }> }

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    const { id } = await params

    const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('booking_services').doc(id).get()
    if (!doc.exists) return NextResponse.json({ error: 'Hizmet bulunamadı' }, { status: 404 })

    return NextResponse.json({ ok: true, service: { id: doc.id, ...doc.data() } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    const { id } = await params
    const body = await request.json()

    const ref = adminDb.collection('esnaflar').doc(esnafId).collection('booking_services').doc(id)
    const doc = await ref.get()
    if (!doc.exists) return NextResponse.json({ error: 'Hizmet bulunamadı' }, { status: 404 })

    await ref.update({ ...body, revision: (doc.data()!.revision || 0) + 1, updatedAt: new Date().toISOString() })
    return NextResponse.json({ ok: true, mesaj: 'Hizmet güncellendi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    const { id } = await params

    await adminDb.collection('esnaflar').doc(esnafId).collection('booking_services').doc(id).update({ status: 'archived', updatedAt: new Date().toISOString() })
    return NextResponse.json({ ok: true, mesaj: 'Hizmet arşivlendi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Silme başarısız', detay: error.message }, { status: 500 })
  }
}
