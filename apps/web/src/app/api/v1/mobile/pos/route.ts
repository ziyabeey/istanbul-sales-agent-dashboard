/**
 * Mobile POS API — Sale, QR Payment, Receipt
 * POST /api/v1/mobile/pos — POS operations
 * GET  /api/v1/mobile/pos — QR payment status
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
    const sessionId = searchParams.get('sessionId')

    if (sessionId) {
      // QR payment status check (polling)
      const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('pos_sessions').doc(sessionId).get()
      if (!doc.exists) return NextResponse.json({ error: 'Oturum bulunamadı' }, { status: 404 })
      return NextResponse.json({ ok: true, session: doc.data() })
    }

    // Recent POS sales
    const snap = await adminDb.collection('esnaflar').doc(esnafId).collection('pos_sales')
      .orderBy('createdAt', 'desc').limit(20).get()
    return NextResponse.json({ ok: true, sales: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })) })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()
    const now = new Date().toISOString()

    switch (body.action) {
      case 'sale': {
        // Create POS sale
        const { items, paymentMethod, customerPhone, total } = body
        if (!items?.length || !total) return NextResponse.json({ error: 'items ve total gerekli' }, { status: 400 })

        const sale = {
          id: uuidv4(), esnafId,
          items, total,
          paymentMethod: paymentMethod || 'cash', // cash, card, nfc, qr
          customerPhone,
          status: paymentMethod === 'cash' ? 'completed' : 'pending',
          createdAt: now,
        }

        await adminDb.collection('esnaflar').doc(esnafId).collection('pos_sales').doc(sale.id).set(sale)

        // Auto-detect customer for loyalty
        if (customerPhone) {
          const contactSnap = await adminDb.collection('esnaflar').doc(esnafId)
            .collection('contacts').where('channels.phones', 'array-contains', { number: customerPhone, primary: true }).limit(1).get()
          if (!contactSnap.empty) {
            const contact = contactSnap.docs[0]
            // Earn loyalty points
            const points = Math.floor(total)
            await contact.ref.update({ 'loyalty.points': (contact.data().loyalty?.points || 0) + points })
          }
        }

        return NextResponse.json({ ok: true, sale, mesaj: paymentMethod === 'cash' ? 'Satış kaydedildi' : 'Ödeme bekleniyor' })
      }

      case 'qr_generate': {
        // Generate QR payment session
        const { amount, description } = body
        if (!amount) return NextResponse.json({ error: 'amount gerekli' }, { status: 400 })

        const sessionId = uuidv4()
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const domain = esnafDoc.data()?.domain || 'kepenk.site'

        await adminDb.collection('esnaflar').doc(esnafId).collection('pos_sessions').doc(sessionId).set({
          id: sessionId, esnafId, amount, description,
          paymentUrl: `https://${domain}/pay/${sessionId}`,
          status: 'waiting', // waiting → paid → expired
          expiresAt: new Date(Date.now() + 15 * 60000).toISOString(), // 15 min
          createdAt: now,
        })

        return NextResponse.json({
          ok: true, sessionId,
          qrContent: `https://${domain}/pay/${sessionId}`,
          expiresIn: 900,
          mesaj: 'QR ödeme kodu oluşturuldu',
        })
      }

      case 'receipt': {
        // Send receipt
        const { saleId, channel, recipient } = body
        if (!saleId) return NextResponse.json({ error: 'saleId gerekli' }, { status: 400 })

        const saleDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('pos_sales').doc(saleId).get()
        if (!saleDoc.exists) return NextResponse.json({ error: 'Satış bulunamadı' }, { status: 404 })
        const sale = saleDoc.data()!

        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data() || {}

        const receiptText = [
          `🧾 ${esnaf.isletmeAdi || 'İşletme'}`,
          esnaf.adres || '', '---',
          ...sale.items.map((i: any) => `${i.name} x${i.qty || 1} — ${i.price} ₺`),
          '---', `Toplam: ${sale.total} ₺`,
          `Ödeme: ${sale.paymentMethod === 'cash' ? 'Nakit' : 'Kart'}`,
          new Date(sale.createdAt).toLocaleString('tr-TR'),
        ].join('\n')

        // TODO: Send via WhatsApp/email/SMS based on channel
        return NextResponse.json({ ok: true, receipt: receiptText, channel: channel || 'whatsapp', mesaj: 'Fiş gönderildi' })
      }

      default:
        return NextResponse.json({ error: 'action: sale, qr_generate, receipt' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
