/**
 * Order Notification System
 * ─────────────────────────
 * Multi-channel: WhatsApp, Email, SMS.
 * WhatsApp = primary channel for Turkish esnaf.
 */

export type NotificationChannel = 'whatsapp' | 'email' | 'sms' | 'push'

export interface NotificationPayload {
  to: string              // phone or email
  channel: NotificationChannel
  template: string
  data: Record<string, string>
}

/* ═══════ WhatsApp Templates ═══════ */

const WA_TEMPLATES: Record<string, (data: Record<string, string>) => string> = {
  order_created_customer: (d) =>
    `🛍️ Siparişiniz alındı!\n\nSipariş No: ${d.orderNumber}\nToplam: ₺${d.total}\n\nSiparişinizi takip edin:\n${d.trackingUrl}`,

  order_created_esnaf: (d) =>
    `🔔 Yeni Sipariş!\n\n📦 ${d.orderNumber}\n👤 ${d.customerName}\n💰 ₺${d.total}\n📱 ${d.customerPhone}\n\nDashboard'dan yönetin.`,

  order_shipped: (d) =>
    `📦 Siparişiniz kargoya verildi!\n\nSipariş: ${d.orderNumber}\nKargo: ${d.carrierName}\nTakip No: ${d.trackingNumber}\n\n📍 Takip: ${d.trackingUrl}`,

  order_delivered: (d) =>
    `✅ Siparişiniz teslim edildi!\n\nSipariş: ${d.orderNumber}\n\nDeneyiminizi değerlendirin:\n${d.reviewUrl}`,

  cart_abandoned_1h: (d) =>
    `👋 Sepetinizde ürünler bekliyor!\n\n${d.itemSummary}\n\nAlışverişi tamamlayın:\n${d.checkoutUrl}`,

  cart_abandoned_24h: (d) =>
    `🎁 Size özel %10 indirim!\n\nSepetinizdeki ürünleri ${d.couponCode} koduyla %10 indirimle alın.\n\n${d.checkoutUrl}`,

  payment_confirmed: (d) =>
    `✅ Ödemeniz onaylandı!\n\nSipariş: ${d.orderNumber}\nTutar: ₺${d.amount}\n\nTeşekkürler!`,
}

/* ═══════ Send Functions ═══════ */

/**
 * Send WhatsApp message via WhatsApp Business API.
 * NOTE: Mock. Production → Meta WhatsApp Cloud API or Twilio.
 */
async function sendWhatsApp(phone: string, message: string): Promise<boolean> {
  // Production:
  // const res = await fetch('https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${WA_TOKEN}`, 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ messaging_product: 'whatsapp', to: phone, type: 'text', text: { body: message }})
  // })
  console.log(`[WhatsApp → ${phone}] ${message.substring(0, 50)}...`)
  return true
}

/**
 * Send email via SendGrid/SES.
 */
async function sendEmail(email: string, subject: string, html: string): Promise<boolean> {
  // Production: SendGrid, AWS SES, or Resend
  console.log(`[Email → ${email}] ${subject}`)
  return true
}

/**
 * Send SMS via Netgsm/İletimerkezi.
 */
async function sendSMS(phone: string, message: string): Promise<boolean> {
  // Production: Netgsm or İletimerkezi API
  console.log(`[SMS → ${phone}] ${message.substring(0, 50)}...`)
  return true
}

/* ═══════ Notification Dispatcher ═══════ */

export async function sendNotification(payload: NotificationPayload): Promise<boolean> {
  const template = WA_TEMPLATES[payload.template]
  const message = template ? template(payload.data) : payload.data.message || ''

  switch (payload.channel) {
    case 'whatsapp':
      return sendWhatsApp(payload.to, message)
    case 'email':
      return sendEmail(payload.to, payload.data.subject || 'kepenk.ai Bildirim', message)
    case 'sms':
      return sendSMS(payload.to, message)
    default:
      return false
  }
}

/**
 * Send order-related notifications to all relevant channels.
 */
export async function notifyOrderEvent(
  event: 'created' | 'shipped' | 'delivered' | 'cancelled',
  order: any,
  esnafPhone?: string
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.kepenk.ai'
  const customerPhone = order.buyer?.phone
  const customerEmail = order.buyer?.email

  const commonData = {
    orderNumber: order.orderNumber,
    total: String(order.priceSummary?.total || 0),
    customerName: `${order.buyer?.firstName || ''} ${order.buyer?.lastName || ''}`.trim(),
    customerPhone: customerPhone || '',
    trackingUrl: `${baseUrl}/siparis/${order.orderNumber}`,
    reviewUrl: `${baseUrl}/degerlendirme/${order.orderNumber}`,
  }

  const notifications: NotificationPayload[] = []

  switch (event) {
    case 'created':
      if (customerPhone) {
        notifications.push({ to: customerPhone, channel: 'whatsapp', template: 'order_created_customer', data: commonData })
      }
      if (customerEmail) {
        notifications.push({ to: customerEmail, channel: 'email', template: 'order_created_customer', data: { ...commonData, subject: `Sipariş Onayı — ${order.orderNumber}` } })
      }
      if (esnafPhone) {
        notifications.push({ to: esnafPhone, channel: 'whatsapp', template: 'order_created_esnaf', data: commonData })
      }
      break

    case 'shipped':
      if (customerPhone) {
        notifications.push({
          to: customerPhone, channel: 'whatsapp', template: 'order_shipped',
          data: {
            ...commonData,
            carrierName: order.shipping?.carrierName || 'Kargo',
            trackingNumber: order.shipping?.trackingNumber || '',
            trackingUrl: order.shipping?.trackingUrl || commonData.trackingUrl,
          },
        })
      }
      if (customerEmail) {
        notifications.push({
          to: customerEmail, channel: 'email', template: 'order_shipped',
          data: {
            ...commonData, subject: `Kargonuz Yola Çıktı — ${order.orderNumber}`,
            carrierName: order.shipping?.carrierName || '',
            trackingNumber: order.shipping?.trackingNumber || '',
            trackingUrl: order.shipping?.trackingUrl || '',
          },
        })
      }
      break

    case 'delivered':
      if (customerPhone) {
        notifications.push({ to: customerPhone, channel: 'whatsapp', template: 'order_delivered', data: commonData })
      }
      break
  }

  await Promise.allSettled(notifications.map(n => sendNotification(n)))
}

/**
 * Send abandoned cart recovery notifications.
 */
export async function notifyAbandonedCart(
  cart: any,
  stage: '1h' | '6h' | '24h'
): Promise<void> {
  const phone = cart.buyer?.phone || cart.buyer?.email
  if (!phone) return

  const itemSummary = (cart.lineItems || [])
    .slice(0, 3)
    .map((item: any) => `• ${item.snapshot?.productName} (₺${item.snapshot?.price})`)
    .join('\n')

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.kepenk.ai'

  if (stage === '1h') {
    await sendNotification({
      to: phone,
      channel: 'whatsapp',
      template: 'cart_abandoned_1h',
      data: { itemSummary, checkoutUrl: `${baseUrl}/sepet/${cart.id}` },
    })
  } else if (stage === '24h') {
    await sendNotification({
      to: phone,
      channel: 'whatsapp',
      template: 'cart_abandoned_24h',
      data: {
        itemSummary,
        couponCode: 'GERIDON10',
        checkoutUrl: `${baseUrl}/sepet/${cart.id}?coupon=GERIDON10`,
      },
    })
  }
}
