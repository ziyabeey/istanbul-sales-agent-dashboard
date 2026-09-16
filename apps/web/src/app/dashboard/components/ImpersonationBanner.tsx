'use client'

import { useEffect, useState } from 'react'

type ImpersonationStatus = {
    active: boolean
    actingAdminId?: string
    actingAsTargetId?: string
    subjectLabel?: string
    reason?: string
    expiresAt?: string
}

export default function ImpersonationBanner() {
    const [status, setStatus] = useState<ImpersonationStatus | null>(null)
    const [ending, setEnding] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        fetch('/api/admin/impersonate', { credentials: 'include', cache: 'no-store' })
            .then(async (response) => {
                if (response.status === 401 || response.status === 403) return { active: false }
                if (!response.ok) throw new Error('Impersonation durumu doğrulanamadı')
                return response.json() as Promise<ImpersonationStatus>
            })
            .then((payload) => {
                if (!cancelled) setStatus(payload)
            })
            .catch(() => {
                if (!cancelled) setError('Admin impersonation durumu doğrulanamıyor')
            })
        return () => { cancelled = true }
    }, [])

    async function exitImpersonation() {
        setEnding(true)
        setError(null)
        try {
            const response = await fetch('/api/admin/impersonate', {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Impersonation sonlandırılamadı')
            const payload = await response.json() as { redirect?: string }
            window.location.assign(payload.redirect || '/admin/esnaflar')
        } catch {
            setError('Impersonation sonlandırılamadı. Ayrıcalıklı işlemler bloklu kalır.')
            setEnding(false)
        }
    }

    if (!status?.active && !error) return null

    return (
        <div className="sticky top-0 z-[100] flex min-h-11 w-full items-center justify-between gap-3 border-b border-red-300/40 bg-red-950 px-4 py-2 text-sm text-red-50 shadow-lg">
            <div className="min-w-0">
                <strong className="font-bold">Admin impersonation aktif</strong>
                {status?.active && (
                    <span className="ml-2 text-red-100/90">
                        {status.subjectLabel || status.actingAsTargetId} hesabı görüntüleniyor.
                        {status.reason ? ` Neden: ${status.reason}` : ''}
                    </span>
                )}
                {error && <span className="ml-2 font-semibold">{error}</span>}
            </div>
            {status?.active && (
                <button
                    type="button"
                    onClick={exitImpersonation}
                    disabled={ending}
                    className="shrink-0 rounded-md border border-red-200/50 bg-red-100 px-3 py-1.5 font-semibold text-red-950 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {ending ? 'Çıkılıyor...' : "Admin'e dön"}
                </button>
            )}
        </div>
    )
}
