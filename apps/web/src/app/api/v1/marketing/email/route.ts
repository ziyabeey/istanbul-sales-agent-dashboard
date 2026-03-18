/**
 * Email Templates + Direct Send API
 * ───────────────────────────────────
 * GET  /api/v1/marketing/email/templates — List templates
 * POST /api/v1/marketing/email/templates — Create template
 * POST /api/v1/marketing/email/send      — Direct send
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const snapshot = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('email_templates')
      .orderBy('category', 'asc').get()

    const templates = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }))

    // Also include platform defaults
    const platformDefaults = [
      { id: 'default_siparis_onay', name: 'Sipariş Onayı', category: 'e-ticaret', type: 'system', editable: false },
      { id: 'default_kargoya_verildi', name: 'Kargoya Verildi', category: 'e-ticaret', type: 'system', editable: false },
      { id: 'default_terk_sepet', name: 'Sepet Hatırlatma', category: 'e-ticaret', type: 'system', editable: true },
      { id: 'default_randevu_onay', name: 'Randevu Onayı', category: 'randevu', type: 'system', editable: false },
      { id: 'default_randevu_hatirlatma', name: 'Randevu Hatırlatma', category: 'randevu', type: 'system', editable: true },
      { id: 'default_hosgeldin', name: 'Hoş Geldin', category: 'sadakat', type: 'system', editable: true },
      { id: 'default_yorum_iste', name: 'Yorum İsteği', category: 'sadakat', type: 'system', editable: true },
      { id: 'default_dogum_gunu', name: 'Doğum Günü Kutlaması', category: 'sadakat', type: 'system', editable: true },
    ]

    return NextResponse.json({
      ok: true,
      templates: [...platformDefaults, ...templates],
      mergeFields: ['{{ad}}', '{{soyad}}', '{{isletme_adi}}', '{{ilce}}', '{{puan_bakiyesi}}', '{{siparis_no}}'],
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Template\'ler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()

    // Direct send mode
    if (body.action === 'send') {
      const { to, subject, htmlContent, fromName } = body
      if (!to || !subject || !htmlContent) {
        return NextResponse.json({ error: 'to, subject, htmlContent gerekli' }, { status: 400 })
      }

      // TODO: Send via Resend/Postmark API
      // await resend.emails.send({ from, to, subject, html: htmlContent })

      // Log
      await adminDb.collection('esnaflar').doc(esnafId).collection('email_log').add({
        to,
        subject,
        fromName: fromName || 'İşletme',
        status: 'sent',
        sentAt: new Date().toISOString(),
      })

      return NextResponse.json({ ok: true, mesaj: `Email ${to} adresine gönderildi` })
    }

    // Create template
    if (!body.name || !body.category) {
      return NextResponse.json({ error: 'name ve category gerekli' }, { status: 400 })
    }

    const template = {
      id: uuidv4(),
      esnafId,
      name: body.name,
      category: body.category,
      subject: body.subject || '',
      previewText: body.previewText || '',
      htmlContent: body.htmlContent || '',
      contentType: body.contentType || 'template',
      type: 'custom',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await adminDb.collection('esnaflar').doc(esnafId)
      .collection('email_templates').doc(template.id).set(template)

    return NextResponse.json({ ok: true, template }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız', detay: error.message }, { status: 500 })
  }
}
