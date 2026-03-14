'use client'

export default function PazarlamaEpostaPage() {
    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>E-Posta Pazarlama</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 20 }}>Kampanyalar oluşturun, gönderin ve performansı takip edin.</p>

            {/* Templates Carousel */}
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Şablonlar</h2>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 12, marginBottom: 24 }}>
                {[
                    { title: 'Yeni Ürünleri Tanıtın', bg: '#E8F0FE', icon: '🎁' },
                    { title: 'Haber Bülteni Gönderin', bg: '#E8F8EF', icon: '📰' },
                    { title: 'Promosyon Başlatın', bg: '#FFF8E6', icon: '🏷️' },
                    { title: 'İş Güncellemesi', bg: '#F0E8FE', icon: '💼' },
                    { title: 'Kendiniz Oluşturun', bg: '#F5F5F5', icon: '✏️' },
                ].map((t, i) => (
                    <div key={i} style={{ minWidth: 160, height: 120, borderRadius: 10, background: t.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 8, flexShrink: 0, transition: '0.15s', border: '1px solid transparent' }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--kpnk-primary)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}>
                        <span style={{ fontSize: 28 }}>{t.icon}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, textAlign: 'center', padding: '0 8px' }}>{t.title}</span>
                    </div>
                ))}
            </div>
            <a href="#" style={{ fontSize: 13, color: 'var(--kpnk-text-link)', fontWeight: 500, textDecoration: 'none' }}>Tüm Şablonları Görüntüle →</a>

            {/* Campaign List */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '24px 0 14px' }}>
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>E-posta Pazarlama Kampanyaları</h2>
                <button style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '7px 18px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>+ Yeni Kampanya</button>
            </div>

            {[
                { title: 'Yaz Kampanyası 2024', status: 'Taslak', date: '12 Mar 2024' },
                { title: 'Yeni Ürün Duyurusu', status: 'Gönderildi', date: '5 Mar 2024' },
            ].map((c, i) => (
                <div key={i} className="kpnk-card" style={{ padding: 16, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 50, height: 50, borderRadius: 8, background: 'var(--kpnk-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>✉️</div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{c.title}</div>
                            <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>Son düzenleme: {c.date}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: c.status === 'Gönderildi' ? '#E8F8EF' : '#FFF8E6', color: c.status === 'Gönderildi' ? '#1A7F37' : '#9A6700' }}>{c.status}</span>
                        <button style={{ fontSize: 12, color: 'var(--kpnk-primary)', background: 'var(--kpnk-primary-light)', border: 'none', padding: '5px 14px', borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Düzenle</button>
                        <button style={{ color: 'var(--kpnk-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>⋯</button>
                    </div>
                </div>
            ))}

            {/* Balance */}
            <div className="kpnk-card" style={{ padding: 18, marginTop: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>E-posta pazarlama paketi: <span style={{ color: 'var(--kpnk-text-secondary)', fontWeight: 400 }}>Ücretsiz</span></div>
                <div style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    Gönderilen E-Postalar:
                    <strong>0 / 200</strong>
                </div>
                <div className="kpnk-progress-bar" style={{ maxWidth: 300, marginBottom: 8 }}><div className="kpnk-progress-fill" style={{ width: '0%' }} /></div>
                <a href="#" style={{ fontSize: 12, color: 'var(--kpnk-text-link)', fontWeight: 500, textDecoration: 'none' }}>Daha Fazla Göndermek İçin Yükselt →</a>
            </div>

            {/* AI */}
            <div style={{ background: 'linear-gradient(135deg, #F0F4FF, #E8F0FE)', borderRadius: 10, padding: 18, marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>✨</span>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>Yapay zekadan yardım alın</div>
                    <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>AI ile e-posta içeriği ve konu satırı oluşturun.</div>
                </div>
            </div>
        </div>
    )
}
