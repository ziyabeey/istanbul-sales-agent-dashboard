/**
 * @kepenk/whatsapp — Webhook Types (Meta WhatsApp Cloud API v23.0)
 *
 * Handles incoming webhook events from Meta:
 * - GET: Webhook verification (hub.mode=subscribe)
 * - POST: Incoming messages (text, interactive, order, media)
 */

export interface WebhookVerifyQuery {
  'hub.mode': 'subscribe'
  'hub.verify_token': string
  'hub.challenge': string
}

export interface WebhookPayload {
  object: 'whatsapp_business_account'
  entry: WebhookEntry[]
}

export interface WebhookEntry {
  id: string
  changes: WebhookChange[]
}

export interface WebhookChange {
  value: WebhookValue
  field: 'messages'
}

export interface WebhookValue {
  messaging_product: 'whatsapp'
  metadata: {
    display_phone_number: string
    phone_number_id: string
  }
  contacts?: WebhookContact[]
  messages?: IncomingMessage[]
  statuses?: MessageStatus[]
}

export interface WebhookContact {
  profile: { name: string }
  wa_id: string
}

export type MessageType = 'text' | 'interactive' | 'order' | 'image' | 'document' | 'audio' | 'video' | 'location' | 'sticker'

export interface IncomingMessage {
  from: string           // sender phone number
  id: string             // message ID
  timestamp: string
  type: MessageType
  text?: { body: string }
  interactive?: {
    type: 'button_reply' | 'list_reply'
    button_reply?: { id: string; title: string }
    list_reply?: { id: string; title: string; description?: string }
  }
  order?: {
    catalog_id: string
    product_items: { product_retailer_id: string; quantity: number; item_price: number }[]
  }
  image?: { id: string; mime_type: string; sha256: string }
  document?: { id: string; mime_type: string; filename: string }
  location?: { latitude: number; longitude: number; name?: string }
}

export interface MessageStatus {
  id: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  timestamp: string
  recipient_id: string
  errors?: { code: number; title: string }[]
}

/**
 * Parse incoming webhook into a simple user message string.
 */
export function parseIncomingMessage(msg: IncomingMessage): string {
  switch (msg.type) {
    case 'text':
      return msg.text?.body || ''
    case 'interactive':
      if (msg.interactive?.type === 'button_reply') return msg.interactive.button_reply?.id || ''
      if (msg.interactive?.type === 'list_reply') return msg.interactive.list_reply?.id || ''
      return ''
    case 'order':
      return `SIPARIS:${JSON.stringify(msg.order)}`
    case 'location':
      return `KONUM:${msg.location?.latitude},${msg.location?.longitude}`
    default:
      return `[${msg.type}]`
  }
}
