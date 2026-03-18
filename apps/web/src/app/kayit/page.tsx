'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/* ═══════════════════════════════════════════════
   KPNK — Kayıt Ol (Sign-Up)
   KPNK Registration Page
   ═══════════════════════════════════════════════ */

export default function KayitPage() {
    const [email, setEmail] = useState('')
    const [yukleniyor, setYukleniyor] = useState(false)
    const [hata, setHata] = useState('')
    const [focused, setFocused] = useState(false)
    const router = useRouter()

    async function handleEmailSubmit() {
        if (!email || !email.includes('@')) {
            setHata('Geçerli bir e-posta adresi girin')
            return
        }
        setYukleniyor(true)
        setHata('')
        try {
            // Backend'e kayıt isteği gönder
            const res = await fetch('/api/auth/kayit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (!res.ok) {
                setHata(data.error || 'Kayıt sırasında bir hata oluştu')
                return
            }
            // Başarılı — fiyat seçimine yönlendir (ödeme sonrası onboarding)
            router.push(`/fiyatlar?email=${encodeURIComponent(email)}`)
        } catch {
            setHata('Bağlantı hatası. Lütfen tekrar deneyin.')
        } finally {
            setYukleniyor(false)
        }
    }

    async function handleGoogleSignup() {
        setYukleniyor(true)
        try {
            const res = await fetch('/api/auth/google/init')
            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            }
        } catch {
            setHata('Google ile bağlantı kurulamadı')
        } finally {
            setYukleniyor(false)
        }
    }

    return (
        <div style={S.page}>
            {/* Decorative Background Images */}
            <div style={S.decoLeft}>
                <div style={{ ...S.decoCard, transform: 'rotate(-12deg)', top: 60, left: -40 }}>
                    <div style={{ width: 180, height: 240, borderRadius: 12, background: 'linear-gradient(135deg, #E0E7FF, #EDE9FE)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                        <span style={{ fontSize: 36, opacity: 0.3 }}>📱</span>
                    </div>
                </div>
                <div style={{ ...S.decoCard, transform: 'rotate(8deg)', top: 320, left: 20 }}>
                    <div style={{ width: 160, height: 120, borderRadius: 12, background: 'linear-gradient(135deg, #EDE9FE, #DBEAFE)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                        <span style={{ fontSize: 28, opacity: 0.3 }}>🎨</span>
                    </div>
                </div>
                <div style={{ ...S.decoCard, transform: 'rotate(-5deg)', top: 480, left: -20 }}>
                    <div style={{ width: 140, height: 200, borderRadius: 12, background: 'linear-gradient(135deg, #F3F4F6, #FEF3C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                        <span style={{ fontSize: 28, opacity: 0.3 }}>📖</span>
                    </div>
                </div>
            </div>
            <div style={S.decoRight}>
                <div style={{ ...S.decoCard, transform: 'rotate(15deg)', top: 80, right: -30 }}>
                    <div style={{ width: 200, height: 150, borderRadius: 12, background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                        <span style={{ fontSize: 36, opacity: 0.3 }}>💻</span>
                    </div>
                </div>
                <div style={{ ...S.decoCard, transform: 'rotate(-10deg)', top: 280, right: 10 }}>
                    <div style={{ width: 160, height: 220, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                        <span style={{ fontSize: 28, opacity: 0.3 }}>🛍️</span>
                    </div>
                </div>
                <div style={{ ...S.decoCard, transform: 'rotate(7deg)', top: 520, right: -10 }}>
                    <div style={{ width: 140, height: 110, borderRadius: 12, background: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                        <span style={{ fontSize: 24, opacity: 0.3 }}>📊</span>
                    </div>
                </div>
            </div>

            {/* Top Left Logo */}
            <a href="/" style={{ ...S.topLogo, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#6366f1', fontWeight: 800 }}>KPNK</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#6366f1', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 999, padding: '1px 6px' }}>AI</span>
            </a>

            {/* Center Card */}
            <div style={S.card}>
                <h1 style={S.heading}>Kayıt Olun</h1>
                <p style={S.subtext}>
                    Zaten bir hesabınız var mı?{' '}
                    <a href="/giris" style={S.link}>Giriş yapın.</a>
                </p>

                {/* Social Login Buttons */}
                <button onClick={handleGoogleSignup} style={S.socialBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    <span>Google ile Devam Et</span>
                </button>
                <button style={S.socialBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg>
                    <span>Facebook ile Devam Et</span>
                </button>
                <button style={S.socialBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="#000"/></svg>
                    <span>Apple ile Devam Et</span>
                </button>

                {/* Divider */}
                <div style={S.divider}>
                    <div style={S.dividerLine} />
                    <span style={S.dividerText}>veya</span>
                    <div style={S.dividerLine} />
                </div>

                {/* Email Input */}
                <div style={S.inputWrapper}>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(email.length > 0)}
                        onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
                        style={{
                            ...S.input,
                            borderColor: focused ? '#6366f1' : '#d1d1d1',
                        }}
                    />
                    <label style={{
                        ...S.floatLabel,
                        top: (focused || email) ? -8 : 14,
                        fontSize: (focused || email) ? 11 : 14,
                        color: focused ? '#6366f1' : '#868686',
                        background: (focused || email) ? '#fff' : 'transparent',
                        padding: (focused || email) ? '0 4px' : '0',
                    }}>
                        E-posta
                    </label>
                </div>

                {hata && <p style={{ color: '#DF1C1C', fontSize: 13, margin: '0 0 8px' }}>{hata}</p>}

                {/* CTA Button */}
                <button
                    onClick={handleEmailSubmit}
                    disabled={yukleniyor}
                    style={{
                        ...S.ctaBtn,
                        opacity: yukleniyor ? 0.7 : 1,
                    }}
                >
                    {yukleniyor ? 'Yükleniyor...' : 'E-Posta ile Devam Et'}
                </button>

                {/* Legal Footer */}
                <p style={S.legal}>
                    * Kaydolarak{' '}
                    <a href="/kullanim-kosullari" style={S.legalLink}>Kullanım Koşullarımızı</a>{' '}
                    kabul etmiş ve{' '}
                    <a href="/gizlilik" style={S.legalLink}>Gizlilik Politikamızı</a>{' '}
                    okuduğunuzu onaylamış olursunuz.
                </p>
            </div>

            {/* Bottom Footer */}
            <p style={S.bottomFooter}>
                Bu site reCAPTCHA Enterprise tarafından korunmaktadır. Google&apos;ın{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={S.legalLink}>Gizlilik Politikası</a>{' '}
                ve{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" style={S.legalLink}>Hizmet Şartları</a>{' '}
                geçerlidir.
            </p>
        </div>
    )
}

/* ═══════ STYLE CONSTANTS ═══════ */
const S: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        background: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', 'Helvetica Neue', system-ui, sans-serif",
        color: '#000',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 20px 60px',
    },
    topLogo: {
        position: 'absolute',
        top: 24,
        left: 32,
        fontSize: 22,
        fontWeight: 900,
        color: '#000',
        textDecoration: 'none',
        letterSpacing: '-0.02em',
        zIndex: 10,
    },
    decoLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 250,
        pointerEvents: 'none',
        zIndex: 0,
    },
    decoRight: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 250,
        pointerEvents: 'none',
        zIndex: 0,
    },
    decoCard: {
        position: 'absolute',
    },
    card: {
        background: '#fff',
        borderRadius: 16,
        padding: '40px 36px 32px',
        maxWidth: 450,
        width: '100%',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        position: 'relative',
        zIndex: 5,
    },
    heading: {
        fontSize: 28,
        fontWeight: 800,
        textAlign: 'center',
        marginBottom: 8,
        color: '#000',
    },
    subtext: {
        fontSize: 14,
        textAlign: 'center',
        color: '#525252',
        marginBottom: 28,
    },
    link: {
        color: '#4459EF',
        textDecoration: 'none',
        fontWeight: 600,
    },
    socialBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #d1d1d1',
        borderRadius: 24,
        background: '#fff',
        fontSize: 14,
        fontWeight: 500,
        color: '#000',
        cursor: 'pointer',
        fontFamily: "'Inter', system-ui",
        marginBottom: 10,
        transition: '0.15s',
    },
    divider: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        margin: '20px 0',
    },
    dividerLine: {
        flex: 1,
        height: 1,
        background: '#e0e0e0',
    },
    dividerText: {
        fontSize: 13,
        color: '#868686',
        fontWeight: 500,
    },
    inputWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        padding: '14px 16px',
        border: '1px solid #d1d1d1',
        borderRadius: 10,
        fontSize: 14,
        fontFamily: "'Inter', system-ui",
        outline: 'none',
        transition: '0.2s',
        background: '#fff',
    },
    floatLabel: {
        position: 'absolute',
        left: 12,
        transition: '0.2s ease',
        pointerEvents: 'none',
        fontFamily: "'Inter', system-ui",
    },
    ctaBtn: {
        width: '100%',
        padding: '14px',
        border: 'none',
        borderRadius: 24,
        background: '#4459EF',
        color: '#fff',
        fontSize: 15,
        fontWeight: 700,
        cursor: 'pointer',
        fontFamily: "'Inter', system-ui",
        transition: '0.15s',
        marginBottom: 16,
    },
    legal: {
        fontSize: 11,
        color: '#868686',
        lineHeight: 1.5,
        textAlign: 'center',
    },
    legalLink: {
        color: '#868686',
        textDecoration: 'underline',
    },
    bottomFooter: {
        position: 'absolute',
        bottom: 16,
        fontSize: 11,
        color: '#868686',
        textAlign: 'center',
        maxWidth: 400,
        lineHeight: 1.5,
        zIndex: 5,
    },
}
