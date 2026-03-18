/**
 * Mobile PWA API — Manifest, Push Subscribe, Install
 * GET  /api/v1/mobile/pwa — Manifest + SW config
 * POST /api/v1/mobile/pwa — Push subscribe/unsubscribe/preferences
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { generateDashboardManifest, generateSiteManifest } from '@/lib/pwa/manifest'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'manifest'
    const siteId = searchParams.get('siteId')

    if (mode === 'manifest') {
      if (siteId) {
        const siteDoc = await adminDb.collection('siteler').doc(siteId).get()
        if (!siteDoc.exists) return NextResponse.json(generateDashboardManifest())
        const s = siteDoc.data()!
        return NextResponse.json(generateSiteManifest({
          name: s.isletmeAdi || 'Mağaza', shortName: (s.isletmeAdi || 'Mağaza').slice(0, 12),
          themeColor: s.themeColor || '#1E1E2E', bgColor: s.bgColor || '#FFFFFF',
          logo: s.logo, domain: s.domain || '',
        }))
      }
      return NextResponse.json(generateDashboardManifest())
    }

    if (mode === 'sw_config') {
      return NextResponse.json({
        ok: true,
        strategies: {
          appShell: { strategy: 'CacheFirst', maxAge: 2592000 },
          apiData: { strategy: 'StaleWhileRevalidate', maxAge: 3600, maxEntries: 500 },
          images: { strategy: 'CacheFirst', maxAge: 604800, maxEntries: 200 },
        },
        offlineFallback: '/offline.html',
        syncableActions: ['order_status_update', 'message_send', 'product_update', 'booking_confirm', 'note_add', 'photo_upload'],
      })
    }

    return NextResponse.json({ error: 'mode: manifest, sw_config' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    switch (body.action) {
      case 'subscribe': {
        if (!body.subscription) return NextResponse.json({ error: 'subscription gerekli' }, { status: 400 })
        await adminDb.collection('esnaflar').doc(esnafId).collection('push_subscriptions').doc(body.deviceId || 'default').set({
          subscription: body.subscription, deviceId: body.deviceId, platform: body.platform,
          createdAt: new Date().toISOString(), active: true,
        })
        return NextResponse.json({ ok: true, mesaj: 'Push bildirim aktif' })
      }
      case 'unsubscribe': {
        await adminDb.collection('esnaflar').doc(esnafId).collection('push_subscriptions').doc(body.deviceId || 'default').update({ active: false })
        return NextResponse.json({ ok: true, mesaj: 'Push bildirim devre dışı' })
      }
      case 'preferences': {
        await adminDb.collection('esnaflar').doc(esnafId).update({
          'notificationPreferences': body.preferences,
          'notificationPreferences.updatedAt': new Date().toISOString(),
        })
        return NextResponse.json({ ok: true, mesaj: 'Bildirim tercihleri güncellendi' })
      }
      default:
        return NextResponse.json({ error: 'action: subscribe, unsubscribe, preferences' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
