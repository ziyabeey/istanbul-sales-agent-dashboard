/**
 * Restaurant Analytics API — Daily, Menu Perf, Table Turnover, Food Cost
 * GET /api/v1/restaurant/analytics — KPI-focused restaurant reports
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const report = searchParams.get('report') || 'daily'
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]

    if (report === 'daily') {
      // Today's KPI summary
      const checksSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('checks')
        .where('status', '==', 'paid').limit(500).get()
      const todayChecks = checksSnap.docs.map((d: any) => d.data()).filter((c: any) => c.closedAt?.startsWith(date))

      const takeawaySnap = await adminDb.collection('esnaflar').doc(esnafId).collection('takeaway_orders')
        .where('status', '==', 'delivered').limit(200).get()
      const todayTakeaway = takeawaySnap.docs.map((d: any) => d.data()).filter((o: any) => o.deliveredAt?.startsWith(date))

      const salonRevenue = todayChecks.reduce((s: number, c: any) => s + (c.priceSummary?.grandTotal || 0), 0)
      const takeawayRevenue = todayTakeaway.reduce((s: number, o: any) => s + (o.total || 0), 0)
      const totalRevenue = salonRevenue + takeawayRevenue
      const avgCheck = todayChecks.length > 0 ? Math.round(salonRevenue / todayChecks.length) : 0
      const totalTips = todayChecks.reduce((s: number, c: any) => s + (c.priceSummary?.tip || 0), 0)

      // Table stats
      const tablesSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('tables').get()
      const totalTables = tablesSnap.size
      const occupied = tablesSnap.docs.filter((d: any) => d.data().status === 'occupied').length

      // Kitchen stats
      const kitchenSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('kitchen_orders')
        .where('status', 'in', ['ready', 'served']).limit(200).get()
      const todayKitchen = kitchenSnap.docs.map((d: any) => d.data()).filter((o: any) => o.completedAt?.startsWith(date))
      const prepTimes = todayKitchen.filter((o: any) => o.actualPrepTime).map((o: any) => o.actualPrepTime)
      const avgPrepTime = prepTimes.length > 0 ? Math.round(prepTimes.reduce((a: number, b: number) => a + b, 0) / prepTimes.length) : 0

      return NextResponse.json({
        ok: true, date, report: 'daily',
        kpis: {
          revenue: { total: totalRevenue, salon: salonRevenue, takeaway: takeawayRevenue, tips: totalTips },
          orders: { salon: todayChecks.length, takeaway: todayTakeaway.length, total: todayChecks.length + todayTakeaway.length },
          averageCheckAmount: avgCheck,
          tables: { total: totalTables, currentlyOccupied: occupied, occupancyRate: totalTables > 0 ? Math.round(occupied / totalTables * 100) : 0 },
          kitchen: { ordersCompleted: todayKitchen.length, averagePrepTime: avgPrepTime, lateOrders: todayKitchen.filter((o: any) => (o.actualPrepTime || 0) > (o.estimatedPrepTime || 15)).length },
        },
      })
    }

    if (report === 'menu_performance') {
      const checksSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('checks')
        .where('status', '==', 'paid').limit(500).get()

      const itemCounts: Record<string, { name: string; quantity: number; revenue: number }> = {}
      for (const doc of checksSnap.docs) {
        for (const item of (doc.data().items || [])) {
          if (item.voided) continue
          if (!itemCounts[item.menuItemId]) itemCounts[item.menuItemId] = { name: item.menuItemName, quantity: 0, revenue: 0 }
          itemCounts[item.menuItemId].quantity += item.quantity
          itemCounts[item.menuItemId].revenue += item.lineTotal
        }
      }

      const sorted = Object.entries(itemCounts).map(([id, data]) => ({ menuItemId: id, ...data })).sort((a, b) => b.revenue - a.revenue)

      return NextResponse.json({
        ok: true, report: 'menu_performance',
        topSellers: sorted.slice(0, 10),
        bottomSellers: sorted.slice(-5).reverse(),
        totalUniqueItems: sorted.length,
      })
    }

    if (report === 'table_turnover') {
      const checksSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('checks')
        .where('status', '==', 'paid').limit(500).get()
      const todayChecks = checksSnap.docs.map((d: any) => d.data()).filter((c: any) => c.closedAt?.startsWith(date))

      const tableTurns: Record<string, number> = {}
      const seatDurations: number[] = []
      for (const check of todayChecks) {
        tableTurns[check.tableId] = (tableTurns[check.tableId] || 0) + 1
        if (check.openedAt && check.closedAt) {
          const duration = (new Date(check.closedAt).getTime() - new Date(check.openedAt).getTime()) / 60000
          seatDurations.push(duration)
        }
      }

      const avgSeatDuration = seatDurations.length > 0 ? Math.round(seatDurations.reduce((a, b) => a + b, 0) / seatDurations.length) : 0
      const avgTurnover = Object.values(tableTurns).length > 0 ? (Object.values(tableTurns).reduce((a, b) => a + b, 0) / Object.values(tableTurns).length).toFixed(1) : '0'

      return NextResponse.json({
        ok: true, date, report: 'table_turnover',
        averageSeatDuration: avgSeatDuration, // minutes
        averageTurnoversPerTable: parseFloat(avgTurnover),
        tablesUsed: Object.keys(tableTurns).length,
        totalSeatings: Object.values(tableTurns).reduce((a, b) => a + b, 0),
      })
    }

    if (report === 'food_cost') {
      const recipesSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('recipes').limit(200).get()
      const recipes = recipesSnap.docs.map((d: any) => ({ id: d.id, ...d.data() }))

      const overTarget = recipes.filter((r: any) => r.foodCostPercentage > (r.targetFoodCost || 30))
      const avgFoodCost = recipes.length > 0 ? Math.round(recipes.reduce((s: number, r: any) => s + (r.foodCostPercentage || 0), 0) / recipes.length * 10) / 10 : 0

      return NextResponse.json({
        ok: true, report: 'food_cost',
        averageFoodCostPercent: avgFoodCost,
        targetFoodCost: 30,
        overTargetRecipes: overTarget.map((r: any) => ({ name: r.name, foodCost: r.foodCostPercentage, target: r.targetFoodCost || 30 })),
        totalRecipes: recipes.length,
        status: avgFoodCost > 35 ? '🔴 Food cost çok yüksek!' : avgFoodCost > 30 ? '🟡 Hedef üstünde' : '🟢 Hedefte',
      })
    }

    if (report === 'kitchen_times') {
      const kitchenSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('kitchen_orders')
        .where('status', 'in', ['ready', 'served']).limit(500).get()

      const byStation: Record<string, number[]> = {}
      for (const doc of kitchenSnap.docs) {
        const order = doc.data()
        if (!order.actualPrepTime) continue
        for (const item of (order.items || [])) {
          const station = item.station || 'genel'
          if (!byStation[station]) byStation[station] = []
          byStation[station].push(order.actualPrepTime)
        }
      }

      const stationStats = Object.entries(byStation).map(([station, times]) => ({
        station, avgPrepTime: Math.round(times.reduce((a, b) => a + b, 0) / times.length), orderCount: times.length,
      }))

      return NextResponse.json({ ok: true, report: 'kitchen_times', stations: stationStats })
    }

    return NextResponse.json({ error: 'report: daily, menu_performance, table_turnover, food_cost, kitchen_times' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
