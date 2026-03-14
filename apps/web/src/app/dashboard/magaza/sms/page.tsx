'use client'

import React, { useState } from 'react'
import { MessageSquare, Send, Clock, CheckCircle2, XCircle, Settings, BarChart3, Zap, Bell, Gift, ShoppingCart, Package, AlertTriangle } from 'lucide-react'

type Tab = 'genel' | 'sablonlar' | 'otomasyonlar'

const demoStats = { toplam: 1847, basarili: 1792, basarisiz: 55, bakiye: 3420 }

const sablonlar = [
  { id: 'ORDER_CONFIRMED', ad: 'Sipariş Onayı', kategori: 'siparis', ikon: <Package className="w-4 h-4" />, renk: '#22c55e' },
  { id: 'ORDER_SHIPPED', ad: 'Kargoya Verildi', kategori: 'siparis', ikon: <Package className="w-4 h-4" />, renk: '#3b82f6' },
  { id: 'ORDER_DELIVERED', ad: 'Teslim Edildi', kategori: 'siparis', ikon: <CheckCircle2 className="w-4 h-4" />, renk: '#22c55e' },
  { id: 'ORDER_CANCELLED', ad: 'Sipariş İptali', kategori: 'siparis', ikon: <XCircle className="w-4 h-4" />, renk: '#ef4444' },
  { id: 'REFUND_PROCESSED', ad: 'İade İşlendi', kategori: 'siparis', ikon: <AlertTriangle className="w-4 h-4" />, renk: '#f59e0b' },
  { id: 'ABANDONED_CART_1H', ad: 'Terk Sepet (1h)', kategori: 'pazarlama', ikon: <ShoppingCart className="w-4 h-4" />, renk: '#ec4899' },
  { id: 'ABANDONED_CART_24H', ad: 'Terk Sepet (24h)', kategori: 'pazarlama', ikon: <ShoppingCart className="w-4 h-4" />, renk: '#ec4899' },
  { id: 'BACK_IN_STOCK', ad: 'Stoka Dönüş', kategori: 'pazarlama', ikon: <Bell className="w-4 h-4" />, renk: '#8b5cf6' },
  { id: 'PRICE_DROP', ad: 'Fiyat Düşüşü', kategori: 'pazarlama', ikon: <Zap className="w-4 h-4" />, renk: '#06b6d4' },
  { id: 'BIRTHDAY_COUPON', ad: 'Doğum Günü', kategori: 'pazarlama', ikon: <Gift className="w-4 h-4" />, renk: '#f59e0b' },
  { id: 'WIN_BACK', ad: 'Geri Kazan', kategori: 'pazarlama', ikon: <MessageSquare className="w-4 h-4" />, renk: '#ef4444' },
  { id: 'LOW_STOCK_ALERT', ad: 'Düşük Stok', kategori: 'bildirim', ikon: <AlertTriangle className="w-4 h-4" />, renk: '#f97316' },
]

const otomasyonlar = [
  { id: 'siparis_onay', ad: 'Sipariş Onay SMS\'i', aciklama: 'Yeni sipariş geldiğinde otomatik SMS', aktif: true },
  { id: 'kargo_bilgi', ad: 'Kargo Bilgilendirme', aciklama: 'Kargoya verildiğinde SMS', aktif: true },
  { id: 'teslim_yorum', ad: 'Teslim + Yorum İsteği', aciklama: 'Teslim sonrası yorum linki', aktif: false },
  { id: 'terk_sepet_1h', ad: 'Terk Sepet (1 Saat)', aciklama: '1 saat sonra hatırlatma SMS', aktif: true },
  { id: 'terk_sepet_24h', ad: 'Terk Sepet (24 Saat)', aciklama: '24 saat sonra kuponlu SMS', aktif: false },
  { id: 'dogum_gunu', ad: 'Doğum Günü Kuponu', aciklama: 'Doğum gününden 1 gün önce', aktif: false },
  { id: 'geri_kazan', ad: 'Geri Kazanım', aciklama: '90 gün sipariş yoksa SMS', aktif: false },
  { id: 'dusuk_stok', ad: 'Düşük Stok Uyarısı', aciklama: 'Stok kritik seviyede uyarısı', aktif: true },
]

