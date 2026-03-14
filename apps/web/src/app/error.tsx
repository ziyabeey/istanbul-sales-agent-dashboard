'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('[HATA]', error)
    }, [error])

    const router = useRouter()

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
            <p className="text-rust text-5xl mb-4">⚠️</p>
            <h2 className="text-foreground font-syne font-bold text-xl mb-2">
                Bir şeyler ters gitti
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm">
                Sistem hatası oluştu. Tekrar deneyin.
                {error.digest && (
                    <span className="block text-muted-foreground/50 text-xs mt-1 font-mono">#{error.digest}</span>
                )}
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
                <button
                    onClick={reset}
                    className="bg-rust text-foreground px-6 py-3 rounded-xl font-syne font-bold"
                >
                    Tekrar Dene
                </button>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="bg-card text-foreground px-6 py-3 rounded-xl font-syne font-bold border border-border"
                >
                    Dashboard&apos;a Dön
                </button>
            </div>
        </div>
    )
}
