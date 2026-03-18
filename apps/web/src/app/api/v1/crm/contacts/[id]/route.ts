/**
 * Single Contact API — Get, Update, Delete
 * ─────────────────────────────────────────
 * GET    /api/v1/crm/contacts/[id]
 * PUT    /api/v1/crm/contacts/[id] — Revision-based optimistic concurrency
 * DELETE /api/v1/crm/contacts/[id] — KVKK-compliant delete
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

interface RouteParams { params: Promise<{ id: string }> }

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const doc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contacts').doc(id)
      .get()

    if (!doc.exists) return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 })

    return NextResponse.json({ ok: true, contact: doc.data() })
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
    const { revision, ...updates } = body

    if (revision === undefined) {
      return NextResponse.json({ error: 'revision gerekli (optimistic concurrency)' }, { status: 400 })
    }

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(id)
    const doc = await docRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 })

    const current = doc.data()!
    if (current.revision !== revision) {
      return NextResponse.json({
        error: 'Kayıt başka bir oturumda güncellenmiş (revision çakışması)',
        currentRevision: current.revision,
        yourRevision: revision,
      }, { status: 409 })
    }

    const now = new Date().toISOString()

    // Recompute displayName if name changed
    if (updates.info) {
      const fn = updates.info.firstName ?? current.info.firstName
      const ln = updates.info.lastName ?? current.info.lastName
      updates.info.displayName = `${fn} ${ln}`.trim() || 'İsimsiz Müşteri'
    }

    const merged = {
      ...updates,
      revision: revision + 1,
      updatedAt: now,
    }

    await docRef.update(merged)

    return NextResponse.json({ ok: true, contact: { ...current, ...merged } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(id)
    const doc = await docRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 })

    // KVKK-compliant: anonymize rather than hard delete
    // Keep order/invoice refs for legal retention (10 years)
    const anonymized = {
      info: { firstName: 'SİLİNMİŞ', lastName: '', displayName: 'SİLİNMİŞ', locale: 'tr-TR' },
      channels: { emails: [], phones: [], addresses: [] },
      labelIds: [],
      extendedFields: {},
      consent: {
        kvkk: { accepted: false, version: '0' },
        iys: { sms: { permitted: false }, email: { permitted: false }, phone: { permitted: false } },
        whatsappOptIn: { permitted: false },
      },
      identityTier: 'visitor',
      deletedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await docRef.update(anonymized)

    return NextResponse.json({ ok: true, mesaj: 'Müşteri KVKK uyumlu şekilde anonimleştirildi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Silme başarısız', detay: error.message }, { status: 500 })
  }
}
