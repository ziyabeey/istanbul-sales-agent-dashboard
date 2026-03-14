'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingBag, Package, Truck, Megaphone, Gift, FileText, BarChart3, ArrowRight, TrendingUp, Users, CreditCard, Settings, Download, Smartphone, Zap, Shield, Tag, Heart } from 'lucide-react'

const menuItems = [
  {
    kategori: 'Mağaza',
    items: [
      { ad: 'Ürün Yönetimi', aciklama: 'Ürün ekle, düzenle, stok yönet', ikon: <ShoppingBag className="w-5 h-5" />, href: '/dashboard/magaza/urunler', renk: '#22c55e' },
      { ad: 'Siparişler', aciklama: 'Sipariş durumu, kargo takip', ikon: <Package className="w-5 h-5" />, href: '/dashboard/magaza/siparisler', renk: '#3b82f6' },
      { ad: 'Kargo Yönetimi', aciklama: 'Yurtiçi, MNG, Aras — otomatik etiket', ikon: <Truck className="w-5 h-5" />, href: '#', renk: '#f97316' },
      { ad: 'Stok İmport', aciklama: 'CSV/Excel ile toplu ürün yükle', ikon: <Download className="w-5 h-5" />, href: '/dashboard/magaza/import', renk: '#06b6d4' },
    ],
  },
  {
    kategori: 'Pazarlama',
    items: [
      { ad: 'Reklam Yönetimi', aciklama: 'Meta & Google Ads kampanyaları', ikon: <Megaphone className="w-5 h-5" />, href: '/dashboard/magaza/reklam', renk: '#f59e0b' },
      { ad: 'Kupon & Otomasyon', aciklama: 'Kuponlar, terk sepet, RFM', ikon: <Gift className="w-5 h-5" />, href: '/dashboard/magaza/pazarlama', renk: '#ec4899' },
      { ad: 'SMS Bildirimleri', aciklama: 'NetGSM entegrasyon, 12 şablon', ikon: <Smartphone className="w-5 h-5" />, href: '/dashboard/magaza/sms', renk: '#8b5cf6' },
      { ad: 'Sadakat Programı', aciklama: 'Puan sistemi, Bronze→Platinum', ikon: <Heart className="w-5 h-5" />, href: '#', renk: '#f43f5e' },
    ],
  },
  {
    kategori: 'Finans & Hukuki',
    items: [
      { ad: 'E-Fatura', aciklama: 'E-fatura ve e-arşiv yönetimi', ikon: <FileText className="w-5 h-5" />, href: '#', renk: '#8b5cf6' },
      { ad: 'Ödeme Geçmişi', aciklama: 'İyzico ödemeleri ve iadeler', ikon: <CreditCard className="w-5 h-5" />, href: '#', renk: '#06b6d4' },
      { ad: 'Fraud Koruması', aciklama: 'IP, kart, tutar bazlı kurallar', ikon: <Shield className="w-5 h-5" />, href: '#', renk: '#ef4444' },
      { ad: 'KVKK & Yasal', aciklama: 'Mesafeli satış, veri silme', ikon: <Tag className="w-5 h-5" />, href: '#', renk: '#64748b' },
    ],
  },
]

const demoMetrikler = [
  { baslik: 'Bugünün Satışı', deger: '₺12.450', degisim: '+18%', renk: '#22c55e', ikon: <TrendingUp className="w-4 h-4" /> },
  { baslik: 'Aktif Sipariş', deger: '23', degisim: '+5', renk: '#3b82f6', ikon: <Package className="w-4 h-4" /> },
  { baslik: 'Ziyaretçi', deger: '1.342', degisim: '+28%', renk: '#f59e0b', ikon: <Users className="w-4 h-4" /> },
  { baslik: 'Dönüşüm', deger: '%4.2', degisim: '+0.8%', renk: '#ec4899', ikon: <BarChart3 className="w-4 h-4" /> },
]

const sonSiparisler = [
  { no: '#5124', musteri: 'Elif A.', urunler: 'Premium Deri Ceket', tutar: '₺2.799', durum: 'Kargoda', durumRenk: '#3b82f6', tarih: '12 Mar' },
  { no: '#5123', musteri: 'Mehmet K.', urunler: 'Slim Fit Pantolon (x2)', tutar: '₺1.398', durum: 'Hazırlanıyor', durumRenk: '#f59e0b', tarih: '12 Mar' },
  { no: '#5122', musteri: 'Ayşe D.', urunler: 'Kadife Elbise + Sneaker', tutar: '₺3.198', durum: 'Teslim Edildi', durumRenk: '#22c55e', tarih: '11 Mar' },
  { no: '#5121', musteri: 'Can B.', urunler: 'Oversize Hırka', tutar: '₺1.599', durum: 'Kargoda', durumRenk: '#3b82f6', tarih: '11 Mar' },
  { no: '#5120', musteri: 'Selin T.', urunler: 'Güneş Gözlüğü + Çanta', tutar: '₺2.298', durum: 'İade Talebi', durumRenk: '#ef4444', tarih: '10 Mar' },
]

