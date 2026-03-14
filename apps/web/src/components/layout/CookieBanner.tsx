'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Sadece client tarafında kontrol et
        const consent = localStorage.getItem('kepenk-cookie-consent')
        if (!consent) {
            setIsVisible(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('kepenk-cookie-consent', 'true')
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
                >
                    <div className="mx-auto max-w-5xl bg-background p-6 rounded-2xl shadow-2xl border border-border/20 pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-muted-foreground-light text-sm text-balance">
                            <span className="font-bold text-foreground mr-1">Tazecik Çerezlerimiz Var!</span> 🍪 <br className="hidden sm:block" />
                            Size daha iyi bir deneyim sunmak ve esnaf asistanını özelleştirmek için sitemizde çerez (cookie) kullanıyoruz.
                            Kullanıma devam ederek{' '}
                            <Link href="/gizlilik" className="text-rust hover:underline underline-offset-2">
                                Gizlilik Politikamızı
                            </Link>{' '}
                            ve{' '}
                            <Link href="/kvkk" className="text-rust hover:underline underline-offset-2">
                                KVKK Metnimizi
                            </Link>{' '}
                            kabul etmiş sayılırsınız.
                        </div>
                        <div className="flex-shrink-0 w-full sm:w-auto">
                            <button
                                onClick={handleAccept}
                                className="w-full sm:w-auto bg-rust hover:bg-rust-light text-foreground font-syne font-bold px-8 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                            >
                                Anladım, Kabul Ediyorum
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
