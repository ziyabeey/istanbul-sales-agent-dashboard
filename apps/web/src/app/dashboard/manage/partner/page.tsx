'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface Partner {
    id: string
    ad: string
    email: string
    referansKodu: string
    yonlendirme: number
    donus: number
    komisyon: number
    toplamKazanc: number
    seviye: 'baslangic' | 'gumus' | 'altin' | 'platin'
    katilimTarihi: string
    aktif: boolean
}

interface Referral {
    id: string
    partnerId: string
    partnerAd: string
    musteriAd: string
    tarih: string
    paket: string
    komisyon: number
    durum: 'bekliyor' | 'onaylandi' | 'odendi'
}

const SEVIYE_CONFIG: Record<string, { emoji: string; label: string; color: string; oran: string }> = {
    baslangic: { emoji: '🌱', label: 'Başlangıç', color: '#22c55e', oran: '%15' },
    gumus: { emoji: '🥈', label: 'Gümüş', color: '#94a3b8', oran: '%20' },
    altin: { emoji: '🥇', label: 'Altın', color: '#f59e0b', oran: '%25' },
    platin: { emoji: '💎', label: 'Platin', color: '#8b5cf6', oran: '%30' },
}

const DEMO_PARTNERS: Partner[] = [
    { id: '1', ad: 'Dijital Ajans Pro', email: 'info@ajans.com', referansKodu: 'DAP2026', yonlendirme: 28, donus: 12, komisyon: 25, toplamKazanc: 8400, seviye: 'altin', katilimTarihi: '2025-06-10', aktif: true },
    { id: '2', ad: 'Web Ustası Mehmet', email: 'mehmet@web.com', referansKodu: 'WUM2026', yonlendirme: 45, donus: 22, komisyon: 30, toplamKazanc: 15600, seviye: 'platin', katilimTarihi: '2025-03-20', aktif: true },
    { id: '3', ad: 'E-Ticaret Danışmanı', email: 'danisman@e.com', referansKodu: 'ETD2026', yonlendirme: 8, donus: 3, komisyon: 15, toplamKazanc: 1200, seviye: 'baslangic', katilimTarihi: '2026-01-15', aktif: true },
    { id: '4', ad: 'Sosyal Medya Lab', email: 'lab@sosyal.com', referansKodu: 'SML2026', yonlendirme: 15, donus: 7, komisyon: 20, toplamKazanc: 4200, seviye: 'gumus', katilimTarihi: '2025-09-01', aktif: true },
]

const DEMO_REFERRALS: Referral[] = [
    { id: '1', partnerId: '2', partnerAd: 'Web Ustası Mehmet', musteriAd: 'Kafe Nostaljik', tarih: '2026-03-15', paket: 'Business', komisyon: 450, durum: 'onaylandi' },
    { id: '2', partnerId: '1', partnerAd: 'Dijital Ajans Pro', musteriAd: 'Berber Studio', tarih: '2026-03-12', paket: 'Premium', komisyon: 750, durum: 'odendi' },
    { id: '3', partnerId: '2', partnerAd: 'Web Ustası Mehmet', musteriAd: 'Güzellik Merkezi', tarih: '2026-03-10', paket: 'Business', komisyon: 450, durum: 'odendi' },
    { id: '4', partnerId: '4', partnerAd: 'Sosyal Medya Lab', musteriAd: 'Restoran Lezzet', tarih: '2026-03-08', paket: 'Enterprise', komisyon: 1200, durum: 'bekliyor' },
    { id: '5', partnerId: '3', partnerAd: 'E-Ticaret Danışmanı', musteriAd: 'Eczane Plus', tarih: '2026-03-05', paket: 'Starter', komisyon: 200, durum: 'onaylandi' },
]

