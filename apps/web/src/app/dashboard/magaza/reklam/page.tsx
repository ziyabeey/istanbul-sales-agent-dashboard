'use client'

import React, { useState } from 'react'
import { Megaphone, BarChart3, Zap, Target, DollarSign, TrendingUp, ExternalLink, Copy, CheckCircle2 } from 'lucide-react'
import { META_KAMPANYA_SABLONLARI } from '@/lib/metaAds'
import { GOOGLE_KAMPANYA_SABLONLARI } from '@/lib/googleMerchant'

const fiyatFormat = (kurus: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(kurus / 100)

const TIP_IKON: Record<string, string> = {
  retargeting: '🔄', prospecting: '🔍', dpa: '🛍️', lookalike: '👥',
  shopping: '🛒', pmax: '⚡', remarketing: '🎯', search: '🔎',
}

export default function ReklamPaneliPage() {
  const [aktifTab, setAktifTab] = useState<'meta' | 'google' | 'feeds'>('meta')
  const [kopyalandi, setKopyalandi] = useState('')
  const shopId = 'demo-shop'

  const feedKopyala = (url: string) => {
    navigator.clipboard.writeText(url)
    setKopyalandi(url)
    setTimeout(() => setKopyalandi(''), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-2xl font-black flex items-center gap-2">📡 Reklam Yönetimi</h1>
          <p className="text-white/40 text-sm mt-1">Meta ve Google Ads kampanyalarınızı tek panelden yönetin</p>
        </div>

        {/* Üst Metrikler */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { ikon: <Megaphone className="w-5 h-5 text-blue-400" />, baslik: 'Aktif Kampanya', deger: '0', bg: 'blue' },
            { ikon: <BarChart3 className="w-5 h-5 text-green-400" />, baslik: 'Gösterim', deger: '—', bg: 'green' },
            { ikon: <Target className="w-5 h-5 text-purple-400" />, baslik: 'Tıklama', deger: '—', bg: 'purple' },
            { ikon: <DollarSign className="w-5 h-5 text-amber-400" />, baslik: 'ROAS', deger: '—', bg: 'amber' },
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
            { id: 'meta' as const, ad: '🔵 Meta Ads', color: '#1877F2' },
            { id: 'google' as const, ad: '🔴 Google Ads', color: '#EA4335' },
            { id: 'feeds' as const, ad: '📄 Feed URL\'leri', color: '#22c55e' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setAktifTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${aktifTab === tab.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}>
              {tab.ad}
            </button>
          ))}
        </div>

        {/* Meta Kampanya Şablonları */}
        {aktifTab === 'meta' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold">Meta Kampanya Şablonları</h2>
              <span className="text-xs text-white/30">Facebook + Instagram</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {META_KAMPANYA_SABLONLARI.map(k => (
                <div key={k.id} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{TIP_IKON[k.tip]}</span>
                    <h3 className="font-bold text-sm">{k.ad}</h3>
                  </div>
                  <p className="text-xs text-white/40 mb-4 leading-relaxed">{k.aciklama}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/30">
                      Bütçe: <span className="text-white/60 font-bold">{fiyatFormat(k.butce.onerilen)}/gün</span>
                    </div>
                    <button className="flex items-center gap-1 bg-blue-600/20 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600/30 transition-colors">
                      <Zap className="w-3 h-3" /> Başlat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Google Kampanya Şablonları */}
        {aktifTab === 'google' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold">Google Ads Kampanya Şablonları</h2>
              <span className="text-xs text-white/30">Search + Shopping + YouTube + Display</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOOGLE_KAMPANYA_SABLONLARI.map(k => (
                <div key={k.id} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-red-500/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{TIP_IKON[k.tip]}</span>
                    <h3 className="font-bold text-sm">{k.ad}</h3>
                  </div>
                  <p className="text-xs text-white/40 mb-4 leading-relaxed">{k.aciklama}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/30">
                      Bütçe: <span className="text-white/60 font-bold">{fiyatFormat(k.butce.onerilen)}/gün</span>
                    </div>
                    <button className="flex items-center gap-1 bg-red-600/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600/30 transition-colors">
                      <Zap className="w-3 h-3" /> Başlat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feed URL'leri */}
        {aktifTab === 'feeds' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold mb-2">Ürün Feed URL&apos;leri</h2>
            <p className="text-xs text-white/40 mb-4">Bu URL&apos;leri Meta Commerce Manager ve Google Merchant Center&apos;a ekleyin.</p>
            {[
              { ad: 'Meta Catalog Feed', url: `/api/shop/feeds/meta?shopId=${shopId}`, renk: '#1877F2', aciklama: 'Meta Commerce Manager → Veri Kaynakları → URL Ekle' },
              { ad: 'Google Shopping Feed', url: `/api/shop/feeds/google?shopId=${shopId}`, renk: '#EA4335', aciklama: 'Google Merchant Center → Ürünler → Feed → URL Ekle' },
            ].map(feed => (
              <div key={feed.ad} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm">{feed.ad}</h3>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-md" style={{ background: `${feed.renk}20`, color: feed.renk }}>XML</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <code className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-green-400 font-mono overflow-x-auto">
                    {`${typeof window !== 'undefined' ? window.location.origin : ''}${feed.url}`}
                  </code>
                  <button onClick={() => feedKopyala(feed.url)}
                    className="shrink-0 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    {kopyalandi === feed.url ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/40" />}
                  </button>
                </div>
                <p className="text-[10px] text-white/30">{feed.aciklama}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
