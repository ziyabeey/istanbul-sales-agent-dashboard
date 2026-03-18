/**
 * Customer Portal API — Orders, Bookings, Loyalty, Profile, Favorites
 * ─────────────────────────────────────────────────────────────────────
 * GET  /api/v1/portal — Customer self-service data
 * POST /api/v1/portal — Profile update, favorites
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

async function getCustomerSession(request: Request): Promise<{ contactId: string; esnafId: string } | null> {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null
  const doc = await adminDb.collection('customer_sessions').doc(token).get()
  if (!doc.exists) return null
  const data = doc.data()!
  if (new Date(data.expiresAt) < new Date()) return null
  return { contactId: data.contactId, esnafId: data.esnafId }
}

export async function GET(request: Request) {
  try {
    const session = await getCustomerSession(request)
    if (!session) return NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 })
    const { contactId, esnafId } = session

    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section') || 'overview'

    switch (section) {
      case 'orders': {
        const snap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('orders').where('contactId', '==', contactId)
          .orderBy('createdAt', 'desc').limit(50).get()
        const orders = snap.docs.map((d: any) => {
          const o = d.data()
          return {
            id: d.id, orderNumber: o.orderNumber, status: o.status,
            total: o.total, itemCount: o.items?.length || 0,
            createdAt: o.createdAt, trackingUrl: o.shipping?.trackingUrl,
          }
        })
        return NextResponse.json({ ok: true, orders })
      }

      case 'bookings': {
        const now = new Date().toISOString()
        const upcomingSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('bookings').where('contactId', '==', contactId)
          .where('startTime', '>=', now).orderBy('startTime', 'asc').limit(20).get()
        const pastSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('bookings').where('contactId', '==', contactId)
          .where('startTime', '<', now).orderBy('startTime', 'desc').limit(20).get()

        return NextResponse.json({
          ok: true,
          upcoming: upcomingSnap.docs.map((d: any) => ({ id: d.id, ...d.data() })),
          past: pastSnap.docs.map((d: any) => ({ id: d.id, ...d.data() })),
        })
      }

      case 'loyalty': {
        const contactDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('contacts').doc(contactId).get()
        const contact = contactDoc.exists ? contactDoc.data()! : {}
        const loyalty = contact.loyalty || {}

        const programDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('settings').doc('loyalty_program').get()
        const rewards = programDoc.exists ? programDoc.data()!.rewards || [] : []

        return NextResponse.json({
          ok: true,
          points: loyalty.points || 0,
          tier: loyalty.tier || 'bronze',
          totalEarned: loyalty.totalEarned || 0,
          totalRedeemed: loyalty.totalRedeemed || 0,
          rewards: rewards.filter((r: any) => r.pointsCost <= (loyalty.points || 0)),
        })
      }

      case 'profile': {
        const contactDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('contacts').doc(contactId).get()
        if (!contactDoc.exists) return NextResponse.json({ ok: true, profile: {} })
        const c = contactDoc.data()!

        return NextResponse.json({
          ok: true,
          profile: {
            name: c.info?.displayName,
            firstName: c.info?.firstName,
            lastName: c.info?.lastName,
            phone: c.channels?.phones?.[0]?.number,
            email: c.channels?.emails?.[0]?.email,
            addresses: c.channels?.addresses || [],
          },
        })
      }

      case 'favorites': {
        const favSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('contacts').doc(contactId).collection('favorites').get()
        const favorites = favSnap.docs.map((d: any) => ({ id: d.id, ...d.data() }))
        return NextResponse.json({ ok: true, favorites })
      }

      case 'overview': {
        // Combined overview
        const contactDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId).get()
        const contact = contactDoc.exists ? contactDoc.data()! : {}

        const orderCountSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('orders').where('contactId', '==', contactId).count().get()

        return NextResponse.json({
          ok: true,
          overview: {
            name: contact.info?.displayName || '',
            loyaltyPoints: contact.loyalty?.points || 0,
            tier: contact.loyalty?.tier || 'bronze',
            orderCount: orderCountSnap.data().count,
            totalSpent: contact.activitySummary?.totalSpent || 0,
          },
        })
      }

      default:
        return NextResponse.json({ error: 'section: orders, bookings, loyalty, profile, favorites, overview' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Portal verisi getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCustomerSession(request)
    if (!session) return NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 })
    const { contactId, esnafId } = session
    const body = await request.json()

    switch (body.action) {
      case 'update_profile': {
        const updates: Record<string, any> = { updatedAt: new Date().toISOString() }
        if (body.firstName) updates['info.firstName'] = body.firstName
        if (body.lastName) updates['info.lastName'] = body.lastName
        if (body.firstName || body.lastName) {
          updates['info.displayName'] = `${body.firstName || ''} ${body.lastName || ''}`.trim()
        }
        if (body.email) updates['channels.emails'] = [{ email: body.email, primary: true }]

        await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId).update(updates)
        return NextResponse.json({ ok: true, mesaj: 'Profil güncellendi' })
      }

      case 'add_favorite': {
        if (!body.productId) return NextResponse.json({ error: 'productId gerekli' }, { status: 400 })
        await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId)
          .collection('favorites').doc(body.productId).set({
            productId: body.productId,
            name: body.productName || '',
            addedAt: new Date().toISOString(),
          })
        return NextResponse.json({ ok: true, mesaj: 'Favorilere eklendi' })
      }

      case 'remove_favorite': {
        if (!body.productId) return NextResponse.json({ error: 'productId gerekli' }, { status: 400 })
        await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId)
          .collection('favorites').doc(body.productId).delete()
        return NextResponse.json({ ok: true, mesaj: 'Favorilerden çıkarıldı' })
      }

      default:
        return NextResponse.json({ error: 'action: update_profile, add_favorite, remove_favorite' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Portal işlemi başarısız', detay: error.message }, { status: 500 })
  }
}
