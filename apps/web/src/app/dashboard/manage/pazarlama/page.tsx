'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface Campaign {
    id: string
    ad: string
    kanal: 'email' | 'whatsapp' | 'sms' | 'sosyal'
    durum: 'taslak' | 'aktif' | 'tamamlandi' | 'zamanlanmis'
    hedef: string
    gonderilen: number
    acilan: number
    tiklanan: number
    tarih: string
}

interface Segment {
    id: string
    ad: string
    emoji: string
    kisi: number
    tanim: string
}

const KANAL_ICON: Record<string, { emoji: string; label: string; color: string }> = {
    email: { emoji: '📧', label: 'E-posta', color: '#3b82f6' },
    whatsapp: { emoji: '💬', label: 'WhatsApp', color: '#25d366' },
    sms: { emoji: '📱', label: 'SMS', color: '#8b5cf6' },
    sosyal: { emoji: '📢', label: 'Sosyal Medya', color: '#f97316' },
}

/* ═══════ Demo Data ═══════ */
const DEMO_CAMPAIGNS: Campaign[] = [
    { id: '1', ad: 'Bahar İndirimi WhatsApp', kanal: 'whatsapp', durum: 'aktif', hedef: 'Tüm Müşteriler', gonderilen: 245, acilan: 198, tiklanan: 67, tarih: '2026-03-14' },
    { id: '2', ad: 'Yeni Ürün E-posta Duyurusu', kanal: 'email', durum: 'tamamlandi', hedef: 'VIP Müşteriler', gonderilen: 120, acilan: 89, tiklanan: 34, tarih: '2026-03-10' },
    { id: '3', ad: 'Haftalık Haber Bülteni', kanal: 'email', durum: 'zamanlanmis', hedef: 'Aboneler', gonderilen: 0, acilan: 0, tiklanan: 0, tarih: '2026-03-20' },
    { id: '4', ad: 'SMS Hatırlatma', kanal: 'sms', durum: 'taslak', hedef: 'Kayıp Risk', gonderilen: 0, acilan: 0, tiklanan: 0, tarih: '2026-03-16' },
    { id: '5', ad: 'Instagram Hikaye Kampanyası', kanal: 'sosyal', durum: 'aktif', hedef: 'Takipçiler', gonderilen: 1200, acilan: 0, tiklanan: 156, tarih: '2026-03-12' },
]

const DEMO_SEGMENTS: Segment[] = [
    { id: '1', ad: 'Tüm Müşteriler', emoji: '👥', kisi: 245, tanim: 'Tüm kayıtlı kişiler' },
    { id: '2', ad: 'VIP Müşteriler', emoji: '⭐', kisi: 18, tanim: '₺2.000+ harcayanlar' },
    { id: '3', ad: 'Yeni Müşteriler', emoji: '✨', kisi: 32, tanim: 'Son 30 gün içinde kaydolanlar' },
    { id: '4', ad: 'Kayıp Risk', emoji: '🚨', kisi: 15, tanim: '60+ gündür alışveriş yapmamışlar' },
    { id: '5', ad: 'Aboneler', emoji: '📬', kisi: 89, tanim: 'Bülten aboneleri' },
]

