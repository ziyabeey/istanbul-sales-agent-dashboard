'use client'

export default function UygulamalarPage() {
    const installed = [
        { name: 'Google Analytics', icon: '📊', status: 'Bağlı' },
        { name: 'Facebook Pixel', icon: '📱', status: 'Bağlı' },
    ]
    const market = [
        { name: 'WhatsApp Chat', icon: '💬', desc: 'Ziyaretçilerle anlık WhatsApp sohbeti', installs: '50K+' },
        { name: 'Instagram Feed', icon: '📸', desc: 'Instagram gönderilerinizi sitenizde gösterin', installs: '30K+' },
        { name: 'Google Reviews', icon: '⭐', desc: 'Google yorumlarınızı sitenizde sergileyin', installs: '25K+' },
        { name: 'Canlı Sohbet', icon: '💭', desc: 'Gerçek zamanlı müşteri desteği', installs: '40K+' },
        { name: 'Bülten Aboneliği', icon: '✉️', desc: 'E-posta listesi oluşturun', installs: '35K+' },
        { name: 'Online Rezervasyon', icon: '📅', desc: 'Randevu ve rezervasyon sistemi', installs: '20K+' },
    ]

    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Uygulamalar</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 24 }}>Kurulu uygulamalar ve uygulama mağazası.</p>

            {/* Installed */}
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Kurulu Uygulamalar</h2>
            <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
                {installed.map((app, i) => (
                    <div key={i} className="kpnk-card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 10, minWidth: 200 }}>
                        <span style={{ fontSize: 24 }}>{app.icon}</span>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{app.name}</div>
                            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: '#E8F8EF', color: '#1A7F37' }}>{app.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Market */}
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Uygulama Mağazası</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {market.map((app, i) => (
                    <div key={i} className="kpnk-card" style={{ padding: 16, cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <span style={{ fontSize: 24 }}>{app.icon}</span>
                            <div style={{ fontWeight: 700, fontSize: 14 }}>{app.name}</div>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', lineHeight: 1.4, marginBottom: 10 }}>{app.desc}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 11, color: 'var(--kpnk-text-secondary)' }}>{app.installs} yükleme</span>
                            <button style={{ fontSize: 11, fontWeight: 700, color: 'var(--kpnk-primary)', background: 'var(--kpnk-primary-light)', border: 'none', padding: '5px 14px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Ekle</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
