/**
 * Single Automation API
 * ─────────────────────
 * GET    /api/v1/crm/automations/[id]
 * PUT    /api/v1/crm/automations/[id] — Update + activate/pause
 * DELETE /api/v1/crm/automations/[id]
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
    const doc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('automations').doc(id).get()

    if (!doc.exists) return NextResponse.json({ error: 'Otomasyon bulunamadı' }, { status: 404 })

    return NextResponse.json({ ok: true, automation: doc.data() })
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

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('automations').doc(id)
    const doc = await docRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Otomasyon bulunamadı' }, { status: 404 })

    await docRef.update({ ...body, updatedAt: new Date().toISOString() })
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    await adminDb.collection('esnaflar').doc(esnafId).collection('automations').doc(id).delete()
    return NextResponse.json({ ok: true, mesaj: 'Otomasyon silindi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Silme başarısız', detay: error.message }, { status: 500 })
  }
}
