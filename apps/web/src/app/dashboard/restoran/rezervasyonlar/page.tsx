'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface Reservation {
    id: string
    musteri: string
    telefon: string
    tarih: string
    saat: string
    kisiSayisi: number
    masa: string
    durum: 'onaylandi' | 'bekliyor' | 'iptal' | 'tamamlandi'
    notlar: string
}

const DEMO_RES: Reservation[] = [
    { id: '1', musteri: 'Ahmet Yılmaz', telefon: '0532 123 45 67', tarih: '2026-03-17', saat: '19:30', kisiSayisi: 4, masa: 'Masa 5', durum: 'onaylandi', notlar: 'Pencere kenarı tercih' },
    { id: '2', musteri: 'Fatma Kaya', telefon: '0542 987 65 43', tarih: '2026-03-17', saat: '20:00', kisiSayisi: 2, masa: 'Masa 3', durum: 'bekliyor', notlar: '' },
    { id: '3', musteri: 'Mehmet Demir', telefon: '0555 111 22 33', tarih: '2026-03-17', saat: '21:00', kisiSayisi: 6, masa: 'VIP Salon', durum: 'onaylandi', notlar: 'Doğum günü kutlaması' },
    { id: '4', musteri: 'Zeynep Aktaş', telefon: '0533 444 55 66', tarih: '2026-03-18', saat: '12:30', kisiSayisi: 3, masa: 'Bahçe 2', durum: 'bekliyor', notlar: 'Bebek sandalyesi' },
    { id: '5', musteri: 'Ali Özcan', telefon: '0546 999 88 77', tarih: '2026-03-16', saat: '20:30', kisiSayisi: 2, masa: 'Masa 1', durum: 'tamamlandi', notlar: '' },
    { id: '6', musteri: 'Ayşe Yıldız', telefon: '0530 222 33 44', tarih: '2026-03-16', saat: '19:00', kisiSayisi: 8, masa: 'Büyük Masa', durum: 'iptal', notlar: 'Müşteri iptal etti' },
]

const DURUM: Record<string, { l: string; bg: string; c: string }> = {
    onaylandi: { l: '✅ Onaylandı', bg: '#dcfce7', c: '#166534' },
    bekliyor: { l: '⏳ Bekliyor', bg: '#fef3c7', c: '#92400e' },
    iptal: { l: '❌ İptal', bg: '#fee2e2', c: '#991b1b' },
    tamamlandi: { l: '🏁 Tamamlandı', bg: '#f1f5f9', c: '#475569' },
}

export default function RezervasyonPage() {
    const [reservations, setReservations] = useState(DEMO_RES)
    const [filter, setFilter] = useState<'all' | 'bugun' | 'yarin'>('bugun')
    const [showAdd, setShowAdd] = useState(false)
    const [newRes, setNewRes] = useState({ musteri: '', telefon: '', saat: '19:00', kisiSayisi: '2', masa: '' })

    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
    const filtered = filter === 'all' ? reservations : filter === 'bugun' ? reservations.filter(r => r.tarih === today) : reservations.filter(r => r.tarih === tomorrow)

    const bugunCount = reservations.filter(r => r.tarih === today && r.durum !== 'iptal').length
    const bekleyenCount = reservations.filter(r => r.durum === 'bekliyor').length
    const toplamKisi = reservations.filter(r => r.tarih === today && r.durum === 'onaylandi').reduce((s, r) => s + r.kisiSayisi, 0)

    const handleApprove = (id: string) => setReservations(prev => prev.map(r => r.id === id ? { ...r, durum: 'onaylandi' as const } : r))
    const handleCancel = (id: string) => setReservations(prev => prev.map(r => r.id === id ? { ...r, durum: 'iptal' as const } : r))

    const handleAdd = () => {
        if (!newRes.musteri.trim()) return
        const r: Reservation = {
            id: `new-${Date.now()}`, musteri: newRes.musteri, telefon: newRes.telefon,
            tarih: today, saat: newRes.saat, kisiSayisi: parseInt(newRes.kisiSayisi) || 2,
            masa: newRes.masa || 'Atanmadı', durum: 'onaylandi', notlar: '',
        }
        setReservations(prev => [r, ...prev])
        setNewRes({ musteri: '', telefon: '', saat: '19:00', kisiSayisi: '2', masa: '' })
        setShowAdd(false)
    }

    return (
        <div style={{ maxWidth: 900 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>🍽️ Rezervasyonlar</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Masa rezervasyonlarını yönetin.</p>
                </div>
                <button onClick={() => setShowAdd(true)} style={{ padding: '9px 18px', borderRadius: 10, border: 'none', background: '#dc4e1e', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ Rezervasyon</button>
            </div>

            {/* KPI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Bugün', value: bugunCount, emoji: '📅' },
                    { label: 'Bekleyen', value: bekleyenCount, emoji: '⏳' },
                    { label: 'Beklenen Kişi', value: toplamKisi, emoji: '👥' },
                ].map((k, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px' }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 10 }}>
                {([['bugun', '📅 Bugün'], ['yarin', '📆 Yarın'], ['all', '📋 Tümü']] as const).map(([key, label]) => (
                    <button key={key} onClick={() => setFilter(key)} style={{
                        padding: '6px 14px', borderRadius: 8, border: 'none',
                        background: filter === key ? 'rgba(220,70,30,0.15)' : 'transparent',
                        color: filter === key ? '#f97316' : 'rgba(255,255,255,0.4)',
                        fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}>{label}</button>
                ))}
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {filtered.map(r => {
                    const d = DURUM[r.durum]
                    return (
                        <div key={r.id} style={{
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                            <div style={{ width: 44, textAlign: 'center', flexShrink: 0 }}>
                                <div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{r.saat}</div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{r.kisiSayisi} kişi</div>
                            </div>
                            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.06)' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>{r.musteri}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'flex', gap: 8 }}>
                                    <span>{r.masa}</span>
                                    {r.notlar && <span>📝 {r.notlar}</span>}
                                </div>
                            </div>
                            <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: d.bg, color: d.c, flexShrink: 0 }}>{d.l}</span>
                            {r.durum === 'bekliyor' && (
                                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                                    <button onClick={() => handleApprove(r.id)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: 'rgba(34,197,94,0.15)', color: '#22c55e', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✓ Onayla</button>
                                    <button onClick={() => handleCancel(r.id)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✕ İptal</button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Add Modal */}
            {showAdd && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowAdd(false)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 400, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 16 }}>🍽️ Yeni Rezervasyon</h3>
                        {[
                            { k: 'musteri', l: 'Müşteri Adı', p: 'Ad Soyad' },
                            { k: 'telefon', l: 'Telefon', p: '0532...' },
                            { k: 'saat', l: 'Saat', p: '19:00' },
                            { k: 'kisiSayisi', l: 'Kişi Sayısı', p: '2' },
                            { k: 'masa', l: 'Masa', p: 'Masa 1, VIP...' },
                        ].map(f => (
                            <div key={f.k} style={{ marginBottom: 10 }}>
                                <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const }}>{f.l}</label>
                                <input value={(newRes as any)[f.k]} onChange={e => setNewRes(p => ({ ...p, [f.k]: e.target.value }))} placeholder={f.p}
                                    style={{ width: '100%', padding: '7px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: 13, fontFamily: 'inherit', marginTop: 3, outline: 'none', boxSizing: 'border-box' as const }} />
                            </div>
                        ))}
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 14 }}>
                            <button onClick={() => setShowAdd(false)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>İptal</button>
                            <button onClick={handleAdd} disabled={!newRes.musteri.trim()} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#dc4e1e', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Kaydet</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
