/**
 * @kepenk/whatsapp — Message Sender Types
 *
 * Meta Graph API v23.0 message payloads.
 * All messages sent via POST to:
 * https://graph.facebook.com/v23.0/{PHONE_NUMBER_ID}/messages
 */

export interface SendTextPayload {
  messaging_product: 'whatsapp'
  to: string
  type: 'text'
  text: { body: string }
}

export interface ButtonConfig {
  id: string
  title: string       // max 20 chars
}

export interface SendButtonPayload {
  messaging_product: 'whatsapp'
  to: string
  type: 'interactive'
  interactive: {
    type: 'button'
    body: { text: string }
    action: {
      buttons: { type: 'reply'; reply: { id: string; title: string } }[]
    }
  }
}

export interface ListSection {
  title: string
  rows: { id: string; title: string; description?: string }[]
}

export interface SendListPayload {
  messaging_product: 'whatsapp'
  to: string
  type: 'interactive'
  interactive: {
    type: 'list'
    body: { text: string }
    action: {
      button: string   // max 20 chars
      sections: ListSection[]
    }
  }
}

export interface TemplateParameter {
  type: 'text'
  text: string
}

export interface SendTemplatePayload {
  messaging_product: 'whatsapp'
  to: string
  type: 'template'
  template: {
    name: string
    language: { code: string }
    components?: { type: 'body'; parameters: TemplateParameter[] }[]
  }
}

/**
 * Build a text message payload.
 */
export function buildTextPayload(to: string, text: string): SendTextPayload {
  return { messaging_product: 'whatsapp', to, type: 'text', text: { body: text } }
}

/**
 * Build a button message payload (max 3 buttons).
 */
export function buildButtonPayload(to: string, body: string, buttons: ButtonConfig[]): SendButtonPayload {
  return {
    messaging_product: 'whatsapp', to, type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: body },
      action: {
        buttons: buttons.slice(0, 3).map(b => ({
          type: 'reply' as const,
          reply: { id: b.id, title: b.title.substring(0, 20) },
        })),
      },
    },
  }
}

/**
 * Build a list message payload (max 10 rows total).
 */
export function buildListPayload(
  to: string,
  body: string,
  buttonText: string,
  sections: ListSection[]
): SendListPayload {
  return {
    messaging_product: 'whatsapp', to, type: 'interactive',
    interactive: {
      type: 'list',
      body: { text: body },
      action: {
        button: buttonText.substring(0, 20),
        sections,
      },
    },
  }
}

/**
 * Build a template message payload.
 */
export function buildTemplatePayload(
  to: string,
  templateName: string,
  languageCode: string = 'tr',
  parameters: TemplateParameter[] = []
): SendTemplatePayload {
  return {
    messaging_product: 'whatsapp', to, type: 'template',
    template: {
      name: templateName,
      language: { code: languageCode },
      components: parameters.length > 0 ? [{ type: 'body', parameters }] : undefined,
    },
  }
}

/** WhatsApp message API URL builder */
export function getApiUrl(phoneNumberId: string): string {
  return `https://graph.facebook.com/v23.0/${phoneNumberId}/messages`
}
