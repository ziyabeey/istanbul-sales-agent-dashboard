/**
 * Localization & UI Text API
 * GET /api/v1/localization — Terms, messages, templates, formats
 */
import { NextResponse } from 'next/server'
import {
  SES_TONU, TERIM_SOZLUGU, BUTONLAR, FORM_ALANLARI, HATA_MESAJLARI,
  BASARI_MESAJLARI, BOS_DURUMLAR, ONAY_DIYALOGLARI, TOOLTIP_METINLERI,
  WA_SABLONLARI, PUSH_BILDIRIMLERI, EPOSTA_KONULARI, A11Y_METINLERI,
  SEO_VARSAYILANLAR, FORMATLAR, LOADING_METINLERI,
} from '@/data/turkceMetinler'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    // ═══ PUBLIC ENDPOINTS (no auth — frontend needs these) ═══

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, dil: 'tr', locale: 'tr-TR',
        sayilar: {
          terimSayisi: Object.keys(TERIM_SOZLUGU).length,
          hataMesajModulu: Object.keys(HATA_MESAJLARI).length,
          bosDurumSayisi: Object.keys(BOS_DURUMLAR).length,
          waSablonSayisi: WA_SABLONLARI.length,
          tooltipSayisi: Object.keys(TOOLTIP_METINLERI).length,
        },
      })
    }

    if (mode === 'voice') {
      return NextResponse.json({ ok: true, sesTonu: SES_TONU })
    }

    if (mode === 'terms') {
      const ara = searchParams.get('q')
      if (ara) {
        const filtrelenmis = Object.entries(TERIM_SOZLUGU)
          .filter(([k, v]) => k.includes(ara.toLowerCase()) || v.toLowerCase().includes(ara.toLowerCase()))
          .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
        return NextResponse.json({ ok: true, terimler: filtrelenmis, toplam: Object.keys(filtrelenmis).length })
      }
      return NextResponse.json({ ok: true, terimler: TERIM_SOZLUGU, toplam: Object.keys(TERIM_SOZLUGU).length })
    }

    if (mode === 'buttons') {
      return NextResponse.json({ ok: true, butonlar: BUTONLAR })
    }

    if (mode === 'forms') {
      return NextResponse.json({ ok: true, alanlar: FORM_ALANLARI })
    }

    if (mode === 'errors') {
      const modul = searchParams.get('modul')
      if (modul && HATA_MESAJLARI[modul]) {
        return NextResponse.json({ ok: true, modul, mesajlar: HATA_MESAJLARI[modul] })
      }
      return NextResponse.json({ ok: true, mesajlar: HATA_MESAJLARI, moduller: Object.keys(HATA_MESAJLARI) })
    }

    if (mode === 'success') {
      return NextResponse.json({ ok: true, mesajlar: BASARI_MESAJLARI })
    }

    if (mode === 'empty-states') {
      return NextResponse.json({ ok: true, durumlar: BOS_DURUMLAR })
    }

    if (mode === 'confirmations') {
      return NextResponse.json({ ok: true, diyaloglar: ONAY_DIYALOGLARI })
    }

    if (mode === 'tooltips') {
      return NextResponse.json({ ok: true, tooltiplar: TOOLTIP_METINLERI })
    }

    if (mode === 'whatsapp-templates') {
      const kategori = searchParams.get('kategori') as 'utility' | 'marketing' | null
      const sablonlar = kategori ? WA_SABLONLARI.filter(s => s.kategori === kategori) : WA_SABLONLARI
      return NextResponse.json({ ok: true, sablonlar, toplam: sablonlar.length })
    }

    if (mode === 'push') {
      return NextResponse.json({ ok: true, bildirimler: PUSH_BILDIRIMLERI })
    }

    if (mode === 'email') {
      return NextResponse.json({ ok: true, konular: EPOSTA_KONULARI })
    }

    if (mode === 'a11y') {
      return NextResponse.json({ ok: true, metinler: A11Y_METINLERI })
    }

    if (mode === 'seo') {
      return NextResponse.json({ ok: true, varsayilanlar: SEO_VARSAYILANLAR })
    }

    if (mode === 'formats') {
      return NextResponse.json({ ok: true, formatlar: FORMATLAR })
    }

    if (mode === 'loading') {
      return NextResponse.json({ ok: true, metinler: LOADING_METINLERI })
    }

    return NextResponse.json({
      error: 'mode: overview, voice, terms, buttons, forms, errors, success, empty-states, confirmations, tooltips, whatsapp-templates, push, email, a11y, seo, formats, loading',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
