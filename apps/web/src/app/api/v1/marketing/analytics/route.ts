/**
 * Analytics API — Overview, Traffic, Sales, Funnel, Realtime
 * ───────────────────────────────────────────────────────────
 * GET /api/v1/marketing/analytics — Multi-purpose analytics
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const module = searchParams.get('module') || 'overview'
    const period = searchParams.get('period') || '30d'
    const daysBack = period === '7d' ? 7 : period === '90d' ? 90 : period === '365d' ? 365 : 30
    const startDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString()

    switch (module) {
      case 'overview': {
        // Core metrics
        const ordersSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('orders').where('createdAt', '>=', startDate).get()
        const orders = ordersSnap.docs.map((d: any) => d.data())

        const bookingsSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('bookings').where('createdAt', '>=', startDate).get()

        const contactsSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('contacts').where('createdAt', '>=', startDate).get()

        const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0)
        const totalOrders = orders.length
        const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0

        // Today's stats from cache
        const todayStr = new Date().toISOString().split('T')[0]
        const todayDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('analytics_daily').doc(todayStr).get()
        const today = todayDoc.exists ? todayDoc.data() : { visitors: 0, pageViews: 0, orders: 0, revenue: 0 }

        return NextResponse.json({
          ok: true,
          period,
          today: {
            visitors: today?.visitors || 0,
            orders: today?.orders || 0,
            revenue: today?.revenue || 0,
            bookings: bookingsSnap.size,
          },
          period_totals: {
            revenue: totalRevenue,
            orders: totalOrders,
            avgOrderValue,
            newContacts: contactsSnap.size,
            bookings: bookingsSnap.size,
          },
        })
      }

      case 'traffic': {
        // Traffic data from daily analytics cache
        const dailySnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('analytics_daily')
          .where('date', '>=', startDate.split('T')[0])
          .orderBy('date', 'asc').get()

        const dailyData = dailySnap.docs.map((d: any) => d.data())
        const totalVisitors = dailyData.reduce((sum: number, d: any) => sum + (d.visitors || 0), 0)
        const totalPageViews = dailyData.reduce((sum: number, d: any) => sum + (d.pageViews || 0), 0)

        // Source cache
        const sourceDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('analytics_cache').doc(`traffic_sources_${period}`).get()

        return NextResponse.json({
          ok: true,
          period,
          visitors: totalVisitors,
          pageViews: totalPageViews,
          daily: dailyData,
          sources: sourceDoc.exists ? sourceDoc.data() : {
            google: 0, direct: 0, social: 0, whatsapp: 0,
            sms: 0, email: 0, referral: 0, ads: 0,
          },
        })
      }

      case 'sales': {
        const ordersSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('orders').where('createdAt', '>=', startDate)
          .orderBy('createdAt', 'desc').get()

        const orders = ordersSnap.docs.map((d: any) => d.data())
        const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0)

        // Top products
        const productCounts: Record<string, { name: string; count: number; revenue: number }> = {}
        orders.forEach((o: any) => {
          (o.items || []).forEach((item: any) => {
            const key = item.productId || item.name
            if (!productCounts[key]) productCounts[key] = { name: item.name, count: 0, revenue: 0 }
            productCounts[key].count += item.quantity || 1
            productCounts[key].revenue += (item.price || 0) * (item.quantity || 1)
          })
        })
        const topProducts = Object.values(productCounts)
          .sort((a, b) => b.revenue - a.revenue).slice(0, 10)

        // Payment method distribution
        const paymentMethods: Record<string, number> = {}
        orders.forEach((o: any) => {
          const method = o.payment?.method || 'unknown'
          paymentMethods[method] = (paymentMethods[method] || 0) + 1
        })

        return NextResponse.json({
          ok: true,
          period,
          totalRevenue,
          totalOrders: orders.length,
          avgOrderValue: orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0,
          topProducts,
          paymentMethods,
        })
      }

      case 'funnel': {
        // Conversion funnel from cache
        const funnelDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('analytics_cache').doc(`funnel_${period}`).get()

        return NextResponse.json({
          ok: true,
          period,
          funnel: funnelDoc.exists ? funnelDoc.data() : {
            visit: 0,
            productView: 0,
            addToCart: 0,
            checkout: 0,
            purchase: 0,
          },
        })
      }

      case 'realtime': {
        // Real-time data from Firestore
        const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
        const realtimeSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('realtime_sessions')
          .where('lastSeen', '>=', fiveMinAgo).get()

        const sessions = realtimeSnap.docs.map((d: any) => d.data())
        const pages: Record<string, number> = {}
        sessions.forEach((s: any) => {
          const page = s.currentPage || '/'
          pages[page] = (pages[page] || 0) + 1
        })

        return NextResponse.json({
          ok: true,
          activeVisitors: sessions.length,
          pages,
          devices: {
            mobile: sessions.filter((s: any) => s.device === 'mobile').length,
            desktop: sessions.filter((s: any) => s.device === 'desktop').length,
          },
        })
      }

      default:
        return NextResponse.json({ error: 'Geçersiz module', valid: ['overview', 'traffic', 'sales', 'funnel', 'realtime'] }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Analitik getirilemedi', detay: error.message }, { status: 500 })
  }
}
