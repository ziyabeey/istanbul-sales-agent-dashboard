'use client'

import { useState } from 'react'

/* ═══════ Demo Data ═══════ */
interface Campaign { id: string; platform: string; pIcon: string; pColor: string; name: string; budget: number; spent: number; impressions: number; clicks: number; conversions: number; status: 'active' | 'paused' }

const CAMPAIGNS: Campaign[] = [
    { id: 'c1', platform: 'Meta', pIcon: '📘', pColor: '#1877F2', name: 'Kadıköy Yerel Hedefleme', budget: 100000, spent: 67300, impressions: 14200, clicks: 890, conversions: 45, status: 'active' },
    { id: 'c2', platform: 'Meta', pIcon: '📘', pColor: '#1877F2', name: 'Retarget — Sepet Terk', budget: 50000, spent: 32100, impressions: 8400, clicks: 620, conversions: 38, status: 'active' },
    { id: 'c3', platform: 'Google', pIcon: '🔍', pColor: '#4285F4', name: 'Arama — "kadıköy berber"', budget: 80000, spent: 55200, impressions: 9800, clicks: 720, conversions: 52, status: 'active' },
    { id: 'c4', platform: 'TikTok', pIcon: '🎵', pColor: '#FF0050', name: 'Saç Transformasyon Video', budget: 30000, spent: 18400, impressions: 42000, clicks: 1200, conversions: 15, status: 'paused' },
]

const AUDIENCES = [
    { type: 'site_visitors', label: 'Site Ziyaretçileri', desc: 'Son 30 gün', icon: '🌐', size: 2840, status: 'ready' },
    { type: 'cart_abandoners', label: 'Sepet Terk Edenler', desc: 'AddToCart ✓ Purchase ✗', icon: '🛒', size: 342, status: 'ready' },
    { type: 'past_customers', label: 'Eski Müşteriler', desc: '30+ gün gelmemiş', icon: '👤', size: 567, status: 'building' },
    { type: 'lookalike', label: 'Benzer Kitle', desc: 'En iyi müşterilere benzer', icon: '👥', size: 12400, status: 'ready' },
]

const KPIS = [
    { label: 'Aylık Bütçe', value: '₺2,600', icon: '💰', color: '#f59e0b' },
    { label: 'Harcanan', value: '₺1,730', icon: '📊', color: '#3B82F6' },
    { label: 'Toplam Dönüşüm', value: '150', icon: '🎯', color: '#22c55e' },
    { label: 'Ort. ROAS', value: '4.2x', icon: '📈', color: '#8B5CF6' },
]

const fmt = (k: number) => `₺${(k / 100).toLocaleString('tr-TR', { minimumFractionDigits: 0 })}`

export default function PazarlamaCAPIPage() {
    const [tab, setTab] = useState<'campaigns' | 'audiences' | 'capi'>('campaigns')

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ marginBottom: 16 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>📢 360° Pazarlama</h1>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Meta CAPI · Retarget · Bütçe yönetimi · %10-15 komisyon</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
                {KPIS.map(k => (
                    <div key={k.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                        <div style={{ fontSize: 16, marginBottom: 2 }}>{k.icon}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: k.color }}>{k.value}</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{k.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {([{ id: 'campaigns' as const, label: '📊 Kampanyalar' }, { id: 'audiences' as const, label: '👥 Kitleler' }, { id: 'capi' as const, label: '🔌 CAPI' }]).map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: tab === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                        color: tab === t.id ? '#f97316' : 'rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.label}</button>
                ))}
            </div>

            {tab === 'campaigns' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {CAMPAIGNS.map(c => {
                        const ctr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(1) : '0'
                        const pct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0
                        return (
                            <div key={c.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <span style={{ fontSize: 14 }}>{c.pIcon}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{c.name}</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{c.platform}</div>
                                    </div>
                                    <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: c.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: c.status === 'active' ? '#22c55e' : '#f59e0b' }}>{c.status === 'active' ? 'Aktif' : 'Duraklatıldı'}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                                        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 2, background: c.pColor }} />
                                    </div>
                                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{fmt(c.spent)}/{fmt(c.budget)}</span>
                                </div>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    {[{ l: 'Gösterim', v: c.impressions.toLocaleString() }, { l: 'Tıklama', v: c.clicks.toLocaleString() }, { l: 'CTR', v: `%${ctr}` }, { l: 'Dönüşüm', v: String(c.conversions) }].map(m => (
                                        <div key={m.l}><div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{m.v}</div><div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>{m.l}</div></div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {tab === 'audiences' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {AUDIENCES.map(a => (
                        <div key={a.type} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 20 }}>{a.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{a.label}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{a.desc}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 14, fontWeight: 800, color: '#3B82F6' }}>{a.size.toLocaleString()}</div>
                                <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: a.status === 'ready' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: a.status === 'ready' ? '#22c55e' : '#f59e0b' }}>{a.status === 'ready' ? 'Hazır' : 'Hazırlanıyor'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'capi' && (
                <div style={{ maxWidth: 520 }}>
                    <div style={{ background: 'rgba(24,119,242,0.06)', border: '1px solid rgba(24,119,242,0.15)', borderRadius: 12, padding: 14, marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1877F2', marginBottom: 4 }}>🔌 Meta Conversions API</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Server-side tracking + Pixel dedup via event_id</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {[
                            { event: 'Purchase', count: 150, last: '2dk' },
                            { event: 'AddToCart', count: 420, last: '5dk' },
                            { event: 'ViewContent', count: 2840, last: '1dk' },
                            { event: 'Lead', count: 89, last: '15dk' },
                            { event: 'InitiateCheckout', count: 234, last: '8dk' },
                        ].map(e => (
                            <div key={e.event} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 5px', borderRadius: 3, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>✓</span>
                                <span style={{ fontSize: 11, fontWeight: 700, color: 'white', fontFamily: 'monospace', flex: 1 }}>{e.event}</span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6' }}>{e.count}</span>
                                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{e.last}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
