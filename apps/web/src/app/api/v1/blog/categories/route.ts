/**
 * Blog Categories API
 * ─────────────────────
 * GET  /api/v1/blog/categories — List
 * POST /api/v1/blog/categories — Create/Update/Delete
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const snapshot = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('blog_categories').orderBy('sortOrder', 'asc').get()
    const categories = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }))

    return NextResponse.json({ ok: true, categories })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kategoriler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    const body = await request.json()

    // Update
    if (body.mode === 'update' && body.categoryId) {
      await adminDb.collection('esnaflar').doc(esnafId).collection('blog_categories').doc(body.categoryId)
        .update({ name: body.name, description: body.description, sortOrder: body.sortOrder })
      return NextResponse.json({ ok: true, mesaj: 'Kategori güncellendi' })
    }

    // Delete
    if (body.mode === 'delete' && body.categoryId) {
      await adminDb.collection('esnaflar').doc(esnafId).collection('blog_categories').doc(body.categoryId).delete()
      return NextResponse.json({ ok: true, mesaj: 'Kategori silindi' })
    }

    // Create
    if (!body.name) return NextResponse.json({ error: 'name gerekli' }, { status: 400 })

    const turkSlug = (t: string) => {
      const map: Record<string, string> = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' }
      let s = t.toLowerCase()
      for (const [k, v] of Object.entries(map)) s = s.replace(new RegExp(k, 'g'), v)
      return s.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }

    const category = {
      id: uuidv4(),
      esnafId,
      name: body.name,
      slug: turkSlug(body.name),
      description: body.description || '',
      postCount: 0,
      sortOrder: body.sortOrder || 0,
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('blog_categories').doc(category.id).set(category)
    return NextResponse.json({ ok: true, category }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kategori işlemi başarısız', detay: error.message }, { status: 500 })
  }
}
