/**
 * Social Media API — Publisher + Analytics
 * ─────────────────────────────────────────
 * GET  /api/v1/marketing/social/posts — List posts
 * POST /api/v1/marketing/social/posts — Create & schedule post
 * GET  /api/v1/marketing/social/platforms — Connected platforms
 * POST /api/v1/marketing/social/platforms — Connect platform
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
    const mode = searchParams.get('mode') || 'posts'

    if (mode === 'platforms') {
      const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
      const integrations = esnafDoc.data()?.integrations || {}
      return NextResponse.json({
        ok: true,
        platforms: {
          instagram: { connected: !!integrations.instagram?.connected, features: ['post', 'story', 'reel', 'carousel'] },
          facebook: { connected: !!integrations.facebook?.connected, features: ['post', 'story', 'event'] },
          tiktok: { connected: !!integrations.tiktok?.connected, features: ['video'] },
          googleBusiness: { connected: !!integrations.googleBusiness?.connected, features: ['post', 'photo', 'offer', 'update'] },
          youtube: { connected: !!integrations.youtube?.connected, features: ['video', 'short'] },
        },
      })
    }

    // Posts list
    const snapshot = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('social_posts')
      .orderBy('createdAt', 'desc')
      .limit(30).get()

    const posts = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }))
    return NextResponse.json({ ok: true, posts })
  } catch (error: any) {
    return NextResponse.json({ error: 'Getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { mode } = body

    // Connect platform
    if (mode === 'connect') {
      const { platform, accessToken, pageId } = body
      if (!platform || !accessToken) {
        return NextResponse.json({ error: 'platform ve accessToken gerekli' }, { status: 400 })
      }

      await adminDb.collection('esnaflar').doc(esnafId).update({
        [`integrations.${platform}`]: {
          connected: true,
          pageId,
          connectedAt: new Date().toISOString(),
        },
      })

      await adminDb.collection('esnaf_secrets').doc(esnafId).set({
        [`${platform}_token`]: accessToken,
        updatedAt: new Date().toISOString(),
      }, { merge: true })

      return NextResponse.json({ ok: true, mesaj: `${platform} bağlantısı kuruldu` })
    }

    // Create post
    if (!body.content && !body.mediaUrl) {
      return NextResponse.json({ error: 'content veya mediaUrl gerekli' }, { status: 400 })
    }

    const now = new Date().toISOString()
    const post = {
      id: uuidv4(),
      esnafId,
      platforms: body.platforms || ['instagram'],
      content: body.content || '',
      mediaUrl: body.mediaUrl || undefined,
      mediaType: body.mediaType || 'image', // image, video, carousel
      hashtags: body.hashtags || [],
      status: body.scheduledAt ? 'scheduled' : 'draft',
      scheduledAt: body.scheduledAt || undefined,
      publishedAt: undefined as string | undefined,

      // Per-platform customization
      platformOverrides: body.platformOverrides || {},

      // Engagement stats (filled after publish)
      stats: {
        impressions: 0, reach: 0, likes: 0,
        comments: 0, shares: 0, saves: 0,
        clicks: 0, engagementRate: 0,
      },

      createdAt: now,
      updatedAt: now,
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('social_posts').doc(post.id).set(post)

    return NextResponse.json({ ok: true, post }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Post oluşturulamadı', detay: error.message }, { status: 500 })
  }
}
