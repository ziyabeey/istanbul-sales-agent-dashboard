/**
 * Social Post Detail API
 * ───────────────────────
 * GET  /api/v1/marketing/social/posts/[id] — Post detail + stats
 * PUT  /api/v1/marketing/social/posts/[id] — Update post
 * POST /api/v1/marketing/social/posts/[id] — Publish / delete
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
    const doc = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('social_posts').doc(id).get()

    if (!doc.exists) return NextResponse.json({ error: 'Post bulunamadı' }, { status: 404 })

    return NextResponse.json({ ok: true, post: { id: doc.id, ...doc.data() } })
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

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('social_posts').doc(id)
    const doc = await docRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Post bulunamadı' }, { status: 404 })

    // Only allow edits on draft/scheduled
    if (!['draft', 'scheduled'].includes(doc.data()?.status)) {
      return NextResponse.json({ error: 'Yayınlanmış postlar düzenlenemez' }, { status: 422 })
    }

    await docRef.update({ ...body, updatedAt: new Date().toISOString() })
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    const { action } = body
    const now = new Date().toISOString()

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('social_posts').doc(id)
    const doc = await docRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Post bulunamadı' }, { status: 404 })

    switch (action) {
      case 'publish': {
        // TODO: Actually publish via platform APIs (Instagram Graph API, etc.)
        await docRef.update({ status: 'published', publishedAt: now, updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: 'Post yayınlandı' })
      }

      case 'schedule': {
        if (!body.scheduledAt) return NextResponse.json({ error: 'scheduledAt gerekli' }, { status: 400 })
        await docRef.update({ status: 'scheduled', scheduledAt: body.scheduledAt, updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: `Post ${body.scheduledAt} için zamanlandı` })
      }

      case 'delete': {
        await docRef.delete()
        return NextResponse.json({ ok: true, mesaj: 'Post silindi' })
      }

      default:
        return NextResponse.json({ error: 'action "publish", "schedule" veya "delete" olmalı' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız', detay: error.message }, { status: 500 })
  }
}
