/**
 * Turkish Marketplace Integration API
 * GET /api/v1/marketplace — Trendyol, Hepsiburada, n11 specs
 */
import { NextResponse } from 'next/server'
import {
  PAZARYERLERI, URUN_GEREKSINIMLERI, SIPARIS_AKISLARI,
  KOMISYON_ORANLARI, KOMISYON_DETAYLARI, STOPAJ_NOTU,
  STOK_SENK, MIDDLEWARE_PLATFORMLARI, ETICARET_PLATFORMLARI,
  KATEGORI_ESLESTIRME, GUNCEL_DEGISIKLIKLER,
} from '@/data/marketplaceConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, pazaryerleri: PAZARYERLERI,
        sayilar: {
          pazaryeriSayisi: PAZARYERLERI.length,
          komisyonKategori: KOMISYON_ORANLARI.length,
          middlewareSayisi: MIDDLEWARE_PLATFORMLARI.length,
          guncelDegisiklik: GUNCEL_DEGISIKLIKLER.length,
        },
      })
    }

    if (mode === 'platform') {
      const id = searchParams.get('id')
      if (id) {
        const p = PAZARYERLERI.find(k => k.id === id)
        const urun = URUN_GEREKSINIMLERI.find(u => u.pazaryeri === id)
        const siparis = SIPARIS_AKISLARI.find(s => s.pazaryeri === id)
        const komisyon = KOMISYON_DETAYLARI[id as keyof typeof KOMISYON_DETAYLARI]
        return p
          ? NextResponse.json({ ok: true, platform: p, urunGereksinim: urun, siparisAkisi: siparis, komisyonDetay: komisyon })
          : NextResponse.json({ error: `Platform bulunamadı: ${id}` }, { status: 404 })
      }
      return NextResponse.json({ ok: true, platformlar: PAZARYERLERI })
    }

    if (mode === 'products') {
      return NextResponse.json({ ok: true, gereksinimler: URUN_GEREKSINIMLERI, kategoriEslestirme: KATEGORI_ESLESTIRME })
    }

    if (mode === 'orders') {
      return NextResponse.json({ ok: true, akislar: SIPARIS_AKISLARI })
    }

    if (mode === 'commissions') {
      return NextResponse.json({
        ok: true, oranlar: KOMISYON_ORANLARI, detaylar: KOMISYON_DETAYLARI,
        stopaj: STOPAJ_NOTU,
      })
    }

    if (mode === 'stock') {
      return NextResponse.json({ ok: true, senkronizasyon: STOK_SENK })
    }

    if (mode === 'middleware') {
      return NextResponse.json({
        ok: true, middlewareler: MIDDLEWARE_PLATFORMLARI,
        eticaretPlatformlari: ETICARET_PLATFORMLARI,
      })
    }

    if (mode === 'changes') {
      return NextResponse.json({ ok: true, degisiklikler: GUNCEL_DEGISIKLIKLER })
    }

    return NextResponse.json({
      error: 'mode: overview, platform, products, orders, commissions, stock, middleware, changes',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
