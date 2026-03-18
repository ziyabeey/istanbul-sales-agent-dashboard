'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface LoyaltyMember {
    id: string
    ad: string
    telefon: string
    puan: number
    seviye: 'bronz' | 'gumus' | 'altin' | 'platin'
    sonZiyaret: string
    toplamHarcama: number
    ziyaretSayisi: number
}

const SEVIYE: Record<string, { emoji: string; label: string; color: string; min: number }> = {
    bronz: { emoji: '🥉', label: 'Bronz', color: '#cd7f32', min: 0 },
    gumus: { emoji: '🥈', label: 'Gümüş', color: '#94a3b8', min: 500 },
    altin: { emoji: '🥇', label: 'Altın', color: '#f59e0b', min: 1500 },
    platin: { emoji: '💎', label: 'Platin', color: '#8b5cf6', min: 5000 },
}

const DEMO_MEMBERS: LoyaltyMember[] = [
    { id: '1', ad: 'Ayşe Yıldız', telefon: '0530 222 33 44', puan: 5200, seviye: 'platin', sonZiyaret: '2026-03-16', toplamHarcama: 12500, ziyaretSayisi: 45 },
    { id: '2', ad: 'Ahmet Yılmaz', telefon: '0532 123 45 67', puan: 2100, seviye: 'altin', sonZiyaret: '2026-03-14', toplamHarcama: 6800, ziyaretSayisi: 28 },
    { id: '3', ad: 'Fatma Kaya', telefon: '0542 987 65 43', puan: 800, seviye: 'gumus', sonZiyaret: '2026-03-10', toplamHarcama: 2400, ziyaretSayisi: 12 },
    { id: '4', ad: 'Mehmet Demir', telefon: '0555 111 22 33', puan: 250, seviye: 'bronz', sonZiyaret: '2026-03-08', toplamHarcama: 850, ziyaretSayisi: 5 },
    { id: '5', ad: 'Zeynep Aktaş', telefon: '0533 444 55 66', puan: 1600, seviye: 'altin', sonZiyaret: '2026-03-15', toplamHarcama: 4200, ziyaretSayisi: 20 },
]

const REWARDS = [
    { id: '1', ad: 'Ücretsiz Çay/Kahve', puan: 100, emoji: '☕' },
    { id: '2', ad: '%10 İndirim', puan: 250, emoji: '🏷️' },
    { id: '3', ad: 'Ücretsiz Tatlı', puan: 500, emoji: '🍰' },
    { id: '4', ad: '%25 İndirim', puan: 1000, emoji: '🎉' },
    { id: '5', ad: 'VIP Deneyim', puan: 2500, emoji: '⭐' },
]

export default function SadakatPage() {
    const [members] = useState(DEMO_MEMBERS)
    const [showRewards, setShowRewards] = useState(false)

    const toplamUye = members.length
    const platinCount = members.filter(m => m.seviye === 'platin').length
    const toplamPuan = members.reduce((s, m) => s + m.puan, 0)

    return (
        <div style={{ maxWidth: 900 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>🏆 Sadakat Programı</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Müşteri sadakati ve puan sistemi.</p>
                </div>
                <button onClick={() => setShowRewards(true)} style={{ padding: '9px 18px', borderRadius: 10, border: '1px solid rgba(168,85,247,0.3)', background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(245,158,11,0.1))', color: '#c084fc', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>🎁 Ödüller</button>
            </div>

            {/* KPI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Toplam Üye', value: toplamUye, emoji: '👥' },
                    { label: 'Platin Üye', value: platinCount, emoji: '💎' },
                    { label: 'Toplam Puan', value: toplamPuan.toLocaleString(), emoji: '⭐' },
                ].map((k, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px' }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* Tier Distribution */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>📊 Seviye Dağılımı</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {Object.entries(SEVIYE).map(([key, s]) => {
                        const count = members.filter(m => m.seviye === key).length
                        return (
                            <div key={key} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
                                <div style={{ fontSize: 22, marginBottom: 2 }}>{s.emoji}</div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.label}</div>
                                <div style={{ fontSize: 18, fontWeight: 800, color: 'white', marginTop: 2 }}>{count}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Members */}
            <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>👥 Üyeler</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {members.map(m => {
                    const s = SEVIYE[m.seviye]
                    return (
                        <div key={m.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{s.emoji}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>{m.ad}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'flex', gap: 8 }}>
                                    <span>{m.ziyaretSayisi} ziyaret</span>
                                    <span>₺{m.toplamHarcama.toLocaleString()}</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontSize: 15, fontWeight: 800, color: s.color }}>⭐ {m.puan.toLocaleString()}</div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{s.label} Üye</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Rewards Modal */}
            {showRewards && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowRewards(false)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 400, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 16 }}>🎁 Ödül Kataloğu</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {REWARDS.map(r => (
                                <div key={r.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span style={{ fontSize: 22 }}>{r.emoji}</span>
                                    <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'white' }}>{r.ad}</span>
                                    <span style={{ fontSize: 12, fontWeight: 800, color: '#f59e0b' }}>⭐ {r.puan}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
