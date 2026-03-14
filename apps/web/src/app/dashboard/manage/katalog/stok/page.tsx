'use client'

export default function StokPage() {
    const inventory = [
        { name: 'IONICA DRY Gold', sku: 'ID-GOLD-001', stock: 45, status: 'Stokta' },
        { name: 'IONICA DRY Silver', sku: 'ID-SLV-001', stock: 12, status: 'Stokta' },
        { name: 'Filtre Paketi (6 Aylık)', sku: 'ID-FLT-006', stock: 3, status: 'Düşük Stok' },
        { name: 'IONICA DRY Platinum', sku: 'ID-PLT-001', stock: 0, status: 'Tükendi' },
        { name: 'Musluk Adaptörü', sku: 'ID-ADP-001', stock: 89, status: 'Stokta' },
    ]

    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Stok Durumu</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 24 }}>Envanter seviyelerinizi takip edin ve stok uyarılarını yönetin.</p>

            {/* Alert */}
            <div style={{ background: '#FFF8E6', border: '1px solid #F5D790', borderRadius: 10, padding: '14px 18px', marginBottom: 20, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                ⚠️ <strong>1 ürün tükendi</strong>, <strong>1 ürün düşük stokta</strong> — Stok güncellemesi yapın.
            </div>

            <div className="kpnk-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr style={{ borderBottom: '1px solid var(--kpnk-border)', background: 'var(--kpnk-bg-secondary)' }}>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Ürün</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Stok Kodu</th>
                        <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600 }}>Miktar</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Durum</th>
                        <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>Eylem</th>
                    </tr></thead>
                    <tbody>
                        {inventory.map((p, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--kpnk-border-light)' }}>
                                <td style={{ padding: '12px 14px', fontWeight: 600 }}>{p.name}</td>
                                <td style={{ padding: '12px 14px', color: 'var(--kpnk-text-secondary)', fontFamily: 'monospace', fontSize: 11 }}>{p.sku}</td>
                                <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700, color: p.stock === 0 ? 'var(--kpnk-danger)' : p.stock < 5 ? 'var(--kpnk-warning)' : 'var(--kpnk-text)' }}>{p.stock}</td>
                                <td style={{ padding: '12px 14px' }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: p.status === 'Stokta' ? '#E8F8EF' : p.status === 'Düşük Stok' ? '#FFF8E6' : '#FDECEC', color: p.status === 'Stokta' ? '#1A7F37' : p.status === 'Düşük Stok' ? '#9A6700' : '#CF222E' }}>{p.status}</span>
                                </td>
                                <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                                    <button style={{ fontSize: 12, color: 'var(--kpnk-primary)', background: 'none', border: '1px solid var(--kpnk-primary)', padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Güncelle</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
