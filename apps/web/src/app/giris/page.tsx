'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

declare global { interface Window { google?: any } }

export default function GirisPage() {
  const [telefon, setTelefon] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)
  const [googleYukleniyor, setGoogleYukleniyor] = useState(false)
  const [hata, setHata] = useState('')
  const [adim, setAdim] = useState<'telefon' | 'kod'>('telefon')
  const [dogrulamaKodu, setDogrulamaKodu] = useState('')
  const router = useRouter()

  // Google Identity Services yükle
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId) return

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      if (!window.google) return
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCallback,
        use_fedcm_for_prompt: false,
      })
      const el = document.getElementById('google-signin-btn')
      if (el) {
        window.google.accounts.id.renderButton(el, {
          theme: 'filled_black',
          size: 'large',
          width: 340,
          text: 'signin_with',
          locale: 'tr',
        })
      }
    }
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleGoogleCallback(response: { credential: string }) {
    setGoogleYukleniyor(true)
    setHata('')
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      })
      const data = await res.json()
      if (!res.ok) {
        setHata(data.error || 'Google ile giriş başarısız')
        return
      }
      if (data.needsOnboarding) {
        const params = new URLSearchParams({
          googleEmail: data.googleEmail || '',
          googleName: data.googleName || '',
        })
        router.push(`/onboarding?${params.toString()}`)
        return
      }
      // Cookie otomatik set ediliyor (HttpOnly — API response header)
      if (data.durum === 'onboarding') {
        router.push(`/odeme?esnafId=${data.esnafId}`)
      } else {
        router.push('/dashboard')
      }
    } finally {
      setGoogleYukleniyor(false)
    }
  }

  async function handleTelefonGonder() {
    if (!telefon || telefon.replace(/[^0-9]/g, '').length < 10) {
      setHata('Geçerli bir telefon numarası girin')
      return
    }
    setYukleniyor(true)
    setHata('')

    const res = await fetch('/api/auth/giris-kodu-gonder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefon: telefon.replace(/[^0-9]/g, '') }),
    })
    const data = await res.json()

    if (!res.ok) {
      setHata(data.error || 'Kayıtlı telefon bulunamadı')
      setYukleniyor(false)
      return
    }

    setAdim('kod')
    setYukleniyor(false)
  }

  async function handleKodDogrula() {
    if (dogrulamaKodu.length !== 6) {
      setHata('6 haneli kodu girin')
      return
    }
    setYukleniyor(true)
    setHata('')

    const res = await fetch('/api/auth/giris-kodu-dogrula', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telefon: telefon.replace(/[^0-9]/g, ''),
        kod: dogrulamaKodu,
      }),
    })
    const data = await res.json()

    if (!res.ok) {
      setHata(data.error || 'Kod hatalı')
      setYukleniyor(false)
      return
    }

    // Cookie otomatik set ediliyor (HttpOnly — API response header)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-foreground font-syne font-extrabold text-3xl">
            kepenk<span className="text-rust">.ai</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2">Paneline giriş yap</p>
        </div>

        <div className="bg-card rounded-2xl p-6 space-y-4">
          {/* Google Sign-In */}
          {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
            <>
              <div className="flex flex-col items-center gap-2">
                {googleYukleniyor ? (
                  <div className="w-full h-11 bg-warm/50 rounded-xl animate-pulse" />
                ) : (
                  <div id="google-signin-btn" className="w-full flex justify-center" />
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-warm/40" />
                <span className="text-muted-foreground text-xs">veya telefon ile</span>
                <div className="flex-1 h-px bg-warm/40" />
              </div>
            </>
          )}

          {adim === 'telefon' ? (
            <>
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Kayıtlı Telefon
                </label>
                <input
                  type="tel"
                  value={telefon}
                  onChange={e => setTelefon(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className="w-full mt-1.5 bg-warm text-foreground rounded-xl px-4 py-3
                             border border-border focus:border-rust outline-none text-lg
                             font-syne tracking-wider"
                  onKeyDown={e => e.key === 'Enter' && handleTelefonGonder()}
                />
              </div>
              {hata && <p className="text-red-400 text-sm">{hata}</p>}
              <button
                onClick={handleTelefonGonder}
                disabled={yukleniyor}
                className="w-full bg-rust text-foreground font-syne font-bold py-3.5
                           rounded-xl disabled:opacity-50 text-base"
              >
                {yukleniyor ? 'Gönderiliyor...' : 'SMS Kodu Gönder →'}
              </button>
            </>
          ) : (
            <>
              <p className="text-muted-foreground text-sm">
                <span className="text-foreground">{telefon}</span> numarasına SMS ile
                6 haneli kod gönderdik.
              </p>
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Doğrulama Kodu
                </label>
                <input
                  type="number"
                  value={dogrulamaKodu}
                  onChange={e => setDogrulamaKodu(e.target.value.slice(0, 6))}
                  placeholder="000000"
                  className="w-full mt-1.5 bg-warm text-foreground rounded-xl px-4 py-3
                             border border-border focus:border-rust outline-none text-2xl
                             font-syne tracking-[0.5rem] text-center"
                  onKeyDown={e => e.key === 'Enter' && handleKodDogrula()}
                />
              </div>
              {hata && <p className="text-red-400 text-sm">{hata}</p>}
              <button
                onClick={handleKodDogrula}
                disabled={yukleniyor}
                className="w-full bg-rust text-foreground font-syne font-bold py-3.5
                           rounded-xl disabled:opacity-50"
              >
                {yukleniyor ? 'Doğrulanıyor...' : 'Giriş Yap →'}
              </button>
              <button
                onClick={() => { setAdim('telefon'); setHata('') }}
                className="w-full text-muted-foreground text-sm py-2"
              >
                ← Telefon numarasını değiştir
              </button>
            </>
          )}
        </div>

        <p className="text-muted-foreground text-xs text-center">
          Henüz hesabın yok mu?{' '}
          <a href="/onboarding" className="text-rust">Hemen başla →</a>
        </p>
      </div>
    </div>
  )
}
