/**
 * Mobile Notifications API — Preferences, Mute, History
 * GET  /api/v1/mobile/notifications — Preferences + history
 * POST /api/v1/mobile/notifications — Update preferences, mute
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { NOTIFICATION_CATEGORIES, DEFAULT_QUIET_HOURS } from '@/lib/pwa/pushNotifications'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'preferences'

    if (mode === 'preferences') {
      const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
      const prefs = esnafDoc.data()?.notificationPreferences || {}
      return NextResponse.json({
        ok: true,
        categories: Object.entries(NOTIFICATION_CATEGORIES).map(([key, config]) => ({
          id: key, title: config.title, channels: config.channels, priority: config.priority,
          enabled: prefs[key]?.enabled !== false,
          channelPrefs: prefs[key]?.channels || config.channels,
        })),
        quietHours: prefs.quietHours || DEFAULT_QUIET_HOURS,
        muteUntil: prefs.muteUntil,
      })
    }

    if (mode === 'history') {
      const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200)
      const snap = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('notification_history').orderBy('sentAt', 'desc').limit(limit).get()
      return NextResponse.json({
        ok: true,
        notifications: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })),
      })
    }

    return NextResponse.json({ error: 'mode: preferences, history' }, { status: 400 })
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
      case 'update_preferences': {
        await adminDb.collection('esnaflar').doc(esnafId).update({
          'notificationPreferences': { ...body.preferences, updatedAt: new Date().toISOString() },
        })
        return NextResponse.json({ ok: true, mesaj: 'Bildirim tercihleri güncellendi' })
      }

      case 'mute': {
        const durations: Record<string, number> = {
          '1_hour': 60 * 60 * 1000,
          'tonight': 0, // Calculated below
          'tomorrow': 24 * 60 * 60 * 1000,
          '1_week': 7 * 24 * 60 * 60 * 1000,
        }
        const duration = body.duration || '1_hour'
        let muteUntil: string

        if (duration === 'tonight') {
          const tonight = new Date()
          tonight.setHours(23, 59, 59, 999)
          muteUntil = tonight.toISOString()
        } else {
          muteUntil = new Date(Date.now() + (durations[duration] || 3600000)).toISOString()
        }

        await adminDb.collection('esnaflar').doc(esnafId).update({ 'notificationPreferences.muteUntil': muteUntil })
        return NextResponse.json({ ok: true, muteUntil, mesaj: `Bildirimler ${duration} süresince sessize alındı` })
      }

      case 'unmute': {
        await adminDb.collection('esnaflar').doc(esnafId).update({ 'notificationPreferences.muteUntil': null })
        return NextResponse.json({ ok: true, mesaj: 'Bildirimler açıldı' })
      }

      case 'update_quiet_hours': {
        await adminDb.collection('esnaflar').doc(esnafId).update({
          'notificationPreferences.quietHours': { ...body.quietHours, timezone: 'Europe/Istanbul' },
        })
        return NextResponse.json({ ok: true, mesaj: 'Sessiz saatler güncellendi' })
      }

      default:
        return NextResponse.json({ error: 'action: update_preferences, mute, unmute, update_quiet_hours' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
