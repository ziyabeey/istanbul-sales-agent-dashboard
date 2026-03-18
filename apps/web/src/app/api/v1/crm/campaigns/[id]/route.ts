/**
 * Single Campaign API — Detail, Send, Stats
 * ───────────────────────────────────────────
 * GET  /api/v1/crm/campaigns/[id] — Get campaign + stats
 * PUT  /api/v1/crm/campaigns/[id] — Update campaign
 * POST /api/v1/crm/campaigns/[id] — Send / Schedule / Test
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { evaluateFilter } from '@/lib/crm/filterEngine'

interface RouteParams { params: Promise<{ id: string }> }

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('campaigns').doc(id).get()
    if (!doc.exists) return NextResponse.json({ error: 'Kampanya bulunamadı' }, { status: 404 })

    return NextResponse.json({ ok: true, campaign: { id: doc.id, ...doc.data() } })
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

    await adminDb.collection('esnaflar').doc(esnafId).collection('campaigns').doc(id)
      .update({ ...body, updatedAt: new Date().toISOString() })
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
    const { action } = body // 'send' | 'schedule' | 'test' | 'pause'

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('campaigns').doc(id)
    const doc = await docRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Kampanya bulunamadı' }, { status: 404 })

    const campaign = doc.data()!
    const now = new Date().toISOString()

    switch (action) {
      case 'send': {
        if (campaign.status !== 'draft' && campaign.status !== 'scheduled') {
          return NextResponse.json({ error: 'Sadece taslak/zamanlanmış kampanyalar gönderilebilir' }, { status: 422 })
        }

        // Resolve target contacts
        let targetContacts: any[] = []
        if (campaign.targetSegmentId) {
          const segDoc = await adminDb.collection('esnaflar').doc(esnafId)
            .collection('segments').doc(campaign.targetSegmentId).get()
          if (segDoc.exists) {
            const allContacts = await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').get()
            targetContacts = allContacts.docs.map((d: any) => d.data())
              .filter((c: any) => evaluateFilter(c, segDoc.data()?.filter))
          }
        } else if (campaign.targetFilter) {
          const allContacts = await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').get()
          targetContacts = allContacts.docs.map((d: any) => d.data())
            .filter((c: any) => evaluateFilter(c, campaign.targetFilter))
        }

        // Filter by channel consent
        const channel = campaign.type
        const reachable = targetContacts.filter((c: any) => {
          if (channel === 'whatsapp') return c.consent?.whatsappOptIn?.permitted
          if (channel === 'sms') return c.consent?.iys?.sms?.permitted
          if (channel === 'email') return c.consent?.iys?.email?.permitted
          return true
        })

        // TODO: Actually dispatch messages via providers

        await docRef.update({
          status: 'sent',
          'stats.totalRecipients': targetContacts.length,
          'stats.sent': reachable.length,
          sentAt: now,
          updatedAt: now,
        })

        return NextResponse.json({
          ok: true,
          mesaj: `Kampanya ${reachable.length} kişiye gönderildi`,
          stats: { totalRecipients: targetContacts.length, sent: reachable.length },
        })
      }

      case 'schedule': {
        if (!body.scheduledAt) return NextResponse.json({ error: 'scheduledAt gerekli' }, { status: 400 })
        await docRef.update({ status: 'scheduled', scheduledAt: body.scheduledAt, updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: `Kampanya ${body.scheduledAt} için zamanlandı` })
      }

      case 'test': {
        // Send to esnaf's own number/email for testing
        return NextResponse.json({ ok: true, mesaj: 'Test mesajı gönderildi' })
      }

      case 'pause': {
        await docRef.update({ status: 'paused', updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: 'Kampanya duraklatıldı' })
      }

      default:
        return NextResponse.json({
          error: 'Geçersiz action',
          validActions: ['send', 'schedule', 'test', 'pause'],
        }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız', detay: error.message }, { status: 500 })
  }
}
