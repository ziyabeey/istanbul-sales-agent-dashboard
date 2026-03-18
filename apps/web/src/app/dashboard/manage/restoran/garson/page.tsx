'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface WaiterOrder {
    id: string; table: number; status: 'ready' | 'delivered'
    items: string[]; preparedAt: number; deliveredAt?: number
}

interface WaiterStat { label: string; value: string; icon: string; color: string }

const DEMO_ORDERS: WaiterOrder[] = [
    { id: 'w1', table: 3, status: 'ready', items: ['2x Adana Kebap', '1x Mercimek Çorba', '2x Ayran'], preparedAt: Date.now() - 60000 },
    { id: 'w2', table: 7, status: 'ready', items: ['1x İskender', '1x Künefe'], preparedAt: Date.now() - 180000 },
    { id: 'w3', table: 12, status: 'delivered', items: ['2x Pide Kapalı', '4x Çay'], preparedAt: Date.now() - 600000, deliveredAt: Date.now() - 420000 },
    { id: 'w4', table: 1, status: 'delivered', items: ['3x Lahmacun', '1x Karışık Salata'], preparedAt: Date.now() - 900000, deliveredAt: Date.now() - 780000 },
    { id: 'w5', table: 5, status: 'ready', items: ['1x Tavuk Şiş', '1x Pilav'], preparedAt: Date.now() - 30000 },
]

export default function WaiterPage() {
    const [orders, setOrders] = useState(DEMO_ORDERS)
    const [activeTab, setActiveTab] = useState<'ready' | 'delivered'>('ready')

    const deliver = (id: string) => setOrders(o => o.map(x => x.id === id ? { ...x, status: 'delivered' as const, deliveredAt: Date.now() } : x))

    const readyOrders = orders.filter(o => o.status === 'ready')
    const deliveredOrders = orders.filter(o => o.status === 'delivered')

    // KPI calculations
    const deliveredWithTime = deliveredOrders.filter(o => o.deliveredAt && o.preparedAt)
    const avgDeliverySec = deliveredWithTime.length > 0
        ? Math.round(deliveredWithTime.reduce((s, o) => s + ((o.deliveredAt! - o.preparedAt) / 1000), 0) / deliveredWithTime.length)
        : 0
    const overdueCount = deliveredWithTime.filter(o => (o.deliveredAt! - o.preparedAt) / 1000 > 300).length

    const stats: WaiterStat[] = [
        { label: 'Teslim Bekleyen', value: String(readyOrders.length), icon: '🍽️', color: '#f59e0b' },
        { label: 'Teslim Edilen', value: String(deliveredOrders.length), icon: '✅', color: '#22c55e' },
        { label: 'Ort. Teslim', value: `${Math.floor(avgDeliverySec / 60)}:${String(avgDeliverySec % 60).padStart(2, '0')}`, icon: '⏱️', color: '#8B5CF6' },
        { label: 'Gecikme', value: String(overdueCount), icon: '⚠️', color: overdueCount > 0 ? '#ef4444' : '#22c55e' },
    ]

    const fmtAgo = (ts: number) => {
        const s = Math.floor((Date.now() - ts) / 1000)
        if (s < 60) return `${s}sn`
        return `${Math.floor(s / 60)}dk`
    }

    return (
        <div style={{ maxWidth: 560 }}>
            {/* Header */}
            <div style={{ marginBottom: 16 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🏃 Garson Paneli</h1>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Hazır siparişler · Teslim takibi · KPI</p>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
                {stats.map(s => (
                    <div key={s.label} style={{
                        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 10, padding: '10px 8px', textAlign: 'center',
                    }}>
                        <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Tab Switch */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                {([
                    { id: 'ready' as const, label: `🍽️ Hazır (${readyOrders.length})` },
                    { id: 'delivered' as const, label: `✅ Teslim (${deliveredOrders.length})` },
                ]).map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                        flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: activeTab === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                        color: activeTab === t.id ? '#f97316' : 'rgba(255,255,255,0.35)',
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.label}</button>
                ))}
            </div>

            {/* Order List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(activeTab === 'ready' ? readyOrders : deliveredOrders).map(order => (
                    <div key={order.id} style={{
                        background: 'rgba(255,255,255,0.02)', border: order.status === 'ready' ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 12, overflow: 'hidden',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>Masa {order.table}</span>
                                {order.status === 'ready' && (
                                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', animation: 'pulse 1.5s infinite' }}>HAZIR</span>
                                )}
                            </div>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
                                {order.status === 'ready' ? `${fmtAgo(order.preparedAt)} önce hazırlandı` : `Teslim: ${fmtAgo(order.deliveredAt!)}`}
                            </span>
                        </div>

                        <div style={{ padding: '8px 14px' }}>
                            {order.items.map((item, i) => (
                                <div key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', padding: '2px 0' }}>{item}</div>
                            ))}
                        </div>

                        {order.status === 'ready' && (
                            <div style={{ padding: '8px 14px' }}>
                                <button onClick={() => deliver(order.id)} style={{
                                    width: '100%', padding: '10px 0', borderRadius: 8, border: 'none',
                                    background: '#22c55e', color: 'white', fontSize: 12, fontWeight: 800,
                                    cursor: 'pointer', fontFamily: 'inherit',
                                }}>✅ TESLİM EDİLDİ</button>
                            </div>
                        )}

                        {order.status === 'delivered' && order.deliveredAt && (
                            <div style={{ padding: '4px 14px 8px', display: 'flex', gap: 4 }}>
                                <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                                    ⏱️ {Math.round((order.deliveredAt - order.preparedAt) / 1000)}sn teslim süresi
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }`}</style>
        </div>
    )
}
