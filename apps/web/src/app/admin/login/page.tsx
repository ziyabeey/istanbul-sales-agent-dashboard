'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
    const [sifre, setSifre] = useState('')
    const [hata, setHata] = useState('')
    const [yukleniyor, setYukleniyor] = useState(false)
    const router = useRouter()

    async function handleGiris() {
        setYukleniyor(true)
        setHata('')
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sifre }),
            })
            if (res.ok) {
                router.replace('/admin')
            } else {
                setHata('Şifre hatalı')
            }
        } catch {
            setHata('Bağlantı hatası')
        }
        setYukleniyor(false)
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl p-8 w-full max-w-sm">
                <h1 className="text-foreground font-syne font-extrabold text-2xl mb-2 text-center">
                    <span className="text-rust">K</span>EPENK
                    <span className="text-rust text-sm">.ai</span>
                </h1>
                <p className="text-muted-foreground text-sm text-center mb-8">Admin Paneli</p>

                <input
                    type="password"
                    placeholder="Şifre"
                    value={sifre}
                    onChange={(e) => setSifre(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGiris()}
                    className="w-full bg-background text-foreground rounded-xl px-4 py-3 mb-4
                     outline-none border border-border focus:border-rust"
                    autoFocus
                />

                {hata && (
                    <p className="text-red-400 text-sm text-center mb-3">{hata}</p>
                )}

                <button
                    onClick={handleGiris}
                    disabled={yukleniyor || !sifre}
                    className="w-full bg-rust text-foreground font-syne font-bold py-3
                     rounded-xl disabled:opacity-50"
                >
                    {yukleniyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </button>
            </div>
        </div>
    )
}
