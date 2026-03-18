/**
 * Consolidated API & Data Model — MASTER INDEX
 * GET /api/v1/data-model — Collections, schemas, endpoints, indexes
 */
import { NextResponse } from 'next/server'
import {
  VERI_KATMANLARI, FIRESTORE_KURALLARI, API_KURALLARI,
  KOLEKSIYON_HARITASI, ENTITY_ILISKILERI, ENTITY_SEMALARI,
  API_ENDPOINT_KATALOGU, COMPOSITE_INDEXES, WEBHOOK_OLAYLARI,
  PAYLASILAN_TIPLER,
} from '@/data/konsolideApiConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    const toplamEndpoint = API_ENDPOINT_KATALOGU.reduce((a, g) => a + g.endpointler.length, 0)

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, veriKatmanlari: VERI_KATMANLARI,
        firestoreKurallari: FIRESTORE_KURALLARI, apiKurallari: API_KURALLARI,
        sayilar: {
          koleksiyon: KOLEKSIYON_HARITASI.length,
          entityIliski: ENTITY_ILISKILERI.length,
          entitySema: Object.keys(ENTITY_SEMALARI).length,
          apiModul: API_ENDPOINT_KATALOGU.length,
          toplamEndpoint,
          compositeIndex: Object.values(COMPOSITE_INDEXES).flat().length,
          webhookOlay: WEBHOOK_OLAYLARI.length,
          paylasilanTip: PAYLASILAN_TIPLER.length,
        },
      })
    }

    if (mode === 'collections') {
      return NextResponse.json({ ok: true, koleksiyonlar: KOLEKSIYON_HARITASI })
    }

    if (mode === 'relations') {
      return NextResponse.json({ ok: true, iliskiler: ENTITY_ILISKILERI })
    }

    if (mode === 'schemas') {
      const entity = searchParams.get('entity')
      if (entity && ENTITY_SEMALARI[entity as keyof typeof ENTITY_SEMALARI]) {
        return NextResponse.json({ ok: true, sema: ENTITY_SEMALARI[entity as keyof typeof ENTITY_SEMALARI] })
      }
      return NextResponse.json({ ok: true, semalar: ENTITY_SEMALARI, entityler: Object.keys(ENTITY_SEMALARI) })
    }

    if (mode === 'endpoints') {
      const modul = searchParams.get('modul')
      if (modul) {
        const g = API_ENDPOINT_KATALOGU.find(e => e.modul.toLowerCase().includes(modul.toLowerCase()))
        return g ? NextResponse.json({ ok: true, modul: g }) : NextResponse.json({ error: `Modül bulunamadı: ${modul}` }, { status: 404 })
      }
      return NextResponse.json({ ok: true, moduller: API_ENDPOINT_KATALOGU, toplamEndpoint })
    }

    if (mode === 'indexes') {
      return NextResponse.json({ ok: true, indexes: COMPOSITE_INDEXES })
    }

    if (mode === 'webhooks') {
      return NextResponse.json({ ok: true, olaylar: WEBHOOK_OLAYLARI })
    }

    if (mode === 'types') {
      return NextResponse.json({ ok: true, tipler: PAYLASILAN_TIPLER })
    }

    return NextResponse.json({
      error: 'mode: overview, collections, relations, schemas, endpoints, indexes, webhooks, types',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
