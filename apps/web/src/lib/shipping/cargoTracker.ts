/**
 * Turkish Cargo Tracking Client
 * ──────────────────────────────
 * Unified tracking interface for Yurtiçi, Aras, PTT, Sürat Kargo.
 * 
 * NOTE: Uses mock responses. In production, replace with actual SOAP/REST calls.
 */

export interface TrackingEvent {
  status: string
  description: string
  location: string
  timestamp: string
}

export interface TrackingResult {
  ok: boolean
  carrierId: string
  carrierName: string
  trackingNumber: string
  currentStatus: 'in_transit' | 'out_for_delivery' | 'delivered' | 'returned' | 'unknown'
  estimatedDelivery?: string
  events: TrackingEvent[]
  error?: string
}

/* ═══════ Carrier Configs ═══════ */

const CARRIER_CONFIG: Record<string, { name: string; trackingUrl: (no: string) => string }> = {
  yurtici: {
    name: 'Yurtiçi Kargo',
    trackingUrl: (no) => `https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code=${no}`,
  },
  aras: {
    name: 'Aras Kargo',
    trackingUrl: (no) => `https://www.araskargo.com.tr/tK_gonderi_takip.html?code=${no}`,
  },
  ptt: {
    name: 'PTT Kargo',
    trackingUrl: (no) => `https://gonderitakip.ptt.gov.tr/Track/Verify?q=${no}`,
  },
  surat: {
    name: 'Sürat Kargo',
    trackingUrl: (no) => `https://www.suratkargo.com.tr/gonderi-takip?barcode=${no}`,
  },
}

/* ═══════ Yurtiçi Kargo ═══════ */

async function trackYurtici(trackingNumber: string): Promise<TrackingResult> {
  // Production: SOAP call to https://webservices.yurticikargo.com
  // const client = await soap.createClientAsync(YURTICI_WSDL)
  // const [result] = await client.QueryShipmentAsync({ ...credentials, barcode: trackingNumber })

  return mockTrackingResult('yurtici', trackingNumber)
}

/* ═══════ Aras Kargo ═══════ */

async function trackAras(trackingNumber: string): Promise<TrackingResult> {
  // Production: REST call to https://customerservices.araskargo.com.tr
  return mockTrackingResult('aras', trackingNumber)
}

/* ═══════ PTT Kargo ═══════ */

async function trackPTT(trackingNumber: string): Promise<TrackingResult> {
  // Production: REST call to https://api.ptt.gov.tr
  return mockTrackingResult('ptt', trackingNumber)
}

/* ═══════ Sürat Kargo ═══════ */

async function trackSurat(trackingNumber: string): Promise<TrackingResult> {
  return mockTrackingResult('surat', trackingNumber)
}

/* ═══════ Unified Tracker ═══════ */

export async function trackShipment(
  carrierId: string,
  trackingNumber: string
): Promise<TrackingResult> {
  const trackers: Record<string, (no: string) => Promise<TrackingResult>> = {
    yurtici: trackYurtici,
    aras: trackAras,
    ptt: trackPTT,
    surat: trackSurat,
  }

  const tracker = trackers[carrierId]
  if (!tracker) {
    return {
      ok: false,
      carrierId,
      carrierName: carrierId,
      trackingNumber,
      currentStatus: 'unknown',
      events: [],
      error: 'Bilinmeyen kargo şirketi',
    }
  }

  try {
    return await tracker(trackingNumber)
  } catch (error: any) {
    return {
      ok: false,
      carrierId,
      carrierName: CARRIER_CONFIG[carrierId]?.name || carrierId,
      trackingNumber,
      currentStatus: 'unknown',
      events: [],
      error: error.message,
    }
  }
}

/**
 * Get public tracking URL for customer.
 */
export function getTrackingUrl(carrierId: string, trackingNumber: string): string {
  return CARRIER_CONFIG[carrierId]?.trackingUrl(trackingNumber) || ''
}

/* ═══════ Mock ═══════ */

function mockTrackingResult(carrierId: string, trackingNumber: string): TrackingResult {
  const now = new Date()
  return {
    ok: true,
    carrierId,
    carrierName: CARRIER_CONFIG[carrierId]?.name || carrierId,
    trackingNumber,
    currentStatus: 'in_transit',
    estimatedDelivery: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    events: [
      {
        status: 'picked_up',
        description: 'Gönderi alındı',
        location: 'İstanbul Dağıtım Merkezi',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        status: 'in_transit',
        description: 'Transfer merkezine gönderildi',
        location: 'Ankara Transfer Merkezi',
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
      },
      {
        status: 'in_transit',
        description: 'Dağıtım şubesine ulaştı',
        location: 'Çankaya Şubesi',
        timestamp: now.toISOString(),
      },
    ],
  }
}
