'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface EsnafContextType {
    esnafId: string | null
    esnaf: any | null
    loading: boolean
    setEsnafId: (id: string) => void
    clearEsnaf: () => void
}

const EsnafContext = createContext<EsnafContextType>({
    esnafId: null,
    esnaf: null,
    loading: true,
    setEsnafId: () => { },
    clearEsnaf: () => { },
})

export function EsnafProvider({ children }: { children: ReactNode }) {
    const [esnafId, setEsnafIdState] = useState<string | null>(null)
    const [esnaf, setEsnaf] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // HttpOnly cookie üzerinden oturum doğrulama
        fetchSession()
    }, [])

    async function fetchSession() {
        try {
            const res = await fetch('/api/auth/me', { credentials: 'include' })
            if (res.ok) {
                const data = await res.json()
                setEsnafIdState(data.esnafId)
                // Tam esnaf verisini çek
                await fetchEsnaf(data.esnafId)
            } else {
                setLoading(false)
            }
        } catch {
            setLoading(false)
        }
    }

    async function fetchEsnaf(id: string) {
        try {
            const res = await fetch(`/api/esnaf/${id}`, { credentials: 'include' })
            if (res.ok) {
                const data = await res.json()
                setEsnaf(data)
            }
        } catch {
            // Sessizce devam et
        }
        setLoading(false)
    }

    function setEsnafId(id: string) {
        // Cookie zaten API response'da set ediliyor
        // Burada sadece state güncelleme yapıyoruz
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
    }

    return (
        <EsnafContext.Provider value={{ esnafId, esnaf, loading, setEsnafId, clearEsnaf }}>
            {children}
        </EsnafContext.Provider>
    )
}

export const useEsnaf = () => useContext(EsnafContext)