export default function SMSDashboardPage() {
  const [tab, setTab] = useState<Tab>('genel')
  const [autoStates, setAutoStates] = useState<Record<string, boolean>>(
    Object.fromEntries(otomasyonlar.map(o => [o.id, o.aktif]))
  )

  const toggleAuto = (id: string) => setAutoStates(s => ({ ...s, [id]: !s[id] }))

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black flex items-center gap-2">📱 SMS Yönetimi</h1>
          <p className="text-white/40 text-sm mt-1">NetGSM entegrasyonu · IYS uyumlu</p>
        </div>

        {/* Metrik Kartları */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { ad: 'Bakiye', deger: `${demoStats.bakiye.toLocaleString()} SMS`, renk: '#3b82f6', ikon: <MessageSquare className="w-4 h-4" /> },
            { ad: 'Gönderilen', deger: demoStats.toplam.toLocaleString(), renk: '#22c55e', ikon: <Send className="w-4 h-4" /> },
            { ad: 'Başarılı', deger: `%${((demoStats.basarili / demoStats.toplam) * 100).toFixed(1)}`, renk: '#22c55e', ikon: <CheckCircle2 className="w-4 h-4" /> },
            { ad: 'Başarısız', deger: demoStats.basarisiz.toString(), renk: '#ef4444', ikon: <XCircle className="w-4 h-4" /> },
          ].map(m => (
            <div key={m.ad} className="bg-[#111] border border-white/[0.06] rounded-2xl p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="p-1 rounded" style={{ background: `${m.renk}15`, color: m.renk }}>{m.ikon}</span>
                <span className="text-[10px] text-white/30 uppercase font-bold">{m.ad}</span>
              </div>
              <div className="text-xl font-black">{m.deger}</div>
            </div>
          ))}
        </div>

        {/* Tab Seçimi */}
        <div className="flex gap-1 bg-[#111] p-1 rounded-xl mb-6 w-fit">
          {[
            { id: 'genel' as Tab, ad: 'Genel Bakış', ikon: <BarChart3 className="w-3.5 h-3.5" /> },
            { id: 'sablonlar' as Tab, ad: 'Şablonlar', ikon: <MessageSquare className="w-3.5 h-3.5" /> },
            { id: 'otomasyonlar' as Tab, ad: 'Otomasyonlar', ikon: <Settings className="w-3.5 h-3.5" /> },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${tab === t.id ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}>
              {t.ikon} {t.ad}
            </button>
          ))}
        </div>

        {/* Genel Bakış */}
        {tab === 'genel' && (
          <div className="space-y-4">
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="text-sm font-bold mb-4">Son 7 Gün SMS Dağılımı</h3>
              <div className="flex items-end gap-2 h-32">
                {[45, 62, 38, 71, 55, 89, 67].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-green-500/30 rounded-t" style={{ height: `${(v / 89) * 100}%` }}>
                      <div className="w-full bg-green-500 rounded-t" style={{ height: `${(v * 0.97)}%` }} />
                    </div>
                    <span className="text-[9px] text-white/20">{['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="text-sm font-bold mb-3">NetGSM Bağlantı Durumu</h3>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-400 font-bold">Bağlı</span>
                <span className="text-xs text-white/20">Gönderici: KEPENK</span>
              </div>
              {demoStats.bakiye < 500 && (
                <div className="mt-3 bg-yellow-500/10 text-yellow-400 text-xs p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Bakiye azalıyor! SMS paketinizi yenileyin.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Şablonlar */}
        {tab === 'sablonlar' && (
          <div className="space-y-3">
            {['siparis', 'pazarlama', 'bildirim'].map(kat => (
              <div key={kat}>
                <h3 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-2">
                  {kat === 'siparis' ? '📦 Sipariş Bildirimleri' : kat === 'pazarlama' ? '🎯 Pazarlama (IYS Gerekli)' : '🔔 Sistem Bildirimleri'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sablonlar.filter(s => s.kategori === kat).map(s => (
                    <div key={s.id} className="bg-[#111] border border-white/[0.06] rounded-xl p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.renk}15`, color: s.renk }}>
                        {s.ikon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold">{s.ad}</div>
                        <div className="text-[10px] text-white/20 font-mono">{s.id}</div>
                      </div>
                      {kat === 'pazarlama' && (
                        <span className="text-[9px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded font-bold">IYS</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Otomasyonlar */}
        {tab === 'otomasyonlar' && (
          <div className="space-y-2">
            {otomasyonlar.map(o => (
              <div key={o.id} className="bg-[#111] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-sm font-bold">{o.ad}</div>
                  <div className="text-xs text-white/30">{o.aciklama}</div>
                </div>
                <button onClick={() => toggleAuto(o.id)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${autoStates[o.id] ? 'bg-green-600' : 'bg-white/10'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${autoStates[o.id] ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
