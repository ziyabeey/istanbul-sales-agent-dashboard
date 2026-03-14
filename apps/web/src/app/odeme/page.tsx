'use client'

import React, { useState } from 'react'
import { Lock, CreditCard, Truck, ShieldCheck } from 'lucide-react'

const fiyatFormat = (kurus: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(kurus / 100)

interface SepetItem { urunId: string; ad: string; gorsel: string; fiyat: number; adet: number }

export default function CheckoutPage() {
  const [adim, setAdim] = useState<'bilgi' | 'odeme'>('bilgi')
  const [form, setForm] = useState({
    ad: '', soyad: '', email: '', telefon: '',
    adres: '', ilce: '', sehir: '', postaKodu: '',
  })
  const [yukleniyor, setYukleniyor] = useState(false)
  const [iyzFormHtml, setIyzFormHtml] = useState('')

  const sepetStr = typeof window !== 'undefined' ? localStorage.getItem('sepet') : null
  const sepet: SepetItem[] = sepetStr ? JSON.parse(sepetStr) : []
  const araToplam = sepet.reduce((t, s) => t + s.fiyat * s.adet, 0)
  const kargoUcreti = araToplam >= 15000 ? 0 : 2990
  const genelToplam = araToplam + kargoUcreti

  const handleBilgiDevam = () => {
    if (!form.ad || !form.soyad || !form.email || !form.telefon || !form.adres || !form.sehir) {
      alert('Lütfen tüm zorunlu alanları doldurun')
      return
    }
    odemeBaslat()
  }

  const odemeBaslat = async () => {
    setYukleniyor(true)
    try {
      const res = await fetch('/api/checkout/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopId: 'demo-shop',
          siparisId: `SIP-${Date.now()}`,
          sepetItems: sepet.map(s => ({ id: s.urunId, ad: s.ad, kategori: 'Genel', tip: 'PHYSICAL', fiyatKurus: s.fiyat * s.adet })),
          musteriInfo: { id: `M-${Date.now()}`, ad: form.ad, soyad: form.soyad, email: form.email, telefon: form.telefon },
          teslimatAdresi: { adSoyad: `${form.ad} ${form.soyad}`, sehir: form.sehir, ulke: 'Turkey', adres: `${form.adres}, ${form.ilce}`, postaKodu: form.postaKodu || '34000' },
          toplamFiyatKurus: araToplam,
          kargoUcretiKurus: kargoUcreti,
        }),
      })
      const data = await res.json()
      if (data.ok && data.checkoutFormContent) {
        setIyzFormHtml(data.checkoutFormContent)
        setAdim('odeme')
      } else {
        alert(data.error || 'Ödeme formu oluşturulamadı')
      }
    } catch { alert('Bağlantı hatası') }
    finally { setYukleniyor(false) }
  }

  if (sepet.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center"><div className="text-5xl mb-4">🛒</div><h2 className="text-xl font-bold mb-2">Sepetiniz Boş</h2></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="bg-[#111] border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3"><Lock className="w-5 h-5 text-green-400" /><span className="font-bold text-lg">Güvenli Ödeme</span></div>
          <div className="flex items-center gap-4 text-sm">
            <div className={`flex items-center gap-2 ${adim === 'bilgi' ? 'text-green-400' : 'text-white/30'}`}>
              <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center">1</span> Bilgiler
            </div>
            <div className="w-6 h-px bg-white/10" />
            <div className={`flex items-center gap-2 ${adim === 'odeme' ? 'text-green-400' : 'text-white/30'}`}>
              <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${adim === 'odeme' ? 'bg-green-600 text-white' : 'bg-white/10 text-white/40'}`}>2</span> Ödeme
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 p-6">
        <div>
          {adim === 'bilgi' && (
            <div className="space-y-6">
              <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Truck className="w-5 h-5 text-blue-400" /> Teslimat Bilgileri</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[{ k: 'ad', l: 'Ad *', p: 'Adınız' }, { k: 'soyad', l: 'Soyad *', p: 'Soyadınız' }, { k: 'email', l: 'E-posta *', p: 'ornek@email.com' }, { k: 'telefon', l: 'Telefon *', p: '05XX XXX XX XX' }].map(f => (
                    <div key={f.k}>
                      <label className="text-xs text-white/40 font-semibold mb-1.5 block">{f.l}</label>
                      <input type="text" placeholder={f.p} value={(form as any)[f.k]} onChange={e => setForm(prev => ({ ...prev, [f.k]: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-green-500/50" />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="text-xs text-white/40 font-semibold mb-1.5 block">Adres *</label>
                    <textarea placeholder="Mahalle, sokak, bina no" value={form.adres} onChange={e => setForm(prev => ({ ...prev, adres: e.target.value }))} rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 resize-none" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 font-semibold mb-1.5 block">İlçe</label>
                    <input type="text" placeholder="İlçe" value={form.ilce} onChange={e => setForm(prev => ({ ...prev, ilce: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-green-500/50" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 font-semibold mb-1.5 block">Şehir *</label>
                    <input type="text" placeholder="Şehir" value={form.sehir} onChange={e => setForm(prev => ({ ...prev, sehir: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-green-500/50" />
                  </div>
                </div>
              </div>
              <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="sozlesme" className="mt-1 accent-green-500" />
                  <label htmlFor="sozlesme" className="text-xs text-white/50 leading-relaxed">
                    <a href="/satis-sozlesmesi" target="_blank" className="text-green-400 hover:underline">Mesafeli Satış Sözleşmesi</a>&apos;ni ve{' '}
                    <a href="/kvkk" target="_blank" className="text-green-400 hover:underline">KVKK Aydınlatma Metni</a>&apos;ni okudum, kabul ediyorum.
                  </label>
                </div>
              </div>
              <button onClick={handleBilgiDevam} disabled={yukleniyor}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-colors">
                {yukleniyor ? <><span className="animate-spin">⏳</span> Hazırlanıyor...</> : <><CreditCard className="w-5 h-5" /> Ödemeye Geç</>}
              </button>
            </div>
          )}
          {adim === 'odeme' && iyzFormHtml && (
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-green-400" /> Kart Bilgileri</h2>
              <div className="flex items-center gap-2 mb-4 bg-green-500/5 border border-green-500/10 rounded-lg px-3 py-2">
                <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-xs text-green-400">Kart bilgileriniz İyzico güvenli altyapısı üzerinden işlenir.</span>
              </div>
              <div id="iyzipay-checkout-form" className="iyzi-form" dangerouslySetInnerHTML={{ __html: iyzFormHtml }} />
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-6 self-start">
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
            <h3 className="font-bold text-sm mb-4">📦 Sipariş Özeti</h3>
            <div className="space-y-3 mb-4 max-h-[360px] overflow-y-auto">
              {sepet.map(item => (
                <div key={item.urunId} className="flex items-center gap-3">
                  {item.gorsel && <img src={item.gorsel} alt={item.ad} className="w-12 h-12 rounded-xl object-cover" />}
                  <div className="flex-1 min-w-0"><div className="text-sm font-semibold truncate">{item.ad}</div><div className="text-xs text-white/30">{item.adet} adet</div></div>
                  <div className="text-sm font-bold text-green-400">{fiyatFormat(item.fiyat * item.adet)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/[0.06] pt-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-white/40">Ara Toplam</span><span>{fiyatFormat(araToplam)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">Kargo</span><span className={kargoUcreti === 0 ? 'text-green-400' : ''}>{kargoUcreti === 0 ? 'Ücretsiz' : fiyatFormat(kargoUcreti)}</span></div>
              <div className="flex justify-between text-lg font-extrabold pt-2 border-t border-white/[0.06]"><span>Toplam</span><span className="text-green-400">{fiyatFormat(genelToplam)}</span></div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-4 text-white/20 text-xs"><span>🔒 SSL</span><span>•</span><span>💳 3D Secure</span><span>•</span><span>🛡️ İyzico</span></div>
        </div>
      </div>
    </div>
  )
}
