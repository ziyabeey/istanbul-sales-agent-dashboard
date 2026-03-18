/**
 * SEO Redirects API — 301 Redirect management
 * ─────────────────────────────────────────────
 * GET    /api/v1/marketing/seo/redirects — List redirects
 * POST   /api/v1/marketing/seo/redirects — Add redirect
 * DELETE /api/v1/marketing/seo/redirects — Remove redirect
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const snapshot = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('redirects')
      .orderBy('createdAt', 'desc').get()

    const redirects = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ ok: true, redirects, count: redirects.length })
  } catch (error: any) {
    return NextResponse.json({ error: 'Yönlendirmeler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()

    // Support bulk import
    const items = Array.isArray(body) ? body : [body]
    if (items.length > 100) {
      return NextResponse.json({ error: 'Tek seferde en fazla 100 yönlendirme eklenebilir' }, { status: 422 })
    }

    // Check total limit
    const existing = await adminDb.collection('esnaflar').doc(esnafId).collection('redirects').count().get()
    if (existing.data().count + items.length > 1000) {
      return NextResponse.json({ error: 'Maksimum 1000 yönlendirme oluşturulabilir' }, { status: 422 })
    }

    const now = new Date().toISOString()
    const batch = adminDb.batch()
    const created: any[] = []

    for (const item of items) {
      if (!item.from || !item.to) continue

      // Conflict detection
      const conflictSnap = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('redirects').where('from', '==', item.from).limit(1).get()
      if (!conflictSnap.empty) continue // Skip existing

      const redirect = {
        id: uuidv4(),
        from: item.from.startsWith('/') ? item.from : `/${item.from}`,
        to: item.to.startsWith('/') ? item.to : `/${item.to}`,
        type: item.type || 301,
        reason: item.reason || 'manual',
        createdAt: now,
      }

      const ref = adminDb.collection('esnaflar').doc(esnafId).collection('redirects').doc(redirect.id)
      batch.set(ref, redirect)
      created.push(redirect)
    }

    await batch.commit()
    return NextResponse.json({ ok: true, created: created.length, redirects: created }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Yönlendirme eklenemedi', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    if (!body.id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    await adminDb.collection('esnaflar').doc(esnafId).collection('redirects').doc(body.id).delete()
    return NextResponse.json({ ok: true, mesaj: 'Yönlendirme silindi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Silme başarısız', detay: error.message }, { status: 500 })
  }
}
