/**
 * Sadakat & Gamification API
 * GET /api/v1/loyalty — Programs, tiers, rewards, templates, gamification
 */
import { NextResponse } from 'next/server'
import {
  SADAKAT_STACK, PLAN_KISITLAMA, KULTUR_BAGLAMM,
  PROGRAM_TIPLERI, KAZANIM_KURAL_TIPLERI, ODUL_TIPLERI,
  VIP_TIER_SEMA, FIRESTORE_KOLEKSIYONLAR, SEKTOR_SABLONLARI,
  KAZANIM_AKISLARI, KULLANIM_AKISLARI, WHATSAPP_BILDIRIMLERI,
  GAMIFICATION, DASHBOARD_ANALITIK, SADAKAT_ENDPOINTLERI,
} from '@/data/sadakatConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, stack: SADAKAT_STACK, planlar: PLAN_KISITLAMA, kultur: KULTUR_BAGLAMM,
        sayilar: {
          programTipi: PROGRAM_TIPLERI.length,
          kazanimKuralTipi: KAZANIM_KURAL_TIPLERI.length,
          odulTipi: ODUL_TIPLERI.length,
          vipTier: VIP_TIER_SEMA.varsayilanTierler.length,
          sektorSablon: SEKTOR_SABLONLARI.length,
          kazanimAkisi: KAZANIM_AKISLARI.length,
          kullanimAkisi: KULLANIM_AKISLARI.length,
          whatsappBildirim: WHATSAPP_BILDIRIMLERI.length,
          basarim: GAMIFICATION.basarimlar.length,
          mevsimselEtkinlik: GAMIFICATION.mevsimsel.length,
          endpoint: SADAKAT_ENDPOINTLERI.length,
        },
      })
    }

    if (mode === 'data-model') {
      return NextResponse.json({
        ok: true, programTipleri: PROGRAM_TIPLERI, kazanimKuralTipleri: KAZANIM_KURAL_TIPLERI,
        odulTipleri: ODUL_TIPLERI, vipTiers: VIP_TIER_SEMA, koleksiyonlar: FIRESTORE_KOLEKSIYONLAR,
      })
    }

    if (mode === 'templates') {
      const sektor = searchParams.get('sektor')
      if (sektor) {
        const s = SEKTOR_SABLONLARI.find(x => x.sektor === sektor)
        return s ? NextResponse.json({ ok: true, sablon: s }) : NextResponse.json({ error: `Sektör bulunamadı: ${sektor}` }, { status: 404 })
      }
      return NextResponse.json({ ok: true, sablonlar: SEKTOR_SABLONLARI })
    }

    if (mode === 'flows') {
      return NextResponse.json({ ok: true, kazanim: KAZANIM_AKISLARI, kullanim: KULLANIM_AKISLARI })
    }

    if (mode === 'whatsapp') {
      return NextResponse.json({ ok: true, bildirimler: WHATSAPP_BILDIRIMLERI })
    }

    if (mode === 'gamification') {
      return NextResponse.json({ ok: true, gamification: GAMIFICATION })
    }

    if (mode === 'analytics') {
      return NextResponse.json({ ok: true, analitik: DASHBOARD_ANALITIK })
    }

    if (mode === 'endpoints') {
      return NextResponse.json({ ok: true, endpointler: SADAKAT_ENDPOINTLERI })
    }

    return NextResponse.json({
      error: 'mode: overview, data-model, templates, flows, whatsapp, gamification, analytics, endpoints',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
