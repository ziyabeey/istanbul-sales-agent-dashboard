/**
 * Analytics Export API
 * ─────────────────────
 * POST /api/v1/marketing/analytics/export — Export data as CSV/JSON
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { dataType, format, period } = body

    if (!dataType) return NextResponse.json({ error: 'dataType gerekli' }, { status: 400 })

    const daysBack = period === '7d' ? 7 : period === '90d' ? 90 : period === '365d' ? 365 : 30
    const startDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString()

    let data: any[] = []
    let columns: string[] = []

    switch (dataType) {
      case 'orders': {
        const snap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('orders').where('createdAt', '>=', startDate)
          .orderBy('createdAt', 'desc').get()
        data = snap.docs.map((d: any) => {
          const o = d.data()
          return {
            siparis_no: o.orderNumber || d.id,
            tarih: o.createdAt,
            musteri: o.customer?.name || '',
            telefon: o.customer?.phone || '',
            toplam: o.total || 0,
            durum: o.status,
            odeme: o.payment?.method || '',
          }
        })
        columns = ['siparis_no', 'tarih', 'musteri', 'telefon', 'toplam', 'durum', 'odeme']
        break
      }

      case 'contacts': {
        const snap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('contacts').where('createdAt', '>=', startDate)
          .orderBy('createdAt', 'desc').get()
        data = snap.docs.map((d: any) => {
          const c = d.data()
          return {
            ad: c.info?.firstName || '',
            soyad: c.info?.lastName || '',
            telefon: c.channels?.phones?.[0]?.number || '',
            email: c.channels?.emails?.[0]?.email || '',
            kaynak: c.source?.channel || '',
            tier: c.identityTier || '',
            toplam_harcama: c.activitySummary?.totalSpent || 0,
            kayit_tarihi: c.createdAt,
          }
        })
        columns = ['ad', 'soyad', 'telefon', 'email', 'kaynak', 'tier', 'toplam_harcama', 'kayit_tarihi']
        break
      }

      case 'traffic': {
        const snap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('analytics_daily')
          .where('date', '>=', startDate.split('T')[0])
          .orderBy('date', 'asc').get()
        data = snap.docs.map((d: any) => d.data())
        columns = ['date', 'visitors', 'pageViews', 'orders', 'revenue', 'bounceRate']
        break
      }

      case 'campaigns': {
        const snap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('campaigns').where('createdAt', '>=', startDate).get()
        data = snap.docs.map((d: any) => {
          const c = d.data()
          return {
            ad: c.name,
            tip: c.type,
            durum: c.status,
            gonderim: c.stats?.sent || 0,
            acilma: c.stats?.opened || 0,
            tiklama: c.stats?.clicked || 0,
            donusum: c.stats?.conversions || 0,
            gelir: c.stats?.revenue || 0,
            tarih: c.createdAt,
          }
        })
        columns = ['ad', 'tip', 'durum', 'gonderim', 'acilma', 'tiklama', 'donusum', 'gelir', 'tarih']
        break
      }

      default:
        return NextResponse.json({
          error: 'Geçersiz dataType',
          valid: ['orders', 'contacts', 'traffic', 'campaigns'],
        }, { status: 400 })
    }

    if (format === 'csv') {
      const header = columns.join(',')
      const rows = data.map(row => columns.map(col => {
        const val = row[col]
        if (typeof val === 'string' && val.includes(',')) return `"${val}"`
        return val ?? ''
      }).join(','))

      const csv = [header, ...rows].join('\n')
      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${dataType}_export.csv"`,
        },
      })
    }

    return NextResponse.json({ ok: true, dataType, period, count: data.length, data })
  } catch (error: any) {
    return NextResponse.json({ error: 'Export başarısız', detay: error.message }, { status: 500 })
  }
}
