/**
 * Blog Post Detail + Actions
 * ───────────────────────────
 * GET  /api/v1/blog/posts/[id] — Detail + stats
 * PUT  /api/v1/blog/posts/[id] — Update
 * POST /api/v1/blog/posts/[id] — Actions: publish, schedule, archive
 * DELETE /api/v1/blog/posts/[id]
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

    const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('blog_posts').doc(id).get()
    if (!doc.exists) return NextResponse.json({ error: 'Yazı bulunamadı' }, { status: 404 })

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

    const ref = adminDb.collection('esnaflar').doc(esnafId).collection('blog_posts').doc(id)
    if (!(await ref.get()).exists) return NextResponse.json({ error: 'Yazı bulunamadı' }, { status: 404 })

    // Recalculate readTime if content changed
    const updates: Record<string, any> = { ...body, updatedAt: new Date().toISOString() }
    if (body.content) {
      const wordCount = body.content.split(/\s+/).filter(Boolean).length
      updates['stats.readTime'] = Math.max(1, Math.round(wordCount / 200))
    }

    await ref.update(updates)
    return NextResponse.json({ ok: true, mesaj: 'Yazı güncellendi' })
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
    const now = new Date().toISOString()

    const ref = adminDb.collection('esnaflar').doc(esnafId).collection('blog_posts').doc(id)
    if (!(await ref.get()).exists) return NextResponse.json({ error: 'Yazı bulunamadı' }, { status: 404 })

    switch (body.action) {
      case 'publish':
        await ref.update({ status: 'published', publishedAt: now, updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: 'Yazı yayınlandı' })

      case 'schedule':
        if (!body.scheduledAt) return NextResponse.json({ error: 'scheduledAt gerekli' }, { status: 400 })
        await ref.update({ status: 'scheduled', scheduledAt: body.scheduledAt, updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: `Yazı ${body.scheduledAt} için zamanlandı` })

      case 'archive':
        await ref.update({ status: 'archived', updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: 'Yazı arşivlendi' })

      case 'increment_view':
        const { FieldValue } = await import('firebase-admin/firestore')
        await ref.update({ 'stats.views': FieldValue.increment(1) })
        return NextResponse.json({ ok: true })

      default:
        return NextResponse.json({ error: 'action: publish, schedule, archive, increment_view' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    const { id } = await params

    await adminDb.collection('esnaflar').doc(esnafId).collection('blog_posts').doc(id).delete()
    return NextResponse.json({ ok: true, mesaj: 'Yazı silindi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Silme başarısız', detay: error.message }, { status: 500 })
  }
}
