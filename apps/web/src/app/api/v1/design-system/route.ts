/**
 * Design System & Component Library API
 * GET /api/v1/design-system — Tokens, themes, components, icons, a11y
 */
import { NextResponse } from 'next/server'
import {
  DESIGN_SYSTEM_STACK, TEMA_KONTEKSTLERI, RENK_TOKENLARI, TIPOGRAFI_TOKENLARI,
  SPACING_OLCEGI, RADIUS_TOKENLARI, SHADOW_TOKENLARI, MOTION_TOKENLARI,
  SITE_TEMALARI, COMPONENT_SPECLERI, IKON_BOYUTLARI, MODUL_IKONLARI,
  AKSIYON_IKONLARI, ANIMASYON_KARARI, ANIMASYON_PRESETLERI, BREAKPOINTS,
  RESPONSIVE_KURALLAR, ERISILEBIRLIK, STORYBOOK_ORGANIZASYONU, COMPONENT_CHECKLIST,
} from '@/data/designSystemConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    // PUBLIC — design system docs are reference material

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, stack: DESIGN_SYSTEM_STACK, temaKontekstleri: TEMA_KONTEKSTLERI,
        sayilar: {
          componentSayisi: COMPONENT_SPECLERI.length,
          temaSayisi: SITE_TEMALARI.length,
          ikonSayisi: Object.keys(MODUL_IKONLARI).length + Object.keys(AKSIYON_IKONLARI).length,
          breakpointSayisi: BREAKPOINTS.length,
        },
      })
    }

    if (mode === 'tokens') {
      return NextResponse.json({
        ok: true, renkler: RENK_TOKENLARI, tipografi: TIPOGRAFI_TOKENLARI,
        spacing: SPACING_OLCEGI, radius: RADIUS_TOKENLARI,
        shadow: SHADOW_TOKENLARI, motion: MOTION_TOKENLARI,
      })
    }

    if (mode === 'colors') {
      return NextResponse.json({ ok: true, renkler: RENK_TOKENLARI })
    }

    if (mode === 'typography') {
      return NextResponse.json({ ok: true, tipografi: TIPOGRAFI_TOKENLARI })
    }

    if (mode === 'themes') {
      const id = searchParams.get('id')
      if (id) {
        const tema = SITE_TEMALARI.find(t => t.id === id)
        return tema ? NextResponse.json({ ok: true, tema }) : NextResponse.json({ error: `Tema bulunamadı: ${id}` }, { status: 404 })
      }
      return NextResponse.json({ ok: true, temalar: SITE_TEMALARI, toplam: SITE_TEMALARI.length })
    }

    if (mode === 'components') {
      const kategori = searchParams.get('kategori') as string | null
      const specs = kategori ? COMPONENT_SPECLERI.filter(c => c.kategori === kategori) : COMPONENT_SPECLERI
      const kategoriler = [...new Set(COMPONENT_SPECLERI.map(c => c.kategori))]
      return NextResponse.json({ ok: true, components: specs, kategoriler, toplam: specs.length })
    }

    if (mode === 'icons') {
      return NextResponse.json({
        ok: true, boyutlar: IKON_BOYUTLARI, modul: MODUL_IKONLARI, aksiyon: AKSIYON_IKONLARI,
        kutuphane: 'Lucide React', toplam: Object.keys(MODUL_IKONLARI).length + Object.keys(AKSIYON_IKONLARI).length,
      })
    }

    if (mode === 'animation') {
      return NextResponse.json({ ok: true, karar: ANIMASYON_KARARI, presetler: ANIMASYON_PRESETLERI })
    }

    if (mode === 'responsive') {
      return NextResponse.json({ ok: true, breakpoints: BREAKPOINTS, kurallar: RESPONSIVE_KURALLAR })
    }

    if (mode === 'a11y') {
      return NextResponse.json({ ok: true, erisilebirlik: ERISILEBIRLIK })
    }

    if (mode === 'storybook') {
      return NextResponse.json({ ok: true, organizasyon: STORYBOOK_ORGANIZASYONU })
    }

    if (mode === 'checklist') {
      return NextResponse.json({ ok: true, checklist: COMPONENT_CHECKLIST })
    }

    return NextResponse.json({
      error: 'mode: overview, tokens, colors, typography, themes, components, icons, animation, responsive, a11y, storybook, checklist',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
