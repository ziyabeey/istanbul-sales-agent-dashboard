'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { ShoppingCart, Search, ChevronRight, Minus, Plus, X, ArrowLeft, Send } from 'lucide-react'

// Tip tanımları (client-side sadeleştirilmiş)
interface Urun {
  id: string; ad: string; slug: string; fiyat: number; karsilastirmaFiyat?: number
  gorseller: string[]; kategoriler: string[]; kisaAciklama?: string; stok: { miktar: number; takipli: boolean }
}
interface Kategori { id: string; ad: string; slug: string; ikon?: string }
interface Magaza { id: string; ad: string; sektor: string; telefon: string; adres: string }
interface SepetItem { urunId: string; ad: string; gorsel: string; fiyat: number; adet: number }

const fiyatFormat = (kurus: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(kurus / 100)

export default function StorefrontPage({ params }: { params: Promise<{ shopSlug: string }> }) {
  const [magaza, setMagaza] = useState<Magaza | null>(null)
  const [urunler, setUrunler] = useState<Urun[]>([])
  const [kategoriler, setKategoriler] = useState<Kategori[]>([])
  const [aktifKategori, setAktifKategori] = useState<string>('hepsi')
  const [arama, setArama] = useState('')
  const [sepet, setSepet] = useState<SepetItem[]>([])
  const [sepetAcik, setSepetAcik] = useState(false)
  const [yukleniyor, setYukleniyor] = useState(true)

  // Sepeti localStorage'dan yükle
  useEffect(() => {
    const kayitli = localStorage.getItem('sepet')
    if (kayitli) setSepet(JSON.parse(kayitli))
  }, [])

  // Sepeti localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('sepet', JSON.stringify(sepet))
  }, [sepet])

  // Demo veri yükle
  useEffect(() => {
    setMagaza({ id: 'demo', ad: 'Yeşil Çarşı Market', sektor: 'Market', telefon: '02163550606', adres: 'Üsküdar, İstanbul' })
    setKategoriler([
      { id: '1', ad: 'Meyve & Sebze', slug: 'meyve-sebze', ikon: '🥬' },
      { id: '2', ad: 'Süt & Kahvaltı', slug: 'sut-kahvalti', ikon: '🥛' },
      { id: '3', ad: 'Temizlik', slug: 'temizlik', ikon: '🧴' },
    ])
    setUrunler([
      { id: '1', ad: 'Organik Domates 1kg', slug: 'organik-domates', fiyat: 4990, gorseller: ['https://images.unsplash.com/photo-1546470427-e26264be0b11?w=400&q=80'], kategoriler: ['1'], kisaAciklama: 'Taze, organik domates', stok: { miktar: 50, takipli: true } },
      { id: '2', ad: 'Taze Süt 1L', slug: 'taze-sut', fiyat: 3490, gorseller: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80'], kategoriler: ['2'], kisaAciklama: 'Günlük taze süt', stok: { miktar: 30, takipli: true } },
      { id: '3', ad: 'Karadeniz Tereyağı 500g', slug: 'karadeniz-tereyagi', fiyat: 17990, karsilastirmaFiyat: 22990, gorseller: ['https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80'], kategoriler: ['2'], kisaAciklama: 'Yöresel Karadeniz tereyağı', stok: { miktar: 15, takipli: true } },
      { id: '4', ad: 'Ezine Peyniri 500g', slug: 'ezine-peyniri', fiyat: 14990, gorseller: ['https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80'], kategoriler: ['2'], kisaAciklama: 'Tam yağlı Ezine beyaz peynir', stok: { miktar: 25, takipli: true } },
      { id: '5', ad: 'Doğal Çiçek Balı 450g', slug: 'dogal-bal', fiyat: 24990, gorseller: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80'], kategoriler: ['2'], kisaAciklama: 'Saf çiçek balı', stok: { miktar: 20, takipli: true } },
      { id: '6', ad: 'Taze Salatalık 1kg', slug: 'taze-salatalik', fiyat: 2990, gorseller: ['https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&q=80'], kategoriler: ['1'], kisaAciklama: 'Çıtır taze salatalık', stok: { miktar: 40, takipli: true } },
    ])
    setYukleniyor(false)
  }, [])

  const filtrelenmis = useMemo(() => {
    return urunler.filter(u => {
      if (aktifKategori !== 'hepsi' && !u.kategoriler.includes(aktifKategori)) return false
      if (arama && !u.ad.toLowerCase().includes(arama.toLowerCase())) return false
      return true
    })
  }, [urunler, aktifKategori, arama])

  const sepeteEkle = (urun: Urun) => {
    setSepet(prev => {
      const mevcut = prev.find(s => s.urunId === urun.id)
      if (mevcut) {
        return prev.map(s => s.urunId === urun.id ? { ...s, adet: s.adet + 1 } : s)
      }
      return [...prev, { urunId: urun.id, ad: urun.ad, gorsel: urun.gorseller[0] || '', fiyat: urun.fiyat, adet: 1 }]
    })
  }

  const adetDegistir = (urunId: string, delta: number) => {
    setSepet(prev => {
      const yeni = prev.map(s => s.urunId === urunId ? { ...s, adet: Math.max(0, s.adet + delta) } : s)
      return yeni.filter(s => s.adet > 0)
    })
  }

  const sepetToplam = sepet.reduce((t, s) => t + s.fiyat * s.adet, 0)
  const sepetAdet = sepet.reduce((t, s) => t + s.adet, 0)

  const whatsAppSiparis = () => {
    if (sepet.length === 0) return
    let mesaj = '🛒 *Sipariş Detayı*\n\n'
    sepet.forEach(s => { mesaj += `${s.adet}x ${s.ad} — ${fiyatFormat(s.fiyat * s.adet)}\n` })
    mesaj += `\n💰 *Toplam: ${fiyatFormat(sepetToplam)}*`
    window.open(`https://wa.me/90${magaza?.telefon || ''}?text=${encodeURIComponent(mesaj)}`, '_blank')
  }

  if (yukleniyor) {
    return <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center"><div className="text-lg text-gray-400">Yükleniyor...</div></div>
  }

  return (
    <div className="min-h-screen bg-[#fafaf7] text-gray-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 px-4 h-16 flex items-center justify-between max-w-[1200px] mx-auto">
        <div className="font-extrabold text-lg text-green-600">🛒 {magaza?.ad}</div>
        <button onClick={() => setSepetAcik(true)} className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ShoppingCart className="w-6 h-6 text-gray-600" />
          {sepetAdet > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{sepetAdet}</span>
          )}
        </button>
      </nav>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 mb-8 border border-green-100">
          <p className="text-green-600 font-bold text-sm tracking-wider mb-2">ONLINE MARKET</p>
          <h1 className="text-3xl md:text-4xl font-black mb-3">Taze Ürünler, Hızlı Teslimat</h1>
          <p className="text-gray-500 max-w-md mb-6">Mahallenizin güvenilir marketinden online sipariş verin, kapınıza getirelim.</p>
          <div className="relative max-w-md">
            <input
              type="text" placeholder="Ürün ara..." value={arama} onChange={e => setArama(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Kategoriler */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <button
            onClick={() => setAktifKategori('hepsi')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              aktifKategori === 'hepsi' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
            }`}
          >
            Tümü
          </button>
          {kategoriler.map(k => (
            <button
              key={k.id}
              onClick={() => setAktifKategori(k.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                aktifKategori === k.id ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
              }`}
            >
              {k.ikon} {k.ad}
            </button>
          ))}
        </div>

        {/* Ürün Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtrelenmis.map(urun => {
            const indirim = urun.karsilastirmaFiyat && urun.karsilastirmaFiyat > urun.fiyat
            const yuzde = indirim ? Math.round((1 - urun.fiyat / urun.karsilastirmaFiyat!) * 100) : 0
            const sepetteMi = sepet.find(s => s.urunId === urun.id)

            return (
              <div key={urun.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative aspect-square overflow-hidden">
                  <img src={urun.gorseller[0]} alt={urun.ad} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {indirim && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">%{yuzde}</span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold line-clamp-2 mb-1">{urun.ad}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-green-600 font-extrabold text-base">{fiyatFormat(urun.fiyat)}</span>
                    {indirim && <span className="text-gray-400 line-through text-xs">{fiyatFormat(urun.karsilastirmaFiyat!)}</span>}
                  </div>
                  {sepetteMi ? (
                    <div className="flex items-center justify-between bg-green-50 rounded-xl p-1">
                      <button onClick={() => adetDegistir(urun.id, -1)} className="w-8 h-8 rounded-lg bg-white border border-green-200 flex items-center justify-center text-green-600 font-bold">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-green-700">{sepetteMi.adet}</span>
                      <button onClick={() => adetDegistir(urun.id, 1)} className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => sepeteEkle(urun)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Sepete Ekle
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filtrelenmis.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-gray-500 mb-1">Ürün bulunamadı</h3>
            <p className="text-gray-400 text-sm">Arama kriterlerinizi değiştirmeyi deneyin</p>
          </div>
        )}
      </div>

      {/* Sepet Drawer */}
      {sepetAcik && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSepetAcik(false)} />
          <div className="absolute top-0 right-0 w-[380px] max-w-[90vw] h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-right">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-extrabold">🛒 Sepetim ({sepetAdet})</h2>
              <button onClick={() => setSepetAcik(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* İçerik */}
            <div className="flex-1 overflow-y-auto p-4">
              {sepet.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-4xl mb-3">🛒</div>
                  <p className="text-gray-400">Sepetiniz boş</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sepet.map(item => (
                    <div key={item.urunId} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      {item.gorsel && <img src={item.gorsel} alt={item.ad} className="w-14 h-14 rounded-lg object-cover" />}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold truncate">{item.ad}</h4>
                        <p className="text-green-600 font-extrabold text-sm">{fiyatFormat(item.fiyat * item.adet)}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => adetDegistir(item.urunId, -1)} className="w-7 h-7 rounded-md border flex items-center justify-center text-gray-500"><Minus className="w-3 h-3" /></button>
                        <span className="font-bold text-sm min-w-[20px] text-center">{item.adet}</span>
                        <button onClick={() => adetDegistir(item.urunId, 1)} className="w-7 h-7 rounded-md border flex items-center justify-center text-gray-500"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Footer */}
            {sepet.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-lg">Toplam</span>
                  <span className="font-extrabold text-xl text-green-600">{fiyatFormat(sepetToplam)}</span>
                </div>
                <button onClick={whatsAppSiparis} className="w-full bg-[#25d366] hover:bg-[#20bd5a] text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-colors">
                  <Send className="w-5 h-5" /> WhatsApp ile Sipariş Ver
                </button>
                <p className="text-center text-gray-400 text-xs mt-2">Siparişiniz WhatsApp üzerinden onaylanacaktır</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky Sepet Bar (Mobil) */}
      {sepetAdet > 0 && !sepetAcik && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center justify-between z-50 md:hidden">
          <div>
            <span className="text-sm text-gray-500">{sepetAdet} ürün</span>
            <div className="text-green-600 font-extrabold">{fiyatFormat(sepetToplam)}</div>
          </div>
          <button onClick={() => setSepetAcik(true)} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" /> Sepeti Gör
          </button>
        </div>
      )}
    </div>
  )
}
