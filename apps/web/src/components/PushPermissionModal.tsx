'use client'

import { useState, useEffect, useCallback } from 'react'
import { Bell, X, Shield } from 'lucide-react'

/**
 * PushPermissionModal — Zarif FCM İzin Modalı
 * ─────────────────────────────────────────────────────────────────────────────
 * Tarayıcının çirkin varsayılan izin popup'ı KULLANILMAZ.
 * Esnaf Dashboard'a girince alt-orta'da yumuşak bir modal belirir.
 * İzin verilirse FCM token alınır ve Firestore'a kaydedilir.
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface Props {
    esnafId: string | null
}

export default function PushPermissionModal({ esnafId }: Props) {
    const [goster, setGoster] = useState(false)
    const [islemde, setIslemde] = useState(false)

    useEffect(() => {
        if (!esnafId) return
        if (typeof window === 'undefined' || !('Notification' in window)) return
        if (Notification.permission !== 'default') return

        // Zaten sorulan mı kontrol et (7 gün boyunca bir daha sorma)
        const sonSoruldu = localStorage.getItem('kepenk_push_asked')
        if (sonSoruldu) {
            const fark = Date.now() - Number(sonSoruldu)
            if (fark < 7 * 24 * 60 * 60 * 1000) return
        }

        // 3 saniye sonra göster (ilk yükleme sıkışıklığı geçsin)
        const timer = setTimeout(() => setGoster(true), 3000)
        return () => clearTimeout(timer)
    }, [esnafId])

    const handleIzinVer = useCallback(async () => {
        if (!esnafId) return
        setIslemde(true)

        try {
            // 1. Tarayıcı izni al
            const permission = await Notification.requestPermission()

            if (permission !== 'granted') {
                localStorage.setItem('kepenk_push_asked', String(Date.now()))
                setGoster(false)
                return
            }

            // 2. Service Worker kayıt kontrolü
            const registration = await navigator.serviceWorker.ready

            // 3. FCM VAPID key ile push subscription al
            const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
            let tokenStr = ''

            if (vapidKey) {
                // Firebase modülünü dinamik yükle (bundle boyutunu düşürmek için)
                try {
                    const { getToken } = await import('firebase/messaging')
                    // @ts-ignore — firebaseClient opsiyonel, yoksa Web Push API kullanılır
                    const mod = await import('@/lib/firebaseClient').catch(() => null)
                    const messaging = mod?.messaging

                    if (messaging) {
                        tokenStr = await getToken(messaging, {
                            vapidKey,
                            serviceWorkerRegistration: registration,
                        })
                    }
                } catch { /* Firebase client yoksa Web Push fallback */ }
            }

            // Fallback: Web Push API (VAPID yoksa)
            if (!tokenStr) {
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: vapidKey || undefined,
                })
                tokenStr = JSON.stringify(subscription.toJSON())
            }

            // 4. Token'ı Firestore'a kaydet
            if (tokenStr) {
                await fetch('/api/push/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        esnafId,
                        token: tokenStr,
                        platform: detectPlatform(),
                        zaman: new Date().toISOString(),
                    }),
                })
            }

            localStorage.setItem('kepenk_push_asked', String(Date.now()))
            setGoster(false)
        } catch (err) {
            console.error('[PUSH] İzin hatası:', err)
            localStorage.setItem('kepenk_push_asked', String(Date.now()))
            setGoster(false)
        } finally {
            setIslemde(false)
        }
    }, [esnafId])

    const handleReddet = () => {
        localStorage.setItem('kepenk_push_asked', String(Date.now()))
        setGoster(false)
    }

    if (!goster) return null

    return (
        <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] w-[90vw] max-w-[420px]"
            style={{
                animation: 'slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
        >
            <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-5 shadow-2xl shadow-black/40">
                {/* Kapat */}
                <button
                    onClick={handleReddet}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-muted-foreground transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-4">
                    {/* İkon */}
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                        <Bell className="w-5 h-5 text-amber-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-slate-100 font-syne font-bold text-base">
                            Müşteri Mesajlarını Kaçırmayın
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                            Yeni sipariş, müşteri mesajı ve ödeme bildirimlerini anında telefonunuzda görün.
                        </p>

                        {/* Güvenlik notu */}
                        <div className="flex items-center gap-1.5 mt-2.5">
                            <Shield className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500 text-xs">Verileriniz güvende · İstediğiniz zaman kapatabilirsiniz</span>
                        </div>

                        {/* Butonlar */}
                        <div className="flex items-center gap-3 mt-4">
                            <button
                                onClick={handleIzinVer}
                                disabled={islemde}
                                className="flex-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                            >
                                {islemde ? (
                                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                ) : (
                                    <Bell className="w-4 h-4" />
                                )}
                                {islemde ? 'Ayarlanıyor...' : 'Bildirimleri Aç'}
                            </button>
                            <button
                                onClick={handleReddet}
                                className="px-4 py-2.5 text-muted-foreground hover:text-muted-foreground text-sm transition-colors"
                            >
                                Sonra
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUpFade {
                    from { opacity: 0; transform: translate(-50%, 20px); }
                    to   { opacity: 1; transform: translate(-50%, 0); }
                }
            `}</style>
        </div>
    )
}

function detectPlatform(): string {
    if (typeof navigator === 'undefined') return 'unknown'
    const ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) return 'ios'
    if (/android/.test(ua)) return 'android'
    if (/windows/.test(ua)) return 'windows'
    if (/mac/.test(ua)) return 'macos'
    return 'web'
}
