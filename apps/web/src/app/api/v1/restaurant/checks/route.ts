/**
 * Restaurant Check (Adisyon) API
 * GET  /api/v1/restaurant/checks — List checks
 * POST /api/v1/restaurant/checks — Open, add item, payment, split, close
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
    const checkId = searchParams.get('id')

    if (checkId) {
      const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('checks').doc(checkId).get()
      if (!doc.exists) return NextResponse.json({ error: 'Adisyon bulunamadı' }, { status: 404 })
      return NextResponse.json({ ok: true, check: { id: doc.id, ...doc.data() } })
    }

    const status = searchParams.get('status') || 'open'
    const snap = await adminDb.collection('esnaflar').doc(esnafId).collection('checks')
      .where('status', '==', status).orderBy('openedAt', 'desc').limit(100).get()
    return NextResponse.json({ ok: true, checks: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })) })
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
      case 'open': {
        const { tableId, guestCount, waiterId, contactId } = body
        if (!tableId || !waiterId) return NextResponse.json({ error: 'tableId ve waiterId gerekli' }, { status: 400 })

        const check = {
          id: uuidv4(), esnafId, tableId, floorPlanId: body.floorPlanId || '', waiterId,
          contactId: contactId || null, guestCount: guestCount || 1,
          items: [], priceSummary: { subtotal: 0, discount: 0, serviceCharge: 0, serviceChargeRate: 0, tax: 0, total: 0, tip: 0, grandTotal: 0 },
          couponCode: null, payments: [], paymentStatus: 'unpaid', status: 'open',
          invoice: null, openedAt: new Date().toISOString(), firstOrderAt: null, lastOrderAt: null, closedAt: null,
          internalNote: body.internalNote || null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        }
        await adminDb.collection('esnaflar').doc(esnafId).collection('checks').doc(check.id).set(check)
        await adminDb.collection('esnaflar').doc(esnafId).collection('tables').doc(tableId).update({ status: 'occupied', currentCheckId: check.id, currentGuests: guestCount || 1, seatedAt: new Date().toISOString() })

        // CRM: Log activity if contact known
        if (contactId) {
          await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId).collection('activities').add({
            type: 'restaurant_visit', checkId: check.id, tableId, at: new Date().toISOString(),
          })
        }

        return NextResponse.json({ ok: true, check }, { status: 201 })
      }

      case 'add_item': {
        const { checkId, menuItemId, quantity, portionId, extras, specialRequests } = body
        if (!checkId || !menuItemId) return NextResponse.json({ error: 'checkId ve menuItemId gerekli' }, { status: 400 })

        const menuDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('menu_items').doc(menuItemId).get()
        if (!menuDoc.exists) return NextResponse.json({ error: 'Menü öğesi bulunamadı' }, { status: 404 })
        const menuItem = menuDoc.data()!

        let unitPrice = menuItem.pricing.basePrice
        const selectedPortion = portionId ? menuItem.pricing.portions?.find((p: any) => p.id === portionId) : null
        if (selectedPortion) unitPrice = selectedPortion.price

        const extrasTotal = (extras || []).reduce((sum: number, e: any) => {
          const found = menuItem.pricing.extras?.find((x: any) => x.id === e.extraId)
          return sum + (found?.price || 0) * (e.quantity || 1)
        }, 0)

        unitPrice += extrasTotal
        const lineTotal = unitPrice * (quantity || 1)

        const item = {
          id: uuidv4(), menuItemId, menuItemName: menuItem.name,
          portionId: portionId || null, portionName: selectedPortion?.name || null,
          extras: (extras || []).map((e: any) => ({ ...e, name: menuItem.pricing.extras?.find((x: any) => x.id === e.extraId)?.name || '', price: menuItem.pricing.extras?.find((x: any) => x.id === e.extraId)?.price || 0 })),
          quantity: quantity || 1, unitPrice, lineTotal,
          kitchenStatus: 'pending', orderedAt: new Date().toISOString(),
          specialRequests: specialRequests || null, voided: false,
        }

        const checkDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('checks').doc(checkId).get()
        const check = checkDoc.data()!
        const items = [...(check.items || []), item]
        const subtotal = items.filter((i: any) => !i.voided).reduce((s: number, i: any) => s + i.lineTotal, 0)
        const tax = subtotal * 10 / 110 // %10 KDV (dahil)

        await checkDoc.ref.update({
          items, 'priceSummary.subtotal': subtotal, 'priceSummary.tax': Math.round(tax * 100) / 100,
          'priceSummary.total': subtotal - (check.priceSummary?.discount || 0),
          'priceSummary.grandTotal': subtotal - (check.priceSummary?.discount || 0) + (check.priceSummary?.tip || 0),
          firstOrderAt: check.firstOrderAt || new Date().toISOString(), lastOrderAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        })

        return NextResponse.json({ ok: true, item, newTotal: subtotal })
      }

      case 'void_item': {
        const { checkId, itemId, reason, voidedBy } = body
        const checkDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('checks').doc(checkId).get()
        const items = (checkDoc.data()!.items || []).map((i: any) => i.id === itemId ? { ...i, voided: true, voidReason: reason, voidedBy, kitchenStatus: 'voided' } : i)
        const subtotal = items.filter((i: any) => !i.voided).reduce((s: number, i: any) => s + i.lineTotal, 0)
        await checkDoc.ref.update({ items, 'priceSummary.subtotal': subtotal, 'priceSummary.total': subtotal, updatedAt: new Date().toISOString() })
        return NextResponse.json({ ok: true, mesaj: 'Kalem iptal edildi', newTotal: subtotal })
      }

      case 'send_to_kitchen': {
        const { checkId } = body
        const checkDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('checks').doc(checkId).get()
        const check = checkDoc.data()!
        const pendingItems = check.items.filter((i: any) => i.kitchenStatus === 'pending' && !i.voided)
        if (!pendingItems.length) return NextResponse.json({ error: 'Mutfağa gönderilecek kalem yok' }, { status: 400 })

        // Create kitchen order
        const kitchenOrder = {
          id: uuidv4(), esnafId, source: 'table', checkId, tableId: check.tableId, tableName: `Masa ${check.tableId}`,
          items: pendingItems.map((i: any) => ({ id: i.id, checkItemId: i.id, menuItemId: i.menuItemId, menuItemName: i.menuItemName, quantity: i.quantity, portionName: i.portionName, extras: (i.extras || []).map((e: any) => e.name), specialRequests: i.specialRequests, status: 'sent', station: null })),
          priority: body.priority || 'normal', status: 'new',
          receivedAt: new Date().toISOString(), estimatedPrepTime: 15, notes: body.notes || null,
        }
        await adminDb.collection('esnaflar').doc(esnafId).collection('kitchen_orders').doc(kitchenOrder.id).set(kitchenOrder)

        // Update items status
        const updatedItems = check.items.map((i: any) => pendingItems.find((p: any) => p.id === i.id) ? { ...i, kitchenStatus: 'sent', sentToKitchenAt: new Date().toISOString() } : i)
        await checkDoc.ref.update({ items: updatedItems, updatedAt: new Date().toISOString() })

        return NextResponse.json({ ok: true, kitchenOrderId: kitchenOrder.id, sentCount: pendingItems.length })
      }

      case 'payment': {
        const { checkId, method, amount, tip, installmentCount } = body
        if (!checkId || !method || !amount) return NextResponse.json({ error: 'checkId, method, amount gerekli' }, { status: 400 })

        const payment = {
          id: uuidv4(), method, amount, tip: tip || 0,
          cardPayment: method === 'credit_card' ? { transactionId: 'iyzico-' + Date.now(), installmentCount: installmentCount || 1, last4: body.last4 || '****' } : null,
          splitType: body.splitType || null, splitGuestIndex: body.splitGuestIndex ?? null,
          processedAt: new Date().toISOString(),
        }

        const checkDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('checks').doc(checkId).get()
        const check = checkDoc.data()!
        const payments = [...(check.payments || []), payment]
        const totalPaid = payments.reduce((s: number, p: any) => s + p.amount, 0)
        const grandTotal = check.priceSummary.total + (tip || 0)

        await checkDoc.ref.update({
          payments, paymentStatus: totalPaid >= check.priceSummary.total ? 'paid' : 'partially_paid',
          'priceSummary.tip': (check.priceSummary.tip || 0) + (tip || 0),
          'priceSummary.grandTotal': grandTotal, updatedAt: new Date().toISOString(),
        })

        // Loyalty: add points if contact exists
        if (check.contactId) {
          const { FieldValue } = require('firebase-admin/firestore')
          await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(check.contactId)
            .update({ 'loyalty.points': FieldValue.increment(Math.floor(amount / 10)) }) // 1 puan / ₺10
        }

        return NextResponse.json({ ok: true, payment, totalPaid, remaining: Math.max(check.priceSummary.total - totalPaid, 0) })
      }

      case 'split': {
        const { checkId, splitType, guestCount } = body
        const checkDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('checks').doc(checkId).get()
        const check = checkDoc.data()!
        const perPerson = Math.ceil(check.priceSummary.total / (guestCount || 2))
        return NextResponse.json({ ok: true, splitType: splitType || 'equal', perPerson, guestCount: guestCount || 2, total: check.priceSummary.total })
      }

      case 'discount': {
        const { checkId, discountType, discountValue, reason, couponCode } = body
        const checkDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('checks').doc(checkId).get()
        const check = checkDoc.data()!
        let discount = 0
        if (discountType === 'percentage') discount = check.priceSummary.subtotal * discountValue / 100
        else discount = discountValue || 0

        await checkDoc.ref.update({
          'priceSummary.discount': discount, 'priceSummary.discountReason': reason || `%${discountValue}`,
          'priceSummary.total': check.priceSummary.subtotal - discount,
          'priceSummary.grandTotal': check.priceSummary.subtotal - discount + (check.priceSummary.tip || 0),
          couponCode: couponCode || null, updatedAt: new Date().toISOString(),
        })
        return NextResponse.json({ ok: true, discount, newTotal: check.priceSummary.subtotal - discount })
      }

      case 'close': {
        const { checkId } = body
        const checkDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('checks').doc(checkId).get()
        const check = checkDoc.data()!

        await checkDoc.ref.update({ status: 'paid', closedAt: new Date().toISOString() })
        await adminDb.collection('esnaflar').doc(esnafId).collection('tables').doc(check.tableId).update({ status: 'cleaning', currentCheckId: null, currentGuests: 0 })

        return NextResponse.json({ ok: true, mesaj: 'Adisyon kapatıldı', total: check.priceSummary.grandTotal })
      }

      default:
        return NextResponse.json({ error: 'action: open, add_item, void_item, send_to_kitchen, payment, split, discount, close' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
