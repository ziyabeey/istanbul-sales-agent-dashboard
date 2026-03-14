'use client'

export default function SitePage() {
    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Site ve Mobil Uygulama</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 24 }}>Sitenizin genel durumunu görüntüleyin ve yönetin.</p>

            {/* Site Health */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
                {[
                    { title: 'Site Hızı', value: '92/100', color: '#20C368', desc: 'Mükemmel performans', icon: '⚡' },
                    { title: 'Çalışma Süresi', value: '%99.9', color: '#20C368', desc: 'Son 30 gün', icon: '🟢' },
                    { title: 'SSL Sertifikası', value: 'Aktif', color: '#20C368', desc: 'Otomatik yenileme', icon: '🔒' },
                ].map((k, i) => (
                    <div key={i} className="kpnk-card" style={{ padding: 18 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)' }}>{k.title}</span>
                            <span style={{ fontSize: 18 }}>{k.icon}</span>
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 800, color: k.color, marginBottom: 4 }}>{k.value}</div>
                        <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>{k.desc}</div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Hızlı Eylemler</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {[
                    { title: 'Logo ve Marka', desc: 'İşletme logonuzu ve marka renklerinizi yönetin', icon: '🎨' },
                    { title: 'Mobil Uygulama', desc: 'Mobil uygulama oluşturun ve yayınlayın', icon: '📱' },
                    { title: 'Bio Link', desc: 'Sosyal medya bağlantı sayfası oluşturun', icon: '🔗' },
                    { title: 'Site Düzenle', desc: 'Editörde sitenizi açın ve düzenleyin', icon: '✏️' },
                ].map((a, i) => (
                    <div key={i} className="kpnk-card" style={{ padding: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 24 }}>{a.icon}</span>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{a.title}</div>
                            <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>{a.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
