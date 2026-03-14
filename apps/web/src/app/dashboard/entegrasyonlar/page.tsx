'use client'

import React from 'react'
import { CheckCircle2, Circle, Settings } from 'lucide-react'

const entegrasyonlar = [
  { kategori: '💳 Ödeme', items: [
    { ad: 'İyzico', aciklama: '3D Secure ödeme', bagli: true, durum: 'Canlı' },
  ]},
  { kategori: '🚚 Kargo', items: [
    { ad: 'Yurtiçi Kargo', aciklama: 'Kargo + takip', bagli: false, durum: '' },
    { ad: 'MNG Kargo', aciklama: 'Kargo + takip', bagli: false, durum: '' },
    { ad: 'Aras Kargo', aciklama: 'Kargo + takip', bagli: false, durum: '' },
    { ad: 'Sendeo', aciklama: 'Kargo + takip', bagli: true, durum: 'Sandbox' },
  ]},
  { kategori: '📱 SMS', items: [
    { ad: 'NetGSM', aciklama: 'SMS + IYS', bagli: true, durum: 'Bakiye: 3.420' },
  ]},
  { kategori: '📊 Reklam', items: [
    { ad: 'Meta Ads', aciklama: 'Pixel + CAPI', bagli: true, durum: 'Aktif' },
    { ad: 'Google Ads', aciklama: 'Shopping + PMax', bagli: true, durum: 'Aktif' },
  ]},
  { kategori: '🧾 Muhasebe', items: [
    { ad: 'Paraşüt', aciklama: 'E-fatura', bagli: false, durum: '' },
    { ad: 'Logo', aciklama: 'ERP', bagli: false, durum: '' },
  ]},
  { kategori: '🛒 Pazar Yeri', items: [
    { ad: 'Trendyol', aciklama: 'Ürün sync + sipariş', bagli: false, durum: '' },
    { ad: 'Hepsiburada', aciklama: 'Ürün sync + sipariş', bagli: false, durum: '' },
  ]},
  { kategori: '🔗 Webhook', items: [
    { ad: 'Özel API Webhook', aciklama: 'Özel REST Webhook', bagli: false, durum: '' },
  ]},
]

export default function EntegrasyonlarPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black">🔌 Entegrasyon Hub</h1>
          <p className="text-white/40 text-sm mt-1">Tüm entegrasyonlarınız tek panelde</p>
        </div>
        <div className="space-y-6">
          {entegrasyonlar.map(kat => (
            <div key={kat.kategori}>
              <h2 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-3">{kat.kategori}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {kat.items.map(item => (
                  <div key={item.ad} className="bg-[#111] border border-white/[0.06] rounded-xl p-4 flex items-center gap-3">
                    {item.bagli ? <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> : <Circle className="w-5 h-5 text-white/10 shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold">{item.ad}</div>
                      <div className="text-[10px] text-white/25">{item.aciklama}</div>
                    </div>
                    {item.bagli ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded font-bold">{item.durum}</span>
                        <Settings className="w-3.5 h-3.5 text-white/20" />
                      </div>
                    ) : (
                      <button className="text-[10px] bg-white/5 hover:bg-white/10 text-white/40 px-3 py-1 rounded font-bold transition-colors">Bağla</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
