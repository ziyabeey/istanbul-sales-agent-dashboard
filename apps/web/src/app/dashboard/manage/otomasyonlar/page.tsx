'use client'

export default function OtomasyonlarPage() {
    const automations = [
        { name: 'Hoşgeldin E-postası', trigger: 'Yeni üye kaydı', status: 'Aktif', runs: 23 },
        { name: 'Terk Sepet Kurtarma', trigger: 'Ödeme terk edildi', status: 'Aktif', runs: 8 },
        { name: 'Doğum Günü İndirimi', trigger: 'Doğum günü', status: 'Pasif', runs: 0 },
        { name: 'Stok Uyarısı', trigger: 'Stok < 5', status: 'Aktif', runs: 3 },
    ]

    return (
        <div className="kpnk-main">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>Otomasyonlar</h1>
                <button style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '8px 20px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>+ Yeni Otomasyon</button>
            </div>

            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {['Tümü (4)', 'Aktif (3)', 'Pasif (1)'].map((t, i) => (
                    <button key={i} className={`kpnk-tab${i === 0 ? ' active' : ''}`}>{t}</button>
                ))}
            </div>

            {automations.map((a, i) => (
                <div key={i} className="kpnk-card" style={{ padding: 16, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: a.status === 'Aktif' ? '#E8F0FE' : '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{a.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>Tetikleyici: {a.trigger} · {a.runs} çalıştırma</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: a.status === 'Aktif' ? '#E8F8EF' : '#F5F5F5', color: a.status === 'Aktif' ? '#1A7F37' : '#868686' }}>{a.status}</span>
                        <button style={{ fontSize: 12, color: 'var(--kpnk-primary)', background: 'var(--kpnk-primary-light)', border: 'none', padding: '5px 14px', borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Düzenle</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
