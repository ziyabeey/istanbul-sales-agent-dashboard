'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface Transaction {
    id: string
    tarih: string
    aciklama: string
    kategori: string
    tur: 'gelir' | 'gider'
    tutar: number
    odemeYontemi: string
    faturaDurumu: 'ödendi' | 'bekliyor' | 'gecikmiş'
}

type TabView = 'all' | 'gelir' | 'gider'
type Period = 'buAy' | 'gecenAy' | '3Ay' | 'yil'

/* ═══════ Demo Data ═══════ */
const DEMO_TX: Transaction[] = [
    { id: '1', tarih: '2026-03-15', aciklama: 'Online sipariş — Ahmet Y.', kategori: 'Satış', tur: 'gelir', tutar: 450, odemeYontemi: 'Kredi Kartı', faturaDurumu: 'ödendi' },
    { id: '2', tarih: '2026-03-14', aciklama: 'Google Ads fatura', kategori: 'Reklam', tur: 'gider', tutar: 1200, odemeYontemi: 'Banka Havale', faturaDurumu: 'ödendi' },
    { id: '3', tarih: '2026-03-13', aciklama: 'Mağaza kirası', kategori: 'Kira', tur: 'gider', tutar: 8500, odemeYontemi: 'Banka Havale', faturaDurumu: 'ödendi' },
    { id: '4', tarih: '2026-03-12', aciklama: 'Toptan satış — Zeynep A.', kategori: 'Satış', tur: 'gelir', tutar: 2800, odemeYontemi: 'Havale', faturaDurumu: 'ödendi' },
    { id: '5', tarih: '2026-03-11', aciklama: 'Elektrik faturası', kategori: 'Fatura', tur: 'gider', tutar: 650, odemeYontemi: 'Otomatik Ödeme', faturaDurumu: 'ödendi' },
    { id: '6', tarih: '2026-03-10', aciklama: 'Hizmet bedeli — Fatma K.', kategori: 'Hizmet', tur: 'gelir', tutar: 1500, odemeYontemi: 'Nakit', faturaDurumu: 'ödendi' },
    { id: '7', tarih: '2026-03-09', aciklama: 'Hammadde alımı', kategori: 'Malzeme', tur: 'gider', tutar: 3200, odemeYontemi: 'Kredi Kartı', faturaDurumu: 'bekliyor' },
    { id: '8', tarih: '2026-03-08', aciklama: 'Online sipariş — Kaan Ç.', kategori: 'Satış', tur: 'gelir', tutar: 680, odemeYontemi: 'Kredi Kartı', faturaDurumu: 'ödendi' },
    { id: '9', tarih: '2026-03-05', aciklama: 'Personel maaşı', kategori: 'Personel', tur: 'gider', tutar: 12000, odemeYontemi: 'Banka Havale', faturaDurumu: 'ödendi' },
    { id: '10', tarih: '2026-03-03', aciklama: 'Danışmanlık hizmeti', kategori: 'Hizmet', tur: 'gelir', tutar: 3500, odemeYontemi: 'Havale', faturaDurumu: 'gecikmiş' },
]

const KATEGORI_EMOJI: Record<string, string> = {
    'Satış': '🛒', 'Hizmet': '🔧', 'Reklam': '📢', 'Kira': '🏠', 'Fatura': '⚡', 'Malzeme': '📦', 'Personel': '👤',
}

