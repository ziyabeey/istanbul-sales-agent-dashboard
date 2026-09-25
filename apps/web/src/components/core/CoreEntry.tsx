'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { CoreEntryError, coreEntryMutation, readCoreEntry } from '@/lib/core/entryBrowserClient'
import type { CoreEntrySnapshot } from '@/lib/core/entryTypes'
import './core-entry.css'

type View = { kind: 'loading' | 'login' | 'unavailable' | 'disabled' } | { kind: 'ready'; snapshot: CoreEntrySnapshot }
const roles = { owner: 'İşletme sahibi', manager: 'Yönetici', staff: 'Çalışan' }

function errorMessage(error: unknown, action: 'login' | 'recovery' | 'select' | 'logout') {
  if (error instanceof CoreEntryError) {
    if (error.status === 429) return 'Çok fazla deneme yaptın. Biraz bekleyip tekrar dene.'
    if (error.status === 404) return 'Bu giriş henüz kullanıma açılmadı.'
    if (action === 'login' && [400, 401].includes(error.status)) return 'E-posta adresini ve parolanı kontrol edip tekrar dene.'
    if (error.status === 403) return 'İşlem doğrulanamadı. Sayfayı yenileyip tekrar dene.'
  }
  return {
    login: 'Şu an giriş yapamadık. Bağlantını kontrol edip tekrar dene.',
    recovery: 'Kurtarma isteğini şu an iletemedik. Biraz sonra tekrar dene.',
    select: 'İşletme seçimini doğrulayamadık. İşletmelerini yeniden kontrol et.',
    logout: 'Çıkış işlemini doğrulayamadık. Lütfen tekrar dene.',
  }[action]
}

