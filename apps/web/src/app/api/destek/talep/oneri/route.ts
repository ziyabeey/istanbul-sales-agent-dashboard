import { NextResponse, NextRequest } from 'next/server'
import { TUM_DESTEK_SAYFALARI } from '@/data/destekMakaleleri'
import { SORUN_GIDERME_KATEGORILERI } from '@/data/sorunGidermeVerileri'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { metin } = body

    if (!metin || metin.length < 3) {
      return NextResponse.json({ ok: true, oneriler: [] })
    }

    const kelimeler = metin
      .toLowerCase()
      .split(/\s+/)
      .filter((k: string) => k.length >= 2)

    // Score each page by keyword match
    const skorlar: { baslik: string; href: string; ozet: string; skor: number }[] = []

    // Search in destekMakaleleri
    for (const sayfa of TUM_DESTEK_SAYFALARI) {
      let skor = 0
      const hedef = `${sayfa.baslik} ${sayfa.ozet} ${sayfa.anahtarlar.join(' ')}`.toLowerCase()
      for (const kelime of kelimeler) {
        if (hedef.includes(kelime)) skor++
        // Bonus for keyword match
        if (sayfa.anahtarlar.some((a) => a.includes(kelime))) skor += 2
      }
      if (skor > 0) {
        skorlar.push({ baslik: sayfa.baslik, href: sayfa.href, ozet: sayfa.ozet, skor })
      }
    }

    // Also search in sorun giderme
    for (const kat of SORUN_GIDERME_KATEGORILERI) {
      for (const sorun of kat.sorunlar) {
        let skor = 0
        const hedef = `${sorun.baslik} ${sorun.belirtiler.join(' ')} ${sorun.anahtarlar.join(' ')}`.toLowerCase()
        for (const kelime of kelimeler) {
          if (hedef.includes(kelime)) skor++
          if (sorun.anahtarlar.some((a) => a.includes(kelime))) skor += 2
        }
        if (skor > 0) {
          skorlar.push({
            baslik: sorun.baslik,
            href: `/destek/sorun-giderme/${kat.slug}`,
            ozet: sorun.belirtiler[0] || '',
            skor,
          })
        }
      }
    }

    // Sort by score and return top 5
    skorlar.sort((a, b) => b.skor - a.skor)
    const oneriler = skorlar.slice(0, 5).map(({ baslik, href, ozet }) => ({ baslik, href, ozet }))

    return NextResponse.json({ ok: true, oneriler })
  } catch (err) {
    console.error('[destek/talep/oneri] POST error:', err)
    return NextResponse.json({ ok: true, oneriler: [] })
  }
}