/* ═══════ Muhasebe Page ═══════ */
export default function MuhasebePage() {
    const [transactions, setTransactions] = useState<Transaction[]>(DEMO_TX)
    const [activeTab, setActiveTab] = useState<TabView>('all')
    const [period, setPeriod] = useState<Period>('buAy')
    const [showAddModal, setShowAddModal] = useState(false)
    const [newTx, setNewTx] = useState({ aciklama: '', kategori: 'Satış', tur: 'gelir' as 'gelir' | 'gider', tutar: '' })

    const filtered = activeTab === 'all' ? transactions : transactions.filter(t => t.tur === activeTab)

    const toplamGelir = transactions.filter(t => t.tur === 'gelir').reduce((s, t) => s + t.tutar, 0)
    const toplamGider = transactions.filter(t => t.tur === 'gider').reduce((s, t) => s + t.tutar, 0)
    const netKar = toplamGelir - toplamGider
    const bekleyenFatura = transactions.filter(t => t.faturaDurumu === 'bekliyor' || t.faturaDurumu === 'gecikmiş').reduce((s, t) => s + t.tutar, 0)

    // Category breakdown
    const giderKategorileri = transactions.filter(t => t.tur === 'gider').reduce((acc, t) => {
        acc[t.kategori] = (acc[t.kategori] || 0) + t.tutar
        return acc
    }, {} as Record<string, number>)

    const handleAddTx = () => {
        if (!newTx.aciklama.trim() || !newTx.tutar) return
        const tx: Transaction = {
            id: `new-${Date.now()}`, tarih: new Date().toISOString().split('T')[0],
            aciklama: newTx.aciklama, kategori: newTx.kategori, tur: newTx.tur,
            tutar: parseFloat(newTx.tutar), odemeYontemi: 'Manuel', faturaDurumu: 'ödendi',
        }
        setTransactions(prev => [tx, ...prev])
        setNewTx({ aciklama: '', kategori: 'Satış', tur: 'gelir', tutar: '' })
        setShowAddModal(false)
    }

    const FATURA_BADGE: Record<string, { l: string; bg: string; c: string }> = {
        'ödendi': { l: 'Ödendi', bg: '#dcfce7', c: '#166534' },
        'bekliyor': { l: 'Bekliyor', bg: '#fef3c7', c: '#92400e' },
        'gecikmiş': { l: 'Gecikmiş', bg: '#fee2e2', c: '#991b1b' },
    }

    return (
        <div style={{ maxWidth: 960 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>💰 Muhasebe</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Gelir, gider ve kâr/zarar takibi.</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <select value={period} onChange={e => setPeriod(e.target.value as Period)} style={{
                        padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)',
                        fontSize: 12, fontFamily: 'inherit', outline: 'none',
                    }}>
                        <option value="buAy">Bu Ay</option>
                        <option value="gecenAy">Geçen Ay</option>
                        <option value="3Ay">Son 3 Ay</option>
                        <option value="yil">Bu Yıl</option>
                    </select>
                    <button onClick={() => setShowAddModal(true)} style={{
                        padding: '9px 18px', borderRadius: 10, border: 'none',
                        background: '#dc4e1e', color: 'white', fontSize: 13, fontWeight: 700,
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>+ İşlem Ekle</button>
                </div>
            </div>

            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Toplam Gelir', value: `₺${toplamGelir.toLocaleString()}`, emoji: '📈', color: '#22c55e' },
                    { label: 'Toplam Gider', value: `₺${toplamGider.toLocaleString()}`, emoji: '📉', color: '#ef4444' },
                    { label: 'Net Kâr/Zarar', value: `${netKar >= 0 ? '+' : ''}₺${netKar.toLocaleString()}`, emoji: netKar >= 0 ? '✅' : '⚠️', color: netKar >= 0 ? '#22c55e' : '#ef4444' },
                    { label: 'Bekleyen Fatura', value: `₺${bekleyenFatura.toLocaleString()}`, emoji: '⏳', color: '#f59e0b' },
                ].map((k, i) => (
                    <div key={i} style={{
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 12, padding: '14px 16px',
                    }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: k.color }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* Mini P&L Bar Chart */}
            <div style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: 16, marginBottom: 20,
            }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>📊 Gelir vs Gider</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 60 }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{
                            width: '100%', borderRadius: 6, background: 'rgba(34,197,94,0.2)',
                            height: `${Math.round((toplamGelir / Math.max(toplamGelir, toplamGider)) * 50)}px`,
                            minHeight: 8,
                        }} />
                        <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700 }}>Gelir</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{
                            width: '100%', borderRadius: 6, background: 'rgba(239,68,68,0.2)',
                            height: `${Math.round((toplamGider / Math.max(toplamGelir, toplamGider)) * 50)}px`,
                            minHeight: 8,
                        }} />
                        <span style={{ fontSize: 10, color: '#ef4444', fontWeight: 700 }}>Gider</span>
                    </div>
                </div>
            </div>

            {/* Gider Breakdown */}
            <div style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: 16, marginBottom: 20,
            }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>🏷️ Gider Dağılımı</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {Object.entries(giderKategorileri).sort((a, b) => b[1] - a[1]).map(([kat, tutar]) => (
                        <div key={kat} style={{
                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6,
                        }}>
                            <span style={{ fontSize: 14 }}>{KATEGORI_EMOJI[kat] || '📄'}</span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{kat}</span>
                            <span style={{ fontSize: 12, fontWeight: 800, color: '#ef4444' }}>₺{tutar.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 10 }}>
                {([['all', 'Tümü'], ['gelir', '📈 Gelir'], ['gider', '📉 Gider']] as const).map(([key, label]) => (
                    <button key={key} onClick={() => setActiveTab(key)} style={{
                        padding: '6px 14px', borderRadius: 8, border: 'none',
                        background: activeTab === key ? 'rgba(220,70,30,0.15)' : 'transparent',
                        color: activeTab === key ? '#f97316' : 'rgba(255,255,255,0.4)',
                        fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}>{label}</button>
                ))}
            </div>

            {/* Transaction List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {filtered.map(tx => {
                    const fb = FATURA_BADGE[tx.faturaDurumu] || FATURA_BADGE['ödendi']
                    return (
                        <div key={tx.id} style={{
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 12, padding: '14px 16px',
                            display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                            {/* Category icon */}
                            <div style={{
                                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                background: tx.tur === 'gelir' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                            }}>{KATEGORI_EMOJI[tx.kategori] || '📄'}</div>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>{tx.aciklama}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'flex', gap: 8 }}>
                                    <span>{new Date(tx.tarih).toLocaleDateString('tr')}</span>
                                    <span>{tx.kategori}</span>
                                    <span>{tx.odemeYontemi}</span>
                                </div>
                            </div>

                            {/* Invoice badge */}
                            <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 5, background: fb.bg, color: fb.c, flexShrink: 0 }}>{fb.l}</span>

                            {/* Amount */}
                            <span style={{
                                fontSize: 15, fontWeight: 800, flexShrink: 0,
                                color: tx.tur === 'gelir' ? '#22c55e' : '#ef4444',
                            }}>{tx.tur === 'gelir' ? '+' : '-'}₺{tx.tutar.toLocaleString()}</span>
                        </div>
                    )
                })}
            </div>

            {/* ═══════ Add Transaction Modal ═══════ */}
            {showAddModal && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setShowAddModal(false)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 420, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }}
                        onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 16 }}>+ Yeni İşlem Ekle</h3>

                        {/* Type toggle */}
                        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                            {(['gelir', 'gider'] as const).map(tur => (
                                <button key={tur} onClick={() => setNewTx(p => ({ ...p, tur }))} style={{
                                    flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                                    background: newTx.tur === tur
                                        ? (tur === 'gelir' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)')
                                        : 'rgba(255,255,255,0.03)',
                                    color: newTx.tur === tur
                                        ? (tur === 'gelir' ? '#22c55e' : '#ef4444')
                                        : 'rgba(255,255,255,0.3)',
                                    fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                }}>{tur === 'gelir' ? '📈 Gelir' : '📉 Gider'}</button>
                            ))}
                        </div>

                        {/* Fields */}
                        {[
                            { key: 'aciklama', label: 'Açıklama', placeholder: 'Sipariş, fatura, maaş...' },
                            { key: 'tutar', label: 'Tutar (₺)', placeholder: '0.00', type: 'number' },
                        ].map(f => (
                            <div key={f.key} style={{ marginBottom: 12 }}>
                                <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const }}>{f.label}</label>
                                <input
                                    value={(newTx as any)[f.key]}
                                    onChange={e => setNewTx(prev => ({ ...prev, [f.key]: e.target.value }))}
                                    placeholder={f.placeholder}
                                    type={f.type || 'text'}
                                    style={{
                                        width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: 13, fontFamily: 'inherit',
                                        marginTop: 4, outline: 'none', boxSizing: 'border-box' as const,
                                    }} />
                            </div>
                        ))}

                        {/* Category */}
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const }}>Kategori</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                                {Object.entries(KATEGORI_EMOJI).map(([kat, emoji]) => (
                                    <button key={kat} onClick={() => setNewTx(p => ({ ...p, kategori: kat }))} style={{
                                        padding: '4px 10px', borderRadius: 6, border: newTx.kategori === kat ? 'none' : '1px solid rgba(255,255,255,0.08)',
                                        background: newTx.kategori === kat ? 'rgba(220,70,30,0.15)' : 'transparent',
                                        color: newTx.kategori === kat ? '#f97316' : 'rgba(255,255,255,0.35)',
                                        fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                                    }}>{emoji} {kat}</button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowAddModal(false)} style={{
                                padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                                background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                            }}>İptal</button>
                            <button onClick={handleAddTx} disabled={!newTx.aciklama.trim() || !newTx.tutar} style={{
                                padding: '8px 16px', borderRadius: 8, border: 'none', background: '#dc4e1e',
                                color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                            }}>Ekle</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
