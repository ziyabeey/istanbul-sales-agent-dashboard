/**
 * Offline Sync API — Push/Pull/Status
 * POST /api/v1/mobile/sync — Push offline queue, pull deltas
 * GET  /api/v1/mobile/sync — Sync status
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'status'

    if (mode === 'pull') {
      const since = searchParams.get('since') || new Date(Date.now() - 24 * 3600000).toISOString()
      const collections = ['orders', 'products', 'contacts', 'bookings']
      const deltas: Record<string, any[]> = {}

      for (const col of collections) {
        const snap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection(col).where('updatedAt', '>', since).limit(100).get()
        deltas[col] = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }))
      }

      return NextResponse.json({ ok: true, since, deltas, syncedAt: new Date().toISOString() })
    }

    // Status
    const syncDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('settings').doc('sync_status').get()
    return NextResponse.json({ ok: true, status: syncDoc.exists ? syncDoc.data() : { lastSync: null, pendingCount: 0 } })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    if (!body.actions?.length) return NextResponse.json({ error: 'actions array gerekli' }, { status: 400 })

    const results: { id: string; status: string; error?: string }[] = []

    for (const action of body.actions.slice(0, 50)) {
      try {
        switch (action.type) {
          case 'order_status_update':
            await adminDb.collection('esnaflar').doc(esnafId).collection('orders').doc(action.resourceId)
              .update({ status: action.data.status, updatedAt: new Date().toISOString() })
            results.push({ id: action.id, status: 'synced' })
            break
          case 'product_update':
            await adminDb.collection('esnaflar').doc(esnafId).collection('products').doc(action.resourceId)
              .update({ ...action.data, updatedAt: new Date().toISOString() })
            results.push({ id: action.id, status: 'synced' })
            break
          case 'booking_confirm':
            await adminDb.collection('esnaflar').doc(esnafId).collection('bookings').doc(action.resourceId)
              .update({ status: 'confirmed', updatedAt: new Date().toISOString() })
            results.push({ id: action.id, status: 'synced' })
            break
          case 'note_add':
            await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(action.resourceId)
              .update({ notes: action.data.notes, updatedAt: new Date().toISOString() })
            results.push({ id: action.id, status: 'synced' })
            break
          default:
            results.push({ id: action.id, status: 'skipped', error: 'Bilinmeyen aksiyon tipi' })
        }
      } catch (err: any) {
        results.push({ id: action.id, status: 'failed', error: err.message })
      }
    }

    // Update sync status
    await adminDb.collection('esnaflar').doc(esnafId).collection('settings').doc('sync_status').set({
      lastSync: new Date().toISOString(), syncedCount: results.filter((r: any) => r.status === 'synced').length,
      failedCount: results.filter((r: any) => r.status === 'failed').length,
    })

    return NextResponse.json({ ok: true, results, syncedAt: new Date().toISOString() })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