export default function CoreEntry() {
  const router = useRouter()
  const [view, setView] = useState<View>({ kind: 'loading' })
  const [busy, setBusy] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [choosing, setChoosing] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [recovering, setRecovering] = useState(false)
  const [message, setMessage] = useState('')
  const [notice, setNotice] = useState('')
  const operation = useRef(Symbol())
  const locked = useRef(false)
  const mounted = useRef(false)
  const heading = useRef<HTMLHeadingElement>(null)

  const applySnapshot = useCallback((snapshot: CoreEntrySnapshot) => {
    setSignedIn(true)
    if (snapshot.recovery) { router.replace('/parola-yenile'); return }
    setView({ kind: 'ready', snapshot })
    setChoosing(false)
  }, [router])

  const refresh = useCallback(async () => {
    if (locked.current) return
    const current = Symbol()
    operation.current = current
    setView({ kind: 'loading' }); setMessage(''); setNotice('')
    try {
      const snapshot = await readCoreEntry()
      if (mounted.current && current === operation.current) applySnapshot(snapshot)
    } catch (error) {
      if (!mounted.current || current !== operation.current) return
      if (error instanceof CoreEntryError && error.status === 401) {
        setSignedIn(false); setView({ kind: 'login' })
      } else setView({ kind: error instanceof CoreEntryError && error.status === 404 ? 'disabled' : 'unavailable' })
    }
  }, [applySnapshot])

  useEffect(() => {
    mounted.current = true
    void refresh()
    const recheck = () => { if (document.visibilityState === 'visible') void refresh() }
    window.addEventListener('focus', recheck)
    document.addEventListener('visibilitychange', recheck)
    return () => {
      mounted.current = false; operation.current = Symbol()
      window.removeEventListener('focus', recheck)
      document.removeEventListener('visibilitychange', recheck)
    }
  }, [refresh])

  useEffect(() => {
    if (view.kind !== 'loading') heading.current?.focus()
  }, [view.kind, choosing])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (locked.current) return
    locked.current = true
    const current = Symbol()
    operation.current = current
    setBusy(true); setMessage(''); setNotice('')
    let loginAcknowledged = false
    try {
      await coreEntryMutation(recovering ? 'parola-kurtar' : 'parola-giris', recovering ? { email } : { email, parola: password })
      if (!mounted.current || current !== operation.current) return
      setPassword('')
      if (recovering) setNotice('Bu e-posta adresiyle bir hesap varsa kurtarma bağlantısı gönderilecek. Bağlantıyı bu tarayıcıda aç.')
      else {
        loginAcknowledged = true
        setSignedIn(true)
        setView({ kind: 'loading' })
        const snapshot = await readCoreEntry()
        if (mounted.current && current === operation.current) {
          applySnapshot(snapshot)
          if (!snapshot.recovery) router.replace('/baslangic')
        }
      }
    } catch (error) {
      if (!mounted.current || current !== operation.current) return
      if (loginAcknowledged && !(error instanceof CoreEntryError && error.status === 401)) {
        setMessage('Girişinden sonra işletmelerini doğrulayamadık. Yeniden kontrol edebilirsin.')
        setView({ kind: 'unavailable' })
      } else {
        setSignedIn(false)
        setMessage(errorMessage(error, recovering ? 'recovery' : 'login'))
        setView({ kind: 'login' })
      }
    } finally {
      if (mounted.current && current === operation.current) { setPassword(''); setBusy(false) }
      locked.current = false
    }
  }

  async function selectBusiness(businessId: string) {
    if (locked.current) return
    locked.current = true
    const current = Symbol()
    operation.current = current
    setBusy(true); setMessage('')
    // No previous business content is retained while changing the context.
    setView({ kind: 'loading' })
    try {
      await coreEntryMutation('isletme-sec', { businessId })
      const snapshot = await readCoreEntry()
      if (snapshot.recovery || snapshot.businessId !== businessId) throw new CoreEntryError(503)
      if (mounted.current && current === operation.current) applySnapshot(snapshot)
    } catch (error) {
      if (!mounted.current || current !== operation.current) return
      setMessage(errorMessage(error, 'select')); setView({ kind: 'unavailable' })
    } finally {
      if (mounted.current && current === operation.current) setBusy(false)
      locked.current = false
    }
  }

  async function logout() {
    if (locked.current) return
    locked.current = true
    const current = Symbol()
    operation.current = current
    setBusy(true); setMessage(''); setView({ kind: 'loading' })
    try {
      await coreEntryMutation('cikis')
      if (!mounted.current || current !== operation.current) return
      finishLogout()
    } catch (error) {
      if (!mounted.current || current !== operation.current) return
      if (error instanceof CoreEntryError && error.status === 401) finishLogout()
      else { setMessage(errorMessage(error, 'logout')); setView({ kind: 'unavailable' }) }
    } finally {
      if (mounted.current && current === operation.current) setBusy(false)
      locked.current = false
    }
  }

  function finishLogout() {
    setEmail(''); setPassword(''); setNotice(''); setRecovering(false)
    setSignedIn(false); setChoosing(false); setView({ kind: 'login' })
    router.replace('/giris')
  }

  const snapshot = view.kind === 'ready' ? view.snapshot : null
  const selected = snapshot?.memberships.find(item => item.businessId === snapshot.businessId)
  const title = view.kind === 'login' ? (recovering ? 'Parolanı yenile' : 'Kepenk’e giriş yap')
    : view.kind === 'loading' ? 'İşletmelerin kontrol ediliyor'
      : view.kind === 'disabled' ? 'Bu giriş henüz kullanıma açılmadı'
        : view.kind === 'unavailable' ? 'İşletmelerini şu an kontrol edemedik'
          : snapshot?.memberships.length === 0 ? 'Erişebileceğin bir işletme bulunamadı'
            : !selected || choosing ? 'Hangi işletmeyle devam etmek istersin?' : 'Bugün'

  return <main className="core-entry">
    <div className="core-entry-shell">
      <header className="core-entry-header">
        <span className="core-entry-brand">kepenk<span>.ai</span></span>
        {signedIn && <button className="core-entry-text-button" disabled={busy || view.kind === 'loading'} onClick={() => void logout()}>Çıkış yap</button>}
      </header>
      <section className="core-entry-card" aria-busy={busy || view.kind === 'loading'}>
        <p className="core-entry-eyebrow">İlk gün · giriş ve işletme</p>
        <h1 ref={heading} tabIndex={-1}>{title}</h1>
        {message && <p className="core-entry-error" role="alert">{message}</p>}
        {notice && <p className="core-entry-notice" role="status">{notice}</p>}
        {view.kind === 'loading' && <p role="status">Lütfen bekle. Doğrulama bitmeden işletme bilgilerini göstermiyoruz.</p>}
        {view.kind === 'login' && <>
          <p>{recovering ? 'Hesabında kullandığın e-posta adresini yaz.' : 'Mevcut hesabının e-posta adresi ve parolasıyla devam et.'}</p>
          <form onSubmit={submit}>
            <label htmlFor="core-email">E-posta adresi</label>
            <input id="core-email" name="email" type="email" autoComplete="username" required maxLength={254} value={email} disabled={busy} onChange={event => setEmail(event.target.value)} />
            {!recovering && <><label htmlFor="core-password">Parola</label>
              <input id="core-password" name="password" type="password" autoComplete="current-password" minLength={8} maxLength={256} required value={password} disabled={busy} onChange={event => setPassword(event.target.value)} /></>}
            <button className="core-entry-primary" disabled={busy}>{busy ? 'İşlemin sürüyor…' : recovering ? 'Kurtarma bağlantısı iste' : 'Giriş yap'}</button>
          </form>
          <button className="core-entry-text-button" disabled={busy} onClick={() => { setRecovering(!recovering); setPassword(''); setMessage(''); setNotice('') }}>{recovering ? 'Girişe dön' : 'Parolamı unuttum'}</button>
        </>}
        {view.kind === 'unavailable' && <>
          <p>Bağlantını kontrol edip yeniden dene. Bu durum, işletmen olmadığı anlamına gelmez.</p>
          <button className="core-entry-primary" disabled={busy} onClick={() => void refresh()}>Yeniden kontrol et</button>
        </>}
        {view.kind === 'disabled' && <p>Bu ortamın giriş hazırlığı henüz tamamlanmadı. Şu anda giriş yapamazsın.</p>}
        {snapshot?.memberships.length === 0 && <p>Bu hesapla erişebileceğin bir işletme bulunamadı. Doğru hesapla giriş yaptığından emin ol veya işletme sahibinden erişimini kontrol etmesini iste.</p>}
        {snapshot && snapshot.memberships.length > 0 && (!selected || choosing) && <>
          <p>Yalnız bu hesapla erişebildiğin işletmeler gösterilir.</p>
          <ul className="core-entry-businesses">{snapshot.memberships.map(item => <li key={item.businessId}>
            <button disabled={busy} onClick={() => void selectBusiness(item.businessId)}>
              <strong>{item.name}</strong><span>{roles[item.role]} · {item.slug}</span>
            </button>
          </li>)}</ul>
          {selected && <button className="core-entry-text-button" onClick={() => setChoosing(false)}>Seçili işletmeye dön</button>}
        </>}
        {selected && !choosing && <>
          <div className="core-entry-selected"><span>Seçili işletme</span><h2>{selected.name}</h2><p>{roles[selected.role]} · {selected.slug}</p>
            {snapshot!.memberships.length > 1 && <button className="core-entry-text-button" onClick={() => { setChoosing(true); setMessage('') }}>İşletmeyi değiştir</button>}
          </div>
          <div className="core-entry-notice" role="status"><h2>Giriş ve işletme seçimin doğrulandı</h2><p>Randevu bağlantısı henüz bu ekrana eklenmedi. Bu nedenle gerçek iş kartları ve iş sayıları gösterilmiyor.</p></div>
        </>}
      </section>
      <p className="core-entry-footnote">Bu ilk akış yalnız giriş ve işletme seçimini kapsar. Randevu, ödeme ve müşteri kayıtlarını değiştirmez.</p>
    </div>
  </main>
}
