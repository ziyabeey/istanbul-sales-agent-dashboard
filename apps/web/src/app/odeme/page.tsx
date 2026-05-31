'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { Lock, CreditCard, ShieldCheck, CheckCircle2, Zap } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEsnaf } from '@/context/EsnafContext'
import { PAKET_FIYATLARI, type PaketTipi } from '@/types'
import Link from 'next/link'

const fiyatFormat = (fiyat: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(fiyat)

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { esnaf, loading } = useEsnaf()
  
  const queryPaket = searchParams.get('paket')?.toUpperCase() as PaketTipi | undefined
  const paket: PaketTipi = queryPaket && PAKET_FIYATLARI[queryPaket] ? queryPaket : (esnaf?.paket || 'TEMEL')
  
  const [adim, setAdim] = useState<'bilgi' | 'odeme'>('bilgi')
  const [yukleniyor, setYukleniyor] = useState(false)
  const [iyzFormHtml, setIyzFormHtml] = useState('')

  const fiyat = PAKET_FIYATLARI[paket]

  useEffect(() => {
    // Esnaf context'i yoksa yönlendirme mantığı (UI'da da gösteriyoruz)
    if (!loading && !esnaf) {
      // router.push('/kayit?redirect=/odeme?paket=' + paket)
    }
  }, [loading, esnaf, paket])

  const odemeBaslat = async () => {
    if (!esnaf) return;
    setYukleniyor(true)
    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          esnafId: esnaf.id,
          paket: paket,
          taksitSayisi: 1 // Peşin
        }),
      })
      const data = await res.json()
      if (res.ok && data.checkoutFormContent) {
        setIyzFormHtml(data.checkoutFormContent)
        setAdim('odeme')
      } else {
        alert(data.error || 'Ödeme formu oluşturulamadı')
      }
    } catch { 
      alert('Bağlantı hatası') 
    } finally { 
      setYukleniyor(false) 
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05050A] text-white flex items-center justify-center">
        <div className="animate-pulse text-white/50 font-syne">Yükleniyor...</div>
      </div>
    )
  }

  if (!esnaf) {
    return (
      <div className="min-h-screen bg-[#05050A] text-white flex items-center justify-center flex-col p-6 text-center">
        <Lock className="w-16 h-16 text-indigo-500 mb-6" />
        <h1 className="text-3xl font-syne font-bold mb-4">Giriş Yapmanız Gerekiyor</h1>
        <p className="text-white/60 mb-8 max-w-md">Ödeme işlemine devam edebilmek için sisteme kayıt olmalı veya giriş yapmalısınız.</p>
        <div className="flex gap-4">
          <Link href="/giris" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors">
            Giriş Yap
          </Link>
          <Link href={`/kayit?redirect=/odeme?paket=${paket}`} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">
            Ücretsiz Kayıt Ol
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-white selection:bg-indigo-500/30">
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none opacity-40 mix-blend-screen" />

      {/* Header */}
      <header className="border-b border-white/10 bg-white/[0.02] backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
              <span className="font-syne font-extrabold text-xl tracking-tight">
                  <span className="text-indigo-400 font-extrabold">KPNK</span>
              </span>
              <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-400/25">AI</span>
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className={`flex items-center gap-2 ${adim === 'bilgi' ? 'text-indigo-400' : 'text-white/40'}`}>
              <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${adim === 'bilgi' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/50'}`}>1</span> Onay
            </div>
            <div className="w-6 h-px bg-white/20" />
            <div className={`flex items-center gap-2 ${adim === 'odeme' ? 'text-indigo-400' : 'text-white/40'}`}>
              <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${adim === 'odeme' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/50'}`}>2</span> Ödeme
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 p-6 lg:p-12 relative z-10">
        {/* Sol Sütun - İçerik */}
        <div>
          {adim === 'bilgi' && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-syne font-bold mb-6 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-indigo-400" />
                  Paketinizi Onaylayın
                </h2>
                
                <div className="space-y-4 text-white/80">
                  <p className="text-sm">
                    <strong>{esnaf.ad} {esnaf.soyad || ''}</strong>, {paket} paketi için abonelik işlemini başlatıyorsunuz. 
                  </p>
                  <p className="text-sm">
                    Bu paket ile KPNK AI sisteminin tüm özelliklerine 1 yıl boyunca kesintisiz erişim sağlayacaksınız. Kendi özel alan adınızı (domain) anında bağlayabilirsiniz.
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="sozlesme" defaultChecked className="mt-1 accent-indigo-500 w-4 h-4 cursor-pointer" />
                    <label htmlFor="sozlesme" className="text-sm text-white/60 leading-relaxed cursor-pointer select-none">
                      <a href="/satis-sozlesmesi" target="_blank" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">Mesafeli Satış Sözleşmesi</a>&apos;ni ve{' '}
                      <a href="/kvkk" target="_blank" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">KVKK Aydınlatma Metni</a>&apos;ni okudum, kabul ediyorum.
                    </label>
                  </div>
                </div>

                <button 
                  onClick={odemeBaslat} 
                  disabled={yukleniyor}
                  className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
                >
                  {yukleniyor ? (
                    <><span className="animate-spin">⏳</span> Hazırlanıyor...</>
                  ) : (
                    <><CreditCard className="w-5 h-5" /> Güvenli Ödemeye Geç</>
                  )}
                </button>
              </div>
            </div>
          )}

          {adim === 'odeme' && iyzFormHtml && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-syne font-bold mb-6 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-indigo-400" />
                Kart Bilgileri
              </h2>
              <div className="flex items-center gap-3 mb-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                <span className="text-sm text-indigo-200 leading-relaxed">
                  Ödemeniz <strong>Iyzico</strong> PCI-DSS sertifikalı altyapısı üzerinden uçtan uca şifrelenerek gerçekleşmektedir.
                </span>
              </div>
              <div id="iyzipay-checkout-form" className="iyzi-form [&>iframe]:rounded-xl" dangerouslySetInnerHTML={{ __html: iyzFormHtml }} />
            </div>
          )}
        </div>

        {/* Sağ Sütun - Özet */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <h3 className="font-syne font-bold text-lg mb-6 flex items-center gap-2">
               Sipariş Özeti
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-lg text-white mb-1">kepenk.ai {paket}</div>
                  <div className="text-sm text-white/50">Yıllık Abonelik</div>
                </div>
                <div className="font-bold text-indigo-400">{fiyatFormat(fiyat)}</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
               <div className="flex items-center gap-2 text-sm text-white/70">
                 <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                 <span>1 Yıllık Kesintisiz Erişim</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-white/70">
                 <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                 <span>Yapay Zeka Destekli Site Modülü</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-white/70">
                 <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                 <span>Sınırsız Hosting & Trafik</span>
               </div>
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="flex justify-between items-end">
                <span className="text-white/60 font-medium">Genel Toplam</span>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-white">{fiyatFormat(fiyat)}</div>
                  <div className="text-xs text-white/40 mt-1">KDV Dahildir</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 text-white/30 text-xs font-medium">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> 256-bit SSL</span>
            <span>•</span>
            <span>3D Secure</span>
            <span>•</span>
            <span>Iyzico Güvencesi</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#05050A] text-white flex items-center justify-center">
        <div className="animate-pulse text-white/50 font-syne">Hazırlanıyor...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