/* ═══════ Page ═══════ */
export default function PazarlamaPage() {
    const [campaigns, setCampaigns] = useState(DEMO_CAMPAIGNS)
    const [activeTab, setActiveTab] = useState<'all' | 'aktif' | 'taslak' | 'tamamlandi'>('all')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [newCampaign, setNewCampaign] = useState({ ad: '', kanal: 'whatsapp' as Campaign['kanal'], hedef: 'Tüm Müşteriler' })

    const filtered = activeTab === 'all' ? campaigns : campaigns.filter(c => c.durum === activeTab)

    const toplamGonderilen = campaigns.reduce((s, c) => s + c.gonderilen, 0)
    const toplamAcilan = campaigns.reduce((s, c) => s + c.acilan, 0)
    const toplamTiklanan = campaigns.reduce((s, c) => s + c.tiklanan, 0)
    const ortalamaAcilma = toplamGonderilen > 0 ? Math.round((toplamAcilan / toplamGonderilen) * 100) : 0

    const handleCreate = () => {
        if (!newCampaign.ad.trim()) return
        const c: Campaign = {
            id: `new-${Date.now()}`, ad: newCampaign.ad, kanal: newCampaign.kanal,
            durum: 'taslak', hedef: newCampaign.hedef, gonderilen: 0, acilan: 0, tiklanan: 0,
            tarih: new Date().toISOString().split('T')[0],
        }
        setCampaigns(prev => [c, ...prev])
        setNewCampaign({ ad: '', kanal: 'whatsapp', hedef: 'Tüm Müşteriler' })
        setShowCreateModal(false)
    }

    const DURUM_BADGE: Record<string, { l: string; bg: string; c: string }> = {
        aktif: { l: '🟢 Aktif', bg: '#dcfce7', c: '#166534' },
        taslak: { l: '📝 Taslak', bg: '#f1f5f9', c: '#475569' },
        tamamlandi: { l: '✅ Tamamlandı', bg: '#dbeafe', c: '#1e40af' },
        zamanlanmis: { l: '⏰ Zamanlanmış', bg: '#fef3c7', c: '#92400e' },
    }

    return (
        <div style={{ maxWidth: 960 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>📢 Pazarlama Otomasyonu</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>360° çok kanallı kampanya ve otomasyon yönetimi.</p>
                </div>
                <button onClick={() => setShowCreateModal(true)} style={{
                    padding: '9px 18px', borderRadius: 10, border: 'none',
                    background: '#dc4e1e', color: 'white', fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                }}>+ Kampanya Oluştur</button>
            </div>

            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Toplam Gönderim', value: toplamGonderilen.toLocaleString(), emoji: '📤' },
                    { label: 'Açılma Oranı', value: `%${ortalamaAcilma}`, emoji: '📬' },
                    { label: 'Tıklama', value: toplamTiklanan.toLocaleString(), emoji: '🖱️' },
                    { label: 'Aktif Kampanya', value: campaigns.filter(c => c.durum === 'aktif').length, emoji: '🟢' },
                ].map((k, i) => (
                    <div key={i} style={{
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 12, padding: '14px 16px',
                    }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* Channel Performance */}
            <div style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: 16, marginBottom: 20,
            }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>📊 Kanal Performansı</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {Object.entries(KANAL_ICON).map(([key, ch]) => {
                        const chCampaigns = campaigns.filter(c => c.kanal === key)
                        const sent = chCampaigns.reduce((s, c) => s + c.gonderilen, 0)
                        return (
                            <div key={key} style={{
                                background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px',
                                border: '1px solid rgba(255,255,255,0.04)', textAlign: 'center',
                            }}>
                                <div style={{ fontSize: 22, marginBottom: 4 }}>{ch.emoji}</div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: ch.color }}>{ch.label}</div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: 'white', marginTop: 4 }}>{sent.toLocaleString()}</div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>gönderim</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Audience Segments */}
            <div style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: 16, marginBottom: 20,
            }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>🎯 Hedef Kitle Segmentleri</div>
                <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                    {DEMO_SEGMENTS.map(seg => (
                        <div key={seg.id} style={{
                            minWidth: 140, background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '10px 14px',
                            border: '1px solid rgba(255,255,255,0.06)', flexShrink: 0,
                        }}>
                            <div style={{ fontSize: 20, marginBottom: 4 }}>{seg.emoji}</div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 2 }}>{seg.ad}</div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: '#dc4e1e' }}>{seg.kisi}</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{seg.tanim}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 10 }}>
                {([['all', 'Tümü'], ['aktif', '🟢 Aktif'], ['taslak', '📝 Taslak'], ['tamamlandi', '✅ Biten']] as const).map(([key, label]) => (
                    <button key={key} onClick={() => setActiveTab(key)} style={{
                        padding: '6px 14px', borderRadius: 8, border: 'none',
                        background: activeTab === key ? 'rgba(220,70,30,0.15)' : 'transparent',
                        color: activeTab === key ? '#f97316' : 'rgba(255,255,255,0.4)',
                        fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}>{label}</button>
                ))}
            </div>

            {/* Campaign List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {filtered.map(c => {
                    const ch = KANAL_ICON[c.kanal]
                    const db = DURUM_BADGE[c.durum]
                    const aRate = c.gonderilen > 0 ? Math.round((c.acilan / c.gonderilen) * 100) : 0
                    return (
                        <div key={c.id} style={{
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 12, padding: '14px 16px',
                            display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                                background: `${ch.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                            }}>{ch.emoji}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>{c.ad}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'flex', gap: 8 }}>
                                    <span>{ch.label}</span>
                                    <span>🎯 {c.hedef}</span>
                                    <span>{new Date(c.tarih).toLocaleDateString('tr')}</span>
                                </div>
                            </div>
                            {c.gonderilen > 0 && (
                                <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{c.gonderilen}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>gönderim</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: 14, fontWeight: 800, color: '#22c55e' }}>%{aRate}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>açılma</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: 14, fontWeight: 800, color: '#3b82f6' }}>{c.tiklanan}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>tıklama</div>
                                    </div>
                                </div>
                            )}
                            <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: db.bg, color: db.c, flexShrink: 0 }}>{db.l}</span>
                        </div>
                    )
                })}
            </div>

            {/* ═══════ Create Campaign Modal ═══════ */}
            {showCreateModal && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setShowCreateModal(false)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 440, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }}
                        onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 16 }}>📢 Yeni Kampanya Oluştur</h3>

                        {/* Name */}
                        <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Kampanya Adı</label>
                        <input value={newCampaign.ad} onChange={e => setNewCampaign(p => ({ ...p, ad: e.target.value }))}
                            placeholder="Yaz İndirimi, Yeni Ürün Duyurusu..."
                            style={{
                                width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: 13, fontFamily: 'inherit',
                                marginTop: 4, marginBottom: 14, outline: 'none', boxSizing: 'border-box',
                            }} />

                        {/* Channel */}
                        <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Kanal</label>
                        <div style={{ display: 'flex', gap: 6, marginTop: 6, marginBottom: 14 }}>
                            {Object.entries(KANAL_ICON).map(([key, ch]) => (
                                <button key={key} onClick={() => setNewCampaign(p => ({ ...p, kanal: key as Campaign['kanal'] }))} style={{
                                    flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
                                    background: newCampaign.kanal === key ? `${ch.color}20` : 'rgba(255,255,255,0.03)',
                                    color: newCampaign.kanal === key ? ch.color : 'rgba(255,255,255,0.3)',
                                    fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                                }}>
                                    <span style={{ fontSize: 18 }}>{ch.emoji}</span>
                                    {ch.label}
                                </button>
                            ))}
                        </div>

                        {/* Audience */}
                        <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Hedef Kitle</label>
                        <select value={newCampaign.hedef} onChange={e => setNewCampaign(p => ({ ...p, hedef: e.target.value }))}
                            style={{
                                width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: 13, fontFamily: 'inherit',
                                marginTop: 4, marginBottom: 16, outline: 'none',
                            }}>
                            {DEMO_SEGMENTS.map(s => (
                                <option key={s.id} value={s.ad}>{s.emoji} {s.ad} ({s.kisi} kişi)</option>
                            ))}
                        </select>

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowCreateModal(false)} style={{
                                padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                                background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                            }}>İptal</button>
                            <button onClick={handleCreate} disabled={!newCampaign.ad.trim()} style={{
                                padding: '8px 16px', borderRadius: 8, border: 'none', background: '#dc4e1e',
                                color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                            }}>Oluştur</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
