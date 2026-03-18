/**
 * Performance Optimization API
 * GET /api/v1/performance — CWV, Cloud Run, Firestore, bundle, images
 */
import { NextResponse } from 'next/server'
import {
  KONTEKSTLER, PERFORMANS_BUTCESI, COLD_START, FIRESTORE_OPTIMIZASYON,
  CACHE_KATMANLARI, RENDERING_STRATEJISI, JS_OPTIMIZASYON, GORSEL_PIPELINE,
  FONT_OPTIMIZASYON, DASHBOARD_PERF, AG_OPTIMIZASYON, CWV_REHBER,
  PERFORMANS_IZLEME, KONTROL_LISTELERI,
} from '@/data/performansConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, kontekstler: KONTEKSTLER, butce: PERFORMANS_BUTCESI,
        sayilar: {
          kontekst: KONTEKSTLER.length,
          cacheKatman: CACHE_KATMANLARI.length,
          cwvMetrik: CWV_REHBER.length,
          gorselAdim: GORSEL_PIPELINE.uploadAdimlar.length,
          antiPattern: JS_OPTIMIZASYON.antiPatternler.length,
          alertSayisi: PERFORMANS_IZLEME.alertler.length,
        },
      })
    }

    if (mode === 'cloud-run') {
      return NextResponse.json({ ok: true, coldStart: COLD_START, firestoreOpt: FIRESTORE_OPTIMIZASYON, cacheKatmanlari: CACHE_KATMANLARI })
    }

    if (mode === 'frontend') {
      return NextResponse.json({ ok: true, rendering: RENDERING_STRATEJISI, jsOpt: JS_OPTIMIZASYON, gorsel: GORSEL_PIPELINE, font: FONT_OPTIMIZASYON })
    }

    if (mode === 'dashboard') {
      return NextResponse.json({ ok: true, performans: DASHBOARD_PERF })
    }

    if (mode === 'network') {
      return NextResponse.json({ ok: true, ag: AG_OPTIMIZASYON })
    }

    if (mode === 'cwv') {
      return NextResponse.json({ ok: true, rehber: CWV_REHBER })
    }

    if (mode === 'monitoring') {
      return NextResponse.json({ ok: true, izleme: PERFORMANS_IZLEME })
    }

    if (mode === 'checklists') {
      return NextResponse.json({ ok: true, listeler: KONTROL_LISTELERI })
    }

    return NextResponse.json({
      error: 'mode: overview, cloud-run, frontend, dashboard, network, cwv, monitoring, checklists',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
