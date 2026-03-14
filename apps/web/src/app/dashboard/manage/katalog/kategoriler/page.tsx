'use client'

export default function KategorilerPage() {
    const categories = [
        { name: 'Su Arıtma Cihazları', products: 3, children: ['Tezgah Altı', 'Tezgah Üstü', 'İşletme Tipi'] },
        { name: 'Filtreler', products: 5, children: ['Sediment', 'Karbon', 'Mineral'] },
        { name: 'Aksesuarlar', products: 4, children: ['Adaptörler', 'Hortumlar', 'Bağlantı Parçaları'] },
        { name: 'Hizmetler', products: 2, children: ['Montaj', 'Bakım'] },
    ]

    return (
        <div className="kpnk-main">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>Kategoriler</h1>
                <button style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '8px 20px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>+ Yeni Kategori</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {categories.map((cat, i) => (
                    <div key={i} className="kpnk-card" style={{ padding: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--kpnk-text-secondary)" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                                <span style={{ fontWeight: 700, fontSize: 14 }}>{cat.name}</span>
                                <span style={{ fontSize: 11, color: 'var(--kpnk-text-secondary)' }}>{cat.products} ürün</span>
                            </div>
                            <button style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>⋯</button>
                        </div>
                        {cat.children.length > 0 && (
                            <div style={{ marginLeft: 32, marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {cat.children.map((child, j) => (
                                    <span key={j} style={{ fontSize: 11, color: 'var(--kpnk-text-secondary)', background: 'var(--kpnk-bg-secondary)', padding: '3px 10px', borderRadius: 12 }}>{child}</span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
