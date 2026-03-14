'use client'

export default function AyarlarPage() {
    const sections = [
        { title: 'İşletme Bilgileri', desc: 'Ad, adres, telefon, çalışma saatleri', icon: '💼' },
        { title: 'Domain Yönetimi', desc: 'Alan adı bağla, DNS ayarları', icon: '🌐' },
        { title: 'Roller ve İzinler', desc: 'Ekip üyelerinin erişim seviyelerini yönetin', icon: '🔐' },
        { title: 'SEO ve İndeksleme', desc: 'Arama motorları ve açılış sayfası ayarları', icon: '📊' },
        { title: 'Sosyal Paylaşım', desc: 'Site paylaşıldığında görünen bilgiler', icon: '📱' },
        { title: 'Pazarlama Entegrasyonları', desc: 'Google Analytics, Facebook Pixel, Tag Manager', icon: '📈' },
        { title: 'Site Şifresi', desc: 'Siteyi parola ile koruyun', icon: '🔒' },
        { title: 'Erişilebilirlik', desc: 'Erişilebilirlik standartlarını yönetin', icon: '♿' },
        { title: 'Dil ve Bölge', desc: 'Site dili, para birimi, saat dilimi', icon: '🌍' },
        { title: 'E-posta Bildirimleri', desc: 'Hangi bildirimleri almak istediğinizi seçin', icon: '✉️' },
        { title: 'Faturalama', desc: 'Paket, ödeme geçmişi, fatura bilgileri', icon: '💳' },
        { title: 'KVKK / Gizlilik', desc: 'Çerez banner, gizlilik politikası', icon: '🛡️' },
    ]

    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Ayarlar</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 24 }}>Site ve işletme ayarlarınızı yönetin.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {sections.map((s, i) => (
                    <div key={i} className="kpnk-card" style={{ padding: 18, cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <span style={{ fontSize: 22 }}>{s.icon}</span>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.title}</div>
                            <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', lineHeight: 1.4 }}>{s.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
