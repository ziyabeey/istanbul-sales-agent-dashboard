/**
 * CRM Analytics API
 * ──────────────────
 * GET /api/v1/crm/analytics — CRM dashboard analytics
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d'
    const daysBack = period === '7d' ? 7 : period === '90d' ? 90 : 30
    const startDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString()

    // Contact stats
    const contactsSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contacts').get()

    const contacts = contactsSnap.docs.map((d: any) => d.data())
    const totalContacts = contacts.length
    const newContacts = contacts.filter((c: any) => c.createdAt >= startDate).length
    const activeContacts = contacts.filter((c: any) => {
      const lastActivity = c.activitySummary?.lastMessageDate || c.activitySummary?.lastOrderDate || c.activitySummary?.lastVisitDate || ''
      return lastActivity >= startDate
    }).length

    const churnRisk = {
      low: contacts.filter((c: any) => c.aiMeta?.churnRisk === 'low').length,
      medium: contacts.filter((c: any) => c.aiMeta?.churnRisk === 'medium').length,
      high: contacts.filter((c: any) => c.aiMeta?.churnRisk === 'high').length,
    }

    // Channel reach
    const channelReach = {
      whatsapp: contacts.filter((c: any) => c.consent?.whatsappOptIn?.permitted).length,
      sms: contacts.filter((c: any) => c.consent?.iys?.sms?.permitted).length,
      email: contacts.filter((c: any) => c.consent?.iys?.email?.permitted).length,
    }

    // Tier distribution
    const tierDistribution = {
      visitor: contacts.filter((c: any) => c.identityTier === 'visitor').length,
      contact: contacts.filter((c: any) => c.identityTier === 'contact').length,
      customer: contacts.filter((c: any) => c.identityTier === 'customer').length,
    }

    // Source distribution
    const sources: Record<string, number> = {}
    contacts.forEach((c: any) => {
      const src = c.source?.channel || 'unknown'
      sources[src] = (sources[src] || 0) + 1
    })

    // Top labels
    const labelCounts: Record<string, number> = {}
    contacts.forEach((c: any) => {
      (c.labelIds || []).forEach((lid: string) => {
        labelCounts[lid] = (labelCounts[lid] || 0) + 1
      })
    })

    // Average LTV
    const customers = contacts.filter((c: any) => c.identityTier === 'customer')
    const avgLTV = customers.length > 0
      ? Math.round(customers.reduce((sum: number, c: any) => sum + (c.activitySummary?.totalSpent || 0), 0) / customers.length)
      : 0

    // Campaign stats
    const campaignsSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('campaigns')
      .where('createdAt', '>=', startDate)
      .get()

    const campaigns = campaignsSnap.docs.map((d: any) => d.data())
    const totalCampaignsSent = campaigns.filter((c: any) => c.status === 'sent').length

    return NextResponse.json({
      ok: true,
      period,
      contacts: {
        total: totalContacts,
        new: newContacts,
        active: activeContacts,
        churnRate: totalContacts > 0 ? Math.round((churnRisk.high / totalContacts) * 100) : 0,
        avgLifetimeValue: avgLTV,
      },
      churnRisk,
      channelReach,
      tierDistribution,
      sourceDistribution: sources,
      campaignsSent: totalCampaignsSent,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Analitik getirilemedi', detay: error.message }, { status: 500 })
  }
}
