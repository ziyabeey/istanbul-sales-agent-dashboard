'use client'

import React, { useState, useEffect } from 'react'
import { Package, PlusCircle, Search, Filter, Eye, Edit, Trash2, AlertTriangle, ShoppingCart, Layers, TrendingUp } from 'lucide-react'

interface Urun {
  id: string
  ad: string
  slug: string
  fiyat: number
  karsilastirmaFiyat?: number
  durum: string
  stok: { takipli: boolean; miktar: number; kritikEsik: number }
  gorseller: string[]
  kategoriler: string[]
  tip: string
  olusturma: any
}

const DURUM_RENK: Record<string, { bg: string; text: string }> = {
  aktif: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e' },
  taslak: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b' },
  arsivlendi: { bg: 'rgba(239,68,68,0.12)', text: '#ef4444' },
}

export default function MagazaUrunlerPage() {
  const [urunler, setUrunler] = useState<Urun[]>([])
  const [yukleniyor, setYukleniyor] = useState(true)
  const [arama, setArama] = useState('')
  const [durumFiltre, setDurumFiltre] = useState<string>('aktif')
  const [toplam, setToplam] = useState(0)

  // Demo verisi (Firebase bağlantısı olmadan çalışsın)
  useEffect(() => {
    setUrunler([
      {
        id: '1', ad: 'Organik Zeytinyağı 1L', slug: 'organik-zeytinyagi', fiyat: 34990, karsilastirmaFiyat: 44990,
        durum: 'aktif', stok: { takipli: true, miktar: 45, kritikEsik: 10 }, gorseller: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80'],
        kategoriler: ['gida'], tip: 'basit', olusturma: new Date()
      },
      {
        id: '2', ad: 'El Yapımı Sabun Seti', slug: 'el-yapimi-sabun', fiyat: 14990,
        durum: 'aktif', stok: { takipli: true, miktar: 120, kritikEsik: 20 }, gorseller: ['https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=200&q=80'],
        kategoriler: ['kozmetik'], tip: 'varyantli', olusturma: new Date()
      },
      {
        id: '3', ad: 'Doğal Bal 500g', slug: 'dogal-bal', fiyat: 24990,
        durum: 'aktif', stok: { takipli: true, miktar: 8, kritikEsik: 10 }, gorseller: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&q=80'],
        kategoriler: ['gida'], tip: 'basit', olusturma: new Date()
      },
      {
        id: '4', ad: 'Seramik Çay Seti', slug: 'seramik-cay-seti', fiyat: 59990, karsilastirmaFiyat: 79990,
        durum: 'taslak', stok: { takipli: true, miktar: 0, kritikEsik: 5 }, gorseller: ['https://images.unsplash.com/photo-1530968033775-2c92736b131e?w=200&q=80'],
        kategoriler: ['ev'], tip: 'basit', olusturma: new Date()
      },
    ])
    setToplam(4)
    setYukleniyor(false)
  }, [])

  const fiyatFormat = (kurus: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(kurus / 100)
  }

  const filtreli = urunler.filter(u => {
    if (durumFiltre !== 'hepsi' && u.durum !== durumFiltre) return false
    if (arama && !u.ad.toLowerCase().includes(arama.toLowerCase())) return false
    return true
  })

  const stokUyari = urunler.filter(u => u.stok.takipli && u.stok.miktar <= u.stok.kritikEsik).length

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-[1400px] mx-auto">

        {/* Üst Kartlar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-white/40 text-sm">Toplam Ürün</span>
            </div>
            <div className="text-2xl font-black">{toplam}</div>
          </div>
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-white/40 text-sm">Aktif</span>
            </div>
            <div className="text-2xl font-black">{urunler.filter(u => u.durum === 'aktif').length}</div>
          </div>
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-white/40 text-sm">Düşük Stok</span>
            </div>
            <div className="text-2xl font-black text-amber-400">{stokUyari}</div>
          </div>
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-white/40 text-sm">Sipariş</span>
            </div>
            <div className="text-2xl font-black">0</div>
          </div>
        </div>

        {/* Başlık + Aksiyonlar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black">🛍️ Ürün Yönetimi</h1>
            <p className="text-white/40 text-sm mt-1">Mağazanızdaki ürünleri yönetin</p>
          </div>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all">
            <PlusCircle className="w-4 h-4" />
            Yeni Ürün Ekle
          </button>
        </div>

        {/* Filtre Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <input
              type="text"
              placeholder="Ürün ara..."
              value={arama}
              onChange={e => setArama(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-green-500/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          </div>
          <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
            {['hepsi', 'aktif', 'taslak', 'arsivlendi'].map(d => (
              <button
                key={d}
                onClick={() => setDurumFiltre(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  durumFiltre === d ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                }`}
              >
                {d === 'hepsi' ? 'Tümü' : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Ürün Tablosu */}
        <div className="bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-5 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wide">Ürün</th>
                  <th className="text-left px-5 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wide">Fiyat</th>
                  <th className="text-left px-5 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wide">Stok</th>
                  <th className="text-left px-5 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wide">Durum</th>
                  <th className="text-right px-5 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wide">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filtreli.map(urun => {
                  const durumRenk = DURUM_RENK[urun.durum] || DURUM_RENK.taslak
                  const dusukStok = urun.stok.takipli && urun.stok.miktar <= urun.stok.kritikEsik
                  return (
                    <tr key={urun.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {urun.gorseller[0] ? (
                            <img src={urun.gorseller[0]} alt={urun.ad} className="w-12 h-12 rounded-xl object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">📦</div>
                          )}
                          <div>
                            <div className="text-sm font-bold text-white">{urun.ad}</div>
                            <div className="text-[11px] text-white/30 mt-0.5">
                              {urun.tip === 'varyantli' && <span className="mr-2">🏷️ Varyantlı</span>}
                              /{urun.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-sm font-bold text-white">{fiyatFormat(urun.fiyat)}</div>
                        {urun.karsilastirmaFiyat && (
                          <div className="text-[11px] text-white/30 line-through">{fiyatFormat(urun.karsilastirmaFiyat)}</div>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className={`text-sm font-bold ${dusukStok ? 'text-amber-400' : 'text-white'}`}>
                          {urun.stok.takipli ? urun.stok.miktar : '∞'}
                          {dusukStok && <span className="ml-1.5 text-[10px]">⚠️</span>}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                          style={{ background: durumRenk.bg, color: durumRenk.text }}
                        >
                          {urun.durum}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 justify-end">
                          <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-blue-400 transition-all" title="Düzenle">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-red-400 transition-all" title="Sil">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filtreli.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-white/15 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white/50 mb-1">Ürün bulunamadı</h3>
              <p className="text-white/30 text-sm">Filtreleri değiştirin veya yeni ürün ekleyin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
