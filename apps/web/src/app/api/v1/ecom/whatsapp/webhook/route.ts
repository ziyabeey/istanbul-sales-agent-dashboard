/**
 * WhatsApp Webhook API
 * ────────────────────
 * GET  /api/v1/ecom/whatsapp/webhook — Meta verification
 * POST /api/v1/ecom/whatsapp/webhook — Incoming message handler
 */

import { NextResponse } from 'next/server'
import { handleWhatsAppMessage } from '@/lib/whatsapp/salesBot'

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'kepenk-wa-verify-2026'

/* ═══════ Meta Webhook Verification ═══════ */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Doğrulama başarısız' }, { status: 403 })
}

/* ═══════ Incoming Message Handler ═══════ */

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Meta webhook format
    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value

    if (!value?.messages?.[0]) {
      // Delivery status update or other non-message event
      return NextResponse.json({ ok: true })
    }

    const message = value.messages[0]
    const contact = value.contacts?.[0]

    // Only handle text messages
    if (message.type !== 'text') {
      return NextResponse.json({ ok: true })
    }

    const from = message.from              // Phone number
    const text = message.text?.body || ''

    // Determine esnaf from phone number mapping
    // In production: lookup by WhatsApp Business Phone ID → esnafId
    const phoneNumberId = value.metadata?.phone_number_id
    const esnafId = await lookupEsnafByPhoneId(phoneNumberId)

    if (!esnafId) {
      return NextResponse.json({ ok: true })   // Unknown esnaf, ignore
    }

    // Process message
    const response = await handleWhatsAppMessage({ from, text, esnafId })

    // Send response via Meta API
    await sendWhatsAppReply(phoneNumberId, response.to, response.text)

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('[WhatsApp Webhook Error]', error.message)
    return NextResponse.json({ ok: true }) // Always return 200 to Meta
  }
}

/* ═══════ Helpers ═══════ */

async function lookupEsnafByPhoneId(phoneNumberId: string): Promise<string | null> {
  // Production: Firestore lookup
  // const snap = await adminDb.collection('whatsapp_config')
  //   .where('phoneNumberId', '==', phoneNumberId).limit(1).get()
  // return snap.empty ? null : snap.docs[0].data().esnafId
  return phoneNumberId ? 'demo-esnaf' : null
}

async function sendWhatsAppReply(phoneNumberId: string, to: string, text: string) {
  const token = process.env.WHATSAPP_API_TOKEN
  if (!token) return

  await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    }),
  })
}
