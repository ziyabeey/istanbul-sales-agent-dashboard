'use client'

export default function CmsPage() {
    const collections = [
        { name: 'Ürünler', items: 6, fields: 8 },
        { name: 'Blog Yazıları', items: 3, fields: 6 },
        { name: 'Müşteri Yorumları', items: 12, fields: 5 },
        { name: 'Sık Sorulan Sorular', items: 8, fields: 3 },
    ]

    return (
        <div className="kpnk-main">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 700 }}>İçerik Yönetim Sistemi</h1>
                    <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginTop: 4 }}>Koleksiyon tabanlı veri depolama. İçeriğinizi tasarımdan ayrı yönetin.</p>
                </div>
                <button style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '8px 20px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>+ Koleksiyon Oluştur</button>
            </div>

            <input placeholder="Koleksiyon ara..." style={{ width: '100%', padding: '8px 14px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--kpnk-font)', marginBottom: 16, outline: 'none' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {collections.map((c, i) => (
                    <div key={i} className="kpnk-card" style={{ padding: 18, cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--kpnk-primary)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                            <span style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>
                            <span>{c.items} öğe</span>
                            <span>{c.fields} alan</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
