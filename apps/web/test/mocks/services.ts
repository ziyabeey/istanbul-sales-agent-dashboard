/**
 * 3rd Party Service Mocks — iyzico, Twilio, Claude, NetGSM, Yurtiçi Kargo
 */
import { vi } from 'vitest'

/* ═══════ iyzico Mock ═══════ */
export const mockIyzico = {
  createPayment: vi.fn(async (request: any) => ({
    status: 'success',
    paymentId: 'iyzico-pay-' + Date.now(),
    conversationId: request.conversationId || 'conv-1',
    paidPrice: request.price || '100.00',
    installment: request.installment || 1,
    fraudStatus: 1, // Approved
    itemTransactions: [{ itemId: 'item-1', paymentTransactionId: 'txn-1' }],
  })),

  createRefund: vi.fn(async (request: any) => ({
    status: 'success',
    paymentTransactionId: request.paymentTransactionId,
    price: request.price,
  })),

  initializeThreeDS: vi.fn(async () => ({
    status: 'success',
    threeDSHtmlContent: '<html><body>3DS Redirect Mock</body></html>',
  })),

  getInstallmentInfo: vi.fn(async () => ({
    status: 'success',
    installmentDetails: [
      { binNumber: '454671', installmentPrices: [
        { installmentNumber: 1, totalPrice: '100.00', installmentPrice: '100.00' },
        { installmentNumber: 3, totalPrice: '103.50', installmentPrice: '34.50' },
        { installmentNumber: 6, totalPrice: '107.00', installmentPrice: '17.83' },
        { installmentNumber: 9, totalPrice: '110.50', installmentPrice: '12.28' },
      ]},
    ],
  })),
}

/* ═══════ Twilio (WhatsApp/SMS) Mock ═══════ */
export const mockTwilio = {
  messages: {
    create: vi.fn(async (params: any) => ({
      sid: 'SM' + Date.now(),
      to: params.to,
      from: params.from,
      body: params.body,
      status: 'queued',
      dateCreated: new Date().toISOString(),
    })),
  },
}

/* ═══════ Claude AI Mock ═══════ */
export const mockClaude = {
  createMessage: vi.fn(async (params: any) => ({
    id: 'msg_' + Date.now(),
    type: 'message',
    role: 'assistant',
    content: [{ type: 'text', text: generateMockAIResponse(params.messages?.[0]?.content || '') }],
    model: params.model || 'claude-3-5-sonnet-20241022',
    usage: { input_tokens: 150, output_tokens: 350 },
  })),
}

function generateMockAIResponse(input: string): string {
  if (input.includes('randevu') || input.includes('booking')) return 'Tabii, randevunuz için müsait saatlerimizi kontrol ediyorum.'
  if (input.includes('fiyat') || input.includes('price')) return 'Güncel fiyat listemiz şöyle: Dana Kıyma ₺250/kg, Kuzu Pirzola ₺450/kg.'
  if (input.includes('sipariş') || input.includes('order')) return 'Siparişiniz alındı. Tahmini teslimat süresi 30-45 dakikadır.'
  if (input.includes('ignore') || input.includes('system prompt')) return 'Bu isteği işleyemiyorum. Size nasıl yardımcı olabilirim?'
  return 'Merhaba! Size nasıl yardımcı olabilirim?'
}

/* ═══════ NetGSM (SMS) Mock ═══════ */
export const mockNetGSM = {
  sendSMS: vi.fn(async (params: any) => ({
    code: '00', // Success
    messageId: 'netgsm-' + Date.now(),
    to: params.to,
    message: params.message,
  })),
  getSMSReport: vi.fn(async () => ({ code: '00', status: 'delivered' })),
}

/* ═══════ Yurtiçi Kargo Mock ═══════ */
export const mockYurticiKargo = {
  createShipment: vi.fn(async () => ({
    success: true,
    trackingNumber: 'YK' + Date.now(),
    estimatedDelivery: new Date(Date.now() + 3 * 86400000).toISOString(),
  })),
  getTracking: vi.fn(async (trackingNumber: string) => ({
    success: true,
    trackingNumber,
    status: 'in_transit',
    events: [
      { date: new Date().toISOString(), description: 'Kargo teslim alındı', location: 'İstanbul Şube' },
    ],
  })),
}

/* ═══════ Google Calendar Mock ═══════ */
export const mockGoogleCalendar = {
  events: {
    list: vi.fn(async () => ({
      data: { items: [
        { id: 'gcal-1', summary: 'Test Event', start: { dateTime: '2026-03-16T14:00:00+03:00' } },
      ] },
    })),
    insert: vi.fn(async (params: any) => ({
      data: { id: 'gcal-new-' + Date.now(), summary: params.requestBody?.summary || 'Randevu' },
    })),
    update: vi.fn(async () => ({ data: { id: 'gcal-updated' } })),
    delete: vi.fn(async () => ({ status: 204 })),
  },
}
