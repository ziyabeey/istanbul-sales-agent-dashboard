'use client'

import { useEffect, useState, type FormEvent } from 'react'

const CORE_CSRF_COOKIE = 'kepenk_core_csrf'
const CORE_CSRF_HEADER = 'x-kepenk-csrf'
const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_LENGTH = 256

function readBrowserCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const prefix = `${name}=`
  for (const item of document.cookie.split(';')) {
    const value = item.trim()
    if (value.startsWith(prefix)) return value.slice(prefix.length) || null
  }
  return null
}

function updateError(status: number, serverError?: string): string {
  if (status === 401 || status === 403) {
    return 'Kurtarma oturumun geçersiz veya süresi dolmuş. E-postadaki kurtarma bağlantısını aynı tarayıcıda yeniden aç.'
  }
  return serverError || 'Parola güncellenemedi. Lütfen tekrar dene.'
}

export default function ParolaYenilePage() {
  const [parola, setParola] = useState('')
  const [parolaTekrar, setParolaTekrar] = useState('')
  const [hata, setHata] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)
  const [basarili, setBasarili] = useState(false)
  const [gecersizBaglanti, setGecersizBaglanti] = useState(false)

  useEffect(() => {
    const durum = new URLSearchParams(window.location.search).get('durum')
    setGecersizBaglanti(durum === 'invalid')
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setHata('')

    if (parola.length < MIN_PASSWORD_LENGTH || parola.length > MAX_PASSWORD_LENGTH) {
      setHata(`Parola ${MIN_PASSWORD_LENGTH}–${MAX_PASSWORD_LENGTH} karakter arasında olmalı.`)
      return
    }
    if (parola !== parolaTekrar) {
      setHata('Parolalar eşleşmiyor.')
      return
    }

    const csrf = readBrowserCookie(CORE_CSRF_COOKIE)
    if (!csrf) {
      setHata('Kurtarma oturumu bulunamadı. E-postadaki kurtarma bağlantısını aynı tarayıcıda yeniden aç.')
      return
    }

    setYukleniyor(true)
    try {
      const response = await fetch('/api/core/auth/parola-guncelle', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          [CORE_CSRF_HEADER]: csrf,
        },
        body: JSON.stringify({ parola }),
      })
      const body = await response.json().catch(() => ({} as { error?: string })) as { error?: string }
      if (!response.ok) {
        setHata(updateError(response.status, body.error))
        return
      }

      setParola('')
      setParolaTekrar('')
      setBasarili(true)
    } catch {
      setHata('Bağlantı kurulamadı. İnternet bağlantını kontrol edip tekrar dene.')
    } finally {
      setYukleniyor(false)
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="font-syne font-extrabold text-3xl tracking-tight flex items-center justify-center gap-2">
            <span className="text-primary">KPNK</span>
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold bg-primary/15 text-primary border border-primary/25">AI</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2">Yeni parolanı güvenle belirle</p>
        </div>

        <section className="bg-card rounded-2xl p-6 space-y-5" aria-labelledby="password-reset-title">
          <div>
            <h2 id="password-reset-title" className="font-syne font-bold text-xl text-foreground">Parola yenile</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Bu ekran yalnız e-postadaki kurtarma bağlantısıyla açılan tek kullanımlık oturum için çalışır.
            </p>
          </div>

          {gecersizBaglanti ? (
            <div className="space-y-4" role="alert">
              <p className="text-red-600 text-sm">
                Bu kurtarma bağlantısı geçersiz, kullanılmış veya süresi dolmuş.
              </p>
              <a href="/giris" className="inline-flex w-full justify-center rounded-xl bg-primary px-4 py-3 font-syne font-bold text-white">
                Giriş ekranına dön →
              </a>
            </div>
          ) : basarili ? (
            <div className="space-y-4" aria-live="polite">
              <p className="text-sm text-foreground">Parolan güncellendi. Kurtarma oturumu kapatıldı.</p>
              <a href="/giris" className="inline-flex w-full justify-center rounded-xl bg-primary px-4 py-3 font-syne font-bold text-white">
                Giriş yap →
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="yeni-parola" className="text-muted-foreground text-xs uppercase tracking-wider">
                  Yeni parola
                </label>
                <input
                  id="yeni-parola"
                  type="password"
                  autoComplete="new-password"
                  value={parola}
                  onChange={(event) => setParola(event.target.value)}
                  minLength={MIN_PASSWORD_LENGTH}
                  maxLength={MAX_PASSWORD_LENGTH}
                  required
                  className="w-full mt-1.5 bg-gray-50 text-foreground rounded-xl px-4 py-3 border border-border focus:border-primary outline-none"
                />
                <p className="text-muted-foreground text-xs mt-1.5">En az 8 karakter.</p>
              </div>

              <div>
                <label htmlFor="yeni-parola-tekrar" className="text-muted-foreground text-xs uppercase tracking-wider">
                  Yeni parola tekrar
                </label>
                <input
                  id="yeni-parola-tekrar"
                  type="password"
                  autoComplete="new-password"
                  value={parolaTekrar}
                  onChange={(event) => setParolaTekrar(event.target.value)}
                  minLength={MIN_PASSWORD_LENGTH}
                  maxLength={MAX_PASSWORD_LENGTH}
                  required
                  className="w-full mt-1.5 bg-gray-50 text-foreground rounded-xl px-4 py-3 border border-border focus:border-primary outline-none"
                />
              </div>

              {hata && <p role="alert" aria-live="assertive" className="text-red-600 text-sm">{hata}</p>}

              <button
                type="submit"
                disabled={yukleniyor}
                className="w-full bg-primary text-white font-syne font-bold py-3.5 rounded-xl disabled:opacity-50"
              >
                {yukleniyor ? 'Güncelleniyor...' : 'Parolayı güncelle →'}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
