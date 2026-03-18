/**
 * Contact Labels API — Assign/Remove labels
 * ───────────────────────────────────────────
 * POST   /contacts/[id]/labels — Assign label
 * DELETE /contacts/[id]/labels — Remove label
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

interface RouteParams { params: Promise<{ id: string }> }

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    if (!body.labelId) return NextResponse.json({ error: 'labelId gerekli' }, { status: 400 })

    const contactRef = adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(id)
    const doc = await contactRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 })

    const currentLabels: string[] = doc.data()?.labelIds || []
    if (currentLabels.length >= 50) {
      return NextResponse.json({ error: 'Müşteriye en fazla 50 etiket atanabilir' }, { status: 422 })
    }
    if (currentLabels.includes(body.labelId)) {
      return NextResponse.json({ ok: true, mesaj: 'Etiket zaten atanmış' })
    }

    await contactRef.update({
      labelIds: [...currentLabels, body.labelId],
      updatedAt: new Date().toISOString(),
    })

    // Update label contact count
    const labelRef = adminDb.collection('esnaflar').doc(esnafId).collection('labels').doc(body.labelId)
    const labelDoc = await labelRef.get()
    if (labelDoc.exists) {
      await labelRef.update({ contactCount: (labelDoc.data()?.contactCount || 0) + 1 })
    }

    // Log activity
    await adminDb.collection('esnaflar').doc(esnafId).collection('contact_activities').add({
      contactId: id, esnafId, type: 'label.added',
      data: { labelId: body.labelId },
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Etiket atanamadı', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    if (!body.labelId) return NextResponse.json({ error: 'labelId gerekli' }, { status: 400 })

    const contactRef = adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(id)
    const doc = await contactRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 })

    const currentLabels: string[] = doc.data()?.labelIds || []
    await contactRef.update({
      labelIds: currentLabels.filter(l => l !== body.labelId),
      updatedAt: new Date().toISOString(),
    })

    // Update label contact count
    const labelRef = adminDb.collection('esnaflar').doc(esnafId).collection('labels').doc(body.labelId)
    const labelDoc = await labelRef.get()
    if (labelDoc.exists) {
      await labelRef.update({ contactCount: Math.max(0, (labelDoc.data()?.contactCount || 0) - 1) })
    }

    // Log activity
    await adminDb.collection('esnaflar').doc(esnafId).collection('contact_activities').add({
      contactId: id, esnafId, type: 'label.removed',
      data: { labelId: body.labelId },
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Etiket kaldırılamadı', detay: error.message }, { status: 500 })
  }
}
