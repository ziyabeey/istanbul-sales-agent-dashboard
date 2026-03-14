'use client'

export default function GelistiriciPage() {
    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Geliştirici Araçları</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 24 }}>Site logları, izleme ve gelişmiş araçlar.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                    { title: 'Site Günlükleri', desc: 'HTTP istekleri, hata logları ve sunucu olayları', icon: '📋', count: '1.2K olay' },
                    { title: 'Gelişmiş Günlük Araçları', desc: 'Detaylı hata ayıklama ve analiz', icon: '🔍', count: '' },
                    { title: 'İzleme', desc: 'Gerçek zamanlı performans izleme ve uyarılar', icon: '📡', count: '3 uyarı' },
                ].map((t, i) => (
                    <div key={i} className="kpnk-card" style={{ padding: 18, cursor: 'pointer' }}>
                        <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>{t.icon}</span>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{t.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', lineHeight: 1.4, marginBottom: 6 }}>{t.desc}</div>
                        {t.count && <span style={{ fontSize: 11, color: 'var(--kpnk-primary)', fontWeight: 600 }}>{t.count}</span>}
                    </div>
                ))}
            </div>
        </div>
    )
}
