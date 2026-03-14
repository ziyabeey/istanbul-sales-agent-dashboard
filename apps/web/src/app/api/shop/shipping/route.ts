import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { kargoFiyatHesapla, gonderiOlusturVeKaydet, takipGuncelle } from '@/lib/kargoAdapter'
import type { KargoFiyatParams } from '@/lib/kargoAdapter'

// GET — Kargo fiyat karşılaştırması
export async function GET(request: Request) {
  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')
    const agirlik = searchParams.get('agirlik')

    if (!shopId || !agirlik) {
      return NextResponse.json({ error: 'shopId ve agirlik gerekli' }, { status: 400 })
    }

    const params: KargoFiyatParams = {
      agirlik: Number(agirlik),
      gondericiPK: searchParams.get('gondericiPK') || '34000',
      aliciPK: searchParams.get('aliciPK') || '34000',
    }

    // Boyut varsa ekle
    const en = searchParams.get('en')
    const yuk = searchParams.get('yukseklik')
    const der = searchParams.get('derinlik')
    if (en && yuk && der) {
      params.boyutlar = { en: Number(en), yukseklik: Number(yuk), derinlik: Number(der) }
    }

    const fiyatlar = await kargoFiyatHesapla(shopId, params)
    return NextResponse.json({ fiyatlar })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST — Kargo etiket oluştur + gönderi başlat
export async function POST(request: Request) {
  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { firmaId, shopId, siparisId, alici, gonderici, agirlik, boyutlar, tahsilatTutar } = body

    if (!firmaId || !shopId || !siparisId || !alici) {
      return NextResponse.json({ error: 'firmaId, shopId, siparisId ve alici zorunlu' }, { status: 400 })
    }

    const sonuc = await gonderiOlusturVeKaydet(firmaId, {
      siparisId,
      shopId,
      aliciAd: alici.ad,
      aliciTelefon: alici.telefon,
      aliciAdres: alici.adres,
      aliciIlce: alici.ilce || '',
      aliciSehir: alici.sehir,
      aliciPK: alici.postaKodu || '34000',
      gondericiAd: gonderici?.ad || '',
      gondericiTelefon: gonderici?.telefon || '',
      gondericiAdres: gonderici?.adres || '',
      gondericiSehir: gonderici?.sehir || '',
      agirlik: agirlik || 500,
      boyutlar,
      tahsilatTutar,
      aciklama: `Sipariş #${siparisId}`,
    })

    if (!sonuc.basarili) {
      return NextResponse.json({ error: sonuc.hataMesaji || 'Gönderi oluşturulamadı' }, { status: 502 })
    }

    return NextResponse.json({
      ok: true,
      takipNo: sonuc.takipNo,
      etiketUrl: sonuc.etiketUrl,
      tahminiTeslim: sonuc.tahminiTeslim,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
