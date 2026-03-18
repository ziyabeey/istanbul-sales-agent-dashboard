'use client'

import { useState } from 'react'

/* ═══════ Demo Data ═══════ */
interface DemoSupplier { id: string; name: string; contact: string; method: string; rating: number; onTime: number; quality: number; terms: string; products: number }

const SUPPLIERS: DemoSupplier[] = [
    { id: 's1', name: 'Wella Türkiye', contact: 'Ahmet B.', method: '📧 Email', rating: 4.8, onTime: 96, quality: 92, terms: 'Net 30', products: 24 },
    { id: 's2', name: 'L\'Oréal Pro', contact: 'Fatma K.', method: '🌐 Portal', rating: 4.6, onTime: 94, quality: 95, terms: 'Net 30', products: 18 },
    { id: 's3', name: 'Karaca Kuaför', contact: 'Murat D.', method: '💬 WhatsApp', rating: 4.2, onTime: 88, quality: 78, terms: 'Kapıda', products: 12 },
    { id: 's4', name: 'ProClean Kozmetik', contact: 'Selin Y.', method: '📧 Email', rating: 4.5, onTime: 91, quality: 85, terms: 'Net 15', products: 8 },
]

interface DemoPO { id: string; supplier: string; items: number; total: number; status: string; statusColor: string; statusIcon: string; date: string }

const POS: DemoPO[] = [
    { id: 'po1', supplier: 'Wella Türkiye', items: 5, total: 284000, status: 'Kargoda', statusColor: '#F59E0B', statusIcon: '🚚', date: '15 Mar' },
    { id: 'po2', supplier: 'L\'Oréal Pro', items: 3, total: 156000, status: 'Onaylandı', statusColor: '#8B5CF6', statusIcon: '✅', date: '16 Mar' },
    { id: 'po3', supplier: 'Karaca Kuaför', items: 8, total: 92000, status: 'Gönderildi', statusColor: '#3B82F6', statusIcon: '📤', date: '17 Mar' },
    { id: 'po4', supplier: 'Wella Türkiye', items: 2, total: 45000, status: 'Teslim', statusColor: '#22C55E', statusIcon: '📦', date: '10 Mar' },
]

const ALERTS = [
    { product: 'Saç Boyası No:7', stock: 3, rop: 8, supplier: 'Wella', urgent: true },
    { product: 'Şampuan 1L', stock: 5, rop: 10, supplier: 'L\'Oréal', urgent: true },
    { product: 'Tarak Seti', stock: 12, rop: 15, supplier: 'Karaca', urgent: false },
]

const KPIS = [
    { label: 'Aktif Tedarikçi', value: '4', icon: '🏭', color: '#3B82F6' },
    { label: 'Açık Siparişler', value: '3', icon: '📋', color: '#F59E0B' },
    { label: 'Bu Ay Tedarik', value: '₺5,770', icon: '💰', color: '#8B5CF6' },
    { label: 'Zamanında Teslim', value: '%92', icon: '⏱️', color: '#22C55E' },
]

const fmt = (k: number) => `₺${(k / 100).toLocaleString('tr-TR', { minimumFractionDigits: 0 })}`

export default function TedarikPage() {
    const [tab, setTab] = useState<'suppliers' | 'orders' | 'alerts'>('alerts')

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ marginBottom: 16 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🏭 B2B Tedarik</h1>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Otomatik sipariş · Reorder point · Tedarikçi skorlama · PO yönetimi</p>
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
                {([{ id: 'alerts' as const, label: '⚠️ Stok Uyarıları' }, { id: 'orders' as const, label: '📋 Siparişler' }, { id: 'suppliers' as const, label: '🏭 Tedarikçiler' }]).map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: tab === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                        color: tab === t.id ? '#f97316' : 'rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.label}</button>
                ))}
            </div>

            {/* ═══ ALERTS TAB ═══ */}
            {tab === 'alerts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {ALERTS.map((a, i) => (
                        <div key={i} style={{ background: a.urgent ? 'rgba(239,68,68,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${a.urgent ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 16 }}>{a.urgent ? '🔴' : '🟡'}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{a.product}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Stok: <span style={{ color: a.urgent ? '#EF4444' : '#F59E0B', fontWeight: 700 }}>{a.stock}</span> / ROP: {a.rop} · Tercih: {a.supplier}</div>
                            </div>
                            <button style={{ padding: '5px 10px', borderRadius: 6, border: 'none', background: a.urgent ? '#EF4444' : '#F59E0B', color: 'white', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>🛒 Sipariş Ver</button>
                        </div>
                    ))}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 12px', marginTop: 4 }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>📊 Reorder Point Formülü</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginTop: 4 }}>ROP = (Ort. Günlük Talep × Teslim Süresi) + EmniYet Stoğu<br />Emniyet = Z(1.65) × σ × √(Teslim Süresi) → %95 servis</div>
                    </div>
                </div>
            )}

            {/* ═══ ORDERS TAB ═══ */}
            {tab === 'orders' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {POS.map(po => (
                        <div key={po.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 14 }}>{po.statusIcon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{po.supplier}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{po.items} kalem · 📅 {po.date}</div>
                            </div>
                            <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: `${po.statusColor}15`, color: po.statusColor }}>{po.status}</span>
                            <span style={{ fontSize: 13, fontWeight: 800, color: '#8B5CF6' }}>{fmt(po.total)}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* ═══ SUPPLIERS TAB ═══ */}
            {tab === 'suppliers' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {SUPPLIERS.map(s => (
                        <div key={s.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{s.name}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{s.contact} · {s.method} · {s.terms} · {s.products} ürün</div>
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 800, color: '#F59E0B' }}>⭐{s.rating}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                {[{ l: 'Zamanında', v: `%${s.onTime}`, c: s.onTime > 90 ? '#22C55E' : '#F59E0B' }, { l: 'Kalite', v: String(s.quality), c: s.quality > 85 ? '#22C55E' : '#F59E0B' }].map(m => (
                                    <div key={m.l}><div style={{ fontSize: 12, fontWeight: 700, color: m.c }}>{m.v}</div><div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>{m.l}</div></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
