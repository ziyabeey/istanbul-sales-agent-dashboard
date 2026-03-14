'use client'

export default function OdemelerPage() {
    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Ödeme Alma</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 24 }}>Ödeme yöntemlerini yapılandırın ve ödemelerinizi yönetin.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 28 }}>
                {[
                    { title: 'Bağlantı ve Kurulum', desc: 'Ödeme sağlayıcılarını bağlayın (iyzico, PayTR, Stripe)', icon: '🔗', action: 'Bağla' },
                    { title: 'Ödeme Bağlantıları', desc: 'Müşterilere doğrudan ödeme linki gönderin', icon: '🔗', action: 'Oluştur' },
                    { title: 'Faturalar', desc: 'Profesyonel faturalar oluşturun ve gönderin', icon: '🧾', action: 'Oluştur' },
                    { title: 'Fiyat Teklifleri', desc: 'Müşterilere fiyat teklifi gönderin', icon: '📋', action: 'Oluştur' },
                    { title: 'Teklifler', desc: 'Detaylı ticari teklif sayfaları hazırlayın', icon: '📄', action: 'Oluştur' },
                    { title: 'POS Ödeme', desc: 'Fiziksel mağazada kart ile ödeme alın', icon: '💳', action: 'Ayarla' },
                ].map((item, i) => (
                    <div key={i} className="kpnk-card" style={{ padding: 18, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <span style={{ fontSize: 24 }}>{item.icon}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                            <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', lineHeight: 1.4, marginBottom: 10 }}>{item.desc}</div>
                            <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--kpnk-primary)', background: 'var(--kpnk-primary-light)', border: 'none', padding: '6px 16px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>{item.action}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
