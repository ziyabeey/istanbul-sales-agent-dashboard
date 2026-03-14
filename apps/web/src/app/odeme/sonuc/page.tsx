'use client'

import React, { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, ArrowLeft, ShoppingBag } from 'lucide-react'

export default function OdemeSonucPage() {
  const [durum, setDurum] = useState<'basarili' | 'hata' | null>(null)
  const [mesaj, setMesaj] = useState('')
  const [siparisId, setSiparisId] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setDurum(params.get('durum') as any || 'hata')
    setMesaj(params.get('mesaj') || '')
    setSiparisId(params.get('siparis') || '')

    // Başarılı ödemede sepeti temizle
    if (params.get('durum') === 'basarili') {
      localStorage.removeItem('sepet')
    }
  }, [])

  if (!durum) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/40">Yükleniyor...</div>
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {durum === 'basarili' ? (
          <>
            <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-2xl font-black mb-2">Ödeme Başarılı! 🎉</h1>
            <p className="text-white/50 mb-2">Siparişiniz alındı ve işleme konuldu.</p>
            {siparisId && (
              <p className="text-sm text-white/30 mb-6">Sipariş No: <span className="font-bold text-white/60">{siparisId}</span></p>
            )}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 mb-6 text-left">
              <h3 className="font-bold text-sm mb-3">Sonraki Adımlar</h3>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2"><span className="text-green-400">✓</span> Sipariş onay e-postası gönderildi</li>
                <li className="flex items-start gap-2"><span className="text-blue-400">→</span> Siparişiniz hazırlanıyor</li>
                <li className="flex items-start gap-2"><span className="text-white/30">○</span> Kargoya verildiğinde bilgilendirileceksiniz</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-2xl font-black mb-2">Ödeme Başarısız</h1>
            <p className="text-white/50 mb-6">{mesaj || 'Ödeme işlemi sırasında bir hata oluştu.'}</p>
          </>
        )}

        <div className="flex flex-col gap-3">
          <a href="/" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </a>
          {durum === 'hata' && (
            <a href="/odeme" className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-sm transition-colors">
              <ShoppingBag className="w-4 h-4" /> Tekrar Dene
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
