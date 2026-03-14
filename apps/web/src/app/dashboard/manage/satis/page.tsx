'use client'

import { useState } from 'react'
import Link from 'next/link'

const ORDERS = [
    { id: '#10001', date: '14 Mar 2024', customer: 'Ahmet Yılmaz', payment: 'Ödendi', fulfillment: 'Karşılandı', total: '₺1.250,00' },
    { id: '#10002', date: '12 Mar 2024', customer: 'Fatma Kaya', payment: 'Bekliyor', fulfillment: 'Bekliyor', total: '₺890,00' },
    { id: '#10003', date: '10 Mar 2024', customer: 'Mehmet Demir', payment: 'Ödendi', fulfillment: 'Karşılandı', total: '₺2.100,00' },
    { id: '#10004', date: '8 Mar 2024', customer: 'Zeynep Ak', payment: 'Ödendi', fulfillment: 'Bekliyor', total: '₺450,00' },
    { id: '#10005', date: '5 Mar 2024', customer: 'Ali Öztürk', payment: 'İade', fulfillment: 'İptal', total: '₺670,00' },
]

export default function SatisPage() {
    const [selected, setSelected] = useState<string[]>([])
    const [filter, setFilter] = useState('all')

    const toggleSelect = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
    const toggleAll = () => setSelected(s => s.length === ORDERS.length ? [] : ORDERS.map(o => o.id))

    return (
        <div className="kpnk-main">
            {/* KPI Bar */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                {[
                    { label: 'Satışlar', value: '₺4.690', change: '+12%' },
                    { label: 'Siparişler', value: '5', change: '+2' },
                    { label: 'Ort. sipariş değeri', value: '₺938', change: '-5%' },
                ].map((k, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                        <span style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)' }}>{k.label}</span>
                        <span style={{ fontSize: 18, fontWeight: 700 }}>{k.value}</span>
                        <span style={{ fontSize: 12, color: k.change.startsWith('+') ? 'var(--kpnk-success)' : 'var(--kpnk-danger)' }}>{k.change}</span>
                    </div>
                ))}
                <span style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', marginLeft: 'auto' }}>Son 30 gün ▾</span>
            </div>

            {/* Promo Banner */}
            <div style={{ background: '#F0F4FF', border: '1px solid #D4E0FF', borderRadius: 10, padding: '14px 18px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13 }}>📢 Snapchat reklamlarıyla ziyaretçileri müşterilere dönüştürün</span>
                <button style={{ fontSize: 12, fontWeight: 700, color: 'var(--kpnk-primary)', background: '#fff', border: '1px solid var(--kpnk-primary)', padding: '6px 16px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Dene</button>
            </div>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>Siparişler</h1>
                <button style={{ fontSize: 13, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '8px 20px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>+ Yeni Sipariş</button>
            </div>

            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '6px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 12, fontFamily: 'var(--kpnk-font)', background: '#fff', cursor: 'pointer' }}>
                    <option value="all">Tüm siparişler ({ORDERS.length})</option>
                    <option value="paid">Ödendi</option>
                    <option value="pending">Bekliyor</option>
                </select>
                <button style={{ padding: '6px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer', fontFamily: 'var(--kpnk-font)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                    Filtrele
                </button>
                <div style={{ marginLeft: 'auto' }}>
                    <input placeholder="Sipariş ara..." style={{ padding: '6px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 12, fontFamily: 'var(--kpnk-font)', width: 180, outline: 'none' }} />
                </div>
            </div>

            {/* Table */}
            <div className="kpnk-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--kpnk-border)', background: 'var(--kpnk-bg-secondary)' }}>
                            <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, width: 30 }}>
                                <input type="checkbox" checked={selected.length === ORDERS.length} onChange={toggleAll} />
                            </th>
                            <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Sipariş No</th>
                            <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Tarih</th>
                            <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Müşteri</th>
                            <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Ödeme</th>
                            <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Karşılama</th>
                            <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>Toplam</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ORDERS.map(order => (
                            <tr key={order.id} style={{ borderBottom: '1px solid var(--kpnk-border-light)', cursor: 'pointer' }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--kpnk-bg-secondary)')}
                                onMouseLeave={e => (e.currentTarget.style.background = '')} >
                                <td style={{ padding: '12px 14px' }}><input type="checkbox" checked={selected.includes(order.id)} onChange={() => toggleSelect(order.id)} /></td>
                                <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--kpnk-primary)' }}>{order.id}</td>
                                <td style={{ padding: '12px 14px', color: 'var(--kpnk-text-secondary)' }}>{order.date}</td>
                                <td style={{ padding: '12px 14px' }}>{order.customer}</td>
                                <td style={{ padding: '12px 14px' }}>
                                    <Badge text={order.payment} type={order.payment === 'Ödendi' ? 'success' : order.payment === 'İade' ? 'danger' : 'warning'} />
                                </td>
                                <td style={{ padding: '12px 14px' }}>
                                    <Badge text={order.fulfillment} type={order.fulfillment === 'Karşılandı' ? 'success' : order.fulfillment === 'İptal' ? 'danger' : 'warning'} />
                                </td>
                                <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 600 }}>{order.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function Badge({ text, type }: { text: string; type: 'success' | 'warning' | 'danger' }) {
    const colors = { success: { bg: '#E8F8EF', color: '#1A7F37' }, warning: { bg: '#FFF8E6', color: '#9A6700' }, danger: { bg: '#FDECEC', color: '#CF222E' } }
    const c = colors[type]
    return <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: c.bg, color: c.color }}>{text}</span>
}
