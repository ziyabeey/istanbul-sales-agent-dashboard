/**
 * E-Commerce Analytics API
 * ────────────────────────
 * GET /api/v1/ecom/analytics — Dashboard analytics (last 30 days)
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

    let daysBack = 30
    if (period === '7d') daysBack = 7
    if (period === '90d') daysBack = 90

    const startDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString()

    // Fetch orders in period
    const ordersSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('orders')
      .where('createdAt', '>=', startDate)
      .orderBy('createdAt', 'desc')
      .get()

    const orders = ordersSnap.docs.map((doc: any) => doc.data())

    // ─── Summary ───
    const totalOrders = orders.length
    const totalRevenue = orders
      .filter((o: any) => o.paymentStatus === 'paid')
      .reduce((sum: number, o: any) => sum + (o.priceSummary?.total || 0), 0)
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0
    const pendingOrders = orders.filter((o: any) => o.status === 'pending' || o.status === 'confirmed').length
    const cancelledOrders = orders.filter((o: any) => o.status === 'cancelled').length
    const conversionRate = totalOrders > 0 ? Math.round((orders.filter((o: any) => o.status === 'delivered').length / totalOrders) * 100) : 0

    // ─── Daily Breakdown ───
    const dailyMap: Record<string, { revenue: number; orders: number }> = {}
    for (let i = 0; i < Math.min(daysBack, 30); i++) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const key = d.toISOString().split('T')[0]
      dailyMap[key] = { revenue: 0, orders: 0 }
    }

    orders.forEach((o: any) => {
      const day = o.createdAt?.split('T')[0]
      if (dailyMap[day]) {
        dailyMap[day].orders++
        if (o.paymentStatus === 'paid') {
          dailyMap[day].revenue += o.priceSummary?.total || 0
        }
      }
    })

    const dailyData = Object.entries(dailyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-7)
      .map(([date, data]) => ({
        date,
        revenue: Math.round(data.revenue),
        orders: data.orders,
      }))

    // ─── Top Products ───
    const productCounts: Record<string, { name: string; quantity: number; revenue: number }> = {}
    orders.forEach((o: any) => {
      (o.lineItems || []).forEach((item: any) => {
        if (!productCounts[item.productId]) {
          productCounts[item.productId] = { name: item.productName, quantity: 0, revenue: 0 }
        }
        productCounts[item.productId].quantity += item.quantity
        productCounts[item.productId].revenue += item.lineTotal
      })
    })

    const topProducts = Object.entries(productCounts)
      .sort(([, a], [, b]) => b.revenue - a.revenue)
      .slice(0, 5)
      .map(([id, data]) => ({ productId: id, ...data }))

    // ─── Status Distribution ───
    const statusDist: Record<string, number> = {}
    orders.forEach((o: any) => {
      statusDist[o.status] = (statusDist[o.status] || 0) + 1
    })

    // ─── Payment Method Distribution ───
    const paymentDist: Record<string, number> = {}
    orders.forEach((o: any) => {
      const method = o.payment?.method || 'unknown'
      paymentDist[method] = (paymentDist[method] || 0) + 1
    })

    // ─── Low Stock Count ───
    const productsSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('products')
      .where('status', '==', 'active')
      .get()

    let lowStockProducts = 0
    productsSnap.docs.forEach((doc: any) => {
      const variants = doc.data().variants || []
      for (const v of variants) {
        if (v.inventory?.trackQuantity && v.inventory.quantity <= (v.inventory.lowStockThreshold || 5)) {
          lowStockProducts++
          break
        }
      }
    })

    return NextResponse.json({
      ok: true,
      period,
      summary: {
        totalOrders,
        totalRevenue: Math.round(totalRevenue),
        avgOrderValue,
        pendingOrders,
        cancelledOrders,
        conversionRate,
        lowStockProducts,
      },
      dailyData,
      topProducts,
      statusDistribution: statusDist,
      paymentDistribution: paymentDist,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Analitik getirilemedi', detay: error.message }, { status: 500 })
  }
}
