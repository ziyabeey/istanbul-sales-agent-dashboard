/**
 * Labels API — CRUD
 * ─────────────────
 * GET    /api/v1/crm/labels
 * POST   /api/v1/crm/labels
 * PUT    /api/v1/crm/labels
 * DELETE /api/v1/crm/labels
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const snapshot = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('labels')
      .orderBy('displayName', 'asc').get()

    const labels = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ ok: true, labels })
  } catch (error: any) {
    return NextResponse.json({ error: 'Etiketler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    if (!body.displayName) return NextResponse.json({ error: 'displayName gerekli' }, { status: 400 })

    // Check limit
    const existing = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('labels').count().get()
    if (existing.data().count >= 200) {
      return NextResponse.json({ error: 'Maksimum 200 etiket oluşturulabilir' }, { status: 422 })
    }

    const now = new Date().toISOString()
    const label = {
      esnafId,
      displayName: body.displayName,
      key: slugify(body.displayName),
      color: body.color || '#3b82f6',
      icon: body.icon || undefined,
      type: body.type || 'manual',
      autoRule: body.autoRule || undefined,
      contactCount: 0,
      createdAt: now,
      updatedAt: now,
    }

    const docRef = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('labels').add(label)

    return NextResponse.json({ ok: true, label: { id: docRef.id, ...label } }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Etiket oluşturulamadı', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('labels').doc(id)
    const doc = await docRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Etiket bulunamadı' }, { status: 404 })

    if (updates.displayName) updates.key = slugify(updates.displayName)
    updates.updatedAt = new Date().toISOString()

    await docRef.update(updates)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    // Remove label from all contacts that have it
    const contactsSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contacts')
      .where('labelIds', 'array-contains', id)
      .get()

    const batch = adminDb.batch()
    contactsSnap.docs.forEach((doc: any) => {
      const labels = doc.data().labelIds.filter((l: string) => l !== id)
      batch.update(doc.ref, { labelIds: labels })
    })

    batch.delete(adminDb.collection('esnaflar').doc(esnafId).collection('labels').doc(id))
    await batch.commit()

    return NextResponse.json({ ok: true, mesaj: `Etiket silindi, ${contactsSnap.docs.length} müşteriden kaldırıldı` })
  } catch (error: any) {
    return NextResponse.json({ error: 'Silme başarısız', detay: error.message }, { status: 500 })
  }
}