export default function PartnerPage() {
    const [activeTab, setActiveTab] = useState<'genel' | 'partnerler' | 'referanslar'>('genel')

    const toplamPartner = DEMO_PARTNERS.length
    const toplamYonlendirme = DEMO_PARTNERS.reduce((s, p) => s + p.yonlendirme, 0)
    const toplamDonus = DEMO_PARTNERS.reduce((s, p) => s + p.donus, 0)
    const toplamKomisyon = DEMO_PARTNERS.reduce((s, p) => s + p.toplamKazanc, 0)
    const donusOrani = toplamYonlendirme > 0 ? Math.round((toplamDonus / toplamYonlendirme) * 100) : 0

    return (
        <div style={{ maxWidth: 960 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>🤝 Partner Programı</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Referans programı, komisyon takibi ve partner yönetimi.</p>
                </div>
                <button style={{ padding: '9px 18px', borderRadius: 10, border: 'none', background: '#dc4e1e', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ Partner Davet Et</button>
            </div>

            {/* KPI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 24 }}>
                {[
                    { label: 'Partner', value: toplamPartner, emoji: '🤝' },
                    { label: 'Yönlendirme', value: toplamYonlendirme, emoji: '📤' },
                    { label: 'Dönüşüm', value: toplamDonus, emoji: '✅' },
                    { label: 'Dönüşüm Oranı', value: `%${donusOrani}`, emoji: '📊' },
                    { label: 'Toplam Komisyon', value: `₺${toplamKomisyon.toLocaleString()}`, emoji: '💰' },
                ].map((k, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 14px' }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 4 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* Commission Tiers */}
            <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(245,158,11,0.04))', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 14, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 10 }}>🎯 Komisyon Seviyeleri</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {Object.entries(SEVIYE_CONFIG).map(([key, s]) => (
                        <div key={key} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                            <div style={{ fontSize: 22, marginBottom: 2 }}>{s.emoji}</div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.label}</div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: 'white', marginTop: 2 }}>{s.oran}</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>komisyon</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 10 }}>
                {([['genel', '📊 Genel'], ['partnerler', '🤝 Partnerler'], ['referanslar', '📤 Referanslar']] as const).map(([key, label]) => (
                    <button key={key} onClick={() => setActiveTab(key)} style={{
                        padding: '6px 14px', borderRadius: 8, border: 'none',
                        background: activeTab === key ? 'rgba(220,70,30,0.15)' : 'transparent',
                        color: activeTab === key ? '#f97316' : 'rgba(255,255,255,0.4)',
                        fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}>{label}</button>
                ))}
            </div>

            {/* Partners List */}
            {(activeTab === 'genel' || activeTab === 'partnerler') && (
                <div style={{ marginBottom: activeTab === 'genel' ? 20 : 0 }}>
                    {activeTab === 'genel' && <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 10 }}>🏆 En İyi Partnerler</div>}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {DEMO_PARTNERS.sort((a, b) => b.toplamKazanc - a.toplamKazanc).map(p => {
                            const s = SEVIYE_CONFIG[p.seviye]
                            return (
                                <div key={p.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{s.emoji}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>{p.ad}</div>
                                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'flex', gap: 8 }}>
                                            <span>📤 {p.yonlendirme} yönlendirme</span>
                                            <span>✅ {p.donus} dönüşüm</span>
                                            <span>🔑 {p.referansKodu}</span>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: `${s.color}15`, color: s.color }}>{s.label} · %{p.komisyon}</span>
                                    <span style={{ fontSize: 14, fontWeight: 800, color: '#22c55e' }}>₺{p.toplamKazanc.toLocaleString()}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Referrals List */}
            {(activeTab === 'genel' || activeTab === 'referanslar') && (
                <div>
                    {activeTab === 'genel' && <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 10, marginTop: 8 }}>📋 Son Referanslar</div>}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {DEMO_REFERRALS.map(r => {
                            const badge = r.durum === 'odendi' ? { l: '💸 Ödendi', bg: '#dcfce7', c: '#166534' } : r.durum === 'onaylandi' ? { l: '✅ Onaylandı', bg: '#dbeafe', c: '#1e40af' } : { l: '⏳ Bekliyor', bg: '#fef3c7', c: '#92400e' }
                            return (
                                <div key={r.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>{r.musteriAd}</div>
                                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                                            👤 {r.partnerAd} · 📦 {r.paket} · {new Date(r.tarih).toLocaleDateString('tr')}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: badge.bg, color: badge.c }}>{badge.l}</span>
                                    <span style={{ fontSize: 13, fontWeight: 800, color: '#22c55e' }}>₺{r.komisyon}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
