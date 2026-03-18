/**
 * SPI — Service Plugin Interface (Eklenti Mimarisi)
 * GET  /api/v1/spi — List plugins, SPI specs
 * POST /api/v1/spi — Register/invoke/test plugins
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

interface SPIDefinition {
  type: string
  description: string
  requestSchema: Record<string, string>
  responseSchema: Record<string, string>
  timeout: number
  cacheTTL: number
}

const SPI_DEFINITIONS: Record<string, SPIDefinition> = {
  shipping_rates: {
    type: 'shipping_rates', description: 'Kargo ücret hesaplama',
    requestSchema: { items: 'CartLineItem[]', destination: 'Address', weight: 'number' },
    responseSchema: { rates: 'ShippingRate[]' },
    timeout: 10000, cacheTTL: 600,
  },
  additional_fees: {
    type: 'additional_fees', description: 'Ek ücret hesaplama',
    requestSchema: { items: 'CartLineItem[]', context: 'CheckoutContext' },
    responseSchema: { fees: 'Fee[]' },
    timeout: 5000, cacheTTL: 300,
  },
  validations: {
    type: 'validations', description: 'Checkout doğrulama',
    requestSchema: { checkout: 'Checkout' },
    responseSchema: { violations: 'Violation[]' },
    timeout: 5000, cacheTTL: 0,
  },
  tax_calculation: {
    type: 'tax_calculation', description: 'Vergi hesaplama',
    requestSchema: { items: 'CartLineItem[]', destination: 'Address' },
    responseSchema: { taxes: 'TaxLine[]' },
    timeout: 5000, cacheTTL: 600,
  },
  notification_channel: {
    type: 'notification_channel', description: 'Özel bildirim kanalı',
    requestSchema: { recipient: 'string', message: 'string', templateId: 'string' },
    responseSchema: { delivered: 'boolean', messageId: 'string' },
    timeout: 10000, cacheTTL: 0,
  },
  ai_action: {
    type: 'ai_action', description: 'Özel AI aksiyonu',
    requestSchema: { input: 'string', context: 'Record<string,any>' },
    responseSchema: { output: 'string', metadata: 'Record<string,any>' },
    timeout: 15000, cacheTTL: 0,
  },
}

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'definitions'

    if (mode === 'definitions') {
      return NextResponse.json({ ok: true, spiDefinitions: SPI_DEFINITIONS })
    }

    if (mode === 'plugins') {
      const snap = await adminDb.collection('esnaflar').doc(esnafId).collection('plugins').get()
      return NextResponse.json({
        ok: true,
        plugins: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })),
      })
    }

    return NextResponse.json({ error: 'mode: definitions, plugins' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    switch (body.action) {
      case 'register': {
        const { name, spiType, endpointUrl, secret } = body
        if (!name || !spiType || !endpointUrl) return NextResponse.json({ error: 'name, spiType, endpointUrl gerekli' }, { status: 400 })
        if (!SPI_DEFINITIONS[spiType]) return NextResponse.json({ error: `Geçersiz SPI tipi. Geçerli: ${Object.keys(SPI_DEFINITIONS).join(', ')}` }, { status: 400 })

        // Max 20 plugins per esnaf
        const existing = await adminDb.collection('esnaflar').doc(esnafId).collection('plugins').get()
        if (existing.size >= 20) return NextResponse.json({ error: 'Maksimum 20 eklenti limiti' }, { status: 400 })

        const plugin = {
          id: uuidv4(), name, spiType, endpointUrl,
          secret: secret || uuidv4(), // HMAC signing secret
          status: 'active', createdAt: new Date().toISOString(),
          lastInvoked: null, successCount: 0, failureCount: 0,
        }

        await adminDb.collection('esnaflar').doc(esnafId).collection('plugins').doc(plugin.id).set(plugin)
        return NextResponse.json({ ok: true, plugin, mesaj: 'Eklenti kaydedildi' })
      }

      case 'invoke': {
        const { pluginId, payload } = body
        if (!pluginId) return NextResponse.json({ error: 'pluginId gerekli' }, { status: 400 })

        const pluginDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('plugins').doc(pluginId).get()
        if (!pluginDoc.exists) return NextResponse.json({ error: 'Eklenti bulunamadı' }, { status: 404 })
        const plugin = pluginDoc.data()!
        const spiDef = SPI_DEFINITIONS[plugin.spiType]

        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), spiDef.timeout)

          const response = await fetch(plugin.endpointUrl, {
            method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Kepenk-Plugin-Secret': plugin.secret },
            body: JSON.stringify({ spiType: plugin.spiType, esnafId, payload, timestamp: new Date().toISOString() }),
            signal: controller.signal,
          })
          clearTimeout(timeoutId)

          const result = await response.json()
          await pluginDoc.ref.update({ lastInvoked: new Date().toISOString(), successCount: (plugin.successCount || 0) + 1 })

          return NextResponse.json({ ok: true, result, latencyMs: Date.now() })
        } catch (err: any) {
          await pluginDoc.ref.update({ lastInvoked: new Date().toISOString(), failureCount: (plugin.failureCount || 0) + 1 })
          return NextResponse.json({ error: `Plugin çağrısı başarısız: ${err.message}` }, { status: 502 })
        }
      }

      case 'test': {
        const { pluginId } = body
        if (!pluginId) return NextResponse.json({ error: 'pluginId gerekli' }, { status: 400 })
        const pluginDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('plugins').doc(pluginId).get()
        if (!pluginDoc.exists) return NextResponse.json({ error: 'Eklenti bulunamadı' }, { status: 404 })
        const plugin = pluginDoc.data()!

        try {
          const response = await fetch(plugin.endpointUrl, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ test: true, spiType: plugin.spiType }),
            signal: AbortSignal.timeout(5000),
          })
          return NextResponse.json({ ok: true, status: response.status, reachable: response.ok })
        } catch {
          return NextResponse.json({ ok: true, reachable: false, mesaj: 'Endpoint erişilemedi' })
        }
      }

      case 'deactivate': {
        const { pluginId } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('plugins').doc(pluginId).update({ status: 'inactive' })
        return NextResponse.json({ ok: true, mesaj: 'Eklenti devre dışı bırakıldı' })
      }

      case 'delete': {
        const { pluginId } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('plugins').doc(pluginId).delete()
        return NextResponse.json({ ok: true, mesaj: 'Eklenti silindi' })
      }

      default:
        return NextResponse.json({ error: 'action: register, invoke, test, deactivate, delete' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
