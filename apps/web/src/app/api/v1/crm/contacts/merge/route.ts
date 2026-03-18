/**
 * Contact Merge API
 * ─────────────────
 * POST /api/v1/crm/contacts/merge — Merge duplicate contacts
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { primaryId, secondaryIds } = body

    if (!primaryId || !secondaryIds?.length) {
      return NextResponse.json({ error: 'primaryId ve secondaryIds gerekli' }, { status: 400 })
    }

    if (secondaryIds.length > 10) {
      return NextResponse.json({ error: 'Tek seferde en fazla 10 müşteri birleştirilebilir' }, { status: 422 })
    }

    const baseRef = adminDb.collection('esnaflar').doc(esnafId).collection('contacts')
    const primaryDoc = await baseRef.doc(primaryId).get()
    if (!primaryDoc.exists) return NextResponse.json({ error: 'Birincil müşteri bulunamadı' }, { status: 404 })

    const primary = primaryDoc.data()!
    const now = new Date().toISOString()

    // Merge data from secondary contacts
    const mergedEmails = [...(primary.channels?.emails || [])]
    const mergedPhones = [...(primary.channels?.phones || [])]
    const mergedAddresses = [...(primary.channels?.addresses || [])]
    const mergedLabels = new Set<string>(primary.labelIds || [])
    const mergedExtendedFields = { ...(primary.extendedFields || {}) }
    let mergedSummary = { ...(primary.activitySummary || {}) }

    for (const secId of secondaryIds) {
      const secDoc = await baseRef.doc(secId).get()
      if (!secDoc.exists) continue
      const sec = secDoc.data()!

      // Merge channels (deduplicate)
      for (const email of (sec.channels?.emails || [])) {
        if (!mergedEmails.some((e: any) => e.email === email.email)) {
          if (mergedEmails.length < 5) mergedEmails.push(email)
        }
      }
      for (const phone of (sec.channels?.phones || [])) {
        if (!mergedPhones.some((p: any) => p.number === phone.number)) {
          if (mergedPhones.length < 5) mergedPhones.push(phone)
        }
      }
      for (const addr of (sec.channels?.addresses || [])) {
        if (mergedAddresses.length < 3) mergedAddresses.push(addr)
      }

      // Merge labels
      for (const label of (sec.labelIds || [])) mergedLabels.add(label)

      // Merge extended fields (primary wins)
      for (const [key, val] of Object.entries(sec.extendedFields || {})) {
        if (!mergedExtendedFields[key]) mergedExtendedFields[key] = val
      }

      // Sum activity summary
      mergedSummary = {
        totalOrders: (mergedSummary.totalOrders || 0) + (sec.activitySummary?.totalOrders || 0),
        totalSpent: (mergedSummary.totalSpent || 0) + (sec.activitySummary?.totalSpent || 0),
        averageOrderValue: 0,
        totalBookings: (mergedSummary.totalBookings || 0) + (sec.activitySummary?.totalBookings || 0),
        totalMessages: (mergedSummary.totalMessages || 0) + (sec.activitySummary?.totalMessages || 0),
        emailOpens: (mergedSummary.emailOpens || 0) + (sec.activitySummary?.emailOpens || 0),
        emailClicks: (mergedSummary.emailClicks || 0) + (sec.activitySummary?.emailClicks || 0),
        smsDelivered: (mergedSummary.smsDelivered || 0) + (sec.activitySummary?.smsDelivered || 0),
        whatsappMessages: (mergedSummary.whatsappMessages || 0) + (sec.activitySummary?.whatsappMessages || 0),
        websiteVisits: (mergedSummary.websiteVisits || 0) + (sec.activitySummary?.websiteVisits || 0),
        referralCount: (mergedSummary.referralCount || 0) + (sec.activitySummary?.referralCount || 0),
        loyaltyPoints: (mergedSummary.loyaltyPoints || 0) + (sec.activitySummary?.loyaltyPoints || 0),
      }

      // Use the most recent contact info if primary is empty
      if (!primary.info?.firstName && sec.info?.firstName) {
        primary.info.firstName = sec.info.firstName
        primary.info.lastName = sec.info.lastName || ''
      }

      // WhatsApp preference: keep the one with opt-in
      if (sec.channels?.whatsapp?.optedIn && !primary.channels?.whatsapp?.optedIn) {
        primary.channels.whatsapp = sec.channels.whatsapp
      }

      // Re-assign activities from secondary to primary
      const activitiesSnap = await adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('contact_activities')
        .where('contactId', '==', secId)
        .get()

      const batch = adminDb.batch()
      activitiesSnap.docs.forEach((aDoc: any) => {
        batch.update(aDoc.ref, { contactId: primaryId })
      })

      // Anonymize secondary contact
      batch.update(baseRef.doc(secId), {
        info: { firstName: 'BİRLEŞTİRİLDİ', lastName: '', displayName: `→ ${primaryId}`, locale: 'tr-TR' },
        channels: { emails: [], phones: [], addresses: [] },
        labelIds: [],
        identityTier: 'visitor',
        mergedInto: primaryId,
        mergedAt: now,
        updatedAt: now,
      })

      await batch.commit()
    }

    // Recalculate AOV
    if (mergedSummary.totalOrders > 0) {
      mergedSummary.averageOrderValue = Math.round(mergedSummary.totalSpent / mergedSummary.totalOrders)
    }

    // Update primary contact
    const displayName = `${primary.info.firstName || ''} ${primary.info.lastName || ''}`.trim() || 'İsimsiz Müşteri'

    await baseRef.doc(primaryId).update({
      'channels.emails': mergedEmails,
      'channels.phones': mergedPhones,
      'channels.addresses': mergedAddresses,
      labelIds: Array.from(mergedLabels),
      extendedFields: mergedExtendedFields,
      activitySummary: mergedSummary,
      'info.displayName': displayName,
      revision: primary.revision + 1,
      updatedAt: now,
    })

    // Log merge activity
    await adminDb.collection('esnaflar').doc(esnafId).collection('contact_activities').add({
      id: uuidv4(),
      contactId: primaryId,
      esnafId,
      type: 'contact.merged',
      data: { mergedFrom: secondaryIds },
      createdAt: now,
    })

    return NextResponse.json({
      ok: true,
      mesaj: `${secondaryIds.length} müşteri birleştirildi`,
      mergedContactId: primaryId,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Birleştirme başarısız', detay: error.message }, { status: 500 })
  }
}
