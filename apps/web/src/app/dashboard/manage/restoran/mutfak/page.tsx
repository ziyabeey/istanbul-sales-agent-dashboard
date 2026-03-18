'use client'

import { useState, useEffect } from 'react'

/* ═══════ Types ═══════ */
interface KOrder {
    id: string; table: number; items: { name: string; qty: number; notes?: string }[]
    status: 'pending' | 'preparing' | 'ready'; createdAt: number
}

function getTimer(created: number) {
    const s = Math.floor((Date.now() - created) / 1000)
    const m = Math.floor(s / 60), sec = s % 60
    const ratio = s / (15 * 60)
    const color = ratio < 0.5 ? '#22c55e' : ratio < 0.8 ? '#f59e0b' : '#ef4444'
    const urgency = ratio < 0.5 ? 'green' : ratio < 0.8 ? 'yellow' : 'red'
    return { m, sec, color, urgency, s }
}

const DEMO_ORDERS: KOrder[] = [
    { id: 'o1', table: 3, status: 'pending', createdAt: Date.now() - 120000, items: [{ name: 'Adana Kebap', qty: 2 }, { name: 'Mercimek Çorba', qty: 1 }, { name: 'Ayran', qty: 2 }] },
    { id: 'o2', table: 7, status: 'preparing', createdAt: Date.now() - 480000, items: [{ name: 'İskender', qty: 1, notes: 'Az yağlı' }, { name: 'Künefe', qty: 1 }] },
    { id: 'o3', table: 1, status: 'pending', createdAt: Date.now() - 60000, items: [{ name: 'Lahmacun', qty: 3 }, { name: 'Karışık Salata', qty: 1 }] },
    { id: 'o4', table: 12, status: 'preparing', createdAt: Date.now() - 840000, items: [{ name: 'Pide Kapalı', qty: 2, notes: 'Kaşarlı' }, { name: 'Çay', qty: 4 }] },
    { id: 'o5', table: 5, status: 'pending', createdAt: Date.now() - 30000, items: [{ name: 'Tavuk Şiş', qty: 1 }, { name: 'Pilav', qty: 1 }] },
]

export default function KitchenPage() {
    const [orders, setOrders] = useState(DEMO_ORDERS)
    const [, forceUpdate] = useState(0)

    // Re-render every second for timer updates
    useEffect(() => {
        const iv = setInterval(() => forceUpdate(n => n + 1), 1000)
        return () => clearInterval(iv)
    }, [])

    const sorted = [...orders].sort((a, b) => {
        const aO = getTimer(a.createdAt).urgency === 'red'
        const bO = getTimer(b.createdAt).urgency === 'red'
        if (aO && !bO) return -1; if (!aO && bO) return 1
        return a.createdAt - b.createdAt
    })

    const bump = (id: string) => setOrders(o => o.filter(x => x.id !== id))
    const ack = (id: string) => setOrders(o => o.map(x => x.id === id ? { ...x, status: 'preparing' as const } : x))

    const pending = orders.filter(o => o.status === 'pending').length
    const preparing = orders.filter(o => o.status === 'preparing').length

    return (
        <div style={{ maxWidth: 960 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>👨‍🍳 Mutfak Paneli (KDS)</h1>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Gerçek zamanlı sipariş takibi · Renk kodlu timer · Sesli bildirim</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(34,197,94,0.1)', fontSize: 12, fontWeight: 700, color: '#22c55e' }}>Bekleyen: {pending}</div>
                    <div style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(245,158,11,0.1)', fontSize: 12, fontWeight: 700, color: '#f59e0b' }}>Hazırlanan: {preparing}</div>
                </div>
            </div>

            {/* Order Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                {sorted.map(order => {
                    const t = getTimer(order.createdAt)
                    return (
                        <div key={order.id} style={{
                            background: 'rgba(255,255,255,0.02)', borderRadius: 14, overflow: 'hidden',
                            border: t.urgency === 'red' ? '2px solid #ef4444' : t.urgency === 'yellow' ? '2px solid #f59e0b' : '2px solid rgba(255,255,255,0.06)',
                            animation: t.urgency === 'red' ? 'pulse 2s infinite' : undefined,
                        }}>
                            {/* Header: Masa + Timer */}
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                                background: t.urgency === 'red' ? 'rgba(239,68,68,0.08)' : 'transparent',
                            }}>
                                <span style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>Masa {order.table}</span>
                                <span style={{ fontSize: 16, fontWeight: 800, fontFamily: 'monospace', color: t.color }}>{t.m}:{String(t.sec).padStart(2, '0')}</span>
                            </div>

                            {/* Status */}
                            <div style={{ padding: '4px 12px' }}>
                                <span style={{
                                    fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase',
                                    background: order.status === 'pending' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                                    color: order.status === 'pending' ? '#22c55e' : '#f59e0b',
                                }}>{order.status === 'pending' ? 'Bekliyor' : 'Hazırlanıyor'}</span>
                            </div>

                            {/* Items */}
                            <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {order.items.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                                        <span style={{ fontSize: 13, fontWeight: 800, color: '#C84B31', minWidth: 22 }}>{item.qty}x</span>
                                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', flex: 1 }}>{item.name}</span>
                                        {item.notes && <span style={{ fontSize: 9, color: '#f59e0b', fontStyle: 'italic' }}>({item.notes})</span>}
                                    </div>
                                ))}
                            </div>

                            {/* Action */}
                            <div style={{ padding: '8px 12px' }}>
                                {order.status === 'pending' ? (
                                    <button onClick={() => ack(order.id)} style={{
                                        width: '100%', padding: '8px 0', borderRadius: 8, border: 'none',
                                        background: '#f59e0b', color: '#000', fontSize: 12, fontWeight: 800,
                                        cursor: 'pointer', fontFamily: 'inherit',
                                    }}>HAZIRLANIYOR</button>
                                ) : (
                                    <button onClick={() => bump(order.id)} style={{
                                        width: '100%', padding: '8px 0', borderRadius: 8, border: 'none',
                                        background: '#22c55e', color: 'white', fontSize: 12, fontWeight: 800,
                                        cursor: 'pointer', fontFamily: 'inherit',
                                    }}>✅ HAZIR</button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.85; } }`}</style>
        </div>
    )
}
