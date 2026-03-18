/**
 * Çoklu Dil & Lokalizasyon (i18n) API
 * GET /api/v1/i18n — Languages, translation, RTL, tourist regions
 */
import { NextResponse } from 'next/server'
import {
  I18N_STACK, DESTEKLENEN_DILLER, PLAN_KISITLAMA, URL_YAPISI,
  CEVIRI_KATMANLARI, AI_CEVIRI, RTL_DESTEK,
  TURIST_BOLGELERI, TURIST_OZELLIKLERI,
  DASHBOARD_I18N, I18N_VERI_MODELI,
} from '@/data/i18nConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    const rtlDiller = DESTEKLENEN_DILLER.filter(d => d.yon === 'RTL')

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, stack: I18N_STACK, planlar: PLAN_KISITLAMA,
        sayilar: {
          toplamDil: DESTEKLENEN_DILLER.length,
          aktifDil: DESTEKLENEN_DILLER.filter(d => !d.gelecek).length,
          rtlDil: rtlDiller.length,
          ceviriKatman: CEVIRI_KATMANLARI.length,
          turistBolge: TURIST_BOLGELERI.length,
          turistIlce: TURIST_BOLGELERI.reduce((a, b) => a + b.ilceler.length, 0),
        },
      })
    }

    if (mode === 'languages') {
      return NextResponse.json({ ok: true, diller: DESTEKLENEN_DILLER, urlYapisi: URL_YAPISI })
    }

    if (mode === 'translation') {
      return NextResponse.json({ ok: true, katmanlar: CEVIRI_KATMANLARI, aiCeviri: AI_CEVIRI })
    }

    if (mode === 'rtl') {
      return NextResponse.json({ ok: true, rtl: RTL_DESTEK, rtlDiller })
    }

    if (mode === 'tourist') {
      const bolge = searchParams.get('bolge')
      if (bolge) {
        const b = TURIST_BOLGELERI.find(x => x.bolge.toLowerCase().includes(bolge.toLowerCase()))
        return b ? NextResponse.json({ ok: true, bolge: b }) : NextResponse.json({ error: `Bölge bulunamadı: ${bolge}` }, { status: 404 })
      }
      return NextResponse.json({ ok: true, bolgeler: TURIST_BOLGELERI, ozellikler: TURIST_OZELLIKLERI })
    }

    if (mode === 'dashboard') {
      return NextResponse.json({ ok: true, dashboard: DASHBOARD_I18N })
    }

    if (mode === 'data-model') {
      return NextResponse.json({ ok: true, veriModeli: I18N_VERI_MODELI })
    }

    return NextResponse.json({
      error: 'mode: overview, languages, translation, rtl, tourist, dashboard, data-model',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
