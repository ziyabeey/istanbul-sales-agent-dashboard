/**
 * Meta Pixel + Conversions API (CAPI) Tracking
 * ──────────────────────────────────────────────
 * Server-side event tracking for Meta Ads.
 * Browser pixel + CAPI deduplication via eventID.
 */

/* ═══════ Standard Events ═══════ */

export const META_STANDARD_EVENTS = [
  'PageView', 'ViewContent', 'AddToCart', 'InitiateCheckout',
  'Purchase', 'Lead', 'Schedule', 'Contact', 'Search',
  'CompleteRegistration', 'AddPaymentInfo',
] as const

export type MetaEvent = typeof META_STANDARD_EVENTS[number] | string

/* ═══════ Client-side Pixel Script ═══════ */

export function generatePixelScript(pixelId: string): string {
  return `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/></noscript>
<!-- End Meta Pixel Code -->`
}

/* ═══════ CAPI Server-Side Event ═══════ */

export interface CAPIEvent {
  eventName: MetaEvent
  eventTime: number             // Unix timestamp
  eventId: string               // For dedup with browser pixel
  userData: {
    email?: string              // SHA256 hashed
    phone?: string              // SHA256 hashed
    firstName?: string          // SHA256 hashed
    lastName?: string
    city?: string
    country?: string
    externalId?: string         // Contact ID
    clientIpAddress?: string
    clientUserAgent?: string
    fbp?: string                // _fbp cookie
    fbc?: string                // _fbc cookie
  }
  customData?: {
    value?: number
    currency?: string           // 'TRY'
    contentIds?: string[]
    contentType?: string
    contentName?: string
    numItems?: number
    orderId?: string
  }
  actionSource: 'website' | 'app' | 'email' | 'phone_call' | 'chat' | 'other'
}

export async function sendCAPIEvent(
  pixelId: string,
  accessToken: string,
  events: CAPIEvent[]
): Promise<{ eventsReceived: number; messages?: string[] }> {
  const API_VERSION = 'v21.0'
  const url = `https://graph.facebook.com/${API_VERSION}/${pixelId}/events`

  const payload = {
    data: events.map(event => ({
      event_name: event.eventName,
      event_time: event.eventTime,
      event_id: event.eventId,
      user_data: {
        em: event.userData.email ? [event.userData.email] : undefined,
        ph: event.userData.phone ? [event.userData.phone] : undefined,
        fn: event.userData.firstName ? [event.userData.firstName] : undefined,
        ln: event.userData.lastName ? [event.userData.lastName] : undefined,
        ct: event.userData.city ? [event.userData.city] : undefined,
        country: event.userData.country ? [event.userData.country] : undefined,
        external_id: event.userData.externalId ? [event.userData.externalId] : undefined,
        client_ip_address: event.userData.clientIpAddress,
        client_user_agent: event.userData.clientUserAgent,
        fbp: event.userData.fbp,
        fbc: event.userData.fbc,
      },
      custom_data: event.customData ? {
        value: event.customData.value,
        currency: event.customData.currency || 'TRY',
        content_ids: event.customData.contentIds,
        content_type: event.customData.contentType,
        content_name: event.customData.contentName,
        num_items: event.customData.numItems,
        order_id: event.customData.orderId,
      } : undefined,
      action_source: event.actionSource,
    })),
    access_token: accessToken,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  return response.json()
}

/* ═══════ Google Enhanced Conversions ═══════ */

export function generateGtagScript(measurementId: string): string {
  return `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');
</script>`
}

export interface GoogleConversionEvent {
  conversionAction: string
  conversionDateTime: string
  conversionValue: number
  currencyCode: string
  orderId: string
  userIdentifiers: {
    hashedEmail?: string
    hashedPhone?: string
  }
}

/* ═══════ Hash Utility (SHA256) ═══════ */

export async function sha256Hash(value: string): Promise<string> {
  const normalized = value.toLowerCase().trim()
  const encoder = new TextEncoder()
  const data = encoder.encode(normalized)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
