'use client'

import React, { useState } from 'react'
import { Gift, ShoppingCart, Users, TrendingUp, Tag, Clock, Percent, DollarSign, Truck, Plus, BarChart3, Zap, Target } from 'lucide-react'
import { SEGMENT_DETAY } from '@/lib/rfmConfig'
import type { RFMSegment } from '@/lib/rfmConfig'

const fiyatFormat = (kurus: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(kurus / 100)

const TIP_IKON = { yuzde: <Percent className="w-3.5 h-3.5" />, sabit: <DollarSign className="w-3.5 h-3.5" />, ucretsiz_kargo: <Truck className="w-3.5 h-3.5" /> }

export default function PazarlamaPage() {
  const [aktifTab, setAktifTab] = useState<'kuponlar' | 'terkSepet' | 'rfm'>('kuponlar')

  // Demo veriler
  const kuponlar = [
    { id: '1', kod: 'HOSGELDIN10', tip: 'yuzde' as const, deger: 10, aktif: true, kullanilanAdet: 24, toplamKullanimLimit: 100, minSepetTutar: 10000 },
    { id: '2', kod: 'YAZ2026', tip: 'sabit' as const, deger: 5000, aktif: true, kullanilanAdet: 8, toplamKullanimLimit: 50, minSepetTutar: 0 },
    { id: '3', kod: 'KARGOBEDAVA', tip: 'ucretsiz_kargo' as const, deger: 0, aktif: false, kullanilanAdet: 156, toplamKullanimLimit: 200, minSepetTutar: 7500 },
  ]

  const terkSepetVeriler = { aktif: 12, kurtarilan: 34, kayipTutar: 456000, kurtarilanTutar: 890000, oran: 28 }

  const rfmSegmentler: { segment: RFMSegment; sayi: number }[] = [
    { segment: 'champions', sayi: 15 }, { segment: 'loyal_customers', sayi: 42 },
    { segment: 'potential_loyalists', sayi: 28 }, { segment: 'new_customers', sayi: 35 },
    { segment: 'need_attention', sayi: 18 }, { segment: 'at_risk', sayi: 12 },
    { segment: 'about_to_sleep', sayi: 8 }, { segment: 'lost', sayi: 22 },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black flex items-center gap-2">🎯 Pazarlama & Otomasyon</h1>
          <p className="text-white/40 text-sm mt-1">Kuponlar, terk sepet kurtarma ve müşteri segmentasyonu</p>
        </div>

        {/* Üst Metrikler */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { ikon: <Gift className="w-5 h-5 text-pink-400" />, baslik: 'Aktif Kupon', deger: kuponlar.filter(k => k.aktif).length },
            { ikon: <ShoppingCart className="w-5 h-5 text-orange-400" />, baslik: 'Terk Sepet (Aktif)', deger: terkSepetVeriler.aktif },
            { ikon: <TrendingUp className="w-5 h-5 text-green-400" />, baslik: 'Kurtarılan', deger: `${terkSepetVeriler.oran}%` },
            { ikon: <Users className="w-5 h-5 text-blue-400" />, baslik: 'Toplam Müşteri', deger: rfmSegmentler.reduce((t, s) => t + s.sayi, 0) },
          ].map((m, i) => (
            <div key={i} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">{m.ikon}<span className="text-xs text-white/40">{m.baslik}</span></div>
              <div className="text-2xl font-black">{m.deger}</div>
            </div>
          ))}
        </div>

        {/* Tab'lar */}
        <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 mb-6 w-fit">
          {[
            { id: 'kuponlar' as const, ad: '🎫 Kuponlar' },
            { id: 'terkSepet' as const, ad: '🛒 Terk Sepet' },
            { id: 'rfm' as const, ad: '📊 Müşteri Segmentleri' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setAktifTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${aktifTab === tab.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}>
              {tab.ad}
            </button>
          ))}
        </div>

        {/* Kuponlar */}
        {aktifTab === 'kuponlar' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">İndirim Kuponları</h2>
              <button className="flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                <Plus className="w-4 h-4" /> Yeni Kupon
              </button>
            </div>
            <div className="space-y-3">
              {kuponlar.map(k => (
                <div key={k.id} className={`bg-[#111] border rounded-2xl p-5 transition-all ${k.aktif ? 'border-white/[0.06] hover:border-pink-500/30' : 'border-white/[0.04] opacity-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="bg-pink-500/10 text-pink-400 px-3 py-1.5 rounded-lg font-mono text-sm font-bold">{k.kod}</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-white/60">
                        {TIP_IKON[k.tip]}
                        {k.tip === 'yuzde' && `%${k.deger}`}
                        {k.tip === 'sabit' && fiyatFormat(k.deger)}
                        {k.tip === 'ucretsiz_kargo' && 'Ücretsiz Kargo'}
                      </span>
                      {k.minSepetTutar > 0 && <span className="text-[10px] text-white/30">Min: {fiyatFormat(k.minSepetTutar)}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-bold">{k.kullanilanAdet}/{k.toplamKullanimLimit || '∞'}</div>
                        <div className="text-[10px] text-white/30">kullanım</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${k.aktif ? 'bg-green-400' : 'bg-red-400'}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terk Sepet */}
        {aktifTab === 'terkSepet' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Terk Sepet Kurtarma Akışı</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
                <h3 className="text-sm font-bold mb-3 text-orange-400">📊 İstatistikler</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-white/40">Aktif Terk Sepet</span><span className="font-bold">{terkSepetVeriler.aktif}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-white/40">Kurtarılan</span><span className="font-bold text-green-400">{terkSepetVeriler.kurtarilan}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-white/40">Kurtarma Oranı</span><span className="font-bold text-green-400">%{terkSepetVeriler.oran}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-white/40">Kurtarılan Gelir</span><span className="font-bold text-green-400">{fiyatFormat(terkSepetVeriler.kurtarilanTutar)}</span></div>
                </div>
              </div>
              <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
                <h3 className="text-sm font-bold mb-3 text-blue-400">⚡ Otomasyon Adımları</h3>
                <div className="space-y-3">
                  {[
                    { saat: '1 saat', aksiyon: 'E-posta hatırlatma', durum: 'aktif' },
                    { saat: '24 saat', aksiyon: 'WhatsApp + %10 kupon', durum: 'aktif' },
                    { saat: '48 saat', aksiyon: 'Final e-posta', durum: 'aktif' },
                    { saat: '72 saat', aksiyon: 'Sepet temizleme', durum: 'aktif' },
                  ].map((a, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      <Clock className="w-3 h-3 text-white/30" />
                      <span className="text-xs text-white/40 w-12">{a.saat}</span>
                      <span className="text-xs font-bold">{a.aksiyon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RFM Segmentasyonu */}
        {aktifTab === 'rfm' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">RFM Müşteri Segmentasyonu</h2>
              <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                <BarChart3 className="w-4 h-4" /> Analizi Güncelle
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {rfmSegmentler.map(({ segment, sayi }) => {
                const detay = SEGMENT_DETAY[segment]
                const toplam = rfmSegmentler.reduce((t, s) => t + s.sayi, 0)
                const yuzde = ((sayi / toplam) * 100).toFixed(1)
                return (
                  <div key={segment} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{detay.ikon}</span>
                      <span className="text-xs font-bold" style={{ color: detay.renk }}>{detay.label}</span>
                    </div>
                    <div className="text-2xl font-black mb-1">{sayi}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${yuzde}%`, background: detay.renk }} />
                      </div>
                      <span className="text-[10px] text-white/30">{yuzde}%</span>
                    </div>
                    <p className="text-[10px] text-white/30 mt-2 leading-relaxed">{detay.aciklama}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
