'use client'

import React, { useState, useEffect } from 'react'
import { Package, Truck, CheckCircle2, Clock, XCircle, Eye, RefreshCw, Send, ChevronDown, AlertTriangle } from 'lucide-react'

type SiparisDurum = 'beklemede' | 'odeme_onaylandi' | 'hazirlaniyor' | 'kargoda' | 'teslim_edildi' | 'iptal' | 'iade'

interface SiparisItem { ad: string; adet: number; birimFiyat: number }
interface Siparis {
  id: string; siparisNo: string; musteriAdi: string; musteriTelefon: string
  items: SiparisItem[]; genelToplam: number; durum: SiparisDurum
  kargoNo?: string; kargoFirma?: string; olusturma: string
}

const DURUM_CONFIG: Record<SiparisDurum, { renk: string; bg: string; ikon: React.ReactNode; etiket: string }> = {
  beklemede: { renk: '#f59e0b', bg: 'rgba(245,158,11,0.1)', ikon: <Clock className="w-3.5 h-3.5" />, etiket: 'Beklemede' },
  odeme_onaylandi: { renk: '#3b82f6', bg: 'rgba(59,130,246,0.1)', ikon: <CheckCircle2 className="w-3.5 h-3.5" />, etiket: 'Ödeme Onaylı' },
  hazirlaniyor: { renk: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', ikon: <Package className="w-3.5 h-3.5" />, etiket: 'Hazırlanıyor' },
  kargoda: { renk: '#06b6d4', bg: 'rgba(6,182,212,0.1)', ikon: <Truck className="w-3.5 h-3.5" />, etiket: 'Kargoda' },
  teslim_edildi: { renk: '#22c55e', bg: 'rgba(34,197,94,0.1)', ikon: <CheckCircle2 className="w-3.5 h-3.5" />, etiket: 'Teslim Edildi' },
  iptal: { renk: '#ef4444', bg: 'rgba(239,68,68,0.1)', ikon: <XCircle className="w-3.5 h-3.5" />, etiket: 'İptal' },
  iade: { renk: '#f97316', bg: 'rgba(249,115,22,0.1)', ikon: <RefreshCw className="w-3.5 h-3.5" />, etiket: 'İade' },
}

const KARGO_FIRMALARI = [
  { id: 'yurtici', ad: 'Yurtiçi Kargo', logo: '📦' },
  { id: 'mng', ad: 'MNG Kargo', logo: '🚛' },
  { id: 'aras', ad: 'Aras Kargo', logo: '📮' },
  { id: 'sendeo', ad: 'Sendeo', logo: '🚀' },
]

const fiyatFormat = (kurus: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(kurus / 100)

export default function SiparislerPage() {
  const [siparisler, setSiparisler] = useState<Siparis[]>([])
  const [durumFiltre, setDurumFiltre] = useState<string>('hepsi')
  const [kargoModal, setKargoModal] = useState<string | null>(null)
  const [seciliKargo, setSeciliKargo] = useState('yurtici')

  useEffect(() => {
    setSiparisler([
      { id: '1', siparisNo: 'SIP-20260311-A1B2', musteriAdi: 'Ahmet Yılmaz', musteriTelefon: '05321234567',
        items: [{ ad: 'Organik Zeytinyağı', adet: 2, birimFiyat: 34990 }, { ad: 'Doğal Bal', adet: 1, birimFiyat: 24990 }],
        genelToplam: 94970, durum: 'odeme_onaylandi', olusturma: '2026-03-11T08:00:00Z' },
      { id: '2', siparisNo: 'SIP-20260310-C3D4', musteriAdi: 'Fatma Demir', musteriTelefon: '05559876543',
        items: [{ ad: 'El Yapımı Sabun Seti', adet: 3, birimFiyat: 14990 }],
        genelToplam: 44970, durum: 'kargoda', kargoNo: 'YK7891234567', kargoFirma: 'yurtici', olusturma: '2026-03-10T14:30:00Z' },
      { id: '3', siparisNo: 'SIP-20260309-E5F6', musteriAdi: 'Mehmet Kaya', musteriTelefon: '05441112233',
        items: [{ ad: 'Seramik Çay Seti', adet: 1, birimFiyat: 59990 }],
        genelToplam: 59990, durum: 'teslim_edildi', kargoNo: 'MNG4561237890', kargoFirma: 'mng', olusturma: '2026-03-09T10:15:00Z' },
      { id: '4', siparisNo: 'SIP-20260311-G7H8', musteriAdi: 'Ayşe Çelik', musteriTelefon: '05387654321',
        items: [{ ad: 'Karadeniz Tereyağı', adet: 2, birimFiyat: 17990 }],
        genelToplam: 35980, durum: 'beklemede', olusturma: '2026-03-11T07:45:00Z' },
    ])
  }, [])

  const filtrelenmis = siparisler.filter(s => durumFiltre === 'hepsi' || s.durum === durumFiltre)
  const durumSayilari = siparisler.reduce((acc, s) => { acc[s.durum] = (acc[s.durum] || 0) + 1; return acc }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Başlık */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black">📋 Sipariş Yönetimi</h1>
            <p className="text-white/40 text-sm mt-1">Siparişleri ve kargo durumlarını yönetin</p>
          </div>
          <div className="text-sm text-white/30">Toplam: {siparisler.length} sipariş</div>
        </div>

        {/* Durum Metrik Kartları */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
          {(Object.entries(DURUM_CONFIG) as [SiparisDurum, typeof DURUM_CONFIG[SiparisDurum]][]).map(([d, cfg]) => (
            <button key={d} onClick={() => setDurumFiltre(durumFiltre === d ? 'hepsi' : d)}
              className={`rounded-xl p-3 border text-left transition-all ${durumFiltre === d ? 'border-white/20 bg-white/5' : 'border-white/[0.04] bg-[#111] hover:bg-white/[0.03]'}`}>
              <div className="flex items-center gap-1.5 mb-1" style={{ color: cfg.renk }}>{cfg.ikon}<span className="text-[10px] font-bold uppercase">{cfg.etiket}</span></div>
              <div className="text-xl font-black">{durumSayilari[d] || 0}</div>
            </button>
          ))}
        </div>

        {/* Sipariş Listesi */}
        <div className="space-y-3">
          {filtrelenmis.map(siparis => {
            const cfg = DURUM_CONFIG[siparis.durum]
            return (
              <div key={siparis.id} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white/60">{siparis.siparisNo}</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-md"
                      style={{ background: cfg.bg, color: cfg.renk }}>{cfg.ikon} {cfg.etiket}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(siparis.durum === 'odeme_onaylandi' || siparis.durum === 'hazirlaniyor') && (
                      <button onClick={() => setKargoModal(siparis.id)}
                        className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                        <Truck className="w-3.5 h-3.5" /> Kargoya Ver
                      </button>
                    )}
                    {siparis.kargoNo && (
                      <span className="flex items-center gap-1 text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg font-mono">
                        <Truck className="w-3 h-3" /> {siparis.kargoNo}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold">{siparis.musteriAdi}</div>
                    <div className="text-xs text-white/30 mt-0.5">
                      {siparis.items.map(i => `${i.adet}x ${i.ad}`).join(', ')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-green-400">{fiyatFormat(siparis.genelToplam)}</div>
                    <div className="text-[10px] text-white/20">{new Date(siparis.olusturma).toLocaleDateString('tr-TR')}</div>
                  </div>
                </div>

                {/* Kargo Modal */}
                {kargoModal === siparis.id && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <h4 className="text-sm font-bold mb-3 flex items-center gap-2"><Send className="w-4 h-4 text-cyan-400" /> Kargo Firması Seçin</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {KARGO_FIRMALARI.map(firma => (
                        <button key={firma.id} onClick={() => setSeciliKargo(firma.id)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            seciliKargo === firma.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                          }`}>
                          <div className="text-xl mb-1">{firma.logo}</div>
                          <div className="text-xs font-bold">{firma.ad}</div>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        <Truck className="w-4 h-4" /> Gönder — {KARGO_FIRMALARI.find(f => f.id === seciliKargo)?.ad}
                      </button>
                      <button onClick={() => setKargoModal(null)} className="text-xs text-white/30 hover:text-white/60 px-3 py-2">İptal</button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filtrelenmis.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-white/15 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white/40">Sipariş bulunamadı</h3>
          </div>
        )}
      </div>
    </div>
  )
}
