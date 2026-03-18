/**
 * Accessibility (a11y) API
 * GET /api/v1/accessibility — WCAG standards, ARIA patterns, keyboard maps, contrast
 */
import { NextResponse } from 'next/server'
import {
  A11Y_HEDEF, A11Y_STACK, POUR_PRENSIPLERI, A11Y_KONTEKSTLER,
  KONTRAST_GEREKSINIMLERI, EDITOR_KONTRAST_TABLOSU, RENK_DISI_KURALLARI,
  RENK_KORLUGU_TIPLERI, KLAVYE_PATTERNLERI, FOCUS_YONETIMI,
  TABINDEX_KURALLARI, ARIA_PATTERNLERI, GORSEL_ALT_KURALLARI,
  SEMANTIK_HTML_KURALLARI, BASLIK_HIYERARSISI, TURKCE_A11Y,
  ZOOM_KURALLARI, MOBIL_A11Y, ZAMANLAMA_KURALLARI, HAREKET_KURALLARI,
  SKIP_NAVIGATION, ESNAF_SITE_A11Y, AI_URETIM_A11Y_KONTROL,
  TEST_PIPELINE, MANUEL_TEST, A11Y_METRIKLERI,
} from '@/data/accessibilityConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    // PUBLIC — a11y docs are reference material

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, hedef: A11Y_HEDEF, stack: A11Y_STACK,
        pourPrensipleri: POUR_PRENSIPLERI, kontekstler: A11Y_KONTEKSTLER,
        sayilar: {
          kontrastKontrol: EDITOR_KONTRAST_TABLOSU.length,
          klavyePattern: KLAVYE_PATTERNLERI.length,
          ariaPattern: ARIA_PATTERNLERI.length,
          esnafSiteComponent: Object.keys(ESNAF_SITE_A11Y).length,
        },
      })
    }

    if (mode === 'contrast') {
      return NextResponse.json({
        ok: true, gereksinimler: KONTRAST_GEREKSINIMLERI,
        editorTablosu: EDITOR_KONTRAST_TABLOSU,
        renkDisiKurallar: RENK_DISI_KURALLARI,
        renkKorluguTipleri: RENK_KORLUGU_TIPLERI,
      })
    }

    if (mode === 'keyboard') {
      return NextResponse.json({
        ok: true, patternler: KLAVYE_PATTERNLERI,
        focusYonetimi: FOCUS_YONETIMI, tabindexKurallar: TABINDEX_KURALLARI,
      })
    }

    if (mode === 'aria') {
      const bilesen = searchParams.get('bilesen')
      if (bilesen) {
        const pattern = ARIA_PATTERNLERI.find(p => p.bilesen.toLowerCase().includes(bilesen.toLowerCase()))
        return pattern ? NextResponse.json({ ok: true, pattern }) : NextResponse.json({ error: `ARIA pattern bulunamadı: ${bilesen}` }, { status: 404 })
      }
      return NextResponse.json({ ok: true, patternler: ARIA_PATTERNLERI, toplam: ARIA_PATTERNLERI.length })
    }

    if (mode === 'semantic') {
      return NextResponse.json({
        ok: true, gorselAlt: GORSEL_ALT_KURALLARI,
        htmlKurallar: SEMANTIK_HTML_KURALLARI, baslikHiyerarsisi: BASLIK_HIYERARSISI,
      })
    }

    if (mode === 'turkish') {
      return NextResponse.json({ ok: true, turkceA11y: TURKCE_A11Y })
    }

    if (mode === 'zoom') {
      return NextResponse.json({ ok: true, kurallar: ZOOM_KURALLARI })
    }

    if (mode === 'mobile') {
      return NextResponse.json({ ok: true, mobilA11y: MOBIL_A11Y })
    }

    if (mode === 'timing') {
      return NextResponse.json({ ok: true, zamanlama: ZAMANLAMA_KURALLARI, hareket: HAREKET_KURALLARI })
    }

    if (mode === 'navigation') {
      return NextResponse.json({ ok: true, skipNav: SKIP_NAVIGATION })
    }

    if (mode === 'site-components') {
      return NextResponse.json({
        ok: true, componentler: ESNAF_SITE_A11Y,
        aiKontrol: AI_URETIM_A11Y_KONTROL,
      })
    }

    if (mode === 'testing') {
      return NextResponse.json({
        ok: true, pipeline: TEST_PIPELINE, manuelTest: MANUEL_TEST,
      })
    }

    if (mode === 'metrics') {
      return NextResponse.json({ ok: true, metrikler: A11Y_METRIKLERI })
    }

    return NextResponse.json({
      error: 'mode: overview, contrast, keyboard, aria, semantic, turkish, zoom, mobile, timing, navigation, site-components, testing, metrics',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
