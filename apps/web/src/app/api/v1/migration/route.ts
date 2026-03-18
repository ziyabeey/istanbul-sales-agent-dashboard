/**
 * Data Migration & Import API
 * GET /api/v1/migration — Platform mappings, templates, OCR, validation, rollback
 */
import { NextResponse } from 'next/server'
import {
  GOC_STACK, GOC_PRENSIPLERI, GOC_DURUMLARI, ETICARET_KAYNAKLARI,
  URUN_HARITALAMA, MUSTERI_HARITALAMA, SIPARIS_GOC_KURALI, KVKK_KURALLARI,
  GBP_IMPORT, INSTAGRAM_IMPORT, WEB_CRAWL_IMPORT, POS_KAYNAKLARI,
  RESTORAN_AI_ZENGINLESTIRME, IMPORT_SABLONLARI, IMPORT_PIPELINE,
  DOGRULAMA_KURALLARI, CAKISMA_STRATEJILERI, OCR_KAYNAKLARI,
  OCR_TEKNIK_AKIS, WHATSAPP_OCR_AKISI, ROLLBACK_MEKANIK, KVKK_UYUM,
  GOC_SECENEKLERI, GOC_METRIKLERI,
} from '@/data/migrationConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, stack: GOC_STACK, prensipler: GOC_PRENSIPLERI,
        durumlar: GOC_DURUMLARI, dashboardSecenekleri: GOC_SECENEKLERI,
        sayilar: {
          eticaretPlatform: ETICARET_KAYNAKLARI.length,
          posKaynak: POS_KAYNAKLARI.length,
          importSablon: Object.keys(IMPORT_SABLONLARI).length,
          ocrKaynak: OCR_KAYNAKLARI.length,
        },
      })
    }

    if (mode === 'platforms') {
      const id = searchParams.get('id')
      if (id) {
        const p = ETICARET_KAYNAKLARI.find(k => k.id === id)
        return p ? NextResponse.json({ ok: true, platform: p }) : NextResponse.json({ error: `Platform bulunamadı: ${id}` }, { status: 404 })
      }
      return NextResponse.json({ ok: true, platformlar: ETICARET_KAYNAKLARI })
    }

    if (mode === 'mappings') {
      const kaynak = searchParams.get('kaynak') as 'ikas' | 'shopify' | null
      return NextResponse.json({
        ok: true,
        urunHaritalama: kaynak && URUN_HARITALAMA[kaynak] ? URUN_HARITALAMA[kaynak] : URUN_HARITALAMA,
        musteriHaritalama: MUSTERI_HARITALAMA,
        siparisKural: SIPARIS_GOC_KURALI,
      })
    }

    if (mode === 'kvkk') {
      return NextResponse.json({ ok: true, kurallar: KVKK_KURALLARI, uyum: KVKK_UYUM })
    }

    if (mode === 'ai-import') {
      return NextResponse.json({
        ok: true, gbp: GBP_IMPORT, instagram: INSTAGRAM_IMPORT, webCrawl: WEB_CRAWL_IMPORT,
      })
    }

    if (mode === 'pos') {
      return NextResponse.json({ ok: true, kaynaklar: POS_KAYNAKLARI, aiZenginlestirme: RESTORAN_AI_ZENGINLESTIRME })
    }

    if (mode === 'templates') {
      const tip = searchParams.get('tip')
      if (tip && IMPORT_SABLONLARI[tip]) {
        return NextResponse.json({ ok: true, sablon: IMPORT_SABLONLARI[tip] })
      }
      return NextResponse.json({ ok: true, sablonlar: IMPORT_SABLONLARI, tipler: Object.keys(IMPORT_SABLONLARI) })
    }

    if (mode === 'pipeline') {
      return NextResponse.json({ ok: true, pipeline: IMPORT_PIPELINE, dogrulama: DOGRULAMA_KURALLARI, cakisma: CAKISMA_STRATEJILERI })
    }

    if (mode === 'ocr') {
      return NextResponse.json({ ok: true, kaynaklar: OCR_KAYNAKLARI, teknikAkis: OCR_TEKNIK_AKIS, whatsappAkisi: WHATSAPP_OCR_AKISI })
    }

    if (mode === 'rollback') {
      return NextResponse.json({ ok: true, mekanik: ROLLBACK_MEKANIK })
    }

    if (mode === 'metrics') {
      return NextResponse.json({ ok: true, metrikler: GOC_METRIKLERI })
    }

    return NextResponse.json({
      error: 'mode: overview, platforms, mappings, kvkk, ai-import, pos, templates, pipeline, ocr, rollback, metrics',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
