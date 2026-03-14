"use client";

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEsnaf } from '@/context/EsnafContext'

interface DomainOnerisi {
    domain: string
    musait: boolean
}

interface DomainDurum {
    domain: string
    tescil: 'aktif' | 'beklemede' | 'hata' | 'yok'
    dns: 'propagated' | 'pending' | 'hata'
    ssl: { aktif: boolean; tip: string }
    analitik: { ziyaret: number; bandwidthMB: number; tehdit: number; donem: string }
}

export default function DomainPage() {
    const { esnafId } = useEsnaf()
    const [paket, setPaket] = useState('')
    const [mevcutDomain, setMevcutDomain] = useState<string | null>(null)
    const [domainDurum, setDomainDurum] = useState<DomainDurum | null>(null)
    const [oneriler, setOneriler] = useState<string[]>([])
    const [secili, setSecili] = useState<string | null>(null)
    const [yukleniyor, setYukleniyor] = useState(false)
    const [mesaj, setMesaj] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (!esnafId) return

        fetch(`/api/esnaf/${esnafId}`, { credentials: 'include' }).then(r => r.json()).then(data => {
            setPaket(data.paket || 'TEMEL')
            if (data.domain?.domain) {
                setMevcutDomain(data.domain.domain)
                fetch(`/api/domain/durum?domain=${data.domain.domain}`)
                    .then(r => r.json())
                    .then(setDomainDurum)
            }
            if (data.domain?.oneriler) setOneriler(data.domain.oneriler)
        })
    }, [esnafId])

    const isPremium = ['PREMIUM', 'PREMIUMPLUS'].includes(paket)

    async function handleDomainSec() {
        if (!secili || !esnafId) return
        setYukleniyor(true)
        try {
            const res = await fetch('/api/domain/sec', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, domain: secili }),
            })
            if (res.ok) {
                setMesaj('Domain tescil işlemi başlatıldı! DNS propagasyonu 24-48 saat sürebilir.')
                setMevcutDomain(secili)
            } else {
                setMesaj('Hata oluştu, lütfen tekrar deneyin.')
            }
        } finally {
            setYukleniyor(false)
        }
    }

    const dnsBadge = (dns: string) => {
        switch (dns) {
            case 'propagated': return <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">✓ Aktif</span>
            case 'pending': return <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 animate-pulse">⏳ Yayılıyor</span>
            case 'hata': return <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">✗ Hata</span>
        }
    }

    return (
        <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3">
                <button onClick={() => router.push('/dashboard/sitem')} className="text-muted-foreground hover:text-foreground text-sm">← Geri</button>
                <h1 className="text-foreground font-syne font-extrabold text-2xl">
                    Domain <span className="text-rust">Yönetimi</span>
                </h1>
            </div>

            {!isPremium ? (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
                    <p className="text-3xl mb-3">🔒</p>
                    <h3 className="font-syne font-bold text-lg text-foreground mb-2">Premium Özellik</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                        Ücretsiz .com.tr domain hediyesi Premium ve Premium+ paketlere özeldir.
                    </p>
                    <button
                        onClick={() => router.push('/dashboard/abonelik')}
                        className="bg-rust text-foreground px-6 py-3 rounded-xl font-bold text-sm"
                    >
                        Paket Yükselt
                    </button>
                </div>
            ) : mevcutDomain ? (
                <>
                    {/* Mevcut Domain Durumu */}
                    <div className="bg-white border border-border-light/30 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Aktif Domain</p>
                            {domainDurum && dnsBadge(domainDurum.dns)}
                        </div>
                        <p className="font-syne font-bold text-xl text-foreground">{mevcutDomain}</p>

                        {domainDurum && (
                            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-foreground">{domainDurum.analitik.ziyaret.toLocaleString('tr-TR')}</p>
                                    <p className="text-xs text-muted-foreground">Ziyaret</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-foreground">{domainDurum.analitik.bandwidthMB} MB</p>
                                    <p className="text-xs text-muted-foreground">Bandwidth</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-foreground">{domainDurum.ssl.aktif ? '🔒' : '⚠️'}</p>
                                    <p className="text-xs text-muted-foreground">SSL {domainDurum.ssl.tip}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {/* Domain Seçim */}
                    {oneriler.length > 0 ? (
                        <div className="bg-white border border-border-light/30 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-syne font-bold text-lg text-foreground mb-4">🎁 Hediye Domain Seçin</h3>
                            <div className="space-y-2 mb-4">
                                {oneriler.map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setSecili(d)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                            secili === d
                                                ? 'border-rust bg-rust/5'
                                                : 'border-border hover:border-border'
                                        }`}
                                    >
                                        <span className="font-mono font-bold text-foreground">{d}</span>
                                    </button>
                                ))}
                            </div>
                            {mesaj && <p className="text-green-700 text-sm mb-3 font-bold">{mesaj}</p>}
                            <button
                                onClick={handleDomainSec}
                                disabled={!secili || yukleniyor}
                                className="w-full bg-rust text-foreground py-3 rounded-xl font-bold text-sm disabled:opacity-50"
                            >
                                {yukleniyor ? 'Tescil Ediliyor...' : 'Seçtim — Tescil Et'}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white border border-border-light/30 rounded-2xl p-6 text-center">
                            <p className="text-3xl mb-3">📋</p>
                            <p className="text-muted-foreground text-sm">Domain önerileri henüz hazır değil. WhatsApp üzerinden bilgilendirileceksiniz.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
