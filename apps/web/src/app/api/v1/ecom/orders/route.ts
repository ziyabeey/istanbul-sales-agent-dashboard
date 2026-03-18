/**
 * Orders API — List & Create
 * ───────────────────────────
 * GET  /api/v1/ecom/orders — List orders (paginated, filterable)
 * POST /api/v1/ecom/orders — Manual order creation (admin)
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status') || undefined
    const paymentStatus = searchParams.get('paymentStatus') || undefined

    let query = adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .offset(offset)

    if (status) query = query.where('status', '==', status) as any
    if (paymentStatus) query = query.where('paymentStatus', '==', paymentStatus) as any

    const snapshot = await query.get()
    const orders = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))

    const countSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('orders')
      .count()
      .get()
    const total = countSnap.data().count

    return NextResponse.json({
      ok: true,
      orders,
      pagination: { total, limit, offset, hasMore: offset + limit < total },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Siparişler getirilemedi', detay: error.message }, { status: 500 })
  }
}
