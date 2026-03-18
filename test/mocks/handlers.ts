/**
 * MSW Mock Handlers — All External APIs
 *
 * iyzico · WhatsApp Cloud API · Claude · Deepgram · Pinecone
 * Vertex AI · Mindee OCR · Meta Marketing · Resend
 */

import { http, HttpResponse, delay } from 'msw'

export const handlers = [
  // ═══ iyzico ═══
  http.post('https://api.iyzipay.com/*', async ({ request }) => {
    const url = new URL(request.url)

    if (url.pathname.includes('checkoutFormInitialize')) {
      return HttpResponse.json({
        status: 'success',
        token: 'mock-checkout-token',
        checkoutFormContent: '<script>mock</script>',
        paymentPageUrl: 'https://sandbox.iyzipay.com/mock',
      })
    }

    if (url.pathname.includes('checkoutForm/auth/ecom/detail')) {
      return HttpResponse.json({
        status: 'success',
        paymentId: 'mock-payment-123',
        paymentStatus: 'SUCCESS',
        price: '100.00',
        paidPrice: '100.00',
        currency: 'TRY',
        installment: 1,
        basketId: 'order-001',
        itemTransactions: [{
          paymentTransactionId: 'mock-tx-456',
          subMerchantKey: 'mock-sub-key',
          subMerchantPrice: '90.00',
        }],
      })
    }

    if (url.pathname.includes('onboarding/submerchant')) {
      return HttpResponse.json({ status: 'success', subMerchantKey: 'mock-sub-merchant-key' })
    }

    if (url.pathname.includes('payment/iyzipos/item/approve')) {
      return HttpResponse.json({ status: 'success' })
    }

    return HttpResponse.json({ status: 'failure', errorCode: '99999' })
  }),

  // ═══ WhatsApp Cloud API ═══
  http.post('https://graph.facebook.com/*/messages', async () => {
    await delay(50)
    return HttpResponse.json({
      messaging_product: 'whatsapp',
      contacts: [{ input: '+905551234567', wa_id: '905551234567' }],
      messages: [{ id: 'wamid.mock123' }],
    })
  }),

  http.get('https://graph.facebook.com/*/webhooks', ({ request }) => {
    const url = new URL(request.url)
    return new HttpResponse(url.searchParams.get('hub.challenge'), { status: 200 })
  }),

  // ═══ Claude API ═══
  http.post('https://api.anthropic.com/v1/messages', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>
    await delay(100)

    if (Array.isArray(body.tools) && body.tools.length > 0) {
      return HttpResponse.json({
        id: 'msg_mock', type: 'message', role: 'assistant',
        content: [{ type: 'text', text: 'İşleminiz gerçekleştiriliyor.' }],
        model: body.model, stop_reason: 'end_turn',
        usage: { input_tokens: 150, output_tokens: 50 },
      })
    }

    return HttpResponse.json({
      id: 'msg_mock', type: 'message', role: 'assistant',
      content: [{ type: 'text', text: 'Mock AI yanıtı' }],
      model: body.model, stop_reason: 'end_turn',
      usage: { input_tokens: 100, output_tokens: 30 },
    })
  }),

  // ═══ Deepgram STT ═══
  http.post('https://api.deepgram.com/v1/listen', async () => {
    return HttpResponse.json({
      results: {
        channels: [{
          alternatives: [{
            transcript: 'bugünkü ciroyu söyle',
            confidence: 0.95,
            words: [
              { word: 'bugünkü', start: 0, end: 0.5 },
              { word: 'ciroyu', start: 0.5, end: 1.0 },
              { word: 'söyle', start: 1.0, end: 1.3 },
            ],
          }],
        }],
      },
    })
  }),

  // ═══ Pinecone ═══
  http.post(/.*pinecone.*\/query/, async () => {
    return HttpResponse.json({
      matches: [
        { id: 'chunk-001', score: 0.95, metadata: { text: 'Mock knowledge chunk', articleTitle: 'Test Article' } },
        { id: 'chunk-002', score: 0.87, metadata: { text: 'Second chunk', articleTitle: 'FAQ' } },
      ],
      namespace: 'org_test',
    })
  }),

  // ═══ Vertex AI Embeddings ═══
  http.post(/.*aiplatform.*:predict/, async () => {
    return HttpResponse.json({
      predictions: [{ embeddings: { values: Array(768).fill(0.01) } }],
    })
  }),

  // ═══ Mindee OCR ═══
  http.post('https://api.mindee.net/v1/products/mindee/expense_receipts/*/predict', async () => {
    return HttpResponse.json({
      document: {
        inference: {
          prediction: {
            supplier_name: { value: 'Test Market', confidence: 0.92 },
            date: { value: '2026-03-15', confidence: 0.95 },
            total_amount: { value: 150.00, confidence: 0.90 },
            total_tax: { value: 27.27, confidence: 0.85 },
            line_items: [
              { description: 'Ürün A', total_amount: 80.00 },
              { description: 'Ürün B', total_amount: 70.00 },
            ],
          },
        },
      },
    })
  }),

  // ═══ Meta Marketing API ═══
  http.post('https://graph.facebook.com/*/events', async () => {
    return HttpResponse.json({ events_received: 1, fbtrace_id: 'mock-trace' })
  }),

  // ═══ Resend Email ═══
  http.post('https://api.resend.com/emails', async () => {
    return HttpResponse.json({ id: 'email-mock-123' })
  }),
]

// ═══ ERROR SCENARIOS (use with server.use() in tests) ═══

export const errorHandlers = {
  iyzicoTimeout: http.post('https://api.iyzipay.com/*', async () => {
    await delay(35000)
    return HttpResponse.json({ status: 'failure' })
  }),

  iyzico3DSFail: http.post('https://api.iyzipay.com/*', () => {
    return HttpResponse.json({
      status: 'failure', errorCode: '10051',
      errorMessage: 'Kart sahibi bankası, bu işlemi onaylamadı.',
    })
  }),

  iyzicoInvalidIBAN: http.post('https://api.iyzipay.com/*', () => {
    return HttpResponse.json({
      status: 'failure', errorCode: '3003',
      errorMessage: 'Geçersiz IBAN numarası.',
    })
  }),

  claudeOverloaded: http.post('https://api.anthropic.com/v1/messages', () => {
    return HttpResponse.json(
      { type: 'error', error: { type: 'overloaded_error', message: 'Overloaded' } },
      { status: 529 },
    )
  }),

  claude500: http.post('https://api.anthropic.com/v1/messages', () => {
    return HttpResponse.json(
      { type: 'error', error: { type: 'api_error', message: 'Internal server error' } },
      { status: 500 },
    )
  }),

  whatsappRateLimit: http.post('https://graph.facebook.com/*/messages', () => {
    return HttpResponse.json(
      { error: { message: 'Rate limit exceeded', code: 80007, type: 'OAuthException' } },
      { status: 429 },
    )
  }),

  whatsapp24hExpired: http.post('https://graph.facebook.com/*/messages', () => {
    return HttpResponse.json(
      { error: { message: 'Re-engagement message', code: 131047, error_subcode: 131047 } },
      { status: 400 },
    )
  }),
}
