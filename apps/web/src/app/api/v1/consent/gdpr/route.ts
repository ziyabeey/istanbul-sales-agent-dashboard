/**
 * KVKK / GDPR Compliance API — Data subject rights
 * GET  /api/v1/consent/gdpr — Info request
 * POST /api/v1/consent/gdpr — Erase, export, objection
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { logAuditEvent } from '@/lib/security/auditLogger'
import { maskValue } from '@/lib/security/encryption'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const contactId = searchParams.get('contactId')
    const mode = searchParams.get('mode') || 'info'

    if (!contactId) return NextResponse.json({ error: 'contactId gerekli' }, { status: 400 })

    const contactDoc = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('contacts').doc(contactId).get()
    if (!contactDoc.exists) return NextResponse.json({ error: 'Kişi bulunamadı' }, { status: 404 })
    const contact = contactDoc.data()!

    if (mode === 'info') {
      // KVKK m.11/1-a — bilgi edinme hakkı
      return NextResponse.json({
        ok: true,
        kvkk_bilgi: {
          veriSorumlusu: 'kepenk.ai platformu üzerinden işletme',
          islemAmaci: 'Müşteri ilişkileri yönetimi, sipariş/randevu takibi, pazarlama iletişimi',
          veriKategorileri: ['Ad-soyad', 'Telefon', 'E-posta', 'Adres', 'Sipariş geçmişi', 'Randevu geçmişi'],
          aktarimYapilan: ['İyzico (ödeme işleme)', 'Twilio (WhatsApp/SMS)', 'Claude AI (anonimleştirilmiş)'],
          saklama: 'Hesap ömrü + 10 yıl (VUK gereği fatura verileri)',
          haklariniz: ['Düzeltme', 'Silme (unutulma)', 'Veri taşınabilirliği', 'İşlemeyi durdurma', 'İtiraz'],
          storedData: {
            name: contact.info?.displayName || '',
            phone: contact.channels?.phones?.[0]?.number ? maskValue(contact.channels.phones[0].number, 'phone') : '',
            email: contact.channels?.emails?.[0]?.email ? maskValue(contact.channels.emails[0].email, 'email') : '',
            createdAt: contact.createdAt,
            lastActivity: contact.activitySummary?.lastSeen,
          },
        },
      })
    }

    if (mode === 'data_categories') {
      return NextResponse.json({
        ok: true,
        categories: [
          { name: 'Kimlik', fields: ['Ad', 'Soyad'], basis: 'Sözleşme' },
          { name: 'İletişim', fields: ['Telefon', 'E-posta', 'Adres'], basis: 'Sözleşme + Meşru menfaat' },
          { name: 'Finansal', fields: ['Sipariş geçmişi', 'Ödeme bilgileri (maskelenmiş)'], basis: 'Sözleşme + Yasal zorunluluk (VUK)' },
          { name: 'Pazarlama', fields: ['İletişim tercihleri', 'Kampanya etkileşimi'], basis: 'Açık rıza' },
          { name: 'Sağlık', fields: ['Alerji bilgisi (sadece ilgili sektörler)'], basis: 'Açık rıza (KVKK m.6)' },
        ],
      })
    }

    return NextResponse.json({ error: 'mode: info, data_categories' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()
    const { contactId, action } = body

    if (!contactId) return NextResponse.json({ error: 'contactId gerekli' }, { status: 400 })

    switch (action) {
      case 'erase': {
        // KVKK m.7 — Silme/unutulma hakkı
        // Fatura/vergi verileri HARİÇ — VUK gereği 10 yıl saklanır
        const contactRef = adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId)
        const contactDoc = await contactRef.get()
        if (!contactDoc.exists) return NextResponse.json({ error: 'Kişi bulunamadı' }, { status: 404 })

        // Anonymize instead of delete (preserve order/invoice references)
        await contactRef.update({
          'info.displayName': 'Silinmiş Müşteri',
          'info.firstName': '', 'info.lastName': '',
          'channels.phones': [], 'channels.emails': [], 'channels.addresses': [],
          'tags': [], 'notes': [],
          'gdprErased': true,
          'gdprErasedAt': new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })

        // Delete favorites subcollection
        const favSnap = await contactRef.collection('favorites').get()
        for (const doc of favSnap.docs) await doc.ref.delete()

        await logAuditEvent({
          eventType: 'data.gdpr_erase_request', actorId: esnafId, actorType: 'esnaf',
          esnafId, resourceType: 'contact', resourceId: contactId, result: 'success',
          details: { reason: body.reason || 'Müşteri talebi' },
        })

        return NextResponse.json({
          ok: true,
          mesaj: 'Kişisel veriler anonimleştirildi. Fatura verileri yasal zorunluluk (VUK) gereği saklanmaya devam eder.',
          retainedData: ['Fatura kayıtları (10 yıl)', 'Sipariş numaraları (referans)'],
        })
      }

      case 'export': {
        // KVKK m.11/1-ç — Veri taşınabilirliği
        const contactDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('contacts').doc(contactId).get()
        if (!contactDoc.exists) return NextResponse.json({ error: 'Kişi bulunamadı' }, { status: 404 })

        const ordersSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('orders').where('contactId', '==', contactId).limit(500).get()
        const bookingsSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('bookings').where('contactId', '==', contactId).limit(500).get()

        await logAuditEvent({
          eventType: 'data.customer_export', actorId: esnafId, actorType: 'esnaf',
          esnafId, resourceType: 'contact', resourceId: contactId, result: 'success',
        })

        return NextResponse.json({
          ok: true, format: 'JSON',
          exportData: {
            contact: contactDoc.data(),
            orders: ordersSnap.docs.map((d: any) => d.data()),
            bookings: bookingsSnap.docs.map((d: any) => d.data()),
            exportedAt: new Date().toISOString(),
          },
        })
      }

      case 'objection': {
        // KVKK m.11/1-e — İtiraz hakkı
        await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId)
          .update({ 'consent.marketingOptIn': false, 'consent.objectionDate': new Date().toISOString(), 'consent.objectionReason': body.reason })

        return NextResponse.json({ ok: true, mesaj: 'İtiraz kaydedildi. Pazarlama iletişimi durduruldu.' })
      }

      case 'stop_processing': {
        // KVKK m.11/1-d — İşlemeyi durdurma
        await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId)
          .update({ 'consent.processingHalted': true, 'consent.haltDate': new Date().toISOString() })

        return NextResponse.json({ ok: true, mesaj: 'Kişisel veri işleme durduruldu. Yasal zorunluluklar hariç.' })
      }

      default:
        return NextResponse.json({ error: 'action: erase, export, objection, stop_processing' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