export default function MagazaDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Başlık */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">🏪 Mağaza Yönetim Paneli</h1>
            <p className="text-white/40 text-sm mt-1">E-ticaret modüllerinizi yönetin</p>
          </div>
          <Link href="/demolar/eticaret" className="flex items-center gap-2 text-sm font-bold bg-[#e11d48] px-4 py-2 rounded-xl hover:bg-[#be123c] transition-colors">
            <Zap className="w-4 h-4" /> Demo Mağazayı Gör
          </Link>
        </div>

        {/* Metrik Kartları */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {demoMetrikler.map((m, i) => (
            <div key={i} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/40">{m.baslik}</span>
                <span className="p-1.5 rounded-lg" style={{ background: `${m.renk}15`, color: m.renk }}>{m.ikon}</span>
              </div>
              <div className="text-2xl font-black">{m.deger}</div>
              <div className="text-xs font-bold mt-1" style={{ color: m.renk }}>{m.degisim}</div>
            </div>
          ))}
        </div>

        {/* Son Siparişler */}
        <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6 mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-base">📦 Son Siparişler</h2>
            <Link href="/dashboard/magaza/siparisler" className="text-xs text-white/40 hover:text-white flex items-center gap-1">
              Tümünü Gör <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/30 border-b border-white/[0.06]">
                  <th className="text-left pb-3 font-medium text-xs">Sipariş No</th>
                  <th className="text-left pb-3 font-medium text-xs">Müşteri</th>
                  <th className="text-left pb-3 font-medium text-xs">Ürünler</th>
                  <th className="text-right pb-3 font-medium text-xs">Tutar</th>
                  <th className="text-center pb-3 font-medium text-xs">Durum</th>
                  <th className="text-right pb-3 font-medium text-xs">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {sonSiparisler.map(s => (
                  <tr key={s.no} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="py-3 font-bold text-white/80">{s.no}</td>
                    <td className="py-3 text-white/60">{s.musteri}</td>
                    <td className="py-3 text-white/50 text-xs">{s.urunler}</td>
                    <td className="py-3 text-right font-bold">{s.tutar}</td>
                    <td className="py-3 text-center">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${s.durumRenk}15`, color: s.durumRenk }}>
                        {s.durum}
                      </span>
                    </td>
                    <td className="py-3 text-right text-white/30 text-xs">{s.tarih}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Haftalık Gelir Grafiği */}
        <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-base">📊 Haftalık Gelir</h2>
            <span className="text-xs text-white/30">Son 7 gün</span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {[
              { gun: 'Pzt', deger: 45 },
              { gun: 'Sal', deger: 62 },
              { gun: 'Çar', deger: 38 },
              { gun: 'Per', deger: 78 },
              { gun: 'Cum', deger: 95 },
              { gun: 'Cmt', deger: 85 },
              { gun: 'Paz', deger: 52 },
            ].map(g => (
              <div key={g.gun} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-lg transition-all" style={{ height: `${g.deger}%`, background: g.deger > 70 ? 'linear-gradient(to top, #e11d48, #f43f5e)' : 'rgba(255,255,255,0.08)' }} />
                <span className="text-[10px] text-white/30">{g.gun}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/[0.06]">
            <span className="text-sm text-white/40">Toplam Haftalık</span>
            <span className="text-lg font-black text-[#e11d48]">₺42.350</span>
          </div>
        </div>

        {/* Modül Kartları */}
        {menuItems.map(kat => (
          <div key={kat.kategori} className="mb-8">
            <h2 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-3">{kat.kategori}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kat.items.map(item => (
                <Link key={item.ad} href={item.href}
                  className="group bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/15 transition-all flex items-center gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${item.renk}15`, color: item.renk }}>
                    {item.ikon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm">{item.ad}</h3>
                    <p className="text-xs text-white/30 mt-0.5">{item.aciklama}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Hızlı Aksiyonlar */}
        <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6">
          <h3 className="text-sm font-bold mb-4">⚡ Hızlı İşlemler</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { ad: 'Ürün Ekle', emoji: '➕' },
              { ad: 'Kupon Oluştur', emoji: '🎫' },
              { ad: 'Feed Güncelle', emoji: '🔄' },
              { ad: 'Rapor İndir', emoji: '📊' },
              { ad: 'Fatura Kes', emoji: '🧾' },
              { ad: 'SMS Gönder', emoji: '📱' },
              { ad: 'Kargo Etiketi', emoji: '🏷️' },
              { ad: 'Ayarlar', emoji: '⚙️' },
            ].map(a => (
              <button key={a.ad}
                className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm font-bold hover:bg-white/[0.06] transition-colors">
                <span>{a.emoji}</span> {a.ad}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
