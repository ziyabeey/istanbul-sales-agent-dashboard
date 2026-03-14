'use client'

import { useState } from 'react'

const PRODUCTS = [
    { id: 'p1', img: '📦', name: 'IONICA DRY Gold', type: 'Fiziksel', sku: 'ID-GOLD-001', price: '₺2.500', variants: 3 },
    { id: 'p2', img: '📦', name: 'IONICA DRY Silver', type: 'Fiziksel', sku: 'ID-SLV-001', price: '₺1.800', variants: 2 },
    { id: 'p3', img: '📦', name: 'Filtre Paketi (6 Aylık)', type: 'Fiziksel', sku: 'ID-FLT-006', price: '₺450', variants: 0 },
    { id: 'p4', img: '📦', name: 'Montaj Hizmeti', type: 'Dijital', sku: 'ID-SRV-001', price: '₺200', variants: 0 },
    { id: 'p5', img: '📦', name: 'IONICA DRY Platinum', type: 'Fiziksel', sku: 'ID-PLT-001', price: '₺3.200', variants: 4 },
    { id: 'p6', img: '📦', name: 'Musluk Adaptörü', type: 'Fiziksel', sku: 'ID-ADP-001', price: '₺85', variants: 0 },
]

export default function UrunlerPage() {
    const [selected, setSelected] = useState<string[]>([])
    const toggleSelect = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
    const toggleAll = () => setSelected(s => s.length === PRODUCTS.length ? [] : PRODUCTS.map(p => p.id))

    return (
        <div className="kpnk-main">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>Mağaza Ürünleri</h1>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--kpnk-primary)', background: 'var(--kpnk-primary-light)', border: 'none', padding: '7px 16px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>İçe Aktar</button>
                    <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--kpnk-primary)', background: 'var(--kpnk-primary-light)', border: 'none', padding: '7px 16px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Dışa Aktar</button>
                    <button style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '7px 20px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>+ Yeni Ürün</button>
                </div>
            </div>
            <a href="#" style={{ fontSize: 13, color: 'var(--kpnk-text-link)', textDecoration: 'none', fontWeight: 500 }}>Mağazaya Genel Bakış →</a>

            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '16px 0 12px' }}>
                <select style={{ padding: '6px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 12, fontFamily: 'var(--kpnk-font)', background: '#fff' }}>
                    <option>Tüm ürünler ({PRODUCTS.length})</option>
                </select>
                <button style={{ padding: '6px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Görünümü Yönet ▾</button>
                <button style={{ padding: '6px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer', fontFamily: 'var(--kpnk-font)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                    Filtrele
                </button>
                <div style={{ marginLeft: 'auto' }}>
                    <input placeholder="Ürün ara..." style={{ padding: '6px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 12, fontFamily: 'var(--kpnk-font)', width: 180, outline: 'none' }} />
                </div>
            </div>

            {/* Bulk action bar */}
            {selected.length > 0 && (
                <div style={{ background: 'var(--kpnk-primary)', color: '#fff', padding: '8px 16px', borderRadius: 8, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
                    <span>{selected.length} ürün seçildi</span>
                    <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Sil</button>
                    <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Dışa Aktar</button>
                </div>
            )}

            {/* Product Table */}
            <div className="kpnk-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr style={{ borderBottom: '1px solid var(--kpnk-border)', background: 'var(--kpnk-bg-secondary)' }}>
                        <th style={{ padding: '10px 14px', textAlign: 'left', width: 30 }}><input type="checkbox" checked={selected.length === PRODUCTS.length} onChange={toggleAll} /></th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, width: 40 }}></th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Ad</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Tür</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Stok Kodu</th>
                        <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>Fiyat</th>
                    </tr></thead>
                    <tbody>
                        {PRODUCTS.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid var(--kpnk-border-light)', cursor: 'pointer' }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--kpnk-bg-secondary)')}
                                onMouseLeave={e => (e.currentTarget.style.background = '')}>
                                <td style={{ padding: '12px 14px' }}><input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} /></td>
                                <td style={{ padding: '12px 14px' }}><div style={{ width: 36, height: 36, borderRadius: 6, background: 'var(--kpnk-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{p.img}</div></td>
                                <td style={{ padding: '12px 14px' }}>
                                    <span style={{ fontWeight: 600 }}>{p.name}</span>
                                    {p.variants > 0 && <span style={{ fontSize: 11, color: 'var(--kpnk-text-secondary)', marginLeft: 6 }}>{p.variants} varyant</span>}
                                </td>
                                <td style={{ padding: '12px 14px', color: 'var(--kpnk-text-secondary)' }}>{p.type}</td>
                                <td style={{ padding: '12px 14px', color: 'var(--kpnk-text-secondary)', fontFamily: 'monospace', fontSize: 11 }}>{p.sku}</td>
                                <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 600 }}>{p.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
