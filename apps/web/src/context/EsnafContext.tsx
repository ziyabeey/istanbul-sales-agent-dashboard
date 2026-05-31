'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface EsnafContextType {
    esnafId: string | null
    esnaf: any | null
    loading: boolean
    error: string | null
    isDemo: boolean
    setEsnafId: (id: string) => void
    clearEsnaf: () => void
}

const EsnafContext = createContext<EsnafContextType>({
    esnafId: null,
    esnaf: null,
    loading: true,
    error: null,
    isDemo: false,
    setEsnafId: () => { },
    clearEsnaf: () => { },
})

export function EsnafProvider({ children }: { children: ReactNode }) {
    const [esnafId, setEsnafIdState] = useState<string | null>(null)
    const [esnaf, setEsnaf] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isDemo, setIsDemo] = useState(false)

    useEffect(() => {
        // HttpOnly cookie üzerinden oturum doğrulama
        fetchSession()
    }, [])

    async function fetchSession() {
        try {
            const res = await fetch('/api/auth/me', { credentials: 'include' })
            if (res.ok) {
                const data = await res.json()
                setError(null)
                setIsDemo(Boolean(data.isDemo))
                setEsnafIdState(data.esnafId)
                // Tam esnaf verisini çek
                await fetchEsnaf(data.esnafId)
            } else {
                setEsnafIdState(null)
                setEsnaf(null)
                setIsDemo(false)
                setLoading(false)
            }
        } catch {
            setError('Oturum bilgisi alınamadı')
            setLoading(false)
        }
    }

    async function fetchEsnaf(id: string) {
        try {
            const res = await fetch(`/api/esnaf/${id}`, { credentials: 'include' })
            if (res.ok) {
                const data = await res.json()
                setEsnaf(data)
                setIsDemo(Boolean(data.isDemo))
                setError(null)
            } else {
                const data = await res.json().catch(() => null)
                setError(data?.error || 'İşletme bilgisi alınamadı')
            }
        } catch {
            setError('İşletme bilgisi alınamadı')
        }
        setLoading(false)
    }

    function setEsnafId(id: string) {
        // Cookie zaten API response'da set ediliyor
        // Burada sadece state güncelleme yapıyoruz
        setLoading(true)
        setError(null)
        setEsnafIdState(id)
        fetchEsnaf(id)
    }

    async function clearEsnaf() {
        // Sunucu tarafında cookie'yi temizle
        try {
            await fetch('/api/auth/cikis', { method: 'POST', credentials: 'include' })
        } catch { /* ignore */ }
        setEsnafIdState(null)
        setEsnaf(null)
        setIsDemo(false)
        setError(null)
    }

    return (
        <EsnafContext.Provider value={{ esnafId, esnaf, loading, error, isDemo, setEsnafId, clearEsnaf }}>
            {children}
        </EsnafContext.Provider>
    )
}

export const useEsnaf = () => useContext(EsnafContext)
