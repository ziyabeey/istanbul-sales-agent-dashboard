/**
 * Sosyal Medya & İçerik Üretimi API
 * GET /api/v1/social-media — AI content, calendar, platforms, analytics
 */
import { NextResponse } from 'next/server'
import {
  SOSYAL_STACK, PLAN_KISITLAMA, TURKIYE_CONTEXT,
  AI_ICERIK, ICERIK_TIPLERI, HASHTAG_STRATEJISI, GORSEL_FORMATLARI,
  DINI_GUNLER, ULUSAL_GUNLER, MEVSIMSEL, SEKTOR_TAKVIM, ZAMANLAMA,
  META_ENTEGRASYON, GBP_ENTEGRASYON,
  PERFORMANS_METRIKLERI, DASHBOARD_PANELLER, AI_ONERILERI,
  SOSYAL_ENDPOINTLERI,
} from '@/data/sosyalMedyaConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, stack: SOSYAL_STACK, planlar: PLAN_KISITLAMA, turkiye: TURKIYE_CONTEXT,
        sayilar: {
          icerikTipi: ICERIK_TIPLERI.length,
          hashtagKatman: HASHTAG_STRATEJISI.katmanlar.length,
          gorselFormat: GORSEL_FORMATLARI.length,
          diniGun: DINI_GUNLER.length,
          ulusalGun: ULUSAL_GUNLER.length,
          mevsim: MEVSIMSEL.length,
          sektorTakvim: SEKTOR_TAKVIM.length,
          endpoint: SOSYAL_ENDPOINTLERI.length,
        },
      })
    }

    if (mode === 'ai-content') {
      return NextResponse.json({
        ok: true, aiIcerik: AI_ICERIK, icerikTipleri: ICERIK_TIPLERI,
        hashtag: HASHTAG_STRATEJISI, gorselFormatlari: GORSEL_FORMATLARI,
      })
    }

    if (mode === 'calendar') {
      return NextResponse.json({
        ok: true, diniGunler: DINI_GUNLER, ulusalGunler: ULUSAL_GUNLER,
        mevsimsel: MEVSIMSEL, sektorTakvim: SEKTOR_TAKVIM, zamanlama: ZAMANLAMA,
      })
    }

    if (mode === 'platforms') {
      return NextResponse.json({ ok: true, meta: META_ENTEGRASYON, gbp: GBP_ENTEGRASYON })
    }

    if (mode === 'analytics') {
      return NextResponse.json({
        ok: true, metrikler: PERFORMANS_METRIKLERI,
        paneller: DASHBOARD_PANELLER, aiOnerileri: AI_ONERILERI,
      })
    }

    if (mode === 'endpoints') {
      return NextResponse.json({ ok: true, endpointler: SOSYAL_ENDPOINTLERI })
    }

    return NextResponse.json({
      error: 'mode: overview, ai-content, calendar, platforms, analytics, endpoints',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
