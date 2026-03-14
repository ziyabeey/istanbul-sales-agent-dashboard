import { NextResponse } from 'next/server'
import { taksitSorgula } from '@/lib/iyzicoClient'

// GET — Taksit seçeneklerini sorgula (BIN bazlı)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const bin = searchParams.get('bin')
    const fiyat = searchParams.get('fiyat')

    if (!bin || bin.length < 6) {
      return NextResponse.json({ error: 'En az 6 haneli BIN numarası gerekli' }, { status: 400 })
    }

    if (!fiyat || isNaN(Number(fiyat))) {
      return NextResponse.json({ error: 'Geçerli bir fiyat (kuruş) gerekli' }, { status: 400 })
    }

    const sonuc = await taksitSorgula(bin, Number(fiyat))

    if (!sonuc) {
      return NextResponse.json({ error: 'Taksit bilgisi alınamadı' }, { status: 404 })
    }

    return NextResponse.json(sonuc)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
