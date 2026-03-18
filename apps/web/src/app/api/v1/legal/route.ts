/**
 * Yasal Uyumluluk API
 * GET /api/v1/legal — KVKK, İYS, e-Commerce, cookies, VERBİS
 */
import { NextResponse } from 'next/server'
import {
  YASAL_CERCEVE, YASAL_POZISYON, VERI_SINIFLANDIRMASI,
  AYDINLATMA, RIZA_YONETIMI, VERI_SAHIBI_HAKLARI, VERI_IHLALI,
  IYS_CONFIG, MESAFELI_SATIS, ZORUNLU_SAYFALAR,
  CEREZ_YONETIMI, VERBIS, OTOMATIK_UYUM, YASAL_METRIKLERI,
} from '@/data/yasalUyumConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, yasalCerceve: YASAL_CERCEVE, pozisyon: YASAL_POZISYON,
        sayilar: {
          kanun: YASAL_CERCEVE.length,
          veriSahibiHak: VERI_SAHIBI_HAKLARI.length,
          zorunluSayfa: ZORUNLU_SAYFALAR.length,
          iysSlem: IYS_CONFIG.islemler.length,
          cerezKategori: CEREZ_YONETIMI.kategoriler.length,
          saklamaSure: VERBIS.saklamaSureleri.length,
          otomatikUyum: OTOMATIK_UYUM.platformYapan.length,
        },
      })
    }

    if (mode === 'kvkk') {
      return NextResponse.json({
        ok: true, veriSiniflandirmasi: VERI_SINIFLANDIRMASI,
        aydinlatma: AYDINLATMA, rizaYonetimi: RIZA_YONETIMI,
        haklar: VERI_SAHIBI_HAKLARI, ihlal: VERI_IHLALI,
      })
    }

    if (mode === 'iys') {
      return NextResponse.json({ ok: true, iys: IYS_CONFIG })
    }

    if (mode === 'ecommerce') {
      return NextResponse.json({ ok: true, mesafeliSatis: MESAFELI_SATIS, zorunluSayfalar: ZORUNLU_SAYFALAR })
    }

    if (mode === 'cookies') {
      return NextResponse.json({ ok: true, cerez: CEREZ_YONETIMI })
    }

    if (mode === 'verbis') {
      return NextResponse.json({ ok: true, verbis: VERBIS })
    }

    if (mode === 'automation') {
      return NextResponse.json({ ok: true, otomatikUyum: OTOMATIK_UYUM })
    }

    if (mode === 'metrics') {
      return NextResponse.json({ ok: true, metrikler: YASAL_METRIKLERI })
    }

    return NextResponse.json({
      error: 'mode: overview, kvkk, iys, ecommerce, cookies, verbis, automation, metrics',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
