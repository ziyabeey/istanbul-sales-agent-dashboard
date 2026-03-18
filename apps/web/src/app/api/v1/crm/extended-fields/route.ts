/**
 * Extended Fields API — Custom field definitions
 * ────────────────────────────────────────────────
 * GET    /api/v1/crm/extended-fields — List field definitions
 * POST   /api/v1/crm/extended-fields — Create new field
 * PUT    /api/v1/crm/extended-fields — Update field
 * DELETE /api/v1/crm/extended-fields — Delete field
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const snapshot = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('extended_fields')
      .orderBy('displayName', 'asc').get()

    const fields = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ ok: true, fields })
  } catch (error: any) {
    return NextResponse.json({ error: 'Alanlar getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    if (!body.key || !body.displayName || !body.fieldType) {
      return NextResponse.json({ error: 'key, displayName ve fieldType gerekli' }, { status: 400 })
    }

    const validTypes = ['TEXT', 'NUMBER', 'DATE', 'URL', 'PHONE', 'EMAIL', 'SELECT', 'MULTISELECT', 'BOOLEAN']
    if (!validTypes.includes(body.fieldType)) {
      return NextResponse.json({ error: `Geçersiz fieldType. Geçerli: ${validTypes.join(', ')}` }, { status: 400 })
    }

    // Check limit
    const existing = await adminDb.collection('esnaflar').doc(esnafId).collection('extended_fields').count().get()
    if (existing.data().count >= 50) {
      return NextResponse.json({ error: 'Maksimum 50 özel alan oluşturulabilir' }, { status: 422 })
    }

    // Duplicate key check
    const dup = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('extended_fields').where('key', '==', body.key).limit(1).get()
    if (!dup.empty) return NextResponse.json({ error: 'Bu anahtar zaten mevcut' }, { status: 409 })

    const field = {
      esnafId,
      key: body.key,
      displayName: body.displayName,
      fieldType: body.fieldType,
      options: body.options || undefined,
      required: body.required || false,
      showInContactCard: body.showInContactCard ?? true,
      sectorDefault: body.sectorDefault || undefined,
      createdAt: new Date().toISOString(),
    }

    const docRef = await adminDb.collection('esnaflar').doc(esnafId).collection('extended_fields').add(field)
    return NextResponse.json({ ok: true, field: { id: docRef.id, ...field } }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Alan oluşturulamadı', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    await adminDb.collection('esnaflar').doc(esnafId).collection('extended_fields').doc(id).update(updates)
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
    if (!body.id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    await adminDb.collection('esnaflar').doc(esnafId).collection('extended_fields').doc(body.id).delete()
    return NextResponse.json({ ok: true, mesaj: 'Özel alan silindi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Silme başarısız', detay: error.message }, { status: 500 })
  }
}
