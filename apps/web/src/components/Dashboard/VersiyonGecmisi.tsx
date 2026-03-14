'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, RotateCcw, X, Check, Trash2, FileJson } from 'lucide-react'

interface SiteVersiyon {
    id: string
    versiyon_adi: string
    yayin_tarihi: { _seconds: number }
    boyut_kb: number
    tema_id: string
    aktif_moduller: string[]
}

interface Props {
    esnafId: string
    acik: boolean
    onKapat: () => void
    onRollback?: (versiyonId: string) => void
}

export default function VersiyonGecmisi({ esnafId, acik, onKapat, onRollback }: Props) {
    const [versiyonlar, setVersiyonlar] = useState<SiteVersiyon[]>([])
    const [yukleniyor, setYukleniyor] = useState(false)
    const [islemYapilan, setIslemYapilan] = useState<string | null>(null)
    const [basarili, setBasarili] = useState<string | null>(null)

    useEffect(() => {
        if (acik && esnafId) {
            versiyonlariYukle()
        }
    }, [acik, esnafId])

    async function versiyonlariYukle() {
        setYukleniyor(true)
        try {
            const res = await fetch(`/api/site/versiyonlar?esnafId=${esnafId}`)
            const data = await res.json()
            if (data.ok) setVersiyonlar(data.versiyonlar || [])
        } catch { /* sessiz */ }
        finally { setYukleniyor(false) }
    }

    async function rollbackYap(versiyonId: string) {
        setIslemYapilan(versiyonId)
        try {
            const res = await fetch('/api/site/versiyonlar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, versiyonId, islem: 'rollback' }),
            })
            const data = await res.json()
            if (data.ok) {
                setBasarili(versiyonId)
                onRollback?.(versiyonId)
                setTimeout(() => setBasarili(null), 3000)
            }
        } catch { /* sessiz */ }
        finally { setIslemYapilan(null) }
    }

    async function versiyonuSil(versiyonId: string) {
        setIslemYapilan(versiyonId)
        try {
            await fetch('/api/site/versiyonlar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, versiyonId, islem: 'sil' }),
            })
            setVersiyonlar(prev => prev.filter(v => v.id !== versiyonId))
        } catch { /* sessiz */ }
        finally { setIslemYapilan(null) }
    }

    function tarihFormat(ts: { _seconds: number }) {
        if (!ts?._seconds) return '-'
        const d = new Date(ts._seconds * 1000)
        return d.toLocaleDateString('tr-TR', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        })
    }

    return (
        <AnimatePresence>
            {acik && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onKapat}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 w-full max-w-md h-full bg-background z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-rust/20 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-rust" />
                                </div>
                                <div>
                                    <h2 className="text-white font-syne font-bold text-lg">Zaman Makinesi</h2>
                                    <p className="text-muted-foreground-400 text-xs">Son {versiyonlar.length} versiyon</p>
                                </div>
                            </div>
                            <button onClick={onKapat} className="text-muted-foreground-400 hover:text-white transition p-2">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                            {yukleniyor ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-3">
                                    <div className="w-8 h-8 border-2 border-rust/30 border-t-rust rounded-full animate-spin" />
                                    <span className="text-muted-foreground-400 text-sm">Yükleniyor...</span>
                                </div>
                            ) : versiyonlar.length === 0 ? (
                                <div className="text-center py-20">
                                    <FileJson className="w-12 h-12 text-muted-foreground-600 mx-auto mb-3" />
                                    <p className="text-muted-foreground-400 text-sm">Henüz kayıtlı versiyon yok</p>
                                    <p className="text-muted-foreground-500 text-xs mt-1">Site güncellendiğinde otomatik kaydedilir</p>
                                </div>
                            ) : (
                                versiyonlar.map((v, i) => (
                                    <motion.div
                                        key={v.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`rounded-2xl border p-4 transition-all ${
                                            basarili === v.id
                                                ? 'border-green-500/50 bg-green-500/10'
                                                : i === 0
                                                    ? 'border-rust/40 bg-rust/5'
                                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-white font-bold text-sm truncate">
                                                        {v.versiyon_adi}
                                                    </h3>
                                                    {i === 0 && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rust/20 text-rust font-bold shrink-0">
                                                            AKTİF
                                                        </span>
                                                    )}
                                                    {basarili === v.id && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-bold shrink-0 flex items-center gap-1">
                                                            <Check className="w-3 h-3" /> GERİ YÜKLENDİ
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-muted-foreground-400 text-xs mt-1">
                                                    {tarihFormat(v.yayin_tarihi)} · {v.boyut_kb} KB
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mt-3">
                                            {i !== 0 && (
                                                <button
                                                    onClick={() => rollbackYap(v.id)}
                                                    disabled={!!islemYapilan}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-rust/20 text-white text-xs font-bold transition disabled:opacity-40"
                                                >
                                                    {islemYapilan === v.id ? (
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    ) : (
                                                        <RotateCcw className="w-3.5 h-3.5" />
                                                    )}
                                                    Bu Sürüme Dön
                                                </button>
                                            )}
                                            <button
                                                onClick={() => versiyonuSil(v.id)}
                                                disabled={!!islemYapilan || i === 0}
                                                className="p-2 rounded-xl hover:bg-red-500/20 text-muted-foreground-500 hover:text-red-400 transition disabled:opacity-20"
                                                title="Sil"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-white/10">
                            <p className="text-muted-foreground-500 text-[11px] text-center">
                                Son 15 versiyon saklanır · Eski versiyonlar otomatik silinir
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
