/**
 * Restaurant Tables API — Floor Plans + Table CRUD + Status + Merge
 * GET  /api/v1/restaurant/tables — Floor plans, tables, table detail
 * POST /api/v1/restaurant/tables — CRUD + status + merge/unmerge
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'tables'

    if (mode === 'floor_plans') {
      const snap = await adminDb.collection('esnaflar').doc(esnafId).collection('floor_plans').get()
      return NextResponse.json({ ok: true, floorPlans: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })) })
    }

    if (mode === 'table') {
      const id = searchParams.get('id')!
      const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('tables').doc(id).get()
      if (!doc.exists) return NextResponse.json({ error: 'Masa bulunamadı' }, { status: 404 })
      const table = { id: doc.id, ...doc.data() }

      // Include current check if occupied
      let currentCheck = null
      if (doc.data()!.currentCheckId) {
        const checkDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('checks').doc(doc.data()!.currentCheckId).get()
        if (checkDoc.exists) currentCheck = { id: checkDoc.id, ...checkDoc.data() }
      }

      return NextResponse.json({ ok: true, table, currentCheck })
    }

    // All tables with status
    const floorPlanId = searchParams.get('floorPlanId')
    let query: any = adminDb.collection('esnaflar').doc(esnafId).collection('tables')
    if (floorPlanId) query = query.where('floorPlanId', '==', floorPlanId)
    const snap = await query.get()

    return NextResponse.json({
      ok: true,
      tables: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })),
      summary: {
        total: snap.size,
        available: snap.docs.filter((d: any) => d.data().status === 'available').length,
        occupied: snap.docs.filter((d: any) => d.data().status === 'occupied').length,
        reserved: snap.docs.filter((d: any) => d.data().status === 'reserved').length,
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    switch (body.action) {
      case 'create_floor_plan': {
        const fp = {
          id: uuidv4(), esnafId, name: body.name || 'Ana Salon',
          layout: body.layout || { width: 10, height: 10 },
          fixtures: body.fixtures || [], createdAt: new Date().toISOString(),
        }
        await adminDb.collection('esnaflar').doc(esnafId).collection('floor_plans').doc(fp.id).set(fp)
        return NextResponse.json({ ok: true, floorPlan: fp }, { status: 201 })
      }

      case 'create_table': {
        const table = {
          id: uuidv4(), esnafId, floorPlanId: body.floorPlanId,
          number: body.number, name: body.name || null,
          capacity: body.capacity || { min: 1, max: 4, shape: 'square' },
          position: body.position || { x: 0, y: 0 }, rotation: body.rotation || 0,
          status: 'available', currentCheckId: null, currentGuests: 0, seatedAt: null,
          nextReservation: null, assignedWaiterId: body.assignedWaiterId || null, mergedWith: [],
        }
        await adminDb.collection('esnaflar').doc(esnafId).collection('tables').doc(table.id).set(table)
        return NextResponse.json({ ok: true, table }, { status: 201 })
      }

      case 'update_status': {
        const { tableId, status, guestCount, waiterId } = body
        if (!tableId || !status) return NextResponse.json({ error: 'tableId ve status gerekli' }, { status: 400 })

        const updates: any = { status, updatedAt: new Date().toISOString() }
        if (status === 'occupied') { updates.seatedAt = new Date().toISOString(); updates.currentGuests = guestCount || 1 }
        if (status === 'available') { updates.currentCheckId = null; updates.currentGuests = 0; updates.seatedAt = null }
        if (waiterId) updates.assignedWaiterId = waiterId

        await adminDb.collection('esnaflar').doc(esnafId).collection('tables').doc(tableId).update(updates)
        return NextResponse.json({ ok: true, mesaj: `Masa ${body.tableNumber || ''} → ${status}` })
      }

      case 'merge': {
        const { primaryTableId, mergeTableIds } = body
        if (!primaryTableId || !mergeTableIds?.length) return NextResponse.json({ error: 'primaryTableId ve mergeTableIds gerekli' }, { status: 400 })

        await adminDb.collection('esnaflar').doc(esnafId).collection('tables').doc(primaryTableId).update({ mergedWith: mergeTableIds, status: 'occupied' })
        for (const tid of mergeTableIds) {
          await adminDb.collection('esnaflar').doc(esnafId).collection('tables').doc(tid).update({ status: 'merged', mergedWith: [primaryTableId] })
        }
        return NextResponse.json({ ok: true, mesaj: `Masalar birleştirildi: ${[primaryTableId, ...mergeTableIds].join(' + ')}` })
      }

      case 'unmerge': {
        const { tableId } = body
        const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('tables').doc(tableId).get()
        if (!doc.exists) return NextResponse.json({ error: 'Masa bulunamadı' }, { status: 404 })
        const mergedWith = doc.data()!.mergedWith || []
        for (const tid of mergedWith) {
          await adminDb.collection('esnaflar').doc(esnafId).collection('tables').doc(tid).update({ status: 'available', mergedWith: [] })
        }
        await doc.ref.update({ mergedWith: [], status: 'available' })
        return NextResponse.json({ ok: true, mesaj: 'Masalar ayrıldı' })
      }

      case 'update_floor_plan': {
        const { floorPlanId, ...fpUpdates } = body
        const { action: _, ...safe } = fpUpdates
        await adminDb.collection('esnaflar').doc(esnafId).collection('floor_plans').doc(floorPlanId).update(safe)
        return NextResponse.json({ ok: true, mesaj: 'Salon planı güncellendi' })
      }

      default:
        return NextResponse.json({ error: 'action: create_floor_plan, create_table, update_status, merge, unmerge, update_floor_plan' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
