/**
 * E2E: WhatsApp Konuşma Motoru
 *
 * Webhook simülasyonu ile randevu akışı testi
 */

import { test, expect } from '@playwright/test'

test.describe('WhatsApp Konuşma Motoru', () => {

  test('Webhook verification (GET)', async ({ request }) => {
    const response = await request.get('/api/whatsapp/webhook', {
      params: {
        'hub.mode': 'subscribe',
        'hub.verify_token': 'test-verify-token',
        'hub.challenge': 'challenge-123',
      },
    })
    expect(response.ok()).toBeTruthy()
    const body = await response.text()
    expect(body).toBe('challenge-123')
  })

  test('Randevu akışı: mesaj → müsaitlik → oluştur', async ({ request }) => {
    const response = await request.post('/api/whatsapp/webhook', {
      data: {
        entry: [{ changes: [{ value: {
          messaging_product: 'whatsapp',
          metadata: { phone_number_id: 'test-phone-id' },
          messages: [{
            from: '905551234567',
            type: 'text',
            text: { body: 'Yarın saat 15:00\'a randevu almak istiyorum' },
          }],
        }}]}],
      },
    })

    expect(response.ok()).toBeTruthy()
  })

  test('Bilinmeyen mesaj tipi hata vermemeli', async ({ request }) => {
    const response = await request.post('/api/whatsapp/webhook', {
      data: {
        entry: [{ changes: [{ value: {
          messaging_product: 'whatsapp',
          metadata: { phone_number_id: 'test-phone-id' },
          messages: [{
            from: '905551234567',
            type: 'sticker',
            sticker: { mime_type: 'image/webp', sha256: 'abc' },
          }],
        }}]}],
      },
    })

    // Should not crash on unknown message types
    expect(response.status()).toBeLessThan(500)
  })
})
