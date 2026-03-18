/**
 * Blog Posts API — CRUD + Publish + Schedule
 * ─────────────────────────────────────────────
 * GET  /api/v1/blog/posts — List posts
 * POST /api/v1/blog/posts — Create post
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const categoryId = searchParams.get('categoryId')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)

    let query: any = adminDb.collection('esnaflar').doc(esnafId).collection('blog_posts')
    if (status) query = query.where('status', '==', status)
    if (categoryId) query = query.where('categoryIds', 'array-contains', categoryId)

    const snapshot = await query.orderBy('createdAt', 'desc').limit(limit).get()
    const posts = snapshot.docs.map((d: any) => {
      const data = d.data()
      return {
        id: d.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        categoryIds: data.categoryIds,
        tags: data.tags,
        status: data.status,
        publishedAt: data.publishedAt,
        stats: data.stats,
        authorName: data.authorName,
        aiGenerated: data.aiGenerated,
        createdAt: data.createdAt,
      }
    })

    return NextResponse.json({ ok: true, posts, count: posts.length })
  } catch (error: any) {
    return NextResponse.json({ error: 'Blog yazıları getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()

    // Limit
    const countRes = await adminDb.collection('esnaflar').doc(esnafId).collection('blog_posts').count().get()
    if (countRes.data().count >= 500) {
      return NextResponse.json({ error: 'Maksimum 500 blog yazısı' }, { status: 422 })
    }

    if (!body.title) return NextResponse.json({ error: 'title gerekli' }, { status: 400 })

    const wordCount = (body.content || '').split(/\s+/).filter(Boolean).length
    const readTime = Math.max(1, Math.round(wordCount / 200))
    const now = new Date().toISOString()

    const post = {
      id: uuidv4(),
      esnafId,
      title: body.title.slice(0, 200),
      slug: turkSlug(body.title),
      content: body.content || '',
      excerpt: body.excerpt || (body.content || '').slice(0, 300),
      coverImage: body.coverImage,
      images: body.images || [],
      categoryIds: (body.categoryIds || []).slice(0, 5),
      tags: (body.tags || []).slice(0, 20),
      seo: {
        title: body.seo?.title || body.title.slice(0, 60),
        description: body.seo?.description || (body.content || '').slice(0, 160),
        ogImage: body.seo?.ogImage || body.coverImage?.url,
      },
      aiGenerated: body.aiGenerated || false,
      aiSeoScore: body.aiSeoScore,
      authorId: body.authorId || esnafId,
      authorName: body.authorName || 'İşletme',
      status: body.status || 'draft',
      publishedAt: body.status === 'published' ? now : undefined,
      scheduledAt: body.scheduledAt,
      stats: { views: 0, readTime },
      createdAt: now,
      updatedAt: now,
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('blog_posts').doc(post.id).set(post)

    // Auto social share on publish
    if (post.status === 'published' && body.autoSocial) {
      await adminDb.collection('esnaflar').doc(esnafId).collection('social_posts').add({
        type: 'blog_share',
        content: `📝 Yeni Blog Yazısı: ${post.title}\n\n${post.excerpt}\n\n👉 Devamını oku`,
        platforms: ['instagram', 'facebook', 'gbp'],
        imageUrl: post.coverImage?.url,
        blogPostId: post.id,
        status: 'draft',
        createdAt: now,
      })
    }

    return NextResponse.json({ ok: true, post }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Blog yazısı oluşturulamadı', detay: error.message }, { status: 500 })
  }
}

function turkSlug(text: string): string {
  const map: Record<string, string> = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u' }
  let s = text.toLowerCase()
  for (const [k, v] of Object.entries(map)) s = s.replace(new RegExp(k, 'g'), v)
  return s.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
