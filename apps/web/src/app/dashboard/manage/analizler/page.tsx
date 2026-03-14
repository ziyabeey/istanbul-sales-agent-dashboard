'use client'

export default function AnalizlerPage() {
    return (
        <div className="kpnk-main">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>Analizler</h1>
                <a href="#" style={{ fontSize: 13, color: 'var(--kpnk-text-link)', fontWeight: 500, textDecoration: 'none' }}>Tüm Raporlar →</a>
            </div>

            {/* KPI Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
                {[
                    { label: 'Ziyaretçiler', value: '1.240', change: '+8%', icon: '👁️' },
                    { label: 'Site Oturumları', value: '2.100', change: '+12%', icon: '📊' },
                    { label: 'Ortalama Süre', value: '2:34', change: '-3%', icon: '⏱️' },
                    { label: 'Hemen Çıkma', value: '%42', change: '-5%', icon: '↩️' },
                ].map((k, i) => (
                    <div key={i} className="kpnk-card kpnk-kpi">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span className="kpnk-kpi-title">{k.label}</span>
                            <span style={{ fontSize: 16 }}>{k.icon}</span>
                        </div>
                        <span className="kpnk-kpi-value">{k.value}</span>
                        <span className={`kpnk-kpi-change ${k.change.startsWith('+') ? 'up' : 'down'}`} style={{ marginTop: 4 }}>
                            {k.change.startsWith('+') ? '↑' : '↓'} {k.change}
                        </span>
                    </div>
                ))}
            </div>

            {/* Traffic Overview */}
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Trafiğe Genel Bakış</h2>
            <div className="kpnk-card" style={{ padding: 20, marginBottom: 24 }}>
                <svg width="100%" height="120" viewBox="0 0 400 120" preserveAspectRatio="none">
                    <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--kpnk-primary)" stopOpacity="0.2"/><stop offset="100%" stopColor="var(--kpnk-primary)" stopOpacity="0"/></linearGradient></defs>
                    <path d="M0 100 Q50 80, 100 70 T200 50 T300 35 T400 20 V120 H0 Z" fill="url(#tg)"/>
                    <path d="M0 100 Q50 80, 100 70 T200 50 T300 35 T400 20" fill="none" stroke="var(--kpnk-primary)" strokeWidth="2"/>
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--kpnk-text-secondary)', marginTop: 8 }}>
                    <span>1 Mar</span><span>8 Mar</span><span>15 Mar</span><span>22 Mar</span><span>29 Mar</span>
                </div>
            </div>

            {/* Quick Links */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                    { title: 'Gerçek Zamanlı', desc: 'Şu anda sitenizdeki ziyaretçiler', icon: '🟢' },
                    { title: 'Davranış', desc: 'Sayfa görüntülenmeleri ve etkileşim', icon: '📈' },
                    { title: 'Kıyaslamalar', desc: 'Sektör ortalamaları ile karşılaştırma', icon: '📊' },
                ].map((l, i) => (
                    <div key={i} className="kpnk-card" style={{ padding: 16, cursor: 'pointer' }}>
                        <span style={{ fontSize: 20, marginBottom: 8, display: 'block' }}>{l.icon}</span>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{l.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>{l.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
